import { useLang } from "./LanguageContext";
import { t } from "./i18n";
import type { Device } from "./data";
import { PRO_PROFILES, PRO_PLAYERS, type ProProfileId } from "./data";
import { getWeaponProfile } from "./weaponProfiles";

export type GyroMode = "off" | "scope" | "always";

export type ScopeSens = {
  tpp: number; fpp: number; noScope: number; red: number;
  scope2: number; scope3: number; scope4: number; scope6: number; scope8: number;
};

export type Sens = {
  cam: ScopeSens;
  ads: ScopeSens;
  gyro: { cam: ScopeSens; ads: ScopeSens };
  freeLook: { cam: number; parashoot: number; vehicle: number };
  aiScore: number;
  factors: { deviceFactor: number; weaponFactor: number; fingerFactor: number; styleFactor: number };
};

export type SensParams = {
  deviceId: string; device: Device; brandId: string;
  fingers: number; styleId: string; gyroMode: GyroMode;
  weaponId: string; weaponName: string;
  weaponRecoil: number; weaponRange: number; weaponType: string;
  proProfile: string;
};

// ═══════════════════════════════════════════════════════════════════
//  CASCADE MULTIPLIERS — scope-by-scope sensitivity ratios
// ═══════════════════════════════════════════════════════════════════
const CASCADE: Record<string, number> = {
  tpp:1.00, fpp:0.95, noScope:0.82, red:0.46,
  scope2:0.32, scope3:0.22, scope4:0.17, scope6:0.12, scope8:0.09,
};

// ADS / GYRO GLOBAL MULTIPLIERS
const G_ADS  = 0.88;
const G_GYRO = 2.20;
const G_ADGY = 1.05;

// Finger multipliers
const F: Record<number, number> = { 2:1.08, 3:1.04, 4:1.00, 5:0.96, 6:0.93 };

// Styles: 2026 tuning
type M = { c:number; a:number; g:number };
const S: Record<string, M> = {
  balanced:    {c:1.00, a:1.00, g:1.00},
  aggressive:  {c:1.08, a:1.04, g:1.14},
  headshot:    {c:0.90, a:0.94, g:0.92},
  spray:       {c:0.96, a:1.10, g:1.18},
  competitive: {c:0.93, a:0.96, g:0.90},
  close:       {c:1.12, a:1.06, g:1.22},
  closespray:  {c:1.14, a:1.14, g:1.26},
  longspray:   {c:0.86, a:1.16, g:1.08},
  proelite:    {c:1.06, a:1.20, g:1.42},
  sniper:      {c:0.82, a:0.82, g:0.86},
  sniperpro:   {c:0.80, a:0.80, g:0.84},
  quickscope:  {c:0.96, a:0.92, g:1.18},
  elite:       {c:1.08, a:1.22, g:1.45},
  max:         {c:1.10, a:1.28, g:1.50},
};

// Weapon type biases
const T: Record<string, M> = {
  ar:     {c:1.00, a:1.00, g:1.00},
  smg:    {c:1.14, a:0.90, g:1.24},
  dmr:    {c:0.88, a:0.84, g:0.86},
  sniper: {c:0.76, a:0.78, g:0.80},
  lmg:    {c:1.00, a:1.12, g:1.20},
  shotgun:{c:1.14, a:1.00, g:1.18},
  pistol: {c:1.18, a:1.00, g:1.24},
};

type ScopeKey = keyof ScopeSens;
const SCOPE_KEYS: ScopeKey[] = ["noScope","red","scope2","scope3","scope4","scope6","scope8"];

export const SCOPE_DEFS: { key: ScopeKey|"tpp"|"fpp"; icon: string; labelKey: string }[] = [
  {key:"tpp",icon:"👁️",labelKey:"sens_tpp"},{key:"fpp",icon:"👁️",labelKey:"sens_fpp"},
  {key:"red",icon:"🔴",labelKey:"sens_red_dot"},{key:"scope2",icon:"🎯",labelKey:"sens_2x"},
  {key:"scope3",icon:"🎯",labelKey:"sens_3x"},{key:"scope4",icon:"🔭",labelKey:"sens_4x"},
  {key:"scope6",icon:"🔭",labelKey:"sens_6x"},{key:"scope8",icon:"🔭",labelKey:"sens_8x"},
];

const cl = (v:number,lo:number,hi:number) => Math.max(lo,Math.min(hi,v));

export function computePPI(d: Device): number {
  const p = d.resolution.split("×"); if(p.length!==2) return 400;
  const w=parseInt(p[0],10), h=parseInt(p[1],10);
  if(!w||!h||!d.screenSize) return 400;
  return Math.round(Math.sqrt(w*w+h*h)/d.screenSize);
}

