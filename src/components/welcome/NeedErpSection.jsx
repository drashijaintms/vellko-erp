const needErpData = [
  { challenge: "Multiple software tools and disconnected data", solution: "Unifies all departments into one centralized platform" },
  { challenge: "Time-consuming manual processes", solution: "Automates repetitive tasks and workflows" },
  { challenge: "Delayed decisions due to outdated reports", solution: "Provides real-time dashboards and business insights" },
  { challenge: "Lack of visibility across operations", solution: "Offers complete control over every department" },
  { challenge: "Duplicate entries and human errors", solution: "Creates a single source of truth across the organization" },
  { challenge: "Poor collaboration between teams", solution: "Connects departments through streamlined workflows" },
  { challenge: "Data security and access concerns", solution: "Protects information with enterprise-grade security and role-based access" },
  { challenge: "Difficulty managing remote teams", solution: "Enables secure cloud access from anywhere" }
];

export default function NeedErpSection() {
  return (
    <section className="need-erp-section">
      
      <div className="need-centered-title-wrapper">
        <h2 className="need-centered-title">
          Why Businesses Need an <span className="red-highlight">ERP System</span>
        </h2>
      </div>

      {/* Table Card */}
      <div className="need-table-card">
        <table className="need-table">
          <thead>
            <tr>
              <th>Business Challenge</th>
              <th>How Vellko ERP Solves It</th>
            </tr>
          </thead>
          <tbody>
            {needErpData.map((item, idx) => (
              <tr key={idx}>
                <td>
                  <div className="need-cell-content">
                    <span className="need-cell-text">{item.challenge}</span>
                    <span className="need-icon-cross">✕</span>
                  </div>
                </td>
                <td>
                  <div className="need-cell-content">
                    <span className="need-cell-text">{item.solution}</span>
                    <span className="need-icon-check">✓</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </section>
  );
}
