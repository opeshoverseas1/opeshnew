import React, { useState, useEffect } from 'react';
import { initPageAnimations, cleanupPageAnimations } from '../legacy-logic';

export default function ProductsPage() {
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    initPageAnimations();
    return () => {
      cleanupPageAnimations();
    };
  }, [activeTab]); // Re-initialize page animations (reveals, tilts) when filtering tab changes

  const products = [
    // 🌿 Ayurveda & Herbal
    {
      id: 'ashwagandha',
      name: 'Ashwagandha Root Extract Powder',
      category: 'herbal',
      icon: '🌿',
      tagline: 'Standardized Withanolides > 5%',
      description: 'Premium grade adaptogenic extract powder sourced from audited farms in Madhya Pradesh, manufactured in a WHO-GMP certified facility.',
      specs: {
        'Botanical Name': 'Withania somnifera',
        'Active Content': 'Withanolides > 5.0% (HPLC)',
        'MOQ': '100 kg',
        'Export Packaging': 'Double LDPE bags inside food-grade fiber drum (25 kg/drum)',
        'Shelf Life': '24 Months'
      }
    },
    {
      id: 'moringa',
      name: 'Organic Moringa Leaf Powder',
      category: 'herbal',
      icon: '🍃',
      tagline: 'USDA & NPOP Organic Certified',
      description: 'Bright green, fine mesh powder processed from fresh leaves of Moringa oleifera, certified organic and rich in amino acids.',
      specs: {
        'Botanical Name': 'Moringa oleifera',
        'Mesh Size': '80 - 100 Mesh',
        'MOQ': '200 kg',
        'Export Packaging': 'High-barrier vacuum-sealed aluminum bags in corrugated boxes',
        'Shelf Life': '18 Months'
      }
    },
    {
      id: 'lemongrass',
      name: 'Lemongrass Essential Oil',
      category: 'herbal',
      icon: '💧',
      tagline: '100% Pure & Therapeutic Grade',
      description: 'Steam-distilled essential oil with a clean citrus aroma, tested in third-party labs for active citral percentage.',
      specs: {
        'Botanical Name': 'Cymbopogon flexuosus',
        'Citral Content': '75% - 82% (GC-MS audited)',
        'MOQ': '50 kg / Litres',
        'Export Packaging': 'Fluorinated HDPE bottles / Food-grade aluminum flasks',
        'Shelf Life': '36 Months'
      }
    },

    // 🏺 Handcrafted Artisanry
    {
      id: 'brassware',
      name: 'Heritage Brass Candle Stands & Lamps',
      category: 'handicraft',
      icon: '🏺',
      tagline: 'Solid Sand-Cast Brass',
      description: 'Generational craftsmanship in brass casting, hand-polished and sealed with export-grade protective lacquer.',
      specs: {
        'Material': 'High-grade Brass alloy (Copper > 60%)',
        'Finish': 'Polished Antique / Glossy Gold lacquer',
        'MOQ': '50 Units',
        'Export Packaging': 'Individual bubble wrap, thermocol molding, in 5-ply cartons',
        'Lead Time': '45 Days FOB'
      }
    },
    {
      id: 'marbleinlay',
      name: 'Inlay Marble Decorative Platters',
      category: 'handicraft',
      icon: '✨',
      tagline: 'Taj-Heritage Pietra Dura Art',
      description: 'Intricate marble plates featuring hand-carved semiprecious stone inlays, made by heritage craftsmen in Agra.',
      specs: {
        'Material': 'Makrana White Marble / Semiprecious stones',
        'Technique': 'Pietra Dura (Inlay Art)',
        'MOQ': '15 Units',
        'Export Packaging': 'Velvet-lined shock-absorbent wooden crates',
        'Lead Time': '60 Days CIF'
      }
    },
    {
      id: 'sheeshamboxes',
      name: 'Carved Sheesham Wood Chests',
      category: 'handicraft',
      icon: '📦',
      tagline: 'Seasoned Rosewood with Brass accents',
      description: 'Premium seasoned rosewood boxes featuring hand-carved motifs and detailed brass inlay work.',
      specs: {
        'Material': 'Seasoned Sheesham Wood (Rosewood)',
        'Treatment': 'Kiln-dried & chemical seasoned against pests',
        'MOQ': '100 Units',
        'Export Packaging': 'Corrugated inner box, master export carton palletized',
        'Lead Time': '30 Days FOB'
      }
    },

    // 🧵 Luxury Home Textiles
    {
      id: 'pashmina',
      name: 'Kashmiri Pashmina Shawls',
      category: 'textile',
      icon: '🧣',
      tagline: '100% Hand-Spun Changthangi Cashmere',
      description: 'Authentic high-altitude Cashmere wool, hand-spun on traditional spinning wheels and woven by handloom masters in Srinagar.',
      specs: {
        'Composition': '100% Changthangi Pashmina wool',
        'Weave Type': 'Chashme-Bulbul (Diamond Weave)',
        'MOQ': '10 Units',
        'Export Packaging': 'Acid-free tissue wrapping, individual presentation cardboard boxes',
        'Certification': 'GI (Geographical Indication) registration label included'
      }
    },
    {
      id: 'bedding',
      name: 'Organic Cotton Bedding Sets',
      category: 'textile',
      icon: '🛏️',
      tagline: '300+ Thread Count long-staple Cotton',
      description: 'Luxury hotel quality bedding sheets, pillow covers, and duvet covers sourced from sustainable cotton mills in Tamil Nadu.',
      specs: {
        'Composition': '100% Certified Organic Cotton',
        'Thread Count': '300 TC - 400 TC Sateen / Percale',
        'MOQ': '50 Sets',
        'Export Packaging': 'Eco-friendly self-fabric draw-string storage bags',
        'Certificates': 'GOTS (Global Organic Textile Standard) approved'
      }
    },
    {
      id: 'throws',
      name: 'Handloom Cotton Throws & Rugs',
      category: 'textile',
      icon: '🧶',
      tagline: 'Eco-Friendly natural dyed yarns',
      description: 'Heavyweight textured sofa throws and decorative dhurrie rugs hand-woven with natural dye yarns by artisan weavers.',
      specs: {
        'Composition': 'Recycled Cotton & Natural Hemp blend',
        'Dyes': 'Vegetable organic extracts (Indigo, Madder, Pomegranate)',
        'MOQ': '100 Units',
        'Export Packaging': 'Moisture-proof compressed bales wrapped in high-density canvas',
        'Lead Time': '40 Days FOB'
      }
    }
  ];

  const filteredProducts = activeTab === 'all' 
    ? products 
    : products.filter(p => p.category === activeTab);

  return (
    <div className="subpage-wrapper">
      {/* ── Page Header ── */}
      <header className="page-header" data-reveal="fade">
        <div className="section-inner">
          <span className="eyebrow">Export Catalog</span>
          <h1>Premium Sourced <em className="em-gold">B2B Product Range</em></h1>
          <p className="page-header-lead">
            Explore our curated selection of tested Ayurvedic raw materials, certified organic botanicals, heritage-cluster handicrafts, and luxury GI-registered textiles.
          </p>
        </div>
      </header>

      {/* ── Product Section with Filtering ── */}
      <section className="products-section" aria-labelledby="catalog-heading">
        <div className="section-inner">
          <h2 id="catalog-heading" className="sr-only">Product Catalog</h2>

          {/* Tab Filters */}
          <div className="product-tabs" data-reveal="up">
            <button 
              className={`product-tab ${activeTab === 'all' ? 'active' : ''}`}
              onClick={() => setActiveTab('all')}
            >
              All Categories
            </button>
            <button 
              className={`product-tab ${activeTab === 'herbal' ? 'active' : ''}`}
              onClick={() => setActiveTab('herbal')}
            >
              🌿 Ayurveda &amp; Herbal
            </button>
            <button 
              className={`product-tab ${activeTab === 'handicraft' ? 'active' : ''}`}
              onClick={() => setActiveTab('handicraft')}
            >
              🏺 Handcrafted Artisanry
            </button>
            <button 
              className={`product-tab ${activeTab === 'textile' ? 'active' : ''}`}
              onClick={() => setActiveTab('textile')}
            >
              🧵 Luxury Home Textiles
            </button>
          </div>

          {/* Product Grid */}
          <div className="products-grid">
            {filteredProducts.map((p, index) => (
              <article key={p.id} className="product-card" data-reveal="up" data-reveal-delay={(index % 3) * 0.05}>
                <div className="product-card-header">
                  <div className="product-icon" aria-hidden="true">{p.icon}</div>
                  <div className="product-title-area">
                    <h3>{p.name}</h3>
                    <span className="product-tagline">{p.tagline}</span>
                  </div>
                </div>

                <p className="product-desc">{p.description}</p>

                <div className="product-specs-title">Technical Specifications</div>
                <table className="product-specs-table">
                  <tbody>
                    {Object.entries(p.specs).map(([key, val]) => (
                      <tr key={key}>
                        <td className="spec-label">{key}</td>
                        <td className="spec-val">{val}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="product-card-actions">
                  <a 
                    href={`#/contact?product=${encodeURIComponent(p.name)}`} 
                    className="btn-primary btn-sm"
                    aria-label={`Request FOB quote for ${p.name}`}
                  >
                    Request FOB Pricing
                    <svg viewBox="0 0 12 12" aria-hidden="true" style={{width: 10, height: 10, marginLeft: 6}}>
                      <path d="M1 6h10M6 1l5 5-5 5" />
                    </svg>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── B2B Banner ── */}
      <section className="product-cta-banner" data-reveal="up">
        <div className="section-inner">
          <div className="cta-banner-content">
            <h3>Custom Sourcing &amp; Formulation</h3>
            <p>
              Do you require customized extract percentages, specific wood finishes, or private label cotton weave designs? Our Gurgaon team collaborates directly with manufacturers to audit and deliver custom B2B requests.
            </p>
            <a href="#/contact" className="btn-ghost">Speak to Sourcing Specialist</a>
          </div>
        </div>
      </section>
    </div>
  );
}
