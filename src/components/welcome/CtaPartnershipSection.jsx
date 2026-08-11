export default function CtaPartnershipSection() {
  return (
    <section className="cta-partnership-section">
      <div className="cta-partnership-container">
        <h2 className="cta-partnership-heading">
          At Vellko, we don't just deliver software we build long-term partnerships that help your business grow with confidence.
        </h2>
        <button 
          className="cta-partnership-btn"
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
          Discover How Vellko ERP works for your Business
        </button>
      </div>
    </section>
  );
}
