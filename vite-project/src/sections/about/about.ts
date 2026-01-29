import Matter from 'matter-js';
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
          
          <div style="position: relative;">
            <div id="skills-physics-container">
              <!-- Physics elements will be injected here -->
            </div>
            <button id="skills-refresh-btn" class="refresh-btn" aria-label="Refresh Skills">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M23 4v6h-6"></path>
                <path d="M1 20v-6h6"></path>
                <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div class="section-divider"></div>
    </section>
  `;

  // Physics Simulation
  const initPhysics = () => {
    const container = document.getElementById('skills-physics-container');
    if (!container) return;

    // Module aliases
    const Engine = Matter.Engine,
      Runner = Matter.Runner,
      Bodies = Matter.Bodies,
      Composite = Matter.Composite,
      Mouse = Matter.Mouse,
      MouseConstraint = Matter.MouseConstraint;

    // Create engine
    const engine = Engine.create();
    const world = engine.world;

    // Container dimensions
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Create walls
    const wallOptions = { isStatic: true, render: { visible: false } };
    const ground = Bodies.rectangle(width / 2, height + 30, width, 60, wallOptions);
    const leftWall = Bodies.rectangle(-30, height / 2, 60, height, wallOptions);
    const rightWall = Bodies.rectangle(width + 30, height / 2, 60, height, wallOptions);

    Composite.add(world, [ground, leftWall, rightWall]);

    // Skills Data
    const skills = [
      'TypeScript', 'React', 'Node.js', 'WebGL', 'Three.js', 
      'GSAP', 'Next.js', 'Python', 'Tailwind', 'Git',
      'Figma', 'UI/UX', 'SQL', 'GraphQL', 'Vite', 'Matter.js'
    ];

    // State to track bodies and elements
    let bodies: Matter.Body[] = [];
    let elements: HTMLElement[] = [];

    const spawnSkills = () => {
      // Clear existing
      if (bodies.length > 0) {
        Composite.remove(world, bodies);
        bodies = [];
      }
      elements.forEach(el => el.remove());
      elements = [];

      skills.forEach((skill) => {
        // Create DOM element
        const el = document.createElement('div');
        el.className = 'skill-capsule';
        el.textContent = skill;
        container.appendChild(el);

        // Get dimensions
        const w = el.offsetWidth;
        const h = el.offsetHeight;

        // Random starting position
        const x = Math.random() * (width - w) + w / 2;
        const y = -Math.random() * 500 - 50; // Start above

        // Create body
        const body = Bodies.rectangle(x, y, w, h, {
          restitution: 0.5, // Bounciness
          friction: 0.1,
          angle: (Math.random() - 0.5) * 0.5 // Slight random rotation
        });

        bodies.push(body);
        elements.push(el);
        
        // Store reference to element on body
        // @ts-ignore
        body.render.element = el;
      });

      Composite.add(world, bodies);
    };

    // Initial spawn
    spawnSkills();

    // Refresh button listener
    const refreshBtn = document.getElementById('skills-refresh-btn');
    refreshBtn?.addEventListener('click', () => {
      // Rotate button animation
      refreshBtn.classList.add('spinning');
      setTimeout(() => refreshBtn.classList.remove('spinning'), 500);
      
      spawnSkills();
    });

    // Add mouse control
    const mouse = Mouse.create(container);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false }
      }
    });

    Composite.add(world, mouseConstraint);

    // Keep the mouse in sync with rendering
    // @ts-ignore
    mouse.element.removeEventListener("mousewheel", mouse.mousewheel);
    // @ts-ignore
    mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel);

    // Run the engine
    const runner = Runner.create();
    Runner.run(runner, engine);

    // Render loop
    const update = () => {
      bodies.forEach((body, i) => {
        const el = elements[i];
        const { x, y } = body.position;
        const angle = body.angle;

        // Sync DOM with physics body
        // -50% -50% to center the element on the body's center of mass
        el.style.transform = `translate(${x}px, ${y}px) rotate(${angle}rad) translate(-50%, -50%)`;
      });

      requestAnimationFrame(update);
    };

    update();

    // Handle resize
    window.addEventListener('resize', () => {
      // Update boundaries
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      
      Matter.Body.setPosition(ground, { x: newWidth / 2, y: newHeight + 30 });
      Matter.Body.setPosition(rightWall, { x: newWidth + 30, y: newHeight / 2 });
      
      // We don't update leftWall or bodies to avoid complex logic, 
      // but ideally we'd push bodies back in bounds if needed.
    });
  };

  // Initialize after a slight delay to ensure DOM is ready and layout is calculated
  setTimeout(initPhysics, 100);
}
