import { useLang } from "./LanguageContext";
import type { Sens } from "./sensitivity";
import type { Device, ProProfile } from "./data";

interface Props {
  sens: Sens;
  device: Device;
  fingers: number;
  gyroMode: string;
  profile: ProProfile;
  weaponType: string;
}

interface Tip {
  icon: string;
  text: string;
  priority: "high" | "medium" | "info";
}

export function SmartTips({ sens, device, fingers, gyroMode, profile, weaponType }: Props) {
  const { lang } = useLang();
  const isAr = lang === "ar";

  const tips: Tip[] = [];

  // ── تحليل الجايرو ──
  if (gyroMode === "off" && device.gyroQuality === "excellent") {
    tips.push({
      icon: "🌀",
      text: isAr
        ? "جهازك يملك جايرو ممتاز — جرّب تفعيله على السكوب لتحسين الدقة بنسبة 20-30%"
        : "Your device has excellent gyro — try enabling Scope Only for 20-30% accuracy boost",
      priority: "high",
    });
  }

  if (gyroMode === "always" && device.gyroQuality === "average") {
    tips.push({
      icon: "⚠️",
      text: isAr
        ? "جايرو جهازك متوسط — وضع 'سكوب فقط' أفضل لتجنب الاهتزاز"
        : "Your gyro quality is average — 'Scope Only' mode is better to avoid shakiness",
      priority: "high",
    });
  }

  // ── تحليل الأصابع ──
  if (fingers <= 2 && (profile.category === "aggressive" || profile.id === "rusher" || profile.id === "entry_fragger")) {
    tips.push({
      icon: "✋",
      text: isAr
        ? "بروفايل عدواني مع إبهامين صعب — جرّب 3-4 أصابع للتحكم بالرش والحركة معاً"
        : "Aggressive profile with 2 thumbs is hard — try 3-4 fingers for spray+movement control",
      priority: "high",
    });
  }

  if (fingers >= 5 && profile.id === "camper") {
    tips.push({
      icon: "💡",
      text: isAr
        ? "5+ أصابع مع بروفايل دفاعي؟ جرّب Clutcher أو Competitive للاستفادة من التحكم"
        : "5+ fingers with defensive profile? Try Clutcher or Competitive to use your control advantage",
      priority: "medium",
    });
  }

  // ── تحليل السلاح ──
  if (weaponType === "sniper" && profile.id === "rusher") {
    tips.push({
      icon: "🎯",
      text: isAr
        ? "بروفايل راشر مع قناصة — TPP/FPP سريعة لكن السكوبات ممكن تكون سريعة جداً. جرّب Sniper Elite"
        : "Rusher profile with sniper — TPP/FPP is fast but scopes might be too fast. Try Sniper Elite",
      priority: "medium",
    });
  }

  if (weaponType === "lmg" && gyroMode === "off") {
    tips.push({
      icon: "💧",
      text: isAr
        ? "الرشاشات الثقيلة تحتاج جايرو للتحكم بالارتداد المستمر — فعّل الجايرو"
        : "LMGs need gyro for continuous recoil control — enable gyroscope",
      priority: "medium",
    });
  }

  // ── تحليل الجهاز ──
  if (device.fps <= 60 && sens.cam.tpp > 140) {
    tips.push({
      icon: "📱",
      text: isAr
        ? "حساسية Camera عالية على 60 FPS قد تسبب تأخر — جرّب تخفيض 10-15%"
        : "High Camera sensitivity on 60 FPS may cause delay — try reducing 10-15%",
      priority: "medium",
    });
  }

  if (device.screenSize >= 11 && sens.gameplay.joystickSize < 80) {
    tips.push({
      icon: "🕹️",
      text: isAr
        ? "شاشة كبيرة مع جويستك صغير — زوّد حجم الجويستك للراحة"
        : "Big screen with small joystick — increase joystick size for comfort",
      priority: "info",
    });
  }

  // ── نصائح التمرين ──
  tips.push({
    icon: "🏋️",
    text: isAr
      ? `تمرين: ${profile.id === "sniper" ? "ادخل Training Ground وتمرن Quickscope × 20 على أهداف متحركة" : profile.id === "spray" ? "تمرن رش M416 على 50-100 متر × 10 مرات" : "تمرن 5 دقائق TDM ثم 5 دقائق رش على الحائط"}`
      : `Drill: ${profile.id === "sniper" ? "Enter Training Ground, practice Quickscope ×20 on moving targets" : profile.id === "spray" ? "Practice M416 spray at 50-100m ×10 times" : "5 min TDM warmup + 5 min wall spray practice"}`,
    priority: "info",
  });

  if (tips.length === 0) return null;

  const priorityColor = {
    high: "border-red-500/30 bg-red-500/5",
    medium: "border-amber-500/30 bg-amber-500/5",
    info: "border-sky-500/20 bg-sky-500/5",
  };
  const priorityText = {
    high: "text-red-300",
    medium: "text-amber-300",
    info: "text-sky-300",
  };

  return (
    <div className="card rounded-2xl p-5">
      <div className="mb-4 flex items-center gap-2">
        <span className="text-xl">🧠</span>
        <div>
          <div className="text-sm font-bold text-white">
            {isAr ? "نصائح ذكية" : "Smart Tips"}
          </div>
          <div className="text-[10px] text-white/40">
            {isAr ? "مخصصة لإعداداتك الحالية" : "Personalized for your current setup"}
          </div>
        </div>
      </div>
      <div className="space-y-2">
        {tips.map((tip, i) => (
          <div key={i} className={`rounded-xl border p-3 ${priorityColor[tip.priority]}`}>
            <div className={`flex items-start gap-2 text-xs ${priorityText[tip.priority]}`}>
              <span className="text-base shrink-0">{tip.icon}</span>
              <span className="leading-relaxed">{tip.text}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
