const { db } = require("../config/firebase");
const { SOS_STATUS } = require("../utils/status");

const createSOS = async (req, res) => {
  try {
    const {
      student_id,
      latitude,
      longitude,
      location_text,
    } = req.body;

    if (!student_id || latitude === undefined || longitude === undefined) {
      return res.status(400).json({
        message: "student_id, latitude, longitude шаардлагатай.",
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
        message: "Баталгаажаагүй сурагч SOS илгээх боломжгүй.",
      });
    }

    const sosRef = db.collection("sos_alerts").doc();

    const sosData = {
      sos_id: sosRef.id,
      school_id: studentData.school_id,
      student_id,
      latitude,
      longitude,
      location_text: location_text || "",
      status: SOS_STATUS.ACTIVE,
      created_at: new Date(),
      acknowledged_at: null,
      resolved_at: null,
    };

    await sosRef.set(sosData);

    res.status(201).json({
      message: "SOS амжилттай үүслээ.",
      data: sosData,
    });
  } catch (error) {
    res.status(500).json({
      message: "SOS үүсгэхэд алдаа гарлаа.",
      error: error.message,
    });
  }
};

const getSOSBySchool = async (req, res) => {
  try {
    const { school_id } = req.params;

    const snapshot = await db
      .collection("sos_alerts")
      .where("school_id", "==", school_id)
      .orderBy("created_at", "desc")
      .get();

    const sosList = snapshot.docs.map((doc) => doc.data());

    res.status(200).json({
      data: sosList,
    });
  } catch (error) {
    res.status(500).json({
      message: "SOS жагсаалт авахад алдаа гарлаа.",
      error: error.message,
    });
  }
};

const updateSOSStatus = async (req, res) => {
  try {
    const { sos_id } = req.params;
    const { admin_id, new_status, note } = req.body;

    const sosRef = db.collection("sos_alerts").doc(sos_id);
    const sosDoc = await sosRef.get();

    if (!sosDoc.exists) {
      return res.status(404).json({
        message: "SOS олдсонгүй.",
      });
    }

    const sosData = sosDoc.data();
    const oldStatus = sosData.status;

    const updateData = {
      status: new_status,
    };

    if (new_status === SOS_STATUS.ACKNOWLEDGED) {
      updateData.acknowledged_at = new Date();
    }

    if (new_status === SOS_STATUS.RESOLVED) {
      updateData.resolved_at = new Date();
    }

    await sosRef.update(updateData);

    const actionRef = db.collection("action_logs").doc();

    await actionRef.set({
      action_id: actionRef.id,
      admin_id,
      target_type: "sos",
      target_id: sos_id,
      action_type: "status_update",
      old_status: oldStatus,
      new_status,
      note: note || "",
      created_at: new Date(),
    });

    res.status(200).json({
      message: "SOS status шинэчлэгдлээ.",
    });
  } catch (error) {
    res.status(500).json({
      message: "SOS status шинэчлэхэд алдаа гарлаа.",
      error: error.message,
    });
  }
};

module.exports = {
  createSOS,
  getSOSBySchool,
  updateSOSStatus,
};