function deviceFactor(device: Device): {df:number; Gq:number} {
  const fps   = device.fps>=165?0.91 : device.fps>=144?0.94 : device.fps>=120?0.97 : device.fps>=90?1.04 : 1.12;
  const touch = device.touchRate>=720?0.93 : device.touchRate>=480?0.96 : device.touchRate>=240?1.00 : 1.05;
  const size  = device.screenSize>=12?1.04 : device.screenSize>=10?1.02 : device.screenSize>=6.5?0.98 : 0.95;
  const gyro  = device.gyroQuality==="excellent"?1.00 : device.gyroQuality==="good"?0.96 : 0.90;
  const Gq    = device.gyroQuality==="excellent"?1.00 : device.gyroQuality==="good"?0.94 : 0.86;
  return { df: cl(fps*touch*size*gyro, 0.76, 1.20), Gq };
}

function weaponMod(recoil:number, rpm:number):{c:number;a:number;g:number} {
  const r=recoil/100, f=rpm/700;
  return {
    c: cl(1-(r-0.50)*0.35, 0.86, 1.10),
    a: cl(1+(r-0.50)*1.20+(f-1)*0.40, 0.58, 1.45),
    g: cl(1+(r-0.50)*1.65+(f-1)*0.55, 0.48, 1.60),
  };
}

const STICKY: Record<string, Record<string, number>> = {
  proelite:  { noScope:1.40, red:1.36, scope2:1.28, scope3:1.12, scope4:1.10, scope6:0.96, scope8:0.88 },
  elite:     { noScope:1.35, red:1.32, scope2:1.24, scope3:1.10, scope4:1.08, scope6:0.94, scope8:0.86 },
  aggressive:{ noScope:1.18, red:1.15, scope2:1.08, scope3:1.02, scope4:0.98, scope6:0.90, scope8:0.82 },
  closespray:{ noScope:1.22, red:1.18, scope2:1.10, scope3:1.04, scope4:1.00, scope6:0.92, scope8:0.84 },
  spray:     { noScope:1.08, red:1.06, scope2:1.02, scope3:0.98, scope4:0.96, scope6:0.90, scope8:0.82 },
  longspray: { noScope:0.95, red:0.98, scope2:1.00, scope3:1.02, scope4:1.04, scope6:0.98, scope8:0.92 },
  max:       { noScope:1.45, red:1.40, scope2:1.32, scope3:1.16, scope4:1.14, scope6:1.00, scope8:0.92 },
};

export function computeSensitivity(p: SensParams): Sens {
  const { device, fingers, styleId, gyroMode, weaponName, weaponRecoil, weaponRange, weaponType, proProfile } = p;

  const { df, Gq } = deviceFactor(device);
  const fin = F[fingers]??1;
  const sty = S[styleId]??S.balanced;
  const pro = PRO_PROFILES.find(x=>x.id===(proProfile as ProProfileId));
  const pm = pro?.sensMultiplier??1;
  const wp = getWeaponProfile(weaponName, weaponRecoil, weaponRange, weaponType);
  const wt = T[wp.type]??T.ar;
  const wr = weaponMod(wp.verticalRecoil, wp.fireRate);

  const base = 118 * df * fin * sty.c * wt.c * wr.c * pm;

  const tppCam = cl(Math.round(base),1,300);
  const fppCam = cl(Math.round(tppCam*(CASCADE.fpp??0.95)),1,300);
  const cam: Record<string, number> = {tpp:tppCam, fpp:fppCam};
  for (const k of SCOPE_KEYS) cam[k] = cl(Math.round(tppCam*(CASCADE[k]??0.17)),1,300);

  const ads: Record<string, number> = {};
  for (const k of [...SCOPE_KEYS,"tpp" as const,"fpp" as const])
    ads[k] = cl(Math.round(cam[k]*G_ADS*wr.a*sty.a*wt.a),1,300);

  const buildGyro = (mode:GyroMode): Record<string, number> => {
    if (mode==="off") { const z:Record<string,number>={}; for(const k of [...SCOPE_KEYS,"tpp","fpp"])z[k]=0; return z; }
    const out: Record<string, number> = {};
    for (const k of SCOPE_KEYS) {
      if (mode==="scope"&&k==="noScope") { out[k]=0; continue; }
      const sk = (STICKY[styleId]?.[k]??1);
      out[k] = cl(Math.round(base*(CASCADE[k]??0.17)*G_GYRO*wr.g*sty.g*wt.g*Gq*sk),1,400);
    }
    out.tpp = mode==="scope"?0 : cl(Math.round(base*G_GYRO*wr.g*sty.g*wt.g*Gq),1,400);
    out.fpp = mode==="scope"?0 : cl(Math.round(out.tpp*(CASCADE.fpp??0.95)),1,400);
    return out;
  };
  const gc = buildGyro(gyroMode);

  const ga: Record<string, number> = {};
  for (const k of [...SCOPE_KEYS,"tpp" as const,"fpp" as const]) {
    const sk = (STICKY[styleId]?.[k]??1);
    ga[k] = cl(Math.round(gc[k]*G_ADGY*wr.a*sty.a*sk), gc[k]>0?1:0, 400);
  }

  const vb = (styleId==="proelite"||styleId==="elite"||styleId==="max")?1.45:1.04;
  const fl = {
    cam:cl(Math.round(tppCam*1.04),1,300), parashoot:cl(Math.round(tppCam*1.20),1,300),
    vehicle:cl(Math.round(tppCam*vb),1,300),
  };

  const dF=df, wF=cl((100-wp.verticalRecoil*0.5)/100,0.4,1), fF=1/fin, sF=sty.c;
  const gyS = gyroMode==="off"?0.5:device.gyroQuality==="excellent"?1:device.gyroQuality==="good"?0.8:0.6;
  const ai = Math.round(cl((dF*0.3+wF*0.2+fF*0.2+sF*0.15+gyS*0.15)*100,1,100));

  return {
    cam:cam as ScopeSens, ads:ads as ScopeSens,
    gyro:{cam:gc as ScopeSens, ads:ga as ScopeSens},
    freeLook:fl, aiScore:ai,
    factors:{deviceFactor:dF, weaponFactor:wF, fingerFactor:fF, styleFactor:sF},
  };
}

