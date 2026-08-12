import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, X } from 'lucide-react';
import ContactFormSection from '../components/common/ContactFormSection';

const currencies = [
  { id: '1', label: 'Dollars ($)', symbol: '$', rate: 0.012 },
  { id: '2', label: 'Pounds (£)', symbol: '£', rate: 0.0095 },
  { id: '3', label: 'Euros (€)', symbol: '€', rate: 0.011 },
  { id: '4', label: 'Rupee (₹)', symbol: '₹', rate: 1 },
];

const featureList = [
  "Max Active Employees",
  "File Storage",
  "Clients",
  "Employees",
  "Projects",
  "Attendance",
  "Tasks",
  "Estimates",
  "Invoices",
  "Payments",
  "Time Logs",
  "Tickets",
  "Events",
  "Notices",
  "Leaves",
  "Leads",
  "Holidays",
  "Products",
  "Expenses",
  "Contracts",
  "Reports",
  "Orders",
  "Knowledge Base",
  "Bank Account",
  "Messages",
  "Performance",
  "Payroll",
  "Purchase",
  "AI Tools",
  "Assets",
  "Zoom",
  "Recruit",
  "Biolinks",
  "Biometric",
  "Webhooks",
  "Group Message",
  "SMS",
  "Onboarding",
  "Policy Center",
  "Server Manager",
  "QR Code",
  "Custom Domain",
  "Letter"
];

// Plans matrix mapping: key represents feature index
// Values for index 0 (Employees) and 1 (Storage): string values
// Values for index 2..42: boolean (true = check, false = cross)
const plansData = {
  monthly: [
    {
      name: "Default",
      price: 0,
      period: "Free forever",
      isFree: true,
      employees: "1",
      storage: "500 MB",
      features: [
        true, true, true, true, true, true, true, true, true, true,
        true, true, true, true, true, true, true, true, true, true,
        true, true, true, true, true, true, true, true, true, true,
        true, true, true, true, true, true, true, true, true, true, true
      ]
    },
    {
      name: "Basic",
      price: 6500,
      period: "Billed Monthly",
      isFree: false,
      employees: "50",
      storage: "32 GB",
      features: [
        false, true, false, true, false, false, false, false, true, false,
        false, false, true, false, true, false, false, false, false, false,
        false, false, false, false, false, false, false, false, false, false,
        false, false, false, true, false, false, true, false, false, false, false
      ]
    },
    {
      name: "Enterprises",
      price: 12000,
      period: "Billed Monthly",
      isFree: false,
      employees: "50",
      storage: "64 GB",
      features: [
        false, true, false, true, true, false, false, false, true, false,
        false, false, true, false, true, false, false, false, false, false,
        false, false, false, true, true, false, false, false, false, false,
        false, true, false, true, false, true, true, false, false, false, false
      ]
    },
    {
      name: "Elite",
      price: 25000,
      period: "Billed Monthly",
      isFree: false,
      employees: "47",
      storage: "98 GB",
      features: [
        true, true, true, true, true, true, true, true, true, true,
        true, true, true, true, true, true, true, true, true, true,
        true, true, true, true, true, true, true, true, true, true,
        true, true, true, true, true, true, true, true, true, true, true
      ]
    }
  ],
  yearly: [
    {
      name: "Default",
      price: 0,
      period: "Free forever",
      isFree: true,
      employees: "1",
      storage: "500 MB",
      features: [
        true, true, true, true, true, true, true, true, true, true,
        true, true, true, true, true, true, true, true, true, true,
        true, true, true, true, true, true, true, true, true, true,
        true, true, true, true, true, true, true, true, true, true, true
      ]
    },
    {
      name: "Basic",
      price: 78000,
      period: "Billed Annually",
      isFree: false,
      employees: "50",
      storage: "32 GB",
      features: [
        false, true, false, true, false, false, false, false, true, false,
        false, false, true, false, true, false, false, false, false, false,
        false, false, false, false, false, false, false, false, false, false,
        false, false, false, true, false, false, true, false, false, false, false
      ]
    },
    {
      name: "Enterprises",
      price: 144000,
      period: "Billed Annually",
      isFree: false,
      employees: "50",
      storage: "64 GB",
      features: [
        false, true, false, true, true, false, false, false, true, false,
        false, false, true, false, true, false, false, false, false, false,
        false, false, false, true, true, false, false, false, false, false,
        false, true, false, true, false, true, true, false, false, false, false
      ]
    },
    {
      name: "Elite",
      price: 300000,
      period: "Billed Annually",
      isFree: false,
      employees: "Unlimited",
      storage: "Unlimited",
      features: [
        true, true, true, true, true, true, true, true, true, true,
        true, true, true, true, true, true, true, true, true, true,
        true, true, true, true, true, true, true, true, true, true,
        true, true, true, true, true, true, true, true, true, true, true
      ]
    }
  ]
};

