import { useNavigate } from 'react-router';
import {
  Menu,
  Bell,
  PhoneCall,
  Smile,
  ShieldCheck,
  Cloud,
  Home as HomeIcon,
  HeartHandshake,
  MessageCircle,
  ChevronRight,
  MapPin,
} from 'lucide-react';
import { motion } from 'motion/react';

interface HomeProps {
  onSOSClick: () => void;
}

export default function Home({ onSOSClick }: HomeProps) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E9DDFF] via-[#F8F5FF] to-[#FFFFFF] flex justify-center px-4 py-6 pb-28">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-xl rounded-[36px] shadow-[0_20px_60px_rgba(124,58,237,0.22)] overflow-hidden border border-white">
        <div className="px-6 pt-8 pb-5">
          {/* Top Bar */}
          <div className="flex items-center justify-between mb-8">
            <button className="text-[#7C3AED]">
              <Menu size={26} />
            </button>

            <h1 className="text-[#7C3AED] text-[22px] font-bold">
              SafeSchool AI
            </h1>

            <button className="relative text-[#7C3AED]">
              <Bell size={24} />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
            </button>
          </div>

          {/* Greeting */}
          <div className="relative mb-5">
            <h2 className="text-[#1E1B4B] text-[28px] font-bold mb-2">
              Сайн уу! 👋
            </h2>

            <p className="text-[#475569] text-[14px] leading-relaxed max-w-[210px]">
              Чиний аюулгүй байдал бидний хамгийн чухал зүйл.
            </p>

            <div className="absolute right-0 -top-4">
              <div className="w-28 h-28 rounded-full bg-[#EDE9FE] flex items-center justify-center shadow-inner">
                <div className="text-center">
                  <div className="text-[48px]">👻</div>

                  <div className="mx-auto -mt-4 w-12 h-12 bg-[#8B5CF6] rounded-2xl flex items-center justify-center">
                    <ShieldCheck className="text-white" size={28} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SOS Card */}
          <div className="bg-white rounded-[32px] shadow-[0_12px_40px_rgba(124,58,237,0.12)] px-5 pt-8 pb-5 mb-5">
            <motion.button
              onClick={onSOSClick}
              whileTap={{ scale: 0.96 }}
              className="mx-auto w-44 h-44 rounded-full bg-gradient-to-br from-[#FF3B4F] to-[#EF233C] shadow-[0_16px_40px_rgba(239,35,60,0.35)] border-[12px] border-[#FFE4E8] flex flex-col items-center justify-center text-white"
            >
              <PhoneCall size={42} className="mb-2" />

              <span className="text-[44px] font-bold leading-none">
                SOS
              </span>
            </motion.button>

            <p className="text-center text-[#EF233C] font-semibold text-[14px] mt-5 leading-relaxed">
              Яаралтай аюултай нөхцөлд <br />
              дарна уу
            </p>

            {/* SOS Info Button */}
            <button
              onClick={() => navigate('/sos-info')}
              className="mt-5 w-full border-2 border-[#A78BFA] rounded-[20px] px-4 py-4 flex items-center justify-between bg-white"
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
            </button>
          </div>

          {/* Wellbeing */}
          <h3 className="text-[#1E1B4B] font-bold text-[16px] mb-3">
            Чиний сайн сайхан
          </h3>

          <div className="grid grid-cols-2 gap-4">
            {/* Report */}
            <button
              onClick={() => navigate('/report')}
              className="bg-white rounded-[22px] p-4 shadow-[0_8px_28px_rgba(124,58,237,0.12)] text-left border border-[#F1F5F9]"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#EDE9FE] flex items-center justify-center mb-3">
                <Cloud className="text-[#8B5CF6]" size={30} />
              </div>

              <h4 className="text-[#312E81] font-bold text-[14px]">
                Нууц мэдээлэл
              </h4>

              <p className="text-[#94A3B8] text-[12px] mt-1">
                Асуудлаа мэдээлэх
              </p>
            </button>

            {/* Heatmap */}
            <button
              onClick={() => navigate('/heatmap')}
              className="bg-white rounded-[22px] p-4 shadow-[0_8px_28px_rgba(124,58,237,0.12)] text-left border border-[#F1F5F9]"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#EDE9FE] flex items-center justify-center mb-3">
                <MapPin className="text-[#8B5CF6]" size={30} />
              </div>

              <h4 className="text-[#312E81] font-bold text-[14px]">
                Аюулгүй бүс
              </h4>

              <p className="text-[#94A3B8] text-[12px] mt-1">
                Газрын зураг харах
              </p>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 w-[92%] max-w-md bg-white/90 backdrop-blur-xl rounded-[28px] shadow-[0_12px_40px_rgba(124,58,237,0.18)] px-6 py-4">
        <div className="flex items-center justify-around">
          {/* Home */}
          <button
            onClick={() => navigate('/')}
            className="flex flex-col items-center gap-1 text-[#7C3AED]"
          >
            <HomeIcon size={24} />
            <span className="text-[11px] font-bold">Нүүр</span>
          </button>

          {/* Report */}
          <button
            onClick={() => navigate('/report')}
            className="flex flex-col items-center gap-1 text-[#B8AEEA]"
          >
            <HeartHandshake size={24} />
            <span className="text-[11px] font-bold">Мэдэгдэх</span>
          </button>

          {/* Heatmap */}
          <button
            onClick={() => navigate('/heatmap')}
            className="flex flex-col items-center gap-1 text-[#B8AEEA]"
          >
            <MessageCircle size={24} />
            <span className="text-[11px] font-bold">
              Газрын зураг
            </span>
          </button>

          {/* SOS */}
          <button
            onClick={onSOSClick}
            className="flex flex-col items-center gap-1 text-[#EF233C]"
          >
            <Bell size={24} />
            <span className="text-[11px] font-bold">SOS</span>
          </button>
        </div>
      </div>
    </div>
  );
}