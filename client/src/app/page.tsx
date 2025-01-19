'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Home() {
  const [roomId, setRoomId] = useState("");
  const [isSlapping, setIsSlapping] = useState(false);
  const [hoveredMeme, setHoveredMeme] = useState<number | null>(null);
  const router = useRouter();

  const handleJoinRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (roomId.trim()) {
      setIsSlapping(true);
      setTimeout(() => router.push(`/call/${roomId}`), 800);
    }
  };
  

  const handleCreateRoom = () => {
    setIsSlapping(true);
    const newRoomId = Math.random().toString(36).substring(7);
    setTimeout(() => router.push(`/call/${newRoomId}`), 800);
  };

  const funnyPlaceholders = [
    "Enter secret slap code...",
    "How can she slap?! 👋",
    "Batman slap meme room...",
    "Will Smith Oscar moment...",
    "Type 'EMOTIONAL DAMAGE'...",
  ];

  const memeCards = [
    {
      emoji: "🎯",
      text: "Slap like your WiFi depends on it!",
      memeText: "HOW CAN SHE SLAP?!",
      image: "/memes/how-can-she-slap.jpg"
    },
    {
      emoji: "🏆",
      text: "First to 5 slaps gets bragging rights forever",
      memeText: "EMOTIONAL DAMAGE!",
      image: "/memes/emotional-damage.jpg"
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 text-center">
        {/* Title with Slap Animation */}
        <motion.div 
          className="space-y-4"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className="text-7xl relative"
            animate={isSlapping ? {
              x: [0, -100, 100, 0],
              rotate: [0, -45, 45, 0],
            } : {
              y: [0, -10, 0],
            }}
            transition={isSlapping ? {
              duration: 0.5,
              times: [0, 0.2, 0.5, 0.8]
            } : {
              repeat: Infinity,
              duration: 2
            }}
          >
            <span className="absolute top-0 left-1/2 -translate-x-1/2">👋</span>
            <span className="opacity-0">.</span>
          </motion.div>
          
          <motion.h1 
            className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-yellow-500"
            whileHover={{ scale: 1.05 }}
          >
            The Slappening™
          </motion.h1>
          <p className="text-gray-400 text-lg">
            KEEP MY WIFI&apos;S NAME OUT OF YOUR MOUTH! 🎭
          </p>
        </motion.div>

        {/* Game Actions */}
        <motion.div 
          className="bg-black/20 backdrop-blur-sm p-6 rounded-xl border border-gray-800 space-y-6"
          whileHover={{ boxShadow: "0 0 20px rgba(255,0,0,0.1)" }}
        >
          <Button 
            onClick={handleCreateRoom}
            className="w-full h-12 bg-gradient-to-r from-red-500 to-yellow-500 hover:from-red-600 hover:to-yellow-600 
                     text-white font-bold text-lg group relative overflow-hidden"
          >
            <span className="group-hover:animate-pulse">
              Start The Violence! 🚀
            </span>
          </Button>

          <div className="flex items-center gap-2">
            <div className="h-px bg-gray-800 flex-1" />
            <span className="text-gray-500 text-sm">or join the chaos</span>
            <div className="h-px bg-gray-800 flex-1" />
          </div>

          <form onSubmit={handleJoinRoom} className="space-y-3">
            <Input
              type="text"
              placeholder={funnyPlaceholders[Math.floor(Math.random() * funnyPlaceholders.length)]}
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              className="bg-gray-900/50 border-gray-800 text-white placeholder-gray-500 h-12"
            />
            <Button 
              type="submit" 
              variant="ghost"
              className="w-full h-12 border border-gray-800 hover:bg-gray-800 text-gray-400 hover:text-white
                       transition-all duration-300"
              disabled={!roomId.trim()}
            >
              Infiltrate Room 🥷
            </Button>
          </form>
        </motion.div>

        {/* Meme Cards */}
        <div className="grid grid-cols-2 gap-4 text-center">
          {memeCards.map((card, index) => (
            <motion.div 
              key={index}
              className="relative bg-black/20 p-4 rounded-lg border border-gray-800 overflow-hidden"
              whileHover={{ scale: 1.05 }}
              onHoverStart={() => setHoveredMeme(index)}
              onHoverEnd={() => setHoveredMeme(null)}
            >
              <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: hoveredMeme === index ? 0 : 1 }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-3xl mb-2">{card.emoji}</div>
                <p className="text-gray-400 text-sm">
                  {card.text}
                </p>
              </motion.div>
              
              <motion.div
                className="absolute inset-0 flex items-center justify-center bg-black/80"
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredMeme === index ? 1 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <p className="text-yellow-400 font-bold text-lg">
                  {card.memeText}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Meme Disclaimers */}
        <div className="space-y-2">
          <p className="text-gray-500 text-xs italic">
            Warning: May cause uncontrollable laughter and mild ego bruising
          </p>
          <motion.p 
            className="text-gray-600 text-xs"
            animate={{ color: ['#4B5563', '#EF4444', '#4B5563'] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Side effects: EMOTIONAL DAMAGE! 💥
          </motion.p>
        </div>
      </div>
    </main>
  );
}
