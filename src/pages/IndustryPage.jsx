import IndustryHeroSection from '../components/welcome/IndustryHeroSection';

export default function IndustryPage({ title, highlight, tagline, desc, badges }) {
  return (
    <div className="hero-stats-wrapper" style={{ height: 'auto', minHeight: '93vh' }}>
      <IndustryHeroSection 
        title={title}
        highlight={highlight}
        tagline={tagline}
        desc={desc}
        badges={badges}
      />
    </div>
  );
}
