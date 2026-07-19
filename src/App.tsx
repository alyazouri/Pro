import { useState, useEffect, useMemo } from "react";
import { useLang } from "./LanguageContext";
import { t } from "./i18n";
import { BRANDS, WEAPONS, SERVERS, PRO_PROFILES, FINGERS, type Device, type ProProfileId } from "./data";
import { computeSensitivity, SensTable, FactorsCard, type SensParams } from "./sensitivity";
import { StatusBar } from "./StatusBar";
import { Hero } from "./Hero";
import { Particles } from "./Particles";
import { PingMonitor } from "./PingMonitor";
import { PacSection } from "./PacSection";
import { QuickSearch } from "./QuickSearch";
import { RatingSection, RevealSection } from "./Features";
import { PWABanner } from "./PWABanner";
import { MusicPlayer } from "./MusicPlayer";
import { HudPreview } from "./HudPreview";
import { AIPredictions } from "./AIPredictions";
import { NetworkHeatmap } from "./NetworkHeatmap";
import { DnsMonitor } from "./DnsMonitor";
import { SensCode } from "./SensCode";
import { SmartTips } from "./SmartTips";
import { ExportPdfButton } from "./ExportPdf";

const PROFILES_KEY = "alyazouri_profiles_v2";

type SavedProfile = {
  id: string;
  name: string;
  savedAt: number;
  params: SensParams;
};

const gyroModes: Array<{ id: "off" | "scope" | "always"; icon: string; labelAr: string; labelEn: string }> = [
  { id: "off", icon: "⭕", labelAr: "معطل", labelEn: "Off" },
  { id: "scope", icon: "🎯", labelAr: "سكوب فقط", labelEn: "Scope Only" },
  { id: "always", icon: "🔄", labelAr: "دائماً", labelEn: "Always On" },
];

// Group profiles by category
const profileCategories = [
  { id: "custom", nameAr: "⭐ مخصص", nameEn: "⭐ Custom" },
  { id: "general", nameAr: "عام", nameEn: "General" },
  { id: "aggressive", nameAr: "عدواني", nameEn: "Aggressive" },
  { id: "tactical", nameAr: "تكتيكي", nameEn: "Tactical" },
  { id: "specialist", nameAr: "متخصص", nameEn: "Specialist" },
];

