import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router'; // useNavigate нэмэв
import { Volume2, VolumeX, ArrowLeft } from 'lucide-react'; // ArrowLeft икон нэмэв

export default function BreathingExercise() {
  const navigate = useNavigate(); // Чиглүүлэгч функц
  const [isInhale, setIsInhale] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsInhale((prev) => !prev);
    }, 4000);
    
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current.play().catch(err => console.log("Дуу тоглуулахад алдаа гарлаа."));
    }

    return () => clearInterval(interval);
  }, []);

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(audioRef.current.muted);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#805AF5] via-[#A78BFA] to-[#F1EAFF] overflow-hidden font-sans relative">
      
      {/* ДАЛД ХӨГЖИМ ТОГЛУУЛАГЧ */}
      <audio 
        ref={audioRef}
        src="/src/app/assets/duu.mp4" 
        loop 
      />

      {/* ЗҮҮН ДЭЭД: Буцах товчлуур */}
      <button 
        onClick={() => navigate('/')} 
        className="absolute top-10 left-10 z-30 p-3 bg-white/20 backdrop-blur-md rounded-full text-white border border-white/30 hover:bg-white/30 transition-colors"
      >
        <ArrowLeft size={24} />
      </button>

      {/* БАРУУН ДЭЭД: Дууны удирдлага */}
      <button 
        onClick={toggleMute}
        className="absolute top-10 right-10 z-30 p-3 bg-white/20 backdrop-blur-md rounded-full text-white border border-white/30 hover:bg-white/30 transition-colors"
      >
        {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
      </button>

      {/* --- АРЫН ЧИМЭГЛЭЛ --- */}
      <motion.div 
        className="absolute top-16 left-1/4 opacity-80"
        animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg width="80" height="80" viewBox="0 0 100 100">
          <path d="M 50,20 A 30,30 0 1 1 20,50 A 25,25 0 1 0 50,20 Z" fill="#FFFE91" />
        </svg>
      </motion.div>

      {/* Одод */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ top: `${15 + i * 15}%`, left: `${Math.random() * 90}%` }}
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ duration: 2 + i, repeat: Infinity }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24">
            <path d="M12 0L14 9L24 12L14 15L12 24L10 15L0 12L10 9L12 0Z" fill="white" />
          </svg>
        </motion.div>
      ))}

      {/* --- ҮНДСЭН КОМПОНЕНТ --- */}
      <div className="relative w-80 h-80 flex items-center justify-center">
        <motion.div
          animate={{ 
            scale: isInhale ? 1.15 : 1, 
            y: [0, -15, 0] 
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="relative z-10"
        >
          <svg width="180" height="220" viewBox="0 0 140 180" className="drop-shadow-2xl">
            <path d="M 15,75 C 15,5 135,5 135,75 L 135,175 Q 115,195 95,170 Q 75,145 55,170 Q 35,195 15,175 Z" fill="#E9D5FF" />
            <circle cx="45" cy="105" r="9" fill="#FF9CEE" opacity="0.7" />
            <circle cx="105" cy="105" r="9" fill="#FF9CEE" opacity="0.7" />
            <g fill="none" stroke="#633BB7" strokeWidth="5" strokeLinecap="round">
              <path d="M 40,95 Q 55,108 70,95" />
              <path d="M 80,95 Q 95,108 110,95" />
            </g>
            <path d="M 70,115 Q 75,122 80,115" fill="none" stroke="#633BB7" strokeWidth="3.5" strokeLinecap="round" />
          </svg>
          
          <motion.div 
            className="w-28 h-3 bg-black/10 rounded-full mx-auto mt-8 blur-lg"
            animate={{ scale: isInhale ? 1.5 : 1, opacity: isInhale ? 0.1 : 0.3 }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>

      {/* Текст заавар */}
      <div className="mt-16 text-center z-20">
        <AnimatePresence mode="wait">
          <motion.h2
            key={isInhale ? 'inhale' : 'exhale'}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="text-white text-3xl font-black tracking-tight"
          >
            {isInhale ? 'Амьсгал аваарай...' : 'Амьсгалаа гаргаарай...'}
          </motion.h2>
        </AnimatePresence>
        
        <motion.p 
          className="text-white/60 text-sm mt-4 font-bold uppercase tracking-[0.3em]"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Гүн амьсгал...
        </motion.p>
      </div>
    </div>
  );
}