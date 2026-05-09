import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  ArrowLeft,
  Lock,
  MapPin,
  Image,
  Play,
  Mic,
  Send,
  ShieldCheck,
  ChevronDown,
  MessageCircle,
  Frown,
  Smile,
} from 'lucide-react';
import { motion } from 'motion/react';

export default function ReportForm() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const [role, setRole] = useState('');
  const [type, setType] = useState('');
  const [known, setKnown] = useState('');
  const [location, setLocation] = useState('');
  const [classGroup, setClassGroup] = useState('');
  const [description, setDescription] = useState('');
  const [extra, setExtra] = useState('');

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
    else navigate('/');
  };

  const submitReport = () => {
    alert('Мэдээлэл амжилттай илгээгдлээ');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E9DDFF] via-[#F8F5FF] to-white px-4 py-6 pb-28">
      <div className="w-full max-w-md mx-auto bg-white/90 backdrop-blur-xl rounded-[36px] shadow-[0_20px_60px_rgba(124,58,237,0.22)] border border-white overflow-hidden">
        <div className="px-5 pt-7 pb-6">
          {/* Header */}
          <div className="flex items-center mb-6">
            <button
              onClick={prevStep}
              className="w-10 h-10 rounded-2xl flex items-center justify-center text-[#7C3AED]"
            >
              <ArrowLeft size={24} />
            </button>

            <h1 className="flex-1 text-center text-[#1E1B4B] font-bold text-[17px] mr-10">
              {step === 1 && 'Мэдээлэл илгээх'}
              {step === 2 && 'Дэлгэрэнгүй мэдээлэл'}
              {step === 3 && 'Нотолгоо & Тайлбар'}
            </h1>
          </div>

          {/* Stepper */}
          <div className="flex items-center justify-center mb-7">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="flex items-center">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-bold border ${
                    step >= item
                      ? 'bg-[#7C3AED] text-white border-[#7C3AED]'
                      : 'bg-white text-[#A78BFA] border-[#C4B5FD]'
                  }`}
                >
                  {item}
                </div>

                {item !== 4 && (
                  <div
                    className={`w-10 h-[2px] ${
                      step > item ? 'bg-[#7C3AED]' : 'bg-[#DDD6FE]'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* STEP 1 */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-[#312E81] font-bold text-[15px] mb-3">
                  Таны байр суурь
                </h2>

                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setRole('victim')}
                    className={`rounded-[22px] p-4 border-2 text-center shadow-[0_8px_24px_rgba(124,58,237,0.10)] ${
                      role === 'victim'
                        ? 'border-[#7C3AED] bg-[#F5F3FF]'
                        : 'border-[#EDE9FE] bg-white'
                    }`}
                  >
                    <div className="text-[54px] mb-2">🙍‍♀️</div>
                    <h3 className="text-[#312E81] font-bold text-[14px]">
                      Хохирогч
                    </h3>
                    <p className="text-[#94A3B8] text-[11px] mt-1">
                      Би дээрэлхүүлж байгаа
                    </p>
                  </button>

                  <button
                    onClick={() => setRole('witness')}
                    className={`rounded-[22px] p-4 border-2 text-center shadow-[0_8px_24px_rgba(124,58,237,0.10)] ${
                      role === 'witness'
                        ? 'border-[#7C3AED] bg-[#F5F3FF]'
                        : 'border-[#EDE9FE] bg-white'
                    }`}
                  >
                    <div className="text-[54px] mb-2">🙋‍♂️</div>
                    <h3 className="text-[#312E81] font-bold text-[14px]">
                      Мэдээлэгч
                    </h3>
                    <p className="text-[#94A3B8] text-[11px] mt-1">
                      Би өөр хүний тухай мэдэж байна
                    </p>
                  </button>
                </div>
              </div>

              <div className="h-[1px] bg-[#EDE9FE]" />

              <div>
                <h2 className="text-[#312E81] font-bold text-[15px] mb-3">
                  Ямар төрлийн асуудал вэ?
                </h2>

                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setType('mental')}
                    className={`rounded-[22px] p-4 border text-left shadow-[0_8px_24px_rgba(124,58,237,0.10)] ${
                      type === 'mental'
                        ? 'border-[#7C3AED] bg-[#F5F3FF]'
                        : 'border-[#EDE9FE] bg-white'
                    }`}
                  >
                    <div className="w-14 h-14 bg-[#7C3AED] rounded-full flex items-center justify-center mb-3">
                      <MessageCircle className="text-white" size={28} />
                    </div>
                    <h3 className="text-[#312E81] font-bold text-[13px]">
                      Сэтгэл санааны
                    </h3>
                    <p className="text-[#94A3B8] text-[11px] mt-1">
                      Үг хэллэг, доромжлол, үзэн ядалт гэх мэт
                    </p>
                  </button>

                  <button
                    onClick={() => setType('physical')}
                    className={`rounded-[22px] p-4 border text-left shadow-[0_8px_24px_rgba(124,58,237,0.10)] ${
                      type === 'physical'
                        ? 'border-[#7C3AED] bg-[#F5F3FF]'
                        : 'border-[#EDE9FE] bg-white'
                    }`}
                  >
                    <div className="text-[44px] mb-3">✊</div>
                    <h3 className="text-[#312E81] font-bold text-[13px]">
                      Бие махбодын
                    </h3>
                    <p className="text-[#94A3B8] text-[11px] mt-1">
                      Түлхэх, цохих, гэмтээх зэрэг үйлдэл
                    </p>
                  </button>
                </div>
              </div>

              <div className="bg-[#F3E8FF] rounded-[18px] px-4 py-3 flex gap-3 items-center">
                <Lock className="text-[#7C3AED]" size={18} />
                <p className="text-[#7C3AED] text-[12px] font-medium">
                  Таны мэдээлэл нууцлагдаж, аюулгүй хадгалагдана.
                </p>
              </div>

              <button
                onClick={nextStep}
                className="w-full bg-gradient-to-r from-[#7C3AED] to-[#8B5CF6] text-white rounded-[22px] py-4 font-bold shadow-[0_12px_28px_rgba(124,58,237,0.28)]"
              >
                Үргэлжлүүлэх
              </button>
            </motion.div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-5"
            >
              <div>
                <label className="text-[#312E81] font-bold text-[14px] mb-2 block">
                  Байршил
                </label>
                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Байршлаа бичнэ үү"
                  className="w-full rounded-[16px] border border-[#EDE9FE] px-4 py-4 outline-none text-[13px]"
                />

                <button className="mt-3 w-full bg-[#F5F3FF] border border-[#DDD6FE] rounded-[18px] px-4 py-4 flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-[#7C3AED] flex items-center justify-center">
                    <MapPin className="text-white" size={24} />
                  </div>
                  <div className="text-left">
                    <h3 className="text-[#5B21B6] font-bold text-[14px]">
                      Шууд байршил авах
                    </h3>
                    <p className="text-[#94A3B8] text-[12px]">
                      Байршлаа одоо тэмдэглэх
                    </p>
                  </div>
                </button>
              </div>

              <div>
                <h2 className="text-[#312E81] font-bold text-[14px] mb-2">
                  Та дээрэлхэгчийг таних уу?
                </h2>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setKnown('yes')}
                    className={`py-3 rounded-[15px] border font-bold text-[13px] ${
                      known === 'yes'
                        ? 'border-[#7C3AED] text-[#7C3AED] bg-[#F5F3FF]'
                        : 'border-[#E2E8F0] text-[#64748B]'
                    }`}
                  >
                    Тийм
                  </button>

                  <button
                    onClick={() => setKnown('no')}
                    className={`py-3 rounded-[15px] border font-bold text-[13px] ${
                      known === 'no'
                        ? 'border-[#7C3AED] text-[#7C3AED] bg-[#F5F3FF]'
                        : 'border-[#E2E8F0] text-[#64748B]'
                    }`}
                  >
                    Үгүй
                  </button>
                </div>
              </div>

              <div>
                <label className="text-[#312E81] font-bold text-[14px] mb-2 block">
                  Анги / бүлэг
                </label>

                <div className="relative">
                  <input
                    value={classGroup}
                    onChange={(e) => setClassGroup(e.target.value)}
                    placeholder="Жишээ: 8а анги, 9б бүлэг"
                    className="w-full rounded-[16px] border border-[#EDE9FE] px-4 py-4 outline-none text-[13px]"
                  />
                  <ChevronDown
                    className="absolute right-4 top-4 text-[#A78BFA]"
                    size={20}
                  />
                </div>
              </div>

              <div>
                <label className="text-[#312E81] font-bold text-[14px] mb-2 block">
                  Дүрслэн бичих
                </label>

                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  maxLength={1000}
                  placeholder="Юу болсон бэ? Хэн оролцсон бэ? Хэзээ болсон бэ? Дэлгэрэнгүй бичнэ үү."
                  className="w-full h-32 rounded-[16px] border border-[#EDE9FE] px-4 py-4 outline-none text-[13px] resize-none"
                />
                <p className="text-right text-[#94A3B8] text-[11px]">
                  {description.length}/1000
                </p>
              </div>

              <div className="bg-[#F3E8FF] rounded-[18px] px-4 py-3 flex gap-3 items-center">
                <ShieldCheck className="text-[#7C3AED]" size={18} />
                <p className="text-[#7C3AED] text-[12px] font-medium">
                  Чи ганцаараа биш. Тусламж хүсэх нь зоригтой байдлын илрэл юм. 💜
                </p>
              </div>

              <button
                onClick={nextStep}
                className="w-full bg-gradient-to-r from-[#7C3AED] to-[#8B5CF6] text-white rounded-[22px] py-4 font-bold shadow-[0_12px_28px_rgba(124,58,237,0.28)]"
              >
                Дараагийн алхам
              </button>
            </motion.div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-5"
            >
              <div>
                <h2 className="text-[#312E81] font-bold text-[14px] mb-3">
                  Нотолгоо хавсаргах
                  <span className="text-[#94A3B8] font-medium"> /заавал биш/</span>
                </h2>

                <div className="grid grid-cols-3 gap-3">
                  <button className="rounded-[18px] border border-[#EDE9FE] bg-white p-4 flex flex-col items-center gap-2 shadow-[0_8px_24px_rgba(124,58,237,0.08)]">
                    <Image className="text-[#7C3AED]" size={28} />
                    <span className="text-[#312E81] text-[12px] font-bold">
                      Зураг
                    </span>
                    <span className="text-[#7C3AED] text-[11px]">
                      Оруулах
                    </span>
                  </button>

                  <button className="rounded-[18px] border border-[#EDE9FE] bg-white p-4 flex flex-col items-center gap-2 shadow-[0_8px_24px_rgba(124,58,237,0.08)]">
                    <Play className="text-[#3B82F6]" size={28} />
                    <span className="text-[#312E81] text-[12px] font-bold">
                      Видео
                    </span>
                    <span className="text-[#7C3AED] text-[11px]">
                      Оруулах
                    </span>
                  </button>

                  <button className="rounded-[18px] border border-[#EDE9FE] bg-white p-4 flex flex-col items-center gap-2 shadow-[0_8px_24px_rgba(124,58,237,0.08)]">
                    <Mic className="text-[#06B6D4]" size={28} />
                    <span className="text-[#312E81] text-[12px] font-bold">
                      Voice
                    </span>
                    <span className="text-[#7C3AED] text-[11px]">
                      Оруулах
                    </span>
                  </button>
                </div>
              </div>

              <div>
                <label className="text-[#312E81] font-bold text-[14px] mb-2 block">
                  Тайлбар
                </label>

                <textarea
                  value={extra}
                  onChange={(e) => setExtra(e.target.value)}
                  maxLength={1500}
                  placeholder="Нэмэлт мэдээлэл, тайлбар бичнэ үү. Ямар нэгэн чухал зүйл байвал энд тэмдэглэнэ үү."
                  className="w-full h-44 rounded-[18px] border border-[#EDE9FE] px-4 py-4 outline-none text-[13px] resize-none"
                />
                <p className="text-right text-[#94A3B8] text-[11px]">
                  {extra.length}/1500
                </p>
              </div>

              <div className="bg-[#F3E8FF] rounded-[18px] px-4 py-3 flex gap-3 items-center">
                <Lock className="text-[#7C3AED]" size={18} />
                <p className="text-[#7C3AED] text-[12px] font-medium">
                  Таны өгсөн мэдээлэл зөвхөн итгэмжлэгдсэн хүмүүст нууцаар хүргэгдэнэ.
                </p>
              </div>

              <button
                onClick={submitReport}
                className="w-full bg-gradient-to-r from-[#7C3AED] to-[#8B5CF6] text-white rounded-[22px] py-4 font-bold shadow-[0_12px_28px_rgba(124,58,237,0.28)] flex items-center justify-center gap-2"
              >
                <Send size={20} />
                Илгээх
              </button>

              <div className="flex items-center justify-center gap-2 text-[#64748B] text-[12px]">
                <ShieldCheck className="text-[#16A34A]" size={16} />
                Аюулгүй, нууц, найдвартай.
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}