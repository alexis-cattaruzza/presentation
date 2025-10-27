import { useTranslation } from "react-i18next";
import skillCategories from "../data/skills";
import Icon from "./Icon";
import Carousel from "./Carousel";

export default function Skills() {
  const { t } = useTranslation();

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
      "Tests & Qualité": "testing",
      "Gestion de Projet": "project",
      "Optimisation des Performances": "performance",
      "Méthodes Agiles/Scrum": "agile",
      "Documentation Technique": "documentation",
      "Intégration Continue/Déploiement": "cicd"
    };
    
    const skillKey = skillKeyMap[skillName] || skillName.toLowerCase().replace(/[^a-z0-9]/g, '');
    return t(`skills.items.${skillKey}.name`, skillName);
  };

  const getTranslatedCategoryName = (categoryKey: string) => {
    return t(`skills.categories.${categoryKey}.name`);
  };

  return (
    <div className="w-full">
      {/* Header */}
      <h2 className="section-title" style={{ color: 'var(--color-primary)' }}>
        {t('skills.title')}
      </h2>

      {/* Skills Carousel */}
      <Carousel
        itemsPerView={{ mobile: 1, tablet: 2, desktop: 3 }}
        showArrows={true}
        showDots={true}
        autoPlay={false}
        className="p-4"
        itemClassName="p-2"
      >
        {Object.entries(skillCategories).map(([key, category]) => (
          <div
            key={key}
            className="group relative overflow-hidden rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg h-full"
            style={{ 
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}
          >
            {/* Category Card Content */}
            <div className="p-6 h-full flex flex-col">
              {/* Category Header */}
              <div className="text-center mb-6">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <Icon name={category.icon} size={24} />
                  <h3 className="section-subtitle" style={{ color: 'var(--color-text)' }}>
                    {getTranslatedCategoryName(key)}
                  </h3>
                </div>
                <p className="card-text" style={{ color: 'var(--color-muted)' }}>
                  {category.skills.length} compétences
                </p>
              </div>

              {/* Skills Grid */}
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {category.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="group/item relative overflow-hidden rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-md"
                    style={{
                      backgroundColor: 'var(--color-background)',
                      border: '1px solid var(--color-border)',
                      boxShadow: '0 1px 4px rgba(0,0,0,0.1)'
                    }}
                  >
                    <div className="p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <Icon name={skill.icon} size={20}/>
                        <div className="flex-1 min-w-0">
                          <h4 className="card-title text-sm leading-tight mb-1" style={{ color: 'var(--color-text)' }}>
                            {getTranslatedSkillName(skill.name)}
                          </h4>
                          <div
                            className="card-text text-xs"
                            style={{ color: getLevelColor(skill.level) }}
                          >
                            {getTranslatedLevel(skill.level)}
                          </div>
                        </div>
                      </div>

                      {/* Level Badge */}
                      <div className="mt-2 flex justify-end">
                        <span 
                          className="px-2 py-1 text-xs rounded-full font-medium"
                          style={{ 
                            backgroundColor: getLevelColor(skill.level),
                            color: 'white'
                          }}
                        >
                          {getTranslatedLevel(skill.level)}
                        </span>
                      </div>
                    </div>

                    {/* Hover Effect Overlay */}
                    <div 
                      className="absolute inset-0 opacity-0 group-hover/item:opacity-5 transition-opacity duration-300"
                      style={{
                        background: `linear-gradient(135deg, var(--color-primary)20, transparent)`
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Category Hover Effect */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300"
              style={{
                background: `linear-gradient(135deg, var(--color-primary)20, transparent)`
              }}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
}