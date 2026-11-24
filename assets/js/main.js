/**
 * MacCheck Pro - Interactive Landing Page, In-Browser Simulator & Checkout Controller
 */

// Global Configuration with Country Support (USA at top, Canada, India)
const COUNTRIES = {
  usa: {
    name: 'USA',
    flag: '🇺🇸',
    currency: 'USD',
    symbol: '$',
    personal: { amount: 1.99, original: 4.99, symbol: '$', label: '1.99', originalLabel: '4.99' },
    pro: { amount: 5.99, original: 14.99, symbol: '$', label: '5.99', originalLabel: '14.99' }
  },
  canada: {
    name: 'Canada',
    flag: '🇨🇦',
    currency: 'CAD',
    symbol: 'C$',
    personal: { amount: 2.49, original: 6.99, symbol: 'C$', label: '2.49', originalLabel: '6.99' },
    pro: { amount: 7.99, original: 19.99, symbol: 'C$', label: '7.99', originalLabel: '19.99' }
  },
  india: {
    name: 'India',
    flag: '🇮🇳',
    currency: 'INR',
    symbol: '₹',
    personal: { amount: 59, original: 149, symbol: '₹', label: '59', originalLabel: '149' },
    pro: { amount: 149, original: 499, symbol: '₹', label: '149', originalLabel: '499' }
  }
};

const CONFIG = {
  // Replace with your real Razorpay Key ID (rzp_test_... or rzp_live_...)
  razorpayKeyId: localStorage.getItem('mcp_razorpay_key') || 'rzp_test_sampleKey123',
  currentCountry: localStorage.getItem('mcp_country') || 'india',
  currentCurrency: 'INR'
};

// Feature Screenshots Data for Tab Showcase
const FEATURES_DATA = {
  dashboard: {
    title: "100-Point Apple Silicon Hardware Verification & Score",
    subtitle: "Audits kernel device trees, physical memory allocations, logic board serial alignment, and corporate MDM/DEP enrollments.",
    image: "assets/images/dashboard-score.jpg",
    highlights: [
      "100% Genuine Apple Silicon verification algorithm",
      "Anti-RAM Spoofing: Probes true kernel physical memory via sysctl",
      "Logic board serial alignment against chassis serial",
      "Zero MDM / DEP Corporate remote management check"
    ]
  },
  audio: {
    title: "360° Cinematic Spatial Audio & Woofer Diagnostics",
    subtitle: "Dolby Atmos / THX style 360° sound orbit visualizer and 80Hz sub-bass sweeps to detect blown, buzzing, or rattling speakers.",
    image: "assets/images/spatial-audio.png",
    highlights: [
      "Dynamic 360° radar sound orbit visualizer with degrees",
      "80Hz deep sub-bass woofer check for membrane tears",
      "440Hz mid-range tweeter & stereo separation audit",
      "Binaural head-shadow filtering and rear reflections"
    ]
  },
  network: {
    title: "Network & Internet Speed Benchmark",
    subtitle: "Real-time Wi-Fi 6 RF radio telemetry, channel frequency, ping latency jitter, and live Apple CDN bandwidth throughput.",
    image: "assets/images/network-benchmark.png",
    highlights: [
      "Wi-Fi 6 (802.11ax) generation & PHY link speed",
      "Signal strength (RSSI) and background noise ratio (SNR)",
      "IP configuration, default gateway routing & DNS resolvers",
      "Apple CDN bandwidth throughput & responsiveness test"
    ]
  },
  keyboard: {
    title: "Real-Time Keyboard Matrix & Key Tester",
    subtitle: "Interactive 77-key physical tester to confirm responsiveness, springiness, and uniform backlight across all switches.",
    image: "assets/images/keyboard-matrix.png",
    highlights: [
      "Live visual feedback for every key strike",
      "Apple Silicon fn/Globe media control bypass mode",
      "Outer-corner stabilizer inspection for liquid spills",
      "Full ANSI / ISO Mac layout support"
    ]
  },
  screen: {
    title: "Liquid Retina XDR & Dead Pixel Checker",
    subtitle: "Edge-to-edge full-screen inspection to test 10,000-zone Mini-LED local dimming, backlight bleeding, and stuck pixels.",
    image: "assets/images/screen-xdr.png",
    highlights: [
      "Pure Black (#000000) Mini-LED local dimming test",
      "RGBW color cycle for stuck and dead pixels",
      "Detects aftermarket cheap IPS replacement panels",
      "True Tone & ambient light sensor pairing check"
    ]
  },
  camera: {
    title: "FaceTime HD Camera & Studio Mic Array",
    subtitle: "Verifies optical sensor clarity, automatic exposure, ambient pairing, and live 3-mic array audio VU sensitivity.",
    image: "assets/images/camera-mic.png",
    highlights: [
      "Live 1080p camera sensor feed test",
      "Real-time audio level VU meter with RMS sensitivity",
      "Green privacy indicator LED pairing test",
      "Clipping detection and background noise suppression check"
    ]
  },
  stress: {
    title: "120-Second CPU & Memory Allocation Stress Test",
    subtitle: "Forces the macOS Darwin kernel to wire real physical RAM pages and stresses CPU cores to detect thermal throttling and faulty solder balls.",
    image: "assets/images/stress-test.png",
    highlights: [
      "Real physical wired RAM allocation without swap",
      "Stresses all Performance & Efficiency CPU cores",
      "Detects thermal throttling & cooling fan failure",
      "Live terminal execution log output"
    ]
  },
  playbook: {
    title: "Physical, Port & Factory Gate Playbook",
    subtitle: "A comprehensive checklist covering swollen battery 4-corner wobble, pentalobe screws, Touch ID cryptographic pairing, and MagSafe 3.",
    image: "assets/images/physical-playbook.jpg",
    highlights: [
      "4-corner chassis wobble test for swollen battery cells",
      "Bottom plate pentalobe screw inspection guide",
      "Display hinge & lid-angle sleep sensor inspection",
      "All Thunderbolt 4 ports (data + power negotiation)"
    ]
  },
  certificate: {
    title: "Cryptographic Hardware Inspection Certificate",
    subtitle: "Generates an official, immutable audit report of all hardware serials, battery origin, and scores to share with buyers or sellers.",
    image: "assets/images/inspection-certificate.jpg",
    highlights: [
      "Exportable in beautiful HTML and clean Markdown formats",
      "Includes hardware serials, battery supplier, and SSV status",
      "Provides verified proof for marketplace resale (OLX, eBay, FB)",
      "Cryptographically sealed system volume verification"
    ]
  }
};

