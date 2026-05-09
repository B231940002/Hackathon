import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, MapPin, Home, PenLine, Heart, Wind, Star, ShieldCheck, AlertCircle, MessageSquare, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Дээд зэрэглэлийн "Kawaii Blob" SVG Компонент ---
const KawaiiBlob = ({ baseColor, shadowColor, Accessory, delay = 0 }: any) => (
  <div className="relative w-64 h-64 flex items-center justify-center">
    {/* Арын зөөлөн туяа (Glow) */}
    <div 
      className="absolute inset-0 rounded-full blur-3xl opacity-40 mix-blend-multiply" 
      style={{ backgroundColor: shadowColor }} 
    />

    <motion.svg
      viewBox="0 0 200 200"
      className="relative z-10 w-full h-full drop-shadow-2xl overflow-visible"
      animate={{ y: [0, -12, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay }}
    >
      {/* Үндсэн бие */}
      <path 
        d="M100,25 C155,25 175,65 175,120 C175,175 145,190 100,190 C55,190 25,175 25,120 C25,65 45,25 100,25 Z" 
        fill={baseColor} 
      />

      {/* 3D Сүүдэр (Belly & Right side shadow) */}
      <path 
        d="M100,190 C145,190 175,175 175,120 C175,140 145,170 100,170 C55,170 25,140 25,120 C25,175 55,190 100,190 Z" 
        fill={shadowColor} 
      />
      <path 
        d="M175,120 C175,145 160,165 140,178 C155,165 165,145 165,120 C165,80 155,50 135,35 C160,50 175,80 175,120 Z" 
        fill={shadowColor} opacity="0.6" 
      />

      {/* Зүүн гар (Хөдөлдөг) */}
      <motion.path
         d="M30,115 C10,120 10,140 25,140 C35,140 40,130 40,120" 
         fill={baseColor}
         animate={{ rotate: [0, -12, 0], transformOrigin: "40px 120px" }}
         transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Баруун гар (Гэдсэн дээрээ тавьсан) */}
      <path 
        d="M135,135 C115,145 110,155 120,160 C130,165 150,150 150,140 Z" 
        fill={shadowColor} 
      />

      {/* Царай */}
      <g transform="translate(0, -2)">
        {/* Нүд */}
        <path d="M68,100 C73,108 83,108 88,100" fill="none" stroke="#0F172A" strokeWidth="5" strokeLinecap="round" />
        <path d="M112,100 C117,108 127,108 132,100" fill="none" stroke="#0F172A" strokeWidth="5" strokeLinecap="round" />
        {/* Хацар (Blush) */}
        <ellipse cx="58" cy="110" rx="10" ry="5.5" fill="#FF8A8A" opacity="0.6" filter="blur(1px)" />
        <ellipse cx="142" cy="110" rx="10" ry="5.5" fill="#FF8A8A" opacity="0.6" filter="blur(1px)" />
        {/* Инээмсэглэл */}
        <path d="M93,115 C97,121 103,121 107,115" fill="none" stroke="#0F172A" strokeWidth="4.5" strokeLinecap="round" />
      </g>
    </motion.svg>

    {/* Accessory */}
    <motion.div
       className="absolute -top-2 right-4 z-20"
       animate={{ y: [0, -10, 0], rotate: [0, 8, -8, 0] }}
       transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: delay + 0.5 }}
    >
      <Accessory className="w-12 h-12 drop-shadow-md" />
    </motion.div>
  </div>
);

