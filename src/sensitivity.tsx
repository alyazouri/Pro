import { useLang } from "./LanguageContext";
import { t } from "./i18n";
import { getWeaponProfile } from "./weaponProfiles";
import { PRO_PROFILES, type Device, type ProProfileId } from "./data";

export type GyroMode = "off" | "scope" | "always";

export type SensParams = {
  deviceId: string;
  device: Device;
  brandId: string;
  fingers: number;
  gyroMode: GyroMode;
  weaponId: string;
  weaponName: string;
  weaponRecoil: number;
  weaponRange: number;
  weaponType: string;
  proProfile: string;
};

export type ScopeSens = {
  tpp: number; fpp: number; noScope: number; red: number;
  scope2: number; scope3: number; scope4: number; scope6: number; scope8: number;
};

export type GameplaySettings = {
  sprintSensitivity: number;
  joystickSize: number;
  tppFOV: number;
  fppFOV: number;
};

export type Sens = {
  cam: ScopeSens;
  ads: ScopeSens;
  gyro: { cam: ScopeSens; ads: ScopeSens };
  freeLook: { cam: number; parashoot: number; vehicle: number };
  gameplay: GameplaySettings;
  aiScore: number;
  factors: { deviceFactor: number; weaponFactor: number; fingerFactor: number; profileFactor: number };
};

// ═══════════════════════════════════════════════════════════════
//  PUBG MOBILE GLOBAL 2026 — ENGINE V5 FINAL
//
//  4 أنظمة مستقلة:
//    Camera:   للمسح بدون إطلاق — "as LOW as you can control"
//    ADS:      للتتبع أثناء الإطلاق — "as HIGH as you can control"
//    Gyro:     تعديل بميلان الجهاز بدون إطلاق
//    Gyro ADS: تحكم بالارتداد بميلان الجهاز أثناء الإطلاق
//
//  كل scope مستقل. كل نظام مستقل.
//  القيم الأساسية هي الهدف النهائي.
//  التعديلات إضافية (+/-) وليست مضاعفات تراكمية.
// ═══════════════════════════════════════════════════════════════

const ROWS: (keyof ScopeSens)[] = ["tpp","fpp","noScope","red","scope2","scope3","scope4","scope6","scope8"];
const HIPFIRE: (keyof ScopeSens)[] = ["tpp","fpp","noScope"];

export const SCOPE_DEFS: { key: keyof ScopeSens; icon: string; labelKey: string }[] = [
  { key: "tpp", icon: "👁️", labelKey: "sens_tpp" },
  { key: "fpp", icon: "👁️", labelKey: "sens_fpp" },
  { key: "red", icon: "🔴", labelKey: "sens_red_dot" },
  { key: "scope2", icon: "🎯", labelKey: "sens_2x" },
  { key: "scope3", icon: "🎯", labelKey: "sens_3x" },
  { key: "scope4", icon: "🔭", labelKey: "sens_4x" },
  { key: "scope6", icon: "🔭", labelKey: "sens_6x" },
  { key: "scope8", icon: "🔭", labelKey: "sens_8x" },
];

const cl = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

// ═══════════════════════════════════════════════════════════════
//  TARGET VALUES — القيم المستهدفة النهائية
//  هذه هي القيم التي يجب أن يخرجها المحرك لـ:
//    Balanced profile, 4 Fingers, 120Hz phone, AR weapon
//  أي تعديل يكون +/- حول هذه القيم
// ═══════════════════════════════════════════════════════════════
const TARGET = {
  cam: {
    tpp: 130, fpp: 120, noScope: 100,
    red: 55, scope2: 42, scope3: 33,
    scope4: 26, scope6: 14, scope8: 9,
  },
  ads: {
    tpp: 105, fpp: 102, noScope: 130,
    red: 60, scope2: 45, scope3: 30,
    scope4: 22, scope6: 15, scope8: 10,
  },
  gyro: {
    tpp: 250, fpp: 240, noScope: 220,
    red: 200, scope2: 170, scope3: 130,
    scope4: 100, scope6: 55, scope8: 30,
  },
  gyroAds: {
    tpp: 280, fpp: 270, noScope: 260,
    red: 240, scope2: 200, scope3: 160,
    scope4: 120, scope6: 65, scope8: 40,
  },
};

