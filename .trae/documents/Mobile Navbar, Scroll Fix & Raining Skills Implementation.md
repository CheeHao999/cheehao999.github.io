# Implementation Plan

## 1. Mobile Navbar with "Hamburger" Toggle

**Goal:** Make the navbar responsive with a collapsible menu on mobile.

### `src/components/navbar/navbar.css`

* **Mobile Styles (max-width: 768px):**

  * Hide the default `.nav-links`.

  * Create a `.nav-menu` overlay (fixed position, full screen or slide-down, dark glass background).

  * Add `.mobile-toggle` button styles (hamburger icon that transforms to 'X').

  * Show `.nav-links` inside the overlay when active.

### `src/components/navbar/navbar.ts`

* **HTML Structure:**

  * Add `<button class="mobile-toggle">` inside the navbar container.

  * Wrap links in a container that can be toggled.

* **Logic:**

  * Add click event listener to the toggle button to add/remove `.active` class on the menu.

  * Close the menu automatically when a link is clicked.

  * Remove duplicate scroll event listeners.

## 2. Fix Scroll Offset for "About" Section

**Goal:** Ensure the navbar doesn't cover the section content when scrolling.

### `src/style.css`

* **Current Issue:** The `scroll-margin-top` is applied to `section` tags, but the navigation links target the wrapping `div` IDs (e.g., `#about`), which do not have the margin.

* **Fix:** Update the CSS rule to apply `scroll-margin-top: 120px` (or appropriate variable) to the target IDs (`#about`, `#works`, `#contact`, etc.) or generic `[id]` selectors used for navigation.

## 3. Raining Skills Component

**Goal:** Replace the static skills list with a "Matrix-style" raining animation inside an RGB-bordered box.

### `src/sections/about/about.ts`

* **Structure:** Replace the existing `.skills-grid` with a new container `<div id="skills-rain-container">`.

* **Logic:**

  * Use **GSAP** to generate "skill capsules" (small rectangles with text).

  * Create a function to spawn these capsules at random X positions.

  * Animate them falling from top to bottom indefinitely with varying speeds and delays.

### `src/sections/about/about.css`

* **Container Styling:**

  * `position: relative`, `overflow: hidden`, `height: 400px` (fixed height for the effect).

  * **RGB Border:** Use `background-image` with `conic-gradient` or specific border hacks to achieve the "RGB surrounding" effect on a curved box (`border-radius: 20px`).

* **Capsule Styling:**

  * Small rectangular boxes with semi-transparent backgrounds and text.

