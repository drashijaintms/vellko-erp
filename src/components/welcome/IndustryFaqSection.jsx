import { useState } from 'react';
import { ChevronRight } from 'lucide-react';

export default function IndustryFaqSection({ title, highlight, introQ, introA, faqItems, customClass }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  if (!faqItems || faqItems.length === 0) return null;

  return (
    <section className={`faq-section ${customClass || ''}`}>
      <div className="faq-container">
        {/* Title */}
        <h2 className="faq-title">
          {title} {highlight && <span className="red-highlight">{highlight}</span>}
        </h2>

        {/* Intro Q&A block */}
        {introQ && (
          <div className="faq-intro-block">
            <h3 className="faq-intro-q">{introQ}</h3>
            <p className="faq-intro-a">{introA}</p>
          </div>
        )}

        {/* Accordion Wrapper */}
        <div className="faq-accordion-wrapper">
          {faqItems.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className={`faq-accordion-item ${isOpen ? 'open' : ''}`}>
                <button className="faq-trigger" onClick={() => toggleFaq(idx)} aria-expanded={isOpen}>
                  <span className="faq-question-text">{item.question}</span>
                  <ChevronRight size={18} className={`faq-chevron ${isOpen ? 'rotate-90' : ''}`} />
                </button>
                <div className="faq-content-pane">
                  <div className="faq-content-inner">
                    <p className="faq-answer-text">{item.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
