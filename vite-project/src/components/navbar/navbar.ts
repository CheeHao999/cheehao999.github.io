import './navbar.css';

const navbarContainer = document.createElement('nav');
navbarContainer.className = 'navbar';
navbarContainer.innerHTML = `
  <div class="container navbar-content">
    <div class="logo">CH</div>
    <button class="mobile-toggle" aria-label="Toggle navigation">
      <span class="bar"></span>
      <span class="bar"></span>
      <span class="bar"></span>
    </button>
    <div class="nav-menu">
      <ul class="nav-links">
        <li><a href="#hero">Home</a></li>
        <li><a href="#works">Works</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </div>
  </div>
`;
document.body.prepend(navbarContainer);

// Mobile Toggle Logic
const mobileToggle = navbarContainer.querySelector('.mobile-toggle');
const navMenu = navbarContainer.querySelector('.nav-menu');

if (mobileToggle && navMenu) {
  mobileToggle.addEventListener('click', () => {
    const isActive = mobileToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Lock body scroll when menu is open
    document.body.style.overflow = isActive ? 'hidden' : '';
  });

  // Close menu when clicking a link
  navbarContainer.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      mobileToggle.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

// Smooth scroll
navbarContainer.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href')!);
    target?.scrollIntoView({ behavior: 'smooth' });
  });
});

// Change bg on scroll
window.addEventListener('scroll', () => {
  if (window.scrollY > 30) {
    navbarContainer.classList.add('scrolled');
  } else {
    navbarContainer.classList.remove('scrolled');
  }
});
