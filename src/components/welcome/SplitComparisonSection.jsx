import splitIllustration from '../../assets/images/split-illustration.png';

export default function SplitComparisonSection() {
  return (
    <section className="split-comparison-section">
      
      {/* Top Centered Split Heading */}
      <div className="split-comp-header-wrapper">
        <h2 className="split-comp-title">
          <span className="split-title-left">One Platform.</span>
          <span className="split-title-right">Every Department.</span>
        </h2>
        <p className="split-comp-desc-row">
          <span className="split-desc-left">Eliminate disconnected tools and manage</span>
          <span className="split-desc-right">your entire business from a single cloud-based platform.</span>
        </p>
      </div>

      {/* 3-Column Split Content Container */}
      <div className="split-comp-container">
        
        {/* Left Column: Traditional ERP */}
        <div className="split-comp-col left-col">
          <div className="comp-list-wrap">
            <h3 className="col-title text-white">Traditional ERP</h3>
            <ul className="comp-item-list text-white">
              <li>Multiple disconnected tools</li>
              <li>Complex implementation</li>
              <li>Limited visibility</li>
              <li>Real-time dashboards</li>
              <li>Difficult to scale</li>
              <li>High maintenance costs</li>
              <li>Generic workflows</li>
            </ul>
          </div>
        </div>

        {/* Middle Column: Center Illustration */}
        <div className="split-comp-col center-col">
          <img src={splitIllustration} alt="Vellko ERP biometric attendance integration for payroll" className="split-comp-illustration" />
        </div>

        {/* Right Column: Vellko ERP */}
        <div className="split-comp-col right-col">
          <div className="comp-list-wrap">
            <h3 className="col-title text-red">Vellko ERP</h3>
            <ul className="comp-item-list text-red-lines">
              <li>Unified all-in-one platform</li>
              <li>Fast deployment</li>
              <li>Real-time dashboards</li>
              <li>Intelligent automation</li>
              <li>Flexible and scalable</li>
              <li>Cloud-based and cost-efficient</li>
              <li>Customizable for every industry</li>
            </ul>
          </div>
        </div>

      </div>

    </section>
  );
}
