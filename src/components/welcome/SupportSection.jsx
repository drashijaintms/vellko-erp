import { useState, useEffect, useRef } from 'react';
import supportHandshake from '../../assets/icons/support-handshake.png';
import supportCog from '../../assets/icons/support-cog.png';
import supportUsers from '../../assets/icons/support-users.png';
import supportWrench from '../../assets/icons/support-wrench.png';
import supportTrendingUp from '../../assets/icons/support-trending-up.png';
import supportExperts from '../../assets/icons/support-dedicated-experts.png';

export default function SupportSection() {
  const [activeSupportStep, setActiveSupportStep] = useState(-1);
  const supportSectionRef = useRef(null);

  useEffect(() => {
    const section = supportSectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActiveSupportStep(0);
        } else {
          setActiveSupportStep(-1);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (activeSupportStep >= 0 && activeSupportStep < 5) {
      const timer = setTimeout(() => {
        setActiveSupportStep((prev) => prev + 1);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [activeSupportStep]);

  return (
    <section className="support-section" ref={supportSectionRef}>
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
          <div className={`timeline-step-row ${activeSupportStep >= 0 ? 'active' : ''}`}>
            <div className="timeline-col left-align">
              <div className={`timeline-icon-box ${activeSupportStep >= 0 ? 'active' : ''}`}>
                <img src={supportHandshake} alt="Handshake" className="support-png-icon" />
              </div>
            </div>
            <div className="timeline-center-node">
              <div className={`timeline-marker-square ${activeSupportStep >= 0 ? 'active' : ''}`}></div>
            </div>
            <div className="timeline-col right-align">
              <span className={`timeline-label-text ${activeSupportStep >= 0 ? 'active' : ''}`}>
                {activeSupportStep >= 0 ? "Faster onboarding with expert guidance" : ""}
              </span>
            </div>
          </div>

          {/* Step 2 (Even) */}
          <div className={`timeline-step-row ${activeSupportStep >= 1 ? 'active' : ''}`}>
            <div className="timeline-col left-align">
              <span className={`timeline-label-text ${activeSupportStep >= 1 ? 'active' : ''}`}>
                {activeSupportStep >= 1 ? "Hassle-free implementation and migration" : ""}
              </span>
            </div>
            <div className="timeline-center-node">
              <div className={`timeline-marker-square ${activeSupportStep >= 1 ? 'active' : ''}`}></div>
            </div>
            <div className="timeline-col right-align">
              <div className={`timeline-icon-box ${activeSupportStep >= 1 ? 'active' : ''}`}>
                <img src={supportCog} alt="Cog" className="support-png-icon" />
              </div>
            </div>
          </div>

          {/* Step 3 (Odd) */}
          <div className={`timeline-step-row ${activeSupportStep >= 2 ? 'active' : ''}`}>
            <div className="timeline-col left-align">
              <div className={`timeline-icon-box ${activeSupportStep >= 2 ? 'active' : ''}`}>
                <img src={supportUsers} alt="Users" className="support-png-icon" />
              </div>
            </div>
            <div className="timeline-center-node">
              <div className={`timeline-marker-square ${activeSupportStep >= 2 ? 'active' : ''}`}></div>
            </div>
            <div className="timeline-col right-align">
              <span className={`timeline-label-text ${activeSupportStep >= 2 ? 'active' : ''}`}>
                {activeSupportStep >= 2 ? "Quick user adoption through hands-on training" : ""}
              </span>
            </div>
          </div>

          {/* Step 4 (Even) */}
          <div className={`timeline-step-row ${activeSupportStep >= 3 ? 'active' : ''}`}>
            <div className="timeline-col left-align">
              <span className={`timeline-label-text ${activeSupportStep >= 3 ? 'active' : ''}`}>
                {activeSupportStep >= 3 ? "Reliable support when you need it most" : ""}
              </span>
            </div>
            <div className="timeline-center-node">
              <div className={`timeline-marker-square ${activeSupportStep >= 3 ? 'active' : ''}`}></div>
            </div>
            <div className="timeline-col right-align">
              <div className={`timeline-icon-box ${activeSupportStep >= 3 ? 'active' : ''}`}>
                <img src={supportWrench} alt="Wrench" className="support-png-icon" />
              </div>
            </div>
          </div>

          {/* Step 5 (Odd) */}
          <div className={`timeline-step-row ${activeSupportStep >= 4 ? 'active' : ''}`}>
            <div className="timeline-col left-align">
              <div className={`timeline-icon-box ${activeSupportStep >= 4 ? 'active' : ''}`}>
                <img src={supportTrendingUp} alt="Trending Up" className="support-png-icon" />
              </div>
            </div>
            <div className="timeline-center-node">
              <div className={`timeline-marker-square ${activeSupportStep >= 4 ? 'active' : ''}`}></div>
            </div>
            <div className="timeline-col right-align">
              <span className={`timeline-label-text ${activeSupportStep >= 4 ? 'active' : ''}`}>
                {activeSupportStep >= 4 ? "Continuous improvements as you grow" : ""}
              </span>
            </div>
          </div>

          {/* Step 6 (Even) */}
          <div className={`timeline-step-row ${activeSupportStep >= 5 ? 'active' : ''}`}>
            <div className="timeline-col left-align">
              <span className={`timeline-label-text ${activeSupportStep >= 5 ? 'active' : ''}`}>
                {activeSupportStep >= 5 ? "Dedicated experts invested in your success" : ""}
              </span>
            </div>
            <div className="timeline-center-node">
              <div className={`timeline-marker-square ${activeSupportStep >= 5 ? 'active' : ''}`}></div>
            </div>
            <div className="timeline-col right-align">
              <div className={`timeline-icon-box ${activeSupportStep >= 5 ? 'active' : ''}`}>
                <img src={supportExperts} alt="Users" className="support-png-icon" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
