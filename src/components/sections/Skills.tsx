import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import SectionHeader from '../shared/SectionHeader';
import SectionDecoration from '../shared/SectionDecoration';

type CategoryId = 'languages' | 'frameworks' | 'databases' | 'tools' | 'infrastructure' | 'soft';

interface SkillNode {
  name: string;
  category: CategoryId;
  x: number;
  y: number;
}

const categories: Record<CategoryId, { label: string; short: string }> = {
  languages: { label: 'Languages', short: 'Languages' },
  frameworks: { label: 'Frameworks & Backend', short: 'Frameworks' },
  databases: { label: 'Databases', short: 'Databases' },
  tools: { label: 'Tools & Design', short: 'Tools' },
  infrastructure: { label: 'Infrastructure', short: 'Infrastructure' },
  soft: { label: 'Soft Skills', short: 'Soft Skills' }
};

const categoryOrder: CategoryId[] = ['languages', 'frameworks', 'databases', 'tools', 'infrastructure', 'soft'];

const skillNodes: SkillNode[] = [
  { name: 'Python', category: 'languages', x: 13, y: 24 },
  { name: 'C', category: 'languages', x: 28, y: 14 },
  { name: 'C++', category: 'languages', x: 43, y: 26 },
  { name: 'JavaScript', category: 'languages', x: 61, y: 16 },
  { name: 'Java', category: 'languages', x: 80, y: 25 },
  { name: 'Dart', category: 'languages', x: 18, y: 48 },
  { name: 'HTML', category: 'languages', x: 37, y: 44 },
  { name: 'CSS', category: 'languages', x: 55, y: 43 },
  { name: 'React', category: 'frameworks', x: 72, y: 47 },
  { name: 'Flutter', category: 'frameworks', x: 86, y: 43 },
  { name: 'Node.js', category: 'frameworks', x: 66, y: 68 },
  { name: 'Express.js', category: 'frameworks', x: 83, y: 70 },
  { name: 'PostgreSQL', category: 'databases', x: 18, y: 73 },
  { name: 'Oracle', category: 'databases', x: 34, y: 66 },
  { name: 'MySQL', category: 'databases', x: 47, y: 78 },
  { name: 'MongoDB', category: 'databases', x: 31, y: 88 },
  { name: 'Linux', category: 'tools', x: 11, y: 39 },
  { name: 'Git', category: 'tools', x: 22, y: 33 },
  { name: 'GitHub', category: 'tools', x: 48, y: 57 },
  { name: 'Google AI Studio', category: 'tools', x: 67, y: 33 },
  { name: 'Canva', category: 'tools', x: 78, y: 55 },
  { name: 'Figma', category: 'tools', x: 88, y: 60 },
  { name: 'AWS', category: 'infrastructure', x: 56, y: 84 },
  { name: 'GCP', category: 'infrastructure', x: 73, y: 86 },
  { name: 'Vercel', category: 'infrastructure', x: 88, y: 83 },
  { name: 'Claude', category: 'infrastructure', x: 69, y: 56 },
  { name: 'Leadership', category: 'soft', x: 13, y: 88 },
  { name: 'Collaboration', category: 'soft', x: 41, y: 10 },
  { name: 'Adaptability', category: 'soft', x: 59, y: 7 },
  { name: 'Problem-solving', category: 'soft', x: 88, y: 30 }
];

const domainLinks = categoryOrder.flatMap((category) => {
  const nodes = skillNodes.filter((node) => node.category === category);
  return nodes.slice(1).map((node, index) => [nodes[index].name, node.name] as const);
});

const ambientLinks: Array<readonly [string, string]> = [
  ...domainLinks,
  ['Python', 'Dart'],
  ['C++', 'HTML'],
  ['JavaScript', 'React'],
  ['JavaScript', 'Node.js'],
  ['CSS', 'Figma'],
  ['React', 'Canva'],
  ['Node.js', 'Express.js'],
  ['Express.js', 'MongoDB'],
  ['PostgreSQL', 'AWS'],
  ['MySQL', 'Vercel'],
  ['Git', 'GitHub'],
  ['GitHub', 'Vercel'],
  ['Google AI Studio', 'Claude'],
  ['GCP', 'Claude'],
  ['Leadership', 'Collaboration'],
  ['Adaptability', 'Problem-solving'],
  ['Linux', 'Git'],
  ['Oracle', 'Java']
];

