import { useState } from 'react';
import { Phone, Mail, MapPin, Globe } from 'lucide-react';
import heroBg from '../assets/images/about-hero-bg.png';

const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const LinkedInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function ContactUs() {
  const [formData, setFormData] = useState({
    fullName: '',
    workEmail: '',
    phoneNumber: '',
    companyName: '',
    jobTitle: '',
    companySize: '1-10 employees',
    requirements: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you, ${formData.fullName}! Your message has been sent successfully.`);
    setFormData({
      fullName: '',
      workEmail: '',
      phoneNumber: '',
      companyName: '',
      jobTitle: '',
      companySize: '1-10 employees',
      requirements: ''
    });
  };

  return (
    <div className="contact-page-wrapper" style={{ backgroundImage: `url(${heroBg})` }}>
      <div className="contact-overlay"></div>
      <div className="contact-page-container">
        <h1 className="contact-title animate-fade-in">Contact Us</h1>

        <div className="contact-main-card animate-fade-in">
          {/* Left Column - Form */}
          <div className="contact-left-col">
            <form onSubmit={handleSubmit}>
              <div className="contact-form-grid">
                <div className="contact-form-group">
                  <label htmlFor="fullName" className="contact-label">Full Name</label>
                  <input type="text" id="fullName" name="fullName" placeholder="Enter your full name"
                    value={formData.fullName} onChange={handleChange} className="contact-input" required />
                </div>

                <div className="contact-form-group">
                  <label htmlFor="workEmail" className="contact-label">Work Email</label>
                  <input type="email" id="workEmail" name="workEmail" placeholder="Enter your email"
                    value={formData.workEmail} onChange={handleChange} className="contact-input" required />
                </div>

                <div className="contact-form-group">
                  <label htmlFor="phoneNumber" className="contact-label">Phone Number</label>
                  <input type="tel" id="phoneNumber" name="phoneNumber" placeholder="Enter your phone number"
                    value={formData.phoneNumber} onChange={handleChange} className="contact-input" required />
                </div>

                <div className="contact-form-group">
                  <label htmlFor="companyName" className="contact-label">Company Name</label>
                  <input type="text" id="companyName" name="companyName" placeholder="Enter your company name"
                    value={formData.companyName} onChange={handleChange} className="contact-input" required />
                </div>

                <div className="contact-form-group">
                  <label htmlFor="jobTitle" className="contact-label">Job Title / Role-</label>
                  <input type="text" id="jobTitle" name="jobTitle" placeholder="Enter your role"
                    value={formData.jobTitle} onChange={handleChange} className="contact-input" required />
                </div>

                <div className="contact-form-group">
                  <label htmlFor="companySize" className="contact-label">Company Size-</label>
                  <select id="companySize" name="companySize" value={formData.companySize}
                    onChange={handleChange} className="contact-select">
                    <option value="1-10 employees">1-10 employees</option>
                    <option value="11-50 employees">11-50 employees</option>
                    <option value="51-200 employees">51-200 employees</option>
                    <option value="201-500 employees">201-500 employees</option>
                    <option value="500+ employees">500+ employees</option>
                  </select>
                </div>

                <div className="contact-form-group full-width">
                  <label htmlFor="requirements" className="contact-label">
                    Tell us a little about your requirements (Optional)
                  </label>
                  <textarea id="requirements" name="requirements" placeholder="Write Something..."
                    value={formData.requirements} onChange={handleChange} className="contact-textarea">
                  </textarea>
                </div>
              </div>

              <div className="contact-form-actions">
                <button type="submit" className="contact-btn-send">Send message</button>
                <button type="button" className="contact-btn-call"
                  onClick={() => window.open('tel:+911204567900')}>Call Now</button>
              </div>
            </form>
          </div>

          {/* Right Column - Info */}
          <div className="contact-right-col">
            <h2 className="contact-info-heading">
              We are here to manage everything your{' '}
              <span className="red-highlight">business needs</span>
            </h2>

            <div className="contact-info-list">
              <div className="contact-info-item">
                <div className="contact-info-icon-circle"><Phone size={20} /></div>
                <div className="contact-info-text-group">
                  <span className="contact-info-label">Contact No:</span>
                  <span className="contact-info-value">+91 120 456 7900</span>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-info-icon-circle"><Mail size={20} /></div>
                <div className="contact-info-text-group">
                  <span className="contact-info-label">Mail ID:</span>
                  <span className="contact-info-value">info@vellkoerp.com</span>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-info-icon-circle"><MapPin size={20} /></div>
                <div className="contact-info-text-group">
                  <span className="contact-info-label">Address:</span>
                  <span className="contact-info-value">Pune, India</span>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-info-icon-circle"><Globe size={20} /></div>
                <div className="contact-info-text-group">
                  <span className="contact-info-label">Website:</span>
                  <span className="contact-info-value">www.vellkoerp.com</span>
                </div>
              </div>
            </div>

            <div className="contact-social-section">
              <span className="contact-social-label">Follow us :</span>
              <div className="contact-social-links">
                <a href="#" className="contact-social-icon-circle" aria-label="Facebook">
                  <FacebookIcon />
                </a>
                <a href="#" className="contact-social-icon-circle" aria-label="Instagram">
                  <InstagramIcon />
                </a>
                <a href="#" className="contact-social-icon-circle" aria-label="LinkedIn">
                  <LinkedInIcon />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
