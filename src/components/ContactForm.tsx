import { useTranslation } from "react-i18next";

export default function ContactForm() {
  const { t } = useTranslation();
  return (
    <div className="w-full">
      <h2 className="section-title text-center lg:text-left" style={{ color: 'var(--color-primary)' }}>{t('contact.title')}</h2>
      <div className="card">
        <p className="section-text text-center lg:text-left" style={{ color: 'var(--color-muted)' }}>{t('contact.description')}</p>

        <div className="mt-4 flex flex-col sm:flex-row gap-3">
          <a href="/Alexis Cattaruzza CV.pdf" download className="btn-primary text-center">{t('contact.download_cv')}</a>
          <a href="mailto:alexis.cattaruzza@gmail.com" className="btn-accent text-center">{t('contact.email')}</a>
        </div>

        <form action="https://formspree.io/f/xkgqlryo" method="POST" className="mt-6 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input name="name" placeholder={t('contact.form.name')} required className="input-default" />
            <input name="email" type="email" placeholder={t('contact.form.email')} required className="input-default" />
          </div>
          <textarea name="message" rows={4} placeholder={t('contact.form.message')} required className="input-default" />
          <div>
            <button type="submit" className="btn-primary w-full sm:w-auto">{t('contact.form.send')}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
