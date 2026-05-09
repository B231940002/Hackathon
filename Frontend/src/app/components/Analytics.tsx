import { useNavigate } from 'react-router';
import { ArrowLeft, TrendingUp, TrendingDown } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function Analytics() {
  const navigate = useNavigate();

  const reportTypeData = [
    { type: 'Bullying', count: 45, color: '#F59E0B' },
    { type: 'Harassment', count: 32, color: '#DC2626' },
    { type: 'Violence', count: 28, color: '#DC2626' },
    { type: 'Mental', count: 22, color: '#8B5CF6' },
  ];

  const weeklyTrendData = [
    { week: 'Week 1', reports: 18 },
    { week: 'Week 2', reports: 22 },
    { week: 'Week 3', reports: 28 },
    { week: 'Week 4', reports: 35 },
    { week: 'Week 5', reports: 32 },
    { week: 'Week 6', reports: 38 },
  ];

  return (
    <div className="min-h-screen px-5 py-6 pb-24 max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate('/admin')}
          className="p-2 hover:bg-[#F1F5F9] rounded-full transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-[#1E3A8A]" />
        </button>
        <div>
          <h1 className="text-[24px] font-bold text-[#1E3A8A]">Analytics</h1>
          <p className="text-[#64748B] text-[13px]">Last 30 days overview</p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-white rounded-[16px] p-4 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
          <div className="text-[#64748B] text-[12px] font-medium mb-1">Total Reports</div>
          <div className="flex items-end gap-2">
            <div className="text-[28px] font-bold text-[#1E3A8A]">127</div>
            <div className="flex items-center gap-1 text-[#DC2626] text-[11px] font-semibold mb-1">
              <TrendingUp className="w-3 h-3" />
              <span>+18%</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[16px] p-4 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
          <div className="text-[#64748B] text-[12px] font-medium mb-1">Avg Response Time</div>
          <div className="flex items-end gap-2">
            <div className="text-[28px] font-bold text-[#1E3A8A]">12m</div>
            <div className="flex items-center gap-1 text-[#16A34A] text-[11px] font-semibold mb-1">
              <TrendingDown className="w-3 h-3" />
              <span>-15%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Report Types Chart */}
      <div className="bg-white rounded-[20px] p-5 shadow-[0_2px_8px_rgba(0,0,0,0.06)] mb-5">
        <h2 className="text-[18px] font-bold text-[#1E3A8A] mb-4">Reports by Type</h2>

        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={reportTypeData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis
              dataKey="type"
              tick={{ fill: '#64748B', fontSize: 12 }}
              axisLine={{ stroke: '#E2E8F0' }}
            />
            <YAxis
              tick={{ fill: '#64748B', fontSize: 12 }}
              axisLine={{ stroke: '#E2E8F0' }}
            />
            <Tooltip
              contentStyle={{
                background: '#FFFFFF',
                border: '1px solid #E2E8F0',
                borderRadius: '8px',
                fontSize: '13px'
              }}
            />
            <Bar dataKey="count" radius={[8, 8, 0, 0]}>
              {reportTypeData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>

        <div className="grid grid-cols-2 gap-3 mt-4">
          {reportTypeData.map((item) => (
            <div key={item.type} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: item.color }}
              ></div>
              <span className="text-[12px] text-[#64748B]">{item.type}: {item.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Trend Chart */}
      <div className="bg-white rounded-[20px] p-5 shadow-[0_2px_8px_rgba(0,0,0,0.06)] mb-5">
        <h2 className="text-[18px] font-bold text-[#1E3A8A] mb-4">Weekly Trend</h2>

        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={weeklyTrendData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis
              dataKey="week"
              tick={{ fill: '#64748B', fontSize: 12 }}
              axisLine={{ stroke: '#E2E8F0' }}
            />
            <YAxis
              tick={{ fill: '#64748B', fontSize: 12 }}
              axisLine={{ stroke: '#E2E8F0' }}
            />
            <Tooltip
              contentStyle={{
                background: '#FFFFFF',
                border: '1px solid #E2E8F0',
                borderRadius: '8px',
                fontSize: '13px'
              }}
            />
            <Line
              type="monotone"
              dataKey="reports"
              stroke="#2563EB"
              strokeWidth={3}
              dot={{ fill: '#2563EB', r: 5 }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>

        <div className="mt-4 p-3 bg-[#FEF3C7] rounded-[12px] border border-[#FDE68A]">
          <div className="flex items-start gap-2">
            <TrendingUp className="w-4 h-4 text-[#F59E0B] flex-shrink-0 mt-0.5" />
            <p className="text-[#92400E] text-[12px] leading-relaxed">
              Reports have increased by 18% over the last 6 weeks. Consider increasing awareness campaigns.
            </p>
          </div>
        </div>
      </div>

      {/* Insights */}
      <div className="bg-[#EFF6FF] rounded-[20px] p-5 border border-[#DBEAFE]">
        <h2 className="text-[18px] font-bold text-[#1E3A8A] mb-4">Key Insights</h2>

        <div className="space-y-3">
          <div className="flex gap-2">
            <div className="text-[#2563EB] text-[16px] font-bold flex-shrink-0">1.</div>
            <p className="text-[#1E3A8A] text-[13px] leading-relaxed">
              <span className="font-semibold">Peak reporting times:</span> Reports are highest between 11 AM - 1 PM (lunch period)
            </p>
          </div>
          <div className="flex gap-2">
            <div className="text-[#2563EB] text-[16px] font-bold flex-shrink-0">2.</div>
            <p className="text-[#1E3A8A] text-[13px] leading-relaxed">
              <span className="font-semibold">Bullying incidents:</span> Most common report type, primarily in common areas
            </p>
          </div>
          <div className="flex gap-2">
            <div className="text-[#2563EB] text-[16px] font-bold flex-shrink-0">3.</div>
            <p className="text-[#1E3A8A] text-[13px] leading-relaxed">
              <span className="font-semibold">Response improvement:</span> Average response time decreased from 14m to 12m
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
