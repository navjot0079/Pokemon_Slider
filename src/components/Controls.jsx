import { useEffect, useRef } from 'react';
import pokemonData from '../data/pokemon';
import '../styles/controls.css';

export default function Controls({ activeIndex, activePokemon, goNext, goPrev, goTo }) {
  const progressRef = useRef(null);

  // Reset progress bar animation on slide change
  useEffect(() => {
    const bar = progressRef.current;
    if (!bar) return;

    bar.style.animation = 'none';
    // Force reflow
    void bar.offsetHeight;
    bar.style.animation = 'progressFill 5s linear infinite';
  }, [activeIndex]);

  return (
    <>
      <div
        className="controls"
        style={{
          '--pokemon-primary': activePokemon.colors.primary,
          '--pokemon-glow': activePokemon.colors.glow,
        }}
      >
        {/* Previous */}
        <button
          className="controls__btn"
          onClick={goPrev}
          aria-label="Previous Pokémon"
        >
          <svg viewBox="0 0 24 24">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Indicators */}
        <div className="controls__indicators">
          {pokemonData.map((poke, i) => (
            <button
              key={poke.id}
              className={`controls__dot ${i === activeIndex ? 'controls__dot--active' : ''}`}
              onClick={() => goTo(i)}
              aria-label={`Go to ${poke.name}`}
              style={
                i === activeIndex
                  ? {
                      background: activePokemon.colors.primary,
                      boxShadow: `0 0 12px ${activePokemon.colors.glow}`,
                    }
                  : undefined
              }
            />
          ))}
        </div>

        {/* Next */}
        <button
          className="controls__btn"
          onClick={goNext}
          aria-label="Next Pokémon"
        >
          <svg viewBox="0 0 24 24">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {/* Progress bar */}
      <div className="controls__progress">
        <div
          className="controls__progress-bar"
          ref={progressRef}
          style={{
            background: `linear-gradient(90deg, ${activePokemon.colors.primary}, ${activePokemon.colors.secondary})`,
          }}
        />
      </div>
    </>
  );
}
