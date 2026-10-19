/* Full-month schedule, evaluated in the author’s Europe/London time zone. */
(() => {
  function easterMonth(year) {
    // Gregorian Easter Sunday (Meeus/Jones/Butcher computus); returns 1–12.
    const a = year % 19;
    const b = Math.floor(year / 100);
    const c = year % 100;
    const d = Math.floor(b / 4);
    const e = b % 4;
    const f = Math.floor((b + 8) / 25);
    const g = Math.floor((b - f + 1) / 3);
    const h = (19 * a + b - d - g + 15) % 30;
    const i = Math.floor(c / 4);
    const k = c % 4;
    const l = (32 + 2 * e + 2 * i - h - k) % 7;
    const m = Math.floor((a + 11 * h + 22 * l) / 451);
    return Math.floor((h + l - 7 * m + 114) / 31);
  }

  function bannerForDate(date = new Date()) {
    const parts = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Europe/London', year: 'numeric', month: 'numeric'
    }).formatToParts(date);
    const year = Number(parts.find(part => part.type === 'year').value);
    const month = Number(parts.find(part => part.type === 'month').value);
    if (month === 2) return 'valentines';
    if (month === easterMonth(year)) return 'easter';
    return ({ 9: 'autumn', 10: 'halloween', 12: 'christmas' })[month] || 'default';
  }

  // Keep the date rules independently testable without a browser.
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { easterMonth, bannerForDate };
  }
  if (typeof document === 'undefined') return;
  const hero = document.querySelector('.seasonal-hero');
  if (!hero) return;
  const artwork = hero.querySelector('#seasonal-banner-image');
  const themes = {
    default: {
      image: 'assets/banners/default.png',
      eyebrow: 'TWO WORLDS TO CALL HOME',
      heading: ['Where magic', 'feels like home.'],
      description: 'From a magical school in the Welsh mountains to the supernatural streets of Cedar Hollow, find your next place to belong.',
      footer: 'WELSH MAGIC. SUPERNATURAL COMFORT.'
    },
    valentines: {
      image: 'assets/banners/valentines.png',
      eyebrow: 'A LITTLE LOVE, A LITTLE MAGIC',
      heading: ['Stories with', 'a little heart.'],
      description: 'Friendship, belonging and a little supernatural charm. Spend February among the mountains of Mynydd Draig and the welcoming streets of Cedar Hollow.',
      footer: 'TWO WORLDS. PLENTY OF HEART.'
    },
    easter: {
      image: 'assets/banners/easter.png',
      eyebrow: 'SPRINGTIME IN TWO MAGICAL WORLDS',
      heading: ['A season of', 'new beginnings.'],
      description: 'Spring flowers brighten the Welsh mountains and Cedar Hollow’s shop windows. Step into a story full of magic, mystery and places to belong.',
      footer: 'A LITTLE SPRINGTIME MAGIC.'
    },
    autumn: {
      image: 'assets/banners/autumn.png',
      eyebrow: 'AUTUMN AT C. T. WINTERS',
      heading: ['Turning leaves.', 'Waiting stories.'],
      description: 'Golden leaves, mountain mist and warmly lit windows. Settle into September with the worlds of Mynydd Draig and Cedar Hollow.',
      footer: 'TWO WORLDS. ONE COSY SEASON.'
    },
    halloween: {
      image: 'assets/halloween-worlds.png',
      eyebrow: 'HALLOWEEN AT C. T. WINTERS',
      heading: ['A little magic.', 'A little mischief.'],
      description: 'From the mountains of Mynydd Draig to the streets of Cedar Hollow, discover two worlds for a season of long shadows and cosy reads.',
      footer: 'TWO WORLDS. ONE MAGICAL OCTOBER.'
    },
    christmas: {
      image: 'assets/banners/christmas.png',
      eyebrow: 'CHRISTMAS AT C. T. WINTERS',
      heading: ['A little wonder.', 'A warm welcome.'],
      description: 'Snow on the mountains, lights in the windows and stories to curl up with. Discover a little Christmas magic in Mynydd Draig and Cedar Hollow.',
      footer: 'TWO WORLDS. A LITTLE FESTIVE MAGIC.'
    }
  };

  function applyBanner(key) {
    if (hero.dataset.banner === key) return;
    const theme = themes[key];
    hero.dataset.banner = key;
    hero.querySelector('.eyebrow').textContent = theme.eyebrow;
    hero.querySelector('h1').replaceChildren(
      document.createTextNode(theme.heading[0]), document.createElement('br'),
      document.createTextNode(theme.heading[1])
    );
    hero.querySelector('.hero-description').textContent = theme.description;
    hero.querySelector('.hero-bottom > span').textContent = theme.footer;
    artwork.src = theme.image;
  }
  function refreshBanner() { applyBanner(bannerForDate()); }
  artwork.addEventListener('error', () => applyBanner('default'));
  refreshBanner();
  // Also switch an already-open tab at the month boundary or when revisited.
  setInterval(refreshBanner, 60000);
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) refreshBanner();
  });
})();
