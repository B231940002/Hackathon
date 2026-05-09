import { useNavigate } from 'react-router';
import {
  ArrowLeft,
  PhoneCall,
  ShieldCheck,
  Bell,
  Users,
  AlertTriangle,
} from 'lucide-react';
import { motion } from 'motion/react';

interface SOSInfoProps {
  onSOSClick: () => void;
}

export default function SOSInfo({ onSOSClick }: SOSInfoProps) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E9DDFF] via-[#F8F5FF] to-white px-4 py-6 pb-28">
      <div className="w-full max-w-md mx-auto bg-white/85 backdrop-blur-xl rounded-[36px] shadow-[0_20px_60px_rgba(124,58,237,0.22)] overflow-hidden border border-white">
        <div className="px-6 pt-8 pb-6">
          <button
            onClick={() => navigate(-1)}
            className="w-11 h-11 rounded-2xl bg-[#F3E8FF] flex items-center justify-center text-[#7C3AED] mb-6"
          >
            <ArrowLeft size={24} />
          </button>

          <div className="text-center mb-7">
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="mx-auto w-24 h-24 rounded-full bg-gradient-to-br from-[#FF3B4F] to-[#EF233C] flex items-center justify-center shadow-[0_14px_35px_rgba(239,35,60,0.35)] border-[8px] border-[#FFE4E8] mb-4"
            >
              <PhoneCall className="text-white" size={42} />
            </motion.div>

            <h1 className="text-[#1E1B4B] text-[26px] font-bold">
              SOS яаралтай тусламж
            </h1>
            <p className="text-[#64748B] text-[14px] mt-2 leading-relaxed">
              Аюултай нөхцөлд нэг даралтаар тусламж хүсэлт илгээх систем.
            </p>
          </div>

          <div className="space-y-4">
            <div className="bg-[#FFF1F3] border border-[#FFCCD4] rounded-[24px] p-5">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#EF233C] flex items-center justify-center flex-shrink-0">
                  <Bell className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-[#EF233C] font-bold text-[16px]">
                    SOS дарахад юу болох вэ?
                  </h3>
                  <p className="text-[#64748B] text-[13px] mt-1 leading-relaxed">
                    Таны яаралтай тусламжийн хүсэлт багш, ажилтан эсвэл админ хэсэг рүү шууд илгээгдэнэ.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[24px] p-5 shadow-[0_8px_28px_rgba(124,58,237,0.10)] border border-[#F1F5F9]">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#EDE9FE] flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="text-[#7C3AED]" size={26} />
                </div>
                <div>
                  <h3 className="text-[#312E81] font-bold text-[16px]">
                    Нууцлал хамгаалагдана
                  </h3>
                  <p className="text-[#64748B] text-[13px] mt-1 leading-relaxed">
                    Таны мэдээлэл зөвхөн тусламж үзүүлэх зорилгоор ашиглагдана.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[24px] p-5 shadow-[0_8px_28px_rgba(124,58,237,0.10)] border border-[#F1F5F9]">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#EDE9FE] flex items-center justify-center flex-shrink-0">
                  <Users className="text-[#7C3AED]" size={26} />
                </div>
                <div>
                  <h3 className="text-[#312E81] font-bold text-[16px]">
                    Хэнд очих вэ?
                  </h3>
                  <p className="text-[#64748B] text-[13px] mt-1 leading-relaxed">
                    Сургуулийн багш, нийгмийн ажилтан болон хариуцсан ажилтанд мэдэгдэнэ.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#FEF3C7] border border-[#FDE68A] rounded-[24px] p-5">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#F59E0B] flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="text-white" size={26} />
                </div>
                <div>
                  <h3 className="text-[#92400E] font-bold text-[16px]">
                    Анхааруулга
                  </h3>
                  <p className="text-[#92400E] text-[13px] mt-1 leading-relaxed">
                    SOS товчийг зөвхөн бодит аюултай үед ашиглана.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <motion.button
            onClick={onSOSClick}
            whileTap={{ scale: 0.96 }}
            className="mt-7 w-full bg-gradient-to-br from-[#FF3B4F] to-[#EF233C] text-white rounded-[24px] py-5 font-bold text-[18px] shadow-[0_14px_35px_rgba(239,35,60,0.35)]"
          >
            SOS илгээх
          </motion.button>
        </div>
      </div>
    </div>
  );
}