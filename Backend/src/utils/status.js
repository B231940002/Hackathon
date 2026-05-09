const REPORT_STATUS = {
  PENDING: "pending",
  REVIEWING: "reviewing",
  RESOLVED: "resolved",
  REJECTED: "rejected",
};

const SOS_STATUS = {
  ACTIVE: "active",
  ACKNOWLEDGED: "acknowledged",
  RESOLVED: "resolved",
  CANCELLED: "cancelled",
};

const NOTIFICATION_SOURCE_TYPE = {
  REPORT: "report",
  SOS: "sos",
};

module.exports = {
  REPORT_STATUS,
  SOS_STATUS,
  NOTIFICATION_SOURCE_TYPE,
};