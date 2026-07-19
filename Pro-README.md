# 🇯🇴 محسّن الأردن | ALYAZOURI 2026 — PUBG Mobile Optimizer

<div align="center">

**مولّد حساسية ذكاء اصطناعي احترافي لـ PUBG Mobile** — مصمَّم للسوق الأردني، يدعم 112+ جهاز و67 سلاح.

**A professional AI-powered sensitivity generator for PUBG Mobile** — tuned for the Jordanian market, with support for 112+ devices and 67 weapons.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)](https://alyazouri.netlify.app)
[![License](https://img.shields.io/badge/License-MIT-orange?style=for-the-badge)](LICENSE)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-7.3-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![PWA](https://img.shields.io/badge/PWA-Ready-5A0FC8?style=for-the-badge&logo=pwa&logoColor=white)](#)

[العربية](#العربية) · [English](#english)

</div>

---

<div dir="rtl" lang="ar">

## العربية

### 🎮 نظرة عامة

**ALYAZOURI 2026** هو تطبيق ويب تقدّمي (PWA) متخصّص في تحسين إعدادات الحساسية للاعبي **PUBG Mobile** في الأردن والوطن العربي. يستخدم التطبيق خوارزميات ذكاء اصطناعي لتوليد إعدادات حساسية مخصّصة تتناسب مع جهازك وأسلوب لعبك والظروف الشبكية في منطقتك.

### ✨ المميزات

- 🤖 **تنبؤات ذكاء اصطناعي** — مولّد حساسية ذكي يضبط الإعدادات تلقائيًا حسب الجهاز والـ FPS ونوع الشبكة.
- 📱 **دعم 112+ جهاز** — قاعدة بيانات شاملة لأجهزة Android الشائعة في الأردن (Samsung، Xiaomi، Huawei، Infinix، Tecno...).
- 🔫 **67 سلاح** — إعدادات مخصّصة لكل سلاح: بنادق هجومية، قنّاصات، SMGs، Shotguns.
- 🌐 **ثنائي اللغة** — دعم كامل للعربية (RTL) والإنجليزية مع تبديل سلس.
- 📊 **مراقبة الشبكة** — قياس ping و DNS latency وعرض خريطة حرارية للشبكة.
- 🎬 **تسجيل الشاشة** — تسجيل جلسات اللعب مباشرة من المتصفح.
- 🎨 **معاينة HUD** — معاينة بصرية لإعدادات الحساسية على واجهة اللعبة.
- 🎵 **مشغّل موسيقى** — موسيقى تصويرية مدمجة لتجربة لعب أفضل.
- 📄 **تصدير PDF** — حفظ ومشاركة إعدادات الحساسية كملف PDF.
- 📦 **PWA** — قابل للتثبيت على الهاتف كتطبيق أصيل ويعمل دون اتصال.
- ⚡ **أداء فائق** — حزمة واحدة مضغوطة (single-file build) عبر `vite-plugin-singlefile`.

### 🛠️ التقنيات المستخدمة

| الفئة | التقنية |
|---|---|
| **الإطار** | React 19.2 + TypeScript 5.9 |
| **أداة البناء** | Vite 7.3 + vite-plugin-singlefile |
| **التنسيق** | Tailwind CSS 4.1 |
| **الأدوات** | `clsx`, `tailwind-merge` |
| **النشر** | Netlify |
| **اللغات** | العربية (RTL) 🇯🇴 · الإنجليزية |

### 📦 التثبيت والتشغيل

#### المتطلبات المسبقة
- Node.js 18+ و npm

#### خطوات التشغيل محليًا

```bash
# 1. استنساخ المستودع
git clone https://github.com/alyazouri/Pro.git
cd Pro

# 2. تثبيت الاعتمادات
npm install

# 3. تشغيل خادم التطوير
npm run dev
# يفتح على http://localhost:5173

# 4. بناء نسخة الإنتاج
npm run build

# 5. معاينة نسخة الإنتاج
npm run preview
```

### 📁 هيكل المشروع

```
Pro/
├── index.html              # نقطة الدخول HTML (RTL/Arabic + English)
├── netlify.toml            # إعدادات Netlify
├── package.json
├── tsconfig.json
├── vite.config.ts
├── public/                 # الأصول الثابتة (manifest, icons, PWA assets)
└── src/
    ├── main.tsx            # نقطة دخول React
    ├── App.tsx             # المكوّن الرئيسي
    ├── Hero.tsx            # قسم الهيرو
    ├── Features.tsx        # عرض المميزات
    ├── AIPredictions.tsx   # منطق تنبؤات الذكاء الاصطناعي
    ├── PingMonitor.tsx     # مراقبة الـ ping
    ├── DnsMonitor.tsx      # مراقبة DNS
    ├── NetworkHeatmap.tsx  # خريطة حرارية للشبكة
    ├── HudPreview.tsx      # معاينة HUD اللعبة
    ├── ExportPdf.tsx       # تصدير الإعدادات PDF
    ├── MusicPlayer.tsx     # مشغّل الموسيقى
    ├── ScreenRecorder.tsx  # تسجيل الشاشة
    ├── Particles.tsx       # تأثيرات الجسيمات
    ├── PacSection.tsx      # قسم إضافي
    ├── QuickSearch.tsx     # البحث السريع
    ├── PWABanner.tsx       # لافتة تثبيت PWA
    ├── LanguageContext.tsx # سياق اللغة
    ├── LanguageSwitcher.tsx# مبدّل اللغة
    └── utils/              # أدوات مساعدة
```

### 🤝 المساهمة

نرحّب بالمساهمات! اتبع الخطوات التالية:

1. Fork المستودع
2. أنشئ فرع ميزة: `git checkout -b feature/amazing-feature`
3. التزم بالتغييرات: `git commit -m 'Add amazing feature'`
4. ادفع للفرع: `git push origin feature/amazing-feature`
5. افتح Pull Request

### 📄 الترخيص

هذا المشروع مرخّص بموجب [MIT License](LICENSE).

### 📧 التواصل

- **الموقع**: [alyazouri.netlify.app](https://alyazouri.netlify.app)
- **المؤلف**: ALYAZOURI
- **المشاكل**: [GitHub Issues](https://github.com/alyazouri/Pro/issues)

</div>

---

<div dir="ltr" lang="en">

## English

### 🎮 Overview

**ALYAZOURI 2026** is a Progressive Web App (PWA) specialized in optimizing sensitivity settings for **PUBG Mobile** players in Jordan and the Arab world. The app uses AI algorithms to generate personalized sensitivity configurations tailored to your device, play style, and regional network conditions.

### ✨ Features

- 🤖 **AI Predictions** — Smart sensitivity generator that auto-tunes settings based on device, FPS, and network type.
- 📱 **112+ Devices Supported** — Comprehensive database of Android devices popular in Jordan (Samsung, Xiaomi, Huawei, Infinix, Tecno…).
- 🔫 **67 Weapons** — Per-weapon tuning: assault rifles, snipers, SMGs, shotguns.
- 🌐 **Bilingual** — Full Arabic (RTL) and English support with seamless switching.
- 📊 **Network Monitoring** — Live ping and DNS latency tracking with a network heatmap.
- 🎬 **Screen Recorder** — Record gameplay sessions directly from the browser.
- 🎨 **HUD Preview** — Visual preview of your sensitivity on an in-game heads-up display.
- 🎵 **Music Player** — Built-in soundtrack for a better gameplay experience.
- 📄 **PDF Export** — Save and share your sensitivity settings as a PDF.
- 📦 **PWA** — Installable on your phone as a native app and works offline.
- ⚡ **Blazing Fast** — Single-file production build via `vite-plugin-singlefile`.

### 🛠️ Tech Stack

| Category | Technology |
|---|---|
| **Framework** | React 19.2 + TypeScript 5.9 |
| **Build Tool** | Vite 7.3 + vite-plugin-singlefile |
| **Styling** | Tailwind CSS 4.1 |
| **Utilities** | `clsx`, `tailwind-merge` |
| **Deployment** | Netlify |
| **Languages** | Arabic (RTL) 🇯🇴 · English |

### 📦 Installation & Setup

#### Prerequisites
- Node.js 18+ and npm

#### Local Development

```bash
# 1. Clone the repository
git clone https://github.com/alyazouri/Pro.git
cd Pro

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
# Opens on http://localhost:5173

# 4. Build for production
npm run build

# 5. Preview the production build
npm run preview
```

### 📁 Project Structure

```
Pro/
├── index.html              # HTML entry point (RTL/Arabic + English)
├── netlify.toml            # Netlify deployment config
├── package.json
├── tsconfig.json
├── vite.config.ts
├── public/                 # Static assets (manifest, icons, PWA assets)
└── src/
    ├── main.tsx            # React entry point
    ├── App.tsx             # Root component
    ├── Hero.tsx            # Hero section
    ├── Features.tsx        # Features showcase
    ├── AIPredictions.tsx   # AI prediction logic
    ├── PingMonitor.tsx     # Ping monitoring
    ├── DnsMonitor.tsx      # DNS monitoring
    ├── NetworkHeatmap.tsx  # Network heatmap visualization
    ├── HudPreview.tsx      # In-game HUD preview
    ├── ExportPdf.tsx       # PDF export
    ├── MusicPlayer.tsx     # Music player
    ├── ScreenRecorder.tsx  # Screen recording
    ├── Particles.tsx       # Particle effects
    ├── PacSection.tsx      # Additional section
    ├── QuickSearch.tsx     # Quick search
    ├── PWABanner.tsx       # PWA install banner
    ├── LanguageContext.tsx # Language context provider
    ├── LanguageSwitcher.tsx# Language switcher
    └── utils/              # Utility helpers
```

### 🚀 Deployment

The project is configured for **Netlify** out of the box via `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = "dist"
```

Simply connect the repository to Netlify and every push to `main` will trigger a new deployment.

### 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### 📄 License

This project is licensed under the [MIT License](LICENSE).

### 📧 Contact

- **Website**: [alyazouri.netlify.app](https://alyazouri.netlify.app)
- **Author**: ALYAZOURI
- **Issues**: [GitHub Issues](https://github.com/alyazouri/Pro/issues)

### 🙏 Acknowledgments

Built with passion for the Jordanian and Arab PUBG Mobile community. 🇯🇴

---

<div align="center">

**صُنع بـ ❤️ في الأردن** · **Made with ❤️ in Jordan**

If this project helped you, consider giving it a ⭐!

</div>

</div>
