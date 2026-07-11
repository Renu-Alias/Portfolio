import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import SectionHeader from '../shared/SectionHeader';
import Card from '../shared/Card';

interface Cert {
  id: string;
  title: string;
  issuer: string;
  issuerShort: string;
  date: string;
  category: 'ai-cloud' | 'foundational';
}

const certs: Cert[] = [
  { id: '1', title: 'Claude 101', issuer: 'Anthropic', issuerShort: 'Anthropic', date: 'Jan 2025', category: 'ai-cloud' },
  { id: '2', title: 'Claude Code 101', issuer: 'Anthropic', issuerShort: 'Anthropic', date: 'June 2026', category: 'ai-cloud' },
  { id: '3', title: 'Getting Started with AWS Cloud Essentials', issuer: 'Amazon Web Services', issuerShort: 'AWS', date: 'June 2026', category: 'ai-cloud' },
  { id: '4', title: 'Java (Basic)', issuer: 'HackerRank', issuerShort: 'HackerRank', date: 'June 2025', category: 'foundational' },
  { id: '5', title: 'SQL (Basic)', issuer: 'HackerRank', issuerShort: 'HackerRank', date: 'May 2024', category: 'foundational' },
  { id: '6', title: 'Programming in Java', issuer: 'NPTEL', issuerShort: 'NPTEL', date: 'Oct 2024', category: 'foundational' },
];

const certImages: Record<string, string> = {
  '1': '/certificates/1.png',
  '2': '/certificates/2.png',
  '3': '/certificates/3.png',
  '4': '/certificates/4.png',
  '5': '/certificates/5.png',
  '6': '/certificates/6.png',
};

const AnthropicLogo = () => (
  <svg role="img" viewBox="0 0 24 24" className="h-6 w-6 shrink-0" fill="#FFFFFF" xmlns="http://www.w3.org/2000/svg">
    <title>Anthropic</title>
    <path d="M17.3041 3.541h-3.6718l6.696 16.918H24Zm-10.6082 0L0 20.459h3.7442l1.3693-3.5527h7.0052l1.3693 3.5528h3.7442L10.5363 3.5409Zm-.3712 10.2232 2.2914-5.9456 2.2914 5.9456Z" />
  </svg>
);

