import { useState, useEffect, useMemo } from "react";
import { useLang } from "./LanguageContext";
import { t } from "./i18n";
import {
  BRANDS, WEAPONS, FINGERS, PRO_PROFILES, PRO_RECOMMENDATIONS,
  type Device,
} from "./data";
import {
  computeSensitivity, SensTable, FactorsCard,
  findClosestPros,
  type SensParams, type GyroMode,
} from "./sensitivity";
import { Hero } from "./Hero";
import { StatusBar } from "./StatusBar";
import { Particles } from "./Particles";
import { PingMonitor, DnsMonitor } from "./PingMonitor";
import { PacSection } from "./PacSection";
import { QuickSearch } from "./QuickSearch";
import { HudPreview } from "./HudPreview";
import { MusicPlayer } from "./MusicPlayer";
import { PWABanner } from "./PWABanner";
import { ScreenRecorder } from "./ScreenRecorder";
import { RevealSection, RatingSection, AIPredictions, AICoach } from "./Features";

const PROFILES_KEY = "alyazouri_profiles_v1";
const SERVERS = [{ probe: "https://www.ae/favicon.ico", base: 50 }];

type SavedProfile = {
  id: string; name: string; savedAt: number; params: SensParams;
};

type GyroModeOption = { id: GyroMode; labelKey: string; descKey: string };

const gyroModes: GyroModeOption[] = [
  { id: "off",    labelKey: "gyro_off",    descKey: "gyro_off_desc" },
  { id: "scope",  labelKey: "gyro_scope",  descKey: "gyro_scope_desc" },
  { id: "always", labelKey: "gyro_always", descKey: "gyro_always_desc" },
];

const playStyles = [
  { id: "balanced",    label: "⚖️ Balanced",      labelAr: "⚖️ متوازن" },
  { id: "aggressive",  label: "⚡ Aggressive",     labelAr: "⚡ عدواني" },
  { id: "headshot",    label: "🎯 Headshot",       labelAr: "🎯 هيدشوت" },
  { id: "spray",       label: "💧 Spray Master",   labelAr: "💧 ملك الرش" },
  { id: "competitive", label: "🏆 Competitive",    labelAr: "🏆 تنافسي" },
  { id: "close",       label: "🔥 Close Range",    labelAr: "🔥 قريب" },
  { id: "sniper",      label: "🔭 Sniper",         labelAr: "🔭 قنّاص" },
  { id: "elite",       label: "💎 ELITE",          labelAr: "💎 إليت" },
  { id: "max",         label: "⚡ MAX POWER",      labelAr: "⚡ ماكس باور" },
];

