import { Link } from 'react-router';
import {
  ShieldCheck,
  User,
  Lock,
  Users,
  GraduationCap,
  School,
  Hash,
  Sparkles,
} from 'lucide-react';
import { motion } from 'motion/react';

export default function Register() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E9DDFF] via-[#F8F5FF] to-white flex items-center justify-center px-4 py-6">
      <div className="w-full max-w-md bg-white/85 backdrop-blur-xl rounded-[36px] shadow-[0_20px_60px_rgba(124,58,237,0.22)] border border-white overflow-hidden">
        <div className="px-6 pt-8 pb-7">
          <div className="text-center mb-7">
            <div className="mx-auto w-24 h-24 rounded-full bg-[#EDE9FE] flex items-center justify-center mb-4 shadow-inner">
              <div className="w-14 h-14 bg-[#7C3AED] rounded-2xl flex items-center justify-center">
                <ShieldCheck className="text-white" size={32} />
              </div>
            </div>

            <h1 className="text-[#7C3AED] text-[26px] font-bold">
              SafeSchool AI
            </h1>
            <p className="text-[#94A3B8] text-[14px] mt-2">
              Аюулгүй орчинд нэгдээрэй
            </p>
          </div>

          <div className="bg-[#F8F5FF] border border-[#EDE9FE] rounded-[22px] p-4 flex gap-3 mb-5">
            <div className="w-11 h-11 rounded-full bg-[#7C3AED] flex items-center justify-center flex-shrink-0">
              <Sparkles className="text-white" size={22} />
            </div>
            <div>
              <h3 className="text-[#312E81] font-bold text-[14px]">
                Сурагчийн бүртгэл
              </h3>
              <p className="text-[#94A3B8] text-[12px] mt-1">
                Мэдээллээ зөв бөглөж аюулгүй байдлын системд холбогдоно.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <label className="block">
              <span className="text-[#312E81] font-bold text-[13px]">
                Хэрэглэгчийн нэр
              </span>
              <div className="mt-2 flex items-center gap-3 bg-[#F8F5FF] border border-[#EDE9FE] rounded-[18px] px-4 py-4">
                <User className="text-[#8B5CF6]" size={22} />
                <input type="text" placeholder="Жишээ: Бат" className="bg-transparent outline-none w-full text-[#312E81] placeholder:text-[#A8A1C6]" />
              </div>
            </label>

            <label className="block">
              <span className="text-[#312E81] font-bold text-[13px]">
                Эцэг эхийн нэр
              </span>
              <div className="mt-2 flex items-center gap-3 bg-[#F8F5FF] border border-[#EDE9FE] rounded-[18px] px-4 py-4">
                <Users className="text-[#8B5CF6]" size={22} />
                <input type="text" placeholder="Жишээ: Болд" className="bg-transparent outline-none w-full text-[#312E81] placeholder:text-[#A8A1C6]" />
              </div>
            </label>

            <label className="block">
              <span className="text-[#312E81] font-bold text-[13px]">
                Багшийн нэр
              </span>
              <div className="mt-2 flex items-center gap-3 bg-[#F8F5FF] border border-[#EDE9FE] rounded-[18px] px-4 py-4">
                <GraduationCap className="text-[#8B5CF6]" size={22} />
                <input type="text" placeholder="Жишээ: Нарантуяа" className="bg-transparent outline-none w-full text-[#312E81] placeholder:text-[#A8A1C6]" />
              </div>
            </label>

            <label className="block">
              <span className="text-[#312E81] font-bold text-[13px]">
                Сургуулийн код
              </span>
              <div className="mt-2 flex items-center gap-3 bg-[#F8F5FF] border border-[#EDE9FE] rounded-[18px] px-4 py-4">
                <School className="text-[#8B5CF6]" size={22} />
                <input type="text" placeholder="Жишээ: SCH-001" className="bg-transparent outline-none w-full text-[#312E81] placeholder:text-[#A8A1C6]" />
              </div>
            </label>

            <label className="block">
              <span className="text-[#312E81] font-bold text-[13px]">
                Анги бүлэг
              </span>
              <div className="mt-2 flex items-center gap-3 bg-[#F8F5FF] border border-[#EDE9FE] rounded-[18px] px-4 py-4">
                <Hash className="text-[#8B5CF6]" size={22} />
                <input type="text" placeholder="Жишээ: 10А" className="bg-transparent outline-none w-full text-[#312E81] placeholder:text-[#A8A1C6]" />
              </div>
            </label>

            <label className="block">
              <span className="text-[#312E81] font-bold text-[13px]">
                Нууц үг
              </span>
              <div className="mt-2 flex items-center gap-3 bg-[#F8F5FF] border border-[#EDE9FE] rounded-[18px] px-4 py-4">
                <Lock className="text-[#8B5CF6]" size={22} />
                <input type="password" placeholder="••••••••" className="bg-transparent outline-none w-full text-[#312E81] placeholder:text-[#A8A1C6]" />
              </div>
            </label>
          </div>

          <motion.button
            whileTap={{ scale: 0.96 }}
            className="mt-6 w-full bg-gradient-to-r from-[#7C3AED] to-[#8B5CF6] text-white rounded-[22px] py-4 font-bold shadow-[0_12px_28px_rgba(124,58,237,0.28)]"
          >
            Бүртгүүлэх
          </motion.button>

          <p className="text-center text-[#94A3B8] text-[14px] mt-6">
            Аль хэдийн бүртгэлтэй юу?{' '}
            <Link to="/login" className="text-[#7C3AED] font-bold">
              Нэвтрэх
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}