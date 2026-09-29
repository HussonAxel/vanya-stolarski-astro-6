import type { ExternalImageService } from "astro";
import { baseService } from "astro/assets";
import { isSanityImageUrl, sizedImageUrl } from "./image-url";

// Widths offered in `srcset` when a component does not pass `widths`.
const DEFAULT_WIDTHS = [320, 480, 640, 828, 1080, 1280, 1640, 2048, 2560];

// Points <Image> straight at Sanity's image CDN, which resizes and picks
// AVIF/WebP per browser. Nothing goes through Astro's /_image function.
// Local files from public/ are served as they are.
//
// A `srcset` is only emitted when the component passes `sizes`: modal images
// have their `src` swapped by script, and a `srcset` would take precedence.
const sanityImageService: ExternalImageService = {
  getURL(options) {
    if (typeof options.src !== "string") return options.src.src;
    return options.width ? sizedImageUrl(options.src, options.width) : options.src;
  },

  getSrcSet(options) {
    const { src, width, sizes } = options;
    if (typeof src !== "string" || !isSanityImageUrl(src) || !width || !sizes) return [];

    const widths = new Set([...(options.widths ?? DEFAULT_WIDTHS).filter((w) => w < width), width]);
    return [...widths]
      .sort((a, b) => a - b)
      .map((w) => ({
        transform: { ...options, width: w, height: undefined },
        descriptor: `${w}w`,
      }));
  },

  getHTMLAttributes: baseService.getHTMLAttributes,
};

export default sanityImageService;
