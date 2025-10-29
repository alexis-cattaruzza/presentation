import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Icon from "./Icon";

export default function ContactForm() {
  const { t, i18n } = useTranslation();
  const formspreeId = import.meta.env.VITE_FORMSPREE_ID;
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const primaryColor = 'var(--color-primary)';

  // Sélectionner le CV selon la langue
  const cvFileName = i18n.language === 'fr' 
    ? '/Cattaruzza-Alexis-CV-Fr.pdf'
    : '/Cattaruzza-Alexis-CV-En.pdf';

  const handleSubmit = () => {
    setIsSubmitting(true);
    // Le formulaire sera soumis normalement via Formspree
    // On réinitialise après un délai pour l'UX
    setTimeout(() => {
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <div className="w-full">
      <motion.h2 
        className="section-title text-center lg:text-left mb-8"
        style={{ color: primaryColor }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {t('contact.title')}
      </motion.h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {/* Left side - Quick Actions & Info */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-6"
        >
          {/* Description Card */}
          <div 
            className="relative overflow-hidden rounded-2xl p-6 lg:p-8"
            style={{
              background: 'linear-gradient(135deg, rgba(112, 135, 76, 0.05) 0%, rgba(202, 171, 143, 0.05) 100%)',
              border: '1px solid var(--color-border)',
              boxShadow: '0 8px 24px rgba(108, 81, 60, 0.08)'
            }}
          >
            {/* Decorative elements */}
            <div 
              className="absolute -top-4 -right-4 w-24 h-24 rounded-full opacity-10"
              style={{ backgroundColor: primaryColor }}
            />
            <div 
              className="absolute -bottom-4 -left-4 w-32 h-32 rounded-full opacity-10"
              style={{ backgroundColor: 'var(--color-accent)' }}
            />
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ 
                    backgroundColor: `${primaryColor}15`,
                    color: primaryColor
                  }}
                >
                  <Icon name="mail" size={24} />
                </div>
                <h3 
                  className="text-xl font-bold"
                  style={{ color: 'var(--color-text)' }}
                >
                  {t('contact.title')}
                </h3>
              </div>
              
              <p 
                className="text-base leading-relaxed mb-6"
                style={{ color: 'var(--color-text)' }}
              >
                {t('contact.description')}
              </p>

              {/* Quick Actions */}
              <div className="space-y-3">
                <motion.a
                  href={cvFileName}
                  download
                  className="group flex items-center gap-3 p-4 rounded-xl transition-all duration-300"
                  style={{
                    backgroundColor: 'var(--color-surface)',
                    border: '2px solid var(--color-border)'
                  }}
                  whileHover={{ 
                    scale: 1.02,
                    borderColor: primaryColor,
                    boxShadow: '0 8px 16px rgba(112, 135, 76, 0.2)'
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-300"
                    style={{ 
                      backgroundColor: `${primaryColor}15`,
                      color: primaryColor
                    }}
                  >
                    <Icon name="download" size={20} />
                  </div>
                  <span 
                    className="font-semibold flex-1"
                    style={{ color: 'var(--color-text)' }}
                  >
                    {t('contact.download_cv')}
                  </span>
                  <Icon name="arrow-right" size={18} style={{ color: primaryColor }} />
                </motion.a>

                <motion.a
                  href="mailto:alexis.cattaruzza@gmail.com"
                  className="group flex items-center gap-3 p-4 rounded-xl transition-all duration-300"
                  style={{
                    backgroundColor: 'var(--color-surface)',
                    border: '2px solid var(--color-border)'
                  }}
                  whileHover={{ 
                    scale: 1.02,
                    borderColor: primaryColor,
                    boxShadow: '0 8px 16px rgba(112, 135, 76, 0.2)'
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-300"
                    style={{ 
                      backgroundColor: `${primaryColor}15`,
                      color: primaryColor
                    }}
                  >
                    <Icon name="mail" size={20} />
                  </div>
                  <span 
                    className="font-semibold flex-1"
                    style={{ color: 'var(--color-text)' }}
                  >
                    {t('contact.email')}
                  </span>
                  <Icon name="arrow-right" size={18} style={{ color: primaryColor }} />
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right side - Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <form 
            action={`https://formspree.io/f/${formspreeId}`} 
            method="POST" 
            onSubmit={handleSubmit}
            className="relative"
          >
            {/* Form Card */}
            <div 
              className="relative overflow-hidden rounded-2xl p-6 lg:p-8"
              style={{
                background: 'linear-gradient(135deg, var(--color-surface) 0%, rgba(240, 240, 242, 0.8) 100%)',
                border: '2px solid var(--color-border)',
                boxShadow: '0 12px 32px rgba(108, 81, 60, 0.12)'
              }}
            >
              {/* Decorative gradient overlay */}
              <div 
                className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-20"
                style={{ 
                  background: `radial-gradient(circle, ${primaryColor} 0%, transparent 70%)`
                }}
              />

              <div className="relative z-10 space-y-5">
                {/* Name Field */}
                <div className="relative">
                  <label 
                    htmlFor="name"
                    className="block text-sm font-semibold mb-2"
                    style={{ color: 'var(--color-text)' }}
                  >
                    <div className="flex items-center gap-2">
                      <Icon name="user" size={16} style={{ color: primaryColor }} />
                      {t('contact.form.name')}
                    </div>
                  </label>
                  <div className="relative">
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full px-4 py-3 pl-12 rounded-xl transition-all duration-300 focus:outline-none"
                      style={{
                        backgroundColor: focusedField === 'name' ? 'var(--color-surface)' : 'var(--color-background)',
                        border: `2px solid ${focusedField === 'name' ? primaryColor : 'var(--color-border)'}`,
                        color: 'var(--color-text)',
                        boxShadow: focusedField === 'name' 
                          ? '0 4px 12px rgba(112, 135, 76, 0.15)' 
                          : '0 2px 4px rgba(0,0,0,0.05)'
                      }}
                    />
                    <div 
                      className="absolute left-4 top-1/2 -translate-y-1/2"
                      style={{ color: focusedField === 'name' ? primaryColor : 'var(--color-muted)' }}
                    >
                      <Icon name="user" size={18} />
                    </div>
                  </div>
                </div>

                {/* Email Field */}
                <div className="relative">
                  <label 
                    htmlFor="email"
                    className="block text-sm font-semibold mb-2"
                    style={{ color: 'var(--color-text)' }}
                  >
                    <div className="flex items-center gap-2">
                      <Icon name="mail" size={16} style={{ color: primaryColor }} />
                      {t('contact.form.email')}
                    </div>
                  </label>
                  <div className="relative">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full px-4 py-3 pl-12 rounded-xl transition-all duration-300 focus:outline-none"
                      style={{
                        backgroundColor: focusedField === 'email' ? 'var(--color-surface)' : 'var(--color-background)',
                        border: `2px solid ${focusedField === 'email' ? primaryColor : 'var(--color-border)'}`,
                        color: 'var(--color-text)',
                        boxShadow: focusedField === 'email' 
                          ? '0 4px 12px rgba(112, 135, 76, 0.15)' 
                          : '0 2px 4px rgba(0,0,0,0.05)'
                      }}
                    />
                    <div 
                      className="absolute left-4 top-1/2 -translate-y-1/2"
                      style={{ color: focusedField === 'email' ? primaryColor : 'var(--color-muted)' }}
                    >
                      <Icon name="mail" size={18} />
                    </div>
                  </div>
                </div>

                {/* Message Field */}
                <div className="relative">
                  <label 
                    htmlFor="message"
                    className="block text-sm font-semibold mb-2"
                    style={{ color: 'var(--color-text)' }}
                  >
                    <div className="flex items-center gap-2">
                      <Icon name="file-text" size={16} style={{ color: primaryColor }} />
                      {t('contact.form.message')}
                    </div>
                  </label>
                  <div className="relative">
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      required
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full px-4 py-3 pl-12 pt-3 rounded-xl resize-none transition-all duration-300 focus:outline-none"
                      style={{
                        backgroundColor: focusedField === 'message' ? 'var(--color-surface)' : 'var(--color-background)',
                        border: `2px solid ${focusedField === 'message' ? primaryColor : 'var(--color-border)'}`,
                        color: 'var(--color-text)',
                        boxShadow: focusedField === 'message' 
                          ? '0 4px 12px rgba(112, 135, 76, 0.15)' 
                          : '0 2px 4px rgba(0,0,0,0.05)'
                      }}
                    />
                    <div 
                      className="absolute left-4 top-4"
                      style={{ color: focusedField === 'message' ? primaryColor : 'var(--color-muted)' }}
                    >
                      <Icon name="file-text" size={18} />
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition-all duration-300"
                  style={{
                    background: `linear-gradient(135deg, ${primaryColor} 0%, var(--color-primary-hover) 100%)`,
                    boxShadow: '0 4px 16px rgba(112, 135, 76, 0.3)'
                  }}
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: '0 6px 20px rgba(112, 135, 76, 0.4)'
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? (
                    <>
                      <Icon name="loader-2" size={20} className="animate-spin" />
                      <span>Envoi en cours...</span>
                    </>
                  ) : (
                    <>
                      <Icon name="arrow-right" size={20} />
                      <span>{t('contact.form.send')}</span>
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
