import { motion } from "framer-motion";
import Background from "./components/Background";
import Header from "./components/Header";
import Section from "./components/Section";
import Hero from "./components/Hero";
import Timeline from "./components/Timeline";
import Skills from "./components/Skills";
import ContactForm from "./components/ContactForm";
import { useSectionNavigation } from "./hooks/useSectionNavigation";

export default function App() {
  const { currentSectionIndex, totalSections } = useSectionNavigation();

  return (
    <motion.div 
      className="min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Header fixe */}
      <Header />

      {/* background layers (fixed) */}
      <Background />

      {/* scroll indicator with section counter */}
      <div className="scroll-indicator">
        <div className="scroll-indicator-counter">
          {currentSectionIndex + 1} / {totalSections}
        </div>
      </div>

      {/* section navigation dots */}
      <div className="section-dots">
        {Array.from({ length: totalSections }).map((_, index) => (
          <button
            key={index}
            className={`section-dot ${index === currentSectionIndex ? 'active' : ''}`}
            onClick={() => {
              const section = document.getElementById(['hero', 'experience', 'skills', 'contact'][index]);
              if (section) {
                section.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }}
            aria-label={`Go to section ${index + 1}`}
          />
        ))}
      </div>

      {/* page content with snapping: make sure container is scrollable body (default) */}
      <motion.div 
        className="page-content scroll-snap-y"
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        style={{ paddingTop: '80px' }} // Espace pour le header fixe
      >
        <Section id="hero">
          <Hero />
        </Section>

        <Section id="experience">
          <Timeline />
        </Section>

        <Section id="skills">
          <Skills />
        </Section>

        <Section id="contact">
          <ContactForm />
        </Section>
      </motion.div>
    </motion.div>
  );
}