export default function App() {
  const { lang } = useLang();
  const isAr = lang === "ar";

  const [ping, setPing] = useState<number | null>(null);
  const [brandId, setBrandId] = useState(BRANDS[0].id);
  const [device, setDevice] = useState<Device>(BRANDS[0].devices[0]);
  const [gyroMode, setGyroMode] = useState<GyroMode>("scope");
  const [proProfile, setProProfile] = useState(PRO_PROFILES[0].id);
  const [fingers, setFingers] = useState(4);
  const [styleId, setStyleId] = useState("balanced");
  const [weaponCatId, setWeaponCatId] = useState(WEAPONS[0].id);
  const [weapon, setWeapon] = useState(WEAPONS[0].weapons[0]);
  const [copied, setCopied] = useState(false);

  const [profiles, setProfiles] = useState<SavedProfile[]>(() => {
    try { return JSON.parse(localStorage.getItem(PROFILES_KEY) || "[]"); } catch { return []; }
  });

  // Live ping on mount
  useEffect(() => {
    let done = false;
    const start = performance.now();
    const img = new Image();
    const finish = (v: number) => { if (!done) { done = true; setPing(v); } };
    const timer = setTimeout(() => finish(50), 3000);
    img.onload = () => { clearTimeout(timer); finish(Math.max(8, Math.round(performance.now() - start))); };
    img.onerror = () => {
      clearTimeout(timer);
      const ms = performance.now() - start;
      finish(ms < 2800 ? Math.max(8, Math.round(ms)) : 50);
    };
    img.src = `${SERVERS[0].probe}?_=${Date.now()}`;
  }, []);

  const sens = useMemo(() => computeSensitivity({
    deviceId: `${brandId}|${device.name}`,
    device, brandId,
    fingers, styleId, gyroMode,
    weaponId: weapon.name,
    weaponName: weapon.name,
    weaponRecoil: weapon.recoil,
    weaponRange: weapon.range,
    weaponType: weapon.type,
    proProfile,
  }), [device, fingers, styleId, gyroMode, weapon, proProfile, brandId]);

  const aiScore = sens.aiScore;

  const gyroLabel = device.gyroQuality === "excellent" ? t("device_gyro_excellent", lang)
    : device.gyroQuality === "good" ? t("device_gyro_good", lang) : t("device_gyro_average", lang);

  const currentBrand = BRANDS.find((b) => b.id === brandId) ?? BRANDS[0];
  const currentWeaponCat = WEAPONS.find((c) => c.id === weaponCatId) ?? WEAPONS[0];

  const onSearch = (r: { type: "device" | "weapon"; id: string; name: string }) => {
    if (r.type === "device") {
      const [bid, devName] = r.id.split("|");
      const b = BRANDS.find((x) => x.id === bid);
      const dev = b?.devices.find((d) => d.name === devName);
      if (b && dev) { setBrandId(b.id); setDevice(dev); }
    } else {
      for (const c of WEAPONS) {
        const w = c.weapons.find((x) => x.name === r.name);
        if (w) { setWeaponCatId(c.id); setWeapon(w); break; }
      }
    }
  };

  const handleSave = () => {
    const profile: SavedProfile = {
      id: (crypto as Crypto & { randomUUID?: () => string }).randomUUID?.() ?? String(Date.now()),
      name: `${device.name} · ${weapon.name}`,
      savedAt: Date.now(),
      params: {
        deviceId: `${brandId}|${device.name}`,
        device, brandId,
        fingers, styleId, gyroMode,
        weaponId: weapon.name,
        weaponName: weapon.name,
        weaponRecoil: weapon.recoil,
        weaponRange: weapon.range,
        weaponType: weapon.type,
        proProfile,
      },
    };
    const next = [profile, ...profiles].slice(0, 5);
    setProfiles(next);
    try { localStorage.setItem(PROFILES_KEY, JSON.stringify(next)); } catch { /* ignore */ }
  };

  const handleCopy = () => {
    const text = [
      `🎯 ALYAZOURI 2026 — ${device.name} · ${weapon.name}`,
      `📷 Camera No-Scope: ${sens.cam.noScope}% | Red Dot: ${sens.cam.red}% | 4×: ${sens.cam.scope4}%`,
      `🎯 ADS No-Scope: ${sens.ads.noScope}% | Red Dot: ${sens.ads.red}%`,
      `🏆 AI Score: ${aiScore}/100`,
    ].join("\n");
    try { navigator.clipboard?.writeText(text); } catch { /* ignore */ }
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleAutoTune = () => {
    const ids = PRO_PROFILES.map((p) => p.id);
    const pick = ids[Math.floor(Math.random() * ids.length)];
    const rec = PRO_RECOMMENDATIONS[pick];
    setProProfile(pick);
    setGyroMode(rec.gyro);
    setFingers(Math.max(FINGERS[0], Math.min(6, rec.minFingers)));
    setStyleId(pick);
  };

  const equations = [
    { k: "σ", label: t("eq_rs", lang), eq: "σ(m) = 135 · D · F · S · μ · m⁻⁰·⁵⁵ · recoilAdj" },
    { k: "γ", label: t("eq_gy", lang), eq: "γ(m) = σ(m) · 2.2 · Gq · gyroBoost" },
    { k: "Wₖ", label: t("eq_hd", lang), eq: "Wₖ = recoilComp · recovery · range" },
    { k: "AI", label: t("ai_score_title", lang), eq: "AI = .3D + .2W + .2F + .15S + .15Gq" },
  ];

  return (
    <div id="top" className="relative min-h-screen">
      <Particles />
      <StatusBar ping={ping} />
      <MusicPlayer />

      <main className="relative z-10 pt-14">
        {/* ==================== HERO ==================== */}
        <section className="container-section">
          <Hero ping={ping} />
        </section>

        <div className="divider" />

        {/* ==================== GENERATOR ==================== */}
        <section id="generator" className="container-section py-16">
          <RevealSection>
            <div className="mb-8 text-center">
              <div className="mb-2 text-[10px] font-bold uppercase tracking-widest text-orange-300">{t("sec_generator_eyebrow", lang)}</div>
              <h2 className="font-display text-3xl font-black text-white sm:text-4xl">{t("sec_generator_title", lang)}</h2>
              <p className="mt-2 text-sm text-white/50">{t("sec_generator_sub", lang)}</p>
            </div>
          </RevealSection>

          <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
            {/* ---------- CONTROLS ---------- */}
            <div className="space-y-5">

              {/* Quick Search */}
              <QuickSearch onSelect={onSearch} />

              {/* Device */}
              <RevealSection>
                <div className="card rounded-2xl p-5">
                  <div className="mb-3 flex items-center gap-2">
                    <span className="text-orange-300">📱</span>
                    <span className="font-display text-sm font-bold text-white">{t("device_select", lang)}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {BRANDS.map((b) => (
                      <button
                        key={b.id}
                        onClick={() => { setBrandId(b.id); setDevice(b.devices[0]); }}
                        className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold transition-all ${
                          brandId === b.id ? "border-orange-400/40 bg-orange-500/15 text-orange-300" : "border-white/8 bg-white/3 text-white/60 hover:border-orange-400/20"
                        }`}
                      >
                        <span>{b.icon}</span><span className="truncate">{b.name}</span>
                      </button>
                    ))}
                  </div>
                  <select
                    value={device.name}
                    onChange={(e) => { const dev = currentBrand.devices.find(d => d.name === e.target.value); if (dev) setDevice(dev); }}
                    className="mt-3 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white focus:border-orange-400/40 focus:outline-none"
                  >
                    {currentBrand.devices.map((dev) => (
                      <option key={dev.name} value={dev.name}>{dev.name}</option>
                    ))}
                  </select>
                  <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                    <span className="text-white/40">{t("device_selected", lang)}</span>
                    <span className="font-bold text-white">{device.name}</span>
                    <span className="rounded-lg bg-white/5 px-2 py-0.5 text-white/50">⚡ {device.fps} FPS</span>
                    <span className="rounded-lg bg-white/5 px-2 py-0.5 text-white/50">👆 {device.touchRate} Hz</span>
                    <span className="rounded-lg bg-white/5 px-2 py-0.5 text-white/50">📐 {device.screenSize}"</span>
                    <span className="rounded-lg bg-emerald-500/10 px-2 py-0.5 text-emerald-300">🌀 {gyroLabel}</span>
                  </div>
                </div>
              </RevealSection>

              {/* Gyro Mode */}
              <RevealSection delay={1}>
                <div className="card rounded-2xl p-5">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="font-display text-sm font-bold text-white">{t("gyro_title", lang)}</span>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                      gyroMode === "off" ? "bg-white/10 text-white/50" : gyroMode === "scope" ? "bg-amber-500/20 text-amber-300" : "bg-emerald-500/20 text-emerald-300"
                    }`}>
                      {gyroMode === "off" ? t("gyro_status_off", lang) : gyroMode === "scope" ? t("gyro_status_scope", lang) : t("gyro_status_always", lang)}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {gyroModes.map((m) => (
                      <button
                        key={m.id}
                        onClick={() => setGyroMode(m.id)}
                        className={`rounded-xl border px-2 py-2.5 text-xs font-semibold transition-all ${
                          gyroMode === m.id ? "border-orange-400/40 bg-orange-500/15 text-orange-300" : "border-white/8 text-white/50 hover:border-orange-400/20"
                        }`}
                      >
                        {t(m.labelKey as never, lang)}
                      </button>
                    ))}
                  </div>
                  <div className="mt-3 text-xs text-white/40">
                    {gyroMode === "off" && t("gyro_msg_off", lang)}
                    {gyroMode === "scope" && t("gyro_msg_scope", lang)}
                    {gyroMode === "always" && t("gyro_msg_always", lang)}
                  </div>
                </div>
              </RevealSection>

              {/* Pro Profile */}
              <RevealSection delay={2}>
                <div className="card rounded-2xl p-5">
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-orange-300">🏆</span>
                      <span className="font-display text-sm font-bold text-white">
                        {isAr ? "البروفايل الاحترافي" : "Pro Profile"}
                      </span>
                    </div>
                    <span className="rounded-full bg-orange-500/20 px-2 py-0.5 text-[9px] font-black tracking-widest text-orange-300">PRO</span>
                  </div>
                  <div className="grid grid-cols-4 gap-1.5 sm:grid-cols-8">
                    {PRO_PROFILES.map((pr) => (
                      <button
                        key={pr.id}
                        onClick={() => setProProfile(pr.id)}
                        className={`flex flex-col items-center gap-1 rounded-xl border py-2 text-center transition-all ${
                          proProfile === pr.id ? "border-orange-400/40 bg-orange-500/15" : "border-white/8 hover:border-orange-400/20"
                        }`}
                        title={isAr ? pr.nameAr : pr.name}
                      >
                        <span className="text-xl">{pr.icon}</span>
                        <span className="text-[9px] font-bold text-white/70 leading-tight">{isAr ? pr.nameAr : pr.name}</span>
                      </button>
                    ))}
                  </div>

                  {(() => {
                    const pr = PRO_PROFILES.find((p) => p.id === proProfile)!;
                    const rec = PRO_RECOMMENDATIONS[proProfile];
                    if (!pr || !rec) return null;
                    const stats = [
                      { k: isAr ? "تحكم ارتداد" : "Recoil", v: pr.recoilControl, c: "bg-red-500" },
                      { k: isAr ? "تتبع" : "Tracking", v: pr.tracking, c: "bg-emerald-500" },
                      { k: isAr ? "فليك" : "Flicking", v: pr.flicking, c: "bg-sky-500" },
                      { k: isAr ? "بعيد" : "Long Range", v: pr.longRange, c: "bg-purple-500" },
                      { k: isAr ? "قريب" : "CQC", v: pr.cqcPower, c: "bg-orange-500" },
                    ];
                    return (
                      <div className="mt-4 space-y-3">
                        <p className="text-xs text-white/60">{isAr ? pr.descriptionAr : pr.description}</p>
                        <div className="space-y-2">
                          {stats.map((s) => (
                            <div key={s.k} className="flex items-center gap-2">
                              <span className="w-20 text-right text-[10px] text-white/50">{s.k}</span>
                              <div className="flex-1 overflow-hidden rounded-full bg-white/5">
                                <div className={`h-1.5 rounded-full ${s.c} stat-bar`} style={{ width: `${s.v}%` }} />
                              </div>
                              <span className="w-8 text-right text-[10px] font-bold text-white">{s.v}</span>
                            </div>
                          ))}
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-xs">
                          <div>
                            <div className="mb-1 font-bold text-emerald-300">✅ {isAr ? "القوة" : "Strengths"}</div>
                            {(isAr ? pr.strengthsAr : pr.strengths).map((s) => (
                              <div key={s} className="text-white/50">• {s}</div>
                            ))}
                          </div>
                          <div>
                            <div className="mb-1 font-bold text-red-300">⚠️ {isAr ? "الضعف" : "Weak"}</div>
                            {(isAr ? pr.weaknessesAr : pr.weaknesses).map((s) => (
                              <div key={s} className="text-white/50">• {s}</div>
                            ))}
                          </div>
                          <div>
                            <div className="mb-1 font-bold text-orange-300">🎯 {isAr ? "الأفضل لـ" : "Best for"}</div>
                            <div className="flex flex-wrap gap-1">
                              {(isAr ? pr.bestForAr : pr.bestFor).map((s) => (
                                <span key={s} className="rounded-full bg-orange-500/10 px-1.5 py-0.5 text-[9px] text-orange-300">{s}</span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="rounded-xl border border-white/5 bg-black/20 p-3">
                            <div className="mb-1 text-[9px] font-black uppercase tracking-widest text-orange-300">PRO MAX</div>
                            <div className="space-y-1 text-[10px] text-white/50">
                              <div>{isAr ? "وضع الجايرو الموصى" : "Recommended Gyro"}: <span className="font-bold text-white">{rec.gyro}</span></div>
                              <div>{isAr ? "أقل أصابع مناسب" : "Recommended Fingers"}: <span className="font-bold text-white">{rec.minFingers}F</span></div>
                              <div>{isAr ? "السلاح المقترح" : "Suggested Weapon"}: <span className="font-bold text-white">{rec.preferredWeaponName}</span></div>
                              <div>{isAr ? "أنسب فئة أسلحة" : "Best Weapon Focus"}: <span className="font-bold text-white">{(isAr ? rec.weaponFocusAr : rec.weaponFocus).join(" · ")}</span></div>
                            </div>
                          </div>
                          <div className="rounded-xl border border-white/5 bg-black/20 p-3">
                            <div className="mb-1 text-[9px] font-black uppercase tracking-widest text-sky-300">INSIGHT</div>
                            <div className="text-[10px] text-white/50">{isAr ? rec.noteAr : rec.note}</div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="rounded-xl border border-white/5 bg-black/20 p-3">
                            <div className="mb-1 text-[9px] font-black uppercase tracking-widest text-purple-300">TOOL STACK</div>
                            <div className="space-y-0.5">
                              {(isAr ? rec.featureStackAr : rec.featureStack).map((s) => (
                                <div key={s} className="text-[10px] text-white/50">• {s}</div>
                              ))}
                            </div>
                          </div>
                          <div className="rounded-xl border border-white/5 bg-black/20 p-3">
                            <div className="mb-1 text-[9px] font-black uppercase tracking-widest text-amber-300">WARM-UP</div>
                            <div className="space-y-0.5">
                              {(isAr ? rec.warmupAr : rec.warmup).map((s) => (
                                <div key={s} className="text-[10px] text-white/50">• {s}</div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </RevealSection>

              {/* Fingers + Style */}
              <RevealSection delay={1}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="card rounded-2xl p-4">
                    <div className="mb-3 text-sm font-bold text-white">{t("fingers_title", lang)}</div>
                    <div className="flex gap-2">
                      {FINGERS.map((f) => (
                        <button
                          key={f}
                          onClick={() => setFingers(f)}
                          className={`flex-1 rounded-xl border py-2 text-sm font-black transition-all ${
                            fingers === f ? "border-orange-400/40 bg-orange-500/15 text-orange-300" : "border-white/8 text-white/50 hover:border-orange-400/20"
                          }`}
                        >
                          {f}F
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="card rounded-2xl p-4">
                    <div className="mb-3 text-sm font-bold text-white">{isAr ? "أسلوب اللعب" : "Play Style"}</div>
                    <select
                      value={styleId}
                      onChange={(e) => setStyleId(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-black/30 px-2 py-2 text-xs text-white focus:border-orange-400/40 focus:outline-none"
                    >
                      {playStyles.map((s) => (
                        <option key={s.id} value={s.id}>{isAr ? s.labelAr : s.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </RevealSection>

              {/* Weapon */}
              <RevealSection delay={2}>
                <div className="card rounded-2xl p-5">
                  <div className="mb-3 text-sm font-bold text-white">{t("weapon_title", lang)}</div>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {WEAPONS.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => { setWeaponCatId(c.id); setWeapon(c.weapons[0]); }}
                        className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-semibold transition-all ${
                          weaponCatId === c.id ? "border-orange-400/40 bg-orange-500/15 text-orange-300" : "border-white/8 text-white/50 hover:border-orange-400/20"
                        }`}
                      >
                        {c.icon} {c.name}
                      </button>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {currentWeaponCat.weapons.map((w) => (
                      <button
                        key={w.name}
                        onClick={() => setWeapon(w)}
                        className={`rounded-xl border px-2 py-2 text-xs font-semibold transition-all ${
                          weapon.name === w.name ? "border-orange-400/40 bg-orange-500/15 text-orange-300" : "border-white/8 text-white/60 hover:border-orange-400/20"
                        }`}
                      >
                        {w.name}
                      </button>
                    ))}
                  </div>
                  <div className="mt-3 flex gap-3 text-xs">
                    <div className="flex items-center gap-1 rounded-lg bg-white/5 px-2 py-1">
                      <span className="text-white/40">{t("weapon_recoil", lang)}</span>
                      <span className="font-bold text-red-400">🔥 {weapon.recoil}</span>
                    </div>
                    <div className="flex items-center gap-1 rounded-lg bg-white/5 px-2 py-1">
                      <span className="text-white/40">{t("weapon_range", lang)}</span>
                      <span className="font-bold text-orange-300">🎯 {weapon.range}</span>
                    </div>
                  </div>
                </div>
              </RevealSection>

              {/* Action buttons */}
              <div className="flex gap-3">
                <button onClick={handleSave} className="btn-ghost flex-1 rounded-xl py-3 text-sm">
                  💾 {isAr ? "حفظ البروفايل" : "Save Profile"}
                </button>
                <button onClick={handleCopy} className="btn-primary flex-1 rounded-xl py-3 text-sm">
                  {copied ? "✅" : "📋"} {copied ? (isAr ? "تم النسخ!" : "Copied!") : (isAr ? "نسخ الإعدادات" : "Copy Settings")}
                </button>
                <button onClick={handleAutoTune} className="btn-ghost rounded-xl px-4 py-3 text-sm">
                  {t("ai_autotune", lang)}
                </button>
              </div>

              {/* Screen Recorder */}
              <ScreenRecorder />
            </div>

            {/* ---------- OUTPUT ---------- */}
            <div className="space-y-5">
              {/* AI Score */}
              <RevealSection>
                <div className="card neon-box rounded-2xl p-5">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-orange-300">{t("ai_score_label", lang)}</div>
                      <div className="text-sm font-bold text-white">{t("ai_score_title", lang)}</div>
                    </div>
                    <div className="text-xs text-white/40">{device.name} · {weapon.name} · {fingers} {t("ai_suffix", lang)}</div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="relative flex h-24 w-24 shrink-0 items-center justify-center">
                      <svg className="rotate-slow absolute inset-0 h-full w-full opacity-30" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="45" fill="none" stroke="#ff7a00" strokeWidth="1" strokeDasharray="4 6" />
                      </svg>
                      <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                        <circle
                          cx="50" cy="50" r="40" fill="none"
                          stroke={aiScore >= 80 ? "#22c55e" : aiScore >= 60 ? "#f59e0b" : "#ef4444"}
                          strokeWidth="8" strokeLinecap="round"
                          strokeDasharray={`${(aiScore / 100) * 251.3} 251.3`}
                          className="transition-all duration-1000"
                        />
                      </svg>
                      <div className="text-center">
                        <div className="font-display text-2xl font-black text-orange-300">{aiScore}</div>
                        <div className="text-[8px] font-bold text-white/40">AI SCORE</div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <AIPredictions aiScore={aiScore} styleId={styleId} fingers={fingers} gyroMode={gyroMode} />
                    </div>
                  </div>
                </div>
              </RevealSection>

              {/* Pro Player Match */}
              {(() => {
                const pros = findClosestPros(device, styleId, fingers);
                const top = pros[0];
                if (!top) return null;
                return (
                  <div className="card rounded-2xl p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span>👑</span>
                        <span className="font-display text-sm font-bold text-orange-300">
                          {isAr ? "أقرب لاعب محترف" : "Closest Pro Player"}
                        </span>
                      </div>
                      <span className="rounded-full bg-orange-500/20 px-2 py-0.5 text-xs font-bold text-orange-300">
                        {Math.round(top.similarity * 100)}% {isAr ? "تطابق" : "match"}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{top.player.flag}</span>
                      <div className="flex-1">
                        <div className="font-bold text-white">{top.player.name}</div>
                        <div className="text-xs text-white/40">
                          {top.player.fingers}F · {top.player.gyro} · {top.player.weapon} · {top.player.device}
                        </div>
                        <div className="mt-1 flex flex-wrap gap-1">
                          {pros.slice(1).map(p => (
                            <span key={p.player.name} className="rounded-full bg-white/5 px-2 py-0.5 text-[9px] text-white/40">
                              {p.player.flag} {p.player.name} ({Math.round(p.similarity*100)}%)
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* Factors */}
              <FactorsCard factors={sens.factors} />

              {/* Camera sensitivity */}
              <SensTable
                title={t("sens_camera", lang)}
                icon="📷"
                data={sens.cam}
                max={300}
                accent="text-orange-300"
                barClass="from-orange-500 to-amber-400"
              />

              {/* ADS sensitivity */}
              <SensTable
                title={t("sens_ads", lang)}
                icon="🎯"
                data={sens.ads}
                max={300}
                accent="text-sky-300"
                barClass="from-sky-500 to-cyan-400"
              />

              {/* Gyro */}
              {gyroMode === "off" ? (
                <div className="card rounded-2xl p-5 text-center">
                  <div className="mb-2 text-3xl">⭕</div>
                  <div className="font-bold text-white">{t("gyro_disabled_title", lang)}</div>
                  <div className="mt-1 text-xs text-white/40">{t("gyro_disabled_msg", lang)}</div>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-2 rounded-xl border border-white/8 bg-black/20 px-3 py-2">
                    <span>{gyroMode === "scope" ? "🎯" : "🔄"}</span>
                    <div className="flex-1">
                      <div className="text-xs font-bold text-white">
                        {gyroMode === "scope" ? t("gyro_status_scope", lang) : t("gyro_status_always", lang)}
                      </div>
                      <div className="text-[10px] text-white/40">
                        {gyroMode === "scope"
                          ? (isAr ? "الجايرو يعمل فقط عند فتح السكوب" : "Gyro fires only while scoping")
                          : (isAr ? "الجايرو فعّال دائمًا" : "Gyro active at all times")}
                      </div>
                    </div>
                    <span className="rounded-full bg-orange-500/20 px-2 py-0.5 text-[9px] font-black text-orange-300">GYRO</span>
                  </div>
                  <SensTable
                    title={t("sens_gyro_cam", lang)}
                    icon="🌀"
                    data={sens.gyro.cam}
                    max={400}
                    accent="text-emerald-300"
                    barClass="from-emerald-500 to-teal-400"
                  />
                  <SensTable
                    title={t("sens_gyro_ads", lang)}
                    icon="🔄"
                    data={sens.gyro.ads}
                    max={400}
                    accent="text-purple-300"
                    barClass="from-purple-500 to-pink-400"
                  />
                </>
              )}

              {/* Free Look */}
              <div className="card rounded-2xl p-4">
                <div className="mb-3 text-sm font-bold text-white">{t("sens_freelook", lang)}</div>
                <div className="grid grid-cols-3 gap-2">
                  {Object.entries(sens.freeLook).map(([k, v]) => {
                    const labelKey = k === "cam" ? "sens_freelook_cam" : k === "parashoot" ? "sens_freelook_para" : "sens_freelook_vehicle";
                    return (
                      <div key={k} className="rounded-xl border border-white/8 bg-black/20 p-3 text-center">
                        <div className="text-[10px] text-white/40">{t(labelKey as never, lang)}</div>
                        <div className="mt-1 font-display text-lg font-black text-orange-300">{v}%</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* AI Coach */}
              <AICoach aiScore={aiScore} styleId={styleId} fingers={fingers} gyroMode={gyroMode} weaponType={weapon.type} />

              {/* Stability Analysis */}
              <div className="card rounded-2xl p-5">
                <div className="mb-3 flex items-center justify-between">
                  <div className="text-sm font-bold text-white">{t("stability_title", lang)}</div>
                  <span className="font-mono text-xs text-white/30">R = D × W × F × S</span>
                </div>
                <div className="space-y-3">
                  {[
                    { label: t("stability_device", lang), value: (sens.factors.deviceFactor * 100).toFixed(0), color: "from-orange-500 to-red-500" },
                    { label: t("stability_weapon", lang), value: (sens.factors.weaponFactor * 100).toFixed(0), color: "from-amber-500 to-orange-500" },
                    { label: t("stability_fingers", lang), value: (sens.factors.fingerFactor * 100).toFixed(0), color: "from-emerald-500 to-teal-500" },
                    { label: t("stability_style", lang), value: (sens.factors.styleFactor * 100).toFixed(0), color: "from-sky-500 to-indigo-500" },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="mb-1 flex items-center justify-between text-xs">
                        <span className="text-white/60">{item.label}</span>
                        <span className="font-bold text-white">{item.value}%</span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
                        <div className={`h-full rounded-full bg-gradient-to-r ${item.color} stat-bar`} style={{ width: `${item.value}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-3 rounded-lg bg-black/20 p-2 text-center text-[10px] text-white/30">
                  {t("stability_equation", lang)} · {t("stability_desc", lang)}
                </div>
              </div>

              {/* HUD Preview */}
              <HudPreview fingers={fingers} />
            </div>
          </div>
        </section>

        <div className="divider" />

        {/* ==================== PING ==================== */}
        <RevealSection>
          <PingMonitor />
        </RevealSection>

        <div className="divider" />

        {/* ==================== DNS JORDAN ==================== */}
        <RevealSection>
          <DnsMonitor />
        </RevealSection>

        <div className="divider" />

        {/* ==================== MATH ENGINE ==================== */}
        <RevealSection>
          <section className="container-section py-16">
            <div className="mb-8 text-center">
              <div className="mb-2 text-[10px] font-bold uppercase tracking-widest text-orange-300">{t("eq_eyebrow", lang)}</div>
              <h2 className="font-display text-2xl font-black text-white">{t("eq_title", lang)}</h2>
              <p className="mt-2 text-sm text-white/50">{t("eq_sub", lang)}</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {equations.map((e) => (
                <div key={e.k} className="card rounded-2xl p-5">
                  <div className="mb-2 flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/20 font-display text-lg font-black text-orange-300">{e.k}</span>
                    <span className="font-bold text-white">{e.label}</span>
                  </div>
                  <code className="block rounded-lg bg-black/40 px-3 py-2 font-mono text-xs text-orange-300">{e.eq}</code>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-xl border border-white/5 bg-black/20 p-3 text-center font-mono text-[10px] text-white/30">
              D = fps·touch·size·ppi·gyro tiers · Wₖ = recoilComp·recovery·range
              <br />
              σ(m) = per-scope curve · γ(m) = gyro curve · Gq = gyro quality
            </div>
          </section>
        </RevealSection>

        <div className="divider" />

        {/* ==================== SAVED PROFILES ==================== */}
        <RevealSection>
          <section className="container-section py-12">
            <div className="mb-6 text-center">
              <div className="mb-1 text-[10px] font-bold uppercase tracking-widest text-orange-300">{t("saved_eyebrow", lang)}</div>
              <h2 className="font-display text-2xl font-black text-white">{t("saved_title", lang)}</h2>
              <p className="mt-1 text-sm text-white/50">{t("saved_sub", lang)}</p>
            </div>
            {profiles.length === 0 ? (
              <div className="card rounded-2xl p-8 text-center">
                <div className="mb-3 text-4xl">🗂️</div>
                <div className="text-sm text-white/40">{t("saved_empty", lang)}</div>
              </div>
            ) : (
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {profiles.map((p) => (
                  <div key={p.id} className="card rounded-2xl p-4">
                    <div className="font-bold text-white">{p.name}</div>
                    <div className="mt-1 text-xs text-white/40">{new Date(p.savedAt).toLocaleString()}</div>
                    <div className="mt-2 text-xs font-bold text-orange-300">AI Score: {computeSensitivity(p.params).aiScore}/100</div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </RevealSection>

        <div className="divider" />

        {/* ==================== PAC ==================== */}
        <RevealSection>
          <PacSection />
        </RevealSection>

        <div className="divider" />

        {/* ==================== RATING ==================== */}
        <RevealSection>
          <section className="container-section py-12">
            <div className="mx-auto max-w-md">
              <RatingSection />
            </div>
          </section>
        </RevealSection>

        <div className="divider" />

        {/* ==================== ABOUT / FOOTER ==================== */}
        <footer id="about" className="container-section py-16">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-red-600 text-2xl font-black text-white">A</span>
                <div>
                  <div className="font-display text-xl font-black text-white">ALYAZOURI <span className="text-orange-400">2026</span></div>
                  <div className="text-xs text-white/40">🇯🇴 Jordan</div>
                </div>
              </div>
              <p className="max-w-lg text-sm text-white/50">{t("footer_about", lang)}</p>
              <div className="mt-4 flex flex-wrap gap-3 text-xs text-white/40">
                <a href="https://tiktok.com/@Saeedalyazouri0" target="_blank" rel="noopener noreferrer" className="hover:text-orange-300">📱 @Saeedalyazouri0</a>
                <a href="https://instagram.com/Saeedjor11" target="_blank" rel="noopener noreferrer" className="hover:text-orange-300">📸 @Saeedjor11</a>
                <span>🎮 PUBG ID: 5744469523</span>
              </div>
            </div>
            <div>
              <div className="mb-3 font-bold text-white">{t("footer_features", lang)}</div>
              <div className="space-y-1.5 text-xs text-white/50">
                {["footer_f1","footer_f2","footer_f3","footer_f4","footer_f5"].map((k) => (
                  <div key={k}>{t(k as never, lang)}</div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-12 border-t border-white/5 pt-8 text-center">
            <div className="font-display text-sm font-bold text-orange-300">{t("footer_tagline", lang)}</div>
            <div className="mt-2 text-xs text-white/30">{t("footer_rights", lang)}</div>
          </div>
        </footer>
      </main>

      <PWABanner />
    </div>
  );
}
