import { Target, Eye, Shield, Users, Cpu, Award } from 'lucide-react';

export default function AboutUs() {
  const statsList = [
    { number: "150+", label: "Businesses Powered" },
    { number: "99.9%", label: "System Uptime" },
    { number: "40%", label: "Operational Efficiency Boost" },
    { number: "24/7", label: "Dedicated Support" }
  ];

  const valuesList = [
    {
      icon: Shield,
      title: "Unwavering Trust",
      desc: "We prioritize security, transparency, and data integrity above all else. Your business information is completely secure with Vellko."
    },
    {
      icon: Cpu,
      title: "Continuous Innovation",
      desc: "Our platform evolves constantly to integrate the latest technology, ensuring your business stays ahead in a fast-changing market."
    },
    {
      icon: Award,
      title: "Customer Excellence",
      desc: "We focus on solving real operational challenges. Our dedicated success team ensures your ERP migration is simple and successful."
    }
  ];

  const journeyList = [
    {
      year: "2021",
      title: "The Genesis",
      desc: "Vellko ERP was founded in India with a clear mission: to build a modern, high-visibility ERP system that removes operational complexity for growing businesses."
    },
    {
      year: "2022",
      title: "Expanding Horizons",
      desc: "Launched our specialized E-Commerce and Retail modules, allowing businesses to integrate multi-marketplace sales and active store locations."
    },
    {
      year: "2023",
      title: "Manufacturing & Supply Chain Integration",
      desc: "Rolled out comprehensive Manufacturing control, Warehouse, and Logistics pipelines, establishing Vellko as a true end-to-end ERP provider."
    },
    {
      year: "2024",
      title: "Smarter Automation",
      desc: "Integrated real-time biometric attendance pipelines, automated payroll compliance (GST, PF, ESIC), and consolidated multi-entity financial reporting."
    },
    {
      year: "2026",
      title: "Trusted ERP Partner",
      desc: "Powering hundreds of enterprises across 10+ industries in India with complete visibility, live analytics, and automated workflows."
    }
  ];

  return (
    <div className="about-us-page">
      {/* Hero Section */}
      <section className="about-hero-section">
        <div className="about-hero-overlay"></div>
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

      {/* Mission & Vision */}
      <section className="about-mission-section">
        <div className="about-mission-container">
          <div className="about-mission-card">
            <h2 className="about-mission-title">
              <Target size={28} />
              Our Mission
            </h2>
            <p className="about-mission-text">
              To empower growing enterprises with complete operational visibility. We strive to replace scattered data, manual tracking, and disconnected systems with a single, intelligent source of truth that lets teams run with confidence.
            </p>
          </div>

          <div className="about-mission-card">
            <h2 className="about-mission-title">
              <Eye size={28} />
              Our Vision
            </h2>
            <p className="about-mission-text">
              To become the world's most intuitive, reliable, and scalable cloud-based ERP ecosystem, helping businesses automate their workflows and drive sustainable growth without administrative headaches.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Dashboard Banner */}
      <section className="about-stats-section">
        <div className="about-stats-container">
          {statsList.map((stat, idx) => (
            <div key={idx} className="about-stat-card">
              <div className="about-stat-number">{stat.number}</div>
              <div className="about-stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Core Values */}
      <section className="about-values-section">
        <div className="about-values-header animate-fade-in">
          <h2 className="about-values-heading">Our Core Values</h2>
          <p className="about-values-sub">
            The principles that guide our product development, support services, and customer partnerships.
          </p>
        </div>
        <div className="about-values-grid">
          {valuesList.map((val, idx) => {
            const IconComponent = val.icon;
            return (
              <div key={idx} className="about-value-card">
                <div className="about-value-icon">
                  <IconComponent size={24} />
                </div>
                <h3 className="about-value-title">{val.title}</h3>
                <p className="about-value-desc">{val.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="about-journey-section">
        <div className="about-values-header">
          <h2 className="about-values-heading">Our Journey</h2>
          <p className="about-values-sub">
            How we evolved into India's most trusted operational control platform.
          </p>
        </div>
        <div className="about-journey-container">
          {journeyList.map((item, idx) => (
            <div key={idx} className="about-journey-item animate-fade-in">
              <div className="about-journey-dot"></div>
              <div className="about-journey-content">
                <div className="about-journey-year">{item.year}</div>
                <h3 className="about-journey-title">{item.title}</h3>
                <p className="about-journey-desc">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA Partnership Banner */}
      <section className="industry-final-cta-section" style={{ background: '#f9fafb', borderTop: '1px solid #e5e7eb' }}>
        <div className="cta-container" style={{ maxWidth: '980px', margin: '0 auto', textAlign: 'center', padding: '5rem 1.5rem' }}>
          <h2 className="cta-heading" style={{ fontSize: '2.5rem', fontWeight: 800, color: '#111827', marginBottom: '1.25rem' }}>
            Build a Smarter Business with Vellko ERP
          </h2>
          <p className="cta-description" style={{ fontSize: '1.1rem', color: '#4b5563', marginBottom: '2.5rem', lineHeight: '1.6', maxWidth: '700px', margin: '0 auto 2.5rem' }}>
            Join hundreds of forward-thinking businesses that streamline their daily operations, align departments, and secure complete visibility.
          </p>
          <div className="hero-actions">
            <button className="hero-btn-filled">Request a Demo</button>
            <button className="hero-btn-outline" style={{ background: '#ffffff', border: '1.5px solid #111827' }}>Get Started</button>
          </div>
        </div>
      </section>
    </div>
  );
}