// Initialize DOM
document.addEventListener('DOMContentLoaded', () => {
  setupScrollAnimations();
  setupFeatureTabs();
  setupCountrySelector();
  setupMobileMenu();
  setupFaqAccordion();
  setupModalHandlers();
  setupLightbox();
  setupAppSimulator();
  checkUrlParamsForSuccess();
});

/**
 * Scroll Reveal Animations via IntersectionObserver
 */
function setupScrollAnimations() {
  const elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  if (!elements.length) return;

  if (!('IntersectionObserver' in window)) {
    elements.forEach(el => el.classList.add('revealed'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -30px 0px'
  });

  elements.forEach(el => observer.observe(el));
}

/**
 * Mobile Navigation Drawer & Hamburger Toggle
 */
function setupMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const drawer = document.getElementById('mobile-nav-drawer');
  const iconOpen = document.getElementById('mobile-menu-icon-open');
  const iconClose = document.getElementById('mobile-menu-icon-close');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');
  const mobileCountryBtns = document.querySelectorAll('.mobile-country-btn');

  if (!menuBtn || !drawer) return;

  const toggleMenu = (open) => {
    const isCurrentlyOpen = !drawer.classList.contains('hidden');
    const shouldOpen = open !== undefined ? open : !isCurrentlyOpen;
    if (shouldOpen) {
      drawer.classList.remove('hidden');
      iconOpen?.classList.add('hidden');
      iconClose?.classList.remove('hidden');
      menuBtn.setAttribute('aria-expanded', 'true');
    } else {
      drawer.classList.add('hidden');
      iconOpen?.classList.remove('hidden');
      iconClose?.classList.add('hidden');
      menuBtn.setAttribute('aria-expanded', 'false');
    }
  };

  menuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  // Close when clicking any nav link in drawer
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      toggleMenu(false);
    });
  });

  // Mobile country buttons
  mobileCountryBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const country = btn.getAttribute('data-country');
      if (country) {
        const item = document.querySelector(`.country-dropdown-item[data-country="${country}"]`);
        if (item) {
          item.click();
        }
      }
    });
  });

  // Close when clicking outside header
  document.addEventListener('click', (e) => {
    const header = document.querySelector('header');
    if (!header?.contains(e.target)) {
      toggleMenu(false);
    }
  });
}

/**
 * Feature Tab Switching Logic
 */
function setupFeatureTabs() {
  const tabs = document.querySelectorAll('.feature-tab-btn');
  const titleEl = document.getElementById('feature-tab-title');
  const subtitleEl = document.getElementById('feature-tab-subtitle');
  const imgEl = document.getElementById('feature-tab-img');
  const listEl = document.getElementById('feature-tab-list');

  if (!tabs.length || !imgEl) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const featureKey = tab.getAttribute('data-feature');
      const data = FEATURES_DATA[featureKey];
      if (!data) return;

      // Update active tab button style
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Animate image fade
      imgEl.style.opacity = '0';
      setTimeout(() => {
        titleEl.textContent = data.title;
        subtitleEl.textContent = data.subtitle;
        imgEl.src = data.image;
        imgEl.alt = data.title;
        imgEl.classList.remove('slide-fade-in');
        void imgEl.offsetWidth; // Trigger reflow for smooth re-animation
        imgEl.classList.add('slide-fade-in');

        if (listEl) {
          listEl.innerHTML = data.highlights
            .map(h => `<li class="flex items-center gap-2 text-slate-300 text-sm"><span class="text-emerald-400 font-bold">✓</span> ${h}</li>`)
            .join('');
        }

        imgEl.style.opacity = '1';
      }, 150);
    });
  });
}

/**
 * Top Left Country Selector Dropdown (Canada 🇨🇦, India 🇮🇳, USA 🇺🇸)
 */
