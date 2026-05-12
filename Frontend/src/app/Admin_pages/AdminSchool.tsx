import { useEffect, useState } from 'react';
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
  MapPinned,
  Save,
  CheckCircle,
  AlertCircle,
  Hash,
} from 'lucide-react';

const API_BASE = 'http://localhost:5001/api';

export default function AdminSchool() {
  const navigate = useNavigate();

  const [schoolName, setSchoolName] = useState('');
  const [schoolCity, setSchoolCity] = useState('');
  const [schoolAddress, setSchoolAddress] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [createdSchool, setCreatedSchool] = useState<any>(null);
  const [adminUser, setAdminUser] = useState<any>(null);

  useEffect(() => {
    const adminUserRaw = localStorage.getItem('admin_user');

    if (!adminUserRaw) {
      setError('Admin мэдээлэл олдсонгүй. Дахин login хийнэ үү.');
      return;
    }

    try {
      const parsedAdmin = JSON.parse(adminUserRaw);
      setAdminUser(parsedAdmin);

      if (parsedAdmin.school_id) {
        setCreatedSchool({
          school_id: parsedAdmin.school_id,
          school_code: parsedAdmin.school_code || '',
        });

        setMessage('Та аль хэдийн сургууль бүртгэсэн байна.');
      }
    } catch {
      setError('Admin мэдээлэл уншихад алдаа гарлаа. Дахин login хийнэ үү.');
    }
  }, []);

  const handleSave = async () => {
    try {
      setMessage('');
      setError('');

      if (!adminUser) {
        setError('Admin мэдээлэл олдсонгүй. Дахин login хийнэ үү.');
        return;
      }

      if (!adminUser.admin_id) {
        setError('Admin ID олдсонгүй. Дахин login хийнэ үү.');
        return;
      }

      if (adminUser.school_id) {
        setError(
          'Та аль хэдийн сургууль бүртгэсэн байна. Нэг admin зөвхөн нэг сургууль бүртгэх эрхтэй.'
        );
        return;
      }

      if (!schoolName.trim()) {
        setError('Сургуулийн нэр оруулна уу.');
        return;
      }

      if (!schoolCity.trim()) {
        setError('Хот / Аймаг оруулна уу.');
        return;
      }

      if (!schoolAddress.trim()) {
        setError('Сургуулийн хаяг оруулна уу.');
        return;
      }

      const latNumber = latitude.trim() ? Number(latitude) : null;
      const lngNumber = longitude.trim() ? Number(longitude) : null;

      if (latitude.trim() && Number.isNaN(latNumber)) {
        setError('Latitude зөв тоон утга байх ёстой.');
        return;
      }

      if (longitude.trim() && Number.isNaN(lngNumber)) {
        setError('Longitude зөв тоон утга байх ёстой.');
        return;
      }

      setLoading(true);

      const schoolData = {
        admin_id: adminUser.admin_id,
        school_name: schoolName.trim(),
        school_city: schoolCity.trim(),
        school_address: schoolAddress.trim(),
        latitude: latNumber,
        longitude: lngNumber,
      };

      const response = await fetch(`${API_BASE}/schools`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(schoolData),
      });

      const text = await response.text();

      let result;
      try {
        result = JSON.parse(text);
      } catch {
        console.error('CREATE SCHOOL NON JSON RESPONSE:', text);
        setError('/api/schools route JSON буцаахгүй байна. Backend route-оо шалга.');
        return;
      }

      console.log('CREATE SCHOOL RESPONSE:', result);

      if (!response.ok || !result.success) {
        setError(result.message || 'Сургууль бүртгэхэд алдаа гарлаа.');
        return;
      }

      const updatedAdminUser = {
        ...adminUser,
        school_id: result.data.school_id,
        school_code: result.data.school_code,
      };

      localStorage.setItem('admin_user', JSON.stringify(updatedAdminUser));
      setAdminUser(updatedAdminUser);

      setCreatedSchool(result.data);
      setMessage('Сургууль амжилттай бүртгэгдлээ.');

      setSchoolName('');
      setSchoolCity('');
      setSchoolAddress('');
      setLatitude('');
      setLongitude('');
    } catch (err) {
      console.error('CREATE SCHOOL ERROR:', err);
      setError('Backend сервертэй холбогдож чадсангүй. Backend ажиллаж байгаа эсэхийг шалгана уу.');
    } finally {
      setLoading(false);
    }
  };

  const alreadyHasSchool = Boolean(adminUser?.school_id);

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
              Нэг admin зөвхөн нэг сургууль бүртгэх боломжтой.
            </p>
          </div>

          <div className="bg-[#F8F5FF] border border-[#EDE9FE] rounded-[24px] p-5 mb-5 flex gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#7C3AED] flex items-center justify-center flex-shrink-0">
              <School className="text-white" size={30} />
            </div>

            <div>
              <h3 className="text-[#312E81] font-bold text-[17px]">
                Сургуулийн мэдээлэл
              </h3>

              <p className="text-[#94A3B8] text-sm mt-1 leading-relaxed">
                Сургууль бүртгэсний дараа систем автоматаар SCH001, SCH002 гэх мэт
                сургуулийн код үүсгэнэ. Сурагч бүртгүүлэхдээ энэ кодыг ашиглана.
              </p>
            </div>
          </div>

          {message && createdSchool && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-[24px] p-5 mb-5">
              <div className="flex items-start gap-3">
                <CheckCircle className="text-emerald-600 flex-shrink-0 mt-1" size={24} />

                <div className="flex-1">
                  <p className="text-emerald-700 font-bold text-[15px]">
                    {message}
                  </p>

                  <div className="mt-4 bg-white rounded-[20px] border border-emerald-100 p-4">
                    <p className="text-[#312E81] text-sm mb-2">
                      <span className="font-bold">Сургуулийн код:</span>
                    </p>

                    <div className="inline-flex items-center gap-2 bg-[#F3E8FF] border border-[#DDD6FE] rounded-[18px] px-5 py-3">
                      <Hash className="text-[#7C3AED]" size={22} />

                      <span className="text-[#7C3AED] font-black text-[26px] tracking-wide">
                        {createdSchool.school_code || 'Код олдсонгүй'}
                      </span>
                    </div>

                    <p className="text-[#64748B] text-xs mt-4 break-all">
                      <span className="font-bold">school_id:</span>{' '}
                      {createdSchool.school_id}
                    </p>

                    <p className="text-[#64748B] text-xs mt-2">
                      Сурагч бүртгүүлэхдээ дээрх сургуулийн кодыг ашиглана.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 rounded-[20px] px-4 py-4 mb-5 flex items-start gap-3">
              <AlertCircle size={22} className="flex-shrink-0 mt-0.5" />
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}

          <div className="bg-white rounded-[28px] border border-[#EDE9FE] p-5 md:p-6 shadow-[0_8px_26px_rgba(124,58,237,0.08)]">
            {alreadyHasSchool && (
              <div className="bg-amber-50 border border-amber-200 text-amber-700 rounded-[20px] px-4 py-4 mb-5 text-sm font-medium">
                Та аль хэдийн сургууль бүртгэсэн байна. Дахин сургууль бүртгэх боломжгүй.
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputBox
                label="Сургуулийн нэр"
                placeholder="Жишээ: Нийслэлийн 1-р сургууль"
                value={schoolName}
                onChange={setSchoolName}
                icon={<Building2 size={22} />}
                disabled={alreadyHasSchool}
              />

              <ReadOnlyInfoBox
                label="Сургуулийн код"
                value={
                  alreadyHasSchool
                    ? adminUser?.school_code || 'Бүртгэгдсэн код олдсонгүй'
                    : 'Автоматаар үүснэ: SCH001, SCH002...'
                }
                icon={<Hash size={22} />}
              />

              <InputBox
                label="Хот / Аймаг"
                placeholder="Жишээ: Улаанбаатар"
                value={schoolCity}
                onChange={setSchoolCity}
                icon={<MapPinned size={22} />}
                disabled={alreadyHasSchool}
              />

              <InputBox
                label="Сургуулийн хаяг"
                placeholder="Жишээ: Сүхбаатар дүүрэг, 1-р хороо"
                value={schoolAddress}
                onChange={setSchoolAddress}
                icon={<MapPinned size={22} />}
                disabled={alreadyHasSchool}
              />

              <InputBox
                label="Latitude"
                placeholder="Жишээ: 47.918873"
                value={latitude}
                onChange={setLatitude}
                icon={<MapPin size={22} />}
                disabled={alreadyHasSchool}
              />

              <InputBox
                label="Longitude"
                placeholder="Жишээ: 106.917701"
                value={longitude}
                onChange={setLongitude}
                icon={<MapPin size={22} />}
                disabled={alreadyHasSchool}
              />
            </div>

            <div className="bg-[#F3E8FF] rounded-[20px] p-4 mt-5">
              <p className="text-[#7C3AED] text-sm font-medium leading-relaxed">
                school_id, school_code, created_at, updated_at мэдээллүүд backend/database
                дээр автоматаар үүснэ. Frontend-ээс school_code явуулах шаардлагагүй.
              </p>
            </div>

            <button
              onClick={handleSave}
              disabled={loading || alreadyHasSchool}
              className="mt-6 w-full bg-gradient-to-r from-[#7C3AED] to-[#8B5CF6] text-white rounded-[22px] py-4 font-bold shadow-[0_12px_28px_rgba(124,58,237,0.28)] flex items-center justify-center gap-2 hover:scale-[1.01] transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <Save size={20} />
              {loading
                ? 'Бүртгэж байна...'
                : alreadyHasSchool
                  ? 'Сургууль аль хэдийн бүртгэгдсэн'
                  : 'Сургууль бүртгэх'}
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}

function InputBox({
  label,
  placeholder,
  value,
  onChange,
  icon,
  disabled = false,
}: any) {
  return (
    <label className="block">
      <span className="text-[#312E81] font-bold text-[13px]">
        {label}
      </span>

      <div
        className={`mt-2 flex items-center gap-3 border rounded-[18px] px-4 py-4 ${
          disabled
            ? 'bg-[#F1F5F9] border-[#E2E8F0]'
            : 'bg-[#F8F5FF] border-[#EDE9FE]'
        }`}
      >
        <div className={disabled ? 'text-[#64748B]' : 'text-[#8B5CF6]'}>
          {icon}
        </div>

        <input
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`bg-transparent outline-none w-full placeholder:text-[#A8A1C6] ${
            disabled
              ? 'text-[#64748B] cursor-not-allowed'
              : 'text-[#312E81]'
          }`}
        />
      </div>
    </label>
  );
}

