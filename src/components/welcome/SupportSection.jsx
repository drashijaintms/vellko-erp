import { useState, useEffect, useRef } from 'react';
import supportHandshake from '../../assets/icons/support-handshake.png';
import supportCog from '../../assets/icons/support-cog.png';
import supportUsers from '../../assets/icons/support-users.png';
import supportWrench from '../../assets/icons/support-wrench.png';
import supportTrendingUp from '../../assets/icons/support-trending-up.png';
import supportExperts from '../../assets/icons/support-dedicated-experts.png';

function TypewriterText({ text, active, onComplete }) {
  const [index, setIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(false);

  useEffect(() => {
    if (!active) {
      setIndex(0);
      setShowCursor(false);
      return;
    }

    setShowCursor(true);
    setIndex(1); // Start with first character immediately

    const interval = setInterval(() => {
      setIndex((prev) => {
        if (prev >= text.length) {
          clearInterval(interval);
          setShowCursor(false);
          if (onComplete) onComplete();
          return prev;
        }
        return prev + 1;
      });
    }, 35);

    return () => clearInterval(interval);
  }, [active, text]);

  if (!active) {
    return <span style={{ visibility: 'hidden' }}>{text}</span>;
  }

  const typedText = text.substring(0, index);
  const remainingText = text.substring(index);

  return (
    <span className="typewriter-container">
      <span className="typewriter-typed">
        {typedText}
        {showCursor && <span className="typewriter-cursor">|</span>}
      </span>
      <span className="typewriter-remaining" style={{ visibility: 'hidden' }}>
        {remainingText}
      </span>
    </span>
  );
}

export default function SupportSection() {
  const [activeSupportStep, setActiveSupportStep] = useState(-1);
  const supportSectionRef = useRef(null);

  const handleStepComplete = (stepIdx) => {
    if (stepIdx === activeSupportStep) {
      setTimeout(() => {
        setActiveSupportStep((prev) => {
          if (prev === stepIdx && prev < 6) {
            return prev + 1;
          }
          return prev;
        });
      }, 600);
    }
  };

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
                {activeSupportStep > 0 ? (
                  "Faster onboarding with expert guidance"
                ) : activeSupportStep === 0 ? (
                  <TypewriterText text="Faster onboarding with expert guidance" active={true} onComplete={() => handleStepComplete(0)} />
                ) : (
                  ""
                )}
              </span>
            </div>
          </div>

          {/* Step 2 (Even) */}
          <div className={`timeline-step-row ${activeSupportStep >= 1 ? 'active' : ''}`}>
            <div className="timeline-col left-align">
              <span className={`timeline-label-text ${activeSupportStep >= 1 ? 'active' : ''}`}>
                {activeSupportStep > 1 ? (
                  "Hassle-free implementation and migration"
                ) : activeSupportStep === 1 ? (
                  <TypewriterText text="Hassle-free implementation and migration" active={true} onComplete={() => handleStepComplete(1)} />
                ) : (
                  ""
                )}
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
                {activeSupportStep > 2 ? (
                  "Quick user adoption through hands-on training"
                ) : activeSupportStep === 2 ? (
                  <TypewriterText text="Quick user adoption through hands-on training" active={true} onComplete={() => handleStepComplete(2)} />
                ) : (
                  ""
                )}
              </span>
            </div>
          </div>

          {/* Step 4 (Even) */}
          <div className={`timeline-step-row ${activeSupportStep >= 3 ? 'active' : ''}`}>
            <div className="timeline-col left-align">
              <span className={`timeline-label-text ${activeSupportStep >= 3 ? 'active' : ''}`}>
                {activeSupportStep > 3 ? (
                  "Reliable support when you need it most"
                ) : activeSupportStep === 3 ? (
                  <TypewriterText text="Reliable support when you need it most" active={true} onComplete={() => handleStepComplete(3)} />
                ) : (
                  ""
                )}
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
                {activeSupportStep > 4 ? (
                  "Continuous improvements as you grow"
                ) : activeSupportStep === 4 ? (
                  <TypewriterText text="Continuous improvements as you grow" active={true} onComplete={() => handleStepComplete(4)} />
                ) : (
                  ""
                )}
              </span>
            </div>
          </div>

          {/* Step 6 (Even) */}
          <div className={`timeline-step-row ${activeSupportStep >= 5 ? 'active' : ''}`}>
            <div className="timeline-col left-align">
              <span className={`timeline-label-text ${activeSupportStep >= 5 ? 'active' : ''}`}>
                {activeSupportStep > 5 ? (
                  "Dedicated experts invested in your success"
                ) : activeSupportStep === 5 ? (
                  <TypewriterText text="Dedicated experts invested in your success" active={true} onComplete={() => handleStepComplete(5)} />
                ) : (
                  ""
                )}
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
