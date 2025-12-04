// API client for interacting with the ASI gateway

const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_URL || "https://prompthash-asi.onrender.com"
).replace(/\/$/, "");

const API_PREFIX = `${API_BASE_URL}/api`;

// Dynamic model type (models come from the live /api/models endpoint)
export type AIModel = string;

export type ModelOption = {
  id: AIModel;
  displayName: string;
  description?: string;
  category?: string;
};

export type ModelCatalog = {
  models: ModelOption[];
  categories: Record<string, ModelOption[]>;
};

export type ChatResult = {
  reply: string;
  model?: string;
  totalMessages?: number;
  history?: Array<{ role: string; text: string }>;
  raw?: unknown;
};

const FALLBACK_MODELS: ModelOption[] = [
  { id: "z-ai/glm-4.5-air", displayName: "z-ai/glm-4.5-air", category: "text" },
  {
    id: "google/gemma-3-27b-it",
    displayName: "google/gemma-3-27b-it",
    category: "text",
  },
  { id: "qwen/qwen3-32b", displayName: "qwen/qwen3-32b", category: "text" },
  {
    id: "meta-llama/llama-3.3-70b-instruct",
    displayName: "meta-llama/llama-3.3-70b-instruct",
    category: "text",
  },
  { id: "mistralai/mistral-nemo", displayName: "mistralai/mistral-nemo", category: "text" },
  { id: "openai/gpt-oss-20b", displayName: "openai/gpt-oss-20b", category: "text" },
  { id: "asi1-mini", displayName: "asi1-mini", category: "text" },
  { id: "nousresearch/hermes-4-70b", displayName: "nousresearch/hermes-4-70b", category: "text" },
];

const DEFAULT_MODEL: AIModel = FALLBACK_MODELS[0].id;

const THINK_REGEX = /<think>([\s\S]*?)<\/think>/gi;

export function formatAiText(text: string): string {
  const cleaned = (text || "").toString().replace(/\r\n/g, "\n").trim();
  if (!cleaned) return "";

  const withThoughts = cleaned.replace(THINK_REGEX, (_, inner: string) => {
    const body = (inner || "").trim();
    if (!body) return "";
    const quoted = body
      .split("\n")
      .map((line: string) => `> ${line.trim()}`)
      .join("\n");
    return `\n> **Thoughts**\n${quoted}\n\n`;
  });

  return withThoughts.replace(/\n{3,}/g, "\n\n").trim();
}

function mapCategories(
  categories: Record<string, string[]> | undefined,
  models: ModelOption[],
): Record<string, ModelOption[]> {
  const output: Record<string, ModelOption[]> = {};
  const categoryEntries = Object.entries(categories || {});

  if (!categoryEntries.length) {
    output.text = models;
    return output;
  }

  const assigned = new Set<string>();

  categoryEntries.forEach(([category, ids]) => {
    if (!ids?.length) return;
    const matches = models.filter((model) => ids.includes(model.id));
    matches.forEach((model) => assigned.add(model.id));
    if (matches.length) {
      output[category] = matches;
    }
  });

  const uncategorized = models.filter((model) => !assigned.has(model.id));
  if (uncategorized.length) {
    output.text = [...(output.text || []), ...uncategorized];
  }

  return output;
}

// Get the list of available models (with fallback to a static set)
export async function getModels(): Promise<ModelCatalog> {
  try {
    const response = await fetch(`${API_PREFIX}/models`, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`Failed to fetch models: ${response.status}`);
    }
    const data = await response.json();
    const {
      models: ids = [],
      model_details: details = {},
      categories,
    } = data || {};

    const mapped: ModelOption[] = ids.map((id: string) => ({
      id,
      displayName:
        details?.[id]?.display_name ||
        details?.[id]?.name ||
        (typeof details?.[id] === "string" ? details[id] : "") ||
        id,
      description: details?.[id]?.description,
      category: Object.entries(categories || {}).find(([_, list]) =>
        Array.isArray(list) ? list.includes(id) : false,
      )?.[0],
    }));

    const models = mapped.length ? mapped : FALLBACK_MODELS;
    const mappedCategories = mapCategories(categories, models);

    return { models, categories: mappedCategories };
  } catch (error) {
    console.error("Error fetching models:", error);
    return {
      models: FALLBACK_MODELS,
      categories: { text: FALLBACK_MODELS },
    };
  }
}

// Function to check API health
export async function checkHealth() {
  try {
    const response = await fetch(`${API_PREFIX}/health`);
    return response.ok;
  } catch (error) {
    console.error("Health check failed:", error);
    return false;
  }
}

// Send a chat message to the ASI agent
export async function getChatResponse(
  prompt: string,
  model: AIModel = DEFAULT_MODEL,
  sender = "frontend_user",
): Promise<ChatResult> {
  try {
    const response = await fetch(`${API_PREFIX}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ message: prompt, model, sender }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Chat API error: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    const rawReply =
      data?.reply ||
      data?.response ||
      data?.Response ||
      data?.message ||
      "";

    return {
      reply: formatAiText(
        typeof rawReply === "string" ? rawReply : JSON.stringify(rawReply),
      ),
      model: data?.model,
      totalMessages: data?.total_messages,
      history: data?.history,
      raw: data,
    };
  } catch (error) {
    console.error("Error getting chat response:", error);
    throw error;
  }
}

// Local fallback function to improve prompts if the API fails
export function localImprovePrompt(prompt: string): string {
  let improved = prompt;

  if (prompt.length < 20) {
    improved = `${prompt} with detailed examples and step-by-step instructions`;
  }

  if (!prompt.includes("?") && prompt.split(" ").length < 5) {
    improved = `Please provide a comprehensive explanation about ${prompt}`;
  }

  if (
    prompt.length > 50 &&
    !prompt.includes("1.") &&
    !prompt.includes("First")
  ) {
    improved = `${prompt}\n\nPlease structure your response with:\n1. Introduction\n2. Main points\n3. Examples\n4. Conclusion`;
  }

  if (improved === prompt) {
    improved = `${prompt}\n\nPlease provide a detailed, well-structured response with examples where appropriate.`;
  }

  return formatAiText(improved);
}

// Improve a prompt using the ASI improver endpoint
export async function improvePrompt(
  prompt: string,
  target: "text" | "image" = "text",
): Promise<string> {
  try {
    const response = await fetch(`${API_PREFIX}/improve`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ prompt, target }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Improve prompt API error: ${response.status}`, errorText);
      return localImprovePrompt(prompt);
    }

    const result = await response.json();
    const improved =
      result?.response ||
      result?.Response ||
      result?.improved ||
      (typeof result === "string" ? result : "");

    if (!improved || improved.trim() === "" || improved.trim() === prompt.trim()) {
      return localImprovePrompt(prompt);
    }

    return formatAiText(improved);
  } catch (error) {
    console.error("Error improving prompt:", error);
    return localImprovePrompt(prompt);
  }
}

export { DEFAULT_MODEL };
