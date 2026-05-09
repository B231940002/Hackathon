import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import Home from './components/Home';
import ReportForm from './components/ReportForm1';
import SafetyHeatmap from './components/SafetyHeatmap';
import AdminDashboard from './components/AdminDashboard';
import SOSConfirmModal from './components/SOSConfirmModal';

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
        <Route path="/report" element={<ReportForm />} />
        <Route path="/heatmap" element={<SafetyHeatmap />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>

      {showSOSModal && (
        <SOSConfirmModal onClose={() => setShowSOSModal(false)} />
      )}
    </>
  );
}
