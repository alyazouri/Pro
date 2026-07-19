import type { WeaponProfile } from "./weaponProfiles";

export type Device = {
  name: string;
  fps: number;
  touchRate: number;
  screenSize: number;
  resolution: string;
  gyroQuality: "excellent" | "good" | "average";
};

export type DeviceBrand = {
  id: string;
  name: string;
  icon: string;
  accent: string;
  devices: Device[];
};

const d = (name: string, fps: number, touchRate: number, screenSize: number, resolution: string, gyroQuality: Device["gyroQuality"]): Device => 
  ({ name, fps, touchRate, screenSize, resolution, gyroQuality });

export const BRANDS: DeviceBrand[] = [
  {
    id: "apple", name: "Apple", icon: "🍎", accent: "from-slate-300 to-slate-500",
    devices: [
      d("iPhone 16 Pro Max", 120, 240, 6.9, "2868×1320", "excellent"),
      d("iPhone 16 Pro", 120, 240, 6.3, "2622×1206", "excellent"),
      d("iPhone 16 Plus", 60, 120, 6.7, "2796×1290", "excellent"),
      d("iPhone 16", 60, 120, 6.1, "2556×1179", "excellent"),
      d("iPhone 15 Pro Max", 120, 240, 6.7, "2796×1290", "excellent"),
      d("iPhone 15 Pro", 120, 240, 6.1, "2556×1179", "excellent"),
      d("iPhone 15 Plus", 60, 120, 6.7, "2796×1290", "excellent"),
      d("iPhone 15", 60, 120, 6.1, "2556×1179", "excellent"),
      d("iPhone 14 Pro Max", 120, 240, 6.7, "2796×1290", "excellent"),
      d("iPhone 14 Pro", 120, 240, 6.1, "2556×1179", "excellent"),
      d("iPhone 14 Plus", 60, 120, 6.7, "2778×1284", "excellent"),
      d("iPhone 13 Pro Max", 120, 240, 6.7, "2778×1284", "excellent"),
      d("iPhone 13 Pro", 120, 240, 6.1, "2532×1170", "excellent"),
      d("iPhone 13", 60, 120, 6.1, "2532×1170", "excellent"),
      d("iPhone 12 Pro", 60, 120, 6.1, "2532×1170", "good"),
      d("iPhone 11 Pro Max", 60, 120, 6.5, "2688×1242", "good"),
      d("iPhone 11", 60, 120, 6.1, "1792×828", "good"),
      d("iPad Pro 13 (M4)", 120, 240, 13.0, "2752×2064", "excellent"),
      d("iPad Pro 12.9 (M2)", 120, 240, 12.9, "2732×2048", "excellent"),
      d("iPad Pro 11 (M4)", 120, 240, 11.0, "2420×1668", "excellent"),
      d("iPad Pro 11 (M2)", 120, 240, 11.0, "2388×1668", "excellent"),
      d("iPad Air M2", 60, 120, 11.0, "2360×1640", "excellent"),
      d("iPad Air 5", 60, 120, 10.9, "2360×1640", "good"),
      d("iPad Mini 6", 60, 120, 8.3, "2266×1488", "good"),
      d("iPad 10", 60, 60, 10.9, "2360×1640", "average"),
    ],
  },
  {
    id: "samsung", name: "Samsung", icon: "📱", accent: "from-blue-400 to-indigo-600",
    devices: [
      d("Galaxy S25 Ultra", 120, 240, 6.9, "3120×1440", "excellent"),
      d("Galaxy S25+", 120, 240, 6.7, "3120×1440", "excellent"),
      d("Galaxy S25", 120, 240, 6.2, "2340×1080", "excellent"),
      d("Galaxy S24 Ultra", 120, 240, 6.8, "3120×1440", "excellent"),
      d("Galaxy S24+", 120, 240, 6.7, "3120×1440", "excellent"),
      d("Galaxy S24", 120, 240, 6.2, "2340×1080", "excellent"),
      d("Galaxy S23 Ultra", 120, 240, 6.8, "3088×1440", "excellent"),
      d("Galaxy S23+", 120, 240, 6.6, "2340×1080", "excellent"),
      d("Galaxy S23", 120, 240, 6.1, "2340×1080", "excellent"),
      d("Galaxy S22 Ultra", 120, 240, 6.8, "3088×1440", "excellent"),
      d("Galaxy Z Fold 6", 120, 240, 7.6, "2160×1856", "excellent"),
      d("Galaxy Z Fold 5", 120, 240, 7.6, "2176×1812", "excellent"),
      d("Galaxy Z Flip 6", 120, 240, 6.7, "2640×1080", "good"),
      d("Galaxy Tab S10 Ultra", 120, 240, 14.6, "2960×1848", "excellent"),
      d("Galaxy Tab S9 Ultra", 120, 240, 14.6, "2960×1848", "excellent"),
      d("Galaxy Tab S9+", 120, 240, 12.4, "2800×1752", "excellent"),
      d("Galaxy Tab S9", 120, 240, 11.0, "2560×1600", "excellent"),
    ],
  },
  {
    id: "xiaomi", name: "Xiaomi", icon: "🔥", accent: "from-orange-400 to-red-500",
    devices: [
      d("Xiaomi 15 Ultra", 120, 240, 6.73, "3200×1440", "excellent"),
      d("Xiaomi 15 Pro", 120, 240, 6.73, "3200×1440", "excellent"),
      d("Xiaomi 15", 120, 240, 6.36, "2670×1200", "excellent"),
      d("Xiaomi 14 Ultra", 120, 240, 6.73, "3200×1440", "excellent"),
      d("Xiaomi 14 Pro", 120, 240, 6.73, "3200×1440", "excellent"),
      d("Xiaomi 14", 120, 240, 6.36, "2670×1200", "excellent"),
      d("Xiaomi 13T Pro", 144, 480, 6.67, "2712×1220", "excellent"),
      d("Redmi K70 Pro", 120, 480, 6.67, "3200×1440", "excellent"),
      d("Redmi K70", 120, 480, 6.67, "2712×1220", "excellent"),
      d("Poco F7 Pro", 120, 480, 6.67, "3200×1440", "excellent"),
      d("Poco F6 Pro", 120, 480, 6.67, "3200×1440", "excellent"),
      d("Poco F6", 120, 240, 6.67, "2712×1220", "good"),
      d("Poco X6 Pro", 120, 240, 6.67, "2712×1220", "good"),
      d("Redmi Note 13 Pro+", 120, 240, 6.67, "2400×1080", "average"),
    ],
  },
  {
    id: "rog", name: "ASUS ROG", icon: "🎮", accent: "from-red-500 to-rose-700",
    devices: [
      d("ROG Phone 9 Ultimate", 185, 720, 6.78, "2400×1080", "excellent"),
      d("ROG Phone 9 Pro", 165, 720, 6.78, "2400×1080", "excellent"),
      d("ROG Phone 9", 165, 720, 6.78, "2400×1080", "excellent"),
      d("ROG Phone 8 Pro", 165, 720, 6.78, "2400×1080", "excellent"),
      d("ROG Phone 8", 165, 720, 6.78, "2400×1080", "excellent"),
      d("ROG Phone 7 Ultimate", 165, 720, 6.78, "2400×1080", "excellent"),
      d("ROG Phone 7", 165, 720, 6.78, "2400×1080", "excellent"),
    ],
  },
  {
    id: "redmagic", name: "Red Magic", icon: "👾", accent: "from-red-600 to-purple-700",
    devices: [
      d("Red Magic 10 Pro+", 165, 960, 6.85, "2688×1216", "excellent"),
      d("Red Magic 10 Pro", 144, 960, 6.85, "2688×1216", "excellent"),
      d("Red Magic 9 Pro+", 165, 960, 6.8, "2480×1116", "excellent"),
      d("Red Magic 9 Pro", 120, 960, 6.8, "2480×1116", "excellent"),
      d("Red Magic 8 Pro+", 120, 960, 6.8, "2480×1116", "excellent"),
      d("Red Magic 8 Pro", 120, 960, 6.8, "2480×1116", "excellent"),
      d("Red Magic 7 Pro", 120, 960, 6.8, "2400×1080", "excellent"),
      d("Red Magic 7", 165, 720, 6.8, "2400×1080", "excellent"),
    ],
  },
  {
    id: "oneplus", name: "OnePlus", icon: "⚡", accent: "from-red-400 to-pink-600",
    devices: [
      d("OnePlus 13", 120, 240, 6.82, "3168×1440", "excellent"),
      d("OnePlus 12", 120, 240, 6.82, "3168×1440", "excellent"),
      d("OnePlus 12R", 120, 240, 6.78, "2780×1264", "good"),
      d("OnePlus 11", 120, 240, 6.7, "3216×1440", "excellent"),
      d("OnePlus Nord 4", 120, 240, 6.74, "2772×1240", "good"),
    ],
  },
  {
    id: "realme", name: "Realme", icon: "🟡", accent: "from-yellow-400 to-amber-600",
    devices: [
      d("Realme GT 7 Pro", 120, 240, 6.78, "2780×1264", "excellent"),
      d("Realme GT 6", 120, 240, 6.78, "2780×1264", "excellent"),
      d("Realme GT 5 Pro", 120, 240, 6.78, "2780×1264", "excellent"),
      d("Realme 13 Pro+", 120, 240, 6.7, "2412×1080", "good"),
    ],
  },
  {
    id: "google", name: "Google", icon: "🔷", accent: "from-cyan-400 to-teal-600",
    devices: [
      d("Pixel 9 Pro XL", 120, 240, 6.8, "2992×1344", "excellent"),
      d("Pixel 9 Pro", 120, 240, 6.3, "2856×1280", "excellent"),
      d("Pixel 9", 120, 240, 6.3, "2424×1080", "excellent"),
      d("Pixel 8 Pro", 120, 240, 6.7, "2992×1344", "excellent"),
      d("Pixel 8", 120, 240, 6.2, "2400×1080", "excellent"),
      d("Pixel 7 Pro", 120, 240, 6.7, "3120×1440", "good"),
    ],
  },
  {
    id: "huawei", name: "Huawei", icon: "🌸", accent: "from-rose-400 to-pink-600",
    devices: [
      d("Huawei Mate 60 Pro+", 120, 240, 6.82, "2720×1260", "excellent"),
      d("Huawei Mate 60 Pro", 120, 240, 6.82, "2720×1260", "excellent"),
      d("Huawei P60 Pro", 120, 240, 6.67, "2700×1220", "good"),
      d("Huawei Mate 50 Pro", 120, 240, 6.74, "2616×1212", "good"),
    ],
  },
  {
    id: "vivo", name: "Vivo", icon: "🔵", accent: "from-indigo-400 to-blue-600",
    devices: [
      d("Vivo X200 Pro", 120, 240, 6.78, "2800×1280", "excellent"),
      d("Vivo X100 Pro", 120, 240, 6.78, "3200×1440", "excellent"),
      d("Vivo X100", 120, 240, 6.78, "2800×1260", "excellent"),
      d("iQOO 13", 144, 480, 6.82, "3168×1440", "excellent"),
      d("iQOO 12", 144, 480, 6.78, "3200×1440", "excellent"),
    ],
  },
  {
    id: "oppo", name: "OPPO", icon: "🟢", accent: "from-green-400 to-emerald-600",
    devices: [
      d("OPPO Find X8 Pro", 120, 240, 6.78, "2780×1264", "excellent"),
      d("OPPO Find X7 Ultra", 120, 240, 6.82, "3168×1440", "excellent"),
      d("OPPO Find X7", 120, 240, 6.78, "2780×1264", "excellent"),
      d("OPPO Reno 12 Pro", 120, 240, 6.7, "2412×1080", "good"),
    ],
  },
  {
    id: "other", name: "Other", icon: "📲", accent: "from-gray-400 to-gray-600",
    devices: [
      d("Generic Gaming (165Hz)", 165, 480, 6.8, "2400×1080", "excellent"),
      d("Generic High-End (120Hz)", 120, 240, 6.5, "2400×1080", "good"),
      d("Generic Mid-Range (90Hz)", 90, 180, 6.5, "2400×1080", "average"),
      d("Generic Budget (60Hz)", 60, 120, 6.5, "2400×1080", "average"),
    ],
  },
];

