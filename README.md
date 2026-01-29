# Chee Hao Portfolio

A modern, immersive personal portfolio website built with **TypeScript**, **Vite**, and **GSAP**. This project showcases a "Midnight Prism" theme with deep space aesthetics, fluid animations, and a responsive design.

🔗 **Live Demo:** [https://cheehao999.github.io/](https://cheehao999.github.io/)

## 🚀 Tech Stack

- **Framework/Build Tool:** [Vite](https://vitejs.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/) (ES2022)
- **Animation:** [GSAP](https://greensock.com/gsap/) (GreenSock Animation Platform)
- **Styling:** CSS3 with Custom Properties (Design Tokens)

## ✨ Features

- **Hero Section:** Immersive background video with text reveal animations.
- **Works Showcase:** Portfolio gallery to display projects.
- **About Section:** Information about the developer.
- **Contact Section:** Contact information and call-to-action.
- **Animations:** High-performance, smooth animations using GSAP Timeline.
- **Responsive Design:** Mobile-first approach ensuring compatibility across all devices.

## 📂 Project Structure

The project follows a modular, feature-based architecture:

```
e-portfolio/
├── vite-project/           # Main Application Directory
│   ├── src/
│   │   ├── sections/       # Feature Sections
│   │   │   ├── hero/       # Hero section (video & intro)
│   │   │   ├── works/      # Projects showcase
│   │   │   ├── about/      # About me
│   │   │   └── contact/    # Contact info
│   │   ├── components/     # Reusable components (e.g., Navbar)
│   │   ├── shared/         # Utilities and shared animations
│   │   ├── main.ts         # Entry point
│   │   └── style.css       # Global styles & design tokens
│   ├── package.json        # Project dependencies
│   └── vite.config.js      # Vite configuration
└── dist/                   # Production build output
```

## 🛠️ Getting Started

### Prerequisites
- Node.js (v16 or higher recommended)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/cheehao999/cheehao999.github.io.git
   cd e-portfolio
   ```

2. **Navigate to the project directory:**
   ```bash
   cd vite-project
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

### Development

Start the local development server:
```bash
npm run dev
```
The application will be available at `http://localhost:5173`.

### Build

Build the project for production:
```bash
npm run build
```
This will compile TypeScript and generate production assets in the `../dist` directory.

### Preview

Preview the production build locally:
```bash
npm run preview
```

## 🎨 Design System

The project uses a **Midnight Prism** theme defined in `style.css`:
- **Colors:** Deep space background (`#030305`) with Indigo (`#6366f1`) and Teal (`#2dd4bf`) accents.
- **Typography:** 'Outfit' font family.
- **Spacing:** Custom spacing scale.

## 📝 License

This project is open source and available under the [MIT License](LICENSE).
