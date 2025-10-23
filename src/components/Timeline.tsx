import timeline from "../data/timeline";
import TimelineItem from "./TimelineItem";

export default function Timeline() {
  return (
    <div className="w-full">
      <h2 className="text-3xl font-bold text-[--color-primary] mb-6">Expériences</h2>
      <div className="space-y-6">
        {timeline.map((t) => (
          <TimelineItem key={t.id} item={t} />
        ))}
      </div>
    </div>
  );
}
