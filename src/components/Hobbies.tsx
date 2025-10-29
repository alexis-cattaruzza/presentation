import { useTranslation } from "react-i18next";
import { hobbies, hobbyCategories, type Hobby } from "../data/hobbies";
import Carousel from "./Carousel";
import HobbyCard from "./HobbyCard";
import { useState } from "react";

const getLevelColor = (level: string) => {
    switch (level) {
      case 'passion': return 'var(--color-success)';
      case 'hobby': return 'var(--color-primary)';
      case 'interest': return 'var(--color-accent)';
      default: return 'var(--color-muted)';
    }
  };


export default function Hobbies() {
  const { t } = useTranslation();
    // liste d'ids de catégories dans l'ordre souhaité
  const categoryKeys = Object.keys(hobbyCategories) as Array<keyof typeof hobbyCategories>;
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = categoryKeys.length;

  // helper circular compare
  const isNearby = (slideIndex: number) => {
    // preload current, prev and next
    const prev = (currentSlide - 1 + totalSlides) % totalSlides;
    const next = (currentSlide + 1) % totalSlides;
    return slideIndex === currentSlide || slideIndex === prev || slideIndex === next;
  };

  // Map hobby names to translation keys
  const getHobbyKey = (hobbyName: string) => {
    const hobbyKeyMap: { [key: string]: string } = {
      "Formule 1": "f1",
      "Padel": "padel",
      "Voyage": "travel",
      "Course à pied": "running",
      "Développement IT personnel": "dev",
      "Lecture technique": "reading",
      "Cuisine": "cooking"
    };
    return hobbyKeyMap[hobbyName] || hobbyName.toLowerCase().replace(/[^a-z0-9]/g, "");
  };

  // Calculate optimal grid columns based on item count
  const getGridCols = (itemCount: number) => {
    if (itemCount === 1) return 'grid-cols-1';
    if (itemCount === 2) return 'grid-cols-1 md:grid-cols-2';
    if (itemCount === 3) return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';
    return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';
  };

  return (
    <section className="w-full">
      <h2 className="section-title mb-4 md:mb-6" style={{ color: "var(--color-primary)" }}>
        {t("hobbies.title")}
      </h2>

      <div className="w-full">
        <div className="md:px-12">
          <Carousel showArrows showDots className="flex-1" autoPlay={false} onSlideChange={(idx) => setCurrentSlide(idx)}>
          {categoryKeys.map((catKey, slideIndex) => {
            const items = hobbies.filter((h) => h.category === catKey);
            const shouldPreloadSlide = isNearby(slideIndex);

            return (
              <div key={catKey} className="h-full flex flex-col px-2">
                {/* header per category */}
                <div className="mb-4 flex items-center gap-3">
                  <h3 className="text-lg font-semibold">{t(`hobbies.categories.${catKey}.name`)}</h3>
                </div>

                {/* grid: dynamic columns based on item count */}
                <div
                  className={`grid ${getGridCols(items.length)} gap-4 flex-1`}
                  style={{
                    alignItems: "stretch",
                  }}
                >
                  {items.map((hobby: Hobby) => {
                    const hobbyKey = getHobbyKey(hobby.name);
                    return (
                      <div key={hobby.name} className="h-full rounded-lg overflow-hidden" style={{ minHeight: '200px' }}>
                        <HobbyCard
                          name={t(`hobbies.items.${hobbyKey}.name`, hobby.name)}
                          description={t(`hobbies.items.${hobbyKey}.description`, hobby.description)}
                          icon={hobby.icon}
                          image={hobby.image}
                          level={hobby.level}
                          getLevelColor={getLevelColor}
                          forceLoad={shouldPreloadSlide}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
          </Carousel>
        </div>
      </div>
    </section>
  );
}
