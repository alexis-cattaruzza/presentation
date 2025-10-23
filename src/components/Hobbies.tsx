import { useState } from "react";
import { useTranslation } from "react-i18next";
import { hobbies, hobbyCategories, type Hobby } from "../data/hobbies";

export default function Hobbies() {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'passion': return 'var(--color-success)';
      case 'hobby': return 'var(--color-primary)';
      case 'interest': return 'var(--color-accent)';
      default: return 'var(--color-muted)';
    }
  };

  const getLevelText = (level: string) => {
    switch (level) {
      case 'passion': return 'Passion';
      case 'hobby': return 'Hobby';
      case 'interest': return 'Intérêt';
      default: return level;
    }
  };

  const filteredHobbies = activeCategory === 'all' 
    ? hobbies 
    : hobbies.filter(hobby => hobby.category === activeCategory);

  return (
    <div className="w-full">
      {/* Header */}
      <h2 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold mb-3 sm:mb-4 text-left" style={{ color: 'var(--color-primary)' }}>
        Hobbies & Intérêts
      </h2>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
            activeCategory === 'all' ? 'text-white' : ''
          }`}
          style={{
            backgroundColor: activeCategory === 'all' ? 'var(--color-primary)' : 'var(--color-surface)',
            color: activeCategory === 'all' ? 'white' : 'var(--color-text)',
            border: `1px solid ${activeCategory === 'all' ? 'var(--color-primary)' : 'var(--color-border)'}`
          }}
        >
          🎯 Tous
        </button>
        {Object.entries(hobbyCategories).map(([key, category]) => (
          <button
            key={key}
            onClick={() => setActiveCategory(key)}
            className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 flex items-center gap-1 ${
              activeCategory === key ? 'text-white' : ''
            }`}
            style={{
              backgroundColor: activeCategory === key ? category.color : 'var(--color-surface)',
              color: activeCategory === key ? 'white' : 'var(--color-text)',
              border: `1px solid ${activeCategory === key ? category.color : 'var(--color-border)'}`
            }}
          >
            <span>{category.icon}</span>
            <span>{category.name}</span>
          </button>
        ))}
      </div>

      {/* Hobbies Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
        {filteredHobbies.map((hobby) => (
          <div
            key={hobby.name}
            className="group relative overflow-hidden rounded-lg transition-all duration-200 hover:scale-105"
            style={{ 
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)'
            }}
          >
            {/* Hobby Card */}
            <div className="p-3 sm:p-4">
              {/* Header */}
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xl sm:text-2xl">{hobby.icon}</span>
                  <div>
                    <h3 className="font-semibold text-sm sm:text-base" style={{ color: 'var(--color-text)' }}>
                      {hobby.name}
                    </h3>
                    <div 
                      className="text-xs font-medium"
                      style={{ color: getLevelColor(hobby.level) }}
                    >
                      {getLevelText(hobby.level)}
                    </div>
                  </div>
                </div>
                <div 
                  className="text-xs px-2 py-1 rounded-full"
                  style={{ 
                    backgroundColor: hobbyCategories[hobby.category].color,
                    color: 'white'
                  }}
                >
                  {hobbyCategories[hobby.category].name}
                </div>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                {hobby.description}
              </p>
            </div>

            {/* Hover Effect */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-200"
              style={{
                background: `linear-gradient(135deg, ${hobbyCategories[hobby.category].color}20, transparent)`
              }}
            />
          </div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="mt-6 sm:mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {Object.entries(hobbyCategories).map(([key, category]) => {
          const count = hobbies.filter(h => h.category === key).length;
          return (
            <div
              key={key}
              className="text-center p-3 rounded-lg"
              style={{ 
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)'
              }}
            >
              <div className="text-2xl sm:text-3xl mb-1">{category.icon}</div>
              <div className="text-lg sm:text-xl font-bold" style={{ color: category.color }}>
                {count}
              </div>
              <div className="text-xs sm:text-sm" style={{ color: 'var(--color-muted)' }}>
                {category.name}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
