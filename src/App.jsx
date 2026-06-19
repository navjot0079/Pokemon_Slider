import { useEffect } from 'react';
import './index.css';
import useSlider from './hooks/useSlider';
import useParallax from './hooks/useParallax';
import HeroSection from './components/HeroSection';
import pokemonData from './data/pokemon';

// Preload all Pokémon images and backgrounds on app mount
function preloadImages() {
  pokemonData.forEach((poke) => {
    const img = new Image();
    img.src = poke.image;
    if (poke.bgImage) {
      const bg = new Image();
      bg.src = poke.bgImage;
    }
  });
}

export default function App() {
  const slider = useSlider();
  const parallax = useParallax(0.02);

  useEffect(() => {
    preloadImages();
  }, []);

  return (
    <HeroSection
      activeIndex={slider.activeIndex}
      direction={slider.direction}
      activePokemon={slider.activePokemon}
      total={slider.total}
      goNext={slider.goNext}
      goPrev={slider.goPrev}
      goTo={slider.goTo}
      parallax={parallax}
    />
  );
}
