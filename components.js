const page = location.pathname.split('/').pop() || 'index.html';
const isProjects = page.startsWith('projects');

document.querySelector('#site-header').innerHTML = `<header class="site-header nep-header">
  <div class="topbar"><div class="container topbar-inner">
    <div class="language-switcher"><button class="language" aria-label="Change language" aria-expanded="false"><span class="globe-icon" aria-hidden="true"></span><span class="language-current">Thai</span><span class="dropdown-indicator" aria-hidden="true"></span></button><div class="language-menu"><button type="button" data-lang="th">Thai</button><button type="button" data-lang="en">English</button></div></div>
    <div class="topbar-social"><span>Engineering &middot; Technology &middot; Clean Energy</span></div>
  </div></div>
  <div class="header-main"><div class="container header-main-inner">
    <a class="brand" href="index.html"><img class="brand-logo" src="assets/powpacker-logo-v2.png" alt="POWPACKER &#3614;&#3634;&#3623;&#3649;&#3614;&#3655;&#3588;&#3648;&#3585;&#3629;&#3619;&#3660;"></a>
    <div class="header-contacts">
      <a class="header-contact" href="tel:+66909105577"><span class="contact-icon" aria-hidden="true">&#9742;</span><span><small>Call Us</small><strong>090 910 5577</strong><em>Mon&ndash;Fri 08:30&ndash;17:30</em></span></a>
      <a class="header-contact" href="contact.html"><span class="contact-icon" aria-hidden="true">&#9993;</span><span><small>Contact</small><strong>Powpacker Co., Ltd.</strong><em>Latphrao, Bangkok</em></span></a>
    </div>
  </div></div>
  <div class="nav-row"><div class="container nav-shell"><nav class="nav">
    <button class="menu-toggle" aria-label="&#3648;&#3611;&#3636;&#3604;&#3648;&#3617;&#3609;&#3641;" aria-expanded="false"><span></span><span></span><span></span></button>
    <div class="nav-links">
      <a class="\${page === 'index.html' ? 'active' : ''}" href="index.html">&#3627;&#3609;&#3657;&#3634;&#3649;&#3619;&#3585;</a>
      <div class="nav-item has-dropdown"><a class="\${page === 'about.html' ? 'active' : ''}" href="about.html">&#3648;&#3585;&#3637;&#3656;&#3618;&#3623;&#3585;&#3633;&#3610;&#3648;&#3619;&#3634;<span class="dropdown-indicator" aria-hidden="true"></span></a><div class="dropdown"><a href="about.html">&#3586;&#3657;&#3629;&#3617;&#3641;&#3621;&#3610;&#3619;&#3636;&#3625;&#3633;&#3607;</a><a href="about.html#mission">&#3614;&#3633;&#3609;&#3608;&#3585;&#3636;&#3592;&#3649;&#3621;&#3632;&#3623;&#3636;&#3626;&#3633;&#3618;&#3607;&#3633;&#3624;&#3609;&#3660;</a><a href="about.html#board">&#3588;&#3603;&#3632;&#3585;&#3619;&#3619;&#3617;&#3585;&#3634;&#3619;&#3610;&#3619;&#3636;&#3625;&#3633;&#3607;</a></div></div>
      <div class="nav-item has-dropdown"><a class="\${page === 'microinverters.html' ? 'active' : ''}" href="microinverters.html">Products<span class="dropdown-indicator" aria-hidden="true"></span></a><div class="dropdown product-dropdown"><a href="microinverters.html"><span>Microinverters</span><img src="https://northernep.com/wp-content/uploads/2025/09/bdm-2000t.png" alt="Microinverter"></a></div></div>
      <div class="nav-item has-dropdown"><a class="\${page === 'services.html' ? 'active' : ''}" href="services.html">&#3650;&#3595;&#3621;&#3641;&#3594;&#3633;&#3609;&#3649;&#3621;&#3632;&#3610;&#3619;&#3636;&#3585;&#3634;&#3619;<span class="dropdown-indicator" aria-hidden="true"></span></a><div class="dropdown wide"><a href="services.html#data-center">Data Center</a><a href="services.html#factory">Factory &amp; Building</a><a href="services.html#it">IT Infrastructure</a><a href="services.html#digital">Digital Transformation</a><a href="services.html#energy">Clean Energy</a><a href="services.html#satellite">Satellite Services</a></div></div>
      <div class="nav-item has-dropdown"><a class="\${isProjects ? 'active' : ''}" href="projects.html">&#3612;&#3621;&#3591;&#3634;&#3609;<span class="dropdown-indicator" aria-hidden="true"></span></a><div class="dropdown"><a href="projects-data-center.html">Data Center</a><a href="projects-factory.html">Factory</a><a href="projects-building.html">Building</a></div></div>
      <a class="\${page === 'awards.html' ? 'active' : ''}" href="awards.html">&#3627;&#3609;&#3633;&#3591;&#3626;&#3639;&#3629;&#3619;&#3633;&#3610;&#3619;&#3629;&#3591;</a>
    </div>
  </nav><a class="nav-action" href="contact.html">&#3605;&#3636;&#3604;&#3605;&#3656;&#3629;&#3648;&#3619;&#3634; <span aria-hidden="true">&#8250;</span></a></div></div>
</header>`;

