import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Contact', href: '#contact' }
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b px-6 py-4 backdrop-blur-md transition-all duration-300 ${
        scrolled
          ? 'border-white/10 bg-pitch/80 shadow-[0_0_40px_rgba(0,0,0,0.5)]'
          : 'border-transparent bg-transparent'
      }`}
      initial={{ y: -48, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="font-mono text-xs uppercase tracking-[0.25em] text-primary/90 transition hover:text-primary"
      >
        Renu Alias
      </button>

      <div className="hidden items-center gap-8 md:flex">
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="group relative font-mono text-[0.65rem] uppercase tracking-[0.25em] text-muted transition hover:text-primary"
          >
            {item.label}
            <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
          </a>
        ))}
      </div>
    </motion.nav>
  );
};

export default Navbar;
