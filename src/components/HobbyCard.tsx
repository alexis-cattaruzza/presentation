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

const OPTIMIZED_DIR = "/images/optimized";
const WIDTHS = [320, 640, 960, 1280];
const SIZES = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw";

function stripQueryAndExt(path?: string) {
  if (!path) return null;
  const noQuery = path.split("?")[0].split("#")[0];
  const lastSlash = noQuery.lastIndexOf("/");
  const filename = lastSlash >= 0 ? noQuery.slice(lastSlash + 1) : noQuery;
  const base = filename.replace(/\.(jpe?g|png|webp|avif)$/i, "");
  return base || null;
}

function optimizedUrl(basename: string | null, width: number, fmt: "avif" | "webp" | "jpg") {
  if (!basename) return "";
  return `${OPTIMIZED_DIR}/${basename}-${width}.${fmt}`;
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
  const basename = stripQueryAndExt(image);
  const placeholderUrl = basename ? `${OPTIMIZED_DIR}/${basename}-placeholder.jpg` : null;
  const defaultTestUrl = basename ? optimizedUrl(basename, 640, "webp") : image ?? null; // used for isPreloaded check

  const isPreloaded = image ? isImagePreloaded(image) : false;
  const [isLoaded, setIsLoaded] = useState(isPreloaded);
  const [isInView, setIsInView] = useState(isPreloaded || forceLoad); // Load immediately if preloaded
  const [hasError, setHasError] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  // If preloaded, use cached image immediately
  useEffect(() => {
    if ((isPreloaded || forceLoad) && imgRef.current) {
      const cachedImg = getCachedImage(defaultTestUrl ?? "");
      if (cachedImg && cachedImg.complete) {
        setIsLoaded(true);
        setIsInView(true);
      }
    }
  }, [isPreloaded, forceLoad, defaultTestUrl]);

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
      {/* LQIP placeholder (blur) */}
      {placeholderUrl && (
        <img
          src={placeholderUrl}
          alt=""
          aria-hidden
          className={`absolute inset-0 w-full h-full object-cover filter blur-sm scale-105 transition-opacity duration-500 ${
            isLoaded ? "opacity-0" : "opacity-100"
          }`}
          style={{ zIndex: 0 }}
        />
      )}

      {/* skeleton (fallback if no placeholder) */}
      {!isLoaded && !placeholderUrl && (
        <div
          className="absolute inset-0 animate-pulse"
          style={{ background: "linear-gradient(90deg,#e6e6e6,#f3f3f3)", zIndex: 0 }}
        />
      )}

      {/* Real image: picture with avif/webp/jpg sources */}
      {(isInView || isPreloaded) && !hasError && basename && (
        <picture className="absolute inset-0 block z-10" aria-hidden={false}>
          {/* AVIF */}
          <source
            type="image/avif"
            srcSet={WIDTHS
              .map((w) => `${optimizedUrl(basename, w, "avif")} ${w}w`)
              .join(", ")}
            sizes={SIZES}
          />

          {/* WebP */}
          <source
            type="image/webp"
            srcSet={WIDTHS
              .map((w) => `${optimizedUrl(basename, w, "webp")} ${w}w`)
              .join(", ")}
            sizes={SIZES}
          />

          {/* Fallback JPEG */}
          <img
            ref={imgRef}
            src={optimizedUrl(basename, 640, "jpg")}
            srcSet={WIDTHS.map((w) => `${optimizedUrl(basename, w, "jpg")} ${w}w`).join(", ")}
            sizes={SIZES}
            alt={name}
            loading={forceLoad ? "eager" : "lazy"}
            decoding="async"
            fetchPriority={forceLoad ? "high" : "auto"}
            className={`w-full h-full object-cover transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-0"}`}
            onLoad={handleImageLoad}
            onError={handleImageError}
            style={{ zIndex: 10 }}
          />
        </picture>
      )}

      {/* Fallback background for error or no image */}
      {(hasError || !basename) && (
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(135deg, ${color}20, ${color}40)`, zIndex: 0 }}
        />
      )}

      {/* overlay to darken for readability */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.45), rgba(0,0,0,0.7))", zIndex: 20 }} />

      {/* Level Badge */}
      <div className="absolute top-4 right-4 z-20">
      </div>

      {/* Content */}
      <div className="relative z-30 h-full flex flex-col justify-end p-4 md:p-6">
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
