import { useEffect, useRef, useState } from 'react';

const LERP = 0.28;
const RING_SIZE = 36;
const TICK_LENGTH = 6;
const TICK_GAP = 3;
const interactiveSelectors = ['a', 'button', 'input', 'textarea', 'select', '[role="button"]'];

const TorusCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);
  const rafCoordRef = useRef(0);
  const mouseX = useRef(-100);
  const mouseY = useRef(-100);
  const posX = useRef(-100);
  const posY = useRef(-100);
  const coordRef = useRef<HTMLSpanElement>(null);
  const [state, setState] = useState<'idle' | 'hover' | 'click'>('idle');
  const stateRef = useRef<'idle' | 'hover' | 'click'>('idle');
  const [coords, setCoords] = useState({ x: 0, y: 0 });

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
    const loop = () => {
      setCoords({ x: Math.round(mouseX.current), y: Math.round(mouseY.current) });
      rafCoordRef.current = requestAnimationFrame(loop);
    };
    rafCoordRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafCoordRef.current);
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

  const isHover = state === 'hover';
  const isClick = state === 'click';
  const ringR = isClick ? 14 : isHover ? 12 : RING_SIZE / 2;
  const tickOffset = ringR + TICK_GAP;
  const tickLen = isHover ? 5 : TICK_LENGTH;
  const innerTickLen = 3;

  return (
    <>
      <style>{`
        .reticle-wrap {
          position: fixed; left: 0; top: 0;
          z-index: 9999; pointer-events: none;
          will-change: transform;
        }
        .reticle-svg {
          display: block;
          transition: filter 0.25s ease;
        }
        .reticle-ring {
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .reticle-tick {
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .reticle-dot {
          transition: transform 0.15s ease;
        }
        .reticle-corner {
          opacity: 0;
          transition: opacity 0.3s ease, transform 0.3s ease;
        }
        .reticle-corner.show {
          opacity: 0.8;
        }

        .reticle-coords {
          position: absolute;
          font-family: 'JetBrains Mono', 'Consolas', monospace;
          font-size: 10px;
          letter-spacing: 0.12em;
          color: #E63946;
          white-space: nowrap;
          pointer-events: none;
          user-select: none;
          transition: opacity 0.2s;
        }

        @keyframes shutter-flash {
          0%   { transform: scale(1); opacity: 1; }
          30%  { transform: scale(0.85); opacity: 0.6; }
          100% { transform: scale(1); opacity: 1; }
        }
        .reticle-svg.click {
          animation: shutter-flash 0.3s ease-out;
        }

        @keyframes af-lock {
          0%   { transform: rotate(0deg); }
          100% { transform: rotate(90deg); }
        }
        .reticle-corner.animate {
          animation: af-lock 0.4s ease-out;
        }

        @media (hover: none) and (pointer: coarse) {
          .reticle-wrap { display: none; }
        }
      `}</style>

      <div
        ref={cursorRef}
        className="reticle-wrap"
        style={{ transform: 'translate(-100px, -100px)' }}
      >
        <svg
          className={`reticle-svg ${isClick ? 'click' : ''}`}
          viewBox="-24 -24 48 48"
          width={48}
          height={48}
          style={{ filter: isHover ? 'drop-shadow(0 0 6px rgba(230,57,70,0.45))' : 'none' }}
        >
          <g fill="none" stroke="#E63946" strokeLinecap="round">

            {/* Outer ring */}
            <circle
              className="reticle-ring"
              cx="0" cy="0" r={ringR}
              strokeWidth={isHover ? 1.2 : 1}
              opacity={isHover ? 1 : 0.85}
            />

            {/* Tick marks — outer */}
            <line className="reticle-tick" x1="0" y1={-tickOffset} x2="0" y2={-tickOffset - tickLen} strokeWidth={1.2} />
            <line className="reticle-tick" x1="0" y1={tickOffset} x2="0" y2={tickOffset + tickLen} strokeWidth={1.2} />
            <line className="reticle-tick" x1={-tickOffset} y1="0" x2={-tickOffset - tickLen} y2="0" strokeWidth={1.2} />
            <line className="reticle-tick" x1={tickOffset} y1="0" x2={tickOffset + tickLen} y2="0" strokeWidth={1.2} />

            {/* Inner tick marks — extend inward from ring */}
            <line className="reticle-tick" x1="0" y1={-ringR} x2="0" y2={-ringR + innerTickLen} strokeWidth={0.8} opacity={0.5} />
            <line className="reticle-tick" x1="0" y1={ringR} x2="0" y2={ringR - innerTickLen} strokeWidth={0.8} opacity={0.5} />
            <line className="reticle-tick" x1={-ringR} y1="0" x2={-ringR + innerTickLen} y2="0" strokeWidth={0.8} opacity={0.5} />
            <line className="reticle-tick" x1={ringR} y1="0" x2={ringR - innerTickLen} y2="0" strokeWidth={0.8} opacity={0.5} />

            {/* Corner brackets — appear on hover (AF "focus lock" boxes) */}
            <g className={`reticle-corner ${isHover ? 'show' : ''}`}>
              {/* Top-left */}
              <path d={`M ${-ringR - 4} ${-ringR - 2} L ${-ringR - 4} ${-ringR - 6} L ${-ringR} ${-ringR - 6}`} strokeWidth={1.2} />
              <path d={`M ${-ringR - 4} ${-ringR + 4} L ${-ringR - 4} ${-ringR + 8} L ${-ringR} ${-ringR + 8}`} strokeWidth={1.2} />
              {/* Top-right */}
              <path d={`M ${ringR + 4} ${-ringR - 2} L ${ringR + 4} ${-ringR - 6} L ${ringR} ${-ringR - 6}`} strokeWidth={1.2} />
              <path d={`M ${ringR + 4} ${-ringR + 4} L ${ringR + 4} ${-ringR + 8} L ${ringR} ${-ringR + 8}`} strokeWidth={1.2} />
              {/* Bottom-left */}
              <path d={`M ${-ringR - 4} ${ringR + 2} L ${-ringR - 4} ${ringR + 6} L ${-ringR} ${ringR + 6}`} strokeWidth={1.2} />
              <path d={`M ${-ringR - 4} ${ringR - 4} L ${-ringR - 4} ${ringR - 8} L ${-ringR} ${ringR - 8}`} strokeWidth={1.2} />
              {/* Bottom-right */}
              <path d={`M ${ringR + 4} ${ringR + 2} L ${ringR + 4} ${ringR + 6} L ${ringR} ${ringR + 6}`} strokeWidth={1.2} />
              <path d={`M ${ringR + 4} ${ringR - 4} L ${ringR + 4} ${ringR - 8} L ${ringR} ${ringR - 8}`} strokeWidth={1.2} />
            </g>

          </g>
        </svg>

        {/* Center dot */}
        <div
          className="reticle-dot"
          style={{
            position: 'absolute', left: '50%', top: '50%',
            width: '3px', height: '3px',
            background: '#E63946', borderRadius: '50%',
            transform: `translate(-50%, -50%) scale(${isClick ? 0.6 : isHover ? 0.8 : 1})`,
            transition: 'transform 0.15s ease',
          }}
        />

        {/* Coordinate text */}
        <span
          ref={coordRef}
          className="reticle-coords"
          style={{
            left: `${RING_SIZE / 2 + 12}px`,
            top: `${RING_SIZE / 2 + 4}px`,
            opacity: isHover ? 0.9 : 0.5,
          }}
        >
          X: {coords.x} Y: {coords.y}
        </span>
      </div>
    </>
  );
};

export default TorusCursor;
