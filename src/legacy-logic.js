import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let THREE = null;
let ThreeGlobe = null;

// Global state tracking for lifecycle cleanup
let globalsInitialized = false;
let menuCanvasResizeListener = null;
let cursorMoveListener = null;
let navbarScrollListener = null;
let escapeKeyListener = null;
let menuOutsideClickListener = null;

// Globe & Home animation state
let renderer = null;
let scene = null;
let camera = null;
let globe = null;
let globeFrameId = null;
let spinning = false;
let globeState = { autoRotationY: 0 };
const scrollOffset = { y: 0 };
const INDIA = { lat: 22.0, lng: 78.9 };
const baseRotationY = -INDIA.lng * Math.PI / 180 - 0.2;
const COUNTRY_COORDS = {
  'Port of New York (US)':    { lat: 40.7, lng: -74.0 },
  'Port of London (UK)':      { lat: 51.5, lng: 0.1 },
  'Rotterdam Hub (EU)':       { lat: 51.9, lng: 4.1 },
  'Jebel Ali Port (UAE)':     { lat: 25.0, lng: 55.1 },
  'Singapore Cargo Hub':      { lat: 1.35, lng: 103.8 },
  'Port of Tokyo (JP)':       { lat: 35.7, lng: 139.7 },
  'Port of Sydney (AU)':      { lat: -33.9, lng: 151.2 }
};

let homeScrollTriggers = [];
let homeResizeListeners = [];
let homeObservers = [];
let themeChangedListener = null;


// Page reveal observers
let activeRevealObserver = null;
let activeCinemaObserver = null;

