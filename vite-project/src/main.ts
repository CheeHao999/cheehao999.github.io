// src/main.ts
import './style.css';

// Import navbar first (adjust path to match your folder)
import './components/navbar/navbar';

// Import all sections
import './sections/hero/hero';
import './sections/works/works';
import './sections/about/about';
import './sections/contact/contact';

// Global noise overlay
const noise = document.createElement('div');
noise.classList.add('noise');
document.body.appendChild(noise);