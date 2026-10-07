import React, { useEffect, useRef, useState } from 'react';

export const MovingCarHeroBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    // Attempt auto-play programmatically if browser requires
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay policy fallback: muted is set so usually works
      });
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth || window.innerWidth);
    let height = (canvas.height = canvas.offsetHeight || 600);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth || window.innerWidth;
      height = canvas.height = canvas.offsetHeight || 600;
    };
    window.addEventListener('resize', handleResize);

    // Subtle atmospheric highway light particle streaks
    interface LightStreak {
      x: number;
      y: number;
      speed: number;
      length: number;
      color: string;
      width: number;
    }

    const streaks: LightStreak[] = [];
    const streakCount = 18;
    for (let i = 0; i < streakCount; i++) {
      const isRed = Math.random() > 0.5;
      streaks.push({
        x: Math.random() * width,
        y: height * 0.5 + Math.random() * (height * 0.45),
        speed: 8 + Math.random() * 14,
        length: 60 + Math.random() * 120,
        color: isRed ? 'rgba(239, 68, 68, 0.4)' : 'rgba(96, 165, 250, 0.4)',
        width: 1 + Math.random() * 1.5,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render high-speed highway streaks (light trails)
      streaks.forEach((streak) => {
        streak.x += streak.speed;
        if (streak.x - streak.length > width) {
          streak.x = -streak.length;
          streak.y = height * 0.5 + Math.random() * (height * 0.45);
        }

        ctx.strokeStyle = streak.color;
        ctx.lineWidth = streak.width;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(streak.x - streak.length, streak.y);
        ctx.lineTo(streak.x, streak.y);
        ctx.stroke();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0">
      {/* Real Highway Moving Car Video */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        onLoadedData={() => setIsVideoLoaded(true)}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
          isVideoLoaded ? 'opacity-55 sm:opacity-65' : 'opacity-40'
        } scale-102`}
      >
        <source src="/highway-car-moving.mp4" type="video/mp4" />
        <source src="/moving-car.mp4" type="video/mp4" />
      </video>

      {/* Atmospheric Highway Light Trails Overlay */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-50 mix-blend-screen"
      />

      {/* Modern Automotive Dark Film Gradients:
          Ensures high visual impact of the real highway video while guaranteeing copy contrast */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0e17]/95 via-[#0a0e17]/70 to-[#0a0e17]/85 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e17] via-transparent to-[#0a0e17]/80 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent pointer-events-none" />
    </div>
  );
};
