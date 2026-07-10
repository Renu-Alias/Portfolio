import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Skills from '../components/sections/Skills';
import Projects from '../components/sections/Projects';
import Certifications from '../components/sections/Certifications';
import Achievements from '../components/sections/Achievements';
import EventsContests from '../components/sections/EventsContests';
import Footer from '../components/sections/Footer';

const HomePage = () => (
  <>
    <Hero />
    <main>
      <About />
      <Skills />
      <Projects />
      <Certifications />
      <Achievements />
      <EventsContests />
      <Footer />
    </main>
  </>
);

export default HomePage;
