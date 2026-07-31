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
        <h3 className="beyond-paragraph-1">
          Traditional ERP systems give you more software to manage.
        </h3>
        <h4 className="beyond-subtitle">
          <span className="red-highlight">Vellko ERP</span> gives you a better way to understand your business.
        </h4>
        <p className="beyond-paragraph-2">
          By bringing every department, process and data point together into one connected platform, Vellko ERP replaces scattered information with a single, reliable view- helping your team make faster decisions, work with confidence and grow without complexity.
        </p>
      </div>

      {/* 9-Column Desktop Feature Grid with Checkerboard Pattern */}
      <div className="features-offset-grid">
        {/* ROW 1 */}
        <div className="offset-cell">
          <img src={cloudErpIcon} alt="Cloud ERP" className="offset-icon-img" />
        </div>
        <div className="offset-cell">
          <span className="offset-text">Next Generation Cloud ERP</span>
        </div>
        <div className="offset-cell">
          <img src={multiLocationIcon} alt="Multi-Location" className="offset-icon-img" />
        </div>
        <div className="offset-cell">
          <span className="offset-text">Seamless Multi-Location Management</span>
        </div>
        <div className="offset-cell">
          <img src={securityIcon} alt="Security" className="offset-icon-img" />
        </div>
        <div className="offset-cell">
          <span className="offset-text">Enterprise Grade Security Framework</span>
        </div>
        <div className="offset-cell">
          <img src={aiWorkflowIcon} alt="AI Workflow" className="offset-icon-img" />
        </div>
        <div className="offset-cell">
          <span className="offset-text">AI-Powered Workflow Automation</span>
        </div>
        <div className="offset-cell empty"></div>

        {/* ROW 2 */}
        <div className="offset-cell empty"></div>
        <div className="offset-cell">
          <img src={gst} alt="GST Compliance" className="offset-icon-img" />
        </div>
        <div className="offset-cell">
          <span className="offset-text">End-to-End GST Compliance</span>
        </div>
        <div className="offset-cell">
          <img src={businessinte} alt="Live Business Intelligence" className="offset-icon-img" />
        </div>
        <div className="offset-cell">
          <span className="offset-text">Live Business Intelligence</span>
        </div>
        <div className="offset-cell">
          <img src={useraccess} alt="Granular User Access Control" className="offset-icon-img" />
        </div>
        <div className="offset-cell">
          <span className="offset-text">Granular User Access Control</span>
        </div>
        <div className="offset-cell">
          <img src={singleplatform} alt="Single Platform for All Operations" className="offset-icon-img" />
        </div>
        <div className="offset-cell">
          <span className="offset-text">Single Platform for All Operations</span>
        </div>
      </div>

      {/* 2-Column Mobile Features Grid */}
      <div className="features-mobile-grid">
        <div className="mobile-feature-card">
          <img src={cloudErpIcon} alt="Cloud ERP" className="offset-icon-img" />
          <span className="mobile-feature-title">Next Generation Cloud ERP</span>
        </div>
        <div className="mobile-feature-card">
          <img src={multiLocationIcon} alt="Multi-Location" className="offset-icon-img" />
          <span className="mobile-feature-title">Seamless Multi-Location Management</span>
        </div>
        <div className="mobile-feature-card">
          <img src={securityIcon} alt="Security" className="offset-icon-img" />
          <span className="mobile-feature-title">Enterprise Grade Security Framework</span>
        </div>
        <div className="mobile-feature-card">
          <img src={aiWorkflowIcon} alt="AI Workflow" className="offset-icon-img" />
          <span className="mobile-feature-title">AI-Powered Workflow Automation</span>
        </div>
        <div className="mobile-feature-card">
          <img src={gst} alt="GST Compliance" className="offset-icon-img" />
          <span className="mobile-feature-title">End-to-End GST Compliance</span>
        </div>
        <div className="mobile-feature-card">
          <img src={businessinte} alt="Live Business Intelligence" className="offset-icon-img" />
          <span className="mobile-feature-title">Live Business Intelligence</span>
        </div>
        <div className="mobile-feature-card">
          <img src={useraccess} alt="Granular User Access Control" className="offset-icon-img" />
          <span className="mobile-feature-title">Granular User Access Control</span>
        </div>
        <div className="mobile-feature-card">
          <img src={singleplatform} alt="Single Platform for All Operations" className="offset-icon-img" />
          <span className="mobile-feature-title">Single Platform for All Operations</span>
        </div>
      </div>
    </section>
  );
}
