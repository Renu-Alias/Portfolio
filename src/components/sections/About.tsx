import { motion } from 'framer-motion';
import SectionHeader from '../shared/SectionHeader';
import Card from '../shared/Card';

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } }
};

const itemLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
};

const itemRight = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
};

const interestItem = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
};

const About = () => (
  <motion.section
    id="about"
    className="mx-auto max-w-container px-4 sm:px-6 py-section"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.15 }}
  >
    <div className="relative z-10">
      <SectionHeader num="01" title="About Me" />
    </div>

    <motion.div
      className="grid gap-6 sm:gap-8 lg:gap-10 lg:grid-cols-5"
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
    >
      <motion.div className="lg:col-span-3" variants={itemLeft}>
        <p className="font-mono text-body text-primary/85">
          A BTech CS student who spends most of my time understanding how software
          systems work behind the scenes. While I&apos;ve worked across different
          areas of development, I naturally gravitate toward backend engineering,
          system design, and AI-powered applications.
        </p>
        <p className="mt-6 font-mono text-body text-primary/70">
          My toolkit spans Python, Java, JavaScript, and C. I build full-stack web
          applications, explore mobile development, and actively learn AI/ML concepts
          including RAG, LLMs, and scalable AI systems. I&apos;m driven by understanding
          not just how to build, but why systems are architected the way they are —
          from API design and databases to distributed backends and AI pipelines.
        </p>

        {/* Education — compact */}
        <div className="mt-8 border-t border-white/5 pt-6">
          <p className="font-mono text-label text-accent">Education</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.15em] text-muted">2024 – 2028</p>
              <p className="mt-1 font-mono text-sm text-primary/85">B.Tech CSE</p>
              <p className="font-mono text-[0.65rem] text-muted">APJ Abdul Kalam Technological University</p>
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.15em] text-muted">2022 – 2024</p>
              <p className="mt-1 font-mono text-sm text-primary/85">Higher Secondary (PCM)</p>
              <p className="font-mono text-[0.65rem] text-muted">Central Board of Secondary Education</p>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div className="lg:col-span-2" variants={itemRight}>
        <Card>
          <p className="font-mono text-label text-accent">Areas of Interest</p>
          <motion.div
            className="mt-4 grid grid-cols-1 gap-3"
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            <motion.div
              className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3"
              variants={interestItem}
            >
              <p className="font-mono text-label text-accent">01</p>
              <p className="mt-1 font-mono text-xs uppercase tracking-[0.15em] text-primary/70">
                Full-Stack Development
              </p>
            </motion.div>
            <motion.div
              className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3"
              variants={interestItem}
            >
              <p className="font-mono text-label text-accent">02</p>
              <p className="mt-1 font-mono text-xs uppercase tracking-[0.15em] text-primary/70">
                System Design
              </p>
            </motion.div>
            <motion.div
              className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3"
              variants={interestItem}
            >
              <p className="font-mono text-label text-accent">03</p>
              <p className="mt-1 font-mono text-xs uppercase tracking-[0.15em] text-primary/70">
                AI / Machine Learning
              </p>
            </motion.div>
          </motion.div>
        </Card>
      </motion.div>
    </motion.div>
  </motion.section>
);

export default About;
