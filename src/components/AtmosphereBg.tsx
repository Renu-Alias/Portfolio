import { useEffect, useRef } from 'react';

const ENGINEERING_BLUE = '#E63946';
const WHITE = '#FFFFFF';

interface Mote {
  x: number; y: number;
  vx: number; vy: number;
  size: number;
  alpha: number;
}

const MAX_MOTES = 60;

function genMotes(w: number, h: number): Mote[] {
  const motes: Mote[] = [];
  for (let i = 0; i < MAX_MOTES; i++) {
    motes.push({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.12,
      vy: -(0.08 + Math.random() * 0.15),
      size: 0.8 + Math.random() * 1.4,
      alpha: 0.02 + Math.random() * 0.06,
    });
  }
  return motes;
}

const AtmosphereBg = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const cvs: HTMLCanvasElement = canvas;
    const c: CanvasRenderingContext2D = ctx;
    let w = 0, h = 0, dpr = 1;
    let animId = 0;
    let running = true;
    let frameCount = 0;
    const frameSkip = window.innerWidth < 768 ? 3 : 1;
    let motes: Mote[] = [];
    let time = 0;

    /* light source positions — drift slowly */
    let lx1 = 0.7, ly1 = 0.9;
    let lx2 = 0.3, ly2 = 0.1;
    let lx3 = 0.5, ly3 = 0.5;

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      cvs.width = w * dpr;
      cvs.height = h * dpr;
      cvs.style.width = w + 'px';
      cvs.style.height = h + 'px';
      c.setTransform(dpr, 0, 0, dpr, 0, 0);
      motes = genMotes(w, h);
    }
    resize();

    function drawLight(x: number, y: number, radius: number, color: string, peakAlpha: number) {
      const grad = c.createRadialGradient(x, y, 0, x, y, radius);
      grad.addColorStop(0, color.replace('1)', `${peakAlpha})`));
      grad.addColorStop(0.4, color.replace('1)', `${peakAlpha * 0.35})`));
      grad.addColorStop(1, color.replace('1)', '0)'));
      c.fillStyle = grad;
      c.fillRect(0, 0, w, h);
    }

    function frame(now: number) {
      if (!running) return;
      frameCount++;
      if (frameCount % frameSkip !== 0) {
        animId = requestAnimationFrame(frame);
        return;
      }

      time += 0.002;

      /* drift light sources */
      lx1 = 0.7 + Math.sin(time * 0.3) * 0.08;
      ly1 = 0.9 + Math.cos(time * 0.25) * 0.06;
      lx2 = 0.3 + Math.sin(time * 0.2 + 1) * 0.08;
      ly2 = 0.1 + Math.cos(time * 0.28 + 1) * 0.06;
      lx3 = 0.5 + Math.sin(time * 0.15 + 2) * 0.1;
      ly3 = 0.5 + Math.cos(time * 0.22 + 2) * 0.08;

      c.fillStyle = '#050505';
      c.fillRect(0, 0, w, h);

      /* light source 1 — warm red from bottom-right */
      drawLight(lx1 * w, ly1 * h, Math.max(w, h) * 0.7, 'rgba(230,57,70,1)', 0.035);

      /* light source 2 — cool white from top-left */
      drawLight(lx2 * w, ly2 * h, Math.max(w, h) * 0.55, 'rgba(245,245,245,1)', 0.025);

      /* light source 3 — soft mid red */
      drawLight(lx3 * w, ly3 * h, Math.max(w, h) * 0.5, 'rgba(200,50,60,1)', 0.02);

      /* vignette — darken edges */
      const vigGrad = c.createRadialGradient(w * 0.5, h * 0.5, Math.min(w, h) * 0.2, w * 0.5, h * 0.5, Math.max(w, h) * 0.8);
      vigGrad.addColorStop(0, 'rgba(0,0,0,0)');
      vigGrad.addColorStop(1, 'rgba(0,0,0,0.25)');
      c.fillStyle = vigGrad;
      c.fillRect(0, 0, w, h);

      /* dust motes */
      for (const m of motes) {
        m.x += m.vx;
        m.y += m.vy;
        if (m.y < -10) { m.y = h + 10; m.x = Math.random() * w; }
        if (m.x < -10) m.x = w + 10;
        if (m.x > w + 10) m.x = -10;

        c.beginPath();
        c.arc(m.x, m.y, m.size, 0, Math.PI * 2);
        c.fillStyle = `rgba(245,245,245,${m.alpha})`;
        c.fill();
      }

      animId = requestAnimationFrame(frame);
    }

    animId = requestAnimationFrame(frame);

    const onResize = () => resize();
    const onVis = () => {
      running = !document.hidden;
      if (running) animId = requestAnimationFrame(frame);
    };
    window.addEventListener('resize', onResize);
    document.addEventListener('visibilitychange', onVis);

    return () => {
      running = false;
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none select-none"
      style={{ zIndex: -1 }}
    />
  );
};

export default AtmosphereBg;
