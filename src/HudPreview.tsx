import { useLang } from "./LanguageContext";

interface HudPreviewProps {
  fingers: number;
}

export function HudPreview({ fingers }: HudPreviewProps) {
  const { lang } = useLang();
  const isAr = lang === "ar";

  // HUD layout based on finger count
  const layouts: Record<number, { name: string; elements: string[] }> = {
    2: {
      name: isAr ? "تخطيط إبهامين" : "Two Thumbs Layout",
      elements: ["fire-right", "move-left", "aim-center"]
    },
    3: {
      name: isAr ? "تخطيط 3 أصابع" : "3 Finger Layout",
      elements: ["fire-right", "move-left", "aim-center", "scope-top"]
    },
    4: {
      name: isAr ? "تخطيط 4 أصابع (كلو)" : "4 Finger (Claw) Layout",
      elements: ["fire-right", "fire-left", "move-left", "aim-center", "scope-top", "lean-top"]
    },
    5: {
      name: isAr ? "تخطيط 5 أصابع" : "5 Finger Layout",
      elements: ["fire-right", "fire-left", "move-left", "aim-center", "scope-top", "lean-top", "prone-top"]
    },
    6: {
      name: isAr ? "تخطيط 6 أصابع (محترف)" : "6 Finger (Pro) Layout",
      elements: ["fire-right", "fire-left", "move-left", "aim-center", "scope-top", "lean-top", "prone-top", "jump-top"]
    }
  };

  const layout = layouts[fingers] || layouts[4];

  return (
    <div className="card rounded-2xl p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <div className="text-sm font-bold text-white">{isAr ? "معاينة HUD" : "HUD Preview"}</div>
          <div className="text-[10px] text-white/50">{layout.name}</div>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-orange-500/20 px-2 py-0.5 text-[10px] font-bold text-orange-300">
            {fingers}F
          </span>
        </div>
      </div>

      {/* Mini HUD Preview */}
      <div className="relative aspect-video rounded-xl border border-white/10 bg-gradient-to-b from-gray-900 to-black overflow-hidden">
        {/* Game Area Simulation */}
        <div className="absolute inset-0 bg-gradient-to-b from-sky-900/20 to-green-900/20" />
        
        {/* Crosshair */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="flex items-center justify-center">
            <div className="h-6 w-px bg-red-500/80" />
          </div>
          <div className="flex items-center justify-center -mt-3">
            <div className="h-px w-6 bg-red-500/80" />
          </div>
        </div>

        {/* HUD Elements */}
        {/* Fire Button - Right */}
        <div className="absolute bottom-4 right-4 h-12 w-12 rounded-full border-2 border-red-500/60 bg-red-500/20 flex items-center justify-center">
          <span className="text-lg">🔫</span>
        </div>

        {/* Movement Joystick - Left */}
        <div className="absolute bottom-4 left-4 h-14 w-14 rounded-full border-2 border-white/30 bg-white/10 flex items-center justify-center">
          <div className="h-8 w-8 rounded-full bg-white/20" />
        </div>

        {/* Health/Armor - Top Left */}
        <div className="absolute top-2 left-2 flex gap-1">
          <div className="h-2 w-16 rounded-full bg-gradient-to-r from-green-500 to-green-400" />
        </div>

        {/* Kill/Alive Count - Top Right */}
        <div className="absolute top-2 right-2 flex gap-2 text-[8px]">
          <span className="text-white/60">{isAr ? "أحياء" : "Alive"}: 47</span>
          <span className="text-orange-300">{isAr ? "قتل" : "Kills"}: 3</span>
        </div>

        {/* Mini Map - Top Left Corner */}
        <div className="absolute top-6 left-2 h-12 w-12 rounded-lg border border-white/20 bg-white/5" />

        {/* Weapon Slot - Bottom */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1">
          <div className="h-8 w-8 rounded-lg border border-orange-400/50 bg-orange-500/10 flex items-center justify-center text-[10px]">
            🔫
          </div>
          <div className="h-8 w-8 rounded-lg border border-white/20 bg-white/5 flex items-center justify-center text-[10px]">
            🔭
          </div>
        </div>

        {/* Scope Button - Top Right Area (for 3+ fingers) */}
        {fingers >= 3 && (
          <div className="absolute top-12 right-4 h-8 w-8 rounded-full border border-amber-400/50 bg-amber-500/10 flex items-center justify-center">
            <span className="text-xs">🎯</span>
          </div>
        )}

        {/* Additional Fire Button - Left (for 4+ fingers) */}
        {fingers >= 4 && (
          <div className="absolute bottom-20 left-4 h-10 w-10 rounded-full border-2 border-red-500/40 bg-red-500/10 flex items-center justify-center">
            <span className="text-sm">🔥</span>
          </div>
        )}

        {/* Lean Buttons - Top (for 4+ fingers) */}
        {fingers >= 4 && (
          <div className="absolute top-12 left-1/2 -translate-x-1/2 flex gap-4">
            <div className="h-6 w-6 rounded border border-white/30 bg-white/10 flex items-center justify-center text-[8px]">
              ↶
            </div>
            <div className="h-6 w-6 rounded border border-white/30 bg-white/10 flex items-center justify-center text-[8px]">
              ↷
            </div>
          </div>
        )}

        {/* Prone/Jump for 5+ fingers */}
        {fingers >= 5 && (
          <>
            <div className="absolute top-20 right-16 h-6 w-6 rounded border border-sky-400/50 bg-sky-500/10 flex items-center justify-center text-[8px]">
              ⬇
            </div>
          </>
        )}

        {fingers >= 6 && (
          <div className="absolute top-20 left-16 h-6 w-6 rounded border border-emerald-400/50 bg-emerald-500/10 flex items-center justify-center text-[8px]">
            ⬆
          </div>
        )}

        {/* Finger indicators */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-1 pb-1">
          {Array.from({ length: fingers }).map((_, i) => (
            <div
              key={i}
              className="h-1.5 w-1.5 rounded-full bg-orange-400"
            />
          ))}
        </div>
      </div>

      <div className="mt-3 text-center text-[10px] text-white/40">
        {isAr
          ? `تخطيط مُحسّن لـ ${fingers} أصابع • ${layout.elements.length} عناصر نشطة`
          : `Optimized layout for ${fingers} fingers • ${layout.elements.length} active elements`}
      </div>
    </div>
  );
}
