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
import AboutUs from './pages/AboutUs';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/ecommerce-erp" element={<EcommerceErp />} />
        <Route path="/manufacturing-erp" element={<ManufacturingErp />} />
        <Route path="/retail-erp" element={<RetailErp />} />
        <Route path="/distribution-erp" element={<DistributionErp />} />
        <Route path="/education-erp" element={<EducationErp />} />
        <Route path="/real-estate-erp" element={<RealEstateErp />} />
        <Route path="/hrms-payroll" element={<HrmsPayroll />} />
        <Route path="/inventory-management" element={<InventoryManagement />} />
        <Route path="/finance-accounting" element={<FinanceAccounting />} />
        <Route path="/project-management" element={<ProjectManagement />} />
        <Route path="/service-management" element={<ServiceManagement />} />
        <Route path="/about" element={<AboutUs />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