export function SensTable({title,icon,data,max,accent="text-orange-300",barClass="from-orange-500 to-amber-400"}:{
  title:string;icon:string;data:ScopeSens;max:number;accent?:string;barClass?:string;
}) {
  const {lang}=useLang();
  return (
    <div className="card rounded-2xl overflow-hidden">
      <div className={`flex items-center gap-2 border-b border-white/8 px-4 py-3 ${accent}`}>
        <span>{icon}</span><span className="font-display text-sm font-bold">{title}</span>
      </div>
      <div className="divide-y divide-white/5">
        {SCOPE_DEFS.map(r=>{const v=(data as Record<string,number>)[r.key]??0,off=v<=0,pct=off?0:Math.round(v/max*100);
          return (
            <div key={r.key} className="flex items-center gap-3 px-4 py-2.5">
              <span className="w-5 text-center text-sm">{r.icon}</span>
              <span className="w-20 shrink-0 text-xs text-white/60">{t(r.labelKey as never,lang)}</span>
              <div className="flex-1 overflow-hidden rounded-full bg-white/5">
                <div className={`h-1.5 rounded-full bg-gradient-to-r ${barClass} transition-all duration-700`} style={{width:`${pct}%`}} />
              </div>
              <span className={`w-12 text-right text-sm font-bold tabular-nums ${off?"text-white/20":accent}`}>{off?"—":`${v}%`}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function FactorsCard({factors}:{factors:Sens["factors"]}) {
  const {lang}=useLang();
  const items=[
    {k:"D",label:t("stability_device",lang),v:factors.deviceFactor},
    {k:"W",label:t("stability_weapon",lang),v:factors.weaponFactor},
    {k:"F",label:t("stability_fingers",lang),v:factors.fingerFactor},
    {k:"S",label:t("stability_style",lang),v:factors.styleFactor}
  ];
  return (
    <div className="grid grid-cols-4 gap-2">
      {items.map(it=>(
        <div key={it.k} className="card rounded-xl p-3 text-center">
          <div className="font-display text-xs font-black text-orange-300">{it.k}</div>
          <div className="text-[10px] text-white/50 mt-0.5">{it.label}</div>
          <div className="mt-1 text-sm font-bold text-white">{(it.v*100).toFixed(0)}%</div>
        </div>
      ))}
    </div>
  );
}

// findClosestPros — for pro player match
import { PRO_PLAYERS } from "./data";
export function findClosestPros(device: Device, styleId: string, fingers: number) {
  return PRO_PLAYERS.map(player => {
    let sim = 0;
    if (player.style === styleId) sim += 0.4;
    if (player.fingers === fingers) sim += 0.3;
    const fpsDiff = Math.abs((device.fps) - 120) / 120;
    sim += (1 - fpsDiff) * 0.3;
    return { player, similarity: Math.min(1, sim) };
  }).sort((a,b) => b.similarity - a.similarity).slice(0, 3);
}
