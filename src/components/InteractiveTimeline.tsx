import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import timeline from "../data/timeline";
import Icon from "./Icon";

export default function InteractiveTimeline() {
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
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

  // Auto-play functionality (desktop only)
  useEffect(() => {
    if (!isAutoPlaying || isMobile) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % timeline.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, isMobile]);

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
      setCurrentSlide((prev) => (prev + 1) % timeline.length);
      setIsAutoPlaying(false);
    } else if (isRightSwipe) {
      setCurrentSlide((prev) => (prev - 1 + timeline.length) % timeline.length);
      setIsAutoPlaying(false);
    }
  };

  return (
    <div className="w-full">
      <h2 className="section-title text-center lg:text-left" style={{ color: 'var(--color-primary)' }}>
        Parcours
      </h2>
      
      {/* Container principal */}
      <div className="relative">
        {/* Zone de contenu avec slide */}
        <div 
          className="relative overflow-hidden rounded-xl mb-6" 
          style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <motion.div 
            className="flex"
            animate={{ x: `-${currentSlide * 100}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {timeline.map((item) => (
              <div key={item.id} className="w-full shrink-0">
                <div className="p-4 sm:p-6">
                  {/* En-tête compact */}
                  <div className="text-center mb-4">
                    <motion.h3 
                      className="section-subtitle mb-1"
                      style={{ color: 'var(--color-primary)' }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      {t(`timeline.items.${item.translationKey}.role`)}
                    </motion.h3>
                    <motion.div 
                      className="card-title mb-1"
                      style={{ color: 'var(--color-secondary)' }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      {t(`timeline.items.${item.translationKey}.company`)}
                    </motion.div>
                    <motion.div 
                      className="card-text"
                      style={{ color: 'var(--color-muted)' }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      {t(`timeline.items.${item.translationKey}.date`)}
                    </motion.div>
                  </div>

                  {/* Description compacte */}
                  <motion.div
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <p 
                      className="section-text leading-relaxed mb-3"
                      style={{ color: 'var(--color-text)' }}
                    >
                      {t(`timeline.items.${item.translationKey}.description`)}
                    </p>

                    {/* Badges de compétences compacts */}
                    <div className="flex flex-wrap justify-center gap-1 sm:gap-1.5">
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
                            className="px-2 py-1 text-xs rounded-full font-medium"
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
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Contrôles de navigation */}
        <div className="flex items-center justify-center gap-4 sm:gap-6 lg:gap-8 mb-4 sm:mb-6">
          {/* Bouton précédent - Desktop seulement */}
          {!isMobile && (
            <motion.button
              onClick={prevSlide}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-200"
              style={{ 
                backgroundColor: 'var(--color-surface)',
                color: 'var(--color-text)',
                border: '1px solid var(--color-border)'
              }}
              whileHover={{ scale: 1.1, borderColor: 'var(--color-primary)' }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon name="chevron-left" size={20} />
            </motion.button>
          )}

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

          {/* Bouton suivant - Desktop seulement */}
          {!isMobile && (
            <motion.button
              onClick={nextSlide}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-200"
              style={{ 
                backgroundColor: 'var(--color-primary)',
                color: 'var(--color-text)',
                border: '1px solid var(--color-border)'
              }}
              whileHover={{ scale: 1.1, borderColor: 'var(--color-text)' }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon name="chevron-right" size={20} />
            </motion.button>
          )}
        </div>

        {/* Barre de progression simplifiée */}
        <div className="relative">
          {/* Barre de base (complète) */}
          <div 
            className="absolute top-1/2 left-0 h-1 transform -translate-y-1/2 rounded-full"
            style={{ 
              width: '100%',
              backgroundColor: 'var(--color-muted)'
            }}
          />
          
          {/* Ligne de progression */}
          <div 
            className="absolute top-1/2 left-0 h-1 transform -translate-y-1/2 rounded-full"
            style={{ 
              width: `${(currentSlide / (timeline.length - 1)) * 100}%`,
              backgroundColor: 'var(--color-primary)'
            }}
          />

          {/* Points de la timeline */}
          <div className="relative flex justify-between items-center py-3">
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
                  className={`w-3 h-3 rounded-full ${
                    index <= currentSlide ? 'scale-110' : ''
                  }`}
                  style={{ 
                    backgroundColor: index <= currentSlide 
                      ? 'var(--color-primary)' 
                      : 'var(--color-muted)'
                  }}
                />
              </motion.button>
            ))}
          </div>
        </div>

        {/* Contrôles additionnels compacts */}
        <div className="flex items-center justify-center gap-2 mt-3">
          <motion.button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="flex items-center gap-1 px-2 py-1 rounded text-xs font-medium transition-all duration-200"
            style={{ 
              backgroundColor: 'var(--color-surface)',
              color: 'var(--color-text)',
              border: '1px solid var(--color-border)'
            }}
            whileHover={{ scale: 1.05, borderColor: 'var(--color-primary)' }}
            whileTap={{ scale: 0.95 }}
          >
            <Icon name={isAutoPlaying ? "pause" : "play"} size={12} />
          </motion.button>

          <div 
            className="text-xs"
            style={{ color: 'var(--color-muted)' }}
          >
            {currentSlide + 1} / {timeline.length}
          </div>
        </div>
      </div>
    </div>
  );
}
