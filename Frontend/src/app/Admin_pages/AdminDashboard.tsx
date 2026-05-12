import { useEffect, useMemo, useState } from 'react';
import AdminDashboardReports from './AdminDashboardReports';
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
  LogOut,
} from 'lucide-react';
import {
  type AdminReport,
  fetchAdminReports,
  formatReportTime,
  getAiScore,
  getPriorityLabel,
  getReportIcon,
  getReportIconClass,
  getReportId,
  getReportLocation,
  getReportTitle,
  isResolvedReport,
  isTodayReport,
} from '../lib/adminReports';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [reports, setReports] = useState<AdminReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadReports = async () => {
      try {
        setLoading(true);
        setError('');
        setReports(await fetchAdminReports());
      } catch (err) {
        setReports([]);
        setError(err instanceof Error ? err.message : 'Report мэдээлэл авахад алдаа гарлаа.');
      } finally {
        setLoading(false);
      }
    };

    void loadReports();
  }, []);

  const stats = useMemo(() => {
    const unresolved = reports.filter((report) => !isResolvedReport(report));
    const resolved = reports.filter(isResolvedReport);
    const highRisk = unresolved.filter((report) => getAiScore(report) >= 7);
    const todayHighRisk = highRisk.filter(isTodayReport);
    const total = reports.length || 1;

    return {
      unresolved,
      resolved,
      highRisk,
      todayHighRisk,
      resolvedPercent: Math.round((resolved.length / total) * 100),
      unresolvedPercent: Math.round((unresolved.length / total) * 100),
    };
  }, [reports]);

  const issues = stats.unresolved.slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E9DDFF] via-[#F8F5FF] to-white p-3 md:p-4">
      <div className="max-w-6xl mx-auto bg-white/90 rounded-[28px] md:rounded-[34px] shadow-[0_20px_60px_rgba(124,58,237,0.22)] overflow-hidden border border-white flex flex-col md:flex-row">
        <AdminSidebar active="dashboard" />

        <main className="flex-1 p-4 md:p-6 pb-24 md:pb-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-5 md:mb-6">
            <div>
              <h1 className="text-[#312E81] text-[22px] md:text-[26px] font-bold">
                Хяналтын самбар
              </h1>
              <p className="text-[#94A3B8] text-sm mt-1">
                Сургуулийн аюулгүй байдлын ерөнхий хяналт
              </p>
            </div>

            <button className="w-fit bg-white border border-[#EDE9FE] rounded-xl px-4 py-2 text-[#312E81] font-bold text-sm">
              Өнөөдөр ⌄
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <StatCard
              title="Шийдвэрлэгдээгүй"
              value={loading ? '...' : stats.unresolved.length}
              sub={`${stats.unresolvedPercent}%`}
              color="text-orange-500"
              icon="!"
              bg="bg-orange-100"
            />
            <StatCard
              title="Шийдвэрлэсэн"
              value={loading ? '...' : stats.resolved.length}
              sub={`${stats.resolvedPercent}%`}
              color="text-green-500"
              icon="✓"
              bg="bg-green-100"
            />
            <StatCard title="SOS дуудлага" value="9" sub="Өнөөдөр +3" color="text-red-500" icon="📞" bg="bg-red-100" />
          </div>

          <div className="bg-red-50 border border-red-100 rounded-[24px] p-5 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-[#312E81] font-bold text-lg">
                  Өндөр эрсдэлтэй
                </h3>
                <h2 className="text-red-500 text-4xl font-bold mt-2">
                  {loading ? '...' : stats.highRisk.length}
                </h2>
                <p className="text-[#64748B] text-sm mt-1">
                  Өнөөдөр +{stats.todayHighRisk.length}
                </p>
              </div>

              <div className="w-16 h-16 rounded-full bg-red-500 text-white flex items-center justify-center text-3xl font-bold">
                !
              </div>
            </div>
          </div>

          <h2 className="text-[#312E81] font-bold text-lg mb-4">
            Шийдвэрлэх шаардлагатай чухал асуудлууд
          </h2>

          <AdminDashboardReports />

          
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
        <SidebarButton active={active === 'complaints'} icon={<ClipboardList />} label="Гомдлууд" onClick={() => navigate('/admin/complaints')} />
        <SidebarButton active={active === 'history'} icon={<History />} label="Түүх" onClick={() => navigate('/admin/history')} />
        <SidebarButton active={active === 'requests'} icon={<UserPlus />} label="Хүсэлт" onClick={() => navigate('/admin/user-requests')} />
        <SidebarButton active={active === 'map'} icon={<MapPin />} label="SOS зураг" onClick={() => navigate('/admin/sos-map')} />
        <SidebarButton active={active === 'school'} icon={<School />} label="Сургууль" onClick={() => navigate('/admin/school')} />
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

function StatCard({ title, value, sub, color, icon, bg }: any) {
  return (
    <div className="bg-white rounded-[22px] border border-[#EDE9FE] p-4 md:p-5 shadow-[0_8px_26px_rgba(124,58,237,0.08)]">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-[#64748B] text-sm font-bold">{title}</p>
          <h2 className={`text-4xl font-bold mt-2 ${color}`}>{value}</h2>
          <p className="text-[#64748B] text-xs mt-1">{sub}</p>
        </div>

        <div className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl font-bold ${bg}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}
