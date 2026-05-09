import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  Shield,
  Home,
  ClipboardList,
  History,
  MapPin,
  School,
  Bell,
  UserPlus,
  Search,
  Filter,
  AlertTriangle,
} from 'lucide-react';

const historyItems = [
  {
    title: 'Сэтгэл санааны дарамт',
    desc: 'Ангид доромжлох, үг хэлээр дайрч байгаа тухай гомдол.',
    time: '10:24 AM',
    date: '2026-05-10',
    school: '5-р сургууль',
    level: 'Маш чухал',
    icon: '😡',
    type: 'Гомдол',
    status: 'Pending',
  },
  {
    title: 'Бие махбодын хүчирхийлэл',
    desc: 'Түлхэх, цохих, эд зүйл хураах үйлдэл гарсан.',
    time: '09:51 AM',
    date: '2026-05-10',
    school: '12-р сургууль',
    level: 'Маш чухал',
    icon: '💪',
    type: 'Гомдол',
    status: 'Pending',
  },
  {
    title: 'SOS дуудлага',
    desc: 'Яаралтай тусламжийн SOS сигнал илгээгдсэн.',
    time: '09:15 AM',
    date: '2026-05-09',
    school: '5-р сургууль',
    level: 'SOS',
    icon: '🚨',
    type: 'SOS',
    status: 'Шийдвэрлэсэн',
  },
  {
    title: 'SOS дуудлага',
    desc: 'Сурагч аюултай нөхцөлөөс тусламж хүссэн.',
    time: '08:42 AM',
    date: '2026-05-08',
    school: '12-р сургууль',
    level: 'SOS',
    icon: '🚨',
    type: 'SOS',
    status: 'Pending',
  },
];

