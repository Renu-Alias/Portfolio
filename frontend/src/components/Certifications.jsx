import React from 'react';

export default function Certifications() {
  const certifications = [
    {
      title: 'AWS Certified Solutions Architect – Associate',
      issuer: 'Amazon Web Services',
      year: '2025'
    },
    {
      title: 'Certified Kubernetes Administrator (CKA)',
      issuer: 'Cloud Native Computing Foundation',
      year: '2024'
    },
    {
      title: 'Google Cloud Professional Data Engineer',
      issuer: 'Google Cloud',
      year: '2024'
    }
  ];

  const achievements = [
    'Built a multi-tenant event streaming pipeline serving 120k queries/sec',
    'Ranked top 1% in a global competitive programming challenge',
    'Led automation of hybrid cloud release workflows for edge deployments'
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
