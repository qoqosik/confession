import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Cassette from './components/Cassette';
import LoveLetter from './components/LoveLetter';
import { MUSIC_URL } from './constants';

const App: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize audio object
    audioRef.current = new Audio(MUSIC_URL);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.6;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      // User interaction allows playing audio
      audioRef.current.play().catch(e => console.error("Audio play failed:", e));
      setIsPlaying(true);
      if (!hasStarted) setHasStarted(true);
    }
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-gradient-to-b from-[#f0fdf4] via-[#ecfdf5] to-[#ccfbf1]">
      
      {/* Main Container */}
      <motion.main 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="relative z-10 flex flex-col items-center justify-start min-h-screen pt-12 sm:pt-20"
      >
        
        {/* Header / Title (Subtle) */}
        <motion.h1 
          className="font-['Inter'] font-light text-4xl sm:text-5xl text-emerald-900/80 mb-8 sm:mb-12 drop-shadow-sm px-4 text-center tracking-tight"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          For you...
        </motion.h1>

        {/* Cassette Tape */}
        <div className="w-full px-4 mb-8">
          <Cassette isPlaying={isPlaying} onTogglePlay={togglePlay} />
        </div>

        {/* Confession Text Area */}
        <div className="w-full relative z-20">
           {/* Only start rendering the LoveLetter component logic after first play click to handle delays correctly */}
          {hasStarted && <LoveLetter isVisible={true} />}
        </div>
        
        {/* Bottom Spacer */}
        <div className="h-24"></div>

      </motion.main>
      
      {/* Vignette Overlay for cinematic feel (Green tinted) */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(6,78,59,0.1)_100%)] z-0"></div>
    </div>
  );
};

export default App;