import { useState, useRef } from "react";
import { useLang } from "./LanguageContext";

export function ScreenRecorder() {
  const { lang } = useLang();
  const isAr = lang === "ar";
  const [recording, setRecording] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: false });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "video/webm" });
        const url = URL.createObjectURL(blob);
        setVideoUrl(url);
        stream.getTracks().forEach((t) => t.stop());
      };

      mediaRecorder.start();
      setRecording(true);
    } catch { /* user cancelled */ }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setRecording(false);
  };

  const download = () => {
    if (!videoUrl) return;
    const a = document.createElement("a");
    a.href = videoUrl;
    a.download = `alyazouri_${Date.now()}.webm`;
    a.click();
  };

  return (
    <div className="card rounded-2xl p-5">
      <div className="mb-4 flex items-center gap-2">
        <span className="text-2xl">🎥</span>
        <h3 className="font-display text-base font-bold text-white">
          {isAr ? "تسجيل الشاشة" : "Screen Recorder"}
        </h3>
        {recording && (
          <span className="ml-auto flex items-center gap-1 rounded-full bg-red-500/20 px-2 py-0.5 text-[10px] font-bold text-red-300">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />
            REC
          </span>
        )}
      </div>
      <div className="flex gap-2">
        {!recording ? (
          <button onClick={startRecording} className="btn-primary flex-1 rounded-xl py-2.5 text-sm">
            {isAr ? "🔴 ابدأ التسجيل" : "🔴 Start Recording"}
          </button>
        ) : (
          <button onClick={stopRecording} className="flex-1 rounded-xl bg-red-500/20 py-2.5 text-sm font-bold text-red-300 transition hover:bg-red-500/30">
            ⏹ {isAr ? "إيقاف" : "Stop"}
          </button>
        )}
        {videoUrl && (
          <button onClick={download} className="btn-ghost rounded-xl px-4 py-2.5 text-sm">
            ⬇️ {isAr ? "تحميل" : "Download"}
          </button>
        )}
      </div>
      <p className="mt-2 text-[10px] text-white/30">
        {isAr ? "100% من جانب العميل — لا يوجد خادم" : "100% client-side — no server needed"}
      </p>
    </div>
  );
}
