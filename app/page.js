// app/page.js
"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Lock, Music, Volume2, VolumeX } from "lucide-react";

// --- Configuration & Data ---
const SECRET_PASSWORD = "2302"; // Change this to your special date/word
const MUSIC_FILE = "/romantic-song.mp3"; // Ensure this file is in the 'public' folder

const MEMORIES = [
  {
    id: 1,
    date: "January 27, 2025",
    title: "The First Photo I Took",
    description: "Look at you! You light up my life, no words needs to describe how beautiful are you",
    image: "/photo1.jpg", // Placeholders
  },
  {
    id: 2,
    date: "January 31, 2025",
    title: "Our First Photo",
    description: "Getting lost in the city with you was better than finding the destination. Best weekend ever.",
    image: "/photo2.jpg",
  },
  {
    id: 3,
    date: "February 6, 2025",
    title: "It was a stormy day",
    description: "I love that hat :)",
    image: "/photo3.jpg",
  },
  {
    id: 4,
    date: "February 15, 2025",
    title: "",
    description: "",
    image: "/photo4.jpg",
  },
  {
    id: 5,
    date: "February 27, 2025",
    title: "Beer time :)",
    description: "",
    image: "/photo5.jpg",
  },
  {
    id: 6,
    date: "March 28, 2025",
    title: "",
    description: "",
    image: "/photo6.jpg",
  },
  {
    id: 7,
    date: "April 10, 2025",
    title: "",
    description: "",
    image: "/photo7.jpg",
  },
  {
    id: 8,
    date: "April 16, 2025",
    title: "",
    description: "",
    image: "/photo8.jpg",
  },
  {
    id: 9,
    date: "April 23, 2025",
    title: "",
    description: "",
    image: "/photo9.jpg",
  },
  {
    id: 10,
    date: "June 29, 2025",
    title: "",
    description: "",
    image: "/photo10.jpg",
  },
  {
    id: 11,
    date: "July 17, 2025",
    title: "",
    description: "",
    image: "/photo11.jpg",
  },
  {
    id: 12,
    date: "July 25, 2025",
    title: "",
    description: "",
    image: "/photo12.jpg",
  },
  {
    id: 13,
    date: "July 31, 2025",
    title: "",
    description: "",
    image: "/photo13.jpg",
  },
  // Add more memories here...
];

export default function ValentinePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [inputPassword, setInputPassword] = useState("");
  const [error, setError] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  
  // Audio Ref
  const audioRef = useRef(null);

  // Handle Login & Play Music
  const handleLogin = (e) => {
    e.preventDefault();
    if (inputPassword === SECRET_PASSWORD) {
      setIsAuthenticated(true);
      // Play music strictly after user interaction to bypass browser autoplay policy
      if (audioRef.current) {
        audioRef.current.volume = 0.5;
        audioRef.current.play().catch((err) => console.log("Audio playback failed:", err));
      }
    } else {
      setError(true);
      // Shake animation trigger
      setTimeout(() => setError(false), 500);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <main className="min-h-screen bg-pink-50 text-slate-800 font-sans overflow-x-hidden">
      {/* Hidden Audio Element */}
      <audio ref={audioRef} loop src={MUSIC_FILE} />

      <AnimatePresence mode="wait">
        {!isAuthenticated ? (
          /* --- LOGIN SCREEN --- */
          <motion.div
            key="login"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-pink-400 to-rose-600 p-4"
          >
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className={`bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center ${error ? 'animate-shake' : ''}`}
            >
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-pink-100 rounded-full">
                  <Lock className="w-8 h-8 text-pink-500" />
                </div>
              </div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">Locked Heart 🔒</h1>
              <p className="text-gray-500 mb-6 text-sm">Enter the date we first say love you (DDMM)</p>
              
              <form onSubmit={handleLogin} className="space-y-4">
                <input 
                  type="password"

value={inputPassword}
                  onChange={(e) => setInputPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border-2 border-pink-100 focus:border-pink-500 focus:outline-none transition-all text-center text-lg tracking-widest"
                  placeholder="••••"
                />
                <button 
                  type="submit"
                  className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 rounded-lg transition-colors shadow-lg shadow-pink-500/30"
                >
                  Unlock Memories
                </button>
              </form>
              {error && <p className="text-red-500 text-xs mt-3">Wrong password, try again my love!</p>}
            </motion.div>
          </motion.div>
        ) : (
          /* --- TIMELINE CONTENT --- */
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            {/* Sticky Music Control */}
            <div className="fixed top-4 right-4 z-40">
              <button 
                onClick={toggleMute}
                className="bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-md hover:bg-white transition-all text-pink-600"
              >
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>
            </div>

            {/* Header */}
            <header className="py-20 text-center px-4">
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Heart className="w-16 h-16 text-pink-500 mx-auto mb-4 fill-pink-500 animate-pulse" />
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Our Journey</h1>
                <p className="text-lg text-gray-600 max-w-lg mx-auto">
                  Every moment with you is a treasure I want to keep forever.
                </p>
              </motion.div>
            </header>

            {/* Timeline */}
            <div className="max-w-3xl mx-auto px-4 pb-32 relative">
              {/* Vertical Line */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-pink-200 -ml-0.5 md:ml-0"></div>

              {MEMORIES.map((memory, index) => (
                <TimelineItem key={memory.id} data={memory} index={index} />
              ))}
            </div>
            
            <footer className="text-center py-10 text-gray-400 text-sm">
              Made with ❤️ specifically for you
            </footer>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Shake Animation Style
      <style jsx global>{
       
      }</style> */}
    </main>
  );
}

// Sub-component for clean code
function TimelineItem({ data, index }) {
  const isEven = index % 2 === 0;
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`relative flex items-center mb-12 md:mb-24 ${
        isEven ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      {/* Heart Icon on Line */}
      <div className="absolute left-4 md:left-1/2 w-8 h-8 bg-pink-500 rounded-full border-4 border-white flex items-center justify-center z-10 -ml-4 md:ml-[-1rem]">
        <Heart size={14} className="text-white fill-white" />
      </div>

      {/* Spacer for Desktop Layout */}
      <div className="hidden md:block w-1/2" />

{/* Content Card */}
      <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${isEven ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left"}`}>
        <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-pink-50 group">
          <span className="inline-block px-3 py-1 bg-pink-100 text-pink-600 rounded-full text-xs font-semibold mb-3">
            {data.date}
          </span>
          <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-pink-600 transition-colors">
            {data.title}
          </h3>
          <p className="text-gray-600 mb-4 leading-relaxed">
            {data.description}
          </p>
          {data.image && (
            <div className="overflow-hidden rounded-lg">
               <img 
                 src={data.image} 
                 alt={data.title} 
                 className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-500" 
               />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}