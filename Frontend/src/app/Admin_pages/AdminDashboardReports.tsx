import { useEffect, useState } from 'react';
import {
  AlertTriangle,
  RefreshCw,
  MapPin,
  UserRound,
  Sparkles,
} from 'lucide-react';

const API_BASE = 'http://localhost:5001/api';

type ReportItem = {
  id?: string;
  report_id?: string;
  school_id?: string;
  school_code?: string;
  report_type?: string;
  reporter_role?: string;
  location_text?: string;
  description?: string;
  status?: string;
  ai_score?: number;
  knows_bully?: boolean;
  created_at?: any;
};

function getReportId(report: ReportItem) {
  return report.report_id || report.id || '';
}

function getReportTitle(type?: string) {
  if (type === 'mental') return 'Сэтгэл санааны дарамт';
  if (type === 'emotional') return 'Сэтгэл санааны дарамт';
  if (type === 'physical') return 'Бие махбодын хүчирхийлэл';
  if (type === 'cyber') return 'Цахим дээрэлхэлт';
  if (type === 'social') return 'Нийгмийн гадуурхалт';
  return 'Дээрэлхэлтийн мэдээлэл';
}

function getReportIcon(type?: string) {
  if (type === 'mental') return '😡';
  if (type === 'emotional') return '😡';
  if (type === 'physical') return '💪';
  if (type === 'cyber') return '💻';
  if (type === 'social') return '👥';
  return '⚠️';
}

function getStatusLabel(status?: string) {
  if (status === 'pending') return 'Хүлээгдэж байна';
  if (status === 'reviewing') return 'Шалгаж байна';
  if (status === 'resolved') return 'Шийдвэрлэсэн';
  if (status === 'rejected') return 'Татгалзсан';
  return status || 'Хүлээгдэж байна';
}

function getStatusClass(status?: string) {
  if (status === 'pending') return 'bg-orange-50 text-orange-500';
  if (status === 'reviewing') return 'bg-blue-50 text-blue-600';
  if (status === 'resolved') return 'bg-green-50 text-green-600';
  if (status === 'rejected') return 'bg-slate-100 text-slate-500';
  return 'bg-orange-50 text-orange-500';
}

function getAiScore(report: ReportItem) {
  const score = Number(report.ai_score);

  if (!Number.isFinite(score)) {
    return 5;
  }

  return Math.min(10, Math.max(1, Math.round(score)));
}

function getPriorityLabel(score: number) {
  if (score >= 8) return 'Маш яаралтай';
  if (score >= 6) return 'Анхаарах';
  return 'Энгийн';
}

function getPriorityClass(score: number) {
  if (score >= 8) return 'bg-red-50 text-red-500';
  if (score >= 6) return 'bg-orange-50 text-orange-500';
  return 'bg-emerald-50 text-emerald-600';
}

function parseDate(value: any) {
  if (!value) return new Date();

  if (typeof value === 'string') {
    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? new Date() : parsed;
  }

  if (value._seconds) {
    return new Date(value._seconds * 1000);
  }

  if (value.seconds) {
    return new Date(value.seconds * 1000);
  }

  return new Date();
}

