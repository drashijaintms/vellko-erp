import HeroSection from '../components/welcome/HeroSection';
import StatsSection from '../components/welcome/StatsSection';
import BeyondSection from '../components/welcome/BeyondSection';
import SplitComparisonSection from '../components/welcome/SplitComparisonSection';
import AllInOneSection from '../components/welcome/AllInOneSection';
import IndustrySection from '../components/welcome/IndustrySection';
import NeedErpSection from '../components/welcome/NeedErpSection';
import WorksSection from '../components/welcome/WorksSection';
import SupportSection from '../components/welcome/SupportSection';
import CtaPartnershipSection from '../components/welcome/CtaPartnershipSection';
import TestimonialsSection from '../components/welcome/TestimonialsSection';
import FinalCtaSection from '../components/welcome/FinalCtaSection';

export default function Welcome() {
  return (
    <>
      <div className="hero-stats-wrapper">
        <HeroSection />
        <StatsSection />
      </div>
      <BeyondSection />
      <SplitComparisonSection />
      <AllInOneSection />
      <IndustrySection />
      <NeedErpSection />
      <WorksSection />
      <SupportSection />
      <CtaPartnershipSection />
      <TestimonialsSection />
      <FinalCtaSection />
    </>
  );
}