export default function App() {
  const { lang } = useLang();
  const isAr = lang === "ar";

  const [ping, setPing] = useState<number | null>(null);
  const [brandId, setBrandId] = useState(BRANDS[0].id);
  const [device, setDevice] = useState<Device>(BRANDS[0].devices[0]);
  const [gyroMode, setGyroMode] = useState<"off" | "scope" | "always">("scope");
  const [proProfile, setProProfile] = useState<ProProfileId>("alyazouri_pro");
  const [fingers, setFingers] = useState(4);
  const [weaponCatId, setWeaponCatId] = useState(WEAPONS[0].id);
  const [weapon, setWeapon] = useState(WEAPONS[0].weapons[0]);
  const [copied, setCopied] = useState(false);
  const [activeCategory, setActiveCategory] = useState("custom");

  const [profiles, setProfiles] = useState<SavedProfile[]>(() => {
    try { return JSON.parse(localStorage.getItem(PROFILES_KEY) || "[]"); } catch { return []; }
  });

  // Live ping measurement on mount
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
    fingers, gyroMode,
    weaponId: weapon.name,
    weaponName: weapon.name,
    weaponRecoil: weapon.recoil,
    weaponRange: weapon.range,
    weaponType: weapon.type,
    proProfile,
  }), [device, fingers, gyroMode, weapon, proProfile, brandId]);

  const aiScore = sens.aiScore;

  const currentProfile = PRO_PROFILES.find(p => p.id === proProfile) ?? PRO_PROFILES[0];

  const gyroLabel = device.gyroQuality === "excellent" ? t("device_gyro_excellent", lang)
    : device.gyroQuality === "good" ? t("device_gyro_good", lang) : t("device_gyro_average", lang);

  const currentBrand = BRANDS.find((b) => b.id === brandId) ?? BRANDS[0];
  const currentWeaponCat = WEAPONS.find((c) => c.id === weaponCatId) ?? WEAPONS[0];

  const filteredProfiles = PRO_PROFILES.filter(p => p.category === activeCategory);

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
      id: crypto.randomUUID?.() ?? String(Date.now()),
      name: `${device.name} · ${weapon.name}`,
      savedAt: Date.now(),
      params: {
        deviceId: `${brandId}|${device.name}`,
        device, brandId,
        fingers, gyroMode,
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
      `👤 Profile: ${currentProfile.name} | Fingers: ${fingers}F`,
      `📷 Camera No-Scope: ${sens.cam.noScope}% | Red Dot: ${sens.cam.red}% | 4×: ${sens.cam.scope4}%`,
      `🎯 ADS No-Scope: ${sens.ads.noScope}% | Red Dot: ${sens.ads.red}%`,
      gyroMode !== "off" ? `🌀 Gyro: ${sens.gyro.cam.red}% (Red) | ${sens.gyro.cam.scope4}% (4×)` : "",
      `🏆 AI Score: ${aiScore}/100`,
    ].filter(Boolean).join("\n");
    try { navigator.clipboard?.writeText(text); } catch { /* ignore */ }
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="relative min-h-screen">
      <Particles />
      <StatusBar ping={ping} />
      <PWABanner />
      <MusicPlayer />

      <main className="container-section relative z-10 pt-20">
        {/* HERO */}
        <Hero ping={ping} />

        {/* GENERATOR */}
        <section id="generator" className="py-16">
          <RevealSection>
            <div className="mb-8 text-center">
              <div className="text-[10px] uppercase tracking-widest text-white/40">{t("sec_generator_eyebrow", lang)}</div>
              <h2 className="font-display text-2xl font-black text-white sm:text-3xl">{t("sec_generator_title", lang)}</h2>
              <p className="mt-2 text-sm text-white/50">{t("sec_generator_sub", lang)}</p>
            </div>
          </RevealSection>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* CONTROLS */}
            <div className="space-y-6">
              <QuickSearch onSelect={onSearch} />

              {/* Device Selection */}
              <div className="card rounded-2xl p-5">
                <div className="mb-3 text-sm font-bold text-orange-300">📱 {t("device_select", lang)}</div>
                <select
                  value={brandId}
                  onChange={(e) => {
                    const b = BRANDS.find((x) => x.id === e.target.value)!;
                    setBrandId(b.id);
                    setDevice(b.devices[0]);
                  }}
                  className="w-full mb-3"
                >
                  {BRANDS.map((b) => (
                    <option key={b.id} value={b.id}>{b.icon} {b.name}</option>
                  ))}
                </select>
                <select
                  value={device.name}
                  onChange={(e) => {
                    const dev = currentBrand.devices.find((d) => d.name === e.target.value)!;
                    setDevice(dev);
                  }}
                  className="w-full"
                >
                  {currentBrand.devices.map((dev) => (
                    <option key={dev.name} value={dev.name}>{dev.name}</option>
                  ))}
                </select>
                <div className="mt-3 text-xs text-white/50">
                  {t("device_selected", lang)}<span className="font-bold text-white">{device.name}</span>
                </div>
                <div className="mt-2 flex flex-wrap gap-2 text-[10px]">
                  <span className="rounded-full bg-white/5 px-2 py-1">⚡ {device.fps} FPS</span>
                  <span className="rounded-full bg-white/5 px-2 py-1">👆 {device.touchRate} Hz</span>
                  <span className="rounded-full bg-white/5 px-2 py-1">📐 {device.screenSize}"</span>
                  <span className="rounded-full bg-emerald-500/10 px-2 py-1 text-emerald-300">🌀 {gyroLabel}</span>
                </div>
              </div>

              {/* Finger Count */}
              <div className="card rounded-2xl p-5">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm font-bold text-white">✋ {t("fingers_title", lang)}</span>
                  <span className="rounded-full bg-orange-500/20 px-2 py-0.5 text-[10px] font-bold text-orange-300">{fingers}F</span>
                </div>
                <div className="flex gap-2">
                  {FINGERS.map((f) => (
                    <button
                      key={f}
                      onClick={() => setFingers(f)}
                      className={`flex-1 rounded-xl py-3 text-center font-bold transition-all ${
                        fingers === f ? "bg-orange-500/20 text-orange-300 ring-2 ring-orange-400/50" : "bg-white/5 text-white/60 hover:bg-white/10"
                      }`}
                    >
                      {f}F
                    </button>
                  ))}
                </div>
                <div className="mt-3 text-[10px] text-white/40">
                  {fingers <= 2 && (isAr ? "👆 إبهامان — أسهل للمبتدئين" : "👆 Two thumbs — easiest for beginners")}
                  {fingers === 3 && (isAr ? "🖐️ 3 أصابع — توازن جيد" : "🖐️ 3 fingers — good balance")}
                  {fingers === 4 && (isAr ? "🎮 4 أصابع (كلو) — الأكثر شيوعاً للمحترفين" : "🎮 4 fingers (claw) — most common for pros")}
                  {fingers === 5 && (isAr ? "⚡ 5 أصابع — تحكم متقدم" : "⚡ 5 fingers — advanced control")}
                  {fingers === 6 && (isAr ? "🏆 6 أصابع — أقصى تحكم" : "🏆 6 fingers — maximum control")}
                </div>
              </div>

              {/* Gyro Mode */}
              <div className="card rounded-2xl p-5">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm font-bold text-white">🌀 {t("gyro_title", lang)}</span>
                  <span className={`text-xs font-bold ${gyroMode === "off" ? "text-white/40" : gyroMode === "scope" ? "text-amber-300" : "text-emerald-300"}`}>
                    {gyroMode === "off" ? t("gyro_status_off", lang) : gyroMode === "scope" ? t("gyro_status_scope", lang) : t("gyro_status_always", lang)}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {gyroModes.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setGyroMode(m.id)}
                      className={`rounded-xl py-3 text-center transition-all ${
                        gyroMode === m.id ? "bg-orange-500/20 ring-2 ring-orange-400/50" : "bg-white/5 hover:bg-white/10"
                      }`}
                    >
                      <div className="text-xl">{m.icon}</div>
                      <div className="mt-1 text-[10px] font-bold text-white/80">{isAr ? m.labelAr : m.labelEn}</div>
                    </button>
                  ))}
                </div>
                <div className="mt-3 text-[11px] text-white/50">
                  {gyroMode === "off" && t("gyro_msg_off", lang)}
                  {gyroMode === "scope" && t("gyro_msg_scope", lang)}
                  {gyroMode === "always" && t("gyro_msg_always", lang)}
                </div>
              </div>

              {/* Pro Profile - EXPANDED */}
              <div className="card rounded-2xl p-5">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm font-bold text-white">🏆 {isAr ? "البروفايل الاحترافي" : "Pro Profile"}</span>
                  <span className="rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-2.5 py-0.5 text-[10px] font-bold text-white">
                    {currentProfile.icon} {isAr ? currentProfile.nameAr : currentProfile.name}
                  </span>
                </div>

                {/* Category Tabs */}
                <div className="flex gap-1 mb-4 overflow-x-auto pb-2">
                  {profileCategories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                        activeCategory === cat.id 
                          ? "bg-orange-500/20 text-orange-300 ring-1 ring-orange-400/50" 
                          : "bg-white/5 text-white/50 hover:bg-white/10"
                      }`}
                    >
                      {isAr ? cat.nameAr : cat.nameEn}
                    </button>
                  ))}
                </div>

                {/* Profile Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {filteredProfiles.map((pr) => (
                    <button
                      key={pr.id}
                      onClick={() => setProProfile(pr.id)}
                      className={`rounded-xl p-3 text-center transition-all ${
                        pr.isCustom 
                          ? proProfile === pr.id
                            ? "bg-gradient-to-br from-amber-500/30 via-orange-500/20 to-red-500/20 ring-2 ring-amber-400/70 shadow-lg shadow-orange-500/20"
                            : "bg-gradient-to-br from-amber-500/10 to-orange-500/10 hover:from-amber-500/20 hover:to-orange-500/15 border border-amber-400/30"
                          : proProfile === pr.id 
                            ? "bg-gradient-to-br from-orange-500/20 to-amber-500/10 ring-2 ring-orange-400/50" 
                            : "bg-white/5 hover:bg-white/10"
                      }`}
                    >
                      <div className={`text-2xl ${pr.isCustom ? "animate-pulse" : ""}`}>{pr.icon}</div>
                      <div className={`mt-1 text-xs font-bold ${pr.isCustom ? "text-amber-300" : "text-white"}`}>
                        {isAr ? pr.nameAr : pr.name}
                      </div>
                      {pr.isCustom && (
                        <div className="mt-1 text-[8px] text-amber-400/80 font-bold">EXCLUSIVE</div>
                      )}
                    </button>
                  ))}
                </div>

                {/* Profile Details */}
                <div className="mt-4 rounded-xl border border-white/5 bg-black/20 p-4">
                  <div className="text-sm font-bold text-white mb-2">{currentProfile.icon} {isAr ? currentProfile.nameAr : currentProfile.name}</div>
                  <div className="text-xs text-white/60 mb-3">
                    {isAr ? currentProfile.descriptionAr : currentProfile.description}
                  </div>
                  
                  {/* Stats */}
                  <div className="grid grid-cols-5 gap-2 mb-3">
                    {[
                      { label: isAr ? "تحكم" : "Recoil", value: currentProfile.recoilControl, color: "bg-red-500" },
                      { label: isAr ? "تتبع" : "Track", value: currentProfile.tracking, color: "bg-emerald-500" },
                      { label: isAr ? "فليك" : "Flick", value: currentProfile.flicking, color: "bg-sky-500" },
                      { label: isAr ? "بعيد" : "Long", value: currentProfile.longRange, color: "bg-purple-500" },
                      { label: isAr ? "قريب" : "CQC", value: currentProfile.cqcPower, color: "bg-orange-500" },
                    ].map((stat) => (
                      <div key={stat.label} className="text-center">
                        <div className="text-[9px] text-white/40">{stat.label}</div>
                        <div className="mt-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
                          <div className={`h-full ${stat.color}`} style={{ width: `${stat.value}%` }} />
                        </div>
                        <div className="text-[10px] font-bold text-white/80">{stat.value}</div>
                      </div>
                    ))}
                  </div>

                  {/* Recommendations */}
                  <div className="flex flex-wrap gap-2 text-[10px]">
                    <span className="rounded-full bg-sky-500/10 px-2 py-1 text-sky-300">
                      👆 {currentProfile.recommendedFingers.join("-")}F
                    </span>
                    <span className="rounded-full bg-emerald-500/10 px-2 py-1 text-emerald-300">
                      🌀 {currentProfile.recommendedGyro === "off" ? (isAr ? "بدون" : "Off") : currentProfile.recommendedGyro === "scope" ? (isAr ? "سكوب" : "Scope") : (isAr ? "دائم" : "Always")}
                    </span>
                    <span className="rounded-full bg-amber-500/10 px-2 py-1 text-amber-300">
                      🔫 {currentProfile.recommendedWeapons.slice(0, 2).join(", ")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Weapon Selection */}
              <div className="card rounded-2xl p-5">
                <div className="mb-3 text-sm font-bold text-orange-300">🔫 {t("weapon_title", lang)}</div>
                <select
                  value={weaponCatId}
                  onChange={(e) => {
                    const cat = WEAPONS.find((c) => c.id === e.target.value)!;
                    setWeaponCatId(cat.id);
                    setWeapon(cat.weapons[0]);
                  }}
                  className="w-full mb-3"
                >
                  {WEAPONS.map((c) => (
                    <option key={c.id} value={c.id}>{c.icon} {c.name}</option>
                  ))}
                </select>
                <select
                  value={weapon.name}
                  onChange={(e) => {
                    const w = currentWeaponCat.weapons.find((x) => x.name === e.target.value)!;
                    setWeapon(w);
                  }}
                  className="w-full"
                >
                  {currentWeaponCat.weapons.map((w) => (
                    <option key={w.name} value={w.name}>{w.name}</option>
                  ))}
                </select>
                <div className="mt-3 flex gap-4 text-xs">
                  <span className="text-white/50">{t("weapon_recoil", lang)} <span className="font-bold text-red-300">🔥 {weapon.recoil}</span></span>
                  <span className="text-white/50">{t("weapon_range", lang)} <span className="font-bold text-emerald-300">🎯 {weapon.range}</span></span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2">
                <button onClick={handleCopy} className="btn-primary rounded-xl py-3 text-xs font-bold">
                  {copied ? "✅" : "📋"} {isAr ? (copied ? "تم!" : "نسخ") : (copied ? "Done!" : "Copy")}
                </button>
                <button onClick={handleSave} className="btn-ghost rounded-xl py-3 text-xs font-bold">
                  💾 {isAr ? "حفظ" : "Save"}
                </button>
                <button
                  onClick={() => {
                    const text = encodeURIComponent(
                      `🦅 ALYAZOURI 2026\n📱 ${device.name} | 🔫 ${weapon.name}\n👤 ${currentProfile.name} | ${fingers}F\n🏆 AI Score: ${aiScore}/100\n\nCamera TPP: ${sens.cam.tpp}% | Red: ${sens.cam.red}% | 4x: ${sens.cam.scope4}%\nADS Red: ${sens.ads.red}% | 4x: ${sens.ads.scope4}%`
                    );
                    window.open(`https://wa.me/?text=${text}`, "_blank");
                  }}
                  className="btn-ghost rounded-xl py-3 text-xs font-bold"
                >
                  📤 {isAr ? "مشاركة" : "Share"}
                </button>
                <ExportPdfButton
                  sens={sens}
                  deviceName={device.name}
                  weaponName={weapon.name}
                  profileName={currentProfile.name}
                  profileIcon={currentProfile.icon}
                  fingers={fingers}
                  gyroMode={gyroMode}
                  aiScore={aiScore}
                />
              </div>
            </div>

            {/* OUTPUT */}
            <div className="space-y-6">
              {/* AI Score */}
              <div className="card neon-box rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-white/40">{t("ai_score_label", lang)}</div>
                    <div className="font-display text-xl font-bold text-white">{t("ai_score_title", lang)}</div>
                    <div className="text-xs text-white/50">{device.name} · {weapon.name} · {fingers}F · {currentProfile.name}</div>
                  </div>
                  <div className="relative flex h-24 w-24 items-center justify-center">
                    <svg className="absolute h-full w-full -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
                      <circle
                        cx="50" cy="50" r="45" fill="none"
                        stroke="url(#scoreGrad)"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray={`${aiScore * 2.83} 283`}
                      />
                      <defs>
                        <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#ff7a00" />
                          <stop offset="100%" stopColor="#ffd166" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="text-center">
                      <div className="font-display text-2xl font-black text-orange-300">{aiScore}</div>
                      <div className="text-[8px] uppercase tracking-widest text-white/40">AI SCORE</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Factors */}
              <FactorsCard factors={sens.factors} />

              {/* Sensitivity Tables */}
              <SensTable
                title={t("sens_camera", lang)}
                icon="📷"
                data={sens.cam}
                max={300}
              />
              <SensTable
                title={t("sens_ads", lang)}
                icon="🎯"
                data={sens.ads}
                max={300}
                accent="text-amber-300"
                barClass="from-amber-500 to-yellow-400"
              />

              {gyroMode === "off" ? (
                <div className="card rounded-2xl p-6 text-center">
                  <span className="text-4xl">⭕</span>
                  <div className="mt-2 text-lg font-bold text-white">{t("gyro_disabled_title", lang)}</div>
                  <div className="text-sm text-white/50">{t("gyro_disabled_msg", lang)}</div>
                </div>
              ) : (
                <>
                  <SensTable
                    title={t("sens_gyro_cam", lang)}
                    icon={gyroMode === "scope" ? "🎯" : "🔄"}
                    data={sens.gyro.cam}
                    max={400}
                    accent="text-emerald-300"
                    barClass="from-emerald-500 to-teal-400"
                  />
                  <SensTable
                    title={t("sens_gyro_ads", lang)}
                    icon="🎮"
                    data={sens.gyro.ads}
                    max={400}
                    accent="text-sky-300"
                    barClass="from-sky-500 to-blue-400"
                  />
                </>
              )}

              {/* Free Look */}
              <div className="card rounded-2xl p-4">
                <div className="mb-3 text-sm font-bold text-orange-300">{t("sens_freelook", lang)}</div>
                <div className="grid grid-cols-3 gap-3">
                  {Object.entries(sens.freeLook).map(([k, v]) => {
                    const label = k === "cam" ? t("sens_freelook_cam", lang) : k === "parashoot" ? t("sens_freelook_para", lang) : t("sens_freelook_vehicle", lang);
                    return (
                      <div key={k} className="rounded-xl bg-white/5 p-3 text-center">
                        <div className="text-xs text-white/50">{label}</div>
                        <div className="font-display text-lg font-bold text-white">{v}%</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Gameplay Settings */}
              <div className="card neon-box rounded-2xl p-5">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">⚙️</span>
                    <div>
                      <div className="text-sm font-bold text-white">
                        {isAr ? "إعدادات اللعب" : "Gameplay Settings"}
                      </div>
                      <div className="text-[10px] text-white/40">
                        {isAr ? "متناسقة مع حساسيتك" : "Synced with your sensitivity"}
                      </div>
                    </div>
                  </div>
                  <span className="rounded-full bg-indigo-500/20 px-2 py-0.5 text-[10px] font-bold text-indigo-300">PUBG</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {/* حساسية الركض 75-100% */}
                  <div className="rounded-xl border border-white/5 bg-black/20 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg">🏃</span>
                      <span className="text-[10px] text-white/50">
                        {isAr ? "حساسية الركض" : "Sprint Sensitivity"}
                      </span>
                    </div>
                    <div className="flex items-end gap-1">
                      <span className="font-display text-3xl font-black text-white">{sens.gameplay.sprintSensitivity}</span>
                      <span className="text-sm text-white/40 mb-1">%</span>
                    </div>
                    <div className="mt-2 h-1.5 rounded-full bg-white/10 overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 stat-bar" style={{ width: `${((sens.gameplay.sprintSensitivity - 75) / 25) * 100}%` }} />
                    </div>
                    <div className="mt-1 flex justify-between text-[8px] text-white/20">
                      <span>75%</span><span>100%</span>
                    </div>
                  </div>

                  {/* حجم زر الحركة 50-120% */}
                  <div className="rounded-xl border border-white/5 bg-black/20 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg">🕹️</span>
                      <span className="text-[10px] text-white/50">
                        {isAr ? "حجم زر الحركة" : "Joystick Size"}
                      </span>
                    </div>
                    <div className="flex items-end gap-1">
                      <span className="font-display text-3xl font-black text-white">{sens.gameplay.joystickSize}</span>
                      <span className="text-sm text-white/40 mb-1">%</span>
                    </div>
                    <div className="mt-2 h-1.5 rounded-full bg-white/10 overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-purple-500 to-pink-400 stat-bar" style={{ width: `${((sens.gameplay.joystickSize - 50) / 70) * 100}%` }} />
                    </div>
                    <div className="mt-1 flex justify-between text-[8px] text-white/20">
                      <span>50%</span><span>120%</span>
                    </div>
                  </div>

                  {/* منظور TPP 80-90% */}
                  <div className="rounded-xl border border-white/5 bg-black/20 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg">👁️</span>
                      <span className="text-[10px] text-white/50">
                        {isAr ? "منظور TPP" : "TPP FOV"}
                      </span>
                    </div>
                    <div className="flex items-end gap-1">
                      <span className="font-display text-3xl font-black text-white">{sens.gameplay.tppFOV}</span>
                      <span className="text-sm text-white/40 mb-1">%</span>
                    </div>
                    <div className="mt-2 h-1.5 rounded-full bg-white/10 overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-orange-500 to-amber-400 stat-bar" style={{ width: `${((sens.gameplay.tppFOV - 80) / 10) * 100}%` }} />
                    </div>
                    <div className="mt-1 flex justify-between text-[8px] text-white/20">
                      <span>80%</span><span>90%</span>
                    </div>
                  </div>

                  {/* منظور FPP 80-103% */}
                  <div className="rounded-xl border border-white/5 bg-black/20 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg">🎯</span>
                      <span className="text-[10px] text-white/50">
                        {isAr ? "منظور FPP" : "FPP FOV"}
                      </span>
                    </div>
                    <div className="flex items-end gap-1">
                      <span className="font-display text-3xl font-black text-white">{sens.gameplay.fppFOV}</span>
                      <span className="text-sm text-white/40 mb-1">%</span>
                    </div>
                    <div className="mt-2 h-1.5 rounded-full bg-white/10 overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-sky-500 to-blue-400 stat-bar" style={{ width: `${((sens.gameplay.fppFOV - 80) / 23) * 100}%` }} />
                    </div>
                    <div className="mt-1 flex justify-between text-[8px] text-white/20">
                      <span>80%</span><span>103%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sensitivity Code — نسخ ومشاركة */}
              <SensCode
                sens={sens}
                deviceName={device.name}
                weaponName={weapon.name}
                profileName={currentProfile.name}
                fingers={fingers}
                gyroMode={gyroMode}
              />

              {/* Smart Tips — نصائح ذكية */}
              <SmartTips
                sens={sens}
                device={device}
                fingers={fingers}
                gyroMode={gyroMode}
                profile={currentProfile}
                weaponType={weapon.type}
              />

              {/* HUD Preview */}
              <HudPreview fingers={fingers} />

              {/* AI Predictions */}
              <AIPredictions
                sens={sens}
                device={device}
                fingers={fingers}
                proProfile={proProfile}
                weaponName={weapon.name}
              />

              {/* Stability Analysis */}
              <div className="card rounded-2xl p-5">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm font-bold text-white">{t("stability_title", lang)}</span>
                  <span className="text-xs text-white/40">R = D × W × F × P</span>
                </div>
                <div className="space-y-3">
                  {[
                    { label: t("stability_device", lang), value: (sens.factors.deviceFactor * 100).toFixed(0), color: "from-orange-500 to-red-500" },
                    { label: t("stability_weapon", lang), value: (sens.factors.weaponFactor * 100).toFixed(0), color: "from-amber-500 to-orange-500" },
                    { label: t("stability_fingers", lang), value: (sens.factors.fingerFactor * 100).toFixed(0), color: "from-emerald-500 to-teal-500" },
                    { label: isAr ? "البروفايل" : "Profile", value: (sens.factors.profileFactor * 100).toFixed(0), color: "from-sky-500 to-indigo-500" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-3">
                      <span className="w-16 text-xs text-white/60">{item.label}</span>
                      <div className="flex-1 h-2 rounded-full bg-white/10 overflow-hidden">
                        <div className={`h-full bg-gradient-to-r ${item.color} stat-bar`} style={{ width: `${item.value}%` }} />
                      </div>
                      <span className="w-10 text-right text-xs font-bold text-white">{item.value}%</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-[10px] text-white/40">
                  <div>{t("stability_equation", lang)}</div>
                  <div>{t("stability_desc", lang)}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PING MONITOR */}
        <section id="ping" className="py-16">
          <RevealSection>
            <PingMonitor />
          </RevealSection>
        </section>

        {/* DNS JORDAN */}
        <section className="py-16">
          <RevealSection>
            <DnsMonitor />
          </RevealSection>
        </section>

        {/* NETWORK HEATMAP */}
        <section className="py-16">
          <RevealSection>
            <NetworkHeatmap />
          </RevealSection>
        </section>

        {/* PAC SECTION */}
        <section id="pac" className="py-16">
          <RevealSection>
            <PacSection />
          </RevealSection>
        </section>

        {/* SAVED PROFILES */}
        <section className="py-16">
          <RevealSection>
            <div className="mb-8 text-center">
              <div className="text-[10px] uppercase tracking-widest text-white/40">{t("saved_eyebrow", lang)}</div>
              <h2 className="font-display text-2xl font-black text-white sm:text-3xl">{t("saved_title", lang)}</h2>
              <p className="mt-2 text-sm text-white/50">{t("saved_sub", lang)}</p>
            </div>
            {profiles.length === 0 ? (
              <div className="card rounded-2xl p-8 text-center">
                <div className="text-4xl mb-3">🗂️</div>
                <div className="text-white/50">{t("saved_empty", lang)}</div>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {profiles.map((p) => {
                  const pSens = computeSensitivity(p.params);
                  return (
                    <div key={p.id} className="card rounded-2xl p-4 group">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-bold text-white text-sm">{p.name}</div>
                          <div className="text-[10px] text-white/40">{new Date(p.savedAt).toLocaleString()}</div>
                        </div>
                        <div className="font-display text-lg font-black text-orange-300">{pSens.aiScore}</div>
                      </div>
                      <div className="mt-3 grid grid-cols-3 gap-2 text-[10px]">
                        <div className="rounded-lg bg-white/5 p-1.5 text-center">
                          <div className="text-white/40">CAM</div>
                          <div className="font-bold text-white">{pSens.cam.red}%</div>
                        </div>
                        <div className="rounded-lg bg-white/5 p-1.5 text-center">
                          <div className="text-white/40">ADS</div>
                          <div className="font-bold text-white">{pSens.ads.red}%</div>
                        </div>
                        <div className="rounded-lg bg-white/5 p-1.5 text-center">
                          <div className="text-white/40">4x</div>
                          <div className="font-bold text-white">{pSens.cam.scope4}%</div>
                        </div>
                      </div>
                      <div className="mt-3 flex gap-2">
                        <button
                          onClick={() => {
                            const b = BRANDS.find(x => x.id === p.params.brandId);
                            const dev = b?.devices.find(d => d.name === p.params.device.name);
                            if (b && dev) { setBrandId(b.id); setDevice(dev); }
                            setFingers(p.params.fingers);
                            setGyroMode(p.params.gyroMode);
                            setProProfile(p.params.proProfile as ProProfileId);
                            for (const c of WEAPONS) {
                              const w = c.weapons.find(x => x.name === p.params.weaponName);
                              if (w) { setWeaponCatId(c.id); setWeapon(w); break; }
                            }
                          }}
                          className="flex-1 rounded-lg bg-orange-500/10 py-1.5 text-[10px] font-bold text-orange-300 hover:bg-orange-500/20 transition-colors"
                        >
                          ⬆️ {isAr ? "تحميل" : "Load"}
                        </button>
                        <button
                          onClick={() => {
                            const next = profiles.filter(x => x.id !== p.id);
                            setProfiles(next);
                            try { localStorage.setItem(PROFILES_KEY, JSON.stringify(next)); } catch { /* */ }
                          }}
                          className="rounded-lg bg-red-500/10 px-3 py-1.5 text-[10px] font-bold text-red-300 hover:bg-red-500/20 transition-colors"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </RevealSection>
        </section>

        {/* RATING */}
        <section className="py-16">
          <RevealSection>
            <RatingSection />
          </RevealSection>
        </section>

        {/* FOOTER */}
        <footer id="about" className="border-t border-white/10 py-12">
          <div className="text-center">
            <div className="mb-4 font-display text-2xl font-black">
              <span className="shimmer-text">ALYAZOURI</span>
              <span className="text-white"> 2026</span>
            </div>
            <div className="text-sm text-white/50 mb-4">
              {t("footer_rights", lang)}
            </div>
            <div className="font-display text-xs tracking-widest text-orange-300">
              {t("footer_tagline", lang)}
            </div>
            <div className="mt-6 flex justify-center gap-4 text-white/40">
              <a href="https://tiktok.com/@Saeedalyazouri0" target="_blank" rel="noopener noreferrer" className="hover:text-white">TikTok</a>
              <a href="https://instagram.com/Saeedjor11" target="_blank" rel="noopener noreferrer" className="hover:text-white">Instagram</a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
