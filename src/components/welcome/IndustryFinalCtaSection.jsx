export default function IndustryFinalCtaSection({ title, desc, customClass }) {
  return (
    <section className={customClass || 'final-cta-section'}>
      <div className="final-cta-container">
        <h2 className="final-cta-heading">
          {title}
        </h2>
        {desc && (
          <p className="final-cta-desc">
            {desc}
          </p>
        )}
        <div className="final-cta-buttons">
          <a 
            href="https://app.vellkoerp.com/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="final-cta-btn-primary"
            style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
          >
            Book Demo
          </a>
          <button 
            className="final-cta-btn-secondary"
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
