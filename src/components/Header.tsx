import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Icon from './Icon';

export default function Header() {
  const { t, i18n } = useTranslation();
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsMobileMenuOpen(false); // Fermer le menu mobile après navigation
    }
  };

  const toggleLanguage = () => {
    setIsLanguageDropdownOpen(!isLanguageDropdownOpen);
  };

  const changeLanguage = (lang: 'fr' | 'en') => {
    i18n.changeLanguage(lang);
    setIsLanguageDropdownOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsLanguageDropdownOpen(false); // Fermer le dropdown de langue si ouvert
  };

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
      style={{ 
        backgroundColor: 'var(--color-background)',
        borderBottom: '1px solid var(--color-border)',
        backdropFilter: 'blur(10px)'
      }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo/Titre */}
        <motion.div
          className="flex items-center gap-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 
            className="text-lg sm:text-xl font-bold"
            style={{ color: 'var(--color-primary)' }}
          >
            {t('header.title')}
          </h1>
        </motion.div>

        {/* Navigation centrale */}
        <motion.nav
          className="hidden md:flex items-center gap-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <button
            onClick={() => scrollToSection('hero')}
            className="text-sm font-medium transition-colors duration-200 hover:scale-105"
            style={{ color: 'var(--color-text)' }}
          >
            {t('header.nav.about')}
          </button>
          <button
            onClick={() => scrollToSection('experience')}
            className="text-sm font-medium transition-colors duration-200 hover:scale-105"
            style={{ color: 'var(--color-text)' }}
          >
            {t('header.nav.experience')}
          </button>
          <button
            onClick={() => scrollToSection('skills')}
            className="text-sm font-medium transition-colors duration-200 hover:scale-105"
            style={{ color: 'var(--color-text)' }}
          >
            {t('header.nav.skills')}
          </button>
          <button
            onClick={() => scrollToSection('location')}
            className="text-sm font-medium transition-colors duration-200 hover:scale-105"
            style={{ color: 'var(--color-text)' }}
          >
            {t('header.nav.location')}
          </button>
          <button
            onClick={() => scrollToSection('hobbies')}
            className="text-sm font-medium transition-colors duration-200 hover:scale-105"
            style={{ color: 'var(--color-text)' }}
          >
            {t('header.nav.hobbies')}
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="text-sm font-medium transition-colors duration-200 hover:scale-105"
            style={{ color: 'var(--color-text)' }}
          >
            {t('header.nav.contact')}
          </button>
        </motion.nav>

        {/* Contrôles de droite */}
        <motion.div
          className="flex items-center gap-2 sm:gap-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          {/* Liens sociaux */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* GitHub */}
            <motion.a
              href="https://github.com/neuralbody"
              target="_blank"
              rel="noopener noreferrer"
              className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-lg transition-all duration-200"
              style={{ 
                backgroundColor: 'var(--color-surface)',
                color: 'var(--color-text)',
                border: '1px solid var(--color-border)'
              }}
              whileHover={{ scale: 1.1, backgroundColor: 'var(--color-primary)', color: 'white' }}
              whileTap={{ scale: 0.95 }}
              aria-label="GitHub Profile"
            >
              <Icon name="github" size={14} className="sm:w-4 sm:h-4" />
            </motion.a>

            {/* LinkedIn */}
            <motion.a
              href="https://www.linkedin.com/in/alexis-cattaruzza-aab336223"
              target="_blank"
              rel="noopener noreferrer"
              className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-lg transition-all duration-200"
              style={{ 
                backgroundColor: 'var(--color-surface)',
                color: 'var(--color-text)',
                border: '1px solid var(--color-border)'
              }}
              whileHover={{ scale: 1.1, backgroundColor: 'var(--color-accent)', color: 'white' }}
              whileTap={{ scale: 0.95 }}
              aria-label="LinkedIn Profile"
            >
              <Icon name="linkedin" size={14} className="sm:w-4 sm:h-4" />
            </motion.a>
          </div>

          {/* Menu hamburger pour mobile */}
          <motion.button
            onClick={toggleMobileMenu}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-200"
            style={{ 
              backgroundColor: 'var(--color-surface)',
              color: 'var(--color-text)',
              border: '1px solid var(--color-border)'
            }}
            whileHover={{ scale: 1.05, borderColor: 'var(--color-primary)' }}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle mobile menu"
          >
            <Icon 
              name={isMobileMenuOpen ? "x" : "menu"} 
              size={20}
              className={`transition-transform duration-200 ${isMobileMenuOpen ? 'rotate-90' : ''}`}
            />
          </motion.button>

          {/* Dropdown de langue */}
          <div className="relative">
            <motion.button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200"
              style={{ 
                backgroundColor: 'var(--color-surface)',
                color: 'var(--color-text)',
                border: '1px solid var(--color-border)'
              }}
              whileHover={{ scale: 1.05, borderColor: 'var(--color-primary)' }}
              whileTap={{ scale: 0.95 }}
            >
               <span className="text-lg">{i18n.language === 'fr' ? '🇫🇷' : '🇬🇧'}</span>
               <span>{i18n.language.toUpperCase()}</span>
              <Icon 
                name="chevron-down" 
                size={12}
                className={`transition-transform duration-200 ${isLanguageDropdownOpen ? 'rotate-180' : ''}`}
              />
            </motion.button>

            {/* Dropdown menu */}
            <AnimatePresence>
              {isLanguageDropdownOpen && (
                <motion.div
                  className="absolute right-0 top-full mt-2 w-32 rounded-lg shadow-lg border"
                  style={{ 
                    backgroundColor: 'var(--color-surface)',
                    borderColor: 'var(--color-border)',
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)'
                  }}
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <button
                    onClick={() => changeLanguage('fr')}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors duration-200 first:rounded-t-lg hover:bg-opacity-10"
                     style={{ 
                       color: 'var(--color-text)',
                       backgroundColor: i18n.language === 'fr' ? 'var(--color-primary)' : 'transparent'
                     }}
                  >
                    <span>🇫🇷</span>
                    <span>Français</span>
                  </button>
                  <button
                    onClick={() => changeLanguage('en')}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors duration-200 last:rounded-b-lg hover:bg-opacity-10"
                     style={{ 
                       color: 'var(--color-text)',
                       backgroundColor: i18n.language === 'en' ? 'var(--color-primary)' : 'transparent'
                     }}
                  >
                    <span>🇬🇧</span>
                    <span>English</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Menu mobile */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden absolute top-full left-0 right-0 mt-2 mx-6 rounded-lg shadow-lg border"
            style={{ 
              backgroundColor: 'var(--color-surface)',
              borderColor: 'var(--color-border)',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)'
            }}
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <nav className="flex flex-col p-4 space-y-2">
              <button
                onClick={() => scrollToSection('hero')}
                className="flex items-center justify-between px-4 py-3 text-sm font-medium transition-colors duration-200 rounded-lg hover:bg-opacity-10"
                style={{ color: 'var(--color-text)' }}
              >
                <span>{t('header.nav.about')}</span>
                <Icon name="chevron-right" size={16} />
              </button>
              <button
                onClick={() => scrollToSection('experience')}
                className="flex items-center justify-between px-4 py-3 text-sm font-medium transition-colors duration-200 rounded-lg hover:bg-opacity-10"
                style={{ color: 'var(--color-text)' }}
              >
                <span>{t('header.nav.experience')}</span>
                <Icon name="chevron-right" size={16} />
              </button>
              <button
                onClick={() => scrollToSection('skills')}
                className="flex items-center justify-between px-4 py-3 text-sm font-medium transition-colors duration-200 rounded-lg hover:bg-opacity-10"
                style={{ color: 'var(--color-text)' }}
              >
                <span>{t('header.nav.skills')}</span>
                <Icon name="chevron-right" size={16} />
              </button>
              <button
                onClick={() => scrollToSection('location')}
                className="flex items-center justify-between px-4 py-3 text-sm font-medium transition-colors duration-200 rounded-lg hover:bg-opacity-10"
                style={{ color: 'var(--color-text)' }}
              >
                <span>Localisation</span>
                <Icon name="chevron-right" size={16} />
              </button>
              <button
                onClick={() => scrollToSection('hobbies')}
                className="flex items-center justify-between px-4 py-3 text-sm font-medium transition-colors duration-200 rounded-lg hover:bg-opacity-10"
                style={{ color: 'var(--color-text)' }}
              >
                <span>Hobbies</span>
                <Icon name="chevron-right" size={16} />
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="flex items-center justify-between px-4 py-3 text-sm font-medium transition-colors duration-200 rounded-lg hover:bg-opacity-10"
                style={{ color: 'var(--color-text)' }}
              >
                <span>{t('header.nav.contact')}</span>
                <Icon name="chevron-right" size={16} />
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
