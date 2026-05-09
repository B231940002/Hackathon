import { motion } from 'motion/react';
import { X, MapPin, Clock, Phone } from 'lucide-react';

interface EmergencyAlertModalProps {
  onClose: () => void;
}

export default function EmergencyAlertModal({ onClose }: EmergencyAlertModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-5">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      />

      {/* Modal */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="relative bg-white rounded-[24px] p-6 shadow-[0_8px_32px_rgba(0,0,0,0.12)] max-w-sm w-full"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-[#F1F5F9] rounded-full transition-colors"
        >
          <X className="w-5 h-5 text-[#64748B]" />
        </button>

        {/* Alert Icon */}
        <div className="flex justify-center mb-4">
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className="bg-gradient-to-br from-[#DC2626] to-[#B91C1C] rounded-full w-20 h-20 flex items-center justify-center shadow-[0_4px_16px_rgba(220,38,38,0.3)]"
          >
            <span className="text-[40px]">🚨</span>
          </motion.div>
        </div>

        {/* Alert Header */}
        <div className="text-center mb-6">
          <h2 className="text-[24px] font-bold text-[#1E3A8A] mb-2">
            Emergency SOS Alert
          </h2>
          <p className="text-[#64748B] text-[14px]">
            Immediate attention required
          </p>
        </div>

        {/* Alert Details */}
        <div className="space-y-3 mb-6">
          <div className="bg-[#FEE2E2] rounded-[16px] p-4">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-[#DC2626] flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-[#1E3A8A] font-semibold text-[14px] mb-1">Location</div>
                <div className="text-[#DC2626] text-[15px] font-semibold">Building B, 2nd Floor</div>
                <div className="text-[#64748B] text-[12px] mt-0.5">Near Room 204</div>
              </div>
            </div>
          </div>

          <div className="bg-[#F8FAFC] rounded-[16px] p-4">
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-[#2563EB] flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-[#1E3A8A] font-semibold text-[14px] mb-1">Time Received</div>
                <div className="text-[#1E3A8A] text-[14px]">Just now (2:47 PM)</div>
              </div>
            </div>
          </div>

          <div className="bg-[#FEF3C7] rounded-[16px] p-4 border border-[#FDE68A]">
            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-[#F59E0B] flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-[#92400E] font-semibold text-[14px] mb-1">Recommended Action</div>
                <div className="text-[#92400E] text-[13px] leading-relaxed">
                  Dispatch security personnel immediately. Contact local authorities if necessary.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={onClose}
            className="w-full bg-[#DC2626] text-white py-4 rounded-[16px] font-semibold text-[15px] shadow-[0_4px_12px_rgba(220,38,38,0.25)] hover:bg-[#B91C1C] transition-all active:scale-[0.98]"
          >
            Acknowledge & Dispatch Team
          </button>
          <button
            onClick={onClose}
            className="w-full bg-[#F8FAFC] text-[#1E3A8A] py-4 rounded-[16px] font-semibold text-[15px] border-2 border-[#E2E8F0] hover:bg-[#F1F5F9] transition-all active:scale-[0.98]"
          >
            View on Heatmap
          </button>
        </div>

        {/* Anonymous Notice */}
        <div className="mt-4 text-center">
          <p className="text-[#64748B] text-[11px]">
            This alert was sent anonymously. No student identity was collected.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