export type Weapon = { name: string; recoil: number; range: number; type: string };
export type WeaponCategory = { id: string; name: string; icon: string; weapons: Weapon[] };

const w = (name: string, recoil: number, range: number, type: string): Weapon => ({ name, recoil, range, type });

export const WEAPONS: WeaponCategory[] = [
  {
    id: "ar", name: "Assault Rifles", icon: "🔫",
    weapons: [
      w("M416", 52, 80, "ar"),
      w("AKM", 78, 75, "ar"),
      w("SCAR-L", 48, 80, "ar"),
      w("M762", 72, 78, "ar"),
      w("AUG", 45, 82, "ar"),
      w("M16A4", 58, 95, "ar"),
      w("G36C", 50, 80, "ar"),
      w("QBZ", 46, 82, "ar"),
      w("ACE32", 54, 78, "ar"),
      w("FAMAS", 55, 85, "ar"),
      w("Groza", 68, 80, "ar"),
      w("Mk47 Mutant", 70, 90, "ar"),
      w("Honey Badger", 40, 55, "ar"),
      w("K2", 49, 78, "ar"),
    ],
  },
  {
    id: "smg", name: "SMG", icon: "💥",
    weapons: [
      w("UMP45", 32, 45, "smg"),
      w("Micro UZI", 36, 35, "smg"),
      w("Vector", 28, 35, "smg"),
      w("Tommy Gun", 40, 45, "smg"),
      w("MP5K", 30, 45, "smg"),
      w("PP-19 Bizon", 26, 48, "smg"),
      w("P90", 34, 50, "smg"),
      w("JS9", 22, 42, "smg"),
      w("MP9", 24, 40, "smg"),
    ],
  },
  {
    id: "dmr", name: "DMR", icon: "🎯",
    weapons: [
      w("Mini14", 38, 350, "dmr"),
      w("SKS", 48, 300, "dmr"),
      w("SLR", 62, 320, "dmr"),
      w("Mk14", 72, 380, "dmr"),
      w("VSS", 22, 200, "dmr"),
      w("QBU", 42, 320, "dmr"),
      w("Mk12", 44, 350, "dmr"),
    ],
  },
  {
    id: "sniper", name: "Sniper Rifles", icon: "🔭",
    weapons: [
      w("AWM", 92, 1000, "sniper"),
      w("Kar98k", 80, 800, "sniper"),
      w("M24", 78, 850, "sniper"),
      w("Win94", 55, 400, "sniper"),
      w("Lynx AMR", 95, 900, "sniper"),
      w("Mosin Nagant", 79, 820, "sniper"),
    ],
  },
  {
    id: "lmg", name: "LMG", icon: "🔥",
    weapons: [
      w("M249", 68, 120, "lmg"),
      w("DP-28", 72, 110, "lmg"),
      w("MG3", 62, 130, "lmg"),
    ],
  },
  {
    id: "shotgun", name: "Shotguns", icon: "🧨",
    weapons: [
      w("S12K", 65, 25, "shotgun"),
      w("S1897", 85, 30, "shotgun"),
      w("S686", 90, 25, "shotgun"),
      w("DBS", 78, 28, "shotgun"),
      w("M1014", 60, 22, "shotgun"),
    ],
  },
  {
    id: "pistol", name: "Pistols", icon: "🔫",
    weapons: [
      w("P92", 25, 30, "pistol"),
      w("P1911", 22, 35, "pistol"),
      w("Desert Eagle", 55, 45, "pistol"),
      w("P18C", 32, 25, "pistol"),
      w("Scorpion", 28, 30, "pistol"),
    ],
  },
];

