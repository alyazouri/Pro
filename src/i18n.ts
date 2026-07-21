// Multi-Language System — ALYAZOURI 2026
import type { Lang } from "./LanguageContext";

type Key = keyof typeof translations;

export const translations = {
  // NAV
  nav_generator: { ar: "المولّد", en: "Generator", tr: "Üretici", ru: "Генератор", es: "Generador" },
  nav_ping: { ar: "البينغ", en: "Ping", tr: "Ping", ru: "Пинг", es: "Ping" },
  nav_weapons: { ar: "الأسلحة", en: "Weapons", tr: "Silahlar", ru: "Оружие", es: "Armas" },
  nav_pac: { ar: "PAC", en: "PAC", tr: "PAC", ru: "PAC", es: "PAC" },
  nav_about: { ar: "حول", en: "About", tr: "Hakkında", ru: "О нас", es: "Acerca" },
  nav_cta: { ar: "🚀 ابدأ الآن", en: "🚀 Generate Now", tr: "🚀 Hemen Oluştur", ru: "🚀 Создать", es: "🚀 Generar" },
  nav_language: { ar: "اللغة", en: "Language", tr: "Dil", ru: "Язык", es: "Idioma" },

  // HERO
  hero_badge: { ar: "ALYAZOURI AI ENGINE 2026", en: "ALYAZOURI AI ENGINE 2026", tr: "ALYAZOURI AI ENGINE 2026", ru: "ALYAZOURI AI ENGINE 2026", es: "ALYAZOURI AI ENGINE 2026" },
  hero_title1: { ar: "محسّن الأردن الاحترافي", en: "Jordan Optimizer Pro", tr: "Jordan Optimize Editörü", ru: "Профессиональный Оптимизатор Иордании", es: "Optimizador Jordánico" },
  hero_title2: { ar: "PUBG Mobile", en: "PUBG Mobile", tr: "PUBG Mobile", ru: "PUBG Mobile", es: "PUBG Mobile" },
  hero_desc: { ar: "حساسية احترافية مدعومة بالذكاء الاصطناعي — أقل بينغ ممكن، فريق أردني، تجنيد سريع، تغطية كاملة لـ", en: "Real AI-powered sensitivity — lowest ping possible, Jordanian team, fast recruitment, full coverage of", tr: "Gerçek AI destekli hassasiyet — en düşük ping, Rüya ekibi, hızlı alım, tam kapsamlı", ru: "Реальная чувствительность на базе ИИ — минимальный пинг, иорданская команда, быстрый набор, полное покрытие", es: "Sensibilidad real con IA — ping más bajo, equipo jordánico, reclutamiento rápido, cobertura total" },
  hero_devices: { ar: "112+ جهاز", en: "112+ devices", tr: "112+ cihaz", ru: "112+ устройств", es: "112+ dispositivos" },
  hero_weapons: { ar: "67 سلاح", en: "67 weapons", tr: "67 silah", ru: "67 оружия", es: "67 armas" },
  hero_stats_devices: { ar: "الأجهزة", en: "Devices", tr: "Cihazlar", ru: "Устройства", es: "Dispositivos" },
  hero_stats_weapons: { ar: "الأسلحة", en: "Weapons", tr: "Silahlar", ru: "Оружие", es: "Armas" },
  hero_stats_servers: { ar: "السيرفرات", en: "Servers", tr: "Sunucular", ru: "Серверы", es: "Servidores" },
  hero_devices_sub: { ar: "معايرة دقيقة", en: "Calibrated", tr: "Kalibre", ru: "Калибровано", es: "Calibrado" },
  hero_weapons_sub: { ar: "ملف ارتداد حقيقي", en: "Real recoil profile", tr: "Geri tepme profili", ru: "Профиль отдачи", es: "Perfil de retroceso" },
  hero_servers_sub: { ar: "مناطق عالمية", en: "Global regions", tr: "Bölgeler", ru: "Регионы", es: "Regiones" },
  hero_cta1: { ar: "🚀 ولّد حساسيتك", en: "🚀 Generate Your Sensitivity", tr: "🚀 Hassasiyetini Oluştur", ru: "🚀 Создать чувствительность", es: "🚀 Genera tu sensibilidad" },
  hero_cta2: { ar: "📜 تسريع PAC Script", en: "📜 PAC Script Acceleration", tr: "📜 PAC Script Hızlandırma", ru: "📜 Ускорение PAC", es: "📜 Aceleración PAC" },
  hero_tiktok: { ar: "تيك توك:", en: "TikTok:", tr: "TikTok:", ru: "ТикТок:", es: "TikTok:" },
  hero_instagram: { ar: "إنستقرام:", en: "Instagram:", tr: "Instagram:", ru: "Инстаграм:", es: "Instagram:" },
  hero_pubg_id: { ar: "PUBG ID:", en: "PUBG ID:", tr: "PUBG ID:", ru: "PUBG ID:", es: "PUBG ID:" },
  hero_live_status: { ar: "الحالة المباشرة", en: "LIVE STATUS", tr: "CANLI DURUM", ru: "СТАТУС", es: "EN VIVO" },
  hero_network: { ar: "📡 حالة الشبكة", en: "📡 Network Status", tr: "📡 Ağ Durumu", ru: "📡 Сеть", es: "📡 Estado de red" },
  hero_nearest: { ar: "أقرب سيرفر", en: "Nearest Server", tr: "En Yakın", ru: "Ближайший", es: "Más cercano" },
  hero_connected: { ar: "متصل", en: "Connected", tr: "Bağlı", ru: "Связано", es: "Conectado" },
  hero_measuring: { ar: "جارٍ القياس...", en: "Measuring", tr: "Ölçülüyor", ru: "Измерение", es: "Midiendo" },
  hero_excellent: { ar: "ممتاز", en: "Excellent", tr: "Mükemmel", ru: "Отлично", es: "Excelente" },
  hero_good: { ar: "جيد", en: "Good", tr: "İyi", ru: "Хорошо", es: "Bueno" },
  hero_medium: { ar: "متوسط", en: "Medium", tr: "Orta", ru: "Средне", es: "Medio" },
  hero_recruitment: { ar: "التجنيد", en: "Recruitment", tr: "Alım", ru: "Набор", es: "Reclutamiento" },
  hero_iss: { ar: "نشط", en: "Active", tr: "Aktif", ru: "Активно", es: "Activo" },

  // SECTIONS
  sec_generator_eyebrow: { ar: "AI SENSITIVITY GENERATOR", en: "AI SENSITIVITY GENERATOR", tr: "AI HASSASİYET ÜRETECİ", ru: "ГЕНЕРАТОР ЧУВСТВИТЕЛЬНОСТИ", es: "GENERADOR DE SENSIBILIDAD" },
  sec_generator_title: { ar: "🚀 مولّد الحساسية الاحترافي", en: "🚀 Professional Sensitivity Generator", tr: "🚀 Profesyonel Hassasiyet Üreteci", ru: "🚀 Профессиональный генератор", es: "🚀 Generador profesional" },
  sec_generator_sub: { ar: "حسابات مبنية على FPS, Touch Rate, PPI, Recoil, Gyro", en: "Built on FPS, Touch Rate, PPI, Recoil, Gyro", tr: "FPS, Touch Rate, PPI, Recoil, Gyro", ru: "На основе FPS, Touch Rate, PPI, Recoil, Gyro", es: "Basado en FPS, Touch Rate, PPI, Recoil, Gyro" },

  // DEVICE
  device_select: { ar: "اختر جهازك", en: "Select Your Device", tr: "Cihazını Seç", ru: "Выберите устройство", es: "Selecciona tu dispositivo" },
  device_selected: { ar: "المختار: ", en: "Selected: ", tr: "Seçilen: ", ru: "Выбрано: ", es: "Seleccionado: " },
  device_gyro_excellent: { ar: "جايرو ممتاز", en: "Excellent Gyro", tr: "Mükemmel Gyro", ru: "Отличное гиро", es: "Excelente giro" },
  device_gyro_good: { ar: "جايرو جيد", en: "Good Gyro", tr: "İyi Gyro", ru: "Хорошее гиро", es: "Buen giro" },
  device_gyro_average: { ar: "جايرو متوسط", en: "Average Gyro", tr: "Orta Gyro", ru: "Среднее гиро", es: "Giro promedio" },

  // GYRO
  gyro_title: { ar: "وضع الجايروسكوب", en: "Gyroscope Mode", tr: "Jiroskop Modu", ru: "Режим гироскопа", es: "Modo giroscopio" },
  gyro_status_off: { ar: "معطل", en: "Disabled", tr: "Kapalı", ru: "Выкл", es: "Desactivado" },
  gyro_status_scope: { ar: "على السكوب فقط", en: "Scope Only", tr: "Sadece Dürbün", ru: "Только прицел", es: "Solo mira" },
  gyro_status_always: { ar: "دائمًا مفعّل", en: "Always On", tr: "Her Zaman", ru: "Всегда вкл", es: "Siempre" },
  gyro_off: { ar: "معطل", en: "Off", tr: "Kapalı", ru: "Выкл", es: "Off" },
  gyro_scope: { ar: "سكوب فقط", en: "Scope Only", tr: "Sadece Dürbün", ru: "Только прицел", es: "Solo mira" },
  gyro_always: { ar: "دائمًا", en: "Always On", tr: "Her Zaman", ru: "Всегда", es: "Siempre" },
  gyro_off_desc: { ar: "بدون جايرو — تحكم باللمس فقط", en: "No gyro — touch only", tr: "Jiroskop yok — sadece dokunma", ru: "Без гиро — только касание", es: "Sin giro — solo táctil" },
  gyro_scope_desc: { ar: "جايرو عند فتح السكوب فقط", en: "Gyro activates when scoping", tr: "Dürbün açıldığında aktif", ru: "Гироскоп при прицеливании", es: "Giros al apuntar" },
  gyro_always_desc: { ar: "جايرو مفعّل طوال الوقت", en: "Gyro always active", tr: "Her zaman aktif", ru: "Гироскоп всегда активен", es: "Giro siempre activo" },
  gyro_msg_off: { ar: "💡 للاعبين الذين يفضلون التحكم الكامل باللمس", en: "💡 For players who prefer full touch control", tr: "💡 Tam dokunmatik kontrol isteyenler için", ru: "💡 Для тех, кто предпочитает сенсор", es: "💡 Para control táctil total" },
  gyro_msg_scope: { ar: "🎯 الوضع الموصى به لمعظم اللاعبين المحترفين", en: "🎯 Recommended for most pro players", tr: "🎯 Çoğu profesyonel için önerilir", ru: "🎯 Рекомендуется для профи", es: "🎯 Recomendado para pros" },
  gyro_msg_always: { ar: "🔄 لأفضل دقة وتتبّع — يتطلب تمرين", en: "🔄 For best precision & tracking — needs practice", tr: "🔄 En iyi hassasiyet — pratik gerekir", ru: "🔄 Для точности — нужна практика", es: "🔄 Máxima precisión — requiere práctica" },
  gyro_disabled_title: { ar: "الجايرو معطّل", en: "Gyro Disabled", tr: "Gyro Kapalı", ru: "Гиро выключено", es: "Giro desactivado" },
  gyro_disabled_msg: { ar: "تم تعطيل الجايرو — عرض إعدادات الكاميرا والإعلانات فقط", en: "Gyroscope disabled — showing camera and ADS only", tr: "Jiroskop kapalı — sadece kamera ve ADS", ru: "Гироскоп выключен — только камера и ADS", es: "Giro desactivado — solo cámara y ADS" },

  // FINGERS
  fingers_title: { ar: "عدد الأصابع", en: "Finger Count", tr: "Parmak Sayısı", ru: "Кол-во пальцев", es: "Nº de dedos" },
  fingers_suffix: { ar: "أصابع", en: "Fingers", tr: "Parmak", ru: "пальцев", es: "dedos" },

  // WEAPON
  weapon_title: { ar: "اختر سلاحك", en: "Select Your Weapon", tr: "Silahını Seç", ru: "Выберите оружие", es: "Selecciona arma" },
  weapon_recoil: { ar: "الارتداد", en: "Recoil", tr: "Geri Tepme", ru: "Отдача", es: "Retroceso" },
  weapon_range: { ar: "المدى", en: "Range", tr: "Menzil", ru: "Дальность", es: "Alcance" },

  // SENSITIVITY
  sens_camera: { ar: "حساسية الكاميرا", en: "Camera Sensitivity", tr: "Kamera Hassasiyeti", ru: "Чувствительность камеры", es: "Sensibilidad cámara" },
  sens_ads: { ar: "حساسية التصويب (ADS)", en: "ADS Sensitivity", tr: "ADS Hassasiyeti", ru: "Чувствительность ADS", es: "Sensibilidad ADS" },
  sens_gyro_cam: { ar: "حساسية جايرو الكاميرا", en: "Gyro Camera Sensitivity", tr: "Gyro Kamera Hassasiyeti", ru: "Чувствительность гиро камеры", es: "Sensibilidad giro cámara" },
  sens_gyro_ads: { ar: "حساسية جايرو ADS", en: "Gyro ADS Sensitivity", tr: "Gyro ADS Hassasiyeti", ru: "Чувствительность гиро ADS", es: "Sensibilidad giro ADS" },
  sens_freelook: { ar: "Free Look", en: "Free Look", tr: "Free Look", ru: "Free Look", es: "Free Look" },
  sens_freelook_cam: { ar: "كاميرا", en: "Camera", tr: "Kamera", ru: "Камера", es: "Cámara" },
  sens_freelook_para: { ar: "باراشوت", en: "Parachute", tr: "Paraşüt", ru: "Парашют", es: "Paracaídas" },
  sens_freelook_vehicle: { ar: "مركبة", en: "Vehicle", tr: "Araç", ru: "Транспорт", es: "Vehículo" },
  sens_tpp: { ar: "TPP", en: "TPP", tr: "TPP", ru: "TPP", es: "TPP" },
  sens_fpp: { ar: "FPP", en: "FPP", tr: "FPP", ru: "FPP", es: "FPP" },
  sens_no_scope: { ar: "بدون سكوب", en: "No Scope", tr: "Dürbünsüz", ru: "Без прицела", es: "Sin mira" },
  sens_red_dot: { ar: "Red Dot", en: "Red Dot", tr: "Red Dot", ru: "Red Dot", es: "Red Dot" },
  sens_2x: { ar: "2×", en: "2×", tr: "2×", ru: "2×", es: "2×" },
  sens_3x: { ar: "3×", en: "3×", tr: "3×", ru: "3×", es: "3×" },
  sens_4x: { ar: "4×", en: "4×", tr: "4×", ru: "4×", es: "4×" },
  sens_6x: { ar: "6×", en: "6×", tr: "6×", ru: "6×", es: "6×" },
  sens_8x: { ar: "8×", en: "8×", tr: "8×", ru: "8×", es: "8×" },

  // AI SCORE
  ai_score_label: { ar: "AI SCORE", en: "AI SCORE", tr: "AI SKOR", ru: "AI ОЦЕНКА", es: "AI PUNTUACIÓN" },
  ai_score_title: { ar: "نتيجة التوافق", en: "Compatibility Score", tr: "Uyumluluk Skoru", ru: "Совместимость", es: "Compatibilidad" },
  ai_suffix: { ar: "F", en: "F", tr: "F", ru: "F", es: "F" },
  ai_autotune: { ar: "⚡ ضبط ذكي تلقائي", en: "⚡ AI Auto-Tune", tr: "⚡ AI Otomatik", ru: "⚡ AI Авто-настройка", es: "⚡ Auto-Ajuste IA" },

  // STABILITY
  stability_title: { ar: "تحليل الاستقرار", en: "Stability Analysis", tr: "Stabilite Analizi", ru: "Анализ стабильности", es: "Análisis estabilidad" },
  stability_device: { ar: "الجهاز", en: "Device", tr: "Cihaz", ru: "Устройство", es: "Dispositivo" },
  stability_weapon: { ar: "السلاح", en: "Weapon", tr: "Silah", ru: "Оружие", es: "Arma" },
  stability_fingers: { ar: "الأصابع", en: "Fingers", tr: "Parmak", ru: "Пальцы", es: "Dedos" },
  stability_style: { ar: "الأسلوب", en: "Style", tr: "Stil", ru: "Стиль", es: "Estilo" },
  stability_equation: { ar: "المعادلة: R = D × W × F × S", en: "Equation: R = D × W × F × S", tr: "Denklem: R = D × W × F × S", ru: "Уравнение: R = D × W × F × S", es: "Ecuación: R = D × W × F × S" },
  stability_desc: { ar: "حساب متعدد العوامل لأفضل استقرار", en: "Multi-factor calculation for optimal stability", tr: "Optimal stabilite için çok faktörlü hesaplama", ru: "Многофакторный расчёт для стабильности", es: "Cálculo multifactorial para estabilidad" },

  // PING
  ping_eyebrow: { ar: "PUBG MOBILE SERVER PING", en: "PUBG MOBILE SERVER PING", tr: "PUBG MOBILE SUNUCU PING", ru: "ПИНГ СЕРВЕРОВ PUBG MOBILE", es: "PING SERVIDORES PUBG MOBILE" },
  ping_title: { ar: "📡 بنق خوادم PUBG Mobile", en: "📡 PUBG Mobile Server Ping", tr: "📡 PUBG Mobile Sunucu Pingo", ru: "📡 Пинг серверов PUBG Mobile", es: "📡 Ping de servidores PUBG Mobile" },
  ping_sub: { ar: "اختبار مباشر لـ 7 مناطق خوادم في اللعبة", en: "Live test across 7 in-game server regions", tr: "7 oyun sunucu bölgesi ile canlı test", ru: "Тест 7 регионов серверов игры", es: "Prueba en vivo en 7 regiones del juego" },
  ping_live: { ar: "مباشر", en: "LIVE", tr: "CANLI", ru: "LIVE", es: "EN VIVO" },
  ping_live_title: { ar: "مراقبة الشبكة الحية", en: "Live Network Monitor", tr: "Canlı Ağ Monitörü", ru: "Мониторинг сети", es: "Monitor de red" },
  ping_live_desc: { ar: "قياس حيّ للوصول إلى مناطق الخوادم: latency, jitter, loss", en: "Live reachability to server regions: latency, jitter, loss", tr: "Sunucu bölgelerine canlı erişim: latency, jitter, loss", ru: "Живой доступ к регионам: задержка, джиттер, потери", es: "Acceso en vivo a regiones: latencia, jitter, pérdida" },
  ping_btn_measuring: { ar: "⏳ جاري القياس...", en: "⏳ Measuring...", tr: "⏳ Ölçülüyor...", ru: "⏳ Измерение...", es: "⏳ Midiendo..." },
  ping_btn_remeasure: { ar: "🔄 إعادة القياس", en: "🔄 Re-measure", tr: "🔄 Yeniden Ölç", ru: "🔄 Перемерить", es: "🔄 Medir de nuevo" },
  ping_ping: { ar: "بينغ", en: "Ping", tr: "Ping", ru: "Пинг", es: "Ping" },
  ping_jitter: { ar: "Jitter", en: "Jitter", tr: "Jitter", ru: "Джиттер", es: "Jitter" },
  ping_loss: { ar: "Loss %", en: "Loss %", tr: "Loss %", ru: "Потери %", es: "Loss %" },
  ping_best: { ar: "الأفضل", en: "BEST", tr: "EN İYİ", ru: "ЛУЧШИЙ", es: "MEJOR" },
  ping_quality_excellent: { ar: "ممتاز", en: "Excellent", tr: "Mükemmel", ru: "Отлично", es: "Excelente" },
  ping_quality_good: { ar: "جيد", en: "Good", tr: "İyi", ru: "Хорошо", es: "Bueno" },
  ping_quality_medium: { ar: "متوسط", en: "Medium", tr: "Orta", ru: "Средне", es: "Medio" },
  ping_quality_poor: { ar: "ضعيف", en: "Poor", tr: "Kötü", ru: "Плохо", es: "Malo" },

  // DNS JORDAN
  dns_eyebrow: { ar: "JORDAN DNS STATUS", en: "JORDAN DNS STATUS", tr: "ÜRDÜN DNS DURUMU", ru: "СТАТУС DNS ИОРДАНИИ", es: "ESTADO DNS JORDANIA" },
  dns_title: { ar: "🛡️ حالة DNS الأردني المباشرة", en: "🛡️ Live Jordan DNS Status", tr: "🛡️ Canlı Ürdün DNS Durumu", ru: "🛡️ Живой статус DNS Иордании", es: "🛡️ Estado DNS Jordania en vivo" },
  dns_sub: { ar: "مراقبة 12 خادم DNS أردنيًا لحل أسرع وأكثر استقرارًا", en: "Monitoring 12 Jordanian DNS servers for faster & stable resolution", tr: "Daha hızlı ve stabil çözüm için 12 Ürdün DNS sunucusu izleniyor", ru: "Мониторинг 12 иорданских DNS-серверов для быстрого и стабильного разрешения", es: "Monitoreo de 12 servidores DNS jordanos para resolución rápida y estable" },
  dns_live: { ar: "مباشر", en: "LIVE", tr: "CANLI", ru: "LIVE", es: "EN VIVO" },
  dns_ip: { ar: "العنوان", en: "Address", tr: "Adres", ru: "Адрес", es: "Dirección" },
  dns_latency: { ar: "زمن الاستجابة", en: "Latency", tr: "Gecikme", ru: "Задержка", es: "Latencia" },
  dns_status: { ar: "الحالة", en: "Status", tr: "Durum", ru: "Статус", es: "Estado" },
  dns_online: { ar: "متصل", en: "Online", tr: "Çevrimiçi", ru: "В сети", es: "En línea" },
  dns_offline: { ar: "غير متصل", en: "Offline", tr: "Çevrimdışı", ru: "Не в сети", es: "Sin conexión" },
  dns_optimal: { ar: "أفضل DNS", en: "Optimal", tr: "En İyi", ru: "Оптимальный", es: "Óptimo" },
  dns_best: { ar: "الأفضل", en: "BEST", tr: "EN İYİ", ru: "ЛУЧШИЙ", es: "MEJOR" },
  dns_jitter: { ar: "Jitter", en: "Jitter", tr: "Jitter", ru: "Джиттер", es: "Jitter" },
  dns_quality_excellent: { ar: "ممتاز", en: "Excellent", tr: "Mükemmel", ru: "Отлично", es: "Excelente" },
  dns_quality_good: { ar: "جيد", en: "Good", tr: "İyi", ru: "Хорошо", es: "Bueno" },
  dns_quality_medium: { ar: "متوسط", en: "Medium", tr: "Orta", ru: "Средне", es: "Medio" },
  dns_quality_poor: { ar: "ضعيف", en: "Poor", tr: "Kötü", ru: "Плохо", es: "Malo" },
  dns_btn_measuring: { ar: "⏳ جارٍ الفحص...", en: "⏳ Probing...", tr: "⏳ Taranıyor...", ru: "⏳ Проверка...", es: "⏳ Comprobando..." },
  dns_btn_recheck: { ar: "🔄 إعادة الفحص", en: "🔄 Re-probe", tr: "🔄 Yeniden Tara", ru: "🔄 Перепроверить", es: "🔄 Re-comprobar" },
  dns_copy: { ar: "📋 نسخ", en: "📋 Copy", tr: "📋 Kopyala", ru: "📋 Копировать", es: "📋 Copiar" },
  dns_copied: { ar: "✅ تم النسخ!", en: "✅ Copied!", tr: "✅ Kopyalandı!", ru: "✅ Скопировано!", es: "✅ ¡Copiado!" },

  // WEAPONS SECTION
  weapons_eyebrow: { ar: "WEAPONS DATABASE", en: "WEAPONS DATABASE", tr: "SİLAH VERİTABANI", ru: "БАЗА ОРУЖИЯ", es: "BASE DE ARMAS" },
  weapons_title: { ar: "🔫 قاعدة بيانات الأسلحة", en: "🔫 Weapons Database", tr: "🔫 Silah Veritabanı", ru: "🔫 База оружия", es: "🔫 Base de armas" },
  weapons_sub: { ar: "44 سلاح بملفات ارتداد حقيقية معايرة", en: "44 weapons with real calibrated recoil profiles", tr: "44 silah gerçek geri tepme profilleriyle", ru: "44 оружия с реальными профилями отдачи", es: "44 armas con perfiles de retroceso reales" },

  // EQUATIONS
  eq_eyebrow: { ar: "MATH ENGINE", en: "MATH ENGINE", tr: "MATEMATİK MOTORU", ru: "МАТЕМАТИЧЕСКИЙ ДВИЖОК", es: "MOTOR MATEMÁTICO" },
  eq_title: { ar: "🧮 معادلات الحساب", en: "🧮 Calculation Equations", tr: "🧮 Hesaplama Denklemleri", ru: "🧮 Уравнения расчёта", es: "🧮 Ecuaciones de cálculo" },
  eq_sub: { ar: "الصيغ الرياضية خلف المولّد", en: "The math formulas behind the generator", tr: "Üretecin arkasındaki matematik", ru: "Формулы за генератором", es: "Fórmulas detrás del generador" },
  eq_rs: { ar: "حساسية اللقطة", en: "Shot Sensitivity", tr: "Atış Hassasiyeti", ru: "Чувствительность выстрела", es: "Sensibilidad de tiro" },
  eq_gy: { ar: "حساسية الجايرو", en: "Gyro Sensitivity", tr: "Gyro Hassasiyeti", ru: "Чувствительность гиро", es: "Sensibilidad giro" },
  eq_hd: { ar: "رأس الهدف", en: "Head Targeting", tr: "Kafa Hedefleme", ru: "Прицел в голову", es: "Apuntar a cabeza" },

  // SAVED
  saved_eyebrow: { ar: "SAVED PROFILES", en: "SAVED PROFILES", tr: "KAYDEDİLENLER", ru: "СОХРАНЁННЫЕ", es: "GUARDADOS" },
  saved_title: { ar: "🗂️ البروفايلات المحفوظة", en: "🗂️ Saved Profiles", tr: "🗂️ Kaydedilen Profiller", ru: "🗂️ Сохранённые профили", es: "🗂️ Perfiles guardados" },
  saved_sub: { ar: "آخر 5 إعدادات محفوظة محلياً", en: "Last 5 settings saved locally", tr: "Son 5 ayar yerel olarak kaydedildi", ru: "Последние 5 настроек локально", es: "Últimos 5 ajustes guardados localmente" },
  saved_empty: { ar: "لا توجد بروفايلات محفوظة بعد. ولّد حساسيتك الأولى!", en: "No profiles saved yet. Generate your first one!", tr: "Henüz profil kaydedilmedi. İlkini oluştur!", ru: "Пока нет профилей. Создайте первый!", es: "Aún no hay perfiles. ¡Genera el primero!" },

  // PAC
  pac_eyebrow: { ar: "PAC SCRIPT", en: "PAC SCRIPT", tr: "PAC SCRIPT", ru: "PAC SCRIPT", es: "PAC SCRIPT" },
  pac_title: { ar: "📜 تسريع PAC Script", en: "📜 PAC Script Acceleration", tr: "📜 PAC Script Hızlandırma", ru: "📜 Ускорение PAC", es: "📜 Aceleración PAC" },
  pac_sub: { ar: "تسريع الاتصال بالسيرفرات الأردنية", en: "Accelerate connection to Jordan servers", tr: "Jordan sunucularına bağlantıyı hızlandır", ru: "Ускорение подключения к Иордании", es: "Acelera conexión a Jordania" },
  pac_status: { ar: "الحالة", en: "Status", tr: "Durum", ru: "Статус", es: "Estado" },
  pac_enabled: { ar: "مفعّل", en: "Enabled", tr: "Aktif", ru: "Включено", es: "Activado" },
  pac_disabled: { ar: "معطّل", en: "Disabled", tr: "Kapalı", ru: "Выключено", es: "Desactivado" },
  pac_toggle_on: { ar: "مفعّل", en: "ON", tr: "AÇIK", ru: "ВКЛ", es: "ON" },
  pac_toggle_off: { ar: "معطّل", en: "OFF", tr: "KAPALI", ru: "ВЫКЛ", es: "OFF" },
  pac_ready: { ar: "جاهز للتثبيت", en: "Ready to Install", tr: "Kuruluma Hazır", ru: "Готов к установке", es: "Listo para instalar" },
  pac_link_label: { ar: "رابط PAC Script", en: "PAC Script URL", tr: "PAC Script URL'si", ru: "URL PAC скрипта", es: "URL del PAC" },
  pac_copy: { ar: "📋 نسخ الرابط", en: "📋 Copy Link", tr: "📋 Linki Kopyala", ru: "📋 Копировать", es: "📋 Copiar enlace" },
  pac_copied: { ar: "✅ تم النسخ!", en: "✅ Copied!", tr: "✅ Kopyalandı!", ru: "✅ Скопировано!", es: "✅ ¡Copiado!" },
  pac_open: { ar: "🔗 فتح", en: "🔗 Open", tr: "🔗 Aç", ru: "🔗 Открыть", es: "🔗 Abrir" },
  pac_restart: { ar: "🔄 تطبيق وإعادة تشغيل التطبيق", en: "🔄 Apply & Restart App", tr: "🔄 Uygula & Yeniden Başlat", ru: "🔄 Применить и перезапустить", es: "🔄 Aplicar y reiniciar" },
  pac_restart_note: { ar: "بعد النسخ، افتح إعدادات WiFi في جهازك → Proxy → Auto Config → الصق الرابط → احفظ", en: "After copy, open WiFi settings → Proxy → Auto Config → paste URL → save", tr: "Kopyaladıktan sonra WiFi ayarları → Proxy → Auto Config → yapıştır → kaydet", ru: "Откройте WiFi → Proxy → Auto Config → вставьте URL → сохраните", es: "Abre WiFi → Proxy → Auto Config → pega URL → guarda" },
  pac_step_android_1: { ar: "انسخ الرابط أعلاه", en: "Copy the link above", tr: "Yukarıdaki linki kopyala", ru: "Скопируйте ссылку выше", es: "Copia el enlace" },
  pac_step_android_2: { ar: "افتح إعدادات WiFi ← اختر الشبكة ← Advanced ← Proxy", en: "Open WiFi settings ← select network ← Advanced ← Proxy", tr: "WiFi ayarları ← ağ seç ← Advanced ← Proxy", ru: "Откройте WiFi ← выберите сеть ← Proxy", es: "Abre WiFi ← selecciona red ← Proxy" },
  pac_step_android_3: { ar: "اختر Auto Config ثم الصق الرابط", en: "Select Auto Config and paste the URL", tr: "Auto Config seç ve URL'yi yapıştır", ru: "Выберите Auto Config и вставьте URL", es: "Selecciona Auto Config y pega URL" },
  pac_step_android_4: { ar: "احفظ وأعد تشغيل PUBG Mobile", en: "Save and restart PUBG Mobile", tr: "Kaydet ve PUBG Mobile'ı yeniden başlat", ru: "Сохраните и перезапустите PUBG Mobile", es: "Guarda y reinicia PUBG Mobile" },
  pac_step_ios_1: { ar: "انسخ الرابط أعلاه", en: "Copy the link above", tr: "Yukarıdaki linki kopyala", ru: "Скопируйте ссылку", es: "Copia el enlace" },
  pac_step_ios_2: { ar: "Settings → WiFi → اختر الشبكة → Configure Proxy", en: "Settings → WiFi → select network → Configure Proxy", tr: "Settings → WiFi → ağ → Configure Proxy", ru: "Settings → WiFi → Configure Proxy", es: "Settings → WiFi → Configure Proxy" },
  pac_step_ios_3: { ar: "اختر Automatic ثم الصق الرابط في URL", en: "Select Automatic and paste URL", tr: "Automatic seç ve URL'yi yapıştır", ru: "Выберите Automatic и вставьте URL", es: "Selecciona Automatic y pega URL" },
  pac_step_ios_4: { ar: "احفظ وأعد تشغيل اللعبة", en: "Save and restart the game", tr: "Kaydet ve oyunu yeniden başlat", ru: "Сохраните и перезапустите игру", es: "Guarda y reinicia el juego" },
  pac_step_windows_1: { ar: "انسخ الرابط أعلاه", en: "Copy the link above", tr: "Yukarıdaki linki kopyala", ru: "Скопируйте ссылку", es: "Copia el enlace" },
  pac_step_windows_2: { ar: "Settings → Network & Internet → Proxy", en: "Settings → Network & Internet → Proxy", tr: "Settings → Network & Internet → Proxy", ru: "Settings → Network & Internet → Proxy", es: "Settings → Network & Internet → Proxy" },
  pac_step_windows_3: { ar: "Use setup script → الصق الرابط → Save", en: "Use setup script → paste URL → Save", tr: "Use setup script → URL yapıştır → Save", ru: "Use setup script → вставьте URL → Save", es: "Use setup script → pega URL → Save" },

  // FOOTER
  footer_about: { ar: "أداة احترافية لتحسين تجربة PUBG Mobile في الأردن والشرق الأوسط، مدعومة بمحرك ذكاء اصطناعي خاص لحساب أفضل حساسية.", en: "Professional tool for optimizing PUBG Mobile experience in Jordan and MENA, powered by custom AI sensitivity engine.", tr: "PUBG Mobile deneyimini optimize etmek için profesyonel araç, özel AI motoru ile.", ru: "Профессиональный инструмент оптимизации PUBG Mobile в Иордании, с AI движком.", es: "Herramienta profesional para optimizar PUBG Mobile, con motor IA." },
  footer_features: { ar: "المميزات", en: "Features", tr: "Özellikler", ru: "Возможности", es: "Características" },
  footer_f1: { ar: "✅ مولّد حساسية بـ 5 لغات", en: "✅ 5-language sensitivity generator", tr: "✅ 5 dilli hassasiyet üreteci", ru: "✅ Генератор на 5 языках", es: "✅ Generador en 5 idiomas" },
  footer_f2: { ar: "✅ 77 جهاز مع بيانات حقيقية", en: "✅ 77 devices with real specs", tr: "✅ 77 cihaz gerçek verilerle", ru: "✅ 77 устройств с реальными данными", es: "✅ 77 dispositivos con datos reales" },
  footer_f3: { ar: "✅ 44 سلاح بملفات ارتداد", en: "✅ 44 weapons with recoil profiles", tr: "✅ 44 silah geri tepme profili", ru: "✅ 44 оружия с профилями отдачи", es: "✅ 44 armas con perfiles de retroceso" },
  footer_f4: { ar: "✅ مراقب بينغ مباشر", en: "✅ Live ping monitor", tr: "✅ Canlı ping monitörü", ru: "✅ Живой монитор пинга", es: "✅ Monitor de ping en vivo" },
  footer_f5: { ar: "✅ تسريع PAC Script", en: "✅ PAC Script acceleration", tr: "✅ PAC Script hızlandırma", ru: "✅ Ускорение PAC", es: "✅ Aceleración PAC" },
  footer_rights: { ar: "© 2026 ALYAZOURI — جميع الحقوق محفوظة", en: "© 2026 ALYAZOURI — All rights reserved", tr: "© 2026 ALYAZOURI — Tüm hakları saklıdır", ru: "© 2026 ALYAZOURI — Все права защищены", es: "© 2026 ALYAZOURI — Todos los derechos reservados" },
  footer_tagline: { ar: "FORGED IN JORDAN 🇯🇴 — BUILT FOR WINNERS", en: "FORGED IN JORDAN 🇯🇴 — BUILT FOR WINNERS", tr: "JORDAN'DA ÜRETİLDİ 🇯🇴 — KAZANANLAR İÇİN", ru: "СОЗДАНО В ИОРДАНИИ 🇯🇴 — ДЛЯ ПОБЕДИТЕЛЕЙ", es: "FORJADO EN JORDANIA 🇯🇴 — PARA GANADORES" },

  // HUD
  hud_title: { ar: "معاينة HUD", en: "HUD Preview", tr: "HUD Önizleme", ru: "Превью HUD", es: "Vista HUD" },
  hud_alive: { ar: "أحياء", en: "Alive", tr: "Canlı", ru: "Живы", es: "Vivos" },
  hud_kills: { ar: "قتل", en: "Kills", tr: "Öldürme", ru: "Убийства", es: "Bajas" },
  hud_active: { ar: "نشط", en: "active", tr: "aktif", ru: "активно", es: "activo" },

  // PAC
  pac_section_title: { ar: "PAC Script", en: "PAC Script", tr: "PAC Script", ru: "PAC Script", es: "PAC Script" },
};

export function t(key: Key, lang: Lang): string {
  const entry = translations[key];
  if (!entry) return key;
  return (entry as unknown as Record<string, string>)[lang] ?? entry.en ?? key;
}
