export default function IndustryFinalCtaSection({ title, desc, customClass }) {
  return (
    <section className={`final-cta-section ${customClass || ''}`}>
      <div className="final-cta-container">
        <h2 className="final-cta-heading">
          {title}
        </h2>
        {desc && (
          <p className="final-cta-desc" style={{ 
            color: '#e5e7eb', 
            fontSize: '1.15rem', 
            maxWidth: '750px', 
            margin: '1.25rem auto 2.25rem auto', 
            lineHeight: '1.6',
            fontFamily: 'var(--font-body)'
          }}>
            {desc}
          </p>
        )}
        <div className="final-cta-buttons">
          <button className="final-cta-btn-primary">Request a Demo</button>
          <button className="final-cta-btn-secondary">Get Started</button>
        </div>
      </div>
    </section>
  );
}
