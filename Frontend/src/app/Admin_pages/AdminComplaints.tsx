import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Filter, RefreshCw, UserRound } from 'lucide-react';
import {
  type AdminReport,
  fetchAdminReports,
  formatReportTime,
  getAiScore,
  getBullyKnownLabel,
  getPriorityBadgeClass,
  getPriorityLabel,
  getReportDescription,
  getReportIcon,
  getReportIconClass,
  getReportId,
  getReportLocation,
  getReportTitle,
  getStatusBadgeClass,
  getStatusLabel,
  isResolvedReport,
} from '../lib/adminReports';

type BullyFilter = 'all' | 'known' | 'unknown';
type StatusFilter = 'all' | 'open' | 'resolved';

export default function AdminComplaints() {
  const navigate = useNavigate();
  const [reports, setReports] = useState<AdminReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [bullyFilter, setBullyFilter] = useState<BullyFilter>('all');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('open');

  const loadReports = async () => {
    try {
      setLoading(true);
      setError('');
      setReports(await fetchAdminReports());
    } catch (err) {
      setReports([]);
      setError(err instanceof Error ? err.message : 'Report жагсаалт авахад алдаа гарлаа.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadReports();
  }, []);

  const filteredReports = useMemo(() => {
    return reports.filter((report) => {
      const bullyMatches =
        bullyFilter === 'all' ||
        (bullyFilter === 'known' && report.knows_bully) ||
        (bullyFilter === 'unknown' && !report.knows_bully);

      const statusMatches =
        statusFilter === 'all' ||
        (statusFilter === 'open' && !isResolvedReport(report)) ||
        (statusFilter === 'resolved' && isResolvedReport(report));

      return bullyMatches && statusMatches;
    });
  }, [bullyFilter, reports, statusFilter]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E9DDFF] via-[#F8F5FF] to-white p-4">
      <div className="max-w-md mx-auto bg-white/95 rounded-[34px] shadow-[0_20px_60px_rgba(124,58,237,0.22)] border border-white p-5">
        <div className="flex items-center gap-3 mb-5">
          <button onClick={() => navigate('/admin')} className="text-[#7C3AED]">
            <ArrowLeft size={24} />
          </button>

          <h1 className="text-[#312E81] text-xl font-bold">
            Ирсэн гомдлууд
          </h1>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-3">
          {[
            { label: 'Бүгд', value: 'all' },
            { label: 'Эзэн тодорхой', value: 'known' },
            { label: 'Эзэн тодорхой бус', value: 'unknown' },
          ].map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => setBullyFilter(item.value as BullyFilter)}
              className={`py-3 rounded-xl text-[12px] font-bold border ${
                bullyFilter === item.value
                  ? 'bg-gradient-to-r from-[#7C3AED] to-[#8B5CF6] text-white border-[#7C3AED] shadow-[0_8px_20px_rgba(124,58,237,0.22)]'
                  : 'bg-white text-[#312E81] border-[#EDE9FE]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-2 mb-4">
          {[
            { label: 'Шийдвэрлэгдээгүй', value: 'open' },
            { label: 'Шийдвэрлэсэн', value: 'resolved' },
          ].map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => setStatusFilter(item.value as StatusFilter)}
              className={`py-3 rounded-xl text-[12px] font-bold border ${
                statusFilter === item.value
                  ? 'bg-[#F3E8FF] text-[#7C3AED] border-[#DDD6FE]'
                  : 'bg-white text-[#312E81] border-[#EDE9FE]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between mb-4">
          <button className="bg-white border border-[#EDE9FE] rounded-xl px-4 py-2 text-[#312E81] font-bold text-[12px]">
            Эрэмбэлэх: <span className="text-[#7C3AED]">AI score их эхэнд</span>
          </button>

          <button className="bg-white border border-[#EDE9FE] rounded-xl px-4 py-2 text-[#7C3AED] font-bold text-[12px] flex items-center gap-2">
            <Filter size={16} />
            Шүүлтүүр
          </button>
        </div>

        <div className="space-y-3">
          {loading && (
            <div className="bg-white rounded-[22px] border border-[#EDE9FE] p-5 text-center text-[#64748B] text-sm font-bold">
              Report-уудыг уншиж байна...
            </div>
          )}

          {!loading && error && (
            <div className="bg-red-50 rounded-[22px] border border-red-100 p-5 text-center text-red-500 text-sm font-bold">
              {error}
            </div>
          )}

          {!loading && !error && filteredReports.length === 0 && (
            <div className="bg-white rounded-[22px] border border-[#EDE9FE] p-5 text-center text-[#64748B] text-sm font-bold">
              Одоогоор тохирох report алга байна.
            </div>
          )}

          {!loading && !error && filteredReports.map((item) => (
            <button
              key={getReportId(item)}
              onClick={() =>
                navigate('/admin/complaint-detail', {
                  state: { reportId: getReportId(item), report: item },
                })
              }
              className="w-full bg-white rounded-[22px] border border-[#EDE9FE] p-4 text-left shadow-[0_8px_26px_rgba(124,58,237,0.08)]"
            >
              <div className="flex gap-3">
                <div className={`w-12 h-12 rounded-2xl ${getReportIconClass(item)} flex items-center justify-center text-[18px] font-black flex-shrink-0`}>
                  {getReportIcon(item)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between gap-2">
                    <h3 className="text-[#312E81] font-bold text-[15px]">
                      {getReportTitle(item)}
                    </h3>

                    <span className="text-[#64748B] text-[11px] font-bold whitespace-nowrap">
                      {formatReportTime(item.created_at)}
                    </span>
                  </div>

                  <p className="text-[#64748B] text-[12px] mt-1 leading-relaxed">
                    {getReportDescription(item)}
                  </p>

                  <div className="flex items-center gap-2 mt-3 flex-wrap">
                    <span className="flex items-center gap-1 text-[#64748B] text-[11px] font-medium">
                      <UserRound size={14} />
                      {getReportLocation(item)}
                    </span>

                    <span className={`${getPriorityBadgeClass(item)} px-3 py-1 rounded-full text-[11px] font-bold`}>
                      AI {getAiScore(item)}/10 · {getPriorityLabel(item)}
                    </span>

                    <span className={`${getStatusBadgeClass(item.status)} px-3 py-1 rounded-full text-[11px] font-bold`}>
                      {getStatusLabel(item.status)}
                    </span>

                    <span className="bg-slate-50 text-slate-500 px-3 py-1 rounded-full text-[11px] font-bold">
                      {getBullyKnownLabel(item)}
                    </span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => void loadReports()}
          disabled={loading}
          className="mt-5 w-full bg-[#F3E8FF] text-[#7C3AED] rounded-[18px] py-4 font-bold flex items-center justify-center gap-2 disabled:opacity-60"
        >
          Шинэчлэх
          <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
        </button>
      </div>
    </div>
  );
}
