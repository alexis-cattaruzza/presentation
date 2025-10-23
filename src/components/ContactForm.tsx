export default function ContactForm() {
  return (
    <div className="w-full">
      <h2 className="text-3xl font-bold text-[--color-primary] mb-6">Contact</h2>
      <div className="card">
        <p className="text-sm text-[--color-muted]">Tu peux m'envoyer un message ou télécharger mon CV.</p>

        <div className="mt-4 flex flex-col md:flex-row gap-3">
          <a href="/CV-Alexis-Cattaruzza.pdf" download className="btn-primary">Télécharger le CV (PDF)</a>
          <a href="mailto:alexis.cattaruzza@gmail.com" className="btn-accent">Me contacter par email</a>
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
    </div>
  );
}
