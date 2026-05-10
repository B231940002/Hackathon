import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import {
  ArrowLeft,
  Lock,
  Image,
  Send,
  ShieldCheck,
  MessageCircle,
  Home,
  Heart,
  Wind,
  Star,
  CheckCircle,
  Trash2,
  BicepsFlexed // Булчингийн icon-ийг энд импортолсон
} from 'lucide-react';
import { motion } from 'motion/react';

// --- Дээд зэрэглэлийн "Kawaii Blob" SVG Компонент ---
const KawaiiBlob = ({ 
  baseColor, 
  shadowColor, 
  Accessory, 
  delay = 0,
  sizeClass = "w-64 h-64",
  iconClass = "w-12 h-12",
  iconPosition = "-top-2 right-4",
  emotion = "happy" 
}: any) => (
  <div className={`relative flex items-center justify-center ${sizeClass}`}>
    <div
      className="absolute inset-0 rounded-full blur-2xl opacity-40 mix-blend-multiply"
      style={{ backgroundColor: shadowColor }}
    />
    <motion.svg
      viewBox="0 0 200 200"
      className="relative z-10 w-full h-full drop-shadow-2xl overflow-visible"
      animate={{ y: [0, -12, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay }}
    >
      <path
        d="M100,25 C155,25 175,65 175,120 C175,175 145,190 100,190 C55,190 25,175 25,120 C25,65 45,25 100,25 Z"
        fill={baseColor}
      />
      <path
        d="M100,190 C145,190 175,175 175,120 C175,140 145,170 100,170 C55,170 25,140 25,120 C25,175 55,190 100,190 Z"
        fill={shadowColor}
      />
      <path
        d="M175,120 C175,145 160,165 140,178 C155,165 165,145 165,120 C165,80 155,50 135,35 C160,50 175,80 175,120 Z"
        fill={shadowColor}
        opacity="0.6"
      />
      <motion.path
        d="M30,115 C10,120 10,140 25,140 C35,140 40,130 40,120"
        fill={baseColor}
        animate={{ rotate: [0, -12, 0], transformOrigin: '40px 120px' }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
      />
      <path
        d="M135,135 C115,145 110,155 120,160 C130,165 150,150 150,140 Z"
        fill={shadowColor}
      />
      
      {/* Нүүрний хувирлууд */}
      {emotion === "happy" ? (
        <g transform="translate(0, -2)">
          <path d="M68,100 C73,108 83,108 88,100" fill="none" stroke="#0F172A" strokeWidth="5" strokeLinecap="round" />
          <path d="M112,100 C117,108 127,108 132,100" fill="none" stroke="#0F172A" strokeWidth="5" strokeLinecap="round" />
          <ellipse cx="58" cy="110" rx="10" ry="5.5" fill="#FF8A8A" opacity="0.6" filter="blur(1px)" />
          <ellipse cx="142" cy="110" rx="10" ry="5.5" fill="#FF8A8A" opacity="0.6" filter="blur(1px)" />
          <path d="M93,115 C97,121 103,121 107,115" fill="none" stroke="#0F172A" strokeWidth="4.5" strokeLinecap="round" />
        </g>
      ) : (
        <g transform="translate(0, -2)">
          {/* Гунигтай, анисан нүд */}
          <path d="M68,105 C73,100 83,100 88,105" fill="none" stroke="#0F172A" strokeWidth="5" strokeLinecap="round" />
          <path d="M112,105 C117,100 127,100 132,105" fill="none" stroke="#0F172A" strokeWidth="5" strokeLinecap="round" />
          
          {/* Урсаж буй нулимснууд */}
          <motion.ellipse cx="78" cy="112" rx="3.5" ry="5" fill="#38BDF8" opacity="0.8" animate={{ y: [0, 12], opacity: [0.8, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeIn" }} />
          <motion.ellipse cx="122" cy="112" rx="3.5" ry="5" fill="#38BDF8" opacity="0.8" animate={{ y: [0, 12], opacity: [0.8, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeIn", delay: 0.7 }} />
          
          <ellipse cx="58" cy="110" rx="10" ry="5.5" fill="#FF8A8A" opacity="0.3" filter="blur(1px)" />
          <ellipse cx="142" cy="110" rx="10" ry="5.5" fill="#FF8A8A" opacity="0.3" filter="blur(1px)" />
          <path d="M93,118 C97,113 103,113 107,118" fill="none" stroke="#0F172A" strokeWidth="4.5" strokeLinecap="round" />
        </g>
      )}
    </motion.svg>
    
    {Accessory && (
      <motion.div
        className={`absolute z-20 ${iconPosition}`}
        animate={{ y: [0, -5, 0], rotate: [0, 8, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: delay + 0.5 }}
      >
        <Accessory className={`${iconClass} drop-shadow-md`} />
      </motion.div>
    )}
  </div>
);

// Урмын үгс болон Дүрүүд
const encouragingSteps = [
  {
    title: 'Чи ганцаараа биш шүү.',
    text: 'Бид таныг сонсож, туслахад үргэлж бэлэн байна.',
    bgClass: 'from-[#F0F9FF] to-[#E0F2FE]',
    baseColor: '#BAE6FD',
    shadowColor: '#7DD3FC',
    Accessory: (props: any) => <ShieldCheck {...props} className={`${props.className} text-blue-500 fill-blue-100`} />,
  },
  {
    title: 'Чи үнэхээр сайн байлаа!',
    text: 'Энэ бүгд чиний буруу биш болохоор битгий гуниглаарай.',
    bgClass: 'from-[#FFF1F2] to-[#FFE4E6]',
    baseColor: '#FBCFE8',
    shadowColor: '#F472B6',
    Accessory: (props: any) => <Heart {...props} className={`${props.className} text-pink-500 fill-pink-200`} />,
  },
  {
    title: 'Та бол үнэ цэнэтэй нэгэн.',
    text: 'Хэн ч таныг дарамтлах эрхгүй. Та бол эрхэм нандин.',
    bgClass: 'from-[#F5F3FF] to-[#EDE9FE]',
    baseColor: '#C4B5FD',
    shadowColor: '#A78BFA',
    Accessory: (props: any) => <Star {...props} className={`${props.className} text-purple-500 fill-purple-100`} />,
  },
  {
    title: 'Зоригтой байсанд баярлалаа',
    text: 'Одоо бүх зүйл ард хоцорсон. Тайван амраарай.',
    bgClass: 'from-[#ECFDF5] to-[#D1FAE5]',
    baseColor: '#A7F3D0',
    shadowColor: '#34D399',
    Accessory: (props: any) => <Wind {...props} className={`${props.className} text-emerald-500 fill-emerald-100`} />,
  },
];

type ImageAttachment = {
  fileName: string;
  fileType: string;
  dataUrl: string;
};

const MAX_IMAGE_SIDE = 1280;
const MAX_IMAGE_DATA_URL_LENGTH = 900000;
const IMAGE_JPEG_QUALITY = 0.82;

const createCompressedImageAttachment = (
  file: File
): Promise<ImageAttachment> =>
  new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      reject(new Error('Зөвхөн зураг сонгоно уу.'));
      return;
    }

    const reader = new FileReader();

    reader.onerror = () => reject(new Error('Зураг уншиж чадсангүй.'));
    reader.onload = () => {
      const source = reader.result;

      if (typeof source !== 'string') {
        reject(new Error('Зураг бэлтгэж чадсангүй.'));
        return;
      }

      const image = new window.Image();

      image.onerror = () => reject(new Error('Зураг ачаалахад алдаа гарлаа.'));
      image.onload = () => {
        const render = (maxSide: number, quality: number) => {
          const canvas = document.createElement('canvas');
          let { width, height } = image;

          if (width > height && width > maxSide) {
            height = Math.round((height * maxSide) / width);
            width = maxSide;
          } else if (height >= width && height > maxSide) {
            width = Math.round((width * maxSide) / height);
            height = maxSide;
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');

          if (!ctx) {
            return null;
          }

          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, width, height);
          ctx.drawImage(image, 0, 0, width, height);

          return canvas.toDataURL('image/jpeg', quality);
        };

        let dataUrl = render(MAX_IMAGE_SIDE, IMAGE_JPEG_QUALITY);

        if (!dataUrl) {
          reject(new Error('Зураг бэлтгэж чадсангүй.'));
          return;
        }

        if (dataUrl.length > MAX_IMAGE_DATA_URL_LENGTH) {
          dataUrl = render(960, 0.7) || dataUrl;
        }

        if (dataUrl.length > MAX_IMAGE_DATA_URL_LENGTH) {
          reject(new Error('Зураг хэт том байна. Илүү жижиг зураг сонгоно уу.'));
          return;
        }

        resolve({
          fileName: file.name,
          fileType: 'image/jpeg',
          dataUrl,
        });
      };

      image.src = source;
    };

    reader.readAsDataURL(file);
  });

export default function ReportForm() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const [role, setRole] = useState('');
  const [type, setType] = useState('');
  const [known, setKnown] = useState('');
  const [location, setLocation] = useState('');
  const [bullyName, setBullyName] = useState('');
  const [classGroup, setClassGroup] = useState('');
  const [description, setDescription] = useState('');
  const [extra, setExtra] = useState('');

  // Файл хадгалах state-үүд
  const [imageAttachment, setImageAttachment] = useState<ImageAttachment | null>(null);
  const [imageError, setImageError] = useState('');

  const [randomIndex, setRandomIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    const random = Math.floor(Math.random() * encouragingSteps.length);
    setRandomIndex(random);
    setIsLoaded(true);
  }, []);

  const nextStep = () => {
    if (step < 4) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
    else navigate('/');
  };

  const handleImageSelected = async (file?: File | null) => {
    if (!file) return;

    setImageError('');

    try {
      const attachment = await createCompressedImageAttachment(file);
      setImageAttachment(attachment);
    } catch (error) {
      setImageAttachment(null);
      setImageError(
        error instanceof Error ? error.message : 'Зураг оруулахад алдаа гарлаа.'
      );
    }
  };

  const removeImage = () => {
    setImageAttachment(null);
    setImageError('');
  };

  const submitReport = async () => {
    setSubmitError('');

    if (!description.trim()) {
      setSubmitError('Тайлбараа бөглөнө үү.');
      return;
    }

    const reportType = type || 'general';

    const savedUser = localStorage.getItem('student_user');

    let student: { student_id?: string; school_id?: string } | null = null;

    if (savedUser) {
      try {
        student = JSON.parse(savedUser);
      } catch {
        localStorage.removeItem('student_user');
        localStorage.removeItem('student_is_logged_in');
        student = null;
      }
    }

    const evidenceFiles = imageAttachment
      ? [
          {
            file_url: imageAttachment.dataUrl,
            file_name: imageAttachment.fileName,
            file_type: imageAttachment.fileType,
          },
        ]
      : [];

    const payload = {
      student_id: student?.student_id || null,
      school_id: student?.school_id || 'demo-school',
      is_anonymous: true,
      report_type: reportType,
      reporter_role: role || 'witness',
      location_text: location.trim(),
      knows_bully: known === 'yes',
      description: extra.trim()
        ? `${description.trim()}\n\nНэмэлт тайлбар: ${extra.trim()}`
        : description.trim(),
      bullies:
        known === 'yes'
          ? [
              {
                is_known: true,
                bully_name: bullyName.trim(),
                bully_group: classGroup.trim(),
              },
            ]
          : [],
      evidence_files: evidenceFiles,
    };

    try {
      setSubmitting(true);

      const res = await fetch('http://localhost:5001/api/reports', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || data.success === false) {
        setSubmitError(data.message || 'Мэдээлэл илгээхэд алдаа гарлаа.');
        return;
      }

      setStep(4);
    } catch (error) {
      console.error('REPORT SUBMIT ERROR:', error);
      setSubmitError('Backend сервертэй холбогдож чадсангүй.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!isLoaded) return null;

  if (step === 4) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className={`min-h-screen flex flex-col items-center justify-center px-8 bg-gradient-to-br ${encouragingSteps[randomIndex].bgClass}`}
      >
        <div className="max-w-sm w-full text-center flex flex-col items-center">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-white/60 backdrop-blur-md px-5 py-2.5 rounded-full inline-flex items-center gap-2.5 mb-8 shadow-sm border border-white/50"
          >
            <CheckCircle className="w-5 h-5 text-emerald-500" />
            <span className="text-slate-800 font-bold text-[14px]">
              Мэдээлэл амжилттай илгээгдлээ
            </span>
          </motion.div>

          <div className="mb-10 flex justify-center">
            <KawaiiBlob
              baseColor={encouragingSteps[randomIndex].baseColor}
              shadowColor={encouragingSteps[randomIndex].shadowColor}
              Accessory={encouragingSteps[randomIndex].Accessory}
              emotion="happy"
            />
          </div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="min-h-[120px] px-2"
          >
            <h2 className="text-[28px] font-black text-[#0F172A] mb-4 leading-tight tracking-tight">
              {encouragingSteps[randomIndex].title}
            </h2>
            <p className="text-[#475569] text-[18px] leading-relaxed font-medium">
              {encouragingSteps[randomIndex].text}
            </p>
          </motion.div>

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
              onClick={() => navigate('/breathe')}
              className="flex-1 bg-[#1E3A8A] text-white py-5 rounded-[28px] font-bold shadow-xl shadow-blue-900/20 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <Wind className="w-5 h-5 text-blue-200" /> Тайвшруулах
            </button>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E9DDFF] via-[#F8F5FF] to-white px-4 py-6 pb-28">
      <div className="w-full max-w-md mx-auto bg-white/90 backdrop-blur-xl rounded-[36px] shadow-[0_20px_60px_rgba(124,58,237,0.22)] border border-white overflow-hidden">
        <div className="px-5 pt-7 pb-6">
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

          {step === 1 && (
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <div>
                <h2 className="text-[#312E81] font-bold text-[15px] mb-3">Таны байр суурь</h2>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setRole('victim')}
                    className={`rounded-[22px] p-4 border-2 text-center shadow-[0_8px_24px_rgba(124,58,237,0.05)] transition-all ${
                      role === 'victim' ? 'border-pink-400 bg-pink-50' : 'border-[#EDE9FE] bg-white hover:border-pink-200'
                    }`}
                  >
                    <div className={`mx-auto flex items-center justify-center mb-2 transition-all duration-300 ${role === 'victim' ? 'scale-110' : 'scale-100 opacity-60 grayscale-[0.3]'}`}>
                      <KawaiiBlob
                        baseColor={role === 'victim' ? '#FBCFE8' : '#F1F5F9'}
                        shadowColor={role === 'victim' ? '#F472B6' : '#CBD5E1'}
                        sizeClass="w-16 h-16"
                        emotion="sad"
                      />
                    </div>
                    <h3 className={`font-bold text-[14px] transition-colors ${role === 'victim' ? 'text-pink-600' : 'text-[#312E81]'}`}>Хохирогч</h3>
                    <p className="text-[#94A3B8] text-[11px] mt-1">Би дээрэлхүүлж байгаа</p>
                  </button>

                  <button
                    onClick={() => setRole('witness')}
                    className={`rounded-[22px] p-4 border-2 text-center shadow-[0_8px_24px_rgba(124,58,237,0.05)] transition-all ${
                      role === 'witness' ? 'border-sky-400 bg-sky-50' : 'border-[#EDE9FE] bg-white hover:border-sky-200'
                    }`}
                  >
                    <div className={`mx-auto flex items-center justify-center mb-2 transition-all duration-300 ${role === 'witness' ? 'scale-110' : 'scale-100 opacity-60 grayscale-[0.3]'}`}>
                      <KawaiiBlob
                        baseColor={role === 'witness' ? '#BAE6FD' : '#F1F5F9'}
                        shadowColor={role === 'witness' ? '#7DD3FC' : '#CBD5E1'}
                        sizeClass="w-16 h-16"
                        emotion="sad" 
                      />
                    </div>
                    <h3 className={`font-bold text-[14px] transition-colors ${role === 'witness' ? 'text-sky-600' : 'text-[#312E81]'}`}>Мэдээлэгч</h3>
                    <p className="text-[#94A3B8] text-[11px] mt-1">Би өөр хүний тухай мэдэж байна</p>
                  </button>
                </div>
              </div>

              <div className="h-[1px] bg-[#EDE9FE]" />

              <div>
                <h2 className="text-[#312E81] font-bold text-[15px] mb-3">Ямар төрлийн асуудал вэ?</h2>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setType('mental')}
                    className={`rounded-[22px] p-4 border-2 text-left shadow-[0_8px_24px_rgba(124,58,237,0.05)] transition-all ${
                      type === 'mental' ? 'border-purple-400 bg-purple-50' : 'border-[#EDE9FE] bg-white hover:border-purple-200'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-colors ${
                      type === 'mental' ? 'bg-purple-500 shadow-md shadow-purple-200' : 'bg-slate-100'
                    }`}>
                      <MessageCircle className={type === 'mental' ? 'text-white' : 'text-slate-400'} size={24} />
                    </div>
                    <h3 className={`font-bold text-[13px] transition-colors ${type === 'mental' ? 'text-purple-700' : 'text-[#312E81]'}`}>Сэтгэл санааны</h3>
                    <p className="text-[#94A3B8] text-[11px] mt-1">Үг хэллэг, доромжлол, үзэн ядалт</p>
                  </button>

                  <button
                    onClick={() => setType('physical')}
                    className={`rounded-[22px] p-4 border-2 text-left shadow-[0_8px_24px_rgba(124,58,237,0.05)] transition-all ${
                      type === 'physical' ? 'border-orange-400 bg-orange-50' : 'border-[#EDE9FE] bg-white hover:border-orange-200'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-colors ${
                      type === 'physical' ? 'bg-orange-500 shadow-md shadow-orange-200' : 'bg-slate-100'
                    }`}>
                      {/* BicepsFlexed цэвэрхэн icon ашигласан */}
                      <BicepsFlexed className={type === 'physical' ? 'text-white' : 'text-slate-400'} size={24} />
                    </div>
                    <h3 className={`font-bold text-[13px] transition-colors ${type === 'physical' ? 'text-orange-700' : 'text-[#312E81]'}`}>Бие махбодын</h3>
                    <p className="text-[#94A3B8] text-[11px] mt-1">Түлхэх, цохих, гэмтээх зэрэг</p>
                  </button>
                </div>
              </div>

              <div className="bg-[#F3E8FF] rounded-[18px] px-4 py-3 flex gap-3 items-center">
                <Lock className="text-[#7C3AED]" size={18} />
                <p className="text-[#7C3AED] text-[12px] font-medium">Таны мэдээлэл нууцлагдаж, аюулгүй хадгалагдана.</p>
              </div>

              <button
                onClick={nextStep}
                className="w-full bg-gradient-to-r from-[#7C3AED] to-[#8B5CF6] text-white rounded-[22px] py-4 font-bold shadow-[0_12px_28px_rgba(124,58,237,0.28)]"
              >
                Үргэлжлүүлэх
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
              <div>
                <label className="text-[#312E81] font-bold text-[14px] mb-2 block">Байршил</label>
                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Байршлаа бичнэ үү"
                  className="w-full rounded-[16px] border border-[#EDE9FE] px-4 py-4 outline-none text-[13px]"
                />
              </div>

              <div>
                <h2 className="text-[#312E81] font-bold text-[14px] mb-2">Та дээрэлхэгчийг таних уу?</h2>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setKnown('yes')}
                    className={`py-3 rounded-[15px] border-2 font-bold text-[13px] transition-all ${
                      known === 'yes' ? 'border-emerald-400 text-emerald-600 bg-emerald-50' : 'border-[#E2E8F0] text-[#64748B]'
                    }`}
                  >
                    Тийм
                  </button>
                  <button
                    onClick={() => setKnown('no')}
                    className={`py-3 rounded-[15px] border-2 font-bold text-[13px] transition-all ${
                      known === 'no' ? 'border-slate-400 text-slate-700 bg-slate-50' : 'border-[#E2E8F0] text-[#64748B]'
                    }`}
                  >
                    Үгүй
                  </button>
                </div>
              </div>

              {known === 'yes' && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }} 
                  animate={{ opacity: 1, height: "auto" }} 
                  className="space-y-5 overflow-hidden"
                >
                  <div>
                    <label className="text-[#312E81] font-bold text-[14px] mb-2 block">Овог нэр</label>
                    <input
                      value={bullyName}
                      onChange={(e) => setBullyName(e.target.value)}
                      placeholder="Дээрэлхэгчийн овог, нэр"
                      className="w-full rounded-[16px] border border-[#EDE9FE] px-4 py-4 outline-none text-[13px]"
                    />
                  </div>

                  <div>
                    <label className="text-[#312E81] font-bold text-[14px] mb-2 block">Анги / бүлэг</label>
                    <div>
                      <input
                        value={classGroup}
                        onChange={(e) => setClassGroup(e.target.value)}
                        placeholder="Жишээ: 8а анги, 9б бүлэг"
                        className="w-full rounded-[16px] border border-[#EDE9FE] px-4 py-4 outline-none text-[13px]"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              <div>
                <label className="text-[#312E81] font-bold text-[14px] mb-2 block">Дүрслэн бичих</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  maxLength={1000}
                  placeholder="Юу болсон бэ? Хэн оролцсон бэ? Хэзээ болсон бэ? Дэлгэрэнгүй бичнэ үү."
                  className="w-full h-32 rounded-[16px] border border-[#EDE9FE] px-4 py-4 outline-none text-[13px] resize-none"
                />
                <p className="text-right text-[#94A3B8] text-[11px]">{description.length}/1000</p>
              </div>

              <div className="bg-[#F3E8FF] rounded-[18px] px-4 py-3 flex gap-3 items-center">
                <Lock className="text-[#7C3AED]" size={18} />
                <p className="text-[#7C3AED] text-[12px] font-medium">Таны мэдээлэл нууцлагдаж, аюулгүй хадгалагдана.</p>
              </div>

              <button
                onClick={nextStep}
                className="w-full bg-gradient-to-r from-[#7C3AED] to-[#8B5CF6] text-white rounded-[22px] py-4 font-bold shadow-[0_12px_28px_rgba(124,58,237,0.28)]"
              >
                Дараагийн алхам
              </button>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
              <div>
                <h2 className="text-[#312E81] font-bold text-[14px] mb-3">
                  Нотолгоо хавсаргах<span className="text-[#94A3B8] font-medium"> /заавал биш/</span>
                </h2>
                
                <div className="grid grid-cols-1 gap-3">
                  <label className="rounded-[18px] border border-[#EDE9FE] bg-white p-4 flex flex-col items-center gap-2 shadow-[0_8px_24px_rgba(124,58,237,0.08)] hover:border-purple-200 transition-colors cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0] ?? null;
                        handleImageSelected(file);
                        e.currentTarget.value = '';
                      }}
                    />
                    <Image className="text-[#7C3AED]" size={28} />
                    <span className="text-[#312E81] text-[12px] font-bold">Зураг</span>
                    <span className={`text-[11px] ${imageAttachment ? 'text-emerald-500 font-bold' : 'text-[#7C3AED]'}`}>
                      {imageAttachment ? '✔ Сонгосон' : 'Оруулах'}
                    </span>
                  </label>

                  {imageAttachment && (
                    <div className="rounded-[18px] border border-[#EDE9FE] bg-white p-3 shadow-[0_8px_24px_rgba(124,58,237,0.08)]">
                      <div className="overflow-hidden rounded-[14px] border border-[#F3E8FF]">
                        <img
                          src={imageAttachment.dataUrl}
                          alt="Сонгосон зураг"
                          className="h-40 w-full object-cover"
                        />
                      </div>

                      <div className="mt-3 flex items-center justify-between gap-3">
                        <div className="min-w-0">
                          <p className="truncate text-[#312E81] text-[12px] font-bold">
                            {imageAttachment.fileName}
                          </p>
                          <p className="text-[#94A3B8] text-[11px]">Зураг хавсаргалаа</p>
                        </div>

                        <button
                          type="button"
                          onClick={removeImage}
                          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#EDE9FE] text-[#7C3AED]"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {imageError && (
                  <p className="mt-2 text-[12px] font-medium text-red-500">{imageError}</p>
                )}
              </div>

              <div>
                <label className="text-[#312E81] font-bold text-[14px] mb-2 block">Тайлбар</label>
                <textarea
                  value={extra}
                  onChange={(e) => setExtra(e.target.value)}
                  maxLength={1500}
                  placeholder="Нэмэлт мэдээлэл, тайлбар бичнэ үү. Ямар нэгэн чухал зүйл байвал энд тэмдэглэнэ үү."
                  className="w-full h-44 rounded-[18px] border border-[#EDE9FE] px-4 py-4 outline-none text-[13px] resize-none"
                />
                <p className="text-right text-[#94A3B8] text-[11px]">{extra.length}/1500</p>
              </div>

              <div className="bg-[#F3E8FF] rounded-[18px] px-4 py-3 flex gap-3 items-center">
                <Lock className="text-[#7C3AED]" size={18} />
                <p className="text-[#7C3AED] text-[12px] font-medium">Таны өгсөн мэдээлэл зөвхөн итгэмжлэгдсэн хүмүүст нууцаар хүргэгдэнэ.</p>
              </div>

              {submitError && (
                <div className="rounded-[16px] border border-red-200 bg-red-50 px-4 py-3 text-center text-[13px] font-semibold text-red-600">
                  {submitError}
                </div>
              )}

              <button
                onClick={submitReport}
                disabled={submitting}
                className="w-full bg-gradient-to-r from-[#7C3AED] to-[#8B5CF6] text-white rounded-[22px] py-4 font-bold shadow-[0_12px_28px_rgba(124,58,237,0.28)] flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <Send size={20} /> {submitting ? 'Илгээж байна...' : 'Илгээх'}
              </button>

              <div className="flex items-center justify-center gap-2 text-[#64748B] text-[12px]">
                <ShieldCheck className="text-[#16A34A]" size={16} /> Аюулгүй, нууц, найдвартай.
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}