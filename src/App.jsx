import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Welcome from './pages/Welcome';
import EcommerceErp from './pages/EcommerceErp';
import ManufacturingErp from './pages/ManufacturingErp';
import RetailErp from './pages/RetailErp';
import DistributionErp from './pages/DistributionErp';
import EducationErp from './pages/EducationErp';
import RealEstateErp from './pages/RealEstateErp';
import HrmsPayroll from './pages/HrmsPayroll';
import InventoryManagement from './pages/InventoryManagement';
import FinanceAccounting from './pages/FinanceAccounting';
import ProjectManagement from './pages/ProjectManagement';
import ServiceManagement from './pages/ServiceManagement';
import ServiceBusinessErp from './pages/ServiceBusinessErp';
import HealthcareErp from './pages/HealthcareErp';
import BiometricAttendance from './pages/BiometricAttendance';
import CrmLeadManagement from './pages/CrmLeadManagement';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import Pricing from './pages/Pricing';
import TermsAndConditions from './pages/TermsAndConditions';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Blog from './pages/Blog';
import BlogAdmin from './pages/BlogAdmin';
import ScrollToTop from './components/common/ScrollToTop';
import HeadManager from './components/common/HeadManager';
import Footer from './components/Footer';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error('Application Render Error:', error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '40px', textAlign: 'center', fontFamily: 'sans-serif' }}>
          <h2 style={{ color: '#DC1436' }}>Something went wrong loading this view.</h2>
          <p style={{ color: '#666' }}>{this.state.error?.message || 'Unknown error'}</p>
          <button 
            onClick={() => { sessionStorage.clear(); window.location.reload(); }}
            style={{ padding: '10px 20px', background: '#DC1436', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', marginTop: '16px' }}
          >
            Reload Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/blog/admin');

  return (
    <ErrorBoundary>
      <HeadManager />
      {!isAdminRoute && <Header />}
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/blog/admin" element={<BlogAdmin />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<Blog />} />
        <Route path="/crm-lead-management" element={<CrmLeadManagement />} />
        <Route path="/ecommerce-erp" element={<EcommerceErp />} />
        <Route path="/manufacturing-erp" element={<ManufacturingErp />} />
        <Route path="/retail-erp" element={<RetailErp />} />
        <Route path="/distribution-erp" element={<DistributionErp />} />
        <Route path="/education-erp" element={<EducationErp />} />
        <Route path="/real-estate-erp" element={<RealEstateErp />} />
        <Route path="/hrms-payroll" element={<HrmsPayroll />} />
        <Route path="/biometric-attendance-management" element={<BiometricAttendance />} />
        <Route path="/biometric-attendance" element={<BiometricAttendance />} />
        <Route path="/inventory-management" element={<InventoryManagement />} />
        <Route path="/finance-accounting" element={<FinanceAccounting />} />
        <Route path="/project-management" element={<ProjectManagement />} />
        <Route path="/service-management" element={<ServiceManagement />} />
        <Route path="/service-business-erp" element={<ServiceBusinessErp />} />
        <Route path="/healthcare-erp" element={<HealthcareErp />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      </Routes>
      {!isAdminRoute && <Footer />}
    </ErrorBoundary>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppContent />
    </Router>
  );
}

export default App;
