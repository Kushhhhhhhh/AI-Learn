"use client";

import { cn } from "@/lib/utils";
import React, { useCallback, useEffect, useRef, useState } from "react";

interface MousePosition {
  x: number;
  y: number;
}

const useMousePosition = (): MousePosition => {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return mousePosition;
};

interface ParticlesProps {
  className?: string;
  quantity?: number;
  staticity?: number;
  ease?: number;
  size?: number;
  refresh?: boolean;
  color?: string;
  vx?: number;
  vy?: number;
}

function hexToRgb(hex: string): number[] {
  hex = hex.replace("#", "");
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((char) => char + char)
      .join("");
  }
  const hexInt = parseInt(hex, 16);
  return [(hexInt >> 16) & 255, (hexInt >> 8) & 255, hexInt & 255];
}

type Circle = {
  x: number;
  y: number;
  translateX: number;
  translateY: number;
  size: number;
  alpha: number;
  targetAlpha: number;
  dx: number;
  dy: number;
  magnetism: number;
};

const Particles: React.FC<ParticlesProps> = ({
  className = "",
  quantity = 100,
  staticity = 50,
  ease = 50,
  size = 0.4,
  color = "#ffffff",
  vx = 0,
  vy = 0,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const context = useRef<CanvasRenderingContext2D | null>(null);
  const circles = useRef<Circle[]>([]);
  const mousePosition = useMousePosition();
  const mouse = useRef({ x: 0, y: 0 });
  const canvasSize = useRef({ w: 0, h: 0 });
  const dpr = typeof window !== "undefined" ? window.devicePixelRatio : 1;
  const rafID = useRef<number | null>(null);

  const rgb = hexToRgb(color);

  const initCanvas = useCallback(() => {
    if (!canvasRef.current || !containerRef.current) return;
    const canvas = canvasRef.current;
    const container = containerRef.current;

    canvasSize.current.w = container.offsetWidth;
    canvasSize.current.h = container.offsetHeight;

    canvas.width = canvasSize.current.w * dpr;
    canvas.height = canvasSize.current.h * dpr;
    canvas.style.width = `${canvasSize.current.w}px`;
    canvas.style.height = `${canvasSize.current.h}px`;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.scale(dpr, dpr);
      context.current = ctx;
    }

    circles.current = Array.from({ length: quantity }, () => createCircle());
    drawParticles();
  }, [quantity, dpr]);

  const createCircle = (): Circle => {
    const x = Math.random() * canvasSize.current.w;
    const y = Math.random() * canvasSize.current.h;
    const translateX = 0;
    const translateY = 0;
    const pSize = Math.random() * size + 1;
    const alpha = 0;
    const targetAlpha = Math.random() * 0.6 + 0.1;
    const dx = (Math.random() - 0.5) * 0.1;
    const dy = (Math.random() - 0.5) * 0.1;
    const magnetism = Math.random() * 4 + 0.1;
    return { x, y, translateX, translateY, size: pSize, alpha, targetAlpha, dx, dy, magnetism };
  };

  const drawCircle = (circle: Circle) => {
    if (!context.current) return;
    const { x, y, size, alpha } = circle;
    context.current.beginPath();
    context.current.arc(x, y, size, 0, Math.PI * 2);
    context.current.fillStyle = `rgba(${rgb.join(", ")}, ${alpha})`;
    context.current.fill();
  };

  const drawParticles = () => {
    if (!context.current) return;
    context.current.clearRect(0, 0, canvasSize.current.w, canvasSize.current.h);
    circles.current.forEach((circle) => {
      drawCircle(circle);
    });
  };

  const animate = useCallback(() => {
    if (!context.current) return;
    context.current.clearRect(0, 0, canvasSize.current.w, canvasSize.current.h);

    circles.current.forEach((circle) => {
      circle.x += circle.dx + vx;
      circle.y += circle.dy + vy;

      circle.translateX +=
        (mouse.current.x / (staticity / circle.magnetism) - circle.translateX) / ease;
      circle.translateY +=
        (mouse.current.y / (staticity / circle.magnetism) - circle.translateY) / ease;

      circle.alpha += (circle.targetAlpha - circle.alpha) * 0.05;

      drawCircle(circle);
    });

    rafID.current = requestAnimationFrame(animate);
  }, [ease, staticity, vx, vy]);

  useEffect(() => {
    initCanvas();
    animate();

    const handleResize = () => {
      initCanvas();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      if (rafID.current) cancelAnimationFrame(rafID.current);
      window.removeEventListener("resize", handleResize);
    };
  }, [initCanvas, animate]);

  useEffect(() => {
    mouse.current = { x: mousePosition.x, y: mousePosition.y };
  }, [mousePosition]);

  return (
    <div className={cn("pointer-events-none", className)} ref={containerRef} aria-hidden="true">
      <canvas ref={canvasRef} className="size-full" />
    </div>
  );
};

export default Particles;