export interface TimelineItem {
  id: string;
  translationKey: string;
  year: string;
  skills: string[];
}

const timeline: TimelineItem[] = [
  {
    id: "1",
    translationKey: "contract", // Clé pour les traductions
    year: "2025",
    skills: ["Java", "Spring Boot", "Angular", "TypeScript", "SQL", "Docker", "Git", "Performance"]
  },
  {
    id: "2",
    translationKey: "internship",
    year: "2025",
    skills: ["Java", "Spring Boot", "Angular", "TypeScript", "SQL", "MariaDB", "Docker", "Git"]
  },
  {
    id: "3",
    translationKey: "studies",
    year: "2022-2025",
    skills: ["Java", "Algorithmique", "HTML/CSS", "JavaScript", "Bases de données", "Sécurité"]
  },
  {
    id: "4",
    translationKey: "retail",
    year: "2022-2023",
    skills: ["Service client", "Gestion de caisse", "Organisation"]
  }
];

export default timeline;