function formatTime(value: any) {
  const date = parseDate(value);

  return date.toLocaleTimeString('mn-MN', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function AdminDashboardReports() {
  const [reports, setReports] = useState<ReportItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadReports = async () => {
    try {
      setLoading(true);
      setError('');

      const adminRaw = localStorage.getItem('admin_user');

      if (!adminRaw) {
        setError('Admin мэдээлэл олдсонгүй. Дахин login хийнэ үү.');
        setReports([]);
        return;
      }

      const adminUser = JSON.parse(adminRaw);

      if (!adminUser.admin_id) {
        setError('Admin ID олдсонгүй. Дахин login хийнэ үү.');
        setReports([]);
        return;
      }

      if (!adminUser.school_id) {
        setError('Admin дээр school_id байхгүй байна. Эхлээд сургууль бүртгэнэ үү.');
        setReports([]);
        return;
      }

      const response = await fetch(
        `${API_BASE}/reports/admin/${adminUser.admin_id}?school_id=${adminUser.school_id}`
      );

      const text = await response.text();

      let result;
      try {
        result = JSON.parse(text);
      } catch {
        console.error('REPORT DASHBOARD NON JSON RESPONSE:', text);
        setError('/api/reports/admin route JSON буцаахгүй байна. Backend route-оо шалга.');
        setReports([]);
        return;
      }

      console.log('ADMIN DASHBOARD REPORTS:', result);

      if (!response.ok || !result.success) {
        setError(result.message || 'Report мэдээлэл авахад алдаа гарлаа.');
        setReports([]);
        return;
      }

      setReports(result.data || []);
    } catch (err) {
      console.error('LOAD DASHBOARD REPORTS ERROR:', err);
      setError('Backend сервертэй холбогдож чадсангүй.');
      setReports([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReports();
  }, []);

  const latestReports = reports.slice(0, 5);
  const pendingCount = reports.filter((item) => item.status === 'pending').length;
  const highRiskCount = reports.filter((item) => getAiScore(item) >= 8).length;

  return (
    <section className="bg-white rounded-[28px] border border-[#EDE9FE] p-5 shadow-[0_8px_26px_rgba(124,58,237,0.08)]">
      <div className="flex items-start justify-between gap-3 mb-5">
        <div>
          <h2 className="text-[#312E81] text-[20px] font-black">
            Ирсэн report-ууд
          </h2>

          <p className="text-[#94A3B8] text-sm mt-1">
            AI score өндөр report-ууд эхэнд эрэмбэлэгдэнэ.
          </p>
        </div>

        <button
          onClick={loadReports}
          disabled={loading}
          className="bg-[#F3E8FF] text-[#7C3AED] rounded-2xl px-4 py-3 font-bold text-sm flex items-center gap-2 disabled:opacity-60"
        >
          <RefreshCw size={17} className={loading ? 'animate-spin' : ''} />
          Шинэчлэх
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-5">
        <div className="bg-[#F8F5FF] border border-[#EDE9FE] rounded-[22px] p-4">
          <p className="text-[#94A3B8] text-xs font-bold">
            Нийт report
          </p>

          <p className="text-[#312E81] text-[28px] font-black mt-1">
            {reports.length}
          </p>
        </div>

        <div className="bg-red-50 border border-red-100 rounded-[22px] p-4">
          <p className="text-red-400 text-xs font-bold">
            Яаралтай
          </p>

          <p className="text-red-500 text-[28px] font-black mt-1">
            {highRiskCount}
          </p>
        </div>

        <div className="bg-orange-50 border border-orange-100 rounded-[22px] p-4">
          <p className="text-orange-400 text-xs font-bold">
            Pending
          </p>

          <p className="text-orange-500 text-[28px] font-black mt-1">
            {pendingCount}
          </p>
        </div>

        <div className="bg-emerald-50 border border-emerald-100 rounded-[22px] p-4">
          <p className="text-emerald-500 text-xs font-bold">
            Сүүлийн 5
          </p>

          <p className="text-emerald-600 text-[28px] font-black mt-1">
            {latestReports.length}
          </p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 rounded-[18px] px-4 py-3 text-sm font-medium mb-4">
          {error}
        </div>
      )}

      {loading && (
        <div className="bg-[#F8F5FF] border border-[#EDE9FE] rounded-[22px] p-6 text-center text-[#7C3AED] font-bold">
          Report-уудыг уншиж байна...
        </div>
      )}

      {!loading && latestReports.length === 0 && !error && (
        <div className="bg-[#F8F5FF] border border-[#EDE9FE] rounded-[22px] p-6 text-center">
          <div className="text-[36px] mb-2">📭</div>
          <p className="text-[#312E81] font-bold">
            Одоогоор report ирээгүй байна.
          </p>
        </div>
      )}

      {!loading && latestReports.length > 0 && (
        <div className="space-y-3">
          {latestReports.map((report) => {
            const score = getAiScore(report);

            return (
              <button
                key={getReportId(report)}
                onClick={() => {
                  window.location.href = `/admin/complaint-detail`;
                }}
                className="w-full bg-white rounded-[22px] border border-[#EDE9FE] p-4 text-left shadow-[0_8px_22px_rgba(124,58,237,0.06)] hover:shadow-[0_12px_32px_rgba(124,58,237,0.12)] transition"
              >
                <div className="flex gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#F3E8FF] flex items-center justify-center text-[22px] flex-shrink-0">
                    {getReportIcon(report.report_type)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between gap-3">
                      <h3 className="text-[#312E81] font-black text-[15px] flex items-center gap-2">
                        <AlertTriangle
                          size={17}
                          className={score >= 8 ? 'text-red-500' : 'text-[#7C3AED]'}
                        />
                        {getReportTitle(report.report_type)}
                      </h3>

                      <span className="text-[#94A3B8] text-[11px] font-bold whitespace-nowrap">
                        {formatTime(report.created_at)}
                      </span>
                    </div>

                    <p className="text-[#64748B] text-[13px] mt-1 leading-relaxed line-clamp-2">
                      {report.description || 'Тайлбар оруулаагүй.'}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-3">
                      <span className="bg-[#F3E8FF] text-[#7C3AED] px-3 py-1 rounded-full text-[11px] font-bold flex items-center gap-1">
                        <MapPin size={13} />
                        {report.location_text || 'Байршилгүй'}
                      </span>

                      <span className={`${getPriorityClass(score)} px-3 py-1 rounded-full text-[11px] font-bold flex items-center gap-1`}>
                        <Sparkles size={13} />
                        AI {score}/10 · {getPriorityLabel(score)}
                      </span>

                      <span className={`${getStatusClass(report.status)} px-3 py-1 rounded-full text-[11px] font-bold`}>
                        {getStatusLabel(report.status)}
                      </span>

                      <span className="bg-slate-50 text-slate-500 px-3 py-1 rounded-full text-[11px] font-bold flex items-center gap-1">
                        <UserRound size={13} />
                        {report.knows_bully ? 'Эзэн тодорхой' : 'Эзэн тодорхой бус'}
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
}