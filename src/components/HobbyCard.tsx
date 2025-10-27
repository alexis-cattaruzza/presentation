// src/components/HobbyCard.tsx

export interface HobbyCardProps {
  name: string;
  description?: string;
  icon?: string;
  image?: string;
  level?: "passion" | "hobby" | "interest" | string;
  getLevelColor?: (level: string) => string;
}

export default function HobbyCard({
  name,
  description,
  image,
  level = "hobby",
  getLevelColor = () => "var(--color-muted)",
}: HobbyCardProps) {
  const color = getLevelColor(level);

  return (
    <div className="relative w-full h-full">
      {/* BG */}
      <div
        className="absolute inset-0 bg-center bg-cover"
        style={{ backgroundImage: `url(${image ?? ""})` }}
        aria-hidden
      />

      {/* overlay - darker for better text readability */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.75))" }} />

      {/* content */}
      <div className="relative z-10 h-full flex flex-col justify-between p-4 md:p-6">
        <div className="flex justify-end">
          <span
            className="px-3 py-1 rounded-full text-xs font-semibold"
            style={{ backgroundColor: color, color: "white", boxShadow: "0 2px 8px rgba(0,0,0,0.3)" }}
          >
            {level}
          </span>
        </div>

        <div className="space-y-2 md:space-y-3">
          <h3 className="text-lg md:text-2xl font-bold text-white" style={{ textShadow: "2px 2px 8px rgba(0,0,0,0.8)" }}>
            {name}
          </h3>

          {description && (
            <p className="text-sm md:text-base leading-relaxed text-white" style={{ textShadow: "1px 1px 4px rgba(0,0,0,0.7)" }}>
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
