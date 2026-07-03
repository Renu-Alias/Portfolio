export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        pitch: '#050505',
        pitchLight: '#0a0a0a',
        primary: '#F5F5F5',
        muted: '#8a8a8a',
        accent: '#E63946'
      },
      fontFamily: {
        display: ['Clash Display', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace']
      },
      fontSize: {
        'display-hero': ['clamp(3.5rem, 12vw, 7.5rem)', { lineHeight: '0.92', letterSpacing: '-0.03em' }],
        'display-section': ['clamp(2rem, 5vw, 3.5rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-card': ['1.375rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'body': ['1rem', { lineHeight: '1.7' }],
        'label': ['0.75rem', { lineHeight: '1', letterSpacing: '0.2em' }]
      },
      spacing: {
        'section': 'clamp(4rem, 12vw, 11.25rem)'
      },
      maxWidth: {
        container: '72rem'
      },
      boxShadow: {
        'card': '0 0 0 1px rgba(255,255,255,0.08)',
        'card-hover': '0 0 30px rgba(230,57,70,0.12)'
      },
      transitionDuration: {
        '400': '400ms'
      }
    }
  },
  plugins: []
};
