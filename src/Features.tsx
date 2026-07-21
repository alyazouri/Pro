import { useState, useEffect, useRef } from "react";
import { useLang } from "./LanguageContext";

// ============ SCROLL REVEAL HOOK ============
export function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add("visible"); },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

export function RevealSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useReveal();
  return (
    <div ref={ref} className={`reveal ${delay === 1 ? "reveal-delay-1" : delay === 2 ? "reveal-delay-2" : delay === 3 ? "reveal-delay-3" : ""} ${className}`}>
      {children}
    </div>
  );
}

// ============ GAMING NIGHT MODE ============
const NIGHT_KEY = "alyazouri_night_mode";
const NIGHT_AUTO_KEY = "alyazouri_night_auto";

function getSunsetHour(lat: number, lng: number): number {
  const now = new Date();
  const dayOfYear = Math.floor((now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / 86400000);
  const zenith = 90.833;
  const D2R = Math.PI / 180;
  const R2D = 180 / Math.PI;
  const lngHour = lng / 15;
  const t = dayOfYear + ((18 - lngHour) / 24);
  const M = (0.9856 * t) - 3.289;
  const L = M + (1.916 * Math.sin(M * D2R)) + (0.020 * Math.sin(2 * M * D2R)) + 282.634;
  let Lnorm = L % 360; if (Lnorm < 0) Lnorm += 360;
  const RA = R2D * Math.atan(0.91764 * Math.tan(Lnorm * D2R));
  let RAnorm = RA % 360;
  const Lquadrant = (Math.floor(Lnorm / 90)) * 90;
  const RAquadrant = (Math.floor(RAnorm / 90)) * 90;
  RAnorm = RAnorm + (Lquadrant - RAquadrant);
  RAnorm /= 15;
  const sinDec = 0.39782 * Math.sin(Lnorm * D2R);
  const cosDec = Math.cos(Math.asin(sinDec));
  const cosH = (Math.cos(zenith * D2R) - (sinDec * Math.sin(lat * D2R))) / (cosDec * Math.cos(lat * D2R));
  if (cosH > 1) return 18;
  if (cosH < -1) return 6;
  const H = R2D * Math.acos(cosH) / 15;
  return RAnorm + H + (lngHour - lng / 15);
}

export function useNightMode() {
  const [night, setNight] = useState(() => {
    try { return localStorage.getItem(NIGHT_KEY) === "true"; } catch { return false; }
  });
  const [autoMode, setAutoMode] = useState(() => {
    try { return localStorage.getItem(NIGHT_AUTO_KEY) !== "false"; } catch { return true; }
  });

  useEffect(() => {
    if (!autoMode) return;
    const check = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const sunset = getSunsetHour(pos.coords.latitude, pos.coords.longitude);
            const sunrise = 24 - (sunset - 6);
            const hour = new Date().getHours();
            const shouldBeNight = hour >= Math.floor(sunset) || hour < Math.floor(sunrise);
            if (shouldBeNight !== night) {
              setNight(shouldBeNight);
              try { localStorage.setItem(NIGHT_KEY, String(shouldBeNight)); } catch { /* */ }
            }
          },
          () => { /* fallback */ },
          { timeout: 3000 }
        );
      } else {
        const mq = window.matchMedia("(prefers-color-scheme: dark)");
        if (mq.matches !== night) {
          setNight(mq.matches);
          try { localStorage.setItem(NIGHT_KEY, String(mq.matches)); } catch { /* */ }
        }
      }
    };
    check();
    const interval = setInterval(check, 600000);
    return () => clearInterval(interval);
  }, [autoMode, night]);

  useEffect(() => {
    document.body.classList.toggle("gaming-mode", night);
    try { localStorage.setItem(NIGHT_KEY, String(night)); } catch { /* */ }
  }, [night]);

  return {
    night,
    autoMode,
    toggleNight: () => { setAutoMode(false); setNight((n: boolean) => !n); },
    toggleAuto: () => { setAutoMode((a: boolean) => !a); try { localStorage.setItem(NIGHT_AUTO_KEY, String(!autoMode)); } catch { /* */ } },
  };
}

