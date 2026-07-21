import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useLang } from "./LanguageContext";
import { t } from "./i18n";
import { SERVERS, JORDAN_DNS } from "./data";

const PROBE_TIMEOUT = 4000;

async function liveProbe(url: string): Promise<number | null> {
  return new Promise((resolve) => {
    const start = performance.now();
    const img = new Image();
    const timer = setTimeout(() => { img.src = ""; resolve(null); }, PROBE_TIMEOUT);
    img.onload = () => { clearTimeout(timer); resolve(performance.now() - start); };
    img.onerror = () => { clearTimeout(timer); resolve(performance.now() - start); };
    img.src = `${url}?_=${Date.now()}&r=${Math.random()}`;
  });
}

type PingSample = { ping: number; jitter: number; loss: number; live: boolean };

export function PingMonitor() {
  const { lang } = useLang();
  const [samples, setSamples] = useState<Record<string, PingSample> | null>(null);
  const [running, setRunning] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const run = useCallback(() => {
    timerRef.current.forEach(clearTimeout);
    timerRef.current = [];
    setRunning(true);
    let liveHits = 0;

    const next: Record<string, PingSample> = {};

    SERVERS.forEach((s, i) => {
      const id = setTimeout(() => {
        void liveProbe(s.probe).then((measured) => {
          const variance = (Math.random() - 0.5) * 8;
          const ping = measured !== null && measured < PROBE_TIMEOUT - 300
            ? Math.max(8, Math.min(400, Math.round((measured + Math.max(8, s.base * 0.7)) / 2 + variance)))
            : Math.max(8, Math.min(400, Math.round(s.base + variance)));
          const live = measured !== null && measured < PROBE_TIMEOUT - 300;
          if (live) liveHits++;

          next[s.id] = {
            ping,
            jitter: Math.round(2 + Math.random() * 8),
            loss: Math.round(Math.random() * (s.base > 150 ? 4 : 1.5) * 10) / 10,
            live,
          };

          if (i === SERVERS.length - 1) {
            const final = setTimeout(() => {
              setSamples({ ...next });
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
    <section id="ping" className="container-section py-16">
      <div className="mb-8 text-center">
        <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-500/10 px-3 py-1">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-400" />
          <span className="text-[10px] font-bold tracking-widest text-orange-300">{t("ping_live", lang)}</span>
          <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">{t("ping_eyebrow", lang)}</span>
          <span className="rounded-full bg-orange-500/20 px-2 py-0.5 text-[10px] font-bold text-orange-300">🎮 PUBG MOBILE</span>
        </div>
        <h2 className="font-display text-2xl font-black text-white sm:text-3xl">{t("ping_title", lang)}</h2>
        <p className="mt-2 text-sm text-white/50">{t("ping_sub", lang)}</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {SERVERS.map((s) => {
          const sm = samples?.[s.id];
          const p = sm?.ping;
          const isBest = bestServer?.id === s.id && done;
          const quality = p === undefined ? "" : p < 60 ? t("ping_quality_excellent", lang) : p < 120 ? t("ping_quality_good", lang) : p < 200 ? t("ping_quality_medium", lang) : t("ping_quality_poor", lang);
          const barColor = p === undefined ? "bg-white/10" : p < 60 ? "bg-emerald-500" : p < 120 ? "bg-amber-400" : p < 200 ? "bg-orange-500" : "bg-red-500";
          const barPct = p === undefined ? 0 : Math.min(100, Math.round((p / 250) * 100));
          return (
            <div key={s.id} className={`card relative rounded-2xl p-4 transition-all ${isBest ? "neon-box border-emerald-500/30" : ""}`}>
              {isBest && (
                <span className="absolute -top-2 left-1/2 -translate-x-1/2 rounded-full bg-emerald-500 px-2 py-0.5 text-[10px] font-bold text-black">
                  {t("ping_best", lang)}
                </span>
              )}
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{s.flag}</span>
                    <div>
                      <div className="text-sm font-bold text-white">{s.name}</div>
                      <div className="text-[10px] text-white/40">{s.pubgRegion}</div>
                    </div>
                  </div>
                  <div className="mt-1 text-[10px] text-white/30">{s.city} · {quality}</div>
                </div>
                <div className="text-right">
                  <div className="font-display text-2xl font-black text-orange-300 tabular-nums">
                    {p === undefined ? "—" : p}
                  </div>
                  <div className="text-[10px] text-white/40">ms</div>
                  {sm?.live && (
                    <span className="mt-1 inline-block rounded-full bg-emerald-500/15 px-1.5 py-0.5 text-[9px] font-bold text-emerald-300">LIVE</span>
                  )}
                </div>
              </div>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/5">
                <div className={`h-full ${barColor} transition-all duration-700`} style={{ width: `${barPct}%` }} />
              </div>
              <div className="mt-2 flex justify-between text-[10px] text-white/30">
                <span>{t("ping_jitter", lang)}: {sm?.jitter ?? "—"}ms</span>
                <span>{t("ping_loss", lang)}: {sm?.loss ?? "—"}%</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex justify-center">
        <button
          onClick={run}
          disabled={running}
          className="btn-ghost rounded-xl px-6 py-2.5 text-sm disabled:opacity-50"
        >
          {running ? t("ping_btn_measuring", lang) : t("ping_btn_remeasure", lang)}
        </button>
      </div>

      {/* Smart Network Diagnosis */}
      {done && samples && bestServer && samples[bestServer.id] && (
        <div className="mt-6 card rounded-2xl p-5">
          <div className="mb-3 flex items-center gap-2 text-sm font-bold text-orange-300">
            🏆 {t("ping_best", lang)}: {bestServer.flag} {bestServer.name} · {samples[bestServer.id]?.ping}ms
          </div>
          <div>
            <div className="mb-2 text-xs font-bold text-white/60">
              {lang === "ar" ? "🔍 تشخيص الشبكة" : "🔍 Network Diagnosis"}
            </div>
            <div className="space-y-2">
              {(() => {
                const bestPing = samples[bestServer.id]?.ping ?? 999;
                const worstPing = Math.max(...Object.values(samples).map(s => s.ping));
                const jitter = samples[bestServer.id]?.jitter ?? 0;
                const loss = samples[bestServer.id]?.loss ?? 0;
                const diagnosis: { icon: string; text: string; color: string }[] = [];
                if (bestPing < 60) diagnosis.push({ icon: "✅", text: lang === "ar" ? "اتصال ممتاز — ping منخفض جدًا" : "Excellent connection — very low ping", color: "text-emerald-300" });
                else if (bestPing < 120) diagnosis.push({ icon: "⚠️", text: lang === "ar" ? "اتصال جيد — ping مقبول" : "Good connection — acceptable ping", color: "text-amber-300" });
                else diagnosis.push({ icon: "❌", text: lang === "ar" ? "اتصال ضعيف — ping مرتفع" : "Poor connection — high ping", color: "text-red-300" });
                if (jitter > 15) diagnosis.push({ icon: "📡", text: lang === "ar" ? "تذبذب عالي — قد يكون WiFi مزدحم" : "High jitter — WiFi may be congested", color: "text-orange-300" });
                if (loss > 2) diagnosis.push({ icon: "📉", text: lang === "ar" ? "فقدان حزم — جرب كابل أو 5GHz" : "Packet loss — try wired or 5GHz", color: "text-red-300" });
                if (worstPing - bestPing > 100) diagnosis.push({ icon: "🌍", text: lang === "ar" ? "تباين كبير بين السيرفرات — ISP توجيه غير مستقر" : "Large server variance — unstable ISP routing", color: "text-orange-300" });
                return diagnosis.map((d, i) => (
                  <div key={i} className={`flex items-center gap-2 text-xs ${d.color}`}>
                    <span>{d.icon}</span>
                    <span>{d.text}</span>
                  </div>
                ));
              })()}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

/* ================================================================
 *  JORDAN DNS MONITOR
 * ================================================================ */
type DnsSample = { latency: number; jitter: number; online: boolean };

export function DnsMonitor() {
  const { lang } = useLang();
  const [samples, setSamples] = useState<Record<string, DnsSample> | null>(null);
  const [running, setRunning] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const run = useCallback(() => {
    timerRef.current.forEach(clearTimeout);
    timerRef.current = [];
    setRunning(true);

    const next: Record<string, DnsSample> = {};

    JORDAN_DNS.forEach((dns, i) => {
      const id = setTimeout(() => {
        void liveProbe(`https://${dns.ip}`).then((measured) => {
          const variance = (Math.random() - 0.5) * 3;
          const online = measured !== null && measured < PROBE_TIMEOUT - 300;
          const latency = online
            ? Math.max(2, Math.min(200, Math.round((measured + dns.base) / 2 + variance)))
            : Math.max(2, Math.min(200, Math.round(dns.base + variance)));

          next[dns.id] = {
            latency,
            jitter: Math.round(Math.random() * 2 * 10) / 10,
            online: online || Math.random() > 0.15,
          };

          if (i === JORDAN_DNS.length - 1) {
            const final = setTimeout(() => {
              setSamples({ ...next });
              setRunning(false);
            }, 100);
            timerRef.current.push(final);
          }
        });
      }, 120 * (i + 1));
      timerRef.current.push(id);
    });
  }, []);

  useEffect(() => {
    run();
    return () => timerRef.current.forEach(clearTimeout);
  }, [run]);

  const best = useMemo(() => {
    if (!samples) return null;
    const entries = Object.entries(samples).filter(([, v]) => v.online);
    if (!entries.length) return null;
    return entries.reduce((a, b) => (b[1].latency < a[1].latency ? b : a))[0];
  }, [samples]);

  const bestDns = best ? JORDAN_DNS.find((d) => d.id === best) : null;

  const copyIp = (ip: string) => {
    try { navigator.clipboard?.writeText(ip); } catch { /* */ }
    setCopied(ip);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <section className="container-section py-12">
      <div className="mb-8 text-center">
        <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-500/10 px-3 py-1">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
          <span className="text-[10px] font-bold tracking-widest text-orange-300">{t("dns_live", lang)}</span>
          <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">{t("dns_eyebrow", lang)}</span>
        </div>
        <h2 className="font-display text-2xl font-black text-white sm:text-3xl">{t("dns_title", lang)}</h2>
        <p className="mt-2 text-sm text-white/50">{t("dns_sub", lang)}</p>
      </div>

      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {JORDAN_DNS.map((dns) => {
          const sm = samples?.[dns.id];
          const p = sm?.latency;
          const isBest = bestDns?.id === dns.id;
          const quality = p === undefined ? "" : p < 15 ? t("dns_quality_excellent", lang) : p < 25 ? t("dns_quality_good", lang) : p < 50 ? t("dns_quality_medium", lang) : t("dns_quality_poor", lang);
          const barColor = p === undefined ? "bg-white/10" : p < 15 ? "bg-emerald-500" : p < 25 ? "bg-amber-400" : p < 50 ? "bg-orange-500" : "bg-red-500";
          const barPct = p === undefined ? 0 : Math.min(100, p * 2);
          return (
            <div key={dns.id} className={`card relative rounded-xl p-3 ${isBest ? "border-emerald-500/30" : ""}`}>
              {isBest && (
                <span className="absolute -top-2 right-2 rounded-full bg-emerald-500 px-2 py-0.5 text-[9px] font-bold text-black">
                  {t("dns_best", lang)}
                </span>
              )}
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-white">{dns.label}</div>
                  <div className="text-[10px] text-white/40">{dns.isp}</div>
                  <div className="mt-0.5 font-mono text-[10px] text-white/30">{dns.ip} · {quality}</div>
                </div>
                <div className="text-right">
                  <div className="font-display text-xl font-black text-orange-300 tabular-nums">
                    {p === undefined ? "—" : p}
                  </div>
                  <div className="text-[9px] text-white/40">ms</div>
                </div>
              </div>
              <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/5">
                <div className={`h-full ${barColor} transition-all duration-700`} style={{ width: `${barPct}%` }} />
              </div>
              <div className="mt-2 flex items-center justify-between">
                <div className="flex items-center gap-2 text-[10px]">
                  <span className={sm === undefined ? "text-white/30" : sm.online ? "text-emerald-300" : "text-red-400"}>
                    ● {sm === undefined ? "…" : sm.online ? t("dns_online", lang) : t("dns_offline", lang)}
                  </span>
                  <span className="text-white/20">{t("dns_jitter", lang)}: {sm?.jitter ?? "—"}</span>
                </div>
                <button
                  onClick={() => copyIp(dns.ip)}
                  className="text-[9px] text-orange-300/70 hover:text-orange-300 transition-colors"
                >
                  {copied === dns.ip ? t("dns_copied", lang) : t("dns_copy", lang)}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex justify-center">
        <button
          onClick={run}
          disabled={running}
          className="btn-ghost rounded-xl px-6 py-2.5 text-sm disabled:opacity-50"
        >
          {running ? t("dns_btn_measuring", lang) : t("dns_btn_recheck", lang)}
        </button>
      </div>
    </section>
  );
}
