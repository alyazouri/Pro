import { useLang } from "./LanguageContext";
import { t } from "./i18n";

export function HudPreview({ fingers }: { fingers: number }) {
  const { lang } = useLang();

  const fingerLayouts: Record<number, { positions: { top: string; left?: string; right?: string; label: string }[] }> = {
    2: {
      positions: [
        { top: "70%", left: "10%", label: "L" },
        { top: "70%", right: "10%", label: "R" },
      ],
    },
    3: {
      positions: [
        { top: "70%", left: "10%", label: "L" },
        { top: "50%", left: "50%", label: "M" },
        { top: "70%", right: "10%", label: "R" },
      ],
    },
    4: {
      positions: [
        { top: "60%", left: "8%", label: "L1" },
        { top: "80%", left: "18%", label: "L2" },
        { top: "80%", right: "18%", label: "R1" },
        { top: "60%", right: "8%", label: "R2" },
      ],
    },
    5: {
      positions: [
        { top: "55%", left: "6%", label: "L1" },
        { top: "75%", left: "16%", label: "L2" },
        { top: "40%", left: "46%", label: "M" },
        { top: "75%", right: "16%", label: "R1" },
        { top: "55%", right: "6%", label: "R2" },
      ],
    },
    6: {
      positions: [
        { top: "50%", left: "4%", label: "L1" },
        { top: "68%", left: "12%", label: "L2" },
        { top: "80%", left: "26%", label: "L3" },
        { top: "80%", right: "26%", label: "R1" },
        { top: "68%", right: "12%", label: "R2" },
        { top: "50%", right: "4%", label: "R3" },
      ],
    },
  };

  const layout = fingerLayouts[fingers] ?? fingerLayouts[4];

  return (
    <div className="card rounded-2xl overflow-hidden">
      <div className="flex items-center gap-2 border-b border-white/8 px-4 py-3">
        <span className="text-sm">📱</span>
        <span className="font-display text-sm font-bold text-orange-300">{t("hud_title", lang)}</span>
        <span className="ml-auto rounded-full bg-orange-500/20 px-2 py-0.5 text-[10px] font-bold text-orange-300">{fingers}F</span>
      </div>
      <div className="relative mx-auto h-48 w-full max-w-sm overflow-hidden rounded-b-2xl bg-gradient-to-b from-slate-900 to-black">
        {/* Fake game HUD */}
        <div className="absolute inset-0 bg-grid opacity-10" />

        {/* Top bar */}
        <div className="absolute left-0 right-0 top-2 flex items-center justify-between px-4 text-[9px] text-white/60">
          <span>🟢 {Math.floor(Math.random() * 80 + 20)} {t("hud_alive", lang)}</span>
          <span className="font-display text-[11px] font-bold text-orange-300">ALYAZOURI</span>
          <span>🏆 {Math.floor(Math.random() * 5)} {t("hud_kills", lang)}</span>
        </div>

        {/* Crosshair */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="relative h-6 w-6">
            <div className="absolute left-1/2 top-0 h-2 w-px -translate-x-1/2 bg-white/60" />
            <div className="absolute bottom-0 left-1/2 h-2 w-px -translate-x-1/2 bg-white/60" />
            <div className="absolute left-0 top-1/2 h-px w-2 -translate-y-1/2 bg-white/60" />
            <div className="absolute right-0 top-1/2 h-px w-2 -translate-y-1/2 bg-white/60" />
          </div>
        </div>

        {/* Finger touch points */}
        {layout.positions.map((pos, i) => (
          <div
            key={i}
            className="absolute flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-orange-400/60 bg-orange-500/20 text-[9px] font-bold text-orange-300"
            style={{
              top: pos.top,
              left: pos.left,
              right: pos.right,
              transform: pos.left ? "translateX(-50%) translateY(-50%)" : "translateX(50%) translateY(-50%)",
            }}
          >
            {pos.label}
          </div>
        ))}

        {/* Bottom info */}
        <div className="absolute bottom-2 left-0 right-0 text-center">
          <span className="text-[9px] text-white/30">{fingers}F {t("hud_active", lang)}</span>
        </div>
      </div>
    </div>
  );
}