export function NightModeToggle() {
  const { lang } = useLang();
  const { night, autoMode, toggleNight, toggleAuto } = useNightMode();
  const isAr = lang === "ar";
  return (
    <div className="flex items-center gap-1">
      <button
        onClick={toggleNight}
        className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold transition-all ${
          night ? "bg-indigo-500/20 text-indigo-300 border border-indigo-400/30" : "btn-ghost"
        }`}
        title={isAr ? "وضع الألعاب الليلي" : "Gaming Night Mode"}
      >
        <span className="text-lg">{night ? "🌙" : "☀️"}</span>
      </button>
      <button
        onClick={toggleAuto}
        className={`rounded-lg px-2 py-2 text-[10px] font-bold transition-all ${
          autoMode ? "text-emerald-400 bg-emerald-500/10" : "text-white/30 bg-white/5"
        }`}
        title={isAr ? "تلقائي: حسب الغروب" : "Auto: sunset-based"}
      >
        🕐
      </button>
    </div>
  );
}

// ============ RATING SYSTEM ============
const RATING_KEY = "alyazouri_rating_v1";

interface RatingData { rating: number; comment: string; savedAt: number; }

export function RatingSection() {
  const { lang } = useLang();
  const isAr = lang === "ar";
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [saved, setSaved] = useState<RatingData | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(RATING_KEY);
      if (raw) {
        const data = JSON.parse(raw) as RatingData;
        setSaved(data); setRating(data.rating); setComment(data.comment); setSubmitted(true);
      }
    } catch { /* */ }
  }, []);

  const handleSubmit = () => {
    if (rating === 0) return;
    const data: RatingData = { rating, comment, savedAt: Date.now() };
    try { localStorage.setItem(RATING_KEY, JSON.stringify(data)); } catch { /* */ }
    setSaved(data); setSubmitted(true);
  };

  const stars = [1, 2, 3, 4, 5];
  const activeRating = hoverRating || rating;

  return (
    <div className="card neon-box rounded-2xl p-6">
      <div className="mb-4 flex items-center gap-2">
        <span className="text-2xl">💬</span>
        <h3 className="font-display text-lg font-bold text-white">
          {isAr ? "قيّم تجربتك" : "Rate Your Experience"}
        </h3>
      </div>

      {submitted && saved ? (
        <div className="py-4 text-center">
          <div className="mb-3 text-4xl">🎉</div>
          <div className="mb-1 text-lg font-bold text-white">
            {isAr ? "شكراً لتقييمك!" : "Thanks for your rating!"}
          </div>
          <div className="mb-3 flex justify-center gap-1">
            {stars.map((s) => (
              <span key={s} className={`text-2xl ${s <= saved.rating ? "opacity-100" : "opacity-20"}`}>⭐</span>
            ))}
          </div>
          {saved.comment && (
            <div className="mx-auto max-w-sm rounded-xl border border-white/5 bg-black/30 p-3 text-sm text-white/70">
              &ldquo;{saved.comment}&rdquo;
            </div>
          )}
          <button onClick={() => { setSubmitted(false); setSaved(null); }} className="mt-4 text-xs text-orange-300 hover:text-orange-200">
            {isAr ? "تعديل التقييم" : "Edit rating"}
          </button>
        </div>
      ) : (
        <>
          <div className="mb-4 flex justify-center gap-2">
            {stars.map((s) => (
              <button
                key={s}
                onMouseEnter={() => setHoverRating(s)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(s)}
                className={`text-3xl transition-transform hover:scale-110 ${s <= activeRating ? "opacity-100" : "opacity-20"}`}
              >
                ⭐
              </button>
            ))}
          </div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder={isAr ? "تعليق اختياري..." : "Optional comment..."}
            className="mb-3 w-full resize-none rounded-xl border border-white/8 bg-black/20 p-3 text-sm text-white placeholder-white/30 focus:border-orange-400/40 focus:outline-none"
            rows={2}
          />
          <button
            onClick={handleSubmit}
            disabled={rating === 0}
            className="btn-primary w-full rounded-xl py-2.5 text-sm disabled:opacity-40"
          >
            {isAr ? "إرسال التقييم" : "Submit Rating"}
          </button>
        </>
      )}
    </div>
  );
}

// ============ AI PREDICTIONS ============
export function AIPredictions({ aiScore, styleId, fingers, gyroMode }: {
  aiScore: number; styleId: string; fingers: number; gyroMode: string;
}) {
  const { lang } = useLang();
  const isAr = lang === "ar";

  const headshot = Math.min(99, Math.round(aiScore * 0.72 + fingers * 2.1));
  const stability = Math.min(99, Math.round(aiScore * 0.68 + (gyroMode !== "off" ? 15 : 0)));
  const tracking = Math.min(99, Math.round(aiScore * 0.75 + (styleId === "aggressive" ? 10 : 0)));
  const clutch = Math.min(99, Math.round(aiScore * 0.60 + fingers * 1.5));

  const preds = [
    { label: isAr ? "دقة الهيدشوت" : "Headshot Accuracy", value: headshot, icon: "🎯", color: "from-red-500 to-rose-400" },
    { label: isAr ? "ثبات الرش" : "Spray Stability", value: stability, icon: "💧", color: "from-blue-500 to-cyan-400" },
    { label: isAr ? "تتبع الهدف" : "Target Tracking", value: tracking, icon: "🔄", color: "from-emerald-500 to-teal-400" },
    { label: isAr ? "قوة الكلاتش" : "Clutch Power", value: clutch, icon: "⚡", color: "from-amber-500 to-orange-400" },
  ];

  return (
    <div className="card rounded-2xl p-4">
      <div className="mb-3 flex items-center gap-2">
        <span className="text-lg">🤖</span>
        <span className="font-display text-sm font-bold text-orange-300">
          {isAr ? "تنبؤات الذكاء الاصطناعي" : "AI Predictions"}
        </span>
      </div>
      <div className="space-y-3">
        {preds.map((p) => (
          <div key={p.label}>
            <div className="mb-1 flex items-center justify-between text-xs">
              <span className="text-white/70">{p.icon} {p.label}</span>
              <span className="font-bold text-white">{p.value}%</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
              <div className={`h-full rounded-full bg-gradient-to-r ${p.color} stat-bar`} style={{ width: `${p.value}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============ AI COACH ============
export function AICoach({ aiScore, styleId, fingers, gyroMode, weaponType }: {
  aiScore: number; styleId: string; fingers: number; gyroMode: string; weaponType: string;
}) {
  const { lang } = useLang();
  const isAr = lang === "ar";

  const tips: string[] = [];

  if (gyroMode === "off" && aiScore < 70) {
    tips.push(isAr ? "💡 تفعيل الجايرو سيزيد نقاطك بشكل ملحوظ" : "💡 Enabling gyro will significantly boost your score");
  }
  if (fingers < 4) {
    tips.push(isAr ? "🖐️ استخدام 4+ أصابع يحسن التحكم كثيراً" : "🖐️ Using 4+ fingers greatly improves control");
  }
  if (styleId === "balanced" && weaponType === "sniper") {
    tips.push(isAr ? "🔭 بروفايل Sniper Elite أفضل لهذا السلاح" : "🔭 Sniper Elite profile is better for this weapon");
  }
  if (aiScore >= 85) {
    tips.push(isAr ? "🏆 إعداداتك في مستوى اللاعبين المحترفين!" : "🏆 Your settings are at pro player level!");
  }
  if (tips.length === 0) {
    tips.push(isAr ? "✅ إعداداتك متوازنة جيداً للوضع الحالي" : "✅ Your settings are well balanced for this setup");
  }

  return (
    <div className="card rounded-2xl p-4 border border-orange-400/10">
      <div className="mb-3 flex items-center gap-2">
        <span className="text-lg">🧠</span>
        <span className="font-display text-sm font-bold text-orange-300">
          {isAr ? "AI Coach" : "AI Coach"}
        </span>
      </div>
      <div className="space-y-2">
        {tips.map((tip, i) => (
          <div key={i} className="rounded-lg border border-white/5 bg-black/20 px-3 py-2 text-xs text-white/80">
            {tip}
          </div>
        ))}
      </div>
    </div>
  );
}
