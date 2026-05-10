const { db } = require("../config/firebase");
const { REPORT_STATUS } = require("../utils/status");
const { scoreReportSeverity } = require("../ai_api/gemini");

const normalizeAiScore = (score) => {
  const numericScore = Number(score);

  if (!Number.isFinite(numericScore)) {
    return 5;
  }

  return Math.min(10, Math.max(1, Math.round(numericScore)));
};

const serializeTimestamp = (value) => {
  if (!value) {
    return null;
  }

  if (value instanceof Date) {
    return value.toISOString();
  }

  if (typeof value.toDate === "function") {
    return value.toDate().toISOString();
  }

  if (typeof value === "object" && typeof value._seconds === "number") {
    return new Date(value._seconds * 1000).toISOString();
  }

  return value;
};

const timestampToMillis = (value) => {
  if (!value) {
    return 0;
  }

  if (value instanceof Date) {
    return value.getTime();
  }

  if (typeof value.toDate === "function") {
    return value.toDate().getTime();
  }

  if (typeof value === "object" && typeof value._seconds === "number") {
    return value._seconds * 1000;
  }

  const parsed = new Date(value).getTime();
  return Number.isNaN(parsed) ? 0 : parsed;
};

const serializeReport = (docOrId, data) => {
  const id = typeof docOrId === "string" ? docOrId : docOrId.id;
  const reportData = data || docOrId.data();

  return {
    id,
    ...reportData,
    ai_score: normalizeAiScore(reportData.ai_score),
    created_at: serializeTimestamp(reportData.created_at),
    updated_at: serializeTimestamp(reportData.updated_at),
    resolved_at: serializeTimestamp(reportData.resolved_at),
    ai_score_updated_at: serializeTimestamp(reportData.ai_score_updated_at),
  };
};

const sortReportsByAiScore = (reports) =>
  reports.sort((first, second) => {
    const scoreDiff =
      normalizeAiScore(second.ai_score) - normalizeAiScore(first.ai_score);

    if (scoreDiff !== 0) {
      return scoreDiff;
    }

    return timestampToMillis(second.created_at) - timestampToMillis(first.created_at);
  });

const createReport = async (req, res) => {
  try {
    const {
      school_id,
      student_id,
      is_anonymous,
      report_type,
      reporter_role,
      location_text,
      latitude,
      longitude,
      knows_bully,
      description,
      bullies,
      evidence_files,
    } = req.body;

    // student_id биш, school_id шаардана
    if (!school_id || !report_type || !description) {
      return res.status(400).json({
        success: false,
        message: "school_id, report_type, description шаардлагатай.",
      });
    }

    // school_id үнэхээр Firestore дээр байгаа эсэхийг шалгана
    const schoolDoc = await db.collection("schools").doc(school_id).get();

    if (!schoolDoc.exists) {
      return res.status(404).json({
        success: false,
        message: "Сургууль олдсонгүй.",
      });
    }

    const reportRef = db.collection("reports").doc();
    const aiScore = normalizeAiScore(
      await scoreReportSeverity({
        report_type,
        reporter_role: reporter_role || "witness",
        description,
        knows_bully: knows_bully ?? false,
      })
    );

    const adminSnapshot = await db
      .collection("admins")
      .where("school_id", "==", school_id)
      .limit(1)
      .get();

    const assignedAdmin = adminSnapshot.empty
      ? null
      : adminSnapshot.docs[0].data();

    const reportData = {
      report_id: reportRef.id,
      school_id,

      // anonymous report тул student_id null байж болно
      student_id: student_id || null,

      assigned_admin_id: assignedAdmin
        ? assignedAdmin.admin_id || adminSnapshot.docs[0].id
        : null,
      is_anonymous: is_anonymous ?? true,

      report_type,
      reporter_role: reporter_role || "witness",

      location_text: location_text || "",
      latitude: latitude ?? null,
      longitude: longitude ?? null,

      knows_bully: knows_bully ?? false,
      description,

      status: REPORT_STATUS.PENDING,
      ai_score: aiScore,

      created_at: new Date(),
      updated_at: new Date(),
      resolved_at: null,
      ai_score_updated_at: new Date(),
    };

    await reportRef.set(reportData);

    if (Array.isArray(bullies)) {
      for (const bully of bullies) {
        const bullyRef = db.collection("report_bullies").doc();

        await bullyRef.set({
          report_bully_id: bullyRef.id,
          report_id: reportRef.id,

          is_known: bully.is_known ?? false,
          bully_name: bully.bully_name || "",

          // frontend-ээс bully_class гэж явуулж байгаа тул үүнийг авч байна
          bully_class: bully.bully_class || "",

          // өмнөх ERD-д bully_grade байсан тул хадгалах боломжтой
          bully_grade: bully.bully_grade || "",

          bully_group: bully.bully_group || "",
          bully_description: bully.bully_description || "",
          bully_gender: bully.bully_gender || "",
          bully_age_approx: bully.bully_age_approx || "",

          created_at: new Date(),
        });
      }
    }

    if (Array.isArray(evidence_files)) {
      for (const file of evidence_files) {
        const evidenceRef = db.collection("report_evidence").doc();

        await evidenceRef.set({
          evidence_id: evidenceRef.id,
          report_id: reportRef.id,
          file_url: file.file_url || "",
          file_type: file.file_type || "",
          uploaded_at: new Date(),
        });
      }
    }

    if (assignedAdmin) {
      const notifRef = db.collection("notifications").doc();
      await notifRef.set({
        notification_id: notifRef.id,
        admin_id: reportData.assigned_admin_id,
        school_id,
        source_id: reportRef.id,
        source_type: "report",
        title: "Шинэ Report ирлээ",
        message: `Сурагчаас ${report_type} төрлийн report ирсэн байна`,
        is_read: false,
        ai_score: aiScore,
        created_at: new Date(),
        read_at: null,
      });
    }

    return res.status(201).json({
      success: true,
      message: "Report амжилттай илгээгдлээ.",
      data: serializeReport(reportRef.id, reportData),
    });
  } catch (error) {
    console.error("CREATE REPORT ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Report үүсгэхэд алдаа гарлаа.",
      error: error.message,
    });
  }
};

