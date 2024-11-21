import React, { useState } from "react";
import { Power, AlertCircle, Loader, CheckCircle } from "lucide-react";
import { ethers } from "ethers";

// Address that will send Sepolia ETH (should have sufficient balance)
const SENDER_PRIVATE_KEY =
  "e48b9bb8d2350e163bd5789e856202b59cedaf470bd9d7e716ad8b1221007bea"; // Replace with actual private key
const SENDER_ADDRESS = "0x36f244cD9cD12037d346f6a063b5DaAC61F73836";

const WasteConverter: React.FC = () => {
  const [account, setAccount] = useState<string>("");
  const [wasteType, setWasteType] = useState<string>("plastic");
  const [wasteAmount, setWasteAmount] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [contribution, setContribution] = useState<string>("0");

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        throw new Error("Please install MetaMask");
      }

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      setAccount(accounts[0]);
      setError("");
    } catch (err) {
      setError(
        `Failed to connect wallet: ${
          err instanceof Error ? err.message : "Unknown error"
        }`
      );
    }
  };

  const sendSepoliaEth = async (recipientAddress: string) => {
    try {
      // Connect to Sepolia network
      const provider = new ethers.providers.JsonRpcProvider(
        "https://sepolia.infura.io/v3/276d84845bc94b229ed04c5435178ed9" // Replace with your Infura project ID
      );

      // Create wallet instance from private key
      const wallet = new ethers.Wallet(SENDER_PRIVATE_KEY, provider);

      // Create transaction object
      const tx = {
        to: recipientAddress,
        value: ethers.utils.parseEther("0.1"), // 0.1 Sepolia ETH
      };

      // Send transaction
      const transaction = await wallet.sendTransaction(tx);
      return transaction;
    } catch (error) {
      throw new Error(
        `Failed to send Sepolia ETH: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      if (!account) throw new Error("Please connect your wallet first");
      if (!wasteAmount) throw new Error("Please enter waste amount");

      // Send Sepolia ETH to connected wallet
      const tx = await sendSepoliaEth(account);

      // Update contribution amount (simple addition for demo)
      const newContribution =
        parseFloat(contribution) + parseFloat(wasteAmount);
      setContribution(newContribution.toString());

      setSuccess(
        `Successfully processed ${wasteAmount}kg of ${wasteType} and sent 0.1 Sepolia ETH! Transaction hash: ${tx.hash}`
      );
      setWasteAmount("");
    } catch (err) {
      setError(
        `Transaction failed: ${
          err instanceof Error ? err.message : "Unknown error"
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  const handleWasteAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWasteAmount(e.target.value);
  };

  const handleWasteTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setWasteType(e.target.value);
  };

  return (
    <div className="w-50 bg-transparent text-cyan-500 flex items-center justify-center">
      <div className="w-full max-w-md bg-gray-800 border-cyan-500 border-2 rounded-lg p-6">
        <h2>Deposit your waste</h2>
        <div className="mb-6 flex items-center gap-2">
          <Power className="w-6 h-6 text-cyan-400" />
          <h1 className="text-2xl font-bold text-cyan-400">Waste to Token</h1>
        </div>

        <div className="space-y-6">
          {!account ? (
            <button
              onClick={connectWallet}
              className="w-full py-2 px-4 bg-cyan-600 hover:bg-cyan-700 text-white rounded-md transition-colors"
            >
              Connect MetaMask
            </button>
          ) : (
            <div className="space-y-2">
              <div className="text-sm text-cyan-300">
                Connected: {account.slice(0, 6)}...{account.slice(-4)}
              </div>
              <div className="text-sm text-cyan-300">
                Total Contribution: {contribution} kg
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Waste Type
              </label>
              <select
                value={wasteType}
                onChange={handleWasteTypeChange}
                className="w-full bg-gray-700 border border-cyan-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
                <option value="plastic">Plastic</option>
                <option value="paper">Paper</option>
                <option value="metal">Metal</option>
                <option value="organic">Organic</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Amount (kg)
              </label>
              <input
                type="number"
                value={wasteAmount}
                onChange={handleWasteAmountChange}
                className="w-full bg-gray-700 border border-cyan-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="Enter amount in kg"
                min="0"
                step="0.1"
              />
            </div>

            <button
              type="submit"
              disabled={loading || !account}
              className="w-full py-2 px-4 bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-md transition-colors flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                "Convert Waste to Tokens"
              )}
            </button>
          </form>

          {error && (
            <div className="bg-red-900/50 border border-red-500 rounded-md p-4 flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <span className="text-red-200">{error}</span>
            </div>
          )}

          {success && (
            <div className="bg-green-900/50 border border-green-500 rounded-md p-4 flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
              <span className="text-green-200">{success}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WasteConverter;
