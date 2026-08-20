/* Velly Chicken Spot — demo landing page interactions */
(function () {
  'use strict';

  /* ---------- mobile nav ---------- */
  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('.nav__link')) {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---------- signature menu carousel ---------- */
  var track = document.getElementById('menuTrack');
  if (track) {
    var viewport = track.closest('.menu__viewport');
    var index = 0;
    /* below 992px the viewport scrolls natively (swipeable), so the arrows
       drive scrollLeft instead of a transform */
    var isSwipe = function () {
      return !!viewport && getComputedStyle(viewport).overflowX !== 'visible';
    };
    var step = function () {
      var card = track.querySelector('.dish');
      if (!card) return 349;
      var gap = parseFloat(getComputedStyle(track).columnGap) || 31;
      return card.getBoundingClientRect().width + gap;
    };
    var maxIndex = function () {
      var cards = track.querySelectorAll('.dish').length;
      var visible = Math.max(1, Math.floor(track.parentElement.clientWidth / step()));
      return Math.max(0, cards - visible);
    };
    var render = function () {
      if (isSwipe()) { track.style.transform = ''; return; }
      track.style.transform = 'translateX(' + -index * step() + 'px)';
    };
    document.querySelectorAll('[data-menu]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var forward = btn.dataset.menu === 'next';
        if (isSwipe()) {
          /* Assign scrollLeft directly: CSS scroll-snap cancels programmatic
             smooth scrolling, and animating it by hand stalls (leaving snap
             disabled) whenever the tab is backgrounded and rAF pauses. The
             jump lands on a snap point, and swiping stays natively smooth.
             Clamp at the ends, since you cannot swipe past them either. */
          var max = viewport.scrollWidth - viewport.clientWidth;
          var cur = viewport.scrollLeft;
          viewport.scrollLeft = Math.max(0, Math.min(max, cur + (forward ? 1 : -1) * step()));
          return;
        }
        var maxI = maxIndex();
        index = forward
          ? (index >= maxI ? 0 : index + 1)
          : (index <= 0 ? maxI : index - 1);
        render();
      });
    });
    window.addEventListener('resize', function () {
      index = Math.min(index, maxIndex());
      render();
    });
  }

  /* ---------- FAQ accordion ---------- */
  var acc = document.getElementById('acc');
  if (acc) {
    acc.addEventListener('click', function (e) {
      var q = e.target.closest('.acc__q');
      if (!q) return;
      var item = q.parentElement;
      var wasOpen = item.classList.contains('is-open');
      acc.querySelectorAll('.acc__item').forEach(function (el) {
        el.classList.remove('is-open');
      });
      if (!wasOpen) item.classList.add('is-open');
    });
  }

  /* ---------- testimonial shuffle ---------- */
  var shots = document.getElementById('testiShots');
  if (shots) {
    document.querySelectorAll('[data-testi]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var imgs = Array.prototype.slice.call(shots.children);
        var srcs = imgs.map(function (i) { return i.getAttribute('src'); });
        var alts = imgs.map(function (i) { return i.getAttribute('alt'); });
        if (btn.dataset.testi === 'next') {
          srcs.push(srcs.shift()); alts.push(alts.shift());
        } else {
          srcs.unshift(srcs.pop()); alts.unshift(alts.pop());
        }
        imgs.forEach(function (img, i) {
          img.style.opacity = '0';
          setTimeout(function () {
            img.setAttribute('src', srcs[i]);
            img.setAttribute('alt', alts[i]);
            img.style.opacity = '1';
          }, 160);
        });
      });
    });
    Array.prototype.forEach.call(shots.children, function (img) {
      img.style.transition = 'opacity .18s ease';
    });
  }
})();
