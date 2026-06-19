# ⚡ Pokémon Showcase — Premium Slider

A premium, interactive Pokémon showcase slider built with React 19, Vite, Framer Motion, and GSAP. This application features cinematic transitions, custom dynamic Canvas particle fields, 3D interactive parallax effects, and custom-tailored atmospheric themes for each Pokémon.

---

## ✨ Features

- 🌅 **Dynamic Atmospheric Themes:** Each Pokémon comes with its own unique color palette, custom gradients, text colors, and neon-glowing border parameters.
- 🌌 **Thematic Canvas Particles:** High-performance HTML5 Canvas-based floating particles (embers, sparks, bubbles, orbs, stars, wisps) that react dynamically to mouse position and match each Pokémon's elemental style.
- 💫 **Interactive Parallax Effect:** Smooth 3D mouse parallax tracking (`useParallax` hook) that reacts dynamically to hover movements, adding depth to the cards and backgrounds.
- 🎭 **Cinematic Animations:** High-end motion design using a hybrid animation system powered by **GSAP** (for staggered typography/content transitions) and **Framer Motion** (for smooth 3D layouts).
- 🖱️ **Immersive Slider Controls:** Dot pagination, autoplay progress bar, standard navigation buttons, and touch-screen swipe gestures (`useSwipe` hook).
- ⚡ **Preloaded Assets:** Built-in performance-optimized image and artwork preloader to ensure instant visual transition feedback without layout shifts.
- 📱 **Fully Responsive Layout:** Optimized for high-resolution desktops, laptops, tablets, and mobile devices (including user-scalable touch gestures).

---

## 🛠️ Tech Stack

- **Core Framework:** [React 19](https://react.dev/)
- **Build Tool:** [Vite 8](https://vite.dev/)
- **Animation Libraries:** 
  - [GSAP (GreenSock Animation Platform) 3](https://greensock.com/gsap/) — for complex staggered typography and content entry/exit.
  - [Framer Motion 12](https://www.framer.com/motion/) — for layout animations and interactive card transitions.
- **Styling:** Vanilla CSS (Tailored Design Tokens & Micro-interactions)
- **Asset Sources:** [PokeAPI Sprites (Official Artwork)](https://raw.githubusercontent.com/PokeAPI/sprites/)

---

## 🚀 Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed (v18+ recommended).

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/navjot0079/Pokemon_Slider.git
   cd Pokemon_Slider
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` (or the port specified in terminal) in your browser to experience the showcase!

4. **Build for production:**
   ```bash
   npm run build
   ```

---

## 📁 Project Structure

```text
├── public/                 # Static assets (Favicons, SVG Icons)
├── src/
│   ├── assets/             # Background assets & default icons
│   ├── components/         # React Components
│   │   ├── AuraEffect.jsx      # Element glow and aura effects
│   │   ├── BackgroundLayer.jsx # Atmospheric backdrop transition
│   │   ├── Controls.jsx        # Navigation, indicators, and progress bar
│   │   ├── HeroContent.jsx     # Typography animations, power & rating stats
│   │   ├── HeroSection.jsx     # Parent layout / swipe wrapper
│   │   ├── ParticleField.jsx   # Interactive HTML5 Canvas particle generator
│   │   ├── PokemonCard.jsx     # Individual 3D animation cards
│   │   └── PokemonCards.jsx    # Offset/distance calculator & card track
│   ├── data/
│   │   └── pokemon.js          # Main database of featured Pokémon & themes
│   ├── hooks/
│   │   ├── useParallax.js      # Mouse movement listener for 3D depth
│   │   ├── useSlider.js        # Current index logic and navigation helpers
│   │   └── useSwipe.js         # Touch handler for swiping on mobile
│   ├── styles/             # Modular vanilla styling sheets
│   ├── App.jsx             # Main application and preloader logic
│   ├── index.css           # Global typography and base design system
│   └── main.jsx            # React root mount script
├── index.html              # HTML shell & web SEO meta-tags
├── package.json            # Node project configuration
└── tsconfig.json           # Optional TypeScript configurations
```

---

## 🎨 How to Add New Pokémon

You can add more Pokémon easily by expanding the dataset in `src/data/pokemon.js`. Each Pokémon config supports the following schema:

```javascript
{
  id: 150,
  name: 'Mewtwo',
  type: 'Psychic',
  typeIcon: '🔮',
  dexNumber: '#150',
  description: 'A Pokémon created by recombining Mew\'s genes...',
  power: 97,
  rating: 4.9,
  generation: 'Gen I',
  height: '2.0 m',
  weight: '122.0 kg',
  colors: {
    primary: '#9B59B6',
    secondary: '#6C3483',
    glow: 'rgba(155, 89, 182, 0.55)',
    text: '#F3E5F5',
    gradient: 'linear-gradient(135deg, #0d001a 0%, #1a0033 30%, #2d0066 70%, #1f004d 100%)',
    cardBorder: 'rgba(155, 89, 182, 0.3)',
    particleColors: ['#9B59B6', '#CE93D8', '#AB47BC', '#E1BEE7', '#7B1FA2'],
  },
  atmosphere: 'psychic-dimension', // Maps to shapes: spark, ember, orb, wisp, bubble, star
  bgKeywords: 'psychic aurora, energy dimension, cosmic void',
  bgImage: bgMewtwo, // Imported local backdrop
  image: 'https://raw.githubusercontent.com/PokeAPI/.../150.png', // Main sprite/artwork
}
```

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
