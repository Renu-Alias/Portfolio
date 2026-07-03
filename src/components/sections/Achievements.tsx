import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import SectionHeader from '../shared/SectionHeader';
import Card from '../shared/Card';

const milestones = [
  {
    title: 'Kochi Hackathon Champion',
    date: '2025',
    description: 'Led a team to build a production-ready web app that won Best System Architecture.'
  },
  {
    title: 'AI Systems Sprint',
    date: '2024',
    description: 'Designed a retrieval-augmented workflow for smarter decision-making in enterprise apps.'
  },
  {
    title: 'Open Source Contributor',
    date: '2023',
    description: 'Published reusable tools for React and cloud automation with a focus on reliability and performance.'
  }
];

const Achievements = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start center', 'end center']
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="achievements" className="mx-auto max-w-container px-6 py-section">
      <SectionHeader num="05" title="Achievements" />

      <div ref={ref} className="relative">
        <div className="absolute left-[1.125rem] top-8 bottom-8 w-px bg-white/10" />
        <motion.div
          className="absolute left-[1.125rem] top-8 w-px origin-top bg-accent"
          style={{ scaleY: lineScale, boxShadow: '0 0 12px rgba(230,57,70,0.5)' }}
        />

        <div className="relative space-y-12 pl-12">
          {milestones.map((m, i) => (
            <div key={m.title} className="relative">
              <motion.div
                className="absolute -left-[2.05rem] top-7 h-4 w-4 rounded-full bg-accent shadow-[0_0_12px_rgba(230,57,70,0.5)] node-pulse"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: i * 0.2, ease: [0.16, 1, 0.3, 1] }}
                style={{ animationDelay: `${i * 0.4}s` }}
              />
              <Card delay={i * 0.15}>
                <p className="font-mono text-label text-accent">{m.date}</p>
                <h3 className="mt-2 font-display text-display-card font-bold text-primary">
                  {m.title}
                </h3>
                <p className="mt-3 font-mono text-body text-muted leading-relaxed">
                  {m.description}
                </p>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
