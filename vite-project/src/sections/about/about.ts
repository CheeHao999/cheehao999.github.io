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
            <p>A first-year Computer Science student at UTAR who is eager to learn and explore new technologies. I am looking for opportunities to improve myself and gain new knowledge. Currently, expanding my skills in agentic AI, web graphics, and backend development.</p>
            <p>I enjoy building clean and user-friendly web applications with a focus on performance and accessibility. I also take on small projects and provide website development solutions.</p>
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
    let ground: Matter.Body | undefined;
    let leftWall: Matter.Body | undefined;
    let rightWall: Matter.Body | undefined;

    // Use ResizeObserver for more robust dimension tracking
    const resizeObserver = new ResizeObserver(() => {
      updateWalls();
    });
    resizeObserver.observe(container);

    // Function to create/update walls
    const updateWalls = () => {
      // Remove existing walls if they exist
      if (ground && leftWall && rightWall) Composite.remove(world, [ground, leftWall, rightWall]);

      width = container.clientWidth;
      height = container.clientHeight;

      const wallThickness = 1000; // Much thicker walls to prevent tunneling
      const wallOptions = { isStatic: true, render: { visible: false }, friction: 1, frictionStatic: 1 };

      // Position walls so their inner edge matches the container boundary
      // ground center y = height + thickness/2 -> top edge at height
      ground = Bodies.rectangle(width / 2, height + wallThickness / 2, width + 200, wallThickness, wallOptions);

      // left wall center x = -thickness/2 -> right edge at 0
      leftWall = Bodies.rectangle(-wallThickness / 2, height / 2, wallThickness, height * 2 + 200, wallOptions);

      // right wall center x = width + thickness/2 -> left edge at width
      rightWall = Bodies.rectangle(width + wallThickness / 2, height / 2, wallThickness, height * 2 + 200, wallOptions);

      Composite.add(world, [ground, leftWall, rightWall]);
    };

    updateWalls();

    // Interface for custom body with render element
    interface ExtendedBody extends Matter.Body {
      render: {
        visible: boolean;
        opacity?: number;
        sprite?: {
          texture: string;
          xScale: number;
          yScale: number;
        };
        element?: HTMLElement; // Custom property
      }
    }

    // Skills Data
    const allSkills = [
      'TypeScript', 'React', 'Node.js', 'WebGL', 'Three.js',
      'GSAP', 'Next.js', 'Python', 'Tailwind', 'Git',
      'Figma', 'UI/UX', 'SQL', 'GraphQL', 'Vite', 'Matter.js'
    ];

    // Optimize for mobile: fewer balls to prevent lag
    const isMobile = window.innerWidth < 768;
    const skills = isMobile ? allSkills.slice(0, 10) : allSkills;

    // State to track bodies and elements
    let bodies: ExtendedBody[] = [];
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

        // Random starting position within bounds
        const x = Math.random() * (width - w - 40) + w / 2 + 20;
        const y = -Math.random() * 500 - 100; // Start above

        // Create body
        const body = Bodies.rectangle(x, y, w, h, {
          restitution: 0.6, // Higher bounciness
          friction: 0.1,
          frictionAir: 0.01,
          angle: (Math.random() - 0.5) * 0.5 // Slight random rotation
        }) as ExtendedBody;

        bodies.push(body);
        elements.push(el);

        // Store reference to element on body
        if (!body.render) {
          // @ts-ignore
          body.render = {};
        }
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

        // Failsafe: Respawn only if deeply out of bounds (fallen through floor)
        if (y > height + 200) {
          Matter.Body.setPosition(body, { x: width / 2, y: -50 });
          Matter.Body.setVelocity(body, { x: 0, y: 0 });
        }

        // We removed the aggressive "snap back" logic for x-axis because 
        // the thick walls will handle containment naturally and physically.

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

    // Cleanup function (optional but good practice)
    // currently no way to trigger it unless we structured this as a class or improved module
    // But ResizeObserver should be kept in mind.

  };

  // Initialize after a slight delay to ensure DOM is ready and layout is calculated
  setTimeout(initPhysics, 100);
}
