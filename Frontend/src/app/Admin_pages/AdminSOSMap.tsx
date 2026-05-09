import { useNavigate } from 'react-router';
import { ArrowLeft, Search, School, MapPin, Eye, Send } from 'lucide-react';

export default function AdminSOSMap() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E9DDFF] via-[#F8F5FF] to-white p-4">
      <div className="max-w-md mx-auto bg-white/90 rounded-[34px] shadow-[0_20px_60px_rgba(124,58,237,0.22)] border border-white p-5">
        <div className="flex items-center gap-3 mb-5">
          <button onClick={() => navigate('/admin')} className="text-[#7C3AED]">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-[#312E81] text-xl font-bold">SOS газрын зураг</h1>
          <button className="ml-auto border border-[#EDE9FE] px-3 py-1 rounded-xl text-[#312E81] text-sm font-bold">
            Бүгд⌄
          </button>
        </div>

        <div className="bg-white rounded-[18px] border border-[#EDE9FE] p-4 mb-4 flex items-center gap-3">
          <Search className="text-[#A78BFA]" />
          <input placeholder="Сургуулийн нэр эсвэл байршлаар хайх" className="outline-none w-full text-sm" />
        </div>

        <div className="bg-[#F4F1FF] rounded-[26px] h-[330px] relative overflow-hidden border border-[#EDE9FE] mb-4">
          <div className="absolute inset-0 opacity-50 bg-[radial-gradient(circle_at_center,#C4B5FD_1px,transparent_1px)] [background-size:22px_22px]" />
          <div className="absolute left-1/2 top-1/2 w-72 h-72 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-[#A78BFA] bg-[#A78BFA]/10" />
          <div className="absolute left-1/2 top-[42%] -translate-x-1/2 bg-[#7C3AED] text-white rounded-full w-14 h-14 flex items-center justify-center shadow-xl">
            <School />
          </div>
          <div className="absolute right-[22%] bottom-[23%] bg-red-500 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-xl">
            <MapPin />
          </div>
          <div className="absolute right-[15%] bottom-[10%] bg-white rounded-xl px-4 py-2 shadow-lg text-center">
            <p className="text-[#312E81] font-bold text-sm">SOS илгээсэн сурагч</p>
            <p className="text-red-500 font-bold text-sm">120 м</p>
          </div>
        </div>

        <div className="bg-white rounded-[22px] border border-[#EDE9FE] p-5">
          <h3 className="text-[#312E81] font-bold mb-4 flex gap-2">
            <span className="text-red-500">●</span> Идэвхтэй SOS
          </h3>

          <InfoRow label="Цаг" value="2024.05.09 · 10:24 AM" />
          <InfoRow label="Байршил" value="5-р сургуулийн урд талын зам" />
          <InfoRow label="Зай" value="120 м" />
          <InfoRow label="Төлөв" value="Идэвхтэй" red />

          <button
            onClick={() => navigate('/admin/complaint-detail')}
            className="mt-4 w-full bg-gradient-to-r from-[#7C3AED] to-[#8B5CF6] text-white rounded-[18px] py-4 font-bold flex items-center justify-center gap-2"
          >
            <Eye size={20} /> Дэлгэрэнгүй
          </button>

          <button
            onClick={() => navigate('/admin/contact-request')}
            className="mt-3 w-full border border-[#A78BFA] text-[#7C3AED] rounded-[18px] py-4 font-bold flex items-center justify-center gap-2"
          >
            <Send size={20} /> Холбогдох хүсэлт
          </button>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value, red }: any) {
  return (
    <div className="flex justify-between py-2 text-sm">
      <span className="text-[#64748B]">{label}</span>
      <span className={`font-bold text-right ${red ? 'text-red-500' : 'text-[#312E81]'}`}>{value}</span>
    </div>
  );
}