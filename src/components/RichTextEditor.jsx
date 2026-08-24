// TinyMCE 6.8.2 CDN Editor with Interactive Modals for FAQs, CTA Boxes (5 Vellko ERP Themed Styles), and Link SEO (nofollow, noopener, noreferrer)
import React, { useState, useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { X } from 'lucide-react';

export default function RichTextEditor({ value, onChange, height = 460 }) {
  const editorRef = useRef(null);

  // Modal States
  const [showFaqModal, setShowFaqModal] = useState(false);
  const [showCtaModal, setShowCtaModal] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState(false);

  // FAQ Modal Form State
  const [faqQuestion, setFaqQuestion] = useState('');
  const [faqAnswer, setFaqAnswer] = useState('');

  // CTA Modal Form State
  const [ctaStyle, setCtaStyle] = useState('style1');
  const [ctaTitle, setCtaTitle] = useState('Headline Example');
  const [ctaText, setCtaText] = useState('This is an elegant callout style ideal for quotes, key facts, or important business guidance.');
  const [ctaImage, setCtaImage] = useState('');
  const [ctaButtonText, setCtaButtonText] = useState('');
  const [ctaButtonLink, setCtaButtonLink] = useState('');

  // Link Modal Form State
  const [linkUrl, setLinkUrl] = useState('');
  const [linkText, setLinkText] = useState('');
  const [linkTitle, setLinkTitle] = useState('');
  const [linkTarget, setLinkTarget] = useState('_self'); // "_self" or "_blank"
  const [linkNofollow, setLinkNofollow] = useState(true);
  const [linkNoopener, setLinkNoopener] = useState(true);
  const [linkNoreferrer, setLinkNoreferrer] = useState(true);

  // Auto set default text when switching CTA styles
  const handleCtaStyleChange = (style) => {
    setCtaStyle(style);
    if (style === 'style1') {
      setCtaTitle('Headline Example');
      setCtaText('This is an elegant callout style ideal for quotes, key facts, or important business guidance.');
      setCtaButtonText('');
    } else if (style === 'style2') {
      setCtaTitle('Clean Modern Layout');
      setCtaText('A perfect template to direct readers to catalog pages, specific modules, or related information.');
      setCtaButtonText('CLICK HERE');
    } else if (style === 'style3') {
      setCtaTitle('Image & Text Banner');
      setCtaText('Incorporate high-impact visuals right next to your product recommendations.');
      setCtaButtonText('EXPLORE NOW');
    } else if (style === 'style4') {
      setCtaTitle('Announcement Spotlight');
      setCtaText('A vibrant, high-contrast block designed to capture immediate reader attention for newsletters, webinars, or special announcements.');
      setCtaButtonText('CLAIM OFFER');
    } else if (style === 'style5') {
      setCtaTitle('Dashed Spacer Layout');
      setCtaText('A low-key callout option that breaks up long articles gently.');
      setCtaButtonText('VIEW MORE');
    }
  };

  // Open Link Modal with selected text
  const openLinkDialog = () => {
    if (editorRef.current) {
      const selected = editorRef.current.selection.getContent({ format: 'text' }) || '';
      setLinkText(selected);
      setLinkUrl('');
      setLinkTitle('');
      setLinkTarget('_blank');
      setLinkNofollow(true);
      setLinkNoopener(true);
      setLinkNoreferrer(true);
    }
    setShowLinkModal(true);
  };

  // Insert FAQ into Editor in Vellko Theme as Collapsible Accordion
  const handleInsertFaq = () => {
    if (!faqQuestion.trim()) return;
    const q = faqQuestion.trim();
    const a = faqAnswer.trim() || 'Add answer explanation here...';

    const html = `
<details class="vellko-faq-accordion" style="background:#ffffff; border:1px solid #fecdd3; border-left:4px solid #DC1436; border-radius:8px 12px 12px 8px; margin:18px 0; overflow:hidden; box-shadow:0 1px 3px rgba(220,20,54,0.04);">
  <summary style="display:flex; align-items:center; justify-content:space-between; padding:16px 20px; cursor:pointer; font-weight:700; color:#881337; font-size:1.02rem; list-style:none; user-select:none;">
    <span style="display:flex; align-items:center; gap:10px;">
      <span style="display:inline-flex; align-items:center; justify-content:center; width:24px; height:24px; border-radius:50%; background:#ffe4e6; color:#DC1436; font-size:0.78rem; font-weight:800;">Q</span>
      <span>${q}</span>
    </span>
    <span class="faq-chevron" style="color:#DC1436; font-size:1.15rem; transition:transform 0.2s ease;">▾</span>
  </summary>
  <div style="padding:10px 20px 16px 54px; color:#475569; line-height:1.65; font-size:0.95rem; border-top:1px dashed #ffe4e6;">
    <p style="margin:0;">${a}</p>
  </div>
</details>
<p></p>
`;
    if (editorRef.current) {
      editorRef.current.insertContent(html);
    }
    setFaqQuestion('');
    setFaqAnswer('');
    setShowFaqModal(false);
  };

  // Generate CTA HTML based on selected style in Vellko ERP Theme (#DC1436)
  const generateCtaHtml = () => {
    const title = ctaTitle.trim() || 'Accelerate Your Enterprise';
    const text = ctaText.trim() || 'Discover the modern cloud ERP platform tailored for your industry workflows.';
    const btnText = ctaButtonText.trim();
    const btnLink = ctaButtonLink.trim() || '/contact';
    const imgUrl = ctaImage.trim();

    if (ctaStyle === 'style1') {
      // Style 1: Elegant Left-Border Crimson
      return `
<div class="cta-style-1" style="display:flex; align-items:flex-start; gap:16px; background:#fff1f2; border-left:4px solid #DC1436; border-radius:0 12px 12px 0; padding:20px 24px; margin:28px 0; box-shadow:0 2px 5px rgba(220,20,54,0.04);">
  <div style="flex-shrink:0; width:44px; height:44px; border-radius:50%; background:#ffe4e6; display:flex; align-items:center; justify-content:center; font-size:20px; color:#DC1436;">
    ${imgUrl ? `<img src="${imgUrl}" alt="icon" style="width:24px; height:24px; object-fit:contain;" />` : '💼'}
  </div>
  <div style="flex:1;">
    <h4 style="color:#881337; margin:0 0 6px 0; font-size:1.1rem; font-weight:700;">${title}</h4>
    <p style="color:#475569; margin:0; font-style:italic; line-height:1.6; font-size:0.95rem;">${text}</p>
    ${btnText ? `<div style="margin-top:14px;"><a href="${btnLink}" rel="nofollow noopener noreferrer" target="_blank" style="display:inline-block; background:#DC1436; color:#ffffff; padding:8px 20px; border-radius:6px; font-weight:700; text-decoration:none; font-size:0.88rem; box-shadow:0 2px 6px rgba(220,20,54,0.3);">${btnText} →</a></div>` : ''}
  </div>
</div>
<p></p>
`;
    } else if (ctaStyle === 'style2') {
      // Style 2: Clean Modern Layout with Action Button (Screenshot 1)
      return `
<div class="cta-style-2" style="background:#ffffff; border:1px solid #e2e8f0; border-radius:12px; padding:24px; margin:28px 0; display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:20px; box-shadow:0 2px 8px rgba(0,0,0,0.04);">
  <div style="flex:1; min-width:260px;">
    <h4 style="color:#1e293b; margin:0 0 6px 0; font-size:1.15rem; font-weight:700;">${title}</h4>
    <p style="color:#64748b; margin:0; line-height:1.6; font-size:0.95rem;">${text}</p>
  </div>
  ${btnText ? `<a href="${btnLink}" rel="nofollow noopener noreferrer" target="_blank" style="display:inline-block; background:#DC1436; color:#ffffff; padding:10px 24px; border-radius:6px; font-weight:700; text-decoration:none; font-size:0.88rem; letter-spacing:0.04em; text-transform:uppercase; box-shadow:0 2px 8px rgba(220,20,54,0.35);">${btnText}</a>` : ''}
</div>
<p></p>
`;
    } else if (ctaStyle === 'style3') {
      // Style 3: Image & Text Banner (Screenshot 2)
      return `
<div class="cta-style-3" style="background:#ffffff; border:1px solid #e2e8f0; border-radius:12px; overflow:hidden; margin:28px 0; display:flex; flex-wrap:wrap; align-items:stretch; box-shadow:0 2px 8px rgba(0,0,0,0.04);">
  <div style="flex-shrink:0; width:140px; min-height:120px; background:#fff1f2; display:flex; align-items:center; justify-content:center; padding:16px;">
    ${imgUrl ? `<img src="${imgUrl}" alt="${title}" style="max-width:100%; max-height:90px; object-fit:contain;" />` : '<div style="font-size:38px;">📊</div>'}
  </div>
  <div style="flex:1; min-width:260px; padding:20px 24px; display:flex; flex-direction:column; justify-content:center;">
    <h4 style="color:#1e293b; margin:0 0 6px 0; font-size:1.1rem; font-weight:700;">${title}</h4>
    <p style="color:#64748b; margin:0 0 14px 0; line-height:1.6; font-size:0.92rem;">${text}</p>
    ${btnText ? `<div><a href="${btnLink}" rel="nofollow noopener noreferrer" target="_blank" style="display:inline-block; background:#DC1436; color:#ffffff; padding:8px 20px; border-radius:6px; font-weight:700; text-decoration:none; font-size:0.82rem; letter-spacing:0.04em; text-transform:uppercase; box-shadow:0 2px 6px rgba(220,20,54,0.3);">${btnText}</a></div>` : ''}
  </div>
</div>
<p></p>
`;
    } else if (ctaStyle === 'style4') {
      // Style 4: Announcement Spotlight (Screenshot 3)
      return `
<div class="cta-style-4" style="background:linear-gradient(135deg, #DC1436 0%, #991b1b 100%); color:#ffffff; border-radius:12px; padding:24px 28px; margin:28px 0; display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:20px; box-shadow:0 8px 20px -4px rgba(220,20,54,0.35);">
  <div style="flex:1; min-width:260px;">
    <h4 style="color:#ffffff; margin:0 0 6px 0; font-size:1.2rem; font-weight:800;">${title}</h4>
    <p style="color:#ffe4e6; margin:0; line-height:1.6; font-size:0.95rem;">${text}</p>
  </div>
  ${btnText ? `<a href="${btnLink}" rel="nofollow noopener noreferrer" target="_blank" style="display:inline-block; background:#ffffff; color:#DC1436; padding:10px 24px; border-radius:6px; font-weight:800; text-decoration:none; font-size:0.88rem; letter-spacing:0.04em; text-transform:uppercase; box-shadow:0 2px 6px rgba(0,0,0,0.15);">${btnText}</a>` : ''}
</div>
<p></p>
`;
    } else {
      // Style 5: Dashed Spacer Layout (Screenshot 4)
      return `
<div class="cta-style-5" style="border:2px dashed #fecdd3; border-radius:12px; padding:24px; margin:28px 0; text-align:center; background:#fffafb;">
  <div style="width:36px; height:36px; border-radius:50%; background:#ffe4e6; display:inline-flex; align-items:center; justify-content:center; font-size:18px; margin-bottom:8px;">✨</div>
  <h4 style="color:#1e293b; margin:0 0 6px 0; font-size:1.08rem; font-weight:700;">${title}</h4>
  <p style="color:#64748b; margin:0 auto; max-width:540px; line-height:1.6; font-size:0.92rem;">${text}</p>
  ${btnText ? `<div style="margin-top:14px;"><a href="${btnLink}" rel="nofollow noopener noreferrer" target="_blank" style="display:inline-block; background:#DC1436; color:#ffffff; padding:8px 22px; border-radius:6px; font-weight:700; text-decoration:none; font-size:0.82rem; letter-spacing:0.04em; text-transform:uppercase; box-shadow:0 2px 6px rgba(220,20,54,0.3);">${btnText}</a></div>` : ''}
</div>
<p></p>
`;
    }
  };

  // Insert CTA into Editor
  const handleInsertCta = () => {
    const html = generateCtaHtml();
    if (editorRef.current) {
      editorRef.current.insertContent(html);
    }
    setShowCtaModal(false);
  };

  // Insert Link with SEO Attributes into Editor
  const handleSaveLink = () => {
    if (!linkUrl.trim()) return;
    const url = linkUrl.trim();
    const text = linkText.trim() || url;
    const titleAttr = linkTitle.trim() ? ` title="${linkTitle.trim()}"` : '';
    const targetAttr = linkTarget ? ` target="${linkTarget}"` : '';

    const relTokens = [];
    if (linkNofollow) relTokens.push('nofollow');
    if (linkNoopener) relTokens.push('noopener');
    if (linkNoreferrer) relTokens.push('noreferrer');
    const relAttr = relTokens.length > 0 ? ` rel="${relTokens.join(' ')}"` : '';

    const html = `<a href="${url}"${targetAttr}${relAttr}${titleAttr}>${text}</a>`;
    if (editorRef.current) {
      editorRef.current.insertContent(html);
    }
    setShowLinkModal(false);
  };

  return (
    <div className="tinymce-cloud-editor-wrapper" style={{
      position: 'relative',
      borderRadius: '16px',
      overflow: 'hidden',
      border: '1px solid #e2e8f0',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
      backgroundColor: '#ffffff'
    }}>
      <style>{`
        .tox-tinymce {
          border: none !important;
          border-radius: 16px !important;
        }
        .tox .tox-menubar {
          background-color: #ffffff !important;
          border-bottom: 1px solid #f1f5f9 !important;
          padding: 4px 8px !important;
        }
        .tox .tox-toolbar-overlord, .tox .tox-toolbar, .tox .tox-toolbar__primary {
          background-color: #ffffff !important;
          border-bottom: 1px solid #f1f5f9 !important;
        }
        .tox .tox-statusbar {
          background-color: #ffffff !important;
          border-top: 1px solid #f1f5f9 !important;
          font-size: 12px !important;
          color: #64748b !important;
          padding: 6px 14px !important;
        }
        .tox .tox-mbtn {
          font-size: 13px !important;
          color: #334155 !important;
          border-radius: 6px !important;
        }
        .tox .tox-tbtn {
          border-radius: 6px !important;
        }
      `}</style>

      {/* Upgrade Badge at top-right */}
      <div style={{
        position: 'absolute',
        top: '8px',
        right: '12px',
        zIndex: 10,
        pointerEvents: 'auto'
      }}>
        <button
          type="button"
          onClick={() => window.open('https://www.tiny.cloud/powered-by-tiny/', '_blank')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            backgroundColor: '#fff1f2',
            color: '#DC1436',
            border: '1px solid #fecdd3',
            borderRadius: '8px',
            padding: '3px 10px',
            fontSize: '12px',
            fontWeight: '700',
            cursor: 'pointer',
            boxShadow: '0 1px 2px rgba(0,0,0,0.04)'
          }}
        >
          <span style={{ color: '#DC1436' }}>⚡</span> Upgrade
        </button>
      </div>

      <Editor
        tinymceScriptSrc="https://cdnjs.cloudflare.com/ajax/libs/tinymce/6.8.2/tinymce.min.js"
        onInit={(evt, editor) => {
          editorRef.current = editor;
        }}
        value={value}
        onEditorChange={(content, editor) => {
          onChange(content, editor.getContent({ format: 'text' }));
        }}
        init={{
          height,
          menubar: 'file edit view insert format tools table help',
          menu: {
            file: { title: 'File', items: 'newdocument restoredraft | preview | print' },
            edit: { title: 'Edit', items: 'undo redo | cut copy paste pastetext | selectall | searchreplace' },
            view: { title: 'View', items: 'code | visualaid visualchars visualblocks | preview fullscreen' },
            insert: { title: 'Insert', items: 'image customLink insertFaqModal insertCtaModal insertdatetime | charmap emoticons hr | anchor table' },
            format: { title: 'Format', items: 'bold italic underline strikethrough superscript subscript codeformat | styles blocks fontfamily fontsize align lineheight | forecolor backcolor | removeformat' },
            tools: { title: 'Tools', items: 'code wordcount' },
            table: { title: 'Table', items: 'inserttable | cell row column | tableprops deletetable' },
            help: { title: 'Help', items: 'help' },
          },
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'help', 'wordcount', 'emoticons',
          ],
          toolbar:
            'undo redo | blocks fontfamily fontsize | ' +
            'bold italic underline strikethrough | forecolor backcolor | ' +
            'alignleft aligncenter alignright alignjustify | ' +
            'bullist numlist outdent indent | ' +
            'customLink image media table | insertFaqModal insertCtaModal | emoticons charmap | ' +
            'removeformat code fullscreen | help',
          toolbar_mode: 'floating',
          font_family_formats:
            'Outfit,Helvetica=Outfit,Helvetica,Arial,sans-serif; Inter=Inter,sans-serif; Arial=Arial,sans-serif; Roboto=Roboto,sans-serif; Georgia=Georgia,serif',
          font_size_formats: '8pt 10pt 12pt 14pt 16pt 18pt 24pt 36pt',
          content_style:
            '@import url("https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap"); ' +
            'body { font-family: Outfit, Helvetica, Arial, sans-serif; font-size: 15px; line-height: 1.7; color: #334155; padding: 18px; margin: 0; } ' +
            'p { margin-bottom: 1.1em; } ' +
            'a { color: #DC1436; } ' +
            '.vellko-faq-accordion summary::-webkit-details-marker { display: none; } ' +
            '.vellko-faq-accordion summary { list-style: none; cursor: pointer; outline: none; } ' +
            '.vellko-faq-accordion[open] summary .faq-chevron { transform: rotate(180deg); } ' +
            '.vellko-faq-accordion { transition: all 0.2s ease; }',
          branding: true,
          statusbar: true,
          elementpath: true,
          resize: true,
          placeholder: 'Write your blog content here...',
          
          setup: (editor) => {
            // Custom Link Dialog trigger button
            editor.ui.registry.addButton('customLink', {
              icon: 'link',
              tooltip: 'Insert/Edit Link with SEO Tags (nofollow, noopener, noreferrer)',
              onAction: () => {
                openLinkDialog();
              }
            });

            editor.ui.registry.addMenuItem('customLink', {
              text: 'Insert/Edit Link (SEO)',
              icon: 'link',
              onAction: () => {
                openLinkDialog();
              }
            });

            // Insert FAQ Modal trigger button
            editor.ui.registry.addButton('insertFaqModal', {
              text: '➕ FAQ',
              tooltip: 'Insert FAQ Accordion Block',
              onAction: () => {
                setShowFaqModal(true);
              }
            });

            editor.ui.registry.addMenuItem('insertFaqModal', {
              text: 'FAQ Accordion Section',
              icon: 'help',
              onAction: () => {
                setShowFaqModal(true);
              }
            });

            // Insert CTA Modal trigger button
            editor.ui.registry.addButton('insertCtaModal', {
              text: '📣 CTA Box',
              tooltip: 'Insert Beautiful CTA Box (5 Vellko Theme Styles)',
              onAction: () => {
                setShowCtaModal(true);
              }
            });

            editor.ui.registry.addMenuItem('insertCtaModal', {
              text: 'Call To Action (CTA) Box',
              icon: 'bookmark',
              onAction: () => {
                setShowCtaModal(true);
              }
            });
          },

          images_upload_handler: (blobInfo) =>
            new Promise((resolve, reject) => {
              const formData = new FormData();
              formData.append('image', blobInfo.blob(), blobInfo.filename());

              fetch('/api/upload', {
                method: 'POST',
                body: formData
              })
                .then((res) => {
                  if (!res.ok) throw new Error('Upload failed');
                  return res.json();
                })
                .then((data) => {
                  resolve(data.url);
                })
                .catch((err) => {
                  reject(`Image upload failed: ${err.message}`);
                });
            }),
        }}
      />

      {/* ========================================================================= */}
      {/* 1. INSERT BEAUTIFUL CTA BOX MODAL (5 Vellko ERP Themed Styles)           */}
      {/* ========================================================================= */}
      {showCtaModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.65)',
          backdropFilter: 'blur(3px)',
          zIndex: 999999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem'
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            width: '100%',
            maxWidth: '520px',
            maxHeight: '90vh',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2)',
            overflow: 'hidden'
          }}>
            {/* Modal Header */}
            <div style={{
              padding: '1rem 1.25rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid #f1f5f9'
            }}>
              <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: '700', color: '#0f172a' }}>
                Insert Beautiful CTA Box
              </h3>
              <button
                type="button"
                onClick={() => setShowCtaModal(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b', padding: '4px' }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body with Scroll */}
            <div style={{ padding: '1.25rem', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              
              {/* Selected Style Live Preview in Vellko Theme (#DC1436) */}
              <div>
                <label style={{ fontSize: '0.72rem', fontWeight: '800', color: '#475569', letterSpacing: '0.05em', marginBottom: '0.4rem', display: 'block' }}>
                  SELECTED STYLE PREVIEW:
                </label>
                <div style={{
                  padding: '14px 16px',
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '10px'
                }}>
                  {/* Style 1: Elegant Left-Border Crimson */}
                  {ctaStyle === 'style1' && (
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', background: '#fff1f2', borderLeft: '4px solid #DC1436', borderRadius: '0 8px 8px 0', padding: '12px 14px' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#ffe4e6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>💼</div>
                      <div>
                        <div style={{ color: '#881337', fontWeight: '700', fontSize: '0.95rem' }}>{ctaTitle || 'Headline Example'}</div>
                        <div style={{ color: '#475569', fontStyle: 'italic', fontSize: '0.82rem', marginTop: '2px' }}>{ctaText || 'This is an elegant callout style ideal for quotes, key facts, or important business guidance.'}</div>
                      </div>
                    </div>
                  )}

                  {/* Style 2: Clean Modern Layout (Screenshot 1) */}
                  {ctaStyle === 'style2' && (
                    <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
                      <div>
                        <div style={{ color: '#1e293b', fontWeight: '700', fontSize: '0.92rem' }}>{ctaTitle || 'Clean Modern Layout'}</div>
                        <div style={{ color: '#64748b', fontSize: '0.8rem', marginTop: '2px' }}>{ctaText || 'A perfect template to direct readers to catalog pages, specific products, or related information.'}</div>
                      </div>
                      <span style={{ backgroundColor: '#DC1436', color: '#ffffff', padding: '6px 14px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.03em', whiteSpace: 'nowrap' }}>
                        {ctaButtonText || 'CLICK HERE'}
                      </span>
                    </div>
                  )}

                  {/* Style 3: Image & Text Banner (Screenshot 2) */}
                  {ctaStyle === 'style3' && (
                    <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden', display: 'flex', alignItems: 'stretch' }}>
                      <div style={{ width: '80px', background: '#fff1f2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>
                        {ctaImage ? <img src={ctaImage} alt="preview" style={{ maxWidth: '100%', maxHeight: '50px', objectFit: 'contain' }} /> : '📊'}
                      </div>
                      <div style={{ padding: '10px 14px', flex: 1 }}>
                        <div style={{ color: '#1e293b', fontWeight: '700', fontSize: '0.9rem' }}>{ctaTitle || 'Image & Text Banner'}</div>
                        <div style={{ color: '#64748b', fontSize: '0.78rem', marginTop: '2px', marginBottom: '6px' }}>{ctaText || 'Incorporate high-impact visuals right next to your product recommendations.'}</div>
                        <span style={{ backgroundColor: '#DC1436', color: '#ffffff', padding: '3px 10px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: '800', textTransform: 'uppercase' }}>
                          {ctaButtonText || 'SHOP NOW'}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Style 4: Announcement Spotlight (Screenshot 3) */}
                  {ctaStyle === 'style4' && (
                    <div style={{ background: 'linear-gradient(135deg, #DC1436 0%, #991b1b 100%)', color: '#ffffff', borderRadius: '8px', padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
                      <div>
                        <div style={{ color: '#ffffff', fontWeight: '800', fontSize: '0.95rem' }}>{ctaTitle || 'Announcement Spotlight'}</div>
                        <div style={{ color: '#ffe4e6', fontSize: '0.8rem', marginTop: '2px' }}>{ctaText || 'A vibrant, high-contrast block designed to capture immediate reader attention for newsletters or special discounts.'}</div>
                      </div>
                      <span style={{ backgroundColor: '#ffffff', color: '#DC1436', padding: '6px 14px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
                        {ctaButtonText || 'CLAIM OFFER'}
                      </span>
                    </div>
                  )}

                  {/* Style 5: Dashed Spacer Layout (Screenshot 4) */}
                  {ctaStyle === 'style5' && (
                    <div style={{ border: '2px dashed #fecdd3', borderRadius: '8px', padding: '12px', textAlign: 'center', background: '#fffafb' }}>
                      <div style={{ fontSize: '14px', marginBottom: '2px' }}>✨</div>
                      <div style={{ color: '#1e293b', fontWeight: '700', fontSize: '0.9rem' }}>{ctaTitle || 'Dashed Spacer Layout'}</div>
                      <div style={{ color: '#64748b', fontSize: '0.78rem', marginTop: '2px', marginBottom: '6px' }}>{ctaText || 'A low-key callout option that breaks up long articles gently.'}</div>
                      <span style={{ backgroundColor: '#DC1436', color: '#ffffff', padding: '3px 12px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: '800', textTransform: 'uppercase' }}>
                        {ctaButtonText || 'VIEW MORE'}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Select Design Style Dropdown */}
              <div>
                <label style={{ fontSize: '0.8rem', color: '#475569', display: 'block', marginBottom: '0.35rem', fontWeight: '600' }}>Select Design Style</label>
                <select
                  value={ctaStyle}
                  onChange={(e) => handleCtaStyleChange(e.target.value)}
                  style={{ width: '100%', padding: '0.55rem 0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.88rem', color: '#1e293b', backgroundColor: '#ffffff' }}
                >
                  <option value="style1">Style 1: Elegant Left-Border Crimson</option>
                  <option value="style2">Style 2: Clean Modern Layout with Action Button</option>
                  <option value="style3">Style 3: Image & Text Banner</option>
                  <option value="style4">Style 4: Announcement Spotlight</option>
                  <option value="style5">Style 5: Dashed Spacer Layout</option>
                </select>
              </div>

              {/* CTA Title Input */}
              <div>
                <label style={{ fontSize: '0.8rem', color: '#475569', display: 'block', marginBottom: '0.35rem' }}>CTA Title / Header (Optional)</label>
                <input
                  type="text"
                  value={ctaTitle}
                  onChange={(e) => setCtaTitle(e.target.value)}
                  placeholder="e.g. Clean Modern Layout"
                  style={{ width: '100%', padding: '0.55rem 0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.88rem' }}
                />
              </div>

              {/* CTA Text Input */}
              <div>
                <label style={{ fontSize: '0.8rem', color: '#475569', display: 'block', marginBottom: '0.35rem' }}>CTA Text / Body Content</label>
                <textarea
                  rows="3"
                  value={ctaText}
                  onChange={(e) => setCtaText(e.target.value)}
                  placeholder="Enter body content..."
                  style={{ width: '100%', padding: '0.55rem 0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.88rem' }}
                />
              </div>

              {/* Image / Icon URL */}
              <div>
                <label style={{ fontSize: '0.8rem', color: '#475569', display: 'block', marginBottom: '0.35rem' }}>Image / Icon URL (Optional, defaults to ERP icon if empty)</label>
                <input
                  type="text"
                  value={ctaImage}
                  onChange={(e) => setCtaImage(e.target.value)}
                  placeholder="https://..."
                  style={{ width: '100%', padding: '0.55rem 0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.88rem' }}
                />
              </div>

              {/* Button Text */}
              <div>
                <label style={{ fontSize: '0.8rem', color: '#475569', display: 'block', marginBottom: '0.35rem' }}>Button Text (Optional)</label>
                <input
                  type="text"
                  value={ctaButtonText}
                  onChange={(e) => setCtaButtonText(e.target.value)}
                  placeholder="e.g. CLICK HERE"
                  style={{ width: '100%', padding: '0.55rem 0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.88rem' }}
                />
              </div>

              {/* Button Link */}
              <div>
                <label style={{ fontSize: '0.8rem', color: '#475569', display: 'block', marginBottom: '0.35rem' }}>Button Link / URL (Optional)</label>
                <input
                  type="text"
                  value={ctaButtonLink}
                  onChange={(e) => setCtaButtonLink(e.target.value)}
                  placeholder="https://vellkoerp.com/contact"
                  style={{ width: '100%', padding: '0.55rem 0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.88rem' }}
                />
              </div>

            </div>

            {/* Modal Actions */}
            <div style={{
              padding: '1rem 1.25rem',
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '0.75rem',
              borderTop: '1px solid #f1f5f9',
              backgroundColor: '#f8fafc'
            }}>
              <button
                type="button"
                onClick={() => setShowCtaModal(false)}
                style={{ padding: '0.5rem 1.25rem', borderRadius: '6px', border: '1px solid #cbd5e1', backgroundColor: '#ffffff', color: '#334155', fontWeight: '600', cursor: 'pointer', fontSize: '0.88rem' }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleInsertCta}
                style={{ padding: '0.5rem 1.4rem', borderRadius: '6px', border: 'none', backgroundColor: '#DC1436', color: '#ffffff', fontWeight: '700', cursor: 'pointer', fontSize: '0.88rem', boxShadow: '0 2px 6px rgba(220,20,54,0.35)' }}
              >
                Insert CTA
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. INSERT FAQ ACCORDION MODAL (Vellko ERP Theme)                           */}
      {/* ========================================================================= */}
      {showFaqModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.65)',
          backdropFilter: 'blur(3px)',
          zIndex: 999999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem'
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            width: '100%',
            maxWidth: '460px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2)',
            overflow: 'hidden'
          }}>
            <div style={{
              padding: '1rem 1.25rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid #f1f5f9'
            }}>
              <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: '700', color: '#0f172a' }}>
                Insert FAQ Accordion
              </h3>
              <button
                type="button"
                onClick={() => setShowFaqModal(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b', padding: '4px' }}
              >
                <X size={18} />
              </button>
            </div>

            <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.85rem', color: '#475569', display: 'block', marginBottom: '0.35rem', fontWeight: '600' }}>FAQ Question</label>
                <input
                  type="text"
                  value={faqQuestion}
                  onChange={(e) => setFaqQuestion(e.target.value)}
                  placeholder="e.g. How does Vellko ERP manage multi-warehouse inventory?"
                  style={{ width: '100%', padding: '0.6rem 0.75rem', borderRadius: '6px', border: '1px solid #DC1436', fontSize: '0.88rem', outline: 'none' }}
                  autoFocus
                />
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', color: '#475569', display: 'block', marginBottom: '0.35rem', fontWeight: '600' }}>FAQ Answer</label>
                <textarea
                  rows="4"
                  value={faqAnswer}
                  onChange={(e) => setFaqAnswer(e.target.value)}
                  placeholder="Enter detailed FAQ answer..."
                  style={{ width: '100%', padding: '0.6rem 0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.88rem' }}
                />
              </div>
            </div>

            <div style={{
              padding: '1rem 1.25rem',
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '0.75rem',
              borderTop: '1px solid #f1f5f9',
              backgroundColor: '#f8fafc'
            }}>
              <button
                type="button"
                onClick={() => setShowFaqModal(false)}
                style={{ padding: '0.5rem 1.25rem', borderRadius: '6px', border: '1px solid #cbd5e1', backgroundColor: '#ffffff', color: '#334155', fontWeight: '600', cursor: 'pointer', fontSize: '0.88rem' }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleInsertFaq}
                style={{ padding: '0.5rem 1.4rem', borderRadius: '6px', border: 'none', backgroundColor: '#DC1436', color: '#ffffff', fontWeight: '700', cursor: 'pointer', fontSize: '0.88rem', boxShadow: '0 2px 6px rgba(220,20,54,0.35)' }}
              >
                Insert FAQ
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. INSERT / EDIT LINK WITH SEO MODAL                                     */}
      {/* ========================================================================= */}
      {showLinkModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.65)',
          backdropFilter: 'blur(3px)',
          zIndex: 999999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem'
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            width: '100%',
            maxWidth: '460px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2)',
            overflow: 'hidden'
          }}>
            <div style={{
              padding: '1rem 1.25rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid #f1f5f9'
            }}>
              <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: '700', color: '#0f172a' }}>
                Insert/Edit Link
              </h3>
              <button
                type="button"
                onClick={() => setShowLinkModal(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b', padding: '4px' }}
              >
                <X size={18} />
              </button>
            </div>

            <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
              <div>
                <label style={{ fontSize: '0.82rem', color: '#475569', display: 'block', marginBottom: '0.3rem' }}>URL</label>
                <input
                  type="text"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder="https://example.com"
                  style={{ width: '100%', padding: '0.55rem 0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.88rem' }}
                  autoFocus
                />
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', color: '#475569', display: 'block', marginBottom: '0.3rem' }}>Text to display</label>
                <input
                  type="text"
                  value={linkText}
                  onChange={(e) => setLinkText(e.target.value)}
                  placeholder="Link text..."
                  style={{ width: '100%', padding: '0.55rem 0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.88rem' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', color: '#475569', display: 'block', marginBottom: '0.3rem' }}>Title</label>
                <input
                  type="text"
                  value={linkTitle}
                  onChange={(e) => setLinkTitle(e.target.value)}
                  placeholder="Optional tooltip title..."
                  style={{ width: '100%', padding: '0.55rem 0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.88rem' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', color: '#475569', display: 'block', marginBottom: '0.3rem' }}>Open link in...</label>
                <select
                  value={linkTarget}
                  onChange={(e) => setLinkTarget(e.target.value)}
                  style={{ width: '100%', padding: '0.55rem 0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.88rem', color: '#1e293b' }}
                >
                  <option value="_self">Current window</option>
                  <option value="_blank">New window (_blank)</option>
                </select>
              </div>

              {/* SEO Checkboxes */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', paddingTop: '0.25rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#334155', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={linkNofollow}
                    onChange={(e) => setLinkNofollow(e.target.checked)}
                    style={{ width: '16px', height: '16px', borderRadius: '4px', cursor: 'pointer', accentColor: '#DC1436' }}
                  />
                  No Follow (nofollow)
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#334155', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={linkNoopener}
                    onChange={(e) => setLinkNoopener(e.target.checked)}
                    style={{ width: '16px', height: '16px', borderRadius: '4px', cursor: 'pointer', accentColor: '#DC1436' }}
                  />
                  No Opener (noopener)
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#334155', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={linkNoreferrer}
                    onChange={(e) => setLinkNoreferrer(e.target.checked)}
                    style={{ width: '16px', height: '16px', borderRadius: '4px', cursor: 'pointer', accentColor: '#DC1436' }}
                  />
                  No Referrer (noreferrer)
                </label>
              </div>
            </div>

            <div style={{
              padding: '1rem 1.25rem',
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '0.75rem',
              borderTop: '1px solid #f1f5f9',
              backgroundColor: '#f8fafc'
            }}>
              <button
                type="button"
                onClick={() => setShowLinkModal(false)}
                style={{ padding: '0.5rem 1.25rem', borderRadius: '6px', border: '1px solid #cbd5e1', backgroundColor: '#ffffff', color: '#334155', fontWeight: '600', cursor: 'pointer', fontSize: '0.88rem' }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveLink}
                style={{ padding: '0.5rem 1.4rem', borderRadius: '6px', border: 'none', backgroundColor: '#DC1436', color: '#ffffff', fontWeight: '700', cursor: 'pointer', fontSize: '0.88rem', boxShadow: '0 2px 6px rgba(220,20,54,0.35)' }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
