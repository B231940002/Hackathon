import { useNavigate } from 'react-router';
import { Shield, AlertCircle, ChevronRight } from 'lucide-react';

interface StudentHomeProps {
  onSOSAlert: () => void;
}

export default function StudentHome({ onSOSAlert }: StudentHomeProps) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen px-5 py-8 pb-24 max-w-md mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Shield className="w-8 h-8 text-[#2563EB]" />
          <h1 className="text-[28px] font-bold text-[#1E3A8A]">SafeSchool</h1>
        </div>
        <p className="text-[#64748B] text-[15px]">
          dnksjndkjbskfbh
        </p>
      </div>

      {/* Anonymous Report Card */}
      <div
        onClick={() => navigate('/report')}
        className="bg-white rounded-[20px] p-6 mb-5 shadow-[0_2px_8px_rgba(0,0,0,0.06)] cursor-pointer hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-shadow"
      >
        <div className="flex items-start justify-between mb-3">
          <div className="bg-[#EFF6FF] rounded-full p-3">
            <AlertCircle className="w-6 h-6 text-[#2563EB]" />
          </div>
          <ChevronRight className="w-5 h-5 text-[#94A3B8]" />
        </div>
        <h2 className="text-[20px] font-semibold text-[#1E3A8A] mb-2">
          Anonymous Report
        </h2>
        <p className="text-[#64748B] text-[14px] leading-relaxed">
          Report bullying, harassment, or safety concerns. Your identity is fully protected.
        </p>
      </div>

      {/* Silent SOS Button */}
      <div className="bg-gradient-to-br from-[#DC2626] to-[#B91C1C] rounded-[20px] p-8 shadow-[0_4px_16px_rgba(220,38,38,0.25)] mb-6">
        <div className="text-center">
          <div className="inline-flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-full w-20 h-20 mb-4">
            <div className="bg-white rounded-full w-14 h-14 flex items-center justify-center">
              <span className="text-[32px]">🚨</span>
            </div>
          </div>
          <h3 className="text-white text-[22px] font-bold mb-2">
            Яаралтай Тусламж
          </h3>
          <p className="text-white/90 text-[14px] mb-6 leading-relaxed">
            Tap to send an immediate emergency alert to school administrators
          </p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSOSAlert();
            }}
            className="bg-white text-[#DC2626] px-8 py-4 rounded-full font-semibold text-[16px] shadow-lg hover:shadow-xl transition-all active:scale-95"
          >
            Send Emergency Alert
          </button>
        </div>
      </div>

      {/* Privacy Notice */}
      <div className="bg-[#F1F5F9] rounded-[16px] p-5 border border-[#E2E8F0]">
        <div className="flex gap-3">
          <Shield className="w-5 h-5 text-[#2563EB] flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-[#1E3A8A] text-[14px] mb-1">
              100% Anonymous
            </h4>
            <p className="text-[#64748B] text-[13px] leading-relaxed">
              We never collect or store your identity. All reports are completely anonymous and secure.
            </p>
          </div>
        </div>
      </div>

      {/* View Admin Dashboard Link */}
      <div className="mt-8 text-center">
        <button
          onClick={() => navigate('/admin')}
          className="text-[#2563EB] text-[14px] font-medium hover:underline"
        >
          View Admin Dashboard →
        </button>
      </div>
    </div>
  );
}