// ═══════════════════════════════════════════════════════════════
//  DEVICE OFFSET — تعديل إضافي (+/-) بدل مضاعف تراكمي
// ═══════════════════════════════════════════════════════════════
function deviceOffset(device: Device) {
  // كل عامل يعطي offset صغير يُضاف/يُطرح من القيمة المستهدفة
  // بدل ما يُضرب ويغيّر القيمة بشكل كبير

  // FPS: أعلى = أدق = نخفض قليل
  const fpsOff =
    device.fps >= 165 ? -0.06 :
    device.fps >= 144 ? -0.04 :
    device.fps >= 120 ? -0.02 :
    device.fps >= 90  ?  0.00 :
    device.fps >= 60  ?  0.00 : 0.04;

  // Touch: أعلى = أدق
  const touchOff =
    device.touchRate >= 720 ? -0.03 :
    device.touchRate >= 480 ? -0.02 :
    device.touchRate >= 240 ?  0.00 :
    0.02;

  // شاشة: أكبر = أكثر حساسية مطلوبة
  const screenOff =
    device.screenSize >= 13  ?  0.18 :
    device.screenSize >= 11  ?  0.12 :
    device.screenSize >= 8   ?  0.04 :
    device.screenSize >= 6.5 ?  0.00 : -0.03;

  // Gyro hardware
  const gyroOff =
    device.gyroQuality === "excellent" ?  0.00 :
    device.gyroQuality === "good"      ? -0.08 : -0.18;

  return {
    camOff: fpsOff + touchOff + screenOff,
    adsOff: fpsOff + touchOff + screenOff,
    gyroOff: fpsOff + touchOff + screenOff + gyroOff,
  };
}

// ═══════════════════════════════════════════════════════════════
//  FINGER OFFSET
// ═══════════════════════════════════════════════════════════════
function fingerOffset(fingers: number) {
  switch (fingers) {
    case 2: return { cam:  0.08, ads:  0.06, gyro: -0.12, gyroAds: -0.10 };
    case 3: return { cam:  0.04, ads:  0.03, gyro: -0.06, gyroAds: -0.04 };
    case 4: return { cam:  0.00, ads:  0.00, gyro:  0.00, gyroAds:  0.00 };
    case 5: return { cam: -0.04, ads: -0.02, gyro:  0.04, gyroAds:  0.03 };
    case 6: return { cam: -0.07, ads: -0.04, gyro:  0.07, gyroAds:  0.05 };
    default: return { cam: 0, ads: 0, gyro: 0, gyroAds: 0 };
  }
}

// ═══════════════════════════════════════════════════════════════
//  WEAPON OFFSET — مختلف لكل نظام
// ═══════════════════════════════════════════════════════════════
function weaponOffset(type: string, recoil: number, _fireRate: number) {
  const r = recoil / 100;

  let cam = 0, ads = 0, gyro = 0, gyroAds = 0;

  switch (type) {
    case "ar":      cam =  0.00; ads =  0.00; gyro =  0.00; gyroAds =  0.00; break;
    case "smg":     cam =  0.05; ads = -0.03; gyro =  0.08; gyroAds =  0.06; break;
    // DMR و Sniper يتم التعامل معهم في sniperScopeOverride بشكل مستقل لكل سكوب
    // هنا نضع offset صفري — الضبط الدقيق يحصل في المحرك الرئيسي
    case "dmr":     cam =  0.00; ads =  0.00; gyro =  0.00; gyroAds =  0.00; break;
    case "sniper":  cam =  0.00; ads =  0.00; gyro =  0.00; gyroAds =  0.00; break;
    case "lmg":     cam =  0.00; ads =  0.04; gyro =  0.05; gyroAds =  0.04; break;
    case "shotgun": cam =  0.08; ads =  0.00; gyro =  0.06; gyroAds =  0.03; break;
    case "pistol":  cam =  0.06; ads = -0.02; gyro =  0.03; gyroAds =  0.00; break;
  }

  // recoil offset (full-auto فقط)
  if (type !== "sniper" && type !== "dmr") {
    const recoilAdj = (r - 0.5) * 0.15;
    ads     += recoilAdj;
    gyro    += recoilAdj * 1.5;
    gyroAds += recoilAdj * 1.3;
    cam     -= recoilAdj * 0.3;
  }

  return { cam, ads, gyro, gyroAds };
}

