import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Shield, AlertTriangle, Users, MessageSquare, MapPin, CheckCircle, Home, FileText, Bell } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function ReportForm() {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const reportTypes = [
    { id: 'bullying', label: 'Дарамт', icon: Users, color: '#F59E0B', gradient: 'from-[#FEF3C7] to-[#FDE68A]' },
    { id: 'harassment', label: 'Дээрэлхэлт', icon: AlertTriangle, color: '#DC2626', gradient: 'from-[#FEE2E2] to-[#FECACA]' },
    { id: 'violence', label: 'Хүчирхийлэл', icon: AlertTriangle, color: '#DC2626', gradient: 'from-[#FEE2E2] to-[#FECACA]' },
    { id: 'mental', label: 'Сэтгэл санааны асуудал', icon: MessageSquare, color: '#8B5CF6', gradient: 'from-[#EDE9FE] to-[#DDD6FE]' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedType && location && description) {
      setSubmitted(true);
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen pb-24">
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen flex items-center justify-center px-6"
          >
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="inline-flex items-center justify-center bg-gradient-to-br from-[#DCFCE7] to-[#BBF7D0] rounded-full w-28 h-28 mb-6 shadow-[0_8px_32px_rgba(22,163,74,0.25)]"
              >
                <CheckCircle className="w-16 h-16 text-[#16A34A]" />
              </motion.div>
              <h2 className="text-[28px] font-bold text-[#1E3A8A] mb-3">Амжилттай илгээлээ!</h2>
              <p className="text-[#64748B] text-[16px] mb-2">
                Таны мэдээлэл хүлээн авлаа
              </p>
              <p className="text-[#64748B] text-[14px] mb-8">
                Багш нар яаралтай хариу өгөх болно
              </p>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <button
                  onClick={() => navigate('/')}
                  className="text-[#2563EB] font-semibold text-[15px]"
                >
                  Нүүр хуудас руу буцах →
                </button>
              </motion.div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Header */}
            <div className="bg-gradient-to-br from-[#1E3A8A] via-[#2563EB] to-[#3B82F6] px-6 pt-8 pb-6 rounded-b-[32px] shadow-[0_8px_32px_rgba(37,99,235,0.2)]">
              <div className="max-w-md mx-auto">
                <button
                  onClick={() => navigate('/')}
                  className="mb-4 p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <ArrowLeft className="w-6 h-6 text-white" />
                </button>
                <h1 className="text-white text-[28px] font-bold mb-2">Нууцаар мэдэгдэх</h1>
                <p className="text-white/80 text-[14px]">Таны мэдээлэл бүрэн хамгаалагдана</p>
              </div>
            </div>

            <div className="max-w-md mx-auto px-6 -mt-4">

              <form onSubmit={handleSubmit} className="space-y-5 mt-6">
                {/* Report Type Selection */}
                <div className="bg-white rounded-[24px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-[#E2E8F0]">
                  <label className="block text-[#1E3A8A] font-bold text-[16px] mb-4">
                    Асуудлын төрөл
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {reportTypes.map((type) => {
                      const Icon = type.icon;
                      return (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => setSelectedType(type.id)}
                          className={`
                            bg-gradient-to-br ${type.gradient} rounded-[18px] p-4
                            transition-all border-2 relative overflow-hidden
                            ${selectedType === type.id
                              ? 'border-[#2563EB] shadow-[0_6px_20px_rgba(37,99,235,0.25)] scale-[1.02]'
                              : 'border-transparent hover:scale-[1.01]'
                            }
                          `}
                        >
                          {selectedType === type.id && (
                            <div className="absolute top-2 right-2 bg-[#2563EB] rounded-full w-5 h-5 flex items-center justify-center">
                              <CheckCircle className="w-3.5 h-3.5 text-white" />
                            </div>
                          )}
                          <Icon
                            className="w-8 h-8 mb-2 mx-auto"
                            style={{ color: type.color }}
                          />
                          <div className="text-[13px] font-semibold text-[#1E3A8A] leading-tight">
                            {type.label}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Location */}
                <div className="bg-white rounded-[24px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-[#E2E8F0]">
                  <label className="block text-[#1E3A8A] font-bold text-[16px] mb-3">
                    Байршил
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8]" />
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Жишээ нь: Цайны газар, 2 давхар..."
                      className="w-full bg-[#F8FAFC] rounded-[16px] px-12 py-4 text-[15px] text-[#1E3A8A] placeholder:text-[#94A3B8] border-2 border-transparent focus:border-[#2563EB] focus:bg-white focus:outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="bg-white rounded-[24px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-[#E2E8F0]">
                  <label className="block text-[#1E3A8A] font-bold text-[16px] mb-3">
                    Дэлгэрэнгүй тайлбар
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Юу болсон тухай бичнэ үү. Бидэнд тусалж чадах бүх мэдээллийг оруулна уу..."
                    rows={6}
                    className="w-full bg-[#F8FAFC] rounded-[16px] px-4 py-4 text-[15px] text-[#1E3A8A] placeholder:text-[#94A3B8] border-2 border-transparent focus:border-[#2563EB] focus:bg-white focus:outline-none transition-all resize-none"
                  />
                </div>

                {/* Privacy Notice */}
                <div className="bg-gradient-to-br from-[#DCFCE7] to-[#BBF7D0] rounded-[24px] p-5 border border-[#86EFAC]">
                  <div className="flex gap-3">
                    <Shield className="w-6 h-6 text-[#16A34A] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[#166534] text-[14px] leading-relaxed font-medium">
                        <span className="font-bold">Таны нууцлал хамгаалагдсан.</span> Энэхүү мэдээлэл бүрэн нууц байна. Бид таны IP хаяг болон ямар ч хувийн мэдээлэл хадгалахгүй.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={!selectedType || !location || !description}
                  className="w-full bg-gradient-to-r from-[#2563EB] to-[#3B82F6] text-white py-5 rounded-[20px] font-bold text-[17px] shadow-[0_8px_24px_rgba(37,99,235,0.3)] hover:shadow-[0_12px_32px_rgba(37,99,235,0.4)] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none active:scale-[0.98]"
                >
                  Илгээх
                </button>
              </form>
            </div>

            {/* Bottom Navigation */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E2E8F0] shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
              <div className="max-w-md mx-auto px-6 py-4">
                <div className="flex items-center justify-around">
                  <button
                    onClick={() => navigate('/')}
                    className="flex flex-col items-center gap-1 text-[#64748B] hover:text-[#2563EB] transition-colors"
                  >
                    <div className="hover:bg-[#F1F5F9] rounded-xl p-2 transition-colors">
                      <Home className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-semibold">Нүүр</span>
                  </button>

                  <button className="flex flex-col items-center gap-1 text-[#2563EB]">
                    <div className="bg-[#EFF6FF] rounded-xl p-2">
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

                  <button className="flex flex-col items-center gap-1 text-[#DC2626]">
                    <div className="bg-[#FEE2E2] rounded-xl p-2">
                      <Bell className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-semibold">SOS</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
