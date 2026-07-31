import { useEffect, useRef } from 'react';

export default function StatsSection() {
  const statsSectionRef = useRef(null);
  const statsRefs = useRef([]);

  useEffect(() => {
    const section = statsSectionRef.current;
    if (!section) return;

    let animationFrameId;
    let startTime = null;
    const duration = 2000; // 2 seconds

    const targets = [500, 99.9, 24, 50, 95, 30];
    const formats = [
      (val) => `${Math.floor(val)}+`,
      (val) => `${val.toFixed(1)}%`,
      (val) => `${Math.floor(val)}/7`,
      (val) => `${Math.floor(val)}+`,
      (val) => `${Math.floor(val)}%`,
      (val) => `${Math.floor(val)}%`,
    ];

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);

      // Easing: easeOutCubic
      const ease = 1 - Math.pow(1 - percentage, 3);

      targets.forEach((target, idx) => {
        const val = target * ease;
        const formatted = formats[idx](val);

        const desktopEl = statsRefs.current[idx];
        if (desktopEl) {
          desktopEl.textContent = formatted;
        }

        const mobileEl = statsRefs.current[idx + 6];
        if (mobileEl) {
          mobileEl.textContent = formatted;
        }
      });

      if (percentage < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startTime = null;
            animationFrameId = requestAnimationFrame(animate);
            observer.unobserve(section);
          }
        });
      },
      { threshold: 0.02 }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="stats-section" ref={statsSectionRef}>
      {/* Desktop Grid Layout */}
      <div className="stats-desktop-grid">
        <div className="stats-cell empty"></div>
        <div className="stats-cell num-cell" ref={(el) => (statsRefs.current[0] = el)}>0+</div>
        <div className="stats-cell num-cell" ref={(el) => (statsRefs.current[1] = el)}>0.0%</div>
        <div className="stats-cell num-cell" ref={(el) => (statsRefs.current[2] = el)}>0/7</div>
        <div className="stats-cell num-cell" ref={(el) => (statsRefs.current[3] = el)}>0+</div>
        <div className="stats-cell num-cell" ref={(el) => (statsRefs.current[4] = el)}>0%</div>
        <div className="stats-cell num-cell" ref={(el) => (statsRefs.current[5] = el)}>0%</div>
        <div className="stats-cell empty"></div>

        <div className="stats-cell empty"></div>
        <div className="stats-cell label-cell">Users<br />Empowered</div>
        <div className="stats-cell label-cell">System<br />Uptime</div>
        <div className="stats-cell label-cell">Customer<br />Support</div>
        <div className="stats-cell label-cell">Successful ERP<br />Implementations</div>
        <div className="stats-cell label-cell">Client<br />Retention Rate</div>
        <div className="stats-cell label-cell">Faster Business<br />Processes</div>
        <div className="stats-cell empty"></div>
      </div>

      {/* Mobile Grid Layout (Translucent Glass Cards) */}
      <div className="stats-mobile-grid">
        <div className="stats-mobile-card">
          <div className="stats-mobile-num" ref={(el) => (statsRefs.current[6] = el)}>0+</div>
          <div className="stats-mobile-label">Users Empowered</div>
        </div>
        <div className="stats-mobile-card">
          <div className="stats-mobile-num" ref={(el) => (statsRefs.current[7] = el)}>0.0%</div>
          <div className="stats-mobile-label">System Uptime</div>
        </div>
        <div className="stats-mobile-card">
          <div className="stats-mobile-num" ref={(el) => (statsRefs.current[8] = el)}>0/7</div>
          <div className="stats-mobile-label">Customer Support</div>
        </div>
        <div className="stats-mobile-card">
          <div className="stats-mobile-num" ref={(el) => (statsRefs.current[9] = el)}>0+</div>
          <div className="stats-mobile-label">Successful ERP Implementations</div>
        </div>
        <div className="stats-mobile-card">
          <div className="stats-mobile-num" ref={(el) => (statsRefs.current[10] = el)}>0%</div>
          <div className="stats-mobile-label">Client Retention Rate</div>
        </div>
        <div className="stats-mobile-card">
          <div className="stats-mobile-num" ref={(el) => (statsRefs.current[11] = el)}>0%</div>
          <div className="stats-mobile-label">Faster Business Processes</div>
        </div>
      </div>
    </section>
  );
}
