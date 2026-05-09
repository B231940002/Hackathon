import { Link, useNavigate } from 'react-router';
import { ShieldCheck, User, Lock, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const savedUser = localStorage.getItem('student_user');
    const isLoggedIn = localStorage.getItem('student_is_logged_in');

    if (savedUser && isLoggedIn === 'true') {
      navigate('/home');
    }
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    setMessage('');

    if (!form.username || !form.password) {
      setMessage('Хэрэглэгчийн нэр болон нууц үгээ оруулна уу.');
      return;
    }

    try {
      setLoading(true);

      const res = await fetch('http://localhost:5001/api/students/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: form.username.trim().toLowerCase(),
          password: form.password,
        }),
      });

      const data = await res.json();

      console.log('LOGIN RESPONSE:', data);

      if (!res.ok || !data.success) {
        setMessage(data.message || 'Нэвтрэхэд алдаа гарлаа.');
        return;
      }

      localStorage.setItem('student_user', JSON.stringify(data.data));
      localStorage.setItem('student_is_logged_in', 'true');

      navigate('/home');
    } catch (error) {
      console.error('LOGIN ERROR:', error);
      setMessage('Backend сервертэй холбогдож чадсангүй.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E9DDFF] via-[#F8F5FF] to-white flex items-center justify-center px-4 py-6">
      <div className="w-full max-w-md bg-white/85 backdrop-blur-xl rounded-[36px] shadow-[0_20px_60px_rgba(124,58,237,0.22)] border border-white overflow-hidden">
        <div className="px-6 pt-8 pb-7">
          <div className="text-center mb-8">
            <div className="mx-auto w-24 h-24 rounded-full bg-[#EDE9FE] flex items-center justify-center mb-4 shadow-inner">
              <div className="w-14 h-14 bg-[#7C3AED] rounded-2xl flex items-center justify-center">
                <ShieldCheck className="text-white" size={32} />
              </div>
            </div>

            <h1 className="text-[#7C3AED] text-[26px] font-bold">
              SafeSchool AI
            </h1>
            <p className="text-[#94A3B8] text-[14px] mt-2">
              Аюулгүй орчиндоо тавтай морил
            </p>
          </div>

          <h2 className="text-[#1E1B4B] text-[24px] font-bold mb-5">
            Нэвтрэх
          </h2>

          <div className="space-y-4">
            <label className="block">
              <span className="text-[#312E81] font-bold text-[13px]">
                Хэрэглэгчийн нэр
              </span>

              <div className="mt-2 flex items-center gap-3 bg-[#F8F5FF] border border-[#EDE9FE] rounded-[18px] px-4 py-4">
                <User className="text-[#8B5CF6]" size={22} />
                <input
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  type="text"
                  placeholder="Жишээ: bat_10a"
                  className="bg-transparent outline-none w-full text-[#312E81] placeholder:text-[#A8A1C6]"
                />
              </div>
            </label>

            <label className="block">
              <span className="text-[#312E81] font-bold text-[13px]">
                Нууц үг
              </span>

              <div className="mt-2 flex items-center gap-3 bg-[#F8F5FF] border border-[#EDE9FE] rounded-[18px] px-4 py-4">
                <Lock className="text-[#8B5CF6]" size={22} />
                <input
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  type="password"
                  placeholder="••••••••"
                  className="bg-transparent outline-none w-full text-[#312E81] placeholder:text-[#A8A1C6]"
                />
              </div>
            </label>
          </div>

          {message && (
            <p className="text-center text-red-500 text-[13px] mt-4 font-semibold">
              {message}
            </p>
          )}

          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={handleLogin}
            disabled={loading}
            className="mt-6 w-full bg-gradient-to-r from-[#7C3AED] to-[#8B5CF6] text-white rounded-[22px] py-4 font-bold shadow-[0_12px_28px_rgba(124,58,237,0.28)] flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Нэвтэрч байна...' : 'Нэвтрэх'}
            {!loading && <ArrowRight size={20} />}
          </motion.button>

          <p className="text-center text-[#94A3B8] text-[14px] mt-6">
            Бүртгэлгүй юу?{' '}
            <Link to="/register" className="text-[#7C3AED] font-bold">
              Бүртгүүлэх
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
