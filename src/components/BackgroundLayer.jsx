import { useRef, useEffect, useState } from 'react';
import '../styles/hero.css';

export default function BackgroundLayer({ activePokemon, parallax }) {
  const [layers, setLayers] = useState({
    front: activePokemon,
    back: null,
    frontActive: true,
  });
  const prevPokemonRef = useRef(activePokemon);

  useEffect(() => {
    if (prevPokemonRef.current.id === activePokemon.id) return;

    setLayers((prev) => ({
      front: prev.frontActive ? prev.front : activePokemon,
      back: prev.frontActive ? activePokemon : prev.back,
      frontActive: !prev.frontActive,
    }));

    // After crossfade, update the hidden layer
    const timeout = setTimeout(() => {
      setLayers((prev) => ({
        front: prev.frontActive ? activePokemon : prev.front,
        back: prev.frontActive ? prev.back : activePokemon,
        frontActive: prev.frontActive,
      }));
    }, 900);

    prevPokemonRef.current = activePokemon;
    return () => clearTimeout(timeout);
  }, [activePokemon]);

  const parallaxStyle = {
    transform: `translate(${parallax.x * 0.5}px, ${parallax.y * 0.5}px)`,
  };

  const frontData = layers.front;
  const backData = layers.back || layers.front;

  return (
    <div className="background-layer">
      {/* ---- Background Image Layers ---- */}
      {/* Image Layer A */}
      <div
        className={`background-layer__image ${
          layers.frontActive
            ? 'background-layer__image--active'
            : 'background-layer__image--hidden'
        }`}
        style={{
          backgroundImage: frontData?.bgImage ? `url(${frontData.bgImage})` : 'none',
          ...parallaxStyle,
        }}
      />
      {/* Image Layer B */}
      <div
        className={`background-layer__image ${
          !layers.frontActive
            ? 'background-layer__image--active'
            : 'background-layer__image--hidden'
        }`}
        style={{
          backgroundImage: backData?.bgImage ? `url(${backData.bgImage})` : 'none',
          ...parallaxStyle,
        }}
      />

      {/* ---- Gradient Layers (tinted overlay on top of images) ---- */}
      {/* Gradient Layer A */}
      <div
        className={`background-layer__gradient ${
          layers.frontActive
            ? 'background-layer__gradient--active'
            : 'background-layer__gradient--hidden'
        }`}
        style={{
          background: frontData?.colors.gradient,
          ...parallaxStyle,
        }}
      />
      {/* Gradient Layer B */}
      <div
        className={`background-layer__gradient ${
          !layers.frontActive
            ? 'background-layer__gradient--active'
            : 'background-layer__gradient--hidden'
        }`}
        style={{
          background: backData?.colors.gradient || frontData?.colors.gradient,
          ...parallaxStyle,
        }}
      />

      <div className="background-layer__overlay" />
      <div className="background-layer__vignette" />
      <div className="background-layer__noise" />
    </div>
  );
}
