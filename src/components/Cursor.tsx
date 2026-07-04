import { useEffect, useRef, useState } from 'react';

const LERP = 0.085;
const interactiveSelectors = ['a', 'button', 'input', 'textarea', 'select', '[role="button"]'];

const TorusCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);
  const mouseX = useRef(-100);
  const mouseY = useRef(-100);
  const posX = useRef(-100);
  const posY = useRef(-100);
  const [state, setState] = useState<'idle' | 'hover' | 'click'>('idle');
  const stateRef = useRef<'idle' | 'hover' | 'click'>('idle');

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;
    };
    const onMouseDown = () => {
      stateRef.current = 'click';
      setState('click');
    };
    const onMouseUp = () => {
      stateRef.current = stateRef.current === 'hover' ? 'hover' : 'idle';
      setState(stateRef.current);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    const loop = () => {
      posX.current += (mouseX.current - posX.current) * LERP;
      posY.current += (mouseY.current - posY.current) * LERP;
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${posX.current}px, ${posY.current}px)`;
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  useEffect(() => {
    const onOver = () => {
      if (stateRef.current !== 'click') {
        stateRef.current = 'hover';
        setState('hover');
      }
    };
    const onOut = () => {
      if (stateRef.current !== 'click') {
        stateRef.current = 'idle';
        setState('idle');
      }
    };

    const attach = () => {
      document.querySelectorAll(interactiveSelectors.join(',')).forEach((el) => {
        el.addEventListener('mouseover', onOver);
        el.addEventListener('mouseout', onOut);
      });
    };
    attach();
    const observer = new MutationObserver(attach);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      document.querySelectorAll(interactiveSelectors.join(',')).forEach((el) => {
        el.removeEventListener('mouseover', onOver);
        el.removeEventListener('mouseout', onOut);
      });
    };
  }, []);

  const scale = state === 'click' ? 0.85 : state === 'hover' ? 1.4 : 1;

  return (
    <>
      <style>{`
        .torus-wrap {
          position: fixed; left: 0; top: 0;
          z-index: 9999; pointer-events: none;
          will-change: transform;
        }
        .torus-scale {
          transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .torus-svg {
          display: block;
          animation: torus-rotate 7s linear infinite;
          filter: drop-shadow(0 0 5px rgba(196,30,58,0.5));
        }
        .torus-svg.hover {
          animation-duration: 2.2s;
        }
        @keyframes torus-rotate {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @media (hover: none) and (pointer: coarse) {
          .torus-wrap { display: none; }
        }
      `}</style>

      <div
        ref={cursorRef}
        className="torus-wrap"
        style={{ transform: 'translate(-100px, -100px)' }}
      >
        <div className="torus-scale" style={{ transform: `scale(${scale})` }}>
          <svg
            className={`torus-svg ${state === 'hover' ? 'hover' : ''}`}
            viewBox="-16 -16 32 32"
            width="32"
            height="32"
          >
            <g fill="none" stroke="#E63946" strokeLinecap="round" strokeLinejoin="round">
              {/* Outer ring silhouette */}
              <ellipse cx="0" cy="0" rx="14" ry="9" strokeWidth="1.2" />

              {/* Inner hole — shifted up for 3D perspective */}
              <ellipse cx="0" cy="-2.5" rx="7.5" ry="4" strokeWidth="1" opacity="0.9" />

              {/* Top meridian arc */}
              <path d="M -14 0 Q -7 -7 0 -7.5 Q 7 -7 14 0" strokeWidth="0.65" opacity="0.5" />

              {/* Bottom meridian arc (behind, dimmer) */}
              <path d="M -14 0 Q -7 7 0 7.5 Q 7 7 14 0" strokeWidth="0.65" opacity="0.25" />

              {/* Spokes — connect inner hole to outer edge */}
              <line x1="-7.5" y1="-4.5" x2="-14" y2="0" strokeWidth="0.6" opacity="0.55" />
              <line x1="7.5" y1="-4.5" x2="14" y2="0" strokeWidth="0.6" opacity="0.55" />
              <line x1="0" y1="-7.5" x2="0" y2="-9" strokeWidth="0.6" opacity="0.45" />
              <line x1="0" y1="1.5" x2="0" y2="9" strokeWidth="0.6" opacity="0.25" />
            </g>
          </svg>
        </div>
      </div>
    </>
  );
};

export default TorusCursor;
