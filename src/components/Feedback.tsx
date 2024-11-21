import React, { useEffect, useState } from "react";
import { Star, User } from "lucide-react";

interface Feedback {
  id: number;
  name: string;
  message: string;
  rating: number;
}

const CyberpunkFeedback: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([
    {
      id: 1,
      name: "Neo",
      message:
        "This app is absolutely stunning! A must-have for any cyberpunk fan.",
      rating: 5,
    },
    {
      id: 2,
      name: "Trinity",
      message: "Incredible visuals and seamless functionality. I'm hooked!",
      rating: 5,
    },
    {
      id: 3,
      name: "Morpheus",
      message:
        "An essential tool in the digital age. Can't imagine life without it.",
      rating: 5,
    },
    {
      id: 4,
      name: "Reviewer",
      message:
        "I've been using the Waste2Token app for a few months now, and I must say, it's been a game-changer in my daily life.",
      rating: 5,
    },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setFeedbacks((prevFeedbacks) => {
        const updatedFeedbacks = [...prevFeedbacks];
        const firstFeedback = updatedFeedbacks.shift();
        if (firstFeedback) updatedFeedbacks.push(firstFeedback);
        return updatedFeedbacks;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center items-center bg-black">
      <div className="relative overflow-hidden w-full max-w-4xl h-60">
        <div className="flex space-x-4 animate-slide-left">
          {feedbacks.map((feedback) => (
            <div
              key={feedback.id}
              className="flex items-center space-x-4 w-80 border-2 border-cyan-500 bg-black text-white p-6 rounded-lg"
            >
              <User className="w-6 h-6 text-cyan-500" />
              <div>
                <h3 className="text-lg font-bold text-cyan-400">
                  {feedback.name}
                </h3>
                <p className="text-sm">{feedback.message}</p>
                <div className="flex space-x-1">
                  {[...Array(feedback.rating)].map((_, index) => (
                    <Star key={index} className="w-4 h-4 text-yellow-500" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CyberpunkFeedback;