// ═══════════════════════════════════════════════════════════════
//  SNIPER PRECISION ENGINE — نظام مستقل لكل سكوب
//
//  القناصات مختلفة جذرياً عن أسلحة الرش:
//  - طلقة واحدة: لا يوجد "تتبع ارتداد" — الأهم هو الدقة قبل الإطلاق
//  - كل سكوب له ديناميكية مختلفة تماماً
//  - 8x scope: 8.1× تكبير — 1 بكسل حركة = 8 بكسلات في عالم اللعبة
//    لذلك يحتاج حساسية منخفضة جداً ومضبوطة بدقة
//
//  Bolt-Action (AWM, Kar98k, M24, Mosin):
//    - طلقة واحدة ثم bolt cycle
//    - الأولوية: دقة الطلقة الأولى + quickscope + flick shot
//    - ADS أبطأ من Camera (ما تحتاج تتبع — تحتاج تثبت)
//    - Gyro منخفض جداً (أي اهتزاز = miss)
//
//  DMR (Mini14, SKS, SLR, Mk14):
//    - طلقات متتابعة semi-auto
//    - الأولوية: vertical recoil recovery + follow-up shots
//    - ADS أعلى من Bolt (تحتاج تتبع الارتداد بين الطلقات)
//    - Gyro أعلى من Bolt (يساعد في إرجاع الكروسهير بعد كل طلقة)
// ═══════════════════════════════════════════════════════════════

type SniperOverride = { cam: number; ads: number; gyro: number; gyroAds: number } | null;

