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
      if (preloader) {
        preloader.classList.add('is-hidden');
      }
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

      navToggle.setAttribute(
        'aria-expanded',
        isOpen ? 'true' : 'false'
      );

    });

    // close menu after clicking a link
    document.querySelectorAll('.nav__link').forEach(function (link) {

      link.addEventListener('click', function () {

        header.classList.remove('nav-open');

        navToggle.setAttribute(
          'aria-expanded',
          'false'
        );

      });

    });

  }


  /* ---------------------------------------------------------------
     3. HERO SLIDER
     --------------------------------------------------------------- */
  (function heroSlider() {

    var slides = Array.prototype.slice.call(
      document.querySelectorAll('.hero__slide')
    );

    if (!slides.length) {
      return;
    }

    var dotsWrap = document.getElementById('heroDots');
    var prevBtn = document.getElementById('heroPrev');
    var nextBtn = document.getElementById('heroNext');

    var current = 0;

    var AUTOPLAY_MS = 6000;

    var timer;


    slides.forEach(function (_, i) {

      var dot = document.createElement('button');

      dot.setAttribute(
        'aria-label',
        'Go to slide ' + (i + 1)
      );

      if (i === 0) {
        dot.classList.add('is-active');
      }

      dot.addEventListener('click', function () {

        goTo(i);

        resetAutoplay();

      });

      if (dotsWrap) {
        dotsWrap.appendChild(dot);
      }

    });


    var dots = dotsWrap
      ? Array.prototype.slice.call(dotsWrap.children)
      : [];


    function goTo(index) {

      slides[current].classList.remove('is-active');

      if (dots[current]) {
        dots[current].classList.remove('is-active');
      }

      current =
        (index + slides.length) % slides.length;

      slides[current].classList.add('is-active');

      if (dots[current]) {
        dots[current].classList.add('is-active');
      }

    }


    function next() {
      goTo(current + 1);
    }


    function prev() {
      goTo(current - 1);
    }


    function resetAutoplay() {

      clearInterval(timer);

      timer = setInterval(
        next,
        AUTOPLAY_MS
      );

    }


    if (nextBtn) {

      nextBtn.addEventListener(
        'click',
        function () {

          next();

          resetAutoplay();

        }
      );

    }


    if (prevBtn) {

      prevBtn.addEventListener(
        'click',
        function () {

          prev();

          resetAutoplay();

        }
      );

    }


    resetAutoplay();

  })();


  /* ---------------------------------------------------------------
     4. GALLERY FILTER
     --------------------------------------------------------------- */
  (function galleryFilter() {

    var filterBtns =
      document.querySelectorAll('.filter-btn');

    var items =
      document.querySelectorAll('.gallery__item');


    filterBtns.forEach(function (btn) {

      btn.addEventListener('click', function () {

        filterBtns.forEach(function (b) {

          b.classList.remove('is-active');

        });


        btn.classList.add('is-active');


        var filter =
          btn.getAttribute('data-filter');


        items.forEach(function (item) {

          var match =
            filter === 'all' ||
            item.getAttribute('data-cat') === filter;


          item.classList.toggle(
            'is-hidden',
            !match
          );

        });

      });

    });

  })();


  /* ---------------------------------------------------------------
     5. TESTIMONIALS SLIDER
     --------------------------------------------------------------- */
  (function testimonialSlider() {

    var items =
      Array.prototype.slice.call(
        document.querySelectorAll('.testimonial')
      );


    if (!items.length) {
      return;
    }


    var dotsWrap =
      document.getElementById('testimonialDots');


    var current = 0;


    items.forEach(function (_, i) {

      var dot =
        document.createElement('button');


      dot.setAttribute(
        'aria-label',
        'Show testimonial ' + (i + 1)
      );


      if (i === 0) {
        dot.classList.add('is-active');
      }


      dot.addEventListener(
        'click',
        function () {
          show(i);
        }
      );


      if (dotsWrap) {
        dotsWrap.appendChild(dot);
      }

    });


    var dots = dotsWrap
      ? Array.prototype.slice.call(dotsWrap.children)
      : [];


    function show(index) {

      items[current].classList.remove(
        'is-active'
      );


      if (dots[current]) {
        dots[current].classList.remove(
          'is-active'
        );
      }


      current =
        (index + items.length) % items.length;


      items[current].classList.add(
        'is-active'
      );


      if (dots[current]) {
        dots[current].classList.add(
          'is-active'
        );
      }

    }


    setInterval(function () {

      show(current + 1);

    }, 5500);

  })();



  /* ---------------------------------------------------------------
     6. LIVE GOLD / SILVER RATE WIDGET
     --------------------------------------------------------------- */

  (function goldRateWidget() {


    /* -------------------------------------------------------------
       ELEMENT REFERENCES
       ------------------------------------------------------------- */

    var els = {

      /* Main rate cards */

      rate24k:
        document.getElementById('rate24k'),

      rate22k:
        document.getElementById('rate22k'),

      /* FIX: 18K was missing */

      rate18k:
        document.getElementById('rate18k'),

      rateSilver:
        document.getElementById('rateSilver'),


      /* Top ticker */

      tickerRate24k:
        document.getElementById('tickerRate24k'),

      tickerRate22k:
        document.getElementById('tickerRate22k'),

      tickerRateSilver:
        document.getElementById('tickerRateSilver'),


      /* Time */

      rateTime:
        document.getElementById('rateTime'),


      /* Table */

      table24kG:
        document.getElementById('table24kG'),

      table24k10:
        document.getElementById('table24k10'),


      table22kG:
        document.getElementById('table22kG'),

      table22k10:
        document.getElementById('table22k10'),


      table18kG:
        document.getElementById('table18kG'),

      table18k10:
        document.getElementById('table18k10'),


      tableSilverG:
        document.getElementById('tableSilverG'),

      tableSilver10:
        document.getElementById('tableSilver10'),


      /* Source */

      sourceNote:
        document.getElementById('rateSourceNote')

    };


    /* -------------------------------------------------------------
       LIVE STATUS
       No HTML change required.
       JS creates the LIVE indicator automatically.
       ------------------------------------------------------------- */

    var tickerLabel =
      document.querySelector('.ticker-bar__label');


    var liveIndicator = null;


    if (tickerLabel) {

      liveIndicator =
        document.createElement('span');


      liveIndicator.className =
        'om-live-indicator';


      liveIndicator.innerHTML =
        '<span class="om-live-dot"></span> LIVE';


      liveIndicator.style.display =
        'inline-flex';

      liveIndicator.style.alignItems =
        'center';

      liveIndicator.style.gap =
        '6px';

      liveIndicator.style.marginLeft =
        '8px';

      liveIndicator.style.fontWeight =
        '600';


      tickerLabel.appendChild(
        liveIndicator
      );


      /* Pulse animation */

      var liveStyle =
        document.createElement('style');


      liveStyle.textContent = `

        .om-live-indicator {
          opacity: .55;
          transition: opacity .25s ease;
        }

        .om-live-indicator.is-live {
          opacity: 1;
        }

        .om-live-indicator.is-updating {
          opacity: 1;
        }

        .om-live-indicator.is-offline {
          opacity: .7;
        }

        .om-live-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: currentColor;
          display: inline-block;
          box-shadow: 0 0 0 0 currentColor;
        }

        .om-live-indicator.is-live .om-live-dot {
          animation: omLivePulse 1.5s infinite;
        }

        .om-live-indicator.is-updating .om-live-dot {
          animation: omLivePulse .6s infinite;
        }

        @keyframes omLivePulse {
          0% {
            transform: scale(.85);
            opacity: .55;
            box-shadow: 0 0 0 0 currentColor;
          }

          50% {
            transform: scale(1.15);
            opacity: 1;
            box-shadow: 0 0 0 5px transparent;
          }

          100% {
            transform: scale(.85);
            opacity: .55;
            box-shadow: 0 0 0 0 transparent;
          }
        }

      `;


      document.head.appendChild(
        liveStyle
      );

    }


    /* -------------------------------------------------------------
       STATUS FUNCTIONS
       ------------------------------------------------------------- */

    function setUpdatingStatus() {

      if (!liveIndicator) {
        return;
      }


      liveIndicator.classList.remove(
        'is-live',
        'is-offline'
      );


      liveIndicator.classList.add(
        'is-updating'
      );


      liveIndicator.innerHTML =
        '<span class="om-live-dot"></span> UPDATING';

    }


    function setLiveStatus() {

      if (!liveIndicator) {
        return;
      }


      liveIndicator.classList.remove(
        'is-updating',
        'is-offline'
      );


      liveIndicator.classList.add(
        'is-live'
      );


      liveIndicator.innerHTML =
        '<span class="om-live-dot"></span> LIVE';

    }


    function setOfflineStatus() {

      if (!liveIndicator) {
        return;
      }


      liveIndicator.classList.remove(
        'is-updating',
        'is-live'
      );


      liveIndicator.classList.add(
        'is-offline'
      );


      liveIndicator.innerHTML =
        '<span class="om-live-dot"></span> OFFLINE';

    }



    /* -------------------------------------------------------------
       GOLD API KEY
       ------------------------------------------------------------- */

    var apiKey =
      'goldapi-ff31543e9519347a3f266f7f5d14fbf2-io';


    /* -------------------------------------------------------------
       TROY OUNCE -> GRAM
       ------------------------------------------------------------- */

    var TROY_OUNCE_GRAMS =
      31.1034768;



    /* -------------------------------------------------------------
       INR FORMAT
       ------------------------------------------------------------- */

    function formatINR(n) {

      if (!Number.isFinite(n)) {
        return '—';
      }


      return (
        '₹' +
        Math.round(n)
          .toLocaleString('en-IN')
      );

    }



    /* -------------------------------------------------------------
       CHANGE BADGE
       ------------------------------------------------------------- */

    function updateChangeBadge(
      id,
      changePerGram,
      changePercent
    ) {


      var badge =
        document.getElementById(id);


      if (
        !badge ||
        !Number.isFinite(changePerGram)
      ) {
        return;
      }


      var amount =
        Math.abs(changePerGram);


      var percent =
        Number.isFinite(changePercent)
          ? Math.abs(changePercent)
          : 0;


      if (changePerGram > 0) {


        badge.className =
          'rate-change rate-up';


        badge.innerHTML =
          '▲ ₹' +
          Math.round(amount)
            .toLocaleString('en-IN') +
          ' <small>+' +
          percent.toFixed(2) +
          '%</small>';


      } else if (changePerGram < 0) {


        badge.className =
          'rate-change rate-down';


        badge.innerHTML =
          '▼ ₹' +
          Math.round(amount)
            .toLocaleString('en-IN') +
          ' <small>-' +
          percent.toFixed(2) +
          '%</small>';


      } else {


        badge.className =
          'rate-change rate-flat';


        badge.innerHTML =
          '— 0.00%';

      }


      /* Existing pulse animation */

      badge.classList.remove(
        'rate-pulse'
      );


      void badge.offsetWidth;


      badge.classList.add(
        'rate-pulse'
      );

    }



    /* -------------------------------------------------------------
       RENDER LIVE DATA
       ------------------------------------------------------------- */

    function render(data) {


      var gold24k =
        Number(data.gold24k);


      var gold22k =
        Number(data.gold22k);


      var gold18k =
        Number(data.gold18k);


      var silver =
        Number(data.silver);



      /* -----------------------------------------------------------
         MAIN RATE CARDS
         ----------------------------------------------------------- */


      if (els.rate24k) {

        els.rate24k.textContent =
          formatINR(gold24k);

      }


      if (els.rate22k) {

        els.rate22k.textContent =
          formatINR(gold22k);

      }


      /* FIX: 18K */

      if (els.rate18k) {

        els.rate18k.textContent =
          formatINR(gold18k);

      }


      if (els.rateSilver) {

        els.rateSilver.textContent =
          formatINR(silver);

      }



      /* -----------------------------------------------------------
         TOP TICKER
         ----------------------------------------------------------- */


      if (els.tickerRate24k) {

        els.tickerRate24k.textContent =
          formatINR(gold24k);

      }


      if (els.tickerRate22k) {

        els.tickerRate22k.textContent =
          formatINR(gold22k);

      }


      if (els.tickerRateSilver) {

        els.tickerRateSilver.textContent =
          formatINR(silver);

      }



      /* -----------------------------------------------------------
         TABLE
         ----------------------------------------------------------- */


      if (els.table24kG) {

        els.table24kG.textContent =
          formatINR(gold24k);

      }


      if (els.table24k10) {

        els.table24k10.textContent =
          formatINR(gold24k * 10);

      }


      if (els.table22kG) {

        els.table22kG.textContent =
          formatINR(gold22k);

      }


      if (els.table22k10) {

        els.table22k10.textContent =
          formatINR(gold22k * 10);

      }


      if (els.table18kG) {

        els.table18kG.textContent =
          formatINR(gold18k);

      }


      if (els.table18k10) {

        els.table18k10.textContent =
          formatINR(gold18k * 10);

      }


      if (els.tableSilverG) {

        els.tableSilverG.textContent =
          formatINR(silver);

      }


      if (els.tableSilver10) {

        els.tableSilver10.textContent =
          formatINR(silver * 10);

      }



      /* -----------------------------------------------------------
         CURRENT TIME
         ----------------------------------------------------------- */


      if (els.rateTime) {


        var now =
          new Date();


        els.rateTime.textContent =
          'Updated ' +
          now.toLocaleTimeString(
            'en-IN',
            {
              hour: '2-digit',
              minute: '2-digit'
            }
          );

      }



      /* -----------------------------------------------------------
         SOURCE NOTE
         ----------------------------------------------------------- */


      if (els.sourceNote) {

        els.sourceNote.textContent =
          'Live rate from connected market feed.';

      }



      /* -----------------------------------------------------------
         MOVEMENT BADGES
         ----------------------------------------------------------- */


      updateChangeBadge(
        'gold24kChange',
        data.goldChangePerGram,
        data.goldChangePercent
      );


      updateChangeBadge(
        'gold22kChange',
        data.goldChangePerGram *
          0.9166667,
        data.goldChangePercent
      );


      updateChangeBadge(
        'gold18kChange',
        data.goldChangePerGram *
          0.75,
        data.goldChangePercent
      );


      updateChangeBadge(
        'silverChange',
        data.silverChangePerGram,
        data.silverChangePercent
      );


      /* -----------------------------------------------------------
         LIVE STATUS
         ----------------------------------------------------------- */

      setLiveStatus();

    }



    /* -------------------------------------------------------------
       GET LIVE RATES FROM GOLDAPI
       ------------------------------------------------------------- */

    function fetchLiveRate() {


      return Promise.all([


        /* ---------------------------------------------------------
           GOLD
           --------------------------------------------------------- */

        fetch(
          'https://www.goldapi.io/api/XAU/INR',
          {
            method: 'GET',

            headers: {
              'x-access-token': apiKey
            }
          }
        )


        .then(function (res) {


          if (!res.ok) {

            throw new Error(
              'Gold API failed: ' +
              res.status
            );

          }


          return res.json();

        }),



        /* ---------------------------------------------------------
           SILVER
           --------------------------------------------------------- */

        fetch(
          'https://www.goldapi.io/api/XAG/INR',
          {
            method: 'GET',

            headers: {
              'x-access-token': apiKey
            }
          }
        )


        .then(function (res) {


          if (!res.ok) {

            throw new Error(
              'Silver API failed: ' +
              res.status
            );

          }


          return res.json();

        })

      ])


      .then(function (results) {


        var gold =
          results[0];


        var silver =
          results[1];


        console.log(
          'GOLD API RESPONSE:',
          gold
        );


        console.log(
          'SILVER API RESPONSE:',
          silver
        );


        return {


          /* Gold prices */

          gold24k:
            Number(
              gold.price_gram_24k
            ),


          gold22k:
            Number(
              gold.price_gram_22k
            ),


          gold18k:
            Number(
              gold.price_gram_18k
            ),


          /* Silver */

          silver:
            Number(
              silver.price_gram_24k
            ),


          /* Gold movement */

          goldChangePerGram:
            Number(gold.ch) /
            TROY_OUNCE_GRAMS,


          goldChangePercent:
            Number(gold.chp),


          /* Silver movement */

          silverChangePerGram:
            Number(silver.ch) /
            TROY_OUNCE_GRAMS,


          silverChangePercent:
            Number(silver.chp)

        };

      });

    }



    /* -------------------------------------------------------------
       START LIVE RATE
       ------------------------------------------------------------- */

    setUpdatingStatus();


    /* Show updating in source text while API loads */

    if (els.sourceNote) {

      els.sourceNote.textContent =
        'Updating live market rate...';

    }


    fetchLiveRate()


      .then(function (data) {


        console.log(
          'LIVE METAL RATES:',
          data
        );


        render(data);

      })


      .catch(function (error) {


        console.error(
          'Live Gold/Silver API Error:',
          error
        );


        setOfflineStatus();


        if (els.sourceNote) {

          els.sourceNote.textContent =
            'Unable to load live market rate.';

        }


        if (els.rateTime) {

          els.rateTime.textContent =
            'Update failed';

        }

      });


  })();



  /* ---------------------------------------------------------------
     7. ENQUIRY / APPOINTMENT POPUP MODAL
     --------------------------------------------------------------- */
  (function enquiryModal() {


    var overlay =
      document.getElementById(
        'enquiryOverlay'
      );


    var openBtn =
      document.getElementById(
        'openEnquiryBtn'
      );


    var closeBtn =
      document.getElementById(
        'enquiryClose'
      );


    var form =
      document.getElementById(
        'enquiryForm'
      );


    var success =
      document.getElementById(
        'enquirySuccess'
      );


    if (!overlay) {
      return;
    }


    var AUTO_POPUP_DELAY_MS =
      15000;


    var hasShownAuto =
      false;



    function openModal() {

      overlay.hidden = false;

      document.body.style.overflow =
        'hidden';

    }



    function closeModal() {

      overlay.hidden = true;

      document.body.style.overflow =
        '';

    }



    if (openBtn) {

      openBtn.addEventListener(
        'click',
        openModal
      );

    }


    if (closeBtn) {

      closeBtn.addEventListener(
        'click',
        closeModal
      );

    }


    overlay.addEventListener(
      'click',
      function (e) {

        if (e.target === overlay) {

          closeModal();

        }

      }
    );


    document.addEventListener(
      'keydown',
      function (e) {

        if (
          e.key === 'Escape' &&
          !overlay.hidden
        ) {

          closeModal();

        }

      }
    );



    /* Auto-show once per visit */

    setTimeout(function () {


      if (
        !hasShownAuto &&
        !sessionStorage.getItem(
          'omj_popup_shown'
        )
      ) {


        openModal();


        hasShownAuto = true;


        sessionStorage.setItem(
          'omj_popup_shown',
          '1'
        );

      }


    }, AUTO_POPUP_DELAY_MS);



    if (form) {


      form.addEventListener(
        'submit',
        function (e) {


          e.preventDefault();


          form.hidden = true;


          success.hidden = false;


          setTimeout(
            closeModal,
            2500
          );


        }
      );

    }


  })();



  /* ---------------------------------------------------------------
     8. MAIN CONTACT FORM
     --------------------------------------------------------------- */
  (function contactForm() {


    var form =
      document.getElementById(
        'contactForm'
      );


    var success =
      document.getElementById(
        'contactSuccess'
      );


    if (!form) {
      return;
    }


    form.addEventListener(
      'submit',
      function (e) {


        e.preventDefault();


        handleContactSubmit(
          new FormData(form)
        );


        form.reset();


        success.hidden = false;


        setTimeout(
          function () {

            success.hidden = true;

          },
          5000
        );

      }
    );



    function handleContactSubmit(
      formData
    ) {


      console.log(
        'Enquiry submitted (demo only):',
        Object.fromEntries(formData)
      );


    }


  })();



  /* ---------------------------------------------------------------
     9. BACK TO TOP BUTTON
     --------------------------------------------------------------- */
  (function backToTop() {


    var btn =
      document.getElementById(
        'backToTop'
      );


    if (!btn) {
      return;
    }


    window.addEventListener(
      'scroll',
      function () {


        btn.classList.toggle(
          'is-visible',
          window.scrollY > 500
        );


      }
    );


    btn.addEventListener(
      'click',
      function () {


        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });


      }
    );


  })();



  /* ---------------------------------------------------------------
     10. FOOTER YEAR
     --------------------------------------------------------------- */

  var yearEl =
    document.getElementById(
      'footerYear'
    );


  if (yearEl) {

    yearEl.textContent =
      new Date().getFullYear();

  }


});