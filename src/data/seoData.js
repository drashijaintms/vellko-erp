/**
 * ==============================================================================
 * SIMPLIFIED CENTRALIZED SEO & SCHEMA DATA
 * ==============================================================================
 * 
 * 📍 FILE: src/data/seoData.js
 * 
 * 💡 SUPER SIMPLE FORMAT:
 * You only need to define:
 *   1. title        -> Automatically used for <title>, og:title, and twitter:title
 *   2. description  -> Automatically used for meta description, og:description, and twitter:description
 *   3. keywords     -> (Optional) Meta keywords
 *   4. image        -> (Optional) Image for OG / Twitter share preview (defaults to logo)
 *   5. schema       -> Paste your JSON-LD Schema object or raw JSON script here as it is!
 * 
 * 🔗 Canonical URL, Hreflangs, OG URL, Twitter Cards, Theme Color, Favicons, etc.
 * are all handled and applied automatically based on the URL!
 * ==============================================================================
 */

export const BASE_URL = 'https://vellkoerp.com';
export const DEFAULT_IMAGE = `${BASE_URL}/assets/logo.png`;

// Default Fallback SEO
export const defaultSeo = {
  title: 'Best ERP Software in India | Vellko ERP Cloud',
  description: 'Vellko ERP software in India for sales, finance, HR, inventory & operations. GST-compliant, AI-powered automation, and real-time dashboards. Book a free demo.',
  keywords: 'ERP software, cloud ERP, CRM software, HRMS payroll, inventory management, business management software, Vellko ERP',
  image: DEFAULT_IMAGE,
  schema: {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Vellko ERP",
    "url": BASE_URL,
    "logo": `${BASE_URL}/favicon.png`,
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-7880107201",
      "contactType": "customer service",
      "email": "support@vellkoerp.com"
    }
  }
};

/**
 * All Route Configurations
 * To update any page, just edit its title, description, keywords, and paste the schema!
 */
