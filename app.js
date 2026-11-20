(function () {
  'use strict';

  /* The QR code opens the private payment and contact page.
     Replace with your real deployed address of dvpay-7k2q.html */
  var CONFIG = {
    waUrl: 'https://wa.me/234XXXXXXXXXX',
    payUrl: 'https://USERNAME.github.io/REPO/dvpay-7k2q.html',
    dark: '#0A3F8F',
    light: '#FFFFFF'
  };

  var container = document.getElementById('qr-container');
  var svg = null;

  try {
    svg = window.dvQR.render(CONFIG.payUrl, CONFIG.dark, CONFIG.light);
  } catch (e) {
    svg = null;
  }

  if (container) {
    if (svg) container.innerHTML = svg;
    else container.textContent = 'Unable to generate QR code. Please verify the payment link.';
  }

  var wa = document.querySelectorAll('[data-dv-wa]');
  for (var w = 0; w < wa.length; w++) wa[w].href = CONFIG.waUrl;

  var current = null;

  function dvOpen(id) {
    var page = document.getElementById(id);
    if (!page) return;
    current = page;
    page.hidden = false;
    page.scrollTop = 0;
    document.body.classList.add('dv-lock');
    var back = page.querySelector('.dv-back');
    if (back) back.focus();
  }

  function dvClose() {
    if (!current) return;
    current.hidden = true;
    current = null;
    document.body.classList.remove('dv-lock');
  }

  var openers = document.querySelectorAll('[data-dv-open]');
  for (var o = 0; o < openers.length; o++) {
    openers[o].addEventListener('click', function () {
      dvOpen(this.getAttribute('data-dv-open'));
    });
  }

  var closers = document.querySelectorAll('[data-dv-close]');
  for (var c = 0; c < closers.length; c++) {
    closers[c].addEventListener('click', dvClose);
  }

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('sw.js').catch(function () {});
    });
  }
})();
