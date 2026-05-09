import { useNavigate } from 'react-router';
import { BarChart3, MapPin, AlertTriangle, FileText, Bell, TrendingUp, Shield, Clock, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function AdminDashboard() {
  const navigate = useNavigate();

  const recentReports = [
    { id: 1, type: 'Хүчирхийлэл', location: '2-р байр, коридор', time: '2 минутын өмнө', risk: 'high' },
    { id: 2, type: 'Дарамт', location: 'Цайны газар', time: '15 минутын өмнө', risk: 'medium' },
    { id: 3, type: 'Дээрэлхэлт', location: 'Биеийн тамирын заал', time: '1 цагийн өмнө', risk: 'high' },
    { id: 4, type: 'Сэтгэл санаа', location: 'Номын сан', time: '2 цагийн өмнө', risk: 'medium' },
    { id: 5, type: 'Дарамт', location: '3-р байр', time: '3 цагийн өмнө', risk: 'low' },
  ];

  const chartData = [
    { name: 'Дарамт', count: 45 },
    { name: 'Дээрэлхэлт', count: 32 },
    { name: 'Хүчирхийлэл', count: 28 },
    { name: 'Сэтгэл', count: 22 },
  ];

  return (
    <div className="min-h-screen pb-8">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#334155] px-6 pt-8 pb-8 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate('/')}
            className="mb-4 p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>

          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-[#F59E0B] to-[#D97706] rounded-2xl p-3 shadow-lg">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-white text-[32px] font-bold tracking-tight">Админ самбар</h1>
                <p className="text-white/70 text-[14px]">Бодит цагийн хяналт</p>
              </div>
            </div>

            <button className="relative p-3 bg-white/10 backdrop-blur-md hover:bg-white/20 rounded-2xl transition-colors">
              <Bell className="w-6 h-6 text-white" />
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute top-2 right-2 w-3 h-3 bg-[#DC2626] rounded-full border-2 border-[#0F172A]"
              />
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/10 backdrop-blur-lg rounded-[20px] p-4 border border-white/20"
            >
              <div className="flex items-center gap-2 mb-2">
                <FileText className="w-4 h-4 text-white/80" />
                <span className="text-white/70 text-[12px] font-medium">Нийт мэдээлэл</span>
              </div>
              <div className="text-[32px] font-bold text-white">127</div>
              <div className="text-[#16A34A] text-[11px] font-semibold mt-1">+12 энэ долоо хоног</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-[#DC2626] to-[#991B1B] rounded-[20px] p-4 shadow-[0_4px_20px_rgba(220,38,38,0.4)]"
            >
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-white" />
                <span className="text-white/90 text-[12px] font-medium">Өндөр эрсдэл</span>
              </div>
              <div className="text-[32px] font-bold text-white">8</div>
              <div className="text-white/80 text-[11px] font-semibold mt-1">Анхаарах шаардлагатай</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-[#F59E0B] to-[#D97706] rounded-[20px] p-4 shadow-[0_4px_20px_rgba(245,158,11,0.4)]"
            >
              <div className="flex items-center gap-2 mb-2">
                <Bell className="w-4 h-4 text-white" />
                <span className="text-white/90 text-[12px] font-medium">SOS дохио</span>
              </div>
              <div className="text-[32px] font-bold text-white">3</div>
              <div className="text-white/80 text-[11px] font-semibold mt-1">Одоо идэвхтэй</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white/10 backdrop-blur-lg rounded-[20px] p-4 border border-white/20"
            >
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-white/80" />
                <span className="text-white/70 text-[12px] font-medium">Хариу өгөх хугацаа</span>
              </div>
              <div className="text-[32px] font-bold text-white">12м</div>
              <div className="text-[#16A34A] text-[11px] font-semibold mt-1">-3м өмнөх долоо хоногоос</div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 -mt-6">
        <div className="grid md:grid-cols-2 gap-5 mb-5">
          {/* Recent Reports */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-[24px] p-6 shadow-[0_4px_24px_rgba(0,0,0,0.08)] border border-[#E2E8F0]"
          >
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-[20px] font-bold text-[#1E3A8A]">Сүүлийн мэдээллүүд</h2>
              <span className="text-[#64748B] text-[13px]">Шинэчлэгдсэн</span>
            </div>

            <div className="space-y-3 max-h-[400px] overflow-y-auto">
              {recentReports.map((report) => (
                <div
                  key={report.id}
                  className={`p-4 rounded-[16px] border-2 hover:shadow-md transition-all cursor-pointer ${
                    report.risk === 'high'
                      ? 'bg-gradient-to-br from-[#FEE2E2] to-[#FECACA] border-[#FCA5A5]'
                      : report.risk === 'medium'
                      ? 'bg-gradient-to-br from-[#FEF3C7] to-[#FDE68A] border-[#FCD34D]'
                      : 'bg-gradient-to-br from-[#E0F2FE] to-[#BAE6FD] border-[#7DD3FC]'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 shadow-sm ${
                      report.risk === 'high'
                        ? 'bg-[#DC2626]'
                        : report.risk === 'medium'
                        ? 'bg-[#F59E0B]'
                        : 'bg-[#2563EB]'
                    }`}>
                      <AlertTriangle className="w-5 h-5 text-white" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div className="font-bold text-[#1E3A8A] text-[15px]">
                          {report.type}
                        </div>
                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full flex-shrink-0 ${
                          report.risk === 'high'
                            ? 'bg-[#DC2626] text-white'
                            : report.risk === 'medium'
                            ? 'bg-[#F59E0B] text-white'
                            : 'bg-[#2563EB] text-white'
                        }`}>
                          {report.risk === 'high' ? 'ӨНДӨР' : report.risk === 'medium' ? 'ДУНД' : 'БАГА'}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-[#64748B] text-[13px]">
                        <MapPin className="w-3.5 h-3.5" />
                        <span className="truncate">{report.location}</span>
                      </div>
                      <div className="text-[#64748B] text-[12px] mt-1">
                        {report.time}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Chart */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-[24px] p-6 shadow-[0_4px_24px_rgba(0,0,0,0.08)] border border-[#E2E8F0]"
          >
            <h2 className="text-[20px] font-bold text-[#1E3A8A] mb-5">Мэдээллийн төрөл</h2>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis
                  dataKey="name"
                  tick={{ fill: '#64748B', fontSize: 12 }}
                  axisLine={{ stroke: '#E2E8F0' }}
                />
                <YAxis
                  tick={{ fill: '#64748B', fontSize: 12 }}
                  axisLine={{ stroke: '#E2E8F0' }}
                />
                <Tooltip
                  contentStyle={{
                    background: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    borderRadius: '12px',
                    fontSize: '13px'
                  }}
                />
                <Bar dataKey="count" fill="#2563EB" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>

            <div className="grid grid-cols-2 gap-3 mt-6">
              <button
                onClick={() => navigate('/heatmap')}
                className="bg-gradient-to-br from-[#EFF6FF] to-[#DBEAFE] hover:from-[#DBEAFE] hover:to-[#BFDBFE] rounded-[16px] p-4 transition-all border border-[#93C5FD] text-left"
              >
                <MapPin className="w-6 h-6 text-[#2563EB] mb-2" />
                <div className="font-bold text-[#1E3A8A] text-[14px]">Газрын зураг</div>
              </button>

              <div className="bg-gradient-to-br from-[#DCFCE7] to-[#BBF7D0] rounded-[16px] p-4 border border-[#86EFAC] text-left">
                <BarChart3 className="w-6 h-6 text-[#16A34A] mb-2" />
                <div className="font-bold text-[#166534] text-[14px]">Шинжилгээ</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
