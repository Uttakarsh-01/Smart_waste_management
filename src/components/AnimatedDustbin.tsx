import React, { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import {
  Leaf,
  Recycle,
  TreePine,
  Trash2,
  Globe,
  Battery,
  Cloud,
  CheckCircle2,
} from "lucide-react";

// Waste Type Definitions
type WasteType = "Plastic" | "Paper" | "Metal" | "Glass" | "Electronic";

interface WasteItem {
  id: string;
  type: WasteType;
  weight: number;
  carbonImpact: number;
}

interface EcoSmartDustbinProps {
  maxCapacity?: number;
  sustainabilityGoal?: number;
  primaryColor?: string;
  accentColor?: string;
}

const WASTE_TYPE_CONFIG: Record<
  WasteType,
  { color: string; icon: React.ReactNode }
> = {
  Plastic: {
    color: "#3498DB",
    icon: <Trash2 color="#3498DB" />,
  },
  Paper: {
    color: "#2ECC71",
    icon: <Leaf color="#2ECC71" />,
  },
  Metal: {
    color: "#34495E",
    icon: <Battery color="#34495E" />,
  },
  Glass: {
    color: "#8E44AD",
    icon: <Cloud color="#8E44AD" />,
  },
  Electronic: {
    color: "#E74C3C",
    icon: <Recycle color="#E74C3C" />,
  },
};

const TransparentEcoDustbin: React.FC<EcoSmartDustbinProps> = ({
  maxCapacity = 10,
  sustainabilityGoal = 100,
  primaryColor = "rgba(45, 55, 72, 0.8)", // Transparent dark color
  accentColor = "rgba(16, 185, 129, 0.8)", // Transparent green
}) => {
  const [wasteItems, setWasteItems] = useState<WasteItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [sustainabilityScore, setSustainabilityScore] = useState(0);
  const [isRecycling, setIsRecycling] = useState(false);

  const binContainerRef = useRef<HTMLDivElement>(null);
  const binBodyControls = useAnimation();
  const binLidControls = useAnimation();
  const recycleButtonControls = useAnimation();

  // Compute total environmental impact
  const totalCarbonReduction = wasteItems.reduce(
    (sum, item) => sum + item.carbonImpact,
    0
  );

  // Add waste item with smart sorting
  const addWasteItem = useCallback(
    (type: WasteType) => {
      if (wasteItems.length >= maxCapacity) {
        alert("Bin is full! Please recycle existing items.");
        return;
      }

      const newItem: WasteItem = {
        id: `waste-${Date.now()}`,
        type,
        weight: Math.random() * 2,
        carbonImpact: Math.random() * 5,
      };

      setWasteItems((prev) => [...prev, newItem]);
      updateSustainabilityScore(newItem);
    },
    [wasteItems, maxCapacity]
  );

  // Update sustainability score
  const updateSustainabilityScore = useCallback(
    (item: WasteItem) => {
      const scoreIncrease = item.carbonImpact * 10;
      setSustainabilityScore((prev) =>
        Math.min(prev + scoreIncrease, sustainabilityGoal)
      );
    },
    [sustainabilityGoal]
  );

  // Recycle all items with 3D animation
  const recycleAllItems = useCallback(async () => {
    if (wasteItems.length === 0) return;

    setIsRecycling(true);

    // Animate bin lid
    await binLidControls.start({
      rotateX: -140,
      transition: { duration: 0.5 },
    });

    // Animate bin body (shaking/recycling effect)
    await binBodyControls.start({
      rotate: [0, -5, 5, -5, 5, 0],
      transition: { duration: 0.5 },
    });

    // Calculate recycled score
    const recycledScore = wasteItems.reduce(
      (sum, item) => sum + item.carbonImpact * 20,
      0
    );
    setSustainabilityScore((prev) =>
      Math.min(prev + recycledScore, sustainabilityGoal)
    );

    // Clear waste items
    setWasteItems([]);

    // Reset lid and body
    await Promise.all([
      binLidControls.start({ rotateX: 0 }),
      binBodyControls.start({ rotate: 0 }),
    ]);

    setIsRecycling(false);
  }, [wasteItems, sustainabilityGoal, binLidControls, binBodyControls]);

  // Sustainability goal tracking
  const progressPercentage = (sustainabilityScore / sustainabilityGoal) * 100;

  return (
    <motion.div
      className="eco-smart-dustbin container mx-auto p-6"
      style={{
        maxWidth: "600px",
        perspective: "1000px",
        background: "transparent",
      }}
    >
      {/* 3D Dustbin Container */}
      <motion.div
        ref={binContainerRef}
        animate={binBodyControls}
        className="dustbin-wrapper relative rounded-2xl p-6 shadow-xl"
        style={{
          background: primaryColor,
          backdropFilter: "blur(10px)",
          transformStyle: "preserve-3d",
          transform: "rotateX(-10deg) rotateY(10deg)",
          borderRadius: "1rem",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
        whileHover={{
          scale: 1.05,
          rotate: [0, -2, 2, 0],
        }}
        transition={{ duration: 0.5 }}
      >
        {/* 3D Lid Mechanism */}
        <motion.div
          animate={binLidControls}
          className="lid absolute top-0 left-0 right-0 h-16 rounded-t-2xl cursor-pointer"
          style={{
            background: accentColor,
            backdropFilter: "blur(10px)",
            transformOrigin: "top center",
            transform: "translateZ(40px)",
            border: "1px solid rgba(255,255,255,0.2)",
          }}
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex justify-center items-center h-full">
            <Recycle color="white" size={32} />
          </div>
        </motion.div>

        {/* Waste Collection Area */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="waste-collection mt-20 bg-white/80 rounded-xl p-4 min-h-[200px]"
              style={{
                transform: "translateZ(30px)",
                backdropFilter: "blur(5px)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <div className="waste-grid grid grid-cols-3 gap-3">
                {wasteItems.map((item) => (
                  <motion.div
                    key={item.id}
                    className="waste-item flex flex-col items-center p-2 rounded-lg"
                    style={{
                      backgroundColor:
                        WASTE_TYPE_CONFIG[item.type].color + "20",
                      transform: "translateZ(20px)",
                    }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                  >
                    {WASTE_TYPE_CONFIG[item.type].icon}
                    <span className="text-xs mt-1">{item.type}</span>
                    <span className="text-xs">{item.weight.toFixed(2)} kg</span>
                  </motion.div>
                ))}
              </div>
              {wasteItems.length === 0 && (
                <div className="text-center text-gray-400 py-10">
                  No waste collected
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sustainability Progress */}
        <div
          className="sustainability-progress mt-4"
          style={{ transform: "translateZ(20px)" }}
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-white">Sustainability Goal</span>
            <span className="text-white">
              {sustainabilityScore.toFixed(0)}/{sustainabilityGoal}
            </span>
          </div>
          <div className="bg-white/20 rounded-full h-4 overflow-hidden">
            <motion.div
              className="bg-green-500 h-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <div
        className="action-buttons grid grid-cols-3 gap-4 mt-6"
        style={{ transform: "translateZ(20px)" }}
      >
        {(Object.keys(WASTE_TYPE_CONFIG) as WasteType[]).map((type) => (
          <motion.button
            key={type}
            onClick={() => addWasteItem(type)}
            className="btn flex flex-col items-center justify-center p-3 rounded-xl hover:shadow-lg transition-all"
            style={{
              backgroundColor: WASTE_TYPE_CONFIG[type].color + "20",
              backdropFilter: "blur(5px)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {WASTE_TYPE_CONFIG[type].icon}
            <span className="text-xs mt-2">{type}</span>
          </motion.button>
        ))}
      </div>

      {/* Recycle All Button */}
      <motion.button
        animate={recycleButtonControls}
        onClick={recycleAllItems}
        disabled={wasteItems.length === 0 || isRecycling}
        className={`
          w-full mt-6 p-4 rounded-2xl flex items-center justify-center 
          ${
            wasteItems.length > 0 && !isRecycling
              ? "bg-green-500/80 hover:bg-green-600/80 text-white"
              : "bg-gray-300/50 text-gray-500 cursor-not-allowed"
          }
        `}
        style={{
          backdropFilter: "blur(5px)",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
        whileHover={{ scale: wasteItems.length > 0 && !isRecycling ? 1.02 : 1 }}
        whileTap={{ scale: wasteItems.length > 0 && !isRecycling ? 0.98 : 1 }}
      >
        <CheckCircle2 className="mr-2" />
        {isRecycling ? "Recycling..." : "Recycle All Items"}
      </motion.button>

      {/* Environmental Impact Summary */}
      <motion.div
        className="environmental-impact mt-6 bg-green-50/50 p-4 rounded-xl"
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
        style={{
          transform: "translateZ(20px)",
          backdropFilter: "blur(5px)",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <div className="grid grid-cols-2 gap-4 text-center bg-black">
          <div className="flex flex-col items-center">
            <TreePine size={32} className="text-green-600" />
            <span className="text-sm mt-2">Trees Saved</span>
            <span className="font-bold">
              {Math.floor(totalCarbonReduction / 2)}
            </span>
          </div>
          <div className="flex flex-col items-center">
            <Globe size={32} className="text-blue-600" />
            <span className="text-sm mt-2">CO2 Reduced</span>
            <span className="font-bold">
              {totalCarbonReduction.toFixed(2)} kg
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TransparentEcoDustbin;
