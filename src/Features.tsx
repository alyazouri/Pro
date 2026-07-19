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

export function useNightMode() {
  const [night, setNight] = useState(() => {
    try { return localStorage.getItem(NIGHT_KEY) === "true"; } catch { return false; }
  });

  useEffect(() => {
    document.body.classList.toggle("gaming-mode", night);
    try { localStorage.setItem(NIGHT_KEY, String(night)); } catch { /* */ }
  }, [night]);

  return {
    night,
    toggleNight: () => setNight((n: boolean) => !n),
  };
}

export function NightModeToggle() {
  const { lang } = useLang();
  const { night, toggleNight } = useNightMode();
  const isAr = lang === "ar";
  return (
    <button
      onClick={toggleNight}
      className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold transition-all ${
        night ? "bg-indigo-500/20 text-indigo-300 border border-indigo-400/30" : "btn-ghost"
      }`}
      title={isAr ? "وضع الألعاب الليلي" : "Gaming Night Mode"}
    >
      <span className="text-lg">{night ? "🌙" : "☀️"}</span>
    </button>
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
                className={`text-3xl transition-all ${s <= activeRating ? "scale-110 opacity-100" : "opacity-30 hover:opacity-50"}`}
              >
                ⭐
              </button>
            ))}
          </div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder={isAr ? "أضف تعليقك (اختياري)..." : "Add a comment (optional)..."}
            className="w-full rounded-xl border border-white/10 bg-black/30 p-3 text-sm text-white placeholder-white/30 focus:border-orange-400/50 focus:outline-none"
            rows={3}
          />
          <button
            onClick={handleSubmit}
            disabled={rating === 0}
            className="btn-primary mt-3 w-full rounded-xl py-3 text-sm disabled:opacity-50"
          >
            {isAr ? "إرسال التقييم" : "Submit Rating"}
          </button>
        </>
      )}
    </div>
  );
}
