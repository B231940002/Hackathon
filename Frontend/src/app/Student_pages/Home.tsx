import { useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import {
  Bell,
  PhoneCall,
  Smile,
  Home as HomeIcon,
  HeartHandshake,
  ChevronRight,
} from 'lucide-react';
import { motion } from 'motion/react';

const API_BASE = 'http://localhost:5001/api';

const PeekingKawaiiRight = () => (
  <div className="absolute -right-8 top-12 z-0 w-24 h-32 overflow-visible pointer-events-none">
    <motion.svg
      viewBox="0 0 120 150"
      className="w-full h-full"
      initial={{ x: 20 }}
      animate={{ x: [20, 0, 20] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
    >
      <path
        d="M 120,20 C 60,20 20,60 20,100 C 20,120 40,140 120,140 Z"
        fill="#98E2C6"
        stroke="#76C8A8"
        strokeWidth="2"
      />

      <g transform="translate(35, 65) rotate(-10)">
        <rect
          x="0"
          y="0"
          width="35"
          height="28"
          rx="10"
          stroke="#58636D"
          strokeWidth="4"
          fill="white"
        />

        <rect
          x="0"
          y="32"
          width="35"
          height="28"
          rx="10"
          stroke="#58636D"
          strokeWidth="4"
          fill="white"
        />

        <path d="M 17,28 L 17,32" stroke="#58636D" strokeWidth="4" />

        <circle cx="17" cy="14" r="8" fill="#2D1B46" />
        <circle cx="17" cy="46" r="8" fill="#2D1B46" />

        <circle cx="14" cy="11" r="3" fill="white" />
        <circle cx="14" cy="43" r="3" fill="white" />
      </g>
    </motion.svg>
  </div>
);

const KawaiiGhost = ({
  sizeClass = 'w-[120px] h-[120px]',
}: {
  sizeClass?: string;
}) => (
  <div className={`relative flex items-center justify-center ${sizeClass}`}>
    <motion.svg
      viewBox="0 0 200 240"
      className="relative z-10 w-full h-full drop-shadow-xl overflow-visible"
      animate={{ y: [0, -10, 0], rotate: [0, 3, -2, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
    >
      <g transform="translate(30, 15)">
        <path
          d="M 15,75 C 15,5 135,5 135,75 L 135,175 Q 115,195 95,170 Q 75,145 55,170 Q 35,195 15,175 Z"
          fill="#E9D5FF"
        />

        <ellipse
          cx="45"
          cy="105"
          rx="12"
          ry="6"
          fill="#FF9CEE"
          opacity="0.8"
        />

        <ellipse
          cx="105"
          cy="105"
          rx="12"
          ry="6"
          fill="#FF9CEE"
          opacity="0.8"
        />

        <circle cx="55" cy="88" r="10" fill="#1E1B4B" />
        <circle cx="95" cy="88" r="10" fill="#1E1B4B" />

        <circle cx="51" cy="84" r="4" fill="white" />
        <circle cx="91" cy="84" r="4" fill="white" />

        <path
          d="M 70,100 Q 75,108 80,100"
          fill="none"
          stroke="#1E1B4B"
          strokeWidth="4.5"
          strokeLinecap="round"
        />
      </g>
    </motion.svg>
  </div>
);

export default function Home() {
  const navigate = useNavigate();

  const [fillState, setFillState] = useState<
    'idle' | 'filling' | 'completed'
  >('idle');

  const [isSendingSOS, setIsSendingSOS] = useState(false);

  const pressTimeout = useRef<number | null>(null);

  const CIRCUMFERENCE = 534.07;

  const sendSOS = async () => {
    try {
      setIsSendingSOS(true);

      const studentRaw = localStorage.getItem('student_user');

      if (!studentRaw) {
        alert('Сурагчийн мэдээлэл олдсонгүй. Дахин login хийнэ үү.');
        setFillState('idle');
        return;
      }

      const student = JSON.parse(studentRaw);

      if (!student.student_id) {
        alert('student_id олдсонгүй. Дахин login хийнэ үү.');
        setFillState('idle');
        return;
      }

      const response = await fetch(`${API_BASE}/sos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          student_id: student.student_id,

          // Demo location. Дараа нь navigator.geolocation ашиглаж болно.
          latitude: 47.918873,
          longitude: 106.917701,
          location_text: 'Сургуулийн орчим',
        }),
      });

      const text = await response.text();

      let result;
      try {
        result = JSON.parse(text);
      } catch {
        console.error('SOS NON JSON RESPONSE:', text);
        alert('/api/sos route JSON буцаахгүй байна. Backend route-оо шалга.');
        setFillState('idle');
        return;
      }

      console.log('SOS RESPONSE:', result);

      if (!response.ok || !result.success) {
        alert(result.message || 'SOS илгээхэд алдаа гарлаа.');
        setFillState('idle');
        return;
      }

      alert('SOS тусламжийн мэдээлэл админд амжилттай илгээгдлээ.');

      setTimeout(() => {
        setFillState('idle');
      }, 700);
    } catch (error) {
      console.error('SOS SEND ERROR:', error);
      alert('Backend сервертэй холбогдож чадсангүй.');
      setFillState('idle');
    } finally {
      setIsSendingSOS(false);
    }
  };

  const handlePressStart = (
    e: React.PointerEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    if (fillState === 'completed') return;

    setFillState('filling');

    pressTimeout.current = window.setTimeout(() => {
      setFillState('completed');

      const sosData = {
        type: 'SOS',
        studentName: 'Нууц хэрэглэгч',
        school: '5-р сургууль',
        className: '9Б',
        location: 'Сургуулийн орчим',
        time: new Date().toLocaleString(),
        status: 'Идэвхтэй',
        receiver: 'Админ / Нийгмийн ажилтан',
      };

      console.log('SOS илгээгдлээ:', sosData);

      alert(
        'SOS тусламжийн мэдээлэл админ болон нийгмийн ажилтанд илгээгдлээ.'
      );

      setTimeout(() => {
        setFillState('idle');
      }, 700);
    if (fillState === 'completed' || isSendingSOS) return;

    setFillState('filling');

    pressTimeout.current = window.setTimeout(async () => {
      setFillState('completed');
      pressTimeout.current = null;

      await sendSOS();
    }, 3000);
  };

  const handlePressEnd = () => {
    if (pressTimeout.current !== null) {
      clearTimeout(pressTimeout.current);
      pressTimeout.current = null;
    }

    if (fillState !== 'completed') {
    if (fillState !== 'completed' && !isSendingSOS) {
      setFillState('idle');
    }
  };

  return (
    <div className="min-h-screen bg-white/95 via-[#F3EFFF] to-white flex justify-center px-4 py-6 pb-28 font-sans relative">
      <div className="w-full max-w-md bg-gradient-to-b from-[#C7B9FF] via-[#F3EFFF] backdrop-blur-xl rounded-[40px] shadow-2xl overflow-hidden flex flex-col relative border border-white">
        <div className="px-6 pt-10 pb-5 flex-1 overflow-y-auto scrollbar-hide">
          
          <div className="flex items-center justify-between mb-8 px-2 w-full">
            <div className="w-10 h-10" />

            <div className="flex items-center gap-2">
              <img
                src="/src/app/assets/logo.png"
                className="w-10 h-10 object-contain"
                alt="Logo"
              />

              <h1 className="text-violet-800 text-[22px] font-black tracking-tight">
                SafeSchool AI
              </h1>
            </div>

            {/* Notification Button */}
            <button
              onClick={() => navigate('/notification')}
              className="w-10 h-10 rounded-2xl bg-white/60 flex items-center justify-center text-violet-700 shadow-sm border border-white relative active:scale-95 transition-transform"
            >
              <Bell size={20} />

          <div className="flex items-center justify-between mb-8 px-2 w-full">
            <div className="w-10 h-10" />

            <div className="flex items-center gap-2">
              <img
                src="/src/app/assets/logo.png"
                className="w-10 h-10 object-contain"
                alt="Logo"
              />

              <h1 className="text-violet-800 text-[22px] font-black tracking-tight">
                SafeSchool AI
              </h1>
            </div>

            <button
              onClick={() => navigate('/notification')}
              className="w-10 h-10 rounded-2xl bg-white/60 flex items-center justify-center text-violet-700 shadow-sm border border-white relative active:scale-95 transition-transform"
            >
              <Bell size={20} />

              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
            </button>
          </div>

          {/* Greeting */}
          <div className="mb-8 bg-white p-6 rounded-[34px] shadow-sm flex items-center gap-4 border border-violet-50">
            <div className="flex-shrink-0 bg-violet-50 rounded-2xl p-1">
              <KawaiiGhost sizeClass="w-[85px] h-[85px]" />
            </div>

            <div className="flex-1">
              <h2 className="text-violet-950 text-[26px] font-black leading-none">
                Сайн уу! 👋
              </h2>

              <p className="text-violet-900/60 text-[13px] font-bold mt-1">
                Чиний аюулгүй байдал бидний хамгийн чухал зүйл.
              </p>
            </div>
          </div>

          {/* SOS CARD */}
          <div className="relative bg-white rounded-[36px] shadow-sm px-5 pt-10 pb-8 mb-7 border border-slate-50">
            <PeekingKawaiiRight />

            <div className="relative z-10 mx-auto w-[240px] h-[240px] flex items-center justify-center">
              <svg
                className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none"
                viewBox="0 0 180 180"
              >
                <circle
                  cx="90"
                  cy="90"
                  r="85"
                  fill="none"
                  stroke="#FFF5F6"
                  strokeWidth="10"
                />

                <motion.circle
                  cx="90"
                  cy="90"
                  r="85"
                  fill="none"
                  stroke="#FF3B4F"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray={`${CIRCUMFERENCE} ${CIRCUMFERENCE}`}
                  animate={{
                    strokeDashoffset:
                      fillState === 'filling'
                        ? 0
                        : CIRCUMFERENCE,
                  }}
                  transition={{
                    duration:
                      fillState === 'filling' ? 3 : 0.3,
                    ease: 'linear',
                  }}
                />
              </svg>

              <motion.button
                onPointerDown={handlePressStart}
                onPointerUp={handlePressEnd}
                onPointerLeave={handlePressEnd}
                onPointerCancel={handlePressEnd}
                disabled={isSendingSOS}
                whileTap={{ scale: 0.95 }}
                className="relative z-10 w-[200px] h-[200px] rounded-full bg-gradient-to-b from-[#FF5F6D] to-[#EF233C] shadow-2xl flex flex-col items-center justify-center text-white touch-none disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <PhoneCall size={44} className="mb-2" />

                <span className="text-[48px] font-black tracking-tighter leading-none">
                  SOS
                </span>

                {isSendingSOS && (
                  <span className="mt-2 text-[12px] font-bold">
                    Илгээж байна...
                  </span>
                )}
              </motion.button>
            </div>

            <p className="text-center text-red-500 font-black text-[15px] mt-8 leading-relaxed">
              SOS идэвхжүүлэхийн тулд <br />
              3 секунд дарна уу
            </p>

            {/* SOS INFO BUTTON */}
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/sos-info')}
              className="mt-8 w-full rounded-[26px] px-5 py-4 flex items-center justify-between bg-violet-50/50 border border-violet-100/50 hover:bg-violet-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-white flex items-center justify-center text-violet-500 shadow-sm">
                  <Smile size={24} />
                </div>

                <div className="text-left">
                  <h3 className="text-violet-900 font-black text-[15px]">
                    SOS хэрхэн ажилладаг вэ?
                  </h3>

                  <p className="text-violet-900/40 text-[11px] font-bold mt-1">
                    Дэлгэрэнгүй мэдээлэл харах
                  </p>
                </div>
              </div>

              <ChevronRight
                className="text-violet-400"
                size={22}
              />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-md bg-white/95 backdrop-blur-xl rounded-[34px] shadow-2xl px-6 py-4 z-50 border border-white/50">
        <div className="flex items-center justify-center gap-16">
          
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-md bg-white/95 backdrop-blur-xl rounded-[34px] shadow-2xl px-6 py-4 z-50 border border-white/50">
        <div className="flex items-center justify-center gap-16">
          <button
            onClick={() => navigate('/home')}
            className="flex flex-col items-center gap-1 text-violet-700 font-black active:scale-95 transition-transform"
          >
            <div className="bg-violet-100 px-6 py-2.5 rounded-[20px] shadow-inner">
              <HomeIcon size={24} strokeWidth={2.5} />
            </div>

            <span className="text-[11px]">Нүүр</span>
          </button>

          <button
            onClick={() => navigate('/report')}
            className="flex flex-col items-center gap-1 text-slate-400 font-bold active:scale-95 transition-transform"
          >
            <div className="px-6 py-2.5">
              <HeartHandshake size={26} strokeWidth={2} />
            </div>

            <span className="text-[11px]">
              Мэдэгдэх
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}