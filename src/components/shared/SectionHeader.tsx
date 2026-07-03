import { motion } from 'framer-motion';

interface SectionHeaderProps {
  num: string;
  title: string;
}

const SectionHeader = ({ num, title }: SectionHeaderProps) => (
  <div className="mb-16">
    <div className="mb-4 flex items-center gap-6">
      <motion.span
        className="font-mono text-xs uppercase tracking-[0.2em] text-accent"
        initial={{ opacity: 0, x: -8 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        // {num}.
      </motion.span>
      <motion.span
        className="h-px flex-1 bg-white/10"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
    <motion.h2
      className="font-display text-display-section font-bold text-primary"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
    >
      {title}
    </motion.h2>
  </div>
);

export default SectionHeader;