function sniperScopeOverride(
  weaponType: string,
  row: keyof ScopeSens,
): SniperOverride {
  if (weaponType !== "sniper" && weaponType !== "dmr") return null;

  const isBolt = weaponType === "sniper";

  // TPP/FPP: القناصة ما تحتاج TPP/FPP مختلف كثير
  // بس أبطأ شوي من AR عشان ما تطير الكاميرا لما تفتح السكوب
  if (row === "tpp" || row === "fpp") {
    return isBolt
      ? { cam: -0.04, ads: -0.06, gyro: -0.08, gyroAds: -0.08 }
      : { cam: -0.02, ads: -0.03, gyro: -0.05, gyroAds: -0.05 };
  }

  // NoScope: hip-fire قريب — quickscope
  if (row === "noScope") {
    return isBolt
      ? { cam:  0.00, ads: -0.10, gyro: -0.12, gyroAds: -0.10 }  // Bolt: أبطأ — دقة الطلقة الأولى
      : { cam:  0.00, ads: -0.05, gyro: -0.08, gyroAds: -0.06 }; // DMR: أسرع شوي — follow-up
  }

  // ═══ SCOPED — هنا الضبط الدقيق الحقيقي ═══
  //
  // الفلسفة:
  //   Camera: يتحكم بسرعة المسح (scanning) — يحتاج يكون بطيء بما يكفي
  //           عشان تقدر توقف على الرأس بدون ما تتجاوزه (zero over-drag)
  //           لكن سريع بما يكفي عشان تلحق هدف يتحرك (zero under-drag)
  //
  //   ADS:    للقناصات bolt-action: أبطأ من Camera!
  //           لأنك ما تحتاج تتبع ارتداد — تحتاج تثبّت قبل الطلقة
  //           لحظة الضغط على fire = لازم يكون ثابت 100%
  //           للـ DMR: أعلى من Camera — عشان تتبع الارتداد العمودي
  //
  //   Gyro:   منخفض جداً — أي ميلان صغير على 6x/8x = حركة ضخمة
  //           على 8x: 1° ميلان = ~40 بكسل حركة (مع zoom 8.1×)
  //           لازم يكون منخفض بما يكفي عشان إيدك ما تهتز
  //           لكن عالي بما يكفي عشان تقدر تعدّل micro-adjustments
  //
  //   GyroADS: أبطأ من Gyro Camera — ثبات أقصى لحظة الإطلاق

  // مصفوفة القيم لكل سكوب — كل سطر مستقل تماماً
  // [cam_offset, ads_offset, gyro_offset, gyroAds_offset]
  const BOLT_SCOPES: Record<string, [number, number, number, number]> = {
    //                   cam     ads     gyro    gyroAds
    red:     [          -0.10,  -0.18,  -0.20,  -0.22   ],  // Quickscope CQC — أبطأ بقليل
    scope2:  [          -0.12,  -0.20,  -0.28,  -0.30   ],  // قريب-متوسط
    scope3:  [          -0.15,  -0.24,  -0.35,  -0.38   ],  // متوسط — دقة flick
    scope4:  [          -0.18,  -0.28,  -0.42,  -0.45   ],  // المسافة الذهبية
    scope6:  [          -0.22,  -0.35,  -0.52,  -0.55   ],  // بعيد — ثبات عالي
    scope8:  [          -0.28,  -0.42,  -0.62,  -0.65   ],  // أبعد — pixel precision
  };

  const DMR_SCOPES: Record<string, [number, number, number, number]> = {
    //                   cam     ads     gyro    gyroAds
    red:     [          -0.06,  -0.04,  -0.12,  -0.10   ],  // CQC tap — أسرع من bolt
    scope2:  [          -0.08,  -0.06,  -0.18,  -0.15   ],
    scope3:  [          -0.10,  -0.08,  -0.24,  -0.20   ],  // mid-range tap
    scope4:  [          -0.12,  -0.10,  -0.30,  -0.26   ],  // standard DMR range
    scope6:  [          -0.16,  -0.14,  -0.40,  -0.35   ],  // long-range tap
    scope8:  [          -0.20,  -0.18,  -0.50,  -0.45   ],  // extreme range
  };

  const table = isBolt ? BOLT_SCOPES : DMR_SCOPES;
  const entry = table[row];
  if (!entry) return null;

  return { cam: entry[0], ads: entry[1], gyro: entry[2], gyroAds: entry[3] };
}

// ═══════════════════════════════════════════════════════════════
//  PROFILE OFFSET — كل بروفايل يعدّل كل scope
// ═══════════════════════════════════════════════════════════════
function profileOffset(profile: (typeof PRO_PROFILES)[0], row: keyof ScopeSens) {
  // sensMultiplier: 1.0 = baseline. كل 0.01 فوق/تحت = ~1% تعديل
  const baseOff = profile.sensMultiplier - 1.0;

  if (row === "tpp") {
    const off = (profile.tppMultiplier - 1.0);
    return { cam: off + baseOff, ads: off + baseOff, gyro: baseOff, gyroAds: baseOff };
  }
  if (row === "fpp") {
    const off = (profile.fppMultiplier - 1.0);
    return { cam: off + baseOff, ads: off + baseOff, gyro: baseOff, gyroAds: baseOff };
  }

  const scopeMap: Record<string, number> = {
    noScope: profile.redDotMultiplier, red: profile.redDotMultiplier,
    scope2: profile.scope2Multiplier, scope3: profile.scope3Multiplier,
    scope4: profile.scope4Multiplier, scope6: profile.scope6Multiplier,
    scope8: profile.scope8Multiplier,
  };
  const scopeOff = (scopeMap[row] ?? 1.0) - 1.0;
  const adsOff = profile.adsMultiplier - 1.0;
  const gyroOff = profile.gyroMultiplier - 1.0;

  return {
    cam: scopeOff + baseOff,
    ads: scopeOff + adsOff + baseOff,
    gyro: gyroOff + baseOff,
    gyroAds: gyroOff + adsOff + baseOff,
  };
}

