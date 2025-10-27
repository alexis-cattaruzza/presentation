// src/AnalyticsAndInsights.tsx
import React, { useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

type Props = {
  currentSectionIndex: number;
};

const AnalyticsAndInsights: React.FC<Props> = ({ currentSectionIndex }) => {
  const [routeForInsights, setRouteForInsights] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const base = window.location.pathname ?? "/";
    // On compose une route unique pour chaque section (ex: /#section-1)
    const fragment = `#section-${currentSectionIndex + 1}`;
    setRouteForInsights(`${base}${fragment}`);
  }, [currentSectionIndex]);

  // On évite d'envoyer des données en développement
  if (import.meta.env.MODE === "development") return null;
  if (!routeForInsights) return null;

  return (
    <>
      <Analytics />
      {/* sampleRate optionnel: 0..1 */}
      <SpeedInsights route={routeForInsights} /* sampleRate={0.5} */ />
    </>
  );
};

export default AnalyticsAndInsights;
