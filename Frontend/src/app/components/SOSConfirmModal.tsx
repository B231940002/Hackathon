import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, MapPin, Clock, AlertTriangle, CheckCircle } from 'lucide-react';

interface SOSConfirmModalProps {
  onClose: () => void;
}

export default function SOSConfirmModal({ onClose }: SOSConfirmModalProps) {
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    setSent(true);
    setTimeout(() => {
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
      />

      {/* Modal */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="relative bg-white rounded-[32px] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.3)] max-w-sm w-full"
      >
        <AnimatePresence mode="wait">
          {!sent ? (
            <motion.div
              key="confirm"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-5 right-5 p-2 hover:bg-[#F1F5F9] rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-[#64748B]" />
              </button>

              {/* Alert Icon */}
              <div className="flex justify-center mb-6">
                <motion.div
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                  className="bg-gradient-to-br from-[#DC2626] to-[#B91C1C] rounded-full w-24 h-24 flex items-center justify-center shadow-[0_8px_32px_rgba(220,38,38,0.4)]"
                >
                  <span className="text-[48px]">🚨</span>
                </motion.div>
              </div>

              {/* Alert Header */}
              <div className="text-center mb-6">
                <h2 className="text-[28px] font-bold text-[#1E3A8A] mb-3">
                  Яаралтай дуудлага
                </h2>
                <p className="text-[#64748B] text-[15px] leading-relaxed">
                  Та яг одоо тусламж хэрэгтэй байна уу? Багш нар таны байршилд яаралтай ирэх болно.
                </p>
              </div>

              {/* Info */}
              <div className="space-y-3 mb-8">
                <div className="bg-[#FEF3C7] rounded-[18px] p-4 border border-[#FDE68A]">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-[#F59E0B] flex-shrink-0 mt-0.5" />
                    <p className="text-[#92400E] text-[13px] leading-relaxed font-medium">
                      Зөвхөн яаралтай тохиолдолд л энэ товчийг дарна уу
                    </p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-[#DCFCE7] to-[#BBF7D0] rounded-[18px] p-4 border border-[#86EFAC]">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#16A34A] flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-[#166534] font-bold text-[14px] mb-1">Таны байршил илгээгдэнэ</div>
                      <div className="text-[#166534] text-[13px]">Гэхдээ таны нэр нууц хэвээр үлдэнэ</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleSend}
                  className="w-full bg-gradient-to-r from-[#DC2626] to-[#EF4444] text-white py-5 rounded-[20px] font-bold text-[17px] shadow-[0_8px_24px_rgba(220,38,38,0.35)] hover:shadow-[0_12px_32px_rgba(220,38,38,0.45)] transition-all active:scale-[0.98]"
                >
                  Тийм, тусламж хэрэгтэй
                </button>
                <button
                  onClick={onClose}
                  className="w-full bg-[#F8FAFC] text-[#1E3A8A] py-5 rounded-[20px] font-bold text-[17px] border-2 border-[#E2E8F0] hover:bg-[#F1F5F9] transition-all active:scale-[0.98]"
                >
                  Цуцлах
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-6"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="inline-flex items-center justify-center bg-gradient-to-br from-[#DCFCE7] to-[#BBF7D0] rounded-full w-28 h-28 mb-6 shadow-[0_8px_32px_rgba(22,163,74,0.3)]"
              >
                <CheckCircle className="w-16 h-16 text-[#16A34A]" />
              </motion.div>
              <h2 className="text-[28px] font-bold text-[#1E3A8A] mb-3">Илгээгдлээ!</h2>
              <p className="text-[#64748B] text-[16px] mb-2">
                Тусламж замдаа байна
              </p>
              <p className="text-[#64748B] text-[14px]">
                Аюулгүй газар очоорой
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
