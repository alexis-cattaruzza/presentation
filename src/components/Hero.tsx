import { motion } from "framer-motion";

export default function Hero() {
  return (
    <div className="flex flex-col md:flex-row items-center gap-8 w-full min-h-[70vh]">
      <motion.div
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="flex-1"
      >
        <p className="text-sm text-[--color-secondary]">Bonjour — je suis</p>
        <h1 className="text-4xl md:text-5xl font-extrabold text-[--color-primary] leading-tight mt-2">
          Alexis Cattaruzza
        </h1>

        <p className="mt-4 text-lg text-[--color-text] max-w-2xl">
          Développeur Frontend passionné par des interfaces modernes et performantes — React, TypeScript, Tailwind.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <a href="/Alexis Cattaruzza CV.pdf" download className="btn-primary">Télécharger mon CV (PDF)</a>
          <a href="#contact" className="btn-accent">Me contacter</a>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-48 h-48 rounded-xl overflow-hidden border border-[--color-border] bg-[--color-surface] shrink-0"
      >
        <img src="/images/me-400.jpg" alt="Photo Alexis" className="w-full h-full object-cover" />
      </motion.div>
    </div>
  );
}
