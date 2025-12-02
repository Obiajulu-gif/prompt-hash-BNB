## AI Prompt Marketplace

![PromptHash Dashboard](image/landing-page.png)

## PromptHash

PromptHash is a dynamic, AI-powered marketplace connecting prompt creators with users seeking inspiration, productivity, and cutting-edge solutions. Leveraging the high-performance, low-cost Starknet network for core marketplace operations and privacy-focused tooling for AI integration, our platform enables users to explore, create, buy, and sell high-quality AI prompts across various categories.

---

## 🚀 Vision

Our vision is to become the go-to resource where creators and users converge—leveraging advanced AI models, enterprise-grade Starknet infrastructure, and intuitive design—to spark transformative ideas across industries.

---

## 🔑 Key Features

- **🔍 Browse & Discover**: Explore curated collections of AI prompts from top creators.
- **💰 Buy & Sell Prompts**: Monetize your expertise or find the perfect prompt, with all transactions settled via ETH on Starknet.
- **🤖 Advanced AI Integration**: Powered by cutting-edge AI models (e.g., DeepSeek R1, Llama 3.2 Vision) through our privacy-preserving AI gateway.
- **🔗 Starknet Smart Contracts**: On-chain prompt registry and payment escrow flows executed on Starknet using Cairo smart contracts.
- **🔒 Blockchain Security**: Built on Starknet's STARK-based validity proofs infrastructure for enterprise-grade safety and scalability.
- **💬 Conversational AI**: Maintain context-aware chat sessions to refine or generate prompts in real time.
- **🏛️ Governance**: Community-driven platform development and on-chain governance proposals via Cairo governance contracts.
- **✨ Prompt Engineering Tools**: Interactive utilities to analyze, optimize, and refactor AI prompts.
- **👨‍💻 Creator Profiles**: Dedicated spaces for top prompt creators, with on-chain reputation badges.
- **🖼️ Multi-Format Support**: Generate images, text, and code with ease.
- **📚 Comprehensive Documentation**: Detailed API documentation available via Swagger UI and ReDoc.

---

## ⚙️ Features & Overview

### Discover & Explore

Browse a curated collection of AI prompts across categories like Coding, Marketing, Creative Writing, and Business.

### Sell & Share

List and monetize your top AI prompts with instant STRK settlements. Smart contract escrow ensures prompt delivery before funds release.

### Interactive Chat

Use our AI chatbox to get prompt recommendations and marketplace insights, with seamless on-chain logging of session metadata.

### Responsive UI

Built with Next.js, React, and Tailwind CSS for a seamless, mobile-first experience.

### API Integration

Easy integration with your applications via our RESTful and GraphQL API endpoints, complete with Starknet transaction whitelisting.

---

## 🛠️ Categories

- **📸 Image Prompts:** For visual content generation.
- **📝 Text & Writing:** Creative writing, copywriting, and content creation.
- **📊 Marketing Copy:** Advertising, emails, and conversion-focused content.
- **💡 Creative Ideas:** Brainstorming and concept development.
- **🚀 Productivity Boosters:** Efficiency and workflow optimization.
- **💻 Code Generation:** Programming assistance and development.

---

## 🏗️ Tech Stack

- **Frontend:** Next.js, React, Tailwind CSS
- **Backend:** FastAPI for AI services; Node.js/Express for blockchain gateway
- **AI Integration:** Private inference through Secret Network AI API
- **Blockchain Integration:** Starknet via starknet.js and Cairo
- **Smart Contracts:** Cairo (v2.6.0) deployed on Starknet Sepolia/Mainnet
- **Authentication:** Wallet Connect & ArgentX/Braavos for user login
- **Server:** Uvicorn (ASGI) and Node.js processes managed with PM2
- **Icons & UI:** Lucide for icon components

---

## 🔗 Starknet Integration Details

To seamlessly integrate Starknet's scalable infrastructure, PromptHash leverages Cairo smart contracts, the Starknet JavaScript SDK, and STARK-based validity proofs. Each component is provisioned and configured via environment variables, code snippets, and CLI workflows outlined below.

### 1. Client & SDK Setup

#### Prerequisites

- Node.js v18+ and npm
- Starknet Wallet (ArgentX or Braavos)
- Starknet Account with ETH for gas fees
- `.env` configured in project root:

  ```ini
  STARKNET_ACCOUNT_ADDRESS=0x123...
  STARKNET_PRIVATE_KEY=0x456...
  STARKNET_NETWORK=sepolia-alpha
  STARKNET_RPC_URL=https://starknet-sepolia.public.blastapi.io
  ```

