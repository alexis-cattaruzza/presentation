import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import skillCategories from "../data/skills";
import Icon from "./Icon";

export default function Skills() {
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Detect screen size and type
  useEffect(() => {
    const checkScreen = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setIsMobile(width < 1024);
      setIsLargeScreen(width >= 1000 && height >= 645);
    };
    
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
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
    const skillKey = skillName.toLowerCase()
      .replace(/[^a-z0-9]/g, '')
      .replace('développement', '')
      .replace('fullstack', 'fullstack')
      .replace('architecture', 'architecture')
      .replace('logicielle', '')
      .replace('optimisation', 'performance')
      .replace('performance', '')
      .replace('tests', 'testing')
      .replace('qualité', '')
      .replace('gestion', 'project')
      .replace('projet', '')
      .replace('java', 'java')
      .replace('typescript', 'typescript')
      .replace('angular', 'angular')
      .replace('react', 'react')
      .replace('sql', 'sql')
      .replace('docker', 'docker')
      .replace('git', 'git')
      .replace('html', 'htmlcss')
      .replace('css', '')
      .replace('spring', 'spring')
      .replace('boot', '')
      .replace('javascript', 'javascript')
      .replace('python', 'python')
      .replace('agile', 'agile')
      .replace('scrum', '')
      .replace('devops', 'devops')
      .replace('code', 'codereview')
      .replace('review', '')
      .replace('documentation', 'documentation')
      .replace('debugging', 'debugging')
      .replace('cicd', 'cicd')
      .replace('tests', 'unittests')
      .replace('unitaires', '');
    
    return t(`skills.items.${skillKey}`, skillName);
  };

  const getTranslatedCategoryTitle = (categoryId: string) => {
    return t(`skills.categories.${categoryId}.title`);
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
      setCurrentSlide((prev) => (prev + 1) % skillCategories.length);
    } else if (isRightSwipe) {
      setCurrentSlide((prev) => (prev - 1 + skillCategories.length) % skillCategories.length);
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

          {/* Mobile Navigation - Bulles seulement */}
          <div className="flex items-center justify-center gap-2 mt-4">
            {skillCategories.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all duration-300 ${
                  currentSlide === index ? 'w-6 sm:w-8' : ''
                }`}
                style={{
                  backgroundColor: currentSlide === index ? 'var(--color-primary)' : 'var(--color-muted)'
                }}
                title={`Catégorie ${index + 1}`}
              />
            ))}
          </div>
        </div>
      ) : isLargeScreen ? (
        /* Large Screen: Tabbed Layout */
        <div className="w-full">
          

          {/* Tab Content */}
          <div className="relative">
            <div className="overflow-hidden rounded-xl" style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
              <div 
                className="flex transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {skillCategories.map((category) => (
                  <div key={category.id} className="w-full shrink-0">
                    <div className="p-6">
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

            {/* Navigation Controls - Bulles seulement */}
            <div className="flex items-center justify-center gap-2 mt-6">
              {skillCategories.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all duration-300 ${
                    currentSlide === index ? 'w-6 sm:w-8' : ''
                  }`}
                  style={{
                    backgroundColor: currentSlide === index ? 'var(--color-primary)' : 'var(--color-muted)'
                  }}
                  title={`Catégorie ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Mobile/Tablet: Accordion Layout */
        <div className="w-full space-y-3 sm:space-y-4">
          {skillCategories.map((category) => (
            <div 
              key={category.id} 
              className="rounded-xl overflow-hidden"
              style={{ 
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)'
              }}
            >
              {/* Category Header - Always Visible */}
              <div className="p-3 sm:p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Icon name={category.icon} size={24} style={{ color: 'var(--color-primary)' }} />
                    <div>
                      <h3 className="card-title" style={{ color: 'var(--color-text)' }}>
                        {getTranslatedCategoryTitle(category.id)}
                      </h3>
                      <p className="card-text" style={{ color: 'var(--color-muted)' }}>
                        {category.skills.length} compétences
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Skills List - Compact Cards */}
              <div className="px-3 sm:px-4 pb-3 sm:pb-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                  {category.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="flex items-center gap-3 p-3 sm:p-4 rounded-lg transition-all duration-200 hover:scale-105"
                      style={{ 
                        backgroundColor: 'var(--color-background)',
                        border: '1px solid var(--color-border)'
                      }}
                    >
                      <Icon name={skill.icon} size={20} style={{ color: 'var(--color-primary)' }} />
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
      )}
    </div>
  );
}
