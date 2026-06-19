import React, { useEffect } from 'react';
import { initPageAnimations, cleanupPageAnimations } from '../legacy-logic';

export default function TermsPage() {
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
          <span className="eyebrow">Legal Framework</span>
          <h1>Terms &amp; <em className="em-gold">Conditions</em></h1>
          <p className="page-header-lead">
            These terms govern all B2B export contracts, quotations, and shipments facilitated by Opésh Overseas.
          </p>
        </div>
      </header>

      {/* ── Terms Details ── */}
      <section className="terms-section" aria-labelledby="terms-content-heading">
        <div className="section-inner" style={{ maxWidth: '880px' }}>
          <div className="terms-content" data-reveal="up" style={{ lineHeight: '1.8', color: 'var(--text-secondary)' }}>
            <h2 id="terms-content-heading" style={{ color: 'var(--text-primary)', marginTop: '2.5rem', marginBottom: '1rem', fontWeight: '400' }}>1. Scope of Agreement</h2>
            <p>
              These Terms and Conditions apply to all international trade inquiries, quotations, proforma invoices, and export contracts executed between Opésh Overseas ("the Company") and the overseas buyer ("the Client"). By requesting a B2B quotation or issuing a Purchase Order, the Client agrees to be bound by these Terms.
            </p>

            <h2 style={{ color: 'var(--text-primary)', marginTop: '2.5rem', marginBottom: '1rem', fontWeight: '400' }}>2. Quotations and Pricing</h2>
            <p>
              All prices offered by the Company are denominated in USD (United States Dollars) unless explicitly stated otherwise. Quotes are issued on either a FOB (Free on Board, Indian Port) or CIF (Cost, Insurance &amp; Freight, Destination Port) basis in accordance with Incoterms 2020. Quotations remain valid for thirty (30) days from the date of issue due to market fluctuations in freight rates and botanical raw materials.
            </p>

            <h2 style={{ color: 'var(--text-primary)', marginTop: '2.5rem', marginBottom: '1rem', fontWeight: '400' }}>3. Payment Terms</h2>
            <p>
              Unless otherwise negotiated and approved in writing by our corporate finance department, standard payment terms for B2B export transactions are:
            </p>
            <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem', listStyle: 'disc' }}>
              <li><strong>30% Advance T/T (Telegraphic Transfer)</strong> upon execution of the proforma invoice.</li>
              <li><strong>70% Balance T/T</strong> payable against the presentation of scanned original shipping documents (including the Bill of Lading, Certificate of Origin, and Lab CoA).</li>
              <li>Confirmed, Irrevocable Letters of Credit (L/C) payable at sight are accepted for transaction values exceeding USD 50,000, subject to bank pre-approval.</li>
            </ul>

            <h2 style={{ color: 'var(--text-primary)', marginTop: '2.5rem', marginBottom: '1rem', fontWeight: '400' }}>4. Quality and Batch Certifications</h2>
            <p>
              The Company guarantees that all botanical extracts, Ayurvedic products, and textiles supplied conform to the specifications listed in the corresponding Batch Certificate of Analysis (CoA) and product technical sheets. The Client is responsible for verifying import compliance rules under their domestic regulatory authorities (e.g., FDA, EFSA, etc.) prior to shipment.
            </p>

            <h2 style={{ color: 'var(--text-primary)', marginTop: '2.5rem', marginBottom: '1rem', fontWeight: '400' }}>5. Shipping and Delivery</h2>
            <p>
              Estimated lead times and delivery schedules are provided in good faith but are subject to customs processing timelines, vessel space availability, and global shipping constraints. The Company is not liable for demurrage fees or customs inspection delays at the port of destination. Risk of loss passes to the Client in accordance with the agreed Incoterms.
            </p>

            <h2 style={{ color: 'var(--text-primary)', marginTop: '2.5rem', marginBottom: '1rem', fontWeight: '400' }}>6. Governing Law and Jurisdiction</h2>
            <p>
              These Terms and Conditions and all commercial transactions thereunder shall be governed by and construed in accordance with the laws of India. Any disputes arising out of or in connection with shipments or contracts shall be subject to the exclusive jurisdiction of the competent courts in Gurgaon, Haryana, India.
            </p>

            <p style={{ marginTop: '3.5rem', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              Last Updated: June 18, 2026. For questions regarding our export framework, please contact our compliance department at <a href="mailto:info@opeshoverseas.com" style={{ color: 'var(--gold)' }}>info@opeshoverseas.com</a>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
