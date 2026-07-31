import globeGif from '../../assets/images/globe.gif';
import manufacturingGif from '../../assets/images/manufacturing.gif';
import retailGif from '../../assets/images/retail.gif';
import distributionGif from '../../assets/images/distribution.gif';
import healthcareGif from '../../assets/images/healthcare.gif';
import educationGif from '../../assets/images/education.gif';
import realEstateGif from '../../assets/images/real-estate.gif';
import servicesGif from '../../assets/images/services.gif';
import ecommerceGif from '../../assets/images/ecommerce.gif';

const industriesData = [
  {
    title: "Manufacturing",
    desc: "Optimize production planning, procurement, inventory and shop-floor operations.",
    icon: <img src={manufacturingGif} alt="Manufacturing" className="industry-gif-icon" />
  },
  {
    title: "Retail",
    desc: "Unify inventory, billing, customer management and multi-store operations.",
    icon: <img src={retailGif} alt="Retail" className="industry-gif-icon" />
  },
  {
    title: "Distribution",
    desc: "Streamline logistics, warehouse management, procurement and stock movement.",
    icon: <img src={distributionGif} alt="Distribution" className="industry-gif-icon" />
  },
  {
    title: "Healthcare",
    desc: "Simplify administration, finance, inventory, HR and operational workflows.",
    icon: <img src={healthcareGif} alt="Healthcare" className="industry-gif-icon" />
  },
  {
    title: "Education",
    desc: "Manage admissions, attendance, payroll, fees and administrative processes.",
    icon: <img src={educationGif} alt="Education" className="industry-gif-icon" />
  },
  {
    title: "Real Estate",
    desc: "Track projects, finances, resources and customer relationships in one place.",
    icon: <img src={realEstateGif} alt="Real Estate" className="industry-gif-icon" />
  },
  {
    title: "Professional Services",
    desc: "Improve project delivery, resource utilization and team collaboration.",
    icon: <img src={servicesGif} alt="Professional Services" className="industry-gif-icon" />
  },
  {
    title: "E-Commerce",
    desc: "Synchronize orders, inventory, customers and business operations seamlessly.",
    icon: <img src={ecommerceGif} alt="E-Commerce" className="industry-gif-icon" />
  }
];

export default function IndustrySection() {
  return (
    <section className="industry-section">
      {/* Globe is absolutely positioned in the background */}
      <div className="industry-globe-wrapper">
        <img src={globeGif} alt="Rotating Globe" className="industry-globe-img" />
      </div>

      <div className="industry-container-centered">
        <h2 className="industry-title-centered">
          Every Industry Has Different Challenges. <span className="red-highlight">Every Business Deserves the Same Visibility.</span>
        </h2>

        <p className="industry-subtitle-centered">
          Synchronize orders, inventory, customers and business operations seamlessly. Your business is unique. Your ERP should be too.
        </p>

        <div className="industry-cards-grid-centered">
          {industriesData.map((item, idx) => (
            <div className="industry-card" key={idx}>
              <div className="industry-card-icon-circle">
                {item.icon}
              </div>
              <h3 className="industry-card-title">{item.title}</h3>
              <p className="industry-card-desc">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="industry-bottom-content-centered">
          <p className="industry-bottom-p1-centered">
            Businesses rarely struggle because they lack information. They struggle because information is scattered across different tools, departments and people. When nobody sees the complete picture, decisions become slower, errors increase and growth becomes difficult to manage.
          </p>
          <p className="industry-bottom-p2-centered">
            <span className="red-highlight">Vellko ERP</span> creates a single source of truth, giving every department access to the same accurate information at the right time.
          </p>

          <div className="industry-bottom-actions-centered">
            <button className="industry-btn-filled">Explore Your Industry Solution</button>
            <button className="industry-btn-outline">Get Started</button>
          </div>
        </div>
      </div>
    </section>
  );
}
