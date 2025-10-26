import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import skillCategories from "../data/skills";
import Icon from "./Icon";

export default function Skills() {
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Detect screen size and type
  useEffect(() => {
    const checkScreen = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768); // Only true mobile devices
    };
    
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  // Check screen types
  const isTablet = typeof window !== 'undefined' && window.innerWidth >= 768 && window.innerWidth < 1024;
  const isSmallPC = typeof window !== 'undefined' && window.innerWidth >= 1024 && window.innerWidth < 1200;

  // Auto-scroll for mobile
  useEffect(() => {
    if (!isMobile) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % skillCategories.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isMobile]);

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Expert': return 'var(--color-success)';
      case 'Avancé': return 'var(--color-primary)';
      case 'Intermédiaire': return 'var(--color-accent)';
      case 'Connaissance': return 'var(--color-muted)';
      default: return 'var(--color-muted)';
    }
  };

  const getTranslatedLevel = (level: string) => {
    switch (level) {
      case 'Expert': return t('skills.levels.expert');
      case 'Avancé': return t('skills.levels.advanced');
      case 'Intermédiaire': return t('skills.levels.intermediate');
      case 'Connaissance': return t('skills.levels.knowledge');
      default: return level;
    }
  };

  const getTranslatedSkillName = (skillName: string) => {
    // Mapping direct des noms vers les clés de traduction
    const skillKeyMap: { [key: string]: string } = {
      "Développement Full-Stack": "fullstack",
      "Architecture Logicielle": "architecture",
      "Optimisation Performance": "performance",
      "Tests & Qualité": "testing",
      "Gestion de Projet": "project",
      "Java": "java",
      "TypeScript": "typescript",
      "Angular": "angular",
      "SQL": "sql",
      "Git": "git",
      "HTML/CSS": "htmlcss",
      "Spring Boot": "spring",
      "React": "react",
      "Docker": "docker",
      "JavaScript": "javascript",
      "Python": "python",
      "Agile/Scrum": "agile",
      "Code Review": "codereview",
      "Documentation": "documentation",
      "Debugging": "debugging",
      "DevOps": "devops",
      "CI/CD": "cicd",
      "Tests Unitaires": "unittests"
    };
    
    const skillKey = skillKeyMap[skillName] || skillName.toLowerCase().replace(/[^a-z0-9]/g, '');
    return t(`skills.items.${skillKey}`, skillName);
  };

  const getTranslatedCategoryTitle = (categoryId: string) => {
    return t(`skills.categories.${categoryId}.title`);
  };

  // Navigation functions for slider
  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + skillCategories.length) % skillCategories.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % skillCategories.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Touch handlers for mobile/tablet swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 75; // Increased threshold for better UX
    const isRightSwipe = distance < -75;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    }
  };

  return (
    <div className="skills-section w-full">
      {/* Header */}
      <h2 className="section-title text-left" style={{ color: 'var(--color-primary)' }}>
        {t('skills.title')}
      </h2>

      {/* Mobile: Horizontal Slide */}
      {isMobile ? (
        <div className="relative">
          {/* Mobile Carousel */}
          <div 
            className="overflow-hidden rounded-lg"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {skillCategories.map((category) => (
                <div key={category.id} className="w-full shrink-0 px-2">
                  <div className="flex flex-col h-full">
                    {/* Category Header */}
                    <div className="flex items-center gap-2 mb-3">
                      <Icon name={category.icon} size={20}/>
                      <h3 className="card-title" style={{ color: 'var(--color-text)' }}>
                        {getTranslatedCategoryTitle(category.id)}
                      </h3>
                    </div>

                    {/* Skills Grid - Mobile */}
                    <div className="grid grid-cols-1 gap-1.5">
                      {category.skills.map((skill) => (
                        <div
                          key={skill.name}
                          className="skills-item flex items-center gap-3 p-2 rounded-lg transition-all duration-200 hover:scale-105"
                          style={{ 
                            backgroundColor: 'var(--color-surface)',
                            border: '1px solid var(--color-border)'
                          }}
                        >
                          <Icon name={skill.icon} size={20}/>
                          <div className="flex-1 min-w-0">
                            <div className="card-title truncate" style={{ color: 'var(--color-text)' }}>
                              {getTranslatedSkillName(skill.name)}
                            </div>
                            <div 
                              className="card-text"
                              style={{ color: getLevelColor(skill.level) }}
                            >
                              {getTranslatedLevel(skill.level)}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced Mobile Navigation - Bulles avec flèches sur les côtés */}
          <div className="flex items-center justify-center gap-2 mt-4">
            {/* Left Arrow - Only for screens < 1024px */}
            {(isMobile || isTablet) && (
              <button
                onClick={goToPrevious}
                className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
                style={{
                  backgroundColor: 'var(--color-primary)',
                  border: '2px solid var(--color-primary-hover)',
                  color: 'white',
                  boxShadow: '0 2px 8px rgba(112, 135, 76, 0.3)'
                }}
                title={t('common.previous')}
              >
                <Icon name="chevron-left" size={16} />
              </button>
            )}

            {/* Navigation Bulles */}
            {skillCategories.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all duration-300 hover:scale-110 ${
                  currentSlide === index ? 'w-6 sm:w-8' : ''
                } ${isSmallPC ? 'hover:shadow-lg cursor-pointer' : ''}`}
                style={{
                  backgroundColor: currentSlide === index ? 'var(--color-primary)' : 'var(--color-muted)',
                  boxShadow: isSmallPC ? (currentSlide === index ? '0 0 8px rgba(112, 135, 76, 0.4)' : '0 2px 4px rgba(0,0,0,0.1)') : 'none',
                  border: isSmallPC ? '1px solid rgba(112, 135, 76, 0.2)' : 'none'
                }}
                title={`Catégorie ${index + 1}`}
              />
            ))}

            {/* Right Arrow - Only for screens < 1024px */}
            {(isMobile || isTablet) && (
              <button
                onClick={goToNext}
                className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
                style={{
                  backgroundColor: 'var(--color-primary)',
                  border: '2px solid var(--color-primary-hover)',
                  color: 'white',
                  boxShadow: '0 2px 8px rgba(112, 135, 76, 0.3)'
                }}
                title={t('common.next')}
              >
                <Icon name="chevron-right" size={16} />
              </button>
            )}
          </div>
        </div>
      ) : isTablet ? (
        /* Tablet/Small PC: Improved Grid Layout */
        <div className="relative">
          {/* Tab Content */}
          <div className="relative">
            <div className="overflow-hidden rounded-xl relative" style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
              {/* Navigation Arrows - Only for screens >= 1024px, integrated in container */}
              {!isMobile && !isTablet && (
                <>
                  {/* Previous Arrow */}
                  <button
                    onClick={goToPrevious}
                    className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
                    style={{
                      backgroundColor: 'var(--color-primary)',
                      border: '2px solid var(--color-primary-hover)',
                      color: 'white',
                      boxShadow: '0 4px 12px rgba(112, 135, 76, 0.3)'
                    }}
                    title={t('common.previous')}
                  >
                    <Icon name="chevron-left" size={18} />
                  </button>

                  {/* Next Arrow */}
                  <button
                    onClick={goToNext}
                    className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
                    style={{
                      backgroundColor: 'var(--color-primary)',
                      border: '2px solid var(--color-primary-hover)',
                      color: 'white',
                      boxShadow: '0 4px 12px rgba(112, 135, 76, 0.3)'
                    }}
                    title={t('common.next')}
                  >
                    <Icon name="chevron-right" size={18} />
                  </button>
                </>
              )}
              <div 
                className="flex transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {skillCategories.map((category) => (
                  <div key={category.id} className="w-full shrink-0">
                    <div className="p-4 sm:p-6" style={{ paddingLeft: '4rem', paddingRight: '4rem' }}>
                      {/* Category Header */}
                      <div className="text-center mb-4">
                        <div className="flex items-center justify-center gap-3 mb-2">
                          <Icon name={category.icon} size={28} />
                          <h3 className="section-subtitle" style={{ color: 'var(--color-text)' }}>
                            {getTranslatedCategoryTitle(category.id)}
                          </h3>
                        </div>
                        <p className="card-text" style={{ color: 'var(--color-muted)' }}>
                          {category.skills.length} compétences
                        </p>
                      </div>

                      {/* Skills Grid - Optimized for tablet */}
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {category.skills.map((skill) => (
                          <div
                            key={skill.name}
                            className="group relative overflow-hidden rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-md"
                            style={{
                              backgroundColor: 'var(--color-background)',
                              border: '1px solid var(--color-border)',
                              boxShadow: '0 1px 4px rgba(0,0,0,0.1)'
                            }}
                          >
                            <div className="p-3">
                              <div className="flex items-center gap-3">
                                <Icon name={skill.icon} size={20}/>
                                <div className="flex-1 min-w-0">
                                  <h4 className="card-title leading-tight mb-1" style={{ color: 'var(--color-text)' }}>
                                    {getTranslatedSkillName(skill.name)}
                                  </h4>
                                  <div
                                    className="card-text"
                                    style={{ color: getLevelColor(skill.level) }}
                                  >
                                    {getTranslatedLevel(skill.level)}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Enhanced Navigation Controls - Bulles avec flèches sur les côtés */}
            <div className="flex items-center justify-center gap-2 mt-6">
              {/* Left Arrow - Only for screens < 1024px */}
              {(isMobile || isTablet) && (
                <button
                  onClick={goToPrevious}
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
                  style={{
                    backgroundColor: 'var(--color-primary)',
                    border: '2px solid var(--color-primary-hover)',
                    color: 'white',
                    boxShadow: '0 2px 8px rgba(112, 135, 76, 0.3)'
                  }}
                  title={t('common.previous')}
                >
                  <Icon name="chevron-left" size={16} />
                </button>
              )}

              {/* Navigation Bulles */}
              {skillCategories.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all duration-300 hover:scale-110 ${
                    currentSlide === index ? 'w-6 sm:w-8' : ''
                  } ${isSmallPC ? 'hover:shadow-lg cursor-pointer' : ''}`}
                  style={{
                    backgroundColor: currentSlide === index ? 'var(--color-primary)' : 'var(--color-muted)',
                    boxShadow: isSmallPC ? (currentSlide === index ? '0 0 8px rgba(112, 135, 76, 0.4)' : '0 2px 4px rgba(0,0,0,0.1)') : 'none',
                    border: isSmallPC ? '1px solid rgba(112, 135, 76, 0.2)' : 'none'
                  }}
                  title={`Catégorie ${index + 1}`}
                />
              ))}

              {/* Right Arrow - Only for screens < 1024px */}
              {(isMobile || isTablet) && (
                <button
                  onClick={goToNext}
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
                  style={{
                    backgroundColor: 'var(--color-primary)',
                    border: '2px solid var(--color-primary-hover)',
                    color: 'white',
                    boxShadow: '0 2px 8px rgba(112, 135, 76, 0.3)'
                  }}
                  title={t('common.next')}
                >
                  <Icon name="chevron-right" size={16} />
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Large Screen: Tabbed Layout */
        <div className="w-full">
          {/* Tab Content */}
          <div className="relative">
            <div className="overflow-hidden rounded-xl relative" style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
              {/* Navigation Arrows - Only for screens >= 1024px, integrated in container */}
              {!isMobile && !isTablet && (
                <>
                  {/* Previous Arrow */}
                  <button
                    onClick={goToPrevious}
                    className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
                    style={{
                      backgroundColor: 'var(--color-primary)',
                      border: '2px solid var(--color-primary-hover)',
                      color: 'white',
                      boxShadow: '0 4px 12px rgba(112, 135, 76, 0.3)'
                    }}
                    title={t('common.previous')}
                  >
                    <Icon name="chevron-left" size={18} />
                  </button>

                  {/* Next Arrow */}
                  <button
                    onClick={goToNext}
                    className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
                    style={{
                      backgroundColor: 'var(--color-primary)',
                      border: '2px solid var(--color-primary-hover)',
                      color: 'white',
                      boxShadow: '0 4px 12px rgba(112, 135, 76, 0.3)'
                    }}
                    title={t('common.next')}
                  >
                    <Icon name="chevron-right" size={18} />
                  </button>
                </>
              )}
              <div 
                className="flex transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {skillCategories.map((category) => (
                  <div key={category.id} className="w-full shrink-0">
                    <div className="p-6" style={{ paddingLeft: '4rem', paddingRight: '4rem' }}>
                      {/* Category Header */}
                      <div className="text-center mb-3">
                        <div className="flex items-center justify-center gap-3 mb-1">
                          <Icon name={category.icon} size={32} />
                          <h3 className="section-subtitle" style={{ color: 'var(--color-text)' }}>
                            {getTranslatedCategoryTitle(category.id)}
                          </h3>
                        </div>
                        <p className="card-text" style={{ color: 'var(--color-muted)' }}>
                          {category.skills.length} compétences
                        </p>
                      </div>

                      {/* Skills Grid - Compact */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-3">
                        {category.skills.map((skill) => (
                          <div
                            key={skill.name}
                            className="group relative overflow-hidden rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-md"
                            style={{
                              backgroundColor: 'var(--color-background)',
                              border: '1px solid var(--color-border)',
                              boxShadow: '0 1px 4px rgba(0,0,0,0.1)'
                            }}
                          >
                            <div className="p-3 sm:p-4">
                              <div className="flex items-center gap-3">
                                <Icon name={skill.icon} size={24}/>
                                <div className="flex-1 min-w-0">
                                  <h4 className="card-title leading-tight mb-1" style={{ color: 'var(--color-text)' }}>
                                    {getTranslatedSkillName(skill.name)}
                                  </h4>
                                  <div
                                    className="card-text"
                                    style={{ color: getLevelColor(skill.level) }}
                                  >
                                    {getTranslatedLevel(skill.level)}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Enhanced Navigation Controls - Bulles avec flèches sur les côtés */}
            <div className="flex items-center justify-center gap-2 mt-6">
              {/* Left Arrow - Only for screens < 1024px */}
              {(isMobile || isTablet) && (
                <button
                  onClick={goToPrevious}
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
                  style={{
                    backgroundColor: 'var(--color-primary)',
                    border: '2px solid var(--color-primary-hover)',
                    color: 'white',
                    boxShadow: '0 2px 8px rgba(112, 135, 76, 0.3)'
                  }}
                  title={t('common.previous')}
                >
                  <Icon name="chevron-left" size={16} />
                </button>
              )}

              {/* Navigation Bulles */}
              {skillCategories.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all duration-300 hover:scale-110 ${
                    currentSlide === index ? 'w-6 sm:w-8' : ''
                  } ${isSmallPC ? 'hover:shadow-lg cursor-pointer' : ''}`}
                  style={{
                    backgroundColor: currentSlide === index ? 'var(--color-primary)' : 'var(--color-muted)',
                    boxShadow: isSmallPC ? (currentSlide === index ? '0 0 8px rgba(112, 135, 76, 0.4)' : '0 2px 4px rgba(0,0,0,0.1)') : 'none',
                    border: isSmallPC ? '1px solid rgba(112, 135, 76, 0.2)' : 'none'
                  }}
                  title={`Catégorie ${index + 1}`}
                />
              ))}

              {/* Right Arrow - Only for screens < 1024px */}
              {(isMobile || isTablet) && (
                <button
                  onClick={goToNext}
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
                  style={{
                    backgroundColor: 'var(--color-primary)',
                    border: '2px solid var(--color-primary-hover)',
                    color: 'white',
                    boxShadow: '0 2px 8px rgba(112, 135, 76, 0.3)'
                  }}
                  title={t('common.next')}
                >
                  <Icon name="chevron-right" size={16} />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}