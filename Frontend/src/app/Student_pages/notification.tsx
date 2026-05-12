import React from 'react';
import { useNavigate } from 'react-router';
import { 
  ChevronLeft, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  MessageSquare,
  ArrowRight
} from 'lucide-react';
import { motion } from 'motion/react';

// --- Дэд бүрэлдэхүүн хэсэг: Баяртай Сүнс (Асуудал шийдэгдсэн үед) ---
const HappyGhost = () => (
  <div className="relative w-24 h-24 mx-auto mb-4">
    <motion.svg
      viewBox="0 0 200 240"
      className="w-full h-full drop-shadow-lg"
      animate={{ y: [0, -8, 0], scale: [1, 1.05, 1] }}
      transition={{ duration: 3, repeat: Infinity }}
    >
      <g transform="translate(30, 15)">
        <path d="M 15,75 C 15,5 135,5 135,75 L 135,175 Q 115,195 95,170 Q 75,145 55,170 Q 35,195 15,175 Z" fill="#DDD6FE" />
        {/* Нүд - Жаргалтай */}
        <path d="M 50,85 Q 55,75 60,85" fill="none" stroke="#1E1B4B" strokeWidth="5" strokeLinecap="round" />
        <path d="M 90,85 Q 95,75 100,85" fill="none" stroke="#1E1B4B" strokeWidth="5" strokeLinecap="round" />
        {/* Хацар */}
        <circle cx="45" cy="100" r="8" fill="#FF9CEE" opacity="0.6" />
        <circle cx="105" cy="100" r="8" fill="#FF9CEE" opacity="0.6" />
        {/* Инээмсэглэл */}
        <path d="M 65,105 Q 75,115 85,105" fill="none" stroke="#1E1B4B" strokeWidth="4" strokeLinecap="round" />
      </g>
    </motion.svg>
  </div>
);

export default function NotificationPage() {
  const navigate = useNavigate();

  // Жишээ өгөгдөл
  const notifications = [
    {
      id: 1,
      type: 'resolved',
      title: 'Асуудал шийдэгдлээ',
      desc: 'Таны 2 цагийн өмнө илгээсэн мэдээллийн дагуу сургуулийн зөвлөх баг ажиллаж, арга хэмжээ авлаа.',
      time: '15 минутын өмнө',
      status: 'Шийдвэрлэсэн',
      icon: <CheckCircle2 className="text-emerald-500" size={20} />,
      bgColor: 'bg-emerald-50'
    },
    {
      id: 2,
      type: 'pending',
      title: 'Явцын мэдээлэл',
      desc: 'Таны илгээсэн SOS хүсэлтийг хүлээн авч, сургуулийн аюулгүй байдлын ажилтан шалгаж байна.',
      time: '1 цагийн өмнө',
      status: 'Шалгаж байна',
      icon: <Clock className="text-amber-500" size={20} />,
      bgColor: 'bg-amber-50'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8F7FF] flex justify-center px-4 py-6 font-sans">
      <div className="w-full max-w-md bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col border border-white">
        
        {/* Header */}
        <div className="px-6 pt-10 pb-4 flex items-center justify-between">
          <button 
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-2xl bg-violet-50 flex items-center justify-center text-violet-600"
          >
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-violet-900 text-xl font-black">Мэдэгдэл</h1>
          <div className="w-10" />
        </div>

        <div className="flex-1 overflow-y-auto px-6 pt-4 pb-20">
          
          {/* Resolved Hero Card (Хамгийн сүүлийн шийдэгдсэн асуудал) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-violet-600 to-indigo-600 rounded-[34px] p-6 mb-8 text-white relative overflow-hidden shadow-xl"
          >
            <div className="relative z-10">
              <HappyGhost />
              <h2 className="text-center text-xl font-bold mb-2">Бүх зүйл зүгээр боллоо!</h2>
              <p className="text-center text-violet-100 text-sm mb-6 leading-relaxed">
                Сургуулийн хамт олон таны аюулгүй байдлыг хангаж, шаардлагатай арга хэмжээг авсан байна.
              </p>
              
            </div>
            {/* Чимэглэл */}
            <div className="absolute top-[-20%] right-[-10%] w-40 h-40 bg-white/10 rounded-full blur-3xl" />
          </motion.div>

          <h3 className="text-slate-400 text-sm font-bold mb-4 px-2 uppercase tracking-widest">Сүүлийн мэдэгдлүүд</h3>

          {/* List of Notifications */}
          <div className="space-y-4">
            {notifications.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white border border-slate-100 rounded-[28px] p-5 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex gap-4">
                  <div className={`flex-shrink-0 w-12 h-12 ${item.bgColor} rounded-2xl flex items-center justify-center`}>
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="text-slate-900 font-black text-[15px]">{item.title}</h4>
                      <span className="text-[10px] text-slate-400 font-bold">{item.time}</span>
                    </div>
                    <p className="text-slate-500 text-xs leading-relaxed mb-3">
                      {item.desc}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] px-3 py-1 rounded-full font-black uppercase tracking-tighter ${
                        item.type === 'resolved' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>


        </div>

      </div>
    </div>
  );
}