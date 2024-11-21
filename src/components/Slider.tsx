import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Sample AI-generated waste management images (placeholders)
const wasteManagementImages = [
  {
    id: 1,
    title: "Automated Sorting Facility",
    description:
      "AI-powered waste sorting system using advanced robotics and computer vision",
    src: "FPSX3a0d3d07f1ef4058b8fd8b2c7e4e7e2f",
  },
  {
    id: 2,
    title: "Smart Recycling Bin",
    description:
      "IoT-enabled recycling bin with real-time waste classification and compaction",
    src: "/api/placeholder/800/600?text=Smart+Recycling+Bin",
  },
  {
    id: 3,
    title: "Urban Waste Mapping",
    description:
      "Predictive analytics for optimal waste collection routes and scheduling",
    src: "/api/placeholder/800/600?text=Waste+Management+Analytics",
  },
  {
    id: 4,
    title: "Circular Economy Visualization",
    description: "AI-driven waste-to-resource transformation process",
    src: "/api/placeholder/800/600?text=Circular+Economy+Model",
  },
];

const WasteManagementImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextSlide = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(
        (prevIndex) => (prevIndex + 1) % wasteManagementImages.length
      );
      setIsTransitioning(false);
    }, 300);
  };

  const prevSlide = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? wasteManagementImages.length - 1 : prevIndex - 1
      );
      setIsTransitioning(false);
    }, 300);
  };

  const currentImage = wasteManagementImages[currentIndex];

  return (
    <div className="relative w-full h-[70vh] mx-auto">
      {/* Main Image Container with 3D Transformation */}
      <div
        className={`
          relative w-full h-full overflow-hidden 
          perspective-1000 transition-all duration-300 ease-in-out
          ${isTransitioning ? "scale-95 rotate-y-15" : "scale-100 rotate-y-0"}
        `}
      >
        {/* Image */}
        <img
          src={currentImage.src}
          alt={currentImage.title}
          className="absolute inset-0 w-full h-full object-contain"
        />

        {/* Overlay Information */}
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
          <h2 className="text-2xl font-bold">{currentImage.title}</h2>
          <p className="text-sm">{currentImage.description}</p>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="absolute top-1/2 left-0 right-0 flex justify-between transform -translate-y-1/2 px-4">
        <button
          onClick={prevSlide}
          className="
            bg-blue-500 text-white p-2 rounded-full 
            hover:bg-blue-600 transition-colors
            flex items-center justify-center
          "
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="
            bg-blue-500 text-white p-2 rounded-full 
            hover:bg-blue-600 transition-colors
            flex items-center justify-center
          "
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Pagination Dots */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {wasteManagementImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`
              w-3 h-3 rounded-full 
              ${index === currentIndex ? "bg-blue-500" : "bg-gray-300"}
              transition-colors
            `}
          />
        ))}
      </div>
    </div>
  );
};

export default WasteManagementImageSlider;
