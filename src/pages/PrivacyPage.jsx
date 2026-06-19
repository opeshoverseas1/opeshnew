import React, { useEffect } from 'react';
import { initPageAnimations, cleanupPageAnimations } from '../legacy-logic';

export default function PrivacyPage() {
  useEffect(() => {
    initPageAnimations();
    return () => {
      cleanupPageAnimations();
    };
  }, []);

  return (
    <div className="subpage-wrapper">
      {/* ── Page Header ── */}
      <header className="page-header" data-reveal="fade">
        <div className="section-inner">
          <span className="eyebrow">Data Protection</span>
          <h1>Privacy <em className="em-gold">Policy</em></h1>
          <p className="page-header-lead">
            How Opésh Overseas collects, secures, and handles corporate client and inquiry data in compliance with global standards.
          </p>
        </div>
      </header>

      {/* ── Privacy Details ── */}
      <section className="privacy-section" aria-labelledby="privacy-content-heading">
        <div className="section-inner" style={{ maxWidth: '880px' }}>
          <div className="privacy-content" data-reveal="up" style={{ lineHeight: '1.8', color: 'var(--text-secondary)' }}>
            <h2 id="privacy-content-heading" style={{ color: 'var(--text-primary)', marginTop: '2.5rem', marginBottom: '1rem', fontWeight: '400' }}>1. Corporate Privacy Commitment</h2>
            <p>
              At Opésh Overseas, we respect the privacy of our corporate buyers, suppliers, and visitors. This Privacy Policy details our data practices regarding business inquiry details, target order volumes, destination ports, and contact information collected through our online portal.
            </p>

            <h2 style={{ color: 'var(--text-primary)', marginTop: '2.5rem', marginBottom: '1rem', fontWeight: '400' }}>2. Information We Collect</h2>
            <p>
              When you submit a B2B quote request or pricing enquiry, we collect standard corporate operational data, including:
            </p>
            <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem', listStyle: 'disc' }}>
              <li><strong>Contact Metadata:</strong> Name, business email address, corporate telephone number, and business name.</li>
              <li><strong>Inquiry Parameters:</strong> Selected product category, estimated monthly purchase volume, target destination port, and desired Incoterm (FOB or CIF).</li>
              <li><strong>Technical Identifiers:</strong> IP address, device type, browser metadata, and navigation metrics via cookies to enhance search speeds.</li>
            </ul>

            <h2 style={{ color: 'var(--text-primary)', marginTop: '2.5rem', marginBottom: '1rem', fontWeight: '400' }}>3. How We Use Your Data</h2>
            <p>
              We process B2B inquiry data solely for commercial and compliance purposes:
            </p>
            <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem', listStyle: 'disc' }}>
              <li>To issue formal FOB/CIF price lists and proforma invoices.</li>
              <li>To verify compliance requirements against local trade embargoes or phytosanitary import barriers.</li>
              <li>To coordinate sea or air freight cargo bookings with our logistics partners.</li>
              <li>To manage customer relationship history and improve our trade interface.</li>
            </ul>

            <h2 style={{ color: 'var(--text-primary)', marginTop: '2.5rem', marginBottom: '1rem', fontWeight: '400' }}>4. Data Sharing and Protection</h2>
            <p>
              Opésh Overseas does not sell, rent, or trade business contact databases to third parties. We share transaction details only with accredited customs clearing house agents, maritime shipping lines, and laboratory audit offices to compile mandatory export dossiers. All data is protected on secure servers with encrypted storage protocols.
            </p>

            <h2 style={{ color: 'var(--text-primary)', marginTop: '2.5rem', marginBottom: '1rem', fontWeight: '400' }}>5. International Compliance</h2>
            <p>
              As a global exporter, we align our data policies to international guidelines, including the EU General Data Protection Regulation (GDPR) and the California Consumer Privacy Act (CCPA) for business representatives. You retain the right to access, rectify, or request deletion of your corporate contact details from our active communication records at any time.
            </p>

            <p style={{ marginTop: '3.5rem', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              Last Updated: June 18, 2026. If you have requests regarding database records, please contact our data manager at <a href="mailto:info@opeshoverseas.com" style={{ color: 'var(--gold)' }}>info@opeshoverseas.com</a>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
