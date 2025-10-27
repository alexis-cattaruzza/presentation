import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import timeline from "../data/timeline";
import Icon from "./Icon";

export default function InteractiveTimeline() {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);

  // Obtenir l'icône selon le type de catégorie
  const getIconName = (category: string) => {
    if (category.includes('Expérience Professionnelle')) return 'briefcase';
    if (category.includes('Stage & Formation')) return 'award';
    if (category.includes('Formation')) return 'graduation-cap';
    return 'briefcase';
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Expérience Professionnelle': return 'var(--color-success)';
      case 'Stage & Formation': return 'var(--color-primary)';
      case 'Formation': return 'var(--color-accent)';
      default: return 'var(--color-muted)';
    }
  };

  const skillsColors = [
    'var(--color-primary)',
    'var(--color-accent)', 
    'var(--color-success)',
    'var(--color-secondary)',
    'var(--color-info)'
  ];

  return (
    <section className="w-full">
      <h2 className="section-title mb-4 md:mb-6" style={{ color: 'var(--color-primary)' }}>
        {t('timeline.title')}
      </h2>

      {/* Vertical Timeline */}
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-linear-to-b from-var(--color-primary) via-var(--color-accent) to-var(--color-success)" 
             style={{ 
               background: 'linear-gradient(to bottom, var(--color-primary), var(--color-accent), var(--color-success))' 
             }} />

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
                    {/* Left side - Timeline Node with Progress Bar */}
                    <div className="flex flex-col items-center">
                      <motion.div
                        className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 z-10 ${
                          isActive ? 'scale-125' : ''
                        }`}
                        style={{
                          backgroundColor: isActive ? 'var(--color-primary)' : 'var(--color-surface)',
                          color: isActive ? 'white' : 'var(--color-text)',
                          border: `3px solid ${isActive ? 'var(--color-success)' : 'var(--color-border)'}`,
                          boxShadow: isActive 
                            ? '0 4px 16px rgba(112, 135, 76, 0.4)' 
                            : '0 2px 8px rgba(0,0,0,0.1)'
                        }}
                      >
                        <Icon name={iconName} size={20} />
                      </motion.div>
                      
                      {index < timeline.length - 1 && (
                        <div className="relative w-0.5 h-6 mt-0.5">
                          {/* Barre de progression */}
                          <motion.div
                            className="absolute top-0 left-0 w-full rounded-full"
                            style={{
                              backgroundColor: 'var(--color-border)',
                              height: '100%'
                            }}
                            initial={{ scaleY: 0 }}
                            animate={{ 
                              scaleY: index < activeIndex ? 1 : 0,
                              backgroundColor: index < activeIndex ? 'var(--color-success)' : 'var(--color-border)'
                            }}
                            transition={{ duration: 0.5 }}
                          />
                        </div>
                      )}
                    </div>

                    {/* Right side - Content Card - Zone cliquable élargie */}
                    <button 
                      onClick={() => setActiveIndex(index)}
                      className="flex-1 pb-6 text-left"
                    >
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={`${item.id}-${isActive}`}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
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
                                  style={{ color: getCategoryColor(t(`timeline.items.${item.translationKey}.category`)) }}
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
                              
                              {/* Year badge */}
                              <div 
                                className="px-3 py-1 rounded-full text-xs font-bold shrink-0"
                                style={{ 
                                  backgroundColor: getCategoryColor(t(`timeline.items.${item.translationKey}.category`)),
                                  color: 'white'
                                }}
                              >
                                {item.year}
                              </div>
                            </div>
                          </div>

                          {/* Description */}
                          <AnimatePresence>
                            {isActive && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--color-text)' }}>
                                  {t(`timeline.items.${item.translationKey}.description`)}
                                </p>

                                {/* Skills */}
                                <div className="flex flex-wrap gap-1.5">
                                  {item.skills.map((skill, skillIndex) => (
                                    <motion.span
                                      key={skill}
                                      initial={{ opacity: 0, scale: 0.8 }}
                                      animate={{ opacity: 1, scale: 1 }}
                                      transition={{ delay: skillIndex * 0.05 }}
                                      className="px-2 py-0.5 text-xs rounded-md font-medium"
                                      style={{ 
                                        backgroundColor: skillsColors[skillIndex % skillsColors.length],
                                        color: 'white',
                                        boxShadow: `0 2px 4px ${skillsColors[skillIndex % skillsColors.length]}40`
                                      }}
                                    >
                                      {skill}
                                    </motion.span>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      </AnimatePresence>
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
