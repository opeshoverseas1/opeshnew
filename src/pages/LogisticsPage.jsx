import { useEffect } from 'react';
import { initPageAnimations, cleanupPageAnimations } from '../legacy-logic';

export default function LogisticsPage() {
  useEffect(() => {
    initPageAnimations();
    return () => {
      cleanupPageAnimations();
    };
  }, []);

  const docs = [
    { name: 'Commercial Invoice', description: 'Detailed B2B invoice matching custom declarations for tariff verification.' },
    { name: 'Packing List (PL)', description: 'Itemized box-by-box net and gross weights, dimension sheets, and packaging types.' },
    { name: 'Bill of Lading (B/L) / AWB', description: 'Negotiable and non-negotiable ocean bills of lading or express airway bills.' },
    { name: 'Certificate of Origin (CoO)', description: 'Issued by the Indian Chamber of Commerce to support preferential tariff claims.' },
    { name: 'Phytosanitary Certificate', description: 'Mandatory plant health certificates issued by Government of India for all agricultural exports.' },
    { name: 'Batch CoA & MSDS', description: 'Batch-specific chemical test reports and Material Safety Data Sheets for botanical extracts.' }
  ];

  const lanes = [
    { region: 'North America (East Coast)', ocean: '28 - 34 Days', air: '3 - 5 Days', port: 'Port of New York / Port of Savannah' },
    { region: 'North America (West Coast)', ocean: '35 - 42 Days', air: '4 - 6 Days', port: 'Port of Los Angeles / Port of Seattle' },
    { region: 'Western Europe', ocean: '21 - 26 Days', air: '2 - 4 Days', port: 'Rotterdam Hub / Port of Felixstowe' },
    { region: 'Middle East', ocean: '6 - 9 Days', air: '1 - 2 Days', port: 'Jebel Ali Port / Port of Dammam' },
    { region: 'Southeast Asia', ocean: '10 - 14 Days', air: '2 - 3 Days', port: 'Singapore Cargo Hub / Port of Klang' },
    { region: 'Australia & NZ', ocean: '24 - 30 Days', air: '3 - 5 Days', port: 'Port of Sydney / Port of Auckland' }
  ];

  return (
    <div className="subpage-wrapper">
      {/* ── Page Header ── */}
      <header className="page-header" data-reveal="fade">
        <div className="section-inner">
          <span className="eyebrow">Logistics &amp; Supply Chain</span>
          <h1>Precision Sourcing, Secure <em className="em-gold">Transit</em></h1>
          <p className="page-header-lead">
            Opésh Overseas coordinates global freight logistics, container packaging, custom clearance declarations, and multi-port shipping lanes under standardized commercial Incoterms.
          </p>
        </div>
      </header>

      {/* ── Incoterms & Packaging ── */}
      <section className="logistics-incoterms" aria-labelledby="terms-heading">
        <div className="section-inner">
          <div className="logistics-grid">
            <div className="logistics-text" data-reveal="up">
              <span className="sub-eyebrow">FOB &amp; CIF Delivery Terms</span>
              <h2 id="terms-heading">Logistical Incoterms We Support</h2>
              <div className="accent-rule" />
              <p>
                We execute export operations under standardized global trade definitions. Depending on your corporate procurement mandate, we operate under:
              </p>
              <ul>
                <li>
                  <strong>FOB (Free On Board):</strong> We clear goods for export and load them onto the vessel at your nominated Indian port (Mundra or Nhava Sheva). Freight and insurance are managed by your cargo agent.
                </li>
                <li>
                  <strong>CIF (Cost, Insurance &amp; Freight):</strong> We arrange ocean freight and cargo insurance directly to your destination port of entry, managing the entire transit risk until the vessel berths.
                </li>
                <li>
                  <strong>CFR &amp; DAP:</strong> Custom shipping terms are available for accredited volume distribution buyers upon credit verification.
                </li>
              </ul>
            </div>

            <div className="logistics-visual" data-reveal="left" data-reveal-delay="0.15">
              <div className="logistics-fallback">
                <span className="fallback-title">Export Packaging Standards</span>
                <ul>
                  <li>🔒 Vacuum Heat-Sealed Foil Liners</li>
                  <li>📦 Heavy-Duty 5-Ply Corrugated Cartons</li>
                  <li>🪵 ISPM-15 Heat-Treated Wooden Pallets</li>
                  <li>🛡️ Dessicant Gel Bags for Humidity Control</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Documentation ── */}
      <section className="logistics-docs" aria-labelledby="docs-heading">
        <div className="section-inner">
          <div className="centered-header">
            <span className="eyebrow" data-reveal="fade">Customs Compliance</span>
            <h2 id="docs-heading" data-reveal="up">Documentation Issued Per Shipment</h2>
            <p className="pipeline-lead" data-reveal="up" data-reveal-delay="0.1">
              Every container leaves port with a complete documentation envelope to ensure smooth clearance through destination customs.
            </p>
          </div>

          <div className="docs-grid">
            {docs.map((doc, index) => (
              <div key={index} className="logistics-card" data-reveal="up" data-reveal-delay={(index % 3) * 0.06}>
                <h4>{doc.name}</h4>
                <div className="accent-rule" />
                <p>{doc.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Port Gateways ── */}
      <section className="logistics-ports" aria-labelledby="ports-heading">
        <div className="section-inner">
          <div className="centered-header">
            <span className="eyebrow" data-reveal="fade">Port Gateways</span>
            <h2 id="ports-heading" data-reveal="up">Major Sea &amp; Air Cargo Port Gateways</h2>
          </div>

          <div className="ports-grid">
            <div className="pillar-card" data-reveal="up" data-reveal-delay="0.0">
              <span className="pillar-ico">⚓</span>
              <h3>Mundra Port (INMUN)</h3>
              <span className="port-tag">Gujarat Gateway</span>
              <p>
                India's largest private commercial port, equipped with state-of-the-art container terminals, refrigerated container plugs, and swift vessel turnaround lanes. Our primary gateway for shipments to the Americas and Western Europe.
              </p>
            </div>

            <div className="pillar-card" data-reveal="up" data-reveal-delay="0.1">
              <span className="pillar-ico">🛳️</span>
              <h3>Nhava Sheva JNPT (INNSA)</h3>
              <span className="port-tag">JNPT Gateway, Mumbai</span>
              <p>
                The primary ocean cargo port for Western India, handling extensive container frequencies to the Middle East, Southeast Asia, and Australia. Offers excellent customs processing and freight forwarding networks.
              </p>
            </div>

            <div className="pillar-card" data-reveal="up" data-reveal-delay="0.2">
              <span className="pillar-ico">✈️</span>
              <h3>IGI Cargo Terminal (INDEL)</h3>
              <span className="port-tag">New Delhi Air Cargo Gateway</span>
              <p>
                Located close to our Delhi corporate desk. Ideal for high-value organic essential oils, luxury Pashmina shawls, and premium samples requiring express delivery within 48 to 72 hours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Transit Times Table ── */}
      <section className="logistics-lanes" aria-labelledby="lanes-heading">
        <div className="section-inner">
          <div className="centered-header">
            <span className="eyebrow" data-reveal="fade">Shipping Timelines</span>
            <h2 id="lanes-heading" data-reveal="up">Estimated Transit Times</h2>
          </div>

          <div className="table-responsive" data-reveal="up" data-reveal-delay="0.1">
            <table className="transit-table">
              <thead>
                <tr>
                  <th>Destination Region</th>
                  <th>Ocean Freight (Transit)</th>
                  <th>Air Freight (Transit)</th>
                  <th>Primary Entry Ports</th>
                </tr>
              </thead>
              <tbody>
                {lanes.map((lane, index) => (
                  <tr key={index}>
                    <td><strong>{lane.region}</strong></td>
                    <td>{lane.ocean}</td>
                    <td>{lane.air}</td>
                    <td>{lane.port}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
