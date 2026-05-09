import { useNavigate } from 'react-router';
import { ArrowLeft, MapPin, AlertTriangle, Home, FileText, Bell } from 'lucide-react';

export default function SafetyHeatmap() {
  const navigate = useNavigate();

  const hotspots = [
    { id: 1, label: 'Building B Hallway', reports: 12, x: '25%', y: '30%' },
    { id: 2, label: 'Cafeteria', reports: 8, x: '60%', y: '45%' },
    { id: 3, label: 'Gymnasium', reports: 5, x: '70%', y: '70%' },
  ];

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#1E3A8A] via-[#2563EB] to-[#3B82F6] px-6 pt-8 pb-6 rounded-b-[32px] shadow-[0_8px_32px_rgba(37,99,235,0.2)]">
        <div className="max-w-md mx-auto">
          <button
            onClick={() => navigate('/')}
            className="mb-4 p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-white text-[28px] font-bold mb-2">Аюулын газрын зураг</h1>
          <p className="text-white/80 text-[14px]">Шинэчлэгдсэн: 5 минутын өмнө</p>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 -mt-4">

        {/* Legend */}
        <div className="bg-white rounded-[24px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.08)] mb-5 border border-[#E2E8F0] mt-6">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-gradient-to-br from-[#DC2626] to-[#EF4444] rounded-full shadow-sm"></div>
              <span className="text-[13px] font-semibold text-[#1E3A8A]">Өндөр эрсдэл</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-gradient-to-br from-[#F59E0B] to-[#FBBF24] rounded-full shadow-sm"></div>
              <span className="text-[13px] font-semibold text-[#1E3A8A]">Дунд</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-gradient-to-br from-[#16A34A] to-[#22C55E] rounded-full shadow-sm"></div>
              <span className="text-[13px] font-semibold text-[#1E3A8A]">Аюулгүй</span>
            </div>
          </div>
        </div>

        {/* Heatmap Visualization */}
        <div className="bg-white rounded-[24px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.08)] mb-5 border border-[#E2E8F0]">
        <div className="aspect-[4/3] bg-[#F8FAFC] rounded-[12px] border-2 border-[#E2E8F0] relative overflow-hidden">
          {/* School Floor Plan Background */}
          <div className="absolute inset-0 p-4">
            {/* Building outline */}
            <div className="w-full h-full border-2 border-[#CBD5E1] rounded-lg relative">
              {/* Rooms/Areas */}
              <div className="absolute top-4 left-4 w-[30%] h-[35%] border border-[#CBD5E1] rounded bg-white/50"></div>
              <div className="absolute top-4 right-4 w-[30%] h-[35%] border border-[#CBD5E1] rounded bg-white/50"></div>
              <div className="absolute bottom-4 left-4 w-[40%] h-[35%] border border-[#CBD5E1] rounded bg-white/50"></div>
              <div className="absolute bottom-4 right-4 w-[35%] h-[35%] border border-[#CBD5E1] rounded bg-white/50"></div>

              {/* Hallway */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[10%] bg-[#E2E8F0]/30"></div>
            </div>

            {/* Hotspot Indicators */}
            {hotspots.map((spot) => (
              <div
                key={spot.id}
                className="absolute"
                style={{ left: spot.x, top: spot.y }}
              >
                {/* Pulsing circle */}
                <div className="relative">
                  <div className="absolute -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-[#DC2626] rounded-full opacity-20 animate-ping"></div>
                  <div className="absolute -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-[#DC2626] rounded-full opacity-40"></div>
                  <div className="absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-[#DC2626] rounded-full flex items-center justify-center">
                    <AlertTriangle className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Floor Plan Label */}
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg text-[11px] font-bold text-[#1E3A8A]">
            Үндсэн байр - 1 давхар
          </div>
        </div>
        </div>

        {/* Hotspot List */}
        <div className="bg-white rounded-[24px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-[#E2E8F0]">
          <h2 className="text-[20px] font-bold text-[#1E3A8A] mb-4">Эрсдэлтэй газрууд</h2>

          <div className="space-y-3">
            {hotspots.map((spot) => (
              <div key={spot.id} className="flex items-center gap-3 p-4 bg-gradient-to-br from-[#FEE2E2] to-[#FECACA] rounded-[18px] border border-[#FCA5A5]">
                <div className="bg-gradient-to-br from-[#DC2626] to-[#EF4444] rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 shadow-lg">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="font-bold text-[#1E3A8A] text-[15px] mb-1">
                    {spot.label}
                  </div>
                  <div className="text-[#DC2626] text-[13px] font-semibold">
                    Сүүлийн 30 өдөрт {spot.reports} мэдээлэл
                  </div>
                </div>
                <div className="bg-gradient-to-r from-[#DC2626] to-[#B91C1C] text-white text-[11px] font-bold px-3 py-1.5 rounded-full shadow-md">
                  ӨНДӨР
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div className="mt-5 bg-gradient-to-br from-[#EFF6FF] to-[#DBEAFE] rounded-[24px] p-6 border border-[#93C5FD] shadow-[0_4px_20px_rgba(37,99,235,0.1)]">
          <h3 className="text-[18px] font-bold text-[#1E3A8A] mb-4">
            Зөвлөмж
          </h3>
          <ul className="space-y-3">
            <li className="flex gap-3 text-[#1E3A8A] text-[14px]">
              <span className="text-[#2563EB] flex-shrink-0 font-bold text-[16px]">•</span>
              <span className="leading-relaxed">Оргил цагуудад хяналтыг нэмэгдүүлэх</span>
            </li>
            <li className="flex gap-3 text-[#1E3A8A] text-[14px]">
              <span className="text-[#2563EB] flex-shrink-0 font-bold text-[16px]">•</span>
              <span className="leading-relaxed">Цайны газарт нэмэлт камер суурилуулах</span>
            </li>
            <li className="flex gap-3 text-[#1E3A8A] text-[14px]">
              <span className="text-[#2563EB] flex-shrink-0 font-bold text-[16px]">•</span>
              <span className="leading-relaxed">Завсарлагааны үед зөвлөх багш ажиллуулах</span>
            </li>
          </ul>
        </div>
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

            <button
              onClick={() => navigate('/report')}
              className="flex flex-col items-center gap-1 text-[#64748B] hover:text-[#2563EB] transition-colors"
            >
              <div className="hover:bg-[#F1F5F9] rounded-xl p-2 transition-colors">
                <FileText className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-semibold">Мэдэгдэх</span>
            </button>

            <button className="flex flex-col items-center gap-1 text-[#2563EB]">
              <div className="bg-[#EFF6FF] rounded-xl p-2">
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
    </div>
  );
}
