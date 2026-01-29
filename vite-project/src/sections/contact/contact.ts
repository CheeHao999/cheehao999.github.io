import './contact.css';
import gsap from 'gsap';

const contactContainer = document.querySelector('#contact');
if (!contactContainer) throw new Error('#contact container not found');

contactContainer.innerHTML = `
<section class="contact section-pad">
  <div class="container contact-container">
    <h2 class="section-title">Get In Touch</h2>
    <p class="contact-subtitle">Contact me for future collaborations</p>
    
    <div class="contact-grid">
      <!-- Gmail -->
      <div class="contact-item">
        <div class="icon-box gmail">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
          </svg>
        </div>
        <div class="contact-details">
          <span class="label">Email</span>
          <span class="value">lcheehao19@gmail.com</span>
        </div>
      </div>

      <!-- Github -->
      <div class="contact-item">
        <div class="icon-box github">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
        </div>
        <div class="contact-details">
          <span class="label">Github</span>
          <span class="value">CheeHao999</span>
        </div>
      </div>

      <!-- Location -->
      <div class="contact-item">
        <div class="icon-box location">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
        </div>
        <div class="contact-details">
          <span class="label">Location</span>
          <span class="value">Perak, Malaysia</span>
        </div>
      </div>
    </div>
    
    <footer class="footer">
      <p>&copy; ${new Date().getFullYear()} Chee Hao. Built with Vite & TypeScript.</p>
    </footer>
  </div>
</section>
`;

// ----------------------------
// GSAP fade + slide-in animation
// ----------------------------
const revealElements = contactContainer.querySelectorAll('.section-title, .contact-subtitle, .contact-item, .footer');

gsap.fromTo(
  revealElements,
  { y: 30, opacity: 0 },
  { y: 0, opacity: 1, duration: 1, ease: 'power3.out', stagger: 0.1 }
);

// Hover Effects
const items = contactContainer.querySelectorAll('.contact-item');
items.forEach(item => {
  item.addEventListener('mouseenter', () => gsap.to(item, { x: 5, duration: 0.3, ease: 'power2.out' }));
  item.addEventListener('mouseleave', () => gsap.to(item, { x: 0, duration: 0.3, ease: 'power2.out' }));
});