function setupCountrySelector() {
  const triggerBtn = document.getElementById('country-dropdown-trigger');
  const dropdownMenu = document.getElementById('country-dropdown-menu');
  const arrowIcon = document.getElementById('country-dropdown-arrow');
  const dropdownItems = document.querySelectorAll('.country-dropdown-item');
  const closeBtn = document.getElementById('country-dropdown-close');

  // Toggle Dropdown Menu with Smooth Sliding Transition
  const toggleDropdown = (open) => {
    const isCurrentlyOpen = dropdownMenu?.classList.contains('open');
    const shouldOpen = open !== undefined ? open : !isCurrentlyOpen;
    if (shouldOpen) {
      dropdownMenu?.classList.add('open');
      triggerBtn?.setAttribute('aria-expanded', 'true');
      if (arrowIcon) arrowIcon.style.transform = 'rotate(180deg)';
    } else {
      dropdownMenu?.classList.remove('open');
      triggerBtn?.setAttribute('aria-expanded', 'false');
      if (arrowIcon) arrowIcon.style.transform = 'rotate(0deg)';
    }
  };

  triggerBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleDropdown();
  });

  closeBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleDropdown(false);
  });

  // Close dropdown when clicking or tapping outside (Desktop + Mobile)
  const handleOutsideInteraction = (e) => {
    if (!triggerBtn?.contains(e.target) && !dropdownMenu?.contains(e.target)) {
      if (dropdownMenu?.classList.contains('open')) {
        toggleDropdown(false);
      }
    }
  };
  document.addEventListener('click', handleOutsideInteraction);
  document.addEventListener('touchstart', handleOutsideInteraction, { passive: true });

  // Close dropdown on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && dropdownMenu?.classList.contains('open')) {
      toggleDropdown(false);
    }
  });

  // Close dropdown on window scroll
  window.addEventListener('scroll', () => {
    if (dropdownMenu?.classList.contains('open')) {
      toggleDropdown(false);
    }
  }, { passive: true });

  const updateCountry = (countryKey) => {
    if (!COUNTRIES[countryKey]) countryKey = 'india';
    CONFIG.currentCountry = countryKey;
    localStorage.setItem('mcp_country', countryKey);

    const country = COUNTRIES[countryKey];
    CONFIG.currentCurrency = country.currency;

    // Update Dropdown Trigger Display in Top Left (Apple-style: Flag + Country Name only, no currency tag)
    const flagEl = document.getElementById('selected-country-flag');
    const nameEl = document.getElementById('selected-country-name');

    if (flagEl) flagEl.textContent = country.flag;
    if (nameEl) nameEl.textContent = country.name;

    // Highlight active item in dropdown
    dropdownItems.forEach(item => {
      const c = item.getAttribute('data-country');
      const checkEl = item.querySelector('.country-check');
      if (c === countryKey) {
        item.classList.add('bg-emerald-500/15', 'text-emerald-400');
        item.classList.remove('text-slate-300');
        if (checkEl) checkEl.classList.remove('hidden');
      } else {
        item.classList.remove('bg-emerald-500/15', 'text-emerald-400');
        item.classList.add('text-slate-300');
        if (checkEl) checkEl.classList.add('hidden');
      }
    });

    // Update Mobile Drawer Country Buttons State
    document.querySelectorAll('.mobile-country-btn').forEach(btn => {
      const c = btn.getAttribute('data-country');
      const checkEl = btn.querySelector('.mobile-country-check');
      if (c === countryKey) {
        btn.classList.add('bg-emerald-500/20', 'border-emerald-500/30', 'text-emerald-400', 'font-semibold');
        btn.classList.remove('bg-dark-800', 'text-slate-300');
        if (checkEl) checkEl.classList.remove('hidden');
      } else {
        btn.classList.remove('bg-emerald-500/20', 'border-emerald-500/30', 'text-emerald-400', 'font-semibold');
        btn.classList.add('bg-dark-800', 'text-slate-300');
        if (checkEl) checkEl.classList.add('hidden');
      }
    });

    // Update all price elements across the site
    document.querySelectorAll('.price-personal').forEach(el => {
      el.textContent = `${country.personal.symbol}${country.personal.label}`;
    });
    document.querySelectorAll('.price-personal-original').forEach(el => {
      el.textContent = `${country.personal.symbol}${country.personal.originalLabel}`;
    });
    document.querySelectorAll('.price-pro').forEach(el => {
      el.textContent = `${country.pro.symbol}${country.pro.label}`;
    });
    document.querySelectorAll('.price-pro-original').forEach(el => {
      el.textContent = `${country.pro.symbol}${country.pro.originalLabel}`;
    });
    document.querySelectorAll('.currency-label').forEach(el => {
      el.textContent = country.currency;
    });

    // Toggle Special India Launch Sale Box (Only visible for India)
    const indiaSaleBox = document.getElementById('india-sale-box');
    if (indiaSaleBox) {
      if (countryKey === 'india') {
        indiaSaleBox.classList.remove('hidden');
      } else {
        indiaSaleBox.classList.add('hidden');
      }
    }
  };

  dropdownItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const countryKey = item.getAttribute('data-country');
      updateCountry(countryKey);
      toggleDropdown(false);
      const country = COUNTRIES[countryKey];
      showToast(`🌐 Switched country to ${country.flag} ${country.name}`);
    });
  });

  // Initialize with saved country (default: India)
  const initialCountry = localStorage.getItem('mcp_country') || 'india';
  updateCountry(initialCountry);
}

/**
 * FAQ Accordion Handler
 */
function setupFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const content = item.querySelector('.faq-content');
    const icon = item.querySelector('.faq-icon');

    if (!trigger || !content) return;

    trigger.addEventListener('click', () => {
      const isOpen = !content.classList.contains('hidden');
      faqItems.forEach(i => {
        i.querySelector('.faq-content')?.classList.add('hidden');
        const ic = i.querySelector('.faq-icon');
        if (ic) ic.style.transform = 'rotate(0deg)';
      });

      if (!isOpen) {
        content.classList.remove('hidden');
        if (icon) icon.style.transform = 'rotate(180deg)';
      }
    });
  });
}

/**
 * Checkout Modal & Razorpay Integration
 */
let selectedPlan = 'personal';

function setupModalHandlers() {
  const modal = document.getElementById('checkout-modal');
  const closeBtn = document.getElementById('modal-close-btn');

  document.querySelectorAll('[data-buy-plan]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const plan = btn.getAttribute('data-buy-plan');
      openCheckoutModal(plan);
    });
  });

  closeBtn?.addEventListener('click', () => {
    modal?.classList.remove('active');
  });

  modal?.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });

  document.getElementById('modal-pay-razorpay-btn')?.addEventListener('click', () => {
    launchRazorpayPayment();
  });

  document.getElementById('modal-test-pay-btn')?.addEventListener('click', () => {
    simulateSuccessfulPurchase();
  });
}

