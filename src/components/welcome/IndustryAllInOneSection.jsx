import { useState, useEffect, useRef } from 'react';
import { 
  Boxes, Warehouse, ShoppingCart, Users, CreditCard, Truck, Layers, BarChart3 
} from 'lucide-react';
import dashboardMonitor from '../../assets/images/dashboard-monitor.png';

const iconMap = [
  Boxes,
  Warehouse,
  ShoppingCart,
  Users,
  CreditCard,
  Truck,
  Layers,
  BarChart3
];

export default function IndustryAllInOneSection({ 
  title, highlight, tagline, desc, modules, customClass, monitorAlt 
}) {
  if (!modules || modules.length === 0) return null;

  const [activeModule, setActiveModule] = useState(0);
  const [ringRotation, setRingRotation] = useState(0);
  const activeData = modules[activeModule];
  const scrollWrapperRef = useRef(null);
  const lastScrollY = useRef(typeof window !== 'undefined' ? window.scrollY : 0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY.current;
      lastScrollY.current = currentScrollY;

      // Rotate rings on scroll (0.2deg per scrolled pixel)
      setRingRotation(prev => prev + delta * 0.25);

      if (window.innerWidth <= 1024) return;
      if (!scrollWrapperRef.current) return;
      
      const rect = scrollWrapperRef.current.getBoundingClientRect();
      const stickyTop = 90;
      const scrolled = stickyTop - rect.top;
      const totalScrollable = rect.height - window.innerHeight;
      
      if (totalScrollable <= 0) return;
      
      const progress = Math.max(0, Math.min(1, scrolled / (totalScrollable * 0.90)));
      const index = Math.min(modules.length - 1, Math.floor(progress * modules.length));
      setActiveModule(index);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [modules.length]);

  const handleModuleClick = (idx) => {
    if (window.innerWidth <= 1024 || !scrollWrapperRef.current) {
      setActiveModule(idx);
      return;
    }
    
    const rect = scrollWrapperRef.current.getBoundingClientRect();
    const totalScrollable = rect.height - window.innerHeight;
    
    const progress = (idx + 0.5) / modules.length;
    const targetScrollY = window.scrollY + rect.top - 90 + (progress * totalScrollable * 0.90);
    
    window.scrollTo({
      top: targetScrollY,
      behavior: 'smooth'
    });
  };

  const circularPositions = [
    { x: 25.3, y: 25.3 },
    { x: 50.0, y: 15.0 },
    { x: 74.7, y: 25.3 },
    { x: 85.0, y: 50.0 },
    { x: 74.7, y: 74.7 },
    { x: 50.0, y: 85.0 },
    { x: 25.3, y: 74.7 },
    { x: 15.0, y: 50.0 }
  ];

  const getPosition = (idx, total) => {
    if (total === 8 && circularPositions[idx]) return circularPositions[idx];
    const angle = (idx * (360 / total) - 90) * (Math.PI / 180);
    const r = 35;
    return {
      x: +(50 + r * Math.cos(angle)).toFixed(1),
      y: +(50 + r * Math.sin(angle)).toFixed(1)
    };
  };

  const ActiveIcon = iconMap[activeModule % iconMap.length] || Boxes;

  return (
    <section className={customClass || 'all-in-one-section'}>
      <div className="all-in-one-text">
        <h2 className="all-in-one-title">
          {title} {highlight && <span className="red-highlight">{highlight}</span>}
        </h2>
        {tagline && <p className="all-in-one-p1">{tagline}</p>}
        {desc && <p className="all-in-one-p2">{desc}</p>}
      </div>

      {/* Mobile Multi-Row Module Chips */}
      <div className="mobile-modules-grid">
        {modules.map((item, idx) => (
          <button 
            key={idx} 
            type="button"
            className={`mobile-module-tab ${activeModule === idx ? 'active' : ''}`}
            onClick={() => setActiveModule(idx)}
          >
            {item.circleName || item.shortTitle || (item.title ? item.title.split(' & ')[0].split(' Management')[0] : `Module ${idx + 1}`)}
          </button>
        ))}
      </div>

      <div className="all-in-one-scroll-wrapper" ref={scrollWrapperRef}>
        <div className="all-in-one-layout">
          <div className="module-details-card">
            <div className="module-card-header">
              <div className="module-card-icon-container">
                <ActiveIcon size={24} className="module-card-icon-svg" />
              </div>
              <h3 className="module-card-title">{activeData?.title || ''}</h3>
            </div>

            <p className="module-card-subtitle">{activeData?.subtitle || ''}</p>
            <p className="module-card-desc">{activeData?.desc || ''}</p>

            <div className="module-features-title-row">Key Features</div>

            <ul className="module-features-list">
              {(activeData?.features || []).map((feature, idx) => (
                <li key={idx} className="module-feature-item">
                  <svg className="feature-checkbox-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="3" width="18" height="18" rx="4" stroke="#111827" strokeWidth="2" fill="none" />
                    <path d="M7 11.5L10.5 15L17 7.5" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            {/* Mobile Module Navigation Controls */}
            <div className="mobile-module-nav-controls">
              <button 
                type="button"
                className="mobile-module-nav-btn prev"
                onClick={() => setActiveModule((prev) => (prev > 0 ? prev - 1 : modules.length - 1))}
              >
                ← Prev
              </button>
              <span className="mobile-module-step-indicator">
                {activeModule + 1} of {modules.length}
              </span>
              <button 
                type="button"
                className="mobile-module-nav-btn next"
                onClick={() => setActiveModule((prev) => (prev < modules.length - 1 ? prev + 1 : 0))}
              >
                Next →
              </button>
            </div>
          </div>

          <div className="circular-graphic-container">
            <svg
              className="circular-ring-svg"
              viewBox="0 0 440 440"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* SVG Mask: Black areas set line opacity to 0 over all text label regions */}
                <mask id="textGapsMask">
                  <rect x="0" y="0" width="440" height="440" fill="white" />
                  {modules.map((_, idx) => {
                    const pos = getPosition(idx, modules.length);
                    // Map % coordinates back to 440px SVG viewBox
                    const cx = (pos.x / 100) * 440;
                    const cy = (pos.y / 100) * 440;
                    return <circle key={idx} cx={cx} cy={cy} r="44" fill="black" />;
                  })}
                </mask>
              </defs>

              {/* Group masked by textGapsMask so line opacity is 0 under all text labels */}
              <g mask="url(#textGapsMask)">
                {/* Outer gray ring — continuously rotates CLOCKWISE non-stop */}
                <g className="ring-spin-cw">
                  <circle
                    cx="220" cy="220" r="156"
                    stroke="#cbd5e1"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeDasharray="80 30"
                    fill="none"
                  />
                </g>

                {/* Inner red ring — continuously rotates COUNTER-CLOCKWISE non-stop */}
                <g className="ring-spin-ccw">
                  <circle
                    cx="220" cy="220" r="150"
                    stroke="#DC1436"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeDasharray="70 25"
                    fill="none"
                  />
                </g>
              </g>
            </svg>

            {/* Circular Labels */}
            {modules.map((item, index) => {
              const isLabelActive = activeModule === index;
              const pos = getPosition(index, modules.length);
              return (
                <button
                  key={index}
                  className={`circular-label-button ${isLabelActive ? 'active' : ''}`}
                  style={{
                    left: `${pos.x}%`,
                    top: `${pos.y}%`,
                    transform: "translate(-50%, -50%)"
                  }}
                  onClick={() => handleModuleClick(index)}
                >
                  {item.circleName}
                </button>
              );
            })}

            {/* Central mockup */}
            <div className="dashboard-monitor-wrapper-absolute">
              <img src={dashboardMonitor} alt={monitorAlt || "Dashboard Mockup"} className="dashboard-monitor-img" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
