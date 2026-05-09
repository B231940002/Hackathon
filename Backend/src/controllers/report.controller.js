const { db } = require("../config/firebase");
const { REPORT_STATUS } = require("../utils/status");

const createReport = async (req, res) => {
  try {
    const {
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

    if (!student_id || !report_type || !description) {
      return res.status(400).json({
        message: "student_id, report_type, description шаардлагатай.",
      });
    }

    const studentDoc = await db.collection("students").doc(student_id).get();

    if (!studentDoc.exists) {
      return res.status(404).json({
        message: "Сурагч олдсонгүй.",
      });
    }

    const studentData = studentDoc.data();

    if (!studentData.is_verified) {
      return res.status(403).json({
        message: "Баталгаажаагүй сурагч report илгээх боломжгүй.",
      });
    }

    const reportRef = db.collection("reports").doc();

    const reportData = {
      report_id: reportRef.id,
      school_id: studentData.school_id,
      student_id,
      assigned_admin_id: null,
      is_anonymous: is_anonymous || false,
      report_type,
      reporter_role: reporter_role || "witness",
      location_text: location_text || "",
      latitude: latitude || null,
      longitude: longitude || null,
      knows_bully: knows_bully || false,
      description,
      status: REPORT_STATUS.PENDING,
      created_at: new Date(),
      resolved_at: null,
    };

    await reportRef.set(reportData);

    if (Array.isArray(bullies)) {
      for (const bully of bullies) {
        const bullyRef = db.collection("report_bullies").doc();

        await bullyRef.set({
          report_bully_id: bullyRef.id,
          report_id: reportRef.id,
          is_known: bully.is_known || false,
          bully_name: bully.bully_name || "",
          bully_grade: bully.bully_grade || null,
          bully_group: bully.bully_group || "",
          bully_description: bully.bully_description || "",
          bully_gender: bully.bully_gender || "",
          bully_age_approx: bully.bully_age_approx || "",
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

    res.status(201).json({
      message: "Report амжилттай илгээгдлээ.",
      data: reportData,
    });
  } catch (error) {
    res.status(500).json({
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
      .orderBy("created_at", "desc")
      .get();

    const reports = snapshot.docs.map((doc) => doc.data());

    res.status(200).json({
      data: reports,
    });
  } catch (error) {
    res.status(500).json({
      message: "Report жагсаалт авахад алдаа гарлаа.",
      error: error.message,
    });
  }
};

const updateReportStatus = async (req, res) => {
  try {
    const { report_id } = req.params;
    const { admin_id, new_status, note } = req.body;

    const reportRef = db.collection("reports").doc(report_id);
    const reportDoc = await reportRef.get();

    if (!reportDoc.exists) {
      return res.status(404).json({
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
      admin_id,
      target_type: "report",
      target_id: report_id,
      action_type: "status_update",
      old_status: oldStatus,
      new_status,
      note: note || "",
      created_at: new Date(),
    });

    res.status(200).json({
      message: "Report status шинэчлэгдлээ.",
    });
  } catch (error) {
    res.status(500).json({
      message: "Report status шинэчлэхэд алдаа гарлаа.",
      error: error.message,
    });
  }
};

module.exports = {
  createReport,
  getReportsBySchool,
  updateReportStatus,
};