import { useNavigate } from 'react-router';
import { AlertTriangle, CheckCircle, Clock, Shield } from 'lucide-react';
import { motion } from 'motion/react';

export default function RiskAnalysis() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen px-5 py-8 pb-24 max-w-md mx-auto">
      {/* Success Animation */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="mb-8"
      >
        <div className="bg-white rounded-[24px] p-8 shadow-[0_4px_16px_rgba(0,0,0,0.08)] text-center">
          <div className="inline-flex items-center justify-center bg-[#DCFCE7] rounded-full w-20 h-20 mb-4">
            <CheckCircle className="w-10 h-10 text-[#16A34A]" />
          </div>
          <h1 className="text-[24px] font-bold text-[#1E3A8A] mb-2">
            Report Submitted
          </h1>
          <p className="text-[#64748B] text-[15px]">
            Thank you for helping keep our school safe
          </p>
        </div>
      </motion.div>

      {/* AI Risk Analysis Result */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="bg-gradient-to-br from-[#DC2626] to-[#B91C1C] rounded-[24px] p-6 shadow-[0_4px_16px_rgba(220,38,38,0.25)] mb-5"
      >
        <div className="flex items-start gap-4 mb-4">
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
            <AlertTriangle className="w-7 h-7 text-white" />
          </div>
          <div className="flex-1">
            <div className="inline-block bg-white/20 backdrop-blur-sm text-white text-[12px] font-semibold px-3 py-1 rounded-full mb-2">
              AI ANALYSIS
            </div>
            <h2 className="text-white text-[22px] font-bold mb-1">
              High Risk Detected
            </h2>
            <p className="text-white/90 text-[14px] leading-relaxed">
              Our AI has analyzed this report and identified it as high priority requiring immediate attention.
            </p>
          </div>
        </div>

        <div className="space-y-2 mt-4">
          <div className="flex items-center gap-2 text-white/90 text-[13px]">
            <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
            <span>Severity Score: 8.7/10</span>
          </div>
          <div className="flex items-center gap-2 text-white/90 text-[13px]">
            <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
            <span>Keywords Matched: Threat, Violence</span>
          </div>
          <div className="flex items-center gap-2 text-white/90 text-[13px]">
            <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
            <span>Similar Reports: 2 in same location</span>
          </div>
        </div>
      </motion.div>

      {/* Next Steps */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="bg-white rounded-[20px] p-6 shadow-[0_2px_8px_rgba(0,0,0,0.06)] mb-5"
      >
        <h3 className="text-[18px] font-bold text-[#1E3A8A] mb-4">
          What Happens Next
        </h3>

        <div className="space-y-4">
          <div className="flex gap-3">
            <div className="bg-[#DBEAFE] rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">
              <Clock className="w-5 h-5 text-[#2563EB]" />
            </div>
            <div>
              <div className="font-semibold text-[#1E3A8A] text-[14px] mb-0.5">
                Immediate Review
              </div>
              <p className="text-[#64748B] text-[13px] leading-relaxed">
                School administrators have been notified and will review this report within 15 minutes.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="bg-[#DBEAFE] rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">
              <Shield className="w-5 h-5 text-[#2563EB]" />
            </div>
            <div>
              <div className="font-semibold text-[#1E3A8A] text-[14px] mb-0.5">
                Action Taken
              </div>
              <p className="text-[#64748B] text-[13px] leading-relaxed">
                Safety measures will be implemented and the situation will be addressed promptly.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="bg-[#DBEAFE] rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-5 h-5 text-[#2563EB]" />
            </div>
            <div>
              <div className="font-semibold text-[#1E3A8A] text-[14px] mb-0.5">
                Your Privacy Protected
              </div>
              <p className="text-[#64748B] text-[13px] leading-relaxed">
                Your identity remains completely anonymous throughout the entire process.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <button
          onClick={() => navigate('/report')}
          className="w-full bg-[#2563EB] text-white py-4 rounded-[16px] font-semibold text-[15px] shadow-[0_4px_12px_rgba(37,99,235,0.25)] hover:bg-[#1D4ED8] transition-all active:scale-[0.98]"
        >
          Submit Another Report
        </button>
        <button
          onClick={() => navigate('/')}
          className="w-full bg-white text-[#2563EB] py-4 rounded-[16px] font-semibold text-[15px] border-2 border-[#2563EB] hover:bg-[#EFF6FF] transition-all active:scale-[0.98]"
        >
          Return to Home
        </button>
      </div>
    </div>
  );
}
