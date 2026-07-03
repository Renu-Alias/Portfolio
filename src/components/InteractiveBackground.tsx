import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  baseAlpha: number;
}

const InteractiveBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const prevPointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let rafId = 0;
    const particles: Particle[] = [];
    const PARTICLE_COUNT = 60;
    const MAGNETIC_RADIUS = 150;

    const resize = () => {
      width = canvas.clientWidth * window.devicePixelRatio;
      height = canvas.clientHeight * window.devicePixelRatio;
      canvas.width = width;
      canvas.height = height;
      ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
    };

    const initParticles = () => {
      const w = canvas!.clientWidth;
      const h = canvas!.clientHeight;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          size: Math.random() * 1.5 + 0.5,
          alpha: 0,
          baseAlpha: Math.random() * 0.25 + 0.05
        });
      }
    };

    const draw = () => {
      if (!ctx) return;
      const w = canvas!.clientWidth;
      const h = canvas!.clientHeight;

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, width, height);

      const px = pointer.current.x;
      const py = pointer.current.y;
      const dx = px - prevPointer.current.x;
      const dy = py - prevPointer.current.y;
      const speed = Math.sqrt(dx * dx + dy * dy);
      prevPointer.current = { x: px, y: py };

      /* ---- Magnetic distortion field (150px radius) ---- */
      for (const p of particles) {
        const distX = p.x - px;
        const distY = p.y - py;
        const dist = Math.sqrt(distX * distX + distY * distY);

        if (dist < MAGNETIC_RADIUS && dist > 1) {
          const normalizedForce = 1 - dist / MAGNETIC_RADIUS;
          const angle = Math.atan2(distY, distX);

          /* Repulsion force — pushes particles away */
          const repel = normalizedForce * 0.04;
          p.vx += Math.cos(angle) * repel;
          p.vy += Math.sin(angle) * repel;

          /* Vortex spin — perpendicular orbital motion */
          const spin = normalizedForce * Math.min(speed * 0.008, 0.5);
          p.vx += (-distY / dist) * spin;
          p.vy += (distX / dist) * spin;

          /* Brighten within field */
          p.alpha = p.baseAlpha + normalizedForce * 0.35;
        } else {
          p.alpha += (p.baseAlpha - p.alpha) * 0.03;
        }

        p.vx += (Math.random() - 0.5) * 0.008;
        p.vy += (Math.random() - 0.5) * 0.008;
        p.vx *= 0.97;
        p.vy *= 0.97;
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${Math.max(0, Math.min(p.alpha, 0.4))})`;
        ctx.fill();
      }

      /* ---- Subtle grid ---- */
      const grid = 80;
      const gridOffsetX = ((px / w) - 0.5) * 12;
      const gridOffsetY = ((py / h) - 0.5) * 12;

      ctx.strokeStyle = 'rgba(255,255,255,0.03)';
      ctx.lineWidth = 0.5;

      for (let x = 0; x <= w; x += grid) {
        ctx.beginPath();
        const waveAmp = 4 + speed * 0.03;
        ctx.moveTo(x + Math.sin((x + px) * 0.007) * waveAmp + gridOffsetX, 0);
        ctx.lineTo(x + Math.sin((x + px) * 0.007) * waveAmp + gridOffsetX, h);
        ctx.stroke();
      }

      for (let y = 0; y <= h; y += grid) {
        ctx.beginPath();
        const waveAmp2 = 4 + speed * 0.03;
        ctx.moveTo(0, y + Math.cos((y + py) * 0.007) * waveAmp2 + gridOffsetY);
        ctx.lineTo(w, y + Math.cos((y + py) * 0.007) * waveAmp2 + gridOffsetY);
        ctx.stroke();
      }

      /* ---- 150px crimson distortion field ---- */
      const distortionGlow = ctx.createRadialGradient(px, py, 0, px, py, MAGNETIC_RADIUS);
      distortionGlow.addColorStop(0, `rgba(229, 9, 20, ${0.06 + speed * 0.0015})`);
      distortionGlow.addColorStop(0.6, `rgba(229, 9, 20, ${0.03 + speed * 0.0008})`);
      distortionGlow.addColorStop(1, 'rgba(229, 9, 20, 0)');
      ctx.fillStyle = distortionGlow;
      ctx.fillRect(0, 0, w, h);

      /* ---- Wider ambient glow ---- */
      const ambientGlow = ctx.createRadialGradient(px, py, 0, px, py, MAGNETIC_RADIUS * 2);
      ambientGlow.addColorStop(0, `rgba(229, 9, 20, ${0.02 + speed * 0.0005})`);
      ambientGlow.addColorStop(1, 'rgba(229, 9, 20, 0)');
      ctx.fillStyle = ambientGlow;
      ctx.fillRect(0, 0, w, h);

      rafId = requestAnimationFrame(draw);
    };

    const handleMove = (event: MouseEvent) => {
      pointer.current = { x: event.clientX, y: event.clientY };
    };

    resize();
    initParticles();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMove);
    rafId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 -z-10 h-full w-full opacity-80" />;
};

export default InteractiveBackground;
