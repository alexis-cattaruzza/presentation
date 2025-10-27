export interface Hobby {
  name: string;
  description: string;
  icon: string;
  image?: string; // URL ou path de l'image
  category: 'sport' | 'travel' | 'tech' | 'lifestyle';
  level: 'passion' | 'hobby' | 'interest';
}

export const hobbies: Hobby[] = [
  {
    name: "Formule 1",
    description: "Passionné de F1, je suis les courses et l'évolution technologique de ce sport",
    icon: "trophy",
    image: "/images/formule1.jpg",
    category: 'sport',
    level: 'passion'
  },
  {
    name: "Padel",
    description: "Sport de raquette que je pratique régulièrement pour l'aspect social et compétitif",
    icon: "gamepad",
    image: "/images/padel.jpg",
    category: 'sport',
    level: 'hobby'
  },
  {
    name: "Voyage",
    description: "Découverte de nouvelles cultures et paysages, source d'inspiration constante",
    icon: "plane",
    image: "/images/travel.jpg",
    category: 'travel',
    level: 'passion'
  },
  {
    name: "Course à pied",
    description: "Running pour maintenir la forme physique et l'équilibre mental",
    icon: "dumbbell",
    image: "/images/running.jpg",
    category: 'sport',
    level: 'hobby'
  },
  {
    name: "Développement IT personnel",
    description: "Projets personnels et expérimentations technologiques en dehors du travail",
    icon: "laptop",
    image: "/images/devIt.jpg",
    category: 'tech',
    level: 'passion'
  },
  {
    name: "Lecture technique",
    description: "Veille technologique et lecture d'articles sur les dernières innovations IT",
    icon: "book",
    image: "/images/techRead.jpg",
    category: 'tech',
    level: 'interest'
  },
  {
    name: "Cuisine",
    description: "Découverte de nouvelles recettes et techniques culinaires",
    icon: "utensils",
    image: "/images/cooking.jpg",
    category: 'lifestyle',
    level: 'hobby'
  }
];

export const hobbyCategories = {
  sport: { name: 'Sports', color: 'var(--color-success)' },
  travel: { name: 'Voyage', color: 'var(--color-accent)' },
  tech: { name: 'Technologie', color: 'var(--color-primary)' },
  lifestyle: { name: 'Lifestyle', color: 'var(--color-secondary)' }
};
