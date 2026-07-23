// Radical Design — main.js

(function () {
  var cursor = document.querySelector('.cursor');
  if (!cursor) return;

  // Only enable the custom cursor for devices with a precise pointer (mouse)
  if (!window.matchMedia('(pointer: fine)').matches) return;

  var x = window.innerWidth / 2;
  var y = window.innerHeight / 2;
  var targetX = x;
  var targetY = y;
  var shown = false;

  window.addEventListener('mousemove', function (e) {
    targetX = e.clientX;
    targetY = e.clientY;

    if (!shown) {
      shown = true;
      x = targetX;
      y = targetY;
      cursor.style.opacity = '1';
    }
  });

  document.addEventListener('mouseleave', function () {
    cursor.style.opacity = '0';
  });

  document.addEventListener('mouseenter', function () {
    if (shown) cursor.style.opacity = '1';
  });

  // Grow the dot over interactive elements
  var interactive = document.querySelectorAll('a, button');
  interactive.forEach(function (el) {
    el.addEventListener('mouseenter', function () {
      cursor.classList.add('cursor--hover');
    });
    el.addEventListener('mouseleave', function () {
      cursor.classList.remove('cursor--hover');
    });
  });

  function render() {
    x += (targetX - x) * 0.2;
    y += (targetY - y) * 0.2;
    cursor.style.transform = 'translate3d(' + x + 'px, ' + y + 'px, 0)';
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
})();

// Burger / mobile menu
(function () {
  var burger = document.querySelector('[data-burger]');
  var menu = document.querySelector('[data-mobile-menu]');
  if (!burger || !menu) return;

  function setOpen(open) {
    burger.classList.toggle('is-open', open);
    menu.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    menu.setAttribute('aria-hidden', open ? 'false' : 'true');
    document.body.classList.toggle('menu-open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  }

  burger.addEventListener('click', function () {
    setOpen(!menu.classList.contains('is-open'));
  });

  // Close on nav item click
  menu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () { setOpen(false); });
  });

  // Close on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menu.classList.contains('is-open')) setOpen(false);
  });

  // Reset when switching back to desktop width
  window.addEventListener('resize', function () {
    if (window.innerWidth > 900 && menu.classList.contains('is-open')) setOpen(false);
  });
})();

// Clients marquee
(function () {
  var marquee = document.querySelector('[data-marquee] .marquee__track');
  if (!marquee) return;

  var clients = [
    'Bell Integrator', 'ЭТАЛОН', 'Цифровая Сборка', 'Ортлайт', 'Титан 2',
    'Вконтакте', 'Positive Tehcnologies', 'ИТ Крым', 'Росатом', 'Kitfort',
    'Spark equation', 'RBI', 'Tensar', 'Alean', 'Nordigy', 'Еврогазстрой',
    'FK-Ramps', 'НИАС-Центр', 'ПервыйБит', 'Церебро Таргет', 'Ленэнерго',
    'Проектная культура', 'RingCentral', 'мифи', 'DINS', 'Факт', 'ITG',
    'Балтийская коммерция', 'ЦБИ', 'Ортграф', 'Digital Design',
    'БФА Деволопмент', 'IT club', 'VLP', 'BIG data', 'Majestic',
    'Bolid Team', 'U Apart', 'Komofloor', 'БТК Групп. ПрофМастер',
    'Индустрия-Сервис', 'Кронштад', 'Аргус спектр', 'Аврора', 'Ikon Tyres'
  ];

  function buildGroup() {
    var group = document.createElement('div');
    group.className = 'marquee__group';
    clients.forEach(function (name, i) {
      if (i > 0) {
        var sep = document.createElement('span');
        sep.className = 'marquee__sep marquee__sep--accent';
        sep.textContent = '//';
        group.appendChild(sep);
      }
      var item = document.createElement('span');
      item.className = 'marquee__item';
      item.textContent = name;
      group.appendChild(item);
    });
    // trailing separator so the loop reads continuously
    var tail = document.createElement('span');
    tail.className = 'marquee__sep marquee__sep--accent';
    tail.textContent = '//';
    group.appendChild(tail);
    return group;
  }

  // Two identical groups → seamless -50% loop
  marquee.appendChild(buildGroup());
  marquee.appendChild(buildGroup());
})();

