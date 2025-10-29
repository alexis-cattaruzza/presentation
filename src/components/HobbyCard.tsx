import { useState, useRef, useEffect } from "react";
import { motion} from "framer-motion";
import { isImagePreloaded, getCachedImage } from "../hooks/useImagePreloader";

export interface HobbyCardProps {
  name: string;
  description?: string;
  icon?: string;
  image?: string;
  level?: "passion" | "hobby" | "interest" | string;
  getLevelColor?: (level: string) => string;
  forceLoad?: boolean;
}

export default function HobbyCard({
  name,
  description,
  image,
  level = "hobby",
  getLevelColor = () => "var(--color-muted)",
  forceLoad = false,
}: HobbyCardProps) {
  // Check if image is already preloaded - if yes, set loaded immediately
  const isPreloaded = image ? isImagePreloaded(image) : false;
  const [isLoaded, setIsLoaded] = useState(isPreloaded);
  const [isInView, setIsInView] = useState(isPreloaded || forceLoad); // Load immediately if preloaded
  const [hasError, setHasError] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  // If preloaded, use cached image immediately
  useEffect(() => {
    if (image && (isPreloaded || forceLoad) && imgRef.current) {
      const cachedImg = getCachedImage(image);
      if (cachedImg && cachedImg.complete) {
        setIsLoaded(true);
        setIsInView(true);
      }
    }
  }, [image, isPreloaded, forceLoad]);

  // Intersection Observer - only for non-preloaded images or larger threshold
  useEffect(() => {
    // If already preloaded, skip observer
    if (isPreloaded || forceLoad) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.01, rootMargin: '200px' } // Larger margin to start loading earlier
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [isPreloaded, forceLoad]);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  const handleImageError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  const color = getLevelColor(level);

  return (
    <div ref={cardRef} className="relative w-full h-full group">
      {/* Loading Skeleton */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-linear-to-br from-gray-200 to-gray-300 animate-pulse" style={{ backgroundColor: 'var(--color-surface)' }} />
      )}

      {/* Background Image - Load immediately if preloaded */}
      {(isInView || isPreloaded) && image && !hasError && (
        <div className="absolute inset-0 bg-center bg-cover bg-no-repeat">
          <img
            ref={imgRef}
            src={image}
            alt={name}
            className={`w-full h-full object-cover transition-opacity duration-200 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={handleImageLoad}
            onError={handleImageError}
            loading={isPreloaded ? "eager" : "lazy"}
            decoding="async"
            fetchPriority="high"
            style={{
              willChange: isLoaded ? 'auto' : 'contents'
            }}
          />
        </div>
      )}

      {/* Fallback background for error or no image */}
      {(hasError || !image) && (
        <div 
          className="absolute inset-0 bg-linear-to-br"
          style={{ 
            background: `linear-gradient(135deg, ${color}20, ${color}40)`
          }}
        />
      )}

      {/* Overlay - darker for better text readability */}
      <div className="absolute inset-0 bg-linear-to-b from-black/50 to-black/75" />

      {/* Level Badge */}
      <div className="absolute top-4 right-4 z-20">
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end p-4 md:p-6">
        <motion.div 
          className="space-y-2 md:space-y-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 
            className="text-lg md:text-2xl font-bold text-white leading-tight" 
            style={{ textShadow: "2px 2px 8px rgba(0,0,0,0.8)" }}
          >
            {name}
          </h3>

          {description && (
            <p 
              className="text-sm md:text-base leading-relaxed text-white" 
              style={{ textShadow: "1px 1px 4px rgba(0,0,0,0.7)" }}
            >
              {description}
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
}
