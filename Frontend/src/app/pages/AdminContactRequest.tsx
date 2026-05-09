import { useNavigate } from 'react-router';
import { X, User, Image, Play, Paperclip, Shield, Send } from 'lucide-react';

export default function AdminContactRequest() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E9DDFF] via-[#F8F5FF] to-white p-4">
      <div className="max-w-md mx-auto bg-white/95 rounded-[34px] shadow-[0_20px_60px_rgba(124,58,237,0.22)] border border-white p-6">
        <button onClick={() => navigate(-1)} className="text-[#312E81] mb-6">
          <X size={24} />
        </button>

        <h1 className="text-[#1E1B4B] text-2xl font-bold mb-6">
          Холбогдох хүсэлт илгээх
        </h1>

        <div className="bg-white rounded-[22px] border border-[#EDE9FE] p-5 mb-5 flex gap-4">
          <div className="text-[42px]">👻</div>
          <div>
            <h3 className="text-[#312E81] font-bold">Тодорхой хэрэглэгч</h3>
            <p className="text-[#64748B] text-sm">8-р анги · S-240509-0012</p>
          </div>
        </div>

        <label className="text-[#312E81] font-bold text-sm">Хэнд хүсэлт илгээх вэ?</label>
        <button className="mt-2 mb-5 w-full bg-white border border-[#EDE9FE] rounded-[18px] px-4 py-4 flex justify-between text-[#312E81] font-bold">
          <span className="flex gap-2"><User size={20} /> Сургуулийн нийгмийн ажилтан</span>
          <span>⌄</span>
        </button>

        <label className="text-[#312E81] font-bold text-sm">Тайлбар</label>
        <textarea
          placeholder="Дэлгэрэнгүй тайлбар бичнэ үү..."
          className="mt-2 w-full h-40 rounded-[20px] border border-[#EDE9FE] p-4 outline-none resize-none"
        />

        <p className="text-right text-[#94A3B8] text-xs mt-1 mb-5">0/500</p>

        <label className="text-[#312E81] font-bold text-sm">Хавсралт нэмэх</label>

        <div className="grid grid-cols-3 gap-3 my-4">
          <Evidence icon={<Image />} label="Зураг" />
          <Evidence icon={<Play />} label="Видео" />
          <Evidence icon={<Paperclip />} label="Файл" />
        </div>

        <div className="bg-[#F8F5FF] rounded-[20px] p-4 text-[#64748B] text-sm mb-5 flex gap-3">
          <Shield className="text-[#7C3AED] flex-shrink-0" />
          <p>
            Энэ хүсэлтийг зөвхөн сонгосон хэрэглэгч хүлээн авч, зөвшөөрөл өгвөл харилцах боломжтой болно.
          </p>
        </div>

        <button
          onClick={() => alert('Хүсэлт илгээгдлээ')}
          className="w-full bg-gradient-to-r from-[#7C3AED] to-[#8B5CF6] text-white rounded-[18px] py-4 font-bold flex justify-center gap-2"
        >
          <Send size={20} /> Хүсэлт илгээх
        </button>

        <button onClick={() => navigate(-1)} className="w-full text-[#7C3AED] font-bold mt-5">
          Цуцлах
        </button>
      </div>
    </div>
  );
}

function Evidence({ icon, label }: any) {
  return (
    <button className="bg-white border border-[#EDE9FE] rounded-[18px] p-4 flex flex-col items-center gap-2 text-[#7C3AED] font-bold text-sm">
      {icon}
      {label}
    </button>
  );
}