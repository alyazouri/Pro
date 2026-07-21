import { useEffect, useRef } from "react";

export function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;
    const W = window.innerWidth;
    const H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    const gold = ["#ffd166","#ffb347","#ff9a3c","#ffe08a","#ffcb6b","#ff7a00","#ffefc4"];
    type D = { x: number; y: number; r: number; vy: number; vx: number; a: number; t: number; c: string };
    const count = Math.min(60, Math.floor((W * H) / 28000));
    const dots: D[] = [];

    for (let i = 0; i < count; i++) {
      dots.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: 0.5 + Math.random() * 1.5,
        vy: -0.15 - Math.random() * 0.25,
        vx: (Math.random() - 0.5) * 0.15,
        a: 0.3 + Math.random() * 0.5,
        t: Math.random() * Math.PI * 2,
        c: gold[Math.floor(Math.random() * gold.length)],
      });
    }

    let raf: number;
    let f = 0;
    const loop = () => {
      f++;
      ctx.clearRect(0, 0, W, H);
      for (const d of dots) {
        d.y += d.vy;
        d.x += d.vx + Math.sin(d.t + f * 0.008) * 0.1;
        d.t += 0.014;
        if (d.y < -8) d.y = H + 8;
        if (d.x < -8) d.x = W + 8;
        if (d.x > W + 8) d.x = -8;
        ctx.globalAlpha = d.a * (0.5 + Math.abs(Math.sin(d.t)) * 0.5);
        ctx.fillStyle = d.c;
        ctx.shadowBlur = 6;
        ctx.shadowColor = d.c;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;
      raf = requestAnimationFrame(loop);
    };
    loop();

    const rs = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", rs);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", rs);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Golden Eagle SVG — majestic backdrop */}
      <svg
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.025]"
        style={{ width: "min(80vw,600px)", animation: "eagleFloat 8s ease-in-out infinite" }}
        viewBox="0 0 200 200" fill="currentColor"
      >
        <text x="100" y="130" textAnchor="middle" fontSize="140" fill="#ffd166">🦅</text>
      </svg>
      {/* Floating gold dust canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
