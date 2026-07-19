import type { WeaponProfile } from "./weaponProfiles";

export type Device = {
  name: string;
  fps: number;
  touchRate: number; // Hz
  screenSize: number; // inches
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
      d("iPad Air M2", 60, 120, 11.0, "2360×1640", "excellent"),
      d("iPad Air 5", 60, 120, 10.9, "2360×1640", "good"),
      d("iPad Mini 6", 60, 120, 8.3, "2266×1488", "good"),
      d("iPad 10", 60, 60, 10.9, "2360×1640", "average"),
      d("iPad Pro 13 (M5)", 120, 240, 13.0, "2752×2064", "excellent"),
      d("iPad Pro 11 (M5)", 120, 240, 11.0, "2420×1668", "excellent"),
      d("iPad Pro 12.9 (M1)", 120, 240, 12.9, "2732×2048", "excellent"),
      d("iPad Pro 11 (M1)", 120, 240, 11.0, "2388×1668", "excellent"),
      d("iPad Pro 12.9 (4th Gen)", 120, 240, 12.9, "2732×2048", "excellent"),
      d("iPad Pro 11 (2nd Gen)", 120, 240, 11.0, "2388×1668", "excellent"),
      d("iPad Pro 12.9 (3rd Gen)", 120, 120, 12.9, "2732×2048", "good"),
      d("iPad Pro 11 (1st Gen)", 120, 120, 11.0, "2388×1668", "good"),
      d("iPad Pro 12.9 (2nd Gen)", 120, 120, 12.9, "2732×2048", "good"),
      d("iPad Pro 10.5", 120, 120, 10.5, "2224×1668", "good"),
      d("iPad Pro 9.7", 60, 120, 9.7, "2048×1536", "average"),
      d("iPad Air M3", 60, 120, 11.0, "2360×1640", "excellent"),
      d("iPad Air M1", 60, 120, 10.9, "2360×1640", "excellent"),
      d("iPad Air 4", 60, 120, 10.9, "2360×1640", "good"),
      d("iPad Air 3", 60, 120, 10.5, "2224×1668", "good"),
      d("iPad Air 2", 60, 120, 9.7, "2048×1536", "average"),
      d("iPad Air 1", 60, 60, 9.7, "2048×1536", "average"),
      d("iPad Mini 7 (A17 Pro)", 60, 120, 8.3, "2266×1488", "excellent"),
      d("iPad Mini 5", 60, 120, 7.9, "2048×1536", "good"),
      d("iPad Mini 4", 60, 60, 7.9, "2048×1536", "average"),
      d("iPad 11 (A16)", 60, 120, 10.9, "2360×1640", "good"),
      d("iPad 9", 60, 60, 10.2, "2160×1620", "average"),
      d("iPad 8", 60, 60, 10.2, "2160×1620", "average"),
      d("iPad 7", 60, 60, 10.2, "2160×1620", "average"),
      d("iPad 6", 60, 60, 9.7, "2048×1536", "average"),
      d("iPad 5", 60, 60, 9.7, "2048×1536", "average"),
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
      d("Galaxy S22 Ultra", 120, 240, 6.8, "3088×1440", "excellent"),
      d("Galaxy S23+", 120, 240, 6.6, "2340×1080", "excellent"),
      d("Galaxy S23", 120, 240, 6.1, "2340×1080", "excellent"),
      d("Galaxy Z Fold 6", 120, 240, 7.6, "2160×1856", "excellent"),
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
      d("ROG Phone 8 Pro", 165, 720, 6.78, "2400×1080", "excellent"),
      d("ROG Phone 7 Ultimate", 165, 720, 6.78, "2400×1080", "excellent"),
    ],
  },
  {
    id: "oneplus", name: "OnePlus", icon: "⚡", accent: "from-red-400 to-pink-600",
    devices: [
      d("OnePlus 13", 120, 240, 6.82, "3168×1440", "excellent"),
      d("OnePlus 12", 120, 240, 6.82, "3168×1440", "excellent"),
      d("OnePlus 11", 120, 240, 6.7, "3216×1440", "excellent"),
      d("OnePlus 12R", 120, 240, 6.78, "2780×1264", "good"),
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
      d("Realme 12 Pro+", 120, 240, 6.7, "2412×1080", "good"),
    ],
  },
  {
    id: "huawei", name: "Huawei", icon: "🌸", accent: "from-rose-400 to-pink-600",
    devices: [
      d("Huawei P60 Pro", 120, 240, 6.67, "2700×1220", "good"),
      d("Huawei Mate 50 Pro", 120, 240, 6.74, "2616×1212", "good"),
      d("Huawei P50 Pro", 120, 240, 6.6, "2700×1228", "good"),
      d("Huawei Nova 11 Pro", 120, 240, 6.78, "2652×1200", "average"),
    ],
  },
  {
    id: "honor", name: "Honor", icon: "✨", accent: "from-sky-400 to-blue-600",
    devices: [
      d("Honor Magic 7 Pro", 120, 240, 6.78, "2800×1280", "excellent"),
      d("Honor Magic 6 Pro", 120, 240, 6.78, "2800×1280", "excellent"),
      d("Honor 200 Pro", 120, 240, 6.78, "2700×1224", "good"),
    ],
  },
  {
    id: "oppo", name: "OPPO", icon: "🟢", accent: "from-green-400 to-emerald-600",
    devices: [
      d("OPPO Find X8 Pro", 120, 240, 6.78, "2780×1264", "excellent"),
      d("OPPO Find X7 Ultra", 120, 240, 6.82, "3168×1440", "excellent"),
      d("OPPO Reno 12 Pro", 120, 240, 6.7, "2412×1080", "good"),
    ],
  },
  {
    id: "vivo", name: "Vivo", icon: "🔵", accent: "from-indigo-400 to-blue-600",
    devices: [
      d("Vivo X200 Pro", 120, 240, 6.78, "2800×1280", "excellent"),
      d("Vivo X100 Pro", 120, 240, 6.78, "3200×1440", "excellent"),
      d("Vivo V30 Pro", 120, 240, 6.78, "2800×1264", "good"),
    ],
  },
  {
    id: "google", name: "Google", icon: "🔷", accent: "from-cyan-400 to-teal-600",
    devices: [
      d("Pixel 9 Pro XL", 120, 240, 6.8, "2992×1344", "excellent"),
      d("Pixel 9 Pro", 120, 240, 6.3, "2856×1280", "excellent"),
      d("Pixel 8 Pro", 120, 240, 6.7, "2992×1344", "excellent"),
      d("Pixel 8", 120, 240, 6.2, "2400×1080", "excellent"),
      d("Pixel 7 Pro", 120, 240, 6.7, "3120×1440", "good"),
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
      d("Red Magic 7S Pro", 120, 960, 6.8, "2400×1080", "excellent"),
      d("Red Magic 7 Pro", 120, 960, 6.8, "2400×1080", "excellent"),
      d("Red Magic 7", 165, 720, 6.8, "2400×1080", "excellent"),
      d("Red Magic 6S Pro", 165, 720, 6.8, "2400×1080", "excellent"),
      d("Red Magic 6 Pro", 165, 500, 6.8, "2400×1080", "excellent"),
      d("Red Magic 6R", 144, 360, 6.67, "2400×1080", "excellent"),
      d("Red Magic 6", 165, 500, 6.8, "2400×1080", "excellent"),
      d("Red Magic 5S", 144, 240, 6.65, "2340×1080", "good"),
      d("Red Magic 5G", 144, 240, 6.65, "2340×1080", "good"),
      d("Red Magic 5G Lite", 60, 180, 6.65, "2340×1080", "average"),
      d("Red Magic 3S", 90, 240, 6.65, "2340×1080", "good"),
      d("Red Magic 3", 90, 240, 6.65, "2340×1080", "good"),
      d("Red Magic Tablet Pro", 144, 480, 12.1, "2560×1600", "excellent"),
      d("Red Magic Tablet", 120, 360, 10.9, "2560×1600", "excellent"),
    ],
  },
  {
    id: "other", name: "Other", icon: "📲", accent: "from-gray-400 to-gray-600",
    devices: [
      d("Generic High-End (120Hz)", 120, 240, 6.5, "2400×1080", "good"),
      d("Generic Mid-Range (90Hz)", 90, 180, 6.5, "2400×1080", "average"),
      d("Generic Budget (60Hz)", 60, 120, 6.5, "2400×1080", "average"),
      d("Low-End Device (30-60Hz)", 60, 60, 6.0, "1600×720", "average"),
    ],
  },
];

