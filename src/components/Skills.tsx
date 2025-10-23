import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import skillCategories from "../data/skills";

export default function Skills() {
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
      default: return 'var(--color-muted)';
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % skillCategories.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + skillCategories.length) % skillCategories.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Touch handlers for mobile swipe
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
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  return (
    <div className="skills-section w-full">
      {/* Header */}
      <h2 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold mb-3 sm:mb-4 text-left" style={{ color: 'var(--color-primary)' }}>
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
                      <span className="text-xl">{category.icon}</span>
                      <h3 className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>
                        {category.title}
                      </h3>
                    </div>

                    {/* Skills Grid - Mobile */}
                    <div className="grid grid-cols-1 gap-1.5">
                      {category.skills.map((skill) => (
                        <div
                          key={skill.name}
                          className="skills-item flex items-center gap-1.5 p-1.5 rounded-lg transition-all duration-200 hover:scale-105"
                          style={{ 
                            backgroundColor: 'var(--color-surface)',
                            border: '1px solid var(--color-border)'
                          }}
                        >
                          {/* Icon */}
                          <span className="skills-icon shrink-0 text-sm">
                            {skill.icon}
                          </span>
                          
                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-xs truncate" style={{ color: 'var(--color-text)' }}>
                              {skill.name}
                            </div>
                            <div 
                              className="text-xs font-medium"
                              style={{ color: getLevelColor(skill.level) }}
                            >
                              {skill.level}
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

          {/* Mobile Navigation */}
          <div className="flex flex-col items-center gap-3 mt-4">
            {/* Slide Counter & Info */}
            <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--color-muted)' }}>
              <span>{currentSlide + 1} / {skillCategories.length}</span>
              <span>•</span>
              <span>Glissez pour naviguer</span>
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center justify-center gap-4">
              {/* Previous Button */}
              <button
                onClick={prevSlide}
                className="w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                style={{ 
                  backgroundColor: 'var(--color-surface)',
                  color: 'var(--color-text)',
                  border: '1px solid var(--color-border)'
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="m15 18-6-6 6-6"/>
                </svg>
              </button>

              {/* Slide Indicators */}
              <div className="flex items-center gap-1.5">
                {skillCategories.map((category, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`rounded-full transition-all duration-300 flex items-center gap-1 px-2 py-1 ${
                      index === currentSlide ? 'px-3' : 'px-2'
                    }`}
                    style={{
                      backgroundColor: index === currentSlide 
                        ? 'var(--color-primary)' 
                        : 'var(--color-surface)',
                      border: `1px solid ${index === currentSlide ? 'var(--color-primary)' : 'var(--color-border)'}`
                    }}
                  >
                    <span className="text-xs">{category.icon}</span>
                    {index === currentSlide && (
                      <span className="text-xs font-medium text-white truncate max-w-16">
                        {category.title.split(' ')[0]}
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {/* Next Button */}
              <button
                onClick={nextSlide}
                className="w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                style={{ 
                  backgroundColor: 'var(--color-primary)',
                  color: 'white',
                  border: '1px solid var(--color-primary)'
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="m9 18 6-6-6-6"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Desktop: Grid Layout */
        <div className="skills-categories-grid">
          {skillCategories.map((category) => (
            <div key={category.id} className="flex flex-col h-full">
              {/* Category Header */}
              <div className="flex items-center gap-2 mb-2 sm:mb-3">
                <span className="text-lg sm:text-xl lg:text-2xl">{category.icon}</span>
                <h3 className="text-xs sm:text-sm lg:text-base xl:text-lg font-semibold" style={{ color: 'var(--color-text)' }}>
                  {category.title}
                </h3>
              </div>

              {/* Skills Grid - Ultra Compact */}
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-1 sm:gap-1.5 overflow-y-auto">
                {category.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="skills-item flex items-center gap-1.5 p-1.5 rounded-lg transition-all duration-200 hover:scale-105"
                    style={{ 
                      backgroundColor: 'var(--color-surface)',
                      border: '1px solid var(--color-border)'
                    }}
                  >
                    {/* Icon */}
                    <span className="skills-icon shrink-0 text-xs sm:text-sm">
                      {skill.icon}
                    </span>
                    
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-xs truncate" style={{ color: 'var(--color-text)' }}>
                        {skill.name}
                      </div>
                      <div 
                        className="text-xs font-medium"
                        style={{ color: getLevelColor(skill.level) }}
                      >
                        {skill.level}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