export default function Pricing() {
  const [currency, setCurrency] = useState('4'); // Default Rupee (₹)
  const [billingCycle, setBillingCycle] = useState('yearly'); // 'monthly' | 'yearly'

  const activeCurrency = currencies.find(c => c.id === currency) || currencies[3];

  const formatPrice = (priceInINR, isFree) => {
    if (isFree) return 'Free';
    const converted = Math.round(priceInINR * activeCurrency.rate);
    return `${activeCurrency.symbol}${converted.toLocaleString()}`;
  };

  const currentPlans = plansData[billingCycle];

  return (
    <div className="pricing-page-wrapper">
      {/* Hero Header */}
      <section className="pricing-hero-section">
        <div className="pricing-hero-container">
          <span className="pricing-badge">Simple & Transparent Pricing</span>
          <h1 className="pricing-main-heading">Affordable Pricing</h1>
          <p className="pricing-sub-desc">
            Vellko ERP for Teams is a single workspace for your small- to medium-sized company or team.
          </p>

          {/* Controls Bar: Currency & Cycle Toggle */}
          <div className="pricing-controls-bar">
            <div className="currency-selector-wrapper">
              <label htmlFor="currency-select" className="currency-label">Currency:</label>
              <select 
                id="currency-select"
                className="currency-dropdown"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
              >
                {currencies.map((curr) => (
                  <option key={curr.id} value={curr.id}>
                    {curr.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="billing-toggle-container">
              <button 
                type="button"
                className={`billing-tab ${billingCycle === 'monthly' ? 'active' : ''}`}
                onClick={() => setBillingCycle('monthly')}
              >
                Monthly
              </button>
              <button 
                type="button"
                className={`billing-tab ${billingCycle === 'yearly' ? 'active' : ''}`}
                onClick={() => setBillingCycle('yearly')}
              >
                Annually <span className="save-badge">Save up to 20%</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table Section */}
      <section className="pricing-matrix-section">
        <div className="pricing-matrix-container">
          <div className="pricing-table-wrapper">
            <div className="pricing-table-scroll">
              {/* Header Row */}
              <div className="pricing-grid-row header-row">
                <div className="pricing-grid-cell title-cell">
                  <h3>Pick Your Plan</h3>
                  <p>Choose the right plan to accelerate your business growth.</p>
                </div>
                {currentPlans.map((plan, pIdx) => (
                  <div key={pIdx} className={`pricing-grid-cell plan-header-cell ${plan.name === 'Elite' ? 'popular' : ''}`}>
                    {plan.name === 'Elite' && <div className="popular-ribbon">Most Popular</div>}
                    <h4 className="plan-title">{plan.name}</h4>
                    <div className="plan-price-area">
                      <span className="plan-price">{formatPrice(plan.price, plan.isFree)}</span>
                      <span className="plan-period">{plan.period}</span>
                    </div>
                    <button 
                      type="button"
                      className={`plan-cta-btn ${plan.isFree ? 'btn-secondary' : 'btn-primary'}`}
                      onClick={(e) => {
                        e.preventDefault();
                        const contactElem = document.getElementById('contact-form') || document.querySelector('.contact-main-card');
                        if (contactElem) {
                          contactElem.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                    >
                      {plan.isFree ? 'Get Started Free' : 'Start Free Trial'}
                    </button>
                  </div>
                ))}
              </div>

              {/* Row 0: Max Active Employees */}
              <div className="pricing-grid-row">
                <div className="pricing-grid-cell label-cell">Max Active Employees</div>
                {currentPlans.map((plan, pIdx) => (
                  <div key={pIdx} className={`pricing-grid-cell data-cell text-cell ${plan.name === 'Elite' ? 'popular' : ''}`}>
                    {plan.employees}
                  </div>
                ))}
              </div>

              {/* Row 1: File Storage */}
              <div className="pricing-grid-row">
                <div className="pricing-grid-cell label-cell">File Storage</div>
                {currentPlans.map((plan, pIdx) => (
                  <div key={pIdx} className={`pricing-grid-cell data-cell text-cell ${plan.name === 'Elite' ? 'popular' : ''}`}>
                    {plan.storage}
                  </div>
                ))}
              </div>

              {/* Rows 2..42: Feature Boolean List */}
              {featureList.slice(2).map((featureName, fIdx) => (
                <div key={fIdx} className="pricing-grid-row">
                  <div className="pricing-grid-cell label-cell">{featureName}</div>
                  {currentPlans.map((plan, pIdx) => {
                    const isIncluded = plan.features[fIdx];
                    return (
                      <div key={pIdx} className={`pricing-grid-cell data-cell icon-cell ${plan.name === 'Elite' ? 'popular' : ''}`}>
                        {isIncluded ? (
                          <span className="need-icon-check">✓</span>
                        ) : (
                          <span className="need-icon-cross">✕</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Contact Form */}
      <ContactFormSection />
    </div>
  );
}
