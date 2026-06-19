import BackgroundLayer from './BackgroundLayer';
import ParticleField from './ParticleField';
import AuraEffect from './AuraEffect';
import HeroContent from './HeroContent';
import PokemonCards from './PokemonCards';
import Controls from './Controls';
import useSwipe from '../hooks/useSwipe';

export default function HeroSection({ activeIndex, direction, activePokemon, total, goNext, goPrev, goTo, parallax }) {
  const swipeHandlers = useSwipe(goNext, goPrev);

  return (
    <div className="hero-section" {...swipeHandlers}>
      {/* Background */}
      <BackgroundLayer activePokemon={activePokemon} parallax={parallax} />

      {/* Particles */}
      <ParticleField activePokemon={activePokemon} parallax={parallax} />

      {/* Aura */}
      <AuraEffect activePokemon={activePokemon} parallax={parallax} />

      {/* Left: Content */}
      <HeroContent
        activePokemon={activePokemon}
        direction={direction}
      />

      {/* Right: Cards */}
      <PokemonCards
        activeIndex={activeIndex}
        activePokemon={activePokemon}
        goTo={goTo}
        parallax={parallax}
      />

      {/* Controls */}
      <Controls
        activeIndex={activeIndex}
        activePokemon={activePokemon}
        goNext={goNext}
        goPrev={goPrev}
        goTo={goTo}
      />
    </div>
  );
}
