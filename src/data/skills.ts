export interface SkillItem {
  name: string;
  level: string;
  icon: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  icon: string;
  skills: SkillItem[];
}

const skillCategories: SkillCategory[] = [
  {
    id: 'skills',
    title: 'Compétences Techniques',
    icon: '🎯',
    skills: [
      { name: "Développement Full-Stack", level: "Expert", icon: "💻" },
      { name: "Architecture Logicielle", level: "Avancé", icon: "🏗️" },
      { name: "Optimisation Performance", level: "Avancé", icon: "⚡" },
      { name: "Tests & Qualité", level: "Intermédiaire", icon: "🧪" },
      { name: "Gestion de Projet", level: "Intermédiaire", icon: "📋" }
    ]
  },
  {
    id: 'technologies',
    title: 'Technologies & Outils',
    icon: '⚙️',
    skills: [
      { name: "Java", level: "Expert", icon: "☕" },
      { name: "TypeScript", level: "Avancé", icon: "📘" },
      { name: "Angular", level: "Avancé", icon: "🅰️" },
      { name: "React", level: "Intermédiaire", icon: "⚛️" },
      { name: "SQL", level: "Avancé", icon: "🗄️" },
      { name: "Docker", level: "Intermédiaire", icon: "🐳" },
      { name: "Git", level: "Avancé", icon: "🌿" },
      { name: "HTML/CSS", level: "Avancé", icon: "🎨" },
      { name: "Spring Boot", level: "Avancé", icon: "🍃" },
      { name: "JavaScript", level: "Intermédiaire", icon: "🟨" },
      { name: "Python", level: "Connaissance", icon: "🐍" }
    ]
  },
  {
    id: 'methods',
    title: 'Méthodes & Processus',
    icon: '🔄',
    skills: [
      { name: "Agile/Scrum", level: "Avancé", icon: "🏃" },
      { name: "DevOps", level: "Intermédiaire", icon: "🔄" },
      { name: "Code Review", level: "Avancé", icon: "👀" },
      { name: "Documentation", level: "Avancé", icon: "📚" },
      { name: "Debugging", level: "Avancé", icon: "🐛" },
      { name: "CI/CD", level: "Intermédiaire", icon: "🚀" },
      { name: "Tests Unitaires", level: "Intermédiaire", icon: "🧪" }
    ]
  }
];

export default skillCategories;
