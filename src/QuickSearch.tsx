import { useState, useMemo } from "react";
import { BRANDS, WEAPONS } from "./data";
import { useLang } from "./LanguageContext";

type Result = { type: "device" | "weapon"; id: string; name: string; sub: string; icon: string };

export function QuickSearch({ onSelect }: { onSelect: (r: Result) => void }) {
  const { lang } = useLang();
  const isAr = lang === "ar";
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);

  const results = useMemo(() => {
    const query = q.toLowerCase().trim();
    if (!query) return [];
    const out: Result[] = [];
    for (const b of BRANDS) {
      for (const dev of b.devices) {
        if (dev.name.toLowerCase().includes(query) || b.name.toLowerCase().includes(query)) {
          out.push({ type: "device", id: `${b.id}|${dev.name}`, name: dev.name, sub: `${dev.fps} FPS · ${dev.touchRate}Hz · ${dev.screenSize}"`, icon: b.icon });
        }
      }
    }
    for (const c of WEAPONS) {
      for (const w of c.weapons) {
        if (w.name.toLowerCase().includes(query)) {
          out.push({ type: "weapon", id: w.name, name: w.name, sub: `🔥 ${w.recoil} · 🎯 ${w.range}`, icon: c.icon });
        }
      }
    }
    return out.slice(0, 10);
  }, [q]);

  return (
    <div className="relative">
      <div className="card flex items-center gap-2 rounded-xl px-3 py-2">
        <span className="text-white/50">🔍</span>
        <input
          value={q}
          onChange={(e) => { setQ(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          placeholder={isAr ? "ابحث عن جهاز أو سلاح..." : "Search device or weapon..."}
          className="flex-1 bg-transparent text-sm text-white placeholder-white/30 focus:outline-none"
        />
        {q && (
          <button onClick={() => { setQ(""); setOpen(false); }} className="text-xs text-white/40 hover:text-white">✕</button>
        )}
      </div>
      {open && q && (
        <div className="absolute left-0 right-0 top-full z-40 mt-2 max-h-80 overflow-y-auto rounded-xl border border-white/10 bg-[#0a0a14]/95 shadow-2xl backdrop-blur-xl">
          {results.length === 0 ? (
            <div className="p-4 text-center text-sm text-white/40">
              {isAr ? "لا توجد نتائج" : "No results"}
            </div>
          ) : (
            results.map((r, i) => (
              <button
                key={i}
                onClick={() => { onSelect(r); setQ(""); setOpen(false); }}
                className="flex w-full items-center gap-3 border-b border-white/5 px-4 py-2.5 text-right transition-colors hover:bg-white/5"
              >
                <span className="text-xl">{r.icon}</span>
                <div className="flex-1 text-right">
                  <div className="text-sm font-semibold text-white">{r.name}</div>
                  <div className="text-[10px] text-white/50">{r.sub}</div>
                </div>
                <span className="text-[9px] uppercase tracking-widest text-orange-300">
                  {r.type === "device" ? "📱" : "🔫"}
                </span>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
