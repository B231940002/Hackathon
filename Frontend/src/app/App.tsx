import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';

import Home from './Student_pages/Home';
import ReportForm from './Student_pages/ReportForm1';
import SOSInfo from './Student_pages/SOSInfo';
import Login from './Student_pages/Login';
import Register from './Student_pages/Register';

import AdminDashboard from './Admin_pages/AdminDashboard';
import AdminComplaints from './Admin_pages/AdminComplaints';
import AdminSOSMap from './Admin_pages/AdminSOSMap';
import AdminComplaintDetail from './Admin_pages/AdminComplaintDetail';
import AdminContactRequest from './Admin_pages/AdminContactRequest';
import AdminComplaintHistory from './Admin_pages/AdminComplaintHistory';
import AdminSchool from './Admin_pages/AdminSchool';
import AdminUserRequests from './Admin_pages/AdminUserRequests';

import SOSConfirmModal from './components/SOSConfirmModal';
import DeepBreathe from './Student_pages/deepBreathe';
import Notification from './Student_pages/notification';

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
        {/* Login-оос эхэлнэ */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* User pages */}
        <Route path="/home" element={<Home />} />
        <Route path="/report" element={<ReportForm />} />
        <Route
          path="/sos-info"
          element={<SOSInfo onSOSClick={() => setShowSOSModal(true)} />}
        />

        {/* Admin pages */}
        <Route path="/breathe" element={<DeepBreathe />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/complaints" element={<AdminComplaints />} />
        <Route path="/admin/sos-map" element={<AdminSOSMap />} />
        <Route path="/admin/complaint-detail" element={<AdminComplaintDetail />} />
        <Route path="/admin/history" element={<AdminComplaintHistory />} />
        <Route path="/admin/contact-request" element={<AdminContactRequest />} />
        <Route path="/admin/school" element={<AdminSchool />} />
        <Route path="/admin/user-requests" element={<AdminUserRequests />} />
      </Routes>

      {showSOSModal && (
        <SOSConfirmModal onClose={() => setShowSOSModal(false)} />
      )}
    </>
  );
}