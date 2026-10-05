import React, { useEffect, useRef, useState } from 'react';

export const MovingCarHeroBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

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

    // Speed light streaks & road markers
    interface LightStreak {
      x: number;
      y: number;
      speed: number;
      length: number;
      color: string;
      width: number;
    }

    const streaks: LightStreak[] = [];
    const streakCount = 28;
    for (let i = 0; i < streakCount; i++) {
      const isRed = Math.random() > 0.45;
      streaks.push({
        x: Math.random() * width,
        y: height * 0.45 + Math.random() * (height * 0.5),
        speed: 12 + Math.random() * 18,
        length: 80 + Math.random() * 160,
        color: isRed ? 'rgba(239, 68, 68, 0.7)' : 'rgba(59, 130, 246, 0.7)',
        width: 1.5 + Math.random() * 2,
      });
    }

    let frame = 0;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, width, height);

      // Night road base line
      const roadY = height * 0.65;

      // Draw moving asphalt perspective lines
      ctx.strokeStyle = 'rgba(30, 41, 59, 0.5)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, roadY);
      ctx.lineTo(width, roadY);
      ctx.stroke();

      // Moving road dashed markers
      const dashSpacing = 90;
      const offset = (frame * 16) % dashSpacing;
      ctx.fillStyle = 'rgba(234, 179, 8, 0.45)';
      for (let x = -dashSpacing + offset; x < width + dashSpacing; x += dashSpacing) {
        ctx.fillRect(x, roadY + 50, 45, 3);
      }

      // Render high-speed highway streaks (passing cars / light trails)
      streaks.forEach((streak) => {
        streak.x += streak.speed;
        if (streak.x - streak.length > width) {
          streak.x = -streak.length;
          streak.y = height * 0.45 + Math.random() * (height * 0.5);
        }

        ctx.strokeStyle = streak.color;
        ctx.lineWidth = streak.width;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(streak.x - streak.length, streak.y);
        ctx.lineTo(streak.x, streak.y);
        ctx.stroke();
      });

      // Moving Silhouette Sports Car (cruising across the lower hero)
      const carBaseX = ((frame * 2.2) % (width + 500)) - 350;
      const carBaseY = roadY - 18;

      if (carBaseX > -400 && carBaseX < width + 100) {
        ctx.save();
        ctx.translate(carBaseX, carBaseY);

        // Headlight beam cone (illuminating forward)
        const beamGrad = ctx.createLinearGradient(190, 15, 480, 45);
        beamGrad.addColorStop(0, 'rgba(147, 197, 253, 0.45)');
        beamGrad.addColorStop(0.3, 'rgba(59, 130, 246, 0.2)');
        beamGrad.addColorStop(1, 'rgba(59, 130, 246, 0)');

        ctx.fillStyle = beamGrad;
        ctx.beginPath();
        ctx.moveTo(195, 12);
        ctx.lineTo(480, -10);
        ctx.lineTo(490, 60);
        ctx.lineTo(195, 26);
        ctx.closePath();
        ctx.fill();

        // Car chassis body
        ctx.fillStyle = '#0f172a';
        ctx.strokeStyle = 'rgba(59, 130, 246, 0.7)';
        ctx.lineWidth = 1.5;

        ctx.beginPath();
        ctx.moveTo(10, 28);
        ctx.lineTo(35, 18);
        ctx.lineTo(75, 16);
        ctx.lineTo(105, 5); // Windshield slope
        ctx.lineTo(155, 5); // Roof
        ctx.lineTo(185, 16); // Hood
        ctx.lineTo(210, 20); // Front nose
        ctx.lineTo(215, 30);
        ctx.lineTo(10, 30);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Glowing Blue Accent Rim Light
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(70, 16);
        ctx.lineTo(105, 5);
        ctx.lineTo(155, 5);
        ctx.stroke();

        // Red Taillight Glow
        ctx.shadowColor = '#ef4444';
        ctx.shadowBlur = 15;
        ctx.fillStyle = '#ef4444';
        ctx.fillRect(8, 20, 6, 5);

        // Bright Headlight
        ctx.shadowColor = '#60a5fa';
        ctx.shadowBlur = 18;
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(212, 18, 5, 4);

        // Spinning alloy wheels
        ctx.shadowBlur = 0;
        const wheelRadius = 9;
        [50, 175].forEach((wx) => {
          ctx.fillStyle = '#020617';
          ctx.beginPath();
          ctx.arc(wx, 30, wheelRadius, 0, Math.PI * 2);
          ctx.fill();

          ctx.strokeStyle = '#64748b';
          ctx.lineWidth = 1.5;
          ctx.stroke();

          // Spokes
          const wheelAngle = frame * 0.25;
          for (let s = 0; s < 5; s++) {
            const a = wheelAngle + (s * Math.PI * 2) / 5;
            ctx.beginPath();
            ctx.moveTo(wx, 30);
            ctx.lineTo(wx + Math.cos(a) * (wheelRadius - 2), 30 + Math.sin(a) * (wheelRadius - 2));
            ctx.stroke();
          }
        });

        ctx.restore();
      }

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
      {/* Background HTML5 Video of Moving Car */}
      <video
        autoPlay
        loop
        muted
        playsInline
        onLoadedData={() => setIsVideoLoaded(true)}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
          isVideoLoaded ? 'opacity-35' : 'opacity-20'
        } mix-blend-screen scale-105`}
      >
        <source src="/moving-car.mp4" type="video/mp4" />
      </video>

      {/* Real-time Dynamic Highway & Moving Car Canvas Layer */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-60 mix-blend-screen"
      />

      {/* Multi-stage Dark Gradients to Keep Copy Razor Sharp */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0e17] via-[#0a0e17]/85 to-[#0a0e17]/90 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e17] via-transparent to-[#0a0e17]/90 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/15 via-transparent to-transparent pointer-events-none" />
    </div>
  );
};
