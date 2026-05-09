import { useState } from 'react';
import {
  Shield,
  Home,
  ClipboardList,
  MapPin,
  School,
  Users,
  BarChart3,
  Bell,
  Settings,
  AlertTriangle,
  CheckCircle,
  Clock,
  PhoneCall,
  Send,
  Eye,
  ArrowLeft,
  Filter,
  Search,
  X,
  Image,
  Play,
  Paperclip,
} from 'lucide-react';

type Page = 'dashboard' | 'complaints' | 'map' | 'detail' | 'contact';

const complaints = [
  {
    id: 1,
    title: 'Сэтгэл санааны дарамт',
    time: '10:24 AM',
    school: '5-р сургууль, 9Б анги',
    level: 'Маш чухал',
    status: 'Тодорхой бус',
    desc: 'Ангид доромжлох, үг хэлээр дайрч байгаа гэсэн удаа дараа гомдол.',
  },
  {
    id: 2,
    title: 'Бие махбодын хүчирхийлэл',
    time: '09:51 AM',
    school: '12-р сургууль, спорт заал',
    level: 'Маш чухал',
    status: 'Тодорхой',
    desc: 'Түлхэх, цохих, эд зүйл хураах явдал гарсан.',
  },
  {
    id: 3,
    title: 'Сөрөг кибер дарамт',
    time: '09:15 AM',
    school: '3-р сургууль, 7А анги',
    level: 'Чухал',
    status: 'Тодорхой бус',
    desc: 'Нийгмийн сүлжээнд доромжилсон пост, худал мэдээлэл түгээж байна.',
  },
];