function openCheckoutModal(plan) {
  selectedPlan = plan || 'personal';
  const modal = document.getElementById('checkout-modal');
  const planTitle = document.getElementById('modal-plan-title');
  const planPrice = document.getElementById('modal-plan-price');
  const planDesc = document.getElementById('modal-plan-desc');

  const country = COUNTRIES[CONFIG.currentCountry] || COUNTRIES.india;
  const priceInfo = country[selectedPlan];

  if (planTitle) {
    planTitle.textContent = selectedPlan === 'pro' 
      ? 'MacCheck Pro — Inspector Suite (Commercial)' 
      : 'MacCheck Pro — Early Bird Personal Lifetime';
  }
  if (planPrice) {
    planPrice.innerHTML = `<span class="line-through text-slate-500 text-xs mr-1">${priceInfo.symbol}${priceInfo.originalLabel}</span> ${priceInfo.symbol}${priceInfo.label} (${country.currency})`;
  }
  if (planDesc) {
    planDesc.textContent = selectedPlan === 'pro' 
      ? 'Unlimited Mac inspections, commercial reports, custom branded certificates & priority updates.'
      : 'Early Bird Special: Single Mac lifetime license, 100-point hardware verification & instant download.';
  }

  modal?.classList.add('active');
}

/**
 * Launch Real Razorpay Standard Checkout
 */
function launchRazorpayPayment() {
  const name = document.getElementById('buyer-name')?.value.trim() || 'Mac Enthusiast';
  const email = document.getElementById('buyer-email')?.value.trim();
  const phone = document.getElementById('buyer-phone')?.value.trim() || '9999999999';

  if (!email || !email.includes('@')) {
    showToast('⚠️ Please enter a valid email to receive your license key & DMG!');
    document.getElementById('buyer-email')?.focus();
    return;
  }

  const country = COUNTRIES[CONFIG.currentCountry] || COUNTRIES.india;
  const priceObj = country[selectedPlan];
  const curr = country.currency;
  const amountSubunit = Math.round(priceObj.amount * 100);

  if (typeof Razorpay === 'undefined') {
    showToast('⚠️ Razorpay SDK is loading or blocked. Testing in demo mode...');
    setTimeout(() => simulateSuccessfulPurchase(), 1000);
    return;
  }

  const options = {
    key: CONFIG.razorpayKeyId,
    amount: amountSubunit,
    currency: curr,
    name: "MacCheck Pro",
    description: `Early Bird - ${selectedPlan === 'pro' ? 'Inspector Suite' : 'Lifetime License'} (${priceObj.symbol}${priceObj.label} ${curr})`,
    image: "assets/images/logo.png",
    handler: function (response) {
      showToast('✅ Payment successful! Redirecting to your download page...');
      const licenseKey = generateMockLicense();
      setTimeout(() => {
        window.location.href = `success.html?payment_id=${response.razorpay_payment_id}&plan=${selectedPlan}&email=${encodeURIComponent(email)}&license=${licenseKey}`;
      }, 1200);
    },
    prefill: {
      name: name,
      email: email,
      contact: phone
    },
    theme: {
      color: "#00F293"
    },
    modal: {
      ondismiss: function () {
        showToast('ℹ️ Checkout cancelled. You can retry anytime!');
      }
    }
  };

  try {
    const rzp = new Razorpay(options);
    rzp.on('payment.failed', function (response) {
      showToast(`❌ Payment Failed: ${response.error.description}`);
    });
    rzp.open();
  } catch (err) {
    console.error('Razorpay Error:', err);
    showToast('⚠️ Notice: Test Key is in placeholder mode. Simulating success...');
    setTimeout(() => simulateSuccessfulPurchase(), 1200);
  }
}

/**
 * Simulated Demo Purchase
 */
function simulateSuccessfulPurchase() {
  const email = document.getElementById('buyer-email')?.value.trim() || 'buyer@example.com';
  const licenseKey = generateMockLicense();
  const demoPaymentId = 'pay_demo_' + Math.random().toString(36).substring(2, 10).toUpperCase();

  showToast('⚡ Demo mode active! Generating license key & redirecting...');
  setTimeout(() => {
    window.location.href = `success.html?payment_id=${demoPaymentId}&plan=${selectedPlan}&email=${encodeURIComponent(email)}&license=${licenseKey}`;
  }, 1000);
}

function generateMockLicense() {
  const p1 = Math.random().toString(36).substring(2, 6).toUpperCase();
  const p2 = Math.random().toString(36).substring(2, 6).toUpperCase();
  const p3 = Math.random().toString(36).substring(2, 6).toUpperCase();
  const p4 = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `MCP-${p1}-${p2}-${p3}-${p4}`;
}

/* ========================================================
   IN-BROWSER MACCHECK PRO SIMULATOR ENGINE
   ======================================================== */

let webAudioCtx = null;
let currentOsc = null;
let stressTestInterval = null;
let drainInterval = null;
let drainSecondsLeft = 300;
const testedKeysSet = new Set();

