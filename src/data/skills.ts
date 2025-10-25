export interface SkillItem {
  name: string;
  level: string;
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
      { name: "Développement Full-Stack", level: "Expert" },
      { name: "Architecture Logicielle", level: "Avancé" },
      { name: "Optimisation Performance", level: "Avancé" },
      { name: "Tests & Qualité", level: "Intermédiaire" },
      { name: "Gestion de Projet", level: "Intermédiaire" }
    ]
  },
  {
    id: 'technologies',
    title: 'Technologies & Outils',
    icon: 'settings',
    skills: [
      // Expert
      { name: "Java", level: "Expert" },
      // Avancé
      { name: "TypeScript", level: "Avancé" },
      { name: "Angular", level: "Avancé" },
      { name: "SQL", level: "Avancé" },
      { name: "Git", level: "Avancé" },
      { name: "HTML/CSS", level: "Avancé" },
      { name: "Spring Boot", level: "Avancé" },
      // Intermédiaire
      { name: "React", level: "Intermédiaire" },
      { name: "Docker", level: "Intermédiaire" },
      { name: "JavaScript", level: "Intermédiaire" },
      // Connaissance
      { name: "Python", level: "Connaissance" }
    ]
  },
  {
    id: 'methods',
    title: 'Méthodes & Processus',
    icon: 'refresh',
    skills: [
      // Avancé
      { name: "Agile/Scrum", level: "Avancé" },
      { name: "Code Review", level: "Avancé" },
      { name: "Documentation", level: "Avancé" },
      { name: "Debugging", level: "Avancé" },
      // Intermédiaire
      { name: "DevOps", level: "Intermédiaire" },
      { name: "CI/CD", level: "Intermédiaire" },
      { name: "Tests Unitaires", level: "Intermédiaire" }
    ]
  }
];

export default skillCategories;
