import React, { useState, useEffect } from 'react';
import RichTextEditor from '../components/RichTextEditor';
import featuredBlogImg from '../assets/images/blog-featured.jpg';
import TableOfContents, { parseHeadingsWithAnchors } from '../components/TableOfContents';
import { 
  Plus, Edit, Trash2, Search, Star, FileText, X, Globe, Folder, 
  Clock, Calendar, LogOut, LayoutDashboard, Settings, User, ArrowRight, 
  Mail, Bell, Trash, Link2, BookOpen, Layers, Eye, MessageSquare, 
  ThumbsUp, ThumbsDown, Upload, ChevronLeft, Image as ImageIcon
} from 'lucide-react';

// Strip HTML tags and decode entities → plain text for meta descriptions
const stripHtml = (html = '') => {
  if (!html) return '';
  return html
    .replace(/<[^>]*>/g, ' ')      // remove all tags
    .replace(/&nbsp;/g, ' ')       // decode &nbsp;
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')          // collapse whitespace
    .trim();
};

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

const generateDefaultSchema = (currentTitle, currentSlug) => {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `https://vellkoerp.com/blog/${currentSlug || 'url-slug'}#article`,
        "headline": currentTitle || "Blog Post Title",
        "image": [
          "https://images.unsplash.com/photo-1558494949-ef010cbdcc51"
        ],
        "author": {
          "@type": "Person",
          "name": "Admin"
        }
      }
    ]
  }, null, 2);
};


