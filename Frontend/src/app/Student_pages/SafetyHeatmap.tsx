import { useNavigate } from 'react-router';
import {
  Bell,
  FileText,
  ArrowLeft,
  AlertTriangle,
  Home as HomeIcon,
  Info,
  ShieldAlert,
  HeartHandshake,
  MapPin,
} from 'lucide-react';

export default function SafetyHeatmap() {
  const navigate = useNavigate();

  const hotspots = [
    { id: 1, label: 'Б байрны коридор', reports: 12, x: '25%', y: '30%', risk: 'High' },
    { id: 2, label: 'Цайны газар', reports: 8, x: '60%', y: '45%', risk: 'Medium' },
    { id: 3, label: 'Спортын заал', reports: 5, x: '70%', y: '70%', risk: 'Low' },
  ];

  const handleSOS = () => {
    alert("SOS дуудлага илгээгдлээ!");
  };

  return (
    <div className="min-h-screen bg-[#F1F5F9] pb-32">
      {/* Header - Будэг нил ягаан (Muted Lavender) */}
      <div className="bg-[#E0E7FF] px-6 pt-10 pb-12 rounded-b-[40px] shadow-sm relative overflow-hidden">
        {/* Чимэглэл - Зөөлөн дугуйнууд */}
        <div className="absolute top-[-20px] right-[-20px] w-32 h-32 bg-[#C7D2FE]/40 rounded-full blur-2xl"></div>
        
        <div className="max-w-md mx-auto relative z-10">
          <button
            onClick={() => navigate('/')}
            className="mb-6 p-2 bg-white/50 hover:bg-white/80 rounded-2xl transition-all"
          >
            <ArrowLeft className="w-5 h-5 text-[#4338CA]" />
          </button>
          <div className="flex justify-between items-end">
            <div>
              <h1 className="text-[#312E81] text-[26px] font-bold tracking-tight">Аюулын зураглал</h1>
              <p className="text-[#4338CA]/70 text-[13px] mt-1 font-medium">Шинэчлэгдсэн: 5 минутын өмнө</p>
            </div>
            <div className="bg-white/40 p-3 rounded-2xl border border-white/20">
              <ShieldAlert className="w-6 h-6 text-[#4338CA]" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 -mt-8 relative z-20">
        {/* Status Legend - Clean & Simple */}
        <div className="bg-white/90 backdrop-blur-md rounded-[24px] p-4 shadow-sm mb-6 flex justify-around items-center border border-white">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-[#EF4444] rounded-full"></div>
            <span className="text-[11px] font-bold text-slate-500 uppercase">Өндөр</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-[#F59E0B] rounded-full"></div>
            <span className="text-[11px] font-bold text-slate-500 uppercase">Дунд</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-[#10B981] rounded-full"></div>
            <span className="text-[11px] font-bold text-slate-500 uppercase">Аюулгүй</span>
          </div>
        </div>

        {/* Heatmap Section - Буцаад хуучин хэлбэрээр (Original Floor Plan) */}
        <div className="bg-white rounded-[28px] p-4 shadow-sm mb-6 border border-slate-200">
          <div className="aspect-[4/3] bg-[#F8FAFC] rounded-[16px] border-2 border-[#E2E8F0] relative overflow-hidden">
            {/* School Floor Plan Background Layout */}
            <div className="absolute inset-0 p-4 opacity-60">
              <div className="w-full h-full border-2 border-[#CBD5E1] rounded-lg relative">
                {/* Rooms/Areas */}
                <div className="absolute top-4 left-4 w-[30%] h-[35%] border border-[#CBD5E1] rounded bg-white"></div>
                <div className="absolute top-4 right-4 w-[30%] h-[35%] border border-[#CBD5E1] rounded bg-white"></div>
                <div className="absolute bottom-4 left-4 w-[40%] h-[35%] border border-[#CBD5E1] rounded bg-white"></div>
                <div className="absolute bottom-4 right-4 w-[35%] h-[35%] border border-[#CBD5E1] rounded bg-white"></div>
                {/* Hallway */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[12%] bg-[#E2E8F0]/50 rounded-sm"></div>
              </div>
            </div>

            {/* Hotspot Indicators */}
            {hotspots.map((spot) => (
              <div key={spot.id} className="absolute transition-transform hover:scale-110" style={{ left: spot.x, top: spot.y }}>
                <div className="relative">
                  <div className="absolute -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-[#4F46E5] rounded-full opacity-20 animate-ping"></div>
                  <div className="absolute -translate-x-1/2 -translate-y-1/2 w-7 h-7 bg-[#4338CA] rounded-full shadow-md flex items-center justify-center border-2 border-white">
                    <AlertTriangle className="w-3 h-3 text-white" />
                  </div>
                </div>
              </div>
            ))}

            <div className="absolute top-3 left-3 bg-white/90 px-3 py-1.5 rounded-lg text-[10px] font-bold text-[#312E81] border border-slate-200 uppercase tracking-tight">
              Үндсэн байр - 1 Давхар
            </div>
          </div>
        </div>

        {/* Areas List - Soft Colors */}
        <div className="space-y-3 mb-8">
          <h2 className="text-[18px] font-bold text-slate-800 px-1">Мэдээлэгдсэн цэгүүд</h2>
          {hotspots.map((spot) => (
            <div key={spot.id} className="bg-white p-4 rounded-[22px] border border-slate-100 flex items-center gap-4 transition-all active:bg-slate-50">
              <div className="w-11 h-11 bg-[#EEF2FF] rounded-xl flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-[#4338CA]" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-slate-800 text-[14px]">{spot.label}</h3>
                <p className="text-slate-400 text-[12px]">
                  Сүүлийн сард <span className="text-[#4338CA] font-medium">{spot.reports} удаа</span>
                </p>
              </div>
              <div className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${spot.risk === 'High' ? 'bg-rose-50 text-rose-600' : 'bg-amber-50 text-amber-600'}`}>
                {spot.risk === 'High' ? 'ӨНДӨР' : 'ДУНД'}
              </div>
            </div>
          ))}
        </div>

        {/* Advice Section - Muted Indigo */}
        <div className="bg-[#E0E7FF]/60 rounded-[28px] p-6 border border-[#C7D2FE]/50 relative overflow-hidden">
          <h3 className="text-[16px] font-bold text-[#312E81] mb-3 flex items-center gap-2">
            <Info size={18} /> Зөвлөмж
          </h3>
          <ul className="space-y-3">
            <li className="flex gap-3 text-[13px] text-[#312E81]/80 font-medium leading-snug">
              <div className="w-1.5 h-1.5 bg-[#4338CA] rounded-full mt-1.5 flex-shrink-0"></div>
              Оргил цагуудад хяналтын ажилчдыг нэмэгдүүлэх
            </li>
            <li className="flex gap-3 text-[13px] text-[#312E81]/80 font-medium leading-snug">
              <div className="w-1.5 h-1.5 bg-[#4338CA] rounded-full mt-1.5 flex-shrink-0"></div>
              Цайны газарт нэмэлт хяналтын систем суурилуулах
            </li>
          </ul>
        </div>
      </div>

      {/* Navigation - Clean Muted Style */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md bg-white/90 backdrop-blur-lg rounded-[30px] shadow-lg px-6 py-3 z-50 border border-slate-100">
        <div className="flex items-center justify-between">
          <button onClick={() => navigate('/')} className="p-3 text-slate-400">
            <HomeIcon size={24} />
          </button>
          
          <button onClick={() => navigate('/report')} className="p-3 text-slate-400">
            <HeartHandshake size={24} />
          </button>
          
          <button onClick={() => navigate('/heatmap')} className="flex flex-col items-center gap-1 text-[#4338CA]">
            <div className="bg-[#EEF2FF] p-2.5 rounded-2xl mb-0.5 shadow-sm">
              <MapPin size={24} strokeWidth={2.5} />
            </div>
          </button>
          
          <button onClick={handleSOS} className="p-3 text-rose-400 active:scale-90 transition-transform">
            <Bell size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}