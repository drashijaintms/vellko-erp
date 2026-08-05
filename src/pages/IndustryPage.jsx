import IndustryHeroSection from '../components/welcome/IndustryHeroSection';
import IndustryBeyondSection from '../components/welcome/IndustryBeyondSection';
import IndustryCompareSection from '../components/welcome/IndustryCompareSection';
import IndustryAllInOneSection from '../components/welcome/IndustryAllInOneSection';
import IndustryWorksSection from '../components/welcome/IndustryWorksSection';
import IndustrySupportSection from '../components/welcome/IndustrySupportSection';
import IndustryFaqSection from '../components/welcome/IndustryFaqSection';

export default function IndustryPage({ 
  title, highlight, tagline, desc, badges,
  beyondTitle, beyondHighlight, beyondSubCol1, beyondSubCol2, beyondDesc, beyondFeatures,
  compareTitle, compareHighlight, compareHeaderLeft, compareHeaderRight, compareRows,
  allInOneTitle, allInOneHighlight, allInOneTagline, allInOneDesc, allInOneModules,
  chooseTitle, chooseHighlight, chooseSub1, chooseSub2, chooseHeaderLeft, chooseHeaderRight, chooseRows,
  worksTitle, worksHighlight, worksSteps,
  supportTitle, supportHighlight, supportSub1, supportSub2, supportSteps,
  faqTitle, faqHighlight, faqIntroQ, faqIntroA, faqItems
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
      {compareRows && (
        <IndustryCompareSection 
          title={compareTitle}
          highlight={compareHighlight}
          headerLeft={compareHeaderLeft}
          headerRight={compareHeaderRight}
          rows={compareRows}
        />
      )}
      {allInOneModules && (
        <IndustryAllInOneSection 
          title={allInOneTitle}
          highlight={allInOneHighlight}
          tagline={allInOneTagline}
          desc={allInOneDesc}
          modules={allInOneModules}
        />
      )}
      {chooseRows && (
        <IndustryCompareSection 
          title={chooseTitle}
          highlight={chooseHighlight}
          sub1={chooseSub1}
          sub2={chooseSub2}
          headerLeft={chooseHeaderLeft}
          headerRight={chooseHeaderRight}
          rows={chooseRows}
        />
      )}
      {worksSteps && (
        <IndustryWorksSection 
          title={worksTitle}
          highlight={worksHighlight}
          steps={worksSteps}
        />
      )}
      {supportSteps && (
        <IndustrySupportSection 
          title={supportTitle}
          highlight={supportHighlight}
          sub1={supportSub1}
          sub2={supportSub2}
          supportSteps={supportSteps}
        />
      )}
      {faqItems && (
        <IndustryFaqSection 
          title={faqTitle}
          highlight={faqHighlight}
          introQ={faqIntroQ}
          introA={faqIntroA}
          faqItems={faqItems}
        />
      )}
    </>
  );
}
