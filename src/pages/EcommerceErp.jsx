import IndustryPage from './IndustryPage';

export default function EcommerceErp() {
  const beyondFeaturesList = [
    "Product Information Management",
    "Inventory & Warehouse Management",
    "Order Management",
    "Customer Management (CRM)",
    "Sales & Payment Management",
    "Purchase & Supplier Management",
    "Marketplace Integration",
    "Reports & Business Analytics"
  ];

  return (
    <IndustryPage
      title="Manage Your E-Commerce Operations with"
      highlight="Complete Visibility"
      tagline="One E-Commerce Platform. Smarter Business Management."
      desc="Vellko ERP is a cloud-based E-commerce management system that integrates customers, orders, inventory sales, payments procuring, analytics, as well as other data onto one intelligent platform, assisting companies run their online operations with full control and effectiveness."
      beyondTitle="E-Commerce Management Shouldn't Be"
      beyondHighlight="Complicated"
      beyondSubCol1={
        <>
          <span className="red-highlight">The most successful businesses</span> struggle due to the fact that their e-commerce operations are scattered across various platforms, spreadsheets, markets, and payment gateways along with disconnected applications.
        </>
      }
      beyondSubCol2={
        <>
          <span className="red-highlight">Controlling inventory</span>, products, and orders, as well as suppliers, customers and sales by hand leads to delays, errors as well as missed chances.
        </>
      }
      beyondDesc="Vellko E-Commerce ERP centralizes your entire online business, streamlines everyday operations, and gives immediate insights that assist you in making faster and more informed decisions."
      beyondFeatures={beyondFeaturesList}
    />
  );
}
