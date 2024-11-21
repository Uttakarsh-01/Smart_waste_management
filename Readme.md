# EcoRewards - Waste Management DApp

A decentralized application for waste management that rewards users with tokens for their waste contributions.

## Local Setup Instructions

1. Clone the repository:
```bash
git clone <repository-url>
cd waste-management-dapp
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```
SEPOLIA_URL=your_sepolia_rpc_url
PRIVATE_KEY=your_wallet_private_key
ETHERSCAN_API_KEY=your_etherscan_api_key
```

4. Deploy the smart contract:
```bash
npm run deploy
```

5. Copy the deployed contract address and update it in `src/App.tsx`:
```typescript
const CONTRACT_ADDRESS = 'your_deployed_contract_address';
```

6. Start the development server:
```bash
npm run dev
```

## Features

- Connect wallet using MetaMask
- Deposit waste and earn tokens
- Track waste contributions
- Knowledge base for waste management
- Neon-themed UI with beautiful animations
- Mobile-responsive design

## Smart Contract

The WasteToken smart contract is deployed on the Sepolia testnet. It implements:

- ERC20 token standard
- Waste deposit tracking
- Token rewards for waste contributions
- Owner controls for token minting

## Technologies Used

- React + Vite
- TypeScript
- Tailwind CSS
- Wagmi
- Hardhat
- OpenZeppelin
- Ethers.js#   W o r k 0 1  
 