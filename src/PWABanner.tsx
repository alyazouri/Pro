import { useState, useEffect } from "react";
import { useLang } from "./LanguageContext";

export function PWABanner() {
  const { lang } = useLang();
  const isAr = lang === "ar";
  const [show, setShow] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const dismissed = localStorage.getItem("alyazouri_pwa_dismissed");
    if (dismissed) return;
    const isStandalone = window.matchMedia("(display-mode: standalone)").matches;
    if (isStandalone) return;

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShow(true);
    };
    window.addEventListener("beforeinstallprompt", handler);

    const timer = setTimeout(() => {
      if (!deferredPrompt && !isStandalone) setShow(true);
    }, 5000);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
      clearTimeout(timer);
    };
  }, [deferredPrompt]);

  const handleInstall = async () => {
    if (deferredPrompt) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (deferredPrompt as any).prompt();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (deferredPrompt as any).userChoice;
      setDeferredPrompt(null);
    }
    handleDismiss();
  };

  const handleDismiss = () => {
    setShow(false);
    localStorage.setItem("alyazouri_pwa_dismissed", "true");
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-20 left-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 rounded-2xl border border-orange-400/30 bg-[#0a0a14]/95 p-4 shadow-2xl backdrop-blur-xl">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-red-600 text-xl">📱</div>
        <div className="flex-1">
          <div className="text-sm font-bold text-white">
            {isAr ? "ثبّت التطبيق" : "Install App"}
          </div>
          <div className="mt-0.5 text-xs text-white/60">
            {deferredPrompt ? (
              isAr ? "ثبّت ALYAZOURI على جهازك للوصول السريع" : "Install ALYAZOURI on your device for quick access"
            ) : (
              isAr ? <span>📱 اضغط مشاركة ↗ ثم &quot;أضف للشاشة الرئيسية&quot;</span> : <span>📱 Tap Share ↗ then &quot;Add to Home Screen&quot;</span>
            )}
          </div>
          <div className="mt-3 flex gap-2">
            {deferredPrompt && (
              <button onClick={handleInstall} className="btn-primary rounded-lg px-3 py-1.5 text-xs">
                {isAr ? "تثبيت" : "Install"}
              </button>
            )}
            <button onClick={handleDismiss} className="btn-ghost rounded-lg px-3 py-1.5 text-xs">
              {isAr ? "لاحقاً" : "Later"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
