import { useState} from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import timeline from "../data/timeline";
import Icon from "./Icon";

export default function InteractiveTimeline() {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);

  // Obtenir l'icône selon le type de catégorie (français et anglais)
  const getIconName = (category: string) => {
    // Expérience Professionnelle / Professional Experience
    if (category.includes('Expérience Professionnelle') || category.includes('Professional Experience')) {
      return 'briefcase';
    }
    // Stage & Formation / Internship & Training
    if (category.includes('Stage & Formation') || category.includes('Internship & Training')) {
      return 'award';
    }
    // Formation / Education
    if (category.includes('Formation') || category.includes('Education')) {
      return 'graduation-cap';
    }
    return 'briefcase'; // Par défaut
  };

  const primaryColor = 'var(--color-primary)';

  // Calculer le pourcentage de progression jusqu'au bas de l'icône active
  const progressPercentage = timeline.length > 1 
    ? activeIndex === timeline.length - 1
      ? 100 // Dernier élément : barre complète
      : ((activeIndex + 1) / timeline.length) * 100
    : 100;

  return (
    <section className="w-full">
      <h2 className="section-title mb-4 md:mb-6" style={{ color: 'var(--color-primary)' }}>
        {t('timeline.title')}
      </h2>

      {/* Vertical Timeline */}
      <div className="relative">
        {/* Barre de fond (contour) */}
        <div 
          className="absolute left-6 top-0 bottom-0 w-0.5"
          style={{ 
            backgroundColor: 'var(--color-border)'
          }} 
        />
        
        {/* Barre de progression progressive */}
        <motion.div
          className="absolute left-6 top-0 w-0.5"
          style={{ 
            backgroundColor: primaryColor,
            transformOrigin: 'top'
          }}
          initial={{ height: 0 }}
          animate={{ 
            height: `${progressPercentage}%`
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />

        {/* Timeline Items */}
        <div className="ml-16 space-y-6">
            {timeline.map((item, index) => {
              const isActive = activeIndex === index;
              const category = t(`timeline.items.${item.translationKey}.category`);
              const iconName = getIconName(category);
              
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  {/* Timeline Node */}
                  <div className="flex gap-4">
                    {/* Left side - Timeline Node cliquable */}
                    <div className="flex flex-col items-center">
                      <button
                        onClick={() => setActiveIndex(index)}
                        className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 z-10 cursor-pointer ${
                          isActive ? 'scale-125' : ''
                        }`}
                        style={{
                          backgroundColor: isActive ? primaryColor : 'var(--color-surface)',
                          color: isActive ? 'white' : 'var(--color-text)',
                          border: `3px solid ${isActive ? primaryColor : 'var(--color-border)'}`,
                          boxShadow: isActive 
                            ? '0 4px 16px rgba(112, 135, 76, 0.4)' 
                            : '0 2px 8px rgba(0,0,0,0.1)'
                        }}
                        aria-label={`${category} - ${t(`timeline.items.${item.translationKey}.role`)}`}
                      >
                        <Icon name={iconName} size={20} />
                      </button>
                    </div>

                    {/* Right side - Content Card - Zone cliquable élargie */}
                    <button 
                      onClick={() => setActiveIndex(index)}
                      className="flex-1 pb-6 text-left"
                    >
                      <div
                        className="rounded-xl p-4 transition-all duration-300"
                        style={{
                          backgroundColor: isActive ? 'var(--color-surface)' : 'transparent',
                          border: `1px solid ${isActive ? 'var(--color-border)' : 'transparent'}`,
                          boxShadow: isActive ? '0 4px 12px rgba(0,0,0,0.08)' : 'none'
                        }}
                      >
                        {/* Header */}
                        <div className="mb-2">
                          <div className="flex items-start justify-between gap-2 flex-wrap">
                            <div className="flex-1 min-w-0">
                              <div 
                                className="text-xs font-semibold uppercase tracking-wide mb-1"
                                style={{ color: primaryColor }}
                              >
                                {t(`timeline.items.${item.translationKey}.category`)}
                              </div>
                              <h3 className="text-lg md:text-xl font-bold mb-1" style={{ color: 'var(--color-text)' }}>
                                {t(`timeline.items.${item.translationKey}.role`)}
                              </h3>
                              <p className="text-md font-semibold mb-1" style={{ color: 'var(--color-primary)' }}>
                                {t(`timeline.items.${item.translationKey}.company`)}
                              </p>
                              <p className="text-sm" style={{ color: 'var(--color-muted)' }}>
                                {t(`timeline.items.${item.translationKey}.date`)}
                              </p>
                            </div>
                            
                          </div>
                        </div>

                        {/* Description */}
                        {isActive && (
                          <div className="overflow-hidden">
                            <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--color-text)' }}>
                              {t(`timeline.items.${item.translationKey}.description`)}
                            </p>

                            {/* Skills */}
                            <div className="flex flex-wrap gap-1.5">
                              {item.skills.map((skill) => (
                                <span
                                  key={skill}
                                  className="px-2 py-0.5 text-xs rounded-md font-medium"
                                  style={{ 
                                    backgroundColor: primaryColor,
                                    color: 'white',
                                    boxShadow: `0 2px 4px rgba(112, 135, 76, 0.4)`
                                  }}
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </button>
                  </div>
                </motion.div>
              );
            })}
        </div>
      </div>
    </section>
  );
}
