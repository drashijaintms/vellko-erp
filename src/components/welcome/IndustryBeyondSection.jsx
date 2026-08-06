import cloudErpIcon from '../../assets/icons/cloud-erp.png';
import gst from '../../assets/icons/gst.png';
import multiLocationIcon from '../../assets/icons/multi-location.png';
import aiWorkflowIcon from '../../assets/icons/ai-workflow.png';
import businessinte from '../../assets/icons/business-intelligence.png';
import securityIcon from '../../assets/icons/security.png';
import useraccess from '../../assets/icons/user-access-control.png';
import singleplatform from '../../assets/icons/single-platform.png';

const defaultIcons = [
  cloudErpIcon,
  gst,
  multiLocationIcon,
  aiWorkflowIcon,
  businessinte,
  securityIcon,
  useraccess,
  singleplatform
];

export default function IndustryBeyondSection({ title, highlight, subCol1, subCol2, desc, features, customClass }) {
  const hasFeatures = features && features.length > 0;

  return (
    <section className={customClass || 'beyond-section'}>
      <div className={`beyond-text-block ${!hasFeatures ? 'no-features' : ''}`}>
        <h2 className="beyond-title">
          {title} {highlight && <span className="red-highlight">{highlight}</span>}
        </h2>

        <div className="beyond-desc-paras">
          {(subCol1 || subCol2) && (
            <p className="beyond-desc-para">
              {subCol1}{subCol1 && subCol2 && ' '}{subCol2}
            </p>
          )}
        </div>

        {desc && (
          <p className={`beyond-paragraph-2 ${!hasFeatures ? 'no-features' : ''}`}>
            {desc}
          </p>
        )}
      </div>

      {/* 4x2 Responsive Feature Grid - rendered conditionally */}
      {hasFeatures && (
        <div className="beyond-features-grid">
          {features.map((feat, idx) => {
            const titleText = typeof feat === 'string' ? feat : feat.title;
            const iconSrc = typeof feat === 'object' && feat.icon ? feat.icon : defaultIcons[idx % defaultIcons.length];
            return (
              <div key={idx} className="beyond-feature-card">
                <img src={iconSrc} alt={titleText} className="beyond-feature-icon" />
                <span className="beyond-feature-title">{titleText}</span>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
