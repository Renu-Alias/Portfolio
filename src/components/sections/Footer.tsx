import { motion } from 'framer-motion';
import Card from '../shared/Card';

const links = [
  { label: 'Email', value: 'renualiasmeleth@gmail.com', href: 'mailto:renualiasmeleth@gmail.com' },
  { label: 'GitHub', value: '/Renu-Alias', href: 'https://github.com/Renu-Alias' },
  { label: 'LinkedIn', value: '/in/renu-alias', href: 'https://www.linkedin.com/in/renu-alias-0022a2329/' }
];

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const Footer = () => (
  <motion.section
    id="contact"
    className="relative overflow-hidden mx-auto max-w-container px-6 py-section"
    variants={sectionVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.15 }}
  >
    <motion.div
      className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full"
      style={{ background: 'radial-gradient(circle,rgba(230,57,70,0.12)_0%,transparent_60%)' }}
      animate={{ scale: [1, 1.06, 1], opacity: [0.8, 1, 0.8] }}
      transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
    />

    <div className="relative z-10 mx-auto max-w-4xl text-center">
      <h2 className="font-display text-display-section font-bold text-primary">
        LET&apos;S ARCHITECT
        <br />
        THE FUTURE.
      </h2>

      <p className="mt-4 font-mono text-sm text-muted">
        Based in Kochi, India
      </p>

      <div className="mt-12 grid gap-4 sm:grid-cols-3">
        {links.map((link) => (
          <Card key={link.label}>
            <a href={link.href} target="_blank" rel="noreferrer" className="block text-left">
              <p className="font-mono text-label text-accent">{link.label}</p>
              <p className="mt-2 font-mono text-sm text-accent transition break-all">
                {link.value}
              </p>
            </a>
          </Card>
        ))}
      </div>

      <p className="mt-16 font-mono text-[0.6rem] uppercase tracking-[0.3em] text-muted">
        &copy; {new Date().getFullYear()} Renu Alias
      </p>
    </div>
  </motion.section>
);

export default Footer;