export const seoRoutes = {
  // 1. Home
  '/': {
    title: 'Best ERP Software in India | Vellko ERP Cloud',
    description: 'Vellko ERP software in India for sales, finance, HR, inventory & operations. GST-compliant, AI-powered automation, and real-time dashboards. Book a free demo.',
    keywords: 'cloud ERP, business ERP, ERP system India, small business ERP, CRM and HRMS, inventory software, automated payroll ERP',
    schema: {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://vellkoerp.com/#organization",
      "name": "Vellko ERP",
      "url": "https://vellkoerp.com/",
      "logo": {
        "@type": "ImageObject",
        "url": "https://vellkoerp.com/assets/logo-bAy9mXr5.png"
      },
      "telephone": "+91-7880107201",
      "email": "support@vellkoerp.com",
      "founder": {
        "@type": "Person",
        "name": "Deepak Verma"
      },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Phoenix Corporate Park, Survey No. 359/2 & 359/3, Back Part 2nd Floor, Narmadapuram Road",
        "addressLocality": "Bhopal",
        "addressRegion": "Madhya Pradesh",
        "postalCode": "462026",
        "addressCountry": "IN"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer support",
        "telephone": "+91-7880107201",
        "email": "support@vellkoerp.com",
        "areaServed": "IN",
        "availableLanguage": [
          "English",
          "Hindi"
        ]
      }
    },
    {
      "@type": "ContactPage",
      "@id": "https://vellkoerp.com/contact-us/#contactpage",
      "url": "https://vellkoerp.com/contact-us/",
      "name": "Contact Vellko ERP",
      "description": "Contact Vellko ERP for product information, ERP software demos, implementation support and business enquiries.",
      "isPartOf": {
        "@id": "https://vellkoerp.com/#website"
      },
      "about": {
        "@id": "https://vellkoerp.com/#organization"
      },
      "mainEntity": {
        "@id": "https://vellkoerp.com/#organization"
      },
      "inLanguage": "en-IN"
    }
  ]
}
  },

  // 2. CRM & Lead Management
  '/crm-lead-management': {
    title: 'Cloud Based CRM Software & Lead Management Software',
    description: 'Manage leads, pipelines, follow-ups & quotes in one Cloud Based CRM Software. Automated tracking, live sales dashboards & reports. Book a free demo today.',
    keywords: 'Cloud Based CRM Software, CRM software, lead management software, sales pipeline tracking, customer database, quotation management, sales automation',
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": "https://vellkoerp.com/#organization",
          "name": "Vellko ERP",
          "url": "https://vellkoerp.com/",
          "logo": {
            "@type": "ImageObject",
            "url": "https://vellkoerp.com/assets/logo-bAy9mXr5.png"
          },
          "telephone": "+91-7880107201",
          "email": "support@vellkoerp.com",
          "founder": {
            "@type": "Person",
            "name": "Deepak Verma"
          },
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Phoenix Corporate Park, Survey No. 359/2 & 359/3, Back Part 2nd Floor, Narmadapuram Road",
            "addressLocality": "Bhopal",
            "addressRegion": "Madhya Pradesh",
            "postalCode": "462026",
            "addressCountry": "IN"
          },
          "areaServed": {
            "@type": "Country",
            "name": "India"
          }
        },
        {
          "@type": "WebSite",
          "@id": "https://vellkoerp.com/#website",
          "url": "https://vellkoerp.com/",
          "name": "Vellko ERP",
          "publisher": {
            "@id": "https://vellkoerp.com/#organization"
          },
          "inLanguage": "en-IN"
        },
        {
          "@type": "WebPage",
          "@id": "https://vellkoerp.com/crm-lead-management#webpage",
          "url": "https://vellkoerp.com/crm-lead-management",
          "name": "Cloud Based CRM Software & Lead Management Software",
          "description": "Vellko ERP is a cloud based CRM Software and lead management software that integrates lead capture, pipelines for sales monitoring of customers, follow-ups as well as reporting in one platform. It helps sales teams handle each opportunity with total assurance and control.",
          "isPartOf": {
            "@id": "https://vellkoerp.com/#website"
          },
          "about": {
            "@id": "https://vellkoerp.com/crm-lead-management#service"
          },
          "breadcrumb": {
            "@id": "https://vellkoerp.com/crm-lead-management#breadcrumb"
          },
          "inLanguage": "en-IN"
        },
        {
          "@type": "Service",
          "@id": "https://vellkoerp.com/crm-lead-management#service",
          "name": "CRM & Lead Management Software",
          "serviceType": "CRM and Lead Management Software",
          "url": "https://vellkoerp.com/crm-lead-management",
          "description": "Vellko ERP is a cloud based CRM Software and lead management software that integrates lead capture, pipelines for sales monitoring of customers, follow-ups as well as reporting in one platform. It helps sales teams handle each opportunity with total assurance and control.",
          "provider": {
            "@id": "https://vellkoerp.com/#organization"
          },
          "areaServed": {
            "@type": "Country",
            "name": "India"
          },
          "audience": {
            "@type": "BusinessAudience",
            "audienceType": "Businesses and organizations"
          },
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Vellko CRM Features",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Lead Management"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Sales Pipeline Management"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Follow-up Management"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Quotation Management"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Sales Reporting and Analytics"
                }
              }
            ]
          }
        },
        {
          "@type": "SoftwareApplication",
          "@id": "https://vellkoerp.com/crm-lead-management#software",
          "name": "Vellko CRM",
          "applicationCategory": "BusinessApplication",
          "applicationSubCategory": "CRM Software",
          "operatingSystem": "Web-based",
          "url": "https://vellkoerp.com/crm-lead-management",
          "description": "Vellko CRM helps businesses manage leads, sales pipelines, follow-ups, quotations, customer relationships and sales performance through a cloud-based CRM platform.",
          "publisher": {
            "@id": "https://vellkoerp.com/#organization"
          },
          "featureList": [
            "Lead Management",
            "Sales Pipeline Management",
            "Lead Follow-up Tracking",
            "Quotation Management",
            "Customer Management",
            "Sales Team Management",
            "Sales Dashboards",
            "Sales Reports and Analytics"
          ]
        },
        {
          "@type": "BreadcrumbList",
          "@id": "https://vellkoerp.com/crm-lead-management#breadcrumb",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://vellkoerp.com/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "CRM & Lead Management",
              "item": "https://vellkoerp.com/crm-lead-management"
            }
          ]
        }
      ]
    }
  },

  // 3. HRMS & Payroll
  '/hrms-payroll': {
    title: 'Cloud based HR systems | Payroll management system',
    description: 'Cloud based HR systems that manage attendance, HR & payroll, leave, recruitment & performance in one HRMS. Automated workflows, live dashboards & compliance tracking. Free demo.',
    keywords: 'Cloud based HR systems, Payroll management system, HRMS software, payroll software, employee attendance, leave management, HR compliance',
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": "https://vellkoerp.com/#organization",
          "name": "Vellko ERP",
          "url": "https://vellkoerp.com/",
          "logo": {
            "@type": "ImageObject",
            "url": "https://vellkoerp.com/assets/logo-bAy9mXr5.png"
          },
          "telephone": "+91-7880107201",
          "email": "support@vellkoerp.com",
          "founder": {
            "@type": "Person",
            "name": "Deepak Verma"
          },
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Phoenix Corporate Park, Survey No. 359/2 & 359/3, Back Part 2nd Floor, Narmadapuram Road",
            "addressLocality": "Bhopal",
            "addressRegion": "Madhya Pradesh",
            "postalCode": "462026",
            "addressCountry": "IN"
          },
          "areaServed": {
            "@type": "Country",
            "name": "India"
          }
        },
        {
          "@type": "WebSite",
          "@id": "https://vellkoerp.com/#website",
          "url": "https://vellkoerp.com/",
          "name": "Vellko ERP",
          "publisher": {
            "@id": "https://vellkoerp.com/#organization"
          },
          "inLanguage": "en-IN"
        },
        {
          "@type": "WebPage",
          "@id": "https://vellkoerp.com/hrms-payroll#webpage",
          "url": "https://vellkoerp.com/hrms-payroll",
          "name": "Cloud based HR systems | Payroll management system",
          "description": "Manage attendance, cloud HR and payroll, leave, recruitment and performance in one HRMS. Automate workflows, track compliance and view live dashboards.",
          "isPartOf": {
            "@id": "https://vellkoerp.com/#website"
          },
          "about": {
            "@id": "https://vellkoerp.com/hrms-payroll#service"
          },
          "breadcrumb": {
            "@id": "https://vellkoerp.com/hrms-payroll#breadcrumb"
          },
          "inLanguage": "en-IN"
        },
        {
          "@type": "Service",
          "@id": "https://vellkoerp.com/hrms-payroll#service",
          "name": "HRMS & Payroll Software",
          "serviceType": "HRMS and Payroll Software",
          "url": "https://vellkoerp.com/hrms-payroll",
          "description": "Vellko HRMS is a cloud-based human resource management and payroll solution that helps businesses manage employee attendance, leave, recruitment, performance, payroll and HR workflows from one platform.",
          "provider": {
            "@id": "https://vellkoerp.com/#organization"
          },
          "areaServed": {
            "@type": "Country",
            "name": "India"
          },
          "audience": {
            "@type": "BusinessAudience",
            "audienceType": "Businesses and organizations"
          },
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Vellko HRMS Features",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Employee Attendance Management"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Payroll Management"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Leave Management"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Recruitment Management"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Employee Performance Management"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "HR Compliance Tracking"
                }
              }
            ]
          }
        },
        {
          "@type": "SoftwareApplication",
          "@id": "https://vellkoerp.com/hrms-payroll#software",
          "name": "Vellko HRMS",
          "applicationCategory": "BusinessApplication",
          "applicationSubCategory": "Human Resource Management Software",
          "operatingSystem": "Web-based",
          "url": "https://vellkoerp.com/hrms-payroll",
          "description": "Vellko HRMS is a cloud-based HR software solution for managing employee attendance, payroll, leave, recruitment, performance and HR operations.",
          "publisher": {
            "@id": "https://vellkoerp.com/#organization"
          },
          "featureList": [
            "Employee Attendance Management",
            "Biometric Attendance Integration",
            "Payroll Management",
            "Leave Management",
            "Recruitment Management",
            "Employee Performance Management",
            "HR Workflow Automation",
            "HR Compliance Tracking",
            "Employee Management",
            "HR Dashboards and Reports"
          ]
        },
        {
          "@type": "BreadcrumbList",
          "@id": "https://vellkoerp.com/hrms-payroll#breadcrumb",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://vellkoerp.com/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "HRMS & Payroll",
              "item": "https://vellkoerp.com/hrms-payroll"
            }
          ]
        }
      ]
    }
  },

  // 4. Finance & Accounting
  '/finance-accounting': {
    title: 'Cloud based Accounting software | Financial Management Vellko ERP',
    description: 'Manage cloud based accounting, GST, cash flow, budgeting, and financial reports with Vellko ERP Accounting Software. Get real-time financial visibility and automate finance workflows.',
    keywords: 'Cloud based Accounting software, Financial Management, Vellko ERP, GST billing, cash flow management, budgeting, financial reporting, general ledger',
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": "https://vellkoerp.com/#organization",
          "name": "Vellko ERP",
          "url": "https://vellkoerp.com/",
          "logo": {
            "@type": "ImageObject",
            "url": "https://vellkoerp.com/assets/logo-bAy9mXr5.png"
          },
          "telephone": "+91-7880107201",
          "email": "support@vellkoerp.com",
          "founder": {
            "@type": "Person",
            "name": "Deepak Verma"
          },
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Phoenix Corporate Park, Survey No. 359/2 & 359/3, Back Part 2nd Floor, Narmadapuram Road",
            "addressLocality": "Bhopal",
            "addressRegion": "Madhya Pradesh",
            "postalCode": "462026",
            "addressCountry": "IN"
          },
          "areaServed": {
            "@type": "Country",
            "name": "India"
          }
        },
        {
          "@type": "WebSite",
          "@id": "https://vellkoerp.com/#website",
          "url": "https://vellkoerp.com/",
          "name": "Vellko ERP",
          "publisher": {
            "@id": "https://vellkoerp.com/#organization"
          },
          "inLanguage": "en-IN"
        },
        {
          "@type": "WebPage",
          "@id": "https://vellkoerp.com/finance-accounting#webpage",
          "url": "https://vellkoerp.com/finance-accounting",
          "name": "Cloud based Accounting software | Financial Management Vellko ERPP",
          "description": "Manage cloud based accounting, GST, cash flow, budgeting, and financial reports with Vellko ERP Accounting Software. Get real-time financial visibility and automate finance workflows..",
          "isPartOf": {
            "@id": "https://vellkoerp.com/#website"
          },
          "about": {
            "@id": "https://vellkoerp.com/finance-accounting#service"
          },
          "breadcrumb": {
            "@id": "https://vellkoerp.com/finance-accounting#breadcrumb"
          },
          "primaryImageOfPage": {
            "@type": "ImageObject",
            "url": "https://vellkoerp.com/assets/how-it-works-3cD6AAXl.png"
          },
          "inLanguage": "en-IN"
        },
        {
          "@type": "Service",
          "@id": "https://vellkoerp.com/finance-accounting#service",
          "name": "Cloud based Accounting software | Financial Management Vellko ERP",
          "serviceType": "ERP Finance and Accounting Software",
          "url": "https://vellkoerp.com/finance-accounting",
          "description": "Manage cloud based accounting, GST, cash flow, budgeting, and financial reports with Vellko ERP Accounting Software. Get real-time financial visibility and automate finance workflows..",
          "provider": {
            "@id": "https://vellkoerp.com/#organization"
          },
          "areaServed": {
            "@type": "Country",
            "name": "India"
          },
          "audience": {
            "@type": "BusinessAudience",
            "audienceType": "Businesses and organizations"
          },
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Vellko ERP Finance & Accounting Features",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "General Ledger and Chart of Accounts"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Accounts Payable Management"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Cash Flow Management"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "GST Billing and E-Invoicing"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Budgeting and Financial Planning"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Financial Reporting and Analytics"
                }
              }
            ]
          }
        },
        {
          "@type": "SoftwareApplication",
          "@id": "https://vellkoerp.com/finance-accounting#software",
          "name": "Vellko ERP Accounting Software",
          "applicationCategory": "BusinessApplication",
          "applicationSubCategory": "Accounting and Financial Management Software",
          "operatingSystem": "Web-based",
          "url": "https://vellkoerp.com/finance-accounting",
          "description": "Vellko ERP Accounting Software provides integrated financial management for accounting, GST, cash flow, budgeting, accounts payable, invoicing and financial reporting.",
          "image": "https://vellkoerp.com/assets/how-it-works-3cD6AAXl.png",
          "publisher": {
            "@id": "https://vellkoerp.com/#organization"
          },
          "featureList": [
            "General Ledger",
            "Chart of Accounts",
            "Accounts Payable",
            "Cash Flow Management",
            "GST Billing",
            "E-Invoicing",
            "Budget Management",
            "Budget vs Actual Reporting",
            "Financial Reports",
            "Real-Time Financial Dashboards"
          ]
        },
        {
          "@type": "BreadcrumbList",
          "@id": "https://vellkoerp.com/finance-accounting#breadcrumb",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://vellkoerp.com/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Finance & Accounting",
              "item": "https://vellkoerp.com/finance-accounting"
            }
          ]
        }
      ]
    }
  },

  // 5. Inventory Management
  '/inventory-management': {
    title: 'Cloud Based Inventory Management Software | Vellko ERP',
    description: 'Cloud Based Inventory Management Software which Track stock across warehouses in real time. Barcode scanning, batch tracking, purchase integration & live analytics. Book a free demo.',
    keywords: 'Cloud Based Inventory Management Software, inventory management software, warehouse management, stock tracking, barcode scanning, batch tracking, purchase integration',
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": "https://vellkoerp.com/#organization",
          "name": "Vellko ERP",
          "url": "https://vellkoerp.com/",
          "logo": {
            "@type": "ImageObject",
            "url": "https://vellkoerp.com/assets/logo-bAy9mXr5.png"
          },
          "telephone": "+91-7880107201",
          "email": "support@vellkoerp.com",
          "founder": {
            "@type": "Person",
            "name": "Deepak Verma"
          },
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Phoenix Corporate Park, Survey No. 359/2 & 359/3, Back Part 2nd Floor, Narmadapuram Road",
            "addressLocality": "Bhopal",
            "addressRegion": "Madhya Pradesh",
            "postalCode": "462026",
            "addressCountry": "IN"
          },
          "areaServed": {
            "@type": "Country",
            "name": "India"
          }
        },
        {
          "@type": "WebSite",
          "@id": "https://vellkoerp.com/#website",
          "url": "https://vellkoerp.com/",
          "name": "Vellko ERP",
          "publisher": {
            "@id": "https://vellkoerp.com/#organization"
          },
          "inLanguage": "en-IN"
        },
        {
          "@type": "WebPage",
          "@id": "https://vellkoerp.com/inventory-management#webpage",
          "url": "https://vellkoerp.com/inventory-management",
          "name": "Cloud Based Inventory Management Software | Vellko ERP",
          "description": "Cloud Based Inventory Management Software to track stock across warehouses in real time. Barcode scanning, batch tracking, purchase integration and live analytics.",
          "isPartOf": {
            "@id": "https://vellkoerp.com/#website"
          },
          "about": {
            "@id": "https://vellkoerp.com/inventory-management#service"
          },
          "breadcrumb": {
            "@id": "https://vellkoerp.com/inventory-management#breadcrumb"
          },
          "primaryImageOfPage": {
            "@type": "ImageObject",
            "url": "https://vellkoerp.com/assets/how-it-works-3cD6AAXl.png"
          },
          "inLanguage": "en-IN"
        },
        {
          "@type": "Service",
          "@id": "https://vellkoerp.com/inventory-management#service",
          "name": "Inventory Management Software",
          "serviceType": "Cloud-Based Inventory Management Software",
          "url": "https://vellkoerp.com/inventory-management",
          "description": "Vellko ERP Inventory Management Software helps businesses track inventory across warehouses in real time, manage stock, scan barcodes, track batches, integrate purchases and monitor inventory performance through live analytics.",
          "provider": {
            "@id": "https://vellkoerp.com/#organization"
          },
          "areaServed": {
            "@type": "Country",
            "name": "India"
          },
          "audience": {
            "@type": "BusinessAudience",
            "audienceType": "Businesses and organizations"
          },
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Vellko ERP Inventory Management Features",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Real-Time Stock Tracking"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Multi-Warehouse Inventory Management"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Barcode Scanning"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Batch Tracking"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Purchase Integration"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Inventory Analytics and Reporting"
                }
              }
            ]
          }
        },
        {
          "@type": "SoftwareApplication",
          "@id": "https://vellkoerp.com/inventory-management#software",
          "name": "Vellko ERP Inventory Management Software",
          "applicationCategory": "BusinessApplication",
          "applicationSubCategory": "Inventory Management Software",
          "operatingSystem": "Web-based",
          "url": "https://vellkoerp.com/inventory-management",
          "description": "Vellko ERP is a cloud-based inventory management solution for real-time stock tracking, warehouse management, barcode scanning, batch tracking, purchase integration and inventory analytics.",
          "image": "https://vellkoerp.com/assets/how-it-works-3cD6AAXl.png",
          "publisher": {
            "@id": "https://vellkoerp.com/#organization"
          },
          "featureList": [
            "Real-Time Inventory Tracking",
            "Multi-Warehouse Management",
            "Stock Management",
            "Barcode Scanning",
            "Batch Tracking",
            "Purchase Integration",
            "Stock Transfers",
            "Inventory Analytics",
            "Inventory Reports",
            "Live Inventory Dashboards"
          ]
        },
        {
          "@type": "BreadcrumbList",
          "@id": "https://vellkoerp.com/inventory-management#breadcrumb",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://vellkoerp.com/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Inventory Management",
              "item": "https://vellkoerp.com/inventory-management"
            }
          ]
        }
      ]
    }
  },

  // 6. Project Management
  '/project-management': {
    title: 'Cloud based project management software | Vellko ERP',
    description: 'Cloud based project management software allows you to plan, track & collaborate on projects in one platform. Task management, resource planning, time tracking & budgets. Book a free demo.',
    keywords: 'project management software, task tracker, team collaboration tool, deadline management, resource allocation ERP',
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": "https://vellkoerp.com/#organization",
          "name": "Vellko ERP",
          "url": "https://vellkoerp.com/",
          "logo": {
            "@type": "ImageObject",
            "url": "https://vellkoerp.com/assets/logo-bAy9mXr5.png"
          },
          "telephone": "+91-7880107201",
          "email": "support@vellkoerp.com",
          "founder": {
            "@type": "Person",
            "name": "Deepak Verma"
          },
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Phoenix Corporate Park, Survey No. 359/2 & 359/3, Back Part 2nd Floor, Narmadapuram Road",
            "addressLocality": "Bhopal",
            "addressRegion": "Madhya Pradesh",
            "postalCode": "462026",
            "addressCountry": "IN"
          },
          "areaServed": {
            "@type": "Country",
            "name": "India"
          }
        },
        {
          "@type": "WebSite",
          "@id": "https://vellkoerp.com/#website",
          "url": "https://vellkoerp.com/",
          "name": "Vellko ERP",
          "publisher": {
            "@id": "https://vellkoerp.com/#organization"
          },
          "inLanguage": "en-IN"
        },
        {
          "@type": "WebPage",
          "@id": "https://vellkoerp.com/project-management#webpage",
          "url": "https://vellkoerp.com/project-management",
          "name": "Cloud Based Project Management Software | Vellko ERP",
          "description": "Cloud based project management software allows you to plan, track, and collaborate on projects on one platform. Manage tasks, resources, time, and budgets.",
          "isPartOf": {
            "@id": "https://vellkoerp.com/#website"
          },
          "about": {
            "@id": "https://vellkoerp.com/project-management#service"
          },
          "breadcrumb": {
            "@id": "https://vellkoerp.com/project-management#breadcrumb"
          },
          "primaryImageOfPage": {
            "@type": "ImageObject",
            "url": "https://vellkoerp.com/assets/how-it-works-3cD6AAXl.png"
          },
          "inLanguage": "en-IN"
        },
        {
          "@type": "Service",
          "@id": "https://vellkoerp.com/project-management#service",
          "name": "Project Management Software",
          "serviceType": "Project Management Software",
          "url": "https://vellkoerp.com/project-management",
          "description": "Vellko ERP Project Management Software helps businesses plan, manage and track projects with task management, resource planning, time tracking, collaboration and budget management.",
          "provider": {
            "@id": "https://vellkoerp.com/#organization"
          },
          "areaServed": {
            "@type": "Country",
            "name": "India"
          },
          "audience": {
            "@type": "BusinessAudience",
            "audienceType": "Businesses and organizations"
          },
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Vellko ERP Project Management Features",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Project Planning"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Task Management"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Resource Planning"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Time Tracking"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Project Collaboration"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Project Budget Management"
                }
              }
            ]
          }
        },
        {
          "@type": "SoftwareApplication",
          "@id": "https://vellkoerp.com/project-management#software",
          "name": "Vellko ERP Project Management Software",
          "applicationCategory": "BusinessApplication",
          "applicationSubCategory": "Project Management Software",
          "operatingSystem": "Web-based",
          "url": "https://vellkoerp.com/project-management",
          "description": "Vellko ERP is a cloud-based project management solution for planning projects, managing tasks, allocating resources, tracking time, collaborating with teams and monitoring project budgets.",
          "image": "https://vellkoerp.com/assets/how-it-works-3cD6AAXl.png",
          "publisher": {
            "@id": "https://vellkoerp.com/#organization"
          },
          "featureList": [
            "Project Planning",
            "Task Management",
            "Resource Planning",
            "Team Collaboration",
            "Time Tracking",
            "Project Budget Management",
            "Project Progress Tracking",
            "Project Reporting",
            "Workflow Management"
          ]
        },
        {
          "@type": "BreadcrumbList",
          "@id": "https://vellkoerp.com/project-management#breadcrumb",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://vellkoerp.com/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Project Management",
              "item": "https://vellkoerp.com/project-management"
            }
          ]
        }
      ]
    }
  },

  // 7. Service Management
  '/service-management': {
    title: 'Cloud based Service Management Software | Vellko ERP',
    description: 'Cloud based Service Management Software for requests, work orders, field teams & maintenance in one platform. Real-time tracking & automated scheduling. Book a free demo.',
    keywords: 'customer service software, helpdesk ticketing, SLA tracking system, service request management, support analytics',
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": "https://vellkoerp.com/#organization",
          "name": "Vellko ERP",
          "url": "https://vellkoerp.com/",
          "logo": {
            "@type": "ImageObject",
            "url": "https://vellkoerp.com/assets/logo-bAy9mXr5.png"
          },
          "telephone": "+91-7880107201",
          "email": "support@vellkoerp.com",
          "founder": {
            "@type": "Person",
            "name": "Deepak Verma"
          },
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Phoenix Corporate Park, Survey No. 359/2 & 359/3, Back Part 2nd Floor, Narmadapuram Road",
            "addressLocality": "Bhopal",
            "addressRegion": "Madhya Pradesh",
            "postalCode": "462026",
            "addressCountry": "IN"
          },
          "areaServed": {
            "@type": "Country",
            "name": "India"
          }
        },
        {
          "@type": "WebSite",
          "@id": "https://vellkoerp.com/#website",
          "url": "https://vellkoerp.com/",
          "name": "Vellko ERP",
          "publisher": {
            "@id": "https://vellkoerp.com/#organization"
          },
          "inLanguage": "en-IN"
        },
        {
          "@type": "WebPage",
          "@id": "https://vellkoerp.com/service-management#webpage",
          "url": "https://vellkoerp.com/service-management",
          "name": "Cloud Based Service Management Software | Vellko ERP",
          "description": "Cloud based Service Management Software for requests, work orders, field teams and maintenance in one platform. Real-time tracking and automated scheduling. Book a free demo.",
          "isPartOf": {
            "@id": "https://vellkoerp.com/#website"
          },
          "about": {
            "@id": "https://vellkoerp.com/service-management#service"
          },
          "breadcrumb": {
            "@id": "https://vellkoerp.com/service-management#breadcrumb"
          },
          "primaryImageOfPage": {
            "@type": "ImageObject",
            "url": "https://vellkoerp.com/assets/how-it-works-3cD6AAXl.png"
          },
          "inLanguage": "en-IN"
        },
        {
          "@type": "Service",
          "@id": "https://vellkoerp.com/service-management#service",
          "name": "Service Management Software",
          "serviceType": "Service Management Software",
          "url": "https://vellkoerp.com/service-management",
          "description": "Vellko ERP Service Management Software helps businesses manage service requests, work orders, field teams, maintenance activities, scheduling and service operations from one cloud-based platform.",
          "provider": {
            "@id": "https://vellkoerp.com/#organization"
          },
          "areaServed": {
            "@type": "Country",
            "name": "India"
          },
          "audience": {
            "@type": "BusinessAudience",
            "audienceType": "Businesses and organizations"
          },
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Vellko Service Management Features",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Service Request Management"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Work Order Management"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Field Team Management"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Maintenance Management"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Automated Service Scheduling"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Real-Time Service Tracking"
                }
              }
            ]
          }
        },
        {
          "@type": "SoftwareApplication",
          "@id": "https://vellkoerp.com/service-management#software",
          "name": "Vellko Service Management Software",
          "applicationCategory": "BusinessApplication",
          "applicationSubCategory": "Service Management Software",
          "operatingSystem": "Web-based",
          "url": "https://vellkoerp.com/service-management",
          "description": "Vellko Service Management Software is a cloud-based solution for managing service requests, work orders, field teams, maintenance, scheduling and service tracking.",
          "image": "https://vellkoerp.com/assets/how-it-works-3cD6AAXl.png",
          "publisher": {
            "@id": "https://vellkoerp.com/#organization"
          },
          "featureList": [
            "Service Request Management",
            "Work Order Management",
            "Field Team Management",
            "Maintenance Management",
            "Automated Scheduling",
            "Real-Time Service Tracking",
            "Service Status Management",
            "Service Reporting and Analytics"
          ]
        },
        {
          "@type": "BreadcrumbList",
          "@id": "https://vellkoerp.com/service-management#breadcrumb",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://vellkoerp.com/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Service Management",
              "item": "https://vellkoerp.com/service-management"
            }
          ]
        }
      ]
    }
  },

  // 8. Biometric Attendance
  '/biometric-attendance-management': {
    title: 'Cloud based Biometric Attendance Management System',
    description: 'Track attendance with Cloud based biometric attendance management system, face recognition & mobile check-ins, shift rosters & payroll sync. Book a free demo.',
    keywords: 'biometric attendance integration, facial recognition attendance, punch machine sync, real-time attendance ERP, shift tracking, biometric attendance management',
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": "https://vellkoerp.com/#organization",
          "name": "Vellko ERP",
          "url": "https://vellkoerp.com/",
          "logo": {
            "@type": "ImageObject",
            "url": "https://vellkoerp.com/assets/logo-bAy9mXr5.png"
          },
          "telephone": "+91-7880107201",
          "email": "support@vellkoerp.com",
          "founder": {
            "@type": "Person",
            "name": "Deepak Verma"
          },
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Phoenix Corporate Park, Survey No. 359/2 & 359/3, Back Part 2nd Floor, Narmadapuram Road",
            "addressLocality": "Bhopal",
            "addressRegion": "Madhya Pradesh",
            "postalCode": "462026",
            "addressCountry": "IN"
          },
          "areaServed": {
            "@type": "Country",
            "name": "India"
          }
        },
        {
          "@type": "WebSite",
          "@id": "https://vellkoerp.com/#website",
          "url": "https://vellkoerp.com/",
          "name": "Vellko ERP",
          "publisher": {
            "@id": "https://vellkoerp.com/#organization"
          },
          "inLanguage": "en-IN"
        },
        {
          "@type": "WebPage",
          "@id": "https://vellkoerp.com/biometric-attendance-management#webpage",
          "url": "https://vellkoerp.com/biometric-attendance-management",
          "name": "Cloud Based Biometric Attendance Management System",
          "description": "Track attendance with a cloud based biometric attendance management system, face recognition and mobile check-ins, shift rosters and payroll sync. Book a free demo.",
          "isPartOf": {
            "@id": "https://vellkoerp.com/#website"
          },
          "about": {
            "@id": "https://vellkoerp.com/biometric-attendance-management#service"
          },
          "breadcrumb": {
            "@id": "https://vellkoerp.com/biometric-attendance-management#breadcrumb"
          },
          "primaryImageOfPage": {
            "@type": "ImageObject",
            "url": "https://vellkoerp.com/assets/how-it-works-CWxy5_XR.png"
          },
          "inLanguage": "en-IN"
        },
        {
          "@type": "Service",
          "@id": "https://vellkoerp.com/biometric-attendance-management#service",
          "name": "Cloud Based Biometric Attendance Management System",
          "serviceType": "Biometric Attendance Management Software",
          "url": "https://vellkoerp.com/biometric-attendance-management",
          "description": "Vellko ERP provides a cloud based biometric attendance management system with biometric and face recognition attendance, mobile check-ins, shift rosters and payroll synchronization.",
          "provider": {
            "@id": "https://vellkoerp.com/#organization"
          },
          "areaServed": {
            "@type": "Country",
            "name": "India"
          },
          "audience": {
            "@type": "BusinessAudience",
            "audienceType": "Businesses and organizations"
          },
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Biometric Attendance Management Features",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Biometric Attendance Tracking"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Face Recognition Attendance"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Mobile Attendance Check-ins"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Shift Roster Management"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Payroll Synchronization"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Real-Time Attendance Reports"
                }
              }
            ]
          }
        },
        {
          "@type": "SoftwareApplication",
          "@id": "https://vellkoerp.com/biometric-attendance-management#software",
          "name": "Vellko Biometric Attendance Management System",
          "applicationCategory": "BusinessApplication",
          "applicationSubCategory": "Attendance Management Software",
          "operatingSystem": "Web-based",
          "url": "https://vellkoerp.com/biometric-attendance-management",
          "description": "Vellko biometric attendance management software helps businesses track employee attendance through biometric devices, face recognition and mobile check-ins, while managing shifts and payroll synchronization.",
          "image": "https://vellkoerp.com/assets/how-it-works-CWxy5_XR.png",
          "publisher": {
            "@id": "https://vellkoerp.com/#organization"
          },
          "featureList": [
            "Biometric Attendance Tracking",
            "Face Recognition Attendance",
            "Mobile Attendance Check-ins",
            "Cloud-Based Attendance Management",
            "Shift Roster Management",
            "Payroll Synchronization",
            "Employee Attendance Reports",
            "Real-Time Attendance Monitoring"
          ]
        },
        {
          "@type": "BreadcrumbList",
          "@id": "https://vellkoerp.com/biometric-attendance-management#breadcrumb",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://vellkoerp.com/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Biometric Attendance Management",
              "item": "https://vellkoerp.com/biometric-attendance-management"
            }
          ]
        }
      ]
    }
  },
  // 9. Manufacturing ERP
  '/manufacturing-erp': {
    title: 'Cloud based Manufacturing ERP Software | Vellko ERP',
    description: 'Cloud based Manufacturing ERP software connects production, inventory, procurement, warehouse, quality, finance, and supply chain management on one platform.',
    keywords: 'Cloud based Manufacturing ERP Software, manufacturing ERP software, production planning, inventory management, procurement, warehouse management, quality control, supply chain management, finance management',
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": "https://vellkoerp.com/#organization",
          "name": "Vellko ERP",
          "url": "https://vellkoerp.com/",
          "logo": {
            "@type": "ImageObject",
            "url": "https://vellkoerp.com/assets/logo-bAy9mXr5.png"
          },
          "telephone": "+91-7880107201",
          "email": "support@vellkoerp.com",
          "founder": {
            "@type": "Person",
            "name": "Deepak Verma"
          },
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Phoenix Corporate Park, Survey No. 359/2 & 359/3, Back Part 2nd Floor, Narmadapuram Road",
            "addressLocality": "Bhopal",
            "addressRegion": "Madhya Pradesh",
            "postalCode": "462026",
            "addressCountry": "IN"
          },
          "areaServed": {
            "@type": "Country",
            "name": "India"
          }
        },
        {
          "@type": "WebSite",
          "@id": "https://vellkoerp.com/#website",
          "url": "https://vellkoerp.com/",
          "name": "Vellko ERP",
          "publisher": {
            "@id": "https://vellkoerp.com/#organization"
          },
          "inLanguage": "en-IN"
        },
        {
          "@type": "WebPage",
          "@id": "https://vellkoerp.com/manufacturing-erp#webpage",
          "url": "https://vellkoerp.com/manufacturing-erp",
          "name": "Cloud Based Manufacturing ERP Software | Vellko ERP",
          "description": "Cloud based Manufacturing ERP software connects production, inventory, procurement, warehouse, quality, finance, and supply chain management on one platform.",
          "isPartOf": {
            "@id": "https://vellkoerp.com/#website"
          },
          "about": {
            "@id": "https://vellkoerp.com/manufacturing-erp#software"
          },
          "breadcrumb": {
            "@id": "https://vellkoerp.com/manufacturing-erp#breadcrumb"
          },
          "mainEntity": {
            "@id": "https://vellkoerp.com/manufacturing-erp#software"
          },
          "inLanguage": "en-IN"
        },
        {
          "@type": "SoftwareApplication",
          "@id": "https://vellkoerp.com/manufacturing-erp#software",
          "name": "Vellko Manufacturing ERP",
          "applicationCategory": "BusinessApplication",
          "applicationSubCategory": "Manufacturing ERP Software",
          "operatingSystem": "Web-based",
          "url": "https://vellkoerp.com/manufacturing-erp",
          "description": "Vellko Manufacturing ERP is a cloud based ERP solution that helps businesses manage production, inventory, procurement, warehouse operations, quality control, finance, and supply chain processes.",
          "publisher": {
            "@id": "https://vellkoerp.com/#organization"
          },
          "featureList": [
            "Production Management",
            "Production Planning",
            "Inventory Management",
            "Procurement Management",
            "Warehouse Management",
            "Quality Management",
            "Supply Chain Management",
            "Finance Management",
            "Sales and Order Management",
            "Business Reporting and Analytics"
          ]
        },
        {
          "@type": "BreadcrumbList",
          "@id": "https://vellkoerp.com/manufacturing-erp#breadcrumb",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://vellkoerp.com/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Manufacturing ERP",
              "item": "https://vellkoerp.com/manufacturing-erp"
            }
          ]
        },
        {
          "@type": "FAQPage",
          "@id": "https://vellkoerp.com/manufacturing-erp#faq",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Is Vellko Manufacturing ERP suitable for small and medium manufacturers?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. The platform was built to be scalable from small manufacturing units to multi-location companies."
              }
            },
            {
              "@type": "Question",
              "name": "Can it manage multiple factories or production plants?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. Vellko Manufacturing ERP can handle multi-factory operations, with centralized monitoring and control."
              }
            },
            {
              "@type": "Question",
              "name": "Does it support inventory and warehouse management?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. The system offers real-time inventory tracking, stock transfers, warehouse management, and inventory analytics."
              }
            },
            {
              "@type": "Question",
              "name": "Can production planning and procurement work together?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Absolutely. Production requirements are connected to procurement workflows to help ensure the availability of required materials."
              }
            },
            {
              "@type": "Question",
              "name": "Does it support quality control processes?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. The platform provides inspection management, quality checks, defect tracking, compliance monitoring, and reporting."
              }
            },
            {
              "@type": "Question",
              "name": "Can finance and manufacturing work together?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. Manufacturing operations can be integrated with budgeting, accounting, costing, and financial reporting."
              }
            }
          ]
        }
      ]
    }
  },

  // 10. Retail ERP
  '/retail-erp': {
    title: 'Cloud based Retail ERP Software | POS & Inventory | Vellko',
    description: 'Cloud based Retail ERP software connects POS, inventory, purchasing, warehouses, finance, CRM, and multi-store operations on one platform.',
    keywords: 'Cloud based Retail ERP Software, retail ERP software, POS software, inventory management, purchasing management, multi-store management, retail finance, warehouse management',
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": "https://vellkoerp.com/#organization",
          "name": "Vellko ERP",
          "url": "https://vellkoerp.com/",
          "logo": {
            "@type": "ImageObject",
            "url": "https://vellkoerp.com/assets/logo-bAy9mXr5.png"
          },
          "telephone": "+91-7880107201",
          "email": "support@vellkoerp.com",
          "founder": {
            "@type": "Person",
            "name": "Deepak Verma"
          },
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Phoenix Corporate Park, Survey No. 359/2 & 359/3, Back Part 2nd Floor, Narmadapuram Road",
            "addressLocality": "Bhopal",
            "addressRegion": "Madhya Pradesh",
            "postalCode": "462026",
            "addressCountry": "IN"
          },
          "areaServed": {
            "@type": "Country",
            "name": "India"
          }
        },
        {
          "@type": "WebSite",
          "@id": "https://vellkoerp.com/#website",
          "url": "https://vellkoerp.com/",
          "name": "Vellko ERP",
          "publisher": {
            "@id": "https://vellkoerp.com/#organization"
          },
          "inLanguage": "en-IN"
        },
        {
          "@type": "WebPage",
          "@id": "https://vellkoerp.com/retail-erp#webpage",
          "url": "https://vellkoerp.com/retail-erp",
          "name": "Cloud Based Retail ERP Software | POS & Inventory | Vellko",
          "description": "Cloud Based Retail ERP software connects POS, inventory, purchasing, warehouses, finance, CRM, and multi-store operations on one platform.",
          "isPartOf": {
            "@id": "https://vellkoerp.com/#website"
          },
          "about": {
            "@id": "https://vellkoerp.com/retail-erp#software"
          },
          "mainEntity": {
            "@id": "https://vellkoerp.com/retail-erp#software"
          },
          "breadcrumb": {
            "@id": "https://vellkoerp.com/retail-erp#breadcrumb"
          },
          "inLanguage": "en-IN"
        },
        {
          "@type": "SoftwareApplication",
          "@id": "https://vellkoerp.com/retail-erp#software",
          "name": "Vellko Retail ERP",
          "applicationCategory": "BusinessApplication",
          "applicationSubCategory": "Retail ERP Software",
          "operatingSystem": "Web-based",
          "url": "https://vellkoerp.com/retail-erp",
          "description": "Vellko Retail ERP is a cloud based ERP solution that helps retail businesses manage point of sale, inventory, purchasing, warehouses, finance, customer relationships, and multi-store operations.",
          "publisher": {
            "@id": "https://vellkoerp.com/#organization"
          },
          "featureList": [
            "Point of Sale (POS)",
            "Inventory Management",
            "Purchasing Management",
            "Warehouse Management",
            "Multi-Store Management",
            "Customer Relationship Management",
            "Finance Management",
            "Sales Management",
            "Stock Transfers",
            "Barcode Inventory Management",
            "Role-Based Access Control",
            "Business Reporting and Analytics"
          ]
        },
        {
          "@type": "BreadcrumbList",
          "@id": "https://vellkoerp.com/retail-erp#breadcrumb",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://vellkoerp.com/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Retail ERP",
              "item": "https://vellkoerp.com/retail-erp"
            }
          ]
        },
        {
          "@type": "FAQPage",
          "@id": "https://vellkoerp.com/retail-erp#faq",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Is Vellko Retail ERP suitable for small and large retail businesses?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. The platform can scale from single-store businesses to multi-location retail chains."
              }
            },
            {
              "@type": "Question",
              "name": "Can it manage multiple stores and warehouses?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. Vellko Retail ERP provides centralized control of multiple stores, warehouses, inventory, and retail operations."
              }
            },
            {
              "@type": "Question",
              "name": "Does it support barcode scanning?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. The system supports barcode-based inventory management and point-of-sale operations."
              }
            },
            {
              "@type": "Question",
              "name": "Can inventory be tracked in real time?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Absolutely. Stock levels can be automatically adjusted following purchases, sales, transfers, or stock adjustments."
              }
            },
            {
              "@type": "Question",
              "name": "Does it integrate finance and procurement?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. Purchasing, inventory, accounting, and vendor management can be integrated into one platform."
              }
            },
            {
              "@type": "Question",
              "name": "Can different departments have different permissions?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. Role-based access control allows companies to set permissions for store managers, cashiers, finance teams, warehouse employees, and administrators."
              }
            }
          ]
        }
      ]
    }
  },

  // 11. Distribution ERP
  '/distribution-erp': {
    title: 'Cloud based Distribution ERP Software | Wholesale & Supply Chain ERP',
    description: 'Vellko Cloud based Distribution ERP connects inventory, procurement, warehouses, sales, logistics, finance, and suppliers on one cloud-based platform.',
    keywords: 'Cloud based Distribution ERP Software, wholesale ERP software, supply chain ERP, distribution inventory management, warehouse distribution software, procurement management, multi-warehouse logistics, distribution finance',
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": "https://vellkoerp.com/#organization",
          "name": "Vellko ERP",
          "url": "https://vellkoerp.com/",
          "logo": {
            "@type": "ImageObject",
            "url": "https://vellkoerp.com/assets/logo-bAy9mXr5.png"
          },
          "telephone": "+91-7880107201",
          "email": "support@vellkoerp.com",
          "founder": {
            "@type": "Person",
            "name": "Deepak Verma"
          },
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Phoenix Corporate Park, Survey No. 359/2 & 359/3, Back Part 2nd Floor, Narmadapuram Road",
            "addressLocality": "Bhopal",
            "addressRegion": "Madhya Pradesh",
            "postalCode": "462026",
            "addressCountry": "IN"
          },
          "areaServed": {
            "@type": "Country",
            "name": "India"
          }
        },
        {
          "@type": "WebSite",
          "@id": "https://vellkoerp.com/#website",
          "url": "https://vellkoerp.com/",
          "name": "Vellko ERP",
          "publisher": {
            "@id": "https://vellkoerp.com/#organization"
          },
          "inLanguage": "en-IN"
        },
        {
          "@type": "WebPage",
          "@id": "https://vellkoerp.com/distribution-erp#webpage",
          "url": "https://vellkoerp.com/distribution-erp",
          "name": "Cloud Based Distribution ERP Software | Vellko ERP",
          "description": "Vellko Cloud Based Distribution ERP connects inventory, procurement, warehouses, sales, logistics, finance, and suppliers on one platform.",
          "isPartOf": {
            "@id": "https://vellkoerp.com/#website"
          },
          "about": {
            "@id": "https://vellkoerp.com/distribution-erp#software"
          },
          "mainEntity": {
            "@id": "https://vellkoerp.com/distribution-erp#software"
          },
          "breadcrumb": {
            "@id": "https://vellkoerp.com/distribution-erp#breadcrumb"
          },
          "inLanguage": "en-IN"
        },
        {
          "@type": "SoftwareApplication",
          "@id": "https://vellkoerp.com/distribution-erp#software",
          "name": "Vellko Distribution ERP",
          "applicationCategory": "BusinessApplication",
          "applicationSubCategory": "Distribution ERP Software",
          "operatingSystem": "Web-based",
          "url": "https://vellkoerp.com/distribution-erp",
          "description": "Vellko Distribution ERP is a cloud based ERP solution that helps distributors manage inventory, procurement, warehouses, sales, logistics, finance, suppliers, and multi-location operations.",
          "publisher": {
            "@id": "https://vellkoerp.com/#organization"
          },
          "featureList": [
            "Inventory Management",
            "Procurement Management",
            "Purchase Order Management",
            "Supplier Management",
            "Warehouse Management",
            "Multi-Warehouse Management",
            "Sales Management",
            "Order Management",
            "Logistics Management",
            "Stock Transfers",
            "Finance Management",
            "Vendor Performance Monitoring",
            "Business Reporting and Analytics",
            "Role-Based Access Control",
            "Custom Workflows and Approvals"
          ]
        },
        {
          "@type": "BreadcrumbList",
          "@id": "https://vellkoerp.com/distribution-erp#breadcrumb",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://vellkoerp.com/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Distribution ERP",
              "item": "https://vellkoerp.com/distribution-erp"
            }
          ]
        },
        {
          "@type": "FAQPage",
          "@id": "https://vellkoerp.com/distribution-erp#faq",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Is Vellko Distribution ERP suitable for small and growing distributors?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. The platform was built to be scalable from small-scale distributors to multi-location distribution companies."
              }
            },
            {
              "@type": "Question",
              "name": "Can it manage multiple warehouses?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. You can control transfers, inventory, and warehouse operations across several locations using a central system."
              }
            },
            {
              "@type": "Question",
              "name": "Does it support supplier and procurement management?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. The platform offers purchase orders, supplier management, procurement workflows, and vendor performance monitoring."
              }
            },
            {
              "@type": "Question",
              "name": "Can finance and inventory work together?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. Sales, inventory, purchasing, and accounting are integrated to provide greater visibility into financial and operational performance."
              }
            },
            {
              "@type": "Question",
              "name": "Can the system be customized?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Absolutely. Workflows, approvals, reports, user roles, and dashboards can be configured to meet the requirements of your business."
              }
            }
          ]
        }
      ]
    }
  },

  // 12. Healthcare ERP
  '/healthcare-erp': {
    title: 'Cloud Based Healthcare ERP Software | Vellko ERP',
    description: 'Vellko cloud based Healthcare ERP connects finance, inventory, HR, procurement, operations, and reporting on one centralized platform.',
    keywords: 'Cloud Based Healthcare ERP Software, healthcare ERP software, hospital management software, clinic management, pharmacy stock ERP, patient billing system, healthcare inventory management, healthcare HR and payroll',
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": "https://vellkoerp.com/#organization",
          "name": "Vellko ERP",
          "url": "https://vellkoerp.com/",
          "logo": {
            "@type": "ImageObject",
            "url": "https://vellkoerp.com/assets/logo-bAy9mXr5.png"
          },
          "telephone": "+91-7880107201",
          "email": "support@vellkoerp.com",
          "founder": {
            "@type": "Person",
            "name": "Deepak Verma"
          },
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Phoenix Corporate Park, Survey No. 359/2 & 359/3, Back Part 2nd Floor, Narmadapuram Road",
            "addressLocality": "Bhopal",
            "addressRegion": "Madhya Pradesh",
            "postalCode": "462026",
            "addressCountry": "IN"
          },
          "areaServed": {
            "@type": "Country",
            "name": "India"
          }
        },
        {
          "@type": "WebSite",
          "@id": "https://vellkoerp.com/#website",
          "url": "https://vellkoerp.com/",
          "name": "Vellko ERP",
          "publisher": {
            "@id": "https://vellkoerp.com/#organization"
          },
          "inLanguage": "en-IN"
        },
        {
          "@type": "WebPage",
          "@id": "https://vellkoerp.com/healthcare-erp#webpage",
          "url": "https://vellkoerp.com/healthcare-erp",
          "name": "Cloud Based Healthcare ERP Software | Vellko ERP",
          "description": "Vellko cloud based Healthcare ERP connects finance, inventory, HR, procurement, operations, and reporting on one centralized platform.",
          "isPartOf": {
            "@id": "https://vellkoerp.com/#website"
          },
          "about": {
            "@id": "https://vellkoerp.com/healthcare-erp#software"
          },
          "mainEntity": {
            "@id": "https://vellkoerp.com/healthcare-erp#software"
          },
          "breadcrumb": {
            "@id": "https://vellkoerp.com/healthcare-erp#breadcrumb"
          },
          "inLanguage": "en-IN"
        },
        {
          "@type": "SoftwareApplication",
          "@id": "https://vellkoerp.com/healthcare-erp#software",
          "name": "Vellko Healthcare ERP",
          "applicationCategory": "BusinessApplication",
          "applicationSubCategory": "Healthcare ERP Software",
          "operatingSystem": "Web-based",
          "url": "https://vellkoerp.com/healthcare-erp",
          "description": "Vellko Healthcare ERP is a cloud based ERP solution that helps healthcare organizations manage finance, inventory, human resources, procurement, operations, and reporting through one centralized platform.",
          "publisher": {
            "@id": "https://vellkoerp.com/#organization"
          },
          "featureList": [
            "Healthcare Operations Management",
            "Finance Management",
            "Inventory Management",
            "Procurement Management",
            "Human Resource Management",
            "Employee Management",
            "Purchase Management",
            "Reporting and Analytics",
            "Workflow Management",
            "Role-Based Access Control",
            "Centralized Business Management"
          ]
        },
        {
          "@type": "BreadcrumbList",
          "@id": "https://vellkoerp.com/healthcare-erp#breadcrumb",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://vellkoerp.com/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Healthcare ERP",
              "item": "https://vellkoerp.com/healthcare-erp"
            }
          ]
        },
        {
          "@type": "FAQPage",
          "@id": "https://vellkoerp.com/healthcare-erp#faq",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Is Vellko Healthcare ERP suitable for small and large healthcare organizations?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. The platform can be scaled to support the operational and management requirements of healthcare organizations of different sizes."
              }
            },
            {
              "@type": "Question",
              "name": "Can Vellko Healthcare ERP manage inventory and procurement?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. The system helps healthcare organizations manage inventory, purchasing, procurement workflows, and supplier-related activities from one platform."
              }
            },
            {
              "@type": "Question",
              "name": "Can finance and healthcare operations work together?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. Finance and operational processes can be connected to provide centralized visibility into costs, transactions, and business performance."
              }
            },
            {
              "@type": "Question",
              "name": "Does Vellko Healthcare ERP support HR management?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. The platform supports human resource and employee management to help organizations manage their workforce and related processes."
              }
            },
            {
              "@type": "Question",
              "name": "Can healthcare organizations generate reports and analytics?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. Vellko Healthcare ERP provides reporting and analytics capabilities to help organizations monitor operations and business performance."
              }
            },
            {
              "@type": "Question",
              "name": "Can the Healthcare ERP system be customized?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. Workflows, user roles, permissions, reports, and other system settings can be configured according to business requirements."
              }
            }
          ]
        }
      ]
    }
  },

  // 13. Education ERP
  '/education-erp': {
    title: 'Cloud Based Education ERP Software | Vellko ERP',
    description: 'Vellko cloud based Education ERP connects student management, finance, HR, operations, and reporting on one centralized platform.',
    keywords: 'Cloud Based Education ERP Software, education ERP software, school management software, college ERP, student information system, online admission management, fee collection system, student attendance software, education HR and payroll',
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": "https://vellkoerp.com/#organization",
          "name": "Vellko ERP",
          "url": "https://vellkoerp.com/",
          "logo": {
            "@type": "ImageObject",
            "url": "https://vellkoerp.com/assets/logo-bAy9mXr5.png"
          },
          "telephone": "+91-7880107201",
          "email": "support@vellkoerp.com",
          "founder": {
            "@type": "Person",
            "name": "Deepak Verma"
          },
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Phoenix Corporate Park, Survey No. 359/2 & 359/3, Back Part 2nd Floor, Narmadapuram Road",
            "addressLocality": "Bhopal",
            "addressRegion": "Madhya Pradesh",
            "postalCode": "462026",
            "addressCountry": "IN"
          },
          "areaServed": {
            "@type": "Country",
            "name": "India"
          }
        },
        {
          "@type": "WebSite",
          "@id": "https://vellkoerp.com/#website",
          "url": "https://vellkoerp.com/",
          "name": "Vellko ERP",
          "publisher": {
            "@id": "https://vellkoerp.com/#organization"
          },
          "inLanguage": "en-IN"
        },
        {
          "@type": "WebPage",
          "@id": "https://vellkoerp.com/education-erp#webpage",
          "url": "https://vellkoerp.com/education-erp",
          "name": "Cloud Based Education ERP Software | Vellko ERP",
          "description": "Vellko cloud based Education ERP connects student management, finance, HR, operations, and reporting on one centralized platform.",
          "isPartOf": {
            "@id": "https://vellkoerp.com/#website"
          },
          "about": {
            "@id": "https://vellkoerp.com/education-erp#software"
          },
          "mainEntity": {
            "@id": "https://vellkoerp.com/education-erp#software"
          },
          "breadcrumb": {
            "@id": "https://vellkoerp.com/education-erp#breadcrumb"
          },
          "inLanguage": "en-IN"
        },
        {
          "@type": "SoftwareApplication",
          "@id": "https://vellkoerp.com/education-erp#software",
          "name": "Vellko Education ERP",
          "applicationCategory": "BusinessApplication",
          "applicationSubCategory": "Education ERP Software",
          "operatingSystem": "Web-based",
          "url": "https://vellkoerp.com/education-erp",
          "description": "Vellko Education ERP is a cloud based ERP solution that helps schools, colleges, universities, coaching institutes, and other educational institutions manage students, admissions, fees, HR, operations, and reporting.",
          "publisher": {
            "@id": "https://vellkoerp.com/#organization"
          },
          "featureList": [
            "Student Management",
            "Online Admission Management",
            "Enrollment Management",
            "Fee Management",
            "Online Payment Management",
            "Attendance Management",
            "Examination and Results Management",
            "Assignment Management",
            "Parent and Student Portals",
            "Human Resource Management",
            "Finance Management",
            "Academic Management",
            "Reporting and Analytics",
            "Workflow Management",
            "Role-Based Access Control"
          ]
        },
        {
          "@type": "BreadcrumbList",
          "@id": "https://vellkoerp.com/education-erp#breadcrumb",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://vellkoerp.com/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Education ERP",
              "item": "https://vellkoerp.com/education-erp"
            }
          ]
        },
        {
          "@type": "FAQPage",
          "@id": "https://vellkoerp.com/education-erp#faq",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Is Vellko Education ERP suitable for schools and colleges?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. It is designed to be used by universities, schools, colleges, coaching institutes, and educational institutions of different sizes."
              }
            },
            {
              "@type": "Question",
              "name": "Can it manage online admissions?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. The system is fully online and supports admission processes, application tracking, and enrollment management."
              }
            },
            {
              "@type": "Question",
              "name": "Does it support fee collection and online payments?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. Institutions can manage fees, online payments, receipts, dues, and financial reports through the platform."
              }
            },
            {
              "@type": "Question",
              "name": "Can parents and students access information online?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. Secure portals allow parents and students to view information about attendance, results, fees, assignments, and announcements."
              }
            },
            {
              "@type": "Question",
              "name": "Can the Education ERP be customized?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Absolutely. Workflows, approval procedures, academic report structures, and modules can be adapted to meet the requirements of your institution."
              }
            }
          ]
        }
      ]
    }
  },

  // 14. Real Estate ERP
  '/real-estate-erp': {
    title: 'Cloud Based Real Estate ERP Software | Vellko ERP',
    description: 'Vellko ERP is a cloud based Real Estate ERP that connects finance, projects, sales, CRM, HR, inventory, and reporting on one centralized platform.',
    keywords: 'Cloud Based Real Estate ERP Software, real estate ERP, property management software, real estate CRM, builder ERP, real estate accounting software, tenant lease management, construction project management ERP',
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": "https://vellkoerp.com/#organization",
          "name": "Vellko ERP",
          "url": "https://vellkoerp.com/",
          "logo": {
            "@type": "ImageObject",
            "url": "https://vellkoerp.com/assets/logo-bAy9mXr5.png"
          },
          "founder": {
            "@type": "Person",
            "name": "Deepak Verma"
          },
          "telephone": "+91-7880107201",
          "email": "support@vellkoerp.com",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Phoenix Corporate Park, Survey No. 359/2 & 359/3, Back Part 2nd Floor, Narmadapuram Road",
            "addressLocality": "Bhopal",
            "addressRegion": "Madhya Pradesh",
            "postalCode": "462026",
            "addressCountry": "IN"
          },
          "areaServed": {
            "@type": "Country",
            "name": "India"
          }
        },
        {
          "@type": "WebSite",
          "@id": "https://vellkoerp.com/#website",
          "url": "https://vellkoerp.com/",
          "name": "Vellko ERP",
          "publisher": {
            "@id": "https://vellkoerp.com/#organization"
          },
          "inLanguage": "en-IN"
        },
        {
          "@type": "WebPage",
          "@id": "https://vellkoerp.com/real-estate-erp#webpage",
          "url": "https://vellkoerp.com/real-estate-erp",
          "name": "Cloud Based Real Estate ERP Software | Vellko ERP",
          "description": "Vellko ERP is a cloud based Real Estate ERP that connects finance, projects, sales, CRM, HR, inventory, and reporting on one centralized platform.",
          "isPartOf": {
            "@id": "https://vellkoerp.com/#website"
          },
          "about": {
            "@id": "https://vellkoerp.com/real-estate-erp#software"
          },
          "mainEntity": {
            "@id": "https://vellkoerp.com/real-estate-erp#software"
          },
          "breadcrumb": {
            "@id": "https://vellkoerp.com/real-estate-erp#breadcrumb"
          },
          "inLanguage": "en-IN"
        },
        {
          "@type": "SoftwareApplication",
          "@id": "https://vellkoerp.com/real-estate-erp#software",
          "name": "Vellko Real Estate ERP",
          "applicationCategory": "BusinessApplication",
          "applicationSubCategory": "Real Estate ERP Software",
          "operatingSystem": "Web-based",
          "url": "https://vellkoerp.com/real-estate-erp",
          "description": "Vellko Real Estate ERP is a cloud based ERP solution that helps real estate companies manage properties, projects, finance, sales, CRM, leases, tenants, HR, inventory, and reporting through one centralized platform.",
          "publisher": {
            "@id": "https://vellkoerp.com/#organization"
          },
          "featureList": [
            "Property Management",
            "Project Management",
            "Multi-Property Management",
            "Multi-Location Management",
            "Lease Management",
            "Tenant Management",
            "Occupancy Management",
            "Rent Management",
            "Sales Management",
            "Customer Relationship Management",
            "Finance Management",
            "Human Resource Management",
            "Inventory Management",
            "Maintenance Management",
            "Reporting and Analytics",
            "Workflow Management",
            "Role-Based Access Control"
          ]
        },
        {
          "@type": "BreadcrumbList",
          "@id": "https://vellkoerp.com/real-estate-erp#breadcrumb",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://vellkoerp.com/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Real Estate ERP",
              "item": "https://vellkoerp.com/real-estate-erp"
            }
          ]
        },
        {
          "@type": "FAQPage",
          "@id": "https://vellkoerp.com/real-estate-erp#faq",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Is Vellko Real Estate ERP suitable for small and large real estate companies?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. The platform can scale from smaller property management companies to large real estate corporations."
              }
            },
            {
              "@type": "Question",
              "name": "Can it manage multiple properties and locations?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. Vellko Real Estate ERP allows businesses to manage multiple buildings, properties, projects, branches, and locations through one centralized dashboard."
              }
            },
            {
              "@type": "Question",
              "name": "Does it support lease and tenant management?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. The system supports lease management, renewals, lease schedules, rent plans, tenant records, and occupancy monitoring."
              }
            },
            {
              "@type": "Question",
              "name": "Can finance and property management work together?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. Maintenance, finance, leasing, and sales operations can be integrated through the platform."
              }
            },
            {
              "@type": "Question",
              "name": "Can the Real Estate ERP be customized?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Absolutely. Workflows, reports, approval processes, and modules can be customized to meet your company's requirements."
              }
            }
          ]
        }
      ]
    }
  },

  // 15. Service Business ERP
  '/service-business-erp': {
    title: 'Cloud Based Service Business ERP Software | Vellko',
    description: 'Vellko cloud based Service Business ERP connects CRM, finance, HR, projects, service operations, and reporting on one centralized platform.',
    keywords: 'Cloud Based Service Business ERP Software, service business ERP, field service management, technician scheduling software, AMC management ERP, service billing software, work order management, service accounting software',
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": "https://vellkoerp.com/#organization",
          "name": "Vellko ERP",
          "url": "https://vellkoerp.com/",
          "logo": {
            "@type": "ImageObject",
            "url": "https://vellkoerp.com/assets/logo-bAy9mXr5.png"
          },
          "founder": {
            "@type": "Person",
            "name": "Deepak Verma"
          },
          "telephone": "+91-7880107201",
          "email": "support@vellkoerp.com",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Phoenix Corporate Park, Survey No. 359/2 & 359/3, Back Part 2nd Floor, Narmadapuram Road",
            "addressLocality": "Bhopal",
            "addressRegion": "Madhya Pradesh",
            "postalCode": "462026",
            "addressCountry": "IN"
          },
          "areaServed": {
            "@type": "Country",
            "name": "India"
          }
        },
        {
          "@type": "WebSite",
          "@id": "https://vellkoerp.com/#website",
          "url": "https://vellkoerp.com/",
          "name": "Vellko ERP",
          "publisher": {
            "@id": "https://vellkoerp.com/#organization"
          },
          "inLanguage": "en-IN"
        },
        {
          "@type": "WebPage",
          "@id": "https://vellkoerp.com/service-business-erp#webpage",
          "url": "https://vellkoerp.com/service-business-erp",
          "name": "Cloud Based Service Business ERP Software | Vellko",
          "description": "Vellko cloud based Service Business ERP connects CRM, finance, HR, projects, service operations, and reporting on one centralized platform.",
          "isPartOf": {
            "@id": "https://vellkoerp.com/#website"
          },
          "about": {
            "@id": "https://vellkoerp.com/service-business-erp#software"
          },
          "mainEntity": {
            "@id": "https://vellkoerp.com/service-business-erp#software"
          },
          "breadcrumb": {
            "@id": "https://vellkoerp.com/service-business-erp#breadcrumb"
          },
          "inLanguage": "en-IN"
        },
        {
          "@type": "SoftwareApplication",
          "@id": "https://vellkoerp.com/service-business-erp#software",
          "name": "Vellko Service Business ERP",
          "applicationCategory": "BusinessApplication",
          "applicationSubCategory": "Service Business ERP Software",
          "operatingSystem": "Web-based",
          "url": "https://vellkoerp.com/service-business-erp",
          "description": "Vellko Service Business ERP is a cloud based ERP solution that helps service businesses manage CRM, finance, HR, projects, field service operations, technicians, AMC, warranties, inventory, billing, and reporting through one centralized platform.",
          "publisher": {
            "@id": "https://vellkoerp.com/#organization"
          },
          "featureList": [
            "Customer Relationship Management",
            "Service Management",
            "Field Service Management",
            "Field Technician Management",
            "Technician Scheduling",
            "Mobile Access",
            "GPS Monitoring",
            "Attendance Tracking",
            "Job Status Tracking",
            "Annual Maintenance Contract Management",
            "Warranty Management",
            "Preventive Maintenance Management",
            "Service Agreement Management",
            "Project Management",
            "Inventory Management",
            "Spare Parts Management",
            "Procurement Management",
            "Billing and Invoicing",
            "Finance Management",
            "Human Resource Management",
            "Reporting and Analytics",
            "Workflow Management",
            "Role-Based Access Control"
          ]
        },
        {
          "@type": "BreadcrumbList",
          "@id": "https://vellkoerp.com/service-business-erp#breadcrumb",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://vellkoerp.com/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Service Business ERP",
              "item": "https://vellkoerp.com/service-business-erp"
            }
          ]
        },
        {
          "@type": "FAQPage",
          "@id": "https://vellkoerp.com/service-business-erp#faq",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Is Vellko Service Business ERP suitable for small businesses?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. Vellko Service Business ERP is designed for small and medium-sized businesses, startups, and large service companies, with features that can scale as your business grows."
              }
            },
            {
              "@type": "Question",
              "name": "Can Vellko Service Business ERP manage field technicians?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. The ERP includes technician scheduling, mobile access, GPS monitoring, attendance tracking, and job-status updates to help businesses manage field service operations effectively."
              }
            },
            {
              "@type": "Question",
              "name": "Does it support AMC and warranty management?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. Businesses can manage Annual Maintenance Contracts (AMC), warranty periods, preventive maintenance schedules, renewals, and customer service agreements from one platform."
              }
            },
            {
              "@type": "Question",
              "name": "Can inventory and billing work together?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. Inventory, spare parts, procurement, billing, and finance can be integrated to help maintain accurate stock updates and streamline invoicing."
              }
            },
            {
              "@type": "Question",
              "name": "Can the ERP be customized for our service business?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Absolutely. Workflows, approval processes, service categories, forms, reports, and dashboards can be customized to match your business operations."
              }
            }
          ]
        }
      ]
    }
  },

  // 16. E-Commerce ERP
  '/ecommerce-erp': {
    title: 'Cloud-Based E-Commerce ERP Software | Vellko ERP',
    description: 'Vellko cloud-based E-Commerce ERP connects orders, inventory, finance, customers, procurement, and reporting on one centralized platform.',
    keywords: 'Cloud-Based E-Commerce ERP Software, ecommerce ERP, online store management software, marketplace integration ERP, multi-channel inventory management, ecommerce billing software, order management system',
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": "https://vellkoerp.com/#organization",
          "name": "Vellko ERP",
          "url": "https://vellkoerp.com/",
          "logo": {
            "@type": "ImageObject",
            "url": "https://vellkoerp.com/assets/logo-bAy9mXr5.png"
          },
          "founder": {
            "@type": "Person",
            "name": "Deepak Verma"
          },
          "telephone": "+91-7880107201",
          "email": "support@vellkoerp.com",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Phoenix Corporate Park, Survey No. 359/2 & 359/3, Back Part 2nd Floor, Narmadapuram Road",
            "addressLocality": "Bhopal",
            "addressRegion": "Madhya Pradesh",
            "postalCode": "462026",
            "addressCountry": "IN"
          },
          "areaServed": {
            "@type": "Country",
            "name": "India"
          }
        },
        {
          "@type": "WebSite",
          "@id": "https://vellkoerp.com/#website",
          "url": "https://vellkoerp.com/",
          "name": "Vellko ERP",
          "publisher": {
            "@id": "https://vellkoerp.com/#organization"
          },
          "inLanguage": "en-IN"
        },
        {
          "@type": "WebPage",
          "@id": "https://vellkoerp.com/e-commerce-erp#webpage",
          "url": "https://vellkoerp.com/e-commerce-erp",
          "name": "Cloud-Based E-Commerce ERP Software | Vellko ERP",
          "description": "Vellko cloud-based E-Commerce ERP connects orders, inventory, finance, customers, procurement, and reporting on one centralized platform.",
          "isPartOf": {
            "@id": "https://vellkoerp.com/#website"
          },
          "about": {
            "@id": "https://vellkoerp.com/e-commerce-erp#software"
          },
          "mainEntity": {
            "@id": "https://vellkoerp.com/e-commerce-erp#software"
          },
          "breadcrumb": {
            "@id": "https://vellkoerp.com/e-commerce-erp#breadcrumb"
          },
          "inLanguage": "en-IN"
        },
        {
          "@type": "SoftwareApplication",
          "@id": "https://vellkoerp.com/e-commerce-erp#software",
          "name": "Vellko E-Commerce ERP",
          "applicationCategory": "BusinessApplication",
          "applicationSubCategory": "E-Commerce ERP Software",
          "operatingSystem": "Web-based",
          "url": "https://vellkoerp.com/e-commerce-erp",
          "description": "Vellko E-Commerce ERP is a cloud-based ERP solution that helps e-commerce businesses manage orders, inventory, finance, customers, procurement, marketplaces, and reporting through one centralized platform.",
          "publisher": {
            "@id": "https://vellkoerp.com/#organization"
          },
          "featureList": [
            "E-Commerce Order Management",
            "Multi-Store Management",
            "Sales Channel Management",
            "Marketplace Management",
            "Inventory Management",
            "Warehouse Management",
            "Procurement Management",
            "Product Management",
            "Customer Relationship Management",
            "Customer Data Management",
            "Finance Management",
            "Billing and Invoicing",
            "Order Tracking",
            "Reporting and Analytics",
            "Workflow Management",
            "Role-Based Access Control"
          ]
        },
        {
          "@type": "BreadcrumbList",
          "@id": "https://vellkoerp.com/e-commerce-erp#breadcrumb",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://vellkoerp.com/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "E-Commerce ERP",
              "item": "https://vellkoerp.com/e-commerce-erp"
            }
          ]
        },
        {
          "@type": "FAQPage",
          "@id": "https://vellkoerp.com/e-commerce-erp#faq",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Is Vellko E-Commerce ERP suitable for small businesses?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. Vellko ERP is designed to support startups, small and medium-sized businesses, and large enterprises with scalable e-commerce solutions."
              }
            },
            {
              "@type": "Question",
              "name": "Can it manage multiple online stores?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. Businesses can manage multiple online stores, sales channels, and marketplaces through one centralized platform."
              }
            },
            {
              "@type": "Question",
              "name": "Does it support inventory management?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. The system provides inventory tracking, warehouse management, stock alerts, and inventory reporting."
              }
            },
            {
              "@type": "Question",
              "name": "Can it integrate with marketplaces?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. Vellko ERP can integrate with marketplaces to help synchronize products, inventory, and orders."
              }
            },
            {
              "@type": "Question",
              "name": "Can businesses manage customer data?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. The integrated CRM helps businesses manage customer profiles, purchase history, interactions, and engagement."
              }
            },
            {
              "@type": "Question",
              "name": "Can the E-Commerce ERP be customized?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Absolutely. Workflows, reports, integrations, and business processes can be customized according to your requirements."
              }
            }
          ]
        }
      ]
    }
  },
  '/e-commerce-erp': {
    title: 'Cloud-Based E-Commerce ERP Software | Vellko ERP',
    description: 'Vellko cloud-based E-Commerce ERP connects orders, inventory, finance, customers, procurement, and reporting on one centralized platform.',
    keywords: 'Cloud-Based E-Commerce ERP Software, ecommerce ERP, online store management software, marketplace integration ERP, multi-channel inventory management, ecommerce billing software, order management system',
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": "https://vellkoerp.com/#organization",
          "name": "Vellko ERP",
          "url": "https://vellkoerp.com/",
          "logo": {
            "@type": "ImageObject",
            "url": "https://vellkoerp.com/assets/logo-bAy9mXr5.png"
          },
          "founder": {
            "@type": "Person",
            "name": "Deepak Verma"
          },
          "telephone": "+91-7880107201",
          "email": "support@vellkoerp.com",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Phoenix Corporate Park, Survey No. 359/2 & 359/3, Back Part 2nd Floor, Narmadapuram Road",
            "addressLocality": "Bhopal",
            "addressRegion": "Madhya Pradesh",
            "postalCode": "462026",
            "addressCountry": "IN"
          },
          "areaServed": {
            "@type": "Country",
            "name": "India"
          }
        },
        {
          "@type": "WebSite",
          "@id": "https://vellkoerp.com/#website",
          "url": "https://vellkoerp.com/",
          "name": "Vellko ERP",
          "publisher": {
            "@id": "https://vellkoerp.com/#organization"
          },
          "inLanguage": "en-IN"
        },
        {
          "@type": "WebPage",
          "@id": "https://vellkoerp.com/e-commerce-erp#webpage",
          "url": "https://vellkoerp.com/e-commerce-erp",
          "name": "Cloud-Based E-Commerce ERP Software | Vellko ERP",
          "description": "Vellko cloud-based E-Commerce ERP connects orders, inventory, finance, customers, procurement, and reporting on one centralized platform.",
          "isPartOf": {
            "@id": "https://vellkoerp.com/#website"
          },
          "about": {
            "@id": "https://vellkoerp.com/e-commerce-erp#software"
          },
          "mainEntity": {
            "@id": "https://vellkoerp.com/e-commerce-erp#software"
          },
          "breadcrumb": {
            "@id": "https://vellkoerp.com/e-commerce-erp#breadcrumb"
          },
          "inLanguage": "en-IN"
        },
        {
          "@type": "SoftwareApplication",
          "@id": "https://vellkoerp.com/e-commerce-erp#software",
          "name": "Vellko E-Commerce ERP",
          "applicationCategory": "BusinessApplication",
          "applicationSubCategory": "E-Commerce ERP Software",
          "operatingSystem": "Web-based",
          "url": "https://vellkoerp.com/e-commerce-erp",
          "description": "Vellko E-Commerce ERP is a cloud-based ERP solution that helps e-commerce businesses manage orders, inventory, finance, customers, procurement, marketplaces, and reporting through one centralized platform.",
          "publisher": {
            "@id": "https://vellkoerp.com/#organization"
          },
          "featureList": [
            "E-Commerce Order Management",
            "Multi-Store Management",
            "Sales Channel Management",
            "Marketplace Management",
            "Inventory Management",
            "Warehouse Management",
            "Procurement Management",
            "Product Management",
            "Customer Relationship Management",
            "Customer Data Management",
            "Finance Management",
            "Billing and Invoicing",
            "Order Tracking",
            "Reporting and Analytics",
            "Workflow Management",
            "Role-Based Access Control"
          ]
        },
        {
          "@type": "BreadcrumbList",
          "@id": "https://vellkoerp.com/e-commerce-erp#breadcrumb",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://vellkoerp.com/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "E-Commerce ERP",
              "item": "https://vellkoerp.com/e-commerce-erp"
            }
          ]
        },
        {
          "@type": "FAQPage",
          "@id": "https://vellkoerp.com/e-commerce-erp#faq",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Is Vellko E-Commerce ERP suitable for small businesses?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. Vellko ERP is designed to support startups, small and medium-sized businesses, and large enterprises with scalable e-commerce solutions."
              }
            },
            {
              "@type": "Question",
              "name": "Can it manage multiple online stores?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. Businesses can manage multiple online stores, sales channels, and marketplaces through one centralized platform."
              }
            },
            {
              "@type": "Question",
              "name": "Does it support inventory management?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. The system provides inventory tracking, warehouse management, stock alerts, and inventory reporting."
              }
            },
            {
              "@type": "Question",
              "name": "Can it integrate with marketplaces?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. Vellko ERP can integrate with marketplaces to help synchronize products, inventory, and orders."
              }
            },
            {
              "@type": "Question",
              "name": "Can businesses manage customer data?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. The integrated CRM helps businesses manage customer profiles, purchase history, interactions, and engagement."
              }
            },
            {
              "@type": "Question",
              "name": "Can the E-Commerce ERP be customized?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Absolutely. Workflows, reports, integrations, and business processes can be customized according to your requirements."
              }
            }
          ]
        }
      ]
    }
  },

  // 17. Pricing
  '/pricing': {
    title: 'Transparent Pricing Plans | Vellko ERP',
    description: 'Explore flexible and scalable pricing plans tailored for small businesses, growing enterprises, and custom industries.',
    keywords: 'ERP pricing, cloud ERP cost, business software plans, Vellko ERP pricing India, affordable ERP software',
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Vellko ERP Pricing Plans",
      "url": "https://vellkoerp.com/pricing"
    }
  },

  // 18. Blog
  '/blog': {
    title: 'ERP Insights, Guides & Business Strategy Blog | Vellko ERP',
    description: 'Read the latest business management tips, ERP implementation guides, HR strategies and financial technology insights.',
    keywords: 'ERP blog, business management guides, digital transformation articles, HRMS tips, supply chain insights',
    schema: {
      "@context": "https://schema.org",
      "@type": "Blog",
      "name": "Vellko ERP Business & Tech Blog",
      "url": "https://vellkoerp.com/blog"
    }
  },

  // 19. About Us
  '/about': {
    title: 'About Us | Vellko ERP Philosophy, Mission & Team',
    description: 'Learn about Vellko ERP vision, our mission to simplify business complexity, and our dedicated team of technology experts.',
    keywords: 'about Vellko ERP, ERP company India, enterprise software team, Vellko vision and mission',
    schema: {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "name": "About Vellko ERP",
      "url": "https://vellkoerp.com/about"
    }
  },

  // 20. Contact Us
  '/contact': {
    title: 'Contact Us | Book a Free Demo | Vellko ERP Support',
    description: 'Get in touch with our ERP experts to discuss your business needs, request a personalized live demo, or get support.',
    keywords: 'contact Vellko ERP, book ERP demo, ERP consultation, Vellko support phone number, customer helpline',
    schema: {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "name": "Contact Vellko ERP",
      "url": "https://vellkoerp.com/contact"
    }
  },

  // 21. Privacy Policy
  '/privacy-policy': {
    title: 'Privacy Policy | Vellko ERP',
    description: 'Review Vellko ERP privacy policy regarding data collection, encryption, user security, and confidentiality.',
    keywords: 'privacy policy, data protection, GDPR compliance, enterprise data security'
  },

  // 22. Terms and Conditions
  '/terms-and-conditions': {
    title: 'Terms and Conditions | Vellko ERP',
    description: 'Read the terms and conditions, user agreement, and service level policy for Vellko ERP platform usage.',
    keywords: 'terms and conditions, user agreement, SLA, service terms'
  }
};

