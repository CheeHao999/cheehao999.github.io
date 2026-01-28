import gsap from 'gsap';
import './hero.css';

const heroContainer = document.querySelector('#hero');
if (!heroContainer) throw new Error('Hero container not found');

heroContainer.innerHTML = `
  <section class="hero">
    <div class="hero-glow"></div>
    <div class="container hero-content">
      <h1 class="hero-title reveal-text" id="hero-shuffle">Chee Hao</h1>

      <p class="hero-tagline reveal-text">
        Computer Science Student crafting immersive web experiences.
      </p>

      <div class="hero-actions reveal-text">
        <button class="btn" id="btn-work">Learn more</button>
        <button class="btn btn-ghost" id="btn-contact">Get in Touch</button>
      </div>
    </div>
  </section>
`;

/* Smooth scroll buttons */
document.getElementById('btn-work')?.addEventListener('click', () => {
  document.getElementById('works')?.scrollIntoView({ behavior: 'smooth' });
});

document.getElementById('btn-contact')?.addEventListener('click', () => {
  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
});

// GSAP Timeline
const revealElements = heroContainer.querySelectorAll('.reveal-text');
const glow = heroContainer.querySelector('.hero-glow') as HTMLElement;
console.log(glow); // should log the div element

const tl = gsap.timeline();

// Glow floating animation
tl.to(glow, {
  scale: 1.05,    // smaller movement
  duration: 4,    // faster cycle
  repeat: -1,
  yoyo: true,
  ease: 'sine.inOut'
}, 0);

// Text reveal animation
tl.fromTo(
  revealElements,
  { y: 30, opacity: 0 },       // slightly smaller move
  { y: 0, opacity: 1, duration: 1, ease: 'power3.out', stagger: 0.1 },
  0.1 // slightly faster start
);

// Add background video
const videoEl = document.createElement('video');
videoEl.src = '/src/sections/hero/hero_video2.mp4';
videoEl.autoplay = true;
videoEl.loop = true;
videoEl.muted = true;
videoEl.playsInline = true;
videoEl.className = 'hero-video';
heroContainer.appendChild(videoEl);

function shuffleText(el: HTMLElement, speed = 40) {
  const finalText = el.textContent || '';
  let frame = 0;

  const randomChar = () => String.fromCharCode(33 + Math.floor(Math.random() * 94));

  const interval = setInterval(() => {
    el.textContent = finalText
      .split('')
      .map((_char, i) => (i < frame ? finalText[i] : randomChar()))
      .join('');
    frame++;
    if (frame > finalText.length) clearInterval(interval);
  }, speed);
}

// Trigger shuffle after text reveal
tl.eventCallback('onComplete', () => {
  const titleEl = document.getElementById('hero-shuffle');
  if (titleEl) shuffleText(titleEl, 40);
});


