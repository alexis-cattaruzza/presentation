import { useTranslation } from "react-i18next";
import Map from "./Map";
import Icon from "./Icon";

export default function Location() {
  const { t } = useTranslation();

  return (
    <div className="w-full">
      {/* Header */}
      <h2 className="section-title text-left" style={{ color: 'var(--color-primary)' }}>
        {t('location.title')}
      </h2>

      {/* Location Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
        {/* Map Container */}
        <div className="order-2 lg:order-1">
          <div 
            className="w-full h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80 rounded-lg overflow-hidden border"
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
          <div className="space-y-3 sm:space-y-4 lg:space-y-6">
            {/* Current Location */}
            <div className="flex items-start gap-2 sm:gap-3">
              <Icon name="home" size={20} className="text-lg sm:text-xl lg:text-2xl" style={{ color: 'var(--color-primary)' }} />
              <div>
                <h3 className="card-title mb-1" style={{ color: 'var(--color-text)' }}>
                  {t('location.address')}
                </h3>
                <p className="card-text" style={{ color: 'var(--color-muted)' }}>
                  {t('location.region')}
                </p>
              </div>
            </div>

            {/* Availability Zones */}
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-start gap-2 sm:gap-3">
                <Icon name="car" size={20} className="text-lg sm:text-xl lg:text-2xl" style={{ color: 'var(--color-success)' }} />
                <div>
                  <h3 className="card-title mb-1" style={{ color: 'var(--color-text)' }}>
                    {t('location.local_zone.title')}
                  </h3>
                  <p className="card-text" style={{ color: 'var(--color-muted)' }}>
                    {t('location.local_zone.description')}
                  </p>
                  <div className="mt-1 sm:mt-2">
                    <span 
                      className="inline-block px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full text-xs font-medium"
                      style={{ 
                        backgroundColor: 'var(--color-success)',
                        color: 'white'
                      }}
                    >
                      {t('location.local_zone.status')}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2 sm:gap-3">
                <Icon name="globe" size={20} className="text-lg sm:text-xl lg:text-2xl" style={{ color: 'var(--color-primary)' }} />
                <div>
                  <h3 className="card-title mb-1" style={{ color: 'var(--color-text)' }}>
                    {t('location.remote.title')}
                  </h3>
                  <p className="card-text" style={{ color: 'var(--color-muted)' }}>
                    {t('location.remote.description')}
                  </p>
                  <div className="mt-1 sm:mt-2">
                    <span 
                      className="inline-block px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full text-xs font-medium"
                      style={{ 
                        backgroundColor: 'var(--color-primary)',
                        color: 'white'
                      }}
                    >
                      {t('location.remote.status')}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Time Zone */}
            <div className="flex items-start gap-2 sm:gap-3">
              <Icon name="clock" size={20} className="text-lg sm:text-xl lg:text-2xl" style={{ color: 'var(--color-accent)' }} />
              <div>
                <h3 className="card-title mb-1" style={{ color: 'var(--color-text)' }}>
                  {t('location.timezone.title')}
                </h3>
                <p className="card-text" style={{ color: 'var(--color-muted)' }}>
                  {t('location.timezone.description')}
                </p>
              </div>
            </div>

            {/* Languages */}
            <div className="flex items-start gap-2 sm:gap-3">
              <Icon name="languages" size={20} className="text-lg sm:text-xl lg:text-2xl" style={{ color: 'var(--color-primary)' }} />
              <div>
                <h3 className="card-title mb-1" style={{ color: 'var(--color-text)' }}>
                  {t('location.languages.title')}
                </h3>
                <div className="flex flex-wrap gap-1 sm:gap-2 mt-1">
                  <span 
                    className="px-1.5 py-0.5 sm:px-2 sm:py-1 rounded text-xs font-medium"
                    style={{ 
                      backgroundColor: 'var(--color-surface)',
                      color: 'var(--color-text)',
                      border: '1px solid var(--color-border)'
                    }}
                  >
                    {t('location.languages.french')}
                  </span>
                  <span 
                    className="px-1.5 py-0.5 sm:px-2 sm:py-1 rounded text-xs font-medium"
                    style={{ 
                      backgroundColor: 'var(--color-surface)',
                      color: 'var(--color-text)',
                      border: '1px solid var(--color-border)'
                    }}
                  >
                    {t('location.languages.english')}
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
