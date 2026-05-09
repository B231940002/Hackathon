import { useNavigate } from 'react-router';
import { ArrowLeft, Shield, Image, Play, Bell, Send } from 'lucide-react';

export default function AdminComplaintDetail() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E9DDFF] via-[#F8F5FF] to-white p-4">
      <div className="max-w-md mx-auto bg-white/90 rounded-[34px] shadow-[0_20px_60px_rgba(124,58,237,0.22)] border border-white p-5">
        <div className="flex items-center gap-3 mb-5">
          <button onClick={() => navigate('/admin/complaints')} className="text-[#7C3AED]">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-[#312E81] text-xl font-bold">Гомдлын дэлгэрэнгүй</h1>
        </div>

        <div className="bg-[#F8F5FF] rounded-[22px] p-5 border border-[#EDE9FE] mb-4 flex gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#EDE9FE] flex items-center justify-center text-[#7C3AED] flex-shrink-0">
            <Shield size={24} />
          </div>
          <div>
            <h3 className="text-[#312E81] font-bold">Сурагчийн мэдээлэл нууцлагдсан</h3>
            <p className="text-[#64748B] text-sm mt-1">
              Зөвхөн зөвшөөрөгдсөн хэрэглэгчид харагдана.
            </p>
          </div>
        </div>

        <Card title="Ерөнхий мэдээлэл">
          <InfoRow label="Гомдлын төрөл" value="Сэтгэл санааны дарамт" />
          <InfoRow label="Байршил" value="5-р сургууль, 9Б анги" />
          <InfoRow label="Илгээсэн цаг" value="2024.05.09 · 10:24 AM" />
          <InfoRow label="Эрэмбэ" value="Маш чухал" red />
          <InfoRow label="Эзэн" value="Тодорхой бус" />
        </Card>

        <Card title="Тайлбар">
          <p className="text-[#64748B] text-sm leading-relaxed">
            Ангид доромжлох, үг хэлээр дайрч байгаа удаа дараа сануулга өгсөн ч зогсоогүй байна.
            Сэтгэл санаагаар их хохирч байна.
          </p>
        </Card>

        <Card title="Баримт / нотолгоо">
          <div className="grid grid-cols-3 gap-3">
            <Evidence icon={<Image />} label="Зураг" />
            <Evidence icon={<Play />} label="Видео" />
            <Evidence icon={<Bell />} label="Voice" />
          </div>
        </Card>

        <Card title="Хяналтын түүх">
          <div className="space-y-3 text-sm">
            <p><span className="text-[#7C3AED] font-bold">10:24 AM</span> · Гомдол ирсэн</p>
            <p><span className="text-[#7C3AED] font-bold">10:25 AM</span> · Автомат ангилсан</p>
            <p><span className="text-[#7C3AED] font-bold">10:26 AM</span> · Админд хуваарилагдсан</p>
          </div>
        </Card>

        <button
          onClick={() => navigate('/admin/contact-request')}
          className="w-full bg-gradient-to-r from-[#7C3AED] to-[#8B5CF6] text-white rounded-[18px] py-4 font-bold flex justify-center gap-2"
        >
          <Send size={20} /> Чамтай холбогдох шаардлагатай байна
        </button>
      </div>
    </div>
  );
}

function Card({ title, children }: any) {
  return (
    <div className="bg-white rounded-[22px] border border-[#EDE9FE] p-5 mb-4">
      <h3 className="text-[#312E81] font-bold mb-3">{title}</h3>
      {children}
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

function Evidence({ icon, label }: any) {
  return (
    <button className="bg-[#F8F5FF] border border-[#EDE9FE] rounded-[18px] p-4 flex flex-col items-center gap-2 text-[#7C3AED] font-bold text-sm">
      {icon}
      {label}
    </button>
  );
}