// Awards list + "show more" toggle
(function () {
  var list = document.querySelector('[data-awards-list]');
  var moreBtn = document.querySelector('[data-awards-more]');
  if (!list) return;

  var COLLAPSED_COUNT = 8;

  var awards = [
    { year: '2025', name: 'ADD AWARDS', url: 'https://addawards.ru/winners/2025/402885/' },
    { year: '2025', name: 'ADD AWARDS', url: 'https://addawards.ru/winners/2025/402927/' },
    { year: '2025', name: 'BEST OFICE AWARDS', url: 'https://www.officenext.ru/projects/project-113950-aurix/' },
    { year: '2024', name: 'ADD AWARDS', url: 'https://addawards.ru/winners/2024/345735/' },
    { year: '2024', name: 'BEST OFICE AWARDS', url: 'https://www.officenext.ru/projects/project-96725-nevskaya-bazilika/' },
    { year: '2024', name: 'BEST OFICE AWARDS', url: 'https://www.officenext.ru/projects/project-96721-bell-integrator/' },
    { year: '2024', name: 'BEST OFICE AWARDS', url: 'https://www.officenext.ru/projects/project-96727-u-apart/' },
    { year: '2023', name: 'BEST OFICE AWARDS', url: 'https://www.officenext.ru/projects/project-63142-qubity/' },
    { year: '2022', name: 'BEST OFICE AWARDS', url: 'https://www.officenext.ru/projects/project-59911-profmaster/' },
    { year: '2022', name: 'BEST OFICE AWARDS', url: 'https://www.officenext.ru/projects/project-60493-ortgraph/' },
    { year: '2022', name: 'BEST OFICE AWARDS', url: 'https://www.officenext.ru/projects/project-60042-vlp/' },
    { year: '2021', name: 'BEST OFICE AWARDS', url: 'https://www.officenext.ru/projects/project-51356-fk-ramps/' },
    { year: '2021', name: 'ADD AWARDS', url: 'https://addawards.ru/winners/2022/217558/' },
    { year: '2021', name: 'ADD AWARDS', url: 'https://addawards.ru/winners/2022/217573/' },
    { year: '2021', name: '«Офис.СПб»', url: 'http://projectbaltia.com/competitions-ru/21526/' },
    { year: '2021', name: 'Соединяя Мосты, Сочи', url: 'https://arch-sochi.ru/2021/04/soedinyaya-mosty-na-rivere-otkrytyj-arhitekturnyj-konkurs/' },
    { year: '2021', name: 'Denkmal Award', url: 'https://denkmal.moscow/denkmal-awards' },
    { year: '2020', name: 'Ресурс Периферии', url: 'http://projectbaltia.com/competitions-ru/21526/' },
    { year: '2019', name: '«Офис.СПб»', url: 'http://projectbaltia.com/announcement-ru/17482/' },
    { year: '2019', name: 'Новое пространство Росатома', url: 'https://projectnext.ru/competitions/competition-38603-novoe-prostranstvo-rosatoma/' },
    { year: '2018', name: 'ADD AWARDS', url: 'https://addawards.ru/nominations/detail.php?ELEMENT_ID=71417' },
    { year: '2018', name: 'Tile Story', url: 'https://www.officenext.ru/orientir/article_36646_konkurs-show-tile/' },
    { year: '2017', name: '«Офис.СПб»', url: 'http://projectbaltia.com/down_news-ru/15632/' },
    { year: '2016', name: 'Архитектурный образ России', url: 'https://archobraz.ru/' },
    { year: '2013', name: 'Flex Office', url: 'https://www.architime.ru/competition/compexibition220513.htm' },
    { year: '2012', name: 'Зеленый проект', url: 'https://www.architime.ru/competition/fest291112greenproject.htm' },
    { year: '2026', name: 'Hotel Business Days by Ruviera', url: 'https://hbd.su/saint-petersburg' },
    { year: '2025', name: 'Клуб строителей, форум', url: 'https://klub-stroitelei.ru/balka_spb_11/4' },
    { year: '2025', name: 'Hotel Business Days by Ruviera', url: 'https://hbd.su/saint-petersburg/speakers' },
    { year: '2025', name: '«Коммерсантъ», HoReCa', url: 'https://events.kommersant.ru/spb/events/horeca-2025-trendy-i-vyzovy/' },
    { year: '2025', name: '«Архитектура и гостеприимство»', url: 'https://archandhotels.pro/tpost/vtis13sou1-17062025' },
    { year: '2025', name: 'Бизнес и Дизайн Диалог Спб Best office', url: 'https://www.officenext.ru/practices/article_116238_biznes-sreda-peterburga-novye-trendy-i-modeli/' },
    { year: '2025', name: 'Состав жюри «Золотой Трезини»', url: 'https://www.goldtrezzini.ru/about/' },
    { year: '2022', name: 'Best office', url: 'https://www.dp.ru/a/2022/10/14/Radical_design_prezentova' },
    { year: '2020', name: 'Вебинары «Архитектурная керамика. Экстерьер & интерьер»', url: 'http://projectbaltia.com/announcement-ru/19985/' },
    { year: '2018', name: 'Обучающий «Офис.СПб»', url: 'http://projectbaltia.com/announcement-ru/15513/' }
  ];

  var ARROW = '<svg class="award__arrow icon" width="26" height="26" viewBox="0 0 26 26" fill="none"><path d="M7 19L19 7M19 7H9M19 7V17" stroke="currentColor" stroke-width="1.5"/></svg>';

  awards.forEach(function (a, i) {
    var row = document.createElement('a');
    row.href = a.url || '#';
    if (a.url) {
      row.target = '_blank';
      row.rel = 'noopener noreferrer';
    }
    row.className = 'award' + (i >= COLLAPSED_COUNT ? ' award--hidden' : '');
    row.innerHTML =
      '<span class="award__year">' + a.year + '</span>' +
      '<span class="award__name">' + a.name + '</span>' +
      ARROW;
    list.appendChild(row);
  });

  if (!moreBtn || awards.length <= COLLAPSED_COUNT) {
    if (moreBtn) moreBtn.style.display = 'none';
    return;
  }

  var textEl = moreBtn.querySelector('[data-awards-more-text]');
  var expanded = false;

  moreBtn.addEventListener('click', function () {
    expanded = !expanded;
    list.querySelectorAll('.award').forEach(function (row, i) {
      if (i >= COLLAPSED_COUNT) row.classList.toggle('award--hidden', !expanded);
    });
    if (textEl) textEl.textContent = expanded ? 'Свернуть' : 'Cмотреть ещё';
    moreBtn.classList.toggle('awards__more--expanded', expanded);
  });
})();

