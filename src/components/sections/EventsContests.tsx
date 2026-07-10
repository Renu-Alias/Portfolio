import { AnimatePresence, motion } from 'framer-motion';
import { useRef, useState } from 'react';
import SectionHeader from '../shared/SectionHeader';

const events = [
  {
    type: 'Hackathon',
    name: 'Nexus AI Hackathon',
    date: '2026',
    description: 'A 16-hour hackathon focused on shipping production-ready applications with real-time collaboration and cross-functional team building.',
    hasCert: true
  },
  {
    type: 'Open Source Contribution',
    name: 'GirlScript Summer of Code',
    date: '2026',
    description: 'Attended talks on distributed systems, edge computing, and AI infrastructure from industry leaders across India.',
    hasCert: false
  },
  {
    type: 'Event',
    name: 'IEDC Techxcel',
    date: '2025',
    description: 'Hands-on workshop covering Docker orchestration, Kubernetes cluster management, and CI/CD pipeline deployment strategies.',
    hasCert: true
  },
  {
    type: 'Coding Contest',
    name: 'DSArena Coding Contest',
    date: '2025',
    description: 'Competitive debugging event with real-world codebase scenarios, time-constrained regression fixes, and peer review rounds.',
    hasCert: false
  },
  {
    type: 'Coding Contest',
    name: 'Ode to Code',
    date: '2025',
    description: 'Competitive debugging event with real-world codebase scenarios, time-constrained regression fixes, and peer review rounds.',
    hasCert: false
  },
  {
    type: 'Workshop',
    name: 'AI/ML Intensive',
    date: '2024',
    description: 'Deep-dive workshop on transformer architectures, fine-tuning LLMs, and deploying models to production endpoints.',
    hasCert: true
  }
  
];

const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }
  })
};

const EventsContests = () => {
  const [openCert, setOpenCert] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  };

  const scroll = (dir: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.6;
    el.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  return (
    <motion.section
      id="events"
      className="mx-auto max-w-container px-6 py-section overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
    >
      <SectionHeader num="06" title="Events & Contests" />

      <div className="relative">
        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-pitch to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-pitch to-transparent" />

        {/* Scroll buttons */}
        {canScrollLeft && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-2 top-1/2 z-20 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-pitch/80 text-muted backdrop-blur-sm transition hover:border-accent/50 hover:text-accent"
            aria-label="Scroll left"
          >
            <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M10 3l-5 5 5 5" />
            </svg>
          </button>
        )}
        {canScrollRight && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-2 top-1/2 z-20 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-pitch/80 text-muted backdrop-blur-sm transition hover:border-accent/50 hover:text-accent"
            aria-label="Scroll right"
          >
            <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M6 3l5 5-5 5" />
            </svg>
          </button>
        )}

        {/* Carousel track */}
        <div
          ref={scrollRef}
          onScroll={updateScrollState}
          className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {events.map((event, i) => (
            <motion.div
              key={event.name}
              custom={i}
              variants={cardVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              className="snap-start flex-shrink-0 w-[85vw] max-w-[380px]"
            >
              <div className="group relative h-full rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-sm transition-all duration-300 hover:border-accent/40 hover:bg-white/[0.04] hover:-translate-y-1">
                {/* Large year watermark */}
                <span className="absolute right-5 top-4 font-mono text-[3rem] font-bold leading-none text-white/[0.04] select-none pointer-events-none">
                  {event.date}
                </span>

                {/* Type label */}
                <span className="font-mono text-label text-accent">{event.type}</span>

                {/* Content */}
                <h3 className="mt-4 font-display text-display-card font-bold text-primary">
                  {event.name}
                </h3>
                <p className="mt-3 font-mono text-body text-muted leading-relaxed">
                  {event.description}
                </p>

                {/* Certificate toggle */}
                {event.hasCert && (
                  <div className="mt-5">
                    <button
                      onClick={() => setOpenCert(openCert === i ? null : i)}
                      className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-accent transition hover:text-primary"
                    >
                      <span className="h-px w-4 bg-accent/50" />
                      {openCert === i ? 'Hide' : 'Certificate'}
                    </button>

                    <AnimatePresence>
                      {openCert === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="mt-4 flex items-center gap-4 rounded-xl border border-white/10 bg-pitch p-4">
                            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg border border-accent/20 bg-accent/10">
                              <svg viewBox="0 0 24 24" className="h-6 w-6 text-accent" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 2l3 7h7l-5 5 2 7-7-4-7 4 2-7-5-5h7z" />
                              </svg>
                            </div>
                            <div>
                              <p className="font-mono text-xs font-medium text-primary">
                                Certificate of Achievement
                              </p>
                              <p className="mt-0.5 font-mono text-[0.6rem] text-muted">
                                {event.name} ({event.date})
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default EventsContests;
