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

export default function IndustryAllInOneSection({ title, highlight, tagline, desc, modules, customClass }) {
  if (!modules || modules.length === 0) return null;

  const [activeModule, setActiveModule] = useState(0);
  const activeData = modules[activeModule];
  const scrollWrapperRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth <= 1024) return;
      if (!scrollWrapperRef.current) return;
      
      const rect = scrollWrapperRef.current.getBoundingClientRect();
      const stickyTop = 90;
      const scrolled = stickyTop - rect.top;
      const totalScrollable = rect.height - window.innerHeight;
      
      if (totalScrollable <= 0) return;
      
      const progress = Math.max(0, Math.min(1, scrolled / (totalScrollable * 0.85)));
      const index = Math.min(7, Math.floor(progress * 8));
      setActiveModule(index);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleModuleClick = (idx) => {
    if (window.innerWidth <= 1024 || !scrollWrapperRef.current) {
      setActiveModule(idx);
      return;
    }
    
    const rect = scrollWrapperRef.current.getBoundingClientRect();
    const totalScrollable = rect.height - window.innerHeight;
    
    const progress = (idx + 0.5) / 8;
    const targetScrollY = window.scrollY + rect.top - 90 + (progress * totalScrollable * 0.85);
    
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

  const ActiveIcon = iconMap[activeModule % iconMap.length];

  // 8 arcs of 27° each, 8 gaps of 18° each
  // Outer ring r=160, circumference=1005.3px: arc=75.4px gap=50.3px
  // Inner ring r=148, circumference=929.9px:  arc=69.7px gap=46.5px
  // Initial dashoffset aligns arcs with gaps between labels (labels at 0°,45°,...315° from top)
  // Arcs should sit at 22.5°,67.5°,...337.5° (midpoints between labels)
  // SVG circle starts stroke at 3-o'clock (90° from top)
  // Offset needed: (90° - 22.5°)/360° × C = 67.5/360 × C
  const outerOffset = (67.5 / 360) * 1005.3; // ≈188.5px — shifts arc start to 22.5° gap
  const innerOffset = (67.5 / 360) * 929.9;  // ≈174.4px

  return (
    <section className={customClass || 'all-in-one-section'}>
      <div className="all-in-one-text">
        <h2 className="all-in-one-title">
          {title} {highlight && <span className="red-highlight">{highlight}</span>}
        </h2>
        {tagline && <p className="all-in-one-p1">{tagline}</p>}
        {desc && <p className="all-in-one-p2">{desc}</p>}
      </div>

      {/* Mobile Tab Scroller */}
      <div className="mobile-modules-scroller">
        {modules.map((item, idx) => (
          <button 
            key={idx} 
            className={`mobile-module-tab ${activeModule === idx ? 'active' : ''}`}
            onClick={() => setActiveModule(idx)}
          >
            {item.title.split(' & ')[0].split(' Management')[0]}
          </button>
        ))}
      </div>

      <div className="all-in-one-scroll-wrapper" ref={scrollWrapperRef}>
        <div className="all-in-one-layout">
          <div className="module-details-card">
            <div className="module-card-header">
              <div className="module-card-icon-container">
                <ActiveIcon size={24} className="module-card-icon-svg" style={{ stroke: '#DC1436', strokeWidth: '2.5px' }} />
              </div>
              <h3 className="module-card-title">{activeData.title}</h3>
            </div>

            <p className="module-card-desc" style={{ fontWeight: '700', color: '#111827' }}>{activeData.subtitle}</p>
            <p className="module-card-desc">{activeData.desc}</p>

            <div className="module-features-title-row">Key Features</div>

            <ul className="module-features-list">
              {activeData.features.map((feature, idx) => (
                <li key={idx} className="module-feature-item">
                  <svg className="feature-checkbox-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="3" width="18" height="18" rx="4" stroke="#111827" strokeWidth="2" fill="none" />
                    <path d="M7 11.5L10.5 15L17 7.5" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="circular-graphic-container">
            <svg
              className="circular-ring-svg"
              viewBox="0 0 440 440"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }}
            >
              {/* Outer gray ring — auto-rotates CLOCKWISE */}
              <circle
                cx="220" cy="220" r="160"
                stroke="#cbd5e1"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeDasharray="75.4 50.3"
                strokeDashoffset={outerOffset}
                fill="none"
                style={{
                  transformOrigin: '220px 220px',
                  animation: 'ring-spin-cw 18s linear infinite'
                }}
              />

              {/* Inner red ring — auto-rotates ANTICLOCKWISE */}
              <circle
                cx="220" cy="220" r="148"
                stroke="#DC1436"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeDasharray="69.7 46.5"
                strokeDashoffset={innerOffset}
                fill="none"
                style={{
                  transformOrigin: '220px 220px',
                  animation: 'ring-spin-ccw 18s linear infinite'
                }}
              />
            </svg>

            {/* Circular Labels */}
            {modules.map((item, index) => {
              const isLabelActive = activeModule === index;
              const pos = circularPositions[index];
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
              <img src={dashboardMonitor} alt="Dashboard Mockup" className="dashboard-monitor-img" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
