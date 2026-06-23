import { useEffect } from 'react';
import { initPageAnimations, cleanupPageAnimations } from '../legacy-logic';

export default function CareersPage() {
  useEffect(() => {
    initPageAnimations();
    return () => {
      cleanupPageAnimations();
    };
  }, []);

  const positions = [
    {
      title: 'Sourcing & Quality Assurance Specialist',
      department: 'Procurement',
      location: 'Bhilwara / Rajasthan clusters + Sourcing travel',
      type: 'Full-Time',
      description: 'Responsible for visiting partnered farms, evaluating harvesting standards, drawing pre-shipment botanical samples, and auditing clean processing lines.'
    },
    {
      title: 'B2B International Sales Manager',
      department: 'Global Accounts',
      location: 'Delhi Office',
      type: 'Full-Time',
      description: 'Manage relations with bulk international accounts, coordinate contract requirements, handle quotation requests (FOB/CIF terms), and secure new purchase agreements.'
    },
    {
      title: 'Global Logistics & Customs Specialist',
      department: 'Supply Chain Operations',
      location: 'Delhi Office / Bhilwara Hub',
      type: 'Full-Time',
      description: 'Oversee booking shipping lanes, generating customs documentation (CoO, Phytosanitary certificates, MSDS), and coordinating loading at Mundra/Nhava Sheva ports.'
    },
    {
      title: 'Digital Marketing & Content Intern',
      department: 'Marketing & Communications',
      location: 'Delhi Office / Hybrid',
      type: 'Internship',
      description: 'Coordinate B2B digital campaigns, design product brochures, create updates for social media channels, and manage professional LinkedIn content.'
    },
    {
      title: 'Export Operations & Documentation Intern',
      department: 'Supply Chain Operations',
      location: 'Delhi Office / Hybrid',
      type: 'Internship',
      description: 'Assist in drafting essential international trade documents, including Proforma Invoices, Commercial Invoices, and Packing Lists, while supporting global shipping coordination.'
    },
    {
      title: 'International B2B Sales Intern',
      department: 'Global Accounts',
      location: 'Delhi Office / Hybrid',
      type: 'Internship',
      description: 'Support international market research, qualify inbound buyer leads, draft export quotation sheets, and assist with client communications for global trade accounts.'
    }
  ];

  return (
    <div className="subpage-wrapper">
      {/* ── Page Header ── */}
      <header className="page-header" data-reveal="fade">
        <div className="section-inner">
          <span className="eyebrow">Careers</span>
          <h1>Join Our Global <em className="em-gold">Mission</em></h1>
          <p className="page-header-lead">
            Help us bridge India's premium heritage crops, handcrafted textile wonders, and artisanal creations with quality-focused buyers around the world.
          </p>
        </div>
      </header>

      {/* ── Open Positions List ── */}
      <section className="careers-positions" aria-labelledby="careers-heading">
        <div className="section-inner">
          <div className="centered-header">
            <span className="eyebrow" data-reveal="fade">Opportunities</span>
            <h2 id="careers-heading" data-reveal="up">Current Openings</h2>
            <p className="pipeline-lead" data-reveal="up" data-reveal-delay="0.1">
              We look for individuals passionate about trade precision, supply chain reliability, and authentic Indian craft.
            </p>
          </div>

          <div className="products-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            {positions.map((p, index) => (
              <article key={index} className="product-card" data-reveal="up" data-reveal-delay={index * 0.1} style={{ background: 'linear-gradient(180deg, rgba(20, 34, 58, 0.38) 0%, rgba(10, 22, 40, 0.22) 100%)', border: '1px solid rgba(232, 201, 122, 0.12)', padding: '2rem', borderRadius: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <div>
                    <span style={{ fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold, #c9a14a)', display: 'block', marginBottom: '0.4rem' }}>{p.department}</span>
                    <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-display)', color: 'var(--text-primary)', fontWeight: 'normal', margin: 0 }}>{p.title}</h3>
                  </div>
                </div>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.6', margin: '0 0 1.5rem 0' }}>{p.description}</p>
                <div style={{ display: 'flex', gap: '1rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  <span>📍 {p.location}</span>
                  <span>💼 {p.type}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── How to Apply ── */}
      <section className="careers-apply" style={{ borderTop: '1px solid rgba(232, 201, 122, 0.08)', padding: '5rem 0' }} aria-labelledby="apply-heading">
        <div className="section-inner">
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto' }}>
            <h2 id="apply-heading" className="form-title" style={{ borderBottom: 'none', paddingBottom: 0, marginBottom: '1rem' }}>How to Join Our Team</h2>
            <p className="success-notice" style={{ marginBottom: '2rem' }}>
              We value hands-on operational excellence, communication skills, and absolute professional integrity. 
            </p>
            <div className="ref-badge" style={{ display: 'inline-flex', margin: '0 0 2rem 0' }}>
              <span className="ref-label">Application Process</span>
              <span className="ref-val">Email Your CV / Resume</span>
            </div>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-primary)', margin: '0 0 0.5rem 0' }}>
              Send your application directly to:
            </p>
            <p style={{ fontSize: '1.4rem', color: 'var(--gold, #c9a14a)', fontWeight: '600', margin: 0 }}>
              <a href="mailto:info@opeshoverseas.com" style={{ textDecoration: 'none' }}>info@opeshoverseas.com</a>
            </p>
            <p className="note-text" style={{ marginTop: '1.5rem' }}>
              Please mention the role you are applying for in the email subject line (e.g. "Application for Sourcing Specialist").
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