/* ═══════════════════════════════════════════════
   1. GLOBAL INITIALIZATION (Runs once)
═══════════════════════════════════════════════ */
export function initGlobals() {
  if (globalsInitialized) return;
  globalsInitialized = true;

  // Expose dependencies to window for fallback scripts
  window.gsap = gsap;
  window.ScrollTrigger = ScrollTrigger;

  /* ── 1. PRELOADER Timeline ── */
  const preloader = document.getElementById('preloader');
  const preLogo   = document.getElementById('preLogo');
  const preTagline= document.getElementById('preTagline');
  const preDots   = document.getElementById('preDots');
  const preBar    = document.getElementById('preBar');
  const preRule   = document.getElementById('preRule');

  if (preloader) {
    const tlPre = gsap.timeline({
      onComplete: function () {
        gsap.to(preloader, {
          opacity: 0,
          duration: 0.55,
          ease: 'power2.inOut',
          onComplete: function () {
            preloader.style.display = 'none';
            preloader.setAttribute('aria-hidden', 'true');
            document.dispatchEvent(new CustomEvent('preloaderDone'));
          }
        });
      }
    });

    tlPre
      .to(preRule, { width: '140px', duration: 0.7, ease: 'power2.inOut' })
      .to(preLogo, { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' }, '-=0.2')
      .to(preTagline, { opacity: 1, duration: 0.4, ease: 'power2.out' }, '-=0.1')
      .to(preDots, { opacity: 1, duration: 0.4, ease: 'power2.out' }, '-=0.1')
      .to(preBar, { width: '100%', duration: 1.1, ease: 'power1.inOut' }, '-=0.1')
      .to({}, { duration: 0.25 });

    gsap.set(preLogo,    { y: 18 });
    gsap.set(preTagline, { opacity: 0 });
    gsap.set(preDots,    { opacity: 0 });
  }

  /* ── 2. CURSOR GLOW ── */
  const cursorGlow = document.getElementById('cursor-glow');
  if (cursorGlow) {
    let cx = window.innerWidth  / 2;
    let cy = window.innerHeight / 2;
    let tx = cx, ty = cy;

    cursorMoveListener = function (e) {
      tx = e.clientX;
      ty = e.clientY;
    };
    document.addEventListener('mousemove', cursorMoveListener);

    function animateCursor() {
      if (!cursorMoveListener) return; // stopped
      cx += (tx - cx) * 0.09;
      cy += (ty - cy) * 0.09;
      cursorGlow.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%)`;
      requestAnimationFrame(animateCursor);
    }
    animateCursor();
  }

  /* ── 3. NAVBAR SCROLL BEHAVIOUR ── */
  const navbar = document.getElementById('navbar');
  if (navbar) {
    navbarScrollListener = function () {
      navbar.classList.toggle('scrolled', window.scrollY > 60);
    };
    window.addEventListener('scroll', navbarScrollListener, { passive: true });
  }

  /* ── 4. MOBILE MENU ── */
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobLinks   = document.querySelectorAll('[data-mob-link]');

  if (hamburger && mobileMenu) {
    let menuCanvas = null;
    let menuCtx = null;
    let menuParticles = [];
    let menuFrameId = null;
    let isMenuOpen = false;

    function initMenuParticles() {
      menuCanvas = document.getElementById('menu-canvas');
      if (!menuCanvas) return;
      menuCtx = menuCanvas.getContext('2d');
      menuCanvas.width = menuCanvas.offsetWidth || window.innerWidth;
      menuCanvas.height = menuCanvas.offsetHeight || window.innerHeight;
      menuParticles = [];
      const colors = ['rgba(201,161,74,', 'rgba(61,176,159,', 'rgba(233,238,247,'];
      for (let i = 0; i < 40; i++) {
        menuParticles.push({
          x: Math.random() * menuCanvas.width,
          y: Math.random() * menuCanvas.height,
          r: Math.random() * 1.5 + 0.6,
          vx: (Math.random() - 0.5) * 0.35,
          vy: -(Math.random() * 0.35 + 0.12),
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: Math.random() * 0.45 + 0.18,
          twinkle: Math.random() * Math.PI
        });
      }
    }

    function drawMenuParticles() {
      if (!menuCtx || !menuCanvas) return;
      menuCtx.clearRect(0, 0, menuCanvas.width, menuCanvas.height);
      menuParticles.forEach(p => {
        p.y += p.vy;
        p.x += p.vx;
        p.twinkle += 0.025;
        if (p.y < -5) p.y = menuCanvas.height + 5;
        if (p.x < -5) p.x = menuCanvas.width + 5;
        if (p.x > menuCanvas.width + 5) p.x = -5;
        const currentAlpha = p.alpha * (0.6 + Math.sin(p.twinkle) * 0.4);
        menuCtx.beginPath();
        menuCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        menuCtx.fillStyle = p.color + currentAlpha + ')';
        menuCtx.fill();
      });
      menuFrameId = requestAnimationFrame(drawMenuParticles);
    }

    function startMenuParticles() {
      isMenuOpen = true;
      initMenuParticles();
      if (menuFrameId) cancelAnimationFrame(menuFrameId);
      menuFrameId = requestAnimationFrame(drawMenuParticles);
    }

    function stopMenuParticles() {
      isMenuOpen = false;
      if (menuFrameId) {
        cancelAnimationFrame(menuFrameId);
        menuFrameId = null;
      }
      if (menuCtx && menuCanvas) {
        menuCtx.clearRect(0, 0, menuCanvas.width, menuCanvas.height);
      }
    }

    menuCanvasResizeListener = function () {
      if (isMenuOpen && menuCanvas) {
        menuCanvas.width = menuCanvas.offsetWidth || window.innerWidth;
        menuCanvas.height = menuCanvas.offsetHeight || window.innerHeight;
      }
    };
    window.addEventListener('resize', menuCanvasResizeListener);

    function openMenu() {
      hamburger.classList.add('open');
      mobileMenu.classList.add('open');
      hamburger.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
      startMenuParticles();

      gsap.fromTo(
        '.mobile-nav-link',
        { x: -24, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          stagger: 0.07,
          duration: 0.45,
          ease: 'power3.out',
          delay: 0.1
        }
      );
    }

    function closeMenu() {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      stopMenuParticles();
    }

    hamburger.addEventListener('click', function () {
      mobileMenu.classList.contains('open') ? closeMenu() : openMenu();
    });

    mobLinks.forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    escapeKeyListener = function (e) {
      if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
        closeMenu();
        hamburger.focus();
      }
    };
    document.addEventListener('keydown', escapeKeyListener);

    menuOutsideClickListener = function (e) {
      if (e.target === mobileMenu) closeMenu();
    };
    mobileMenu.addEventListener('click', menuOutsideClickListener);
  }
}

export async function initHomeAnimations() {
  if (homeScrollTriggers.length > 0) return; // already running

  const mount = document.getElementById('grGlobeMount');
  const overlay = document.getElementById('grOverlay');
  const linesSvg = document.getElementById('grLines');
  const globeEl = document.getElementById('grGlobe');

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── 2. Country chip layout ── */
  if (overlay && linesSvg && globeEl) {
    const COUNTRIES = [
      { name: 'Port of New York (US)',    angle: 200 },
      { name: 'Port of London (UK)',      angle: 235 },
      { name: 'Rotterdam Hub (EU)',       angle: 270 },
      { name: 'Jebel Ali Port (UAE)',     angle: 310 },
      { name: 'Singapore Cargo Hub',      angle: 25  },
      { name: 'Port of Tokyo (JP)',       angle: 65  },
      { name: 'Port of Sydney (AU)',      angle: 105 }
    ];

    const layoutChips = function () {
      if (!overlay || !linesSvg || !globeEl) return;
      overlay.querySelectorAll('.gr-country').forEach(n => n.remove());
      linesSvg.querySelectorAll('path.gr-route').forEach(n => n.remove());

      const rect = globeEl.getBoundingClientRect();
      const parent = overlay.getBoundingClientRect();
      const cx = rect.left - parent.left + rect.width / 2;
      const cy = rect.top  - parent.top  + rect.height / 2;
      const radius = Math.min((rect.width / 2) * 1.26, Math.min(parent.width, parent.height) * 0.41);

      COUNTRIES.forEach((c, idx) => {
        const rad = c.angle * Math.PI / 180;
        const x = cx + Math.cos(rad) * radius;
        const y = cy + Math.sin(rad) * radius;

        const chip = document.createElement('div');
        chip.className = 'gr-country';
        chip.textContent = c.name;
        chip.style.left = x + 'px';
        chip.style.top  = y + 'px';
        chip.dataset.idx = idx;
        overlay.appendChild(chip);
      });
    };

    layoutChips();
    const chipsResize = function () {
      layoutChips();
    };
    window.addEventListener('resize', chipsResize);
    homeResizeListeners.push({ event: 'resize', fn: chipsResize });
  }

  /* ── 3. Pinned globe scene timeline ── */
  if (document.getElementById('global-reach')) {
    if (reduced) {
      spinning = true;
      gsap.set(['#grEyebrow','#grTitle','#grSub'], { opacity: 1 });
      gsap.set('#grGlobe', { x: 0 });
      document.querySelectorAll('.gr-country').forEach(n => n.style.opacity = 1);
      gsap.set('.gr-card', { opacity: 1, y: 0, scale: 1 });
    } else {
      const isMobile = window.innerWidth <= 820;
      const startX = isMobile ? '12vw' : '28vw';
      const endX = isMobile ? '-12vw' : '-22vw';
      const entryX = isMobile ? '80vw' : '85vw';

      gsap.set('#grGlobe, #grOverlay', { x: entryX, scale: 1, opacity: 0, filter: 'blur(0px)' });
      gsap.set('.gr-country', { opacity: 0, y: 12, scale: 0.92 });
      gsap.set('.gr-card', { opacity: 0, y: 70, scale: 0.88 });

      // Entry ScrollTrigger
      const entryTrigger = ScrollTrigger.create({
        trigger: '#global-reach',
        start: 'top bottom',
        end: 'top top',
        scrub: 0.5,
        onUpdate: self => {
          gsap.set('#grGlobe, #grOverlay', {
            x: gsap.utils.interpolate(entryX, startX, self.progress),
            opacity: self.progress
          });
        }
      });
      homeScrollTriggers.push(entryTrigger);

      // Main pin timeline
      const tl = gsap.timeline({
        defaults: { ease: 'power2.out' },
        scrollTrigger: {
          trigger: '#global-reach',
          start: 'top top',
          end: '+=2350',
          scrub: 0.45,
          pin: '#grPin',
          anticipatePin: 1
        }
      });

      tl.to('#grEyebrow', { opacity: 1, duration: 0.22 }, 0)
        .to('#grTitle',   { opacity: 1, duration: 0.32 }, 0.03)
        .to('#grSub',     { opacity: 1, duration: 0.28 }, 0.35);

      tl.addLabel('moveLeft', 0.5)
        .to('#grGlobe, #grOverlay', { x: endX, duration: 1.2, ease: 'power2.inOut' }, 'moveLeft')
        .to(scrollOffset, { y: Math.PI * 0.45, duration: 1.2, ease: 'none' }, 'moveLeft');
      
      tl.addLabel('countries', 0.8);
      
      const countriesList = document.querySelectorAll('.gr-country');
      countriesList.forEach((_, idx) => {
        tl.to(`.gr-country[data-idx="${idx}"]`, { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: 'power3.out' }, `countries+=${idx * 0.15}`);
      });

      tl.addLabel('cards', 'countries+=1.8')
        .to('#grTitle', { opacity: 0.18, y: -18, duration: 0.32 }, 'cards')
        .to('#grSub',   { opacity: 0,    duration: 0.24 }, 'cards')
        .to('.gr-country', { opacity: 0.45, duration: 0.28 }, 'cards')
        .to('.gr-card', {
          opacity: 1, y: 0, scale: 1,
          duration: 0.45, stagger: 0.15,
          ease: 'power3.out'
        }, 'cards+=0.1');

      if (tl.scrollTrigger) homeScrollTriggers.push(tl.scrollTrigger);
    }
  }

  /* ── 4. Hero Entrance Animation ── */
  function runRefinedEntrance() {
    const navBrand = document.querySelector('.nav-brand');
    const navLinks = document.querySelectorAll('#navbar nav .nav-links > li');
    const heroEls  = ['#heroBadge','#heroH1','#heroSub','#heroCats','#heroActions','#heroStats','#scrollCue'];

    if (reduced) {
      if (navBrand) gsap.set(navBrand, { opacity: 1, y: 0 });
      gsap.set(heroEls, { opacity: 1, y: 0 });
      document.body.classList.add('hero-dimmed');
      return;
    }

    if (navBrand) gsap.set(navBrand, { opacity: 0, y: -6 });
    gsap.set(navLinks, { opacity: 0, y: -4 });
    gsap.set(heroEls, { opacity: 0, y: 24 });
    gsap.set('.floating-enquiry', { opacity: 0, scale: 0.8 });
    document.body.classList.remove('hero-dimmed');

    const tlHero = gsap.timeline({ defaults: { ease: 'power2.out' } });
    
    tlHero.to(navBrand, { opacity: 1, y: 0, duration: 0.8 }, 1.0)
          .to(navLinks, { opacity: 1, y: 0, duration: 0.7, stagger: 0.05 }, 1.0)
          .to('#heroBadge', { opacity: 1, y: 0, duration: 0.7 }, 1.1)
          .to('#heroH1', { opacity: 1, y: 0, duration: 0.9 }, 1.2)
          .to('#heroSub', { opacity: 1, y: 0, duration: 0.8 }, 1.3)
          .to('#heroCats', { opacity: 1, y: 0, duration: 0.7 }, 1.4)
          .to('#heroActions', { opacity: 1, y: 0, duration: 0.7 }, 1.4)
          .to('#heroStats', { opacity: 1, y: 0, duration: 0.8 }, 1.5)
          .to('#scrollCue', { opacity: 1, duration: 0.7 }, 1.6)
          .to('.floating-enquiry', { opacity: 1, scale: 1, duration: 0.8 }, 1.5);

    tlHero.add(function () {
      document.body.classList.add('hero-dimmed');
    }, 2.0);

    // Trigger counters
    document.querySelectorAll('.stat-pill-num[data-counter]').forEach(el => {
      animateCounter(el, 1.6);
    });
  }

  function animateCounter(el, delay) {
    const target = parseInt(el.getAttribute('data-counter'), 10);
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 2200;

    setTimeout(() => {
      let startTime = null;
      function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }
      function tick(timestamp) {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const val = Math.round(easeOutCubic(progress) * target);
        el.textContent = val.toLocaleString() + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }, delay * 1000);
  }

  // Bind preloader completion or run immediately
  const handlePreloaderDone = () => {
    runRefinedEntrance();
  };
  document.addEventListener('preloaderDone', handlePreloaderDone);
  // Store reference to clean up event listener
  homeObservers.push({
    event: 'preloaderDone',
    fn: handlePreloaderDone
  });

  // Fallback entrance
  const fbTimer = setTimeout(runRefinedEntrance, 4200);
  homeObservers.push({
    timer: fbTimer
  });

  /* ── 5. Parallax & Scroller Triggers ── */
  if (!reduced) {
    const heroVideo = document.querySelector('.hero-video-wrap video');
    if (heroVideo) {
      const vParallax = gsap.to(heroVideo, {
        yPercent: 18,
        ease: 'none',
        scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 1.2 }
      });
      if (vParallax.scrollTrigger) homeScrollTriggers.push(vParallax.scrollTrigger);
    }

    const heroContentAnim = gsap.to('#hero .hero-content', {
      yPercent: -7,
      opacity: 0.72,
      ease: 'none',
      scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 1.1 }
    });
    if (heroContentAnim.scrollTrigger) homeScrollTriggers.push(heroContentAnim.scrollTrigger);

    const globeWrapAnim = gsap.to('#global-reach .gr-globe-wrap', {
      rotateZ: 2.5,
      rotateX: -3,
      scale: 1.035,
      ease: 'none',
      scrollTrigger: { trigger: '#global-reach', start: 'top bottom', end: 'bottom top', scrub: 0.9 }
    });
    if (globeWrapAnim.scrollTrigger) homeScrollTriggers.push(globeWrapAnim.scrollTrigger);
  }
}

/* ── Standalone WebGL Earth Globe Sourcing Initialization (Lazy-loaded) ── */
export async function initGlobeAnimation() {
  if (renderer) return; // already initialized

  const mount = document.getElementById('grGlobeMount');
  if (!mount) return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Dynamically load ThreeJS and ThreeGlobe
  if (!THREE || !ThreeGlobe) {
    try {
      const [threeMod, globeMod] = await Promise.all([
        import('three'),
        import('three-globe')
      ]);
      THREE = threeMod;
      ThreeGlobe = globeMod.default || globeMod;
      window.THREE = THREE;
      window.ThreeGlobe = ThreeGlobe;
    } catch (err) {
      console.error("Failed to load WebGL Globe dependencies dynamically:", err);
      return;
    }
  }

  const isLight = document.body.classList.contains('light-theme');
  const brandColor = isLight ? '#007acc' : '#c9a14a';
  const haloColor = isLight ? 0xd0eaff : 0xd9c273;

  const size = Math.min(mount.clientWidth, mount.clientHeight) || 560;

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.15));
  renderer.setSize(size, size);
  renderer.setClearColor(0x000000, 0);
  if (THREE.SRGBColorSpace) renderer.outputColorSpace = THREE.SRGBColorSpace;
  if (THREE.ACESFilmicToneMapping) renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = isLight ? 1.0 : 1.25;

  mount.appendChild(renderer.domElement);

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
  camera.position.z = 230;

  scene.add(new THREE.AmbientLight(isLight ? 0xeef7ff : 0xd7e9ff, isLight ? 1.25 : 1.05));
  scene.add(new THREE.HemisphereLight(isLight ? 0xffffff : 0xf3fbff, isLight ? 0xd0eaff : 0x172a42, isLight ? 1.75 : 1.55));
  
  const key = new THREE.DirectionalLight(0xffffff, isLight ? 2.5 : 2.9);
  key.position.set(2.4, 1.7, 3.2); 
  scene.add(key);

  const rim = new THREE.DirectionalLight(isLight ? 0xd0eaff : 0xf0d58a, isLight ? 1.25 : 1.05);
  rim.position.set(-2.5, 0.4, 1.4); 
  scene.add(rim);

  const arcs = Object.keys(COUNTRY_COORDS).map(name => {
    const c = COUNTRY_COORDS[name];
    return { 
      startLat: INDIA.lat, 
      startLng: INDIA.lng, 
      endLat: c.lat, 
      endLng: c.lng, 
      color: isLight ? ['#005fa3', '#007acc'] : ['#f0e4bf', '#c9a14a'] 
    };
  });
  
  const points = Object.keys(COUNTRY_COORDS).map(name => {
    const c = COUNTRY_COORDS[name];
    return { lat: c.lat, lng: c.lng, size: 0.45, color: isLight ? '#005fa3' : '#f0e4bf' };
  });
  points.push({ lat: INDIA.lat, lng: INDIA.lng, size: 0.8, color: brandColor });

  const rings = [{ lat: INDIA.lat, lng: INDIA.lng, maxR: 5, propagationSpeed: 2, repeatPeriod: 1400 }];

  globe = new ThreeGlobe({ waitForGlobeReady: true, animateIn: false })
    .globeImageUrl(isLight 
      ? 'https://unpkg.com/three-globe@2.31.0/example/img/earth-blue-marble.jpg'
      : 'https://unpkg.com/three-globe@2.31.0/example/img/earth-night.jpg'
    )
    .bumpImageUrl('https://unpkg.com/three-globe@2.31.0/example/img/earth-topology.png')
    .showAtmosphere(true)
    .atmosphereColor(brandColor)
    .atmosphereAltitude(0.18)
    .arcsData(arcs)
    .arcColor('color')
    .arcStroke(0.62)
    .arcDashLength(0.58)
    .arcDashGap(0.92)
    .arcDashAnimateTime(1900)
    .arcAltitudeAutoScale(0.55)
    .pointsData(points)
    .pointAltitude(0.012)
    .pointRadius('size')
    .pointColor('color')
    .ringsData(rings)
    .ringColor(() => t => isLight ? `rgba(0,122,204,${1 - t})` : `rgba(201,161,74,${1 - t})`)
    .ringMaxRadius('maxR')
    .ringPropagationSpeed('propagationSpeed')
    .ringRepeatPeriod('repeatPeriod');

  const gm = globe.globeMaterial();
  if (gm) {
    gm.color = new THREE.Color(isLight ? '#ffffff' : '#0b1526');
    gm.emissive = new THREE.Color(isLight ? '#000000' : '#050c18');
    gm.emissiveIntensity = isLight ? 0.0 : 0.8;
    gm.roughness = isLight ? 0.7 : 0.8;
    gm.metalness = isLight ? 0.0 : 0.15;
    gm.bumpScale = isLight ? 1.0 : 1.0;
  }

  scene.add(globe);

  const haloGeo = new THREE.SphereGeometry(116, 64, 64);
  const haloMat = new THREE.MeshBasicMaterial({ color: haloColor, transparent: true, opacity: 0.095, side: THREE.BackSide });
  scene.add(new THREE.Mesh(haloGeo, haloMat));

  let isGlobeVisible = false;
  let lastTime = 0;

  function renderGlobe(timestamp) {
    if (!renderer) return; // cleanup happened
    if (!lastTime) lastTime = timestamp;
    const delta = timestamp - lastTime;
    lastTime = timestamp;

    const clampedDelta = Math.min(delta, 100);

    if (spinning && !reduced) {
      globeState.autoRotationY += clampedDelta * 0.00015;
    }
    if (globe) {
      globe.rotation.y = baseRotationY + globeState.autoRotationY + scrollOffset.y;
    }
    renderer.render(scene, camera);
    globeFrameId = requestAnimationFrame(renderGlobe);
  }

  const obs = new IntersectionObserver((entries) => {
    isGlobeVisible = entries[0].isIntersecting;
    if (isGlobeVisible) {
      if (!globeFrameId) {
        globeFrameId = requestAnimationFrame(renderGlobe);
      }
    } else {
      if (globeFrameId) {
        cancelAnimationFrame(globeFrameId);
        globeFrameId = null;
      }
    }
  }, { threshold: 0.01 });
  
  const grSection = document.getElementById('global-reach');
  if (grSection) {
    obs.observe(grSection);
    homeObservers.push({ observer: obs, el: grSection });
  }

  globe.rotation.x = 0.35;
  globe.rotation.y = baseRotationY;
  spinning = true;

  // Window resize handler
  const resizeGlobe = function () {
    if (!renderer || !mount) return;
    const sz = Math.min(mount.clientWidth, mount.clientHeight);
    if (sz > 0) renderer.setSize(sz, sz);
  };
  window.addEventListener('resize', resizeGlobe);
  homeResizeListeners.push({ event: 'resize', fn: resizeGlobe });

  // Listen for real-time theme changes
  themeChangedListener = () => {
    handleThemeChangeInGlobe();
  };
  document.addEventListener('themeChanged', themeChangedListener);
}

/* ── Dynamically Adjust WebGL Scene Color Properties on Theme Toggle ── */
export function handleThemeChangeInGlobe() {
  if (!globe || !THREE || !renderer || !scene || !camera) return;
  const isLight = document.body.classList.contains('light-theme');
  const brandColor = isLight ? '#007acc' : '#c9a14a';
  
  // Update globe material and image dynamically
  globe.globeImageUrl(isLight 
    ? 'https://unpkg.com/three-globe@2.31.0/example/img/earth-blue-marble.jpg' 
    : 'https://unpkg.com/three-globe@2.31.0/example/img/earth-night.jpg'
  );

  const gm = globe.globeMaterial();
  if (gm) {
    gm.color.set(isLight ? '#ffffff' : '#0b1526');
    gm.emissive.set(isLight ? '#000000' : '#050c18');
    gm.emissiveIntensity = isLight ? 0.0 : 0.8;
    gm.roughness = isLight ? 0.7 : 0.8;
    gm.metalness = isLight ? 0.0 : 0.15;
    gm.bumpScale = isLight ? 1.0 : 1.0;
  }
  
  // Update atmosphere
  globe.atmosphereColor(brandColor);
  
  // Update arcs and points colors
  const arcs = Object.keys(COUNTRY_COORDS).map(name => {
    const c = COUNTRY_COORDS[name];
    return { startLat: INDIA.lat, startLng: INDIA.lng, endLat: c.lat, endLng: c.lng, color: isLight ? ['#005fa3','#007acc'] : ['#f0e4bf','#c9a14a'] };
  });
  globe.arcsData(arcs);
  
  const points = Object.keys(COUNTRY_COORDS).map(name => {
    const c = COUNTRY_COORDS[name];
    return { lat: c.lat, lng: c.lng, size: 0.45, color: isLight ? '#005fa3' : '#f0e4bf' };
  });
  points.push({ lat: INDIA.lat, lng: INDIA.lng, size: 0.8, color: brandColor });
  globe.pointsData(points);
  
  globe.ringColor(() => t => isLight ? `rgba(0,122,204,${1 - t})` : `rgba(201,161,74,${1 - t})`);

  // Update light colors in scene
  scene.traverse(node => {
    if (node instanceof THREE.AmbientLight) {
      node.color.set(isLight ? 0xeef7ff : 0xd7e9ff);
      node.intensity = isLight ? 1.25 : 1.05;
    } else if (node instanceof THREE.HemisphereLight) {
      node.color.set(isLight ? 0xffffff : 0xf3fbff);
      node.groundColor.set(isLight ? 0xd0eaff : 0x172a42);
      node.intensity = isLight ? 1.75 : 1.55;
    } else if (node instanceof THREE.DirectionalLight) {
      if (node.position.x < 0) { // Rim light
        node.color.set(isLight ? 0xd0eaff : 0xf0d58a);
        node.intensity = isLight ? 1.25 : 1.05;
      } else { // Key light
        node.intensity = isLight ? 2.5 : 2.9;
      }
    } else if (node instanceof THREE.Mesh && node.geometry instanceof THREE.SphereGeometry && node.geometry.parameters.radius === 116) {
      // Halo mesh
      node.material.color.set(isLight ? 0xd0eaff : 0xd9c273);
    }
  });

  if (renderer) {
    renderer.toneMappingExposure = isLight ? 1.0 : 1.25;
  }
}

/* ── Cleanup home animations ── */
export function cleanupHomeAnimations() {
  // 1. WebGL Globe cleanup
  if (globeFrameId) {
    cancelAnimationFrame(globeFrameId);
    globeFrameId = null;
  }
  if (renderer) {
    renderer.dispose();
    if (renderer.domElement && renderer.domElement.parentNode) {
      renderer.domElement.parentNode.removeChild(renderer.domElement);
    }
    renderer = null;
  }
  scene = null;
  camera = null;
  globe = null;
  globeState.autoRotationY = 0;

  // 2. Kill ScrollTriggers
  homeScrollTriggers.forEach(st => {
    if (st && typeof st.kill === 'function') {
      st.kill(true);
    }
  });
  homeScrollTriggers = [];

  // 3. Remove resize listeners
  homeResizeListeners.forEach(item => {
    window.removeEventListener(item.event, item.fn);
  });
  homeResizeListeners = [];

  // 4. Observers and Timers
  homeObservers.forEach(item => {
    if (item.observer && item.el) {
      item.observer.unobserve(item.el);
    } else if (item.event && item.fn) {
      document.removeEventListener(item.event, item.fn);
    } else if (item.timer) {
      clearTimeout(item.timer);
    }
  });
  homeObservers = [];

  // 5. Theme Changed Listener
  if (themeChangedListener) {
    document.removeEventListener('themeChanged', themeChangedListener);
    themeChangedListener = null;
  }
}

/* ═══════════════════════════════════════════════
   3. GENERAL VIEWPORT REVEALS & TILT (Every Page)
═══════════════════════════════════════════════ */
export function initPageAnimations() {
  cleanupPageAnimations();

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Scroll Progress indicator (re-create if missing)
  let progress = document.getElementById('scroll-progress');
  if (!progress) {
    progress = document.createElement('div');
    progress.id = 'scroll-progress';
    progress.setAttribute('aria-hidden', 'true');
    document.body.prepend(progress);
  }

  let progressTick = false;
  function updateProgress() {
    if (!progressTick) {
      requestAnimationFrame(() => {
        const doc = document.documentElement;
        const max = Math.max(1, doc.scrollHeight - window.innerHeight);
        if (progress) {
          progress.style.transform = `scaleX(${Math.min(1, Math.max(0, window.scrollY / max))})`;
        }
        progressTick = false;
      });
      progressTick = true;
    }
  }
  updateProgress();
  window.addEventListener('scroll', updateProgress, { passive: true });

  // 1. Scroll Reveal Observer (`data-reveal`)
  activeRevealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.getAttribute('data-reveal-delay') || '0';
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, parseFloat(delay) * 1000);
        activeRevealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px'
  });

  document.querySelectorAll('[data-reveal]').forEach(el => {
    if (!el.classList.contains('visible')) {
      activeRevealObserver.observe(el);
    }
  });

  // 2. Cinema Reveal Observer (`cinema-reveal`)
  document.querySelectorAll('.stat-block, .pillar-card, .cert-card, .pipeline-step, .about-text > *, .gr-card, .compliance-card, .product-card, .logistics-card').forEach((el, index) => {
    el.classList.add('cinema-reveal');
    el.style.transitionDelay = Math.min(300, (index % 6) * 55) + 'ms';
  });

  activeCinemaObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-inview');
        activeCinemaObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -5% 0px' });

  document.querySelectorAll('.cinema-reveal').forEach(el => {
    if (!el.classList.contains('is-inview')) {
      activeCinemaObserver.observe(el);
    }
  });

  // 3. Consolidated 3D Tilt Hover (cards)
  if (!reduced && window.innerWidth >= 800) {
    document.querySelectorAll('.stat-block, .pillar-card, .cert-card, .gr-card, .product-card, .compliance-card, .logistics-card').forEach(card => {
      let rect = null;
      card.addEventListener('pointerenter', () => {
        rect = card.getBoundingClientRect();
      });
      card.addEventListener('pointermove', event => {
        if (!rect) rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width  - 0.5;
        const y = (event.clientY - rect.top)  / rect.height - 0.5;
        
        gsap.to(card, {
          rotateY: x * 8,
          rotateX: -y * 8,
          translateY: -5,
          transformPerspective: 800,
          duration: 0.3,
          ease: 'power1.out',
          overwrite: 'auto'
        });
      });
      card.addEventListener('pointerleave', () => {
        rect = null;
        gsap.to(card, {
          rotateY: 0,
          rotateX: 0,
          translateY: 0,
          duration: 0.45,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      });
    });
  }

  // 4. Reveal Fade-out on scrolling past top
  if (window.IntersectionObserver) {
    const fadeOutObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        const r = e.boundingClientRect;
        if (!e.isIntersecting && r.top < 0) e.target.classList.add('leaving');
        else e.target.classList.remove('leaving');
      });
    }, { threshold: [0, 0.05, 0.5], rootMargin: '-8% 0px -40% 0px' });
    document.querySelectorAll('section, .hero-content, .page-header').forEach(s => fadeOutObs.observe(s));
  }
}

/* ── Cleanup page animations ── */
export function cleanupPageAnimations() {
  if (activeRevealObserver) {
    activeRevealObserver.disconnect();
    activeRevealObserver = null;
  }
  if (activeCinemaObserver) {
    activeCinemaObserver.disconnect();
    activeCinemaObserver = null;
  }

  // Clear scroll progress styling
  const progress = document.getElementById('scroll-progress');
  if (progress) {
    progress.style.transform = 'scaleX(0)';
  }
}