export default function BlogAdmin() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!sessionStorage.getItem('adminToken'));
  const [blogs, setBlogs] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedInquiry, setExpandedInquiry] = useState(null);
  
  // Login Form Credentials
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Toast notification state (replaces all alert() calls)
  const [toastMsg, setToastMsg] = useState('');
  const [toastType, setToastType] = useState('error'); // 'error' | 'success'
  const showToast = (msg, type = 'error') => {
    setToastMsg(msg);
    setToastType(type);
    setTimeout(() => setToastMsg(''), 4000);
  };

  // Active navigation tab matching NutraFyi sidebar:
  // "dashboard", "categories", "contact", "newsletter", "cms_pages", "cms_blogs", "trash"
  const [activeTab, setActiveTab] = useState('dashboard');

  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');

  // Category Tab input states
  const [newCatName, setNewCatName] = useState('');
  const [newCatSlug, setNewCatSlug] = useState('');
  const [newCatParent, setNewCatParent] = useState('None');
  const [newCatImg, setNewCatImg] = useState('');
  const [newCatAlt, setNewCatAlt] = useState('');
  const [newCatDesc, setNewCatDesc] = useState('');

  // Selected blog for editing
  const [editingBlog, setEditingBlog] = useState(null);
  
  // Blog Form Inputs (MySQL Bound)
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(categoriesList[0]);
  const [readTime, setReadTime] = useState('3 Mins Read');
  const [excerpt, setExcerpt] = useState('');
  const [status, setStatus] = useState('Published');
  const [isFeatured, setIsFeatured] = useState(false);
  const [date, setDate] = useState('');
  const [featuredImage, setFeaturedImage] = useState('');
  const [featuredImageAlt, setFeaturedImageAlt] = useState('');
  const [uploadedImages, setUploadedImages] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = React.useRef(null);

  // Fetch all already uploaded images from the server
  const fetchUploadedImages = async () => {
    try {
      const res = await fetch('/api/uploads');
      if (res.ok) {
        const data = await res.json();
        setUploadedImages(data);
      }
    } catch (err) {
      console.error('Error loading uploaded images:', err);
    }
  };

  // Handle Featured Image File Upload to Server
  const handleImageUpload = async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      showToast('Image size should be under 10MB', 'error');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    setIsUploading(true);
    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });

      if (res.ok) {
        const data = await res.json();
        setFeaturedImage(data.url);
        if (!featuredImageAlt) {
          const autoAlt = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]+/g, ' ');
          setFeaturedImageAlt(autoAlt);
        }
        showToast('Image uploaded to server successfully!', 'success');
        fetchUploadedImages();
      } else {
        const errData = await res.json();
        showToast(`Upload failed: ${errData.message || 'Server error'}`);
      }
    } catch (err) {
      console.error('Upload error:', err);
      showToast('Error uploading image to server');
    } finally {
      setIsUploading(false);
    }
  };

  // SEO Tab Local States (NutraFyi Redesign)
  const [seoTitle, setSeoTitle] = useState('');
  const [metaDesc, setMetaDesc] = useState('');
  const [focusKeyword, setFocusKeyword] = useState('');
  const [slug, setSlug] = useState('');

  // TinyMCE editor ref
  const editorRef = React.useRef(null);


  const [seoTab, setSeoTab] = useState('general'); // "general", "social", "schema", "analyzer"

  // Social Preview & Schema Markup Local States
  const [ogTitle, setOgTitle] = useState('');
  const [ogDesc, setOgDesc] = useState('');
  const [ogImg, setOgImg] = useState('https://vellkoerp.com/images/og-image.png');
  const [twitterTitle, setTwitterTitle] = useState('');
  const [twitterDesc, setTwitterDesc] = useState('');
  const [twitterCard, setTwitterCard] = useState('Summary Large Image');
  const [rawSchema, setRawSchema] = useState('');
  const [showPreviewModal, setShowPreviewModal] = useState(false);


  // Load all blogs
  const fetchBlogs = async () => {
    try {
      const response = await fetch('/api/blogs');
      if (!response.ok) throw new Error('Server error');
      const data = await response.json();
      setBlogs(data);
    } catch (err) {
      console.error('Error fetching blogs in admin (DB may be offline):', err);
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  // Load all contact inquiries
  const fetchInquiries = async () => {
    try {
      const response = await fetch('/api/contact');
      if (!response.ok) throw new Error('Server error');
      const data = await response.json();
      setInquiries(data);
    } catch (err) {
      console.error('Error fetching inquiries in admin (DB may be offline):', err);
      setInquiries([]);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchBlogs();
      fetchInquiries();
      fetchUploadedImages();
    }
  }, [isLoggedIn]);

  // Handle Login Submission
  const handleLogin = (e) => {
    e.preventDefault();
    if (email === 'admin@vellkoerp.com' && password === 'admin123') {
      sessionStorage.setItem('adminToken', 'vellko-logged-in-token-9988');
      setIsLoggedIn(true);
      setLoginError('');
    } else {
      setLoginError('Invalid email or password. Hint: admin@vellkoerp.com / admin123');
    }
  };

  // Handle Logout
  const handleLogout = () => {
    if (window.confirm('Are you sure you want to sign out?')) {
      sessionStorage.removeItem('adminToken');
      setIsLoggedIn(false);
    }
  };

  // Switch to Create Form
  const handleOpenCreate = () => {
    setEditingBlog(null);
    setTitle('');
    setCategory(categoriesList[0]);
    setReadTime('3 Mins Read');
    setExcerpt('');
    setStatus('Published');
    setIsFeatured(false);
    setDate(new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }));
    
    // SEO resets
    setSeoTitle('');
    setMetaDesc('');
    setFocusKeyword('');
    setSlug('');
    setOgTitle('');
    setOgDesc('');
    setOgImg('https://vellkoerp.com/images/og-image.png');
    setTwitterTitle('');
    setTwitterDesc('');
    setTwitterCard('Summary Large Image');
    setRawSchema(generateDefaultSchema('', ''));
    setFeaturedImage('');
    setFeaturedImageAlt('');
    
    setActiveTab('new');
  };

  // Switch to Edit Form
  const handleOpenEdit = (blog) => {
    setEditingBlog(blog);
    setTitle(blog.title || '');
    setCategory(blog.category || categoriesList[0]);
    setReadTime(blog.readTime || '3 Mins Read');
    setExcerpt(blog.excerpt || '');
    setStatus(blog.status || 'Published');
    setIsFeatured(!!blog.isFeatured);
    setDate(blog.date || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }));
    setFeaturedImage(blog.image || blog.featuredImage || '');
    setFeaturedImageAlt(blog.imageAlt || blog.featuredImageAlt || '');

    // SEO updates — use stripped plain text for meta/og/twitter descriptions
    const plainExcerpt = stripHtml(blog.excerpt || '').slice(0, 300);
    const computedSlug = (blog.title || '').toLowerCase().replace(/[^a-z0-9]+/g, '-');
    setSeoTitle(blog.title || '');
    setMetaDesc(plainExcerpt.slice(0, 160));
    setFocusKeyword('');
    setSlug(computedSlug);
    setOgTitle(blog.title || '');
    setOgDesc(plainExcerpt.slice(0, 200));
    setOgImg(blog.image || 'https://vellkoerp.com/images/og-image.png');
    setTwitterTitle(blog.title || '');
    setTwitterDesc(plainExcerpt.slice(0, 200));
    setTwitterCard('Summary Large Image');
    setRawSchema(generateDefaultSchema(blog.title, computedSlug));

    setActiveTab('edit');
  };

  // Save Blog (Insert or Update)
  const handleSave = async (e) => {
    if (e) e.preventDefault();
    if (!title.trim() || !category.trim()) {
      showToast('Title and Category are required!');
      return;
    }

    // Preserve exact status chosen by user (or default to existing blog status / 'Published')
    const finalStatus = status || (editingBlog ? editingBlog.status : 'Published');

    const payload = {
      title,
      category,
      readTime,
      excerpt,
      status: finalStatus,
      isFeatured,
      date,
      image: featuredImage,
      imageAlt: featuredImageAlt
    };

    try {
      let response;
      if (editingBlog) {
        response = await fetch(`/api/blogs/${editingBlog._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } else {
        response = await fetch('/api/blogs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      }

      if (response.ok) {
        showToast(editingBlog ? 'Blog updated successfully!' : 'Blog created successfully!', 'success');
        fetchBlogs();
        setActiveTab('cms_blogs');
      } else {
        const errorData = await response.json();
        showToast(`Error: ${errorData.message}`);
      }
    } catch (err) {
      console.error('Error saving blog to MySQL:', err);
      showToast('Failed to save blog. Please check database connection.');
    }
  };

  // Delete Blog
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog?')) return;

    try {
      const response = await fetch(`/api/blogs/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        fetchBlogs();
      } else {
        showToast('Failed to delete blog.');
      }
    } catch (err) {
      console.error('Error deleting blog:', err);
    }
  };

  // Delete Contact Inquiry
  const handleDeleteInquiry = async (id) => {
    if (!window.confirm('Are you sure you want to delete this inquiry message?')) return;

    try {
      const response = await fetch(`/api/contact/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        fetchInquiries();
      } else {
        showToast('Failed to delete message.');
      }
    } catch (err) {
      console.error('Error deleting contact inquiry:', err);
    }
  };

  // Toggle Featured status
  const handleToggleFeatured = async (blog) => {
    try {
      const response = await fetch(`/api/blogs/${blog._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isFeatured: !blog.isFeatured })
      });
      if (response.ok) {
        fetchBlogs();
      }
    } catch (err) {
      console.error('Error toggling featured status:', err);
    }
  };

  // Toggle Publish Status
  const handleToggleStatus = async (blog) => {
    const nextStatus = blog.status === 'Published' ? 'Draft' : 'Published';
    try {
      const response = await fetch(`/api/blogs/${blog._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus })
      });
      if (response.ok) {
        fetchBlogs();
      }
    } catch (err) {
      console.error('Error toggling status:', err);
    }
  };

  // Seed default blogs
  const handleSeedDatabase = async () => {
    if (!window.confirm('Seed database with default mockup blogs? This only inserts if MySQL table is empty.')) return;
    try {
      const response = await fetch('/api/blogs/seed', { method: 'POST' });
      const data = await response.json();
      showToast(data.message, 'success');
      fetchBlogs();
    } catch (err) {
      showToast('Error seeding database.');
    }
  };

  // Login Screen Render
  if (!isLoggedIn) {
    return (
      <div className="admin-login-wrapper">
        <div className="login-card-container">
          <div className="login-brand">
            <span className="brand-logo-red">VELLKO</span>
            <span className="brand-logo-black">ERP</span>
          </div>
          <h2 className="login-card-title">Blog Admin Login</h2>
          <p className="login-card-desc">Sign in with your administrative credentials to manage blog articles.</p>

          <form onSubmit={handleLogin} className="login-form">
            {loginError && <div className="login-error-alert">{loginError}</div>}
            
            <div className="login-form-group">
              <label>Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@vellkoerp.com"
                required
              />
            </div>
            
            <div className="login-form-group">
              <label>Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            <button type="submit" className="login-btn-submit">
              Sign In <ArrowRight size={18} />
            </button>
          </form>

          <div className="login-hints">
            <p><strong>Demo Credentials:</strong></p>
            <p>User: <code>admin@vellkoerp.com</code></p>
            <p>Pass: <code>admin123</code></p>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard Stats Calculations
  const totalBlogs = blogs.length;
  const publishedBlogs = blogs.filter(b => b.status === 'Published').length;
  const draftBlogs = blogs.filter(b => b.status === 'Draft').length;

  // Filtered lists
  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = 
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (blog.excerpt && blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'All' || blog.status === statusFilter;
    const matchesCategory = categoryFilter === 'All' || blog.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  // Calculate words count in rich editor
  const wordCount = excerpt.trim() ? excerpt.trim().split(/\s+/).length : 0;

  return (
    <div className="dashboard-layout">

      {/* Toast Notification - top-right, auto-dismisses after 4s */}
      {toastMsg && (
        <div style={{
          position: 'fixed', top: '1.25rem', right: '1.25rem', zIndex: 9999,
          display: 'flex', alignItems: 'flex-start', gap: '0.6rem',
          background: '#fff', border: `1px solid ${toastType === 'error' ? '#fca5a5' : '#86efac'}`,
          borderLeft: `4px solid ${toastType === 'error' ? '#ef4444' : '#22c55e'}`,
          borderRadius: '8px', padding: '0.85rem 1.1rem',
          boxShadow: '0 4px 16px rgba(0,0,0,0.12)', maxWidth: '340px', minWidth: '260px'
        }}>
          <span style={{
            flexShrink: 0, width: '20px', height: '20px', borderRadius: '50%',
            background: toastType === 'error' ? '#ef4444' : '#22c55e',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontSize: '12px', fontWeight: 700, marginTop: '1px'
          }}>
            {toastType === 'error' ? '✕' : '✓'}
          </span>
          <span style={{ fontSize: '0.85rem', color: '#1f2937', lineHeight: '1.45', flex: 1 }}>
            {toastMsg}
          </span>
          <button onClick={() => setToastMsg('')} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: '#9ca3af', fontSize: '1rem', lineHeight: 1, padding: 0, flexShrink: 0
          }}>✕</button>
        </div>
      )}

      {/* 1. Left Sidebar - Styled like NutraFyi Admin */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-brand-area">
          <div className="sidebar-logo-icon">V</div>
          <div className="sidebar-brand-text-box">
            <span className="sidebar-brand-title">Vellko Admin</span>
          </div>
        </div>

        <nav className="sidebar-menu">
          <button 
            onClick={() => setActiveTab('dashboard')} 
            className={`sidebar-menu-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
          >
            <LayoutDashboard size={18} />
            Dashboard
          </button>
          
          <button 
            onClick={() => setActiveTab('categories')} 
            className={`sidebar-menu-btn ${activeTab === 'categories' ? 'active' : ''}`}
          >
            <Layers size={18} />
            Categories
          </button>
          
          <button 
            onClick={() => setActiveTab('contact')} 
            className={`sidebar-menu-btn ${activeTab === 'contact' ? 'active' : ''}`}
          >
            <Mail size={18} />
            Contact Messages
          </button>
          
          <button 
            onClick={() => setActiveTab('newsletter')} 
            className={`sidebar-menu-btn ${activeTab === 'newsletter' ? 'active' : ''}`}
          >
            <FileText size={18} />
            Newsletter Emails
          </button>
          
          <button 
            onClick={() => setActiveTab('cms_pages')} 
            className={`sidebar-menu-btn ${activeTab === 'cms_pages' ? 'active' : ''}`}
          >
            <BookOpen size={18} />
            CMS Pages
          </button>
          
          <button 
            onClick={() => setActiveTab('cms_blogs')} 
            className={`sidebar-menu-btn ${activeTab === 'cms_blogs' ? 'active' : ''}`}
          >
            <FileText size={18} />
            CMS Blogs
          </button>
          
          <button 
            onClick={() => setActiveTab('trash')} 
            className={`sidebar-menu-btn ${activeTab === 'trash' ? 'active' : ''}`}
          >
            <Trash size={18} />
            Trash Bin
          </button>

          <button onClick={handleLogout} className="sidebar-menu-btn btn-sidebar-logout">
            <LogOut size={18} />
            Logout
          </button>
        </nav>
      </aside>

      {/* 2. Main content pane */}
      <main className="dashboard-content-pane">
        
        {/* Top Header Bar - Styled like NutraFyi Admin */}
        <header className="dashboard-header-bar">
          <div>
            <h2 className="header-tab-title">
              {activeTab === 'dashboard' && 'Dashboard'}
              {activeTab === 'categories' && 'Categories'}
              {activeTab === 'contact' && 'Contact Messages'}
              {activeTab === 'newsletter' && 'Newsletter Subscribers'}
              {activeTab === 'cms_pages' && 'CMS Pages'}
              {activeTab === 'cms_blogs' && 'CMS Blogs'}
              {activeTab === 'trash' && 'Trash Bin'}
              {activeTab === 'new' && 'CMS Blogs'}
              {activeTab === 'edit' && 'CMS Blogs'}
            </h2>
          </div>
          
          <div className="header-right-user">
            <button className="header-notif-btn" title="Notifications">
              <Bell size={20} />
            </button>
            <div className="header-user-badge">
              <div className="user-avatar-circle">B</div>
              <div className="user-text-info">
                <span className="user-name">Blog Editor</span>
                <span className="user-role">Editor</span>
              </div>
            </div>
          </div>
        </header>

        {/* 3. Render content depending on activeTab */}
        
        {/* A. DASHBOARD (OVERVIEW) TAB */}
        {activeTab === 'dashboard' && (
          <div className="overview-tab-content">
            <div className="overview-header-row">
              <div className="overview-header-left">
                <h1 className="overview-main-heading">Blog Management Overview</h1>
                <p className="overview-sub-desc">Manage articles, categories, and track search engine optimization statistics.</p>
              </div>
              <div className="overview-header-actions">
                <button onClick={() => setActiveTab('cms_blogs')} className="btn-nutra-outline">Manage Posts</button>
                <button onClick={handleOpenCreate} className="btn-nutra-primary">+ Add New Post</button>
              </div>
            </div>

            {/* NutraFyi styled 4 Metric Cards */}
            <div className="dashboard-stats-grid">
              {/* Card 1: Total Posts */}
              <div className="dashboard-stat-card">
                <div className="stat-content">
                  <span className="stat-label">TOTAL POSTS</span>
                  <span className="stat-value">{totalBlogs}</span>
                  <span className="stat-badge-overlay badge-blue">+{totalBlogs} TOTAL</span>
                </div>
                <div className="stat-icon-wrapper-circle bg-blue-light"><FileText size={20} /></div>
              </div>
              
              {/* Card 2: Categories */}
              <div className="dashboard-stat-card">
                <div className="stat-content">
                  <span className="stat-label">CATEGORIES</span>
                  <span className="stat-value">10</span>
                  <span className="stat-badge-overlay badge-purple">+10 MODULES</span>
                </div>
                <div className="stat-icon-wrapper-circle bg-purple-light"><Layers size={20} /></div>
              </div>
              
              {/* Card 3: Cumulative Views */}
              <div className="dashboard-stat-card">
                <div className="stat-content">
                  <span className="stat-label">CUMULATIVE VIEWS</span>
                  <span className="stat-value">
                    {blogs.reduce((acc, b) => acc + (Number(b.views) || 0), 0)}
                  </span>
                  <span className="stat-badge-overlay badge-sky">LIVE TRAFFIC</span>
                </div>
                <div className="stat-icon-wrapper-circle bg-sky-light"><Clock size={20} /></div>
              </div>
              
              {/* Card 4: Subscribers */}
              <div className="dashboard-stat-card">
                <div className="stat-content">
                  <span className="stat-label">SUBSCRIBERS</span>
                  <span className="stat-value">{inquiries.length}</span>
                  <span className="stat-badge-overlay badge-blue-dark">{inquiries.length} LIST</span>
                </div>
                <div className="stat-icon-wrapper-circle bg-blue-dark-light"><Mail size={20} /></div>
              </div>
            </div>

            {/* NutraFyi Analytics and list columns */}
            <div className="overview-sub-grid">
              
              {/* Left Column: Traffic Analytics line chart (inline SVG) */}
              <div className="overview-card-panel traffic-analytics-card">
                <h3>TRAFFIC ANALYTICS</h3>
                <p className="panel-subtitle">Real Article Views over time</p>
                
                <div className="chart-svg-container">
                  <svg viewBox="0 0 700 240" className="analytics-svg-chart">
                    <line x1="40" y1="20" x2="660" y2="20" stroke="#f3f4f6" strokeWidth={1} />
                    <line x1="40" y1="75" x2="660" y2="75" stroke="#f3f4f6" strokeWidth={1} />
                    <line x1="40" y1="130" x2="660" y2="130" stroke="#f3f4f6" strokeWidth={1} />
                    <line x1="40" y1="185" x2="660" y2="185" stroke="#f3f4f6" strokeWidth={1} />
                    
                    <text x="15" y="25" fill="#9ca3af" fontSize="11">240</text>
                    <text x="15" y="80" fill="#9ca3af" fontSize="11">180</text>
                    <text x="15" y="135" fill="#9ca3af" fontSize="11">120</text>
                    <text x="20" y="190" fill="#9ca3af" fontSize="11">60</text>
                    <text x="25" y="240" fill="#9ca3af" fontSize="11">0</text>
                    
                    <path 
                      d="M 50,230 L 150,230 L 250,230 L 350,230 L 450,230 L 550,65 L 650,230" 
                      fill="none" 
                      stroke="#ff6b00" 
                      strokeWidth={3.5} 
                      strokeLinecap="round"
                    />
                    
                    <circle cx="50" cy="230" r="5" fill="#ff6b00" />
                    <circle cx="150" cy="230" r="5" fill="#ff6b00" />
                    <circle cx="250" cy="230" r="5" fill="#ff6b00" />
                    <circle cx="350" cy="230" r="5" fill="#ff6b00" />
                    <circle cx="450" cy="230" r="5" fill="#ff6b00" />
                    <circle cx="550" cy="65" r="5" fill="#ff6b00" />
                    <circle cx="650" cy="230" r="5" fill="#ff6b00" />
                    
                    <text x="35" y="240" fill="#6b7280" fontSize="11">Dec 25</text>
                    <text x="135" y="240" fill="#6b7280" fontSize="11">Jan 26</text>
                    <text x="235" y="240" fill="#6b7280" fontSize="11">Feb 26</text>
                    <text x="335" y="240" fill="#6b7280" fontSize="11">Mar 26</text>
                    <text x="435" y="240" fill="#6b7280" fontSize="11">Apr 26</text>
                    <text x="530" y="240" fill="#6b7280" fontSize="11">May 26</text>
                    <text x="630" y="240" fill="#6b7280" fontSize="11">Jun 26</text>
                  </svg>
                </div>
              </div>

              {/* Right Column: Most Viewed Articles list */}
              <div className="overview-card-panel most-viewed-panel">
                <h3>MOST VIEWED ARTICLES</h3>
                <p className="panel-subtitle">Top performing content</p>
                
                <div className="most-viewed-list">
                  {blogs.slice(0, 4).map((blog, idx) => {
                    const viewsSim = [186, 92, 45, 34][idx] || 25;
                    return (
                      <div key={blog._id} className="most-viewed-item">
                        <div className="most-viewed-item-thumb">
                          <BookOpen size={16} />
                        </div>
                        <div className="most-viewed-item-details">
                          <h4 className="most-viewed-item-title">{blog.title}</h4>
                          <div className="most-viewed-item-meta">
                            <span>{blog.date}</span>
                            <span className="dot">•</span>
                            <span className="views-count">{viewsSim} views</span>
                            <span className="dot">•</span>
                            <span className="badge-published-light">PUBLISHED</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  {blogs.length === 0 && (
                    <p className="no-activity-text">No articles. Seed default database from Quick Actions or write a post.</p>
                  )}
                </div>
              </div>

            </div>

            {/* Seed Actions Quick Panel */}
            <div className="dashboard-quick-actions-panel" style={{ marginTop: '2.5rem' }}>
              <div className="overview-card-panel">
                <h3>Database Seeding Utilities</h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: '#6b7280', marginBottom: '1.25rem' }}>
                  Click below to quickly seed mockup blogs in your local database.
                </p>
                <button onClick={handleSeedDatabase} className="btn-nutra-outline" style={{ fontSize: '0.85rem' }}>
                  Seed Default Mockup Database
                </button>
              </div>
            </div>
          </div>
        )}

        {/* B. CATEGORIES TAB */}
        {activeTab === 'categories' && (
          <div className="categories-split-layout">
            
            {/* Left side: Add New Category Form */}
            <div className="category-form-side">
              <div className="overview-card-panel">
                <h3>Add New Category</h3>
                <p className="panel-subtitle">Create a new blog category classification.</p>
                
                <form className="category-inline-form" onSubmit={(e) => { e.preventDefault(); showToast('Category added!', 'success'); }}>
                  <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                    <label>CATEGORY NAME *</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Vitamins"
                      value={newCatName}
                      onChange={(e) => {
                        setNewCatName(e.target.value);
                        setNewCatSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
                      }}
                      required
                    />
                  </div>

                  <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                    <label>SLUG (OPTIONAL)</label>
                    <input 
                      type="text" 
                      placeholder="e.g. vitamins"
                      value={newCatSlug}
                      onChange={(e) => setNewCatSlug(e.target.value)}
                    />
                  </div>

                  <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                    <label>PARENT CATEGORY</label>
                    <select value={newCatParent} onChange={(e) => setNewCatParent(e.target.value)}>
                      <option value="None">None</option>
                      {categoriesList.map((cat, idx) => (
                        <option key={idx} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                    <label>CATEGORY IMAGE</label>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <input 
                        type="text" 
                        placeholder="https://example.com/images/cat.jpg"
                        value={newCatImg}
                        onChange={(e) => setNewCatImg(e.target.value)}
                        style={{ flexGrow: 1 }}
                      />
                      <button type="button" className="btn-nutra-outline" style={{ display: 'flex', gap: '0.25rem', alignItems: 'center', padding: '0.6rem 0.85rem' }}>
                        <Upload size={14} /> Upload
                      </button>
                    </div>
                  </div>

                  <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                    <label>Category Image Alt Text</label>
                    <input 
                      type="text" 
                      placeholder="Alt text"
                      value={newCatAlt}
                      onChange={(e) => setNewCatAlt(e.target.value)}
                    />
                  </div>

                  <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                    <label>DESCRIPTION</label>
                    <textarea 
                      placeholder="Category details..."
                      rows="4"
                      value={newCatDesc}
                      onChange={(e) => setNewCatDesc(e.target.value)}
                    />
                  </div>

                  <button type="submit" className="btn-nutra-primary" style={{ width: '100%' }}>
                    + Add New Category
                  </button>
                </form>
              </div>
            </div>

            {/* Right side: All Categories Table */}
            <div className="category-table-side">
              <div className="overview-card-panel">
                <h3>All Categories</h3>
                <p className="panel-subtitle">Manage store product categories, nested hierarchies, and display orders.</p>
                
                <div className="admin-table-card">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>IMAGE</th>
                        <th>NAME</th>
                        <th>SLUG</th>
                        <th>STATUS</th>
                        <th>ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categoriesList.map((cat, idx) => {
                        const mockSlug = cat.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                        return (
                          <tr key={idx}>
                            <td>
                              <div className="cat-table-thumb-mock">
                                <Folder size={16} />
                              </div>
                            </td>
                            <td className="td-title-text" style={{ fontSize: '0.9rem' }}>
                              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '600' }}>
                                <Folder size={15} style={{ color: '#94a3b8' }} /> {cat}
                              </span>
                            </td>
                            <td style={{ color: '#64748b', fontSize: '0.85rem' }}>{mockSlug}</td>
                            <td>
                              <span className="badge-published-light">Approved</span>
                            </td>
                            <td className="td-actions">
                              <button className="action-btn-edit" title="Edit Category" style={{ padding: '0.35rem' }}>
                                <Edit size={16} />
                              </button>
                              <button className="action-btn-delete" title="Delete Category" style={{ padding: '0.35rem' }}>
                                <Trash2 size={16} />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* C. CONTACT MESSAGES TAB */}
        {activeTab === 'contact' && (
          <div className="inquiries-tab-content">
            <div className="admin-table-card">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Sender Information</th>
                    <th>Job Title & Company</th>
                    <th>Company Size</th>
                    <th>Submission Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {inquiries.length > 0 ? (
                    inquiries.map((inq) => (
                      <React.Fragment key={inq.id}>
                        <tr>
                          <td>
                            <div className="td-title-text">{inq.fullName}</div>
                            <div className="td-readtime-text">{inq.workEmail}</div>
                            {inq.phoneNumber && <div className="td-readtime-text">📞 {inq.phoneNumber}</div>}
                          </td>
                          <td>
                            <div className="td-category">{inq.jobTitle || 'N/A'}</div>
                            <div className="td-readtime-text">{inq.companyName || 'N/A'}</div>
                          </td>
                          <td className="td-category">{inq.companySize}</td>
                          <td className="td-date">
                            {new Date(inq.createdAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </td>
                          <td className="td-actions">
                            <button 
                              onClick={() => setExpandedInquiry(expandedInquiry === inq.id ? null : inq.id)} 
                              className="admin-btn-secondary"
                              style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem' }}
                            >
                              {expandedInquiry === inq.id ? 'Hide Message' : 'View Message'}
                            </button>
                            <button 
                              onClick={() => handleDeleteInquiry(inq.id)} 
                              className="action-btn-delete"
                              title="Delete Message"
                              style={{ padding: '0.5rem' }}
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                        {expandedInquiry === inq.id && (
                          <tr>
                            <td colSpan="5" style={{ backgroundColor: '#f9fafb', padding: '1.5rem 2rem' }}>
                              <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', lineHeight: '1.6', color: '#374151' }}>
                                <strong style={{ color: '#111827', display: 'block', marginBottom: '0.5rem' }}>Requirements Details:</strong>
                                <p style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{inq.requirements || 'No details provided.'}</p>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="table-empty-row">No contact messages found in local database.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* D. NEWSLETTER EMAILS TAB */}
        {activeTab === 'newsletter' && (
          <div className="newsletter-tab-content">
            <div className="overview-card-panel">
              <h3>Newsletter Subscriptions</h3>
              <p className="panel-subtitle">Followers subscribed to receive latest marketing posts</p>
              
              <div className="admin-table-card" style={{ marginTop: '1.5rem' }}>
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Subscriber Email</th>
                      <th>Signup Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="td-title-text" style={{ padding: '1.25rem' }}>demo-follower@gmail.com</td>
                      <td className="td-date">Aug 20, 2026</td>
                      <td><span className="badge-published-light">ACTIVE</span></td>
                    </tr>
                    <tr>
                      <td className="td-title-text" style={{ padding: '1.25rem' }}>test-user@outlook.com</td>
                      <td className="td-date">Aug 19, 2026</td>
                      <td><span className="badge-published-light">ACTIVE</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* E. CMS PAGES TAB */}
        {activeTab === 'cms_pages' && (
          <div className="pages-tab-content">
            <div className="overview-card-panel">
              <h3>CMS Static Pages</h3>
              <p className="panel-subtitle">Manage Vellko ERP frontend static page definitions</p>
              
              <div className="admin-table-card" style={{ marginTop: '1.5rem' }}>
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Page Name</th>
                      <th>Slug Path</th>
                      <th>Template File</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="td-title-text" style={{ padding: '1.25rem' }}>Home Page</td>
                      <td className="td-category">/</td>
                      <td style={{ color: '#6b7280' }}>Welcome.jsx</td>
                      <td><span className="badge-published-light">LIVE</span></td>
                    </tr>
                    <tr>
                      <td className="td-title-text" style={{ padding: '1.25rem' }}>Pricing</td>
                      <td className="td-category">/pricing</td>
                      <td style={{ color: '#6b7280' }}>Pricing.jsx</td>
                      <td><span className="badge-published-light">LIVE</span></td>
                    </tr>
                    <tr>
                      <td className="td-title-text" style={{ padding: '1.25rem' }}>Blog Feed</td>
                      <td className="td-category">/blog</td>
                      <td style={{ color: '#6b7280' }}>Blog.jsx</td>
                      <td><span className="badge-published-light">LIVE</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* F. CMS BLOGS TAB */}
        {activeTab === 'cms_blogs' && (
          <div className="cms-blogs-split-layout">
            
            {/* Header row matching image 3 */}
            <div className="cms-blogs-header-row">
              <div className="cms-blogs-header-left">
                <div className="title-and-badge-wrap">
                  <button onClick={() => setActiveTab('dashboard')} className="btn-back-circle-grey">
                    <ChevronLeft size={18} />
                  </button>
                  <h1 className="cms-blogs-main-heading">Content Management</h1>
                  <span className="orange-posts-badge">POSTS</span>
                </div>
                <p className="cms-blogs-sub-desc">Create, orchestrate, and manage your articles.</p>
              </div>
              <div className="cms-blogs-header-right">
                <button onClick={handleOpenCreate} className="btn-nutra-primary">+ Add New Post</button>
              </div>
            </div>

            {/* Inner Content Card container */}
            <div className="overview-card-panel" style={{ padding: '1.5rem 0' }}>
              
              {/* Tab options bar */}
              <div className="posts-tab-sub-nav">
                <button className="posts-tab-sub-btn active">All Posts ({totalBlogs})</button>
                <button className="posts-tab-sub-btn">My Posts (0)</button>
                <button className="posts-tab-sub-btn">Published Posts ({publishedBlogs})</button>
                <button className="posts-tab-sub-btn">Drafts Posts ({draftBlogs})</button>
                
                <div className="posts-tab-entries-select">
                  <span>Show</span>
                  <select defaultValue="10">
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                  </select>
                  <span>entries</span>
                </div>
              </div>

              {/* Action and Filter line */}
              <div className="posts-bulk-action-bar">
                <div className="bulk-left-wrap">
                  <select className="bulk-select" defaultValue="Bulk actions">
                    <option value="Bulk actions">Bulk actions</option>
                    <option value="Publish">Publish</option>
                    <option value="Draft">Draft</option>
                    <option value="Delete">Delete</option>
                  </select>
                  <button className="btn-apply-grey">Apply</button>
                  
                  <select 
                    className="bulk-select" 
                    value={categoryFilter} 
                    onChange={(e) => setCategoryFilter(e.target.value)}
                  >
                    <option value="All">All Categories</option>
                    {categoriesList.map((cat, idx) => (
                      <option key={idx} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div className="bulk-right-wrap">
                  <div className="search-input-wrapper-nutra">
                    <Search size={16} className="search-icon-nutra" />
                    <input 
                      type="text" 
                      placeholder="Search posts..." 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Table */}
              {loading ? (
                <p className="admin-loading-text">Loading articles...</p>
              ) : (
                <div className="admin-table-card" style={{ borderLeft: 'none', borderRight: 'none', borderRadius: '0' }}>
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th style={{ width: '40px', paddingLeft: '1.5rem' }}>
                          <input type="checkbox" className="nutra-table-checkbox" />
                        </th>
                        <th style={{ width: '70px' }}>IMAGE</th>
                        <th>ARTICLE CONTENT</th>
                        <th>METADATA</th>
                        <th>VIEWS</th>
                        <th>COMMENTS</th>
                        <th>FEEDBACK</th>
                        <th>STATUS</th>
                        <th>DATE</th>
                        <th>ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredBlogs.length > 0 ? (
                        filteredBlogs.map((blog, idx) => {
                          const hasCustomImg = !!blog.image;
                          return (
                            <tr key={blog._id}>
                              <td style={{ paddingLeft: '1.5rem' }}>
                                <input type="checkbox" className="nutra-table-checkbox" />
                              </td>
                              <td style={{ width: '70px' }}>
                                <div 
                                  onClick={() => handleOpenEdit(blog)}
                                  style={{
                                    position: 'relative',
                                    width: '52px',
                                    height: '38px',
                                    borderRadius: '8px',
                                    overflow: 'hidden',
                                    cursor: 'pointer',
                                    border: `1px solid ${hasCustomImg ? '#c7d2fe' : '#e2e8f0'}`,
                                    backgroundColor: '#f8fafc'
                                  }}
                                  title={hasCustomImg ? `Uploaded image: ${blog.image}` : 'Default mockup image'}
                                >
                                  <img
                                    src={blog.image || featuredBlogImg}
                                    alt={blog.imageAlt || blog.title}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                  />
                                  {hasCustomImg && (
                                    <span style={{
                                      position: 'absolute',
                                      top: '2px',
                                      right: '2px',
                                      width: '7px',
                                      height: '7px',
                                      borderRadius: '50%',
                                      backgroundColor: '#10b981',
                                      border: '1px solid #ffffff'
                                    }} />
                                  )}
                                </div>
                              </td>
                              <td className="td-title">
                                <div className="nutra-article-title" onClick={() => handleOpenEdit(blog)} style={{ cursor: 'pointer', fontWeight: '700', color: '#1e293b' }}>
                                  {blog.title}
                                </div>
                                <div className="nutra-article-category-label">
                                  {blog.category}
                                </div>
                              </td>
                              <td>
                                <div style={{ fontWeight: '700', color: '#1e293b', fontSize: '0.85rem' }}>Admin</div>
                                <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Author</div>
                              </td>
                              <td style={{ color: '#64748b', fontSize: '0.85rem' }}>
                                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                                  <Eye size={15} style={{ color: '#94a3b8' }} /> {blog.views || 0}
                                </span>
                              </td>
                              <td style={{ color: '#64748b', fontSize: '0.85rem' }}>
                                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                                  <MessageSquare size={15} style={{ color: '#94a3b8' }} /> 0
                                </span>
                              </td>
                              <td>
                                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#64748b', fontSize: '0.78rem' }}>
                                  <ThumbsUp size={14} style={{ color: '#a3a3a3' }} /> 0
                                  <ThumbsDown size={14} style={{ color: '#a3a3a3' }} /> 0
                                </span>
                              </td>
                              <td>
                                <span className={`status-badge-btn ${blog.status.toLowerCase()}`}>
                                  {blog.status.toUpperCase()}
                                </span>
                              </td>
                              <td className="td-date">{blog.date}</td>
                              <td className="td-actions">
                                <button onClick={() => handleOpenEdit(blog)} className="action-btn-circle-nutra" title="Edit Article">
                                  <Edit size={14} />
                                </button>
                                <button onClick={() => handleDelete(blog._id)} className="action-btn-circle-nutra text-red-del" title="Delete Article">
                                  <Trash2 size={14} />
                                </button>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan="9" className="table-empty-row">No articles match the selected filters.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* G. TRASH BIN TAB */}
        {activeTab === 'trash' && (
          <div className="trash-tab-content">
            <div className="overview-card-panel">
              <h3>Trash Bin</h3>
              <p className="panel-subtitle">Temporary deleted blogs and items</p>
              <p className="no-activity-text" style={{ marginTop: '1.5rem' }}>Trash bin is empty.</p>
            </div>
          </div>
        )}

        {/* H. WRITE / EDIT POST TAB (Redesigned like NutraFyi images) */}
        {(activeTab === 'new' || activeTab === 'edit') && (
          <div className="editor-tab-split-layout">
            
            {/* 1. Header Bar for editor */}
            <div className="cms-blogs-header-row">
              <div className="cms-blogs-header-left">
                <div className="title-and-badge-wrap">
                  <button onClick={() => setActiveTab('cms_blogs')} className="btn-back-circle-grey">
                    <ChevronLeft size={18} />
                  </button>
                  <h1 className="cms-blogs-main-heading">
                    {editingBlog ? 'Edit Post' : 'Add New Post'}
                  </h1>
                </div>
                <div className="editor-permalink-line" style={{ marginTop: '0.4rem', fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: '#64748b' }}>
                  <span>Permalink: </span>
                  <span style={{ fontWeight: '600', color: '#1e293b' }}>/blog/</span>
                  <span style={{ color: '#4f46e5', fontWeight: '500' }}>{slug || 'url-slug'}</span>
                </div>
              </div>
              
              <div className="cms-blogs-header-right" style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <span style={{
                  fontSize: '0.78rem',
                  fontWeight: '700',
                  padding: '0.35rem 0.75rem',
                  borderRadius: '20px',
                  backgroundColor: status === 'Published' ? '#ecfdf5' : '#fffbeb',
                  color: status === 'Published' ? '#059669' : '#b45309',
                  border: `1px solid ${status === 'Published' ? '#a7f3d0' : '#fde68a'}`
                }}>
                  {status === 'Published' ? '● Published' : '○ Draft'}
                </span>
                <button 
                  type="button" 
                  onClick={() => {
                    if (!title.trim() && !excerpt.trim()) {
                      showToast('Please add a title or content to preview!', 'error');
                      return;
                    }
                    setShowPreviewModal(true);
                  }} 
                  className="btn-nutra-outline" 
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.6rem 1.4rem' }}
                >
                  <Eye size={15} /> Preview
                </button>
                <button 
                  type="button" 
                  onClick={handleSave} 
                  className="btn-nutra-primary" 
                  style={{ display: 'inline-flex', padding: '0.6rem 1.5rem' }}
                >
                  {editingBlog ? (status === 'Draft' ? 'Save Draft' : 'Save & Update') : (status === 'Draft' ? 'Save Draft' : 'Publish')}
                </button>
              </div>
            </div>

            {/* 2. Grid Workspace */}
            <div className="editor-layout-grid">
              
              {/* Left Column: Post Content & SEO options */}
              <div className="editor-main-side">
                
                {/* Title Input Card */}
                <div className="overview-card-panel" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
                  <input 
                    type="text" 
                    placeholder="Enter post title..."
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                      if (!editingBlog) {
                        setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
                        setSeoTitle(e.target.value);
                      }
                    }}
                    className="editor-title-field"
                    required
                  />
                  
                  {/* TinyMCE Self-Hosted Rich Text Editor */}
                  <div style={{ marginTop: '1.5rem' }}>
                    <RichTextEditor
                      value={excerpt}
                      onChange={(content, plainText) => {
                        setExcerpt(content);
                        if (!editingBlog) {
                          const cleanText = stripHtml(plainText || content).slice(0, 160);
                          setMetaDesc(cleanText);
                          setOgDesc(cleanText);
                          setTwitterDesc(cleanText);
                        }
                      }}
                      height={400}
                    />
                  </div>
                </div>

                {/* Yoast / RankMath SEO Panel Card */}
                <div className="overview-card-panel" style={{ padding: '1.75rem', marginBottom: '1.5rem' }}>
                  {/* SEO Tabs row */}
                  <div className="seo-tabs-row">
                    <button 
                      type="button" 
                      onClick={() => setSeoTab('general')} 
                      className={`seo-tab-btn ${seoTab === 'general' ? 'active' : ''}`}
                    >
                      General SEO
                    </button>
                    <button 
                      type="button" 
                      onClick={() => setSeoTab('social')} 
                      className={`seo-tab-btn ${seoTab === 'social' ? 'active' : ''}`}
                    >
                      Social Preview
                    </button>
                    <button 
                      type="button" 
                      onClick={() => setSeoTab('schema')} 
                      className={`seo-tab-btn ${seoTab === 'schema' ? 'active' : ''}`}
                    >
                      Schema Markup
                    </button>
                    <button 
                      type="button" 
                      onClick={() => setSeoTab('analyzer')} 
                      className={`seo-tab-btn ${seoTab === 'analyzer' ? 'active' : ''}`}
                    >
                      SEO Analyzer
                    </button>
                  </div>

                  {/* SEO Tab Content */}
                  {seoTab === 'general' && (
                    <div className="seo-tab-content-grid" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2rem', marginTop: '1.5rem' }}>
                      
                      {/* Left SEO Form fields */}
                      <div className="seo-form-fields" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        <div className="form-group">
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <label>SEO TITLE</label>
                            <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>{seoTitle.length}/60</span>
                          </div>
                          <input 
                            type="text" 
                            placeholder="SEO Title"
                            value={seoTitle}
                            onChange={(e) => setSeoTitle(e.target.value)}
                          />
                        </div>

                        <div className="form-group">
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <label>META DESCRIPTION</label>
                            <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>{metaDesc.length}/160</span>
                          </div>
                          <textarea 
                            placeholder="Meta description..."
                            rows="3"
                            value={metaDesc}
                            onChange={(e) => setMetaDesc(e.target.value)}
                          />
                        </div>

                        <div className="form-group">
                          <label>FOCUS KEYWORD</label>
                          <input 
                            type="text" 
                            placeholder="e.g. windows vps hosting"
                            value={focusKeyword}
                            onChange={(e) => setFocusKeyword(e.target.value)}
                          />
                        </div>

                        <div className="form-group">
                          <label>CANONICAL URL</label>
                          <input 
                            type="text" 
                            value={`https://vellkoerp.com/blog/${slug || 'url-slug'}`}
                            readOnly
                            style={{ backgroundColor: '#f8fafc', color: '#64748b' }}
                          />
                        </div>

                        <div className="form-group">
                          <label>EDITABLE PERMALINK (SLUG)</label>
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: '#64748b', paddingRight: '0.25rem' }}>/blog/</span>
                            <input 
                              type="text" 
                              value={slug}
                              onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-'))}
                              style={{ flexGrow: 1 }}
                            />
                          </div>
                          <span style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '0.25rem', display: 'block' }}>
                            Changing this will automatically update page indexing URLs.
                          </span>
                        </div>
                      </div>

                      {/* Right Google SERP Preview Card (Image 2/3) */}
                      <div className="seo-serp-preview-panel">
                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', color: '#475569', marginBottom: '0.5rem' }}>
                          GOOGLE SERP PREVIEW
                        </label>
                        
                        <div className="serp-preview-card">
                          <div className="serp-meta-url">
                            <span>https://vellkoerp.com</span>
                            <span className="sep">&gt;</span>
                            <span>blog</span>
                            <span className="sep">&gt;</span>
                          </div>
                          <h4 className="serp-title-link">
                            {seoTitle || title || 'Your SEO Title Here'}
                          </h4>
                          <p className="serp-body-desc">
                            {stripHtml(metaDesc) || stripHtml(excerpt).slice(0, 160) || 'Your meta description will appear here. Write something compelling to increase your click-through rate in search...'}
                          </p>
                        </div>

                        {/* Search engines indexing checkboxes (Image 3) */}
                        <div className="seo-indexing-checkboxes-box">
                          <div className="checkbox-item">
                            <input type="checkbox" id="idxIndex" defaultChecked />
                            <label htmlFor="idxIndex">Index</label>
                          </div>
                          <div className="checkbox-item">
                            <input type="checkbox" id="idxFollow" defaultChecked />
                            <label htmlFor="idxFollow">Follow</label>
                          </div>
                          <div className="checkbox-item">
                            <input type="checkbox" id="idxNoArchive" />
                            <label htmlFor="idxNoArchive">No Archive</label>
                          </div>
                          <div className="checkbox-item">
                            <input type="checkbox" id="idxNoSnippet" />
                            <label htmlFor="idxNoSnippet">No Snippet</label>
                          </div>
                        </div>
                      </div>

                    </div>
                  )}

                  {seoTab === 'social' && (
                    <div className="seo-tab-content-grid" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2rem', marginTop: '1.5rem' }}>
                      
                      {/* Left: Open Graph & Twitter Inputs */}
                      <div className="seo-form-fields" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem', marginBottom: '0.25rem' }}>
                          <h4 style={{ margin: 0, fontSize: '0.85rem', fontWeight: '800', color: '#1e293b', textTransform: 'uppercase' }}>Open Graph (Facebook)</h4>
                        </div>
                        
                        <div className="form-group">
                          <label>OG TITLE</label>
                          <input 
                            type="text" 
                            placeholder="OG Title"
                            value={ogTitle}
                            onChange={(e) => setOgTitle(e.target.value)}
                          />
                        </div>

                        <div className="form-group">
                          <label>OG DESCRIPTION</label>
                          <textarea 
                            placeholder="OG Description..."
                            rows="3"
                            value={ogDesc}
                            onChange={(e) => setOgDesc(e.target.value)}
                          />
                        </div>

                        <div className="form-group">
                          <label>OG IMAGE URL</label>
                          <input 
                            type="text" 
                            placeholder="https://vellkoerp.com/images/og-image.png"
                            value={ogImg}
                            onChange={(e) => setOgImg(e.target.value)}
                          />
                        </div>

                        <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem', marginTop: '1rem', marginBottom: '0.25rem' }}>
                          <h4 style={{ margin: 0, fontSize: '0.85rem', fontWeight: '800', color: '#1e293b', textTransform: 'uppercase' }}>Twitter (X)</h4>
                        </div>

                        <div className="form-group">
                          <label>TWITTER TITLE</label>
                          <input 
                            type="text" 
                            placeholder="Twitter Title"
                            value={twitterTitle}
                            onChange={(e) => setTwitterTitle(e.target.value)}
                          />
                        </div>

                        <div className="form-group">
                          <label>TWITTER DESCRIPTION</label>
                          <textarea 
                            placeholder="Twitter Description..."
                            rows="3"
                            value={twitterDesc}
                            onChange={(e) => setTwitterDesc(e.target.value)}
                          />
                        </div>

                        <div className="form-group">
                          <label>TWITTER CARD TYPE</label>
                          <select value={twitterCard} onChange={(e) => setTwitterCard(e.target.value)}>
                            <option value="Summary Large Image">Summary Large Image</option>
                            <option value="Summary Card">Summary Card</option>
                          </select>
                        </div>
                      </div>

                      {/* Right: Facebook Live Preview */}
                      <div className="seo-serp-preview-panel">
                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', color: '#475569', marginBottom: '0.5rem' }}>
                          FACEBOOK PREVIEW
                        </label>
                        
                        <div className="facebook-preview-card">
                          <div className="facebook-preview-image-mock">
                            <span>No Image Provided</span>
                          </div>
                          <div className="facebook-preview-text-box">
                            <span className="facebook-preview-domain">VELLKOERP.COM</span>
                            <h4 className="facebook-preview-title">
                              {ogTitle || title || 'No Title Provided'}
                            </h4>
                            <p className="facebook-preview-desc">
                              {stripHtml(ogDesc) || stripHtml(metaDesc) || stripHtml(excerpt).slice(0, 160) || 'No description provided. Add content to preview.'}
                            </p>
                          </div>
                        </div>
                      </div>

                    </div>
                  )}

                  {seoTab === 'schema' && (
                    <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', color: '#475569', marginBottom: '0.5rem' }}>
                          Schema In Use
                        </label>
                        <div className="active-schema-card">
                          <FileText size={18} style={{ color: '#64748b' }} />
                          <span>Article - Blog Post (Default)</span>
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '0.75rem' }}>
                        <button 
                          type="button" 
                          onClick={() => {
                            setRawSchema(generateDefaultSchema(title, slug));
                            showToast('Default schema generated successfully!', 'success');
                          }} 
                          className="btn-nutra-primary" 
                          style={{ backgroundColor: '#2563eb', borderColor: '#2563eb', padding: '0.5rem 1.25rem', fontSize: '0.85rem' }}
                        >
                          Generate Schema
                        </button>
                        <button 
                          type="button" 
                          onClick={() => {
                            try {
                              JSON.parse(rawSchema);
                              showToast('Schema JSON-LD is valid!', 'success');
                            } catch (e) {
                              showToast(`Invalid JSON-LD syntax: ${e.message}`);
                            }
                          }} 
                          className="btn-nutra-outline" 
                          style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem' }}
                        >
                          Validate Schema
                        </button>
                      </div>

                      <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '1.25rem' }}>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.25rem' }}>
                          Raw JSON-LD Preview & Override
                        </label>
                        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: '#64748b', margin: '0 0 1rem 0', lineHeight: '1.5' }}>
                          The schema is generated dynamically based on your settings above. You can also manually override it by typing your own valid JSON-LD below. Clear it to revert back to dynamic generation.
                        </p>
                        
                        <textarea 
                          className="raw-schema-textarea"
                          value={rawSchema}
                          onChange={(e) => setRawSchema(e.target.value)}
                          rows="15"
                          spellCheck="false"
                        />
                      </div>
                    </div>
                  )}

                  {seoTab === 'analyzer' && (() => {
                    let score = 0;
                    if (title) score += 10;
                    if (excerpt) score += 10;
                    if (focusKeyword) {
                      score += 10;
                      if (seoTitle.toLowerCase().includes(focusKeyword.toLowerCase())) score += 15;
                      if (metaDesc.toLowerCase().includes(focusKeyword.toLowerCase())) score += 15;
                      if (slug.toLowerCase().includes(focusKeyword.toLowerCase().replace(/[^a-z0-9]+/g, '-'))) score += 10;
                    }
                    if (seoTitle.length >= 40) score += 15;
                    if (metaDesc.length >= 80) score += 15;
                    score = Math.min(100, score);

                    const hasKeywordInTitle = focusKeyword && seoTitle.toLowerCase().includes(focusKeyword.toLowerCase());
                    const hasKeywordInMeta = focusKeyword && metaDesc.toLowerCase().includes(focusKeyword.toLowerCase());
                    const hasKeywordInSlug = focusKeyword && slug.toLowerCase().includes(focusKeyword.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
                    const hasKeywordInContent = focusKeyword && excerpt.toLowerCase().includes(focusKeyword.toLowerCase());
                    const isTitleLongEnough = seoTitle.length >= 40;
                    const isMetaLongEnough = metaDesc.length >= 80;
                    const isContentLongEnough = wordCount >= 300;
                    const hasHeadings = excerpt.includes('h2') || excerpt.includes('h3') || excerpt.includes('#');

                    return (
                      <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        
                        <div className="seo-score-panel-card">
                          <div className="score-circular-wrapper">
                            <span className="score-value-text">{score}</span>
                          </div>
                          
                          <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <h3 style={{ margin: '0 0 0.25rem 0', fontSize: '1.1rem', fontWeight: '800', color: '#0f172a' }}>SEO Score</h3>
                            <p style={{ margin: '0 0 0.75rem 0', fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: '#64748b' }}>
                              Aim for at least 80/100 to maximize search visibility.
                            </p>
                            
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                              <span className="score-badge-meta">📝 {wordCount} Words</span>
                              <span className="score-badge-meta">⏱️ {Math.ceil(wordCount / 200)} Min Read</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 style={{ margin: '0 0 1rem 0', fontSize: '0.95rem', fontWeight: '800', color: '#0f172a' }}>Analysis Results</h4>
                          <div className="analysis-results-list">
                            
                            <div className={`analysis-item ${hasKeywordInTitle ? 'success' : 'error'}`}>
                              <span className="status-icon">{hasKeywordInTitle ? '✓' : '✗'}</span>
                              <span className="analysis-text">Focus keyword in SEO title</span>
                            </div>

                            <div className={`analysis-item ${hasKeywordInMeta ? 'success' : 'error'}`}>
                              <span className="status-icon">{hasKeywordInMeta ? '✓' : '✗'}</span>
                              <span className="analysis-text">Focus keyword in Meta description</span>
                            </div>

                            <div className={`analysis-item ${hasKeywordInSlug ? 'success' : 'warning'}`}>
                              <span className="status-icon">{hasKeywordInSlug ? '✓' : '!'}</span>
                              <span className="analysis-text">Focus keyword in URL slug</span>
                            </div>

                            <div className={`analysis-item ${hasKeywordInContent ? 'success' : 'warning'}`}>
                              <span className="status-icon">{hasKeywordInContent ? '✓' : '!'}</span>
                              <span className="analysis-text">Focus keyword in first paragraph</span>
                            </div>

                            <div className={`analysis-item ${hasKeywordInContent ? 'success' : 'error'}`}>
                              <span className="status-icon">{hasKeywordInContent ? '✓' : '✗'}</span>
                              <span className="analysis-text">Focus keyword found in content</span>
                            </div>

                            <div className={`analysis-item ${isTitleLongEnough ? 'success' : 'warning'}`}>
                              <span className="status-icon">{isTitleLongEnough ? '✓' : '!'}</span>
                              <span className="analysis-text">SEO Title is too short</span>
                            </div>

                            <div className={`analysis-item ${isMetaLongEnough ? 'success' : 'warning'}`}>
                              <span className="status-icon">{isMetaLongEnough ? '✓' : '!'}</span>
                              <span className="analysis-text">Meta Description is too short</span>
                            </div>

                            <div className={`analysis-item ${isContentLongEnough ? 'success' : 'error'}`}>
                              <span className="status-icon">{isContentLongEnough ? '✓' : '✗'}</span>
                              <span className="analysis-text">Content is too short ({wordCount} words)</span>
                            </div>

                            <div className={`analysis-item ${hasHeadings ? 'success' : 'warning'}`}>
                              <span className="status-icon">{hasHeadings ? '✓' : '!'}</span>
                              <span className="analysis-text">H2 or H3 headings found in content</span>
                            </div>

                            <div className="analysis-item warning">
                              <span className="status-icon">!</span>
                              <span className="analysis-text">No internal links found</span>
                            </div>

                            <div className="analysis-item warning">
                              <span className="status-icon">!</span>
                              <span className="analysis-text">No external links found</span>
                            </div>

                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>

              </div>

              {/* Right Column: Post Settings Sidebar (Image 1) */}
              <div className="editor-settings-side">
                
                {/* 1. Post Settings panel */}
                <div className="overview-card-panel" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
                  <div className="panel-title-with-icon" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
                    <Settings size={18} style={{ color: '#4f46e5' }} />
                    <h3 style={{ margin: 0, fontSize: '0.95rem', fontWeight: '800' }}>POST SETTINGS</h3>
                  </div>

                  {/* Categories Checklist box */}
                  <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                    <label style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: '700' }}>CATEGORIES</label>
                    <div className="categories-checklist-box">
                      {categoriesList.map((cat, idx) => (
                        <div key={idx} className="checklist-row">
                          <input 
                            type="checkbox" 
                            id={`check-cat-${idx}`} 
                            checked={category === cat}
                            onChange={() => setCategory(cat)}
                          />
                          <label htmlFor={`check-cat-${idx}`}>{cat}</label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Display Badge (Featured mapped) */}
                  <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                    <label style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: '700' }}>DISPLAY BADGE</label>
                    <select 
                      value={isFeatured ? 'Featured Article' : 'No Badge'}
                      onChange={(e) => setIsFeatured(e.target.value === 'Featured Article')}
                    >
                      <option value="No Badge">No Badge</option>
                      <option value="Featured Article">Featured Article</option>
                    </select>
                  </div>

                  {/* Post Status */}
                  <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                    <label style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: '700' }}>POST STATUS</label>
                    <select value={status} onChange={(e) => setStatus(e.target.value)}>
                      <option value="Published">Published</option>
                      <option value="Draft">Draft</option>
                    </select>
                  </div>

                  {/* Upload Date */}
                  <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                    <label style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: '700' }}>PUBLISH / UPLOAD DATE</label>
                    <input 
                      type="text" 
                      value={date} 
                      onChange={(e) => setDate(e.target.value)} 
                      placeholder="e.g. Aug 5, 2026"
                    />
                  </div>

                  {/* Tags */}
                  <div className="form-group">
                    <label style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: '700' }}>TAGS (COMMA SEPARATED)</label>
                    <div style={{ position: 'relative' }}>
                      <input 
                        type="text" 
                        placeholder="hosting, tutorial, vps..." 
                        style={{ paddingLeft: '2rem' }}
                      />
                      <span style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', fontSize: '0.8rem' }}>🏷️</span>
                    </div>
                  </div>
                </div>

                {/* 2. Featured Image panel */}
                <div className="overview-card-panel" style={{ padding: '1.5rem' }}>
                  <div className="panel-title-with-icon" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
                    <ImageIcon size={18} style={{ color: '#4f46e5' }} />
                    <h3 style={{ margin: 0, fontSize: '0.95rem', fontWeight: '800' }}>FEATURED IMAGE</h3>
                  </div>

                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept="image/*"
                    style={{ display: 'none' }}
                  />

                  {isUploading ? (
                    <div style={{
                      padding: '2rem 1rem',
                      border: '2px dashed #4f46e5',
                      borderRadius: '10px',
                      backgroundColor: '#eef2ff',
                      textAlign: 'center',
                      color: '#4f46e5',
                      fontSize: '0.85rem',
                      fontWeight: '600'
                    }}>
                      Uploading image to server...
                    </div>
                  ) : featuredImage ? (
                    <div style={{ borderRadius: '10px', overflow: 'hidden', border: '1px solid #e2e8f0', marginBottom: '1rem', backgroundColor: '#f8fafc' }}>
                      <div style={{ position: 'relative' }}>
                        <img
                          src={featuredImage}
                          alt={featuredImageAlt || 'Featured Preview'}
                          style={{ width: '100%', height: '170px', objectFit: 'cover', display: 'block' }}
                        />
                        <div style={{
                          position: 'absolute',
                          top: '8px',
                          right: '8px',
                          display: 'flex',
                          gap: '6px'
                        }}>
                          <button
                            type="button"
                            onClick={() => fileInputRef.current && fileInputRef.current.click()}
                            style={{
                              backgroundColor: 'rgba(255, 255, 255, 0.95)',
                              border: '1px solid #cbd5e1',
                              borderRadius: '6px',
                              padding: '4px 8px',
                              fontSize: '11px',
                              fontWeight: '600',
                              cursor: 'pointer',
                              color: '#1e293b'
                            }}
                          >
                            Change
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setFeaturedImage('');
                              if (fileInputRef.current) fileInputRef.current.value = '';
                            }}
                            style={{
                              backgroundColor: 'rgba(239, 68, 68, 0.9)',
                              border: 'none',
                              borderRadius: '6px',
                              padding: '4px 8px',
                              fontSize: '11px',
                              fontWeight: '600',
                              cursor: 'pointer',
                              color: '#ffffff'
                            }}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                      <div style={{ padding: '0.5rem 0.75rem', fontSize: '0.72rem', color: '#64748b', wordBreak: 'break-all', borderTop: '1px solid #e2e8f0' }}>
                        <span style={{ fontWeight: '700', color: '#334155' }}>
                          {featuredImage.startsWith('data:') ? 'Image: ' : 'Path: '}
                        </span>
                        {featuredImage.startsWith('data:') ? 'Uploaded Local Image (will save as server file)' : featuredImage}
                      </div>
                    </div>
                  ) : (
                    <div
                      className="featured-image-dotted-upload-box"
                      onClick={() => fileInputRef.current && fileInputRef.current.click()}
                      style={{
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '1.75rem 1rem',
                        border: '2px dashed #cbd5e1',
                        borderRadius: '10px',
                        backgroundColor: '#f8fafc',
                        transition: 'all 0.2s ease',
                        textAlign: 'center'
                      }}
                    >
                      <div style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '50%',
                        backgroundColor: '#eef2ff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '0.4rem',
                        color: '#4f46e5'
                      }}>
                        <Upload size={18} />
                      </div>
                      <span style={{ fontSize: '0.85rem', fontWeight: '600', color: '#334155' }}>Click to upload image</span>
                      <span style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '2px' }}>Saved to server /uploads folder</span>
                    </div>
                  )}

                  <div className="form-group" style={{ marginTop: '1rem' }}>
                    <label style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: '700', marginBottom: '0.35rem', display: 'block' }}>
                      IMAGE ALT TEXT
                    </label>
                    <input 
                      type="text" 
                      placeholder="e.g. ERP call recording workflow diagram"
                      value={featuredImageAlt}
                      onChange={(e) => setFeaturedImageAlt(e.target.value)}
                      style={{ fontSize: '0.85rem', padding: '0.55rem 0.75rem' }}
                    />
                  </div>

                  {/* Already Uploaded Images Gallery */}
                  {uploadedImages.length > 0 && (
                    <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid #f1f5f9' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <label style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: '800', textTransform: 'uppercase' }}>
                          Already Uploaded Images ({uploadedImages.length})
                        </label>
                      </div>
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(4, 1fr)',
                        gap: '6px',
                        maxHeight: '140px',
                        overflowY: 'auto',
                        padding: '4px',
                        backgroundColor: '#f8fafc',
                        borderRadius: '8px',
                        border: '1px solid #e2e8f0'
                      }}>
                        {uploadedImages.map((img, i) => {
                          const isSelected = featuredImage === img.url;
                          return (
                            <div
                              key={i}
                              onClick={() => {
                                setFeaturedImage(img.url);
                                if (!featuredImageAlt) {
                                  setFeaturedImageAlt(img.filename.replace(/\.[^/.]+$/, '').replace(/[-_]+/g, ' '));
                                }
                                showToast('Selected image from library!', 'success');
                              }}
                              style={{
                                position: 'relative',
                                height: '52px',
                                borderRadius: '6px',
                                overflow: 'hidden',
                                cursor: 'pointer',
                                border: isSelected ? '2px solid #4f46e5' : '1px solid #cbd5e1',
                                backgroundColor: '#ffffff'
                              }}
                              title={img.filename}
                            >
                              <img
                                src={img.url}
                                alt={img.filename}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                              />
                              {isSelected && (
                                <span style={{
                                  position: 'absolute',
                                  top: '2px',
                                  right: '2px',
                                  width: '6px',
                                  height: '6px',
                                  borderRadius: '50%',
                                  backgroundColor: '#4f46e5'
                                }} />
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

              </div>

            </div>

          </div>
        )}

        {/* Live Blog Preview Modal */}
        {showPreviewModal && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.75)',
            backdropFilter: 'blur(4px)',
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
            overflowY: 'auto'
          }}>
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              maxWidth: '960px',
              width: '100%',
              maxHeight: '90vh',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              overflow: 'hidden'
            }}>
              {/* Modal Top Bar */}
              <div style={{
                padding: '1rem 1.5rem',
                borderBottom: '1px solid #e2e8f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: '#f8fafc'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    backgroundColor: status === 'Published' ? '#10b981' : '#f59e0b'
                  }} />
                  <span style={{ fontSize: '0.9rem', fontWeight: '700', color: '#1e293b' }}>
                    Live Article Preview ({status})
                  </span>
                  <span style={{
                    fontSize: '0.75rem',
                    color: '#64748b',
                    backgroundColor: '#e2e8f0',
                    padding: '0.2rem 0.6rem',
                    borderRadius: '12px'
                  }}>
                    /blog/{slug || 'preview'}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <button
                    type="button"
                    onClick={() => setShowPreviewModal(false)}
                    style={{
                      padding: '0.45rem 1rem',
                      fontSize: '0.85rem',
                      fontWeight: '600',
                      color: '#475569',
                      backgroundColor: '#ffffff',
                      border: '1px solid #cbd5e1',
                      borderRadius: '8px',
                      cursor: 'pointer'
                    }}
                  >
                    Close Preview
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowPreviewModal(false);
                      handleSave();
                    }}
                    className="btn-nutra-primary"
                    style={{ padding: '0.45rem 1.25rem', fontSize: '0.85rem' }}
                  >
                    {editingBlog ? (status === 'Draft' ? 'Save Draft' : 'Save & Update') : (status === 'Draft' ? 'Save Draft' : 'Publish')}
                  </button>
                </div>
              </div>

              {/* Modal Body - mimics public Blog detail page view */}
              <div style={{ padding: '2rem', overflowY: 'auto', flex: 1, backgroundColor: '#ffffff' }}>
                <div className="blog-page-wrapper" style={{ padding: 0 }}>
                  <article className="blog-detail-content" style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <span className="blog-detail-category-badge">{category || 'General'}</span>
                    <h1 className="blog-detail-title" style={{ marginTop: '0.75rem', marginBottom: '1rem' }}>
                      {title || 'Untitled Post'}
                    </h1>

                    <div className="blog-detail-meta" style={{ marginBottom: '1.5rem', display: 'flex', gap: '1.25rem', color: '#64748b', fontSize: '0.88rem' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <Calendar size={15} /> {date || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <Clock size={15} /> {readTime || '3 Mins Read'}
                      </span>
                      {isFeatured && (
                        <span style={{
                          backgroundColor: '#fef3c7',
                          color: '#d97706',
                          fontWeight: '700',
                          fontSize: '0.75rem',
                          padding: '0.15rem 0.5rem',
                          borderRadius: '4px'
                        }}>
                          ⭐ Featured
                        </span>
                      )}
                    </div>

                    <div className="blog-detail-image-box" style={{ marginBottom: '2rem', borderRadius: '12px', overflow: 'hidden', maxHeight: '420px' }}>
                      <img
                        src={featuredImage || featuredBlogImg}
                        alt={featuredImageAlt || title || 'Featured Article'}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>

                    <div className="blog-detail-body" style={{ lineHeight: '1.8', color: '#374151', fontSize: '1.05rem' }}>
                      {(() => {
                        const { headings, modifiedHtml } = parseHeadingsWithAnchors(excerpt || '');
                        return (
                          <>
                            {headings.length >= 2 && (
                              <TableOfContents headings={headings} />
                            )}
                            {excerpt ? (
                              <div dangerouslySetInnerHTML={{ __html: modifiedHtml }} />
                            ) : (
                              <p style={{ color: '#94a3b8', fontStyle: 'italic' }}>
                                No article content yet. Write content in the editor to see it rendered here.
                              </p>
                            )}
                          </>
                        );
                      })()}
                    </div>
                  </article>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
