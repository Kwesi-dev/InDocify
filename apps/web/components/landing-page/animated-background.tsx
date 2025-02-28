"use client";

import { useEffect, useRef } from "react";

interface Point {
  x: number;
  y: number;
  vx: number;
  vy: number;
  glowing: boolean;
}

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    // Set canvas size with device pixel ratio consideration
    const setCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };
    setCanvasSize();

    // Throttle resize events
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(setCanvasSize, 250);
    };
    window.addEventListener("resize", handleResize);

    // Create points
    const points: Point[] = [];
    const numPoints = Math.min(
      30,
      Math.floor((canvas.width * canvas.height) / 50000)
    );
    const connectionDistance = 120;
    const pointSize = 2;

    // Initialize points
    for (let i = 0; i < numPoints; i++) {
      points.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        glowing: Math.random() > 0.8,
      });
    }

    // Pre-calculate values
    const connectionDistanceSquared = connectionDistance * connectionDistance;
    let animationFrameId: number;

    // Animation function
    const animate = () => {
      if (!ctx || !canvas) return;

      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Batch all line drawing
      ctx.beginPath();
      ctx.strokeStyle = "rgba(204, 255, 0, 0.15)";
      ctx.lineWidth = 1;

      // Update points and draw connections
      for (let i = 0; i < points.length; i++) {
        const point = points[i];
        if (!point) continue;

        // Update position
        point.x += point.vx;
        point.y += point.vy;

        // Bounce off edges
        if (point.x < 0 || point.x > canvas.width) point.vx *= -1;
        if (point.y < 0 || point.y > canvas.height) point.vy *= -1;

        // Find and draw connections
        for (let j = i + 1; j < points.length; j++) {
          const point2 = points[j];
          if (!point2) continue;

          const dx = point.x - point2.x;
          const dy = point.y - point2.y;
          const distanceSquared = dx * dx + dy * dy;

          if (distanceSquared < connectionDistanceSquared) {
            ctx.moveTo(point.x, point.y);
            ctx.lineTo(point2.x, point2.y);
          }
        }
      }
      ctx.stroke();

      // Draw points
      points.forEach((point) => {
        if (point.glowing) {
          ctx.beginPath();
          ctx.fillStyle = "#CCFF00";
          ctx.arc(point.x, point.y, pointSize + 1, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.beginPath();
        ctx.fillStyle = "rgba(204, 255, 0, 0.5)";
        ctx.arc(point.x, point.y, pointSize, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      clearTimeout(resizeTimeout);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full opacity-30 pointer-events-none"
      aria-hidden="true"
    />
  );
}
