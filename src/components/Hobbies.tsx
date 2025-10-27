import { useTranslation } from "react-i18next";
import { hobbies, hobbyCategories, type Hobby } from "../data/hobbies";
import Carousel from "./Carousel";
import HobbyCard from "./HobbyCard";

const getLevelColor = (level: string) => {
    switch (level) {
      case 'passion': return 'var(--color-success)';
      case 'hobby': return 'var(--color-primary)';
      case 'interest': return 'var(--color-accent)';
      default: return 'var(--color-muted)';
    }
  };

  /*const getLevelText = (level: string) => {
    switch (level) {
      case 'passion': return t('hobbies.levels.passion');
      case 'hobby': return t('hobbies.levels.hobby');
      case 'interest': return t('hobbies.levels.interest');
      default: return level;
    }
  };

  const getTranslatedHobbyName = (hobbyName: string) => {
    const hobbyKeyMap: { [key: string]: string } = {
      "Formule 1": "f1",
      "Padel": "padel",
      "Voyage": "travel",
      "Course à pied": "running",
      "Développement IT personnel": "dev",
      "Lecture technique": "reading",
      "Cuisine": "cooking"
    };
    
    const hobbyKey = hobbyKeyMap[hobbyName] || hobbyName.toLowerCase().replace(/[^a-z0-9]/g, '');
    return t(`hobbies.items.${hobbyKey}.name`, hobbyName);
  };

  const getTranslatedHobbyDescription = (hobbyName: string) => {
    const hobbyKeyMap: { [key: string]: string } = {
      "Formule 1": "f1",
      "Padel": "padel",
      "Voyage": "travel",
      "Course à pied": "running",
      "Développement IT personnel": "dev",
      "Lecture technique": "reading",
      "Cuisine": "cooking"
    };*/

export default function Hobbies() {
  const { t } = useTranslation();
    // liste d'ids de catégories dans l'ordre souhaité
  const categoryKeys = Object.keys(hobbyCategories) as Array<keyof typeof hobbyCategories>;

  // Calculate optimal grid columns based on item count
  const getGridCols = (itemCount: number) => {
    if (itemCount === 1) return 'grid-cols-1';
    if (itemCount === 2) return 'grid-cols-1 md:grid-cols-2';
    if (itemCount === 3) return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';
    return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';
  };

  return (
    <section className="w-full max-h-[calc(100vh-140px)] flex flex-col">
      <h2 className="section-title mb-4 md:mb-6" style={{ color: "var(--color-primary)" }}>
        {t("hobbies.title")}
      </h2>

      <div className="flex-1 min-h-0 flex flex-col">
        <div className="md:px-12">
          <Carousel showArrows showDots className="flex-1" autoPlay={false}>
          {categoryKeys.map((catKey) => {
            const items = hobbies.filter((h) => h.category === catKey);
            const categoryMeta = hobbyCategories[catKey];
            const itemCount = items.length;

            return (
              <div key={catKey} className="h-full flex flex-col px-2">
                {/* header per category */}
                <div className="mb-4 flex items-center gap-3">
                  <h3 className="text-lg font-semibold">{categoryMeta.name}</h3>
                </div>

                {/* grid: dynamic columns based on item count */}
                <div
                  className={`grid ${getGridCols(itemCount)} gap-4 flex-1`}
                  style={{
                    alignItems: "stretch",
                  }}
                >
                  {items.map((hobby: Hobby) => (
                    <div key={hobby.name} className="h-full rounded-lg overflow-hidden" style={{ minHeight: '200px' }}>
                      <HobbyCard
                        name={t(`hobbies.items.${hobby.name.toLowerCase().replace(/[^a-z0-9]/g, "")}.name`, hobby.name)}
                        description={t(`hobbies.items.${hobby.name.toLowerCase().replace(/[^a-z0-9]/g, "")}.description`, hobby.description)}
                        icon={hobby.icon}
                        image={hobby.image}
                        level={hobby.level}
                        getLevelColor={getLevelColor}
                      />
                    </div>
                  ))}
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
