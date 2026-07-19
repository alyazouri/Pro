// Weapon recoil profiles — calibrated data for PUBG Mobile Global 2026
export type WeaponProfile = {
  verticalRecoil: number;
  horizontalRecoil: number;
  recovery: number;
  firstShotAccuracy: number;
  fireRate: number;
  type: "ar" | "smg" | "dmr" | "sniper" | "lmg" | "shotgun" | "pistol";
};

const P: Record<string, WeaponProfile> = {
  // ASSAULT RIFLES
  M416: { verticalRecoil: 50, horizontalRecoil: 28, recovery: 80, firstShotAccuracy: 89, fireRate: 750, type: "ar" },
  AKM: { verticalRecoil: 76, horizontalRecoil: 44, recovery: 64, firstShotAccuracy: 77, fireRate: 600, type: "ar" },
  "SCAR-L": { verticalRecoil: 46, horizontalRecoil: 26, recovery: 84, firstShotAccuracy: 91, fireRate: 700, type: "ar" },
  M762: { verticalRecoil: 70, horizontalRecoil: 38, recovery: 67, firstShotAccuracy: 81, fireRate: 700, type: "ar" },
  AUG: { verticalRecoil: 43, horizontalRecoil: 24, recovery: 87, firstShotAccuracy: 93, fireRate: 680, type: "ar" },
  G36C: { verticalRecoil: 48, horizontalRecoil: 26, recovery: 82, firstShotAccuracy: 89, fireRate: 700, type: "ar" },
  QBZ: { verticalRecoil: 44, horizontalRecoil: 25, recovery: 86, firstShotAccuracy: 91, fireRate: 720, type: "ar" },
  ACE32: { verticalRecoil: 52, horizontalRecoil: 29, recovery: 78, firstShotAccuracy: 87, fireRate: 740, type: "ar" },
  Groza: { verticalRecoil: 66, horizontalRecoil: 36, recovery: 70, firstShotAccuracy: 83, fireRate: 750, type: "ar" },
  "Mk47 Mutant": { verticalRecoil: 68, horizontalRecoil: 34, recovery: 72, firstShotAccuracy: 85, fireRate: 600, type: "ar" },

  // SMG
  UMP45: { verticalRecoil: 30, horizontalRecoil: 20, recovery: 90, firstShotAccuracy: 85, fireRate: 650, type: "smg" },
  Vector: { verticalRecoil: 26, horizontalRecoil: 22, recovery: 88, firstShotAccuracy: 81, fireRate: 1100, type: "smg" },
  MP5K: { verticalRecoil: 28, horizontalRecoil: 20, recovery: 92, firstShotAccuracy: 87, fireRate: 850, type: "smg" },
  "PP-19 Bizon": { verticalRecoil: 24, horizontalRecoil: 18, recovery: 94, firstShotAccuracy: 83, fireRate: 680, type: "smg" },
  P90: { verticalRecoil: 32, horizontalRecoil: 23, recovery: 86, firstShotAccuracy: 83, fireRate: 950, type: "smg" },
  "Micro UZI": { verticalRecoil: 34, horizontalRecoil: 24, recovery: 84, firstShotAccuracy: 77, fireRate: 1250, type: "smg" },

  // DMR
  Mini14: { verticalRecoil: 36, horizontalRecoil: 22, recovery: 82, firstShotAccuracy: 95, fireRate: 400, type: "dmr" },
  SKS: { verticalRecoil: 46, horizontalRecoil: 26, recovery: 77, firstShotAccuracy: 91, fireRate: 350, type: "dmr" },
  SLR: { verticalRecoil: 60, horizontalRecoil: 30, recovery: 70, firstShotAccuracy: 89, fireRate: 380, type: "dmr" },
  Mk14: { verticalRecoil: 70, horizontalRecoil: 36, recovery: 62, firstShotAccuracy: 87, fireRate: 450, type: "dmr" },
  QBU: { verticalRecoil: 40, horizontalRecoil: 24, recovery: 80, firstShotAccuracy: 93, fireRate: 380, type: "dmr" },

  // SNIPER RIFLES — Bolt-Action: طلقة واحدة = الدقة أهم من تحكم الارتداد
  // verticalRecoil عالي بس ما يهم لأنه bolt-action (مفيش رش)
  // الأهم هو firstShotAccuracy + recovery (سرعة إعادة التصويب)
  // fireRate منخفض جداً = لا يأثر على حساب recoilMod (لأن f/700 قريب من 0)
  AWM:           { verticalRecoil: 90, horizontalRecoil: 40, recovery: 30, firstShotAccuracy: 99, fireRate: 27, type: "sniper" },
  Kar98k:        { verticalRecoil: 78, horizontalRecoil: 36, recovery: 38, firstShotAccuracy: 97, fireRate: 33, type: "sniper" },
  M24:           { verticalRecoil: 76, horizontalRecoil: 34, recovery: 40, firstShotAccuracy: 98, fireRate: 35, type: "sniper" },
  "Mosin Nagant":{ verticalRecoil: 77, horizontalRecoil: 35, recovery: 38, firstShotAccuracy: 97, fireRate: 33, type: "sniper" },
  Win94:         { verticalRecoil: 55, horizontalRecoil: 28, recovery: 50, firstShotAccuracy: 92, fireRate: 50, type: "sniper" },
  "Lynx AMR":    { verticalRecoil: 95, horizontalRecoil: 45, recovery: 22, firstShotAccuracy: 98, fireRate: 20, type: "sniper" },

  // LMG
  M249: { verticalRecoil: 66, horizontalRecoil: 38, recovery: 60, firstShotAccuracy: 76, fireRate: 850, type: "lmg" },
  "DP-28": { verticalRecoil: 70, horizontalRecoil: 40, recovery: 57, firstShotAccuracy: 73, fireRate: 650, type: "lmg" },
  MG3: { verticalRecoil: 60, horizontalRecoil: 36, recovery: 62, firstShotAccuracy: 75, fireRate: 990, type: "lmg" },

  // SHOTGUN
  S12K: { verticalRecoil: 63, horizontalRecoil: 43, recovery: 62, firstShotAccuracy: 69, fireRate: 350, type: "shotgun" },
  S1897: { verticalRecoil: 83, horizontalRecoil: 48, recovery: 47, firstShotAccuracy: 73, fireRate: 80, type: "shotgun" },
  S686: { verticalRecoil: 88, horizontalRecoil: 46, recovery: 50, firstShotAccuracy: 75, fireRate: 200, type: "shotgun" },
  DBS: { verticalRecoil: 76, horizontalRecoil: 42, recovery: 54, firstShotAccuracy: 77, fireRate: 220, type: "shotgun" },
};

export const DEFAULT_PROFILE: WeaponProfile = {
  verticalRecoil: 50,
  horizontalRecoil: 30,
  recovery: 70,
  firstShotAccuracy: 80,
  fireRate: 600,
  type: "ar",
};

export function getWeaponProfile(name: string, recoil: number, range: number, type: string): WeaponProfile {
  const p = P[name];
  if (p) return p;
  return {
    verticalRecoil: recoil,
    horizontalRecoil: Math.round(recoil * 0.6),
    recovery: Math.max(50, 100 - Math.round(recoil * 0.3)),
    firstShotAccuracy: Math.min(95, 60 + Math.round(range * 0.3)),
    fireRate: 600,
    type: (type as WeaponProfile["type"]) || "ar",
  };
}
