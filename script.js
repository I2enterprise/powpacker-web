const toggle=document.querySelector('.menu-toggle');const nav=document.querySelector('.nav-links');toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',open)});document.querySelectorAll('.nav-links a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
const countObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(!entry.isIntersecting)return;const el=entry.target;const target=+el.dataset.count;let start=0;const duration=1200;const began=performance.now();function tick(now){const p=Math.min((now-began)/duration,1);el.textContent=Math.floor(target*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(tick)}requestAnimationFrame(tick);countObserver.unobserve(el)}),{threshold:.5});document.querySelectorAll('[data-count]').forEach(el=>countObserver.observe(el));
window.addEventListener('scroll',()=>document.querySelector('.site-header')?.classList.toggle('scrolled',window.scrollY>80));

const languageSwitcher=document.querySelector('.language-switcher');
const languageButton=languageSwitcher?.querySelector('.language');
const languageMenu=languageSwitcher?.querySelector('.language-menu');
const originalText=new WeakMap(),originalAttributes=new WeakMap();
function translateFullSite(lang){
  const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);
  nodes.forEach(node=>{if(node.parentElement?.closest('script,style'))return;if(!originalText.has(node))originalText.set(node,node.nodeValue);const source=originalText.get(node);if(lang==='th'){node.nodeValue=source;return}const trimmed=source.trim();if(!trimmed)return;const translated=window.FULL_EN?.[trimmed];if(translated)node.nodeValue=source.replace(trimmed,translated)});
  document.querySelectorAll('[placeholder],[aria-label],[title]').forEach(el=>{if(!originalAttributes.has(el))originalAttributes.set(el,{placeholder:el.getAttribute('placeholder'),ariaLabel:el.getAttribute('aria-label'),title:el.getAttribute('title')});const source=originalAttributes.get(el);for(const [key,attr] of [['placeholder','placeholder'],['ariaLabel','aria-label'],['title','title']]){if(source[key]===null)continue;el.setAttribute(attr,lang==='th'?source[key]:(window.FULL_EN?.[source[key]]||source[key]))}});
}
const translations={
  th:{current:'Thai',home:'หน้าแรก',about:'เกี่ยวกับเรา',services:'โซลูชันและบริการ',projects:'ผลงาน',certificates:'หนังสือรับรอง',contact:'ติดต่อเรา',company:'ข้อมูลบริษัท',mission:'พันธกิจและวิสัยทัศน์',board:'คณะกรรมการบริษัท',headOffice:'สำนักงานใหญ่',menu:'เมนู'},
  en:{current:'English',home:'Home',about:'About Us',services:'Solutions & Services',projects:'Portfolios',certificates:'Certificates',contact:'Contact Us',company:'Company Profile',mission:'Mission & Vision',board:'Board of Directors',headOffice:'Head Office',menu:'Menu'}
};
function setSiteLanguage(lang){
  const t=translations[lang]||translations.th;document.documentElement.lang=lang;localStorage.setItem('powpacker-language',lang);
  const current=document.querySelector('.language-current');if(current)current.textContent=t.current;
  const labels={'index.html':t.home,'about.html':t.about,'services.html':t.services,'projects.html':t.projects,'awards.html':t.certificates};
  document.querySelectorAll('.nav-links>a,.nav-item>a').forEach(a=>{const href=a.getAttribute('href');if(labels[href]){const indicator=a.querySelector('.dropdown-indicator');a.textContent=labels[href];if(indicator)a.append(indicator)}});
  const subLabels={'about.html':t.company,'about.html#mission':t.mission,'about.html#board':t.board};document.querySelectorAll('.dropdown a').forEach(a=>{const key=a.getAttribute('href');if(subLabels[key])a.childNodes[0].textContent=subLabels[key]});
  const action=document.querySelector('.nav-action');if(action){const arrow=action.querySelector('span');action.textContent=t.contact+' ';if(arrow)action.append(arrow)}
  document.querySelectorAll('.footer-grid h4').forEach(h=>{if(/เมนู|Menu/.test(h.textContent))h.textContent=t.menu;if(/สำนักงานใหญ่|Head Office/.test(h.textContent))h.textContent=t.headOffice;if(/ติดต่อ|Contact/.test(h.textContent))h.textContent=t.contact});
  translateFullSite(lang);
}
languageButton?.addEventListener('click',e=>{e.stopPropagation();const open=languageSwitcher.classList.toggle('open');languageButton.setAttribute('aria-expanded',open)});
languageMenu?.querySelectorAll('[data-lang]').forEach(button=>button.addEventListener('click',()=>{setSiteLanguage(button.dataset.lang);languageSwitcher.classList.remove('open');languageButton.setAttribute('aria-expanded','false')}));
document.addEventListener('click',()=>{languageSwitcher?.classList.remove('open');languageButton?.setAttribute('aria-expanded','false')});
setSiteLanguage(localStorage.getItem('powpacker-language')||'th');
