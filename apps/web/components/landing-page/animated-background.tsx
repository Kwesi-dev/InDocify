"use client";

import { useEffect, useRef } from "react";

interface Point {
  x: number;
  y: number;
  vx: number;
  vy: number;
  connections: Point[];
  glowing: boolean;
}

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    // Create points
    const points: Point[] = [];
    const numPoints = 50;
    const connectionDistance = 150;
    const pointSize = 3;

    // Initialize points
    for (let i = 0; i < numPoints; i++) {
      points.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        connections: [],
        glowing: Math.random() > 0.7,
      });
    }

    // Animation function
    const animate = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update points
      points.forEach((point) => {
        point.x += point.vx;
        point.y += point.vy;

        // Bounce off edges
        if (point.x < 0 || point.x > canvas.width) point.vx *= -1;
        if (point.y < 0 || point.y > canvas.height) point.vy *= -1;

        // Reset connections
        point.connections = [];
      });

      // Find connections
      for (let i = 0; i < points.length; i++) {
        const point1 = points[i];
        if (!point1) continue;

        for (let j = i + 1; j < points.length; j++) {
          const point2 = points[j];
          if (!point2) continue;

          const dx = point1.x - point2.x;
          const dy = point1.y - point2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            point1.connections.push(point2);
            point2.connections.push(point1);
          }
        }
      }

      // Draw connections
      ctx.beginPath();
      points.forEach((point) => {
        point.connections.forEach((connection) => {
          const distance = Math.sqrt(
            Math.pow(point.x - connection.x, 2) +
              Math.pow(point.y - connection.y, 2)
          );
          const opacity = 1 - distance / connectionDistance;

          ctx.strokeStyle = `rgba(204, 255, 0, ${opacity * 0.15})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(point.x, point.y);
          ctx.lineTo(connection.x, connection.y);
          ctx.stroke();
        });
      });

      // Draw points
      points.forEach((point) => {
        ctx.beginPath();
        if (point.glowing) {
          ctx.shadowBlur = 15;
          ctx.shadowColor = "#CCFF00";
          ctx.fillStyle = "#CCFF00";
        } else {
          ctx.shadowBlur = 0;
          ctx.fillStyle = "rgba(204, 255, 0, 0.5)";
        }
        ctx.arc(point.x, point.y, pointSize, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", setCanvasSize);
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
