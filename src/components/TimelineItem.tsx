import { motion } from "framer-motion";

type Item = {
  id: string;
  role: string;
  company: string;
  date: string;
  description: string;
};

export default function TimelineItem({ item }: { item: Item }) {
  return (
    <motion.article
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45 }}
      className="p-4 bg-surface rounded-lg border border-border shadow-sm"
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-primary">{item.role}</h3>
          <div className="text-sm text-secondary">{item.company}</div>
        </div>
        <div className="text-sm text-muted">{item.date}</div>
      </div>

      <p className="mt-2 text-sm text-text">{item.description}</p>
    </motion.article>
  );
}
