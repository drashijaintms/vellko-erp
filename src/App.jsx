import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/crm-lead-management" element={<CrmLeadManagement />} />
        <Route path="/ecommerce-erp" element={<EcommerceErp />} />
        <Route path="/manufacturing-erp" element={<ManufacturingErp />} />
        <Route path="/retail-erp" element={<RetailErp />} />
        <Route path="/distribution-erp" element={<DistributionErp />} />
        <Route path="/education-erp" element={<EducationErp />} />
        <Route path="/real-estate-erp" element={<RealEstateErp />} />
        <Route path="/hrms-payroll" element={<HrmsPayroll />} />
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
      <Footer />
    </Router>
  );
}

export default App;
