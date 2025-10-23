import skills from "../data/skills";

export default function Skills() {
  return (
    <div className="w-full">
      <h2 className="text-3xl font-bold text-[--color-primary] mb-6">Compétences</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {skills.map((s) => (
          <article key={s.name} className="card">
            <div className="flex items-center justify-between">
              <div className="font-medium text-[--color-text]">{s.name}</div>
              <div className="text-xs text-[--color-muted]">{s.level}</div>
            </div>
            <div className="mt-3 h-2 bg-[--color-border] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{ width: s.percentage + "%", backgroundColor: "var(--color-primary)" }}
                aria-hidden
              />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
