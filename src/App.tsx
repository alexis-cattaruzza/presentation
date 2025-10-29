import { motion } from "framer-motion";
import Background from "./components/Background";
import Header from "./components/Header";
import Section from "./components/Section";
import Hero from "./components/Hero";
import Timeline from "./components/Timeline";
import Skills from "./components/Skills";
import Location from "./components/Location";
import Hobbies from "./components/Hobbies";
import ContactForm from "./components/ContactForm";
import AnalyticsAndInsights from "./AnalyticsAndInsights";
import { useImagePreloader } from "./hooks/useImagePreloader";
import { hobbies } from "./data/hobbies";

export default function App() {
  // Preload all hobby images on app start
  const hobbyImages = hobbies
    .map((hobby) => hobby.image)
    .filter((img): img is string => Boolean(img));
  
  useImagePreloader(hobbyImages);

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

      {/* page content with natural scrolling */}
      <motion.div 
        className="page-content"
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

        <Section id="location">
          <Location />
        </Section>

        <Section id="hobbies">
          <Hobbies />
        </Section>

        <Section id="contact">
          <ContactForm />
        </Section>
      </motion.div>
      {/* Analytics + Speed Insights (only in production) */}
      <AnalyticsAndInsights currentSectionIndex={0} />
    </motion.div>
  );
}
