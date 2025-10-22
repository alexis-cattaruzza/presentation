import Hero from "./components/Hero";
import Timeline from "./components/Timeline";
import Skills from "./components/Skills";
import ContactForm from "./components/ContactForm";

export default function App() {
  return (
    <div className="min-h-screen bg-background text-text font-sans">
      <Hero />
      <main className="max-w-5xl mx-auto px-6 py-12 space-y-20">
        <Skills />
        <Timeline />
        <ContactForm />
      </main>
      <footer className="py-8 text-center text-sm text-muted">
        © {new Date().getFullYear()} Alexis Cattaruzza —{" "}
        <a href="https://github.com" className="text-secondary underline">GitHub</a>
      </footer>
    </div>
  );
}
