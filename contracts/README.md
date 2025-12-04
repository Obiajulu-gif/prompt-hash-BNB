## PromptHash Contracts (BNB Chain)

This folder contains the Solidity contracts and artifacts for the BNB Chain deployment of PromptHash.

- `PromptHash.sol` – core marketplace logic for listing, buying, and settling prompt sales in BNB.
- `PromptHashAbi.json` / `PromptHash.abi` – ABI exports for frontend integrations.
- `PromptHash.bin` / `PromptHash_metadata.json` – compiled artifacts.
- `deployScript.js` – sample deployment script (ethers) you can point at BNB testnet or mainnet RPCs.

### Quick start

```bash
npm install
npx hardhat compile   # or use your preferred EVM toolchain
node contracts/deployScript.js # update RPC/private key and fee wallet before running
```

Set your BNB RPC and deployer key in env vars (e.g. `BNB_RPC_URL`, `PRIVATE_KEY`) before running the deploy script. After deployment, surface the contract address in the frontend `.env` and in `src/lib/constants.ts` as needed.