export default function AdminComplaintHistory() {
  const navigate = useNavigate();

  const [activeFilter, setActiveFilter] = useState('Бүх гомдол');
  const [showFilter, setShowFilter] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const filteredItems = historyItems.filter((item) => {
    const itemDate = new Date(item.date);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    const matchesDate =
      (!start || itemDate >= start) &&
      (!end || itemDate <= end);

    let matchesFilter = true;

    if (activeFilter === 'Бүх гомдол') {
      matchesFilter = item.type === 'Гомдол';
    }

    if (activeFilter === 'SOS түүх') {
      matchesFilter = item.type === 'SOS';
    }

    if (activeFilter === 'Шийдвэрлэсэн') {
      matchesFilter = item.status === 'Шийдвэрлэсэн';
    }

    if (activeFilter === 'Pending') {
      matchesFilter = item.status === 'Pending';
    }

    return matchesFilter && matchesDate;
  });

  const clearDateFilter = () => {
    setStartDate('');
    setEndDate('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E9DDFF] via-[#F8F5FF] to-white p-3 md:p-4">
      <div className="max-w-6xl mx-auto bg-white/90 rounded-[28px] md:rounded-[34px] shadow-[0_20px_60px_rgba(124,58,237,0.22)] overflow-hidden border border-white flex flex-col md:flex-row">
        <AdminSidebar active="history" />

        <main className="flex-1 p-4 md:p-6 pb-24 md:pb-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-5 md:mb-6">
            <div>
              <h1 className="text-[#312E81] text-[24px] md:text-[28px] font-bold">
                Түүх
              </h1>

              <p className="text-[#94A3B8] text-sm mt-1">
                Гомдол, SOS болон шийдвэрлэлтийн түүхийг харах
              </p>
            </div>

            <button className="w-fit bg-white border border-[#EDE9FE] rounded-xl px-4 py-2 text-[#312E81] font-bold text-sm">
              Өнөөдөр ⌄
            </button>
          </div>

          <div className="bg-white rounded-[20px] border border-[#EDE9FE] px-4 py-3 mb-4 flex items-center gap-3">
            <Search className="text-[#A78BFA]" size={20} />
            <input
              placeholder="Түүхээс хайх..."
              className="outline-none w-full text-sm bg-transparent"
            />
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-5">
            <div className="flex gap-2 overflow-x-auto pb-1">
              {['Бүх гомдол', 'SOS түүх', 'Шийдвэрлэсэн', 'Pending'].map(
                (item) => (
                  <button
                    key={item}
                    onClick={() => setActiveFilter(item)}
                    className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition ${
                      activeFilter === item
                        ? 'bg-[#7C3AED] text-white shadow-[0_8px_20px_rgba(124,58,237,0.22)]'
                        : 'bg-white border border-[#EDE9FE] text-[#312E81]'
                    }`}
                  >
                    {item}
                  </button>
                )
              )}
            </div>

            <button
              onClick={() => setShowFilter(!showFilter)}
              className="bg-[#F8F5FF] border border-[#EDE9FE] rounded-xl px-4 py-2 flex items-center justify-center gap-2 text-[#7C3AED] font-bold text-sm"
            >
              <Filter size={18} />
              Шүүлтүүр
            </button>
          </div>

          {showFilter && (
            <div className="bg-white border border-[#EDE9FE] rounded-[22px] p-4 mb-5 shadow-[0_8px_26px_rgba(124,58,237,0.08)]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[#312E81] font-bold">
                  Огноогоор шүүх
                </h3>

                <button
                  onClick={clearDateFilter}
                  className="text-[#7C3AED] text-sm font-bold"
                >
                  Цэвэрлэх
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label>
                  <span className="text-sm font-bold text-[#312E81]">
                    Эхлэх огноо
                  </span>

                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="mt-2 w-full bg-[#F8F5FF] border border-[#EDE9FE] rounded-xl px-4 py-3 outline-none text-[#312E81]"
                  />
                </label>

                <label>
                  <span className="text-sm font-bold text-[#312E81]">
                    Дуусах огноо
                  </span>

                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="mt-2 w-full bg-[#F8F5FF] border border-[#EDE9FE] rounded-xl px-4 py-3 outline-none text-[#312E81]"
                  />
                </label>
              </div>

              <div className="mt-4 bg-[#F3E8FF] rounded-[16px] px-4 py-3">
                <p className="text-[#7C3AED] text-sm font-medium">
                  Сонгосон огнооны хоорондох гомдол болон SOS түүхүүд харагдана.
                </p>
              </div>
            </div>
          )}

          <div className="mb-3 text-[#64748B] text-sm font-semibold">
            Нийт илэрц: {filteredItems.length}
          </div>

          <div className="space-y-3">
            {filteredItems.length > 0 ? (
              filteredItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => navigate('/admin/complaint-detail')}
                  className="w-full bg-white rounded-[22px] border border-[#EDE9FE] p-4 flex items-start gap-4 text-left shadow-[0_8px_26px_rgba(124,58,237,0.08)] hover:shadow-[0_12px_34px_rgba(124,58,237,0.14)] transition"
                >
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center text-[26px] flex-shrink-0 ${
                      item.type === 'SOS'
                        ? 'bg-red-50 text-red-500'
                        : 'bg-[#F3E8FF] text-[#7C3AED]'
                    }`}
                  >
                    {item.icon}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between gap-3">
                      <h3 className="text-[#312E81] font-bold flex items-center gap-2">
                        <AlertTriangle
                          className={
                            item.type === 'SOS'
                              ? 'text-red-500'
                              : 'text-[#7C3AED]'
                          }
                          size={18}
                        />
                        {item.title}
                      </h3>

                      <span className="text-[#64748B] text-xs whitespace-nowrap">
                        {item.time}
                      </span>
                    </div>

                    <p className="text-[#64748B] text-sm mt-1 leading-relaxed">
                      {item.desc}
                    </p>

                    <div className="flex gap-2 mt-3 flex-wrap">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#F3E8FF] text-[#7C3AED]">
                        {item.school}
                      </span>

                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-600">
                        {item.date}
                      </span>

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          item.type === 'SOS'
                            ? 'bg-red-50 text-red-500'
                            : 'bg-orange-50 text-orange-500'
                        }`}
                      >
                        {item.level}
                      </span>

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          item.status === 'Pending'
                            ? 'bg-orange-50 text-orange-500'
                            : 'bg-green-50 text-green-600'
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                  </div>
                </button>
              ))
            ) : (
              <div className="bg-white border border-[#EDE9FE] rounded-[22px] p-8 text-center">
                <div className="text-[42px] mb-2">🔎</div>
                <h3 className="text-[#312E81] font-bold">
                  Илэрц олдсонгүй
                </h3>
                <p className="text-[#94A3B8] text-sm mt-1">
                  Огноо эсвэл filter-ээ өөрчилж дахин шалгана уу.
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

function AdminSidebar({ active }: { active: string }) {
  const navigate = useNavigate();

  return (
    <>
      <aside className="w-[92px] bg-[#FAF7FF] border-r border-[#EDE9FE] px-3 py-5 hidden md:flex flex-col items-center">
        <div className="w-14 h-14 rounded-2xl bg-[#EDE9FE] flex items-center justify-center mb-6">
          <Shield className="text-[#7C3AED]" size={32} />
        </div>

        <SidebarButton active={active === 'dashboard'} icon={<Home />} label="Хяналт" onClick={() => navigate('/admin')} />
        <SidebarButton active={active === 'complaints'} icon={<ClipboardList />} label="Гомдол" onClick={() => navigate('/admin/complaints')} />
        <SidebarButton active={active === 'history'} icon={<History />} label="Түүх" onClick={() => navigate('/admin/history')} />
        <SidebarButton active={active === 'requests'} icon={<UserPlus />} label="Хүсэлт" onClick={() => navigate('/admin/user-requests')} />
        <SidebarButton active={active === 'map'} icon={<MapPin />} label="SOS" onClick={() => navigate('/admin/sos-map')} />
        <SidebarButton active={active === 'school'} icon={<School />} label="School" onClick={() => navigate('/admin/school')} />
        <SidebarButton icon={<Bell />} label="Мэдэгдэл" />

        <div className="mt-auto text-center">
          <div className="text-[38px]">👻</div>
          <p className="text-[#312E81] text-[12px] font-bold">Админ</p>
          <p className="text-green-500 text-[11px]">● Онлайн</p>
        </div>
      </aside>

      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-[#EDE9FE] px-2 py-2 shadow-[0_-10px_30px_rgba(124,58,237,0.08)]">
        <div className="grid grid-cols-5 gap-1">
          <MobileNavButton active={active === 'dashboard'} icon={<Home size={20} />} label="Хяналт" onClick={() => navigate('/admin')} />
          <MobileNavButton active={active === 'complaints'} icon={<ClipboardList size={20} />} label="Гомдол" onClick={() => navigate('/admin/complaints')} />
          <MobileNavButton active={active === 'history'} icon={<History size={20} />} label="Түүх" onClick={() => navigate('/admin/history')} />
          <MobileNavButton active={active === 'requests'} icon={<UserPlus size={20} />} label="Хүсэлт" onClick={() => navigate('/admin/user-requests')} />
          <MobileNavButton active={active === 'map'} icon={<MapPin size={20} />} label="SOS" onClick={() => navigate('/admin/sos-map')} />
        </div>
      </div>
    </>
  );
}

function SidebarButton({ icon, label, active, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex flex-col items-center gap-1 py-3 rounded-2xl mb-1 ${
        active ? 'text-[#7C3AED] bg-[#F3E8FF]' : 'text-[#8B8BB8]'
      }`}
    >
      {icon}
      <span className="text-[11px] font-bold">{label}</span>
    </button>
  );
}

function MobileNavButton({ icon, label, active, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center gap-1 rounded-2xl py-2 text-[10px] font-bold ${
        active ? 'text-[#7C3AED] bg-[#F3E8FF]' : 'text-[#94A3B8]'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}