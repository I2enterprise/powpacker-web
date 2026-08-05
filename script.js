const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');

toggle?.addEventListener('click', () => {
  const open = nav?.classList.toggle('open') ?? false;
  toggle.setAttribute('aria-expanded', String(open));
});
document.querySelectorAll('.nav-links a').forEach(link => link.addEventListener('click', () => nav?.classList.remove('open')));

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  }), { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(element => observer.observe(element));

  const countObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const element = entry.target;
    const target = Number(element.dataset.count) || 0;
    const duration = 1200;
    const began = performance.now();
    function tick(now) {
      const progress = Math.min((now - began) / duration, 1);
      element.textContent = Math.floor(target * (1 - Math.pow(1 - progress, 3)));
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
    countObserver.unobserve(element);
  }), { threshold: 0.5 });
  document.querySelectorAll('[data-count]').forEach(element => countObserver.observe(element));
}

window.addEventListener('scroll', () => document.querySelector('.site-header')?.classList.toggle('scrolled', window.scrollY > 80));

const languageSwitcher = document.querySelector('.language-switcher');
const languageButton = languageSwitcher?.querySelector('.language');
const languageMenu = languageSwitcher?.querySelector('.language-menu');
const originalText = new WeakMap();
const originalAttributes = new WeakMap();

function translateFullSite(lang) {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach(node => {
    if (node.parentElement?.closest('script,style')) return;
    if (!originalText.has(node)) originalText.set(node, node.nodeValue);
    const source = originalText.get(node);
    if (lang === 'th') {
      node.nodeValue = source;
      return;
    }
    const trimmed = source.trim();
    if (!trimmed) return;
    const translated = window.FULL_EN?.[trimmed];
    if (translated) node.nodeValue = source.replace(trimmed, translated);
  });

  document.querySelectorAll('[placeholder],[aria-label],[title]').forEach(element => {
    if (!originalAttributes.has(element)) {
      originalAttributes.set(element, {
        placeholder: element.getAttribute('placeholder'),
        ariaLabel: element.getAttribute('aria-label'),
        title: element.getAttribute('title')
      });
    }
    const source = originalAttributes.get(element);
    for (const [key, attribute] of [['placeholder', 'placeholder'], ['ariaLabel', 'aria-label'], ['title', 'title']]) {
      if (source[key] === null) continue;
      element.setAttribute(attribute, lang === 'th' ? source[key] : (window.FULL_EN?.[source[key]] || source[key]));
    }
  });
}

const translations = {
  th: {
    current: 'Thai', home: 'หน้าแรก', about: 'เกี่ยวกับเรา', services: 'โซลูชันและบริการ', projects: 'ผลงาน', certificates: 'หนังสือรับรอง', contact: 'ติดต่อเรา', company: 'ข้อมูลบริษัท', mission: 'พันธกิจและวิสัยทัศน์', board: 'คณะกรรมการบริษัท', headOffice: 'สำนักงานใหญ่', menu: 'เมนู'
  },
  en: {
    current: 'English', home: 'Home', about: 'About Us', services: 'Solutions & Services', projects: 'Portfolios', certificates: 'Certificates', contact: 'Contact Us', company: 'Company Profile', mission: 'Mission & Vision', board: 'Board of Directors', headOffice: 'Head Office', menu: 'Menu'
  }
};

function setSiteLanguage(lang) {
  const t = translations[lang] || translations.th;
  document.documentElement.lang = lang;
  localStorage.setItem('powpacker-language', lang);
  const current = document.querySelector('.language-current');
  if (current) current.textContent = t.current;

  const labels = { 'index.html': t.home, 'about.html': t.about, 'services.html': t.services, 'projects.html': t.projects, 'awards.html': t.certificates };
  document.querySelectorAll('.nav-links > a, .nav-item > a').forEach(link => {
    const href = link.getAttribute('href');
    if (!labels[href]) return;
    const indicator = link.querySelector('.dropdown-indicator');
    link.textContent = labels[href];
    if (indicator) link.append(indicator);
  });

  const subLabels = { 'about.html': t.company, 'about.html#mission': t.mission, 'about.html#board': t.board };
  document.querySelectorAll('.dropdown a').forEach(link => {
    const key = link.getAttribute('href');
    if (subLabels[key]) link.childNodes[0].textContent = subLabels[key];
  });
  const action = document.querySelector('.nav-action');
  if (action) {
    const arrow = action.querySelector('span');
    action.textContent = t.contact + ' ';
    if (arrow) action.append(arrow);
  }
  document.querySelectorAll('.footer-grid h4').forEach(heading => {
    if (/เมนู|Menu/.test(heading.textContent)) heading.textContent = t.menu;
    if (/สำนักงานใหญ่|Head Office/.test(heading.textContent)) heading.textContent = t.headOffice;
    if (/ติดต่อ|Contact/.test(heading.textContent)) heading.textContent = t.contact;
  });
  translateFullSite(lang);
}

languageButton?.addEventListener('click', event => {
  event.stopPropagation();
  const open = languageSwitcher.classList.toggle('open');
  languageButton.setAttribute('aria-expanded', String(open));
});
languageMenu?.querySelectorAll('[data-lang]').forEach(button => button.addEventListener('click', () => {
  setSiteLanguage(button.dataset.lang);
  languageSwitcher.classList.remove('open');
  languageButton.setAttribute('aria-expanded', 'false');
}));
document.addEventListener('click', () => {
  languageSwitcher?.classList.remove('open');
  languageButton?.setAttribute('aria-expanded', 'false');
});
setSiteLanguage(localStorage.getItem('powpacker-language') || 'th');

const contactForm = document.querySelector('#contact-form');
contactForm?.addEventListener('submit', async event => {
  event.preventDefault();
  const status = contactForm.querySelector('.form-status');
  const submit = contactForm.querySelector('button[type="submit"]');
  const language = document.documentElement.lang === 'en';
  if (status) status.textContent = language ? 'Sending your message…' : 'กำลังส่งข้อมูล…';
  if (submit) submit.disabled = true;

  const payload = Object.fromEntries(new FormData(contactForm).entries());
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(result.error || (language ? 'Unable to send your message.' : 'ไม่สามารถส่งข้อมูลได้'));
    contactForm.reset();
    if (status) status.textContent = language ? 'Message sent. Our team will contact you shortly.' : 'ส่งข้อมูลเรียบร้อยแล้ว ทีมงานจะติดต่อกลับโดยเร็วที่สุด';
  } catch (error) {
    if (status) status.textContent = error.message || (language ? 'Unable to send your message.' : 'ไม่สามารถส่งข้อมูลได้');
  } finally {
    if (submit) submit.disabled = false;
  }
});
