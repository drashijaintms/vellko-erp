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
          <button className="final-cta-btn-primary">Request a Demo</button>
          <button className="final-cta-btn-secondary">Get Started</button>
        </div>
      </div>
    </section>
  );
}
