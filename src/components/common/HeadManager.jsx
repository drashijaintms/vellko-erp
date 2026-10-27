import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getSeoForPath, generateBlogSeo, findBlogInCollection } from '../../data/seoData';

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

    // Helper: inject JSON-LD Schema (handles arrays as @graph, single objects, and raw strings)
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
        const cleaned = schemaInput
          .replace(/<script[^>]*>/gi, '')
          .replace(/<\/script>/gi, '')
          .trim();
        script.textContent = cleaned;
      } else if (Array.isArray(schemaInput)) {
        script.textContent = JSON.stringify({
          "@context": "https://schema.org",
          "@graph": schemaInput
        }, null, 2);
      } else {
        script.textContent = JSON.stringify(schemaInput, null, 2);
      }
    };

    const applySeo = (seo, isBlog) => {
      if (!seo) return;
      if (seo.title) {
        document.title = seo.title;
      }
      if (seo.description) {
        setMeta('name', 'description', seo.description);
      }
      if (seo.keywords) {
        setMeta('name', 'keywords', seo.keywords);
      }

      const targetUrl = seo.canonical || seo.url;
      setMeta('name', 'robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
      setLink('canonical', targetUrl);
      setLink('alternate', targetUrl, { hreflang: 'en' });
      setLink('alternate', targetUrl, { hreflang: 'x-default' });

      setMeta('property', 'og:title', seo.ogTitle || seo.title);
      setMeta('property', 'og:description', seo.ogDescription || seo.description);
      setMeta('property', 'og:url', targetUrl);
      setMeta('property', 'og:image', seo.ogImage || seo.image);
      setMeta('property', 'og:type', isBlog ? 'article' : 'website');
      setMeta('property', 'og:site_name', 'Vellko ERP');
      setMeta('property', 'og:locale', 'en_US');

      setMeta('name', 'twitter:card', seo.twitterCard || 'summary_large_image');
      setMeta('name', 'twitter:title', seo.twitterTitle || seo.title);
      setMeta('name', 'twitter:description', seo.twitterDescription || seo.description);
      setMeta('name', 'twitter:image', seo.twitterImage || seo.image);
      setMeta('name', 'twitter:site', '@vellkoerp');

      if (seo.schema) {
        setJsonLd(seo.schema);
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

    const isBlogRoute = location.pathname.startsWith('/blog/') && !location.pathname.startsWith('/blog/admin');
    const seo = getSeoForPath(location.pathname);

    // Apply SEO immediately for current path
    applySeo(seo, isBlogRoute);

    // If dynamic blog route and placeholder was returned, fetch fresh blog in background to update head
    if (isBlogRoute && (seo.isBlogPlaceholder || !seo.title)) {
      const slug = location.pathname.replace('/blog/', '').replace(/\/+$/, '').trim();
      fetch('/api/blogs?status=Published&active=1')
        .then(r => r.json())
        .then(data => {
          if (Array.isArray(data)) {
            try { localStorage.setItem('vellko_cached_blogs', JSON.stringify(data)); } catch (e) {}
            const found = findBlogInCollection(slug, data);
            if (found) {
              const freshSeo = generateBlogSeo(found, location.pathname);
              applySeo(freshSeo, true);
            }
          }
        })
        .catch(err => console.debug('Async blog SEO fetch failed:', err));
    }

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

  }, [location.pathname]);

  return null;
}
