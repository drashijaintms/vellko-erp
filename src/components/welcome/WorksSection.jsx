import howItWorksImg from '../../assets/images/how-it-works.png';

export default function WorksSection() {
  return (
    <section className="works-section">
      <div className="works-container">
        <h2 className="works-title">
          How Vellko ERP <span className="red-highlight">Implementation Works</span>
        </h2>

        <div className="works-split-layout">
          
          {/* Steps Column */}
          <div className="works-steps-col">

            <div className="step-card">
              <h3 className="step-card-header">
                Step 1: <span className="red-highlight">Book a Free Demo</span>
              </h3>
              <p className="step-card-desc">
                See how Vellko ERP works and how it can be applied to your business.
              </p>
            </div>

            <div className="step-card">
              <h3 className="step-card-header">
                Step 2: <span className="red-highlight">Understand Your Business Needs</span>
              </h3>
              <p className="step-card-desc">
                Your processes, challenges and requirements are reviewed to design the right ERP structure.
              </p>
            </div>

            <div className="step-card">
              <h3 className="step-card-header">
                Step 3: <span className="red-highlight">Configure & Migrate Data</span>
              </h3>
              <p className="step-card-desc">
                The ERP is set up for your operations and existing data is securely moved into the system.
              </p>
            </div>

            <div className="step-card last-step">
              <h3 className="step-card-header">
                Step 4: <span className="red-highlight">Train Your Team & Go Live</span>
              </h3>
              <p className="step-card-desc">
                Your team is trained for smooth adoption, followed by a complete shift to the live system.
              </p>
            </div>

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
