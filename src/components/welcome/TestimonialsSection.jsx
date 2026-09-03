import { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import testimonial1 from '../../assets/images/testimonial-1.jpg';
import testimonial2 from '../../assets/images/testimonial-2.jpg';
import testimonial3 from '../../assets/images/testimonial-3.jpg';

const testimonialData = [
  {
    img: testimonial1,
    quote: "Before Vellko ERP, our teams relied on spreadsheets and multiple tools to manage daily operations.",
    sub: "Now, everything is centralized, and we have complete visibility across departments.",
    name: "Rahul Gupta",
    role: "Finance Manager, Logistics Company",
    stars: 5
  },
  {
    img: testimonial2,
    quote: "We tried three different ERP systems before Vellko. Nothing came close to the level of integration and simplicity.",
    sub: "Our inventory, billing and customer data are now fully in sync — no more manual reconciliation.",
    name: "Mehul Agrawal",
    role: "Operations Head, Retail Chain",
    stars: 5
  },
  {
    img: testimonial3,
    quote: "Vellko ERP transformed the way we handle HR and payroll. What used to take days now takes minutes.",
    sub: "The onboarding was smooth, and the support team was always available to help us every step of the way.",
    name: "Priya Sharma",
    role: "HR Director, Manufacturing Group",
    stars: 5
  },

];

export default function TestimonialsSection() {
  const [activeTestimonial, setActiveTestimonial] = useState(1);
  const [testimonialResetTrigger, setTestimonialResetTrigger] = useState(0);
  const activeTesti = testimonialData[activeTestimonial];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev - 1 + 3) % 3);
    }, 3000);

    return () => clearInterval(interval);
  }, [testimonialResetTrigger]);

  return (
    <section className="testimonials-section">
      <div className="testimonials-container">
        <h2 className="testimonials-title">
          Customer Results & <span className="red-highlight">Reviews</span>
        </h2>

        {/* Single unified white card */}
        <div className="testimonials-card-wrap">

          {/* Left: Avatar Stack */}
          <div className="testimonials-avatars-col">
            {testimonialData.map((t, idx) => {
              let slotClass = '';
              if (idx === activeTestimonial) {
                slotClass = 'slot-middle active';
              } else if (idx === (activeTestimonial - 1 + 3) % 3) {
                slotClass = 'slot-top';
              } else {
                slotClass = 'slot-bottom';
              }
              return (
                <button
                  key={idx}
                  className={`testimonial-avatar-btn ${slotClass}`}
                  onClick={() => {
                    setActiveTestimonial(idx);
                    setTestimonialResetTrigger((prev) => prev + 1);
                  }}
                  aria-label={`View testimonial from ${t.name}`}
                >
                  <img src={t.img} alt={t.name} />
                </button>
              );
            })}
          </div>

          {/* Thin vertical divider */}
          <div className="testimonials-divider" />

          {/* Right: Testimonial Content */}
          <div className="testimonials-content" key={activeTestimonial}>
            <p className="testimonial-quote-main">
              {activeTesti.quote}
            </p>
            <p className="testimonial-quote-sub">
              {activeTesti.sub}
            </p>
            <p className="testimonial-person-name">{activeTesti.name}</p>
            <p className="testimonial-person-role">{activeTesti.role}</p>

            <div className="testimonial-footer">
              <hr className="testimonial-dashes" />
              <div className="testimonial-stars">
                {Array.from({ length: activeTesti.stars }).map((_, i) => (
                  <Star key={i} className="star-icon" />
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