function setupAppSimulator() {
  // 1. Sidebar Tab Navigation
  const navItems = document.querySelectorAll('.sim-nav-item');
  const viewPanes = document.querySelectorAll('.sim-view-pane');

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const targetId = item.getAttribute('data-sim-target');
      if (!targetId) return;

      navItems.forEach(n => n.classList.remove('active'));
      item.classList.add('active');

      viewPanes.forEach(pane => {
        if (pane.id === targetId) {
          pane.classList.remove('hidden');
          pane.classList.add('block');
        } else {
          pane.classList.add('hidden');
          pane.classList.remove('block');
        }
      });
    });
  });

  // 2. Re-Scan Live Mac on Dashboard
  const rescanBtn = document.getElementById('sim-rescan-btn');
  const scanProgressBar = document.getElementById('sim-scan-progress');
  const scanStatusPill = document.getElementById('sim-scan-status-pill');

  rescanBtn?.addEventListener('click', () => {
    rescanBtn.disabled = true;
    rescanBtn.innerHTML = `
      <svg class="w-3.5 h-3.5 animate-spin text-dark-900" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
      <span>Scanning Darwin Kernel...</span>
    `;

    if (scanProgressBar) {
      scanProgressBar.style.width = '0%';
      scanProgressBar.parentElement.classList.remove('hidden');
    }

    const steps = [
      { pct: '25%', text: 'Auditing sysctl hw.memsize (RAM)...' },
      { pct: '50%', text: 'Decoding IOKit Battery Microcontroller...' },
      { pct: '75%', text: 'Probing Apple DEP Cloud Enrollment...' },
      { pct: '100%', text: 'Cryptographic SSV Root Hash Verified!' }
    ];

    let stepIdx = 0;
    const interval = setInterval(() => {
      if (stepIdx < steps.length) {
        if (scanProgressBar) scanProgressBar.style.width = steps[stepIdx].pct;
        if (scanStatusPill) scanStatusPill.textContent = steps[stepIdx].text;
        stepIdx++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          if (scanProgressBar) scanProgressBar.parentElement.classList.add('hidden');
          rescanBtn.disabled = false;
          rescanBtn.innerHTML = `
            <svg class="w-3.5 h-3.5 text-dark-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
            <span>Re-Scan Live Mac</span>
          `;
          showToast('✅ Hardware Verification Complete: 100/100 Genuine Apple Silicon!');
        }, 500);
      }
    }, 450);
  });

  // 3. Screen Dimming & Dead Pixel Checker
  const screenPreview = document.getElementById('sim-screen-preview');
  const screenColorName = document.getElementById('sim-screen-color-name');
  const swatchBtns = document.querySelectorAll('.color-swatch-btn');
  const fsBtn = document.getElementById('sim-launch-fs-btn');
  const fsOverlay = document.getElementById('screen-test-fullscreen');

  swatchBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      swatchBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const color = btn.getAttribute('data-color');
      const name = btn.getAttribute('data-name');

      if (screenPreview) screenPreview.style.backgroundColor = color;
      if (screenColorName) screenColorName.textContent = name;
      if (fsOverlay) fsOverlay.style.backgroundColor = color;
    });
  });

  fsBtn?.addEventListener('click', () => {
    if (fsOverlay) {
      fsOverlay.classList.add('active');
      showToast('🖥️ Fullscreen Mode Active. Press ESC or click anywhere to exit.');
    }
  });

  fsOverlay?.addEventListener('click', () => {
    fsOverlay.classList.remove('active');
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && fsOverlay?.classList.contains('active')) {
      fsOverlay.classList.remove('active');
    }
  });

  // 3. Deep Battery Telemetry & 5-Min Drain Test
  setupBatterySimulator();

  // 4. Network & Speed Benchmark
  setupNetworkSimulator();

  // 5. Real-Time Physical Keyboard Matrix
  setupKeyboardTester();

  // 6. 360° Spatial Audio & Web Audio API Frequencies
  setupSpatialAudioTester();

  // 7. 120s CPU & RAM Stress Test
  setupStressTestSimulator();

  // 8. Physical Playbook Checklist (10 Points)
  setupPhysicalPlaybook();

  // 9. Inspection Certificate & Raw Terminal Diagnostics
  setupCertificateSubTabs();
}

/**
 * Interactive Keyboard Tester
 */
function setupKeyboardTester() {
  const testedCountEl = document.getElementById('sim-tested-keys-count');
  const resetBtn = document.getElementById('sim-reset-keys-btn');
  const markFKeysBtn = document.getElementById('sim-mark-fkeys-btn');

  const updateCount = () => {
    if (testedCountEl) testedCountEl.textContent = testedKeysSet.size;
  };

  // Physical Keydown Event Listener
  window.addEventListener('keydown', (e) => {
    // Only intercept if simulator keyboard view is visible or active
    const kbView = document.getElementById('sim-tab-keyboard');
    if (!kbView || kbView.classList.contains('hidden')) return;

    // Find key element by code or key
    const code = e.code;
    let keyEl = document.querySelector(`.mac-key[data-code="${code}"]`);
    if (!keyEl) {
      keyEl = document.querySelector(`.mac-key[data-key="${e.key.toLowerCase()}"]`);
    }

    if (keyEl) {
      keyEl.classList.add('pressed', 'verified');
      testedKeysSet.add(code || e.key);
      updateCount();

      // Soft click audio
      playSoftTick();

      // Remove pressed bounce after 150ms
      setTimeout(() => {
        keyEl.classList.remove('pressed');
      }, 150);
    }
  });

  resetBtn?.addEventListener('click', () => {
    document.querySelectorAll('.mac-key').forEach(k => {
      k.classList.remove('verified', 'pressed');
    });
    testedKeysSet.clear();
    updateCount();
    showToast('Keyboard matrix reset. Start typing to test!');
  });

  markFKeysBtn?.addEventListener('click', () => {
    for (let i = 1; i <= 12; i++) {
      const k = document.querySelector(`.mac-key[data-code="F${i}"]`);
      if (k) {
        k.classList.add('verified');
        testedKeysSet.add(`F${i}`);
      }
    }
    updateCount();
    showToast('F1–F12 marked verified!');
  });
}

function playSoftTick() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(320, ctx.currentTime);
    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.05);
  } catch (e) {
    // AudioContext blocked before user gesture
  }
}

/**
 * Web Audio API Frequency Generator
 */
function getAudioContext() {
  if (!webAudioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) webAudioCtx = new AudioContext();
  }
  if (webAudioCtx && webAudioCtx.state === 'suspended') {
    webAudioCtx.resume();
  }
  return webAudioCtx;
}

function stopCurrentTone() {
  if (currentOsc) {
    try {
      currentOsc.stop();
      currentOsc.disconnect();
    } catch (e) {}
    currentOsc = null;
  }
  const orb = document.querySelector('.radar-orb');
  if (orb) orb.classList.remove('fast');
}