const AWSLogo = () => (
  <svg viewBox="0 0 304 120" className="h-5 w-12 shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill="#252F3E" d="M86.4 66.4c0 3.7.4 6.7 1.1 8.9.8 2.2 1.8 4.6 3.2 7.2.5.8.7 1.6.7 2.3 0 1-.6 2-1.9 3l-6.3 4.2c-.9.6-1.8.9-2.6.9-1 0-2-.5-3-1.4C76.2 90 75 88.4 74 86.8c-1-1.7-2-3.6-3.1-5.9-7.8 9.2-17.6 13.8-29.4 13.8-8.4 0-15.1-2.4-20-7.2-4.9-4.8-7.4-11.2-7.4-19.2 0-8.5 3-15.4 9.1-20.6 6.1-5.2 14.2-7.8 24.5-7.8 3.4 0 6.9.3 10.6.8 3.7.5 7.5 1.3 11.5 2.2v-7.3c0-7.6-1.6-12.9-4.7-16-3.2-3.1-8.6-4.6-16.3-4.6-3.5 0-7.1.4-10.8 1.3-3.7.9-7.3 2-10.8 3.4-1.6.7-2.8 1.1-3.5 1.3-.7.2-1.2.3-1.6.3-1.4 0-2.1-1-2.1-3.1v-4.9c0-1.6.2-2.8.7-3.5.5-.7 1.4-1.4 2.8-2.1 3.5-1.8 7.7-3.3 12.6-4.5 4.9-1.3 10.1-1.9 15.6-1.9 11.9 0 20.6 2.7 26.2 8.1 5.5 5.4 8.3 13.6 8.3 24.6V66.4zM45.8 81.6c3.3 0 6.7-.6 10.3-1.8 3.6-1.2 6.8-3.4 9.5-6.4 1.6-1.9 2.8-4 3.4-6.4.6-2.4 1-5.3 1-8.7v-4.2c-2.9-.7-6-1.3-9.2-1.7-3.2-.4-6.3-.6-9.4-.6-6.7 0-11.6 1.3-14.9 4-3.3 2.7-4.9 6.5-4.9 11.5 0 4.7 1.2 8.2 3.7 10.6 2.5 2.4 6 3.7 10.6 3.7zM126.1 92.4c-1.8 0-3-.3-3.8-1-.8-.6-1.5-2-2.1-3.9L96.7 10.2c-.6-2-.9-3.3-.9-4 0-1.6.8-2.5 2.4-2.5h9.8c1.9 0 3.2.3 3.9 1 .8.6 1.4 2 2 3.9l16.8 66.2 15.6-66.2c.5-2 1.1-3.3 1.9-3.9.8-.6 2.2-1 4-1h8c1.9 0 3.2.3 4 1 .8.6 1.5 2 1.9 3.9l15.8 67 17.3-67c.6-2 1.3-3.3 2-3.9.8-.6 2.1-1 3.9-1h9.3c1.6 0 2.5.8 2.5 2.5 0 .5-.1 1-.2 1.6-.1.6-.3 1.4-.7 2.5l-24.1 77.3c-.6 2-1.3 3.3-2.1 3.9-.8.6-2.1 1-3.8 1h-8.6c-1.9 0-3.2-.3-4-1-.8-.7-1.5-2-1.9-4L156 23l-15.4 64.4c-.5 2-1.1 3.3-1.9 4-.8.7-2.2 1-4 1h-8.6zM254.6 95.1c-5.2 0-10.4-.6-15.4-1.8-5-1.2-8.9-2.5-11.5-4-1.6-.9-2.7-1.9-3.1-2.8-.4-.9-.6-1.9-.6-2.8v-5.1c0-2.1.8-3.1 2.3-3.1.6 0 1.2.1 1.8.3.6.2 1.5.6 2.5 1 3.4 1.5 7.1 2.7 11 3.5 4 .8 7.9 1.2 11.9 1.2 6.3 0 11.2-1.1 14.6-3.3 3.4-2.2 5.2-5.4 5.2-9.5 0-2.8-.9-5.1-2.7-7-1.8-1.9-5.2-3.6-10.1-5.2L246 52c-7.3-2.3-12.7-5.7-16-10.2-3.3-4.4-5-9.3-5-14.5 0-4.2.9-7.9 2.7-11.1 1.8-3.2 4.2-6 7.2-8.2 3-2.3 6.4-4 10.4-5.2 4-1.2 8.2-1.7 12.6-1.7 2.2 0 4.5.1 6.7.4 2.3.3 4.4.7 6.5 1.1 2 .5 3.9 1 5.7 1.6 1.8.6 3.2 1.2 4.2 1.8 1.4.8 2.4 1.6 3 2.5.6.8.9 1.9.9 3.3v4.7c0 2.1-.8 3.2-2.3 3.2-.8 0-2.1-.4-3.8-1.2-5.7-2.6-12.1-3.9-19.2-3.9-5.7 0-10.2.9-13.3 2.8-3.1 1.9-4.7 4.8-4.7 8.9 0 2.8 1 5.2 3 7.1 2 1.9 5.7 3.8 11 5.5l14.2 4.5c7.2 2.3 12.4 5.5 15.5 9.6 3.1 4.1 4.6 8.8 4.6 14 0 4.3-.9 8.2-2.6 11.6-1.8 3.4-4.2 6.4-7.3 8.8-3.1 2.5-6.8 4.3-11.1 5.6-4.2 1.3-8.9 2-14 2z"/>
    <path d="M273.5 143.7c-32.9 24.3-80.7 37.2-121.8 37.2-57.6 0-109.5-21.3-148.7-56.7-3.1-2.8-.3-6.6 3.4-4.4 42.4 24.6 94.7 39.5 148.8 39.5 36.5 0 76.6-7.6 113.5-23.2 5.7-2.6 10.4 3.5 5 7.5z" fill="#FF9900"/>
    <path d="M287.2 128.1c-4.2-5.4-27.8-2.6-38.5-1.3-3.2.4-3.7-2.4-.8-4.5 18.8-13.2 49.7-9.4 53.3-5 3.6 4.5-1 35.4-18.6 50.2-2.7 2.3-5.3 1.1-4.1-1.9 4.1-7.6 13-29.9 8.8-35.2z" fill="#FF9900"/>
  </svg>
);

