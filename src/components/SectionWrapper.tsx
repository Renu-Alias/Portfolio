import { motion } from 'framer-motion';
import { type ReactNode } from 'react';

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
}

const SectionWrapper = ({ children, className = '' }: SectionWrapperProps) => (
  <div className="relative">
    <motion.div
      className="h-px w-full bg-white/[0.05] origin-left mb-6"
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    />
    <motion.div
      className={`rounded-[1.5rem] border border-white/[0.04] bg-[#09090B]/80 p-8 backdrop-blur-md shadow-soft sm:p-10 ${className}`}
      initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  </div>
);

export default SectionWrapper;