export type Server = {
  id: string;
  name: string;
  pubgRegion: string;
  flag: string;
  city: string;
  base: number;
  probe: string;
};

export const SERVERS: Server[] = [
  { id: "me", name: "Middle East", pubgRegion: "ME", flag: "🇦🇪", city: "Abu Dhabi", base: 50, probe: "https://www.ae/favicon.ico" },
  { id: "eu", name: "Europe", pubgRegion: "EU", flag: "🇪🇺", city: "Frankfurt", base: 128, probe: "https://speed.hetzner.de/1GB.bin" },
  { id: "in", name: "India", pubgRegion: "IN", flag: "🇮🇳", city: "Mumbai", base: 108, probe: "https://www.google.co.in/favicon.ico" },
  { id: "as", name: "Asia", pubgRegion: "AS", flag: "🇸🇬", city: "Singapore", base: 142, probe: "https://www.google.com.sg/favicon.ico" },
  { id: "krjp", name: "Korea/Japan", pubgRegion: "KRJP", flag: "🇰🇷", city: "Seoul", base: 158, probe: "https://www.google.co.kr/favicon.ico" },
  { id: "na", name: "North America", pubgRegion: "NA", flag: "🇺🇸", city: "Virginia", base: 176, probe: "https://www.google.com/favicon.ico" },
  { id: "sa", name: "South America", pubgRegion: "SA", flag: "🇧🇷", city: "São Paulo", base: 206, probe: "https://www.google.com.br/favicon.ico" },
];

