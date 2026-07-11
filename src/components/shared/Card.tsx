import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useRef, useState, useEffect, type ReactNode, type MouseEvent } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

const Card = ({ children, className = '' }: CardProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useTransform(mouseY, [0, 1], [6, -6]);
  const rotateY = useTransform(mouseX, [0, 1], [-6, 6]);
  const shadowX = useTransform(mouseX, [0, 1], [12, -12]);
  const shadowY = useTransform(mouseY, [0, 1], [-12, 12]);

  const boxShadow = useTransform(() => {
    const sx = shadowX.get();
    const sy = shadowY.get();
    return `${sx}px ${sy}px 28px rgba(230,57,70,0.07)`;
  });

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current || isTouch) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const reset = () => {
    if (isTouch) return;
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={isTouch ? {} : { rotateX, rotateY, perspective: 800, boxShadow }}
      className={`group rounded-2xl border border-white/10 bg-white/[0.02] p-4 sm:p-6 backdrop-blur-sm transition-all duration-400 hover:-translate-y-1 hover:border-accent hover:shadow-card-hover ${className}`}
      whileTap={{ scale: 0.97 }}
    >
      {children}
    </motion.div>
  );
};

export default Card;
