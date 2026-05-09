import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import Home from './pages/Home';
import ReportForm from './pages/ReportForm1';
import SafetyHeatmap from './pages/SafetyHeatmap';
import AdminDashboard from './pages/AdminDashboard';
import SOSInfo from './pages/SOSInfo';
import Login from './pages/Login';
import Register from './pages/Register';

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
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/sos-info" 
        element={<SOSInfo onSOSClick={() => setShowSOSModal(true)} />}
/>
      </Routes>

      
    </>
  );
}
