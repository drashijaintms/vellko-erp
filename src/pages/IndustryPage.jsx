import IndustryHeroSection from '../components/welcome/IndustryHeroSection';
import IndustryBeyondSection from '../components/welcome/IndustryBeyondSection';

export default function IndustryPage({ 
  title, highlight, tagline, desc, badges,
  beyondTitle, beyondHighlight, beyondSubCol1, beyondSubCol2, beyondDesc, beyondFeatures 
}) {
  return (
    <>
      <div className="hero-stats-wrapper" style={{ height: 'auto', minHeight: '93vh' }}>
        <IndustryHeroSection 
          title={title}
          highlight={highlight}
          tagline={tagline}
          desc={desc}
          badges={badges}
        />
      </div>
      {beyondFeatures && (
        <IndustryBeyondSection 
          title={beyondTitle}
          highlight={beyondHighlight}
          subCol1={beyondSubCol1}
          subCol2={beyondSubCol2}
          desc={beyondDesc}
          features={beyondFeatures}
        />
      )}
    </>
  );
}
