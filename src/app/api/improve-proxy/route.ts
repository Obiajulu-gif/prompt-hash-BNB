// This is a proxy endpoint to help debug the improve-prompt API issues
import { NextResponse } from "next/server";

const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_URL || "https://prompthash-asi.onrender.com"
).replace(/\/$/, "");
const API_PREFIX = `${API_BASE_URL}/api`;

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") || "";
    const defaultPayload = { prompt: "", target: "text" as "text" | "image" };
    let payload = defaultPayload;

    if (contentType.includes("application/json")) {
      const parsed = await request.json();
      payload = {
        prompt: parsed?.prompt || "",
        target: parsed?.target || "text",
      };
    } else {
      const promptText = await request.text();
      payload = { prompt: promptText, target: "text" };
    }

    // Log the request body for debugging
    console.log("Improve prompt request:", payload);

    // Forward the request to the actual API
    const response = await fetch(`${API_PREFIX}/improve`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    // Get the response data
    const responseData = await response.json().catch(() => null);
    const responseText = await response.text().catch(() => null);

    // Log the response for debugging
    console.log("Improve prompt response status:", response.status);
    console.log("Improve prompt response data:", responseData || responseText);

    // If the response is not OK, return the error details
    if (!response.ok) {
      return NextResponse.json(
        { error: "API Error", details: responseData || responseText },
        { status: response.status },
      );
    }

    // Return the successful response
    return NextResponse.json(responseData);
  } catch (error) {
    console.error("Error in improve-proxy:", error);
    return NextResponse.json(
      {
        error: "Internal Server Error",
        message: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
