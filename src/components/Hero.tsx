import { motion } from "framer-motion";

export default function Hero() {
  return (
    <header className="min-h-[60vh] flex items-center">
      <div className="max-w-5xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center gap-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1"
        >
          <p className="text-sm text-secondary/90">Bonjour — je suis</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-primary leading-tight mt-2">
            Alexis Cattaruzza
          </h1>

          <p className="mt-4 text-lg text-text max-w-2xl">
            Développeur Frontend passionné par des interfaces modernes et performantes — React, TypeScript, Tailwind.
            Je conçois des expériences interactives claires et efficaces pour les utilisateurs et les recruteurs.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="/Alexis Cattaruzza CV.pdf"
              download
              className="btn-primary"
              aria-label="Télécharger le CV au format PDF"
            >
              Télécharger mon CV (PDF)
            </a>

            <a href="#contact" className="btn-accent">
              Me contacter
            </a>
          </div>

          <div className="mt-6 text-sm text-muted">
            <span className="mr-2">Stack :</span>
            <span className="inline-block px-2 py-1 rounded bg-surface text-xs border border-border">React</span>
            <span className="inline-block px-2 py-1 rounded bg-surface text-xs border border-border ml-2">TypeScript</span>
            <span className="inline-block px-2 py-1 rounded bg-surface text-xs border border-border ml-2">Tailwind</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="w-48 h-48 rounded-xl overflow-hidden border border-border bg-surface"
          aria-hidden
        >
          <img src="/images/me-400.jpg" alt="Photo Alexis" className="w-full h-full object-cover" />
        </motion.div>
      </div>
    </header>
  );
}
