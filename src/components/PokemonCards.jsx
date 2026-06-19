import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import PokemonCard from './PokemonCard';
import pokemonData from '../data/pokemon';
import '../styles/cards.css';

export default function PokemonCards({ activeIndex, activePokemon, goTo, parallax }) {
  const trackRef = useRef(null);

  // Calculate visible cards centered around activeIndex
  const getVisibleCards = () => {
    const total = pokemonData.length;
    const visible = [];

    // Show 5 cards: active + 2 on each side (or fewer on mobile)
    for (let offset = -2; offset <= 2; offset++) {
      const idx = (activeIndex + offset + total) % total;
      visible.push({
        pokemon: pokemonData[idx],
        index: idx,
        offset,
        distance: Math.abs(offset),
      });
    }

    return visible;
  };

  const visibleCards = getVisibleCards();

  // GSAP slide animation
  useEffect(() => {
    if (!trackRef.current) return;

    gsap.fromTo(
      trackRef.current,
      { x: 60, opacity: 0.7 },
      {
        x: 0,
        opacity: 1,
        duration: 0.7,
        ease: 'power3.out',
      }
    );
  }, [activeIndex]);

  return (
    <div className="pokemon-cards">
      <div
        className="pokemon-cards__track"
        ref={trackRef}
        style={{
          transform: `translate(${parallax.x * 0.8}px, ${parallax.y * 0.8}px)`,
        }}
      >
        {visibleCards.map(({ pokemon, index, offset, distance }) => (
          <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
            isActive={index === activeIndex}
            distance={distance}
            offset={offset}
            onClick={() => goTo(index)}
            activePokemon={activePokemon}
          />
        ))}
      </div>
    </div>
  );
}
