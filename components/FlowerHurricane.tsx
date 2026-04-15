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
    
    const NUM_PARTICLES = 972; // Reduced density by another 5% for extreme performance tuning (1024 -> 972)

    // Initialize state strictly in memory buffer
    particlesRef.current = [];
    for (let i = 0; i < NUM_PARTICLES; i++) {
        // Tight cluster spawn: x spawns between -100 and -900 
        // We shrank this from 1200 to 900 to cut off the 0.3s "tail" of the gust.
      particlesRef.current.push({
        x: -Math.random() * 800 - 100, 
        y: Math.random() * canvas.height * 1.5 - (canvas.height * 0.25), 
        // Speeds between 25.2 and 37.8 (Increased by exactly 5% to negate mid-screen optical drag)
        vx: Math.random() * 12.6 + 25.2, 
        vy: (Math.random() - 0.5) * 8,    
        size: Math.random() * 40 + 28, // Increased size by 3% to preserve volume (was 39 + 27)
        angle: Math.random() * Math.PI * 2,
        va: (Math.random() - 0.5) * 0.2,  
        flipX: Math.random() * Math.PI * 2,
        flipSpeed: Math.random() * 0.1 + 0.05,
        color: colors[Math.floor(Math.random() * colors.length)],
        type: Math.random() > 0.85 ? 'leaf' : 'petal' // In night mode, these become jagged dark shards
      });
    }

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let activeCount = 0;

      particlesRef.current.forEach(p => {
        if (p.x > canvas.width + 100) return; // Dead
        activeCount++;

        // Memory mutation (0 re-renders horizontally synced)
        p.x += p.vx;
        p.y += p.vy;
        p.angle += p.va;
        p.flipX += p.flipSpeed;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.scale(Math.sin(p.flipX), 1);
        
        ctx.beginPath();
        // Reverted to exactly the old smooth oval/bubble shapes
        if (p.type === 'petal') {
          ctx.moveTo(0, 0);
          ctx.bezierCurveTo(p.size / 2, -p.size / 2, p.size, -p.size / 3, p.size, 0);
          ctx.bezierCurveTo(p.size, p.size / 3, p.size / 2, p.size / 2, 0, 0);
        } else {
          ctx.moveTo(0, -p.size/2);
          ctx.bezierCurveTo(p.size, -p.size/2, p.size, p.size/2, 0, p.size/2);
          ctx.bezierCurveTo(-p.size, p.size/2, -p.size, -p.size/2, 0, -p.size/2);
        }

        // Texture & Lighting Effect Updates (Shadows & Gradients REMOVED for strict 60fps lock)
        
        // 1. High Performance Solid Fill (Bypasses GC micro-stuttering)
        ctx.fillStyle = p.color;
        ctx.fill();

        // 2. Subtle bright edge-lighting stroke to keep the premium "glassy" outline texture
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.stroke();

        ctx.restore();
      });

      if (activeCount > 0) {
        animFrameRef.current = requestAnimationFrame(drawParticles);
      } else {
        // Use the passed function directly without adding it to dependencies
        onAnimationComplete();
      }
    };

    animFrameRef.current = requestAnimationFrame(drawParticles);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive]);

  // Pure fixed viewport layer (disconnected from all flex/transform structures)
  return (
    <div className="fixed inset-0 w-screen h-screen z-[9999] pointer-events-none" style={{ position: 'fixed', top: 0, left: 0 }}>
      {isActive && (
        <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full pointer-events-none" />
      )}
    </div>
  );
}
