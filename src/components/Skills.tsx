import { useTranslation } from "react-i18next";
import skillCategories from "../data/skills";
import Icon from "./Icon";
import Carousel from "./Carousel";

export default function Skills() {
  const { t } = useTranslation();

  const getLevelColor = (level: string) => {
    const levelKey = level.toLowerCase();
    switch (levelKey) {
      case 'expert': return 'var(--color-secondary)';
      case 'avancé': case 'advanced': return 'var(--color-primary)';
      case 'intermédiaire': case 'intermediate': return 'var(--color-accent)';
      case 'connaissance': case 'knowledge': return 'var(--color-muted)';
      default: return 'var(--color-muted)';
    }
  };

  const getTranslatedLevel = (level: string) => {
    const levelKey = level.toLowerCase();
    switch (levelKey) {
      case 'expert': return t('skills.levels.expert');
      case 'avancé': case 'advanced': return t('skills.levels.advanced');
      case 'intermédiaire': case 'intermediate': return t('skills.levels.intermediate');
      case 'connaissance': case 'knowledge': return t('skills.levels.knowledge');
      default: return level;
    }
  };

  const getSkillKey = (skillName: string) => {
    const skillKeyMap: { [key: string]: string } = {
      "Développement Full-Stack": "fullstack",
      "Architecture Logicielle": "architecture",
      "Software Architecture": "architecture",
      "Optimisation des Performances": "performance",
      "Performance Optimization": "performance",
      "Optimisation Performance": "performance",
      "Tests & Qualité": "testing",
      "Testing & Quality": "testing",
      "Gestion de Projet": "project",
      "Project Management": "project",
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
      "Agile/Scrum Methods": "agile",
      "Méthodes Agiles/Scrum": "agile",
      "DevOps": "devops",
      "Code Review": "codereview",
      "Révision de Code": "codereview",
      "Documentation Technique": "documentation",
      "Technical Documentation": "documentation",
      "Documentation": "documentation",
      "Débogage": "debugging",
      "Debugging": "debugging",
      "CI/CD": "cicd",
      "Intégration Continue/Déploiement": "cicd",
      "Continuous Integration/Deployment": "cicd",
      "Tests Unitaires": "unittests",
      "Unit Testing": "unittests"
    };
    return skillKeyMap[skillName] || skillName.toLowerCase().replace(/[^a-z0-9]/g, "");
  };

  return (
    <section className="w-full">
      <h2 className="section-title mb-4 md:mb-6" style={{ color: 'var(--color-primary)' }}>
        {t('skills.title')}
      </h2>

      <div className="w-full">
        <div className="md:px-12">
          <Carousel showArrows showDots className="flex-1" autoPlay={false}>
            {skillCategories.map((category) => {
              const categoryKey = category.id;
              const skillCount = category.skills.length;
              
              return (
                <div key={categoryKey} className="h-full flex flex-col px-2">
                  {/* Category Header */}
                  <div className="mb-6 flex flex-col items-center gap-2">  
                    <h3 className="text-xl md:text-2xl font-bold text-center" style={{ color: 'var(--color-text)' }}>
                      {t(`skills.categories.${categoryKey}.title`)}
                    </h3>
                  </div>

                  {/* Skills Grid - Special layout for technologies on mobile */}
                  <div className={`
                    flex-1
                    grid gap-2 sm:gap-3
                    ${categoryKey === 'technologies' ? 
                      'grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6' : 
                      skillCount <= 4 ? 'grid-cols-1 sm:grid-cols-2' :
                      skillCount > 4 && skillCount <= 8 ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' :
                      'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
                    }
                  `}>
                    {category.skills.map((skill) => {
                      const skillKey = getSkillKey(skill.name);
                      const skillColor = getLevelColor(skill.level);
                      
                      return (
                        <div
                          key={skill.name}
                          className={`group relative overflow-hidden rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                            categoryKey === 'technologies' ? 'aspect-square' : ''
                          }`}
                          style={{
                            backgroundColor: 'var(--color-surface)',
                            border: '1px solid var(--color-border)',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                          }}
                        >
                          <div className={`h-full flex flex-col ${categoryKey === 'technologies' ? 'p-2 sm:p-3' : 'p-4'}`}>
                            {categoryKey === 'technologies' ? (
                              /* Compact layout for technologies */
                              <div className="flex flex-col items-center justify-center h-full text-center">
                                <div 
                                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center mb-1 sm:mb-2 transition-transform group-hover:scale-110"
                                  style={{ 
                                    backgroundColor: `${skillColor}15`,
                                  }}
                                >
                                  <Icon name={skill.icon} size={16} className="sm:w-6 sm:h-6"/>
                                </div>
                                <h4 className="font-semibold text-xs sm:text-sm leading-tight mb-1" style={{ color: 'var(--color-text)' }}>
                                  {t(`skills.items.${skillKey}`, skill.name)}
                                </h4>
                                <span 
                                  className="px-1.5 py-0.5 sm:px-2 sm:py-1 text-xs font-semibold rounded-lg"
                                  style={{ 
                                    backgroundColor: skillColor,
                                    color: 'white',
                                    boxShadow: `0 2px 6px ${skillColor}40`
                                  }}
                                >
                                  {getTranslatedLevel(skill.level)}
                                </span>
                              </div>
                            ) : (
                              /* Standard layout for other categories */
                              <div className="flex items-start gap-2">
                                <div 
                                  className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-transform group-hover:scale-110"
                                  style={{ 
                                    backgroundColor: `${skillColor}15`,
                                  }}
                                >
                                  <Icon name={skill.icon} size={20}/>
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between gap-2 mb-1">
                                    <h4 className="font-semibold text-md leading-tight" style={{ color: 'var(--color-text)' }}>
                                      {t(`skills.items.${skillKey}`, skill.name)}
                                    </h4>
                                    <div className="flex items-center gap-2 shrink-0">
                                      <span 
                                        className="px-2 py-1 text-xs font-semibold rounded-lg"
                                        style={{ 
                                          backgroundColor: skillColor,
                                          color: 'white',
                                          boxShadow: `0 2px 6px ${skillColor}40`
                                        }}
                                      >
                                        {getTranslatedLevel(skill.level)}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Hover Gradient Overlay */}
                          <div 
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                            style={{
                              background: `linear-gradient(135deg, ${skillColor}08, transparent)`
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </Carousel>
        </div>
      </div>
    </section>
  );
}