function playTone(freq, pan = 0, duration = 2.0, type = 'sine') {
  stopCurrentTone();
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const panner = ctx.createStereoPanner ? ctx.createStereoPanner() : null;

  osc.type = type;
  osc.frequency.setValueAtTime(freq, ctx.currentTime);

  gain.gain.setValueAtTime(0, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.05);
  gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + duration - 0.1);
  gain.gain.linearRampToValueAtTime(0, ctx.currentTime + duration);

  if (panner) {
    panner.pan.setValueAtTime(pan, ctx.currentTime);
    osc.connect(panner);
    panner.connect(gain);
  } else {
    osc.connect(gain);
  }

  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + duration);
  currentOsc = osc;

  const orb = document.querySelector('.radar-orb');
  if (orb) orb.classList.add('fast');

  setTimeout(() => {
    if (orb) orb.classList.remove('fast');
  }, duration * 1000);
}

function setupSpatialAudioTester() {
  document.getElementById('sim-audio-left-woofer')?.addEventListener('click', () => {
    playTone(80, -0.9, 2.5);
    showToast('🔊 Testing Left Sub-Bass Woofer at 80Hz...');
  });

  document.getElementById('sim-audio-right-woofer')?.addEventListener('click', () => {
    playTone(80, 0.9, 2.5);
    showToast('🔊 Testing Right Sub-Bass Woofer at 80Hz...');
  });

  document.getElementById('sim-audio-stereo-woofer')?.addEventListener('click', () => {
    playTone(80, 0, 3.0);
    showToast('🔊 Testing Dual Stereo Force-Cancelling Woofers at 80Hz...');
  });

  document.getElementById('sim-audio-tweeters')?.addEventListener('click', () => {
    playTone(440, 0, 2.0);
    showToast('🔊 Testing Mid-Range Tweeters at 440Hz (Concert A)...');
  });

  document.getElementById('sim-audio-360-btn')?.addEventListener('click', () => {
    // 360 sweeping tone
    stopCurrentTone();
    const ctx = getAudioContext();
    if (!ctx) return;
    showToast('🎧 Simulating 360° Cinematic Sound Orbit...');

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const panner = ctx.createStereoPanner ? ctx.createStereoPanner() : null;

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(110, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 3.0);

    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 4.0);

    if (panner) {
      panner.pan.setValueAtTime(-1, ctx.currentTime);
      panner.pan.linearRampToValueAtTime(1, ctx.currentTime + 2.0);
      panner.pan.linearRampToValueAtTime(-1, ctx.currentTime + 4.0);
      osc.connect(panner);
      panner.connect(gain);
    } else {
      osc.connect(gain);
    }

    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 4.0);
    currentOsc = osc;

    const orb = document.querySelector('.radar-orb');
    if (orb) orb.classList.add('fast');
    setTimeout(() => {
      if (orb) orb.classList.remove('fast');
    }, 4000);
  });
}

/**
 * 120s Stress Test Simulator
 */
function setupStressTestSimulator() {
  const startBtn = document.getElementById('sim-stress-start-btn');
  const timerEl = document.getElementById('sim-stress-timer');
  const cpuLoadEl = document.getElementById('sim-stress-cpuload');
  const wiredRamEl = document.getElementById('sim-stress-wiredram');
  const logEl = document.getElementById('sim-stress-log');

  if (!startBtn) return;

  startBtn.addEventListener('click', () => {
    if (stressTestInterval) {
      // Stop test
      clearInterval(stressTestInterval);
      stressTestInterval = null;
      startBtn.innerHTML = `<span>▶ Start 2-Minute Stress Test</span>`;
      startBtn.className = "btn-primary text-xs py-2 px-5";
      if (cpuLoadEl) cpuLoadEl.textContent = '0%';
      if (wiredRamEl) wiredRamEl.textContent = '0 MB';
      if (timerEl) timerEl.textContent = '120s';
      showToast('Stress test stopped.');
      return;
    }

    startBtn.innerHTML = `<span>⏹ Stop Stress Test</span>`;
    startBtn.className = "btn-secondary text-xs py-2 px-5 bg-rose-500/20 text-rose-300 border-rose-500/30";

    let remaining = 120;
    let wired = 0;
    if (logEl) logEl.innerHTML = `<div>[00:00] Initializing physical memory allocator...</div>`;

    stressTestInterval = setInterval(() => {
      remaining--;
      if (timerEl) timerEl.textContent = `${remaining}s`;

      // Ramp up load
      if (remaining > 115) {
        if (cpuLoadEl) cpuLoadEl.textContent = `${Math.floor(Math.random() * 20 + 75)}%`;
        wired += 1024;
        if (wiredRamEl) wiredRamEl.textContent = `${wired} MB`;
        if (logEl) logEl.innerHTML += `<div>[00:${120 - remaining}] Wiring physical kernel pages: ${wired} MB allocated via vm_allocate()...</div>`;
      } else {
        if (cpuLoadEl) cpuLoadEl.textContent = `${Math.floor(Math.random() * 8 + 92)}%`;
        if (wiredRamEl) wiredRamEl.textContent = `6,144 MB`;
        if (remaining % 5 === 0 && logEl) {
          logEl.innerHTML += `<div>[00:${120 - remaining}] 8 Cores active • Temp 68°C • Zero thermal throttling detected. Solder balls intact.</div>`;
          logEl.scrollTop = logEl.scrollHeight;
        }
      }

      if (remaining <= 0) {
        clearInterval(stressTestInterval);
        stressTestInterval = null;
        startBtn.innerHTML = `<span>▶ Start 2-Minute Stress Test</span>`;
        startBtn.className = "btn-primary text-xs py-2 px-5";
        showToast('✅ 120-Second Stress Test Finished: Zero Throttling, Stable Solder Balls!');
      }
    }, 1000);
  });
}

/**
 * Battery Telemetry & 5-Minute Automated Drain Test
 */
