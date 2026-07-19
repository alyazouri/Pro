import { useLang } from "./LanguageContext";
import type { Sens } from "./sensitivity";
import type { Device } from "./data";

interface AIPredictionsProps {
  sens: Sens;
  device: Device;
  fingers: number;
  proProfile: string;
  weaponName: string;
}

export function AIPredictions({ sens, device, fingers, proProfile, weaponName }: AIPredictionsProps) {
  const { lang } = useLang();
  const isAr = lang === "ar";

  // Calculate AI predictions based on sensitivity values
  const calculatePredictions = () => {
    const baseAccuracy = 65;
    const deviceBonus = device.fps >= 120 ? 10 : device.fps >= 90 ? 5 : 0;
    const fingerBonus = fingers >= 4 ? 8 : fingers >= 3 ? 4 : 0;
    const profileBonus = 
      proProfile === "headshot" ? 15 : 
      proProfile === "competitive" ? 10 : 
      proProfile === "sniper" ? 12 : 
      proProfile === "clutcher" ? 8 : 5;
    
    const headshotAccuracy = Math.min(95, baseAccuracy + deviceBonus + fingerBonus + profileBonus);
    const sprayControl = Math.min(98, 60 + (sens.factors.deviceFactor * 20) + (sens.factors.weaponFactor * 15));
    const reactionTime = Math.max(80, 200 - (device.fps * 0.5) - (device.touchRate * 0.02));
    const trackingPower = Math.min(95, 55 + fingerBonus + deviceBonus + (sens.factors.profileFactor * 20));

    return {
      headshotAccuracy: Math.round(headshotAccuracy),
      sprayControl: Math.round(sprayControl),
      reactionTime: Math.round(reactionTime),
      trackingPower: Math.round(trackingPower),
    };
  };

  const predictions = calculatePredictions();

  const stats = [
    {
      icon: "🎯",
      label: isAr ? "دقة الرأس" : "Headshot Accuracy",
      value: predictions.headshotAccuracy,
      suffix: "%",
      color: "from-red-500 to-orange-500",
    },
    {
      icon: "💧",
      label: isAr ? "تحكم الرش" : "Spray Control",
      value: predictions.sprayControl,
      suffix: "%",
      color: "from-emerald-500 to-teal-500",
    },
    {
      icon: "⚡",
      label: isAr ? "زمن رد الفعل" : "Reaction Time",
      value: predictions.reactionTime,
      suffix: "ms",
      color: "from-amber-500 to-yellow-500",
    },
    {
      icon: "🔄",
      label: isAr ? "قوة التتبع" : "Tracking Power",
      value: predictions.trackingPower,
      suffix: "%",
      color: "from-sky-500 to-blue-500",
    },
  ];

  return (
    <div className="card neon-box rounded-2xl p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">🤖</span>
          <div>
            <div className="text-sm font-bold text-white">
              {isAr ? "توقعات الذكاء الاصطناعي" : "AI Predictions"}
            </div>
            <div className="text-[10px] text-white/40">
              {device.name} · {weaponName}
            </div>
          </div>
        </div>
        <span className="rounded-full bg-purple-500/20 px-2 py-0.5 text-[10px] font-bold text-purple-300">
          AI
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-xl border border-white/5 bg-black/20 p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">{stat.icon}</span>
              <span className="text-[10px] text-white/50">{stat.label}</span>
            </div>
            <div className="flex items-end gap-1">
              <span className="font-display text-2xl font-black text-white">{stat.value}</span>
              <span className="text-sm text-white/40 mb-1">{stat.suffix}</span>
            </div>
            <div className="mt-2 h-1.5 rounded-full bg-white/10 overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r ${stat.color} stat-bar`}
                style={{ width: `${stat.suffix === "ms" ? Math.max(0, 100 - stat.value / 2) : stat.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-xl border border-purple-400/20 bg-purple-500/5 p-3">
        <div className="flex items-center gap-2 text-xs">
          <span className="text-purple-300">💡</span>
          <span className="text-white/60">
            {isAr
              ? `مع ${device.fps} FPS و ${fingers} أصابع، يُتوقع تحسن الأداء بنسبة ${Math.round((sens.aiScore / 100) * 30)}%`
              : `With ${device.fps} FPS and ${fingers} fingers, performance improvement of ~${Math.round((sens.aiScore / 100) * 30)}% expected`}
          </span>
        </div>
      </div>
    </div>
  );
}
