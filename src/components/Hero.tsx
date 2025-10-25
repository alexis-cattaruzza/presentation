import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function Hero() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-8 w-full min-h-[60vh] lg:min-h-[70vh]">
      <motion.div
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="flex-1 text-center lg:text-left"
      >
        <p className="section-text" style={{ color: 'var(--color-text)' }}>
          {t('hero.greeting')}
        </p>
        <h1 className="section-title" style={{ color: 'var(--color-primary)' }}>
          {t('hero.name')}
        </h1>

        <p className="section-text mt-4 max-w-2xl mx-auto lg:mx-0" style={{ color: 'var(--color-text)' }}>
          {t('hero.title')}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96 rounded-xl overflow-hidden shrink-0"
        style={{ border: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)' }}
      >
        <img src="/images/Pro-linkedIn.jpg" alt="Photo Alexis" className="w-full h-full object-cover" />
      </motion.div>
    </div>
  );
}
