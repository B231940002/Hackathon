import { useNavigate } from 'react-router';
import { ArrowLeft, Search, Filter, AlertTriangle } from 'lucide-react';

const complaints = [
  {
    title: 'Сэтгэл санааны дарамт',
    desc: 'Ангид доромжлох, үг хэлээр дайрч байгаа тухай гомдол.',
    time: '10:24 AM',
    school: '5-р сургууль',
    level: 'Маш чухал',
  },
  {
    title: 'Бие махбодын хүчирхийлэл',
    desc: 'Түлхэх, цохих, эд зүйл хураах үйлдэл гарсан.',
    time: '09:51 AM',
    school: '12-р сургууль',
    level: 'Маш чухал',
  },
  {
    title: 'Сөрөг кибер дарамт',
    desc: 'Нийгмийн сүлжээнд доромжилсон мэдээлэл түгээсэн.',
    time: '09:15 AM',
    school: '3-р сургууль',
    level: 'Чухал',
  },
  {
    title: 'Цахим дарамт',
    desc: 'Групп чат дээр доромжлох, зураг тараах асуудал.',
    time: '08:42 AM',
    school: '8-р сургууль',
    level: 'Дунд',
  },
];

export default function AdminComplaintHistory() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E9DDFF] via-[#F8F5FF] to-white p-4">
      <div className="max-w-md mx-auto bg-white/90 rounded-[34px] shadow-[0_20px_60px_rgba(124,58,237,0.22)] border border-white p-5">
        <div className="flex items-center gap-3 mb-5">
          <button onClick={() => navigate('/admin')} className="text-[#7C3AED]">
            <ArrowLeft size={24} />
          </button>

          <h1 className="text-[#312E81] text-xl font-bold">
            Бүх гомдлын түүх
          </h1>
        </div>

        <div className="bg-white rounded-[18px] border border-[#EDE9FE] px-4 py-3 mb-4 flex items-center gap-3">
          <Search className="text-[#A78BFA]" size={20} />
          <input
            placeholder="Гомдол хайх..."
            className="outline-none w-full text-sm bg-transparent"
          />
        </div>

        <div className="flex gap-2 mb-4 overflow-x-auto">
          {['Бүгд', 'Өнөөдөр', 'Маш чухал', 'Шийдвэрлэсэн', 'Шийдвэрлэгдээгүй'].map((item, index) => (
            <button
              key={item}
              className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap ${
                index === 0
                  ? 'bg-[#7C3AED] text-white'
                  : 'bg-white border border-[#EDE9FE] text-[#312E81]'
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <button className="w-full mb-4 bg-[#F8F5FF] border border-[#EDE9FE] rounded-[18px] px-4 py-3 flex items-center justify-center gap-2 text-[#7C3AED] font-bold">
          <Filter size={18} />
          Шүүлтүүр ашиглах
        </button>

        <div className="space-y-3">
          {complaints.map((item, index) => (
            <button
              key={index}
              onClick={() => navigate('/admin/complaint-detail')}
              className="w-full bg-white rounded-[22px] border border-[#EDE9FE] p-4 text-left shadow-[0_8px_26px_rgba(124,58,237,0.08)]"
            >
              <div className="flex justify-between gap-3">
                <h3 className="text-[#312E81] font-bold flex gap-2">
                  <AlertTriangle className="text-red-500" size={20} />
                  {item.title}
                </h3>

                <span className="text-[#64748B] text-xs">
                  {item.time}
                </span>
              </div>

              <p className="text-[#64748B] text-sm mt-2">
                {item.desc}
              </p>

              <div className="flex gap-2 mt-3 flex-wrap">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#F3E8FF] text-[#7C3AED]">
                  {item.school}
                </span>

                <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-50 text-red-500">
                  {item.level}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}