import { useEffect, useRef } from 'react';

const STAR_COUNT = 150;
const DEFAULT_RADIUS = 260;
const HOVER_RADIUS = 380;
const LERP_SPEED = 0.06;
const interactiveSelectors = ['a', 'button', 'input', 'textarea', 'select', '[role="button"]'];

const stars = Array.from({ length: STAR_COUNT }, (_, i) => ({
  x: ((i * 137.508) % 100),
  y: ((i * 89.724 + 37) % 100),
  size: 0.5 + (i % 3) * 0.5,
  opacity: 0.15 + ((i * 13) % 5) * 0.12,
}));

const Spotlight = () => {
  const maskRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);

  const mouseRef = useRef({ x: -200, y: -200 });
  const currentRadiusRef = useRef(DEFAULT_RADIUS);
  const targetRadiusRef = useRef(DEFAULT_RADIUS);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', onMouseMove);

    const loop = () => {
      const { x, y } = mouseRef.current;
      const target = targetRadiusRef.current;
      currentRadiusRef.current += (target - currentRadiusRef.current) * LERP_SPEED;
      const r = currentRadiusRef.current;

      const maskValue = `radial-gradient(circle ${r}px at ${x}px ${y}px, black 0%, transparent 65%)`;
      if (maskRef.current) {
        maskRef.current.style.webkitMaskImage = maskValue;
        maskRef.current.style.maskImage = maskValue;
      }
      if (glowRef.current) {
        glowRef.current.style.background =
          `radial-gradient(circle ${r * 0.65}px at ${x}px ${y}px, rgba(230,57,70,0.1) 0%, transparent 70%)`;
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  useEffect(() => {
    const onOver = () => { targetRadiusRef.current = HOVER_RADIUS; };
    const onOut = () => { targetRadiusRef.current = DEFAULT_RADIUS; };
    let debounceTimer: ReturnType<typeof setTimeout>;

    const attach = () => {
      document.querySelectorAll(interactiveSelectors.join(',')).forEach((el) => {
        el.addEventListener('mouseover', onOver);
        el.addEventListener('mouseout', onOut);
      });
    };
    attach();

    const observer = new MutationObserver(() => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(attach, 100);
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      clearTimeout(debounceTimer);
      document.querySelectorAll(interactiveSelectors.join(',')).forEach((el) => {
        el.removeEventListener('mouseover', onOver);
        el.removeEventListener('mouseout', onOut);
      });
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
      <div ref={maskRef} className="absolute inset-0 will-change-[mask-image]">
        {stars.map((s, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/40"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              opacity: s.opacity,
            }}
          />
        ))}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: [
              'linear-gradient(rgba(245,245,245,0.035) 1px, transparent 1px)',
              'linear-gradient(90deg, rgba(245,245,245,0.035) 1px, transparent 1px)',
            ].join(', '),
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      <div ref={glowRef} className="absolute inset-0 will-change-[background]" />

      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 120% 100% at 50% 50%, transparent 40%, rgba(5,5,5,0.3) 100%)',
        }}
      />
    </div>
  );
};

export default Spotlight;
