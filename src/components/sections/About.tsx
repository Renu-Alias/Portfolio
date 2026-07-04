import { motion } from 'framer-motion';
import SectionHeader from '../shared/SectionHeader';
import Card from '../shared/Card';

const About = () => (
  <section id="about" className="mx-auto max-w-container px-6 py-section">
    <SectionHeader num="01" title="About Me" />

    <div className="grid gap-10 lg:grid-cols-5">
      <div className="lg:col-span-3">
        <motion.p
          className="font-mono text-body text-primary/85"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          A BTech CS student who spends most of my time understanding how software
          systems work behind the scenes. While I&apos;ve worked across different
          areas of development, I naturally gravitate toward backend engineering,
          system design, and AI-powered applications.
        </motion.p>
        <motion.p
          className="mt-6 font-mono text-body text-primary/70"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          My toolkit spans Python, Java, JavaScript, and C. I build full-stack web
          applications, explore mobile development, and actively learn AI/ML concepts
          including RAG, LLMs, and scalable AI systems. I&apos;m driven by understanding
          not just how to build, but why systems are architected the way they are —
          from API design and databases to distributed backends and AI pipelines.
        </motion.p>
      </div>

      <div className="lg:col-span-2">
        <Card>
          <p className="font-mono text-label text-accent">Areas of Interest</p>
          <div className="mt-4 grid grid-cols-1 gap-3">
            <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
              <p className="font-mono text-label text-accent">01</p>
              <p className="mt-1 font-mono text-xs uppercase tracking-[0.15em] text-primary/70">
                Full-Stack Development
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
              <p className="font-mono text-label text-accent">02</p>
              <p className="mt-1 font-mono text-xs uppercase tracking-[0.15em] text-primary/70">
                System Design
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
              <p className="font-mono text-label text-accent">03</p>
              <p className="mt-1 font-mono text-xs uppercase tracking-[0.15em] text-primary/70">
                AI / Machine Learning
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  </section>
);

export default About;
