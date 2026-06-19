export default function AuraEffect({ activePokemon, parallax }) {
  return (
    <div
      className="aura-effect"
      style={{
        background: `radial-gradient(circle, ${activePokemon.colors.glow} 0%, transparent 70%)`,
        right: '25%',
        top: '35%',
        transform: `translate(${parallax.x * 1.5}px, ${parallax.y * 1.5}px)`,
      }}
    />
  );
}
