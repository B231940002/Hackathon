import { useNavigate } from 'react-router';
import { ArrowLeft, Filter, RefreshCw, UserRound } from 'lucide-react';

const complaints = [
  {
    id: 1,
    title: 'Сэтгэл санааны дарамт',
    desc: 'Ангид доромжлох, үг хэлээр дайрч байгаа гэсэн удаа дараа гомдол.',
    time: '10:24 AM',
    school: '5-р сургууль, 9Б анги',
    level: 'Маш чухал',
    status: 'Тодорхой бус',
    icon: '😡',
    color: 'bg-red-100',
    statusColor: 'bg-[#F3E8FF] text-[#7C3AED]',
  },
  {
    id: 2,
    title: 'Бие махбодын хүчирхийлэл',
    desc: 'Түлхэх, цохих, эд зүйл хураах явдал гарсан.',
    time: '09:51 AM',
    school: '12-р сургууль, спорт заал',
    level: 'Маш чухал',
    status: 'Тодорхой',
    icon: '💪',
    color: 'bg-orange-100',
    statusColor: 'bg-green-50 text-green-600',
  },
];

export default function AdminComplaints() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E9DDFF] via-[#F8F5FF] to-white p-4">
      <div className="max-w-md mx-auto bg-white/95 rounded-[34px] shadow-[0_20px_60px_rgba(124,58,237,0.22)] border border-white p-5">
        <div className="flex items-center gap-3 mb-5">
          <button onClick={() => navigate('/admin')} className="text-[#7C3AED]">
            <ArrowLeft size={24} />
          </button>

          <h1 className="text-[#312E81] text-xl font-bold">
            Ирсэн гомдлууд
          </h1>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-3">
          {['Бүгд', 'Эзэн тодорхой', 'Эзэн тодорхой бус'].map((item, index) => (
            <button
              key={item}
              className={`py-3 rounded-xl text-[12px] font-bold border ${
                index === 0
                  ? 'bg-gradient-to-r from-[#7C3AED] to-[#8B5CF6] text-white border-[#7C3AED] shadow-[0_8px_20px_rgba(124,58,237,0.22)]'
                  : 'bg-white text-[#312E81] border-[#EDE9FE]'
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-2 mb-4">
          {['Шийдвэрлэгдээгүй', 'Шийдвэрлэсэн'].map((item) => (
            <button
              key={item}
              className="py-3 rounded-xl text-[12px] font-bold bg-white text-[#312E81] border border-[#EDE9FE]"
            >
              {item}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between mb-4">
          <button className="bg-white border border-[#EDE9FE] rounded-xl px-4 py-2 text-[#312E81] font-bold text-[12px]">
            Эрэмбэлэх: <span className="text-[#7C3AED]">Яаралтай эхэнд</span> ⌄
          </button>

          <button className="bg-white border border-[#EDE9FE] rounded-xl px-4 py-2 text-[#7C3AED] font-bold text-[12px] flex items-center gap-2">
            <Filter size={16} />
            Шүүлтүүр
          </button>
        </div>

        <div className="space-y-3">
          {complaints.map((item) => (
            <button
              key={item.id}
              onClick={() => navigate('/admin/complaint-detail')}
              className="w-full bg-white rounded-[22px] border border-[#EDE9FE] p-4 text-left shadow-[0_8px_26px_rgba(124,58,237,0.08)]"
            >
              <div className="flex gap-3">
                <div className={`w-12 h-12 rounded-2xl ${item.color} flex items-center justify-center text-[28px] flex-shrink-0`}>
                  {item.icon}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between gap-2">
                    <h3 className="text-[#312E81] font-bold text-[15px]">
                      {item.title}
                    </h3>

                    <span className="text-[#64748B] text-[11px] font-bold whitespace-nowrap">
                      {item.time}
                    </span>
                  </div>

                  <p className="text-[#64748B] text-[12px] mt-1 leading-relaxed">
                    {item.desc}
                  </p>

                  <div className="flex items-center gap-2 mt-3 flex-wrap">
                    <span className="flex items-center gap-1 text-[#64748B] text-[11px] font-medium">
                      <UserRound size={14} />
                      {item.school}
                    </span>

                    <span className="bg-red-50 text-red-500 px-3 py-1 rounded-full text-[11px] font-bold">
                      ⚠ {item.level}
                    </span>

                    <span className={`${item.statusColor} px-3 py-1 rounded-full text-[11px] font-bold`}>
                      {item.status}
                    </span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        <button className="mt-5 w-full bg-[#F3E8FF] text-[#7C3AED] rounded-[18px] py-4 font-bold flex items-center justify-center gap-2">
          Шинэчлэх
          <RefreshCw size={18} />
        </button>
      </div>
    </div>
  );
}