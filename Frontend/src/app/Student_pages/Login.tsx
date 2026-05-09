import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import {
  ShieldCheck,
  User,
  Lock,
  ArrowRight,
  GraduationCap,
  Shield,
} from 'lucide-react';
import { motion } from 'motion/react';

export default function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState<'student' | 'admin'>('student');

  const handleLogin = () => {
    if (role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/home');
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

          <div className="grid grid-cols-2 gap-3 mb-5">
            <button
              onClick={() => setRole('student')}
              className={`rounded-[20px] border-2 p-4 text-center transition ${
                role === 'student'
                  ? 'border-[#7C3AED] bg-[#F5F3FF] shadow-[0_8px_22px_rgba(124,58,237,0.18)]'
                  : 'border-[#EDE9FE] bg-white'
              }`}
            >
              <div
                className={`mx-auto w-12 h-12 rounded-2xl flex items-center justify-center mb-2 ${
                  role === 'student'
                    ? 'bg-[#7C3AED] text-white'
                    : 'bg-[#F3E8FF] text-[#8B5CF6]'
                }`}
              >
                <GraduationCap size={26} />
              </div>
              <p className="text-[#312E81] font-bold text-[14px]">
                Сурагч
              </p>
            </button>

            <button
              onClick={() => setRole('admin')}
              className={`rounded-[20px] border-2 p-4 text-center transition ${
                role === 'admin'
                  ? 'border-[#7C3AED] bg-[#F5F3FF] shadow-[0_8px_22px_rgba(124,58,237,0.18)]'
                  : 'border-[#EDE9FE] bg-white'
              }`}
            >
              <div
                className={`mx-auto w-12 h-12 rounded-2xl flex items-center justify-center mb-2 ${
                  role === 'admin'
                    ? 'bg-[#7C3AED] text-white'
                    : 'bg-[#F3E8FF] text-[#8B5CF6]'
                }`}
              >
                <Shield size={26} />
              </div>
              <p className="text-[#312E81] font-bold text-[14px]">
                Админ
              </p>
            </button>
          </div>

          <div className="space-y-4">
            <label className="block">
              <span className="text-[#312E81] font-bold text-[13px]">
                Хэрэглэгчийн нэр
              </span>

              <div className="mt-2 flex items-center gap-3 bg-[#F8F5FF] border border-[#EDE9FE] rounded-[18px] px-4 py-4">
                <User className="text-[#8B5CF6]" size={22} />
                <input
                  type="text"
                  placeholder={
                    role === 'admin'
                      ? 'Жишээ: admin'
                      : 'Жишээ: Бат'
                  }
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
                  type="password"
                  placeholder="••••••••"
                  className="bg-transparent outline-none w-full text-[#312E81] placeholder:text-[#A8A1C6]"
                />
              </div>
            </label>
          </div>

          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={handleLogin}
            className="mt-6 w-full bg-gradient-to-r from-[#7C3AED] to-[#8B5CF6] text-white rounded-[22px] py-4 font-bold shadow-[0_12px_28px_rgba(124,58,237,0.28)] flex items-center justify-center gap-2"
          >
            {role === 'admin' ? 'Админаар нэвтрэх' : 'Сурагчаар нэвтрэх'}
            <ArrowRight size={20} />
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