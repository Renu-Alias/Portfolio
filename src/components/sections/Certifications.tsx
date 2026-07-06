import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import SectionHeader from '../shared/SectionHeader';
import Card from '../shared/Card';
import SectionDecoration from '../shared/SectionDecoration';

const certs = [
  { id: '1', title: 'Claude 101', issuer: 'Anthropic' },
  { id: '2', title: 'Claude Code 101', issuer: 'Anthropic' },
  { id: '3', title: 'Getting Started with AWS Cloud Essentials', issuer: 'Amazon Web Services' },
  { id: '4', title: 'Java (Basic)', issuer: 'HackerRank' },
  { id: '5', title: 'SQL (Basic)', issuer: 'HackerRank' },
  { id: '6', title: 'Programming in Java', issuer: 'NPTEL' },
];

const certImages: Record<string, string> = {
  '1': '../public/certificates/1.png',
  '2': '../public/certificates/2.png',
  '3': '../public/certificates/3.png',
  '4': '../public/certificates/4.png',
  '5': '../public/certificates/5.png',
  '6': '../public/certificates/6.png'
};

const cardVariant = (i: number) => ({
  hidden: { opacity: 0, scale: 0.88, rotateX: 8 },
  visible: {
    opacity: 1, scale: 1, rotateX: 0,
    transition: { duration: 0.6, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }
  }
});

const Certifications = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <motion.section
      id="certifications"
      className="relative mx-auto max-w-container px-6 py-section"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
    >
      <SectionDecoration className="bottom-24 left-4" />
      <SectionHeader num="04" title="Certifications" />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {certs.map((cert, i) => (
          <motion.div
            key={cert.id}
            variants={cardVariant(i)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            <Card>
              <button
                onClick={() => setExpandedId(expandedId === cert.id ? null : cert.id)}
                className="w-full text-left"
              >
                <p className="font-mono text-label text-accent">Certification</p>
                <h3 className="mt-3 font-display text-display-card font-bold text-primary">
                  {cert.title}
                </h3>
                <p className="mt-2 font-mono text-sm text-muted">
                  Issued by {cert.issuer}
                </p>
                <span className="mt-4 inline-block font-mono text-xs uppercase tracking-[0.25em] text-accent">
                  {expandedId === cert.id ? 'Close' : 'View Certificate'}
                </span>
              </button>

              <AnimatePresence>
                {expandedId === cert.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 overflow-hidden rounded-xl border border-white/10">
                      <img
                        src={certImages[cert.id]}
                        alt={cert.title}
                        className="h-48 w-full object-cover"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default Certifications;
