import './navbar.css';

const navbarContainer = document.createElement('nav');
navbarContainer.className = 'navbar';
navbarContainer.innerHTML = `
  <div class="container">
    <ul class="nav-links">
      <li><a href="#hero">Home</a></li>
      <li><a href="#works">Works</a></li>
      <li><a href="#about">About</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>
  </div>
`;
document.body.prepend(navbarContainer);

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
  if (window.scrollY > 50) {
    navbarContainer.classList.add('scrolled');
  } else {
    navbarContainer.classList.remove('scrolled');
  }
});


// Change navbar style on scroll
window.addEventListener('scroll', () => {
  if (window.scrollY > 30) {
    navbarContainer.classList.add('scrolled');
  } else {
    navbarContainer.classList.remove('scrolled');
  }
});
