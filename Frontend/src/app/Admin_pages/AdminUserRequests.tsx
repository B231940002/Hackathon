import { useNavigate } from 'react-router';
import {
  Shield,
  Home,
  ClipboardList,
  History,
  MapPin,
  School,
  UserPlus,
  Check,
  X,
} from 'lucide-react';

const users = [
  {
    id: 1,
    name: 'Бат-Эрдэнэ',
    school: '5-р сургууль',
    class: '9Б',
    teacher: 'Оюун',
    status: 'Хүлээгдэж байна',
  },
  {
    id: 2,
    name: 'Номин',
    school: '12-р сургууль',
    class: '8А',
    teacher: 'Саруул',
    status: 'Хүлээгдэж байна',
  },
];

export default function AdminUserRequests() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E9DDFF] via-[#F8F5FF] to-white p-3 md:p-4">
      <div className="max-w-6xl mx-auto bg-white/90 rounded-[28px] md:rounded-[34px] shadow-[0_20px_60px_rgba(124,58,237,0.22)] overflow-hidden border border-white flex flex-col md:flex-row">
        
        <AdminSidebar active="requests" />

        <main className="flex-1 p-4 md:p-6 pb-24 md:pb-6">
          <div className="mb-6">
            <h1 className="text-[#312E81] text-[24px] md:text-[28px] font-bold">
              Бүртгэлийн хүсэлтүүд
            </h1>

            <p className="text-[#94A3B8] text-sm mt-1">
              Сурагчдын бүртгүүлэх хүсэлтийг шалгаж шийдвэрлэнэ.
            </p>
          </div>

          <div className="space-y-4">
            {users.map((user) => (
              <div
                key={user.id}
                className="bg-white border border-[#EDE9FE] rounded-[24px] p-5 shadow-[0_8px_26px_rgba(124,58,237,0.08)]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-[#312E81] font-bold text-lg">
                      {user.name}
                    </h3>

                    <div className="mt-2 space-y-1 text-sm text-[#64748B]">
                      <p>🏫 {user.school}</p>
                      <p>👨‍🎓 Анги: {user.class}</p>
                      <p>👩‍🏫 Багш: {user.teacher}</p>
                    </div>

                    <span className="inline-block mt-3 bg-orange-50 text-orange-500 px-3 py-1 rounded-full text-xs font-bold">
                      {user.status}
                    </span>
                  </div>

                  <div className="flex flex-col gap-2">
                    <button
                      className="bg-green-500 text-white rounded-2xl px-4 py-3 font-bold flex items-center gap-2"
                      onClick={() => alert('Хэрэглэгч зөвшөөрөгдлөө')}
                    >
                      <Check size={18} />
                      Зөвшөөрөх
                    </button>

                    <button
                      className="bg-red-500 text-white rounded-2xl px-4 py-3 font-bold flex items-center gap-2"
                      onClick={() => alert('Хэрэглэгч татгалзагдлаа')}
                    >
                      <X size={18} />
                      Татгалзах
                    </button>
                  </div>
                </div>
              </div>
            ))}
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
      </aside>
    </>
  );
}

function SidebarButton({ icon, label, active, onClick }: any) {
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