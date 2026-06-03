import Hero from '../components/Hero';
import About from '../components/About';
import TradingJourney from '../components/TradingJourney';
import Partners from '../components/Partners';
import ExclusiveOffers from '../components/ExclusiveOffers';
import ContentHub from '../components/ContentHub';
import Community from '../components/Community';
import SocialProof from '../components/SocialProof';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <TradingJourney />
      <Partners />
      <ExclusiveOffers />
      <ContentHub />
      <Community />
      <SocialProof />
      <Testimonials />
      <Contact />
    </>
  );
}
