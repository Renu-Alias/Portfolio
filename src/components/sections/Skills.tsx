import { motion } from 'framer-motion';
import SectionHeader from '../shared/SectionHeader';
import Card from '../shared/Card';

const categories = [
  {
    name: 'Languages',
    icon: '{ }',
    items: ['Python', 'C', 'C++', 'JavaScript', 'Java', 'Dart'],
    span: 'lg:col-span-2'
  },
  {
    name: 'Frameworks & Backend',
    icon: '</>',
    items: ['React', 'Flutter', 'Node.js', 'Express.js'],
    span: 'lg:col-span-2'
  },
  {
    name: 'Databases',
    icon: '🗄',
    items: ['PostgreSQL', 'Oracle', 'MySQL', 'MongoDB'],
    span: 'lg:col-span-1'
  },
  {
    name: 'Tools & Design',
    icon: '⚙',
    items: ['Linux', 'Git', 'GitHub', 'Canva', 'Figma'],
    span: 'lg:col-span-2'
  },
  {
    name: 'Infrastructure',
    icon: '☁',
    items: ['AWS', 'GCP', 'Vercel', 'Claude'],
    span: 'lg:col-span-1'
  },
  {
    name: 'Soft Skills',
    icon: '◆',
    items: ['Leadership', 'Collaboration', 'Adaptability', 'Problem-solving'],
    span: 'lg:col-span-3'
  }
];

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, delay: i * 0.04, ease: 'easeOut' }
  })
};

const Skills = () => (
  <section id="skills" className="mx-auto max-w-container px-6 py-section">
    <SectionHeader num="02" title="Skills" />

    <div className="grid gap-4 lg:grid-cols-4">
      {categories.map((cat) => (
        <Card key={cat.name} className={cat.span} delay={0.05}>
          <div className="flex items-center gap-3 mb-5">
            <span className="font-mono text-sm text-accent">{cat.icon}</span>
            <h3 className="font-mono text-label text-accent">{cat.name}</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {cat.items.map((item, i) => (
              <motion.span
                key={item}
                className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-xs text-primary/70 transition-all duration-300 hover:border-accent hover:text-primary hover:shadow-[0_0_16px_rgba(230,57,70,0.1)]"
                custom={i}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
              >
                {item}
              </motion.span>
            ))}
          </div>
        </Card>
      ))}
    </div>
  </section>
);

export default Skills;
