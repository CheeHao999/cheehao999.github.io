import './works.css';
import gsap from 'gsap';

// Sample project data
const projects = [
  { 
    title: 'PAIDChain', 
    tech: 'Internship at PAIDChain',
    description: 'Supported the development of the payment system by identifying opportunities to use Agentic AI.'
  },
  { 
    title: 'Creative Music Academy', 
    tech: 'Experience in clerical work & music teaching',
    description: 'Managed administrative tasks and coordinated schedules for a music academy.'
  },
  { 
    title: 'Video Production', 
    tech: 'Garageband, Capcut and Adobe Lightroom',
    description: 'Edited and produced creative video content using industry-standard tools.'
  },
  { 
    title: 'Campus Lost & Found', 
    tech: 'Mini Project',
    description: 'A platform connecting students to lost items on campus, simplifying the recovery process.'
  },
  { 
    title: 'Moleculer Microservices', 
    tech: 'Mini Project',
    description: 'Implemented a scalable microservices architecture into a F&B system using the Moleculer framework for efficient backend communication.'
  },
  { 
    title: 'Portfolio Website', 
    tech: 'Mini Project',
    description: 'Designed and built this responsive portfolio using TypeScript, Vite, and GSAP with physics-based interactions.'
  },
];

// Select container
const worksContainer = document.querySelector('#works');
if (!worksContainer) throw new Error('#works container not found');

worksContainer.innerHTML = `
  <section class="works section-pad">
    <div class="container">
      <h2 class="section-title">Works & Experience</h2>
      <div class="works-grid">
        ${projects.map(p => `
          <div class="project-card">
            <h3 class="project-title">${p.title}</h3>
            <p class="project-tech">${p.tech}</p>
            <p class="project-desc">${p.description}</p>
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