function setupBatterySimulator() {
  const drainBtn = document.getElementById('sim-drain-start-btn');
  const resetBtn = document.getElementById('sim-drain-reset-btn');
  const countdownEl = document.getElementById('sim-drain-countdown');
  const rateEl = document.getElementById('sim-drain-rate');
  const dropEl = document.getElementById('sim-drain-drop');
  const verdictEl = document.getElementById('sim-drain-verdict');
  const btnText = document.getElementById('sim-drain-btn-text');
  const refreshBtn = document.getElementById('sim-battery-refresh-btn');

  refreshBtn?.addEventListener('click', () => {
    showToast('🔄 Battery registers refreshed from I/O Kit: 48 Cycles • 98.0% Health');
  });

  drainBtn?.addEventListener('click', () => {
    if (drainInterval) {
      // Pause
      clearInterval(drainInterval);
      drainInterval = null;
      if (btnText) btnText.textContent = 'Resume Drain Test';
      showToast('⏸️ 5-minute drain test paused.');
      return;
    }

    if (btnText) btnText.textContent = 'Pause Drain Test';
    showToast('⚡ 5-Minute automated battery discharge test started!');

    drainInterval = setInterval(() => {
      drainSecondsLeft--;
      const mins = Math.floor(drainSecondsLeft / 60);
      const secs = drainSecondsLeft % 60;
      if (countdownEl) {
        countdownEl.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
      }

      const elapsed = 300 - drainSecondsLeft;
      const dropMah = Math.min(18, Math.floor((elapsed / 300) * 16));
      const pctDrop = (dropMah / 5001 * 100).toFixed(2);

      if (dropEl) dropEl.textContent = `${dropMah} mAh`;
      if (rateEl) rateEl.textContent = `${pctDrop}% / 5m`;

      if (verdictEl && elapsed > 5) {
        verdictEl.textContent = 'Optimal Discharge Curve (<0.8%)';
        verdictEl.className = 'text-xs font-bold text-emerald-400 mt-1 block';
      }

      if (drainSecondsLeft <= 0) {
        clearInterval(drainInterval);
        drainInterval = null;
        if (btnText) btnText.textContent = 'Start 5-Min Drain Test';
        if (verdictEl) {
          verdictEl.textContent = 'PASSED: 100% Healthy Cell Impedance';
          verdictEl.className = 'text-xs font-bold text-emerald-400 mt-1 block';
        }
        showToast('✅ 5-Minute Battery Drain Complete: Normal 0.31% drop rate. Zero internal cell shorts!');
      }
    }, 1000);
  });

  resetBtn?.addEventListener('click', () => {
    if (drainInterval) {
      clearInterval(drainInterval);
      drainInterval = null;
    }
    drainSecondsLeft = 300;
    if (countdownEl) countdownEl.textContent = '05:00';
    if (dropEl) dropEl.textContent = '0 mAh';
    if (rateEl) rateEl.textContent = '0.0% / 5m';
    if (verdictEl) {
      verdictEl.textContent = 'Ready to Begin';
      verdictEl.className = 'text-xs font-bold text-emerald-400 mt-1 block';
    }
    if (btnText) btnText.textContent = 'Start 5-Min Drain Test';
    showToast('↺ Battery drain test reset to 5:00 baseline.');
  });
}

/**
 * Network Speed & Wi-Fi Telemetry Simulator
 */
function setupNetworkSimulator() {
  const speedBtn = document.getElementById('sim-run-speedtest-btn');
  const refreshBtn = document.getElementById('sim-network-refresh-btn');
  const downloadEl = document.getElementById('sim-net-download');
  const uploadEl = document.getElementById('sim-net-upload');
  const pingEl = document.getElementById('sim-net-ping');
  const jitterEl = document.getElementById('sim-net-jitter');
  const statusEl = document.getElementById('sim-net-status');

  refreshBtn?.addEventListener('click', () => {
    showToast('📶 Wi-Fi 6 (802.11ax) RF Link refreshed: -48 dBm RSSI • 1,201 Mbps Tx');
  });

  speedBtn?.addEventListener('click', () => {
    speedBtn.disabled = true;
    speedBtn.innerHTML = `
      <svg class="w-4 h-4 animate-spin text-dark-900" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
      <span>Benchmarking Apple CDN...</span>
    `;

    if (downloadEl) downloadEl.textContent = '0.0';
    if (uploadEl) uploadEl.textContent = '0.0';
    if (statusEl) statusEl.innerHTML = `<span class="text-emerald-400 font-bold">Measuring Download Stream via Apple CDN...</span>`;

    let step = 0;
    const testInterval = setInterval(() => {
      step++;
      if (step <= 6) {
        // Ramp download
        const currentDown = (step * 71.4 + Math.random() * 5).toFixed(1);
        if (downloadEl) downloadEl.textContent = currentDown;
      } else if (step <= 12) {
        // Final download, ramp upload
        if (downloadEl) downloadEl.textContent = '428.5';
        if (statusEl) statusEl.innerHTML = `<span class="text-sky-400 font-bold">Measuring Upload Bandwidth...</span>`;
        const currentUp = ((step - 6) * 19.2 + Math.random() * 3).toFixed(1);
        if (uploadEl) uploadEl.textContent = currentUp;
      } else {
        clearInterval(testInterval);
        speedBtn.disabled = false;
        speedBtn.innerHTML = `
          <svg class="w-4 h-4 text-dark-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
          <span>Run Speed Test</span>
        `;
        if (downloadEl) downloadEl.textContent = '428.5';
        if (uploadEl) uploadEl.textContent = '115.4';
        if (pingEl) pingEl.textContent = '14.2';
        if (jitterEl) jitterEl.textContent = '2.1';
        if (statusEl) statusEl.innerHTML = `Server: <strong>Apple CDN Edge • Low Latency Gateway</strong>`;
        showToast('🚀 Speed Test Complete: 428.5 Mbps Download • 115.4 Mbps Upload • 14.2ms Ping');
      }
    }, 250);
  });
}

/**
 * Physical Playbook Checklist (Full 10-Point Score & Actions)
 */
