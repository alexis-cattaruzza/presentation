import { useTranslation } from "react-i18next";
import skills from "../data/skills";

export default function Skills() {
  const { t } = useTranslation();
  return (
    <div className="w-full">
      <h2 className="text-3xl font-bold text-primary mb-6" style={{ color: 'var(--color-primary)' }}>{t('skills.title')}</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {skills.map((s) => (
          <article key={s.name} className="card">
            <div className="flex items-center justify-between">
              <div className="font-medium" style={{ color: 'var(--color-text)' }}>{s.name}</div>
              <div className="text-xs" style={{ color: 'var(--color-muted)' }}>{s.level}</div>
            </div>
            <div className="mt-3 h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--color-muted)' }}>
              <div
                className="h-full rounded-full"
                style={{ width: s.percentage + "%", backgroundColor: 'var(--color-primary)' }}
                aria-hidden
              />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
