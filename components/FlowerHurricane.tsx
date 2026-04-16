import { useEffect, useRef } from 'react';

// Strict typing for pure memory references
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  angle: number;
  va: number;
  flipX: number;
  flipSpeed: number;
  color: string;
  type: 'petal' | 'leaf';
}

interface Props {
  isActive: boolean;
  isDayMode: boolean;
  onAnimationComplete: () => void;
}

export default function FlowerHurricane({ isActive, isDayMode, onAnimationComplete }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // CRITICAL: Store particle array natively in memory (No useState re-renders!)
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isActive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Strict absolute viewport sizing
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Determine colors based on the theme we are transitioning into
    const dayColors = ['#ffb7c5', '#ff91a4', '#fdfd96', '#ffffff', '#77dd77', '#8fdf8f']; // Pink blossoms, green leaves, white
    const nightColors = ['#94a3b8', '#64748b', '#475569', '#334155', '#e2e8f0', '#ffffff', '#1e293b']; // Ash, slate, gray, white, dark gray
    
    // Select the current color palette
    const colors = isDayMode ? dayColors : nightColors;
    
    const NUM_PARTICLES = 875; // Reduced by another 10% (972 -> 875) for peak performance

    // Initialize state strictly in memory buffer
    particlesRef.current = [];
    for (let i = 0; i < NUM_PARTICLES; i++) {
        // Tight cluster spawn: x spawns between -100 and -900 
      particlesRef.current.push({
        x: -Math.random() * 800 - 100, 
        y: Math.random() * canvas.height * 1.5 - (canvas.height * 0.25), 
        vx: Math.random() * 10.21 + 20.41, 
        vy: (Math.random() - 0.5) * 8,    
        size: Math.random() * 42 + 29.5, // Increased size by 5% (was 40 + 28)
        angle: Math.random() * Math.PI * 2,
        va: (Math.random() - 0.5) * 0.2,  
        flipX: Math.random() * Math.PI * 2,
        flipSpeed: Math.random() * 0.1 + 0.05,
        color: colors[Math.floor(Math.random() * colors.length)],
        type: Math.random() > 0.85 ? 'leaf' : 'petal'
      });
    }

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let activeCount = 0;

      // Grouping operations by color is a classic optimization, 
      // but since every leaf has its own transform, we must keep some state changes.
      // We will minimize path complexity for maximum gain.

      for (let i = 0; i < particlesRef.current.length; i++) {
        const p = particlesRef.current[i];
        if (p.x > canvas.width + 100) continue; 
        activeCount++;

        p.x += p.vx;
        p.y += p.vy;
        p.angle += p.va;
        p.flipX += p.flipSpeed;

        const scaleX = Math.sin(p.flipX);
        
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.scale(scaleX, 1);
        
        // Simplified Path: Elliptic approximation (Cheaper than complex Beziers)
        ctx.beginPath();
        if (p.type === 'petal') {
          // A simpler, more "graphic" petal shape (heart-like / teardrop)
          ctx.ellipse(p.size/2, 0, p.size/2, p.size/3, 0, 0, Math.PI * 2);
        } else {
          // A simpler leaf (classic almond shape)
          ctx.moveTo(0, -p.size/4);
          ctx.lineTo(p.size, 0);
          ctx.lineTo(0, p.size/4);
          ctx.lineTo(-p.size, 0);
          ctx.closePath();
        }

        // Optimization: Single fill call, no stroke. 
        // We use a slight opacity to keep it looking airy and aesthetic.
        ctx.globalAlpha = 0.85;
        ctx.fillStyle = p.color;
        ctx.fill();

        ctx.restore();
      }

      if (activeCount > 0) {
        animFrameRef.current = requestAnimationFrame(drawParticles);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        onAnimationComplete();
      }
    };

    animFrameRef.current = requestAnimationFrame(drawParticles);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive]);

  // ALWAYS MOUNTED to prevent context-switching stutter, but hidden when inactive
  return (
    <div className={`fixed inset-0 w-screen h-screen z-[9999] pointer-events-none ${isActive ? 'visible' : 'hidden'}`} style={{ position: 'fixed', top: 0, left: 0 }}>
      <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full pointer-events-none" />
    </div>
  );
}