// Principles slider
(function () {
  var track = document.querySelector('[data-principles-track]');
  if (!track) return;

  var prev = document.querySelector('[data-principles-prev]');
  var next = document.querySelector('[data-principles-next]');
  var viewport = track.parentElement;
  var index = 0;

  function step() {
    var card = track.querySelector('.principle');
    if (!card) return 0;
    var gap = parseFloat(getComputedStyle(track).gap) || 0;
    return card.getBoundingClientRect().width + gap;
  }

  function maxIndex() {
    var total = track.children.length;
    var perView = Math.max(1, Math.round(viewport.clientWidth / step()));
    return Math.max(0, total - perView);
  }

  function update() {
    var max = maxIndex();
    if (index > max) index = max;
    if (index < 0) index = 0;
    track.style.transform = 'translateX(' + (-index * step()) + 'px)';
    if (prev) prev.disabled = index <= 0;
    if (next) next.disabled = index >= max;
  }

  if (prev) prev.addEventListener('click', function () { index--; update(); });
  if (next) next.addEventListener('click', function () { index++; update(); });
  window.addEventListener('resize', update);
  update();

  // Touch swipe
  var touchStartX = 0, touchCurrentX = 0, dragging = false, dragged = false, baseIndex = 0;

  viewport.addEventListener('touchstart', function (e) {
    if (e.touches.length !== 1) return;
    dragging = true;
    dragged = false;
    touchStartX = touchCurrentX = e.touches[0].clientX;
    baseIndex = index;
    track.style.transition = 'none';
  }, { passive: true });

  viewport.addEventListener('touchmove', function (e) {
    if (!dragging) return;
    touchCurrentX = e.touches[0].clientX;
    var delta = touchCurrentX - touchStartX;
    if (Math.abs(delta) > 10) dragged = true;
    track.style.transform = 'translateX(' + (-baseIndex * step() + delta) + 'px)';
  }, { passive: true });

  viewport.addEventListener('touchend', function () {
    if (!dragging) return;
    dragging = false;
    track.style.transition = '';
    var delta = touchCurrentX - touchStartX;
    var threshold = 40;
    if (delta <= -threshold) index = baseIndex + 1;
    else if (delta >= threshold) index = baseIndex - 1;
    else index = baseIndex;
    update();
  });

  // Touch devices have no hover, so tapping a card flips it and taps it back
  track.querySelectorAll('.principle').forEach(function (card) {
    card.addEventListener('click', function () {
      if (window.matchMedia('(hover: hover)').matches) return;
      if (dragged) { dragged = false; return; }
      card.classList.toggle('is-flipped');
    });
  });
})();

