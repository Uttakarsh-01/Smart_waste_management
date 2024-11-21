import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Trash2, RefreshCw, Clock, MapPin } from "lucide-react";

interface DustbinData {
  id: string;
  location: string;
  fillLevel: number;
  lastUpdated: string;
}

export const LevelSensing: React.FC = () => {
  const [dustbins, setDustbins] = useState<DustbinData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDustbinData = async () => {
    try {
      setError(null);
      // Using JSONPlaceholder API to simulate dustbin data
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );

      // Transform user data into simulated dustbin data
      const transformedData: DustbinData[] = response.data
        .slice(0, 6)
        .map((user: any) => ({
          id: `DB-${user.id}`,
          location: `${user.address.street}, ${user.address.city}`,
          fillLevel: Math.floor(Math.random() * 100), // Random fill level
          lastUpdated: new Date().toISOString(),
        }));

      setDustbins(transformedData);
    } catch (error) {
      console.error("Error fetching dustbin data:", error);
      setError("Failed to fetch dustbin data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDustbinData();
    const interval = setInterval(fetchDustbinData, 30000);
    return () => clearInterval(interval);
  }, []);

  const getFillLevelColor = (level: number) => {
    if (level > 80) return "rgb(239 68 68)";
    if (level > 50) return "rgb(234 179 8)";
    return "rgb(34 197 94)";
  };

  const getFillLevelStatus = (level: number) => {
    if (level > 80) return "Critical";
    if (level > 50) return "Moderate";
    return "Good";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <RefreshCw className="w-12 h-12 text-cyan-500" />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-cyan-500/10 rounded-xl">
            <Trash2 className="w-8 h-8 text-cyan-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-cyan-400">
              Dustbin Monitor
            </h2>
            <p className="text-gray-400">Real-time waste management system</p>
          </div>
        </div>
        <button
          onClick={fetchDustbinData}
          className="px-4 py-2 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 rounded-lg transition-colors flex items-center space-x-2"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Refresh</span>
        </button>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {dustbins.map((bin) => (
          <motion.div
            key={bin.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-cyan-600/50 hover:border-cyan-400/50 transition-colors shadow-lg hover:shadow-cyan-500/10"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-cyan-500/10 rounded-lg">
                  <MapPin className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-cyan-300">
                    {bin.location}
                  </h3>
                  <p className="text-sm text-gray-400">ID: {bin.id}</p>
                </div>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  bin.fillLevel > 80
                    ? "bg-red-500/20 text-red-300"
                    : bin.fillLevel > 50
                    ? "bg-yellow-500/20 text-yellow-300"
                    : "bg-green-500/20 text-green-300"
                }`}
              >
                {getFillLevelStatus(bin.fillLevel)}
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Fill Level</span>
                  <span className="text-cyan-300">{bin.fillLevel}%</span>
                </div>
                <div className="relative h-3 bg-gray-700/50 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${bin.fillLevel}%` }}
                    transition={{ duration: 1 }}
                    style={{
                      backgroundColor: getFillLevelColor(bin.fillLevel),
                    }}
                    className="h-full rounded-full"
                  />
                </div>
              </div>

              <div className="flex items-center text-sm text-gray-400">
                <Clock className="w-4 h-4 mr-2" />
                <span>
                  Updated: {new Date(bin.lastUpdated).toLocaleTimeString()}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
