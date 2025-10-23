import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import timeline from "../data/timeline";

export default function InteractiveTimeline() {
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % timeline.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % timeline.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + timeline.length) % timeline.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  return (
    <div className="w-full">
      <h2 className="text-3xl font-bold mb-8" style={{ color: 'var(--color-primary)' }}>
        Parcours
      </h2>
      
      {/* Container principal */}
      <div className="relative">
        {/* Zone de contenu avec slide */}
        <div className="relative overflow-hidden rounded-xl mb-8" style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
          <motion.div 
            className="flex"
            animate={{ x: `-${currentSlide * 100}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {timeline.map((item, index) => (
              <div key={item.id} className="w-full shrink-0">
                <div className="p-8">
                  {/* En-tête de la slide */}
                  <div className="text-center mb-6">
                    <motion.h3 
                      className="text-2xl font-bold mb-2"
                      style={{ color: 'var(--color-primary)' }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      {t(`timeline.items.${item.translationKey}.role`)}
                    </motion.h3>
                    <motion.div 
                      className="text-lg font-medium mb-1"
                      style={{ color: 'var(--color-secondary)' }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      {t(`timeline.items.${item.translationKey}.company`)}
                    </motion.div>
                    <motion.div 
                      className="text-sm"
                      style={{ color: 'var(--color-muted)' }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      {t(`timeline.items.${item.translationKey}.date`)}
                    </motion.div>
                  </div>

                  {/* Contenu principal */}
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    {/* Description */}
                    <motion.div
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <p 
                        className="text-lg leading-relaxed mb-6"
                        style={{ color: 'var(--color-text)' }}
                      >
                        {t(`timeline.items.${item.translationKey}.description`)}
                      </p>

                      {/* Badges de compétences */}
                      <div className="flex flex-wrap gap-2">
                        {item.skills?.map((skill, skillIndex) => {
                          const colors = [
                            'var(--color-primary)',
                            'var(--color-accent)', 
                            'var(--color-success)',
                            'var(--color-info)',
                            'var(--color-secondary)'
                          ];
                          return (
                            <motion.span
                              key={skill}
                              className="px-3 py-1 text-sm rounded-full font-medium"
                              style={{ 
                                backgroundColor: colors[skillIndex % colors.length],
                                color: 'white'
                              }}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.6 + skillIndex * 0.1 }}
                            >
                              {skill}
                            </motion.span>
                          );
                        })}
                      </div>
                    </motion.div>

                    {/* Zone d'illustration (placeholder pour images) */}
                    <motion.div
                      className="relative"
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 }}
                    >
                      <div 
                        className="w-full h-64 rounded-lg flex items-center justify-center"
                        style={{ 
                          backgroundColor: 'var(--color-background)',
                          border: '2px dashed var(--color-border)'
                        }}
                      >
                        <div className="text-center">
                          <div 
                            className="text-4xl mb-2"
                            style={{ color: 'var(--color-primary)' }}
                          >
                            {index === 0 ? '💼' : index === 1 ? '🎓' : index === 2 ? '📚' : '🏫'}
                          </div>
                          <p 
                            className="text-sm"
                            style={{ color: 'var(--color-muted)' }}
                          >
                            {t(`timeline.items.${item.translationKey}.category`)}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Contrôles de navigation */}
        <div className="flex items-center justify-center gap-8 mb-6">
          {/* Bouton précédent */}
          <motion.button
            onClick={prevSlide}
            className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200"
            style={{ 
              backgroundColor: 'var(--color-surface)',
              color: 'var(--color-text)',
              border: '1px solid var(--color-border)'
            }}
            whileHover={{ scale: 1.1, borderColor: 'var(--color-primary)' }}
            whileTap={{ scale: 0.95 }}
          >
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6"/>
            </svg>
          </motion.button>

          {/* Indicateurs de position */}
          <div className="flex items-center gap-3">
            {timeline.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'w-8' : ''
                }`}
                style={{
                  backgroundColor: index === currentSlide 
                    ? 'var(--color-primary)' 
                    : 'var(--color-muted)'
                }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>

          {/* Bouton suivant */}
          <motion.button
            onClick={nextSlide}
            className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200"
            style={{ 
              backgroundColor: 'var(--color-primary)',
              color: 'var(--color-text)',
              border: '1px solid var(--color-border)'
            }}
            whileHover={{ scale: 1.1, borderColor: 'var(--color-text)' }}
            whileTap={{ scale: 0.95 }}
          >
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="m9 18 6-6-6-6"/>
            </svg>
          </motion.button>
        </div>

        {/* Timeline horizontale avec indicateurs */}
        <div className="relative">
          {/* Ligne de progression */}
          <div 
            className="absolute top-1/2 left-0 h-1 transform -translate-y-1/2 rounded-full"
            style={{ 
              width: `${((currentSlide + 1) / timeline.length) * 100}%`,
              backgroundColor: 'var(--color-primary)'
            }}
          />

          {/* Points de la timeline */}
          <div className="relative flex justify-between items-center py-4">
            {timeline.map((item, index) => (
              <motion.button
                key={item.id}
                onClick={() => goToSlide(index)}
                className="relative flex flex-col items-center cursor-pointer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {/* Point de la timeline */}
                <motion.div
                  className={`w-4 h-4 rounded-full ${
                    index <= currentSlide ? 'scale-110' : ''
                  }`}
                  style={{ 
                    backgroundColor: index <= currentSlide 
                      ? 'var(--color-primary)' 
                      : 'var(--color-muted)'
                  }}
                  transition={{ duration: 1, repeat: index === currentSlide ? Infinity : 0 }}
                />

                {/* Date sous le point */}
                <motion.div
                  className={`mt-2 text-xs font-medium text-center ${
                    index === currentSlide ? 'font-bold' : ''
                  }`}
                  style={{ 
                    color: index <= currentSlide 
                      ? 'var(--color-primary)' 
                      : 'var(--color-muted)'
                  }}
                >
                </motion.div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Contrôles additionnels */}
        <div className="flex items-center justify-center gap-4 mt-6">
          <motion.button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
            style={{ 
              backgroundColor: 'var(--color-surface)',
              color: 'var(--color-text)',
              border: '1px solid var(--color-border)'
            }}
            whileHover={{ scale: 1.05, borderColor: 'var(--color-primary)' }}
            whileTap={{ scale: 0.95 }}
          >
            {isAutoPlaying ? (
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <rect x="6" y="4" width="4" height="16"/>
                <rect x="14" y="4" width="4" height="16"/>
              </svg>
            ) : (
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <polygon points="5,3 19,12 5,21"/>
              </svg>
            )}
          </motion.button>

          <div 
            className="text-sm"
            style={{ color: 'var(--color-muted)' }}
          >
            {currentSlide + 1} / {timeline.length}
          </div>
        </div>
      </div>
    </div>
  );
}
