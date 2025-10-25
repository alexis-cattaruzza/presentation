import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { hobbies, hobbyCategories } from "../data/hobbies";
import Icon from "./Icon";

export default function Hobbies() {
  const { t } = useTranslation();
  const [isMobile, setIsMobile] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-slide for mobile
  useEffect(() => {
    if (!isMobile) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % Object.keys(hobbyCategories).length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isMobile]);

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
      case 'passion': return t('hobbies.levels.passion');
      case 'hobby': return t('hobbies.levels.hobby');
      case 'interest': return t('hobbies.levels.interest');
      default: return level;
    }
  };

  const getTranslatedHobbyName = (hobbyName: string) => {
    const hobbyKey = hobbyName.toLowerCase()
      .replace(/[^a-z0-9]/g, '')
      .replace('formule1', 'f1')
      .replace('padel', 'padel')
      .replace('courseàpied', 'running')
      .replace('voyage', 'travel')
      .replace('développement', 'dev')
      .replace('itpersonnel', '')
      .replace('lecture', 'reading')
      .replace('technique', '')
      .replace('cuisine', 'cooking');
    
    return t(`hobbies.items.${hobbyKey}.name`, hobbyName);
  };

  const getTranslatedHobbyDescription = (hobbyName: string) => {
    const hobbyKey = hobbyName.toLowerCase()
      .replace(/[^a-z0-9]/g, '')
      .replace('formule1', 'f1')
      .replace('padel', 'padel')
      .replace('voyage', 'travel')
      .replace('courseàpied', 'running')
      .replace('développement', 'dev')
      .replace('itpersonnel', '')
      .replace('lecture', 'reading')
      .replace('technique', '')
      .replace('cuisine', 'cooking');
    
    return t(`hobbies.items.${hobbyKey}.description`, hobbyName);
  };

  const getTranslatedCategoryName = (categoryKey: string) => {
    return t(`hobbies.categories.${categoryKey}.name`);
  };

  // Navigation functions for slider
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Object.keys(hobbyCategories).length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Object.keys(hobbyCategories).length) % Object.keys(hobbyCategories).length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };




  return (
    <div className="w-full">
      {/* Header */}
      <h2 className="section-title" style={{ color: 'var(--color-primary)' }}>
        {t('hobbies.title')}
      </h2>

      {/* Hobbies Slider */}
      <div className="relative">
        {/* Hobbies Container */}
        <div className="overflow-hidden rounded-xl" style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {Object.entries(hobbyCategories).map(([key, category]) => {
              const categoryHobbies = hobbies.filter(hobby => hobby.category === key);
              return (
                <div key={key} className="w-full shrink-0">
                  <div className="p-4 sm:p-6">
                    {/* Category Header */}
                    <div className="text-center mb-4 sm:mb-6">
                      <div className="flex items-center justify-center gap-3 mb-2">
                        <Icon name={category.icon} size={32} style={{ color: category.color }} />
                        <h3 className="section-subtitle" style={{ color: 'var(--color-text)' }}>
                          {getTranslatedCategoryName(key)}
                        </h3>
                      </div>
                      <p className="card-text" style={{ color: 'var(--color-muted)' }}>
                        {categoryHobbies.length} {categoryHobbies.length === 1 ? 'hobby' : 'hobbies'}
                      </p>
                    </div>

                    {/* Hobbies Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                      {categoryHobbies.map((hobby) => (
                        <div
                          key={hobby.name}
                          className="group relative overflow-hidden rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg"
                          style={{ 
                            backgroundColor: 'var(--color-background)',
                            border: '1px solid var(--color-border)',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                          }}
                        >
                          {/* Hobby Card Content */}
                          <div className="p-4">
                            {/* Header */}
                            <div className="flex items-center gap-3 mb-3">
                              <div 
                                className="w-10 h-10 rounded-lg flex items-center justify-center text-xl"
                                style={{ 
                                  backgroundColor: category.color + '20',
                                  color: category.color
                                }}
                              >
                                <Icon name={hobby.icon} size={24} />
                              </div>
                              <div className="flex-1">
                                <h4 className="card-title" style={{ color: 'var(--color-text)' }}>
                                  {getTranslatedHobbyName(hobby.name)}
                                </h4>
                                <div 
                                  className="card-text"
                                  style={{ color: getLevelColor(hobby.level) }}
                                >
                                  {getLevelText(hobby.level)}
                                </div>
                              </div>
                            </div>

                            {/* Description */}
                            <p className="card-text leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                              {getTranslatedHobbyDescription(hobby.name)}
                            </p>
                          </div>

                          {/* Hover Effect */}
                          <div 
                            className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300"
                            style={{
                              background: `linear-gradient(135deg, ${category.color}20, transparent)`
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Simplified Navigation - Only Bulles and Arrows */}
      <div className="flex items-center justify-center gap-2 sm:gap-4 mt-6 sm:mt-8">
        {/* Previous Button */}
        <button
          onClick={prevSlide}
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
          style={{ 
            backgroundColor: 'var(--color-surface)',
            color: 'var(--color-text)',
            border: '1px solid var(--color-border)'
          }}
        >
          <Icon name="chevron-left" size={16} />
        </button>

        {/* Category Bulles */}
        <div className="flex items-center gap-2 sm:gap-3">
          {Object.entries(hobbyCategories).map(([key], index) => (
            <button
              key={key}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all duration-300 ${
                currentSlide === index ? 'w-6 sm:w-8' : ''
              }`}
              style={{
                backgroundColor: currentSlide === index ? 'var(--color-primary)' : 'var(--color-muted)'
              }}
              title={getTranslatedCategoryName(key)}
            />
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={nextSlide}
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
          style={{ 
            backgroundColor: 'var(--color-primary)',
            color: 'white',
            border: '1px solid var(--color-primary)'
          }}
        >
          <Icon name="chevron-right" size={16} />
        </button>
      </div>

    </div>
  );
}