document.querySelector('#site-footer').innerHTML = `<footer><div class="container footer-grid">
  <div><a class="brand footer-brand" href="index.html"><img class="brand-logo" src="assets/powpacker-logo-footer.png" alt="POWPACKER"></a><p>Integrated engineering, information technology, networking and clean energy solutions.</p></div>
  <div><h4>&#3648;&#3617;&#3609;&#3641;</h4><a href="about.html">&#3648;&#3585;&#3637;&#3656;&#3618;&#3623;&#3585;&#3633;&#3610;&#3648;&#3619;&#3634;</a><a href="services.html">&#3650;&#3595;&#3621;&#3641;&#3594;&#3633;&#3609;&#3649;&#3621;&#3632;&#3610;&#3619;&#3636;&#3585;&#3634;&#3619;</a><a href="projects.html">&#3612;&#3621;&#3591;&#3634;&#3609;</a><a href="awards.html">&#3627;&#3609;&#3633;&#3591;&#3626;&#3639;&#3629;&#3619;&#3633;&#3610;&#3619;&#3629;&#3591;</a></div>
  <div><h4>&#3626;&#3635;&#3609;&#3633;&#3585;&#3591;&#3634;&#3609;&#3651;&#3627;&#3597;&#3656;</h4><p>104 &#3595;&#3629;&#3618;&#3609;&#3634;&#3588;&#3609;&#3636;&#3623;&#3634;&#3626;&#32;&#54;&#32;&#3606;&#3609;&#3609;&#3609;&#3634;&#3588;&#3609;&#3636;&#3623;&#3634;&#3626;<br>&#3649;&#3586;&#3623;&#3591;&#3621;&#3634;&#3604;&#3614;&#3619;&#3657;&#3634;&#3623;&#32;&#3648;&#3586;&#3605;&#3621;&#3634;&#3604;&#3614;&#3619;&#3657;&#3634;&#3623;<br>&#3585;&#3619;&#3640;&#3591;&#3648;&#3607;&#3614;&#3617;&#3627;&#3634;&#3609;&#3588;&#3619; 10230</p></div>
  <div><h4>&#3605;&#3636;&#3604;&#3605;&#3656;&#3629;&#3648;&#3619;&#3634;</h4><a href="tel:+66909105577">090 910 5577</a><a href="mailto:info@powpacker.com">info@powpacker.com</a><a href="https://www.powpacker.com/">www.powpacker.com</a></div>
</div><div class="container footer-bottom"><span>&copy; 2026 Powpacker Co., Ltd. All rights reserved.</span><div><a href="contact.html">Privacy Policy</a><a href="#top">&#3585;&#3621;&#3633;&#3610;&#3604;&#3657;&#3634;&#3609;&#3610;&#3609; &uarr;</a></div></div></footer>`;
