import howItWorksImg from '../../assets/images/how-it-works.png';

export default function IndustryWorksSection({ title, highlight, steps, customClass }) {
  if (!steps || steps.length === 0) return null;

  return (
    <section className={`works-section ${customClass || ''}`}>
      <div className="works-container">
        <h2 className="works-title">
          {title} {highlight && <span className="red-highlight">{highlight}</span>}
        </h2>

        <div className="works-split-layout">
          {/* Steps Column */}
          <div className="works-steps-col">
            {steps.map((step, idx) => {
              const isLast = idx === steps.length - 1;
              return (
                <div key={idx} className={`step-card ${isLast ? 'last-step' : ''}`}>
                  <h3 className="step-card-header">
                    Step {step.stepNum || idx + 1}: <span className="red-highlight">{step.title}</span>
                  </h3>
                  {step.desc && (
                    <p className="step-card-desc">
                      {step.desc}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          {/* Handshake Image Column */}
          <div className="works-image-col">
            <img src={howItWorksImg} alt="Businessmen Shaking Hands in Armchairs" className="works-handshake-img" />
          </div>
        </div>
      </div>
    </section>
  );
}
