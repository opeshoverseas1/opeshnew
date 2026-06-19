import React, { useEffect } from 'react';
import { initPageAnimations, cleanupPageAnimations } from '../legacy-logic';

export default function CompliancePage() {
  useEffect(() => {
    initPageAnimations();
    return () => {
      cleanupPageAnimations();
    };
  }, []);

  const certs = [
    {
      title: 'MSME (Udyam) Registration',
      subtitle: 'Ministry of MSME, Govt of India',
      description: 'Opésh Overseas is officially registered under the Government of India\'s Micro, Small & Medium Enterprises (Udyam) framework, providing verified credibility and enabling business facilitation benefits.',
      icon: (
        <svg viewBox="0 0 40 40" className="cert-svg" style={{ color: '#0f4c81' }}>
          <path d="M12 8h16a4 4 0 0 1 4 4v16a4 4 0 0 1 -4 4h-16a4 4 0 0 1 -4 -4v-16a4 4 0 0 1 4 -4z" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="20" cy="17" r="5" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M20 10v2M20 22v2M13 17h2M25 17h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M15 12l1.5 1.5M23.5 20.5l1.5 1.5M15 22l1.5-1.5M23.5 13.5l1.5-1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <text x="20" y="30" textAnchor="middle" fontSize="4.2" fontWeight="bold" fill="currentColor" letterSpacing="0.8">MSME REG.</text>
        </svg>
      )
    },
    {
      title: 'Import Export Code (IEC)',
      subtitle: 'Directorate General of Foreign Trade',
      description: 'Authorized by the Ministry of Commerce & Industry, Government of India, for active global trade operations, enabling seamless customs clearances across air, sea, and land ports.',
      icon: (
        <svg viewBox="0 0 40 40" className="cert-svg" style={{ color: '#003399' }}>
          <circle cx="20" cy="20" r="18" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <ellipse cx="20" cy="20" rx="18" ry="6" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
          <ellipse cx="20" cy="20" rx="6" ry="18" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
          <path d="M10 20 A 10 10 0 0 1 30 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <polygon points="30,20 27,17 33,17" fill="currentColor" />
          <text x="20" y="32" textAnchor="middle" fontSize="4.5" fontWeight="bold" fill="currentColor" letterSpacing="0.6">IEC TRADE</text>
        </svg>
      )
    },
    {
      title: 'FSSAI Compliance',
      subtitle: 'Food Safety Standards Authority of India',
      description: 'All food-grade and agricultural export products are sourced strictly from FSSAI-licensed and audited manufacturing units, ensuring full adherence to India\'s safety and hygiene protocols.',
      icon: (
        <svg viewBox="0 0 40 40" className="cert-svg" style={{ color: '#2e7d32' }}>
          <path d="M20 4 C28 4 34 8 34 16 C34 26 20 34 20 36 C20 34 6 26 6 16 C6 8 12 4 20 4 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M16 22c0-4 3-6 5-6s4 2 4 6c0 4-4 6-5 6s-4-2-4-6z" fill="currentColor" opacity="0.8" />
          <text x="20" y="13" textAnchor="middle" fontSize="5.5" fontWeight="bold" fill="currentColor" letterSpacing="0.8">FSSAI</text>
          <text x="20" y="30" textAnchor="middle" fontSize="3.8" fontWeight="bold" fill="currentColor" letterSpacing="0.4">COMPLIANT</text>
        </svg>
      )
    },
    {
      title: 'Sanstha Adhar No. (SAN)',
      subtitle: 'Government Recognised & Granted Registration',
      description: 'Officially granted a Sanstha Adhar Number (SAN) by the government, validating our corporate registration, B2B business status, and corporate eligibility for national export trade.',
      icon: (
        <svg viewBox="0 0 40 40" className="cert-svg" style={{ color: '#d84315' }}>
          <rect x="5" y="5" width="30" height="30" rx="6" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M15 20v-3a5 5 0 0 1 10 0v3h1v8H14v-8h1zm2 0h6v-3a3 3 0 0 0-6 0v3z" fill="currentColor" opacity="0.8" />
          <text x="20" y="31" textAnchor="middle" fontSize="4.2" fontWeight="bold" fill="currentColor" letterSpacing="0.5">SAN GOVT REG</text>
        </svg>
      )
    },
    {
      title: 'ISO 22000 & GMP',
      subtitle: 'International Standards Organization',
      description: 'Our core botanical extraction and food processing manufacturing partners operate in certified ISO 22000 food safety management facilities and strictly GMP-compliant operational environments.',
      icon: (
        <svg viewBox="0 0 40 40" className="cert-svg" style={{ color: '#0f4c81' }}>
          <rect x="4" y="6" width="32" height="28" rx="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <rect x="6" y="8" width="13" height="13" rx="2" fill="currentColor" opacity="0.9" />
          <text x="12.5" y="17" textAnchor="middle" fontSize="6.5" fontWeight="900" fill="#ffffff">ISO</text>
          <circle cx="27.5" cy="14.5" r="6.5" fill="#2e7d32" opacity="0.9" />
          <text x="27.5" y="17" textAnchor="middle" fontSize="5.5" fontWeight="900" fill="#ffffff">GMP</text>
          <text x="20" y="30" textAnchor="middle" fontSize="4.2" fontWeight="bold" fill="currentColor" letterSpacing="0.5">QUALITY CERTIFIED</text>
        </svg>
      )
    },
    {
      title: 'HACCP',
      subtitle: 'Hazard Analysis Critical Control Point',
      description: 'Hazard Analysis and Critical Control Points safety protocols are strictly applied across manufacturing, packaging, and handling pipelines to ensure maximum biological and chemical product safety.',
      icon: (
        <svg viewBox="0 0 40 40" className="cert-svg" style={{ color: '#2e7d32' }}>
          <path d="M20 4 L34 8 V18 C34 26 20 34 20 36 C20 34 6 26 6 18 V8 L20 4 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M14 20 l4 4 l9-9" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <text x="20" y="13" textAnchor="middle" fontSize="5" fontWeight="black" fill="currentColor" letterSpacing="0.8">HACCP</text>
          <text x="20" y="30" textAnchor="middle" fontSize="3.8" fontWeight="bold" fill="currentColor" letterSpacing="0.5">CERTIFIED</text>
        </svg>
      )
    },
    {
      title: 'NPOP Organic Certificate',
      subtitle: 'National Programme for Organic Production',
      description: 'Sourced from certified organic agricultural farms in India. Every shipment of botanical powders conforms to strict soil audits, pesticide-free cultivation, and chemical-free processing guidelines.',
      icon: (
        <svg viewBox="0 0 40 40" className="cert-svg" style={{ color: '#2e7d32' }}>
          <circle cx="20" cy="20" r="18" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M12 24c0-5 3-9 8-10c0 0-2 4-1 7c1 2 3 4 4 6c1 2-2 2-3 2c-2 0-5-2-6-3z" fill="currentColor" opacity="0.8" />
          <text x="20" y="32" textAnchor="middle" fontSize="4.2" fontWeight="bold" fill="currentColor" letterSpacing="0.5">NPOP ORGANIC</text>
        </svg>
      )
    },
    {
      title: 'Batch CoAs & MSDS',
      subtitle: 'NABL Accredited Laboratory Reports',
      description: 'We issue complete Material Safety Data Sheets (MSDS) and batch-specific Certificates of Analysis (CoAs) from NABL-accredited third-party laboratories detailing heavy metals, mold, and assay values.',
      icon: (
        <svg viewBox="0 0 40 40" className="cert-svg" style={{ color: '#c62828' }}>
          <rect x="5" y="5" width="30" height="30" rx="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M12 13h16M12 18h16M12 23h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="26" cy="24" r="4" fill="currentColor" opacity="0.8" />
          <path d="M24 24l1.5 1.5l2.5-2.5" stroke="#ffffff" strokeWidth="1" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    },
    {
      title: 'Halal & Kosher Sourced',
      subtitle: 'Cultural & Dietary Suitability',
      description: 'Our botanical and agricultural raw products conform to kosher and halal purity requirements, ensuring suitability for global distribution in major Middle-Eastern, US, and EU wellness markets.',
      icon: (
        <svg viewBox="0 0 40 40" className="cert-svg" style={{ color: '#0f4c81' }}>
          <circle cx="20" cy="20" r="18" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M9 20h22" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
          <text x="14" y="17" textAnchor="middle" fontSize="5" fontWeight="bold" fill="#2e7d32">HALAL</text>
          <text x="26" y="17" textAnchor="middle" fontSize="5" fontWeight="bold" fill="#0f4c81">KOSHER</text>
          <text x="20" y="27" textAnchor="middle" fontSize="4" fontWeight="bold" fill="currentColor" letterSpacing="0.3">DIETARY COMPLIANT</text>
        </svg>
      )
    }
  ];

  return (
    <div className="subpage-wrapper">
      {/* ── Page Header ── */}
      <header className="page-header" data-reveal="fade">
        <div className="section-inner">
          <span className="eyebrow">Quality &amp; Compliance</span>
          <h1>Uncompromising Global <em className="em-gold">Standards</em></h1>
          <p className="page-header-lead">
            In B2B trade, documentation is as vital as the product. Opésh Overseas implements rigorous multi-stage checks to ensure standard conformity across global custom checkpoints.
          </p>
        </div>
      </header>

      {/* ── Certifications Detail Grid ── */}
      <section className="compliance-certs" aria-labelledby="certs-heading">
        <div className="section-inner">
          <div className="centered-header">
            <span className="eyebrow" data-reveal="fade">Export Licenses</span>
            <h2 id="certs-heading" data-reveal="up">Our Quality Credentials</h2>
          </div>

          <div className="compliance-grid">
            {certs.map((c, index) => (
              <article key={index} className="compliance-card" data-reveal="up" data-reveal-delay={(index % 2) * 0.08}>
                <div className="compliance-card-header">
                  <span className="compliance-icon-wrap" aria-hidden="true">{c.icon}</span>
                  <div>
                    <h3>{c.title}</h3>
                    <span className="compliance-subtitle">{c.subtitle}</span>
                  </div>
                </div>
                <div className="accent-rule" />
                <p>{c.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Quality Assurance Timeline ── */}
      <section className="qa-process" aria-labelledby="qa-heading">
        <div className="section-inner">
          <div className="centered-header">
            <span className="eyebrow" data-reveal="fade">Inspection Flow</span>
            <h2 id="qa-heading" data-reveal="up">Laboratory Quality Assurance Pipeline</h2>
            <p className="pipeline-lead" data-reveal="up" data-reveal-delay="0.1">
              Every container we ship passes through a strict 5-stage check to verify chemical purity and structural grade.
            </p>
          </div>

          <div className="qa-timeline">
            <div className="qa-timeline-step" data-reveal="up" data-reveal-delay="0.0">
              <div className="qa-step-num">01</div>
              <div className="qa-step-content">
                <h3>Sourcing Quality Audit</h3>
                <p>
                  Before harvest or manufacturing orders are finalized, we extract pre-shipment samples directly from the farmer or laboratory facility for preliminary chemical/mesh auditing.
                </p>
              </div>
            </div>

            <div className="qa-timeline-step" data-reveal="up" data-reveal-delay="0.1">
              <div className="qa-step-num">02</div>
              <div className="qa-step-content">
                <h3>In-Process Quality Control (IPQC)</h3>
                <p>
                  During processing, we monitor moisture levels in botanical materials, thread count in textiles, and protective lacquer thickness on brass/wood objects.
                </p>
              </div>
            </div>

            <div className="qa-timeline-step" data-reveal="up" data-reveal-delay="0.2">
              <div className="qa-step-num">03</div>
              <div className="qa-step-content">
                <h3>Third-Party Lab Analysis</h3>
                <p>
                  Samples from every finished batch are dispatched to independent NABL-accredited labs for analysis of heavy metals, microbial content, and pesticide residues. The batch is approved only upon issuance of a clean CoA.
                </p>
              </div>
            </div>

            <div className="qa-timeline-step" data-reveal="up" data-reveal-delay="0.3">
              <div className="qa-step-num">04</div>
              <div className="qa-step-content">
                <h3>Climate-Controlled Packaging</h3>
                <p>
                  Approved batches are packed in moisture-barrier vacuum seals or double LDPE food-grade drums inside our Gurgaon hub, preventing transport degradation.
                </p>
              </div>
            </div>

            <div className="qa-timeline-step" data-reveal="up" data-reveal-delay="0.4">
              <div className="qa-step-num">05</div>
              <div className="qa-step-content">
                <h3>Pre-Shipment Inspection &amp; Loading</h3>
                <p>
                  Prior to container sealing at custom ports (Mundra/Nhava Sheva), a final random audit verifies box counts, compliance labels, and shipping markings.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
