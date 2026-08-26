import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Clock, Calendar, ArrowLeft } from 'lucide-react';
import featuredBlogImg from '../assets/images/blog-featured.jpg';
import ContactFormSection from '../components/common/ContactFormSection';
import TableOfContents, { parseHeadingsWithAnchors } from '../components/TableOfContents';

// Generate URL-friendly slug from blog title
const toSlug = (title) =>
  title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

const categoriesList = [
  "Vellko Call Recording",
  "ERP Modules",
  "Manufacturing",
  "Retail",
  "Distribution",
  "Healthcare",
  "Education",
  "Real Estate",
  "Professional Services",
  "E-Commerce"
];

// Static fallback blogs shown when the backend/MySQL is unavailable
const FALLBACK_BLOGS = [
  {
    _id: 'f1', id: 1,
    title: "Vellko ERP now imports and transcribes your call recordings automatically",
    category: "Vellko Call Recording",
    readTime: "4 Mins Read",
    excerpt: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966,",
    date: "Aug 5, 2026",
    status: "Published",
    isFeatured: true
  },
  {
    _id: 'f2', id: 2,
    title: "How ERP Modules help coordinate retail workflows",
    category: "ERP Modules",
    readTime: "3 Mins Read",
    excerpt: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966,",
    date: "Aug 5, 2026",
    status: "Published",
    isFeatured: false
  },
  {
    _id: 'f3', id: 3,
    title: "Introducing Vellko ERP for manufacturing business optimization",
    category: "ERP Modules",
    readTime: "3 Mins Read",
    excerpt: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966,",
    date: "Aug 5, 2026",
    status: "Published",
    isFeatured: false
  },
  {
    _id: 'f4', id: 4,
    title: "Healthcare compliance and digital record keeping in 2026",
    category: "Healthcare",
    readTime: "3 Mins Read",
    excerpt: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966,",
    date: "Aug 5, 2026",
    status: "Published",
    isFeatured: false
  },
  {
    _id: 'f5', id: 5,
    title: "10 reasons to migrate inventory management to cloud ERP",
    category: "ERP Modules",
    readTime: "3 Mins Read",
    excerpt: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966,",
    date: "Aug 5, 2026",
    status: "Published",
    isFeatured: false
  },
  {
    _id: 'f6', id: 6,
    title: "How cloud ERP is transforming e-commerce order management",
    category: "E-Commerce",
    readTime: "6 Mins Read",
    excerpt: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966,",
    date: "Aug 5, 2026",
    status: "Published",
    isFeatured: false
  },
  {
    _id: 'f7', id: 7,
    title: "Smart manufacturing with integrated ERP and IoT connectivity",
    category: "Manufacturing",
    readTime: "3 Mins Read",
    excerpt: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966,",
    date: "Aug 5, 2026",
    status: "Published",
    isFeatured: false
  },
  {
    _id: 'f8', id: 8,
    title: "Real estate portfolio management made simple with Vellko ERP",
    category: "Real Estate",
    readTime: "3 Mins Read",
    excerpt: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966,",
    date: "Aug 5, 2026",
    status: "Published",
    isFeatured: false
  },
  {
    _id: 'f9', id: 9,
    title: "Patient data security and HIPAA compliance in healthcare ERP",
    category: "Healthcare",
    readTime: "3 Mins Read",
    excerpt: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966,",
    date: "Aug 5, 2026",
    status: "Published",
    isFeatured: false
  }
];