function ReadOnlyInfoBox({
  label,
  value,
  icon,
}: any) {
  return (
    <label className="block">
      <span className="text-[#312E81] font-bold text-[13px]">
        {label}
      </span>

      <div className="mt-2 flex items-center gap-3 bg-[#F1F5F9] border border-[#E2E8F0] rounded-[18px] px-4 py-4">
        <div className="text-[#64748B]">{icon}</div>

        <input
          value={value}
          readOnly
          className="bg-transparent outline-none w-full text-[#64748B] cursor-not-allowed"
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

        <SidebarButton
          active={active === 'dashboard'}
          icon={<Home />}
          label="Хяналт"
          onClick={() => navigate('/admin')}
        />

        <SidebarButton
          active={active === 'complaints'}
          icon={<ClipboardList />}
          label="Гомдлууд"
          onClick={() => navigate('/admin/complaints')}
        />

        <SidebarButton
          active={active === 'history'}
          icon={<History />}
          label="Түүх"
          onClick={() => navigate('/admin/history')}
        />

        <SidebarButton
          active={active === 'map'}
          icon={<MapPin />}
          label="SOS зураг"
          onClick={() => navigate('/admin/sos-map')}
        />

        <SidebarButton
          active={active === 'school'}
          icon={<School />}
          label="Сургууль"
          onClick={() => navigate('/admin/school')}
        />

        <SidebarButton
          icon={<BarChart3 />}
          label="Тайлан"
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
            active={active === 'map'}
            icon={<MapPin size={20} />}
            label="SOS"
            onClick={() => navigate('/admin/sos-map')}
          />

          <MobileNavButton
            active={active === 'school'}
            icon={<School size={20} />}
            label="School"
            onClick={() => navigate('/admin/school')}
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
      className={`w-full flex flex-col items-center gap-1 py-3 rounded-2xl mb-1 transition ${
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