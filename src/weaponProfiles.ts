// Weapon recoil profiles — calibrated data for PUBG Mobile Global 2026
// COMPLETE DATABASE — Tuned for stability (ثبات) + enemy lock-on power (دمج الخصم)

export type WeaponProfile = {
  verticalRecoil: number;   // 0-100
  horizontalRecoil: number; // 0-100
  recovery: number;         // 0-100 (higher = faster recovery)
  firstShotAccuracy: number;// 0-100
  fireRate: number;         // RPM
  type: "ar" | "smg" | "dmr" | "sniper" | "lmg" | "shotgun" | "pistol";
};

const P: Record<string, WeaponProfile> = {
  // ==================== ASSAULT RIFLES (AR) ====================
  M416:          { verticalRecoil: 50, horizontalRecoil: 28, recovery: 80, firstShotAccuracy: 89, fireRate: 750, type: "ar" },
  AKM:           { verticalRecoil: 76, horizontalRecoil: 44, recovery: 64, firstShotAccuracy: 77, fireRate: 600, type: "ar" },
  "SCAR-L":      { verticalRecoil: 46, horizontalRecoil: 26, recovery: 84, firstShotAccuracy: 91, fireRate: 700, type: "ar" },
  M762:          { verticalRecoil: 70, horizontalRecoil: 38, recovery: 67, firstShotAccuracy: 81, fireRate: 700, type: "ar" },
  AUG:           { verticalRecoil: 43, horizontalRecoil: 24, recovery: 87, firstShotAccuracy: 93, fireRate: 680, type: "ar" },
  M16A4:         { verticalRecoil: 56, horizontalRecoil: 30, recovery: 77, firstShotAccuracy: 95, fireRate: 800, type: "ar" },
  G36C:          { verticalRecoil: 48, horizontalRecoil: 26, recovery: 82, firstShotAccuracy: 89, fireRate: 700, type: "ar" },
  QBZ:           { verticalRecoil: 44, horizontalRecoil: 25, recovery: 86, firstShotAccuracy: 91, fireRate: 720, type: "ar" },
  ACE32:         { verticalRecoil: 52, horizontalRecoil: 29, recovery: 78, firstShotAccuracy: 87, fireRate: 740, type: "ar" },
  FAMAS:         { verticalRecoil: 53, horizontalRecoil: 30, recovery: 76, firstShotAccuracy: 86, fireRate: 900, type: "ar" },
  Groza:         { verticalRecoil: 66, horizontalRecoil: 36, recovery: 70, firstShotAccuracy: 83, fireRate: 750, type: "ar" },
  "Mk47 Mutant": { verticalRecoil: 68, horizontalRecoil: 34, recovery: 72, firstShotAccuracy: 85, fireRate: 600, type: "ar" },
  "Honey Badger":{ verticalRecoil: 38, horizontalRecoil: 23, recovery: 88, firstShotAccuracy: 89, fireRate: 770, type: "ar" },
  K2:            { verticalRecoil: 47, horizontalRecoil: 27, recovery: 81, firstShotAccuracy: 88, fireRate: 710, type: "ar" },

  // ==================== SUBMACHINE GUNS (SMG) ====================
  UMP45:         { verticalRecoil: 30, horizontalRecoil: 20, recovery: 90, firstShotAccuracy: 85, fireRate: 650, type: "smg" },
  Vector:        { verticalRecoil: 26, horizontalRecoil: 22, recovery: 88, firstShotAccuracy: 81, fireRate: 1100, type: "smg" },
  "Tommy Gun":   { verticalRecoil: 38, horizontalRecoil: 26, recovery: 74, firstShotAccuracy: 79, fireRate: 700, type: "smg" },
  MP5K:          { verticalRecoil: 28, horizontalRecoil: 20, recovery: 92, firstShotAccuracy: 87, fireRate: 850, type: "smg" },
  "PP-19 Bizon": { verticalRecoil: 24, horizontalRecoil: 18, recovery: 94, firstShotAccuracy: 83, fireRate: 680, type: "smg" },
  P90:           { verticalRecoil: 32, horizontalRecoil: 23, recovery: 86, firstShotAccuracy: 83, fireRate: 950, type: "smg" },
  UMP9:          { verticalRecoil: 31, horizontalRecoil: 21, recovery: 89, firstShotAccuracy: 84, fireRate: 650, type: "smg" },
  "Micro UZI":   { verticalRecoil: 34, horizontalRecoil: 24, recovery: 84, firstShotAccuracy: 77, fireRate: 1250, type: "smg" },
  JS9:           { verticalRecoil: 20, horizontalRecoil: 16, recovery: 93, firstShotAccuracy: 85, fireRate: 880, type: "smg" },
  MP9:           { verticalRecoil: 22, horizontalRecoil: 17, recovery: 89, firstShotAccuracy: 84, fireRate: 1100, type: "smg" },

  // ==================== DESIGNATED MARKSMAN RIFLES (DMR) ====================
  Mini14:        { verticalRecoil: 36, horizontalRecoil: 22, recovery: 82, firstShotAccuracy: 95, fireRate: 400, type: "dmr" },
  SKS:           { verticalRecoil: 46, horizontalRecoil: 26, recovery: 77, firstShotAccuracy: 91, fireRate: 350, type: "dmr" },
  SLR:           { verticalRecoil: 60, horizontalRecoil: 30, recovery: 70, firstShotAccuracy: 89, fireRate: 380, type: "dmr" },
  Mk14:          { verticalRecoil: 70, horizontalRecoil: 36, recovery: 62, firstShotAccuracy: 87, fireRate: 450, type: "dmr" },
  DMR:           { verticalRecoil: 56, horizontalRecoil: 28, recovery: 74, firstShotAccuracy: 89, fireRate: 360, type: "dmr" },
  VSS:           { verticalRecoil: 20, horizontalRecoil: 16, recovery: 84, firstShotAccuracy: 86, fireRate: 300, type: "dmr" },
  QBU:           { verticalRecoil: 40, horizontalRecoil: 24, recovery: 80, firstShotAccuracy: 93, fireRate: 380, type: "dmr" },
  Mk12:          { verticalRecoil: 42, horizontalRecoil: 22, recovery: 84, firstShotAccuracy: 94, fireRate: 420, type: "dmr" },
  Dragunov:      { verticalRecoil: 73, horizontalRecoil: 33, recovery: 58, firstShotAccuracy: 88, fireRate: 310, type: "dmr" },

  // ==================== SNIPER RIFLES ====================
  AWM:           { verticalRecoil: 90, horizontalRecoil: 40, recovery: 57, firstShotAccuracy: 98, fireRate: 55, type: "sniper" },
  Kar98k:        { verticalRecoil: 78, horizontalRecoil: 36, recovery: 62, firstShotAccuracy: 96, fireRate: 52, type: "sniper" },
  M24:           { verticalRecoil: 76, horizontalRecoil: 34, recovery: 64, firstShotAccuracy: 97, fireRate: 54, type: "sniper" },
  Win94:         { verticalRecoil: 53, horizontalRecoil: 28, recovery: 72, firstShotAccuracy: 91, fireRate: 60, type: "sniper" },
  "Lynx AMR":    { verticalRecoil: 93, horizontalRecoil: 43, recovery: 52, firstShotAccuracy: 96, fireRate: 65, type: "sniper" },
  "Mosin Nagant":{ verticalRecoil: 77, horizontalRecoil: 35, recovery: 63, firstShotAccuracy: 96, fireRate: 53, type: "sniper" },

  // ==================== LIGHT MACHINE GUNS (LMG) ====================
  M249:          { verticalRecoil: 66, horizontalRecoil: 38, recovery: 60, firstShotAccuracy: 76, fireRate: 850, type: "lmg" },
  "DP-28":       { verticalRecoil: 70, horizontalRecoil: 40, recovery: 57, firstShotAccuracy: 73, fireRate: 650, type: "lmg" },
  MG3:           { verticalRecoil: 60, horizontalRecoil: 36, recovery: 62, firstShotAccuracy: 75, fireRate: 990, type: "lmg" },

  // ==================== SHOTGUNS ====================
  S12K:          { verticalRecoil: 63, horizontalRecoil: 43, recovery: 62, firstShotAccuracy: 69, fireRate: 350, type: "shotgun" },
  S1897:         { verticalRecoil: 83, horizontalRecoil: 48, recovery: 47, firstShotAccuracy: 73, fireRate: 80, type: "shotgun" },
  S686:          { verticalRecoil: 88, horizontalRecoil: 46, recovery: 50, firstShotAccuracy: 75, fireRate: 200, type: "shotgun" },
  DBS:           { verticalRecoil: 76, horizontalRecoil: 42, recovery: 54, firstShotAccuracy: 77, fireRate: 220, type: "shotgun" },
  M1014:         { verticalRecoil: 58, horizontalRecoil: 40, recovery: 60, firstShotAccuracy: 71, fireRate: 300, type: "shotgun" },
  NS2000:        { verticalRecoil: 90, horizontalRecoil: 50, recovery: 44, firstShotAccuracy: 74, fireRate: 110, type: "shotgun" },
  O12:           { verticalRecoil: 53, horizontalRecoil: 38, recovery: 57, firstShotAccuracy: 68, fireRate: 280, type: "shotgun" },
  "Sawed-Off":   { verticalRecoil: 93, horizontalRecoil: 53, recovery: 37, firstShotAccuracy: 63, fireRate: 250, type: "shotgun" },

  // ==================== PISTOLS ====================
  P92:           { verticalRecoil: 23, horizontalRecoil: 18, recovery: 87, firstShotAccuracy: 83, fireRate: 450, type: "pistol" },
  P1911:         { verticalRecoil: 20, horizontalRecoil: 16, recovery: 90, firstShotAccuracy: 85, fireRate: 500, type: "pistol" },
  R1895:         { verticalRecoil: 38, horizontalRecoil: 26, recovery: 72, firstShotAccuracy: 81, fireRate: 180, type: "pistol" },
  "Desert Eagle":{ verticalRecoil: 53, horizontalRecoil: 30, recovery: 67, firstShotAccuracy: 86, fireRate: 150, type: "pistol" },
  P18C:          { verticalRecoil: 30, horizontalRecoil: 20, recovery: 82, firstShotAccuracy: 81, fireRate: 900, type: "pistol" },
  Scorpion:      { verticalRecoil: 26, horizontalRecoil: 20, recovery: 84, firstShotAccuracy: 79, fireRate: 850, type: "pistol" },
  R45:           { verticalRecoil: 43, horizontalRecoil: 28, recovery: 70, firstShotAccuracy: 80, fireRate: 160, type: "pistol" },
};

export const DEFAULT_PROFILE: WeaponProfile = {
  verticalRecoil: 50, horizontalRecoil: 30, recovery: 70,
  firstShotAccuracy: 80, fireRate: 600, type: "ar",
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
