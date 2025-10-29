import { useEffect, useState } from 'react';

// Global cache to track preloaded images
const preloadedImages = new Set<string>();
const imageCache = new Map<string, HTMLImageElement>();

/**
 * Hook to preload images for better performance
 * @param imageUrls Array of image URLs to preload
 */
export function useImagePreloader(imageUrls: string[]) {
  const [preloaded, setPreloaded] = useState<Set<string>>(new Set());

  useEffect(() => {
    const imagePromises = imageUrls
      .filter(Boolean) // Remove empty/null/undefined URLs
      .map((url) => {
        // Skip if already preloaded
        if (preloadedImages.has(url)) {
          return Promise.resolve();
        }

        return new Promise<void>((resolve) => {
          const img = new Image();
          
          // Use fetchpriority for faster loading
          if ('fetchPriority' in img) {
            (img as any).fetchPriority = 'high';
          }
          
          img.onload = () => {
            preloadedImages.add(url);
            imageCache.set(url, img);
            setPreloaded(new Set(preloadedImages));
            resolve();
          };
          
          img.onerror = () => {
            // Still mark as attempted to avoid retries
            preloadedImages.add(url);
            resolve();
          };
          
          // Start loading immediately
          img.src = url;
        });
      });

    // Preload all images in parallel with high priority
    Promise.all(imagePromises).catch(() => {
      // Silently handle errors
    });

    // No cleanup needed - we want images to stay cached
  }, [imageUrls]);

  return { preloaded, imageCache };
}

/**
 * Check if an image is already preloaded and cached
 */
export function isImagePreloaded(url: string): boolean {
  return preloadedImages.has(url) && imageCache.has(url);
}

/**
 * Get cached image element if available
 */
export function getCachedImage(url: string): HTMLImageElement | null {
  return imageCache.get(url) || null;
}

