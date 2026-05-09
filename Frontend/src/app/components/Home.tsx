import { useNavigate } from 'react-router';
import { Shield, AlertCircle, MapPin, Bell, Home as HomeIcon, FileText } from 'lucide-react';
import { motion } from 'motion/react';

interface HomeProps {
  onSOSClick: () => void;
}

export default function Home({ onSOSClick }: HomeProps) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#1E3A8A] via-[#2563EB] to-[#3B82F6] px-6 pt-12 pb-8 rounded-b-[32px] shadow-[0_8px_32px_rgba(37,99,235,0.2)]">
        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-3">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-white text-[32px] font-bold tracking-tight">SafeSchool</h1>
                <p className="text-white/80 text-[14px]">Таны аюулгүй орчин нь</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 -mt-6">
        {/* Silent SOS Button - Featured */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="mb-6"
        >
          <div
            onClick={onSOSClick}
            className="bg-gradient-to-br from-[#DC2626] via-[#EF4444] to-[#F87171] rounded-[28px] p-8 shadow-[0_12px_40px_rgba(220,38,38,0.35)] cursor-pointer active:scale-[0.98] transition-transform relative overflow-hidden"
          >
            {/* Animated background pulse */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.1, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-0 bg-white rounded-[28px]"
            />

            <div className="relative z-10 text-center">
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="inline-flex items-center justify-center bg-white/30 backdrop-blur-md rounded-full w-24 h-24 mb-4"
              >
                <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg">
                  <span className="text-[40px]">🚨</span>
                </div>
              </motion.div>
              <h2 className="text-white text-[28px] font-bold mb-2">Яаралтай тусламж</h2>
              <p className="text-white/95 text-[15px] leading-relaxed font-medium">
                Дарж яаралтай мэдэгдэл илгээх
              </p>
            </div>
          </div>
        </motion.div>

        {/* Main Features Grid */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {/* Anonymous Report */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            onClick={() => navigate('/report')}
            className="bg-white rounded-[24px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.08)] cursor-pointer hover:shadow-[0_8px_30px_rgba(37,99,235,0.15)] transition-all active:scale-[0.98] border border-[#E2E8F0]"
          >
            <div className="bg-gradient-to-br from-[#DBEAFE] to-[#BFDBFE] rounded-2xl w-14 h-14 flex items-center justify-center mb-4">
              <AlertCircle className="w-7 h-7 text-[#2563EB]" />
            </div>
            <h3 className="text-[#1E3A8A] text-[18px] font-bold mb-1">Нууцаар</h3>
            <h3 className="text-[#1E3A8A] text-[18px] font-bold mb-2">мэдэгдэх</h3>
            <p className="text-[#64748B] text-[13px] leading-relaxed">
              Дарамт, хүчирхийллийн тухай мэдэгдэх
            </p>
          </motion.div>

          {/* Safety Heatmap */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            onClick={() => navigate('/heatmap')}
            className="bg-white rounded-[24px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.08)] cursor-pointer hover:shadow-[0_8px_30px_rgba(37,99,235,0.15)] transition-all active:scale-[0.98] border border-[#E2E8F0]"
          >
            <div className="bg-gradient-to-br from-[#FED7AA] to-[#FDBA74] rounded-2xl w-14 h-14 flex items-center justify-center mb-4">
              <MapPin className="w-7 h-7 text-[#DC2626]" />
            </div>
            <h3 className="text-[#1E3A8A] text-[18px] font-bold mb-1">Аюулын</h3>
            <h3 className="text-[#1E3A8A] text-[18px] font-bold mb-2">газрын зураг</h3>
            <p className="text-[#64748B] text-[13px] leading-relaxed">
              Эрсдэлтэй газруудыг харах
            </p>
          </motion.div>
        </div>

        {/* Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="space-y-4"
        >
          {/* Privacy Notice */}
          <div className="bg-white rounded-[24px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-[#E2E8F0]">
            <div className="flex gap-4">
              <div className="bg-gradient-to-br from-[#DCFCE7] to-[#BBF7D0] rounded-2xl w-12 h-12 flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-[#16A34A]" />
              </div>
              <div>
                <h4 className="text-[#1E3A8A] font-bold text-[16px] mb-2">100% Нууцлал</h4>
                <p className="text-[#64748B] text-[14px] leading-relaxed">
                  Таны мэдээлэл бүрэн нууцлагдана. Ямар ч хувийн мэдээлэл хадгалахгүй.
                </p>
              </div>
            </div>
          </div>

          {/* Admin Access */}
          <div className="bg-gradient-to-br from-[#1E3A8A] to-[#2563EB] rounded-[24px] p-6 shadow-[0_4px_20px_rgba(30,58,138,0.25)]">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-white font-bold text-[16px] mb-1">Админ хэсэг</h4>
                <p className="text-white/80 text-[13px]">Багш, ажилтнуудад зориулсан</p>
              </div>
              <button
                onClick={() => navigate('/admin')}
                className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white px-5 py-2.5 rounded-full text-[14px] font-semibold transition-all active:scale-95"
              >
                Нэвтрэх →
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E2E8F0] shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
        <div className="max-w-md mx-auto px-6 py-4">
          <div className="flex items-center justify-around">
            <button className="flex flex-col items-center gap-1 text-[#2563EB]">
              <div className="bg-[#EFF6FF] rounded-xl p-2">
                <HomeIcon className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-semibold">Нүүр</span>
            </button>

            <button
              onClick={() => navigate('/report')}
              className="flex flex-col items-center gap-1 text-[#64748B] hover:text-[#2563EB] transition-colors"
            >
              <div className="hover:bg-[#F1F5F9] rounded-xl p-2 transition-colors">
                <FileText className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-semibold">Мэдэгдэх</span>
            </button>

            <button
              onClick={() => navigate('/heatmap')}
              className="flex flex-col items-center gap-1 text-[#64748B] hover:text-[#2563EB] transition-colors"
            >
              <div className="hover:bg-[#F1F5F9] rounded-xl p-2 transition-colors">
                <MapPin className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-semibold">Газрын зураг</span>
            </button>

            <button
              onClick={onSOSClick}
              className="flex flex-col items-center gap-1 text-[#DC2626]"
            >
              <div className="bg-[#FEE2E2] rounded-xl p-2">
                <Bell className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-semibold">SOS</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