#### Initialization (JavaScript)

```js
import { Account, RpcProvider, stark } from "starknet";

// Load from .env
const accountAddress = process.env.STARKNET_ACCOUNT_ADDRESS;
const privateKey = process.env.STARKNET_PRIVATE_KEY;

// Configure provider for Sepolia testnet
const provider = new RpcProvider({ nodeUrl: process.env.STARKNET_RPC_URL });
const account = new Account(provider, accountAddress, privateKey);

export { provider, account };
```

### 2. Cairo Smart Contracts

#### Installation & Setup

```bash
# Install Scarb (Cairo package manager)
curl --proto '=https' --tlsv1.2 -sSf https://docs.swmansion.com/scarb/install.sh | sh

# Install Starknet Foundry
curl -L https://raw.githubusercontent.com/foundry-rs/starknet-foundry/master/scripts/install.sh | sh
```

#### Project Structure

```bash
mkdir cairo_contracts && cd cairo_contracts
scarb init prompt_hash --name prompt_hash
```

#### Compilation

```bash
# Compile Cairo contracts
scarb build

# Generate artifacts
sncast declare --contract-name PromptHash
```

_Artifacts generated:_

- `target/dev/prompt_hash_PromptHash.contract_class.json`
- `target/dev/prompt_hash_PromptHash.compiled_contract_class.json`

#### Deployment

```js
import { Account, Contract, json } from "starknet";
import fs from "fs";

const compiledContract = json.parse(
	fs
		.readFileSync(
			"./target/dev/prompt_hash_PromptHash.compiled_contract_class.json"
		)
		.toString("ascii")
);

(async () => {
	// Declare contract
	const declareResponse = await account.declare({ contract: compiledContract });
	await provider.waitForTransaction(declareResponse.transaction_hash);

	// Deploy contract
	const deployResponse = await account.deployContract({
		classHash: declareResponse.class_hash,
	});
	await provider.waitForTransaction(deployResponse.transaction_hash);

	console.log("Contract Address:", deployResponse.contract_address);
})();
```

### 3. Token Integration (ERC-20 on Starknet)

#### Token Deployment

```cairo
#[starknet::contract]
mod PromptToken {
    use openzeppelin::token::erc20::ERC20Component;
    use starknet::ContractAddress;

    component!(path: ERC20Component, storage: erc20, event: ERC20Event);

    #[abi(embed_v0)]
    impl ERC20Impl = ERC20Component::ERC20Impl<ContractState>;

    #[storage]
    struct Storage {
        #[substorage(v0)]
        erc20: ERC20Component::Storage
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        #[flat]
        ERC20Event: ERC20Component::Event
    }

    #[constructor]
    fn constructor(
        ref self: ContractState,
        name: felt252,
        symbol: felt252,
        initial_supply: u256,
        recipient: ContractAddress
    ) {
        self.erc20.initializer(name, symbol);
        self.erc20._mint(recipient, initial_supply);
    }
}
```

#### Token Operations

```js
import { Contract, CallData } from "starknet";

const tokenContract = new Contract(tokenAbi, tokenAddress, provider);

// Mint tokens
await account.execute([
	{
		contractAddress: tokenAddress,
		entrypoint: "mint",
		calldata: CallData.compile([recipientAddress, amount]),
	},
]);

// Transfer tokens
await account.execute([
	{
		contractAddress: tokenAddress,
		entrypoint: "transfer",
		calldata: CallData.compile([recipientAddress, amount]),
	},
]);
```

### 4. Event Logging & Indexing

#### Event Emission (Cairo)

```cairo
#[event]
#[derive(Drop, starknet::Event)]
enum Event {
    PromptPurchased: PromptPurchased,
}

#[derive(Drop, starknet::Event)]
struct PromptPurchased {
    buyer: ContractAddress,
    prompt_id: u256,
    price: u256,
}

// Emit event
self.emit(PromptPurchased {
    buyer: get_caller_address(),
    prompt_id: prompt_id,
    price: price
});
```

#### Event Listening (JavaScript)

```js
import { Provider } from "starknet";

const provider = new Provider({ sequencer: { network: "sepolia-alpha" } });

// Listen for events
const eventFilter = {
	from_block: { block_number: 0 },
	to_block: "latest",
	address: contractAddress,
	keys: [["PromptPurchased"]],
};

const events = await provider.getEvents(eventFilter);
console.log("Events:", events);
```

