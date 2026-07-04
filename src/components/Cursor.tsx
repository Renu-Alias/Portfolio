import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const DISTANCE = 18;
const COLLAPSED = 3;
const interactiveSelectors = ['a', 'button', 'input', 'textarea', 'select', '[role="button"]'];

const Cursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const hoveringRef = useRef(false);
  const rafRef = useRef<number>(0);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const topX = useSpring(useMotionValue(-100), { stiffness: 160, damping: 14 });
  const topY = useSpring(useMotionValue(-100), { stiffness: 160, damping: 14 });
  const bottomX = useSpring(useMotionValue(-100), { stiffness: 160, damping: 14 });
  const bottomY = useSpring(useMotionValue(-100), { stiffness: 160, damping: 14 });
  const leftX = useSpring(useMotionValue(-100), { stiffness: 160, damping: 14 });
  const leftY = useSpring(useMotionValue(-100), { stiffness: 160, damping: 14 });
  const rightX = useSpring(useMotionValue(-100), { stiffness: 160, damping: 14 });
  const rightY = useSpring(useMotionValue(-100), { stiffness: 160, damping: 14 });

  const targetTopX = useRef(-100);
  const targetTopY = useRef(-100);
  const targetBottomX = useRef(-100);
  const targetBottomY = useRef(-100);
  const targetLeftX = useRef(-100);
  const targetLeftY = useRef(-100);
  const targetRightX = useRef(-100);
  const targetRightY = useRef(-100);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const dist = hoveringRef.current ? COLLAPSED : DISTANCE;

      targetTopX.current = e.clientX;
      targetTopY.current = e.clientY - dist;
      targetBottomX.current = e.clientX;
      targetBottomY.current = e.clientY + dist;
      targetLeftX.current = e.clientX - dist;
      targetLeftY.current = e.clientY;
      targetRightX.current = e.clientX + dist;
      targetRightY.current = e.clientY;
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  useEffect(() => {
    const loop = () => {
      topX.set(targetTopX.current);
      topY.set(targetTopY.current);
      bottomX.set(targetBottomX.current);
      bottomY.set(targetBottomY.current);
      leftX.set(targetLeftX.current);
      leftY.set(targetLeftY.current);
      rightX.set(targetRightX.current);
      rightY.set(targetRightY.current);
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  useEffect(() => {
    hoveringRef.current = isHovering;
  }, [isHovering]);

  useEffect(() => {
    const handleMouseOver = () => setIsHovering(true);
    const handleMouseOut = () => setIsHovering(false);

    const updateListeners = () => {
      document.querySelectorAll(interactiveSelectors.join(',')).forEach((el) => {
        el.addEventListener('mouseover', handleMouseOver);
        el.addEventListener('mouseout', handleMouseOut);
      });
    };

    updateListeners();
    const observer = new MutationObserver(updateListeners);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => {
      observer.disconnect();
      document.querySelectorAll(interactiveSelectors.join(',')).forEach((el) => {
        el.removeEventListener('mouseover', handleMouseOver);
        el.removeEventListener('mouseout', handleMouseOut);
      });
    };
  }, []);

  return (
    <>
      <motion.svg
        className="pointer-events-none fixed inset-0 z-[9999]"
        style={{ width: '100%', height: '100%' }}
      >
        <motion.line
          x1={mouseX}
          y1={mouseY}
          x2={topX}
          y2={topY}
          stroke={isHovering ? '#E63946' : 'rgba(245,245,245,0.4)'}
          strokeWidth={1}
          strokeLinecap="round"
        />
        <motion.line
          x1={mouseX}
          y1={mouseY}
          x2={bottomX}
          y2={bottomY}
          stroke={isHovering ? '#E63946' : 'rgba(245,245,245,0.4)'}
          strokeWidth={1}
          strokeLinecap="round"
        />
        <motion.line
          x1={mouseX}
          y1={mouseY}
          x2={leftX}
          y2={leftY}
          stroke={isHovering ? '#E63946' : 'rgba(245,245,245,0.4)'}
          strokeWidth={1}
          strokeLinecap="round"
        />
        <motion.line
          x1={mouseX}
          y1={mouseY}
          x2={rightX}
          y2={rightY}
          stroke={isHovering ? '#E63946' : 'rgba(245,245,245,0.4)'}
          strokeWidth={1}
          strokeLinecap="round"
        />
      </motion.svg>

      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999]"
        style={{ x: topX, y: topY }}
      >
        <div
          className={`-translate-x-1/2 -translate-y-1/2 h-2 w-2 border transition-colors duration-300 ${
            isHovering ? 'border-accent bg-accent/20' : 'border-white/70'
          }`}
        />
      </motion.div>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999]"
        style={{ x: bottomX, y: bottomY }}
      >
        <div
          className={`-translate-x-1/2 -translate-y-1/2 h-2 w-2 border transition-colors duration-300 ${
            isHovering ? 'border-accent bg-accent/20' : 'border-white/70'
          }`}
        />
      </motion.div>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999]"
        style={{ x: leftX, y: leftY }}
      >
        <div
          className={`-translate-x-1/2 -translate-y-1/2 h-2 w-2 border transition-colors duration-300 ${
            isHovering ? 'border-accent bg-accent/20' : 'border-white/70'
          }`}
        />
      </motion.div>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999]"
        style={{ x: rightX, y: rightY }}
      >
        <div
          className={`-translate-x-1/2 -translate-y-1/2 h-2 w-2 border transition-colors duration-300 ${
            isHovering ? 'border-accent bg-accent/20' : 'border-white/70'
          }`}
        />
      </motion.div>

      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-[3px] w-[3px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent"
        style={{ x: mouseX, y: mouseY }}
      />
    </>
  );
};

export default Cursor;
