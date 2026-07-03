import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section id="hero" className="relative flex min-h-screen snap-start items-center justify-center overflow-hidden bg-black px-6 pb-10 sm:px-16">
      {/* Layer 1 - Massive backdrop name (z-10) */}
      <div className="pointer-events-none absolute inset-0 z-10 flex select-none items-center justify-center">
        <motion.h1
          className="font-display font-bold leading-none text-[#FAFAFA] text-center"
          style={{ fontSize: 'clamp(4rem, 18vw, 18rem)' }}
          initial={{ opacity: 0, letterSpacing: '0.08em', scale: 0.96 }}
          animate={{ opacity: 1, letterSpacing: '0em', scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          RENU ALIAS
        </motion.h1>
      </div>

      {/* Layer 2 - Atmospheric vignette (z-12) */}
      <div className="pointer-events-none absolute inset-0 z-12 flex items-center justify-center">
        <div className="h-[70vh] w-[70vw] max-w-[900px] rounded-full bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.85)_0%,transparent_65%)]" />
      </div>

      {/* Layer 3 - Crimson glow behind portrait (z-20) */}
      <motion.div
        className="absolute z-20"
        initial={{ opacity: 0, scale: 0.64 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.18, ease: 'easeOut' }}
      >
        <div className="h-[540px] w-[540px] rounded-full bg-[radial-gradient(circle,rgba(229,9,20,0.42)_0%,rgba(229,9,20,0.12)_32%,transparent_70%)]" />
      </motion.div>

      {/* Layer 4 - Portrait (z-30) with 4-way alpha mask */}
      <motion.div
        className="absolute z-30"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.45, ease: 'easeOut' }}
      >
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80"
            alt="Renu Alias"
            className="h-[420px] w-[340px] object-cover sm:h-[520px] sm:w-[420px]"
            style={{
              maskImage:
                'linear-gradient(to top, transparent 0%, black 20%, black 80%, transparent 100%), linear-gradient(to right, transparent 0%, black 25%, black 75%, transparent 100%)',
              WebkitMaskImage:
                'linear-gradient(to top, transparent 0%, black 20%, black 80%, transparent 100%), linear-gradient(to right, transparent 0%, black 25%, black 75%, transparent 100%)',
              maskComposite: 'intersect',
              WebkitMaskComposite: 'source-in'
            }}
          />
        </div>
      </motion.div>

      {/* Micro-metadata aligned to edges (z-40) */}
      <div className="pointer-events-none absolute inset-x-0 bottom-6 z-40 flex items-end justify-between px-0 sm:px-16">
        <div className="space-y-1.5 pl-2 sm:pl-0">
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.35em] text-white/40">LOC</p>
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-white/80">[ // KOCHI, IN ]</p>
        </div>

        <div className="space-y-1.5 pr-2 sm:pr-0 text-right">
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.35em] text-white/40">ROLE</p>
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-white/80">[ // FULL-STACK // AI ]</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
