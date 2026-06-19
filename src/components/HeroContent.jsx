import { useRef, useEffect, useMemo } from 'react';
import gsap from 'gsap';

export default function HeroContent({ activePokemon, direction }) {
  const containerRef = useRef(null);
  const nameRef = useRef(null);
  const metaRef = useRef(null);
  const descRef = useRef(null);
  const statsRef = useRef(null);
  const buttonsRef = useRef(null);
  const prevPokemonRef = useRef(null);

  const stars = useMemo(() => {
    const full = Math.floor(activePokemon.rating);
    const half = activePokemon.rating % 1 >= 0.5;
    const arr = [];
    for (let i = 0; i < 5; i++) {
      if (i < full) arr.push('★');
      else if (i === full && half) arr.push('★');
      else arr.push('☆');
    }
    return arr;
  }, [activePokemon.rating]);

  useEffect(() => {
    if (prevPokemonRef.current?.id === activePokemon.id) return;
    prevPokemonRef.current = activePokemon;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    const dir = direction;

    // Animate out previous content
    tl.to(
      [metaRef.current, nameRef.current, descRef.current, statsRef.current, buttonsRef.current],
      {
        opacity: 0,
        y: dir * -30,
        duration: 0.3,
        stagger: 0.03,
      }
    );

    // Animate name letters in
    tl.call(() => {
      // Force re-render happened, now animate in
      const letters = nameRef.current?.querySelectorAll('.hero-content__name-letter');
      if (letters) {
        gsap.set(letters, { opacity: 0, y: 60, rotateX: -90 });
        gsap.to(letters, {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.6,
          stagger: 0.04,
          ease: 'back.out(1.7)',
        });
      }
    });

    // Animate other elements in
    tl.to(
      metaRef.current,
      { opacity: 1, y: 0, duration: 0.5 },
      '-=0.3'
    );
    tl.to(
      nameRef.current,
      { opacity: 1, y: 0, duration: 0.5 },
      '-=0.4'
    );
    tl.to(
      descRef.current,
      { opacity: 1, y: 0, duration: 0.5 },
      '-=0.3'
    );
    tl.to(
      statsRef.current,
      { opacity: 1, y: 0, duration: 0.5 },
      '-=0.3'
    );
    tl.to(
      buttonsRef.current,
      { opacity: 1, y: 0, duration: 0.5 },
      '-=0.3'
    );

    return () => tl.kill();
  }, [activePokemon, direction]);

  const nameLetters = activePokemon.name.split('').map((letter, i) => (
    <span key={`${activePokemon.id}-${i}`} className="hero-content__name-letter">
      {letter}
    </span>
  ));

  return (
    <div
      className="hero-content"
      ref={containerRef}
      style={{
        '--pokemon-primary': activePokemon.colors.primary,
        '--pokemon-glow': activePokemon.colors.glow,
      }}
    >
      {/* Meta row */}
      <div className="hero-content__meta" ref={metaRef}>
        <span className="hero-content__dex">{activePokemon.dexNumber}</span>
        <span className="hero-content__meta-divider" />
        <span>{activePokemon.generation}</span>
        <span className="hero-content__meta-divider" />
        <span className="hero-content__type-badge">
          <span>{activePokemon.typeIcon}</span>
          <span>{activePokemon.type}</span>
        </span>
      </div>

      {/* Name */}
      <h1
        className="hero-content__name"
        ref={nameRef}
        style={{
          textShadow: `0 0 40px ${activePokemon.colors.glow}, 0 0 80px ${activePokemon.colors.glow}`,
          color: activePokemon.colors.text,
        }}
      >
        <span className="hero-content__name-inner">{nameLetters}</span>
      </h1>

      {/* Description */}
      <p className="hero-content__description" ref={descRef}>
        {activePokemon.description}
      </p>

      {/* Stats */}
      <div className="hero-content__stats" ref={statsRef}>
        <div className="hero-content__power">
          <span className="hero-content__power-label">Base Power</span>
          <div className="hero-content__power-bar-wrap">
            <div
              className="hero-content__power-bar"
              style={{
                width: `${activePokemon.power}%`,
                background: `linear-gradient(90deg, ${activePokemon.colors.primary}, ${activePokemon.colors.secondary})`,
                boxShadow: `0 0 10px ${activePokemon.colors.glow}`,
              }}
            />
          </div>
        </div>
        <div className="hero-content__power-value" style={{ color: activePokemon.colors.primary }}>
          {activePokemon.power}
        </div>
        <div className="hero-content__rating">
          <span className="hero-content__rating-label">Rating</span>
          <div className="hero-content__rating-stars" style={{ color: activePokemon.colors.primary }}>
            {stars.map((s, i) => (
              <span key={i}>{s}</span>
            ))}
            <span className="hero-content__rating-value">{activePokemon.rating.toFixed(1)}</span>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="hero-content__buttons" ref={buttonsRef}>
        <button
          className="hero-content__btn hero-content__btn--primary"
          style={{
            background: activePokemon.colors.primary,
            boxShadow: `0 4px 20px ${activePokemon.colors.glow}`,
          }}
        >
          <span>⚔️</span>
          Choose Pokémon
        </button>
        <button className="hero-content__btn hero-content__btn--secondary">
          <span>📖</span>
          View Pokédex
        </button>
      </div>
    </div>
  );
}
