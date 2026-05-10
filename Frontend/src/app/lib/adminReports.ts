const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api';

export type AdminUser = {
  admin_id?: string;
  school_id?: string;
  admin_name?: string;
  role?: string;
};

export type TimestampValue =
  | string
  | number
  | Date
  | null
  | {
      _seconds?: number;
      seconds?: number;
    };

export type AdminReport = {
  id?: string;
  report_id?: string;
  student_id?: string | null;
  school_id?: string;
  class_id?: string;
  class_info?: string;
  assigned_admin_id?: string | null;
  is_anonymous?: boolean;
  report_type?: string;
  reporter_role?: string;
  victim_type?: string;
  location_text?: string;
  knows_bully?: boolean;
  description?: string;
  status?: string;
  ai_score?: number;
  created_at?: TimestampValue;
  updated_at?: TimestampValue;
  resolved_at?: TimestampValue;
};

type ApiResponse<T> = {
  success?: boolean;
  message?: string;
  data?: T;
};

const reportTypeLabels: Record<string, string> = {
  physical: 'Бие махбодын хүчирхийлэл',
  psychological: 'Сэтгэл санааны дарамт',
  cyber: 'Цахим дарамт',
  social: 'Нийгмийн гадуурхалт',
  other: 'Бусад',
  general: 'Ерөнхий мэдээлэл',
};

const statusLabels: Record<string, string> = {
  new: 'Шинэ',
  pending: 'Шинэ',
  seen: 'Харсан',
  reviewing: 'Шалгаж байна',
  investigating: 'Шалгаж байна',
  resolved: 'Шийдвэрлэсэн',
  closed: 'Хаасан',
  rejected: 'Татгалзсан',
};

export function getStoredAdminUser(): AdminUser | null {
  const rawUser = localStorage.getItem('admin_user');

  if (!rawUser) {
    return null;
  }

  try {
    return JSON.parse(rawUser);
  } catch {
    localStorage.removeItem('admin_user');
    localStorage.removeItem('admin_is_logged_in');
    return null;
  }
}

export async function fetchAdminReports(): Promise<AdminReport[]> {
  const adminUser = getStoredAdminUser();

  if (!adminUser?.admin_id && !adminUser?.school_id) {
    throw new Error('Админ хэрэглэгчийн мэдээлэл олдсонгүй.');
  }

  const params = new URLSearchParams();

  if (adminUser.school_id) {
    params.set('school_id', adminUser.school_id);
  }

  const endpoint = adminUser.admin_id
    ? `${API_BASE}/reports/admin/${encodeURIComponent(adminUser.admin_id)}${
        params.toString() ? `?${params.toString()}` : ''
      }`
    : `${API_BASE}/reports/school/${encodeURIComponent(adminUser.school_id || '')}`;

  const response = await fetch(endpoint);
  const result = (await response.json()) as ApiResponse<AdminReport[]>;

  if (!response.ok || result.success === false) {
    throw new Error(result.message || 'Report жагсаалт авахад алдаа гарлаа.');
  }

  const reports = Array.isArray(result.data) ? result.data : [];

  return [...reports].sort((first, second) => {
    const scoreDiff = getAiScore(second) - getAiScore(first);

    if (scoreDiff !== 0) {
      return scoreDiff;
    }

    return toMillis(second.created_at) - toMillis(first.created_at);
  });
}

export function getReportId(report: AdminReport) {
  return report.report_id || report.id || '';
}

export function getAiScore(report: AdminReport) {
  const score = Number(report.ai_score);

  if (!Number.isFinite(score)) {
    return 0;
  }

  return Math.min(10, Math.max(0, Math.round(score)));
}

export function getReportTitle(report: AdminReport) {
  return reportTypeLabels[report.report_type || ''] || report.report_type || 'Report';
}

export function getReportDescription(report: AdminReport) {
  return report.description || 'Тайлбар бүртгэгдээгүй байна.';
}

export function getReportLocation(report: AdminReport) {
  const classText = report.class_info || report.class_id || '';
  const locationText = report.location_text || report.school_id || 'Байршил бүртгэгдээгүй';

  return [locationText, classText].filter(Boolean).join(' · ');
}

export function getStatusLabel(status?: string) {
  return statusLabels[status || ''] || status || 'Тодорхойгүй';
}

export function getStatusBadgeClass(status?: string) {
  if (status === 'resolved' || status === 'closed') {
    return 'bg-green-50 text-green-600';
  }

  if (status === 'investigating' || status === 'reviewing' || status === 'seen') {
    return 'bg-blue-50 text-blue-600';
  }

  return 'bg-[#F3E8FF] text-[#7C3AED]';
}

export function getBullyKnownLabel(report: AdminReport) {
  return report.knows_bully ? 'Эзэн тодорхой' : 'Эзэн тодорхой бус';
}

export function getPriorityLabel(report: AdminReport) {
  const score = getAiScore(report);

  if (score >= 9) return 'Яаралтай';
  if (score >= 7) return 'Маш чухал';
  if (score >= 5) return 'Өндөр';
  if (score >= 3) return 'Дунд';
  return 'Энгийн';
}

export function getPriorityBadgeClass(report: AdminReport) {
  const score = getAiScore(report);

  if (score >= 7) return 'bg-red-50 text-red-500';
  if (score >= 5) return 'bg-orange-50 text-orange-500';
  return 'bg-emerald-50 text-emerald-600';
}

export function getReportIcon(report: AdminReport) {
  const type = report.report_type;

  if (type === 'physical') return '!';
  if (type === 'cyber') return '@';
  if (type === 'social') return '#';
  if (type === 'psychological') return 'AI';
  return '!';
}

export function getReportIconClass(report: AdminReport) {
  const score = getAiScore(report);

  if (score >= 7) return 'bg-red-50 text-red-500';
  if (score >= 5) return 'bg-orange-50 text-orange-500';
  return 'bg-[#EDE9FE] text-[#7C3AED]';
}

export function isResolvedReport(report: AdminReport) {
  return report.status === 'resolved' || report.status === 'closed';
}

export function isTodayReport(report: AdminReport) {
  const millis = toMillis(report.created_at);

  if (!millis) {
    return false;
  }

  const today = new Date();
  const date = new Date(millis);

  return (
    today.getFullYear() === date.getFullYear() &&
    today.getMonth() === date.getMonth() &&
    today.getDate() === date.getDate()
  );
}

export function formatReportTime(value?: TimestampValue) {
  const millis = toMillis(value);

  if (!millis) {
    return '--:--';
  }

  return new Intl.DateTimeFormat('mn-MN', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(millis));
}

function toMillis(value?: TimestampValue) {
  if (!value) {
    return 0;
  }

  if (value instanceof Date) {
    return value.getTime();
  }

  if (typeof value === 'number') {
    return value;
  }

  if (typeof value === 'string') {
    const parsed = new Date(value).getTime();
    return Number.isNaN(parsed) ? 0 : parsed;
  }

  const seconds = value._seconds ?? value.seconds;

  if (typeof seconds === 'number') {
    return seconds * 1000;
  }

  return 0;
}
