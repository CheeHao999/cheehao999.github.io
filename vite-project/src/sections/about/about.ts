
import './about.css';

const aboutContainer = document.querySelector('#about');
if (aboutContainer) {
  aboutContainer.innerHTML = `
    <section class="about section-pad">
      <div class="container">
        <h2 class="section-title">About Me</h2>
        <div class="about-content">
          <div class="about-text">
            <p>I build accessible, pixel-perfect, and performant web experiences. I'm obsessed with fluid animations and clean code structure.</p>
            <p>Currently studying Computer Science and expanding my skills in agentic AI and 3D web graphics.</p>
          </div>
          <div class="skills-grid">
            <span class="skill-tag">TypeScript</span>
            <span class="skill-tag">React</span>
            <span class="skill-tag">Node.js</span>
            <span class="skill-tag">WebGL</span>
            <span class="skill-tag">AI / LLMs</span>
            <span class="skill-tag">UI/UX</span>
          </div>
        </div>
      </div>
      <div class="section-divider"></div>
    </section>
  `;
}
