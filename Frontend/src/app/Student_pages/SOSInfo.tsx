import { useNavigate } from 'react-router';
import {
  ArrowLeft,
  ShieldAlert,
  MapPinned,
  MessageCircleMore,
  ShieldCheck,
} from 'lucide-react';
import { motion } from 'motion/react';

interface SOSInfoProps {
  onSOSClick: () => void;
}

export default function SOSInfo({ onSOSClick }: SOSInfoProps) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EEE7FF] via-[#F8F5FF] to-white px-4 py-6 relative overflow-hidden">
      
      <div className="absolute -left-32 top-40 w-72 h-72 bg-[#D8B4FE]/20 blur-3xl rounded-full" />
      <div className="absolute -right-20 bottom-10 w-60 h-60 bg-[#C4B5FD]/20 blur-3xl rounded-full" />

      <div className="relative z-10 w-full max-w-md mx-auto bg-white/90 backdrop-blur-xl rounded-[38px] border border-white shadow-[0_20px_60px_rgba(124,58,237,0.20)] overflow-hidden">
        
        <div className="px-6 pt-8 pb-8">
          
          <button
            onClick={() => navigate(-1)}
            className="text-[#7C3AED] mb-5"
          >
            <ArrowLeft size={26} />
          </button>

          <div className="text-center mb-8">
            <h1 className="text-[#1E1B4B] text-[28px] font-bold">
              SOS хэрхэн ажилладаг вэ?
            </h1>

            <p className="text-[#8B8BB8] text-[14px] mt-2">
              SOS товчийг дарснаар юу болдгийг эндээс харна
            </p>
          </div>

          <div className="bg-[#FFF7ED] border border-[#FED7AA] rounded-[24px] p-4 mb-5">
            <div className="flex gap-3">
              
              <div className="w-12 h-12 rounded-2xl bg-[#A855F7] flex items-center justify-center flex-shrink-0">
                <ShieldAlert className="text-white" size={24} />
              </div>

              <div>
                <h3 className="text-[#312E81] font-bold text-[15px]">
                  Тоглоомоор дарж болохгүй
                </h3>

                <p className="text-[#64748B] text-[13px] mt-1 leading-relaxed">
                  Энэ товч нь зөвхөн яаралтай, аюултай нөхцөлд ашиглах зориулалттай.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            
            <motion.div
              whileHover={{ y: -2 }}
              className="bg-white border border-[#EFE7FF] rounded-[26px] p-4 shadow-[0_10px_30px_rgba(124,58,237,0.08)]"
            >
              <div className="flex gap-4">
                
                <div className="w-7 h-7 rounded-full bg-[#7C3AED] text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                  1
                </div>

                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#FF4D5E] to-[#EF233C] shadow-[0_10px_25px_rgba(239,35,60,0.35)] flex items-center justify-center text-white font-bold text-[20px] flex-shrink-0 border-[5px] border-[#FFE5E8]">
                  SOS
                </div>

                <div>
                  <h3 className="text-[#312E81] font-bold text-[16px]">
                    SOS товчийг 3 секунд дарна
                  </h3>

                  <p className="text-[#64748B] text-[13px] mt-1 leading-relaxed">
                    Товчийг 3 секунд дарж идэвхжүүлнэ.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -2 }}
              className="bg-white border border-[#EFE7FF] rounded-[26px] p-4 shadow-[0_10px_30px_rgba(124,58,237,0.08)]"
            >
              <div className="flex gap-4">
                
                <div className="w-7 h-7 rounded-full bg-[#7C3AED] text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                  2
                </div>

                <div className="w-16 h-16 rounded-[20px] bg-[#F3E8FF] flex items-center justify-center flex-shrink-0">
                  <MapPinned className="text-[#7C3AED]" size={34} />
                </div>

                <div>
                  <h3 className="text-[#312E81] font-bold text-[16px] leading-snug">
                    Таны байршил, нэр, анги, цагийн мэдээлэл сургуулийн админ / нийгмийн ажилтанд илгээгдэнэ
                  </h3>

                  <p className="text-[#64748B] text-[13px] mt-1 leading-relaxed">
                    Мэдээлэл автоматаар илгээгдэж, тусламжийн баг очно.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -2 }}
              className="bg-white border border-[#EFE7FF] rounded-[26px] p-4 shadow-[0_10px_30px_rgba(124,58,237,0.08)]"
            >
              <div className="flex gap-4">
                
                <div className="w-7 h-7 rounded-full bg-[#7C3AED] text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                  3
                </div>

                <div className="w-16 h-16 rounded-[20px] bg-[#F3E8FF] flex items-center justify-center flex-shrink-0">
                  <MessageCircleMore className="text-[#7C3AED]" size={34} />
                </div>

                <div>
                  <h3 className="text-[#312E81] font-bold text-[16px] leading-snug">
                    Сургууь тусламжийн арга хэмжээ авч, шаардлагатай бол тантай холбогдоно
                  </h3>

                  <p className="text-[#64748B] text-[13px] mt-1 leading-relaxed">
                    Админ / нийгмийн ажилтан тантай холбогдож, тусламж үзүүлнэ.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="mt-6 bg-gradient-to-r from-[#F3E8FF] to-[#FAF5FF] border border-[#E9D5FF] rounded-[26px] p-5 relative overflow-hidden">
            
            <div className="absolute right-3 bottom-0 text-[70px] opacity-10">
              👻
            </div>

            <div className="flex gap-3 items-start">
              
              <div className="w-11 h-11 rounded-2xl bg-[#7C3AED] flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="text-white" size={22} />
              </div>

              <div>
                <h3 className="text-[#7C3AED] font-bold text-[15px]">
                  Таны аюулгүй байдал бидний нэн тэргүүнд
                </h3>

                <div className="mt-3 space-y-2">
                  
                  <div className="flex items-center gap-2 text-[#64748B] text-[13px]">
                    <div className="w-2 h-2 rounded-full bg-[#7C3AED]" />
                    Зөвхөн яаралтай үед ашиглана
                  </div>

                  <div className="flex items-center gap-2 text-[#64748B] text-[13px]">
                    <div className="w-2 h-2 rounded-full bg-[#7C3AED]" />
                    Таны мэдээлэл зөвхөн сургуулийн админ, нийгмийн ажилтанд очно
                  </div>

                  <div className="flex items-center gap-2 text-[#64748B] text-[13px]">
                    <div className="w-2 h-2 rounded-full bg-[#7C3AED]" />
                    Таны аюулгүй байдлыг нэн тэргүүнд хамгаална
                  </div>
                </div>
              </div>
            </div>
          </div>

          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={onSOSClick}
            className="mt-7 w-full bg-gradient-to-r from-[#7C3AED] to-[#8B5CF6] text-white rounded-[22px] py-4 font-bold text-[17px] shadow-[0_12px_30px_rgba(124,58,237,0.30)]"
          >
            Ойлголоо
          </motion.button>
        </div>
      </div>
    </div>
  );
}