// Portfolio filters
(function () {
  var filters = document.querySelectorAll('[data-filter]');
  if (!filters.length) return;

  filters.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filters.forEach(function (b) { b.classList.remove('filter--active'); });
      btn.classList.add('filter--active');
    });
  });
})();

// FAQ accordion
(function () {
  var list = document.querySelector('[data-faq]');
  if (!list) return;

  list.querySelectorAll('.faq__q').forEach(function (q) {
    q.addEventListener('click', function () {
      var item = q.closest('.faq__item');
      var open = item.classList.toggle('faq__item--open');
      q.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });
})();

// Scroll to top
(function () {
  var btn = document.querySelector('[data-scroll-top]');
  if (!btn) return;

  window.addEventListener('scroll', function () {
    btn.classList.toggle('scroll-top--visible', window.scrollY > 600);
  });

  btn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

// Falling badges animation (Услуги, Вакансии)
(function () {
  var groups = document.querySelectorAll('.service-badges, .vacancy-badges');
  if (!groups.length) return;

  groups.forEach(function (badges) {
    var played = false;

    var start = function () {
      if (played) return;
      played = true;
      window.requestAnimationFrame(function () {
        window.requestAnimationFrame(function () {
          badges.classList.add('is-animated');
        });
      });
    };

    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(
        function (entries) {
          if (entries[0].isIntersecting) {
            start();
            observer.disconnect();
          }
        },
        { threshold: 0.45 }
      );
      observer.observe(badges);
    } else {
      start();
    }
  });
})();

// Services accordion
(function () {
  var toggles = document.querySelectorAll('[data-step-toggle]');
  if (!toggles.length) return;

  toggles.forEach(function (btn) {
    btn.addEventListener('click', function () {
      btn.closest('.service-step').classList.toggle('service-step--open');
    });
  });
})();

// Vacancies accordion
(function () {
  var toggles = document.querySelectorAll('[data-vacancy-toggle]');
  if (!toggles.length) return;

  toggles.forEach(function (btn) {
    btn.addEventListener('click', function () {
      btn.closest('.vacancy').classList.toggle('vacancy--open');
    });
  });
})();

// Draw-on squiggle arrow (CTA), plays once on scroll into view
(function () {
  var squiggle = document.querySelector('[data-draw-on-view]');
  if (!squiggle) return;

  var played = false;
  var start = function () {
    if (played) return;
    played = true;
    squiggle.classList.add('is-drawn');
  };

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        if (entries[0].isIntersecting) {
          start();
          observer.disconnect();
        }
      },
      { threshold: 0.45 }
    );
    observer.observe(squiggle);
  } else {
    start();
  }
})();

// Home hero: clicking anywhere outside the existing links/buttons goes to Бюро
(function () {
  var hero = document.querySelector('.home-hero');
  if (!hero) return;

  hero.addEventListener('click', function (e) {
    if (e.target.closest('a, button')) return;
    window.location.href = 'bureau.html';
  });
})();

// Home hero video — desktop only, so mobile never downloads it
(function () {
  var video = document.querySelector('[data-hero-video]');
  if (!video) return;
  if (!window.matchMedia('(min-width: 901px)').matches) return;

  video.src = video.getAttribute('data-hero-video');
  video.load();
  video.play().catch(function () {});
})();
