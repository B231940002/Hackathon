const express = require("express");
const cors = require("cors");
require("dotenv").config();

const schoolRoutes = require("./routes/school.routes");
const adminRoutes = require("./routes/admin.routes");
const studentRoutes = require("./routes/student.routes");
const reportRoutes = require("./routes/report.routes");
const sosRoutes = require("./routes/sos.routes");
const notificationRoutes = require("./routes/notification.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("SafeSchool AI Backend is running...");
});

app.use("/api/schools", schoolRoutes);
app.use("/api/admins", adminRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/sos", sosRoutes);
app.use("/api/notifications", notificationRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});