// ═══════════════════════════════════════════════════════════════
//  MAIN ENGINE
// ═══════════════════════════════════════════════════════════════
export function computeSensitivity(p: SensParams): Sens {
  const { device, fingers, gyroMode, weaponName, weaponRecoil, weaponRange, weaponType, proProfile } = p;

  const profile = PRO_PROFILES.find(x => x.id === (proProfile as ProProfileId)) ?? PRO_PROFILES[0];
  const wp = getWeaponProfile(weaponName, weaponRecoil, weaponRange, weaponType);

  const dev = deviceOffset(device);
  const fin = fingerOffset(fingers);
  const wpn = weaponOffset(wp.type, wp.verticalRecoil, wp.fireRate);

  const cam     = {} as Record<keyof ScopeSens, number>;
  const ads     = {} as Record<keyof ScopeSens, number>;
  const gyroCam = {} as Record<keyof ScopeSens, number>;
  const gyroAds = {} as Record<keyof ScopeSens, number>;

  for (const row of ROWS) {
    const pro = profileOffset(profile, row);

    // Sniper/DMR: override مستقل لكل سكوب
    const sniperOvr = sniperScopeOverride(wp.type, row);

    // Total offset = device + fingers + weapon + profile + sniper override
    const sniperCam     = sniperOvr?.cam     ?? 0;
    const sniperAds     = sniperOvr?.ads     ?? 0;
    const sniperGyro    = sniperOvr?.gyro    ?? 0;
    const sniperGyroAds = sniperOvr?.gyroAds ?? 0;

    const camTotal     = dev.camOff  + fin.cam     + wpn.cam     + pro.cam     + sniperCam;
    const adsTotal     = dev.adsOff  + fin.ads     + wpn.ads     + pro.ads     + sniperAds;
    const gyroTotal    = dev.gyroOff + fin.gyro    + wpn.gyro    + pro.gyro    + sniperGyro;
    const gyroAdsTotal = dev.gyroOff + fin.gyroAds + wpn.gyroAds + pro.gyroAds + sniperGyroAds;

    // القيمة النهائية = القيمة المستهدفة × (1 + مجموع التعديلات)
    cam[row] = cl(Math.round(TARGET.cam[row] * (1 + camTotal)), 1, 300);
    ads[row] = cl(Math.round(TARGET.ads[row] * (1 + adsTotal)), 1, 300);

    if (gyroMode === "off" || (gyroMode === "scope" && HIPFIRE.includes(row))) {
      gyroCam[row] = 0;
      gyroAds[row] = 0;
    } else {
      gyroCam[row] = cl(Math.round(TARGET.gyro[row]    * (1 + gyroTotal)),    1, 400);
      gyroAds[row] = cl(Math.round(TARGET.gyroAds[row] * (1 + gyroAdsTotal)), 1, 400);
    }
  }

  // ═══ FREE LOOK ═══
  // Vehicle: بروفايلات عدوانية/مخصصة تحتاج free look أعلى بكثير
  //          عشان تقدر تطلّع على الأعداء أثناء القيادة + تطلق من السيارة
  const vehicleBoost =
    profile.isCustom ? 1.40 :                    // ALYAZOURI PRO: أعلى شي — ملك السيارات
    profile.category === "aggressive" ? 1.25 :   // عدواني: يحتاج يطلّع بسرعة
    1.15;                                        // عادي

  const freeLook = {
    cam:       cl(Math.round(cam.tpp * 1.05), 1, 300),
    parashoot: cl(Math.round(cam.tpp * 1.20), 1, 300),
    vehicle:   cl(Math.round(cam.tpp * vehicleBoost), 1, 300),
  };

  // ═══ GAMEPLAY ═══
  const camNorm = cl(cam.tpp / 200, 0, 1);
  const sprintSensitivity = cl(Math.round(85 + (1 - camNorm) * 12 + (device.screenSize >= 11 ? -3 : 0) + (fingers >= 5 ? -1 : fingers <= 2 ? 2 : 0)), 75, 100);
  const joystickSize = cl((device.screenSize >= 13 ? 100 : device.screenSize >= 11 ? 95 : device.screenSize >= 8 ? 85 : device.screenSize >= 6.5 ? 78 : 72) + (fingers >= 6 ? -10 : fingers >= 5 ? -5 : 0) + Math.round((1 - camNorm) * 5), 50, 120);
  const tppFOV = cl(Math.round(83 + camNorm * 5 + (fingers >= 5 ? 1.5 : 0.5) + (device.screenSize >= 11 ? -1 : 0.5)), 80, 90);
  const fppFOV = cl(Math.round(88 + camNorm * 10 + (fingers >= 5 ? 3 : 1.5) + (device.screenSize >= 11 ? -2 : 1)), 80, 103);

  // ═══ AI SCORE ═══
  const devScore = 1.0 + dev.camOff;
  const aiScore = cl(Math.round(
    (devScore * 0.22 + (1 - wp.verticalRecoil / 200) * 0.18 + (fingers / 7) * 0.20
    + ((profile.recoilControl + profile.tracking) / 220) * 0.22
    + (gyroMode === "off" ? 0.4 : device.gyroQuality === "excellent" ? 1 : device.gyroQuality === "good" ? 0.75 : 0.5) * 0.18
    + (profile.isCustom ? 0.04 : 0)) * 100
  ), 1, 100);

  return {
    cam: cam as ScopeSens, ads: ads as ScopeSens,
    gyro: { cam: gyroCam as ScopeSens, ads: gyroAds as ScopeSens },
    freeLook,
    gameplay: { sprintSensitivity, joystickSize, tppFOV, fppFOV },
    aiScore,
    factors: {
      deviceFactor: 1.0 + dev.camOff,
      weaponFactor: cl((100 - wp.verticalRecoil * 0.5) / 100, 0.4, 1),
      fingerFactor: 1.0 + fin.cam,
      profileFactor: profile.sensMultiplier,
    },
  };
}

