export interface Hobby {
  name: string;
  description: string;
  icon: string;
  category: 'sport' | 'travel' | 'tech' | 'lifestyle';
  level: 'passion' | 'hobby' | 'interest';
}

export const hobbies: Hobby[] = [
  {
    name: "Formule 1",
    description: "Passionné de F1, je suis les courses et l'évolution technologique de ce sport",
    icon: "trophy",
    category: 'sport',
    level: 'passion'
  },
  {
    name: "Padel",
    description: "Sport de raquette que je pratique régulièrement pour l'aspect social et compétitif",
    icon: "gamepad",
    category: 'sport',
    level: 'hobby'
  },
  {
    name: "Voyage",
    description: "Découverte de nouvelles cultures et paysages, source d'inspiration constante",
    icon: "plane",
    category: 'travel',
    level: 'passion'
  },
  {
    name: "Course à pied",
    description: "Running pour maintenir la forme physique et l'équilibre mental",
    icon: "dumbbell",
    category: 'sport',
    level: 'hobby'
  },
  {
    name: "Développement IT personnel",
    description: "Projets personnels et expérimentations technologiques en dehors du travail",
    icon: "laptop",
    category: 'tech',
    level: 'passion'
  },
  {
    name: "Lecture technique",
    description: "Veille technologique et lecture d'articles sur les dernières innovations IT",
    icon: "book",
    category: 'tech',
    level: 'interest'
  },
  {
    name: "Cuisine",
    description: "Découverte de nouvelles recettes et techniques culinaires",
    icon: "utensils",
    category: 'lifestyle',
    level: 'hobby'
  }
];

export const hobbyCategories = {
  sport: { name: 'Sports', icon: 'trophy', color: 'var(--color-success)' },
  travel: { name: 'Voyage', icon: 'globe', color: 'var(--color-accent)' },
  tech: { name: 'Technologie', icon: 'laptop', color: 'var(--color-primary)' },
  lifestyle: { name: 'Lifestyle', icon: 'palette', color: 'var(--color-secondary)' }
};
