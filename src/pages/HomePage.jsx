import { useEffect, useState } from 'react';
import { initHomeAnimations, cleanupHomeAnimations, initPageAnimations, cleanupPageAnimations, initGlobeAnimation } from '../legacy-logic';

export default function HomePage() {
  const [videoSrc, setVideoSrc] = useState('');
  const [globeLoaded, setGlobeLoaded] = useState(false);

  useEffect(() => {
    // Mount animations
    initHomeAnimations();
    initPageAnimations();

    // Delay video loading to prioritize initial page load rendering
    // Optimize URL with q_auto,f_auto for automatic format and quality compression
    const timer = setTimeout(() => {
      setVideoSrc('https://res.cloudinary.com/dpclwaw7u/video/upload/q_auto,f_auto/v1754383351/video_lm0obz.mp4');
    }, 1200);

    return () => {
      // Unmount cleanup
      cleanupHomeAnimations();
      cleanupPageAnimations();
      clearTimeout(timer);
    };
  }, []);

  // Lazy-load WebGL globe when #global-reach section is close to the viewport (350px margin)
  useEffect(() => {
    const target = document.getElementById('global-reach');
    if (!target) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setGlobeLoaded(true);
        observer.disconnect();
      }
    }, { rootMargin: '350px' });

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (globeLoaded) {
      initGlobeAnimation();
    }
  }, [globeLoaded]);

  return (
    <>
      {/* ═══════════════════════════════════════════════
         HERO SECTION
      ═══════════════════════════════════════════════ */}
      <section id="hero" aria-label="Hero — Opésh Overseas export house">
        <div className="hero-video-wrap" aria-hidden="true">
          <div className="hero-video-fallback" />
          <video autoPlay muted loop playsInline preload="none" aria-hidden="true">
            {videoSrc && <source src={videoSrc} type="video/mp4" />}
          </video>
        </div>
        
        <div className="hero-content">
          <div className="hero-glass-card">
            <div className="hero-badge" id="heroBadge">
              <span className="hero-badge-dot" aria-hidden="true" />
              Gurgaon, India &nbsp;·&nbsp; Exporting to 30+ Nations
            </div>
            
            <h1 className="hero-h1" id="heroH1">
              <span className="line-1">India's Premier</span>
              <span className="line-2"><em className="em-gold">B2B Sourcing</em></span>
              <span className="line-3">&amp; Global Export House</span>
            </h1>
          </div>
          
          <p className="hero-sub" id="heroSub">
            Direct-from-source procurement, strict compliance certification, and global logistics for premium Ayurvedic products, handcrafted textiles, and heritage artisanry.
          </p>
          
          <div className="hero-cats" id="heroCats">
            <span className="hero-cat ayurveda">
              <span className="hero-cat-dot" aria-hidden="true" />
              Ayurveda &amp; Herbal
            </span>
            <span className="hero-cat-sep" aria-hidden="true" />
            <span className="hero-cat handicraft">
              <span className="hero-cat-dot" aria-hidden="true" />
              Handcrafted Artisanry
            </span>
            <span className="hero-cat-sep" aria-hidden="true" />
            <span className="hero-cat textile">
              <span className="hero-cat-dot" aria-hidden="true" />
              Luxury Home Textiles
            </span>
          </div>
          
          <div className="hero-actions" id="heroActions">
            <a href="/products" className="btn-primary" aria-label="Request export product catalogs">
              Request B2B Catalog
              <svg viewBox="0 0 12 12" aria-hidden="true">
                <path d="M1 6h10M6 1l5 5-5 5" />
              </svg>
            </a>
            <a href="/contact" className="btn-ghost" aria-label="Send an export pricing enquiry">
              Request FOB Pricing
            </a>
          </div>
          
          <div className="hero-stats" id="heroStats" aria-label="Export statistics">
            <div className="stat-pill">
              <span className="stat-pill-num" data-counter={30} data-suffix="+" aria-label="30 plus countries">30+</span>
              <span className="stat-pill-label">Countries<br />Reached</span>
            </div>
            <div className="stat-pill">
              <span className="stat-pill-num" data-counter={3} data-suffix=" Sectors" aria-label="3 export sectors">3 Sectors</span>
              <span className="stat-pill-label">Premium<br />Categories</span>
            </div>
            <div className="stat-pill">
              <span className="stat-pill-num" data-counter={200} data-suffix="+" aria-label="200 plus SKUs">200+</span>
              <span className="stat-pill-label">Product<br />SKUs</span>
            </div>
            <div className="stat-pill">
              <span className="stat-pill-num" data-counter={100} data-suffix="%" aria-label="100 percent natural">100%</span>
              <span className="stat-pill-label">Natural<br />Sourced</span>
            </div>
          </div>
        </div>

        <div className="scroll-cue" id="scrollCue" aria-hidden="true">
          <span className="scroll-cue-label">Scroll</span>
          <div className="scroll-cue-track">
            <div className="scroll-cue-fill" />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
         ABOUT SECTION
      ═══════════════════════════════════════════════ */}
      <section id="about" aria-labelledby="about-heading">
        <div className="section-inner">
          <div className="about-grid">
            {/* LEFT: Text */}
            <div className="about-text">
              <div className="eyebrow" data-reveal="fade">Our Story</div>
              <h2 id="about-heading" data-reveal="up">
                India's Ancient<br />
                Craft Meets<br />
                <em className="em-gold">Global Standards</em>
              </h2>
              <div className="about-rule" data-reveal="fade" data-reveal-delay="0.15" />
              <p data-reveal="up" data-reveal-delay="0.1">
                Opésh Overseas is a Gurgaon-based premium export house founded
                on one conviction: that India's most extraordinary makers —
                Ayurvedic formulators, master weavers, and generational
                artisans — deserve direct access to the world's most
                discerning markets.
              </p>
              <p data-reveal="up" data-reveal-delay="0.2">
                We are not a trading company. We are curators, compliance
                specialists, and global connectors — bridging India's
                irreplaceable craft heritage with the documentation precision,
                regulatory knowledge, and logistics capability that serious
                international buyers require.
              </p>
              
              {/* Note: the about-inline-stats block is removed here as requested */}
              
              <div className="about-ctas" data-reveal="up" data-reveal-delay="0.3">
                <a href="/products" className="btn-primary">
                  Explore Products
                  <svg viewBox="0 0 12 12" aria-hidden="true" style={{width: 13, height: 13, stroke: 'var(--ink)', fill: 'none', strokeWidth: '2.5', strokeLinecap: 'round', strokeLinejoin: 'round'}}>
                    <path d="M1 6h10M6 1l5 5-5 5" />
                  </svg>
                </a>
                <a href="/about" className="btn-ghost">Why Partner With Us</a>
              </div>
            </div>

            {/* RIGHT: Visual */}
            <div className="about-visual" data-reveal="left" data-reveal-delay="0.15">
              <div className="about-img-frame">
                <div className="about-img-frame-corner about-img-frame-corner--tl" aria-hidden="true" />
                <div className="about-img-frame-corner about-img-frame-corner--br" aria-hidden="true" />
                <div className="about-img-fallback" aria-hidden="true">
                  <span className="about-img-fallback-icon">🇮🇳</span>
                  <p>From the Heart<br />of India</p>
                </div>
              </div>
              
              <div className="about-float-card about-float-card--tl" aria-hidden="true">
                <span className="about-float-card-icon">🌿</span>
                <div className="about-float-card-text">
                  <span className="about-float-card-num">WHO-GMP</span>
                  <span className="about-float-card-label">Certified</span>
                </div>
              </div>
              
              <div className="about-float-card about-float-card--br" aria-hidden="true">
                <span className="about-float-card-icon">🏭</span>
                <div className="about-float-card-text">
                  <span className="about-float-card-num">FSSAI</span>
                  <span className="about-float-card-label">Approved</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
         B2B OPERATIONAL PIPELINE
      ═══════════════════════════════════════════════ */}
      <section id="pipeline" aria-labelledby="pipeline-heading">
        <div className="section-inner">
          <div className="pipeline-header">
            <div className="eyebrow" data-reveal="fade">Operational Excellence</div>
            <h2 id="pipeline-heading" data-reveal="up">Our Supply Chain &amp; <em className="em-gold">Operational Pipeline</em></h2>
            <p className="pipeline-lead" data-reveal="up" data-reveal-delay="0.1">
              We manage the entire sourcing, quality audit, and global shipping lifecycle under standard CIF/FOB logistics terms.
            </p>
          </div>
          <div className="pipeline-grid">
            <div className="pipeline-step" data-reveal="up" data-reveal-delay="0.0">
              <div className="step-num">01</div>
              <h3>Direct Sourcing</h3>
              <p>Procured directly from audited organic farms, weaving clusters, and WHO-GMP laboratories across India.</p>
            </div>
            <div className="pipeline-step" data-reveal="up" data-reveal-delay="0.1">
              <div className="step-num">02</div>
              <h3>Lab Testing &amp; CoA</h3>
              <p>Rigorous chemical, safety, and heavy metal testing. Every single batch is issued a Certificate of Analysis.</p>
            </div>
            <div className="pipeline-step" data-reveal="up" data-reveal-delay="0.2">
              <div className="step-num">03</div>
              <h3>Export Packaging</h3>
              <p>High-end vacuum sealing, moisture-controlled palletization, and strict compliance labeling for international customs.</p>
            </div>
            <div className="pipeline-step" data-reveal="up" data-reveal-delay="0.3">
              <div className="step-num">04</div>
              <h3>Customs &amp; Freight</h3>
              <p>Coordination through Mundra and Nhava Sheva port gateways directly to your regional receiving ports.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
         QUALITY CERTIFICATIONS TRUST GRID
      ═══════════════════════════════════════════════ */}
      <section id="certs-grid" aria-labelledby="certs-grid-heading">
        <div className="section-inner">
          <div className="certs-header">
            <div className="eyebrow" data-reveal="fade">Global Standards</div>
            <h2 id="certs-grid-heading" data-reveal="up">Compliance &amp; <em className="em-gold">Quality Credentials</em></h2>
            <p className="certs-lead" data-reveal="up" data-reveal-delay="0.1">
              Every product category complies with international trade directives and quality certifications.
            </p>
          </div>
          <div className="certs-grid">
            <div className="cert-card" data-reveal="up" data-reveal-delay="0.0">
              <span className="cert-icon" aria-hidden="true">
                <svg viewBox="0 0 40 40" className="cert-svg" style={{ color: '#0f4c81' }}>
                  <path d="M12 8h16a4 4 0 0 1 4 4v16a4 4 0 0 1 -4 4h-16a4 4 0 0 1 -4 -4v-16a4 4 0 0 1 4 -4z" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  <circle cx="20" cy="17" r="5" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M20 10v2M20 22v2M13 17h2M25 17h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M15 12l1.5 1.5M23.5 20.5l1.5 1.5M15 22l1.5-1.5M23.5 13.5l1.5-1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <text x="20" y="30" textAnchor="middle" fontSize="4.2" fontWeight="bold" fill="currentColor" letterSpacing="0.8">MSME REG.</text>
                </svg>
              </span>
              <h3>MSME (Udyam) Registration</h3>
              <p>Government of India registered for credibility and business facilitation.</p>
            </div>
            
            <div className="cert-card" data-reveal="up" data-reveal-delay="0.1">
              <span className="cert-icon" aria-hidden="true">
                <svg viewBox="0 0 40 40" className="cert-svg" style={{ color: '#003399' }}>
                  <circle cx="20" cy="20" r="18" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  <ellipse cx="20" cy="20" rx="18" ry="6" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
                  <ellipse cx="20" cy="20" rx="6" ry="18" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
                  <path d="M10 20 A 10 10 0 0 1 30 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <polygon points="30,20 27,17 33,17" fill="currentColor" />
                  <text x="20" y="32" textAnchor="middle" fontSize="4.5" fontWeight="bold" fill="currentColor" letterSpacing="0.6">IEC TRADE</text>
                </svg>
              </span>
              <h3>Import Export Code (IEC)</h3>
              <p>Authorized for global trade, enabling smooth customs clearance.</p>
            </div>

            <div className="cert-card" data-reveal="up" data-reveal-delay="0.2">
              <span className="cert-icon" aria-hidden="true">
                <svg viewBox="0 0 40 40" className="cert-svg" style={{ color: '#2e7d32' }}>
                  <path d="M20 4 C28 4 34 8 34 16 C34 26 20 34 20 36 C20 34 6 26 6 16 C6 8 12 4 20 4 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M16 22c0-4 3-6 5-6s4 2 4 6c0 4-4 6-5 6s-4-2-4-6z" fill="currentColor" opacity="0.8" />
                  <text x="20" y="13" textAnchor="middle" fontSize="5.5" fontWeight="bold" fill="currentColor" letterSpacing="0.8">FSSAI</text>
                  <text x="20" y="30" textAnchor="middle" fontSize="3.8" fontWeight="bold" fill="currentColor" letterSpacing="0.4">COMPLIANT</text>
                </svg>
              </span>
              <h3>FSSAI Compliance</h3>
              <p>Products sourced from FSSAI-licensed and audited manufacturing facilities.</p>
            </div>

            <div className="cert-card" data-reveal="up" data-reveal-delay="0.3">
              <span className="cert-icon" aria-hidden="true">
                <svg viewBox="0 0 40 40" className="cert-svg" style={{ color: '#d84315' }}>
                  <rect x="5" y="5" width="30" height="30" rx="6" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M15 20v-3a5 5 0 0 1 10 0v3h1v8H14v-8h1zm2 0h6v-3a3 3 0 0 0-6 0v3z" fill="currentColor" opacity="0.8" />
                  <text x="20" y="31" textAnchor="middle" fontSize="4.2" fontWeight="bold" fill="currentColor" letterSpacing="0.5">SAN GOVT REG</text>
                </svg>
              </span>
              <h3>Sanstha Adhar No. (SAN)</h3>
              <p>Recognised and granted SAN by government.</p>
            </div>

            <div className="cert-card" data-reveal="up" data-reveal-delay="0.4">
              <span className="cert-icon" aria-hidden="true">
                <svg viewBox="0 0 40 40" className="cert-svg" style={{ color: '#0f4c81' }}>
                  <rect x="4" y="6" width="32" height="28" rx="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  <rect x="6" y="8" width="13" height="13" rx="2" fill="currentColor" opacity="0.9" />
                  <text x="12.5" y="17" textAnchor="middle" fontSize="6.5" fontWeight="900" fill="#ffffff">ISO</text>
                  <circle cx="27.5" cy="14.5" r="6.5" fill="#2e7d32" opacity="0.9" />
                  <text x="27.5" y="17" textAnchor="middle" fontSize="5.5" fontWeight="900" fill="#ffffff">GMP</text>
                  <text x="20" y="30" textAnchor="middle" fontSize="4.2" fontWeight="bold" fill="currentColor" letterSpacing="0.5">QUALITY CERTIFIED</text>
                </svg>
              </span>
              <h3>ISO 22000 &amp; GMP</h3>
              <p>Manufacturing partners operate in ISO 22000-certified and GMP-compliant units.</p>
            </div>

            <div className="cert-card" data-reveal="up" data-reveal-delay="0.5">
              <span className="cert-icon" aria-hidden="true">
                <svg viewBox="0 0 40 40" className="cert-svg" style={{ color: '#2e7d32' }}>
                  <path d="M20 4 L34 8 V18 C34 26 20 34 20 36 C20 34 6 26 6 18 V8 L20 4 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M14 20 l4 4 l9-9" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  <text x="20" y="13" textAnchor="middle" fontSize="5" fontWeight="black" fill="currentColor" letterSpacing="0.8">HACCP</text>
                  <text x="20" y="30" textAnchor="middle" fontSize="3.8" fontWeight="bold" fill="currentColor" letterSpacing="0.5">CERTIFIED</text>
                </svg>
              </span>
              <h3>HACCP</h3>
              <p>Hazard Analysis and Critical Control Points framework applied to ensure product safety.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
         GLOBAL REACH (Cinematic Pinned Globe Scene)
      ═══════════════════════════════════════════════ */}
      <section id="global-reach" aria-labelledby="gr-heading">
        <div className="gr-pin" id="grPin">
          <span className="gr-eyebrow" id="grEyebrow">Global Reach</span>
          <h2 className="gr-title" id="grTitle">From India, to the <em>world</em>.</h2>
          <div className="gr-stage">
            <div className="gr-globe-wrap" id="grGlobe">
              <div className="gr-globe-glow" aria-hidden="true" />
              <div className="gr-globe" id="grGlobeMount" aria-hidden="true" />
            </div>
          </div>
          
          <div className="gr-overlay" id="grOverlay" aria-hidden="true">
            <svg className="gr-lines" id="grLines" preserveAspectRatio="none">
              <defs>
                <linearGradient id="grGoldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#c9a14a" stopOpacity="0.15" />
                  <stop offset="50%" stopColor="#f0e4bf" stopOpacity={1} />
                  <stop offset="100%" stopColor="#c9a14a" stopOpacity="0.15" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="gr-cards" id="grCards" aria-label="Export categories">
            <article className="gr-card" data-card={1}>
              <div className="gr-card-ico" aria-hidden="true">🌿</div>
              <h3>Ayurvedic &amp; Herbal</h3>
              <div className="gr-card-rule" />
              <p>GMP, ISO and AYUSH-aligned formulations — single herbs, classical blends, oils and wellness powders shipped from certified Indian facilities.</p>
            </article>
            <article className="gr-card" data-card={2}>
              <div className="gr-card-ico" aria-hidden="true">🎨</div>
              <h3>Handcrafted Artisanry</h3>
              <div className="gr-card-rule" />
              <p>Master-crafted brass, wood, marble and papier-mâché objects from India's heritage clusters — export-graded, packaged for premium retail.</p>
            </article>
            <article className="gr-card" data-card={3}>
              <div className="gr-card-ico" aria-hidden="true">🧵</div>
              <h3>Luxury Home Textiles</h3>
              <div className="gr-card-rule" />
              <p>Pashmina, pure cottons, handlooms and Kashmiri weaves — woven for hospitality brands, boutique retailers and discerning private clients.</p>
            </article>
          </div>

          <p className="gr-sub" id="grSub">A premium Indian export house delivering Ayurvedic, organic botanical, and luxury textile goods through Mundra and Nhava Sheva port gateways to international distribution hubs.</p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
         MARQUEE TICKER
      ═══════════════════════════════════════════════ */}
      <div id="ticker" aria-label="Export certifications and destinations" role="marquee">
        <div className="ticker-row ticker-row--left" aria-hidden="true">
          <span className="ticker-item"><span className="ticker-item-icon">✅</span>WHO-GMP Certified</span>
          <span className="ticker-item"><span className="ticker-item-icon">🇮🇳</span>FSSAI Approved</span>
          <span className="ticker-item"><span className="ticker-item-icon">📋</span>ISO 9001:2015</span>
          <span className="ticker-item"><span className="ticker-item-icon">🌙</span>Halal Certified</span>
          <span className="ticker-item"><span className="ticker-item-icon">🌿</span>NPOP Organic</span>
          <span className="ticker-item"><span className="ticker-item-icon">📦</span>Export-Ready Documentation</span>
          <span className="ticker-item"><span className="ticker-item-icon">🏭</span>GMP Manufacturing</span>
          <span className="ticker-item"><span className="ticker-item-icon">🔬</span>Third-Party Lab Tested</span>
          <span className="ticker-item"><span className="ticker-item-icon">✡️</span>Kosher Compliant</span>
          <span className="ticker-item"><span className="ticker-item-icon">♻️</span>Sustainably Sourced</span>
          {/* Duplicate set for loop */}
          <span className="ticker-item"><span className="ticker-item-icon">✅</span>WHO-GMP Certified</span>
          <span className="ticker-item"><span className="ticker-item-icon">🇮🇳</span>FSSAI Approved</span>
          <span className="ticker-item"><span className="ticker-item-icon">📋</span>ISO 9001:2015</span>
          <span className="ticker-item"><span className="ticker-item-icon">🌙</span>Halal Certified</span>
          <span className="ticker-item"><span className="ticker-item-icon">🌿</span>NPOP Organic</span>
          <span className="ticker-item"><span className="ticker-item-icon">📦</span>Export-Ready Documentation</span>
          <span className="ticker-item"><span className="ticker-item-icon">🏭</span>GMP Manufacturing</span>
          <span className="ticker-item"><span className="ticker-item-icon">🔬</span>Third-Party Lab Tested</span>
          <span className="ticker-item"><span className="ticker-item-icon">✡️</span>Kosher Compliant</span>
          <span className="ticker-item"><span className="ticker-item-icon">♻️</span>Sustainably Sourced</span>
        </div>
        
        <div className="ticker-row ticker-row--right" aria-hidden="true">
          <span className="ticker-item"><span className="ticker-item-icon">🇺🇸</span>United States</span>
          <span className="ticker-item"><span className="ticker-item-icon">🇬🇧</span>United Kingdom</span>
          <span className="ticker-item"><span className="ticker-item-icon">🇩🇪</span>Germany</span>
          <span className="ticker-item"><span className="ticker-item-icon">🇦🇪</span>UAE</span>
          <span className="ticker-item"><span className="ticker-item-icon">🇸🇬</span>Singapore</span>
          <span className="ticker-item"><span className="ticker-item-icon">🇦🇺</span>Australia</span>
          <span className="ticker-item"><span className="ticker-item-icon">🇨🇦</span>Canada</span>
          <span className="ticker-item"><span className="ticker-item-icon">🇯🇵</span>Japan</span>
          <span className="ticker-item"><span className="ticker-item-icon">🇳🇱</span>Netherlands</span>
          <span className="ticker-item"><span className="ticker-item-icon">🇫🇷</span>France</span>
          <span className="ticker-item"><span className="ticker-item-icon">🇸🇦</span>Saudi Arabia</span>
          <span className="ticker-item"><span className="ticker-item-icon">🇰🇷</span>South Korea</span>
          {/* Duplicate set for loop */}
          <span className="ticker-item"><span className="ticker-item-icon">🇺🇸</span>United States</span>
          <span className="ticker-item"><span className="ticker-item-icon">🇬🇧</span>United Kingdom</span>
          <span className="ticker-item"><span className="ticker-item-icon">🇩🇪</span>Germany</span>
          <span className="ticker-item"><span className="ticker-item-icon">🇦🇪</span>UAE</span>
          <span className="ticker-item"><span className="ticker-item-icon">🇸🇬</span>Singapore</span>
          <span className="ticker-item"><span className="ticker-item-icon">🇦🇺</span>Australia</span>
          <span className="ticker-item"><span className="ticker-item-icon">🇨🇦</span>Canada</span>
          <span className="ticker-item"><span className="ticker-item-icon">🇯🇵</span>Japan</span>
          <span className="ticker-item"><span className="ticker-item-icon">🇳🇱</span>Netherlands</span>
          <span className="ticker-item"><span className="ticker-item-icon">🇫🇷</span>France</span>
          <span className="ticker-item"><span className="ticker-item-icon">🇸🇦</span>Saudi Arabia</span>
          <span className="ticker-item"><span className="ticker-item-icon">🇰🇷</span>South Korea</span>
        </div>
      </div>
    </>
  );
}
