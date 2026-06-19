import { useRef, useEffect, useCallback } from 'react';
import '../styles/particles.css';

// Particle shapes per atmosphere type
const PARTICLE_SHAPES = {
  'electric-storm': 'spark',
  volcano: 'ember',
  'psychic-dimension': 'orb',
  'aura-realm': 'orb',
  haunted: 'wisp',
  'ocean-ninja': 'bubble',
  'sky-realm': 'spark',
  celestial: 'star',
};

class Particle {
  constructor(canvas, colors, shape) {
    this.canvas = canvas;
    this.reset(colors, shape, true);
  }

  reset(colors, shape, initial = false) {
    this.x = initial ? Math.random() * this.canvas.width : this.canvas.width + Math.random() * 100;
    this.y = Math.random() * this.canvas.height;
    this.size = Math.random() * 3 + 1;
    this.speedX = -(Math.random() * 0.5 + 0.1);
    this.speedY = (Math.random() - 0.5) * 0.3;
    this.opacity = Math.random() * 0.5 + 0.1;
    this.opacitySpeed = (Math.random() - 0.5) * 0.005;
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.shape = shape;
    this.angle = Math.random() * Math.PI * 2;
    this.angleSpeed = (Math.random() - 0.5) * 0.02;
    this.life = 1;
    this.decay = Math.random() * 0.001 + 0.0005;
    if (initial) {
      this.x = Math.random() * this.canvas.width;
    }
  }

  update(mouseX, mouseY) {
    this.x += this.speedX;
    this.y += this.speedY;
    this.angle += this.angleSpeed;
    this.opacity += this.opacitySpeed;

    // Mouse repulsion (subtle)
    const dx = this.x - mouseX;
    const dy = this.y - mouseY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 150) {
      const force = (150 - dist) / 150;
      this.x += (dx / dist) * force * 0.5;
      this.y += (dy / dist) * force * 0.5;
    }

    // Float behavior based on shape
    if (this.shape === 'ember') {
      this.y -= 0.3;
      this.speedX += (Math.random() - 0.5) * 0.05;
    } else if (this.shape === 'bubble') {
      this.y -= 0.2;
      this.x += Math.sin(this.angle) * 0.3;
    } else if (this.shape === 'wisp') {
      this.x += Math.sin(this.angle * 0.5) * 0.4;
      this.y += Math.cos(this.angle * 0.3) * 0.2;
    }

    // Clamp opacity
    if (this.opacity > 0.6) this.opacitySpeed = -Math.abs(this.opacitySpeed);
    if (this.opacity < 0.05) this.opacitySpeed = Math.abs(this.opacitySpeed);

    this.life -= this.decay;

    // Respawn if out of bounds or dead
    return this.x > -20 && this.x < this.canvas.width + 20 &&
           this.y > -20 && this.y < this.canvas.height + 20 &&
           this.life > 0;
  }

  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = this.opacity * this.life;
    ctx.fillStyle = this.color;
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);

    switch (this.shape) {
      case 'spark':
        // Diamond shape
        ctx.beginPath();
        ctx.moveTo(0, -this.size * 2);
        ctx.lineTo(this.size * 0.6, 0);
        ctx.lineTo(0, this.size * 2);
        ctx.lineTo(-this.size * 0.6, 0);
        ctx.closePath();
        ctx.fill();
        // Glow
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        break;

      case 'ember':
        // Circle with glow
        ctx.beginPath();
        ctx.arc(0, 0, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 12;
        ctx.fill();
        break;

      case 'orb':
        // Soft circle
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, this.size * 2);
        gradient.addColorStop(0, this.color);
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(0, 0, this.size * 2, 0, Math.PI * 2);
        ctx.fill();
        break;

      case 'wisp':
        // Elongated ellipse
        ctx.beginPath();
        ctx.ellipse(0, 0, this.size * 0.5, this.size * 2, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 10;
        ctx.fill();
        break;

      case 'bubble':
        // Ring
        ctx.beginPath();
        ctx.arc(0, 0, this.size * 1.5, 0, Math.PI * 2);
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 0.5;
        ctx.stroke();
        ctx.globalAlpha *= 0.3;
        ctx.fill();
        break;

      case 'star':
        // 4-point star
        ctx.beginPath();
        for (let i = 0; i < 4; i++) {
          const a = (i * Math.PI) / 2;
          ctx.lineTo(Math.cos(a) * this.size * 2, Math.sin(a) * this.size * 2);
          const a2 = a + Math.PI / 4;
          ctx.lineTo(Math.cos(a2) * this.size * 0.6, Math.sin(a2) * this.size * 0.6);
        }
        ctx.closePath();
        ctx.fill();
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 10;
        ctx.fill();
        break;

      default:
        ctx.beginPath();
        ctx.arc(0, 0, this.size, 0, Math.PI * 2);
        ctx.fill();
    }

    ctx.restore();
  }
}

export default function ParticleField({ activePokemon, parallax }) {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const frameRef = useRef(null);
  const mouseRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const pokemonRef = useRef(activePokemon);

  // Update mouse from parallax
  useEffect(() => {
    mouseRef.current = {
      x: window.innerWidth / 2 + parallax.x * 25,
      y: window.innerHeight / 2 + parallax.y * 25,
    };
  }, [parallax]);

  // Update pokemon ref
  useEffect(() => {
    pokemonRef.current = activePokemon;
  }, [activePokemon]);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const poke = pokemonRef.current;
    const shape = PARTICLE_SHAPES[poke.atmosphere] || 'orb';
    const colors = poke.colors.particleColors;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update & draw existing particles
    particlesRef.current = particlesRef.current.filter((p) => {
      const alive = p.update(mouseRef.current.x, mouseRef.current.y);
      if (alive) {
        p.draw(ctx);
        return true;
      }
      return false;
    });

    // Maintain particle count
    const targetCount = window.innerWidth < 768 ? 30 : 60;
    while (particlesRef.current.length < targetCount) {
      particlesRef.current.push(new Particle(canvas, colors, shape));
    }

    frameRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);
    frameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [animate]);

  // When pokemon changes, gradually replace particles with new colors/shapes
  useEffect(() => {
    const shape = PARTICLE_SHAPES[activePokemon.atmosphere] || 'orb';
    const colors = activePokemon.colors.particleColors;

    // Reset half the particles immediately for visual impact
    const particles = particlesRef.current;
    const halfCount = Math.floor(particles.length / 2);
    for (let i = 0; i < halfCount; i++) {
      particles[i].reset(colors, shape);
    }
  }, [activePokemon]);

  return (
    <div className="particle-field">
      <canvas ref={canvasRef} />
    </div>
  );
}
