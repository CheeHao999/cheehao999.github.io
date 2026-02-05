import './navbar.css';

const navbarContainer = document.createElement('nav');
navbarContainer.className = 'navbar';
navbarContainer.innerHTML = `
  <div class="container navbar-content">
    <!-- Collapse Button (Mobile Only) -->
    <button class="nav-collapse-btn" aria-label="Toggle navigation">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M6 9l6 6 6-6"/>
      </svg>
    </button>

    <!-- Mobile Dock / Desktop Menu -->
    <div class="nav-menu">
      <ul class="nav-links">
        <li>
          <a href="#hero" aria-label="Home">
            <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            <span class="nav-text">Home</span>
          </a>
        </li>
        <li>
          <a href="#about" aria-label="About">
            <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <span class="nav-text">About</span>
          </a>
        </li>
        <li>
          <a href="#works" aria-label="Works">
            <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
            </svg>
            <span class="nav-text">Works</span>
          </a>
        </li>
        <li>
          <a href="#contact" aria-label="Contact">
            <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
            <span class="nav-text">Contact</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
`;
document.body.prepend(navbarContainer);

// Collapse Logic
const collapseBtn = navbarContainer.querySelector('.nav-collapse-btn');
const navMenu = navbarContainer.querySelector('.nav-menu');

if (collapseBtn && navMenu) {
  collapseBtn.addEventListener('click', () => {
    navMenu.classList.toggle('collapsed');
    collapseBtn.classList.toggle('active');
  });

  // Auto-collapse on scroll (Mobile only)
  let lastScrollY = window.scrollY;
  window.addEventListener('scroll', () => {
    if (window.innerWidth <= 768) { // Only check on mobile
      const currentScrollY = window.scrollY;
      
      // If scrolling down and menu is open, collapse it
      if (currentScrollY > lastScrollY && !navMenu.classList.contains('collapsed')) {
        navMenu.classList.add('collapsed');
        collapseBtn.classList.remove('active');
      }
      
      lastScrollY = currentScrollY;
    }
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

// Active section highlight logic
const sections = document.querySelectorAll('section, div[id]');
const navLinks = navbarContainer.querySelectorAll('.nav-links a');

const observerOptions = {
  root: null,
  rootMargin: '-50% 0px -50% 0px', // Trigger when section is in middle of viewport
  threshold: 0
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Remove active class from all links
      navLinks.forEach(link => link.classList.remove('active'));
      
      // Add active class to corresponding link
      const id = entry.target.getAttribute('id');
      const activeLink = navbarContainer.querySelector(`.nav-links a[href="#${id}"]`);
      if (activeLink) {
        activeLink.classList.add('active');
      }
    }
  });
}, observerOptions);

sections.forEach(section => observer.observe(section));
