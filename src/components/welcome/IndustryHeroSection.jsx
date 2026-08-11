import onePlatformIcon from '../../assets/icons/one-platform.png';
import unlimitedGrowthIcon from '../../assets/icons/unlimited-growth.png';

export default function IndustryHeroSection({ title, highlight, tagline, desc, badges, customClass }) {
  const defaultBadges = [
    { type: 'img', src: onePlatformIcon, alt: 'One Platform', text: ['One', 'Platform'] },
    { type: 'svg', text: ['Complete', 'Control'] },
    { type: 'img', src: unlimitedGrowthIcon, alt: 'Unlimited Growth', text: ['Unlimited', 'Growth'] }
  ];

  const displayBadges = badges || defaultBadges;

  return (
    <section className={customClass || 'hero-section'}>
      <div className="hero-container">
        <h1 className="hero-heading">
          {title} {highlight && <span className="red-highlight">{highlight}</span>}
        </h1>

        {tagline && !badges && (
          <p className="hero-paragraph-1 industry-hero-tagline">
            {tagline}
          </p>
        )}
        
        {desc && (
          <p className="hero-paragraph-1 industry-hero-desc">
            {desc}
          </p>
        )}

        {/* Feature Badges */}
        <div className="hero-features">
          {displayBadges.map((badge, idx) => (
            <div key={idx} className="feature-badge">
              {badge.type === 'img' ? (
                <img src={badge.src || (idx === 0 ? onePlatformIcon : unlimitedGrowthIcon)} alt={badge.alt || badge.text.join(' ')} className="feature-icon-img" />
              ) : (
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
              )}
              <span className="feature-text">
                {badge.text.map((t, i) => (
                  <span key={i}>{t}<br /></span>
                ))}
              </span>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="hero-actions">
          <a 
            href="https://www.vellkoerp.com/signup" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hero-btn-filled"
            style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
          >
            Book Demo
          </a>
          <button 
            className="hero-btn-outline"
            onClick={(e) => {
              e.preventDefault();
              const contactElem = document.getElementById('contact-form') || document.querySelector('.contact-main-card');
              if (contactElem) {
                contactElem.scrollIntoView({ behavior: 'smooth' });
              } else {
                window.location.href = '/contact#contact-form';
              }
            }}
          >
            Start Free Trial
          </button>
        </div>
      </div>
    </section>
  );
}
