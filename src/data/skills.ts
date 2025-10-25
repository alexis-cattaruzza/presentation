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
    icon: 'target',
    skills: [
      { name: "Développement Full-Stack", level: "Expert", icon: "code" },
      { name: "Architecture Logicielle", level: "Avancé", icon: "laptop" },
      { name: "Optimisation Performance", level: "Avancé", icon: "zap" },
      { name: "Tests & Qualité", level: "Intermédiaire", icon: "test-tube" },
      { name: "Gestion de Projet", level: "Intermédiaire", icon: "briefcase" }
    ]
  },
  {
    id: 'technologies',
    title: 'Technologies & Outils',
    icon: 'settings',
    skills: [
      // Expert
      { name: "Java", level: "Expert", icon: "java" },
      // Avancé
      { name: "TypeScript", level: "Avancé", icon: "typescript" },
      { name: "Angular", level: "Avancé", icon: "angular" },
      { name: "SQL", level: "Avancé", icon: "mysql" },
      { name: "Git", level: "Avancé", icon: "git" },
      { name: "HTML/CSS", level: "Avancé", icon: "html" },
      { name: "Spring Boot", level: "Avancé", icon: "spring" },
      // Intermédiaire
      { name: "React", level: "Intermédiaire", icon: "react" },
      { name: "Docker", level: "Intermédiaire", icon: "docker" },
      { name: "JavaScript", level: "Intermédiaire", icon: "javascript" },
      // Connaissance
      { name: "Python", level: "Connaissance", icon: "python" }
    ]
  },
  {
    id: 'methods',
    title: 'Méthodes & Processus',
    icon: 'refresh',
    skills: [
      // Avancé
      { name: "Agile/Scrum", level: "Avancé", icon: "trending-up" },
      { name: "Code Review", level: "Avancé", icon: "eye" },
      { name: "Documentation", level: "Avancé", icon: "file-text" },
      { name: "Debugging", level: "Avancé", icon: "bug" },
      // Intermédiaire
      { name: "DevOps", level: "Intermédiaire", icon: "refresh" },
      { name: "CI/CD", level: "Intermédiaire", icon: "rocket" },
      { name: "Tests Unitaires", level: "Intermédiaire", icon: "test-tube" }
    ]
  }
];

export default skillCategories;
