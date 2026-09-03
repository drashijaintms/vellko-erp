import { Link } from 'react-router-dom';
import cloudErpIcon from '../../assets/icons/cloud-erp.png';
import multiLocationIcon from '../../assets/icons/multi-location.png';
import securityIcon from '../../assets/icons/security.png';
import aiWorkflowIcon from '../../assets/icons/ai-workflow.png';
import singleplatform from '../../assets/icons/single-platform.png';
import useraccess from '../../assets/icons/user-access-control.png';
import businessinte from '../../assets/icons/business-intelligence.png';
import gst from '../../assets/icons/gst.png';

export default function BeyondSection() {
  return (
    <section className="beyond-section">
      <div className="beyond-text-block">
        <h2 className="beyond-title">
          Move Beyond Traditional <span className="red-highlight">ERP</span>
        </h2>
        
        <div className="beyond-compare-row">
          <div className="beyond-compare-col left">
            <span className="red-highlight">Traditional ERP</span> systems give you<br />more software to manage.
          </div>
          <div className="beyond-compare-divider"></div>
          <div className="beyond-compare-col right">
            <span className="red-highlight">Vellko ERP</span> gives you a better way<br />to understand your business.
          </div>
        </div>

        <p className="beyond-paragraph-2">
          By bringing every department, process and data point together into one connected platform, Vellko ERP replaces scattered information with a single, reliable view- helping your team make faster decisions, work with confidence and grow without complexity.
        </p>
      </div>

      {/* 4x2 Responsive Feature Grid */}
      <div className="beyond-features-grid">
        <div className="beyond-feature-card">
          <img src={cloudErpIcon} alt="Cloud ERP" className="beyond-feature-icon" />
          <span className="beyond-feature-title">Next Generation<br />Cloud ERP</span>
        </div>
        <Link to="/finance-accounting" className="beyond-feature-card" style={{ textDecoration: 'none', color: 'inherit' }}>
          <img src={gst} alt="GST-compliant invoicing screen in Vellko ERP" className="beyond-feature-icon" />
          <span className="beyond-feature-title">End-to-End GST<br />Compliance</span>
        </Link>
        <Link to="/inventory-management" className="beyond-feature-card" style={{ textDecoration: 'none', color: 'inherit' }}>
          <img src={multiLocationIcon} alt="Multi-Location" className="beyond-feature-icon" />
          <span className="beyond-feature-title">Seamless Multi-Location<br />Management</span>
        </Link>
        <div className="beyond-feature-card">
          <img src={aiWorkflowIcon} alt="AI Workflow" className="beyond-feature-icon" />
          <span className="beyond-feature-title">AI-Powered Workflow<br />Automation</span>
        </div>

        <div className="beyond-feature-card">
          <img src={businessinte} alt="Live Business Intelligence" className="beyond-feature-icon" />
          <span className="beyond-feature-title">Live Business<br />Intelligence</span>
        </div>
        <div className="beyond-feature-card">
          <img src={securityIcon} alt="Security" className="beyond-feature-icon" />
          <span className="beyond-feature-title">Enterprise Grade<br />Security Framework</span>
        </div>
        <div className="beyond-feature-card">
          <img src={useraccess} alt="Granular User Access Control" className="beyond-feature-icon" />
          <span className="beyond-feature-title">Granular User<br />Access Control</span>
        </div>
        <div className="beyond-feature-card">
          <img src={singleplatform} alt="Single Platform for All Operations" className="beyond-feature-icon" />
          <span className="beyond-feature-title">Single Platform for<br />All Operations</span>
        </div>
      </div>
    </section>
  );
}
