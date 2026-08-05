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
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
