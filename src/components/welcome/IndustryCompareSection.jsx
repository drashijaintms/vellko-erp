export default function IndustryCompareSection({ title, highlight, sub1, sub2, headerLeft, headerRight, rows }) {
  if (!rows || rows.length === 0) return null;

  return (
    <section className="need-erp-section">
      <div className="need-centered-title-wrapper">
        <h2 className="need-centered-title">
          {title} {highlight && <span className="red-highlight">{highlight}</span>}
        </h2>
        {sub1 && (
          <p className="all-in-one-p1" style={{ maxWidth: '800px', margin: '1rem auto 0.5rem auto', textAlign: 'center' }}>
            {sub1}
          </p>
        )}
        {sub2 && (
          <p className="all-in-one-p2" style={{ maxWidth: '800px', margin: '0 auto 2rem auto', textAlign: 'center' }}>
            {sub2}
          </p>
        )}
      </div>

      {/* Table Card */}
      <div className="need-table-card">
        <table className="need-table">
          <thead>
            <tr>
              <th>{headerLeft}</th>
              <th>{headerRight}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((item, idx) => (
              <tr key={idx}>
                <td>
                  <div className="need-cell-content">
                    <span className="need-cell-text">{item.left}</span>
                    <span className="need-icon-cross">✕</span>
                  </div>
                </td>
                <td>
                  <div className="need-cell-content">
                    <span className="need-cell-text">{item.right}</span>
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
