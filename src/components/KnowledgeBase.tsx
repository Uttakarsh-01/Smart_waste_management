import React from "react";
import { X } from "lucide-react";

interface KnowledgeBaseProps {
  onClose: () => void;
}

export function KnowledgeBase({ onClose }: KnowledgeBaseProps) {
  const articles = [
    {
      title: "Types of Waste",
      content: `Waste can be classified into several categories:
      
• Biodegradable waste: Food and kitchen waste, green waste, paper
• Recyclable materials: Paper, glass, bottles, cans, metals, certain plastics
• Inert waste: Construction and demolition waste, dirt, rocks
• Electrical and electronic waste (e-waste): Old computers, phones, TVs
• Hazardous waste: Industrial waste, toxic waste, radioactive waste, hospital waste
• Organic waste: Animal and plant waste`,
    },
    {
      title: "The 3 R's of Waste Management",
      content: `The waste hierarchy consists of 3 R's:

• Reduce: Minimize waste generation by consuming less and choosing products with less packaging
• Reuse: Use items multiple times or repurpose them for different uses
• Recycle: Convert waste materials into new products`,
    },
    {
      title: "Impact on Environment",
      content: `Improper waste management can lead to:

• Soil contamination
• Water pollution
• Air pollution
• Climate change through greenhouse gas emissions
• Harm to wildlife and ecosystems
• Public health issues`,
    },
    {
      title: "Recycling",
      content: `Recycling enables waste products to be converted and reprocessed into new products. 
      Not only does this save on natural resources, but it also reduces energy consumption,
       the cost of producing new materials and the amount of greenhouse gases released.
      From wood and plastic to cardboard, aluminium and glass, a wide range of materials can be recycled`,
    },
    {
      title: "Incineration",
      content: `Also known as combustion and thermal treatment, 
      incineration is a waste management method that involves burning solid waste 
      at considerably high temperatures to convert the products into heat, gas and steam.
      Although the majority of materials can be disposed of in this matter, 
      it is typically the most practical method for managing dangerous and perilous waste.
       A concern with this type of waste management solution, however, 
       is that incinerators can produce carbon dioxide, sulphur dioxide and oxides of nitrogen, 
       all of which contribute to the enhancement of the Earth’s greenhouse effect.`,
    },
    {
      title: "Landfill",
      content: `Landfill sites are essentially large holes in the ground designed to be filled with rubbish. 
      However, like combustion, it isn’t the favoured waste management solution because these sites are 
      known to cause many environmental and health issues. For example, chemicals and harmful substances 
      can leak into the surrounding soil, causing significant harm to the environment. Methane, an extremely 
      hazardous greenhouse gas that is 28 times more potent that carbon dioxide, can also be produced as a 
      result of filling landfill sites.`,
    },
  ];

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 overflow-y-auto">

      <div className="relative max-w-4xl mx-auto px-4 py-16">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-green-400/10 text-green-400"
        >
          <X className="h-6 w-6" />
        </button>

        <h2 className="text-3xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
          Waste Management Knowledge Base
        </h2>

        <div className="space-y-8">
          {articles.map((article, index) => (
            <div
              key={index}
              className="bg-black/50 border border-green-500/30 rounded-xl p-6 hover:border-green-400/60 transition-all"
            >
              <h3 className="text-xl font-semibold mb-4 text-green-400">
                {article.title}
              </h3>
              <div className="prose prose-invert prose-green">
                <p className="text-gray-400 whitespace-pre-line">
                  {article.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
