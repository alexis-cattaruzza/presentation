import { useTranslation } from "react-i18next";
import Map from "./Map";

export default function Location() {
  const { t } = useTranslation();

  return (
    <div className="w-full">
      {/* Header */}
      <h2 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold mb-3 sm:mb-4 text-left" style={{ color: 'var(--color-primary)' }}>
        Localisation
      </h2>

      {/* Location Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Map Container */}
        <div className="order-2 lg:order-1">
          <div 
            className="w-full h-64 sm:h-80 lg:h-96 rounded-lg overflow-hidden border"
            style={{ 
              backgroundColor: 'var(--color-surface)',
              borderColor: 'var(--color-border)'
            }}
          >
            <Map className="w-full h-full" />
          </div>
        </div>

        {/* Location Info */}
        <div className="order-1 lg:order-2 flex flex-col justify-center">
          <div className="space-y-4 sm:space-y-6">
            {/* Current Location */}
            <div className="flex items-start gap-3">
              <span className="text-2xl sm:text-3xl">🏠</span>
              <div>
                <h3 className="text-base sm:text-lg font-semibold mb-1" style={{ color: 'var(--color-text)' }}>
                  Basé à Genève
                </h3>
                <p className="text-sm sm:text-base" style={{ color: 'var(--color-muted)' }}>
                  Suisse - Région lémanique
                </p>
              </div>
            </div>

            {/* Availability Zones */}
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-2xl sm:text-3xl">🚗</span>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold mb-1" style={{ color: 'var(--color-text)' }}>
                    Zone locale (20km)
                  </h3>
                  <p className="text-sm sm:text-base" style={{ color: 'var(--color-muted)' }}>
                    Disponible pour déplacements dans un rayon de 20km autour de Genève
                  </p>
                  <div className="mt-2">
                    <span 
                      className="inline-block px-2 py-1 rounded-full text-xs font-medium"
                      style={{ 
                        backgroundColor: 'var(--color-success)',
                        color: 'white'
                      }}
                    >
                      ✅ Disponible
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-2xl sm:text-3xl">🌐</span>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold mb-1" style={{ color: 'var(--color-text)' }}>
                    Full Remote
                  </h3>
                  <p className="text-sm sm:text-base" style={{ color: 'var(--color-muted)' }}>
                    Ouvert aux opportunités de travail à distance partout dans le monde
                  </p>
                  <div className="mt-2">
                    <span 
                      className="inline-block px-2 py-1 rounded-full text-xs font-medium"
                      style={{ 
                        backgroundColor: 'var(--color-primary)',
                        color: 'white'
                      }}
                    >
                      🌍 Remote OK
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Time Zone */}
            <div className="flex items-start gap-3">
              <span className="text-2xl sm:text-3xl">🕐</span>
              <div>
                <h3 className="text-base sm:text-lg font-semibold mb-1" style={{ color: 'var(--color-text)' }}>
                  Fuseau horaire
                </h3>
                <p className="text-sm sm:text-base" style={{ color: 'var(--color-muted)' }}>
                  UTC+1 (CET) / UTC+2 (CEST)
                </p>
              </div>
            </div>

            {/* Languages */}
            <div className="flex items-start gap-3">
              <span className="text-2xl sm:text-3xl">🗣️</span>
              <div>
                <h3 className="text-base sm:text-lg font-semibold mb-1" style={{ color: 'var(--color-text)' }}>
                  Langues
                </h3>
                <div className="flex flex-wrap gap-2 mt-1">
                  <span 
                    className="px-2 py-1 rounded text-xs font-medium"
                    style={{ 
                      backgroundColor: 'var(--color-surface)',
                      color: 'var(--color-text)',
                      border: '1px solid var(--color-border)'
                    }}
                  >
                    🇫🇷 Français (Natif)
                  </span>
                  <span 
                    className="px-2 py-1 rounded text-xs font-medium"
                    style={{ 
                      backgroundColor: 'var(--color-surface)',
                      color: 'var(--color-text)',
                      border: '1px solid var(--color-border)'
                    }}
                  >
                    🇬🇧 Anglais (Courant)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
