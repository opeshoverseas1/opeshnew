import React, { useEffect } from 'react';
import { initPageAnimations, cleanupPageAnimations } from '../legacy-logic';

export default function AboutPage() {
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
          <span className="eyebrow">Corporate Profile</span>
          <h1>Bridging Heritage &amp; <em className="em-gold">Global Trade</em></h1>
          <p className="page-header-lead">
            Opésh Overseas is India's premium export partner, connecting local excellence in Ayurveda, heritage crafts, and textiles with global enterprises.
          </p>
        </div>
      </header>

      {/* ── Our Story ── */}
      <section className="about-details" aria-labelledby="story-heading">
        <div className="section-inner">
          <div className="about-story-grid">
            <div className="about-story-text" data-reveal="up">
              <span className="sub-eyebrow">Who We Are</span>
              <h2 id="story-heading">Uncompromising Sourcing &amp; Compliance</h2>
              <div className="accent-rule" />
              <p>
                Founded in Gurgaon, Haryana, Opésh Overseas was born out of a commitment to resolve the fundamental gap in international trade: access to India's finest producers with the corporate compliance and logistical precision expected by international buyers.
              </p>
              <p>
                We do not operate as standard brokers. We act as curators, laboratory auditors, and logistics specialists. By establishing direct relationships with organic cultivators, weaving clusters, and WHO-GMP manufacturing labs, we guarantee quality transparency from soil to delivery port.
              </p>
            </div>
            
            <div className="about-story-visual" data-reveal="left" data-reveal-delay="0.15">
              <div className="story-image-wrap">
                <div className="corner-decor top-left" />
                <div className="corner-decor bottom-right" />
                <div className="story-fallback-visual">
                  <span className="visual-logo">Opésh</span>
                  <span className="visual-tagline">Quality First Sourcing</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Vision & Mission ── */}
      <section className="about-mission" aria-label="Vision and Mission">
        <div className="section-inner">
          <div className="mission-grid">
            <div className="pillar-card" data-reveal="up" data-reveal-delay="0.0">
              <span className="pillar-ico">👁️</span>
              <h3>Our Vision</h3>
              <p>
                To be the world’s most trusted gatekeeper of premium Indian goods, recognized for elevating heritage workmanship and natural sciences into global market standouts through absolute documentation transparency.
              </p>
            </div>
            
            <div className="pillar-card" data-reveal="up" data-reveal-delay="0.1">
              <span className="pillar-ico">🎯</span>
              <h3>Our Mission</h3>
              <p>
                To provide international enterprise buyers with direct procurement options, absolute certification security, and end-to-end shipping efficiency, while supporting local artisanal and agrarian communities in India.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Core Values ── */}
      <section className="about-values" aria-labelledby="values-heading">
        <div className="section-inner">
          <div className="centered-header">
            <span className="eyebrow" data-reveal="fade">Operational Foundations</span>
            <h2 id="values-heading" data-reveal="up">Guided by Unyielding Principles</h2>
          </div>
          
          <div className="values-grid">
            <div className="value-card" data-reveal="up" data-reveal-delay="0.0">
              <div className="value-num">01</div>
              <h4>Batch Transparency</h4>
              <p>
                Every botanical sample is chemically audited. We provide complete Batch Certificates of Analysis (CoAs) and Material Safety Data Sheets (MSDS) so you know exactly what is in your container.
              </p>
            </div>

            <div className="value-card" data-reveal="up" data-reveal-delay="0.1">
              <div className="value-num">02</div>
              <h4>Direct-to-Source Ethics</h4>
              <p>
                We bypass aggregators. By buying directly from organic growers, weaver councils, and small-batch heritage workshops, we ensure fair trade compensation and optimal quality management.
              </p>
            </div>

            <div className="value-card" data-reveal="up" data-reveal-delay="0.2">
              <div className="value-num">03</div>
              <h4>Absolute Compliance</h4>
              <p>
                From customs declarations to sanitary and phytosanitary certificates, our documentation is checked by specialized trade compliance professionals before vessel loading.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Infrastructure & Labs ── */}
      <section className="about-infrastructure" aria-labelledby="infra-heading">
        <div className="section-inner">
          <div className="infra-grid">
            <div className="infra-visual" data-reveal="right">
              <div className="infra-fallback">
                <span className="infra-icon">🏭</span>
                <span className="infra-label">Gurgaon Sourcing &amp; Logistics Hub</span>
              </div>
            </div>
            
            <div className="infra-text" data-reveal="up" data-reveal-delay="0.15">
              <span className="sub-eyebrow">Our Facilities</span>
              <h2 id="infra-heading">Audited Facilities &amp; Warehouse Operations</h2>
              <div className="accent-rule" />
              <p>
                Our head office and centralized export packaging facility are located in Gurgaon, Haryana, offering direct connectivity to transit lanes leading to India's major shipping hubs.
              </p>
              <ul>
                <li>
                  <strong>Audited Packaging Facility:</strong> Climate-controlled warehousing to safeguard organic herbal products and high-grade luxury textiles.
                </li>
                <li>
                  <strong>Lab Collaboration:</strong> Partnerships with independent NABL-accredited labs to test for heavy metals, microbial count, and pesticide residues.
                </li>
                <li>
                  <strong>Port Gateways:</strong> Seamless container transfer logistics to Mundra Port (Gujarat) and Nhava Sheva (Jawaharlal Nehru Port Trust, Maharashtra).
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Leadership ── */}
      <section className="about-leadership" aria-labelledby="leader-heading">
        <div className="section-inner">
          <div className="centered-header">
            <span className="eyebrow" data-reveal="fade">Leadership</span>
            <h2 id="leader-heading" data-reveal="up">Corporate Leadership</h2>
          </div>

          <div className="leader-profile" data-reveal="up" data-reveal-delay="0.1">
            <div className="leader-avatar">
              <span className="leader-initial">OS</span>
            </div>
            <div className="leader-info">
              <h3>Mr Pavitra Sharma</h3>
              <span className="leader-title">Founder &amp; Managing Director</span>
              <p className="leader-bio">
                Believing that Indian businesses deserve a stronger presence on the global stage, Mr Pavitra Sharma founded Opésh Overseas with the ambition of building a world-class export enterprise. The company is guided by principles of quality, professionalism, and enduring client relationships, serving international markets with confidence and integrity.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
