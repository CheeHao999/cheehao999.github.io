import './contact.css';
import gsap from 'gsap';

const contactContainer = document.querySelector('#contact');
if (!contactContainer) throw new Error('#contact container not found');

contactContainer.innerHTML = `
<section class="contact section-pad">
  <div class="container contact-container">
    <h2 class="section-title">Let's Connect</h2>
    <p class="contact-text">Interested in working together? I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.</p>
    <a href="mailto:hello@cheehao.dev" class="btn contact-btn">Say Hello</a>
    
    <footer class="footer">
      <p>&copy; ${new Date().getFullYear()} Chee Hao. Built with Vite & TypeScript.</p>
    </footer>
  </div>
</section>
`;

// ----------------------------
// GSAP fade + slide-in animation
// ----------------------------
const revealElements = contactContainer.querySelectorAll('.section-title, .contact-text, .contact-btn, .footer');

gsap.fromTo(
  revealElements,
  { y: 30, opacity: 0 },
  { y: 0, opacity: 1, duration: 1, ease: 'power3.out', stagger: 0.2 }
);


const contactBtn = contactContainer.querySelector('.contact-btn') as HTMLElement;
contactBtn.addEventListener('mouseenter', () => gsap.to(contactBtn, { scale: 1.05, duration: 0.3 }));
contactBtn.addEventListener('mouseleave', () => gsap.to(contactBtn, { scale: 1, duration: 0.3 }));
