import { hobbies } from "../data/hobbies";

/**
 * Add preload link tags to document head for hobby images
 * This allows the browser to start downloading images immediately
 */
export function addPreloadLinks() {
  const hobbyImages = hobbies
    .map((hobby) => hobby.image)
    .filter((img): img is string => Boolean(img));

  hobbyImages.forEach((imageUrl) => {
    // Check if link already exists
    const existingLink = document.querySelector(`link[href="${imageUrl}"]`);
    if (existingLink) return;

    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = imageUrl;
    link.setAttribute("fetchpriority", "high");
    
    // Add to head
    document.head.appendChild(link);
  });
}

/**
 * Remove preload links (for cleanup if needed)
 */
export function removePreloadLinks() {
  const links = document.querySelectorAll('link[rel="preload"][as="image"]');
  links.forEach((link) => {
    if (link.getAttribute("href")?.startsWith("/images/")) {
      link.remove();
    }
  });
}

