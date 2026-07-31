import onePlatformIcon from '../../assets/icons/one-platform.png';
import unlimitedGrowthIcon from '../../assets/icons/unlimited-growth.png';

export default function HeroSection() {
  return (
    <section className="hero-section">
      <div className="hero-container">
        <h1 className="hero-heading">
          Run Your Entire Business with
          <span className="red-highlight">Complete Visibility.</span>
        </h1>

        <p className="hero-paragraph-1">
          Meet the All-New Vellko ERP: Built for modern businesses that need more than software they need complete visibility.
        </p>
        
        <p className="hero-paragraph-1">
          Vellko ERP unifies your sales, finance, HR, operations, inventory and customer management into one intelligent platform, giving every team a single source of truth so decisions are faster, operations are connected and growth is built on confidence.
        </p>

        {/* Feature Badges */}
        <div className="hero-features">
          <div className="feature-badge">
            <img src={onePlatformIcon} alt="One Platform" className="feature-icon-img" />
            <span className="feature-text">One<br />Platform</span>
          </div>

          <div className="feature-badge">
            <svg className="feature-icon-svg" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M24 16C28.4183 16 32 19.5817 32 24C32 28.4183 28.4183 32 24 32C19.5817 32 16 28.4183 16 24C16 19.5817 19.5817 16 24 16Z" stroke="#DC1436" strokeWidth="2.5" strokeMiterlimit="10"/>
              <path d="M24 6V11" stroke="#DC1436" strokeWidth="2.5" strokeLinecap="round"/>
              <path d="M24 37V42" stroke="#DC1436" strokeWidth="2.5" strokeLinecap="round"/>
              <path d="M6 24H11" stroke="#DC1436" strokeWidth="2.5" strokeLinecap="round"/>
              <path d="M37 24H42" stroke="#DC1436" strokeWidth="2.5" strokeLinecap="round"/>
              <path d="M11.27 11.27L14.81 14.81" stroke="#DC1436" strokeWidth="2.5" strokeLinecap="round"/>
              <path d="M33.19 33.19L36.73 36.73" stroke="#DC1436" strokeWidth="2.5" strokeLinecap="round"/>
              <path d="M36.73 11.27L33.19 14.81" stroke="#DC1436" strokeWidth="2.5" strokeLinecap="round"/>
              <path d="M14.81 33.19L11.27 36.73" stroke="#DC1436" strokeWidth="2.5" strokeLinecap="round"/>
              <path d="M20 24L22.5 26.5L28 21" stroke="#DC1436" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="feature-text">Complete<br />Control</span>
          </div>

          <div className="feature-badge">
            <img src={unlimitedGrowthIcon} alt="Unlimited Growth" className="feature-icon-img" />
            <span className="feature-text">Unlimited<br />Growth</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="hero-actions">
          <button className="hero-btn-filled">Request a Demo</button>
          <button className="hero-btn-outline">Get Started</button>
        </div>
      </div>
    </section>
  );
}
