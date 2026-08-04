import supportHandshake from '../../assets/icons/support-handshake.png';
import supportCog from '../../assets/icons/support-cog.png';
import supportUsers from '../../assets/icons/support-users.png';
import supportWrench from '../../assets/icons/support-wrench.png';
import supportTrendingUp from '../../assets/icons/support-trending-up.png';
import supportExperts from '../../assets/icons/support-dedicated-experts.png';

export default function SupportSection() {
  const activeSupportStep = 6; // Keep all steps fully visible and active statically

  return (
    <section className="support-section">
      <div className="support-container">
        <h2 className="support-title">
          Dedicated Support at <span className="red-highlight">Every Step</span>
        </h2>
        
        <p className="support-p1">
          Implementing an ERP system is a journey and we're with you every step of the way.
        </p>
        
        <p className="support-p2">
          From initial consultation and onboarding to training, customization and ongoing support, our dedicated experts ensure a smooth transition and long-term success.
        </p>

        <div className="support-timeline-wrapper">
          
          {/* Step 1 (Odd) */}
          <div className="timeline-step-row active">
            <div className="timeline-col left-align">
              <div className="timeline-icon-box active">
                <img src={supportHandshake} alt="Handshake" className="support-png-icon" />
              </div>
            </div>
            <div className="timeline-center-node">
              <div className="timeline-marker-square"></div>
            </div>
            <div className="timeline-col right-align">
              <span className="timeline-label-text active">
                Faster onboarding with expert guidance
              </span>
            </div>
          </div>

          {/* Step 2 (Even) */}
          <div className="timeline-step-row active">
            <div className="timeline-col left-align">
              <span className="timeline-label-text active">
                Hassle-free implementation and migration
              </span>
            </div>
            <div className="timeline-center-node">
              <div className="timeline-marker-square"></div>
            </div>
            <div className="timeline-col right-align">
              <div className="timeline-icon-box active">
                <img src={supportCog} alt="Cog" className="support-png-icon" />
              </div>
            </div>
          </div>

          {/* Step 3 (Odd) */}
          <div className="timeline-step-row active">
            <div className="timeline-col left-align">
              <div className="timeline-icon-box active">
                <img src={supportUsers} alt="Users" className="support-png-icon" />
              </div>
            </div>
            <div className="timeline-center-node">
              <div className="timeline-marker-square"></div>
            </div>
            <div className="timeline-col right-align">
              <span className="timeline-label-text active">
                Quick user adoption through hands-on training
              </span>
            </div>
          </div>

          {/* Step 4 (Even) */}
          <div className="timeline-step-row active">
            <div className="timeline-col left-align">
              <span className="timeline-label-text active">
                Reliable support when you need it most
              </span>
            </div>
            <div className="timeline-center-node">
              <div className="timeline-marker-square"></div>
            </div>
            <div className="timeline-col right-align">
              <div className="timeline-icon-box active">
                <img src={supportWrench} alt="Wrench" className="support-png-icon" />
              </div>
            </div>
          </div>

          {/* Step 5 (Odd) */}
          <div className="timeline-step-row active">
            <div className="timeline-col left-align">
              <div className="timeline-icon-box active">
                <img src={supportTrendingUp} alt="Trending Up" className="support-png-icon" />
              </div>
            </div>
            <div className="timeline-center-node">
              <div className="timeline-marker-square"></div>
            </div>
            <div className="timeline-col right-align">
              <span className="timeline-label-text active">
                Continuous improvements as you grow
              </span>
            </div>
          </div>

          {/* Step 6 (Even) */}
          <div className="timeline-step-row active">
            <div className="timeline-col left-align">
              <span className="timeline-label-text active">
                Dedicated experts invested in your success
              </span>
            </div>
            <div className="timeline-center-node">
              <div className="timeline-marker-square"></div>
            </div>
            <div className="timeline-col right-align">
              <div className="timeline-icon-box active">
                <img src={supportExperts} alt="Users" className="support-png-icon" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
