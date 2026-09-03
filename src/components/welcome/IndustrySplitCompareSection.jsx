import splitIllustration from '../../assets/images/split-illustration.png';

export default function IndustrySplitCompareSection({ 
  titleLeft, titleRight, descLeft, descRight, headerLeft, headerRight, leftList, rightList, customClass, illustrationAlt 
}) {
  if (!leftList || leftList.length === 0) return null;

  return (
    <section className={customClass || 'split-comparison-section'}>
      {/* Top Centered Split Heading */}
      <div className="split-comp-header-wrapper">
        <h2 className="split-comp-title">
          <span className="split-title-left">{titleLeft}</span>
          <span className="split-title-right">{titleRight}</span>
        </h2>
        {(descLeft || descRight) && (
          <p className="split-comp-desc-row">
            <span className="split-desc-left">{descLeft}</span>
            <span className="split-desc-right">{descRight}</span>
          </p>
        )}
      </div>

      {/* 3-Column Split Content Container */}
      <div className="split-comp-container">
        
        {/* Left Column */}
        <div className="split-comp-col left-col">
          <div className="comp-list-wrap">
            <h3 className="col-title text-white">{headerLeft}</h3>
            <ul className="comp-item-list text-white">
              {leftList.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Middle Column */}
        <div className="split-comp-col center-col">
          <img src={splitIllustration} alt={illustrationAlt || "Platform Comparison Illustration"} className="split-comp-illustration" />
        </div>

        {/* Right Column */}
        <div className="split-comp-col right-col">
          <div className="comp-list-wrap">
            <h3 className="col-title text-red">{headerRight}</h3>
            <ul className="comp-item-list text-red-lines">
              {rightList.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
}
