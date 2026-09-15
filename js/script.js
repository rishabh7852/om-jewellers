/* ==================================================================
   OM JEWELLERS — SITE SCRIPT
   Sections: Preloader, Header/Nav, Hero Slider, Gallery Filter,
   Testimonials Slider, Live Gold Rate, Enquiry Popup, Forms,
   Back-to-top.
   ================================================================== */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------------------------------------------------------------
     1. PRELOADER
     --------------------------------------------------------------- */
  var preloader = document.getElementById('preloader');
  window.addEventListener('load', function () {
    setTimeout(function () {
      if (preloader) preloader.classList.add('is-hidden');
    }, 350);
  });

  /* ---------------------------------------------------------------
     2. MOBILE NAV TOGGLE
     --------------------------------------------------------------- */
  var header = document.getElementById('siteHeader');
  var navToggle = document.getElementById('navToggle');
  if (navToggle) {
    navToggle.addEventListener('click', function () {
      var isOpen = header.classList.toggle('nav-open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    // close menu after clicking a link (mobile)
    document.querySelectorAll('.nav__link').forEach(function (link) {
      link.addEventListener('click', function () {
        header.classList.remove('nav-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------------------------------------------------------------
     3. HERO SLIDER
     --------------------------------------------------------------- */
  (function heroSlider() {
    var slides = Array.prototype.slice.call(document.querySelectorAll('.hero__slide'));
    if (!slides.length) return;
    var dotsWrap = document.getElementById('heroDots');
    var prevBtn = document.getElementById('heroPrev');
    var nextBtn = document.getElementById('heroNext');
    var current = 0;
    var AUTOPLAY_MS = 6000;
    var timer;

    slides.forEach(function (_, i) {
      var dot = document.createElement('button');
      dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
      if (i === 0) dot.classList.add('is-active');
      dot.addEventListener('click', function () { goTo(i); resetAutoplay(); });
      dotsWrap.appendChild(dot);
    });
    var dots = Array.prototype.slice.call(dotsWrap.children);

    function goTo(index) {
      slides[current].classList.remove('is-active');
      dots[current].classList.remove('is-active');
      current = (index + slides.length) % slides.length;
      slides[current].classList.add('is-active');
      dots[current].classList.add('is-active');
    }
    function next() { goTo(current + 1); }
    function prev() { goTo(current - 1); }
    function resetAutoplay() {
      clearInterval(timer);
      timer = setInterval(next, AUTOPLAY_MS);
    }

    if (nextBtn) nextBtn.addEventListener('click', function () { next(); resetAutoplay(); });
    if (prevBtn) prevBtn.addEventListener('click', function () { prev(); resetAutoplay(); });

    resetAutoplay();
  })();

  /* ---------------------------------------------------------------
     4. GALLERY FILTER
     --------------------------------------------------------------- */
  (function galleryFilter() {
    var filterBtns = document.querySelectorAll('.filter-btn');
    var items = document.querySelectorAll('.gallery__item');
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filterBtns.forEach(function (b) { b.classList.remove('is-active'); });
        btn.classList.add('is-active');
        var filter = btn.getAttribute('data-filter');
        items.forEach(function (item) {
          var match = filter === 'all' || item.getAttribute('data-cat') === filter;
          item.classList.toggle('is-hidden', !match);
        });
      });
    });
  })();

  /* ---------------------------------------------------------------
     5. TESTIMONIALS SLIDER
     --------------------------------------------------------------- */
  (function testimonialSlider() {
    var items = Array.prototype.slice.call(document.querySelectorAll('.testimonial'));
    if (!items.length) return;
    var dotsWrap = document.getElementById('testimonialDots');
    var current = 0;

    items.forEach(function (_, i) {
      var dot = document.createElement('button');
      dot.setAttribute('aria-label', 'Show testimonial ' + (i + 1));
      if (i === 0) dot.classList.add('is-active');
      dot.addEventListener('click', function () { show(i); });
      dotsWrap.appendChild(dot);
    });
    var dots = Array.prototype.slice.call(dotsWrap.children);

    function show(index) {
      items[current].classList.remove('is-active');
      dots[current].classList.remove('is-active');
      current = (index + items.length) % items.length;
      items[current].classList.add('is-active');
      dots[current].classList.add('is-active');
    }

    setInterval(function () { show(current + 1); }, 5500);
  })();

  /* ---------------------------------------------------------------
     6. LIVE GOLD / SILVER RATE WIDGET
     -----------------------------------------------------------------
     HOW THIS WORKS RIGHT NOW:
       No gold-rate API key was provided, so this widget runs in DEMO
       MODE — it starts from a realistic base INR/gram price and
       gently fluctuates every few seconds so the ticker "feels" live.

     TO CONNECT A REAL LIVE RATE (recommended before launch):
       1. Sign up for a metal-rate API, e.g. https://metalpriceapi.com
          or https://www.goldapi.io (both offer a free tier + API key).
       2. Put your API key + endpoint in fetchLiveRate() below.
       3. Because most of these APIs block direct browser calls (CORS),
          you'll likely need a tiny backend proxy (PHP/Node) that calls
          the API with your key and returns JSON to this script — do
          NOT put a paid API key directly in this public JS file.
       4. Once fetchLiveRate() resolves with real numbers, everything
          else (the ticker bar + rates table) updates automatically.
     --------------------------------------------------------------- */
  (function goldRateWidget() {
    var els = {
      rate24k: document.getElementById('rate24k'),
      rate22k: document.getElementById('rate22k'),
      rateSilver: document.getElementById('rateSilver'),
      rateTime: document.getElementById('rateTime'),
      table24kG: document.getElementById('table24kG'),
      table24k10: document.getElementById('table24k10'),
      table22kG: document.getElementById('table22kG'),
      table22k10: document.getElementById('table22k10'),
      table18kG: document.getElementById('table18kG'),
      table18k10: document.getElementById('table18k10'),
      tableSilverG: document.getElementById('tableSilverG'),
      tableSilver10: document.getElementById('tableSilver10'),
      sourceNote: document.getElementById('rateSourceNote')
    };

    // Approximate starting points (INR per gram) — TODO: update base
    // values here to match your local market before going live.
    var base = {
      gold24k: 10850,
      silver: 128
    };

    function formatINR(n) {
      return '₹' + Math.round(n).toLocaleString('en-IN');
    }

    function render(gold24kPerGram, silverPerGram, isLive) {
      var gold22k = gold24kPerGram * 0.916;
      var gold18k = gold24kPerGram * 0.75;

      els.rate24k.textContent = formatINR(gold24kPerGram);
      els.rate22k.textContent = formatINR(gold22k);
      els.rateSilver.textContent = formatINR(silverPerGram);

      els.table24kG.textContent = formatINR(gold24kPerGram);
      els.table24k10.textContent = formatINR(gold24kPerGram * 10);
      els.table22kG.textContent = formatINR(gold22k);
      els.table22k10.textContent = formatINR(gold22k * 10);
      els.table18kG.textContent = formatINR(gold18k);
      els.table18k10.textContent = formatINR(gold18k * 10);
      els.tableSilverG.textContent = formatINR(silverPerGram);
      els.tableSilver10.textContent = formatINR(silverPerGram * 10);

      var now = new Date();
      els.rateTime.textContent = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

      if (els.sourceNote) {
        els.sourceNote.textContent = isLive
          ? 'Live rate from connected market feed.'
          : 'Demo rate shown — connect a live gold rate API (see js/script.js) before launch.';
      }
    }

    // Placeholder for a real API call. Returns a Promise.
    // Replace the body of this function once you have a backend/API key.
    function fetchLiveRate() {
      return Promise.reject('No live API configured yet'); // TODO: implement real fetch()
      /* Example once you have a backend proxy:
      return fetch('/api/gold-rate')
        .then(function (res) { return res.json(); })
        .then(function (data) {
          return { gold24k: data.gold24kPerGram, silver: data.silverPerGram };
        });
      */
    }

    function tickDemo() {
      // small random fluctuation to simulate a live-updating ticker
      base.gold24k += (Math.random() - 0.5) * 6;
      base.silver += (Math.random() - 0.5) * 0.4;
      render(base.gold24k, base.silver, false);
    }

    fetchLiveRate()
      .then(function (data) { render(data.gold24k, data.silver, true); })
      .catch(function () {
        tickDemo();
        setInterval(tickDemo, 8000); // refresh demo rate periodically
      });
  })();

  /* ---------------------------------------------------------------
     7. ENQUIRY / APPOINTMENT POPUP MODAL
     --------------------------------------------------------------- */
  (function enquiryModal() {
    var overlay = document.getElementById('enquiryOverlay');
    var openBtn = document.getElementById('openEnquiryBtn');
    var closeBtn = document.getElementById('enquiryClose');
    var form = document.getElementById('enquiryForm');
    var success = document.getElementById('enquirySuccess');
    if (!overlay) return;

    var AUTO_POPUP_DELAY_MS = 15000; // TODO: adjust or remove auto-popup timing
    var hasShownAuto = false;

    function openModal() {
      overlay.hidden = false;
      document.body.style.overflow = 'hidden';
    }
    function closeModal() {
      overlay.hidden = true;
      document.body.style.overflow = '';
    }

    if (openBtn) openBtn.addEventListener('click', openModal);
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeModal();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !overlay.hidden) closeModal();
    });

    // Auto-show once per visit after a delay, unless the user already
    // interacted with the popup or a session flag is set.
    setTimeout(function () {
      if (!hasShownAuto && !sessionStorage.getItem('omj_popup_shown')) {
        openModal();
        hasShownAuto = true;
        sessionStorage.setItem('omj_popup_shown', '1');
      }
    }, AUTO_POPUP_DELAY_MS);

    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        // TODO (BACKEND): send form data to your email/CRM service here.
        form.hidden = true;
        success.hidden = false;
        setTimeout(closeModal, 2500);
      });
    }
  })();

  /* ---------------------------------------------------------------
     8. MAIN CONTACT FORM
     --------------------------------------------------------------- */
  (function contactForm() {
    var form = document.getElementById('contactForm');
    var success = document.getElementById('contactSuccess');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      handleContactSubmit(new FormData(form));
      form.reset();
      success.hidden = false;
      setTimeout(function () { success.hidden = true; }, 5000);
    });

    function handleContactSubmit(formData) {
      // TODO (BACKEND): This is where you send the enquiry somewhere real.
      // Option A — Formspree / Web3Forms (no backend needed):
      //   fetch('https://formspree.io/f/YOUR_FORM_ID', {
      //     method: 'POST', body: formData, headers: { Accept: 'application/json' }
      //   });
      // Option B — your own server endpoint:
      //   fetch('/api/contact', { method: 'POST', body: formData });
      console.log('Enquiry submitted (demo only):', Object.fromEntries(formData));
    }
  })();

  /* ---------------------------------------------------------------
     9. BACK TO TOP BUTTON
     --------------------------------------------------------------- */
  (function backToTop() {
    var btn = document.getElementById('backToTop');
    if (!btn) return;
    window.addEventListener('scroll', function () {
      btn.classList.toggle('is-visible', window.scrollY > 500);
    });
    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  })();

  /* ---------------------------------------------------------------
     10. FOOTER YEAR
     --------------------------------------------------------------- */
  var yearEl = document.getElementById('footerYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});
