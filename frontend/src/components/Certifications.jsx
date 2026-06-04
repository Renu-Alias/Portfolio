import React from 'react';

export default function Certifications() {
  const certifications = [
    {
      title: 'Claude 101',
      issuer: 'Anthropic',
      year: 'May 2026'
    },
    {
      title: 'Claude Code 101',
      issuer: 'Anthropic',
      year: 'June 2026'
    },
    {
      title: 'AWS Cloud Essentials',
      issuer: 'Amazon Web Services',
      year: 'June 2026'
    }
  ];

  const achievements = [
    'Nexus AI Hackathon third prize winner',
    "CEFR C2 level on Cambridge LinguaSkill Business examination ",
    "GirlScript Summer of Code (GSSoC) '26 contributor under Open Source Track",
    "Social Summer of Code (SSoC) '26 contributor"
  ];

  return (
    <section id="certifications" className="certifications-section">
      <div className="section-header">
        <span className="section-cmd">cat ./certifications.md</span>
      </div>

      <div className="certifications-grid">
        {certifications.map((cert, index) => (
          <div key={index} className="cert-card">
            <div className="cert-card-title">{cert.title}</div>
            <div className="cert-card-meta">{cert.issuer} · {cert.year}</div>
          </div>
        ))}
      </div>

      <div className="achievements-block">
        <div className="cert-card-title" style={{ marginBottom: '12px' }}>Achievements</div>
        <ul className="achievements-list">
          {achievements.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