/**
 * Resolver function:
 * Takes the current URL path and returns clean, unified SEO metadata.
 * Automatically mirrors title & description to OG and Twitter tags,
 * and sets canonical and hreflangs to the exact current URL!
 */
export function getSeoForPath(pathname) {
  const normalizedPath = (!pathname || pathname === '/') ? '/' : pathname.replace(/\/$/, '');
  const pageUrl = `${BASE_URL}${normalizedPath === '/' ? '/' : normalizedPath}`;

  const entry = seoRoutes[normalizedPath] || (normalizedPath.startsWith('/blog/') ? {
    title: `${normalizedPath.replace('/blog/', '').replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} | Vellko ERP Blog`,
    description: `Read insightful ERP analysis and practical guides on the Vellko ERP blog.`,
    schema: {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": normalizedPath.replace('/blog/', '').replace(/-/g, ' '),
      "url": pageUrl
    }
  } : defaultSeo);

  const title = entry.title || defaultSeo.title;
  const description = entry.description || defaultSeo.description;
  const keywords = entry.keywords || defaultSeo.keywords;
  const image = entry.image || DEFAULT_IMAGE;
  const schema = entry.schema || defaultSeo.schema;

  return {
    title,
    description,
    keywords,
    image,
    url: pageUrl,
    canonical: pageUrl,
    schema
  };
}
