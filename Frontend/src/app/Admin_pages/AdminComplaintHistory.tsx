import { useEffect, useState } from 'react';
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

const API_BASE_URL = 'http://localhost:5001/api';

type HistoryItem = {
  id: string;
  title: string;
  desc: string;
  time: string;
  date: string;
  school: string;
  level: string;
  icon: string;
  type: 'Гомдол' | 'SOS';
  status: string;
  rawCreatedAt: Date;
};

export default function AdminComplaintHistory() {
  const navigate = useNavigate();

  const [activeFilter, setActiveFilter] = useState('Бүх');
  const [showFilter, setShowFilter] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [searchText, setSearchText] = useState('');

  const [historyItems, setHistoryItems] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getAdminSchoolId = () => {
    const adminRaw = localStorage.getItem('admin_user');

    if (!adminRaw) {
      return null;
    }

    try {
      const adminUser = JSON.parse(adminRaw);
      return adminUser.school_id || null;
    } catch {
      return null;
    }
  };

  const getReportTitle = (type: string) => {
    if (type === 'mental') return 'Сэтгэл санааны дарамт';
    if (type === 'emotional') return 'Сэтгэл санааны дарамт';
    if (type === 'physical') return 'Бие махбодын хүчирхийлэл';
    if (type === 'cyber') return 'Цахим дээрэлхэлт';
    if (type === 'social') return 'Нийгмийн гадуурхалт';
    return 'Дээрэлхэлтийн мэдээлэл';
  };

  const getReportIcon = (type: string) => {
    if (type === 'mental') return '😡';
    if (type === 'emotional') return '😡';
    if (type === 'physical') return '💪';
    if (type === 'cyber') return '💻';
    if (type === 'social') return '👥';
    return '⚠️';
  };

  const getReportStatusText = (status: string) => {
    if (status === 'pending') return 'Pending';
    if (status === 'reviewing') return 'Шалгаж байна';
    if (status === 'resolved') return 'Шийдвэрлэсэн';
    if (status === 'rejected') return 'Татгалзсан';
    return status || 'Pending';
  };

  const getSOSStatusText = (status: string) => {
    if (status === 'active') return 'Идэвхтэй';
    if (status === 'acknowledged') return 'Хүлээн авсан';
    if (status === 'resolved') return 'Шийдвэрлэсэн';
    if (status === 'cancelled') return 'Цуцлагдсан';
    return status || 'Идэвхтэй';
  };

  const parseFirestoreDate = (createdAt: any) => {
    if (!createdAt) return new Date();

    if (createdAt._seconds) {
      return new Date(createdAt._seconds * 1000);
    }

    if (createdAt.seconds) {
      return new Date(createdAt.seconds * 1000);
    }

    if (typeof createdAt === 'string') {
      const parsed = new Date(createdAt);

      if (!Number.isNaN(parsed.getTime())) {
        return parsed;
      }
    }

    return new Date();
  };

  const readJsonResponse = async (response: Response) => {
    const text = await response.text();

    try {
      return JSON.parse(text);
    } catch {
      console.error('NON JSON RESPONSE:', text);
      throw new Error('Backend JSON биш response буцааж байна.');
    }
  };

  const fetchReportHistory = async () => {
    try {
      setLoading(true);
      setError('');

      const schoolId = getAdminSchoolId();

      if (!schoolId) {
        setError('Admin дээр school_id байхгүй байна. Эхлээд сургууль бүртгэнэ үү.');
        return;
      }

      const [reportsResponse, sosResponse] = await Promise.all([
        fetch(`${API_BASE_URL}/reports/school/${schoolId}`),
        fetch(`${API_BASE_URL}/sos/school/${schoolId}`),
      ]);

      const reportsResult = await readJsonResponse(reportsResponse);
      const sosResult = await readJsonResponse(sosResponse);

      console.log('REPORT HISTORY:', reportsResult);
      console.log('SOS HISTORY:', sosResult);

      if (!reportsResponse.ok || reportsResult.success === false) {
        setError(reportsResult.message || 'Гомдлын түүх авахад алдаа гарлаа.');
        return;
      }

      if (!sosResponse.ok || sosResult.success === false) {
        setError(sosResult.message || 'SOS түүх авахад алдаа гарлаа.');
        return;
      }

      const mappedReports: HistoryItem[] = (reportsResult.data || []).map(
        (report: any) => {
          const createdDate = parseFirestoreDate(report.created_at);

          return {
            id: report.report_id || report.id,
            title: getReportTitle(report.report_type),
            desc: report.description || 'Тайлбар оруулаагүй.',
            time: createdDate.toLocaleTimeString('mn-MN', {
              hour: '2-digit',
              minute: '2-digit',
            }),
            date: createdDate.toISOString().split('T')[0],
            school: report.school_code || report.school_id || schoolId,
            level: report.status === 'pending' ? 'Маш чухал' : 'Энгийн',
            icon: getReportIcon(report.report_type),
            type: 'Гомдол',
            status: getReportStatusText(report.status),
            rawCreatedAt: createdDate,
          };
        }
      );

      const mappedSOS: HistoryItem[] = (sosResult.data || []).map((sos: any) => {
        const createdDate = parseFirestoreDate(sos.created_at);

        return {
          id: sos.sos_id || sos.id,
          title: 'SOS тусламжийн дуудлага',
          desc:
            sos.location_text ||
            `${sos.student_first_name || ''} ${sos.student_last_name || ''}`.trim() ||
            'SOS байршлын мэдээлэл байхгүй.',
          time: createdDate.toLocaleTimeString('mn-MN', {
            hour: '2-digit',
            minute: '2-digit',
          }),
          date: createdDate.toISOString().split('T')[0],
          school: sos.school_code || sos.school_id || schoolId,
          level: sos.status === 'active' ? 'Яаралтай' : 'Энгийн',
          icon: '🚨',
          type: 'SOS',
          status: getSOSStatusText(sos.status),
          rawCreatedAt: createdDate,
        };
      });

      const mergedHistory = [...mappedReports, ...mappedSOS].sort(
        (a, b) => b.rawCreatedAt.getTime() - a.rawCreatedAt.getTime()
      );

      setHistoryItems(mergedHistory);
    } catch (err) {
      console.error('FETCH HISTORY ERROR:', err);
      setError('Backend сервертэй холбогдож чадсангүй.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReportHistory();
  }, []);

  const filteredItems = historyItems.filter((item) => {
    const itemDate = new Date(item.date);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    const matchesDate =
      (!start || itemDate >= start) &&
      (!end || itemDate <= end);

    let matchesFilter = true;

    if (activeFilter === 'Бүх') {
      matchesFilter = true;
    }

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

    if (activeFilter === 'Идэвхтэй SOS') {
      matchesFilter = item.type === 'SOS' && item.status === 'Идэвхтэй';
    }

    const search = searchText.trim().toLowerCase();

    const matchesSearch =
      !search ||
      item.title.toLowerCase().includes(search) ||
      item.desc.toLowerCase().includes(search) ||
      item.school.toLowerCase().includes(search) ||
      item.status.toLowerCase().includes(search) ||
      item.type.toLowerCase().includes(search);

    return matchesFilter && matchesDate && matchesSearch;
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

            <button
              onClick={fetchReportHistory}
              disabled={loading}
              className="w-fit bg-white border border-[#EDE9FE] rounded-xl px-4 py-2 text-[#312E81] font-bold text-sm disabled:opacity-60"
            >
              {loading ? 'Уншиж байна...' : 'Шинэчлэх'}
            </button>
          </div>

          <div className="bg-white rounded-[20px] border border-[#EDE9FE] px-4 py-3 mb-4 flex items-center gap-3">
            <Search className="text-[#A78BFA]" size={20} />

            <input
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Түүхээс хайх..."
              className="outline-none w-full text-sm bg-transparent"
            />
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-5">
            <div className="flex gap-2 overflow-x-auto pb-1">
              {[
                'Бүх',
                'Бүх гомдол',
                'SOS түүх',
                'Идэвхтэй SOS',
                'Шийдвэрлэсэн',
                'Pending',
              ].map((item) => (
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
              ))}
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

          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-600 text-sm rounded-[16px] px-4 py-3 font-medium">
              {error}
            </div>
          )}

          {loading && (
            <div className="bg-white border border-[#EDE9FE] rounded-[22px] p-8 text-center text-[#7C3AED] font-bold">
              Уншиж байна...
            </div>
          )}

          <div className="space-y-3">
            {!loading && filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <button
                  key={`${item.type}-${item.id}`}
                  onClick={() => {
                    if (item.type === 'SOS') {
                      navigate('/admin/sos-map');
                    } else {
                      navigate('/admin/complaint-detail');
                    }
                  }}
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
                            : item.status === 'Шийдвэрлэсэн'
                            ? 'bg-green-50 text-green-600'
                            : item.status === 'Идэвхтэй'
                            ? 'bg-red-50 text-red-500'
                            : item.status === 'Хүлээн авсан'
                            ? 'bg-blue-50 text-blue-600'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                  </div>
                </button>
              ))
            ) : (
              !loading && (
                <div className="bg-white border border-[#EDE9FE] rounded-[22px] p-8 text-center">
                  <div className="text-[42px] mb-2">🔎</div>

                  <h3 className="text-[#312E81] font-bold">
                    Илэрц олдсонгүй
                  </h3>

                  <p className="text-[#94A3B8] text-sm mt-1">
                    Огноо эсвэл filter-ээ өөрчилж дахин шалгана уу.
                  </p>
                </div>
              )
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

        <SidebarButton
          active={active === 'dashboard'}
          icon={<Home />}
          label="Хяналт"
          onClick={() => navigate('/admin')}
        />

        <SidebarButton
          active={active === 'complaints'}
          icon={<ClipboardList />}
          label="Гомдол"
          onClick={() => navigate('/admin/complaints')}
        />

        <SidebarButton
          active={active === 'history'}
          icon={<History />}
          label="Түүх"
          onClick={() => navigate('/admin/history')}
        />

        <SidebarButton
          active={active === 'requests'}
          icon={<UserPlus />}
          label="Хүсэлт"
          onClick={() => navigate('/admin/user-requests')}
        />

        <SidebarButton
          active={active === 'map'}
          icon={<MapPin />}
          label="SOS"
          onClick={() => navigate('/admin/sos-map')}
        />

        <SidebarButton
          active={active === 'school'}
          icon={<School />}
          label="School"
          onClick={() => navigate('/admin/school')}
        />

        <SidebarButton
          icon={<Bell />}
          label="Мэдэгдэл"
        />

        <div className="mt-auto text-center">
          <div className="text-[38px]">👻</div>

          <p className="text-[#312E81] text-[12px] font-bold">
            Админ
          </p>

          <p className="text-green-500 text-[11px]">
            ● Онлайн
          </p>
        </div>
      </aside>

      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-[#EDE9FE] px-2 py-2 shadow-[0_-10px_30px_rgba(124,58,237,0.08)]">
        <div className="grid grid-cols-5 gap-1">
          <MobileNavButton
            active={active === 'dashboard'}
            icon={<Home size={20} />}
            label="Хяналт"
            onClick={() => navigate('/admin')}
          />

          <MobileNavButton
            active={active === 'complaints'}
            icon={<ClipboardList size={20} />}
            label="Гомдол"
            onClick={() => navigate('/admin/complaints')}
          />

          <MobileNavButton
            active={active === 'history'}
            icon={<History size={20} />}
            label="Түүх"
            onClick={() => navigate('/admin/history')}
          />

          <MobileNavButton
            active={active === 'requests'}
            icon={<UserPlus size={20} />}
            label="Хүсэлт"
            onClick={() => navigate('/admin/user-requests')}
          />

          <MobileNavButton
            active={active === 'map'}
            icon={<MapPin size={20} />}
            label="SOS"
            onClick={() => navigate('/admin/sos-map')}
          />
        </div>
      </div>
    </>
  );
}

function SidebarButton({
  icon,
  label,
  active,
  onClick,
}: any) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex flex-col items-center gap-1 py-3 rounded-2xl mb-1 ${
        active
          ? 'text-[#7C3AED] bg-[#F3E8FF]'
          : 'text-[#8B8BB8]'
      }`}
    >
      {icon}

      <span className="text-[11px] font-bold">
        {label}
      </span>
    </button>
  );
}

function MobileNavButton({
  icon,
  label,
  active,
  onClick,
}: any) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center gap-1 rounded-2xl py-2 text-[10px] font-bold ${
        active
          ? 'text-[#7C3AED] bg-[#F3E8FF]'
          : 'text-[#94A3B8]'
      }`}
    >
      {icon}

      <span>{label}</span>
    </button>
  );
}