---

## 📋 Prerequisites

- Node.js v18+ and npm
- Python 3.12.0
- Starknet Wallet (ArgentX or Braavos)
- ETH on Starknet Sepolia for gas fees
- Scarb (Cairo package manager)
- Starknet Foundry
- Secret AI API Key (for AI-powered features)

---

## 🔧 Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/OkeyAmy/Prompt-Hash-Starknet.git
   cd Prompt-Hash-Starknet
   ```

2. **Backend Setup (Python)**

   ```bash
   python -m venv venv
   source venv/bin/activate    # Linux/Mac
   venv\Scripts\activate     # Windows
   pip install -r requirements.txt
   ```

3. **Cairo Contracts Setup**

   ```bash
   cd cairo_contracts
   scarb build
   ```

4. **Blockchain Gateway & Frontend**

   ```bash
   cd starknet-gateway
   npm install
   cd ../frontend
   npm install
   ```

5. **Configure Environment Variables**
   Create a `.env` file in project root with:

   ```ini
   # Starknet
   STARKNET_ACCOUNT_ADDRESS=0x123...
   STARKNET_PRIVATE_KEY=0x456...
   STARKNET_NETWORK=sepolia-alpha
   STARKNET_RPC_URL=https://starknet-sepolia.public.blastapi.io

   # AI
   SECRET_AI_API_KEY=your_secret_ai_key

   # Frontend
   NEXT_PUBLIC_API_URL=http://localhost:8000
   NEXT_PUBLIC_STARKNET_CHAIN_ID=SN_SEPOLIA
   ```

---

## ▶️ Running the Services

1. **Start Python AI API**

   ```bash
   uvicorn app.main:app --reload --port 8000
   ```

2. **Start Starknet Gateway**

   ```bash
   cd starknet-gateway
   npm run dev
   ```

3. **Start Frontend**

   ```bash
   cd frontend
   npm run dev
   ```

---

## 📄 API Documentation

- **Swagger UI:** `http://localhost:8000/docs`
- **ReDoc:** `http://localhost:8000/redoc`

---

## 📜 API Endpoints

### Models

- `GET /api/models` – Retrieve available AI models.

### Chat

- `GET /api/chat` – Chat with AI model.

  - **Parameters:** `prompt` (string), `model` (optional)

### Prompt Improvement

- `POST /api/improve-prompt` – Analyze and improve a prompt.

  - **Body:** `{ "prompt": "..." }`

### Health Check

- `GET /api/health` – Check API health status.

---

## 🧑‍💻 Starknet Smart Contract Deployment

### Prerequisites

- Starknet account with ETH for gas fees
- `STARKNET_ACCOUNT_ADDRESS` & `STARKNET_PRIVATE_KEY` set in `.env`
- Scarb and Starknet Foundry installed

### Compile Contract

```bash
cd cairo_contracts
scarb build
```

Generates compiled contract class in `target/dev/`

### Deploy Contract

```bash
# Declare the contract
sncast declare --contract-name PromptHash --max-fee 0.01

# Deploy with constructor arguments
sncast deploy --class-hash <CLASS_HASH> --constructor-calldata 0x123 0x456
```

### Verify on Starkscan

1. Visit [https://sepolia.starkscan.co](https://sepolia.starkscan.co)
2. Search contract address
3. Contract will be automatically verified if source is available

---

## 🗂️ Project Structure

```
Prompt-Hash-Starknet/
├── cairo_contracts/     # Cairo smart contracts
├── starknet-gateway/    # Node.js Starknet gateway
├── frontend/            # Next.js/React application
├── app/                 # FastAPI AI services
│   ├── config.py
│   ├── main.py
│   ├── models.py
│   └── routers/
├── requirements.txt     # Python dependencies
├── package.json         # Gateway & Frontend dependencies
└── README.md            # Project documentation
```

---

## 📦 Dependencies

- **FastAPI**, **Pydantic**, **Uvicorn**
- **starknet.js**, **get-starknet**
- **Scarb**, **Starknet Foundry**
- **Secret AI SDK**
- **Next.js**, **React**, **Tailwind CSS**, **Lucide**

---

## 🎥 **Watch Demo:** [PromptHash on Starknet](https://drive.google.com/file/d/1IODf5eKn0l_lG1klQkRHc8Zapib4YzqM/view?usp=sharing)

## ❤️ Contributing

We welcome contributions! Please read `CONTRIBUTING.md` for guidelines on setting up your development environment, coding standards, and submitting pull requests.

---
