import { motion, useScroll, useTransform } from 'framer-motion';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Skills from '../components/sections/Skills';
import Projects from '../components/sections/Projects';
import Certifications from '../components/sections/Certifications';
import Achievements from '../components/sections/Achievements';
import EventsContests from '../components/sections/EventsContests';
import Footer from '../components/sections/Footer';
import CyberBg from '../components/CyberBg';

const HomePage = () => {
  const { scrollYProgress } = useScroll();
  const bgOpacity = useTransform(
    scrollYProgress,
    [0.15, 0.50, 0.95],
    [1, 0.9, 0.7]
  );

  return (
    <>
      <Hero />
      <main className="relative">
        <motion.div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{ opacity: bgOpacity }}
        >
          <CyberBg />
        </motion.div>
        {/* Ambient red glows across the page (not in hero/footer) */}
        <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
          <div className="absolute top-[22%] right-[4%] h-[520px] w-[520px]" style={{ background: 'radial-gradient(circle at 60% 40%, rgba(230,57,70,0.08) 0%, transparent 70%)', filter: 'blur(80px)' }} />
          <div className="absolute top-[40%] left-[8%] h-[480px] w-[480px]" style={{ background: 'radial-gradient(circle at 40% 50%, rgba(220,50,80,0.06) 0%, transparent 70%)', filter: 'blur(90px)' }} />
          <div className="absolute top-[58%] right-[10%] h-[500px] w-[500px]" style={{ background: 'radial-gradient(circle at 50% 40%, rgba(230,57,70,0.07) 0%, transparent 70%)', filter: 'blur(85px)' }} />
          <div className="absolute top-[76%] left-[15%] h-[440px] w-[440px]" style={{ background: 'radial-gradient(circle at 45% 50%, rgba(220,50,80,0.05) 0%, transparent 70%)', filter: 'blur(75px)' }} />
        </div>
        <div className="relative z-10">
          <About />
          <Skills />
          <Projects />
          <Certifications />
          <Achievements />
          <EventsContests />
          <Footer />
        </div>
      </main>
    </>
  );
};

export default HomePage;