export default function AdminDashboard() {
  const [page, setPage] = useState<Page>('dashboard');
  const [selected, setSelected] = useState(complaints[0]);

  const openDetail = (item: typeof complaints[0]) => {
    setSelected(item);
    setPage('detail');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E9DDFF] via-[#F8F5FF] to-white p-4">
      <div className="max-w-6xl mx-auto bg-white/90 rounded-[34px] shadow-[0_20px_60px_rgba(124,58,237,0.22)] overflow-hidden border border-white flex">
        {/* Sidebar */}
        <aside className="w-[92px] bg-[#FAF7FF] border-r border-[#EDE9FE] px-3 py-5 hidden md:flex flex-col items-center">
          <div className="w-14 h-14 rounded-2xl bg-[#EDE9FE] flex items-center justify-center mb-6">
            <Shield className="text-[#7C3AED]" size={32} />
          </div>

          <NavBtn icon={<Home />} label="Хяналт" active={page === 'dashboard'} onClick={() => setPage('dashboard')} />
          <NavBtn icon={<ClipboardList />} label="Гомдлууд" active={page === 'complaints'} onClick={() => setPage('complaints')} />
          <NavBtn icon={<MapPin />} label="SOS зураг" active={page === 'map'} onClick={() => setPage('map')} />
          <NavBtn icon={<School />} label="Сургууль" />
          <NavBtn icon={<Users />} label="Хэрэглэгч" />
          <NavBtn icon={<BarChart3 />} label="Тайлан" />
          <NavBtn icon={<Bell />} label="Мэдэгдэл" />
          <NavBtn icon={<Settings />} label="Тохиргоо" />

          <div className="mt-auto text-center">
            <div className="text-[38px]">👻</div>
            <p className="text-[#312E81] text-[12px] font-bold">Админ</p>
            <p className="text-green-500 text-[11px]">● Онлайн</p>
          </div>
        </aside>

        {/* Content */}
        <main className="flex-1 p-5 md:p-7">
          {page === 'dashboard' && (
            <>
              <Header title="Хяналтын самбар" />

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <StatCard title="Нийт гомдол" value="128" sub="Өнөөдөр +18" color="purple" />
                <StatCard title="Шийдвэрлэгдээгүй" value="38" sub="29.7%" color="orange" />
                <StatCard title="Шийдвэрлэсэн" value="90" sub="70.3%" color="green" />
                <StatCard title="SOS дуудлага" value="9" sub="Өнөөдөр +3" color="red" />
              </div>

              <h2 className="text-[#312E81] font-bold text-lg mb-4">
                Шийдвэрлэх шаардлагатай чухал асуудлууд
              </h2>

              <div className="space-y-3">
                {complaints.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => openDetail(item)}
                    className="w-full bg-white rounded-[20px] border border-[#EDE9FE] p-4 flex items-center gap-4 hover:shadow-[0_10px_30px_rgba(124,58,237,0.12)] transition text-left"
                  >
                    <span className="text-red-500 font-bold text-xl">{item.id}</span>
                    <div className="w-12 h-12 rounded-2xl bg-[#F3E8FF] flex items-center justify-center">
                      <AlertTriangle className="text-[#7C3AED]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-[#312E81] font-bold">{item.title}</h3>
                      <p className="text-[#64748B] text-sm">{item.time} · {item.school}</p>
                    </div>
                    <span className="bg-red-50 text-red-500 px-3 py-1 rounded-full text-xs font-bold">
                      {item.level}
                    </span>
                  </button>
                ))}
              </div>
            </>
          )}

          {page === 'complaints' && (
            <>
              <Header title="Ирсэн гомдлууд" back={() => setPage('dashboard')} />

              <div className="flex gap-2 mb-4 overflow-x-auto">
                {['Бүгд', 'Эзэн тодорхой', 'Эзэн тодорхой бус', 'Шийдвэрлэгдээгүй', 'Шийдвэрлэсэн'].map((t, i) => (
                  <button
                    key={t}
                    className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap ${
                      i === 0 ? 'bg-[#7C3AED] text-white' : 'bg-white border border-[#EDE9FE] text-[#312E81]'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              <div className="flex justify-between items-center mb-4">
                <button className="bg-white border border-[#EDE9FE] rounded-xl px-4 py-2 text-[#312E81] font-bold text-sm">
                  Эрэмбэлэх: Яаралтай эхэнд
                </button>
                <button className="bg-white border border-[#EDE9FE] rounded-xl px-4 py-2 text-[#7C3AED] font-bold text-sm flex gap-2">
                  <Filter size={18} /> Шүүлтүүр
                </button>
              </div>

              <div className="space-y-3">
                {complaints.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => openDetail(item)}
                    className="w-full bg-white rounded-[22px] border border-[#EDE9FE] p-4 text-left shadow-[0_8px_26px_rgba(124,58,237,0.08)]"
                  >
                    <div className="flex justify-between">
                      <h3 className="text-[#312E81] font-bold">{item.title}</h3>
                      <span className="text-[#64748B] text-xs">{item.time}</span>
                    </div>
                    <p className="text-[#64748B] text-sm mt-2">{item.desc}</p>
                    <div className="flex gap-2 mt-3 flex-wrap">
                      <Tag text={item.school} />
                      <Tag text={item.level} red />
                      <Tag text={item.status} />
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}

          {page === 'map' && (
            <>
              <Header title="SOS газрын зураг" back={() => setPage('dashboard')} />

              <div className="bg-white rounded-[22px] border border-[#EDE9FE] p-4 mb-4 flex items-center gap-3">
                <Search className="text-[#A78BFA]" />
                <input
                  placeholder="Сургуулийн нэр эсвэл байршлаар хайх"
                  className="outline-none w-full text-sm"
                />
              </div>

              <div className="bg-[#F4F1FF] rounded-[26px] h-[360px] relative overflow-hidden border border-[#EDE9FE] mb-4">
                <div className="absolute inset-0 opacity-50 bg-[radial-gradient(circle_at_center,#C4B5FD_1px,transparent_1px)] [background-size:22px_22px]" />
                <div className="absolute left-1/2 top-1/2 w-72 h-72 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-[#A78BFA] bg-[#A78BFA]/10" />
                <div className="absolute left-1/2 top-[42%] -translate-x-1/2 bg-[#7C3AED] text-white rounded-full w-14 h-14 flex items-center justify-center shadow-xl">
                  <School />
                </div>
                <div className="absolute right-[22%] bottom-[23%] bg-red-500 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-xl">
                  <MapPin />
                </div>
                <div className="absolute right-[16%] bottom-[13%] bg-white rounded-xl px-4 py-2 shadow-lg text-center">
                  <p className="text-[#312E81] font-bold text-sm">SOS илгээсэн сурагч</p>
                  <p className="text-red-500 font-bold text-sm">120 м</p>
                </div>
              </div>

              <div className="bg-white rounded-[22px] border border-[#EDE9FE] p-5">
                <h3 className="text-[#312E81] font-bold mb-4 flex gap-2">
                  <span className="text-red-500">●</span> Идэвхтэй SOS
                </h3>
                <InfoRow label="Цаг" value="2024.05.09 · 10:24 AM" />
                <InfoRow label="Байршил" value="5-р сургуулийн урд талын цэцэрлэгийн зам" />
                <InfoRow label="Зай" value="120 м" />
                <InfoRow label="Төлөв" value="Идэвхтэй" red />
                <button
                  onClick={() => setPage('contact')}
                  className="mt-4 w-full bg-gradient-to-r from-[#7C3AED] to-[#8B5CF6] text-white rounded-[18px] py-4 font-bold"
                >
                  Холбогдох хүсэлт
                </button>
              </div>
            </>
          )}

          {page === 'detail' && (
            <>
              <Header title="Гомдлын дэлгэрэнгүй" back={() => setPage('complaints')} />

              <div className="bg-[#F8F5FF] rounded-[22px] p-5 border border-[#EDE9FE] mb-4 flex gap-4">
                <LockIcon />
                <div>
                  <h3 className="text-[#312E81] font-bold">Сурагчийн мэдээлэл нууцлагдсан</h3>
                  <p className="text-[#64748B] text-sm mt-1">
                    Сурагчийн хувийн мэдээллийг зөвхөн зөвшөөрөгдсөн хүн харна.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-[22px] border border-[#EDE9FE] p-5 mb-4">
                <h3 className="text-[#312E81] font-bold mb-3">Ерөнхий мэдээлэл</h3>
                <InfoRow label="Гомдлын төрөл" value={selected.title} />
                <InfoRow label="Байршил" value={selected.school} />
                <InfoRow label="Илгээсэн цаг" value={selected.time} />
                <InfoRow label="Эрэмбэ" value={selected.level} red />
                <InfoRow label="Эзэн" value={selected.status} />
              </div>

              <div className="bg-white rounded-[22px] border border-[#EDE9FE] p-5 mb-4">
                <h3 className="text-[#312E81] font-bold mb-2">Тайлбар</h3>
                <p className="text-[#64748B] text-sm leading-relaxed">{selected.desc}</p>
              </div>

              <div className="bg-white rounded-[22px] border border-[#EDE9FE] p-5 mb-4">
                <h3 className="text-[#312E81] font-bold mb-3">Баримт / нотолгоо</h3>
                <div className="grid grid-cols-3 gap-3">
                  <Evidence icon={<Image />} label="Зураг" />
                  <Evidence icon={<Play />} label="Видео" />
                  <Evidence icon={<Bell />} label="Voice 00:15" />
                </div>
              </div>

              <button
                onClick={() => setPage('contact')}
                className="w-full bg-gradient-to-r from-[#7C3AED] to-[#8B5CF6] text-white rounded-[18px] py-4 font-bold flex justify-center gap-2"
              >
                <Send size={20} /> Чамтай холбогдох шаардлагатай байна
              </button>
            </>
          )}

          {page === 'contact' && (
            <>
              <Header title="Холбогдох хүсэлт илгээх" back={() => setPage('detail')} />

              <div className="bg-white rounded-[22px] border border-[#EDE9FE] p-5 mb-5 flex gap-4">
                <div className="text-[42px]">👻</div>
                <div>
                  <h3 className="text-[#312E81] font-bold">Тодорхой хэрэглэгч</h3>
                  <p className="text-[#64748B] text-sm">8-р анги · S-240509-0012</p>
                </div>
              </div>

              <label className="text-[#312E81] font-bold text-sm">Хэнд хүсэлт илгээх вэ?</label>
              <button className="mt-2 mb-5 w-full bg-white border border-[#EDE9FE] rounded-[18px] px-4 py-4 flex justify-between text-[#312E81] font-bold">
                Сургуулийн нийгмийн ажилтан
                <span>⌄</span>
              </button>

              <label className="text-[#312E81] font-bold text-sm">Тайлбар</label>
              <textarea
                placeholder="Дэлгэрэнгүй тайлбар бичнэ үү..."
                className="mt-2 w-full h-40 rounded-[20px] border border-[#EDE9FE] p-4 outline-none resize-none"
              />

              <div className="grid grid-cols-3 gap-3 my-5">
                <Evidence icon={<Image />} label="Зураг" />
                <Evidence icon={<Play />} label="Видео" />
                <Evidence icon={<Paperclip />} label="Файл" />
              </div>

              <div className="bg-[#F8F5FF] rounded-[20px] p-4 text-[#64748B] text-sm mb-5">
                Энэ хүсэлтийг зөвхөн сонгосон хэрэглэгч хүлээн авч, зөвшөөрөл өгвөл харилцах боломжтой болно.
              </div>

              <button
                onClick={() => alert('Хүсэлт илгээгдлээ')}
                className="w-full bg-gradient-to-r from-[#7C3AED] to-[#8B5CF6] text-white rounded-[18px] py-4 font-bold flex justify-center gap-2"
              >
                <Send size={20} /> Хүсэлт илгээх
              </button>
            </>
          )}
        </main>
      </div>
    </div>
  );
}

function Header({ title, back }: { title: string; back?: () => void }) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        {back && (
          <button onClick={back} className="text-[#7C3AED]">
            <ArrowLeft size={24} />
          </button>
        )}
        <h1 className="text-[#312E81] text-2xl font-bold">{title}</h1>
      </div>
      <button className="bg-white border border-[#EDE9FE] rounded-xl px-4 py-2 text-[#312E81] font-bold text-sm">
        Өнөөдөр
      </button>
    </div>
  );
}

function NavBtn({ icon, label, active, onClick }: any) {
  return (
    <button onClick={onClick} className={`w-full flex flex-col items-center gap-1 py-3 rounded-2xl mb-1 ${active ? 'text-[#7C3AED] bg-[#F3E8FF]' : 'text-[#8B8BB8]'}`}>
      {icon}
      <span className="text-[11px] font-bold">{label}</span>
    </button>
  );
}

function StatCard({ title, value, sub, color }: any) {
  const styles: any = {
    purple: 'text-[#7C3AED]',
    orange: 'text-orange-500',
    green: 'text-green-500',
    red: 'text-red-500',
  };

  return (
    <div className="bg-white rounded-[22px] border border-[#EDE9FE] p-5 shadow-[0_8px_26px_rgba(124,58,237,0.08)]">
      <p className="text-[#64748B] text-sm font-bold">{title}</p>
      <h2 className={`text-3xl font-bold mt-2 ${styles[color]}`}>{value}</h2>
      <p className="text-[#64748B] text-xs mt-1">{sub}</p>
    </div>
  );
}

function Tag({ text, red }: { text: string; red?: boolean }) {
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-bold ${red ? 'bg-red-50 text-red-500' : 'bg-[#F3E8FF] text-[#7C3AED]'}`}>
      {text}
    </span>
  );
}

function InfoRow({ label, value, red }: any) {
  return (
    <div className="flex justify-between py-2 text-sm">
      <span className="text-[#64748B]">{label}</span>
      <span className={`font-bold ${red ? 'text-red-500' : 'text-[#312E81]'}`}>{value}</span>
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

function LockIcon() {
  return (
    <div className="w-12 h-12 rounded-2xl bg-[#EDE9FE] flex items-center justify-center text-[#7C3AED] flex-shrink-0">
      <Shield size={24} />
    </div>
  );
}