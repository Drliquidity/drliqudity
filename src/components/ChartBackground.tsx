import { useEffect, useRef } from 'react';

interface Point {
  x: number;
  y: number;
}

export default function ChartBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrame: number;
    let offset = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const generateLine = (seed: number, amplitude: number, frequency: number): Point[] => {
      const points: Point[] = [];
      const w = canvas.width;
      const h = canvas.height;
      const midY = h * 0.5;

      for (let x = -50; x <= w + 50; x += 3) {
        const noise =
          Math.sin((x + offset * 0.5 + seed) * frequency) * amplitude +
          Math.sin((x + offset * 0.3 + seed * 2) * frequency * 1.7) * amplitude * 0.5 +
          Math.sin((x + offset * 0.8 + seed * 3) * frequency * 0.4) * amplitude * 1.5;
        points.push({ x, y: midY + noise });
      }
      return points;
    };

    const drawLine = (points: Point[], color: string, lineWidth: number, alpha: number) => {
      if (points.length < 2) return;
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i++) {
        const cpX = (points[i - 1].x + points[i].x) / 2;
        const cpY = (points[i - 1].y + points[i].y) / 2;
        ctx.quadraticCurveTo(points[i - 1].x, points[i - 1].y, cpX, cpY);
      }
      ctx.stroke();
      ctx.restore();
    };

    const drawGradientArea = (points: Point[], color: string) => {
      if (points.length < 2) return;
      ctx.save();
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, color.replace(')', ', 0.12)').replace('rgb', 'rgba'));
      gradient.addColorStop(1, color.replace(')', ', 0)').replace('rgb', 'rgba'));
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.moveTo(points[0].x, canvas.height);
      ctx.lineTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i++) {
        const cpX = (points[i - 1].x + points[i].x) / 2;
        const cpY = (points[i - 1].y + points[i].y) / 2;
        ctx.quadraticCurveTo(points[i - 1].x, points[i - 1].y, cpX, cpY);
      }
      ctx.lineTo(points[points.length - 1].x, canvas.height);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    const drawGrid = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.save();
      ctx.strokeStyle = 'rgba(34, 197, 94, 0.04)';
      ctx.lineWidth = 1;

      for (let x = 0; x < w; x += 80) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += 60) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }
      ctx.restore();
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawGrid();

      const line1 = generateLine(0, canvas.height * 0.12, 0.008);
      const line2 = generateLine(100, canvas.height * 0.08, 0.012);
      const line3 = generateLine(200, canvas.height * 0.06, 0.006);

      drawGradientArea(line1, 'rgb(34, 197, 94)');
      drawLine(line3, 'rgba(15, 81, 50, 0.4)', 1, 0.5);
      drawLine(line2, 'rgba(34, 197, 94, 0.3)', 1.5, 0.6);
      drawLine(line1, 'rgba(34, 197, 94, 0.7)', 2, 0.8);

      offset += 0.4;
      animFrame = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize);
    draw();

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-40"
      style={{ display: 'block' }}
    />
  );
}
