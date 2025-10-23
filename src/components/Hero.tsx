import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function Hero() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col md:flex-row items-center gap-8 w-full min-h-[70vh]">
      <motion.div
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="flex-1"
      >
        <p className="text-sm" style={{ color: 'var(--color-secondary)' }}>
          {t('hero.greeting')}
        </p>
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mt-2" style={{ color: 'var(--color-primary)' }}>
          {t('hero.name')}
        </h1>

        <p className="mt-4 text-lg max-w-2xl" style={{ color: 'var(--color-text)' }}>
          {t('hero.title')}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-48 h-48 rounded-xl overflow-hidden shrink-0"
        style={{ border: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)' }}
      >
        <img src="/images/cv3.jpg" alt="Photo Alexis" className="w-full h-full object-cover" />
      </motion.div>
    </div>
  );
}
