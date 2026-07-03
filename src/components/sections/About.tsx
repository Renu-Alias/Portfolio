import { motion } from 'framer-motion';
import SectionHeader from '../shared/SectionHeader';
import Card from '../shared/Card';

const About = () => (
  <section id="about" className="mx-auto max-w-container px-6 py-section">
    <SectionHeader num="01" title="About Me" />

    <div className="grid gap-10 lg:grid-cols-5">
      {/* Body copy */}
      <div className="lg:col-span-3">
        <motion.p
          className="font-mono text-body text-primary/85"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          A Kochi-based engineer combining full-stack development discipline with
          production-grade system thinking and AI-first innovation. Every product
          I build is designed for resilience, speed, and intuitive digital narratives.
        </motion.p>
        <motion.p
          className="mt-6 font-mono text-body text-primary/70"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          From cloud-native services to generative AI workflows, I create engineering
          experiences that feel cinematic and deliver measurable impact. Currently
          pursuing BTech in Computer Science at Kochi.
        </motion.p>
      </div>

      {/* Callout card */}
      <div className="lg:col-span-2">
        <Card>
          <p className="font-mono text-label text-accent">Studio Creed</p>
          <p className="mt-4 font-mono text-sm italic leading-relaxed text-primary/80">
            &ldquo;Architecture is not about software. It is about the people who use it,
            the systems that sustain it, and the future it enables.&rdquo;
          </p>
          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
              <p className="font-mono text-label text-accent">Focus</p>
              <p className="mt-1 font-mono text-xs uppercase tracking-[0.15em] text-primary/70">
                Full-Stack / AI Systems
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
              <p className="font-mono text-label text-accent">Approach</p>
              <p className="mt-1 font-mono text-xs uppercase tracking-[0.15em] text-primary/70">
                Product-First Engineering
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  </section>
);

export default About;