export type Weapon = { name: string; recoil: number; range: number; type: string };
export type WeaponCategory = { id: string; name: string; icon: string; weapons: Weapon[] };

const w = (name: string, recoil: number, range: number, type: string): Weapon => ({ name, recoil, range, type });

export const WEAPONS: WeaponCategory[] = [
  {
    id: "ar", name: "Assault Rifles", icon: "🔫", weapons: [
      w("M416", 52, 80, "ar"), w("AKM", 78, 75, "ar"), w("SCAR-L", 48, 80, "ar"),
      w("M762", 72, 78, "ar"), w("AUG", 45, 82, "ar"), w("M16A4", 58, 95, "ar"),
      w("G36C", 50, 80, "ar"), w("QBZ", 46, 82, "ar"), w("ACE32", 54, 78, "ar"),
      w("FAMAS", 55, 85, "ar"), w("Groza", 68, 80, "ar"), w("Mk47 Mutant", 70, 90, "ar"),
      w("Honey Badger", 40, 55, "ar"), w("K2", 49, 78, "ar"),
    ],
  },
  {
    id: "smg", name: "SMG", icon: "💥", weapons: [
      w("UMP45", 32, 45, "smg"), w("Micro UZI", 36, 35, "smg"), w("Vector", 28, 35, "smg"),
      w("Tommy Gun", 40, 45, "smg"), w("MP5K", 30, 45, "smg"), w("PP-19 Bizon", 26, 48, "smg"),
      w("P90", 34, 50, "smg"), w("UMP9", 33, 45, "smg"), w("JS9", 22, 42, "smg"), w("MP9", 24, 40, "smg"),
    ],
  },
  {
    id: "dmr", name: "DMR", icon: "🎯", weapons: [
      w("Mini14", 38, 350, "dmr"), w("SKS", 48, 300, "dmr"), w("SLR", 62, 320, "dmr"),
      w("Mk14", 72, 380, "dmr"), w("DMR", 58, 300, "dmr"), w("VSS", 22, 200, "dmr"),
      w("QBU", 42, 320, "dmr"), w("Mk12", 44, 350, "dmr"), w("Dragunov", 75, 400, "dmr"),
    ],
  },
  {
    id: "sniper", name: "Sniper Rifles", icon: "🔭", weapons: [
      w("AWM", 92, 1000, "sniper"), w("Kar98k", 80, 800, "sniper"), w("M24", 78, 850, "sniper"),
      w("Win94", 55, 400, "sniper"), w("Lynx AMR", 95, 900, "sniper"), w("Mosin Nagant", 79, 820, "sniper"),
    ],
  },
  {
    id: "lmg", name: "LMG", icon: "🔥", weapons: [
      w("M249", 68, 120, "lmg"), w("DP-28", 72, 110, "lmg"), w("MG3", 62, 130, "lmg"),
    ],
  },
  {
    id: "shotgun", name: "Shotguns", icon: "🧨", weapons: [
      w("S12K", 65, 25, "shotgun"), w("S1897", 85, 30, "shotgun"), w("S686", 90, 25, "shotgun"),
      w("DBS", 78, 28, "shotgun"), w("M1014", 60, 22, "shotgun"), w("NS2000", 92, 35, "shotgun"),
      w("O12", 55, 20, "shotgun"), w("Sawed-Off", 95, 15, "shotgun"),
    ],
  },
  {
    id: "pistol", name: "Pistols", icon: "🔫", weapons: [
      w("P92", 25, 30, "pistol"), w("P1911", 22, 35, "pistol"), w("R1895", 40, 40, "pistol"),
      w("Desert Eagle", 55, 45, "pistol"), w("P18C", 32, 25, "pistol"), w("Scorpion", 28, 30, "pistol"),
      w("R45", 45, 38, "pistol"),
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
  { id: "me",   name: "Middle East",   pubgRegion: "ME",   flag: "🇦🇪", city: "Abu Dhabi",  base: 50,  probe: "https://www.ae/favicon.ico" },
  { id: "eu",   name: "Europe",        pubgRegion: "EU",   flag: "🇪🇺", city: "Frankfurt",  base: 128, probe: "https://speed.hetzner.de/1GB.bin" },
  { id: "in",   name: "India",         pubgRegion: "IN",   flag: "🇮🇳", city: "Mumbai",     base: 108, probe: "https://www.google.co.in/favicon.ico" },
  { id: "as",   name: "Asia",          pubgRegion: "AS",   flag: "🇸🇬", city: "Singapore",  base: 142, probe: "https://www.google.com.sg/favicon.ico" },
  { id: "krjp", name: "Korea/Japan",   pubgRegion: "KRJP", flag: "🇰🇷", city: "Seoul",      base: 158, probe: "https://www.google.co.kr/favicon.ico" },
  { id: "na",   name: "North America", pubgRegion: "NA",   flag: "🇺🇸", city: "Virginia",   base: 176, probe: "https://www.google.com/favicon.ico" },
  { id: "sa",   name: "South America", pubgRegion: "SA",   flag: "🇧🇷", city: "São Paulo",  base: 206, probe: "https://www.google.com.br/favicon.ico" },
];

export type DnsServer = { id: string; ip: string; label: string; isp: string; base: number };

export const JORDAN_DNS: DnsServer[] = [
  { id: "dns01", ip: "94.142.37.179",   label: "JO-DNS 01", isp: "Damamax",        base: 6 },
  { id: "dns02", ip: "94.142.53.34",    label: "JO-DNS 02", isp: "Damamax",        base: 7 },
  { id: "dns03", ip: "92.253.13.100",   label: "JO-DNS 03", isp: "Zain",           base: 5 },
  { id: "dns04", ip: "92.253.101.217",  label: "JO-DNS 04", isp: "Zain",           base: 6 },
  { id: "dns05", ip: "46.185.162.241",  label: "JO-DNS 05", isp: "Orange",         base: 8 },
  { id: "dns06", ip: "46.185.129.77",   label: "JO-DNS 06", isp: "Orange",         base: 7 },
  { id: "dns07", ip: "109.237.205.149", label: "JO-DNS 07", isp: "Jordan Telecom", base: 9 },
  { id: "dns08", ip: "109.237.205.167", label: "JO-DNS 08", isp: "Jordan Telecom", base: 9 },
  { id: "dns09", ip: "213.186.174.202", label: "JO-DNS 09", isp: "Data Vault",     base: 10 },
  { id: "dns10", ip: "82.212.72.18",    label: "JO-DNS 10", isp: "Damamax",        base: 7 },
  { id: "dns11", ip: "82.212.79.115",   label: "JO-DNS 11", isp: "Damamax",        base: 7 },
  { id: "dns12", ip: "82.212.84.139",   label: "JO-DNS 12", isp: "Damamax",        base: 8 },
  { id: "dns13", ip: "77.245.13.191",   label: "JO-DNS 13", isp: "Zain",           base: 6 },
  { id: "dns14", ip: "80.90.161.242",   label: "JO-DNS 14", isp: "Orange",         base: 7 },
  { id: "dns15", ip: "80.90.172.146",   label: "JO-DNS 15", isp: "Orange",         base: 7 },
  { id: "dns16", ip: "46.32.114.242",   label: "JO-DNS 16", isp: "Zain",           base: 6 },
  { id: "dns17", ip: "46.32.114.248",   label: "JO-DNS 17", isp: "Zain",           base: 6 },
  { id: "dns18", ip: "46.32.100.238",   label: "JO-DNS 18", isp: "Zain",           base: 7 },
];

// ==================== PRO PLAYER PRESETS (#36 Transfer Learning) ====================
export type ProPlayer = {
  name: string; flag: string; style: string; fingers: number;
  gyro: "off" | "scope" | "always"; device: string; weapon: string;
  sens: { cam: number[]; ads: number[]; gyro: number[]; adsGyro: number[] };
};

export const PRO_PLAYERS: ProPlayer[] = [
  {
    name: "Jonathan Gaming", flag: "🇮🇳", style: "aggressive", fingers: 4, gyro: "always",
    device: "iPhone 15 Pro Max", weapon: "M416",
    sens: { cam: [95,70,60,30,25,18,15,12], ads: [95,70,60,35,30,25,22,12], gyro: [300,300,300,300,236,171,101,76], adsGyro:[300,300,300,301,236,171,101,76] },
  },
  {
    name: "ScoutOP", flag: "🇮🇳", style: "headshot", fingers: 4, gyro: "scope",
    device: "iPad Pro M2", weapon: "M416",
    sens: { cam: [90,85,55,30,25,20,15,12], ads: [90,85,60,35,30,25,20,14], gyro: [0,0,400,300,275,200,170,70], adsGyro:[0,0,400,350,275,200,170,100] },
  },
  {
    name: "Levinho", flag: "🇧🇷", style: "balanced", fingers: 4, gyro: "always",
    device: "ROG Phone 8 Pro", weapon: "M416",
    sens: { cam: [100,95,60,35,30,22,15,12], ads: [100,95,60,38,30,25,18,12], gyro: [350,350,340,300,250,180,100,80], adsGyro:[370,370,350,310,260,190,110,85] },
  },
  {
    name: "Mortal", flag: "🇮🇳", style: "aggressive", fingers: 4, gyro: "always",
    device: "iPhone 14 Pro Max", weapon: "AKM",
    sens: { cam: [110,100,65,40,30,22,18,14], ads: [105,95,65,42,33,28,22,15], gyro: [380,370,350,310,260,180,110,90], adsGyro:[400,390,360,330,280,200,120,95] },
  },
  {
    name: "Athena Gaming", flag: "🇮🇳", style: "spray", fingers: 4, gyro: "always",
    device: "iPhone 14 Pro Max", weapon: "M416",
    sens: { cam: [120,110,70,45,35,25,18,13], ads: [110,100,65,45,35,28,20,15], gyro: [400,400,380,340,280,220,130,100], adsGyro:[400,400,390,360,300,240,140,105] },
  },
];

export function getProSens(player: ProPlayer, scopeIdx: number, table: "cam" | "ads" | "gyro" | "adsGyro"): number {
  const arr = player.sens[table];
  return arr[Math.min(scopeIdx, arr.length - 1)] ?? 50;
}

export const FINGERS = [2, 3, 4, 5, 6];

// ==================== PRO PROFILES ====================
export type ProProfileId = "balanced" | "aggressive" | "competitive" | "headshot" | "sniper" | "spray" | "elite" | "max";

export type ProProfile = {
  id: ProProfileId; name: string; nameAr: string; icon: string;
  recoilControl: number; tracking: number; flicking: number; longRange: number; cqcPower: number;
  sensMultiplier: number;
  description: string; descriptionAr: string;
  strengths: string[]; strengthsAr: string[];
  weaknesses: string[]; weaknessesAr: string[];
  bestFor: string[]; bestForAr: string[];
};

export const PRO_PROFILES: ProProfile[] = [
  {
    id: "balanced", name: "Balanced", nameAr: "متوازن", icon: "⚖️",
    recoilControl: 78, tracking: 80, flicking: 72, longRange: 70, cqcPower: 75, sensMultiplier: 1.0,
    description: "A stable all-rounder for every situation — equally good at spray and tap fire.",
    descriptionAr: "بروفايل متوازن لكل المواقف — جيد بنفس القدر في الرش والنقر.",
    strengths: ["Versatile", "Forgiving recoil", "Great for ranking"],
    strengthsAr: ["متعدد الاستخدامات", "ارتداد متسامح", "ممتاز للترتيب"],
    weaknesses: ["Not specialized"], weaknessesAr: ["غير متخصص"],
    bestFor: ["Beginners", "Ranked grinders", "All-rounders"],
    bestForAr: ["المبتدئون", "لاعبو الترتيب", "الشاملون"],
  },
  {
    id: "aggressive", name: "Aggressive", nameAr: "عدواني", icon: "⚡",
    recoilControl: 70, tracking: 88, flicking: 82, longRange: 60, cqcPower: 92, sensMultiplier: 1.06,
    description: "Fast pushes and high mobility — built for rushers and entry fraggers.",
    descriptionAr: "دفع سريع وحركة عالية — مصمم للمندفعين ودخول المواجهات.",
    strengths: ["Fast rotations", "Strong CQC", "High DPS pressure"],
    strengthsAr: ["تدوير سريع", "قوي قريب", "ضغط ضرر عالٍ"],
    weaknesses: ["Recoil harder", "Weaker at range"],
    weaknessesAr: ["ارتداد أصعب", "أضعف من بعيد"],
    bestFor: ["Rushers", "Entry fraggers", "Squad leaders"],
    bestForAr: ["المندفعون", "دخّالو المواجهات", "قادة الفريق"],
  },
  {
    id: "competitive", name: "Competitive", nameAr: "تنافسي", icon: "🏆",
    recoilControl: 85, tracking: 86, flicking: 80, longRange: 82, cqcPower: 78, sensMultiplier: 0.97,
    description: "Tournament-tuned precision with controlled, predictable recoil.",
    descriptionAr: "دقة مضبوطة للبطولات مع ارتداد منضبط ومتوقع.",
    strengths: ["Tournament ready", "Predictable recoil", "Consistent aim"],
    strengthsAr: ["جاهز للبطولات", "ارتداد متوقع", "تصويب ثابت"],
    weaknesses: ["Requires skill", "Slower reactions"],
    weaknessesAr: ["يتطلب مهارة", "ردود فعل أبطأ"],
    bestFor: ["Pro players", "Tournaments", "Squad IGL"],
    bestForAr: ["المحترفون", "البطولات", "قائد الفريق"],
  },
  {
    id: "headshot", name: "Headshot", nameAr: "هيدشوت", icon: "🎯",
    recoilControl: 74, tracking: 78, flicking: 95, longRange: 84, cqcPower: 80, sensMultiplier: 0.93,
    description: "Maximized first-shot accuracy for clean headshots and flicks.",
    descriptionAr: "أقصى دقة للطلقة الأولى لرأس نظيف وفليك سريع.",
    strengths: ["One-tap power", "Insane flicks", "High headshot %"],
    strengthsAr: ["قوة الطلقة الواحدة", "فليك خارق", "نسبة رأس عالية"],
    weaknesses: ["Hard to spray", "Needs practice"],
    weaknessesAr: ["صعب الرش", "يحتاج تمرين"],
    bestFor: ["Aimers", "Sniper-AR hybrids", "Clutch players"],
    bestForAr: ["المصوّبون", "هجين قناص-رشاش", "لاعبو الكلاتش"],
  },
  {
    id: "sniper", name: "Sniper Elite", nameAr: "قنّاص نخبة", icon: "🔭",
    recoilControl: 80, tracking: 70, flicking: 90, longRange: 98, cqcPower: 50, sensMultiplier: 0.88,
    description: "Long-range dominance with ultra-low scope sensitivity for pixel-precision.",
    descriptionAr: "هيمنة بعيدة المدى بحساسية سكوب منخفضة جداً لدقة البكسل.",
    strengths: ["Long-range king", "Stable scopes", "Quick peek"],
    strengthsAr: ["ملك البعيد", "سكوب ثابت", "إطلالة سريعة"],
    weaknesses: ["Weak in CQC", "Position dependent"],
    weaknessesAr: ["ضعيف قريب", "يعتمد على الموقع"],
    bestFor: ["Snipers", "Overwatch", "Marksman"],
    bestForAr: ["القنّاصون", "الغطاء البعيد", "رامي النخبة"],
  },
  {
    id: "spray", name: "Spray Master", nameAr: "ملك الرش", icon: "💧",
    recoilControl: 96, tracking: 90, flicking: 68, longRange: 72, cqcPower: 88, sensMultiplier: 1.04,
    description: "Laser-like spray control — perfect for full-auto hold-down fights.",
    descriptionAr: "تحكم رش كالليزر — مثالي لمعارك الرش التلقائي المستمر.",
    strengths: ["Laser spray", "Great tracking", "Forgiving"],
    strengthsAr: ["رش كالليزر", "تتبع ممتاز", "متسامح"],
    weaknesses: ["Weaker flicks", "Tapping worse"],
    weaknessesAr: ["فليك أضعف", "النقر أضعف"],
    bestFor: ["Sprayers", "LMG users", "Zone fighters"],
    bestForAr: ["الرشّاشون", "مستخدمو LMG", "مقاتلو المنطقة"],
  },
  {
    id: "elite", name: "ELITE", nameAr: "إليت", icon: "💎",
    recoilControl: 92, tracking: 94, flicking: 88, longRange: 90, cqcPower: 96, sensMultiplier: 1.15,
    description: "The ultimate all-in-one — CQC melt + laser spray + headshot precision + vehicle track.",
    descriptionAr: "الأسطورة الشاملة — رش قريب يذوب + ليزر بعيد + طلقات رقبة + تتبع مركبات.",
    strengths: ["CQC GOD", "Laser long spray", "Headshot magnet", "Vehicle tracking"],
    strengthsAr: ["ملك القريب", "رش ليزر بعيد", "مغناطيس رأس", "تتبع مركبات"],
    weaknesses: ["Needs practice", "Aggressive recoil feel"],
    weaknessesAr: ["يحتاج تمرين", "ارتداد قوي للتعود"],
    bestFor: ["PRO ELITE players", "Tournament winners", "CQC + Long hybrids"],
    bestForAr: ["لاعبو النخبة", "أبطال البطولات", "هجين قريب + بعيد"],
  },
  {
    id: "max", name: "MAX POWER", nameAr: "ماكس باور", icon: "⚡",
    recoilControl: 100, tracking: 100, flicking: 95, longRange: 95, cqcPower: 100, sensMultiplier: 1.25,
    description: "Absolute maximum performance — every stat at peak. For the fearless.",
    descriptionAr: "أقصى أداء مطلق — كل الإحصائيات في الذروة. للشجعان فقط.",
    strengths: ["Maximum everything", "No limits", "Pure domination"],
    strengthsAr: ["أقصى كل شيء", "بلا حدود", "هيمنة مطلقة"],
    weaknesses: ["Overwhelming for beginners", "Unforgiving mistakes"],
    weaknessesAr: ["ساحق للمبتدئين", "لا يرحم الأخطاء"],
    bestFor: ["Absolute legends", "Rank 1 grinders", "Fearless warriors"],
    bestForAr: ["أساطير مطلقة", "مقاتلو المرتبة الأولى", "محاربون بلا خوف"],
  },
];

export type ProRecommendation = {
  gyro: "off" | "scope" | "always"; minFingers: number; preferredWeaponName: string;
  weaponFocus: string[]; weaponFocusAr: string[];
  note: string; noteAr: string;
  featureStack: string[]; featureStackAr: string[];
  warmup: string[]; warmupAr: string[];
};

export const PRO_RECOMMENDATIONS: Record<string, ProRecommendation> = {
  balanced: {
    gyro: "scope", minFingers: 3, preferredWeaponName: "M416",
    weaponFocus: ["AR", "SMG"], weaponFocusAr: ["رشاش هجومي", "رشاش خفيف"],
    note: "Start here. Balanced values adapt to nearly every weapon and situation.",
    noteAr: "ابدأ من هنا. القيم المتوازنة تتأقلم مع كل سلاح وموقف.",
    featureStack: ["Crosshair placement", "Mini-map reading", "Recoil reset"],
    featureStackAr: ["وضع الكروسهير", "قراءة الخريطة المصغّرة", "تصفير الارتداد"],
    warmup: ["5 min TDM", "Spray drill ×3", "Flick targets ×10"],
    warmupAr: ["5 دقائق TDM", "تمرين رش ×3", "أهداف فليك ×10"],
  },
  aggressive: {
    gyro: "always", minFingers: 4, preferredWeaponName: "M762",
    weaponFocus: ["SMG", "AR"], weaponFocusAr: ["رشاش خفيف", "رشاش هجومي"],
    note: "Higher sens for fast pushes — pair with Always-On gyro for tracking.",
    noteAr: "حساسية أعلى للدفع السريع — اقرنها مع جايرو دائم للتتبع.",
    featureStack: ["Pre-fire", "Peeker's advantage", "Slide-shoot"],
    featureStackAr: ["الإطلاق المسبق", "أفضلية المطلّ", "انزلاق-إطلاق"],
    warmup: ["3 min CQC drill", "Hip-fire ×20", "Rotation map review"],
    warmupAr: ["3 دقائق تدريب قريب", "إطلاق من الفخذ ×20", "مراجعة خريطة التدوير"],
  },
  competitive: {
    gyro: "scope", minFingers: 4, preferredWeaponName: "ACE32",
    weaponFocus: ["AR", "DMR"], weaponFocusAr: ["رشاش هجومي", "DMR"],
    note: "Tournament consistency — lower, predictable sens for repeatable aim.",
    noteAr: "ثبات البطولات — حساسية منخفضة متوقعة لتصويب قابل للتكرار.",
    featureStack: ["Angle holding", "Trade kills", "Utility timing"],
    featureStackAr: ["حماية الزوايا", "تبادل القتلى", "توقيت الأدوات"],
    warmup: ["10 min ranked warmup", "Crosshair drill", "Recoil patterns"],
    warmupAr: ["10 دقائق تسخين ترتيب", "تمرين كروسهير", "أنماط الارتداد"],
  },
  headshot: {
    gyro: "scope", minFingers: 3, preferredWeaponName: "AKM",
    weaponFocus: ["AR", "Sniper"], weaponFocusAr: ["رشاش هجومي", "قنّاص"],
    note: "Lower sens for one-tap accuracy — head-level crosshair is mandatory.",
    noteAr: "حساسية أقل لدقة الطلقة الواحدة — كروسهير بمستوى الرأس إلزامي.",
    featureStack: ["Head-level crosshair", "Burst control", "Pre-aim"],
    featureStackAr: ["كروسهير بمستوى الرأس", "تحكم الطلقات", "تصويب مسبق"],
    warmup: ["Flick targets ×30", "One-tap TDM", "Headshot only drill"],
    warmupAr: ["أهداف فليك ×30", "TDM طلقة واحدة", "تمرين رأس فقط"],
  },
  sniper: {
    gyro: "always", minFingers: 4, preferredWeaponName: "Kar98k",
    weaponFocus: ["Sniper", "DMR"], weaponFocusAr: ["قنّاص", "DMR"],
    note: "Ultra-low scope sens for pixel aim — Always-On gyro smooths micro-adjustments.",
    noteAr: "حساسية سكوب منخفضة جداً للتصويب الدقيق — جايرو دائم ينعّم التعديلات الدقيقة.",
    featureStack: ["Quick-scope", "Counter-strafe", "Peek timing"],
    featureStackAr: ["سكوب سريع", "كسر الحركة", "توقيت الإطلالة"],
    warmup: ["Flick ×20", "Quickscope drill", "No-scope CQC"],
    warmupAr: ["فليك ×20", "تمرين سكوب سريع", "بدون سكوب قريب"],
  },
  spray: {
    gyro: "scope", minFingers: 4, preferredWeaponName: "M249",
    weaponFocus: ["LMG", "AR"], weaponFocusAr: ["LMG", "رشاش هجومي"],
    note: "High recoil-control sens for hold-down sprays — burst at range.",
    noteAr: "حساسية بتحكم ارتداد عالٍ للرش المستمر — استخدم الطلقات من بعيد.",
    featureStack: ["Spray transfer", "Crouch-spray", "Burst at range"],
    featureStackAr: ["نقل الرش", "رش من القرفصة", "طلقات من بعيد"],
    warmup: ["Spray drill ×5", "Transfer targets", "Burst accuracy"],
    warmupAr: ["تمرين رش ×5", "نقل الأهداف", "دقة الطلقات"],
  },
  elite: {
    gyro: "always", minFingers: 4, preferredWeaponName: "M416",
    weaponFocus: ["AR", "SMG"], weaponFocusAr: ["رشاش هجومي", "رشاش خفيف"],
    note: "The ONE — CQC melt + laser long + neck lock + vehicle track + sticky aim. Just win.",
    noteAr: "الأسطورة — رش قريب يذوب + ليزر بعيد + رقبة + تتبع مركبات + إلصاق. فقط اربح.",
    featureStack: ["CQC aimbot feel", "Laser 6× spray", "Neck lock precision", "Vehicle Free Look 199%"],
    featureStackAr: ["إحساس ايم بوت قريب", "رش 6× ليزر", "دقة رقبة متناهية", "فري لوك مركبات 199%"],
    warmup: ["3 min CQC drill", "5 min M416 50m spray", "Headshot only ×20"],
    warmupAr: ["3 دقائق تدريب قريب", "5 دقائق رش M416", "رأس فقط ×20"],
  },
  max: {
    gyro: "always", minFingers: 4, preferredWeaponName: "M416",
    weaponFocus: ["AR", "SMG", "Sniper"], weaponFocusAr: ["رشاش", "خفيف", "قنّاص"],
    note: "MAXIMUM EVERYTHING — sensMultiplier 1.25. No fear. No limits. Pure destruction.",
    noteAr: "أقصى كل شيء — مضاعف 1.25. بلا خوف. بلا حدود. دمار شامل.",
    featureStack: ["Max sens output", "Hyper gyro", "360° domination"],
    featureStackAr: ["أقصى حساسية", "جايرو خارق", "هيمنة 360°"],
    warmup: ["5 min full send", "All scopes ×5", "Rage mode ON"],
    warmupAr: ["5 دقائق اندفاع كامل", "كل السكوبات ×5", "وضع الهيجان"],
  },
};

// Re-export for convenience
export type { WeaponProfile };
