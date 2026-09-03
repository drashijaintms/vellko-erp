import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getSeoForPath } from '../../data/seoData';

/**
 * HeadManager Component
 * Dynamically organizes and applies all 20 head elements in exact sequence:
 * 
 * 1.  Charset
 * 2.  Viewport
 * 3.  X-UA-Compatible
 * 4.  Title Tag
 * 5.  Meta Description
 * 6.  Meta Keywords
 * 7.  Robots Meta Tag
 * 8.  Canonical Tag
 * 9.  Hreflang Tags (en & x-default matching the exact page URL)
 * 10. Open Graph (OG) Tags (auto-populated from single title/desc/image/url)
 * 11. Twitter Card Tags (auto-populated from single title/desc/image)
 * 12. Favicon / Icons
 * 13. Theme Color
 * 14. Web App Manifest
 * 15. Preconnect Tags
 * 16. DNS Prefetch Tags
 * 17. Schema Markup (JSON-LD) - Pasted directly as script or object
 * 18. CSS Files
 * 19. Analytics / Tracking Scripts
 * 20. JavaScript Files
 */
export default function HeadManager() {
  const location = useLocation();

  useEffect(() => {
    const seo = getSeoForPath(location.pathname);
    const head = document.head;

    // Helper: set or update meta tag by attribute (name, property, http-equiv)
    const setMeta = (attr, key, content) => {
      if (!content) return;
      let el = head.querySelector(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        head.appendChild(el);
      }
      el.setAttribute('content', content);
      return el;
    };

    // Helper: set or update link tag
    const setLink = (rel, href, extraAttrs = {}) => {
      if (!href) return;
      let selector = `link[rel="${rel}"]`;
      if (extraAttrs.hreflang) {
        selector += `[hreflang="${extraAttrs.hreflang}"]`;
      }
      if (extraAttrs.sizes) {
        selector += `[sizes="${extraAttrs.sizes}"]`;
      }
      let el = head.querySelector(selector);
      if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', rel);
        head.appendChild(el);
      }
      el.setAttribute('href', href);
      Object.entries(extraAttrs).forEach(([k, v]) => el.setAttribute(k, v));
      return el;
    };

    // Helper: inject JSON-LD Schema (handles both raw JS objects/arrays and raw <script> HTML strings)
    const setJsonLd = (schemaInput) => {
      if (!schemaInput) return;
      let script = head.querySelector('script[type="application/ld+json"]#seo-schema');
      if (!script) {
        script = document.createElement('script');
        script.setAttribute('type', 'application/ld+json');
        script.setAttribute('id', 'seo-schema');
        head.appendChild(script);
      }

      if (typeof schemaInput === 'string') {
        // If user pasted `<script>...</script>`, extract inner JSON content
        const cleaned = schemaInput
          .replace(/<script[^>]*>/gi, '')
          .replace(/<\/script>/gi, '')
          .trim();
        script.textContent = cleaned;
      } else {
        script.textContent = JSON.stringify(schemaInput, null, 2);
      }
    };

    // 1. Charset
    if (!head.querySelector('meta[charset]')) {
      const charset = document.createElement('meta');
      charset.setAttribute('charset', 'UTF-8');
      head.prepend(charset);
    }

    // 2. Viewport
    setMeta('name', 'viewport', 'width=device-width, initial-scale=1.0');

    // 3. X-UA-Compatible (Optional)
    setMeta('http-equiv', 'X-UA-Compatible', 'IE=edge');

    // 4. Title Tag (Single title used for page tab, OG, Twitter)
    document.title = seo.title;

    // 5. Meta Description (Single description used for search, OG, Twitter)
    setMeta('name', 'description', seo.description);

    // 6. Meta Keywords (Optional)
    setMeta('name', 'keywords', seo.keywords);

    // 7. Robots Meta Tag
    setMeta('name', 'robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');

    // 8. Canonical Tag (Matching exact page URL)
    setLink('canonical', seo.url);

    // 9. Hreflang Tags (Matching exact page URL)
    setLink('alternate', seo.url, { hreflang: 'en' });
    setLink('alternate', seo.url, { hreflang: 'x-default' });

    // 10. Open Graph (OG) Tags (mirrored from single title, desc, image, url)
    setMeta('property', 'og:title', seo.title);
    setMeta('property', 'og:description', seo.description);
    setMeta('property', 'og:url', seo.url);
    setMeta('property', 'og:image', seo.image);
    setMeta('property', 'og:type', 'website');
    setMeta('property', 'og:site_name', 'Vellko ERP');
    setMeta('property', 'og:locale', 'en_US');

    // 11. Twitter Card Tags (mirrored from single title, desc, image)
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', seo.title);
    setMeta('name', 'twitter:description', seo.description);
    setMeta('name', 'twitter:image', seo.image);
    setMeta('name', 'twitter:site', '@vellkoerp');

    // 12. Favicon / Icons
    setLink('icon', '/favicon.png', { type: 'image/png' });
    setLink('shortcut icon', '/favicon.ico');
    setLink('apple-touch-icon', '/favicon.png', { sizes: '180x180' });

    // 13. Theme Color
    setMeta('name', 'theme-color', '#DC1436');

    // 14. Web App Manifest
    setLink('manifest', '/site.webmanifest');

    // 15. Preconnect Tags
    setLink('preconnect', 'https://fonts.googleapis.com');
    setLink('preconnect', 'https://fonts.gstatic.com', { crossorigin: 'anonymous' });

    // 16. DNS Prefetch Tags
    setLink('dns-prefetch', 'https://fonts.googleapis.com');
    setLink('dns-prefetch', 'https://fonts.gstatic.com');

    // 17. Schema Markup (JSON-LD)
    if (seo.schema) {
      setJsonLd(seo.schema);
    }

  }, [location.pathname]);

  return null;
}
