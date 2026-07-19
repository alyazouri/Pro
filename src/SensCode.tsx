import { useState } from "react";
import { useLang } from "./LanguageContext";
import type { Sens } from "./sensitivity";

// تحويل الحساسية لكود PUBG Mobile قابل للمشاركة
function generateSensCode(sens: Sens, gyroEnabled: boolean): string {
  const c = sens.cam;
  const a = sens.ads;
  const g = sens.gyro.cam;
  const ga = sens.gyro.ads;

  // تنسيق بسيط: Camera | ADS | Gyro | GyroADS
  const lines = [
    `══ CAMERA ══`,
    `TPP: ${c.tpp}% | FPP: ${c.fpp}%`,
    `No Scope: ${c.noScope}%`,
    `Red Dot: ${c.red}% | 2x: ${c.scope2}% | 3x: ${c.scope3}%`,
    `4x: ${c.scope4}% | 6x: ${c.scope6}% | 8x: ${c.scope8}%`,
    ``,
    `══ ADS ══`,
    `TPP: ${a.tpp}% | FPP: ${a.fpp}%`,
    `No Scope: ${a.noScope}%`,
    `Red Dot: ${a.red}% | 2x: ${a.scope2}% | 3x: ${a.scope3}%`,
    `4x: ${a.scope4}% | 6x: ${a.scope6}% | 8x: ${a.scope8}%`,
  ];

  if (gyroEnabled) {
    lines.push(
      ``,
      `══ GYRO ══`,
      `TPP: ${g.tpp}% | FPP: ${g.fpp}%`,
      `No Scope: ${g.noScope}%`,
      `Red: ${g.red}% | 2x: ${g.scope2}% | 3x: ${g.scope3}%`,
      `4x: ${g.scope4}% | 6x: ${g.scope6}% | 8x: ${g.scope8}%`,
      ``,
      `══ GYRO ADS ══`,
      `TPP: ${ga.tpp}% | FPP: ${ga.fpp}%`,
      `No Scope: ${ga.noScope}%`,
      `Red: ${ga.red}% | 2x: ${ga.scope2}% | 3x: ${ga.scope3}%`,
      `4x: ${ga.scope4}% | 6x: ${ga.scope6}% | 8x: ${ga.scope8}%`,
    );
  }

  lines.push(
    ``,
    `══ FREE LOOK ══`,
    `Camera: ${sens.freeLook.cam}% | Parachute: ${sens.freeLook.parashoot}% | Vehicle: ${sens.freeLook.vehicle}%`,
    ``,
    `══ GAMEPLAY ══`,
    `Sprint: ${sens.gameplay.sprintSensitivity}% | Joystick: ${sens.gameplay.joystickSize}%`,
    `TPP FOV: ${sens.gameplay.tppFOV}% | FPP FOV: ${sens.gameplay.fppFOV}%`,
  );

  return lines.join("\n");
}

interface Props {
  sens: Sens;
  deviceName: string;
  weaponName: string;
  profileName: string;
  fingers: number;
  gyroMode: string;
}

export function SensCode({ sens, deviceName, weaponName, profileName, fingers, gyroMode }: Props) {
  const { lang } = useLang();
  const isAr = lang === "ar";
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const gyroEnabled = gyroMode !== "off";

  const header = `🦅 ALYAZOURI 2026\n📱 ${deviceName}\n🔫 ${weaponName}\n👤 ${profileName} | ${fingers}F | Gyro: ${gyroMode}\n🏆 AI Score: ${sens.aiScore}/100\n`;
  const code = header + "\n" + generateSensCode(sens, gyroEnabled);

  const handleCopy = () => {
    try { navigator.clipboard?.writeText(code); } catch { /* */ }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    const text = encodeURIComponent(code);
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  return (
    <div className="card neon-box rounded-2xl p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">📋</span>
          <div>
            <div className="text-sm font-bold text-white">
              {isAr ? "كود الحساسية الكامل" : "Full Sensitivity Code"}
            </div>
            <div className="text-[10px] text-white/40">
              {isAr ? "جاهز للنسخ والمشاركة" : "Ready to copy & share"}
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={handleCopy} className="btn-primary rounded-lg px-3 py-1.5 text-xs">
            {copied ? "✅" : "📋"} {isAr ? (copied ? "تم" : "نسخ") : (copied ? "Done" : "Copy")}
          </button>
          <button onClick={handleShare} className="btn-ghost rounded-lg px-3 py-1.5 text-xs">
            📤 {isAr ? "مشاركة" : "Share"}
          </button>
        </div>
      </div>

      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left"
      >
        <div className={`rounded-xl bg-black/40 border border-white/5 p-4 font-mono text-[11px] text-emerald-300/90 leading-relaxed whitespace-pre-wrap transition-all ${expanded ? "max-h-[600px]" : "max-h-32"} overflow-hidden`}>
          {code}
        </div>
        <div className="mt-2 text-center text-[10px] text-white/30">
          {expanded ? (isAr ? "▲ إخفاء" : "▲ Collapse") : (isAr ? "▼ عرض الكود الكامل" : "▼ Show full code")}
        </div>
      </button>
    </div>
  );
}
