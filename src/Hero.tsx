import { useLang } from "./LanguageContext";
import { t } from "./i18n";

export function Hero({ ping }: { ping: number | null }) {
  const { lang } = useLang();
  const isAr = lang === "ar";

  const connector = isAr ? "و" : lang === "es" ? "y" : lang === "ru" ? "и" : lang === "tr" ? "ve" : "and";

  const stats = [
    { k: t("hero_stats_devices", lang), v: "112", sub: t("hero_devices_sub", lang) },
    { k: t("hero_stats_weapons", lang), v: "67", sub: t("hero_weapons_sub", lang) },
    { k: t("hero_stats_servers", lang), v: "7", sub: t("hero_servers_sub", lang) },
  ];

  const pingVal = ping ?? null;
  const quality =
    pingVal === null ? t("hero_measuring", lang)
    : pingVal < 40 ? t("hero_excellent", lang)
    : pingVal < 80 ? t("hero_good", lang)
    : t("hero_medium", lang);
  const qualityColor =
    pingVal === null ? "text-white/50"
    : pingVal < 40 ? "text-emerald-300"
    : pingVal < 80 ? "text-amber-300"
    : "text-orange-300";

  return (
    <div className="relative grid items-center gap-8 py-10 lg:grid-cols-[1.2fr_0.8fr] lg:py-16">
      <div>
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-500/10 px-3 py-1">
          <span className="text-sm">🦅</span>
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-orange-400" />
          <span className="text-[10px] font-bold tracking-widest text-orange-300">{t("hero_badge", lang)}</span>
        </div>

        <h1 className="font-display text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
          <span className="shimmer-text">{t("hero_title1", lang)}</span>
          <br />
          <span className="text-white">{t("hero_title2", lang)}</span>
        </h1>

        <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/60 sm:text-base">
          {t("hero_desc", lang)} <span className="font-bold text-orange-300">{t("hero_devices", lang)}</span> {connector}{" "}
          <span className="font-bold text-orange-300">{t("hero_weapons", lang)}</span>.
        </p>

        <div className="mt-5 flex flex-wrap gap-3">
          <a href="#generator" className="btn-primary rounded-xl px-5 py-3 text-sm">{t("hero_cta1", lang)}</a>
          <a href="#pac" className="btn-ghost rounded-xl px-5 py-3 text-sm">{t("hero_cta2", lang)}</a>
        </div>

        <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs text-white/50">
          <span>{t("hero_tiktok", lang)} <span className="font-semibold text-white/80">@Saeedalyazouri0</span></span>
          <span>{t("hero_instagram", lang)} <span className="font-semibold text-white/80">@Saeedjor11</span></span>
          <span>{t("hero_pubg_id", lang)} <span className="font-semibold text-white/80">5744469523</span></span>
        </div>
      </div>

      {/* Live status card */}
      <div className="card neon-box float-slow rounded-3xl p-5">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg">{t("hero_network", lang)}</span>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-red-500/30 bg-red-500/10 px-2 py-0.5 text-[10px] font-bold tracking-widest text-red-300">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />
            {t("hero_live_status", lang)}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-white/8 bg-black/30 p-4 text-center">
            <div className="text-[10px] uppercase tracking-widest text-white/40">{t("hero_nearest", lang)}</div>
            <div className="mt-1 text-3xl">🇯🇴</div>
            <div className="mt-1 text-xs font-bold text-white">Jordan</div>
            <div className={`mt-1 text-[11px] font-bold ${qualityColor}`}>{quality}</div>
          </div>
          <div className="rounded-2xl border border-white/8 bg-black/30 p-4 text-center">
            <div className="text-[10px] uppercase tracking-widest text-white/40">{t("ping_ping", lang)}</div>
            <div className="mt-1 font-display text-4xl font-black text-orange-300 tabular-nums">
              {pingVal ?? "—"}
            </div>
            <div className="text-[11px] text-white/40">ms</div>
            <div className="mt-1 inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold text-emerald-300">
              ● {t("hero_connected", lang)}
            </div>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between rounded-xl border border-white/8 bg-black/20 p-3">
          <div>
            <div className="text-[10px] uppercase tracking-widest text-white/40">{t("hero_recruitment", lang)}</div>
            <div className="text-sm font-bold text-white">ALYAZOURI Squad</div>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-2.5 py-1 text-[10px] font-bold text-emerald-300">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            {t("hero_iss", lang)}
          </span>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3 lg:col-span-2">
        {stats.map((s) => (
          <div key={s.k} className="card rounded-2xl p-4 text-center">
            <div className="font-display text-3xl font-black text-orange-300 tabular-nums sm:text-4xl">{s.v}</div>
            <div className="mt-1 text-xs font-bold text-white">{s.k}</div>
            <div className="text-[10px] text-white/40">{s.sub}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
