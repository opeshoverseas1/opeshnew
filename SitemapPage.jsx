import { useEffect } from 'react';
import { initPageAnimations, cleanupPageAnimations } from '../legacy-logic';

export default function SitemapPage() {
  useEffect(() => {
    initPageAnimations();
    return () => {
      cleanupPageAnimations();
    };
  }, []);

  const sections = [
    {
      title: 'Main Navigation',
      links: [
        { label: 'Home Page', path: '/', desc: 'Overview of India’s premier B2B sourcing & global export operations.' },
        { label: 'About Us', path: '/about', desc: 'Our corporate profile, mission, core values, and leadership details.' },
        { label: 'Products Catalog', path: '/products', desc: 'Browse premium Ayurveda, handcrafted textiles, and heritage products.' },
        { label: 'Compliance & Quality', path: '/compliance', desc: 'WHO-GMP, ISO, FSSAI certificates, and our 5-stage QA testing timeline.' },
        { label: 'Sourcing & Logistics', path: '/logistics', desc: 'Incoterms (FOB/CIF), packaging safety standards, and port transit times.' },
        { label: 'Contact & Enquiry', path: '/contact', desc: 'Request customized B2B quotes, FOB price lists, and shipment terms.' }
      ]
    },
    {
      title: 'Legal & Info',
      links: [
        { label: 'Terms & Conditions', path: '/terms', desc: 'Standard terms governing quotations, orders, payments, and trade frameworks.' },
        { label: 'Privacy Policy', path: '/privacy', desc: 'Our policies detailing the protection and management of corporate data.' },
        { label: 'Sitemap Directory', path: '/sitemap', desc: 'A complete structural listing of all public pages on our platform.' }
      ]
    }
  ];

  return (
    <div className="subpage-wrapper">
      {/* ── Page Header ── */}
      <header className="page-header" data-reveal="fade">
        <div className="section-inner">
          <span className="eyebrow">Website Directory</span>
          <h1>Portal <em className="em-gold">Sitemap</em></h1>
          <p className="page-header-lead">
            Easily locate pages, specifications, regulatory resources, and quote request forms.
          </p>
        </div>
      </header>

      {/* ── Sitemap Cards Grid ── */}
      <section className="sitemap-section" aria-label="Sitemap structure">
        <div className="section-inner">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '2.5rem' }}>
            {sections.map((sec, idx) => (
              <div key={idx} className="pillar-card" data-reveal="up" data-reveal-delay={idx * 0.1} style={{ padding: '2.2rem' }}>
                <h3 style={{ color: 'var(--gold)', marginBottom: '1.6rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.6rem', fontWeight: '400', letterSpacing: '0.05em' }}>{sec.title}</h3>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
                  {sec.links.map((link, lIdx) => (
                    <li key={lIdx}>
                      <a href={link.path} style={{ color: 'var(--text-primary)', fontSize: '1.05rem', fontWeight: '500', textDecoration: 'none', transition: 'color 0.25s' }} className="sitemap-link">
                        {link.label} <span style={{ color: 'var(--gold)' }}>→</span>
                      </a>
                      <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                        {link.desc}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inline styles for sitemap hover effects */}
      <style dangerouslySetInnerHTML={{
        __html: `
          .sitemap-link:hover {
            color: var(--gold) !important;
          }
        `
      }} />
    </div>
  );
}