// ═══════════════════════════════════════════════════════════════
//  UI
// ═══════════════════════════════════════════════════════════════
export function SensTable({ title, icon, data, max, accent = "text-orange-300", barClass = "from-orange-500 to-amber-400" }: {
  title: string; icon: string; data: ScopeSens; max: number; accent?: string; barClass?: string;
}) {
  const { lang } = useLang();
  return (
    <div className="card rounded-2xl p-4">
      <div className={`mb-3 flex items-center gap-2 text-sm font-bold ${accent}`}>
        <span>{icon}</span><span>{title}</span>
      </div>
      <div className="space-y-2">
        {SCOPE_DEFS.map(r => {
          const v = (data as Record<string, number>)[r.key] ?? 0;
          const off = v <= 0;
          const pct = off ? 0 : Math.round(v / max * 100);
          return (
            <div key={r.key} className="flex items-center gap-2">
              <span className="w-6 text-center text-sm">{r.icon}</span>
              <span className="w-16 text-xs text-white/60">{t(r.labelKey as never, lang)}</span>
              <div className="flex-1 h-2 rounded-full bg-white/10 overflow-hidden">
                <div className={`h-full bg-gradient-to-r ${barClass} stat-bar`} style={{ width: `${pct}%` }} />
              </div>
              <span className={`w-12 text-right text-xs font-bold ${off ? "text-white/30" : accent}`}>
                {off ? "—" : `${v}%`}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function FactorsCard({ factors }: { factors: Sens["factors"] }) {
  const { lang } = useLang();
  const items = [
    { k: "D", label: t("stability_device", lang), v: factors.deviceFactor, color: "text-orange-300" },
    { k: "W", label: t("stability_weapon", lang), v: factors.weaponFactor, color: "text-amber-300" },
    { k: "F", label: t("stability_fingers", lang), v: factors.fingerFactor, color: "text-emerald-300" },
    { k: "P", label: lang === "ar" ? "البروفايل" : "Profile", v: factors.profileFactor, color: "text-sky-300" },
  ];
  return (
    <div className="grid grid-cols-4 gap-2">
      {items.map(it => (
        <div key={it.k} className="card rounded-xl p-3 text-center">
          <div className={`font-display text-lg font-bold ${it.color}`}>{it.k}</div>
          <div className="text-[10px] text-white/50">{it.label}</div>
          <div className="mt-1 text-sm font-bold text-white">{(it.v * 100).toFixed(0)}%</div>
        </div>
      ))}
    </div>
  );
}
