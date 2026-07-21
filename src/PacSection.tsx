import { useState } from "react";
import { useLang } from "./LanguageContext";
import { t } from "./i18n";

const PAC_URL = "https://alyazouri.github.io/pac/jordan.pac";

function generateDynamicPAC(ips: string[]): string {
  return `function FindProxyForURL(url, host) {
  var jordanIPs = [${ips.map(ip => `"${ip}"`).join(", ")}];
  for (var i = 0; i < jordanIPs.length; i++) {
    if (isInNet(host, jordanIPs[i], "255.255.255.0")) {
      return "DIRECT";
    }
  }
  return "DIRECT";
}`;
}

export function PacSection() {
  const { lang } = useLang();
  const _isAr = lang === "ar"; void _isAr;
  const [enabled, setEnabled] = useState(true);
  const [tab, setTab] = useState<"android" | "ios" | "windows">("android");
  const [copied, setCopied] = useState(false);
  const [customPAC] = useState(false);
  const [showRestart] = useState(false);

  const tabs: { id: "android" | "ios" | "windows"; label: string; icon: string }[] = [
    { id: "android", label: "🤖 Android", icon: "🤖" },
    { id: "ios", label: "🍎 iOS", icon: "🍎" },
    { id: "windows", label: "🪟 Windows", icon: "🪟" },
  ];

  const stepKeys: Record<"android" | "ios" | "windows", string[]> = {
    android: [t("pac_step_android_1", lang), t("pac_step_android_2", lang), t("pac_step_android_3", lang), t("pac_step_android_4", lang)],
    ios:     [t("pac_step_ios_1", lang), t("pac_step_ios_2", lang), t("pac_step_ios_3", lang), t("pac_step_ios_4", lang)],
    windows: [t("pac_step_windows_1", lang), t("pac_step_windows_2", lang), t("pac_step_windows_3", lang)],
  };

  const currentSteps = stepKeys[tab];

  const handleCopy = () => {
    try { navigator.clipboard?.writeText(PAC_URL); } catch { /* */ }
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="pac" className="container-section py-16">
      <div className="card neon-box rounded-3xl p-6 sm:p-8">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-1 text-[10px] font-bold uppercase tracking-widest text-orange-300">{t("pac_eyebrow", lang)}</div>
            <h2 className="font-display text-2xl font-black text-white">{t("pac_title", lang)}</h2>
            <p className="mt-1 text-sm text-white/50">{t("pac_sub", lang)}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-white/50">{t("pac_status", lang)}</span>
            <button
              onClick={() => setEnabled(!enabled)}
              className={`relative h-7 w-12 rounded-full transition-colors ${enabled ? "bg-orange-500" : "bg-white/10"}`}
            >
              <span className={`absolute top-0.5 h-6 w-6 rounded-full bg-white transition-all shadow ${enabled ? "left-6" : "left-0.5"}`} />
            </button>
            <span className={`text-xs font-bold ${enabled ? "text-orange-300" : "text-white/30"}`}>
              {enabled ? t("pac_toggle_on", lang) : t("pac_toggle_off", lang)}
            </span>
          </div>
        </div>

        {enabled && (
          <div className="space-y-5">
            <div className="card rounded-xl p-4">
              <div className="mb-2 flex items-center gap-2">
                <span className="text-sm font-bold text-emerald-300">✅ {t("pac_ready", lang)}</span>
              </div>
              <div className="mb-2 text-xs text-white/50">{t("pac_link_label", lang)}</div>
              <div className="flex items-center gap-2">
                <div className="flex-1 overflow-hidden rounded-lg border border-white/8 bg-black/30 px-3 py-2">
                  <span className="block truncate font-mono text-xs text-orange-300">
                    {customPAC ? generateDynamicPAC(["94.142.37.179","92.253.13.100","46.185.162.241"]).slice(0, 80)+"..." : PAC_URL}
                  </span>
                </div>
                <button onClick={handleCopy} className="btn-primary shrink-0 rounded-lg px-3 py-2 text-xs">
                  {copied ? t("pac_copied", lang) : t("pac_copy", lang)}
                </button>
                <a href={PAC_URL} target="_blank" rel="noopener noreferrer" className="btn-ghost shrink-0 rounded-lg px-3 py-2 text-xs">
                  {t("pac_open", lang)}
                </a>
              </div>
            </div>

            <div className="flex gap-2">
              {tabs.map((tb) => (
                <button
                  key={tb.id}
                  onClick={() => setTab(tb.id)}
                  className={`flex-1 rounded-xl py-2.5 text-xs font-bold transition-all ${
                    tab === tb.id ? "btn-primary" : "btn-ghost"
                  }`}
                >
                  {tb.label}
                </button>
              ))}
            </div>

            <div className="space-y-3">
              {currentSteps.map((step, i) => (
                <div key={i} className="flex items-start gap-3 rounded-xl border border-white/5 bg-black/20 p-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-500/20 text-xs font-black text-orange-300">
                    {i + 1}
                  </div>
                  <span className="text-sm text-white/80">{step}</span>
                </div>
              ))}
            </div>

            {showRestart && (
              <div className="rounded-xl border border-orange-400/20 bg-orange-500/5 p-3 text-xs text-orange-300">
                {t("pac_restart_note", lang)}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