// ==================== JORDAN DNS SERVERS ====================
export type DnsServer = { id: string; ip: string; label: string; isp: string; base: number };

export const JORDAN_DNS: DnsServer[] = [
  // Damamax
  { id: "dns01", ip: "94.142.37.179",   label: "JO-DNS 01", isp: "Damamax",        base: 6 },
  { id: "dns02", ip: "94.142.53.34",    label: "JO-DNS 02", isp: "Damamax",        base: 7 },
  { id: "dns10", ip: "82.212.72.18",    label: "JO-DNS 10", isp: "Damamax",        base: 7 },
  { id: "dns11", ip: "82.212.79.115",   label: "JO-DNS 11", isp: "Damamax",        base: 7 },
  { id: "dns12", ip: "82.212.84.139",   label: "JO-DNS 12", isp: "Damamax",        base: 8 },
  // Zain
  { id: "dns03", ip: "92.253.13.100",   label: "JO-DNS 03", isp: "Zain",           base: 5 },
  { id: "dns04", ip: "92.253.101.217",  label: "JO-DNS 04", isp: "Zain",           base: 6 },
  { id: "dns13", ip: "77.245.13.191",   label: "JO-DNS 13", isp: "Zain",           base: 6 },
  { id: "dns16", ip: "46.32.114.242",   label: "JO-DNS 16", isp: "Zain",           base: 6 },
  { id: "dns17", ip: "46.32.114.248",   label: "JO-DNS 17", isp: "Zain",           base: 6 },
  { id: "dns18", ip: "46.32.100.238",   label: "JO-DNS 18", isp: "Zain",           base: 7 },
  // Orange
  { id: "dns05", ip: "46.185.162.241",  label: "JO-DNS 05", isp: "Orange",         base: 8 },
  { id: "dns06", ip: "46.185.129.77",   label: "JO-DNS 06", isp: "Orange",         base: 7 },
  { id: "dns14", ip: "80.90.161.242",   label: "JO-DNS 14", isp: "Orange",         base: 7 },
  { id: "dns15", ip: "80.90.172.146",   label: "JO-DNS 15", isp: "Orange",         base: 7 },
  // Jordan Telecom
  { id: "dns07", ip: "109.237.205.149", label: "JO-DNS 07", isp: "Jordan Telecom", base: 9 },
  { id: "dns08", ip: "109.237.205.167", label: "JO-DNS 08", isp: "Jordan Telecom", base: 9 },
  // Data Vault
  { id: "dns09", ip: "213.186.174.202", label: "JO-DNS 09", isp: "Data Vault",     base: 10 },
  // ── سيرفرات إضافية ──
  { id: "dns19", ip: "37.202.67.44",    label: "JO-DNS 19", isp: "Umniah",         base: 6 },
  { id: "dns20", ip: "37.202.127.139",  label: "JO-DNS 20", isp: "Umniah",         base: 7 },
  { id: "dns21", ip: "91.106.106.138",  label: "JO-DNS 21", isp: "VTEL",           base: 5 },
  { id: "dns22", ip: "91.106.111.75",   label: "JO-DNS 22", isp: "VTEL",           base: 6 },
  { id: "dns23", ip: "91.106.99.245",   label: "JO-DNS 23", isp: "VTEL",           base: 5 },
  { id: "dns24", ip: "176.29.174.7",    label: "JO-DNS 24", isp: "Wi-Tribe",       base: 7 },
  { id: "dns25", ip: "176.29.151.152",  label: "JO-DNS 25", isp: "Wi-Tribe",       base: 8 },
  { id: "dns26", ip: "176.29.114.132",  label: "JO-DNS 26", isp: "Wi-Tribe",       base: 7 },
  { id: "dns27", ip: "217.23.37.74",    label: "JO-DNS 27", isp: "Batelco",        base: 8 },
  { id: "dns28", ip: "91.106.99.231",   label: "JO-DNS 28", isp: "VTEL",           base: 5 },
];

// ==================== PRO PROFILES ==================== 
export type ProProfileId = 
  | "alyazouri_pro"  // البروفايل المخصص - الأول والمميز
  | "balanced" | "aggressive" | "competitive" | "headshot" | "sniper" | "spray"
  | "rusher" | "camper" | "support" | "assaulter" | "flanker" | "anchor"
  | "entry_fragger" | "clutcher" | "igl" | "scout";

