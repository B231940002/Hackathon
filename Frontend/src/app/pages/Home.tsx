import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import {
  Bell,
  PhoneCall,
  Smile,
  Cloud,
  Home as HomeIcon,
  HeartHandshake,
  MessageCircle,
  ChevronRight,
  MapPin,
} from 'lucide-react';
import { motion } from 'motion/react';

// --- Маш Хөөрхөн, Ид шидийн Сүнс (Арын нил ягаан дугуйг хассан) ---
const KawaiiGhost = ({ sizeClass = "w-[120px] h-[120px]" }: any) => (
  <div className={`relative flex items-center justify-center ${sizeClass}`}>
    {/* Арын нил ягаан гэрэлтэлтийг эндээс хассан */}
    <motion.svg
      viewBox="0 0 200 240"
      className="relative z-10 w-full h-full drop-shadow-xl overflow-visible"
      animate={{ y: [0, -10, 0], rotate: [0, 3, -2, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
    >
      {/* Ид шидийн саваа */}
      <motion.g
        transform="translate(15, 80)"
        animate={{ rotate: [0, -12, 0], transformOrigin: "20px 85px" }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <circle cx="30" cy="30" r="25" fill="#FEF08A" opacity="0.5" filter="blur(5px)" />
        <line x1="30" y1="35" x2="10" y2="95" stroke="#FBBF24" strokeWidth="6" strokeLinecap="round" />
        <path
          d="M 30,10 L 36,22 L 49,24 L 39,33 L 42,46 L 30,40 L 18,46 L 21,33 L 11,24 L 24,22 Z"
          fill="#FDE047"
          stroke="#EAB308"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M 0,15 L 10,15 M 5,10 L 5,20" stroke="#FBBF24" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 50,5 L 56,5 M 53,2 L 53,8" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" />
      </motion.g>

      {/* Сүнсний бие ба нүүр */}
      <g transform="translate(30, 15)">
        <path 
          d="M 15,75 C 15,5 135,5 135,75 L 135,175 Q 115,195 95,170 Q 75,145 55,170 Q 35,195 15,175 Z" 
          fill="#E9D5FF" 
        />
        <path d="M 25,120 Q 5,120 12,145" fill="none" stroke="#E9D5FF" strokeWidth="14" strokeLinecap="round" />
        <path d="M 125,120 Q 145,110 138,135" fill="none" stroke="#E9D5FF" strokeWidth="14" strokeLinecap="round" />
        <ellipse cx="45" cy="105" rx="12" ry="6" fill="#FF9CEE" opacity="0.8" />
        <ellipse cx="105" cy="105" rx="12" ry="6" fill="#FF9CEE" opacity="0.8" />
        <circle cx="55" cy="88" r="12" fill="#1E1B4B" />
        <circle cx="95" cy="88" r="12" fill="#1E1B4B" />
        <circle cx="51" cy="84" r="4.5" fill="#FFFFFF" />
        <circle cx="58" cy="91" r="1.5" fill="#FFFFFF" />
        <circle cx="91" cy="84" r="4.5" fill="#FFFFFF" />
        <circle cx="98" cy="91" r="1.5" fill="#FFFFFF" />
        <path 
          d="M 70,100 Q 75,108 80,100" 
          fill="none" 
          stroke="#1E1B4B" 
          strokeWidth="4.5" 
          strokeLinecap="round" 
        />
      </g>
    </motion.svg>
  </div>
);

interface HomeProps {
  onSOSClick: () => void;
}

type FillState = 'idle' | 'filling' | 'completed';

export default function Home({ onSOSClick }: HomeProps) {
  const navigate = useNavigate();
  const [fillState, setFillState] = useState<FillState>('idle');
  const pressTimeout = useRef<number | null>(null);

  const CIRCUMFERENCE = 515.22;

  const handlePressStart = (e: React.PointerEvent<HTMLButtonElement>) => {
    e.preventDefault(); 
    if (fillState === 'completed') return;

    setFillState('filling');
    pressTimeout.current = window.setTimeout(() => {
      setFillState('completed');
      onSOSClick();
    }, 3000); 
  };

  const handlePressEnd = () => {
    if (pressTimeout.current) {
      clearTimeout(pressTimeout.current);
      pressTimeout.current = null;
    }
    if (fillState !== 'completed') {
      setFillState('idle');
    }
  };

  useEffect(() => {
    return () => {
      if (pressTimeout.current) clearTimeout(pressTimeout.current);
    };
  }, []);

  let strokeDashoffset = CIRCUMFERENCE;
  let animDuration = 0;

  if (fillState === 'idle') {
    strokeDashoffset = CIRCUMFERENCE;
    animDuration = 0;
  } else if (fillState === 'filling') {
    strokeDashoffset = 0;
    animDuration = 3; 
  } else if (fillState === 'completed') {
    strokeDashoffset = 0;
    animDuration = 0;
  }

  return (
    <div className="min-h-screen bg-[#EBE4FF] flex justify-center px-4 py-6 pb-28 font-sans">
      <div className="w-full max-w-md bg-[#FCFAFF]/90 backdrop-blur-xl rounded-[36px] shadow-[0_20px_60px_rgba(124,58,237,0.22)] overflow-hidden border border-white">
        <div className="px-6 pt-8 pb-5">
          
          {/* Top Bar */}
          <div className="flex items-center justify-between mb-6 bg-gradient-to-r from-[#F0E6FF] via-[#F8F3FF] to-transparent px-5 py-4 rounded-[26px] border border-white/60 shadow-sm">
            <div className="w-[24px]"></div>
            <h1 className="text-[#7C3AED] text-[20px] font-bold tracking-wide">
              SafeSchool AI
            </h1>
            <button className="relative text-[#7C3AED]">
              <Bell size={22} />
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-red-500 rounded-full" />
            </button>
          </div>

          {/* Greeting */}
          <div className="mb-8 bg-gradient-to-r from-[#F0E6FF] via-[#F8F3FF] to-transparent p-5 rounded-[28px] border border-white/60 shadow-sm flex items-center gap-4">
            <div className="flex-shrink-0 w-[95px] h-[95px] rounded-full bg-white/40 border border-white/80 shadow-inner flex items-center justify-center p-1">
              <KawaiiGhost sizeClass="w-[100px] h-[100px]" />
            </div>
            <div className="flex-1 pl-1">
              <h2 className="text-[#1E1B4B] text-[26px] font-bold mb-1 leading-tight">
                Сайн уу! 👋
              </h2>
              <p className="text-[#475569] text-[13px] leading-relaxed">
                Чиний аюулгүй байдал бидний хамгийн чухал зүйл.
              </p>
            </div>
          </div>

          {/* SOS Card */}
          <div className="bg-white rounded-[32px] shadow-[0_12px_40px_rgba(124,58,237,0.12)] px-5 pt-8 pb-5 mb-5 mt-2">
            <div className="relative mx-auto w-[176px] h-[176px] flex items-center justify-center">
              <svg 
                className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" 
                viewBox="0 0 176 176"
              >
                <circle 
                  cx="88" cy="88" r="82" 
                  fill="none" 
                  stroke="#FFE4E8" 
                  strokeWidth="12" 
                />
                <motion.circle
                  cx="88" cy="88" r="82"
                  fill="none"
                  stroke="#EF233C"
                  strokeWidth="12"
                  strokeLinecap="round"
                  strokeDasharray={`${CIRCUMFERENCE} ${CIRCUMFERENCE}`}
                  initial={{ strokeDashoffset: CIRCUMFERENCE }}
                  animate={{ strokeDashoffset }}
                  transition={{ duration: animDuration, ease: "linear" }}
                />
              </svg>

              <motion.button
                onPointerDown={handlePressStart}
                onPointerUp={handlePressEnd}
                onPointerLeave={handlePressEnd}
                onContextMenu={(e) => e.preventDefault()}
                whileTap={{ scale: 0.95 }}
                className="relative z-10 w-[152px] h-[152px] rounded-full bg-gradient-to-br from-[#FF3B4F] to-[#EF233C] shadow-[0_16px_40px_rgba(239,35,60,0.35)] flex flex-col items-center justify-center text-white touch-none select-none"
              >
                <PhoneCall size={38} className="mb-2" />
                <span className="text-[38px] font-bold leading-none">
                  SOS
                </span>
              </motion.button>
            </div>

            <p className="text-center text-[#EF233C] font-semibold text-[14px] mt-5 leading-relaxed">
              Яаралтай үед 3 секунд <br /> дарж барина уу
            </p>

            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/sos-info')}
              className="mt-5 w-full border-2 border-[#A78BFA] rounded-[20px] px-4 py-4 flex items-center justify-between bg-[#F5F3FF]"
            >
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-[#7C3AED] flex items-center justify-center">
                  <Smile className="text-white" size={24} />
                </div>
                <div className="text-left">
                  <h3 className="text-[#5B21B6] font-bold text-[15px]">
                    SOS хэрхэн ажилладаг вэ?
                  </h3>
                  <p className="text-[#94A3B8] text-[12px]">
                    Яаралтай тусламжийн талаар дэлгэрэнгүй харах
                  </p>
                </div>
              </div>
              <ChevronRight className="text-[#7C3AED]" size={22} />
            </motion.button>
          </div>

          {/* Wellbeing */}
          <h3 className="text-[#1E1B4B] font-bold text-[16px] mb-3">
            Чиний сайн сайхан
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/report')}
              className="bg-[#F5F3FF] rounded-[22px] p-4 shadow-[0_8px_28px_rgba(124,58,237,0.12)] text-left border border-[#EDE9FE]"
            >
              <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center mb-3">
                <Cloud className="text-[#8B5CF6]" size={30} />
              </div>
              <h4 className="text-[#312E81] font-bold text-[14px]">Нууц мэдээлэл</h4>
              <p className="text-[#94A3B8] text-[12px] mt-1">Асуудлаа мэдээлэх</p>
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/heatmap')}
              className="bg-[#F5F3FF] rounded-[22px] p-4 shadow-[0_8px_28px_rgba(124,58,237,0.12)] text-left border border-[#EDE9FE]"
            >
              <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center mb-3">
                <MapPin className="text-[#8B5CF6]" size={30} />
              </div>
              <h4 className="text-[#312E81] font-bold text-[14px]">Аюулгүй бүс</h4>
              <p className="text-[#94A3B8] text-[12px] mt-1">Газрын зураг харах</p>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 w-[92%] max-w-md bg-white/90 backdrop-blur-xl rounded-[28px] shadow-[0_12px_40px_rgba(124,58,237,0.18)] px-6 py-3 z-50">
        <div className="flex items-center justify-around">
          <button onClick={() => navigate('/')} className="flex flex-col items-center gap-1 text-[#7C3AED]">
            <div className="bg-[#F3E8FF] px-4 py-1.5 rounded-full flex items-center justify-center">
              <HomeIcon size={22} className="text-[#7C3AED]" />
            </div>
            <span className="text-[11px] font-bold mt-0.5">Нүүр</span>
          </button>

          <button onClick={() => navigate('/report')} className="flex flex-col items-center gap-1 text-[#B8AEEA] pt-1">
            <HeartHandshake size={22} />
            <span className="text-[11px] font-bold mt-1">Мэдэгдэх</span>
          </button>

          <button onClick={() => navigate('/heatmap')} className="flex flex-col items-center gap-1 text-[#B8AEEA] pt-1">
            <MessageCircle size={22} />
            <span className="text-[11px] font-bold mt-1">Газрын зураг</span>
          </button>

          <button onClick={onSOSClick} className="flex flex-col items-center gap-1 text-[#B8AEEA] pt-1">
            <Bell size={22} />
            <span className="text-[11px] font-bold mt-1">SOS</span>
          </button>
        </div>
      </div>
    </div>
  );
}