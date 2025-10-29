import { motion } from "framer-motion";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Icon from "./Icon";

export default function Hero() {
  const { t } = useTranslation();
  const [expandedSummary, setExpandedSummary] = useState(false);
  const [expandedObjective, setExpandedObjective] = useState(false);

  const toggleSummary = () => setExpandedSummary((s) => !s);
  const toggleObjective = () => setExpandedObjective((s) => !s);

  return (
    <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12 w-full min-h-[70vh] py-8">
      {/* Content Section */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex-1 text-center lg:text-left space-y-6"
      >
        

        {/* Name */}
        <motion.h1 
          className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
          style={{ color: 'var(--color-primary)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {t('hero.name')}
        </motion.h1>

        {/* Title */}
        <motion.p 
          className="text-xl md:text-2xl font-semibold max-w-3xl mx-auto lg:mx-0 leading-relaxed"
          style={{ color: 'var(--color-text)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {t('hero.title')}
        </motion.p>

        {/* Summary Section */}
        <motion.div 
          className="max-w-3xl mx-auto lg:mx-0 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {/* Summary Card */}
          <div 
            className="p-6 rounded-xl shadow-lg"
            style={{ 
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)'
            }}
          >
            <div className="space-y-4">
              {/* Summary Text */}
              <div>
                <p
                  className={`text-base md:text-lg leading-relaxed transition-all duration-500 ${
                    expandedSummary ? 'max-h-none' : 'max-h-24 overflow-hidden'
                  }`}
                  style={{ color: "var(--color-text)" }}
                >
                  {t('hero.summary')}
                </p>
              </div>

              {/* Read More Button */}
              <button
                type="button"
                onClick={toggleSummary}
                className="group flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 w-full sm:w-auto"
                style={{ 
                  backgroundColor: 'var(--color-primary)',
                  color: 'white',
                  boxShadow: '0 2px 8px rgba(112, 135, 76, 0.2)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-primary-hover)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(112, 135, 76, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-primary)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(112, 135, 76, 0.2)';
                }}
              >
                <span>
                  {expandedSummary ? t("common.read_less") : t("common.read_more")}
                </span>
                <Icon 
                  name={expandedSummary ? "chevron-up" : "chevron-down"} 
                  size={14}
                  className="transition-transform duration-300"
                  style={{ 
                    transform: expandedSummary ? 'rotate(180deg)' : 'rotate(0deg)'
                  }}
                />
              </button>
            </div>
          </div>

          {/* Objective Card - Dark Background */}
          <motion.div
            className="p-6 rounded-xl shadow-lg relative overflow-hidden"
            style={{ 
              backgroundColor: 'rgba(50, 49, 37, 0.8)',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            {/* Decorative accent */}
            <div 
              className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl"
              style={{ backgroundColor: 'var(--color-primary)' }}
            />
            
            <div className="space-y-4">
              <div>
                <h3 
                  className="text-md font-semibold uppercase tracking-wide mb-3"
                  style={{ color: 'var(--color-primary-hover)' }}
                >
                  {t('hero.objective_title')}
                </h3>
                <p 
                  className={`text-base md:text-lg font-medium leading-relaxed transition-all duration-500 ${
                    expandedObjective ? 'max-h-none' : 'max-h-24 overflow-hidden'
                  }`}
                  style={{ color: "var(--color-surface)" }}
                >
                  {t('hero.objective')}
                </p>
              </div>

              {/* Read More Button */}
              <button
                type="button"
                onClick={toggleObjective}
                className="group flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 w-full sm:w-auto"
                style={{ 
                  backgroundColor: 'var(--color-primary)',
                  color: 'white',
                  boxShadow: '0 2px 8px rgba(112, 135, 76, 0.2)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-primary-hover)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(112, 135, 76, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-primary)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(112, 135, 76, 0.2)';
                }}
              >
                <span>
                  {expandedObjective ? t("common.read_less") : t("common.read_more")}
                </span>
                <Icon 
                  name={expandedObjective ? "chevron-up" : "chevron-down"} 
                  size={14}
                  className="transition-transform duration-300"
                  style={{ 
                    transform: expandedObjective ? 'rotate(180deg)' : 'rotate(0deg)'
                  }}
                />
              </button>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Image Section - Fixed position */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 shrink-0 self-start lg:sticky lg:top-8"
      >
        {/* Decorative elements */}
        <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full opacity-20" style={{ backgroundColor: 'var(--color-primary)' }} />
        <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full opacity-20" style={{ backgroundColor: 'var(--color-accent)' }} />
        
        {/* Main image container */}
        <div 
          className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl"
          style={{ 
            border: '3px solid var(--color-border)',
            backgroundColor: 'var(--color-surface)'
          }}
        >
          <img 
            src="/images/Pro-linkedIn.jpg" 
            alt="Photo Alexis" 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
          />
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent" />
        </div>

        {/* Floating badge */}
        <motion.div
          className="absolute -bottom-6 -right-6 px-4 py-2 rounded-full shadow-lg"
          style={{ backgroundColor: 'var(--color-success)', color: 'white' }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
        >
          <span className="text-sm font-semibold">{t('hero.available')}</span>
        </motion.div>
      </motion.div>
    </div>
  );
}