export type ProProfile = {
  id: ProProfileId;
  name: string;
  nameAr: string;
  icon: string;
  category: "custom" | "general" | "aggressive" | "tactical" | "specialist";
  isCustom?: boolean;  // للبروفايل المخصص
  // Stats 0-100
  recoilControl: number;
  tracking: number;
  flicking: number;
  longRange: number;
  cqcPower: number;
  // Sensitivity multipliers - الأساسية
  sensMultiplier: number;
  // TPP/FPP multipliers (مثل Entry Fragger - سريع وعدواني)
  tppMultiplier: number;
  fppMultiplier: number;
  // Scope multipliers (مثل Clutcher - ذكي ومتوازن مع قوة)
  redDotMultiplier: number;
  scope2Multiplier: number;
  scope3Multiplier: number;
  scope4Multiplier: number;
  scope6Multiplier: number;
  scope8Multiplier: number;
  // ADS & Gyro
  adsMultiplier: number;
  gyroMultiplier: number;
  // Descriptions
  description: string;
  descriptionAr: string;
  // Recommendations
  recommendedFingers: number[];
  recommendedWeapons: string[];
  recommendedGyro: "off" | "scope" | "always";
};

export const PRO_PROFILES: ProProfile[] = [
  // ===== ⭐ ALYAZOURI PRO - البروفايل المخصص ⭐ =====
  {
    id: "alyazouri_pro",
    name: "ALYAZOURI PRO",
    nameAr: "اليازوري برو",
    icon: "🦅",
    category: "custom",
    isCustom: true,
    // إحصائيات إسپورتس متوازنة — لا شيء على حساب شيء
    recoilControl: 95, tracking: 96, flicking: 95, longRange: 93, cqcPower: 96,
    // ═══ ULTIMATE AIM — قاعدة موحّدة ═══
    // 1.02: رفع بسيط للتوافق الكامل مع 120Hz/240Hz — استجابة فورية بدون تسارع
    sensMultiplier: 1.02,
    // ═══ TPP/FPP BALANCE — نقطة الذهبة ═══
    // 1.18/1.16: فوق Entry Fragger (1.14) لالتقاط هدف سريع + تتبع قريب استثنائي
    //            تحت عتبة over-drag (1.20+) → صفر تجاوز + صفر اهتزاز
    //            الفرق 0.02 بين TPP/FPP = توازن حركة طبيعي (FPP ما يفقد الهدف)
    tppMultiplier: 1.18,
    fppMultiplier: 1.16,
    // ═══ SCOPE CASCADE — منحنى لوغاريتمي منتظم ═══
    // فجوات متدرجة (0.08, 0.08, 0.08, 0.10, 0.10) = ذاكرة عضلية متّسقة بين كل سكوب
    // تبديل من 3x لـ 4x لـ 6x = نفس الإحساس بالمسافة-لكل-مليمتر
    redDotMultiplier: 0.96,  // CQC flick — سريع لكن متحكم به (صفر تجاوز)
    scope2Multiplier: 0.88,  // قريب-متوسط — تتبع ناعم
    scope3Multiplier: 0.80,  // متوسط — دقة flick + رش مضبوط
    scope4Multiplier: 0.72,  // رش بعيد مستقر — الثبات الذهبي
    scope6Multiplier: 0.62,  // بعيد — ثبات عالي بدون under-drag
    scope8Multiplier: 0.52,  // دقة بكسل — صفر اهتزاز للقنص
    // ═══ ADS — إحساس lock-on + تحكم ارتداد ═══
    // 1.04: أعلى قليلاً من 1.0 → الهدف "يلتصق" + تتبع الارتداد
    //       لكن تحت 1.08 القديم → صفر تجاوز أثناء الرش
    adsMultiplier: 1.04,
    // ═══ GYRO — تعديلات دقيقة ناعمة ═══
    // 1.08: عالي بما يكفي لـ micro-adjustments وتتبع هدف متحرك
    //       تحت 1.12 القديم → صفر اهتزاز على السكوبات
    gyroMultiplier: 1.08,
    description: "🦅 ULTIMATE AIM: Unified esports system — exceptional CQC tracking, pixel-precise scopes, zero over-drag/shake. Smooth inverse-zoom cascade for consistent muscle memory.",
    descriptionAr: "🦅 الهدف النهائي: نظام إسپورتس موحّد — تتبع قريب استثنائي، سكوبات بدقة البكسل، صفر تجاوز/اهتزاز. منحنى تكبير عكسي ناعم لذاكرة عضلية متّسقة.",
    recommendedFingers: [4, 5, 6],
    recommendedWeapons: ["M416", "M762", "Groza", "ACE32", "Mini14"],
    recommendedGyro: "always",
  },

  // ===== GENERAL =====
  {
    id: "balanced",
    name: "Balanced",
    nameAr: "متوازن",
    icon: "⚖️",
    category: "general",
    recoilControl: 78, tracking: 80, flicking: 72, longRange: 70, cqcPower: 75,
    sensMultiplier: 1.0,
    tppMultiplier: 1.0, fppMultiplier: 1.0,
    redDotMultiplier: 1.0, scope2Multiplier: 1.0, scope3Multiplier: 1.0,
    scope4Multiplier: 1.0, scope6Multiplier: 1.0, scope8Multiplier: 1.0,
    adsMultiplier: 1.0, gyroMultiplier: 1.0,
    description: "Perfect all-rounder for any situation. Best for beginners and ranked grinders.",
    descriptionAr: "مثالي لكل المواقف. الأفضل للمبتدئين ولاعبي الترتيب.",
    recommendedFingers: [3, 4], recommendedWeapons: ["M416", "SCAR-L", "UMP45"], recommendedGyro: "scope",
  },
  {
    id: "competitive",
    name: "Competitive",
    nameAr: "تنافسي",
    icon: "🏆",
    category: "general",
    recoilControl: 85, tracking: 86, flicking: 80, longRange: 82, cqcPower: 78,
    sensMultiplier: 0.95,
    tppMultiplier: 0.94, fppMultiplier: 0.92,
    redDotMultiplier: 0.95, scope2Multiplier: 0.93, scope3Multiplier: 0.90,
    scope4Multiplier: 0.88, scope6Multiplier: 0.85, scope8Multiplier: 0.82,
    adsMultiplier: 0.94, gyroMultiplier: 0.90,
    description: "Tournament-tuned precision. Lower sensitivity for consistent aim.",
    descriptionAr: "دقة مضبوطة للبطولات. حساسية أقل لتصويب ثابت.",
    recommendedFingers: [4, 5], recommendedWeapons: ["M416", "ACE32", "Mini14"], recommendedGyro: "scope",
  },

  // ===== AGGRESSIVE =====
  {
    id: "aggressive",
    name: "Aggressive",
    nameAr: "عدواني",
    icon: "⚡",
    category: "aggressive",
    recoilControl: 68, tracking: 88, flicking: 85, longRange: 55, cqcPower: 95,
    sensMultiplier: 1.08,
    tppMultiplier: 1.12, fppMultiplier: 1.10,
    redDotMultiplier: 1.05, scope2Multiplier: 1.02, scope3Multiplier: 0.98,
    scope4Multiplier: 0.95, scope6Multiplier: 0.90, scope8Multiplier: 0.85,
    adsMultiplier: 1.05, gyroMultiplier: 1.15,
    description: "Fast pushes, quick rotations. Built for rushers and entry fraggers.",
    descriptionAr: "دفع سريع، تدوير سريع. مصمم للمندفعين.",
    recommendedFingers: [4, 5, 6], recommendedWeapons: ["M762", "Groza", "Vector"], recommendedGyro: "always",
  },
  {
    id: "rusher",
    name: "Rusher",
    nameAr: "راشر",
    icon: "🏃",
    category: "aggressive",
    recoilControl: 62, tracking: 92, flicking: 88, longRange: 45, cqcPower: 98,
    sensMultiplier: 1.15,
    tppMultiplier: 1.20, fppMultiplier: 1.18,
    redDotMultiplier: 1.10, scope2Multiplier: 1.05, scope3Multiplier: 1.00,
    scope4Multiplier: 0.95, scope6Multiplier: 0.88, scope8Multiplier: 0.80,
    adsMultiplier: 1.08, gyroMultiplier: 1.25,
    description: "Maximum speed for close-quarters combat. Hip-fire focused.",
    descriptionAr: "أقصى سرعة للقتال القريب. تركيز على إطلاق الفخذ.",
    recommendedFingers: [4, 5, 6], recommendedWeapons: ["Vector", "Micro UZI", "Groza"], recommendedGyro: "always",
  },
  {
    id: "entry_fragger",
    name: "Entry Fragger",
    nameAr: "دخّال المواجهات",
    icon: "💥",
    category: "aggressive",
    recoilControl: 70, tracking: 90, flicking: 92, longRange: 50, cqcPower: 94,
    sensMultiplier: 1.12,
    tppMultiplier: 1.14, fppMultiplier: 1.14,
    redDotMultiplier: 1.06, scope2Multiplier: 1.02, scope3Multiplier: 0.98,
    scope4Multiplier: 0.94, scope6Multiplier: 0.88, scope8Multiplier: 0.82,
    adsMultiplier: 1.06, gyroMultiplier: 1.20,
    description: "First in, trade kills, clear angles. Fast flicks essential.",
    descriptionAr: "أول من يدخل، تبادل القتلى، تنظيف الزوايا.",
    recommendedFingers: [4, 5, 6], recommendedWeapons: ["M762", "AKM", "P90"], recommendedGyro: "always",
  },
  {
    id: "flanker",
    name: "Flanker",
    nameAr: "المتسلل",
    icon: "🐍",
    category: "aggressive",
    recoilControl: 72, tracking: 85, flicking: 80, longRange: 60, cqcPower: 88,
    sensMultiplier: 1.06,
    tppMultiplier: 1.10, fppMultiplier: 1.08,
    redDotMultiplier: 1.04, scope2Multiplier: 1.00, scope3Multiplier: 0.96,
    scope4Multiplier: 0.92, scope6Multiplier: 0.86, scope8Multiplier: 0.80,
    adsMultiplier: 1.02, gyroMultiplier: 1.12,
    description: "Surprise attacks from unexpected angles. Quick target switching.",
    descriptionAr: "هجمات مفاجئة من زوايا غير متوقعة.",
    recommendedFingers: [4, 5], recommendedWeapons: ["M416", "Vector", "MP5K"], recommendedGyro: "scope",
  },

  // ===== TACTICAL =====
  {
    id: "headshot",
    name: "Headshot Master",
    nameAr: "سيد الهيدشوت",
    icon: "🎯",
    category: "tactical",
    recoilControl: 74, tracking: 78, flicking: 95, longRange: 85, cqcPower: 75,
    sensMultiplier: 0.90,
    tppMultiplier: 0.92, fppMultiplier: 0.90,
    redDotMultiplier: 0.88, scope2Multiplier: 0.85, scope3Multiplier: 0.82,
    scope4Multiplier: 0.78, scope6Multiplier: 0.72, scope8Multiplier: 0.65,
    adsMultiplier: 0.85, gyroMultiplier: 0.88,
    description: "One-tap precision. Lower sensitivity for pixel-perfect headshots.",
    descriptionAr: "دقة الطلقة الواحدة. حساسية أقل لطلقات رأس مثالية.",
    recommendedFingers: [3, 4, 5], recommendedWeapons: ["AKM", "M16A4", "SKS"], recommendedGyro: "scope",
  },
  {
    id: "camper",
    name: "Tactical Holder",
    nameAr: "الحامي التكتيكي",
    icon: "🏠",
    category: "tactical",
    recoilControl: 88, tracking: 70, flicking: 65, longRange: 90, cqcPower: 60,
    sensMultiplier: 0.85,
    tppMultiplier: 0.88, fppMultiplier: 0.85,
    redDotMultiplier: 0.82, scope2Multiplier: 0.78, scope3Multiplier: 0.75,
    scope4Multiplier: 0.70, scope6Multiplier: 0.65, scope8Multiplier: 0.58,
    adsMultiplier: 0.80, gyroMultiplier: 0.78,
    description: "Hold positions, control zones. Low sensitivity for stability.",
    descriptionAr: "حماية المواقع، تحكم بالمناطق. حساسية منخفضة للثبات.",
    recommendedFingers: [2, 3, 4], recommendedWeapons: ["M416", "Mini14", "SLR"], recommendedGyro: "scope",
  },
  {
    id: "anchor",
    name: "Anchor",
    nameAr: "المرساة",
    icon: "⚓",
    category: "tactical",
    recoilControl: 90, tracking: 72, flicking: 60, longRange: 88, cqcPower: 55,
    sensMultiplier: 0.82,
    tppMultiplier: 0.85, fppMultiplier: 0.82,
    redDotMultiplier: 0.80, scope2Multiplier: 0.76, scope3Multiplier: 0.72,
    scope4Multiplier: 0.68, scope6Multiplier: 0.62, scope8Multiplier: 0.55,
    adsMultiplier: 0.78, gyroMultiplier: 0.75,
    description: "Lock down areas, provide cover. Maximum stability.",
    descriptionAr: "قفل المناطق، توفير الغطاء. أقصى ثبات.",
    recommendedFingers: [2, 3, 4], recommendedWeapons: ["DP-28", "M249", "M416"], recommendedGyro: "scope",
  },
  {
    id: "igl",
    name: "IGL Leader",
    nameAr: "قائد الفريق",
    icon: "👑",
    category: "tactical",
    recoilControl: 82, tracking: 80, flicking: 75, longRange: 80, cqcPower: 72,
    sensMultiplier: 0.94,
    tppMultiplier: 0.96, fppMultiplier: 0.94,
    redDotMultiplier: 0.92, scope2Multiplier: 0.90, scope3Multiplier: 0.88,
    scope4Multiplier: 0.85, scope6Multiplier: 0.80, scope8Multiplier: 0.75,
    adsMultiplier: 0.90, gyroMultiplier: 0.92,
    description: "Lead calls, balanced combat. Consistent and reliable.",
    descriptionAr: "قيادة النداءات، قتال متوازن. ثابت وموثوق.",
    recommendedFingers: [4, 5], recommendedWeapons: ["M416", "ACE32", "Mini14"], recommendedGyro: "scope",
  },

  // ===== SPECIALIST =====
  {
    id: "sniper",
    name: "Sniper Elite",
    nameAr: "قنّاص نخبة",
    icon: "🔭",
    category: "specialist",
    recoilControl: 80, tracking: 65, flicking: 90, longRange: 98, cqcPower: 40,
    sensMultiplier: 0.90,
    // TPP/FPP: متوسط — تقدر تتحرك وتطلّع على الأعداء
    tppMultiplier: 0.95, fppMultiplier: 0.92,
    // السكوبات: منخفضة جداً ومتدرجة حسب المسافة
    // Red Dot/2x: quickscope قريب — يحتاج سرعة معقولة للرأس القريب
    redDotMultiplier: 0.85,
    scope2Multiplier: 0.80,
    // 3x: مسافة متوسطة — أبطأ للدقة
    scope3Multiplier: 0.72,
    // 4x: المسافة الذهبية للقناصة في PUBG — بطيء ودقيق جداً
    scope4Multiplier: 0.62,
    // 6x: بعيد — بطيء جداً عشان الرأس يكون صغير
    scope6Multiplier: 0.48,
    // 8x: بعيد جداً — أبطأ شيء، بكسل واحد = الفرق بين رأس وجسم
    scope8Multiplier: 0.35,
    adsMultiplier: 0.75, gyroMultiplier: 0.80,
    description: "Long-range dominance. Ultra-low scopes for pixel-perfect headshots at every distance.",
    descriptionAr: "هيمنة بعيدة المدى. سكوبات بطيئة جداً لطلقات رأس مثالية على كل المسافات.",
    recommendedFingers: [4, 5, 6], recommendedWeapons: ["Kar98k", "M24", "AWM"], recommendedGyro: "always",
  },
  {
    id: "spray",
    name: "Spray Master",
    nameAr: "ملك الرش",
    icon: "💧",
    category: "specialist",
    recoilControl: 96, tracking: 92, flicking: 65, longRange: 70, cqcPower: 90,
    sensMultiplier: 1.05,
    tppMultiplier: 1.08, fppMultiplier: 1.05,
    redDotMultiplier: 1.10, scope2Multiplier: 1.08, scope3Multiplier: 1.05,
    scope4Multiplier: 1.02, scope6Multiplier: 0.98, scope8Multiplier: 0.92,
    adsMultiplier: 1.12, gyroMultiplier: 1.18,
    description: "Laser-like spray control. Hold down and melt enemies.",
    descriptionAr: "تحكم رش كالليزر. اضغط وأذب الأعداء.",
    recommendedFingers: [4, 5], recommendedWeapons: ["M416", "M249", "DP-28"], recommendedGyro: "scope",
  },
  {
    id: "support",
    name: "Support",
    nameAr: "الدعم",
    icon: "🛡️",
    category: "specialist",
    recoilControl: 85, tracking: 78, flicking: 68, longRange: 75, cqcPower: 70,
    sensMultiplier: 0.96,
    tppMultiplier: 0.98, fppMultiplier: 0.96,
    redDotMultiplier: 0.94, scope2Multiplier: 0.92, scope3Multiplier: 0.90,
    scope4Multiplier: 0.88, scope6Multiplier: 0.84, scope8Multiplier: 0.80,
    adsMultiplier: 0.92, gyroMultiplier: 0.95,
    description: "Cover fire, zone control. Consistent suppression.",
    descriptionAr: "نار الغطاء، تحكم المناطق. قمع ثابت.",
    recommendedFingers: [3, 4], recommendedWeapons: ["M249", "DP-28", "M416"], recommendedGyro: "scope",
  },
  {
    id: "assaulter",
    name: "Assaulter",
    nameAr: "المهاجم",
    icon: "⚔️",
    category: "specialist",
    recoilControl: 75, tracking: 85, flicking: 82, longRange: 65, cqcPower: 88,
    sensMultiplier: 1.04,
    tppMultiplier: 1.08, fppMultiplier: 1.06,
    redDotMultiplier: 1.04, scope2Multiplier: 1.00, scope3Multiplier: 0.96,
    scope4Multiplier: 0.92, scope6Multiplier: 0.86, scope8Multiplier: 0.80,
    adsMultiplier: 1.02, gyroMultiplier: 1.10,
    description: "Balanced aggression. Push with precision.",
    descriptionAr: "عدوانية متوازنة. هجوم بدقة.",
    recommendedFingers: [4, 5], recommendedWeapons: ["M416", "M762", "ACE32"], recommendedGyro: "always",
  },
  {
    id: "clutcher",
    name: "Clutcher",
    nameAr: "الكلاتشر",
    icon: "🔥",
    category: "specialist",
    recoilControl: 80, tracking: 88, flicking: 90, longRange: 75, cqcPower: 85,
    sensMultiplier: 1.02,
    // TPP/FPP: بدون تغيير - نفس السرعة
    tppMultiplier: 1.06, fppMultiplier: 1.04,
    // السكوبات: أقل = أدق = تحكم أعلى في التصويب البعيد
    redDotMultiplier: 0.88,   // كان 1.02 → أبطأ بكثير للدقة
    scope2Multiplier: 0.82,   // كان 0.98 → تحكم أفضل
    scope3Multiplier: 0.76,   // كان 0.95 → ثبات عالي
    scope4Multiplier: 0.68,   // كان 0.92 → دقة ممتازة
    scope6Multiplier: 0.58,   // كان 0.88 → تحكم دقيق جداً
    scope8Multiplier: 0.48,   // كان 0.84 → دقة بكسل
    adsMultiplier: 1.00, gyroMultiplier: 1.08,
    description: "1vX specialist. Quick TPP/FPP with surgical scope precision.",
    descriptionAr: "متخصص 1 ضد الكثير. سرعة في TPP/FPP مع دقة جراحية في السكوبات.",
    recommendedFingers: [4, 5, 6], recommendedWeapons: ["M416", "Groza", "Vector"], recommendedGyro: "always",
  },
  {
    id: "scout",
    name: "Scout",
    nameAr: "الكشّاف",
    icon: "👁️",
    category: "specialist",
    recoilControl: 78, tracking: 82, flicking: 78, longRange: 85, cqcPower: 65,
    sensMultiplier: 0.98,
    tppMultiplier: 1.00, fppMultiplier: 0.98,
    redDotMultiplier: 0.96, scope2Multiplier: 0.94, scope3Multiplier: 0.92,
    scope4Multiplier: 0.90, scope6Multiplier: 0.86, scope8Multiplier: 0.82,
    adsMultiplier: 0.94, gyroMultiplier: 0.96,
    description: "Information gatherer. Spot enemies, call positions.",
    descriptionAr: "جامع المعلومات. رصد الأعداء، نداء المواقع.",
    recommendedFingers: [3, 4], recommendedWeapons: ["Mini14", "SKS", "M416"], recommendedGyro: "scope",
  },
];

export const FINGERS = [2, 3, 4, 5, 6];

export type { WeaponProfile };
