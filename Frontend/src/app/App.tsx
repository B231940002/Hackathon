import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import Home from './pages/Home';
import ReportForm from './pages/ReportForm1';
import SafetyHeatmap from './pages/SafetyHeatmap';
import SOSInfo from './pages/SOSInfo';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import AdminComplaints from './pages/AdminComplaints';
import AdminSOSMap from './pages/AdminSOSMap';
import AdminComplaintDetail from './pages/AdminComplaintDetail';
import AdminContactRequest from './pages/AdminContactRequest';
import AdminComplaintHistory from './pages/AdminComplaintHistory';
import AdminSchool from './pages/AdminSchool';
import BreathingExercise from './pages/deepBreathe';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-[#F0F9FF] via-[#F8FAFC] to-[#EFF6FF]">
        <AppContent />
      </div>
    </BrowserRouter>
  );
}

function AppContent() {
  const [showSOSModal, setShowSOSModal] = useState(false);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home onSOSClick={() => setShowSOSModal(true)} />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

        <Route path="/report" element={<ReportForm />} />
        <Route path="/heatmap" element={<SafetyHeatmap />} />
        <Route path="/breathe" element={<BreathingExercise />} />

        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/complaints" element={<AdminComplaints />} />
        <Route path="/admin/sos-map" element={<AdminSOSMap />} />
        <Route path="/admin/complaint-detail" element={<AdminComplaintDetail />} />
        <Route path="/admin/history" element={<AdminComplaintHistory />} />
        <Route path="/admin/contact-request" element={<AdminContactRequest />} />
        <Route path="/admin/school" element={<AdminSchool />} />
        <Route path="/sos-info" 
        element={<SOSInfo onSOSClick={() => setShowSOSModal(true)} />}
/>
      </Routes>

      
    </>
  );
}
