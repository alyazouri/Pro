import { useState, useEffect } from "react";
import { useLang } from "./LanguageContext";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function PWABanner() {
  const { lang } = useLang();
  const isAr = lang === "ar";
  const [show, setShow] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const dismissed = localStorage.getItem("alyazouri_pwa_dismissed");
    if (dismissed) return;
    const isStandalone = window.matchMedia("(display-mode: standalone)").matches;
    if (isStandalone) return;

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
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
      deferredPrompt.prompt();
      await deferredPrompt.userChoice;
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
              isAr ? "📱 اضغط مشاركة ↗ ثم \"أضف للشاشة الرئيسية\"" : "📱 Tap Share ↗ then \"Add to Home Screen\""
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
