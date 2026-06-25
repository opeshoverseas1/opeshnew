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
      <section className="careers-apply-section" aria-labelledby="apply-heading">
        <div className="section-inner">
          <div className="centered-header">
            <span className="eyebrow" data-reveal="fade">Join Us</span>
            <h2 id="apply-heading" data-reveal="up">Application &amp; Selection Process</h2>
            <p className="pipeline-lead" data-reveal="up" data-reveal-delay="0.1">
              Our recruitment process is designed to find individuals who resonate with our values of transparency, diligence, and global trade excellence.
            </p>
          </div>

          {/* Step Timeline */}
          <div className="apply-steps-grid" data-reveal="up" data-reveal-delay="0.15">
            <div className="apply-step-card">
              <div className="step-num">01</div>
              <h3>Explore Roles</h3>
              <p>Review our active openings above or submit a speculative application. Pinpoint where your skills align with our supply chain or international accounts team.</p>
            </div>
            
            <div className="apply-step-card">
              <div className="step-num">02</div>
              <h3>Prepare Submission</h3>
              <p>Ensure your CV highlights relevant certifications, language skills, operational expertise, or experience with B2B trade platforms and tools.</p>
            </div>

            <div className="apply-step-card">
              <div className="step-num">03</div>
              <h3>Submit Profile</h3>
              <p>Email your documents directly to our HR desk. Every profile is manually evaluated by our team, and we aim to follow up within 5 business days.</p>
            </div>
          </div>

          {/* Action Box */}
          <div className="apply-action-box" data-reveal="up" data-reveal-delay="0.25">
            <div className="action-box-content">
              <h3>Start Your Journey With Opésh Overseas</h3>
              <p>
                Please email your CV/Resume along with a brief introductory cover letter to our recruitment desk. Mention the desired role in the subject line.
              </p>
              
              <div className="email-cta-wrap">
                <a href="mailto:info@opeshoverseas.com" className="apply-email-btn">
                  <span className="btn-text">info@opeshoverseas.com</span>
                  <span className="btn-icon">
                    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 14, height: 14 }}>
                      <path d="M1 3h14M1 3v10a1 1 0 001 1h12a1 1 0 001-1V3M1 3l7 5.5L15 3" />
                    </svg>
                  </span>
                </a>
              </div>
              <span className="apply-action-note">
                Direct Application Portal &bull; Response within 5 business days
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
