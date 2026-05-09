const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { db } = require("./src/config/Firebase");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "SafeSchool AI Backend is running",
  });
});

app.get("/api/test-firebase", async (req, res) => {
  try {
    const testRef = await db.collection("test").add({
      message: "Firebase connected successfully",
      createdAt: new Date(),
    });

    res.json({
      success: true,
      id: testRef.id,
      message: "Firebase холболт амжилттай",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});