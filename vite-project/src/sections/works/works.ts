import './works.css';
import gsap from 'gsap';

// Sample project data
const projects = [
  { title: 'Portfolio Website', tech: 'Current Website' },
  { title: 'PAIDChain', tech: 'Node.js, TypeScript, Javascript' },
  { title: 'Music Academy', tech: 'Final Cut Pro' },
];

// Select container
const worksContainer = document.querySelector('#works');
if (!worksContainer) throw new Error('#works container not found');

worksContainer.innerHTML = `
  <section class="works section-pad">
    <div class="container">
      <h2 class="section-title">Experience</h2>
      <div class="works-grid">
        ${projects.map(p => `
          <div class="project-card">
            <h3 class="project-title">${p.title}</h3>
            <p class="project-tech">${p.tech}</p>
            <div class="card-glow"></div>
          </div>
        `).join('')}
      </div>
    </div>
    <div class="section-divider"></div>
  </section>
`;

// ----------------------------
// Fade + slide-in animation
// ----------------------------
const projectCards = worksContainer.querySelectorAll('.project-card');

gsap.fromTo(
  projectCards,
  { y: 40, opacity: 0 },
  { y: 0, opacity: 1, duration: 1, ease: 'power3.out', stagger: 0.15 }
);

// ----------------------------
// Interactive hover animations
// ----------------------------
projectCards.forEach(card => {
  const glow = card.querySelector('.card-glow') as HTMLElement;

  card.addEventListener('mouseenter', () => {
    // Glow fades in
    gsap.to(glow, { opacity: 1, duration: 0.4, ease: 'power2.out' });

    // Card scales up
    gsap.to(card, { scale: 1.05, duration: 0.4, ease: 'power2.out' });
  });

  card.addEventListener('mouseleave', () => {
    // Glow fades out
    gsap.to(glow, { opacity: 0, duration: 0.4, ease: 'power2.out' });

    // Card scales back to normal
    gsap.to(card, { scale: 1, duration: 0.4, ease: 'power2.out' });
  });
});
