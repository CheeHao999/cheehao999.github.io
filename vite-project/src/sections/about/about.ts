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
            <p>A First-Year Computer Science student at UTAR. Currently expanding my skills in agentic AI and web graphics.</p>
            <p>I build accessible, pixel-perfect, and performant web experiences. I'm obsessed with fluid animations and clean code structure.</p>
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

    // Improve physics stability
    engine.positionIterations = 10;
    engine.velocityIterations = 8;

    // Container dimensions
    let width = container.clientWidth;
    let height = container.clientHeight;

    // Create walls variables
    let ground: Matter.Body;
    let leftWall: Matter.Body;
    let rightWall: Matter.Body;
    
    // Function to create/update walls
    const updateWalls = () => {
      // Remove existing walls if they exist
      if (ground) Composite.remove(world, [ground, leftWall, rightWall]);
      
      width = container.clientWidth;
      height = container.clientHeight;
      
      const wallThickness = 100; // Thicker walls to prevent tunneling
      const wallOptions = { isStatic: true, render: { visible: false } };
      
      ground = Bodies.rectangle(width / 2, height + wallThickness/2, width, wallThickness, wallOptions);
      leftWall = Bodies.rectangle(-wallThickness/2, height / 2, wallThickness, height * 2, wallOptions);
      rightWall = Bodies.rectangle(width + wallThickness/2, height / 2, wallThickness, height * 2, wallOptions);
      
      Composite.add(world, [ground, leftWall, rightWall]);
    };

    updateWalls();

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
    
    // Render loop and Intersection Observer for performance
    let renderLoopId: number | null = null;
    let isRunning = false;

    const update = () => {
      bodies.forEach((body, i) => {
        const el = elements[i];
        const { x, y } = body.position;
        const angle = body.angle;

        // Sync DOM with physics body
        el.style.transform = `translate(${x}px, ${y}px) rotate(${angle}rad) translate(-50%, -50%)`;
      });

      if (isRunning) {
        renderLoopId = requestAnimationFrame(update);
      }
    };

    // Use IntersectionObserver to only run physics when visible
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (!isRunning) {
            isRunning = true;
            Runner.run(runner, engine);
            update();
          }
        } else {
          if (isRunning) {
            isRunning = false;
            Runner.stop(runner);
            if (renderLoopId) {
              cancelAnimationFrame(renderLoopId);
              renderLoopId = null;
            }
          }
        }
      });
    }, { threshold: 0.1 });

    observer.observe(container);

    // Handle resize
    window.addEventListener('resize', () => {
      // Recreate walls to fit new dimensions
      updateWalls();
      
      // Push any out-of-bounds bodies back in
      bodies.forEach(body => {
        if (body.position.x > width) {
          Matter.Body.setPosition(body, { x: width - 50, y: body.position.y });
        }
        if (body.position.x < 0) {
          Matter.Body.setPosition(body, { x: 50, y: body.position.y });
        }
        if (body.position.y > height) {
          Matter.Body.setPosition(body, { x: body.position.x, y: height - 50 });
        }
      });
    });
  };

  // Initialize after a slight delay to ensure DOM is ready and layout is calculated
  setTimeout(initPhysics, 100);
}
