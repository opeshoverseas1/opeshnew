import React, { useState, useEffect } from 'react';
import { initPageAnimations, cleanupPageAnimations } from '../legacy-logic';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    businessEmail: '',
    companyName: '',
    country: '',
    sector: 'herbal',
    targetProduct: '',
    orderVolume: 'under_500kg',
    destinationPort: '',
    incoterm: 'fob',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [refNumber, setRefNumber] = useState('');

  useEffect(() => {
    initPageAnimations();

    // Check if there's a product in the query parameters of the hash route
    const hashParts = window.location.hash.split('?');
    if (hashParts.length > 1) {
      const searchParams = new URLSearchParams(hashParts[1]);
      const product = searchParams.get('product');
      if (product) {
        setFormData(prev => ({
          ...prev,
          targetProduct: decodeURIComponent(product),
          sector: product.toLowerCase().includes('pashmina') || product.toLowerCase().includes('cotton') || product.toLowerCase().includes('throw') ? 'textile' :
                  product.toLowerCase().includes('brass') || product.toLowerCase().includes('marble') || product.toLowerCase().includes('carved') ? 'handicraft' : 'herbal'
        }));
      }
    }

    return () => {
      cleanupPageAnimations();
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Formspree Sourcing Form Endpoint (register at formspree.io to change this)
    const FORMSPREE_ENDPOINT = "https://formspree.io/f/xknagwov";

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          _subject: `New B2B Sourcing Enquiry: ${formData.fullName} - ${formData.companyName}`
        })
      });

      if (response.ok) {
        // Generate a random B2B reference number
        const randHex = Math.random().toString(16).substring(2, 6).toUpperCase();
        const year = new Date().getFullYear();
        setRefNumber(`OPE-EXP-${year}-${randHex}`);
        setIsSuccess(true);
        
        // Scroll back up to contact heading smoothly
        const el = document.getElementById('contact-heading');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else {
        alert("We encountered an issue sending your inquiry. Please try again or email us directly at info@opeshoverseas.com");
      }
    } catch (err) {
      console.error("Formspree submit error:", err);
      alert("Network error. Please check your internet connection or email us directly at info@opeshoverseas.com");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="subpage-wrapper">
      {/* ── Page Header ── */}
      <header className="page-header" data-reveal="fade">
        <div className="section-inner">
          <span className="eyebrow">Export Enquiry</span>
          <h1>Initiate B2B <em className="em-gold">Procurement</em></h1>
          <p className="page-header-lead">
            Submit your material requirements, packaging specifications, and target destination port. Our Gurgaon-based trade managers will draft a preliminary FOB/CIF quote.
          </p>
        </div>
      </header>

      {/* ── Contact Content ── */}
      <section className="contact-section" aria-labelledby="contact-heading">
        <div className="section-inner">
          <div className="contact-grid">
            {/* LEFT Column: B2B Form or Success Screen */}
            <div className="contact-form-wrap" data-reveal="up">
              <h2 id="contact-heading" className="sr-only">B2B Enquiry Form</h2>

              {isSuccess ? (
                <div className="form-success-box">
                  <div className="success-icon" aria-hidden="true">✓</div>
                  <h3>Enquiry Submitted Successfully</h3>
                  <div className="accent-rule" style={{ margin: '1rem auto' }} />
                  <p>
                    Thank you for contacting Opésh Overseas. Your export inquiry has been registered in our B2B procurement network.
                  </p>
                  
                  <div className="ref-badge">
                    <span className="ref-label">Quote Reference Number</span>
                    <span className="ref-val">{refNumber}</span>
                  </div>

                  <p className="success-notice">
                    A dedicated trade compliance manager from our Gurgaon headquarters will review your specifications and contact you at <strong>{formData.businessEmail}</strong> within 1 business day (24 hours) with standard FOB/CIF estimations.
                  </p>

                  <button 
                    onClick={() => {
                      setIsSuccess(false);
                      setFormData({
                        fullName: '',
                        businessEmail: '',
                        companyName: '',
                        country: '',
                        sector: 'herbal',
                        targetProduct: '',
                        orderVolume: 'under_500kg',
                        destinationPort: '',
                        incoterm: 'fob',
                        message: ''
                      });
                    }}
                    className="btn-primary"
                  >
                    Submit Another Enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="form-title">Send Export Specification</div>
                  
                  {/* Row 1 */}
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="fullName">Full Name *</label>
                      <input 
                        type="text" 
                        id="fullName" 
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required 
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="businessEmail">Business Email *</label>
                      <input 
                        type="email" 
                        id="businessEmail" 
                        name="businessEmail"
                        value={formData.businessEmail}
                        onChange={handleChange}
                        required 
                        placeholder="buyer@enterprise.com"
                      />
                    </div>
                  </div>

                  {/* Row 2 */}
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="companyName">Company Name *</label>
                      <input 
                        type="text" 
                        id="companyName" 
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        required 
                        placeholder="Enterprise LLC"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="country">Target Destination Country *</label>
                      <input 
                        type="text" 
                        id="country" 
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        required 
                        placeholder="United States"
                      />
                    </div>
                  </div>

                  {/* Row 3 */}
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="sector">Product Category *</label>
                      <select 
                        id="sector" 
                        name="sector" 
                        value={formData.sector} 
                        onChange={handleChange}
                      >
                        <option value="herbal">🌿 Ayurveda &amp; Herbal</option>
                        <option value="handicraft">🏺 Handcrafted Artisanry</option>
                        <option value="textile">🧵 Luxury Home Textiles</option>
                        <option value="custom">🔍 Custom Sourcing</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="targetProduct">Specific Product Name / SKU</label>
                      <input 
                        type="text" 
                        id="targetProduct" 
                        name="targetProduct"
                        value={formData.targetProduct}
                        onChange={handleChange}
                        placeholder="e.g. Ashwagandha Powder, Pashmina Shawl"
                      />
                    </div>
                  </div>

                  {/* Row 4 */}
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="orderVolume">Est. Annual Order Volume</label>
                      <select 
                        id="orderVolume" 
                        name="orderVolume" 
                        value={formData.orderVolume} 
                        onChange={handleChange}
                      >
                        <option value="under_500kg">Less than 500 kg / 100 Units</option>
                        <option value="500kg_2t">500 kg to 2 Metric Tons</option>
                        <option value="2t_10t">2 Tons to 10 Metric Tons</option>
                        <option value="over_10t">10+ Metric Tons / FCL Containers</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="destinationPort">Destination Port of Entry</label>
                      <input 
                        type="text" 
                        id="destinationPort" 
                        name="destinationPort"
                        value={formData.destinationPort}
                        onChange={handleChange}
                        placeholder="e.g. Port of New York, Jebel Ali"
                      />
                    </div>
                  </div>

                  {/* Row 5 */}
                  <div className="form-group">
                    <label htmlFor="incoterm">Preferred Incoterm</label>
                    <select 
                      id="incoterm" 
                      name="incoterm" 
                      value={formData.incoterm} 
                      onChange={handleChange}
                    >
                      <option value="fob">FOB (Free On Board) — Port Mundra / Nhava Sheva</option>
                      <option value="cif">CIF (Cost, Insurance &amp; Freight) — Destination Port</option>
                      <option value="exw">Ex-Works (Ex-Warehouse Gurgaon)</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div className="form-group">
                    <label htmlFor="message">Specification Message (Audits, packaging, assay, etc.) *</label>
                    <textarea 
                      id="message" 
                      name="message" 
                      value={formData.message}
                      onChange={handleChange}
                      rows="5" 
                      required 
                      placeholder="Please describe custom assay requirements, testing standards, packaging weights, or delivery timeline constraints..."
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="btn-primary" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="submit-loader">Generating Reference...</span>
                    ) : (
                      <>
                        Submit Export Enquiry
                        <svg viewBox="0 0 12 12" aria-hidden="true" style={{ width: 12, height: 12, marginLeft: 8 }}>
                          <path d="M1 6h10M6 1l5 5-5 5" />
                        </svg>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* RIGHT Column: Direct Contacts */}
            <div className="contact-details-wrap" data-reveal="left" data-reveal-delay="0.15">
              <div className="contact-details-box">
                <span className="sub-eyebrow">Head Office Details</span>
                <h2>Opésh Overseas</h2>
                <div className="accent-rule" />
                
                <p className="contact-desc">
                  For administrative matters, direct audits, or custom sourcing contract queries, reach our corporate team in Gurgaon.
                </p>

                <div className="contact-info-list">
                  <div className="contact-info-item">
                    <span className="info-icon">📍</span>
                    <div>
                      <strong>Corporate Headquarters:</strong>
                      <p>Sector 45, Gurgaon, Haryana - 122003, India</p>
                    </div>
                  </div>

                  <div className="contact-info-item">
                    <span className="info-icon">✉️</span>
                    <div>
                      <strong>General Inquiries:</strong>
                      <p><a href="mailto:info@opeshoverseas.com">info@opeshoverseas.com</a></p>
                    </div>
                  </div>

                  <div className="contact-info-item">
                    <span className="info-icon">💼</span>
                    <div>
                      <strong>B2B Sales Department:</strong>
                      <p><a href="mailto:sales@opeshoverseas.com">sales@opeshoverseas.com</a></p>
                    </div>
                  </div>

                  <div className="contact-info-item">
                    <span className="info-icon">📞</span>
                    <div>
                      <strong>Direct Sourcing Hotline:</strong>
                      <p><a href="tel:+917976529421">+91 79765 29421</a></p>
                    </div>
                  </div>

                  <div className="contact-info-item">
                    <span className="info-icon">💬</span>
                    <div>
                      <strong>WhatsApp Business:</strong>
                      <p><a href="https://wa.me/917976529421" target="_blank" rel="noopener noreferrer">+91 79765 29421</a></p>
                    </div>
                  </div>

                  <div className="contact-info-item">
                    <span className="info-icon">🕒</span>
                    <div>
                      <strong>Working Hours:</strong>
                      <p>09:00 - 18:00 IST | Monday to Saturday</p>
                      <p className="note-text">Visits or warehouse audits by prior appointment only.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Google Maps Office Location ── */}
      <section className="contact-map-section" data-reveal="up">
        <div className="section-inner" style={{ paddingTop: 0, paddingBottom: '5rem' }}>
          <div className="map-title-area" style={{ marginBottom: '2rem' }}>
            <span className="eyebrow">Location Map</span>
            <h2 style={{ fontSize: '2rem', fontWeight: 300, color: 'var(--text-primary)' }}>Corporate &amp; Sourcing Office</h2>
            <div className="accent-rule" style={{ width: 60, height: 1, background: 'linear-gradient(90deg, var(--gold), transparent)', margin: '1rem 0' }} />
          </div>
          <div className="map-container" style={{ position: 'relative', width: '100%', overflow: 'hidden', borderRadius: 12, border: '1px solid rgba(201, 168, 76, 0.15)', boxShadow: 'var(--shadow-deep)' }}>
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14032.551717887754!2d77.0601956553878!3d28.445250488421882!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d18e24c43c22f%3A0xe212879555776d33!2sSector%2045%2C%20Gurugram%2C%20Haryana%20122003!5e0!3m2!1sen!2sin!4v1718873000000!5m2!1sen!2sin" 
              width="100%" 
              height="400" 
              style={{ border: 0, display: 'block' }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Opésh Overseas Gurgaon Office Location"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
