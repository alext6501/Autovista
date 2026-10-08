import React, { useEffect, useRef, useState } from 'react';

interface MovingCarHeroBackgroundProps {
  onToggleMotion?: (isPlaying: boolean) => void;
  showControls?: boolean;
}

export const MovingCarHeroBackground: React.FC<MovingCarHeroBackgroundProps> = ({
  showControls = true,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check user prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
      if (e.matches && videoRef.current) {
        videoRef.current.pause();
        setIsVideoPlaying(false);
      }
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Video autoplay attempt with safety fallback
  useEffect(() => {
    if (prefersReducedMotion) return;

    if (videoRef.current) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsVideoPlaying(true))
          .catch(() => {
            // Autoplay with muted is allowed in modern browsers
            setIsVideoPlaying(false);
          });
      }
    }
  }, [prefersReducedMotion]);

  const togglePlayback = () => {
    if (!videoRef.current) return;
    if (isVideoPlaying) {
      videoRef.current.pause();
      setIsVideoPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsVideoPlaying(true)).catch(() => {});
    }
  };

  // High-performance canvas highway light trails & speed particle animation
  useEffect(() => {
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth || window.innerWidth);
    let height = (canvas.height = canvas.offsetHeight || 800);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth || window.innerWidth;
      height = canvas.height = canvas.offsetHeight || 800;
    };
    window.addEventListener('resize', handleResize);

    // Dynamic light particles running along the highway perspective
    interface LightTrail {
      x: number;
      y: number;
      speed: number;
      length: number;
      color: string;
      width: number;
    }

    const trails: LightTrail[] = [];
    const trailCount = 20;

    for (let i = 0; i < trailCount; i++) {
      const isTaillight = Math.random() > 0.45;
      trails.push({
        x: Math.random() * width,
        y: height * 0.48 + Math.random() * (height * 0.48),
        speed: 10 + Math.random() * 16,
        length: 80 + Math.random() * 160,
        color: isTaillight
          ? 'rgba(239, 68, 68, 0.45)'
          : 'rgba(96, 165, 250, 0.45)',
        width: 1.2 + Math.random() * 1.8,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      trails.forEach((trail) => {
        trail.x += trail.speed;
        if (trail.x - trail.length > width) {
          trail.x = -trail.length;
          trail.y = height * 0.48 + Math.random() * (height * 0.48);
        }

        ctx.strokeStyle = trail.color;
        ctx.lineWidth = trail.width;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(trail.x - trail.length, trail.y);
        ctx.lineTo(trail.x, trail.y);
        ctx.stroke();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [prefersReducedMotion]);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden select-none z-0">
      {/* Moving Supercar Layer with Continuous Highway Motion */}
      <div className="absolute inset-0 w-full h-full animate-car-drive">
        {/* High-quality White Supercar Hero Image matching reference */}
        <img
          src="/src/assets/images/moving_supercar_hero_1791466036477.jpg"
          alt="Cinematic white supercar moving on highway"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
          loading="eager"
        />

        {/* Real Highway Moving Car Video Background */}
        {!prefersReducedMotion && (
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            onLoadedData={() => setIsVideoLoaded(true)}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
              isVideoLoaded ? 'opacity-85 sm:opacity-90' : 'opacity-0'
            }`}
          >
            <source src="/supercar-moving.mp4" type="video/mp4" />
            <source src="/highway-car-moving.mp4" type="video/mp4" />
          </video>
        )}
      </div>

      {/* Highway Speed Light Trails */}
      {!prefersReducedMotion && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full opacity-50 mix-blend-screen pointer-events-none"
        />
      )}

      {/* Subtle Cinematic Overlays:
          Leaves vehicle bright and visible while ensuring white typography is crisp and legible */}
      {/* 1. Subtle overall contrast tint */}
      <div className="absolute inset-0 bg-black/25 pointer-events-none" />

      {/* 2. Top gradient for glass navbar readability */}
      <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#0a0e17]/80 via-[#0a0e17]/40 to-transparent pointer-events-none" />

      {/* 3. Bottom gradient for smooth transition into brands section */}
      <div className="absolute bottom-0 inset-x-0 h-36 bg-gradient-to-t from-[#0a0e17] via-[#0a0e17]/60 to-transparent pointer-events-none" />

      {/* Optional Play/Pause Movement Floating Badge */}
      {showControls && (
        <div className="absolute bottom-3 right-3 z-20 pointer-events-auto">
          <button
            onClick={togglePlayback}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-slate-900/80 hover:bg-slate-800 text-[11px] font-semibold text-slate-300 hover:text-white border border-slate-700/60 backdrop-blur-md transition-all cursor-pointer shadow-md"
            title={isVideoPlaying ? 'Pause cinematic motion' : 'Play cinematic motion'}
            aria-label={isVideoPlaying ? 'Pause cinematic motion' : 'Play cinematic motion'}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isVideoPlaying ? 'bg-emerald-400 animate-pulse' : 'bg-slate-400'
              }`}
            />
            <span>{isVideoPlaying ? 'Motion ON' : 'Paused'}</span>
          </button>
        </div>
      )}
    </div>
  );
};
