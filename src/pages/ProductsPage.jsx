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
      image: 'assets/products/ashwagandha.jpg',
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
      image: 'assets/products/moringa.jpg',
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
      image: 'assets/products/lemongrass.jpg',
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
      image: 'assets/products/brassware.jpg',
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
      image: 'assets/products/marbleinlay.jpg',
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
      image: 'assets/products/sheeshamboxes.jpg',
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
      image: 'assets/products/pashmina.jpg',
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
      image: 'assets/products/bedding.jpg',
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
      image: 'assets/products/throws.jpg',
      tagline: 'Eco-Friendly natural dyed yarns',
      description: 'Heavyweight textured sofa throws and decorative dhurrie rugs hand-woven with natural dye yarns by artisan weavers.',
      specs: {
        'Composition': 'Recycled Cotton & Natural Hemp blend',
        'Dyes': 'Vegetable organic extracts (Indigo, Madder, Pomegranate)',
        'MOQ': '100 Units',
        'Export Packaging': 'Moisture-proof compressed bales wrapped in high-density canvas',
        'Lead Time': '40 Days FOB'
      }
    },
    {
      id: 'triphala',
      name: 'Triphala Standardized Extract Powder',
      category: 'herbal',
      icon: '🍂',
      tagline: 'Tannins > 40% (HPLC)',
      description: 'Traditional Ayurvedic formulation made from three fruits (Amalaki, Bibhitaki, and Haritaki), standardized for high tannin content to support gut health formulations.',
      specs: {
        'Botanical Names': 'Emblica officinalis, Terminalia bellerica, Terminalia chebula',
        'Active Content': 'Tannins > 40.0% (titration/HPLC)',
        'MOQ': '100 kg',
        'Export Packaging': 'Food-grade fiber drum with double LDPE liner (25 kg/drum)',
        'Shelf Life': '24 Months'
      }
    },
    {
      id: 'turmeric',
      name: 'Turmeric Curcuminoid Powder 95%',
      category: 'herbal',
      icon: '💛',
      tagline: '95% Pure Curcuminoids by HPLC',
      description: 'Ultra-pure, deep yellow curcuminoid extract powder derived from high-quality Curcuma longa roots, tested for pesticide residues and heavy metals.',
      specs: {
        'Botanical Name': 'Curcuma longa',
        'Active Content': 'Total Curcuminoids > 95.0% (HPLC)',
        'MOQ': '50 kg',
        'Export Packaging': 'Vacuum-sealed aluminum bag inside fiber drum (25 kg/drum)',
        'Shelf Life': '36 Months'
      }
    },
    {
      id: 'psyllium',
      name: 'Psyllium Husk (Isabgol) 99% Pure',
      category: 'herbal',
      icon: '🌾',
      tagline: '99% USP / EP Grade Purity',
      description: 'Super-pure dietary fiber husk sourced from organic crop clusters in Gujarat, offering excellent swell volume and clean analytical profiles.',
      specs: {
        'Botanical Name': 'Plantago ovata',
        'Swell Volume': 'Greater than 40 ml / gram',
        'MOQ': '500 kg',
        'Export Packaging': 'Multi-ply paper bags with inner poly-lining (25 kg/bag)',
        'Purity Grade': '99% Clean (USP/EP Standards)'
      }
    },
    {
      id: 'tulsi',
      name: 'Organic Tulsi (Holy Basil) Leaf Powder',
      category: 'herbal',
      icon: '🌿',
      tagline: 'USDA & NPOP Organic Certified',
      description: 'Fine mesh powder made from shade-dried leaves of Holy Basil, maintaining natural volatile oils and ursolic acid content.',
      specs: {
        'Botanical Name': 'Ocimum sanctum',
        'Active Content': 'Ursolic Acid > 1.5% (HPLC)',
        'MOQ': '150 kg',
        'Export Packaging': 'High-barrier vacuum bags inside corrugated carton boxes',
        'Shelf Life': '24 Months'
      }
    },
    {
      id: 'copperbottles',
      name: 'Hand-Hammered Jointless Copper Bottles',
      category: 'handicraft',
      icon: '🏺',
      tagline: '99.9% Pure Food-Grade Copper',
      description: 'Generational copperware craftsmanship. Jointless leak-proof bottle design with a hammered exterior for improved surface area and B2B custom branding options.',
      specs: {
        'Material': '99.9% Pure Solid Copper',
        'Finish': 'Hammered Jointless / Lacquered Outer Guard',
        'MOQ': '200 Units',
        'Export Packaging': 'Individual cloth sleeves, bubble wrapped, 50 units per master carton',
        'Lead Time': '30 Days FOB'
      }
    },
    {
      id: 'agatecoasters',
      name: 'Agate Stone Coasters with 24k Gold Trim',
      category: 'handicraft',
      icon: '💎',
      tagline: 'Natural Agate with Electroplated Edges',
      description: 'Slices of natural agate mineral stones polished to high-gloss, finished with electroplated 24k gold borders. Perfect for premium homeware retailers.',
      specs: {
        'Material': 'Natural Agate Stone / 24k Gold electroplating',
        'Diameter': '3.5 - 4.5 inches (variable natural sizing)',
        'MOQ': '100 Sets (4 coasters/set)',
        'Export Packaging': 'Velvet dividers, shockproof foam box, inner display packaging',
        'Lead Time': '40 Days CIF'
      }
    },
    {
      id: 'bluepotery',
      name: 'Jaipur Heritage Blue Pottery Vases',
      category: 'handicraft',
      icon: '🍶',
      tagline: 'Traditional Glazed Quartz Clay',
      description: 'No-clay pottery handcrafted in Jaipur using quartz, raw glaze, and cobalt blue mineral pigments. Hand-painted with traditional floral designs by generational artisans.',
      specs: {
        'Material': 'Quartz dust, glass powder, organic gum, glazed finish',
        'Dyes': 'Cobalt blue & copper oxide mineral pigments',
        'MOQ': '50 Units',
        'Export Packaging': 'Jaipur glazed protective shock packaging, master export boxes',
        'Lead Time': '45 Days FOB'
      }
    },
    {
      id: 'teakbowls',
      name: 'Teak Wood Hand-Carved Salad Bowls',
      category: 'handicraft',
      icon: '🥣',
      tagline: 'Grade-A Seasoned Teak Wood',
      description: 'Solid single-piece teak bowls hand-carved to preserve natural grain. Rubbed with food-safe linseed/flaxseed oil, presenting a luxurious matte finish.',
      specs: {
        'Material': 'Sustainable Grade-A Teak wood (Tectona grandis)',
        'Treatment': 'Kiln-dried & food-grade oil sealed',
        'MOQ': '150 Units',
        'Export Packaging': 'Acid-free tissue wrap, individual card box, palletized crate pack',
        'Lead Time': '35 Days FOB'
      }
    },
    {
      id: 'silkdudets',
      name: 'Mulberry Silk Duvet & Pillowcase Sets',
      category: 'textile',
      icon: '🛏️',
      tagline: '100% Mulberry Silk, 19 Momme',
      description: 'Ultra-luxurious silk bedding sets woven from long-strand mulberry silk. Frictionless, hypoallergenic, and highly breathable for high-end boutique hospitality.',
      specs: {
        'Composition': '100% Grade 6A Long-strand Mulberry Silk',
        'Weight': '19 Momme density (400 TC equivalent)',
        'MOQ': '20 Sets',
        'Export Packaging': 'Silk-wrapped presentation box, eco-friendly luxury card cases',
        'Lead Time': '45 Days CIF'
      }
    },
    {
      id: 'woolcarpets',
      name: 'Hand-Knotted New Zealand Wool & Silk Carpets',
      category: 'textile',
      icon: '🧶',
      tagline: '120 Knots Per Square Inch (KPSI)',
      description: 'Generational hand-knotted carpets blending fine New Zealand wool with high-shine bamboo silk accents, custom washed for antique texture.',
      specs: {
        'Composition': '80% New Zealand Wool, 20% Bamboo Silk',
        'Knot Density': '120 KPSI (Hand-knotted heritage weave)',
        'MOQ': '5 Units',
        'Export Packaging': 'Heavy-duty poly roll wrap inside thick canvas tube packing',
        'Lead Time': '60 - 90 Days'
      }
    },
    {
      id: 'linenpillow',
      name: 'European Flax Linen Cushion Covers',
      category: 'textile',
      icon: '🛋️',
      tagline: '100% Organic Flax Linen',
      description: 'Washed European flax linen covers offering a relaxed, casual texture. Stone-washed for softness and dye-tested for absolute heavy metal safety.',
      specs: {
        'Composition': '100% certified European Flax Linen',
        'Weight': '165 GSM pre-washed linen',
        'MOQ': '100 Units',
        'Export Packaging': 'Biodegradable PLA bags, master export box wrapping',
        'Certifications': 'OEKO-TEX Standard 100 certified'
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
