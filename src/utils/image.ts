/**
 * Image utility functions for handling responsive images with WebP support
 */

/**
 * Converts an image path to its WebP equivalent
 * @param imagePath - Original image path (e.g., "trail-1.jpg")
 * @returns WebP path (e.g., "trail-1.webp")
 */
export function toWebP(imagePath: string): string {
  // Handle common image extensions
  const extensions = ['.jpg', '.jpeg', '.png', '.JPG', '.JPEG', '.PNG'];
  
  for (const ext of extensions) {
    if (imagePath.endsWith(ext)) {
      return imagePath.slice(0, -ext.length) + '.webp';
    }
  }
  
  // If no known extension found, just append .webp
  return `${imagePath}.webp`;
}

/**
 * Gets the appropriate image source based on format support
 * @param baseUrl - Base URL from import.meta.env.BASE_URL
 * @param imagePath - Relative image path
 * @returns Object with webp and fallback URLs
 */
export function getImageSources(baseUrl: string, imagePath: string) {
  return {
    webp: `${baseUrl}${toWebP(imagePath)}`,
    fallback: `${baseUrl}${imagePath}`
  };
}
