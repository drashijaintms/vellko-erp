import { useState, useEffect } from 'react';
import { Cpu, Search, Sliders, CheckCircle2, Activity, HelpCircle } from 'lucide-react';
import aboutPhilosophyLaptop from '../assets/images/about-philosophy-laptop.png';

function AnimatedStatBadge({ target, suffix = '', isStatic = false, staticText = '' }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isStatic) return;
    let start = 0;
    const end = target;
    const duration = 2000;
    const incrementTime = 30;
    const steps = Math.ceil(duration / incrementTime);
    const stepValue = end / steps;

    const timer = setInterval(() => {
      start += stepValue;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [target, isStatic]);

  if (isStatic) {
    return <span className="about-philosophy-stat-badge">{staticText}</span>;
  }

  return (
    <span className="about-philosophy-stat-badge">
      {count}{suffix}
    </span>
  );
}

// Custom Red Icons matching user reference images exactly
const TrendingBarIcon = ({ size = 34, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="3" y1="32" x2="33" y2="32" />
    <rect x="5" y="21" width="6" height="11" rx="1" />
    <rect x="15" y="15" width="6" height="17" rx="1" />
    <rect x="25" y="9" width="6" height="23" rx="1" />
    <path d="M4 19C10 16 18 11 31 3" strokeWidth="2.5" />
    <path d="M23 3h8v8" strokeWidth="2.5" />
  </svg>
);

const SearchQuestionIcon = ({ size = 34, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="20" cy="16" r="10.5" />
    <line x1="7" y1="5" x2="9" y2="7" />
    <line x1="4" y1="11" x2="7" y2="11" />
    <line x1="12" y1="4" x2="12" y2="7" />
    <line x1="12" y1="24" x2="4" y2="32" strokeWidth="3" />
    <path d="M17.5 13.5c0-1.5 1.2-2.3 2.5-2.3s2.5 0.8 2.5 2c0 1.5-2 1.8-2 3.2v0.6" />
    <circle cx="20" cy="20.5" r="0.8" fill="currentColor" />
  </svg>
);

const TouchGearIcon = ({ size = 34, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M6 18A12 12 0 0 1 27 9.5" />
    <path d="M27 5v4.5h-4.5" />
    <path d="M30 18A12 12 0 0 1 9 26.5" />
    <path d="M9 31v-4.5h4.5" />
    <circle cx="18" cy="18" r="6" />
    <path d="M15 16l4.5 9l-2 0.7l-2.2-4.2l-2 1.4v-6.9z" fill="none" />
  </svg>
);

export default function AboutUs() {
  const statsList = [
    { target: 500, suffix: "+", label: "Users Empowered", isStatic: false },
    { target: 24, suffix: "/7", label: "Customer Support", isStatic: true, staticText: "24/7" },
    { target: 95, suffix: "%", label: "Client Retention Rate", isStatic: false },
    { target: 30, suffix: "%", label: "Faster Business Processes", isStatic: false }
  ];

  const beliefsList = [
    {
      icon: TrendingBarIcon,
      title: "We Don't Want to Build Just Another ERP.",
      desc: "Businesses already have enough software. We want to create technology that genuinely earns its place - making work easier, decisions better, and growth less complicated."
    },
    {
      icon: SearchQuestionIcon,
      title: "We Start With the Problem, Not the Feature.",
      desc: "We don't believe in adding complexity just to make a product look bigger. We first ask what's actually getting in the way - and then figure out how technology can make it better."
    },
    {
      icon: TouchGearIcon,
      title: "Keep It Simple.",
      desc: "The technology behind something can be incredibly complex. The experience of using it shouldn't be. That's a standard we hold ourselves to every day."
    },
    {
      icon: CheckCircle2,
      title: "Details Matter.",
      desc: "A smoother process. A clearer screen. One less unnecessary step. The small things can make a surprisingly big difference."
    },
    {
      icon: Activity,
      title: "Keep Evolving.",
      desc: "The moment we think we've figured everything out is probably the moment we stop growing. Businesses evolve. Technology evolves. So do we."
    },
    {
      icon: HelpCircle,
      title: "Curiosity Keeps Us Moving.",
      desc: "We won't always have the right answer. But we'll keep asking the right questions. We'll challenge what we know, change our minds when we need to, and stay open to what's next."
    }
  ];

  return (
    <div className="about-us-page">
      {/* Hero Section */}
      <section className="about-hero-section">
        <div className="about-hero-content animate-fade-in">
          <h1 className="about-hero-heading">
            Designed with Purpose.<br />
            <span className="red-highlight">Built for Your Growth.</span>
          </h1>
          <p className="about-hero-desc">
            Vellko ERP is a trusted ERP software company in India, helping businesses streamline operations, improve efficiency, and accelerate growth through innovative technology.
          </p>
          <div className="about-hero-actions">
            <button className="hero-btn-filled">Book Demo</button>
            <button className="hero-btn-outline">Start Free Trial</button>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="about-philosophy-section">
        <div className="about-philosophy-container">
          <div className="about-philosophy-left animate-fade-in">
            <h2 className="about-philosophy-heading">
              The Thinking Behind<br />
              What <span className="red-highlight">We Build.</span>
            </h2>
            <p className="about-philosophy-lead">
              Vellko is a technology company built around a simple idea: <strong>good technology should make things better, not more complicated.</strong>
            </p>
            <div className="about-philosophy-body">
              <p>
                Our journey began with a desire to understand the challenges businesses face as they grow - the increasing complexity, disconnected processes and need for better ways to manage everyday operations.
              </p>
              <p>
                That thinking shaped Vellko ERP.
              </p>
              <p>
                We bring together technology, business understanding, and a practical approach to create solutions that help businesses work more effectively and move forward with confidence.
              </p>
              <p>
                But Vellko is more than what we build. It's the people behind it - their curiosity, ideas and willingness to keep learning and improving.
              </p>
              <p>
                We believe in asking better questions, challenging the obvious and building with purpose.
              </p>
              <p className="about-philosophy-closing-p">
                That's who we are. And that's what keeps us moving forward.
              </p>
            </div>
          </div>

          <div className="about-philosophy-right animate-fade-in">
            <div className="about-philosophy-image-wrapper">
              <img 
                src={aboutPhilosophyLaptop} 
                alt="Vellko Workspace Conference Table and SaaS Dashboard" 
                className="about-philosophy-image" 
              />
              
            </div>
            <div className="about-philosophy-stats-banner">
              <div className="about-philosophy-stats-grid">
                {statsList.map((stat, idx) => (
                  <div key={idx} className="about-philosophy-stat-item">
                    <AnimatedStatBadge 
                      target={stat.target} 
                      suffix={stat.suffix} 
                      isStatic={stat.isStatic} 
                      staticText={stat.staticText} 
                    />
                    <span className="about-philosophy-stat-label">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Beliefs Section */}
      <section className="about-belief-section">
        <div className="about-belief-header animate-fade-in">
          <h2 className="about-belief-heading">
            What We <span className="red-highlight">Believe In</span>
          </h2>
        </div>

        <div className="about-belief-grid">
          {beliefsList.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div key={idx} className="belief-card animate-fade-in">
                <div className="belief-card-header-row">
                  <div className="belief-icon-circle">
                    <IconComponent size={32} strokeWidth={1.5} />
                  </div>
                  <div className="belief-header-line"></div>
                </div>
                <div className="belief-card-content">
                  <h3 className="belief-card-title">{item.title}</h3>
                  <p className="belief-card-desc">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
