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
      "@id": "https://www.vellkoerp.com/#organization",
      "name": "Vellko ERP",
      "url": "https://www.vellkoerp.com/",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.vellkoerp.com/assets/logo-bAy9mXr5.png"
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
      "@id": "https://www.vellkoerp.com/contact-us/#contactpage",
      "url": "https://www.vellkoerp.com/contact-us/",
      "name": "Contact Vellko ERP",
      "description": "Contact Vellko ERP for product information, ERP software demos, implementation support and business enquiries.",
      "isPartOf": {
        "@id": "https://www.vellkoerp.com/#website"
      },
      "about": {
        "@id": "https://www.vellkoerp.com/#organization"
      },
      "mainEntity": {
        "@id": "https://www.vellkoerp.com/#organization"
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
          "@id": "https://www.vellkoerp.com/#organization",
          "name": "Vellko ERP",
          "url": "https://www.vellkoerp.com/",
          "logo": {
            "@type": "ImageObject",
            "url": "https://www.vellkoerp.com/assets/logo-bAy9mXr5.png"
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
          "@id": "https://www.vellkoerp.com/#website",
          "url": "https://www.vellkoerp.com/",
          "name": "Vellko ERP",
          "publisher": {
            "@id": "https://www.vellkoerp.com/#organization"
          },
          "inLanguage": "en-IN"
        },
        {
          "@type": "WebPage",
          "@id": "https://www.vellkoerp.com/crm-lead-management/#webpage",
          "url": "https://www.vellkoerp.com/crm-lead-management/",
          "name": "Cloud Based CRM Software & Lead Management Software",
          "description": "Vellko ERP is a cloud based CRM Software and lead management software that integrates lead capture, pipelines for sales monitoring of customers, follow-ups as well as reporting in one platform. It helps sales teams handle each opportunity with total assurance and control.",
          "isPartOf": {
            "@id": "https://www.vellkoerp.com/#website"
          },
          "about": {
            "@id": "https://www.vellkoerp.com/crm-lead-management/#service"
          },
          "breadcrumb": {
            "@id": "https://www.vellkoerp.com/crm-lead-management/#breadcrumb"
          },
          "inLanguage": "en-IN"
        },
        {
          "@type": "Service",
          "@id": "https://www.vellkoerp.com/crm-lead-management/#service",
          "name": "CRM & Lead Management Software",
          "serviceType": "CRM and Lead Management Software",
          "url": "https://www.vellkoerp.com/crm-lead-management/",
          "description": "Vellko ERP is a cloud based CRM Software and lead management software that integrates lead capture, pipelines for sales monitoring of customers, follow-ups as well as reporting in one platform. It helps sales teams handle each opportunity with total assurance and control.",
          "provider": {
            "@id": "https://www.vellkoerp.com/#organization"
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
          "@id": "https://www.vellkoerp.com/crm-lead-management/#software",
          "name": "Vellko CRM",
          "applicationCategory": "BusinessApplication",
          "applicationSubCategory": "CRM Software",
          "operatingSystem": "Web-based",
          "url": "https://www.vellkoerp.com/crm-lead-management/",
          "description": "Vellko CRM helps businesses manage leads, sales pipelines, follow-ups, quotations, customer relationships and sales performance through a cloud-based CRM platform.",
          "publisher": {
            "@id": "https://www.vellkoerp.com/#organization"
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
          "@id": "https://www.vellkoerp.com/crm-lead-management/#breadcrumb",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://www.vellkoerp.com/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "CRM & Lead Management",
              "item": "https://www.vellkoerp.com/crm-lead-management/"
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
          "@id": "https://www.vellkoerp.com/#organization",
          "name": "Vellko ERP",
          "url": "https://www.vellkoerp.com/",
          "logo": {
            "@type": "ImageObject",
            "url": "https://www.vellkoerp.com/assets/logo-bAy9mXr5.png"
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
          "@id": "https://www.vellkoerp.com/#website",
          "url": "https://www.vellkoerp.com/",
          "name": "Vellko ERP",
          "publisher": {
            "@id": "https://www.vellkoerp.com/#organization"
          },
          "inLanguage": "en-IN"
        },
        {
          "@type": "WebPage",
          "@id": "https://www.vellkoerp.com/hrms-payroll/#webpage",
          "url": "https://www.vellkoerp.com/hrms-payroll",
          "name": "Cloud based HR systems | Payroll management system",
          "description": "Manage attendance, cloud HR and payroll, leave, recruitment and performance in one HRMS. Automate workflows, track compliance and view live dashboards.",
          "isPartOf": {
            "@id": "https://www.vellkoerp.com/#website"
          },
          "about": {
            "@id": "https://www.vellkoerp.com/hrms-payroll/#service"
          },
          "breadcrumb": {
            "@id": "https://www.vellkoerp.com/hrms-payroll/#breadcrumb"
          },
          "inLanguage": "en-IN"
        },
        {
          "@type": "Service",
          "@id": "https://www.vellkoerp.com/hrms-payroll/#service",
          "name": "HRMS & Payroll Software",
          "serviceType": "HRMS and Payroll Software",
          "url": "https://www.vellkoerp.com/hrms-payroll",
          "description": "Vellko HRMS is a cloud-based human resource management and payroll solution that helps businesses manage employee attendance, leave, recruitment, performance, payroll and HR workflows from one platform.",
          "provider": {
            "@id": "https://www.vellkoerp.com/#organization"
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
          "@id": "https://www.vellkoerp.com/hrms-payroll/#software",
          "name": "Vellko HRMS",
          "applicationCategory": "BusinessApplication",
          "applicationSubCategory": "Human Resource Management Software",
          "operatingSystem": "Web-based",
          "url": "https://www.vellkoerp.com/hrms-payroll",
          "description": "Vellko HRMS is a cloud-based HR software solution for managing employee attendance, payroll, leave, recruitment, performance and HR operations.",
          "publisher": {
            "@id": "https://www.vellkoerp.com/#organization"
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
          "@id": "https://www.vellkoerp.com/hrms-payroll/#breadcrumb",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://www.vellkoerp.com/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "HRMS & Payroll",
              "item": "https://www.vellkoerp.com/hrms-payroll"
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
          "@id": "https://www.vellkoerp.com/#organization",
          "name": "Vellko ERP",
          "url": "https://www.vellkoerp.com/",
          "logo": {
            "@type": "ImageObject",
            "url": "https://www.vellkoerp.com/assets/logo-bAy9mXr5.png"
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
          "@id": "https://www.vellkoerp.com/#website",
          "url": "https://www.vellkoerp.com/",
          "name": "Vellko ERP",
          "publisher": {
            "@id": "https://www.vellkoerp.com/#organization"
          },
          "inLanguage": "en-IN"
        },
        {
          "@type": "WebPage",
          "@id": "https://www.vellkoerp.com/finance-accounting/#webpage",
          "url": "https://www.vellkoerp.com/finance-accounting",
          "name": "Cloud based Accounting software | Financial Management Vellko ERPP",
          "description": "Manage cloud based accounting, GST, cash flow, budgeting, and financial reports with Vellko ERP Accounting Software. Get real-time financial visibility and automate finance workflows..",
          "isPartOf": {
            "@id": "https://www.vellkoerp.com/#website"
          },
          "about": {
            "@id": "https://www.vellkoerp.com/finance-accounting/#service"
          },
          "breadcrumb": {
            "@id": "https://www.vellkoerp.com/finance-accounting/#breadcrumb"
          },
          "primaryImageOfPage": {
            "@type": "ImageObject",
            "url": "https://www.vellkoerp.com/assets/how-it-works-3cD6AAXl.png"
          },
          "inLanguage": "en-IN"
        },
        {
          "@type": "Service",
          "@id": "https://www.vellkoerp.com/finance-accounting/#service",
          "name": "Cloud based Accounting software | Financial Management Vellko ERP",
          "serviceType": "ERP Finance and Accounting Software",
          "url": "https://www.vellkoerp.com/finance-accounting",
          "description": "Manage cloud based accounting, GST, cash flow, budgeting, and financial reports with Vellko ERP Accounting Software. Get real-time financial visibility and automate finance workflows..",
          "provider": {
            "@id": "https://www.vellkoerp.com/#organization"
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
          "@id": "https://www.vellkoerp.com/finance-accounting/#software",
          "name": "Vellko ERP Accounting Software",
          "applicationCategory": "BusinessApplication",
          "applicationSubCategory": "Accounting and Financial Management Software",
          "operatingSystem": "Web-based",
          "url": "https://www.vellkoerp.com/finance-accounting",
          "description": "Vellko ERP Accounting Software provides integrated financial management for accounting, GST, cash flow, budgeting, accounts payable, invoicing and financial reporting.",
          "image": "https://www.vellkoerp.com/assets/how-it-works-3cD6AAXl.png",
          "publisher": {
            "@id": "https://www.vellkoerp.com/#organization"
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
          "@id": "https://www.vellkoerp.com/finance-accounting/#breadcrumb",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://www.vellkoerp.com/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Finance & Accounting",
              "item": "https://www.vellkoerp.com/finance-accounting"
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
          "@id": "https://www.vellkoerp.com/#organization",
          "name": "Vellko ERP",
          "url": "https://www.vellkoerp.com/",
          "logo": {
            "@type": "ImageObject",
            "url": "https://www.vellkoerp.com/assets/logo-bAy9mXr5.png"
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
          "@id": "https://www.vellkoerp.com/#website",
          "url": "https://www.vellkoerp.com/",
          "name": "Vellko ERP",
          "publisher": {
            "@id": "https://www.vellkoerp.com/#organization"
          },
          "inLanguage": "en-IN"
        },
        {
          "@type": "WebPage",
          "@id": "https://www.vellkoerp.com/inventory-management/#webpage",
          "url": "https://www.vellkoerp.com/inventory-management",
          "name": "Cloud Based Inventory Management Software | Vellko ERP",
          "description": "Cloud Based Inventory Management Software to track stock across warehouses in real time. Barcode scanning, batch tracking, purchase integration and live analytics.",
          "isPartOf": {
            "@id": "https://www.vellkoerp.com/#website"
          },
          "about": {
            "@id": "https://www.vellkoerp.com/inventory-management/#service"
          },
          "breadcrumb": {
            "@id": "https://www.vellkoerp.com/inventory-management/#breadcrumb"
          },
          "primaryImageOfPage": {
            "@type": "ImageObject",
            "url": "https://www.vellkoerp.com/assets/how-it-works-3cD6AAXl.png"
          },
          "inLanguage": "en-IN"
        },
        {
          "@type": "Service",
          "@id": "https://www.vellkoerp.com/inventory-management/#service",
          "name": "Inventory Management Software",
          "serviceType": "Cloud-Based Inventory Management Software",
          "url": "https://www.vellkoerp.com/inventory-management",
          "description": "Vellko ERP Inventory Management Software helps businesses track inventory across warehouses in real time, manage stock, scan barcodes, track batches, integrate purchases and monitor inventory performance through live analytics.",
          "provider": {
            "@id": "https://www.vellkoerp.com/#organization"
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
          "@id": "https://www.vellkoerp.com/inventory-management/#software",
          "name": "Vellko ERP Inventory Management Software",
          "applicationCategory": "BusinessApplication",
          "applicationSubCategory": "Inventory Management Software",
          "operatingSystem": "Web-based",
          "url": "https://www.vellkoerp.com/inventory-management",
          "description": "Vellko ERP is a cloud-based inventory management solution for real-time stock tracking, warehouse management, barcode scanning, batch tracking, purchase integration and inventory analytics.",
          "image": "https://www.vellkoerp.com/assets/how-it-works-3cD6AAXl.png",
          "publisher": {
            "@id": "https://www.vellkoerp.com/#organization"
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
          "@id": "https://www.vellkoerp.com/inventory-management/#breadcrumb",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://www.vellkoerp.com/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Inventory Management",
              "item": "https://www.vellkoerp.com/inventory-management"
            }
          ]
        }
      ]
    }
  },

  // 6. Project Management
  '/project-management': {
    title: 'Work & Project Management Software | Team Collaboration | Vellko ERP',
    description: 'Plan projects, assign tasks, track deadlines, manage team workloads and monitor billable hours with Vellko Project Management.',
    keywords: 'project management software, task tracker, team collaboration tool, deadline management, resource allocation ERP',
    schema: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Project Management",
      "provider": { "@type": "Organization", "name": "Vellko ERP", "url": "https://vellkoerp.com" },
      "description": "Task management, Kanban boards, timesheets, and milestone tracking."
    }
  },

  // 7. Service Management
  '/service-management': {
    title: 'Customer Service & Helpdesk Support Ticket Management | Vellko ERP',
    description: 'Manage support tickets, track SLA compliance, assign service engineers and boost customer satisfaction with Vellko ERP.',
    keywords: 'customer service software, helpdesk ticketing, SLA tracking system, service request management, support analytics',
    schema: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Customer Service & Ticket Management",
      "provider": { "@type": "Organization", "name": "Vellko ERP", "url": "https://vellkoerp.com" },
      "description": "Helpdesk ticketing, SLA monitoring, and engineer dispatch management."
    }
  },

  // 8. Biometric Attendance
  '/biometric-attendance': {
    title: 'Biometric Attendance & Facial Recognition Integration | Vellko ERP',
    description: 'Connect biometric devices, RFID scanners and facial recognition directly to payroll for accurate real-time time tracking.',
    keywords: 'biometric attendance integration, facial recognition attendance, punch machine sync, real-time attendance ERP, shift tracking',
    schema: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Biometric Attendance Integration",
      "provider": { "@type": "Organization", "name": "Vellko ERP", "url": "https://vellkoerp.com" },
      "description": "Biometric machine sync, RFID, and facial recognition attendance integration."
    }
  },

  // 9. Manufacturing ERP
  '/manufacturing-erp': {
    title: 'Manufacturing ERP Software | Production & BOM Management | Vellko ERP',
    description: 'Optimize bill of materials (BOM), production planning, shop-floor tracking, machine maintenance and quality control.',
    keywords: 'manufacturing ERP, bill of materials software, production scheduling, shop-floor management, quality control ERP',
    schema: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Manufacturing ERP",
      "provider": { "@type": "Organization", "name": "Vellko ERP", "url": "https://vellkoerp.com" },
      "description": "BOM planning, work order routing, job cards, and shop-floor control."
    }
  },

  // 10. Retail ERP
  '/retail-erp': {
    title: 'Retail & POS ERP Software | Multi-Store Retail Management | Vellko ERP',
    description: 'Fast POS billing, barcode scanning, loyalty programs, inventory sync and consolidated multi-store retail reporting.',
    keywords: 'retail ERP software, POS billing software, multi-store management, barcode retail POS, retail inventory tracking',
    schema: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Retail & POS ERP",
      "provider": { "@type": "Organization", "name": "Vellko ERP", "url": "https://vellkoerp.com" },
      "description": "Multi-store retail POS, barcode scanning, customer loyalty, and stock sync."
    }
  },

  // 11. Distribution ERP
  '/distribution-erp': {
    title: 'Distribution & Wholesale Supply Chain ERP | Vellko ERP',
    description: 'Manage dealer networks, logistics, order fulfillment, pricing tiers and wholesale distribution workflows.',
    keywords: 'distribution ERP, wholesale management system, supply chain ERP, dealer distributor portal, order fulfillment software',
    schema: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Distribution ERP",
      "provider": { "@type": "Organization", "name": "Vellko ERP", "url": "https://vellkoerp.com" },
      "description": "Wholesale distribution, dealer portals, logistics routing, and order fulfillment."
    }
  },

  // 12. Healthcare ERP
  '/healthcare-erp': {
    title: 'Healthcare & Hospital Management ERP Software | Vellko ERP',
    description: 'Streamline patient registration, doctor appointments, pharmacy inventory, lab reports and hospital billing.',
    keywords: 'healthcare ERP, hospital management software, clinic management, pharmacy stock ERP, patient billing system',
    schema: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Healthcare ERP",
      "provider": { "@type": "Organization", "name": "Vellko ERP", "url": "https://vellkoerp.com" },
      "description": "Patient records, OPD/IPD billing, doctor scheduling, and pharmacy stock."
    }
  },

  // 13. Education ERP
  '/education-erp': {
    title: 'Education & School Institute Management ERP | Vellko ERP',
    description: 'Manage student admissions, fee collections, timetable scheduling, exams, grading and staff payroll in one platform.',
    keywords: 'education ERP, school management software, college institute ERP, fee collection system, student attendance software',
    schema: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Education ERP",
      "provider": { "@type": "Organization", "name": "Vellko ERP", "url": "https://vellkoerp.com" },
      "description": "School and college admissions, online fee collection, and timetable scheduling."
    }
  },

  // 14. Real Estate ERP
  '/real-estate-erp': {
    title: 'Real Estate & Construction Project ERP | Vellko ERP',
    description: 'Track property units, construction milestones, subcontractor billing, customer CRM and payment schedules.',
    keywords: 'real estate ERP, construction management software, property booking CRM, builder billing software, project milestone tracking',
    schema: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Real Estate & Construction ERP",
      "provider": { "@type": "Organization", "name": "Vellko ERP", "url": "https://vellkoerp.com" },
      "description": "Property unit booking, construction milestones, and contractor billing."
    }
  },

  // 15. Service Business ERP
  '/service-business-erp': {
    title: 'ERP for Professional Services & Agencies | Vellko ERP',
    description: 'Timesheet tracking, milestone billing, contract management, resource scheduling and profitability analytics for service businesses.',
    keywords: 'service business ERP, agency management software, professional services automation, consultant billing ERP, timesheet software',
    schema: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Professional Service Business ERP",
      "provider": { "@type": "Organization", "name": "Vellko ERP", "url": "https://vellkoerp.com" },
      "description": "Client retainers, timesheet tracking, resource utilization, and billable hour invoicing."
    }
  },

  // 16. E-Commerce ERP
  '/ecommerce-erp': {
    title: 'E-Commerce ERP & Multi-Channel Inventory Integration | Vellko ERP',
    description: 'Sync Shopify, WooCommerce, Amazon orders and inventory automatically with financial accounts and shipping.',
    keywords: 'ecommerce ERP, Shopify ERP integration, multi-channel inventory sync, marketplace order management, automated ecommerce billing',
    schema: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "E-Commerce ERP Integration",
      "provider": { "@type": "Organization", "name": "Vellko ERP", "url": "https://vellkoerp.com" },
      "description": "Marketplace order management, inventory sync, and shipping integration."
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
