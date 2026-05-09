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

// --- Peeking Kawaii Character (Нүдний гялалзалттай) ---
const PeekingKawaiiRight = () => (
  <div className="absolute -right-8 top-12 z-0 w-24 h-32 overflow-visible pointer-events-none">
    <motion.svg
      viewBox="0 0 120 150"
      className="w-full h-full"
      initial={{ x: 20 }}
      animate={{ x: [20, 0, 20] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    >
      <path 
        d="M 120,20 C 60,20 20,60 20,100 C 20,120 40,140 120,140 Z" 
        fill="#98E2C6" 
        stroke="#76C8A8" 
        strokeWidth="2"
      />
      <g transform="translate(35, 65) rotate(-10)">
        <rect x="0" y="0" width="35" height="28" rx="10" stroke="#58636D" strokeWidth="4" fill="white" />
        <rect x="0" y="32" width="35" height="28" rx="10" stroke="#58636D" strokeWidth="4" fill="white" />
        <path d="M 17,28 L 17,32" stroke="#58636D" strokeWidth="4" />
        
        <circle cx="17" cy="14" r="8" fill="#2D1B46" />
        <circle cx="17" cy="46" r="8" fill="#2D1B46" />
        <circle cx="14" cy="11" r="3" fill="white" />
        <circle cx="14" cy="43" r="3" fill="white" />
      </g>
      <motion.ellipse cx="25" cy="45" rx="10" ry="14" fill="#28A67E" animate={{ x: [0, -2, 0] }} transition={{ duration: 3, repeat: Infinity }} />
      <motion.ellipse cx="25" cy="130" rx="10" ry="14" fill="#28A67E" animate={{ x: [0, -2, 0] }} transition={{ duration: 3, repeat: Infinity, delay: 0.5 }} />
    </motion.svg>
  </div>
);

// --- Kawaii Ghost (Нүдний гялалзалттай) ---
const KawaiiGhost = ({ sizeClass = "w-[120px] h-[120px]" }: any) => (
  <div className={`relative flex items-center justify-center ${sizeClass}`}>
    <motion.svg
      viewBox="0 0 200 240"
      className="relative z-10 w-full h-full drop-shadow-xl overflow-visible"
      animate={{ y: [0, -10, 0], rotate: [0, 3, -2, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
    >
      <motion.g transform="translate(15, 80)" animate={{ rotate: [0, -12, 0], transformOrigin: "20px 85px" }} transition={{ duration: 3, repeat: Infinity }}>
        <circle cx="30" cy="30" r="25" fill="#FEF08A" opacity="0.5" filter="blur(5px)" />
        <line x1="30" y1="35" x2="10" y2="95" stroke="#FBBF24" strokeWidth="6" strokeLinecap="round" />
        <path d="M 30,10 L 36,22 L 49,24 L 39,33 L 42,46 L 30,40 L 18,46 L 21,33 L 11,24 L 24,22 Z" fill="#FDE047" stroke="#EAB308" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </motion.g>
      <g transform="translate(30, 15)">
        <path d="M 15,75 C 15,5 135,5 135,75 L 135,175 Q 115,195 95,170 Q 75,145 55,170 Q 35,195 15,175 Z" fill="#E9D5FF" />
        <path d="M 25,120 Q 5,120 12,145" fill="none" stroke="#E9D5FF" strokeWidth="14" strokeLinecap="round" />
        <path d="M 125,120 Q 145,110 138,135" fill="none" stroke="#E9D5FF" strokeWidth="14" strokeLinecap="round" />
        <ellipse cx="45" cy="105" rx="12" ry="6" fill="#FF9CEE" opacity="0.8" />
        <ellipse cx="105" cy="105" rx="12" ry="6" fill="#FF9CEE" opacity="0.8" />
        
        <circle cx="55" cy="88" r="10" fill="#1E1B4B" />
        <circle cx="95" cy="88" r="10" fill="#1E1B4B" />
        <circle cx="51" cy="84" r="4" fill="white" />
        <circle cx="58" cy="91" r="1.5" fill="white" />
        <circle cx="91" cy="84" r="4" fill="white" />
        <circle cx="98" cy="91" r="1.5" fill="white" />
        
        <path d="M 70,100 Q 75,108 80,100" fill="none" stroke="#1E1B4B" strokeWidth="4.5" strokeLinecap="round" />
      </g>
    </motion.svg>
  </div>
);

interface HomeProps {
  onSOSClick: () => void;
}

export default function Home({ onSOSClick }: HomeProps) {
  const navigate = useNavigate();
  const [fillState, setFillState] = useState<'idle' | 'filling' | 'completed'>('idle');
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
    if (pressTimeout.current) { clearTimeout(pressTimeout.current); pressTimeout.current = null; }
    if (fillState !== 'completed') setFillState('idle');
  };

  return (
    /* АРЫН ДЭВТСГЭР ӨНГӨ: Зөөлөн нил ягаанаас цагаан руу ууссан (Gradient) */
    <div className="min-h-screen bg-white/95 via-[#F3EFFF] to-white flex justify-center px-4 py-6 pb-28 font-sans relative">
      <div className="w-full max-w-md  bg-gradient-to-b from-[#C7B9FF] via-[#F3EFFF] backdrop-blur-xl rounded-[40px] shadow-[0_20px_50px_rgba(124,58,237,0.08)] overflow-hidden flex flex-col relative border border-white">
        <div className="px-6 pt-10 pb-5 flex-1 overflow-y-auto custom-scrollbar">
          
          {/* Top Bar (Home иконыг устгасан) */}
          <div className="flex items-center justify-between mb-8 px-2">
            <div className="w-10 h-10 invisible" /> 
            <h1 className="text-violet-800 text-[22px] font-black tracking-tight">SafeSchool AI</h1>
            <button className="w-10 h-10 rounded-2xl bg-white/60 flex items-center justify-center text-violet-700 relative shadow-sm border border-white">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
            </button>
          </div>

          {/* Greeting */}
          <div className="mb-8 bg-white p-6 rounded-[34px] shadow-sm flex items-center gap-4 border border-violet-50">
            <div className="flex-shrink-0 bg-violet-50 rounded-2xl p-1 shadow-inner">
              <KawaiiGhost sizeClass="w-[85px] h-[85px]" />
            </div>
            <div className="flex-1">
              <h2 className="text-violet-950 text-[26px] font-black mb-1 leading-none">Сайн уу! 👋</h2>
              <p className="text-violet-900/60 text-[13px] font-bold">Чиний аюулгүй байдал бидний хамгийн чухал зүйл.</p>
            </div>
          </div>

          {/* SOS Card */}
          <div className="relative bg-white rounded-[36px] shadow-sm px-5 pt-8 pb-7 mb-7 border border-slate-50">
            
            <PeekingKawaiiRight />

            <div className="relative z-10 mx-auto w-[180px] h-[180px] flex items-center justify-center">
              <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 176 176">
                <circle cx="88" cy="88" r="82" fill="none" stroke="#FFF5F6" strokeWidth="12" />
                <motion.circle
                  cx="88" cy="88" r="82" fill="none" stroke="#FF3B4F" strokeWidth="12" strokeLinecap="round"
                  strokeDasharray={`${CIRCUMFERENCE} ${CIRCUMFERENCE}`}
                  animate={{ strokeDashoffset: fillState === 'filling' ? 0 : CIRCUMFERENCE }}
                  transition={{ duration: fillState === 'filling' ? 3 : 0.3, ease: "linear" }}
                />
              </svg>

              <motion.button
                onPointerDown={handlePressStart} onPointerUp={handlePressEnd}
                onPointerLeave={handlePressEnd}
                whileTap={{ scale: 0.93 }}
                className="relative z-10 w-[150px] h-[150px] rounded-full bg-gradient-to-b from-[#FF5F6D] to-[#EF233C] shadow-xl flex flex-col items-center justify-center text-white touch-none"
              >
                <PhoneCall size={36} className="mb-1" />
                <span className="text-[38px] font-black tracking-tighter">SOS</span>
              </motion.button>
            </div>

            <p className="relative z-10 text-center text-red-500 font-black text-[14px] mt-6 leading-relaxed">
              Яаралтай үед 3 секунд <br /> дарж барина уу
            </p>

            <motion.button
              whileTap={{ scale: 0.98 }} onClick={() => navigate('/sos-info')}
              className="relative z-10 mt-7 w-full rounded-[26px] px-5 py-4 flex items-center justify-between bg-violet-50/50 border border-violet-100/50 hover:bg-violet-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-white flex items-center justify-center text-violet-500 shadow-sm"><Smile size={24} /></div>
                <div className="text-left">
                  <h3 className="text-violet-900 font-black text-[15px]">SOS хэрхэн ажилладаг вэ?</h3>
                  <p className="text-violet-900/40 text-[11px] font-bold mt-1">Дэлгэрэнгүй мэдээлэл харах</p>
                </div>
              </div>
              <ChevronRight className="text-violet-400" size={22} />
            </motion.button>
          </div>

          {/* Wellbeing Grid */}
          <h3 className="text-violet-950 font-black text-[18px] mb-4 px-2">Чиний сайн сайхан</h3>
          <div className="grid grid-cols-2 gap-4">
            <motion.button
              whileTap={{ scale: 0.96 }} onClick={() => navigate('/report')}
              className="bg-white rounded-[32px] p-6 shadow-sm border border-slate-100 text-left"
            >
              <div className="w-13 h-13 rounded-2xl bg-blue-50 flex items-center justify-center mb-4 text-blue-500 shadow-inner"><Cloud size={28} /></div>
              <h4 className="text-slate-800 font-black text-[15px]">Нууц мэдээлэл</h4>
              <p className="text-slate-400 text-[11px] mt-1 font-bold">Асуудлаа мэдээлэх</p>
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.96 }} onClick={() => navigate('/heatmap')}
              className="bg-white rounded-[32px] p-6 shadow-sm border border-slate-100 text-left"
            >
              <div className="w-13 h-13 rounded-2xl bg-orange-50 flex items-center justify-center mb-4 text-orange-500 shadow-inner"><MapPin size={28} /></div>
              <h4 className="text-slate-800 font-black text-[15px]">Аюулгүй бүс</h4>
              <p className="text-slate-400 text-[11px] mt-1 font-bold">Газрын зураг харах</p>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Floating Bottom Nav */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-md bg-white/95 backdrop-blur-xl rounded-[34px] shadow-2xl px-6 py-4 z-50 border border-white/50">
        <div className="flex items-center justify-between">
          <button onClick={() => navigate('/')} className="flex flex-col items-center gap-1 text-violet-700 font-black">
            <div className="bg-violet-100 px-6 py-2.5 rounded-[20px] shadow-inner"><HomeIcon size={24} strokeWidth={2.5} /></div>
            <span className="text-[11px] mt-0.5">Нүүр</span>
          </button>
          <button onClick={() => navigate('/report')} className="flex flex-col items-center gap-1.5 text-slate-400 py-1 font-bold">
            <HeartHandshake size={26} strokeWidth={2} /><span className="text-[11px]">Мэдэгдэх</span>
          </button>
          <button onClick={() => navigate('/heatmap')} className="flex flex-col items-center gap-1.5 text-slate-400 py-1 font-bold">
            <MessageCircle size={26} strokeWidth={2} /><span className="text-[11px]">Газрын зураг</span>
          </button>
          <button onClick={onSOSClick} className="flex flex-col items-center gap-1.5 text-slate-400 py-1 font-bold">
            <Bell size={26} strokeWidth={2} /><span className="text-[11px]">SOS</span>
          </button>
        </div>
      </div>
    </div>
  );
}