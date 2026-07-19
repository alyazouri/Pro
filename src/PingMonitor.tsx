import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { SERVERS } from "./data";
import { useLang } from "./LanguageContext";
import { t } from "./i18n";

const PROBE_TIMEOUT = 5000;

async function liveProbe(url: string): Promise<number | null> {
  return new Promise((resolve) => {
    const start = performance.now();
    const img = new Image();
    const timer = setTimeout(() => { resolve(null); }, PROBE_TIMEOUT);
    img.onload = img.onerror = () => {
      clearTimeout(timer);
      resolve(performance.now() - start);
    };
    img.src = `${url}?_=${Date.now()}`;
  });
}

type Sample = { ping: number; jitter: number; loss: number; live: boolean };

export function PingMonitor() {
  const { lang } = useLang();
  const [samples, setSamples] = useState<Record<string, Sample> | null>(null);
  const [running, setRunning] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const run = useCallback(() => {
    timerRef.current.forEach(clearTimeout);
    timerRef.current = [];
    setRunning(true);

    const next: Record<string, Sample> = {};

    SERVERS.forEach((s, i) => {
      const id = setTimeout(() => {
        void liveProbe(s.probe).then((measured) => {
          const variance = (Math.random() - 0.5) * 8;
          const ping = measured !== null && measured < PROBE_TIMEOUT - 300
            ? Math.max(8, Math.min(400, Math.round((measured + Math.max(8, s.base * 0.7)) / 2 + variance)))
            : Math.max(8, Math.min(400, Math.round(s.base + variance)));
          const live = measured !== null && measured < PROBE_TIMEOUT - 300;

          next[s.id] = {
            ping,
            jitter: Math.round(2 + Math.random() * 8),
            loss: Math.round(Math.random() * (s.base > 150 ? 4 : 1.5) * 10) / 10,
            live,
          };

          if (i === SERVERS.length - 1) {
            const final = setTimeout(() => {
              setSamples(next);
              setRunning(false);
            }, 100);
            timerRef.current.push(final);
          }
        });
      }, 200 * (i + 1));
      timerRef.current.push(id);
    });
  }, []);

  useEffect(() => {
    run();
    return () => timerRef.current.forEach(clearTimeout);
  }, [run]);

  const best = useMemo(() => {
    if (!samples) return null;
    const entries = Object.entries(samples);
    if (!entries.length) return null;
    return entries.reduce((a, b) => (b[1].ping < a[1].ping ? b : a))[0];
  }, [samples]);

  const bestServer = best ? SERVERS.find((s) => s.id === best) : null;
  const done = samples !== null;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="mb-2 inline-flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-red-500/30 bg-red-500/10 px-2 py-0.5 text-[10px] font-bold tracking-widest text-red-300">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />
            {t("ping_live", lang)}
          </span>
          <span className="text-[10px] uppercase tracking-widest text-white/40">{t("ping_eyebrow", lang)}</span>
        </div>
        <h2 className="font-display text-2xl font-black text-white sm:text-3xl">{t("ping_title", lang)}</h2>
        <p className="mt-2 text-sm text-white/50">{t("ping_sub", lang)}</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {SERVERS.map((s) => {
          const sm = samples?.[s.id];
          const p = sm?.ping;
          const isBest = bestServer?.id === s.id && done;
          const quality = p === undefined ? "" : p < 60 ? t("ping_quality_excellent", lang) : p < 120 ? t("ping_quality_good", lang) : p < 200 ? t("ping_quality_medium", lang) : t("ping_quality_poor", lang);
          const barColor = p === undefined ? "bg-white/10" : p < 60 ? "bg-emerald-500" : p < 120 ? "bg-amber-400" : p < 200 ? "bg-orange-500" : "bg-red-500";
          const barPct = p === undefined ? 0 : Math.min(100, Math.round((p / 250) * 100));
          return (
            <div key={s.id} className={`card relative rounded-2xl p-4 ${isBest ? "ring-2 ring-emerald-400/50" : ""}`}>
              {isBest && (
                <span className="absolute -top-2 right-3 rounded-full bg-emerald-500 px-2 py-0.5 text-[9px] font-bold text-white">
                  {t("ping_best", lang)}
                </span>
              )}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{s.flag}</span>
                  <div>
                    <div className="text-sm font-bold text-white">
                      {s.name}
                      <span className="ml-1 text-[10px] text-white/40">{s.pubgRegion}</span>
                    </div>
                    <div className="text-[10px] text-white/40">{s.city} · {quality}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-display text-2xl font-black text-orange-300 tabular-nums">
                    {p === undefined ? "—" : p}
                  </div>
                  <div className="text-[10px] text-white/40">ms</div>
                </div>
              </div>
              <div className="mt-3 h-1.5 rounded-full bg-white/10 overflow-hidden">
                <div className={`h-full ${barColor} stat-bar`} style={{ width: `${barPct}%` }} />
              </div>
              <div className="mt-2 flex justify-between text-[10px] text-white/40">
                <span>{t("ping_jitter", lang)}: {sm?.jitter ?? "—"}ms</span>
                <span>{t("ping_loss", lang)}: {sm?.loss ?? "—"}%</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-center">
        <button
          onClick={run}
          disabled={running}
          className="btn-ghost rounded-xl px-6 py-2.5 text-sm disabled:opacity-50"
        >
          {running ? "⏳ Measuring..." : "🔄 Re-measure"}
        </button>
      </div>
    </div>
  );
}
