import { motion, useScroll, useSpring } from 'framer-motion';

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 80, damping: 30, mass: 0.5 });

  return (
    <motion.div
      className="fixed left-0 top-0 right-0 z-[9998] h-[2px] origin-left bg-accent"
      style={{ scaleX, boxShadow: '0 0 12px rgba(230,57,70,0.5)' }}
    />
  );
};

export default ScrollProgress;
