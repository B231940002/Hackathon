import { useEffect, useState } from 'react';
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

type StudentRequest = {
    id?: string;
    student_id: string;
    school_id?: string;
    student_first_name: string;
    student_last_name?: string;
    student_phone_number?: string;
    username: string;
    class_info?: string;
    verification_status: 'pending' | 'approved' | 'rejected';
    is_verified: boolean;
};

export default function AdminUserRequests() {
    const navigate = useNavigate();

    const [students, setStudents] = useState<StudentRequest[]>([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const API_BASE = 'http://localhost:5001/api';

        const fetchPendingStudents = async () => {
  try {
    setLoading(true);
    setMessage('');

    const res = await fetch(`${API_BASE}/students/pending`);
    const data = await res.json();

    if (!res.ok || !data.success) {
      setMessage(data.message || 'Бүртгэлийн хүсэлтүүд авахад алдаа гарлаа.');
      return;
    }

    setStudents(data.data);
  } catch (error) {
    console.error('FETCH STUDENT REQUESTS ERROR:', error);
    setMessage('Backend сервертэй холбогдож чадсангүй.');
  } finally {
    setLoading(false);
  }
};

const handleVerify = async (
  studentId: string,
  status: 'approved' | 'rejected'
) => {
  try {
    setMessage('');

    const res = await fetch(`${API_BASE}/students/${studentId}/verify`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });

    const data = await res.json();

    if (!res.ok || !data.success) {
      setMessage(data.message || 'Баталгаажуулахад алдаа гарлаа.');
      return;
    }

    setStudents((prev) =>
      prev.filter((student) => student.student_id !== studentId)
    );

    setMessage(
      status === 'approved'
        ? 'Сурагчийн бүртгэл зөвшөөрөгдлөө.'
        : 'Сурагчийн бүртгэл татгалзагдлаа.'
    );
  } catch (error) {
    console.error('VERIFY STUDENT ERROR:', error);
    setMessage('Backend сервертэй холбогдож чадсангүй.');
  }
};

    useEffect(() => {
        fetchPendingStudents();
    }, []);

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

                    {message && (
                        <p className="mb-4 text-sm font-semibold text-[#7C3AED]">
                            {message}
                        </p>
                    )}

                    {loading ? (
                        <p className="text-[#94A3B8] font-semibold">
                            Хүсэлтүүд ачааллаж байна...
                        </p>
                    ) : students.length === 0 ? (
                        <div className="bg-white border border-[#EDE9FE] rounded-[24px] p-6 text-center text-[#94A3B8] font-semibold">
                            Одоогоор хүлээгдэж буй бүртгэлийн хүсэлт байхгүй байна.
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {students.map((student) => (
                                <div
                                    key={student.student_id}
                                    className="bg-white border border-[#EDE9FE] rounded-[24px] p-5 shadow-[0_8px_26px_rgba(124,58,237,0.08)]"
                                >
                                    <div className="flex items-start justify-between gap-3">
                                        <div>
                                            <h3 className="text-[#312E81] font-bold text-lg">
                                                {student.student_first_name}{' '}
                                                {student.student_last_name || ''}
                                            </h3>

                                            <div className="mt-2 space-y-1 text-sm text-[#64748B]">
                                                <p>👤 Username: {student.username}</p>
                                                <p>🏫 School ID: {student.school_id || '-'}</p>
                                                <p>👨‍🎓 Анги: {student.class_info || '-'}</p>
                                                <p>📞 Утас: {student.student_phone_number || '-'}</p>
                                            </div>

                                            <span className="inline-block mt-3 bg-orange-50 text-orange-500 px-3 py-1 rounded-full text-xs font-bold">
                                                Хүлээгдэж байна
                                            </span>
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            <button
                                                className="bg-green-500 text-white rounded-2xl px-4 py-3 font-bold flex items-center gap-2"
                                                onClick={() =>
                                                    handleVerify(student.student_id, 'approved')
                                                }
                                            >
                                                <Check size={18} />
                                                Зөвшөөрөх
                                            </button>

                                            <button
                                                className="bg-red-500 text-white rounded-2xl px-4 py-3 font-bold flex items-center gap-2"
                                                onClick={() =>
                                                    handleVerify(student.student_id, 'rejected')
                                                }
                                            >
                                                <X size={18} />
                                                Татгалзах
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
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
            className={`w-full flex flex-col items-center gap-1 py-3 rounded-2xl mb-1 ${active ? 'text-[#7C3AED] bg-[#F3E8FF]' : 'text-[#8B8BB8]'
                }`}
        >
            {icon}
            <span className="text-[11px] font-bold">{label}</span>
        </button>
    );
} 