export default function Blog() {
  const navigate = useNavigate();
  const { slug } = useParams();

  const [blogs, setBlogs] = useState(FALLBACK_BLOGS);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const response = await fetch('/api/blogs?status=Published');
        if (!response.ok) return;
        const data = await response.json();
        if (data.length === 0) {
          await fetch('/api/blogs/seed', { method: 'POST' });
          const retryResponse = await fetch('/api/blogs?status=Published');
          if (!retryResponse.ok) return;
          const retryData = await retryResponse.json();
          if (retryData.length > 0) setBlogs(retryData);
        } else {
          setBlogs(data);
        }
      } catch (err) {
        console.error('Error loading blogs, keeping fallback data:', err);
      }
    };
    loadBlogs();
  }, []);

  // Derive selected blog from URL slug (ignoring 'admin')
  const selectedBlog = (slug && slug !== 'admin') 
    ? blogs.find(b => toSlug(b.title) === slug) || null 
    : null;

  // Navigate to /blog/:slug when a blog card is clicked
  const openBlog = (blog) => {
    navigate(`/blog/${toSlug(blog.title)}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Calculate unique categories and their post counts
  const categoryCounts = blogs.reduce((acc, b) => {
    acc[b.category] = (acc[b.category] || 0) + 1;
    return acc;
  }, {});

  const uniqueCategories = Object.keys(categoryCounts);

  // Filter blogs based on selected category
  const filteredBlogs = activeCategory === 'All'
    ? blogs
    : blogs.filter(b => b.category === activeCategory);

  const featuredBlog = filteredBlogs.find(b => b.isFeatured) || filteredBlogs[0];
  const secondaryBlogs = filteredBlogs.filter(b => b._id !== (featuredBlog ? featuredBlog._id : null)).slice(0, 4);
  const latestBlogs = filteredBlogs.slice(0, 4);

  // Detail View — rendered when URL has a :slug
  if (selectedBlog) {
    const recentPosts = blogs.filter(b => b._id !== selectedBlog._id).slice(0, 5);
    const { headings, modifiedHtml } = parseHeadingsWithAnchors(selectedBlog.excerpt || '');

    return (
      <div className="blog-page-wrapper">
        <section className="blog-section-container">
          <div className="blog-container">
            {/* Back button */}
            <button onClick={() => navigate('/blog')} className="blog-back-btn">
              <ArrowLeft size={16} /> Back to all articles
            </button>

            <div className="blog-detail-grid row">
              {/* Left Column: Full Post content (col-lg-8) */}
              <article className="blog-detail-content col-lg-8">
                <span className="blog-detail-category-badge">{selectedBlog.category}</span>
                <h1 className="blog-detail-title">{selectedBlog.title}</h1>
                
                <div className="blog-detail-meta">
                  <span className="blog-meta-item">
                    <Calendar size={15} /> {selectedBlog.date}
                  </span>
                  <span className="blog-meta-item">
                    <Clock size={15} /> {selectedBlog.readTime}
                  </span>
                </div>

                <div className="blog-detail-image-box">
                  <img src={selectedBlog.image || featuredBlogImg} alt={selectedBlog.imageAlt || selectedBlog.title} />
                </div>

                <div className="blog-detail-body">
                  {headings.length >= 2 && (
                    <TableOfContents headings={headings} />
                  )}

                  {selectedBlog.excerpt ? (
                    <div
                      className="blog-body-p"
                      dangerouslySetInnerHTML={{ __html: modifiedHtml }}
                      style={{ lineHeight: '1.8', color: '#374151' }}
                    />
                  ) : (
                    <p className="blog-body-p lead-p">
                      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                      Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s.
                    </p>
                  )}
                </div>
              </article>

              {/* Right Column: Sidebar widgets (col-lg-4) */}
              <aside className="blog-detail-sidebar col-lg-4">
                
                {/* Widget 1: Categories */}
                <div className="sidebar-widget widget-categories">
                  <h4 className="widget-title">Blog Categories</h4>
                  <ul className="sidebar-cat-list">
                    <li>
                      <button 
                        onClick={() => { setActiveCategory('All'); navigate('/blog'); }} 
                        className={`sidebar-cat-link ${activeCategory === 'All' ? 'active' : ''}`}
                      >
                        <span>All Categories</span>
                        <span className="cat-count">({blogs.length})</span>
                      </button>
                    </li>
                    {uniqueCategories.map((cat, idx) => (
                      <li key={idx}>
                        <button 
                          onClick={() => { setActiveCategory(cat); navigate('/blog'); }} 
                          className={`sidebar-cat-link ${activeCategory === cat ? 'active' : ''}`}
                        >
                          <span>{cat}</span>
                          <span className="cat-count">({categoryCounts[cat]})</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Widget 2: Recent Blog Posts */}
                <div className="sidebar-widget widget-recent-posts">
                  <h4 className="widget-title">Recent Articles</h4>
                  <div className="sidebar-posts-list">
                    {recentPosts.map((post) => (
                      <div key={post._id} onClick={() => openBlog(post)} className="sidebar-post-item">
                        <span className="sidebar-post-category">{post.category}</span>
                        <h5 className="sidebar-post-title">{post.title}</h5>
                        <span className="sidebar-post-date">{post.date}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </aside>
            </div>
          </div>
        </section>
        
        <ContactFormSection />
      </div>
    );
  }

  return (
    <div className="blog-page-wrapper">
      {/* 1. Featured Blogs Section */}
      <section className="blog-section-container">
        <div className="blog-container">
          <div className="blog-header">
            <h1 className="blog-title-with-bar">
              {activeCategory === 'All' ? 'Featured Blogs' : `${activeCategory} Articles`}
            </h1>
            {activeCategory !== 'All' && (
              <button onClick={() => setActiveCategory('All')} className="blog-clear-filter-btn">
                Show All Categories
              </button>
            )}
          </div>

          {filteredBlogs.length > 0 ? (
            <div className="blog-content-grid">
              {/* Left Column: Featured Post Card */}
              {featuredBlog && (
                <div 
                  className="blog-featured-card" 
                  onClick={() => openBlog(featuredBlog)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="blog-featured-image-wrapper">
                    <img
                      src={featuredBlog.image || featuredBlogImg}
                      alt={featuredBlog.imageAlt || featuredBlog.title || 'Featured Blog Graphic'}
                      className="blog-featured-img"
                    />
                  </div>
                  
                  <div className="blog-featured-meta-row">
                    <span className="blog-featured-category">{featuredBlog.category}</span>
                    <span className="blog-featured-read-time">
                      <Clock size={16} className="blog-meta-icon" />
                      {featuredBlog.readTime}
                    </span>
                  </div>

                  <h2 className="blog-featured-title">
                    {featuredBlog.title}
                  </h2>



                  <div className="blog-featured-date-row">
                    <Calendar size={16} className="blog-meta-icon" />
                    {featuredBlog.date}
                  </div>
                </div>
              )}

              {/* Right Column: Secondary Text Posts */}
              <div className="blog-secondary-list">
                {secondaryBlogs.length > 0 ? (
                  secondaryBlogs.map((blog, idx) => (
                    <div 
                      key={blog._id || idx} 
                      className="blog-secondary-item"
                      onClick={() => openBlog(blog)}
                      style={{ cursor: 'pointer' }}
                    >
                      <p className="blog-secondary-text">
                        {blog.title}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="blog-secondary-item">
                    <p className="blog-secondary-text">No additional blogs available in this category.</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="blog-empty-category-message">
              <p>No published articles found in this category.</p>
              <button onClick={() => setActiveCategory('All')} className="blog-clear-filter-btn">
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 2. Latest Blogs Section */}
      {filteredBlogs.length > 0 && (
        <section className="blog-latest-section">
          <div className="blog-container">
            <h2 className="blog-title-with-bar" style={{ marginBottom: '2.5rem' }}>Latest Blogs</h2>
            <div className="blog-latest-grid">
              {latestBlogs.map((blog, idx) => (
                <div 
                  key={blog._id || idx} 
                  className="blog-card"
                  onClick={() => openBlog(blog)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="blog-card-image-wrapper">
                    <img
                      src={blog.image || featuredBlogImg}
                      alt={blog.imageAlt || blog.title || blog.category}
                      className="blog-card-img"
                    />
                  </div>
                  <div className="blog-card-meta-row">
                    <span className="blog-card-category">{blog.category}</span>
                    <span className="blog-card-read-time">
                      <Clock size={14} className="blog-meta-icon" />
                      {blog.readTime}
                    </span>
                  </div>
                  <h3 className="blog-card-title">{blog.title}</h3>
                  <div className="blog-card-date-row">
                    <Calendar size={14} className="blog-meta-icon" />
                    {blog.date}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 3. Explore Categories Section */}
      <section className="blog-categories-section">
        <div className="blog-container">
          <h2 className="blog-categories-heading">Explore categories</h2>
          <div className="blog-categories-grid">
            {categoriesList.map((cat, idx) => (
              <button 
                key={idx} 
                onClick={() => { setActiveCategory(cat); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className={`blog-category-card ${activeCategory === cat ? 'active' : ''}`}
                style={{ cursor: 'pointer', border: 'none', textAlign: 'center' }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <ContactFormSection />
    </div>
  );
}
