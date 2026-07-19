import { useState, useEffect, useMemo } from "react";
import { SERVERS } from "./data";
import { useLang } from "./LanguageContext";

interface NetworkMetrics {
  serverId: string;
  latency: number;
  stability: number;
  quality: "excellent" | "good" | "medium" | "poor";
}

export function NetworkHeatmap() {
  const { lang } = useLang();
  const isAr = lang === "ar";
  const [metrics, setMetrics] = useState<NetworkMetrics[]>([]);
  const [selectedServer, setSelectedServer] = useState<string | null>(null);

  useEffect(() => {
    // Simulate network metrics
    const generateMetrics = () => {
      return SERVERS.map((server) => {
        const baseLatency = server.base;
        const variance = (Math.random() - 0.5) * 30;
        const latency = Math.max(10, Math.round(baseLatency + variance));
        const stability = Math.max(60, Math.min(100, Math.round(100 - (latency / 3) + (Math.random() * 20))));
        const quality: "excellent" | "good" | "medium" | "poor" = 
          latency < 60 ? "excellent" : latency < 120 ? "good" : latency < 200 ? "medium" : "poor";
        
        return {
          serverId: server.id,
          latency,
          stability,
          quality,
        };
      });
    };

    setMetrics(generateMetrics());

    const interval = setInterval(() => {
      setMetrics(generateMetrics());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const bestServer = useMemo(() => {
    if (!metrics.length) return null;
    return metrics.reduce((best, current) => 
      current.latency < best.latency ? current : best
    );
  }, [metrics]);

  const getHeatColor = (latency: number) => {
    if (latency < 60) return "bg-emerald-500";
    if (latency < 120) return "bg-amber-500";
    if (latency < 200) return "bg-orange-500";
    return "bg-red-500";
  };

  const getHeatOpacity = (latency: number) => {
    const normalized = Math.min(1, latency / 300);
    return 0.3 + normalized * 0.7;
  };

  return (
    <div className="card neon-box rounded-2xl p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">🌐</span>
          <div>
            <div className="text-sm font-bold text-white">
              {isAr ? "خريطة حرارة الشبكة" : "Network Heatmap"}
            </div>
            <div className="text-[10px] text-white/40">
              {isAr ? "تحديث مباشر كل 5 ثواني" : "Live update every 5 seconds"}
            </div>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-300">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
          LIVE
        </span>
      </div>

      {/* World Map Visualization */}
      <div className="relative aspect-[2/1] rounded-xl border border-white/10 bg-gradient-to-b from-slate-900/50 to-slate-800/50 overflow-hidden mb-4">
        {/* Grid lines */}
        <div className="absolute inset-0 opacity-20">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={`h-${i}`}
              className="absolute left-0 right-0 h-px bg-white/20"
              style={{ top: `${(i + 1) * 16.66}%` }}
            />
          ))}
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={`v-${i}`}
              className="absolute top-0 bottom-0 w-px bg-white/20"
              style={{ left: `${(i + 1) * 10}%` }}
            />
          ))}
        </div>

        {/* Server nodes */}
        {SERVERS.map((server) => {
          const metric = metrics.find(m => m.serverId === server.id);
          const positions: Record<string, { x: number; y: number }> = {
            me: { x: 55, y: 45 },    // Middle East
            eu: { x: 48, y: 30 },    // Europe
            in: { x: 65, y: 50 },    // India
            as: { x: 78, y: 55 },    // Asia
            krjp: { x: 85, y: 35 },  // Korea/Japan
            na: { x: 20, y: 35 },    // North America
            sa: { x: 30, y: 70 },    // South America
          };
          const pos = positions[server.id] || { x: 50, y: 50 };
          const isSelected = selectedServer === server.id;
          const isBest = bestServer?.serverId === server.id;

          return (
            <button
              key={server.id}
              onClick={() => setSelectedServer(isSelected ? null : server.id)}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                isSelected ? "z-20 scale-150" : "z-10 hover:scale-125"
              }`}
              style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            >
              <div
                className={`relative h-4 w-4 rounded-full ${getHeatColor(metric?.latency || 999)} ${
                  isBest ? "ring-2 ring-white ring-offset-1 ring-offset-slate-900" : ""
                }`}
                style={{ opacity: getHeatOpacity(metric?.latency || 999) }}
              >
                {/* Pulse animation for best server */}
                {isBest && (
                  <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-75" />
                )}
              </div>
              
              {/* Tooltip */}
              {isSelected && metric && (
                <div className="absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-black/90 px-3 py-2 text-xs shadow-xl backdrop-blur-sm z-30">
                  <div className="font-bold text-white">{server.flag} {server.name}</div>
                  <div className="text-white/60">{server.city}</div>
                  <div className="mt-1 flex gap-3">
                    <span className="text-orange-300">{metric.latency}ms</span>
                    <span className="text-emerald-300">{metric.stability}%</span>
                  </div>
                </div>
              )}
            </button>
          );
        })}

        {/* Jordan Indicator */}
        <div className="absolute bottom-2 left-2 flex items-center gap-1.5 rounded-lg bg-black/50 px-2 py-1 backdrop-blur-sm">
          <span className="text-sm">🇯🇴</span>
          <span className="text-[10px] font-bold text-white">Jordan</span>
        </div>
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-4 text-[10px]">
        <div className="flex items-center gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
          <span className="text-white/50">{isAr ? "ممتاز" : "Excellent"} (&lt;60ms)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-amber-500" />
          <span className="text-white/50">{isAr ? "جيد" : "Good"} (&lt;120ms)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-orange-500" />
          <span className="text-white/50">{isAr ? "متوسط" : "Medium"} (&lt;200ms)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-red-500" />
          <span className="text-white/50">{isAr ? "ضعيف" : "Poor"} (&gt;200ms)</span>
        </div>
      </div>

      {/* Best Server Highlight */}
      {bestServer && (
        <div className="mt-4 rounded-xl border border-emerald-400/20 bg-emerald-500/5 p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg">{SERVERS.find(s => s.id === bestServer.serverId)?.flag}</span>
              <div>
                <div className="text-xs font-bold text-white">
                  {isAr ? "أفضل سيرفر" : "Best Server"}
                </div>
                <div className="text-[10px] text-white/50">
                  {SERVERS.find(s => s.id === bestServer.serverId)?.name}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-display text-lg font-bold text-emerald-300">{bestServer.latency}ms</div>
              <div className="text-[10px] text-white/40">{bestServer.stability}% {isAr ? "استقرار" : "stable"}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
