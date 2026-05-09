import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { Volume2, VolumeX, ArrowLeft } from 'lucide-react';

export default function BreathingExercise() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState('inhale');
  const [isMuted, setIsMuted] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current.play().catch(err => console.log("Дуу тоглуулахад алдаа гарлаа."));
    }
  }, []);

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    const t = audioRef.current.currentTime % 16; 

    if (t >= 8 && t < 12) {
      if (phase !== 'exhale') setPhase('exhale');
    } else {
      if (phase !== 'inhale') setPhase('inhale');
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(audioRef.current.muted);
    }
  };

  const displayText = phase === 'inhale' ? 'Амьсгал аваарай...' : 'Амьсгалаа гаргаарай...';
  const scaleTarget = phase === 'inhale' ? 1.15 : 1;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#4C1D95] via-[#7C3AED] to-[#DDD6FE] overflow-hidden font-sans relative">
      
      <audio 
        ref={audioRef}
        src="/src/app/assets/duu.mp4" 
        loop 
        onTimeUpdate={handleTimeUpdate}
      />

      {/* Буцах товчлуур */}
      <button 
        onClick={() => navigate('/')} 
        className="absolute top-10 left-10 z-30 p-3 bg-white/20 backdrop-blur-md rounded-full text-white border border-white/30 hover:bg-white/30 transition-colors shadow-lg"
      >
        <ArrowLeft size={24} />
      </button>

      {/* Дууны удирдлага */}
      <button 
        onClick={toggleMute}
        className="absolute top-10 right-10 z-30 p-3 bg-white/20 backdrop-blur-md rounded-full text-white border border-white/30 hover:bg-white/30 transition-colors shadow-lg"
      >
        {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
      </button>

      {/* --- АРЫН ФОН: САР --- */}
      <motion.div 
        className="absolute top-20 left-1/4 z-0 drop-shadow-[0_0_40px_rgba(253,224,71,0.6)]"
        animate={{ 
          y: [0, -10, 0], 
          scale: [1, 1.05, 1],
          opacity: [0.8, 1, 0.8]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg width="120" height="120" viewBox="0 0 100 100">
          <path d="M 65 15 A 40 40 0 1 0 85 80 A 45 45 0 0 1 65 15 Z" fill="#FEF08A" />
        </svg>
      </motion.div>

      {/* Одод */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute z-0"
          style={{ top: `${10 + (i % 4) * 15}%`, left: `${10 + Math.random() * 80}%` }}
          animate={{ opacity: [0.1, 0.8, 0.1], scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24">
            <path d="M12 0L14 9L24 12L14 15L12 24L10 15L0 12L10 9L12 0Z" fill="white" opacity="0.6" />
          </svg>
        </motion.div>
      ))}

      {/* --- АРЫН ФОН: УУЛС --- */}
      <div className="absolute bottom-0 left-0 w-full z-0 pointer-events-none flex flex-col justify-end h-[40vh]">
        {/* Арын уул */}
        <motion.div 
          className="absolute bottom-0 w-full text-[#6D28D9] opacity-60"
          animate={{ y: [10, 0, 10] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 1440 320" className="w-full h-full preserve-3d" preserveAspectRatio="none">
            <path fill="currentColor" d="M0,160L48,144C96,128,192,96,288,106.7C384,117,480,171,576,170.7C672,171,768,117,864,112C960,107,1056,149,1152,165.3C1248,181,1344,171,1392,165.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </motion.div>

        {/* Урд талын уул */}
        <motion.div 
          className="absolute bottom-0 w-full text-[#4C1D95]"
          animate={{ y: [15, -5, 15] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <svg viewBox="0 0 1440 320" className="w-full h-full preserve-3d" preserveAspectRatio="none">
            <path fill="currentColor" d="M0,224L60,213.3C120,203,240,181,360,186.7C480,192,600,224,720,229.3C840,235,960,213,1080,197.3C1200,181,1320,171,1380,165.3L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
          </svg>
        </motion.div>
      </div>

      {/* --- ҮНДСЭН ДҮР --- */}
      <div className="relative w-80 h-80 flex items-center justify-center z-10 mb-8 mt-10">
        <motion.div
          animate={{ 
            scale: scaleTarget, 
            y: [0, -15, 0] 
          }}
          transition={{ 
            scale: { duration: phase === 'inhale' ? 8 : 4, ease: "easeInOut" }, 
            y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
          className="relative z-10"
        >
          <svg width="180" height="220" viewBox="0 0 140 180" className="drop-shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
            <path d="M 15,75 C 15,5 135,5 135,75 L 135,175 Q 115,195 95,170 Q 75,145 55,170 Q 35,195 15,175 Z" fill="#E9D5FF" />
            <circle cx="45" cy="105" r="9" fill="#FF9CEE" opacity="0.8" />
            <circle cx="105" cy="105" r="9" fill="#FF9CEE" opacity="0.8" />
            <g fill="none" stroke="#633BB7" strokeWidth="5" strokeLinecap="round">
              <path d="M 40,95 Q 55,108 70,95" />
              <path d="M 80,95 Q 95,108 110,95" />
            </g>
            <path d="M 70,115 Q 75,122 80,115" fill="none" stroke="#633BB7" strokeWidth="3.5" strokeLinecap="round" />
          </svg>
          
          <motion.div 
            className="w-28 h-3 bg-black/20 rounded-full mx-auto mt-8 blur-lg"
            animate={{ 
              scale: phase === 'inhale' ? 1.5 : 1, 
              opacity: phase === 'inhale' ? 0.1 : 0.4 
            }}
            transition={{ duration: 4 }}
          />
        </motion.div>
      </div>

      {/* Текст заавар */}
      <div className="text-center z-20 h-24 mt-4">
        <AnimatePresence mode="wait">
          <motion.h2
            key={phase}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="text-white text-3xl font-black tracking-tight drop-shadow-md"
          >
            {displayText}
          </motion.h2>
        </AnimatePresence>
        
        <motion.p 
          className="text-white/80 text-sm mt-4 font-bold uppercase tracking-[0.3em] drop-shadow-sm"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {phase === 'inhale' ? 'Амьсгалаа гүнзгий аваад' : 'Сэтгэлээ тайвшруулаад'}
        </motion.p>
      </div>
    </div>
  );
}