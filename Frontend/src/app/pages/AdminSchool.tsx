import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  Shield,
  Home,
  ClipboardList,
  History,
  MapPin,
  School,
  BarChart3,
  Bell,
  Building2,
  Hash,
  MapPinned,
  Phone,
  User,
  Save,
} from 'lucide-react';

export default function AdminSchool() {
  const navigate = useNavigate();

  const [schoolName, setSchoolName] = useState('');
  const [schoolCode, setSchoolCode] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [adminName, setAdminName] = useState('');

  const handleSave = () => {
    alert('Сургуулийн мэдээлэл амжилттай хадгалагдлаа');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E9DDFF] via-[#F8F5FF] to-white p-3 md:p-4">
      <div className="max-w-6xl mx-auto bg-white/90 rounded-[28px] md:rounded-[34px] shadow-[0_20px_60px_rgba(124,58,237,0.22)] overflow-hidden border border-white flex flex-col md:flex-row">
        <AdminSidebar active="school" />

        <main className="flex-1 p-4 md:p-6 pb-24 md:pb-6">
          <div className="mb-6">
            <h1 className="text-[#312E81] text-[24px] md:text-[28px] font-bold">
              Сургууль бүртгэх
            </h1>
            <p className="text-[#94A3B8] text-sm mt-1">
              Админ өөрийн сургуулийн мэдээллийг бүртгэнэ.
            </p>
          </div>

          <div className="bg-[#F8F5FF] border border-[#EDE9FE] rounded-[24px] p-5 mb-5 flex gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#7C3AED] flex items-center justify-center flex-shrink-0">
              <School className="text-white" size={30} />
            </div>

            <div>
              <h3 className="text-[#312E81] font-bold text-[17px]">
                Сургуулийн үндсэн мэдээлэл
              </h3>
              <p className="text-[#94A3B8] text-sm mt-1">
                Энэ мэдээлэл сурагч бүртгүүлэх үед сургуулийн кодоор холбогдоно.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-[28px] border border-[#EDE9FE] p-5 md:p-6 shadow-[0_8px_26px_rgba(124,58,237,0.08)]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputBox
                label="Сургуулийн нэр"
                placeholder="Жишээ: 5-р сургууль"
                value={schoolName}
                onChange={setSchoolName}
                icon={<Building2 size={22} />}
              />

              <InputBox
                label="Сургуулийн код"
                placeholder="Жишээ: SCH-005"
                value={schoolCode}
                onChange={setSchoolCode}
                icon={<Hash size={22} />}
              />

              <InputBox
                label="Байршил / Хаяг"
                placeholder="Жишээ: СБД, 8-р хороо"
                value={address}
                onChange={setAddress}
                icon={<MapPinned size={22} />}
              />

              <InputBox
                label="Холбогдох утас"
                placeholder="Жишээ: 70110000"
                value={phone}
                onChange={setPhone}
                icon={<Phone size={22} />}
              />

              <div className="md:col-span-2">
                <InputBox
                  label="Хариуцсан админ / ажилтан"
                  placeholder="Жишээ: Нарантуяа"
                  value={adminName}
                  onChange={setAdminName}
                  icon={<User size={22} />}
                />
              </div>
            </div>

            <div className="bg-[#F3E8FF] rounded-[20px] p-4 mt-5">
              <p className="text-[#7C3AED] text-sm font-medium leading-relaxed">
                Сурагч бүртгүүлэхдээ сургуулийн кодоо оруулснаар тухайн сургуультай автоматаар холбогдоно.
              </p>
            </div>

            <button
              onClick={handleSave}
              className="mt-6 w-full bg-gradient-to-r from-[#7C3AED] to-[#8B5CF6] text-white rounded-[22px] py-4 font-bold shadow-[0_12px_28px_rgba(124,58,237,0.28)] flex items-center justify-center gap-2"
            >
              <Save size={20} />
              Сургууль бүртгэх
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}

function InputBox({ label, placeholder, value, onChange, icon }: any) {
  return (
    <label className="block">
      <span className="text-[#312E81] font-bold text-[13px]">
        {label}
      </span>

      <div className="mt-2 flex items-center gap-3 bg-[#F8F5FF] border border-[#EDE9FE] rounded-[18px] px-4 py-4">
        <div className="text-[#8B5CF6]">{icon}</div>

        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="bg-transparent outline-none w-full text-[#312E81] placeholder:text-[#A8A1C6]"
        />
      </div>
    </label>
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
        <SidebarButton active={active === 'map'} icon={<MapPin />} label="SOS зураг" onClick={() => navigate('/admin/sos-map')} />
        <SidebarButton active={active === 'school'} icon={<School />} label="Сургууль" onClick={() => navigate('/admin/school')} />
        <SidebarButton icon={<BarChart3 />} label="Тайлан" />
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
          <MobileNavButton active={active === 'map'} icon={<MapPin size={20} />} label="SOS" onClick={() => navigate('/admin/sos-map')} />
          <MobileNavButton active={active === 'school'} icon={<School size={20} />} label="Сургууль" onClick={() => navigate('/admin/school')} />
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