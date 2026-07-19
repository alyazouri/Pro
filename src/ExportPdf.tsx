import { useState } from "react";
import { useLang } from "./LanguageContext";
import type { Sens, ScopeSens } from "./sensitivity";

interface Props {
  sens: Sens;
  deviceName: string;
  weaponName: string;
  profileName: string;
  profileIcon: string;
  fingers: number;
  gyroMode: string;
  aiScore: number;
}

function scopeRows(data: ScopeSens, labels: string[]): string[][] {
  const keys: (keyof ScopeSens)[] = ["tpp","fpp","noScope","red","scope2","scope3","scope4","scope6","scope8"];
  return keys.map((k, i) => [labels[i], `${data[k]}%`]);
}

function buildHtml(p: Props, isAr: boolean): string {
  const dir = isAr ? "rtl" : "ltr";
  const font = isAr ? "Cairo, Arial, sans-serif" : "Inter, Arial, sans-serif";
  const t = (ar: string, en: string) => isAr ? ar : en;

  const labels = [
    t("TPP بدون سكوب", "TPP No Scope"),
    t("FPP بدون سكوب", "FPP No Scope"),
    t("بدون سكوب", "No Scope"),
    t("ريد دوت / هولو", "Red Dot / Holo"),
    t("2x سكوب", "2x Scope"),
    t("3x سكوب", "3x Scope"),
    t("4x سكوب / VSS", "4x Scope / VSS"),
    t("6x سكوب", "6x Scope"),
    t("8x سكوب", "8x Scope"),
  ];

  const camRows = scopeRows(p.sens.cam, labels);
  const adsRows = scopeRows(p.sens.ads, labels);
  const gyroRows = p.gyroMode !== "off" ? scopeRows(p.sens.gyro.cam, labels) : null;
  const gyroAdsRows = p.gyroMode !== "off" ? scopeRows(p.sens.gyro.ads, labels) : null;

  const tableStyle = `width:100%;border-collapse:collapse;margin:12px 0;font-size:13px;`;
  const thStyle = `background:#1a1a2e;color:#ff7a00;padding:8px 12px;text-align:${isAr?"right":"left"};border:1px solid #2a2a3e;font-weight:700;`;
  const tdStyle = `padding:8px 12px;border:1px solid #2a2a3e;color:#e0e0e0;`;
  const tdValStyle = `${tdStyle}color:#ff7a00;font-weight:700;text-align:center;font-family:monospace;font-size:15px;`;

  const makeTable = (title: string, icon: string, rows: string[][]) => `
    <div style="margin:20px 0;">
      <h3 style="color:#ff7a00;font-size:16px;margin:0 0 8px;font-weight:800;">${icon} ${title}</h3>
      <table style="${tableStyle}">
        <thead><tr>
          <th style="${thStyle}">${t("الإعداد","Setting")}</th>
          <th style="${thStyle}text-align:center;width:100px;">${t("القيمة","Value")}</th>
        </tr></thead>
        <tbody>${rows.map(([label, val]) => `
          <tr>
            <td style="${tdStyle}">${label}</td>
            <td style="${tdValStyle}">${val}</td>
          </tr>`).join("")}
        </tbody>
      </table>
    </div>`;

  return `<!DOCTYPE html>
<html dir="${dir}" lang="${isAr ? "ar" : "en"}">
<head>
<meta charset="utf-8">
<title>ALYAZOURI 2026 — Sensitivity Report</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;700;900&family=Inter:wght@400;700;900&family=Orbitron:wght@700;900&display=swap');
  * { margin:0; padding:0; box-sizing:border-box; }
  body { background:#0a0a14; color:#fff; font-family:${font}; padding:30px; }
  @media print {
    body { background:#fff !important; color:#000 !important; padding:20px; }
    .header-bg { background:#1a1a2e !important; -webkit-print-color-adjust:exact; print-color-adjust:exact; }
    table { page-break-inside:avoid; }
    td, th { color:#000 !important; border-color:#ccc !important; }
    th { background:#f0f0f0 !important; color:#333 !important; }
    h3 { color:#d35400 !important; }
    .score-circle { border-color:#d35400 !important; }
  }
</style>
</head>
<body>

<!-- HEADER -->
<div class="header-bg" style="background:linear-gradient(135deg,#1a0a00,#0a0a14);border:2px solid #ff7a0040;border-radius:16px;padding:24px;margin-bottom:24px;">
  <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px;">
    <div>
      <div style="font-family:'Orbitron',monospace;font-size:28px;font-weight:900;color:#ff7a00;">🦅 ALYAZOURI 2026</div>
      <div style="font-size:12px;color:#999;margin-top:4px;">PUBG Mobile Sensitivity Report</div>
    </div>
    <div class="score-circle" style="width:80px;height:80px;border-radius:50%;border:4px solid #ff7a00;display:flex;flex-direction:column;align-items:center;justify-content:center;">
      <div style="font-family:'Orbitron',monospace;font-size:24px;font-weight:900;color:#ff7a00;">${p.aiScore}</div>
      <div style="font-size:8px;color:#999;letter-spacing:2px;">AI SCORE</div>
    </div>
  </div>

  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-top:16px;">
    <div style="background:#ffffff08;border:1px solid #ffffff15;border-radius:10px;padding:10px;text-align:center;">
      <div style="font-size:10px;color:#999;">📱 ${t("الجهاز","Device")}</div>
      <div style="font-size:14px;font-weight:700;color:#fff;margin-top:4px;">${p.deviceName}</div>
    </div>
    <div style="background:#ffffff08;border:1px solid #ffffff15;border-radius:10px;padding:10px;text-align:center;">
      <div style="font-size:10px;color:#999;">🔫 ${t("السلاح","Weapon")}</div>
      <div style="font-size:14px;font-weight:700;color:#fff;margin-top:4px;">${p.weaponName}</div>
    </div>
    <div style="background:#ffffff08;border:1px solid #ffffff15;border-radius:10px;padding:10px;text-align:center;">
      <div style="font-size:10px;color:#999;">${p.profileIcon} ${t("البروفايل","Profile")}</div>
      <div style="font-size:14px;font-weight:700;color:#fff;margin-top:4px;">${p.profileName}</div>
    </div>
    <div style="background:#ffffff08;border:1px solid #ffffff15;border-radius:10px;padding:10px;text-align:center;">
      <div style="font-size:10px;color:#999;">✋ ${t("الأصابع","Fingers")} | 🌀 ${t("جايرو","Gyro")}</div>
      <div style="font-size:14px;font-weight:700;color:#fff;margin-top:4px;">${p.fingers}F | ${p.gyroMode.toUpperCase()}</div>
    </div>
  </div>
</div>

<!-- TABLES -->
<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
  <div>${makeTable(t("حساسية الكاميرا","Camera Sensitivity"), "📷", camRows)}</div>
  <div>${makeTable(t("حساسية التصويب ADS","ADS Sensitivity"), "🎯", adsRows)}</div>
</div>

${gyroRows && gyroAdsRows ? `
<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
  <div>${makeTable(t("حساسية الجايرو","Gyroscope Sensitivity"), "🌀", gyroRows)}</div>
  <div>${makeTable(t("حساسية جايرو ADS","Gyro ADS Sensitivity"), "🎮", gyroAdsRows)}</div>
</div>` : `
<div style="background:#1a1a2e;border-radius:12px;padding:20px;text-align:center;margin:16px 0;">
  <span style="font-size:24px;">⭕</span>
  <div style="color:#999;margin-top:8px;">${t("الجايرو معطّل","Gyroscope Disabled")}</div>
</div>`}

<!-- FREE LOOK + GAMEPLAY -->
<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:16px;">
  <div>
    <h3 style="color:#ff7a00;font-size:16px;font-weight:800;margin-bottom:8px;">👁️ Free Look</h3>
    <table style="${tableStyle}">
      <tr><td style="${tdStyle}">${t("كاميرا","Camera")}</td><td style="${tdValStyle}">${p.sens.freeLook.cam}%</td></tr>
      <tr><td style="${tdStyle}">${t("باراشوت","Parachute")}</td><td style="${tdValStyle}">${p.sens.freeLook.parashoot}%</td></tr>
      <tr><td style="${tdStyle}">${t("مركبة","Vehicle")}</td><td style="${tdValStyle}">${p.sens.freeLook.vehicle}%</td></tr>
    </table>
  </div>
  <div>
    <h3 style="color:#ff7a00;font-size:16px;font-weight:800;margin-bottom:8px;">⚙️ ${t("إعدادات اللعب","Gameplay")}</h3>
    <table style="${tableStyle}">
      <tr><td style="${tdStyle}">${t("حساسية الركض","Sprint")}</td><td style="${tdValStyle}">${p.sens.gameplay.sprintSensitivity}%</td></tr>
      <tr><td style="${tdStyle}">${t("حجم الجويستك","Joystick Size")}</td><td style="${tdValStyle}">${p.sens.gameplay.joystickSize}%</td></tr>
      <tr><td style="${tdStyle}">TPP FOV</td><td style="${tdValStyle}">${p.sens.gameplay.tppFOV}%</td></tr>
      <tr><td style="${tdStyle}">FPP FOV</td><td style="${tdValStyle}">${p.sens.gameplay.fppFOV}%</td></tr>
    </table>
  </div>
</div>

<!-- FOOTER -->
<div style="margin-top:30px;padding-top:16px;border-top:1px solid #ffffff15;text-align:center;">
  <div style="font-family:'Orbitron',monospace;font-size:14px;color:#ff7a00;font-weight:900;">ALYAZOURI 2026</div>
  <div style="font-size:10px;color:#666;margin-top:4px;">FORGED IN JORDAN 🇯🇴 — BUILT FOR WINNERS</div>
  <div style="font-size:9px;color:#444;margin-top:8px;">${t("تم الإنشاء","Generated")}: ${new Date().toLocaleString()}</div>
</div>

</body>
</html>`;
}

export function ExportPdfButton(props: Props) {
  const { lang } = useLang();
  const isAr = lang === "ar";
  const [exporting, setExporting] = useState(false);

  const handleExport = () => {
    setExporting(true);

    const html = buildHtml(props, isAr);

    // فتح نافذة جديدة مع محتوى PDF-ready
    const win = window.open("", "_blank");
    if (win) {
      win.document.write(html);
      win.document.close();

      // انتظر تحميل الخطوط ثم اطبع
      setTimeout(() => {
        win.print();
        setExporting(false);
      }, 800);
    } else {
      // fallback: تحميل كملف HTML
      const blob = new Blob([html], { type: "text/html;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `ALYAZOURI_2026_${props.deviceName.replace(/\s+/g, "_")}_${props.profileName}.html`;
      a.click();
      URL.revokeObjectURL(url);
      setExporting(false);
    }
  };

  return (
    <button
      onClick={handleExport}
      disabled={exporting}
      className="btn-ghost rounded-xl py-3 text-xs font-bold w-full disabled:opacity-50"
    >
      {exporting ? "⏳" : "📄"} {isAr ? (exporting ? "جارٍ التصدير..." : "تصدير PDF") : (exporting ? "Exporting..." : "Export PDF")}
    </button>
  );
}