const HackerRankLogo = () => (
  <svg viewBox="-1 -1 582 487" className="h-6 w-6 shrink-0" fill="#2ec866" xmlns="http://www.w3.org/2000/svg">
    <path d="M454.843 141.001c-13.019-22.417-172.832-115-198.859-115-26.019 0-185.895 92.351-198.84 115-12.947 22.649-13.019 207.358 0 230.009 13.018 22.639 172.839 114.989 198.84 114.989 26 0 185.841-92.466 198.851-114.999 13.007-22.533 13.016-207.583.008-229.999zM309.862 398.15c-3.559 0-36.756-32.137-34.141-34.762.781-.78 5.625-1.328 15.768-1.644 0-23.564.53-61.622.844-77.553.038-1.814-.395-3.081-.395-5.256h-71.812c0 6.379-.412 32.523 1.232 65.479.205 4.078-1.42 5.353-5.158 5.335-9.102-.025-18.211-.099-27.321-.071-3.683.009-5.274-1.374-5.157-5.488.826-30.043 2.66-75.488-.134-191.07v-2.849c-8.688-.314-14.717-.862-15.508-1.652-2.624-2.624 31.032-34.76 34.581-34.76 3.558 0 36.989 32.145 34.383 34.76-.782.781-7.098 1.338-15.067 1.652v2.84c-2.174 23.135-1.823 71.506-2.362 94.686h72.107c0-4.089.351-31.212-1.077-75.145-.091-3.047.853-4.646 3.781-4.672 9.945-.072 19.9-.117 29.855-.055 3.108.019 4.105 1.546 4.043 4.834-3.28 171.861-.594 159.867-.594 188.975 7.97.315 15.112.864 15.895 1.655 2.588 2.615-30.205 34.761-33.763 34.761z" />
  </svg>
);

const NPTELLogo = () => (
  <img
    src="https://cdn.brandfetch.io/id_7zyHL2W/w/400/h/400/theme/dark/icon.jpeg?c=1bxid64Mup7aczewSAYMX&t=1781744208280"
    alt="NPTEL"
    className="h-6 w-6 shrink-0 object-contain rounded-full"
  />
);

const IssuerLogo = ({ issuer }: { issuer: string }) => {
  switch (issuer) {
    case 'Anthropic': return <AnthropicLogo />;
    case 'Amazon Web Services': return <AWSLogo />;
    case 'HackerRank': return <HackerRankLogo />;
    case 'NPTEL': return <NPTELLogo />;
    default:
      return (
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/5">
          <span className="font-mono text-xs text-muted">{issuer[0]}</span>
        </div>
      );
  }
};

const isPdf = (path: string) => /\.pdf$/i.test(path);

const cardVariant = (i: number) => ({
  hidden: { opacity: 0, scale: 0.88, rotateX: 8 },
  visible: {
    opacity: 1, scale: 1, rotateX: 0,
    transition: { duration: 0.6, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }
  }
});

const Certifications = () => {
  const [modalId, setModalId] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setModalId(null);
    };
    if (modalId) window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [modalId]);

  const cert = certs.find(c => c.id === modalId);
  const imgSrc = modalId ? certImages[modalId] : '';

  return (
    <motion.section
      id="certifications"
      className="relative mx-auto max-w-container px-6 py-section"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
    >
      <SectionHeader num="04" title="Certifications" />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {certs.map((cert, i) => (
          <motion.div
            key={cert.id}
            variants={cardVariant(i)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="h-full"
          >
            <Card className="flex flex-col border-l-[3px] border-l-accent h-full w-full min-h-[180px]">
              {/* Issuer header */}
              <div className="flex items-center gap-3">
                <IssuerLogo issuer={cert.issuer} />
                <span className="font-mono text-sm text-muted">{cert.issuer}</span>
              </div>

              {/* Title */}
              <h3 className="mt-3 font-display text-display-card font-bold text-primary leading-snug">
                {cert.title}
              </h3>

              {/* Date */}
              <p className="mt-1 font-mono text-sm text-muted">
                Issued: {cert.date}
              </p>

              {/* Spacer */}
              <div className="flex-1" />

              {/* CTA */}
              <motion.button
                onClick={() => setModalId(cert.id)}
                className="group/cta mt-4 inline-flex items-center gap-2 self-start font-mono text-xs uppercase tracking-[0.25em] text-accent transition hover:text-primary"
              >
                View Certificate
                <motion.span
                  className="inline-block"
                  initial={false}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                >
                  →
                </motion.span>
              </motion.button>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modalId && cert && imgSrc && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/70 backdrop-blur-md"
              onClick={() => setModalId(null)}
            />

            {/* Modal content */}
            <motion.div
              ref={modalRef}
              className="relative max-h-[90vh] max-w-[90vw] overflow-hidden rounded-2xl border border-white/10 bg-pitch shadow-2xl"
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Close button */}
              <button
                onClick={() => setModalId(null)}
                className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-pitch/90 text-muted backdrop-blur-sm transition hover:border-accent/50 hover:text-accent"
                aria-label="Close"
              >
                <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M4 4l8 8M12 4l-8 8" />
                </svg>
              </button>

              {/* Certificate display */}
              {isPdf(imgSrc) ? (
                <embed src={imgSrc} type="application/pdf" className="max-h-[85vh] w-full" style={{ minHeight: '60vh' }} />
              ) : (
                <img
                  src={imgSrc}
                  alt={cert.title}
                  className="max-h-[85vh] w-auto object-contain"
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default Certifications;
