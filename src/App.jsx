import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { initGlobals } from './legacy-logic';
import './index.css';
import './App.css';

// Import Page Components
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProductsPage from './pages/ProductsPage';
import CompliancePage from './pages/CompliancePage';
import LogisticsPage from './pages/LogisticsPage';
import ContactPage from './pages/ContactPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import SitemapPage from './pages/SitemapPage';
import CareersPage from './pages/CareersPage';

gsap.registerPlugin(ScrollTrigger);

// Custom Hash Routing Hook
function useHashRoute() {
  const [route, setRoute] = useState(window.location.hash || '#/');

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(window.location.hash || '#/');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return route;
}

export default function App() {
  const route = useHashRoute();
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    document.body.classList.toggle('light-theme', theme === 'light');
  }, [theme]);

  const toggleTheme = () => {
    setTheme(t => {
      const nextTheme = t === 'dark' ? 'light' : 'dark';
      // Dispatch custom event to notify WebGL canvas or other observers
      setTimeout(() => {
        document.dispatchEvent(new CustomEvent('themeChanged', { detail: nextTheme }));
      }, 0);
      return nextTheme;
    });
  };

  useEffect(() => {
    // 1. Lenis Smooth Scroll (integrated with GSAP ScrollTrigger ticker)
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false,
    });
    
    lenis.on('scroll', ScrollTrigger.update);
    
    const tickerCallback = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);
    
    // Store Lenis instance globally so page components can scroll reset cleanly if needed
    window.lenis = lenis;

    // 2. Initialize Globals (Preloader, Cursor Glow, Scrolled Navbar, Mobile Menu)
    initGlobals();

    return () => {
      lenis.destroy();
      gsap.ticker.remove(tickerCallback);
      window.lenis = null;
    };
  }, []);

  // Scroll to top and refresh ScrollTrigger on route change
  useEffect(() => {
    window.scrollTo(0, 0);
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true });
    }
    
    // Tiny delay to allow React to mount the DOM of the new page before refreshing ScrollTrigger
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);
  }, [route]);

  // Dynamic Page Renderer based on Hash Route (ignores query parameters)
  const renderPage = () => {
    const baseRoute = route.split('?')[0];
    switch (baseRoute) {
      case '#/':
      case '#':
        return <HomePage />;
      case '#/about':
        return <AboutPage />;
      case '#/products':
        return <ProductsPage />;
      case '#/compliance':
        return <CompliancePage />;
      case '#/logistics':
        return <LogisticsPage />;
      case '#/contact':
        return <ContactPage />;
      case '#/careers':
        return <CareersPage />;
      case '#/terms':
        return <TermsPage />;
      case '#/privacy':
        return <PrivacyPage />;
      case '#/sitemap':
        return <SitemapPage />;
      default:
        return <HomePage />;
    }
  };

  const currentBase = route.split('?')[0];

  return (
    <>
      <div>
        <a href="#main" className="skip-link">Skip to main content</a>
        
        {/* ═══════════════════════════════════════════════
           PRELOADER (Runs once per website load)
        ═══════════════════════════════════════════════ */}
        <div id="preloader" role="status" aria-label="Loading Opésh Overseas">
          <div className="pre-rule" id="preRule" />
          <div className="pre-logo" id="preLogo">
            Opésh <span>Overseas</span>
          </div>
          <div className="pre-tagline" id="preTagline">
            India's Premium Export House
          </div>
          <div className="pre-dots" id="preDots">
            <div className="pre-dot">
              <div className="pre-dot-circle jade" />
              <span className="pre-dot-label">Ayurveda</span>
            </div>
            <div className="pre-dot">
              <div className="pre-dot-circle" style={{ background: 'var(--gold)' }} />
              <span className="pre-dot-label">Handicrafts</span>
            </div>
            <div className="pre-dot">
              <div className="pre-dot-circle crimson" />
              <span className="pre-dot-label">Textiles</span>
            </div>
          </div>
          <div className="pre-bar-track">
            <div className="pre-bar-fill" id="preBar" />
          </div>
        </div>

        {/* ═══════════════════════════════════════════════
           GLOBAL PERSISTENT ELEMENTS
        ═══════════════════════════════════════════════ */}
        <div id="cursor-glow" aria-hidden="true" />
        <div className="orb orb-jade" aria-hidden="true" />
        <div className="orb orb-gold" aria-hidden="true" />
        <div className="orb orb-crimson" aria-hidden="true" />

        {/* ═══════════════════════════════════════════════
           NAVBAR
        ═══════════════════════════════════════════════ */}
        <header id="navbar" role="banner">
          <a href="#/" className="nav-brand" aria-label="Opésh Overseas — Home">
            <span className="nav-brand-name">Opésh <span>Overseas</span></span>
            <span className="nav-brand-sub">India's Premium Export House</span>
          </a>
          
          <nav role="navigation" aria-label="Main navigation">
            <ul className="nav-links">
              <li><a href="#/" className={currentBase === '#/' || currentBase === '#' ? 'active-link' : ''}>Home</a></li>
              <li><a href="#/about" className={currentBase === '#/about' ? 'active-link' : ''}>About Us</a></li>
              <li><a href="#/products" className={currentBase === '#/products' ? 'active-link' : ''}>Products</a></li>
              <li><a href="#/compliance" className={currentBase === '#/compliance' ? 'active-link' : ''}>Compliance</a></li>
              <li><a href="#/logistics" className={currentBase === '#/logistics' ? 'active-link' : ''}>Logistics</a></li>
              <li><a href="#/contact" className={currentBase === '#/contact' ? 'active-link' : ''}>Contact Us</a></li>
            </ul>
          </nav>
          
          <div className="nav-actions-wrap" style={{ display: 'flex', alignItems: 'center' }}>
            <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme" style={{ marginRight: '1rem' }}>
              {theme === 'dark' ? (
                <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="sun-icon">
                  <circle cx="12" cy="12" r="5"></circle>
                  <line x1="12" y1="1" x2="12" y2="3"></line>
                  <line x1="12" y1="21" x2="12" y2="23"></line>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                  <line x1="1" y1="12" x2="3" y2="12"></line>
                  <line x1="21" y1="12" x2="23" y2="12"></line>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="moon-icon">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
              )}
            </button>
            
            <button className="hamburger" id="hamburger" aria-label="Toggle navigation menu" aria-expanded="false" aria-controls="mobile-menu">
              <span />
              <span />
              <span />
            </button>
          </div>
        </header>

        {/* ═══════════════════════════════════════════════
           MOBILE FULLSCREEN MENU
        ═══════════════════════════════════════════════ */}
        <div id="mobile-menu" role="dialog" aria-label="Mobile navigation" aria-modal="true">
          <canvas id="menu-canvas" aria-hidden="true" />
          <nav aria-label="Mobile navigation links">
            <a href="#/" className={`mobile-nav-link ${currentBase === '#/' || currentBase === '#' ? 'active-link' : ''}`} data-mob-link>Home</a>
            <a href="#/about" className={`mobile-nav-link ${currentBase === '#/about' ? 'active-link' : ''}`} data-mob-link>About Us</a>
            <a href="#/products" className={`mobile-nav-link ${currentBase === '#/products' ? 'active-link' : ''}`} data-mob-link>Products</a>
            <a href="#/compliance" className={`mobile-nav-link ${currentBase === '#/compliance' ? 'active-link' : ''}`} data-mob-link>Compliance</a>
            <a href="#/logistics" className={`mobile-nav-link ${currentBase === '#/logistics' ? 'active-link' : ''}`} data-mob-link>Logistics</a>
            <a href="#/contact" className={`mobile-nav-link ${currentBase === '#/contact' ? 'active-link' : ''}`} data-mob-link>Contact Us</a>
          </nav>
          <div className="mobile-menu-cats" aria-hidden="true">
            <span className="mobile-cat-pill jade">Ayurveda &amp; Herbal</span>
            <span className="mobile-cat-pill gold">Handicrafts</span>
            <span className="mobile-cat-pill crimson">Luxury Textiles</span>
          </div>
          <a href="#/contact" className="mobile-menu-cta" data-mob-link>
            Send Export Enquiry →
          </a>
        </div>

        {/* ═══════════════════════════════════════════════
           MAIN DYNAMIC CONTENT
        ═══════════════════════════════════════════════ */}
        <main id="main">
          {renderPage()}
        </main>

        {/* ═══════════════════════════════════════════════
           FOOTER
        ═══════════════════════════════════════════════ */}
        <footer className="site-footer" role="contentinfo">
          <div className="footer-inner">
            <div className="footer-grid">
              {/* Brand Column */}
              <div className="footer-col footer-col--brand">
                <a href="#/" className="footer-logo">
                  <span className="footer-logo-main">Opésh <span>Overseas</span></span>
                  <span className="footer-logo-sub">India's Premium Export House</span>
                </a>
                <p className="footer-desc">
                  Bridging India's rich artisanal heritage and ancient wellness sciences with global markets through uncompromising quality and compliance.
                </p>
                <div className="footer-socials">
                  <a href="#/" aria-label="LinkedIn"><span className="social-icon">💼</span></a>
                  <a href="#/" aria-label="Instagram"><span className="social-icon">📸</span></a>
                  <a href="#/" aria-label="Twitter"><span className="social-icon">🐦</span></a>
                </div>
              </div>

              {/* Sectors Column */}
              <div className="footer-col">
                <h4>Export Sectors</h4>
                <ul className="footer-links">
                  <li><a href="#/products"><span className="bullet">🌿</span> Ayurveda &amp; Herbal</a></li>
                  <li><a href="#/products"><span className="bullet">🏺</span> Handcrafted Artisanry</a></li>
                  <li><a href="#/products"><span className="bullet">🧵</span> Luxury Home Textiles</a></li>
                </ul>
              </div>

              {/* Navigation Column */}
              <div className="footer-col">
                <h4>Quick Links</h4>
                <ul className="footer-links">
                  <li><a href="#/about">Our Story</a></li>
                  <li><a href="#/compliance">Quality &amp; Certifications</a></li>
                  <li><a href="#/logistics">Sourcing &amp; Logistics</a></li>
                  <li><a href="#/careers">Careers</a></li>
                  <li><a href="#/contact">Send Export Enquiry</a></li>
                </ul>
              </div>

              {/* Contact Column */}
              <div className="footer-col footer-col--contact">
                <h4>Head Office</h4>
                <p className="footer-address">
                  📍 Sector 45, Gurgaon,<br />
                  Haryana - 122003, India
                </p>
                <p className="footer-contact-item">
                  ✉️ <a href="mailto:info@opeshoverseas.com">info@opeshoverseas.com</a>
                </p>
                <p className="footer-contact-item">
                  📞 <a href="tel:+917976529421">+91 79765 29421</a>
                </p>
              </div>
            </div>

            <div className="footer-divider" />

            {/* Bottom bar */}
            <div className="footer-bottom">
              <p className="footer-copy">
                &copy; {new Date().getFullYear()} Opésh Overseas. All Rights Reserved.
              </p>
              <div className="footer-legal">
                <a href="#/terms">Terms &amp; Conditions</a>
                <span className="legal-sep">·</span>
                <a href="#/privacy">Privacy Policy</a>
                <span className="legal-sep">·</span>
                <a href="#/sitemap">Sitemap</a>
              </div>
            </div>
          </div>
        </footer>

        {/* Global typography cleanup & styling */}
        <style id="final-requested-cleanup" dangerouslySetInnerHTML={{
          __html: `
            @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&display=swap');
            :root { --font-display: 'Playfair Display', Georgia, serif !important; }
            .nav-brand-name,
            .hero-h1,
            .heading-display,
            .heading-section,
            h1, h2, h3, h4, h5,
            #global-reach .gr-title,
            #global-reach .gr-card h3,
            .stat-block-num,
            .page-header h1 {
              font-family: 'Playfair Display', Georgia, serif !important;
            }

            /* Remove hero circle. */
            #hero::after {
              display: none !important;
              content: none !important;
              opacity: 0 !important;
              background: none !important;
              border: 0 !important;
              box-shadow: none !important;
            }

            /* Keep country names and route animation; hide only the metric strip under the globe. */
            #global-reach .gr-stats,
            #global-reach .gr-stat {
              display: none !important;
              opacity: 0 !important;
              visibility: hidden !important;
              pointer-events: none !important;
            }
            #global-reach .gr-country {
              display: block !important;
              visibility: visible !important;
            }
            #global-reach .gr-title,
            #global-reach .gr-eyebrow,
            #global-reach .gr-sub,
            #global-reach .gr-cards,
            #global-reach .gr-card {
              visibility: visible !important;
            }

            /* Remove all decorative pseudo-shapes that could look like squares/circles on the Earth. */
            #global-reach .gr-globe-wrap::before,
            #global-reach .gr-globe-wrap::after,
            #global-reach .gr-pin::after {
              display: none !important;
              content: none !important;
              opacity: 0 !important;
              background: none !important;
              border: 0 !important;
              box-shadow: none !important;
            }
            #global-reach .gr-globe-wrap,
            #global-reach .gr-globe,
            #global-reach .gr-globe canvas {
              border-radius: 50% !important;
            }
            #global-reach .gr-globe {
              overflow: hidden !important;
              clip-path: circle(50% at 50% 50%);
            }
            #global-reach .gr-globe-glow {
              inset: -16% !important;
              border-radius: 50% !important;
              background: radial-gradient(circle, rgba(61,176,159,0.16), rgba(201,168,76,0.07) 34%, transparent 66%) !important;
            }

            /* Active Navigation Link Indicator */
            .nav-links a.active-link {
              color: var(--gold, #c9a14a) !important;
            }
            .nav-links a.active-link::after {
              transform: scaleX(1) !important;
            }
          `
        }} />

        <style id="final-polish" dangerouslySetInnerHTML={{
          __html: `
            :root {
              --font-display: 'Cormorant Garamond', 'Playfair Display', Georgia, serif !important;
              --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
              --ease-soft: cubic-bezier(0.65, 0, 0.35, 1);
            }
            body { font-feature-settings: "kern" 1, "liga" 1, "calt" 1; -webkit-font-smoothing: antialiased; }

            h1, h2, h3, .hero-h1, .nav-brand-name,
            .pre-logo, .section-intro h2, .page-header h1 {
              font-family: var(--font-display) !important;
              font-weight: 300 !important;
              letter-spacing: -0.012em !important;
              font-feature-settings: "kern" 1, "liga" 1, "dlig" 1, "swsh" 1;
            }
            h2, h3, .section-intro h2 { letter-spacing: -0.015em !important; }
            .hero-h1 .line-2 { font-style: italic; font-weight: 300 !important; letter-spacing: -0.018em !important; }

            #navbar { padding-left: 0 !important; padding-right: var(--gutter); }
            .nav-brand { padding-left: clamp(0.75rem, 2.2vw, 2rem); }
            @media (min-width: 900px) {
              .nav-brand-name { font-size: 1.95rem !important; letter-spacing: 0.06em !important; }
              .nav-brand-sub  { font-size: 0.62rem !important; letter-spacing: 0.34em !important; }
            }
            @media (min-width: 1280px) {
              .nav-brand-name { font-size: 2.2rem !important; }
            }

            .hero-video-wrap video {
              filter: brightness(0.78) saturate(1.15) contrast(1.04) !important;
              transition: filter 1.6s var(--ease-soft);
            }
            body.light-theme .hero-video-wrap video {
              filter: brightness(0.95) saturate(1.15) contrast(1.0) !important;
            }
            .hero-video-wrap::after {
              opacity: 0.35;
              transition: opacity 1.6s var(--ease-soft);
            }
            body.hero-dimmed .hero-video-wrap video {
              filter: brightness(0.24) saturate(1.3) contrast(1.05) !important;
            }
            body.light-theme.hero-dimmed .hero-video-wrap video {
              filter: brightness(0.95) saturate(1.15) contrast(1.0) !important;
            }
            body.hero-dimmed .hero-video-wrap::after { opacity: 1; }

            @media (min-width: 900px) {
              .hero-h1 { font-size: clamp(2.6rem, 5.6vw, 4.9rem) !important; line-height: 1.04 !important; margin-bottom: 1.4rem !important; }
              .hero-sub { font-size: clamp(0.92rem, 1.4vw, 1.05rem) !important; }
            }

            [data-reveal] {
              transition:
                opacity 1.1s var(--ease-soft),
                transform 1.1s var(--ease-soft) !important;
            }
            [data-reveal="up"]    { transform: translateY(36px); }
            [data-reveal="left"]  { transform: translateX(-36px); }
            [data-reveal="right"] { transform: translateX(36px); }
            [data-reveal].visible { opacity: 1 !important; transform: translate(0,0) scale(1) !important; }

            .leaving { opacity: 0.35 !important; transition: opacity 0.9s var(--ease-soft); }

            #global-reach .gr-country {
              transition: filter 0.9s var(--ease-soft) !important;
            }
            #global-reach .gr-route {
              transition: stroke-dashoffset 1.4s var(--ease-soft) !important;
            }

            .nav-brand { opacity: 0; transform: translateY(-4px); }
          `
        }} />

        <a href="#/contact" className="floating-enquiry" aria-label="Send export enquiry">
          Export Enquiry
          <svg viewBox="0 0 12 12" aria-hidden="true">
            <path d="M1 6h10M6 1l5 5-5 5" />
          </svg>
        </a>
      </div>
    </>
  );
}
