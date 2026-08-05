import supportHandshake from '../../assets/icons/support-handshake.png';
import supportCog from '../../assets/icons/support-cog.png';
import supportUsers from '../../assets/icons/support-users.png';
import supportWrench from '../../assets/icons/support-wrench.png';
import supportTrendingUp from '../../assets/icons/support-trending-up.png';
import supportExperts from '../../assets/icons/support-dedicated-experts.png';

const defaultIcons = [
  supportHandshake,
  supportCog,
  supportUsers,
  supportWrench,
  supportTrendingUp,
  supportExperts
];

export default function IndustrySupportSection({ title, highlight, sub1, sub2, supportSteps, customClass }) {
  if (!supportSteps || supportSteps.length === 0) return null;

  return (
    <section className={`support-section ${customClass || ''}`}>
      <div className="support-container">
        <h2 className="support-title">
          {title} {highlight && <span className="red-highlight">{highlight}</span>}
        </h2>
        
        {sub1 && (
          <p className="support-p1">
            {sub1}
          </p>
        )}
        
        {sub2 && (
          <p className="support-p2">
            {sub2}
          </p>
        )}

        <div className="support-timeline-wrapper">
          {supportSteps.map((stepText, idx) => {
            const isOdd = idx % 2 === 0;
            const IconSrc = defaultIcons[idx % defaultIcons.length];
            return (
              <div key={idx} className="timeline-step-row active">
                {isOdd ? (
                  <>
                    <div className="timeline-col left-align">
                      <div className="timeline-icon-box active">
                        <img src={IconSrc} alt="Support Icon" className="support-png-icon" />
                      </div>
                    </div>
                    <div className="timeline-center-node">
                      <div className="timeline-marker-square"></div>
                    </div>
                    <div className="timeline-col right-align">
                      <span className="timeline-label-text active">
                        {stepText}
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="timeline-col left-align">
                      <span className="timeline-label-text active">
                        {stepText}
                      </span>
                    </div>
                    <div className="timeline-center-node">
                      <div className="timeline-marker-square"></div>
                    </div>
                    <div className="timeline-col right-align">
                      <div className="timeline-icon-box active">
                        <img src={IconSrc} alt="Support Icon" className="support-png-icon" />
                      </div>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