export default function ReportForm() {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [mentalScores, setMentalScores] = useState<{ [key: number]: number }>({});
  
  // Санамсаргүй байдлаар сонгогдсон индексийг хадгалах
  const [randomStepIndex, setRandomStepIndex] = useState(0);

  // Урмын үгс болон Дүрүүд
  const encouragingSteps = [
    { 
      title: "Чи ганцаараа биш шүү.", 
      text: "Бид таныг сонсож, туслахад үргэлж бэлэн байна.", 
      bgClass: "from-[#F0F9FF] to-[#E0F2FE]", // Цэнхэр
      baseColor: "#BAE6FD", shadowColor: "#7DD3FC",
      Accessory: (props: any) => <ShieldCheck {...props} className={`${props.className} text-blue-500 fill-blue-100`} />
    },
    { 
      title: "Чи үнэхээр сайн байлаа!", 
      text: "Энэ бүгд чиний буруу биш болохоор битгий гуниглаарай.", 
      bgClass: "from-[#FFF1F2] to-[#FFE4E6]", // Ягаан
      baseColor: "#FBCFE8", shadowColor: "#F472B6",
      Accessory: (props: any) => <Heart {...props} className={`${props.className} text-pink-500 fill-pink-200`} />
    },
    { 
      title: "Та бол үнэ цэнэтэй нэгэн.", 
      text: "Хэн ч таныг дарамтлах эрхгүй. Та бол эрхэм нандин.", 
      bgClass: "from-[#FFF7ED] to-[#FFEDD5]", // Шинэчлэгдсэн: Улбар шар (Orange)
      baseColor: "#FDBA74", shadowColor: "#FB923C",
      Accessory: (props: any) => <Star {...props} className={`${props.className} text-orange-500 fill-orange-100`} />
    },
    { 
      title: "Зоригтой байсанд баярлалаа", 
      text: "Одоо бүх зүйл ард хоцорсон. Тайван амраарай.", 
      bgClass: "from-[#ECFDF5] to-[#D1FAE5]", // Ногоон
      baseColor: "#A7F3D0", shadowColor: "#34D399",
      Accessory: (props: any) => <Wind {...props} className={`${props.className} text-emerald-500 fill-emerald-100`} />
    }
  ];

  const reportTypes = [
    { id: 'violence', label: 'Биеийн хүчирхийлэл', icon: AlertCircle, color: '#DC2626', gradient: 'from-[#FEE2E2] to-[#FECACA]' },
    { id: 'mental', label: 'Сэтгэл санааны хүчирхийлэл', icon: MessageSquare, color: '#8B5CF6', gradient: 'from-[#EDE9FE] to-[#DDD6FE]' },
  ];

  const mentalLevels = [
    { score: 1, emoji: '🙂', label: 'Үгүй' },
    { score: 2, emoji: '😐', label: 'Хааяа' },
    { score: 3, emoji: '😟', label: 'Дунд' },
    { score: 4, emoji: '😠', label: 'Их' },
    { score: 5, emoji: '😫', label: 'Байнга' },
  ];

  const isFormValid = () => {
    const baseValid = location.trim() !== '' && description.trim() !== '';
    if (selectedType === 'mental') return baseValid && Object.keys(mentalScores).length === 3;
    return baseValid && selectedType !== '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid()) {
      // 0-ээс 3 хүртэлх санамсаргүй тоог сонгох
      const randomIndex = Math.floor(Math.random() * encouragingSteps.length);
      setRandomStepIndex(randomIndex);
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className={`fixed inset-0 z-[100] flex flex-col items-center justify-center px-8 bg-gradient-to-br ${encouragingSteps[randomStepIndex].bgClass}`}
          >
            <div className="max-w-sm w-full text-center flex flex-col items-center">
              
              {/* Амжилттай илгээгдсэн тухай Badge */}
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="bg-white/60 backdrop-blur-md px-5 py-2.5 rounded-full inline-flex items-center gap-2.5 mb-10 shadow-sm border border-white/50"
              >
                <CheckCircle className="w-5 h-5 text-emerald-500" />
                <span className="text-slate-800 font-bold text-[14px]">Мэдээлэл амжилттай илгээгдлээ</span>
              </motion.div>

              {/* Санамсаргүй сонгогдсон Kawaii Character */}
              <div className="mb-12 flex justify-center">
                <KawaiiBlob 
                  baseColor={encouragingSteps[randomStepIndex].baseColor}
                  shadowColor={encouragingSteps[randomStepIndex].shadowColor}
                  Accessory={encouragingSteps[randomStepIndex].Accessory}
                />
              </div>

              {/* Текст мэдээлэл */}
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="min-h-[120px] px-2"
              >
                <h2 className="text-[28px] font-black text-[#0F172A] mb-4 leading-tight tracking-tight">
                  {encouragingSteps[randomStepIndex].title}
                </h2>
                <p className="text-[#475569] text-[18px] leading-relaxed font-medium">
                  {encouragingSteps[randomStepIndex].text}
                </p>
              </motion.div>

              {/* Байнгын харагдах 2 товчлуур */}
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-8 flex gap-4 w-full"
              >
                <button
                  onClick={() => navigate('/')}
                  className="flex-1 bg-white/60 backdrop-blur-md text-[#1E3A8A] py-5 rounded-[28px] font-bold shadow-sm hover:bg-white active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <Home className="w-5 h-5" /> Буцах
                </button>
                <button
                  onClick={() => navigate('/calm')}
                  className="flex-1 bg-[#1E3A8A] text-white py-5 rounded-[28px] font-bold shadow-xl shadow-blue-900/20 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <Wind className="w-5 h-5 text-blue-200" /> Тайвшруулах
                </button>
              </motion.div>
            </div>
          </motion.div>
        ) : (
          <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pb-32">
            {/* Header */}
            <div className="bg-gradient-to-br from-[#0F172A] to-[#1E3A8A] px-6 pt-10 pb-14 rounded-b-[48px] shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
              <button onClick={() => navigate('/')} className="absolute left-6 top-10 p-2.5 bg-white/10 rounded-full backdrop-blur-sm">
                <ArrowLeft className="w-6 h-6 text-white" />
              </button>
              <div className="max-w-md mx-auto text-center mt-2">
                <h1 className="text-white text-[32px] font-black tracking-tight mb-2">Тусламж хүсэх</h1>
                <p className="text-blue-200 text-[15px] font-medium">Бид таныг сонсоход хэзээд бэлэн</p>
              </div>
            </div>

            <div className="max-w-md mx-auto px-6 -mt-8 space-y-6">
              {/* Type Selection */}
              <div className="bg-white rounded-[32px] p-7 shadow-lg shadow-slate-200/50 border border-slate-100">
                <label className="block text-[#0F172A] font-extrabold mb-5 text-lg">Асуудлын төрөл</label>
                <div className="grid grid-cols-2 gap-4">
                  {reportTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setSelectedType(type.id)}
                      className={`p-5 rounded-[24px] border-2 transition-all flex flex-col items-center ${
                        selectedType === type.id 
                          ? 'border-[#2563EB] bg-blue-50/80 shadow-inner' 
                          : 'border-slate-100 bg-slate-50 hover:bg-slate-100'
                      }`}
                    >
                      <type.icon className="w-9 h-9 mb-3" style={{ color: type.color }} />
                      <div className="text-[13px] font-bold text-[#0F172A] text-center leading-tight">{type.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Mental Scale */}
              <AnimatePresence>
                {selectedType === 'mental' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-4 overflow-hidden"
                  >
                    {[
                      { id: 1, text: "Таныг үл тоомсорлох эсвэл гадуурхах тохиолдол гардаг үү?" },
                      { id: 2, text: "Хэн нэгэн таныг доромжлох, нэр хоч өгөх явдал гардаг уу?" },
                      { id: 3, text: "Та сургууль дээрээ байхдаа айдас, түгшүүртэй байдаг уу?" }
                    ].map((q) => (
                      <div key={q.id} className="bg-white rounded-[32px] p-7 shadow-lg shadow-slate-200/50 border border-slate-100">
                        <p className="text-[#0F172A] font-bold text-[16px] mb-6 leading-snug">{q.text}</p>
                        <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded-[28px] border border-slate-100">
                          {mentalLevels.map((level) => {
                            const isActive = mentalScores[q.id] === level.score;
                            return (
                              <button
                                key={level.score}
                                type="button"
                                onClick={() => setMentalScores(prev => ({ ...prev, [q.id]: level.score }))}
                                className="flex flex-col items-center flex-1"
                              >
                                <motion.span
                                  animate={{ scale: isActive ? 1.5 : 1, filter: isActive ? 'grayscale(0%) drop-shadow(0 4px 6px rgba(0,0,0,0.1))' : 'grayscale(100%)' }}
                                  className="text-3xl mb-1.5 cursor-pointer"
                                >
                                  {level.emoji}
                                </motion.span>
                                <span className={`text-[10px] font-bold transition-opacity ${isActive ? 'text-[#8B5CF6] opacity-100' : 'opacity-0'}`}>
                                  {level.label}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Inputs */}
              <div className="bg-white rounded-[32px] p-7 shadow-lg shadow-slate-200/50 border border-slate-100 space-y-6">
                <div>
                  <label className="block text-[#0F172A] font-extrabold mb-3 text-lg">Хаана болсон бэ?</label>
                  <div className="relative">
                    <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400" />
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full bg-slate-50 rounded-[24px] pl-14 pr-5 py-4.5 text-[16px] text-slate-800 font-medium focus:outline-none focus:ring-2 ring-blue-500/20 border border-slate-200 focus:border-blue-500 focus:bg-white transition-all"
                      placeholder="Жишээ нь: Заал..."
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[#0F172A] font-extrabold mb-3 text-lg flex items-center gap-2">
                    <PenLine className="w-5 h-5 text-slate-500" /> Дэлгэрэнгүй тайлбар
                  </label>
                  <textarea
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full bg-slate-50 rounded-[24px] p-5 text-[16px] text-slate-800 font-medium focus:outline-none focus:ring-2 ring-blue-500/20 border border-slate-200 focus:border-blue-500 focus:bg-white transition-all resize-none"
                    placeholder="Бидэнд тусалж чадах бүх мэдээллийг..."
                  />
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={!isFormValid()}
                className="w-full bg-[#1E3A8A] text-white py-5.5 rounded-[28px] font-black text-[18px] tracking-wide shadow-xl shadow-blue-900/20 active:scale-[0.98] transition-all disabled:opacity-40 disabled:active:scale-100 mt-4"
              >
                Мэдээллийг илгээх
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}