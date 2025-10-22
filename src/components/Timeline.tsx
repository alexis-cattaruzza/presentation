import timeline from "../data/timeline";
import TimelineItem from "./TimelineItem";

export default function Timeline() {
  return (
    <section>
      <h2 className="text-2xl font-semibold text-primary mb-6">Expériences & Parcours</h2>

      <div className="space-y-4">
        {timeline.map((item) => (
          <TimelineItem key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
