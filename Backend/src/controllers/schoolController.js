const {
  createSchoolService,
  getAllSchoolsService,
  getSchoolByIdService,
  updateSchoolService,
  deleteSchoolService,
} = require("../services/schoolService");

const createSchool = async (req, res) => {
  try {
    const school = await createSchoolService(req.body);

    return res.status(201).json({
      success: true,
      message: "School created successfully",
      data: school,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getAllSchools = async (req, res) => {
  try {
    const schools = await getAllSchoolsService();

    return res.status(200).json({
      success: true,
      count: schools.length,
      data: schools,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getSchoolById = async (req, res) => {
  try {
    const school = await getSchoolByIdService(req.params.schoolId);

    return res.status(200).json({
      success: true,
      data: school,
    });
  } catch (error) {
    return res.status(404).json({ success: false, message: error.message });
  }
};

const updateSchool = async (req, res) => {
  try {
    const school = await updateSchoolService(req.params.schoolId, req.body);

    return res.status(200).json({
      success: true,
      message: "School updated successfully",
      data: school,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const deleteSchool = async (req, res) => {
  try {
    await deleteSchoolService(req.params.schoolId);

    return res.status(200).json({
      success: true,
      message: "School deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createSchool,
  getAllSchools,
  getSchoolById,
  updateSchool,
  deleteSchool,
};