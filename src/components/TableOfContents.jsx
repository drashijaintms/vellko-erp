import React, { useState } from 'react';
import { List, ChevronDown, ChevronUp } from 'lucide-react';

// Helper to convert heading text to URL-friendly anchor ID
export const slugifyHeading = (text, index) => {
  const clean = text
    .toLowerCase()
    .replace(/<[^>]*>/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return clean ? `heading-${clean}` : `heading-${index + 1}`;
};

// Parse HTML and extract headings with injected IDs
export const parseHeadingsWithAnchors = (html = '') => {
  if (!html || typeof html !== 'string') {
    return { headings: [], modifiedHtml: html };
  }

  const headings = [];
  let headingIndex = 0;

  // Replace <h2>, <h3>, <h4> tags with id-injected versions
  const modifiedHtml = html.replace(/<(h[2-4])([^>]*)>(.*?)<\/\1>/gi, (match, tag, attrs, innerText) => {
    const plainText = innerText.replace(/<[^>]*>/g, '').trim();
    if (!plainText) return match;

    const level = parseInt(tag.replace(/h/i, ''), 10);
    const id = slugifyHeading(plainText, headingIndex++);

    headings.push({
      id,
      text: plainText,
      level
    });

    // Check if an id attribute is already present
    if (/id=["'][^"']*["']/i.test(attrs)) {
      return `<${tag}${attrs}>${innerText}</${tag}>`;
    }

    return `<${tag} id="${id}" class="blog-anchored-heading"${attrs}>${innerText}</${tag}>`;
  });

  return { headings, modifiedHtml };
};

export default function TableOfContents({ headings = [], title = 'Table of Contents' }) {
  const [isOpen, setIsOpen] = useState(true);

  if (!headings || headings.length < 2) {
    return null;
  }

  const scrollToHeading = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -90; // offset for sticky header
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="vellko-toc-card">
      <div className="vellko-toc-header" onClick={() => setIsOpen(!isOpen)}>
        <div className="vellko-toc-title-wrap">
          <span className="vellko-toc-icon">
            <List size={18} />
          </span>
          <span className="vellko-toc-title">{title}</span>
          <span className="vellko-toc-badge">{headings.length} Sections</span>
        </div>
        <button
          type="button"
          className="vellko-toc-toggle-btn"
          aria-label="Toggle table of contents"
        >
          {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>

      {isOpen && (
        <nav className="vellko-toc-nav">
          <ol className="vellko-toc-list">
            {headings.map((item, idx) => (
              <li
                key={item.id || idx}
                className={`vellko-toc-item level-${item.level}`}
                style={{
                  paddingLeft: item.level === 3 ? '1.25rem' : item.level === 4 ? '2.25rem' : '0'
                }}
              >
                <a
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToHeading(item.id);
                  }}
                  className="vellko-toc-link"
                >
                  <span className="vellko-toc-bullet">
                    {item.level === 2 ? (
                      <span className="h2-dot">•</span>
                    ) : (
                      <span className="h3-dash">↳</span>
                    )}
                  </span>
                  <span className="vellko-toc-text">{item.text}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>
      )}
    </div>
  );
}

