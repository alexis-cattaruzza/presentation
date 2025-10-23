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
    icon: "🏎️",
    category: 'sport',
    level: 'passion'
  },
  {
    name: "Padel",
    description: "Sport de raquette que je pratique régulièrement pour l'aspect social et compétitif",
    icon: "🎾",
    category: 'sport',
    level: 'hobby'
  },
  {
    name: "Voyage",
    description: "Découverte de nouvelles cultures et paysages, source d'inspiration constante",
    icon: "✈️",
    category: 'travel',
    level: 'passion'
  },
  {
    name: "Course à pied",
    description: "Running pour maintenir la forme physique et l'équilibre mental",
    icon: "🏃",
    category: 'sport',
    level: 'hobby'
  },
  {
    name: "Développement IT personnel",
    description: "Projets personnels et expérimentations technologiques en dehors du travail",
    icon: "💻",
    category: 'tech',
    level: 'passion'
  },
  {
    name: "Photographie",
    description: "Capture de moments et paysages lors de mes voyages et sorties",
    icon: "📸",
    category: 'lifestyle',
    level: 'hobby'
  },
  {
    name: "Lecture technique",
    description: "Veille technologique et lecture d'articles sur les dernières innovations IT",
    icon: "📚",
    category: 'tech',
    level: 'interest'
  },
  {
    name: "Cuisine",
    description: "Découverte de nouvelles recettes et techniques culinaires",
    icon: "👨‍🍳",
    category: 'lifestyle',
    level: 'hobby'
  }
];

export const hobbyCategories = {
  sport: { name: 'Sports', icon: '⚽', color: 'var(--color-success)' },
  travel: { name: 'Voyage', icon: '🌍', color: 'var(--color-accent)' },
  tech: { name: 'Technologie', icon: '💻', color: 'var(--color-primary)' },
  lifestyle: { name: 'Lifestyle', icon: '🎨', color: 'var(--color-secondary)' }
};
