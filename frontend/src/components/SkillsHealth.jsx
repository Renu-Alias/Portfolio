import React from 'react';

export default function SkillsHealth({ skillsData }) {
  const skills = skillsData || {
    languages: ["Python", "C", "C++", "JavaScript", "Java", "Dart"],
    frameworks: ["Flutter", "Node.js", "Express.js"],
    "tools_&_design": ["Linux", "Git", "GitHub", "Canva", "Figma"],
    infrastructure: ["AWS", "Claude"],
    databases: ["PostgreSQL", "SQL*Plus", "MySQL", "MongoDB"],
    soft_skills: ["leadership", "collaboration", "adaptability", "problem-solving"]
  };

  return (
    <section id="skills" className="skills-section">
      <div className="section-header">
        <span className="section-cmd">cat ./skills.json</span>
      </div>

      <div className="skills-grid">
        <div className="skill-card">
          <div className="skill-title">.languages</div>
          <div className="skill-list">{JSON.stringify(skills.languages)}</div>
        </div>

        <div className="skill-card">
          <div className="skill-title">.frameworks</div>
          <div className="skill-list">{JSON.stringify(skills.frameworks)}</div>
        </div>

        <div className="skill-card">
          <div className="skill-title">.tools_&_design</div>
          <div className="skill-list">{JSON.stringify(skills["tools_&_design"])}</div>
        </div>

        <div className="skill-card">
          <div className="skill-title">.infrastructure</div>
          <div className="skill-list">{JSON.stringify(skills.infrastructure)}</div>
        </div>

        <div className="skill-card">
          <div className="skill-title">.databases</div>
          <div className="skill-list">{JSON.stringify(skills.databases)}</div>
        </div>

        <div className="skill-card skill-card-full">
          <div className="skill-title">.soft_skills</div>
          <div className="skill-list">{JSON.stringify(skills.soft_skills || [])}</div>
        </div>
      </div>
    </section>
  );
}
