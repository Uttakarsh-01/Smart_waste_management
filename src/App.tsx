import React, { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, createConfig, http } from "wagmi";
import { sepolia } from "wagmi/chains";
import { injected } from "wagmi/connectors";
import {
  Recycle,
  Leaf,
  Trophy,
  Book,
  Video,
  Handshake,
  Coins,
  TreeDeciduousIcon,
  Globe,
  Users,
  BadgeCheck,
  Sparkles,
  Trash2
} from "lucide-react";
import WasteConverter from "./components/WasteForm";
import { KnowledgeBase } from "./components/KnowledgeBase";
import logo from "./images/wm.jpg";
import WasteManagementImageSlider from "./components/Slider";
import { motion } from "framer-motion";
import { LevelSensing } from "./components/LevelSensing";
import TransparentEcoDustbin from "./components/AnimatedDustbin";
import CyberpunkFeedback from "./components/Feedback";

const stats = [
  { value: "2.5M+", label: "Waste Collected (kg)", icon: Recycle },
  { value: "50K+", label: "Active Users", icon: Users },
  { value: "100K+", label: "Tokens Awarded", icon: Coins },
  { value: "25+", label: "Partner Organizations", icon: Handshake },
];

const config = createConfig({
  chains: [sepolia],
  connectors: [injected()],
  transports: {
    [sepolia.id]: http(),
  },
});

const queryClient = new QueryClient();
const CONTRACT_ADDRESS = "0x0000000000000000000000000000000000000000";

function App() {
  const [showKnowledge, setShowKnowledge] = useState(false);

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <div className="min-h-screen bg-black text-white">
          <div className="fixed inset-0 bg-[url('https://images.unsplash.com/photo-1569163139599-0f4517e36f51')] opacity-10 bg-cover bg-center" />
          <nav className="relative bg-black/50 backdrop-blur-md border-b border-green-500/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex items-center">
                  <Recycle className="h-8 w-8 text-green-400 animate-pulse" />
                  <span className="ml-2 text-xl font-bold text-green-400">
                    EcoRewards
                  </span>
                </div>

                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setShowKnowledge(true)}
                    className="inline-flex items-center px-4 py-2 rounded-md text-green-400 border border-green-400 hover:bg-green-400/10 transition-all"
                  >
                    <Book className="mr-2 h-4 w-4" />
                    Knowledge Base
                  </button>
                  <button className="inline-flex items-center px-4 py-2 rounded-md bg-green-400 text-black hover:bg-green-300 transition-all">
                    <Video className="mr-2 h-4 w-4" />
                    <a href="">Explore AR/VR technology</a>
                  </button>
                </div>
              </div>
            </div>
          </nav>
          {/*  <div>
            <img src={logo} style={{ width: "100%", height: "360px" }} />
          </div>*/}

          <WasteManagementImageSlider />

          <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-12">
              <h1 className="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
                Turn Your Waste into Tokens
              </h1>
              <p className="text-xl text-green-400/80">
                Join the green revolution and earn rewards for your
                environmental contribution
              </p>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center p-6 bg-black/30 rounded-xl border border-green-500/30 transition-all duration-1000 transform hover:scale-105"
                >
                  <stat.icon className="h-8 w-8 mx-auto mb-4 text-green-400" />
                  <div className="text-3xl font-bold text-green-400 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
            <br></br>

            <div className="mb-16">
              <h2 className="text-4xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
                Try our Virtual Recycling Dustbin Now!!!
              </h2>
            </div>

            {/* Animated dustbin */}
            <TransparentEcoDustbin
              primaryColor="rgba(45, 55, 72, 0.6)" // Customize primary color
              accentColor="rgba(16, 185, 129, 0.6)" // Customize accent color
              maxCapacity={15}
              sustainabilityGoal={200}
            />

            <br></br>

            <div className="mb-16">
              <h2 className="text-3xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
                What we offer
              </h2>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {[
                {
                  icon: Recycle,
                  title: "Deposit Waste",
                  desc: "Safely dispose of your waste and earn tokens",
                },
                {
                  icon: Leaf,
                  title: "Go Green",
                  desc: "Contribute to a sustainable future",
                },
                {
                  icon: Trophy,
                  title: "Earn Rewards",
                  desc: "Get tokens for your contributions",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="group relative bg-black/50 backdrop-blur-md p-6 rounded-xl border border-green-500/30 hover:border-green-400/60 transition-all hover:scale-105"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-blue-400/10 rounded-xl opacity-0 group-hover:opacity-100 transition-all" />
                  <div className="relative">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-400/10 mb-4 group-hover:scale-110 transition-transform">
                      <item.icon className="h-6 w-6 text-green-400" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-green-400">
                      {item.title}
                    </h3>
                    <p className="text-gray-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Impact Section */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
                Our Environmental Impact
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    icon: Globe,
                    title: "Global Reach",
                    desc: "Operating in 20+ countries worldwide",
                  },
                  {
                    icon: BadgeCheck,
                    title: "Certified Impact",
                    desc: "Verified environmental contributions",
                  },
                  {
                    icon: Sparkles,
                    title: "Innovation",
                    desc: "Using blockchain for transparency",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="bg-black/30 p-6 rounded-xl border border-green-500/30 hover:border-green-400/60 transition-all hover:scale-105"
                  >
                    <item.icon className="h-8 w-8 text-green-400 mb-4" />
                    <h3 className="text-xl font-semibold mb-2 text-green-400">
                      {item.title}
                    </h3>
                    <p className="text-gray-400">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {[
                {
                  icon: Handshake,
                  title: "Our waste management collaborators",
                  desc: "These guys came forward to help in waste collection",
                },
                {
                  icon: Coins,
                  title: "NFTs and Coins",
                  desc: "Get rewarded in NFTs and earn it",
                },
                {
                  icon: TreeDeciduousIcon,
                  title: "Help nature",
                  desc: "Make environment cleaner and greener",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="group relative bg-black/50 backdrop-blur-md p-6 rounded-xl border border-green-500/30 hover:border-green-400/60 transition-all hover:scale-105"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-blue-400/10 rounded-xl opacity-0 group-hover:opacity-100 transition-all" />
                  <div className="relative">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-400/10 mb-4">
                      <item.icon className="h-6 w-6 text-green-400" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-green-400">
                      {item.title}
                    </h3>
                    <p className="text-gray-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <br></br>
            <br></br>

            {/* Contact Form Section */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
                Submit your waste and earn in Tokens now!!!
              </h2>
            </div>

            <div className="bg-transparent">
              <WasteConverter />
            </div>
          </main>
          {showKnowledge && (
            <KnowledgeBase onClose={() => setShowKnowledge(false)} />
          )}
          <br></br>
          <br></br>
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
              Love it!!! Hear what people says about us!!!
            </h2>
          </div>
          <CyberpunkFeedback />

         {/* <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-8">
            <div className="max-w-6xl mx-auto">
              <div className="mb-12 text-center">
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center space-y-4"
                >
                  <div className="p-4 bg-cyan-500/10 rounded-full">
                    <Trash2 className="w-16 h-16 text-cyan-400" />
                  </div>
                  <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-600">
                    Smart Waste Management
                  </h1>
                  <p className="text-xl text-gray-400 max-w-2xl">
                    Monitor real-time waste levels across your city
                  </p>
                </motion.div>
              </div>

              <LevelSensing />
            </div>
          </div> */}

          <footer className="relative bg-black/50 backdrop-blur-md border-t border-green-500/30 mt-12">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <p className="text-base text-green-400/60">
                  © 2024 EcoRewards. All rights reserved.
                </p>
              </div>
            </div>
          </footer>
        </div>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