function setupPhysicalPlaybook() {
  const checkboxes = document.querySelectorAll('.sim-playbook-check');
  const countEl = document.getElementById('sim-playbook-count');
  const pctEl = document.getElementById('sim-playbook-pct');
  const markAllBtn = document.getElementById('sim-playbook-mark-all-btn');
  const resetBtn = document.getElementById('sim-playbook-reset-btn');

  const updatePlaybookScore = () => {
    const checked = document.querySelectorAll('.sim-playbook-check:checked').length;
    const total = checkboxes.length || 10;
    if (countEl) countEl.textContent = checked;
    const pct = Math.round((checked / total) * 100);
    if (pctEl) {
      pctEl.textContent = `${pct}% Score`;
      if (pct === 100) {
        pctEl.className = 'text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-lg';
      } else {
        pctEl.className = 'text-xs font-mono font-bold text-white bg-white/10 px-2.5 py-1 rounded-lg';
      }
    }
    return checked;
  };

  checkboxes.forEach(cb => {
    cb.addEventListener('change', () => {
      const checked = updatePlaybookScore();
      if (checked === checkboxes.length) {
        showToast('🎉 All 10 Physical Gate Checkpoints Verified as PASSED!');
      }
    });
  });

  markAllBtn?.addEventListener('click', () => {
    checkboxes.forEach(cb => { cb.checked = true; });
    updatePlaybookScore();
    showToast('✅ All 10 physical inspection checkpoints marked as PASSED!');
  });

  resetBtn?.addEventListener('click', () => {
    checkboxes.forEach(cb => { cb.checked = false; });
    updatePlaybookScore();
    showToast('↺ Physical checklist reset to unverified baseline (0/10).');
  });
}

/**
 * Inspection Certificate & Raw Terminal Logs Sub-Tab Switcher
 */
function setupCertificateSubTabs() {
  const certBtn = document.getElementById('sim-subtab-cert-btn');
  const logsBtn = document.getElementById('sim-subtab-logs-btn');
  const certView = document.getElementById('sim-cert-view');
  const logsView = document.getElementById('sim-logs-view');
  const copyScriptBtn = document.getElementById('sim-copy-script-btn');

  certBtn?.addEventListener('click', () => {
    certBtn.className = 'px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 transition-all flex items-center gap-1.5 cursor-pointer';
    logsBtn.className = 'px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-400 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer';
    certView?.classList.remove('hidden');
    logsView?.classList.add('hidden');
  });

  logsBtn?.addEventListener('click', () => {
    logsBtn.className = 'px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 transition-all flex items-center gap-1.5 cursor-pointer';
    certBtn.className = 'px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-400 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer';
    logsView?.classList.remove('hidden');
    certView?.classList.add('hidden');
  });

  copyScriptBtn?.addEventListener('click', () => {
    const script = `#!/usr/bin/env bash
# ==============================================================================
# MacCheck Pro — Manual Hardware Diagnostic Verification Script
# Reproduce all kernel diagnostics in macOS Terminal
# ==============================================================================
set -e

echo "[1/8] Auditing CPU brand..."
sysctl -n machdep.cpu.brand_string

echo "[2/8] Auditing physical memory allocations..."
sysctl -n hw.memsize

echo "[3/8] Reading Apple Smart Battery microcontroller..."
ioreg -r -c AppleSmartBattery | grep -E "DesignCapacity|CycleCount|MaxCapacity"

echo "[4/8] Probing NVMe NAND flash wear..."
smartctl -a /dev/disk0 || true

echo "[5/8] Checking MDM & Corporate DEP enrollment..."
profiles status -type enrollment

echo "[6/8] Validating Signed System Volume (SSV) Seal..."
diskutil apfs listCryptoUsers /

echo "[7/8] Display and Liquid Retina XDR color matrix..."
system_profiler SPDisplaysDataType

echo "[8/8] Checking Wi-Fi PHY mode and RSSI link quality..."
/System/Library/PrivateFrameworks/Apple80211.framework/Resources/airport -I

echo "Diagnostic run complete!"`;
    copyToClipboard(script, '📋 Complete 8-command diagnostic script copied to clipboard!');
  });
}

/**
 * Image Lightbox
 */
function setupLightbox() {
  const lightbox = document.getElementById('image-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const closeBtn = document.getElementById('lightbox-close');

  document.querySelectorAll('[data-zoomable]').forEach(el => {
    el.style.cursor = 'zoom-in';
    el.addEventListener('click', () => {
      const src = el.getAttribute('src');
      const alt = el.getAttribute('alt') || 'MacCheck Pro Screenshot';
      if (lightboxImg) lightboxImg.src = src;
      if (lightboxCaption) lightboxCaption.textContent = alt;
      lightbox?.classList.add('active');
    });
  });

  closeBtn?.addEventListener('click', () => lightbox?.classList.remove('active'));
  lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox) lightbox.classList.remove('active');
  });
}

/**
 * Toast Notification Utility
 */
function showToast(message) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = message;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

/**
 * Copy to Clipboard Helper
 */
window.copyToClipboard = function (text, successMsg) {
  navigator.clipboard.writeText(text).then(() => {
    showToast(successMsg || 'Copied to clipboard!');
  }).catch(() => {
    showToast('Failed to copy. Please select and copy manually.');
  });
};

/**
 * Success Page URL parameters loader
 */
function checkUrlParamsForSuccess() {
  const urlParams = new URLSearchParams(window.location.search);
  const paymentId = urlParams.get('payment_id');
  const plan = urlParams.get('plan');
  const email = urlParams.get('email');
  const license = urlParams.get('license');

  const pIdEl = document.getElementById('order-payment-id');
  const pPlanEl = document.getElementById('order-plan-name');
  const pEmailEl = document.getElementById('order-email');
  const pLicEl = document.getElementById('order-license-key');

  if (pIdEl && paymentId) pIdEl.textContent = paymentId;
  if (pPlanEl && plan) pPlanEl.textContent = plan === 'pro' ? 'MacCheck Pro (Inspector Suite)' : 'MacCheck Pro (Personal Lifetime)';
  if (pEmailEl && email) pEmailEl.textContent = email;
  if (pLicEl && license) pLicEl.textContent = license;
}