const brandColors: Record<string, string> = {
  Python: '#3776AB',
  C: '#A8B9CC',
  'C++': '#00599C',
  JavaScript: '#F7DF1E',
  Java: '#E76F00',
  Dart: '#0175C2',
  HTML: '#E34F26',
  CSS: '#1572B6',
  React: '#61DAFB',
  Flutter: '#02569B',
  'Node.js': '#5FA04E',
  'Express.js': '#F5F5F5',
  PostgreSQL: '#4169E1',
  Oracle: '#F80000',
  MySQL: '#4479A1',
  MongoDB: '#47A248',
  Linux: '#FCC624',
  Git: '#F05032',
  GitHub: '#F5F5F5',
  'Google AI Studio': '#8AB4F8',
  Canva: '#00C4CC',
  Figma: '#F24E1E',
  AWS: '#FF9900',
  GCP: '#4285F4',
  Vercel: '#F5F5F5',
  Claude: '#D97757',
  Leadership: '#FF2E4D',
  Collaboration: '#FF2E4D',
  Adaptability: '#FF2E4D',
  'Problem-solving': '#FF2E4D'
};

const getNode = (name: string) => skillNodes.find((node) => node.name === name)!;

const SkillLogo = ({ name, active }: { name: string; active: boolean }) => {
  const color = brandColors[name] ?? '#F5F5F5';
  const muted = active ? 1 : 0.72;
  const textClass = "font-mono text-[10px] font-bold";

  switch (name) {
    case 'Python':
      return (
        <svg viewBox="0 0 64 64" className="h-full w-full" aria-hidden="true">
          <path fill="#3776AB" fillOpacity={muted} d="M31 6c-10.7 0-13 4.6-13 8.9v6.4h14v2H12.8C8.9 23.3 6 27.4 6 32c0 5.2 3.4 9.1 7.7 9.1H18v-6.2c0-4.9 4.2-9.1 9.1-9.1h12.7c3.8 0 7.1-3.2 7.1-7.1v-3.8C46.9 10.5 43.2 7.2 31 6Z" />
          <path fill="#FFD43B" fillOpacity={muted} d="M33 58c10.7 0 13-4.6 13-8.9v-6.4H32v-2h19.2c3.9 0 6.8-4.1 6.8-8.7 0-5.2-3.4-9.1-7.7-9.1H46v6.2c0 4.9-4.2 9.1-9.1 9.1H24.2c-3.8 0-7.1 3.2-7.1 7.1v3.8C17.1 53.5 20.8 56.8 33 58Z" />
          <circle cx="25" cy="15" r="2" fill="#fff" opacity="0.9" />
          <circle cx="39" cy="49" r="2" fill="#fff" opacity="0.9" />
        </svg>
      );
    case 'React':
      return (
        <svg viewBox="0 0 64 64" className="h-full w-full" fill="none" aria-hidden="true">
          <circle cx="32" cy="32" r="5" fill="#61DAFB" opacity={muted} />
          {[0, 60, -60].map((rotate) => (
            <ellipse key={rotate} cx="32" cy="32" rx="25" ry="9" stroke="#61DAFB" strokeWidth="3" opacity={muted} transform={`rotate(${rotate} 32 32)`} />
          ))}
        </svg>
      );
    case 'HTML':
    case 'CSS':
      return (
        <svg viewBox="0 0 64 64" className="h-full w-full" aria-hidden="true">
          <path fill={color} fillOpacity={muted} d="M12 6h40l-3.6 46.1L32 58l-16.4-5.9L12 6Z" />
          <path fill="#fff" opacity="0.85" d={name === 'HTML' ? 'M22 18h21l-.4 5H27.4l.4 5h14.4l-1.1 14.1L32 45.2l-9.1-3.1-.6-7h5.1l.3 3.2 4.3 1.4 4.3-1.4.4-5.2H22.1L20.9 18Z' : 'M21 18h23l-.5 5H27l.3 4h15.8L42 42.1l-10 3.2-10-3.2-.6-7h5l.3 3.2 5.3 1.6 5.2-1.6.4-6.1H21.2L21 18Z'} />
        </svg>
      );
    case 'JavaScript':
      return (
        <svg viewBox="0 0 64 64" className="h-full w-full" aria-hidden="true">
          <rect x="8" y="8" width="48" height="48" fill="#F7DF1E" opacity={muted} />
          <text x="42" y="47" textAnchor="middle" fill="#050505" className="font-mono text-[17px] font-bold">JS</text>
        </svg>
      );
    case 'C':
      return (
        <svg viewBox="0 0 64 64" className="h-full w-full" aria-hidden="true">
          <path fill="#A8B9CC" fillOpacity={muted} d="M32 4 56 18v28L32 60 8 46V18L32 4Z" />
          <path fill="#659AD2" fillOpacity={muted} d="M32 10 50 20.5v21L32 52 14 41.5v-21L32 10Z" />
          <path fill="#fff" fillOpacity="0.95" d="M33.1 44.5c-7.7 0-13.2-5.3-13.2-12.6 0-7.2 5.6-12.4 13.2-12.4 4.7 0 8.4 1.8 10.7 5.1l-5.2 3.1c-1.3-1.7-3-2.6-5.1-2.6-3.8 0-6.4 2.8-6.4 6.8 0 4.1 2.6 6.9 6.4 6.9 2.1 0 3.8-.9 5.1-2.7l5.2 3.1c-2.3 3.4-6 5.3-10.7 5.3Z" />
        </svg>
      );
    case 'C++':
      return (
        <svg viewBox="0 0 64 64" className="h-full w-full" aria-hidden="true">
          <path fill="#00599C" fillOpacity={muted} d="M32 4 56 18v28L32 60 8 46V18L32 4Z" />
          <path fill="#004482" fillOpacity={muted} d="M32 10 50 20.5v21L32 52 14 41.5v-21L32 10Z" />
          <path fill="#fff" fillOpacity="0.95" d="M29.3 44.4c-7.3 0-12.6-5.2-12.6-12.4 0-7.1 5.3-12.3 12.6-12.3 4.4 0 7.8 1.7 10 4.9l-4.9 3c-1.2-1.7-2.8-2.5-4.7-2.5-3.5 0-5.9 2.8-5.9 6.9s2.4 6.9 5.9 6.9c1.9 0 3.5-.8 4.7-2.5l4.9 3c-2.2 3.2-5.6 5-10 5Z" />
          <path stroke="#fff" strokeLinecap="round" strokeWidth="2.6" d="M43 28v8M39 32h8M53 28v8M49 32h8" />
        </svg>
      );
    case 'Java':
      return (
        <svg viewBox="0 0 64 64" className="h-full w-full" fill="none" aria-hidden="true">
          <path d="M28 10c8 5-6 8 2 14M37 8c8 6-8 10 1 17" stroke="#E76F00" strokeWidth="3" strokeLinecap="round" opacity={muted} />
          <path d="M21 31h24l-3 13c-.8 3.5-4.2 6-8 6h-4c-3.8 0-7.2-2.5-8-6l-1-13Z" fill="#5382A1" opacity={muted} />
          <path d="M44 34h5c2.8 0 4 1.8 3.1 4.1-.9 2.5-3.8 4-8 4" stroke="#5382A1" strokeWidth="4" strokeLinecap="round" opacity={muted} />
          <path d="M19 54c8 2.5 18.2 2.5 26 0" stroke="#E76F00" strokeWidth="3" strokeLinecap="round" opacity={muted} />
        </svg>
      );
    case 'Dart':
      return (
        <svg viewBox="0 0 64 64" className="h-full w-full" aria-hidden="true">
          <path fill="#0175C2" fillOpacity={muted} d="M15 15h24l10 10v24H25L15 39V15Z" />
          <path fill="#40C4FF" fillOpacity={muted} d="m15 39 10 10h24L25 25H15v14Z" />
          <path fill="#01579B" fillOpacity={muted} d="M39 15 15 39V15h24Z" />
        </svg>
      );
    case 'Flutter':
      return (
        <svg viewBox="0 0 64 64" className="h-full w-full" aria-hidden="true">
          <path fill="#54C5F8" fillOpacity={muted} d="M36 7 13 30l8 8L52 7H36Z" />
          <path fill="#01579B" fillOpacity={muted} d="M36 35 25 46l11 11h16L36 41l16-16H36Z" />
          <path fill="#29B6F6" fillOpacity={muted} d="m21 38 8-8 8 8-8 8-8-8Z" />
        </svg>
      );
    case 'Node.js':
      return (
        <svg viewBox="0 0 64 64" className="h-full w-full" aria-hidden="true">
          <path fill="#5FA04E" fillOpacity={muted} d="m32 5 23 13.3v27.4L32 59 9 45.7V18.3L32 5Z" />
          <path fill="#fff" opacity="0.9" d="M24 41V24h4.2l7.6 10.6V24H40v17h-4.2l-7.6-10.6V41H24Z" />
        </svg>
      );
    case 'Linux':
      return (
        <svg viewBox="0 0 64 64" className="h-full w-full" aria-hidden="true">
          <ellipse cx="32" cy="36" rx="14" ry="18" fill="#111" opacity={active ? 0.96 : 0.72} />
          <circle cx="32" cy="20" r="10" fill="#111" opacity={active ? 0.96 : 0.72} />
          <path fill="#FCC624" fillOpacity={muted} d="M23 34c2.2 3 15.8 3 18 0l3.4 14.2C42 53.1 37.5 56 32 56s-10-2.9-12.4-7.8L23 34Z" />
          <path fill="#fff" d="M26 19c0-1.5 1.2-2.7 2.6-2.7s2.6 1.2 2.6 2.7-1.2 2.7-2.6 2.7S26 20.5 26 19Zm6.8 0c0-1.5 1.2-2.7 2.6-2.7S38 17.5 38 19s-1.2 2.7-2.6 2.7-2.6-1.2-2.6-2.7Z" />
          <circle cx="29" cy="19" r="1.1" fill="#111" /><circle cx="36" cy="19" r="1.1" fill="#111" />
          <path fill="#F3C11C" fillOpacity={muted} d="m32 22 4.5 5.2L32 30l-4.5-2.8L32 22Z" />
          <ellipse cx="22" cy="53" rx="8" ry="5" fill="#FCC624" opacity={muted} transform="rotate(-15 22 53)" />
          <ellipse cx="42" cy="53" rx="8" ry="5" fill="#FCC624" opacity={muted} transform="rotate(15 42 53)" />
        </svg>
      );
    case 'Git':
      return (
        <svg viewBox="0 0 64 64" className="h-full w-full" aria-hidden="true">
          <rect x="13" y="13" width="38" height="38" rx="6" fill="#F05032" opacity={muted} transform="rotate(45 32 32)" />
          <path d="M25 22v14m0-14 14 14m0 0v7" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />
          <circle cx="25" cy="22" r="4" fill="#fff" /><circle cx="25" cy="36" r="4" fill="#fff" /><circle cx="39" cy="43" r="4" fill="#fff" />
        </svg>
      );
    case 'GitHub':
      return (
        <svg viewBox="0 0 64 64" className="h-full w-full" aria-hidden="true">
          <circle cx="32" cy="32" r="24" fill="#F5F5F5" opacity={muted} />
          <path fill="#050505" d="M32 15c-9.7 0-17.5 7.8-17.5 17.4 0 7.7 5 14.2 12 16.5.9.2 1.2-.4 1.2-.9v-3.1c-4.9 1.1-5.9-2.1-5.9-2.1-.8-2-2-2.6-2-2.6-1.6-1.1.1-1.1.1-1.1 1.8.1 2.8 1.9 2.8 1.9 1.6 2.8 4.3 2 5.3 1.5.2-1.2.6-2 1.1-2.5-3.9-.4-8-1.9-8-8.6 0-1.9.7-3.5 1.8-4.7-.2-.4-.8-2.2.2-4.7 0 0 1.5-.5 4.8 1.8a16.7 16.7 0 0 1 8.8 0c3.3-2.3 4.8-1.8 4.8-1.8 1 2.5.4 4.3.2 4.7 1.1 1.2 1.8 2.8 1.8 4.7 0 6.7-4.1 8.2-8 8.6.6.5 1.2 1.6 1.2 3.2V48c0 .5.3 1.1 1.2.9a17.5 17.5 0 0 0 12-16.5C49.5 22.8 41.7 15 32 15Z" />
        </svg>
      );
    case 'MongoDB':
      return (
        <svg viewBox="0 0 64 64" className="h-full w-full" aria-hidden="true">
          <path fill="#47A248" fillOpacity={muted} d="M32 5c8.5 9.7 12.6 18.7 12.2 27-.3 8.2-4.4 14.3-12.2 18.4-7.8-4.1-11.9-10.2-12.2-18.4C19.4 23.7 23.5 14.7 32 5Z" />
          <path d="M32 13v40" stroke="#F5F5F5" strokeWidth="2" strokeLinecap="round" opacity="0.65" />
        </svg>
      );
    case 'PostgreSQL':
      return (
        <svg viewBox="0 0 64 64" className="h-full w-full" aria-hidden="true">
          <path fill="#336791" fillOpacity={muted} d="M48.5 29c1-12.7-6.2-20.6-18.2-20.6-11.5 0-18.8 7.7-18.8 20.1 0 8.1 3.1 14.4 9.8 17.8.8 5.9 4.4 9.3 10 9.3 5 0 8.4-2.6 10.2-7.7 3.5.4 7.5-.3 10.8-3.2-5.5-1.7-6.5-6.7-3.8-15.7Z" />
          <path fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" opacity="0.88" d="M22.6 29.3c.4-6.2 3.6-9.9 9-9.9 5.8 0 9.1 3.6 9.3 10.1.2 7.3-3.2 11.7-10.3 13.1m-7.8-12.9h.1m17.5 0h.1m-10.1 12.7c-.3 6.6 1.8 10.2 6.4 10.9m2.5-21.2c3.9-1 7.1.2 9.5 3.5m-27.4 9c2.8 1.5 6.3 1.7 10.6.6" />
        </svg>
      );
    case 'MySQL':
      return (
        <svg viewBox="0 0 64 64" className="h-full w-full" aria-hidden="true">
          <path fill="#4479A1" fillOpacity={muted} d="M9 40c8.7-13.7 23.6-19 45-15-6.4 2.2-10.8 6.9-13.3 14.1-8.9-2.9-19.4-2.6-31.7.9Z" />
          <path fill="#F29111" fillOpacity={muted} d="M41 25c3.9-7.6 8.1-11.7 12.7-12.2-2 4.2-2.5 8.4-1.5 12.7-3.5-.7-7.2-.9-11.2-.5Z" />
          <path fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" opacity="0.8" d="M18 38c7.3-3.2 15.8-3.4 25.5-.6" />
        </svg>
      );
    case 'Figma':
      return (
        <svg viewBox="0 0 64 64" className="h-full w-full" aria-hidden="true">
          <circle cx="25" cy="16" r="9" fill="#F24E1E" opacity={muted} /><circle cx="39" cy="16" r="9" fill="#FF7262" opacity={muted} />
          <circle cx="25" cy="32" r="9" fill="#A259FF" opacity={muted} /><circle cx="39" cy="32" r="9" fill="#1ABCFE" opacity={muted} />
          <circle cx="25" cy="48" r="9" fill="#0ACF83" opacity={muted} />
        </svg>
      );
    case 'Vercel':
      return (
        <svg viewBox="0 0 64 64" className="h-full w-full" aria-hidden="true">
          <path d="M32 13 56 52H8L32 13Z" fill="#F5F5F5" opacity={muted} />
        </svg>
      );
    case 'Oracle':
      return (
        <svg viewBox="0 0 64 64" className="h-full w-full" aria-hidden="true">
          <ellipse cx="32" cy="32" rx="24" ry="15" fill="none" stroke="#F80000" strokeWidth="8" opacity={muted} />
        </svg>
      );
    case 'GCP':
      return (
        <svg viewBox="0 0 64 64" className="h-full w-full" fill="none" aria-hidden="true">
          <path d="M24 45h23a10 10 0 0 0 1.8-19.8A17 17 0 0 0 17.5 22 12 12 0 0 0 24 45Z" stroke="#4285F4" strokeWidth="6" strokeLinecap="round" opacity={muted} />
          <path d="M18 28a17 17 0 0 1 14-13" stroke="#EA4335" strokeWidth="6" strokeLinecap="round" opacity={muted} />
          <path d="M24 45H15a10 10 0 0 1 0-20" stroke="#34A853" strokeWidth="6" strokeLinecap="round" opacity={muted} />
          <path d="M47 45a10 10 0 0 0 1-19.9" stroke="#FBBC05" strokeWidth="6" strokeLinecap="round" opacity={muted} />
        </svg>
      );
    case 'AWS':
      return (
        <svg viewBox="0 0 64 64" className="h-full w-full" aria-hidden="true">
          <text x="32" y="31" textAnchor="middle" fill="#F5F5F5" className="font-mono text-[15px] font-bold" opacity={muted}>aws</text>
          <path d="M18 40c9 6 20 6 30 0" stroke="#FF9900" strokeWidth="4" strokeLinecap="round" opacity={muted} />
          <path d="m45 38 6 1-4 5" stroke="#FF9900" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity={muted} />
        </svg>
      );
    case 'Canva':
      return (
        <svg viewBox="0 0 64 64" className="h-full w-full" aria-hidden="true">
          <defs>
            <linearGradient id="canvaGradient" x1="10" y1="12" x2="54" y2="54">
              <stop stopColor="#00C4CC" />
              <stop offset="0.48" stopColor="#7D2AE8" />
              <stop offset="1" stopColor="#00C4CC" />
            </linearGradient>
          </defs>
          <circle cx="32" cy="32" r="25" fill="url(#canvaGradient)" opacity={muted} />
          <path fill="#fff" opacity="0.95" d="M39.9 40.4c-2.2 2.3-5 3.7-8.1 3.7-6.2 0-10.4-4.7-10.4-11.2 0-7.4 5.4-13 12.6-13 3.5 0 6.2 1.4 7.4 3.6.8 1.5.3 3.1-1.1 3.7-1.3.5-2.4-.1-3.2-1.4-.6-1-1.7-1.6-3.2-1.6-4 0-7.2 3.8-7.2 8.5 0 4.1 2.4 6.9 5.9 6.9 1.8 0 3.2-.7 4.6-2.1.9-.9 2.1-1.1 3.1-.3 1 .8.9 2.1-.4 3.2Z" />
        </svg>
      );
    case 'Claude':
      return (
        <svg viewBox="0 0 64 64" className="h-full w-full" aria-hidden="true">
          <path fill="#D97757" fillOpacity={muted} d="M29.7 8h4.6l3.7 17.7L53.3 16l2.3 4-13.7 11.9 18 5.8-1.4 4.4-18.9-3.5 6.6 17.9-4.2 1.9L32 42.8 22 58.4l-4.2-1.9 6.6-17.9-18.9 3.5-1.4-4.4 18-5.8L8.4 20l2.3-4L26 25.7 29.7 8Z" />
          <circle cx="32" cy="32" r="6" fill="#050505" opacity="0.65" />
        </svg>
      );
    case 'Express.js':
      return (
        <svg viewBox="0 0 64 64" className="h-full w-full" aria-hidden="true">
          <text x="32" y="34" textAnchor="middle" fill="#F5F5F5" className="font-mono text-[13px] font-semibold" opacity={muted}>express</text>
          <path d="M12 41h40M43 35l9 6-9 6" stroke="#F5F5F5" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity={muted} />
        </svg>
      );
    case 'Google AI Studio':
      return (
        <svg viewBox="0 0 64 64" className="h-full w-full" aria-hidden="true">
          <path fill="#4285F4" fillOpacity={muted} d="M32 8 38 25l18 7-18 7-6 17-6-17-18-7 18-7 6-17Z" />
          <path fill="#34A853" fillOpacity={muted} d="m46 10 3 8 8 3-8 3-3 8-3-8-8-3 8-3 3-8Z" />
        </svg>
      );
    case 'Leadership':
    case 'Collaboration':
    case 'Adaptability':
    case 'Problem-solving':
      return (
        <svg viewBox="0 0 64 64" className="h-full w-full" fill="none" aria-hidden="true">
          <circle cx="32" cy="20" r="8" stroke={color} strokeWidth="4" opacity={muted} />
          <path d="M17 52c2.6-10.2 7.6-15.3 15-15.3S44.4 41.8 47 52" stroke={color} strokeWidth="4" strokeLinecap="round" opacity={muted} />
          {name === 'Collaboration' && <path d="M13 36h38" stroke={color} strokeWidth="3" strokeLinecap="round" opacity={muted} />}
          {name === 'Adaptability' && <path d="m42 16 7 7-7 7M22 48l-7-7 7-7" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity={muted} />}
          {name === 'Problem-solving' && <path d="M44 40h8v8M20 24h-8v-8" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity={muted} />}
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 64 64" className="h-full w-full" aria-hidden="true">
          <circle cx="32" cy="32" r="23" fill={color} opacity={muted} />
          <text x="32" y="38" textAnchor="middle" fill="#050505" className={textClass}>{name.slice(0, 2)}</text>
        </svg>
      );
  }
};

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryId | 'all'>('all');
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const categoryCounts = useMemo(
    () =>
      categoryOrder.reduce((acc, category) => {
        acc[category] = skillNodes.filter((node) => node.category === category).length;
        return acc;
      }, {} as Record<CategoryId, number>),
    []
  );

  const neighborNames = useMemo(() => {
    if (!hoveredSkill) return new Set<string>();
    return new Set(
      ambientLinks
        .filter(([a, b]) => a === hoveredSkill || b === hoveredSkill)
        .flatMap(([a, b]) => [a, b])
    );
  }, [hoveredSkill]);

  const activeDomainLinks = useMemo(() => {
    if (activeCategory === 'all') return [];
    return domainLinks.filter(([a, b]) => getNode(a).category === activeCategory && getNode(b).category === activeCategory);
  }, [activeCategory]);

  const isFiltered = activeCategory !== 'all';

  return (
    <motion.section
      id="skills"
      className="relative mx-auto max-w-container px-4 py-section sm:px-6"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.12 }}
    >
      <div className="absolute inset-0 -mx-4 bg-gradient-to-b from-pitch/20 via-pitch/10 to-transparent pointer-events-none sm:-mx-6" />
      <div className="skill-dot-matrix absolute inset-x-0 top-24 h-[34rem] opacity-70 pointer-events-none" />
      <SectionDecoration className="top-12 right-4" />
      <SectionHeader num="02" title="Skills" />

      <motion.div
        className="relative overflow-visible rounded-2xl bg-transparent p-0"
        variants={{
          hidden: { opacity: 0, y: 24 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } }
        }}
      >
        <div className="pointer-events-none absolute inset-x-[-12%] top-[5rem] h-[36rem] bg-[radial-gradient(ellipse_at_center,rgba(18,18,18,0.72)_0%,rgba(13,13,13,0.28)_38%,rgba(5,5,5,0)_74%)]" />

        <div className="relative z-10 mb-5 flex gap-2 overflow-x-auto pb-2">
          <button
            type="button"
            onClick={() => setActiveCategory('all')}
            className={`shrink-0 rounded-full border px-4 py-2 font-mono text-[0.68rem] uppercase tracking-[0.18em] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              activeCategory === 'all'
                ? 'border-[#FF1A3C] bg-[#FF1A3C] text-white shadow-[0_0_22px_rgba(255,26,60,0.5)]'
                : 'border-white/10 bg-white/[0.03] text-primary/55 hover:border-[#FF1A3C]/70 hover:text-primary'
            }`}
          >
            All ({skillNodes.length})
          </button>
          {categoryOrder.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`shrink-0 rounded-full border px-4 py-2 font-mono text-[0.68rem] uppercase tracking-[0.18em] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                activeCategory === category
                  ? 'border-[#FF1A3C] bg-[#FF1A3C] text-white shadow-[0_0_22px_rgba(255,26,60,0.5)]'
                  : 'border-white/10 bg-white/[0.03] text-primary/55 hover:border-[#FF1A3C]/70 hover:text-primary'
              }`}
            >
              {categories[category].label}
            </button>
          ))}
        </div>

        <div className="relative z-10 overflow-x-auto">
          <div className="relative h-[42rem] min-w-[52rem] overflow-visible rounded-xl bg-transparent sm:h-[36rem] lg:min-w-0">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_52%,rgba(255,26,60,0.08)_0%,rgba(18,18,18,0.18)_32%,rgba(5,5,5,0)_72%)]" />
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              <defs>
                <filter id="skillLineGlow" x="-40%" y="-40%" width="180%" height="180%">
                  <feGaussianBlur stdDeviation="0.85" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {ambientLinks.map(([from, to]) => {
                const a = getNode(from);
                const b = getNode(to);
                const isNeighborLink = hoveredSkill && (from === hoveredSkill || to === hoveredSkill);
                const isDomainLink =
                  activeCategory !== 'all' && a.category === activeCategory && b.category === activeCategory;

                return (
                  <motion.line
                    key={`${from}-${to}`}
                    x1={a.x}
                    y1={a.y}
                    x2={b.x}
                    y2={b.y}
                    stroke="#FF1A3C"
                    strokeWidth={isNeighborLink || isDomainLink ? 0.24 : 0.1}
                    vectorEffect="non-scaling-stroke"
                    initial={false}
                    animate={{
                      opacity: isDomainLink ? 0.72 : isNeighborLink ? 0.42 : isFiltered ? 0.025 : 0.1
                    }}
                    transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                    filter={isDomainLink || isNeighborLink ? 'url(#skillLineGlow)' : undefined}
                  />
                );
              })}

              {activeDomainLinks.map(([from, to], index) => {
                const a = getNode(from);
                const b = getNode(to);
                return (
                  <motion.line
                    key={`active-${from}-${to}`}
                    x1={a.x}
                    y1={a.y}
                    x2={b.x}
                    y2={b.y}
                    stroke="#FF2E4D"
                    strokeWidth="0.32"
                    vectorEffect="non-scaling-stroke"
                    filter="url(#skillLineGlow)"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.95 }}
                    transition={{ duration: 0.7, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  />
                );
              })}
            </svg>

            {skillNodes.map((node, index) => {
              const selected = activeCategory !== 'all' && activeCategory === node.category;
              const ambient = activeCategory === 'all';
              const connected = neighborNames.has(node.name);
              const hovered = hoveredSkill === node.name;
              const dimmed = isFiltered && !selected && !connected;
              const showLabel = selected || hovered;

              return (
                <motion.button
                  key={node.name}
                  type="button"
                  aria-label={`${node.name}, ${categories[node.category].label}`}
                  className={`group skill-node absolute flex flex-col items-center gap-2 text-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    selected ? 'z-30 skill-node-hot' : connected || hovered ? 'z-20' : 'z-10'
                  } ${dimmed ? 'opacity-15 grayscale' : ambient ? 'opacity-80' : 'opacity-55'}`}
                  style={{
                    left: `${node.x}%`,
                    top: `${node.y}%`,
                    animationDelay: `${index * 0.18}s`
                  }}
                  onMouseEnter={() => setHoveredSkill(node.name)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  onFocus={() => setHoveredSkill(node.name)}
                  onBlur={() => setHoveredSkill(null)}
                  whileTap={{ scale: 0.96 }}
                >
                  <span
                    className={`skill-logo-shell relative grid h-12 w-12 place-items-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] sm:h-14 sm:w-14 ${
                      selected
                        ? 'drop-shadow-[0_0_16px_rgba(255,26,60,0.66)]'
                        : connected || hovered
                          ? 'drop-shadow-[0_0_8px_rgba(255,26,60,0.22)]'
                        : 'drop-shadow-[0_0_10px_rgba(245,245,245,0.08)]'
                    }`}
                  >
                    <span
                      className={`absolute inset-[-0.65rem] rounded-full bg-[#FF1A3C] blur-xl transition-opacity duration-700 ${
                        selected ? 'opacity-26' : connected || hovered ? 'opacity-8' : 'opacity-0'
                      }`}
                    />
                    <span className="relative h-9 w-9 sm:h-11 sm:w-11">
                      <SkillLogo name={node.name} active={!dimmed} />
                    </span>
                  </span>
                  <span
                    className={`pointer-events-none min-h-[1rem] whitespace-nowrap font-mono text-[0.66rem] uppercase tracking-[0.18em] text-[#FF2E4D] drop-shadow-[0_0_12px_rgba(255,26,60,0.65)] transition-all duration-500 ${
                      showLabel ? 'translate-y-0 opacity-100' : '-translate-y-1 opacity-0'
                    }`}
                  >
                    {node.name}
                  </span>
                  <span className="sr-only">{categories[node.category].label}</span>
                </motion.button>
              );
            })}
          </div>
        </div>

        <div className="relative z-10 mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 pt-4 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-primary/45">
          {categoryOrder.map((category, index) => (
            <span
              key={category}
              className={`transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                activeCategory === category ? 'text-[#FF2E4D] drop-shadow-[0_0_10px_rgba(255,26,60,0.7)]' : ''
              }`}
            >
              {categoryCounts[category]} {categories[category].short}
              {index < categoryOrder.length - 1 && <span className="ml-3 text-white/15">|</span>}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
};

export default Skills;
