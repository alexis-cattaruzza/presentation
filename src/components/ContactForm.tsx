export default function ContactForm() {
  return (
    <section id="contact">
      <h2 className="text-2xl font-semibold text-primary mb-6">Contact</h2>

      <div className="bg-surface p-6 rounded-md border border-border shadow-sm">
        <p className="text-sm text-muted">Tu peux m'envoyer un message direct ou télécharger mon CV.</p>

        <div className="mt-4 flex flex-col md:flex-row gap-3">
          <a href="/CV-Alexis-Cattaruzza.pdf" download className="btn-primary">
            Télécharger le CV (PDF)
          </a>
          <a href="mailto:alexis.cattaruzza@gmail.com" className="btn-accent">
            Me contacter par email
          </a>
        </div>

        <form action="https://formspree.io/f/xkgqlryo" method="POST" className="mt-6 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input name="name" placeholder="Nom" required className="input-default" />
            <input name="email" type="email" placeholder="Email" required className="input-default" />
          </div>
          <textarea name="message" rows={5} placeholder="Message" required className="input-default" />
          <div>
            <button type="submit" className="btn-primary">Envoyer</button>
          </div>
        </form>
      </div>
    </section>
  );
}
