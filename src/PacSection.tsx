import { useState } from "react";
import { useLang } from "./LanguageContext";
import { t } from "./i18n";

const PAC_URL = "https://raw.githubusercontent.com/AliYazouri/pac/main/proxy.pac";

export function PacSection() {
  const { lang } = useLang();
  const isAr = lang === "ar";
  const [enabled, setEnabled] = useState(true);
  const [copied, setCopied] = useState(false);
  const [tab, setTab] = useState<"android" | "ios" | "windows">("android");

  const steps: Record<string, string[]> = {
    android: isAr ? [
      "انسخ الرابط أعلاه",
      "افتح إعدادات WiFi ← اختر الشبكة ← Advanced ← Proxy",
      "اختر Auto Config ثم الصق الرابط",
      "احفظ وأعد تشغيل PUBG Mobile"
    ] : [
      "Copy the link above",
      "Open WiFi settings ← select network ← Advanced ← Proxy",
      "Select Auto Config and paste the URL",
      "Save and restart PUBG Mobile"
    ],
    ios: isAr ? [
      "انسخ الرابط أعلاه",
      "Settings → WiFi → اختر الشبكة → Configure Proxy",
      "اختر Automatic ثم الصق الرابط في URL",
      "احفظ وأعد تشغيل اللعبة"
    ] : [
      "Copy the link above",
      "Settings → WiFi → select network → Configure Proxy",
      "Select Automatic and paste URL",
      "Save and restart the game"
    ],
    windows: isAr ? [
      "انسخ الرابط أعلاه",
      "Settings → Network & Internet → Proxy",
      "Use setup script → الصق الرابط → Save"
    ] : [
      "Copy the link above",
      "Settings → Network & Internet → Proxy",
      "Use setup script → paste URL → Save"
    ],
  };

  const handleCopy = () => {
    try { navigator.clipboard?.writeText(PAC_URL); } catch { /* */ }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tabs = [
    { id: "android" as const, icon: "🤖", label: "Android" },
    { id: "ios" as const, icon: "🍎", label: "iOS" },
    { id: "windows" as const, icon: "🪟", label: "Windows" },
  ];

  return (
    <div className="card neon-box rounded-3xl p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="text-[10px] uppercase tracking-widest text-white/40">{t("pac_eyebrow", lang)}</div>
          <h2 className="font-display text-xl font-black text-white sm:text-2xl">{t("pac_title", lang)}</h2>
          <p className="mt-1 text-sm text-white/50">{t("pac_sub", lang)}</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-white/40">{t("pac_status", lang)}</span>
          <button
            onClick={() => setEnabled(!enabled)}
            className={`relative h-7 w-14 rounded-full transition-colors ${enabled ? "bg-emerald-500" : "bg-white/20"}`}
          >
            <span className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all ${enabled ? "left-8" : "left-1"}`} />
          </button>
          <span className={`text-xs font-bold ${enabled ? "text-emerald-300" : "text-white/40"}`}>
            {enabled ? t("pac_enabled", lang) : t("pac_disabled", lang)}
          </span>
        </div>
      </div>

      {enabled && (
        <div className="mt-6 space-y-4">
          <div className="rounded-xl border border-orange-400/20 bg-orange-500/5 p-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-300">✅ {isAr ? "جاهز للتثبيت" : "Ready to Install"}</span>
            </div>
            <div className="text-[10px] uppercase tracking-widest text-white/40">
              {isAr ? "رابط PAC Script" : "PAC Script URL"}
            </div>
            <div className="mt-2 flex items-center gap-2">
              <code className="flex-1 truncate rounded-lg bg-black/30 px-3 py-2 text-xs text-orange-300">
                {PAC_URL}
              </code>
              <button
                onClick={handleCopy}
                className="btn-primary rounded-lg px-3 py-2 text-xs whitespace-nowrap"
              >
                {copied ? "✅" : "📋"}
              </button>
            </div>
          </div>

          <div className="flex gap-2">
            {tabs.map((tb) => (
              <button
                key={tb.id}
                onClick={() => setTab(tb.id)}
                className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-semibold transition-all ${
                  tab === tb.id ? "bg-orange-500/20 text-orange-300 border border-orange-400/30" : "btn-ghost"
                }`}
              >
                <span>{tb.icon}</span>
                <span>{tb.label}</span>
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {steps[tab].map((step, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-500/20 text-xs font-bold text-orange-300">
                  {i + 1}
                </span>
                <span className="text-sm text-white/70">{step}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