const getReportsBySchool = async (req, res) => {
  try {
    const { school_id } = req.params;

    const snapshot = await db
      .collection("reports")
      .where("school_id", "==", school_id)
      .get();

    const reports = sortReportsByAiScore(
      snapshot.docs.map((doc) => serializeReport(doc))
    );

    return res.status(200).json({
      success: true,
      count: reports.length,
      data: reports,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Report жагсаалт авахад алдаа гарлаа.",
      error: error.message,
    });
  }
};

const getReportsForAdmin = async (req, res) => {
  try {
    const { admin_id } = req.params;
    const { school_id } = req.query;

    if (!admin_id) {
      return res.status(400).json({
        success: false,
        message: "admin_id шаардлагатай.",
      });
    }

    let snapshot;

    if (school_id) {
      snapshot = await db
        .collection("reports")
        .where("school_id", "==", school_id)
        .get();
    } else {
      snapshot = await db
        .collection("reports")
        .where("assigned_admin_id", "==", admin_id)
        .get();
    }

    const reports = snapshot.docs
      .map((doc) => serializeReport(doc))
      .filter((report) => {
        if (!school_id) {
          return true;
        }

        return !report.assigned_admin_id || report.assigned_admin_id === admin_id;
      });

    return res.status(200).json({
      success: true,
      count: reports.length,
      data: sortReportsByAiScore(reports),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Admin report жагсаалт авахад алдаа гарлаа.",
      error: error.message,
    });
  }
};

const updateReportStatus = async (req, res) => {
  try {
    const { report_id } = req.params;
    const { admin_id, new_status, note } = req.body;

    if (!new_status) {
      return res.status(400).json({
        success: false,
        message: "new_status шаардлагатай.",
      });
    }

    const reportRef = db.collection("reports").doc(report_id);
    const reportDoc = await reportRef.get();

    if (!reportDoc.exists) {
      return res.status(404).json({
        success: false,
        message: "Report олдсонгүй.",
      });
    }

    const reportData = reportDoc.data();
    const oldStatus = reportData.status;

    const updateData = {
      status: new_status,
      updated_at: new Date(),
    };

    if (new_status === REPORT_STATUS.RESOLVED) {
      updateData.resolved_at = new Date();
    }

    await reportRef.update(updateData);

    const actionRef = db.collection("action_logs").doc();

    await actionRef.set({
      action_id: actionRef.id,
      admin_id: admin_id || null,
      target_type: "report",
      target_id: report_id,
      action_type: "status_update",
      old_status: oldStatus,
      new_status,
      note: note || "",
      created_at: new Date(),
    });

    return res.status(200).json({
      success: true,
      message: "Report status шинэчлэгдлээ.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Report status шинэчлэхэд алдаа гарлаа.",
      error: error.message,
    });
  }
};

module.exports = {
  createReport,
  getReportsForAdmin,
  getReportsBySchool,
  updateReportStatus,
};
