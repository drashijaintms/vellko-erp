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

const sectorAngles = [
  { start: 324, end: 351, side: 'left' },  
  { start: 9,   end: 36,  side: 'right' }, 
  { start: 54,  end: 81,  side: 'right' }, 
  { start: 99,  end: 126, side: 'right' }, 
  { start: 144, end: 171, side: 'right' }, 
  { start: 189, end: 216, side: 'left' },  
  { start: 234, end: 261, side: 'left' },  
  { start: 279, end: 306, side: 'left' }   
];

const getArcPath = (startAngle, endAngle, radius) => {
  const startRad = ((startAngle - 90) * Math.PI) / 180;
  const endRad = ((endAngle - 90) * Math.PI) / 180;
  const x1 = 220 + radius * Math.cos(startRad);
  const y1 = 220 + radius * Math.sin(startRad);
  const x2 = 220 + radius * Math.cos(endRad);
  const y2 = 220 + radius * Math.sin(endRad);
  const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;
  return `M ${x1},${y1} A ${radius},${radius} 0 ${largeArcFlag},1 ${x2},${y2}`;
};

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

    window.addEventListener('scroll', handleScroll);
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

  return (
    <section className={`all-in-one-section ${customClass || ''}`}>
      <div className="all-in-one-text">
        <h2 className="all-in-one-title">
          {title} {highlight && <span className="red-highlight">{highlight}</span>}
        </h2>
        {tagline && (
          <p className="all-in-one-p1">
            {tagline}
          </p>
        )}
        {desc && (
          <p className="all-in-one-p2">
            {desc}
          </p>
        )}
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

            <div className="module-features-title-row">
              Key Features
            </div>

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
            <svg className="circular-ring-svg" viewBox="0 0 440 440" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }}>
              {sectorAngles.map((sector, index) => (
                <g key={index}>
                  <path
                    d={getArcPath(sector.start, sector.end, 160)}
                    stroke="#cbd5e1"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    fill="none"
                  />
                  <path
                    d={getArcPath(sector.start, sector.end, 148)}
                    stroke="#DC1436"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    fill="none"
                  />
                </g>
              ))}
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
