import { motion } from 'framer-motion';

export default function PokemonCard({ pokemon, isActive, distance, onClick, activePokemon }) {
  const cardClass = [
    'pokemon-card',
    isActive && 'pokemon-card--active',
    distance === 1 && 'pokemon-card--adjacent',
    distance >= 2 && 'pokemon-card--far',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <motion.div
      className={cardClass}
      onClick={onClick}
      style={{
        '--pokemon-glow': isActive ? activePokemon.colors.glow : 'transparent',
        '--pokemon-card-border': isActive ? activePokemon.colors.cardBorder : 'rgba(255,255,255,0.1)',
      }}
      layout
      transition={{
        layout: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
      }}
    >
      {/* Glow behind image */}
      <div
        className="pokemon-card__glow"
        style={{
          background: `radial-gradient(circle, ${pokemon.colors.glow} 0%, transparent 70%)`,
        }}
      />

      {/* Image */}
      <div className="pokemon-card__image-wrap">
        <img
          className="pokemon-card__image"
          src={pokemon.image}
          alt={pokemon.name}
          loading="lazy"
          draggable={false}
        />
      </div>

      {/* Info */}
      <div className="pokemon-card__info">
        <div className="pokemon-card__name">{pokemon.name}</div>
        <div className="pokemon-card__type" style={{ color: pokemon.colors.primary }}>
          {pokemon.typeIcon} {pokemon.type}
        </div>
      </div>
    </motion.div>
  );
}
