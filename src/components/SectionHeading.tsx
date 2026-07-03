import { motion } from 'framer-motion';

interface SectionHeadingProps {
  index: string;
  title: string;
}

const SectionHeading = ({ index, title }: SectionHeadingProps) => (
  <div className="mb-10 max-w-3xl">
    <div className="flex items-center gap-4 mb-3">
      <motion.span
        className="font-mono text-[0.65rem] tracking-[0.15em] text-crimson"
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        // {index}.
      </motion.span>
      <motion.span
        className="h-px flex-1 bg-white/[0.05] origin-left"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>

    <motion.h2
      className="font-heading text-3xl font-bold uppercase tracking-[0.2em] text-white sm:text-4xl"
      initial={{ opacity: 0, y: 14, letterSpacing: '0.35em' }}
      whileInView={{ opacity: 1, y: 0, letterSpacing: '0.2em' }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      {title.split(' ').map((word, wIdx) => (
        <span key={`${word}-${wIdx}`} className="inline-block mr-[0.25em]">
          {word.split('').map((char, cIdx) => (
            <motion.span
              key={`${char}-${cIdx}`}
              className="inline-block"
              initial={{ opacity: 0, y: 10, filter: 'blur(3px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.35, delay: 0.15 + wIdx * 0.08 + cIdx * 0.025 }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.h2>
  </div>
);

export default SectionHeading;
