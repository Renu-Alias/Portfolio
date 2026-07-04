import { motion } from 'framer-motion';
import Card from '../shared/Card';

const links = [
  { label: 'Email', value: 'renualiasmeleth@gmail.com', href: 'mailto:renualiasmeleth@gmail.com' },
  { label: 'GitHub', value: '/Renu-Alias', href: 'https://github.com/Renu-Alias' },
  { label: 'LinkedIn', value: '/in/renu-alias', href: 'https://www.linkedin.com/in/renu-alias-0022a2329/' }
];

const Footer = () => (
  <section
    id="contact"
    className="relative overflow-hidden mx-auto max-w-container px-6 py-section"
  >
    <motion.div
      className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full"
      style={{ background: 'radial-gradient(circle,rgba(230,57,70,0.12)_0%,transparent_60%)' }}
      animate={{ scale: [1, 1.06, 1], opacity: [0.8, 1, 0.8] }}
      transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
    />

    <div className="relative z-10 mx-auto max-w-4xl text-center">
      <motion.h2
        className="font-display text-display-section font-bold text-primary"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        LET&apos;S ARCHITECT
        <br />
        THE FUTURE.
      </motion.h2>

      <motion.p
        className="mt-4 font-mono text-sm text-muted"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Based in Kochi, India
      </motion.p>

      <div className="mt-12 grid gap-4 sm:grid-cols-3">
        {links.map((link) => (
          <Card key={link.label} delay={0.1}>
            <a href={link.href} target="_blank" rel="noreferrer" className="block text-left">
              <p className="font-mono text-label text-accent">{link.label}</p>
              <p className="mt-2 font-mono text-sm text-accent transition break-all">
                {link.value}
              </p>
            </a>
          </Card>
        ))}
      </div>

      <motion.p
        className="mt-16 font-mono text-[0.6rem] uppercase tracking-[0.3em] text-muted"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        &copy; {new Date().getFullYear()} Renu Alias
      </motion.p>
    </div>
  </section>
);

export default Footer;
