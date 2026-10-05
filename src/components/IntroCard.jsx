/**
 * IntroCard — Sonja's "now playing" intro card (v3b), as one self-contained React client component.
 *
 * - Drop-in replacement for the landscape photo: it fills the width of its container and keeps the
 *   card's aspect ratio (560 x 392 design units, scaled to fit). No global CSS, no page-level nav.
 * - All styles are scoped under `.swic` and injected by the component; class names are prefixed `swic-`.
 * - 3D float / cursor tilt / drag-to-spin / flip, now-playing strip (play / pause drives the robot-arm
 *   tonearm and the record), heart with burst + toast, save into a small "Saved" tray, reduced motion,
 *   sound (synthesised WebAudio) off by default.
 * - Optional small in-card controls (Flip / Reset / Sound), or drive it yourself through the ref handle.
 */
import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
export const PROFILE = {
    name: 'Sonja Wong',
    role: 'Software engineer',
    facts: ['Based in NY', 'Cornell'],
    backLine: 'Cornell CS',
    links: [
        { label: 'GitHub', href: 'https://github.com/wsonja' },
        { label: 'LinkedIn', href: 'https://www.linkedin.com/in/sonja-wong' },
        { label: 'Email', href: 'mailto:sw2374@cornell.edu' },
        { label: 'Resume', href: 'https://drive.google.com/file/d/1bJfzH6JQsTYHZVkPkriRCGAcesm-fRHV/view?usp=sharing' },
    ],
    nowPlaying: 'Sonja Wong',
    track: { length: 194, start: 47 },
};
const DW = 560, DH = 392, T = 6, SL = 9; // design width / height, edge thickness, edge slices
const WORDMARK = `<svg aria-hidden="true" focusable="false" viewBox="19.2 -764.1 2364.6 974.2"><g fill="currentColor"><path d="M464.6 -408.6 362.2 -393.5Q353.8 -420.5 328.8 -442.9Q303.8 -465.2 255.5 -465.2Q212 -465.2 182.9 -445.7Q153.8 -426.2 153.8 -396.1Q153.8 -369.8 173.3 -353.3Q192.8 -336.8 236.6 -326.7L325.5 -307.2Q401.1 -290.4 438.3 -253.9Q475.6 -217.4 475.6 -159.7Q475.6 -109.8 446.9 -71.2Q418.1 -32.6 367.3 -10.7Q316.4 11.2 249.8 11.2Q155.5 11.2 96.9 -29.2Q38.2 -69.5 25.2 -142.5L134.3 -157Q143.8 -117.7 173.1 -97.9Q202.5 -78 249.3 -78Q299.4 -78 329.8 -99Q360.2 -120 360.2 -150Q360.2 -200.1 284 -217.5L191.7 -238Q114.4 -255.3 77.6 -293.2Q40.8 -331.1 40.8 -389.5Q40.8 -438.6 68.1 -475.3Q95.4 -512 143.6 -532.3Q191.9 -552.7 254.5 -552.7Q345.5 -552.7 397.4 -513.4Q449.2 -474.1 464.6 -408.6Z"/><path d="M795.8 11.2Q718.1 11.2 660.5 -24Q602.9 -59.2 571.2 -122.6Q539.6 -186.1 539.6 -270Q539.6 -355.1 571.2 -418.7Q602.9 -482.3 660.5 -517.5Q718.1 -552.7 795.8 -552.7Q873.8 -552.7 931.5 -517.5Q989.1 -482.3 1020.9 -418.7Q1052.7 -355.1 1052.7 -270Q1052.7 -186.1 1020.9 -122.6Q989.1 -59.2 931.5 -24Q873.8 11.2 795.8 11.2ZM796.1 -82.5Q844.6 -82.5 876 -108Q907.4 -133.5 923 -176.3Q938.5 -219.1 938.5 -270.3Q938.5 -322.3 923 -365.1Q907.4 -407.9 876 -433.4Q844.6 -459 796.1 -459Q748.1 -459 716.5 -433.4Q684.9 -407.9 669.3 -365.1Q653.8 -322.3 653.8 -270.3Q653.8 -219.1 669.3 -176.3Q684.9 -133.5 716.5 -108Q748.1 -82.5 796.1 -82.5Z"/><path d="M1262.1 -322.5V0H1149.7V-545.9H1259.4V-455.1H1266.2Q1285 -499.8 1324.7 -526.3Q1364.3 -552.7 1425.9 -552.7Q1481.9 -552.7 1523.7 -529.3Q1565.5 -505.8 1588.8 -459.9Q1612 -414.1 1612 -346.9V0H1499.6V-331.9Q1499.6 -389.8 1469.3 -422.8Q1439 -455.7 1386.4 -455.7Q1350.5 -455.7 1322.4 -440Q1294.3 -424.2 1278.2 -394.6Q1262.1 -365.1 1262.1 -322.5Z"/><path d="M1725.2 -545.9H1837.6V34.5Q1838 90.3 1817.4 128.1Q1796.7 165.8 1757 185Q1717.2 204.1 1659.6 204.1H1636.9V108.7H1654.3Q1692.1 108.7 1708.5 89.5Q1724.8 70.2 1725.2 33.4Z"/><path d="M2103.2 11.7Q2051.3 11.7 2009.4 -7.5Q1967.5 -26.6 1943.3 -63.6Q1919 -100.5 1919 -154Q1919 -200.4 1936.7 -230.1Q1954.3 -259.9 1984.4 -277.6Q2014.4 -295.3 2051.5 -304.3Q2088.6 -313.3 2127.9 -317.7Q2176.6 -323.3 2206.8 -327.1Q2236.9 -330.9 2250.8 -339.5Q2264.7 -348.1 2264.7 -367V-369.7Q2264.7 -413.8 2239.3 -438.3Q2214 -462.8 2164.4 -462.8Q2113 -462.8 2083.1 -440.3Q2053.2 -417.8 2042.1 -389.1L1936.1 -410.1Q1952.9 -459.9 1986.8 -491.4Q2020.6 -522.9 2066 -537.8Q2111.5 -552.7 2163 -552.7Q2197.6 -552.7 2235 -544.7Q2272.3 -536.6 2304.9 -516Q2337.4 -495.4 2357.6 -458.2Q2377.9 -421 2377.9 -363.2V0H2268V-75H2264.1Q2253.6 -54 2232.8 -34.1Q2211.9 -14.2 2179.9 -1.3Q2147.9 11.7 2103.2 11.7ZM2129.1 -76.2Q2171.8 -76.2 2202.3 -93.1Q2232.7 -109.9 2248.9 -137.4Q2265.2 -164.8 2265.2 -196.2V-265Q2259.2 -259.6 2243.7 -255Q2228.2 -250.4 2208.5 -246.9Q2188.7 -243.4 2169.7 -240.9Q2150.7 -238.4 2137.9 -236.8Q2107.7 -232.7 2083 -223.5Q2058.3 -214.4 2043.7 -197.7Q2029.1 -181 2029.1 -153.4Q2029.1 -115.3 2057.3 -95.8Q2085.4 -76.2 2129.1 -76.2Z"/><path class="tittle" fill="currentColor" d="M1780.9 -627.6Q1752.4 -627.6 1732.1 -646.7Q1711.7 -665.8 1711.7 -692.9Q1711.7 -720 1732.1 -739Q1752.4 -758.1 1780.9 -758.1Q1809.4 -758.1 1829.8 -739Q1850.1 -720 1850.1 -692.9Q1850.1 -665.9 1829.8 -646.7Q1809.4 -627.6 1780.9 -627.6Z"/></g></svg>`;
const HEART = 'M8 13.6S2 10.1 2 5.9A3.1 3.1 0 0 1 8 4.6a3.1 3.1 0 0 1 6 1.3c0 4.2-6 7.7-6 7.7Z';
const CSS = `
.swic{--swic-ink:#121212;--swic-muted:#6E6E69;--swic-faint:#9A9A94;--swic-line:rgba(18,18,18,.10);--swic-hair:rgba(18,18,18,.09);--swic-r:18px;
  position:relative;width:100%;font-family:var(--font-geist-sans,"Geist"),ui-sans-serif,system-ui,-apple-system,"Segoe UI",sans-serif;
  color:var(--swic-ink);-webkit-font-smoothing:antialiased;isolation:isolate;text-align:left;line-height:normal}
.swic *,.swic *::before,.swic *::after{box-sizing:border-box;margin:0;padding:0}
.swic a{color:inherit;text-decoration:none}
.swic button{font:inherit;color:inherit;background:none;border:0;cursor:pointer;-webkit-appearance:none;appearance:none;line-height:normal}
.swic :focus-visible{outline:2px solid var(--swic-ink);outline-offset:3px;border-radius:8px}
.swic .swic-mono{font-family:var(--font-geist-mono,"Geist Mono"),ui-monospace,SFMono-Regular,Menlo,monospace}
.swic .swic-box{position:absolute;left:0;top:0;transform-origin:0 0;visibility:hidden}
.swic.swic-ready .swic-box{visibility:visible}
.swic .swic-stage{position:absolute;inset:0;display:grid;place-items:center;perspective:1700px;touch-action:pan-y;cursor:grab;user-select:none;-webkit-user-select:none}
.swic .swic-stage.swic-dragging{cursor:grabbing}
.swic .swic-shadow{position:absolute;left:50%;top:50%;width:${DW * .82}px;height:34px;margin-left:${-DW * .41}px;margin-top:${DH / 2 + 30}px;border-radius:50%;pointer-events:none;
  background:radial-gradient(closest-side,rgba(18,18,18,.14),rgba(18,18,18,.09) 30%,rgba(18,18,18,.035) 65%,rgba(18,18,18,0));will-change:transform,opacity}
.swic .swic-float{position:relative;width:${DW}px;height:${DH}px;transform-style:preserve-3d;will-change:transform;pointer-events:none}
.swic .swic-card{position:absolute;inset:0;transform-style:preserve-3d;will-change:transform;outline:none}
.swic .swic-card:focus-visible .swic-face{box-shadow:inset 0 0 0 1px var(--swic-hair),0 0 0 2px var(--swic-ink)}
.swic .swic-slice{position:absolute;inset:0;border-radius:var(--swic-r);background:#E3E3DE;pointer-events:none}
.swic .swic-slice.swic-rim{background:#D9D9D3}
.swic .swic-face{position:absolute;inset:0;border-radius:var(--swic-r);background:#fff;overflow:hidden;backface-visibility:hidden;-webkit-backface-visibility:hidden;
  box-shadow:inset 0 0 0 1px var(--swic-hair);padding:12px;display:flex;flex-direction:column;pointer-events:auto}
.swic .swic-front{transform:translateZ(${T / 2}px)}
.swic .swic-back{transform:rotateY(180deg) translateZ(${T / 2}px)}
.swic .swic-shade{position:absolute;inset:0;pointer-events:none;background:#121212;opacity:0;z-index:3}
.swic .swic-sheen{position:absolute;inset:-40% -60%;pointer-events:none;z-index:4}
.swic .swic-sheen i{position:absolute;top:0;bottom:0;left:50%;width:34%;margin-left:-17%;transform:rotate(18deg);
  background:linear-gradient(90deg,rgba(18,18,18,0),rgba(18,18,18,.022) 30%,rgba(255,255,255,.9) 47%,rgba(255,255,255,.9) 53%,rgba(18,18,18,.022) 70%,rgba(18,18,18,0));opacity:0}
.swic .swic-face > *:not(.swic-shade):not(.swic-sheen){position:relative;z-index:2}
.swic .swic-scene{position:relative;z-index:1;flex:1 1 auto;min-height:0;border-radius:11px;overflow:hidden;background:#9CCBF2}
.swic .swic-scene canvas{position:absolute;inset:0;width:100%;height:100%;display:block}
.swic .swic-id{display:flex;align-items:flex-end;justify-content:space-between;gap:16px;padding:12px 8px 10px}
.swic .swic-name{font-size:22px;font-weight:500;letter-spacing:-.02em;line-height:1.15;color:var(--swic-ink)}
.swic .swic-role{margin-top:3px;font-size:13px;color:var(--swic-muted);letter-spacing:-.005em}
.swic .swic-facts{display:flex;gap:6px;flex:none}
.swic .swic-chip{font-size:10px;letter-spacing:.08em;text-transform:uppercase;color:var(--swic-ink);border:1px solid var(--swic-line);border-radius:999px;padding:4px 9px;white-space:nowrap}
.swic .swic-chip.swic-sky{border-color:transparent;background:#E3F0FB}
.swic .swic-bid{flex:none;display:flex;flex-direction:column;justify-content:flex-end;padding:16px 8px 4px}
.swic .swic-bwm{display:block;height:34px;color:var(--swic-ink)}.swic .swic-bwm svg{height:100%;width:auto;display:block}
.swic .swic-bline{margin-top:8px;font-size:10.5px;letter-spacing:.08em;text-transform:uppercase;color:var(--swic-muted)}
.swic .swic-links{margin-top:16px;display:flex;flex-wrap:wrap;gap:8px}
.swic .swic-links a{display:inline-flex;align-items:center;gap:6px;height:32px;padding:0 14px;border-radius:999px;font-size:13px;font-weight:500;letter-spacing:-.01em;border:1px solid var(--swic-line);transition:border-color .2s,background .2s;cursor:pointer}
.swic .swic-links a:first-child{background:var(--swic-ink);color:#fff;border-color:var(--swic-ink)}
.swic .swic-links a:hover{border-color:rgba(18,18,18,.3)}
.swic .swic-links a::after{content:"\\2197";font-size:11px;opacity:.6}
.swic .swic-player{display:flex;align-items:center;gap:10px;margin:2px 4px;padding:7px 8px 7px 7px;border-radius:12px;background:#F4F4F1}
.swic .swic-pbtn{position:relative;width:30px;height:30px;flex:none;border-radius:50%;display:grid;place-items:center;color:var(--swic-ink);transition:background .2s}
.swic .swic-pbtn:hover{background:rgba(18,18,18,.06)}
.swic .swic-pbtn svg{width:16px;height:16px;display:block;overflow:visible}
.swic .swic-pbtn.swic-play{background:var(--swic-ink);color:#fff}.swic .swic-pbtn.swic-play:hover{background:#2a2a2a}
.swic .swic-pbtn.swic-play svg{width:12px;height:12px}
.swic .swic-pmid{flex:1;min-width:0}
.swic .swic-ptitle{display:flex;align-items:baseline;gap:6px;font-size:12px;font-weight:500;letter-spacing:-.005em;white-space:nowrap;overflow:hidden}
.swic .swic-ptitle .swic-mono{font-size:9.5px;font-weight:400;letter-spacing:.08em;text-transform:uppercase;color:var(--swic-faint)}
.swic .swic-pbar{display:flex;align-items:center;gap:8px;margin-top:5px;font-size:9.5px;color:var(--swic-faint);font-variant-numeric:tabular-nums}
.swic .swic-ptrack{position:relative;flex:1;height:3px;border-radius:3px;background:rgba(18,18,18,.12)}
.swic .swic-pfill{position:absolute;left:0;top:0;bottom:0;border-radius:3px;background:var(--swic-ink);width:0}
.swic .swic-pknob{position:absolute;top:50%;width:8px;height:8px;margin:-4px 0 0 -4px;border-radius:50%;background:var(--swic-ink);left:0}
.swic .swic-heart .swic-hfill{fill:#6FB1EA;opacity:0}.swic .swic-heart.swic-on .swic-hfill{opacity:1}.swic .swic-heart.swic-on .swic-hline{stroke:#5E9FD8}
.swic .swic-spark{position:absolute;left:50%;top:50%;width:5px;height:5px;margin:-2.5px;border-radius:50%;background:#6FB1EA;pointer-events:none;opacity:0}
.swic .swic-save.swic-on{color:#fff;background:#5E9FD8}.swic .swic-save.swic-on:hover{background:#4F90CB}
.swic .swic-toast{position:absolute;left:50%;top:var(--swic-toast-y);transform:translate(-50%,10px);opacity:0;pointer-events:none;z-index:6;
  display:flex;align-items:center;gap:8px;height:32px;padding:0 14px 0 11px;border-radius:999px;background:var(--swic-ink);color:#fff;font-size:12.5px;font-weight:500;letter-spacing:-.01em;white-space:nowrap}
.swic .swic-toast svg{width:13px;height:13px;display:block}
.swic .swic-tray{position:absolute;right:var(--swic-edge);top:var(--swic-edge);display:flex;align-items:center;gap:8px;height:32px;padding:0 12px 0 5px;border-radius:999px;background:#fff;
  box-shadow:inset 0 0 0 1px var(--swic-line),0 8px 22px -12px rgba(18,18,18,.3);font-size:12px;font-weight:500;letter-spacing:-.01em;opacity:0;transform:translateY(-8px);pointer-events:none;z-index:7}
.swic .swic-thumb{width:32px;height:22px;border-radius:6px;flex:none;display:block}
.swic .swic-tray b{font-weight:500}.swic .swic-count{font-size:10.5px;color:var(--swic-muted);min-width:1ch;display:inline-block}
.swic .swic-mini{position:absolute;left:0;top:0;width:112px;height:78px;border-radius:9px;pointer-events:none;z-index:8;box-shadow:0 10px 30px -10px rgba(18,18,18,.35)}
.swic .swic-ctl{position:absolute;left:var(--swic-edge);top:var(--swic-edge);display:flex;gap:6px;z-index:7;opacity:0;transition:opacity .25s}
.swic:hover .swic-ctl,.swic:focus-within .swic-ctl{opacity:1}
@media (hover:none){.swic .swic-ctl{opacity:1}}
.swic .swic-cbtn{width:28px;height:28px;border-radius:50%;display:grid;place-items:center;background:rgba(255,255,255,.88);box-shadow:inset 0 0 0 1px var(--swic-line),0 4px 14px -8px rgba(18,18,18,.35);color:var(--swic-ink);transition:background .2s,transform .2s}
.swic .swic-cbtn:hover{background:#fff}.swic .swic-cbtn:active{transform:scale(.94)}
.swic .swic-cbtn svg{width:14px;height:14px;display:block}
.swic .swic-cbtn[aria-pressed="true"]{background:var(--swic-ink);color:#fff}
.swic .swic-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
.swic.swic-rm .swic-slice{display:none}
.swic.swic-rm .swic-back{transform:translateZ(${T / 2}px);opacity:0;transition:opacity .35s ease}
.swic.swic-rm .swic-front{transition:opacity .35s ease}
.swic.swic-rm .swic-flipped .swic-back{opacity:1}.swic.swic-rm .swic-flipped .swic-front{opacity:0}
.swic.swic-rm .swic-face{backface-visibility:visible;-webkit-backface-visibility:visible}
.swic.swic-rm .swic-flipped .swic-front{pointer-events:none}.swic.swic-rm .swic-card:not(.swic-flipped) .swic-back{pointer-events:none}
.swic.swic-rm .swic-stage{cursor:default}
`;
const IntroCard = forwardRef(function IntroCard({ profile: profileOverride, controls = true, autoPlay = true, inset = 0, className, style }, ref) {
    const P = { ...PROFILE, ...profileOverride };
    const rootRef = useRef(null);
    const api = useRef({ flip: () => { }, reset: () => { }, togglePlay: () => { }, setSound: () => { } });
    const profRef = useRef(P);
    profRef.current = P;
    useImperativeHandle(ref, () => ({
        flip: () => api.current.flip(),
        reset: () => api.current.reset(),
        togglePlay: () => api.current.togglePlay(),
        setSound: (on) => api.current.setSound(on),
    }), []);
    const BW = DW + inset * 2, BH = DH + inset * 2;
    useEffect(() => {
        const root = rootRef.current;
        if (!root)
            return;
        const q = (k) => {
            const el = root.querySelector(`[data-swic="${k}"]`);
            if (!el)
                throw new Error(`IntroCard: missing ${k}`);
            return el;
        };
        const cleanups = [];
        const on = (tg, ev, fn, opt) => {
            tg.addEventListener(ev, fn, opt);
            cleanups.push(() => tg.removeEventListener(ev, fn, opt));
        };
        const onEl = (tg, ev, fn) => {
            tg.addEventListener(ev, fn);
            cleanups.push(() => tg.removeEventListener(ev, fn));
        };
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        root.classList.toggle('swic-rm', reduce);
        const box = q('box'), stage = q('stage'), flt = q('float'), card = q('card');
        const shadow = q('shadow');
        const faces = [q('front'), q('back')];
        const shades = faces.map(f => f.querySelector('.swic-shade')), sheens = faces.map(f => f.querySelector('.swic-sheen i'));
        /* ---------- fit to container ---------- */
        let scale = 1;
        const fit = () => {
            const w = root.clientWidth || BW;
            scale = w / BW;
            box.style.width = BW + 'px';
            box.style.height = BH + 'px';
            box.style.transform = `scale(${scale})`;
            root.classList.add('swic-ready');
            sizeCanvas();
        };
        /* ---------- sound (WebAudio, synthesized, off by default) ---------- */
        let soundOn = false, actx = null;
        const audio = () => {
            if (!actx) {
                const W = window;
                const AC = window.AudioContext || W.webkitAudioContext;
                actx = new AC();
            }
            return actx;
        };
        const noise = (dur) => { const a = audio(), b = a.createBuffer(1, Math.ceil(a.sampleRate * dur), a.sampleRate), d = b.getChannelData(0); for (let i = 0; i < d.length; i++)
            d[i] = Math.random() * 2 - 1; const s = a.createBufferSource(); s.buffer = b; return s; };
        const sfx = {
            flip() {
                const a = audio(), n = noise(.4), f = a.createBiquadFilter(), g = a.createGain(), t = a.currentTime;
                f.type = 'bandpass';
                f.Q.value = 1.4;
                f.frequency.setValueAtTime(700, t);
                f.frequency.exponentialRampToValueAtTime(2600, t + .3);
                g.gain.setValueAtTime(0, t);
                g.gain.linearRampToValueAtTime(.07, t + .06);
                g.gain.exponentialRampToValueAtTime(.001, t + .38);
                n.connect(f).connect(g).connect(a.destination);
                n.start(t);
                n.stop(t + .4);
            },
            pop() {
                const a = audio(), o = a.createOscillator(), g = a.createGain(), t = a.currentTime;
                o.type = 'sine';
                o.frequency.setValueAtTime(520, t);
                o.frequency.exponentialRampToValueAtTime(1040, t + .09);
                g.gain.setValueAtTime(.12, t);
                g.gain.exponentialRampToValueAtTime(.001, t + .16);
                o.connect(g).connect(a.destination);
                o.start(t);
                o.stop(t + .17);
            },
            tick() {
                const a = audio(), o = a.createOscillator(), g = a.createGain(), t = a.currentTime;
                o.frequency.value = 1320;
                g.gain.setValueAtTime(.03, t);
                g.gain.exponentialRampToValueAtTime(.001, t + .08);
                o.connect(g).connect(a.destination);
                o.start(t);
                o.stop(t + .09);
            },
        };
        const play = (k) => { if (soundOn)
            try {
                sfx[k]();
            }
            catch { /* audio unavailable */ } };
        const sndBtn = root.querySelector('[data-swic="sound"]');
        const setSound = (v) => { soundOn = v; sndBtn?.setAttribute('aria-pressed', String(v)); sndBtn?.setAttribute('aria-label', v ? 'Sound on' : 'Sound off'); if (v) {
            void audio().resume?.();
            play('tick');
        } };
        if (sndBtn)
            onEl(sndBtn, 'click', () => setSound(!soundOn));
        /* ---------- motion state ---------- */
        const S = { ry: 0, rx: 0, vy: 0, vx: 0, base: 0, mode: 'spring', lift: 0, vlift: 0, press: 0, vpress: 0 };
        const ptr = { nx: 0, ny: 0, tx: 0, ty: 0, last: -1e9 };
        const drag = { on: false, id: -1, x0: 0, y0: 0, ry0: 0, rx0: 0, hist: [], moved: 0, t0: 0 };
        const now = () => performance.now() / 1000;
        const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
        const flipped = () => (((Math.round(S.base / 180) % 2) + 2) % 2) === 1;
        function flip() {
            if (reduce) {
                S.base += 180;
                card.classList.toggle('swic-flipped', flipped());
                play('flip');
                return;
            }
            S.base = Math.round(S.ry / 180) * 180 + 180;
            S.mode = 'spring';
            S.vlift += 70;
            play('flip');
        }
        function reset() {
            if (reduce) {
                S.base = 0;
                card.classList.remove('swic-flipped');
                return;
            }
            S.base = Math.round(S.ry / 360) * 360;
            S.mode = 'spring';
            ptr.tx = ptr.ty = 0;
        }
        const fb = root.querySelector('[data-swic="flip"]'), rb = root.querySelector('[data-swic="reset"]');
        if (fb)
            onEl(fb, 'click', flip);
        if (rb)
            onEl(rb, 'click', reset);
        // keys only while focus is inside the card, so they never hijack the rest of the site
        onEl(root, 'keydown', e => {
            const tg = e.target;
            if (tg.closest('a,button'))
                return;
            if (e.key === 'f' || e.key === 'F' || ((e.key === 'Enter' || e.key === ' ') && tg === card)) {
                e.preventDefault();
                flip();
            }
            else if (e.key === 'r' || e.key === 'R')
                reset();
            else if (!reduce && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) {
                e.preventDefault();
                S.vy += e.key === 'ArrowLeft' ? -420 : 420;
                S.mode = 'coast';
            }
        });
        /* ---------- pointer: tilt, drag-to-spin ---------- */
        on(window, 'pointermove', e => {
            const r = stage.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height / 2;
            ptr.tx = clamp((e.clientX - cx) / ((DW / 2 + 260) * scale), -1, 1);
            ptr.ty = clamp((e.clientY - cy) / ((DH / 2 + 220) * scale), -1, 1);
            ptr.last = now();
            if (drag.on && e.pointerId === drag.id) {
                const dx = e.clientX - drag.x0, dy = e.clientY - drag.y0;
                drag.moved = Math.max(drag.moved, Math.hypot(dx, dy));
                S.ry = drag.ry0 + dx * .42;
                S.rx = clamp(drag.rx0 - dy * .22, -28, 28);
                drag.hist.push([now(), S.ry, S.rx]);
                if (drag.hist.length > 8)
                    drag.hist.shift();
            }
        }, { passive: true });
        const leave = () => { ptr.tx = ptr.ty = 0; };
        document.documentElement.addEventListener('pointerleave', leave);
        cleanups.push(() => document.documentElement.removeEventListener('pointerleave', leave));
        onEl(stage, 'pointerdown', e => {
            if (e.button !== 0 || e.target.closest('a,button'))
                return;
            drag.on = true;
            drag.id = e.pointerId;
            drag.x0 = e.clientX;
            drag.y0 = e.clientY;
            drag.ry0 = S.ry;
            drag.rx0 = S.rx;
            drag.hist = [[now(), S.ry, S.rx]];
            drag.moved = 0;
            drag.t0 = now();
            if (!reduce) {
                S.mode = 'drag';
                S.vy = S.vx = 0;
                stage.classList.add('swic-dragging');
            }
        });
        const endDrag = (e) => {
            if (!drag.on || e.pointerId !== drag.id)
                return;
            drag.on = false;
            stage.classList.remove('swic-dragging');
            const isClick = drag.moved < 6 && now() - drag.t0 < .5;
            if (isClick) {
                if (!reduce) {
                    S.mode = 'spring';
                    S.base = Math.round(S.ry / 180) * 180;
                }
                return;
            }
            if (reduce)
                return;
            const h = drag.hist, a = h[0], b = h[h.length - 1], dt = Math.max(.016, b[0] - a[0]);
            S.vy = clamp((b[1] - a[1]) / dt, -2400, 2400);
            S.vx = clamp((b[2] - a[2]) / dt, -500, 500);
            S.mode = Math.abs(S.vy) > 240 ? 'coast' : 'spring';
            if (S.mode === 'spring')
                S.base = Math.round(S.ry / 180) * 180;
        };
        on(window, 'pointerup', endDrag);
        on(window, 'pointercancel', endDrag);
        onEl(faces[0], 'click', e => { const a = e.target.closest('a'); if (a && a.getAttribute('href') === '#')
            e.preventDefault(); });
        /* ---------- illustrated scene (canvas 2D, flat coloured shapes + grain) ---------- */
        const PAL = { sky: '#9CCBF2', skyLt: '#CFE6F8', skyDp: '#5E9FD8', cream: '#F4EADB', creamDk: '#E6D6BF',
            mocha: '#8A6248', coffee: '#5B3D2C', espresso: '#33231A', ink: '#17171A', lilac: '#C9C2EE', mint: '#BFE3D0' };
        const scenes = [
            { cv: q('sceneF'), draw: drawBack, w: 0, h: 0, ctx: null },
            { cv: q('sceneB'), draw: drawFront, w: 0, h: 0, ctx: null },
        ];
        let RD = 1;
        const grain = document.createElement('canvas');
        grain.width = grain.height = 160;
        {
            const g = grain.getContext('2d');
            if (g) {
                const im = g.createImageData(160, 160);
                for (let i = 0; i < im.data.length; i += 4) {
                    const v = Math.random() * 255;
                    im.data[i] = im.data[i + 1] = im.data[i + 2] = v;
                    im.data[i + 3] = 255;
                }
                g.putImageData(im, 0, 0);
            }
        }
        let grainPat = null;
        function sizeCanvas() {
            RD = clamp((window.devicePixelRatio || 1) * scale * 1.25, 1, 3); // oversample: shown on a tilted 3D plane
            scenes.forEach(s => { s.w = s.cv.clientWidth; s.h = s.cv.clientHeight; s.cv.width = Math.max(1, Math.round(s.w * RD)); s.cv.height = Math.max(1, Math.round(s.h * RD)); s.ctx = s.cv.getContext('2d'); });
            grainPat = scenes[0].ctx ? scenes[0].ctx.createPattern(grain, 'repeat') : null;
            drawScene(0, 3.0);
            drawScene(1, 3.0);
        }
        const easeIO = (t) => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        const lerp = (a, b, k) => a + (b - a) * k;
        const rr = (c, x, y, w, h, r) => { c.beginPath(); c.roundRect(x, y, w, h, r); };
        const circ = (c, x, y, r) => { c.beginPath(); c.arc(x, y, r, 0, Math.PI * 2); };
        // the story is driven by the player: Play swings the robot arm in and drops the needle, the record spins up; Pause lifts and spins down
        const player = { playing: autoPlay, armK: autoPlay ? 1 : 0, playK: autoPlay ? 1 : 0, pos: 0 };
        const story = () => ({ arm: easeIO(player.armK), play: player.playK });
        let recAngle = 0, recSpeed = 0;
        function drawScene(i, t) {
            const s = scenes[i], c = s.ctx;
            if (!c || !s.w)
                return;
            c.setTransform(RD, 0, 0, RD, 0, 0);
            c.clearRect(0, 0, s.w, s.h);
            s.draw(c, s.w, s.h, t);
            if (grainPat) {
                c.save();
                c.setTransform(1, 0, 0, 1, 0, 0);
                c.globalAlpha = .07;
                c.globalCompositeOperation = 'overlay';
                c.fillStyle = grainPat;
                c.fillRect(0, 0, s.cv.width, s.cv.height);
                c.restore();
            }
        }
        function drawFront(c, W, H, t) {
            const st = story(), k = W / 520; // design space: 520 wide, anchored to the bottom
            const px = reduce ? 0 : clamp(ptr.nx + Math.sin(S.ry * Math.PI / 180) * .6, -1, 1), py = reduce ? 0 : ptr.ny;
            const Pp = (d) => [px * d * k, py * d * .6 * k]; // parallax offset per layer depth
            c.save();
            c.fillStyle = PAL.sky;
            c.fillRect(0, 0, W, H);
            c.translate(0, H - 250 * k);
            c.scale(k, k); // from here: 520 x 250 design units
            let o;
            // back hills
            o = Pp(6);
            c.fillStyle = PAL.skyLt;
            c.beginPath();
            c.moveTo(-20 + o[0], 250);
            c.bezierCurveTo(60 + o[0], 150 + o[1], 170 + o[0], 160 + o[1], 260 + o[0], 205 + o[1]);
            c.bezierCurveTo(330 + o[0], 170 + o[1], 450 + o[0], 150 + o[1], 560 + o[0], 200 + o[1]);
            c.lineTo(560, 260);
            c.closePath();
            c.fill();
            // the record (spins up while the needle is down)
            o = Pp(10);
            const rx = 158 + o[0], ry = 128 + o[1], R0 = 98;
            c.fillStyle = 'rgba(23,23,26,.16)';
            circ(c, rx + 6, ry + 8, R0);
            c.fill();
            c.fillStyle = PAL.ink;
            circ(c, rx, ry, R0);
            c.fill();
            c.lineWidth = 1;
            for (let g = 0; g < 14; g++) {
                c.strokeStyle = `rgba(255,255,255,${g % 4 === 0 ? .1 : .045})`;
                circ(c, rx, ry, 40 + g * 4.1);
                c.stroke();
            }
            c.fillStyle = 'rgba(255,255,255,.07)';
            c.beginPath();
            c.moveTo(rx, ry);
            c.arc(rx, ry, R0 - 3, -2.3, -1.85);
            c.closePath();
            c.fill();
            c.beginPath();
            c.moveTo(rx, ry);
            c.arc(rx, ry, R0 - 3, .84, 1.3);
            c.closePath();
            c.fill();
            c.save();
            c.translate(rx, ry);
            c.rotate(recAngle);
            c.fillStyle = PAL.skyDp;
            circ(c, 0, 0, 34);
            c.fill();
            c.fillStyle = PAL.cream;
            c.beginPath();
            c.arc(0, 0, 34, -.5, .5);
            c.lineTo(0, 0);
            c.closePath();
            c.fill();
            c.fillStyle = PAL.sky;
            circ(c, 0, 0, 16);
            c.fill();
            c.restore();
            c.fillStyle = PAL.cream;
            circ(c, rx, ry, 3.2);
            c.fill();
            // robot arm = tonearm: base on the desk, two segments, needle head
            o = Pp(12);
            const bx = 318 + o[0], by = 206 + o[1];
            const tip = [lerp(352, 236, st.arm), lerp(52, 96 + (st.play > .5 ? Math.sin(t * 9) * .6 : 0), st.arm)];
            const L1 = 92, L2 = 88, dx = tip[0] - bx, dy = tip[1] - (by - 22), d = Math.min(L1 + L2 - .1, Math.hypot(dx, dy));
            const a0 = Math.atan2(dy, dx), a1 = Math.acos(clamp((L1 * L1 + d * d - L2 * L2) / (2 * L1 * d), -1, 1));
            const el = [bx + Math.cos(a0 + a1) * L1, by - 22 + Math.sin(a0 + a1) * L1];
            c.lineCap = 'round';
            c.strokeStyle = PAL.coffee;
            c.lineWidth = 14;
            c.beginPath();
            c.moveTo(bx, by - 22);
            c.lineTo(el[0], el[1]);
            c.stroke();
            c.strokeStyle = PAL.mocha;
            c.lineWidth = 11;
            c.beginPath();
            c.moveTo(el[0], el[1]);
            c.lineTo(tip[0], tip[1]);
            c.stroke();
            c.fillStyle = PAL.cream;
            circ(c, el[0], el[1], 7.5);
            c.fill();
            c.fillStyle = PAL.coffee;
            circ(c, el[0], el[1], 2.6);
            c.fill();
            c.save();
            c.translate(tip[0], tip[1]);
            c.rotate(Math.atan2(tip[1] - el[1], tip[0] - el[0]));
            c.fillStyle = PAL.ink;
            rr(c, -4, -8, 22, 16, 5);
            c.fill();
            c.fillStyle = PAL.skyLt;
            circ(c, 6, 0, 3);
            c.fill();
            c.restore();
            c.fillStyle = PAL.ink;
            rr(c, bx - 26, by - 30, 52, 34, 10);
            c.fill();
            c.fillStyle = PAL.sky;
            rr(c, bx - 26, by - 14, 52, 5, 2.5);
            c.fill();
            c.fillStyle = PAL.cream;
            circ(c, bx, by - 22, 8.5);
            c.fill();
            c.fillStyle = PAL.ink;
            circ(c, bx, by - 22, 3);
            c.fill();
            // desk
            o = Pp(14);
            c.fillStyle = PAL.cream;
            rr(c, -30 + o[0], 204 + o[1], 600, 60, 8);
            c.fill();
            c.fillStyle = PAL.creamDk;
            c.fillRect(-30 + o[0], 222 + o[1], 600, 40);
            c.restore();
        }
        function drawBack(c, W, H, t) {
            const st = story(), k = W / 520;
            c.fillStyle = PAL.sky;
            c.fillRect(0, 0, W, H);
            c.save();
            c.scale(k, k);
            const h = H / k, mid = h / 2;
            const cols = [PAL.cream, PAL.skyLt, PAL.lilac, PAL.mint, PAL.cream, PAL.skyLt];
            const n = 13, gap = 9, bw = (520 - 220 - gap * (n - 1)) / n;
            for (let i = 0; i < n; i++) {
                const lv = reduce ? .5 + .4 * Math.sin(i * .7) : .35 + .45 * Math.abs(Math.sin(t * 2.1 + i * .55)) * (.6 + .4 * Math.sin(t * .7 + i * .21)) + .2 * Math.max(0, Math.sin(t * Math.PI * 2 / .9));
                const bh = Math.max(bw, lv * (h - 40) * (.12 + .88 * st.play));
                c.fillStyle = cols[i % cols.length];
                rr(c, 200 + i * (bw + gap), mid - bh / 2, bw, bh, bw / 2);
                c.fill();
            }
            const rx = 100, ry = mid, R0 = Math.min(78, mid - 14);
            c.fillStyle = PAL.ink;
            circ(c, rx, ry, R0);
            c.fill();
            for (let g = 0; g < 9; g++) {
                c.strokeStyle = `rgba(255,255,255,${g % 3 === 0 ? .1 : .05})`;
                c.lineWidth = 1;
                circ(c, rx, ry, R0 * .42 + g * R0 * .06);
                c.stroke();
            }
            c.save();
            c.translate(rx, ry);
            c.rotate(recAngle * .8);
            c.fillStyle = PAL.skyDp;
            circ(c, 0, 0, R0 * .34);
            c.fill();
            c.fillStyle = PAL.cream;
            c.beginPath();
            c.arc(0, 0, R0 * .34, -.5, .5);
            c.lineTo(0, 0);
            c.closePath();
            c.fill();
            c.fillStyle = PAL.sky;
            circ(c, 0, 0, R0 * .16);
            c.fill();
            c.restore();
            c.fillStyle = PAL.cream;
            circ(c, rx, ry, 2.6);
            c.fill();
            c.restore();
        }
        function updateRecord(dt) {
            const st = story(), target = st.play * (Math.PI * 2 / 1.8);
            recSpeed += (target - recSpeed) * (1 - Math.exp(-dt * 2.2));
            recAngle += recSpeed * dt;
            if (!reduce && st.play === 0 && st.arm === 0)
                recAngle += .25 * dt; // idle drift so it never looks frozen
        }
        /* ---------- tiny tween runner (driven by the frame clock) ---------- */
        const tweens = [];
        const tween = (dur, fn, done) => { if (reduce) {
            fn(1);
            done?.();
            return;
        } tweens.push({ t0: now(), dur, fn, done }); };
        const runTweens = (tn) => { for (let i = tweens.length - 1; i >= 0; i--) {
            const w = tweens[i], k = Math.min(1, (tn - w.t0) / w.dur);
            w.fn(k);
            if (k >= 1) {
                tweens.splice(i, 1);
                w.done?.();
            }
        } };
        const outBack = (k) => 1 + 2.4 * Math.pow(k - 1, 3) + 1.4 * Math.pow(k - 1, 2), outCubic = (k) => 1 - Math.pow(1 - k, 3);
        /* ---------- player strip ---------- */
        const fmt = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
        const track = () => profRef.current.track;
        player.pos = track().start;
        const pplay = q('pplay'), icoPause = q('icoPause'), icoPlay = q('icoPlay');
        const pfill = q('pfill'), pknob = q('pknob'), tEl = q('tEl'), tRem = q('tRem');
        const setPlayIcon = () => {
            icoPause.style.opacity = player.playing ? '1' : '0';
            icoPlay.style.opacity = player.playing ? '0' : '1';
            pplay.setAttribute('aria-label', player.playing ? 'Pause' : 'Play');
        };
        function updatePlayer(dt) {
            const L = track().length;
            if (dt) {
                if (player.playing) {
                    player.armK = Math.min(1, player.armK + dt / 1.1);
                    if (player.armK >= 1)
                        player.playK = Math.min(1, player.playK + dt / .7);
                }
                else {
                    player.playK = Math.max(0, player.playK - dt / .45);
                    if (player.playK <= .3)
                        player.armK = Math.max(0, player.armK - dt / 1.1);
                }
                player.pos += dt * player.playK;
                if (player.pos >= L)
                    player.pos = 0;
            }
            const f = player.pos / L;
            pfill.style.width = (f * 100).toFixed(2) + '%';
            pknob.style.left = (f * 100).toFixed(2) + '%';
            tEl.textContent = fmt(player.pos);
            tRem.textContent = '-' + fmt(L - player.pos);
        }
        const togglePlay = () => {
            player.playing = !player.playing;
            setPlayIcon();
            play('tick');
            if (reduce) {
                player.armK = player.playK = player.playing ? 1 : 0;
                drawScene(0, 3);
                drawScene(1, 3);
            }
            const ic = pplay.querySelector('svg');
            if (ic)
                tween(.32, k => { ic.style.transform = `scale(${(.7 + .3 * outBack(k)).toFixed(3)})`; });
        };
        onEl(pplay, 'click', togglePlay);
        setPlayIcon();
        updatePlayer(0);
        // like: heart pops filled with a sky particle burst + toast
        let liked = false;
        const likeBtn = q('like'), toast = q('toast'), toastTxt = q('toastTxt');
        const sparks = [...likeBtn.querySelectorAll('.swic-spark')];
        let toastTimer = 0;
        function showToast(txt) {
            toastTxt.textContent = txt;
            window.clearTimeout(toastTimer);
            tween(.32, k => { const e = outCubic(k); toast.style.opacity = e.toFixed(3); toast.style.transform = `translate(-50%,${(10 * (1 - e)).toFixed(1)}px)`; });
            toastTimer = window.setTimeout(() => tween(.3, k => { toast.style.opacity = (1 - k).toFixed(3); toast.style.transform = `translate(-50%,${(-6 * k).toFixed(1)}px)`; }), 1500);
        }
        onEl(likeBtn, 'click', () => {
            liked = !liked;
            likeBtn.classList.toggle('swic-on', liked);
            likeBtn.setAttribute('aria-pressed', String(liked));
            likeBtn.setAttribute('aria-label', liked ? 'Unlike' : 'Like');
            const ic = likeBtn.querySelector('svg');
            if (liked) {
                play('pop');
                if (ic)
                    tween(.45, k => { ic.style.transform = `scale(${(k < .3 ? 1 - .25 * k / .3 : .75 + .25 * outBack((k - .3) / .7)).toFixed(3)})`; });
                sparks.forEach((sp, i) => {
                    const a = i / 8 * Math.PI * 2 + .2, d = 15 + (i % 2) * 5;
                    tween(.55, k => { const e = outCubic(k); sp.style.opacity = (k < .15 ? k / .15 : 1 - (k - .15) / .85).toFixed(3); sp.style.transform = `translate(${(Math.cos(a) * d * e).toFixed(1)}px,${(Math.sin(a) * d * e).toFixed(1)}px) scale(${(1 - .6 * k).toFixed(2)})`; });
                });
                showToast('Added to Liked');
            }
            else {
                play('tick');
                if (ic)
                    tween(.25, k => { ic.style.transform = `scale(${(.85 + .15 * k).toFixed(3)})`; });
                showToast('Removed from Liked');
            }
        });
        // save: + morphs into a check, the card dips, a mini thumbnail flies into the "Saved" tray
        let saved = 0;
        const saveBtn = q('save'), tray = q('tray'), thumb = q('thumb'), count = q('count');
        const plus = q('icoPlus'), check = q('icoCheck');
        function paintThumb(cv) {
            const c = cv.getContext('2d');
            if (!c)
                return;
            const w = cv.width, h = cv.height;
            c.clearRect(0, 0, w, h);
            c.fillStyle = '#fff';
            rr(c, 0, 0, w, h, h * .16);
            c.fill();
            c.fillStyle = PAL.sky;
            rr(c, w * .06, h * .08, w * .88, h * .6, h * .1);
            c.fill();
            c.fillStyle = PAL.ink;
            circ(c, w * .28, h * .38, h * .2);
            c.fill();
            c.fillStyle = PAL.skyDp;
            circ(c, w * .28, h * .38, h * .07);
            c.fill();
            [PAL.cream, PAL.skyLt, PAL.lilac, PAL.mint, PAL.cream].forEach((col, i) => {
                const bh = h * (.14 + (i % 3) * .07);
                c.fillStyle = col;
                rr(c, w * .5 + i * w * .075, h * .38 - bh / 2, w * .045, bh, 2);
                c.fill();
            });
            c.fillStyle = PAL.ink;
            rr(c, w * .06, h * .76, w * .4, h * .07, 2);
            c.fill();
            c.fillStyle = 'rgba(18,18,18,.25)';
            rr(c, w * .06, h * .87, w * .26, h * .05, 2);
            c.fill();
        }
        paintThumb(thumb);
        let trayV = 0;
        const setTray = (vis) => {
            const v0 = trayV;
            tween(.35, k => {
                const e = outCubic(k);
                trayV = lerp(v0, vis ? 1 : 0, e);
                tray.style.opacity = trayV.toFixed(3);
                tray.style.transform = `translateY(${(-8 * (1 - trayV)).toFixed(1)}px)`;
            });
        };
        onEl(saveBtn, 'click', () => {
            const isOn = !saved;
            saved = isOn ? 1 : 0;
            saveBtn.classList.toggle('swic-on', isOn);
            saveBtn.setAttribute('aria-pressed', String(isOn));
            saveBtn.setAttribute('aria-label', isOn ? 'Remove from saved' : 'Save');
            plus.style.transformOrigin = '8px 8px';
            check.style.strokeDasharray = '14';
            tween(.35, k => {
                const e = outCubic(k), v = isOn ? e : 1 - e;
                plus.style.opacity = (1 - v).toFixed(3);
                plus.style.transform = `rotate(${(90 * v).toFixed(1)}deg)`;
                check.style.opacity = v.toFixed(3);
                check.style.strokeDashoffset = (14 * (1 - v)).toFixed(2);
            });
            play(isOn ? 'pop' : 'tick');
            count.textContent = String(saved);
            if (!isOn) {
                setTray(false);
                return;
            }
            if (!reduce) {
                S.vpress += 320;
                S.vx -= 40;
            }
            // fly a mini card from the card into the tray (all in the component's own design coordinates)
            const br = box.getBoundingClientRect(), to = thumb.getBoundingClientRect();
            const x0 = BW / 2 - 56, y0 = BH / 2 - 39;
            const x1 = (to.left - br.left) / scale + to.width / scale / 2 - 56, y1 = (to.top - br.top) / scale + to.height / scale / 2 - 39;
            const s1 = to.width / scale / 112;
            const mini = document.createElement('canvas');
            mini.className = 'swic-mini';
            mini.width = 224;
            mini.height = 156;
            paintThumb(mini);
            mini.style.transform = `translate(${x0}px,${y0}px)`;
            box.appendChild(mini);
            setTray(true);
            tween(.75, k => {
                const e = easeIO(k), arc = -70 * Math.sin(Math.PI * k);
                mini.style.transform = `translate(${(x0 + (x1 - x0) * e).toFixed(1)}px,${(y0 + (y1 - y0) * e + arc).toFixed(1)}px) scale(${(1 + (s1 - 1) * e).toFixed(3)}) rotate(${(-8 * Math.sin(Math.PI * k)).toFixed(2)}deg)`;
                mini.style.opacity = (k < .85 ? 1 : 1 - (k - .85) / .15).toFixed(3);
            }, () => { mini.remove(); tween(.3, k => { count.style.transform = `scale(${(1 + .5 * Math.sin(Math.PI * k)).toFixed(3)})`; }); });
        });
        cleanups.push(() => { window.clearTimeout(toastTimer); box.querySelectorAll('.swic-mini').forEach(m => m.remove()); });
        /* ---------- frame ---------- */
        const T0 = now();
        let prev = now(), raf = 0, running = false, visible = true;
        function frame() {
            const tn = now(), dt = Math.min(1 / 30, tn - prev);
            prev = tn;
            const t = tn - T0;
            const idle = tn - ptr.last > 4; // relax to centre after 4 s without movement
            const kp = 1 - Math.exp(-dt * 4);
            ptr.nx += ((idle ? 0 : ptr.tx) - ptr.nx) * kp;
            ptr.ny += ((idle ? 0 : ptr.ty) - ptr.ny) * kp;
            const wob = 1 - Math.min(1, Math.hypot(ptr.nx, ptr.ny) * 1.5);
            const tgY = S.base + ptr.nx * 16 + wob * 4.5 * Math.sin(t * .55);
            const tgX = -ptr.ny * 11 + wob * 2.5 * Math.sin(t * .41 + 1);
            if (S.mode === 'coast') {
                S.vy *= Math.exp(-dt * 1.6);
                S.ry += S.vy * dt;
                S.vx += (-40 * (S.rx - tgX) - 9 * S.vx) * dt;
                S.rx += S.vx * dt;
                if (Math.abs(S.vy) < 200) {
                    S.mode = 'spring';
                    S.base = Math.round((S.ry + S.vy * .12) / 180) * 180;
                }
            }
            else if (S.mode === 'spring') {
                const K = 62, C = 2 * Math.sqrt(K) * .58;
                S.vy += (K * (tgY - S.ry) - C * S.vy) * dt;
                S.ry += S.vy * dt;
                S.vx += (K * (tgX - S.rx) - C * S.vx) * dt;
                S.rx += S.vx * dt;
            }
            const lt = drag.on && S.mode === 'drag' ? 28 : 0;
            S.vlift += (90 * (lt - S.lift) - 16 * S.vlift) * dt;
            S.lift += S.vlift * dt;
            S.vpress += (-420 * S.press - 30 * S.vpress) * dt;
            S.press += S.vpress * dt;
            const fy = Math.sin(t * 2 * Math.PI / 6.2) * 7; // gentle float
            const rz = Math.sin(t * .37) * .5;
            flt.style.transform = `translate3d(0,${fy.toFixed(2)}px,${(S.lift - S.press).toFixed(2)}px)`;
            card.style.transform = `rotateZ(${rz.toFixed(3)}deg) rotateX(${S.rx.toFixed(3)}deg) rotateY(${S.ry.toFixed(3)}deg)`;
            const ry = S.ry * Math.PI / 180, rx = S.rx * Math.PI / 180, cy = Math.cos(ry) * Math.cos(rx);
            shades[0].style.opacity = (Math.max(0, .055 * (1 - Math.max(0, cy)) + Math.max(0, -Math.sin(rx)) * .02)).toFixed(3);
            shades[1].style.opacity = (Math.max(0, .055 * (1 - Math.max(0, -cy)) + Math.max(0, -Math.sin(rx)) * .02)).toFixed(3);
            const g = Math.sin(ry) * 1.6 + Math.sin(rx) * .6 + Math.sin(t * .23) * .25;
            sheens.forEach((s, i) => { const gg = i ? -g : g; s.style.transform = `translateX(${(gg * 38).toFixed(1)}%) rotate(18deg)`; s.style.opacity = (.18 + .5 * Math.min(1, Math.abs(gg) * .9)).toFixed(3); });
            const w = .3 + .7 * Math.abs(Math.cos(ry)), h2 = (fy + 7) / 14, up = Math.max(0, S.lift) / 28;
            shadow.style.transform = `scale(${(w * (1 - .06 * h2 + .05 * up)).toFixed(3)},${(1 + .1 * up).toFixed(3)})`;
            shadow.style.opacity = (.95 - .25 * h2 - .3 * up).toFixed(3);
            runTweens(tn);
            updatePlayer(dt);
            updateRecord(dt);
            if (cy > -.2)
                drawScene(0, t);
            if (cy < .2)
                drawScene(1, t);
            raf = requestAnimationFrame(frame);
        }
        const start = () => { if (running || reduce || !visible || document.hidden)
            return; running = true; prev = now(); raf = requestAnimationFrame(frame); };
        const stop = () => { running = false; cancelAnimationFrame(raf); };
        fit();
        const ro = new ResizeObserver(() => fit());
        ro.observe(root);
        cleanups.push(() => ro.disconnect());
        void document.fonts?.ready.then(() => { if (rootRef.current)
            sizeCanvas(); });
        const io = new IntersectionObserver(es => { visible = es.some(e => e.isIntersecting); if (visible)
            start();
        else
            stop(); });
        io.observe(root);
        cleanups.push(() => io.disconnect());
        const vis = () => { if (document.hidden)
            stop();
        else
            start(); };
        document.addEventListener('visibilitychange', vis);
        cleanups.push(() => document.removeEventListener('visibilitychange', vis));
        start();
        api.current = { flip, reset, togglePlay, setSound };
        return () => { stop(); cleanups.forEach(f => f()); void actx?.close().catch(() => { }); };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [BW, BH, autoPlay]);
    const slices = Array.from({ length: SL }, (_, i) => (<div key={i} className={'swic-slice' + (i === 0 || i === SL - 1 ? ' swic-rim' : '')} style={{ transform: `translateZ(${(-T / 2 + .35 + (T - .7) * i / (SL - 1)).toFixed(2)}px)` }}/>));
    const vars = { '--swic-edge': `${inset + 22}px`, '--swic-toast-y': `${inset + 214}px`, aspectRatio: `${BW} / ${BH}`, ...style };
    return (<div ref={rootRef} className={'swic' + (className ? ' ' + className : '')} style={vars}>
      <style>{CSS}</style>
      <div className="swic-box" data-swic="box" style={{ width: BW, height: BH }}>
        <div className="swic-stage" data-swic="stage">
          <div className="swic-shadow" data-swic="shadow" aria-hidden="true"/>
          <div className="swic-float" data-swic="float">
            <div className="swic-card" data-swic="card" tabIndex={0} role="group" aria-roledescription="flippable card" aria-label={`Card for ${P.name}. Press Enter to flip.`}>
              {slices}
              <section className="swic-face swic-front" data-swic="front" aria-label="Front">
                <div className="swic-shade"/><div className="swic-sheen"><i /></div>
                <div className="swic-scene"><canvas data-swic="sceneF" aria-hidden="true"/></div>
                <div className="swic-bid">
                  <span className="swic-bwm" role="img" aria-label="sonja" dangerouslySetInnerHTML={{ __html: WORDMARK }}/>
                  <p className="swic-bline swic-mono">{P.backLine}</p>
                  <nav className="swic-links" aria-label="Links">
                    {P.links.map(l => {
            const ext = /^https?:/.test(l.href);
            return <a key={l.label} href={l.href} {...(ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{l.label}</a>;
        })}
                  </nav>
                </div>
              </section>
              <section className="swic-face swic-back" data-swic="back" aria-label="Back">
                <div className="swic-shade"/><div className="swic-sheen"><i /></div>
                <div className="swic-scene"><canvas data-swic="sceneB" aria-hidden="true"/></div>
                <div className="swic-id">
                  <div><h2 className="swic-name">{P.name}</h2><p className="swic-role">{P.role}</p></div>
                  <div className="swic-facts swic-mono">
                    {P.facts.map((f, i) => <span key={f + i} className={'swic-chip' + (i ? '' : ' swic-sky')}>{f}</span>)}
                  </div>
                </div>
                <div className="swic-player">
                  <button className="swic-pbtn swic-play" data-swic="pplay" type="button" aria-label="Pause">
                    <svg viewBox="0 0 12 12" aria-hidden="true">
                      <g data-swic="icoPause" fill="currentColor"><rect x="2" y="1.5" width="3" height="9" rx="1"/><rect x="7" y="1.5" width="3" height="9" rx="1"/></g>
                      <path data-swic="icoPlay" d="M3 1.6v8.8a.6.6 0 0 0 .9.5l7-4.4a.6.6 0 0 0 0-1L3.9 1.1a.6.6 0 0 0-.9.5Z" fill="currentColor" opacity="0"/>
                    </svg>
                  </button>
                  <div className="swic-pmid">
                    <div className="swic-ptitle"><span className="swic-mono">Now playing</span><span>{P.nowPlaying}</span></div>
                    <div className="swic-pbar swic-mono">
                      <span data-swic="tEl">0:00</span>
                      <div className="swic-ptrack"><div className="swic-pfill" data-swic="pfill"/><div className="swic-pknob" data-swic="pknob"/></div>
                      <span data-swic="tRem">-0:00</span>
                    </div>
                  </div>
                  <button className="swic-pbtn swic-heart" data-swic="like" type="button" aria-pressed="false" aria-label="Like">
                    <svg viewBox="0 0 16 16" aria-hidden="true">
                      <path className="swic-hfill" d={HEART}/>
                      <path className="swic-hline" d={HEART} fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
                    </svg>
                    {Array.from({ length: 8 }, (_, i) => <i key={i} className="swic-spark"/>)}
                  </button>
                  <button className="swic-pbtn swic-save" data-swic="save" type="button" aria-pressed="false" aria-label="Save">
                    <svg viewBox="0 0 16 16" aria-hidden="true">
                      <g data-swic="icoPlus" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M8 3.5v9M3.5 8h9"/></g>
                      <path data-swic="icoCheck" d="M3.6 8.4l2.9 2.8 5.9-6.2" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" opacity="0"/>
                    </svg>
                  </button>
                </div>
              </section>
            </div>
          </div>
          <div className="swic-toast" data-swic="toast" role="status" aria-live="polite">
            <svg viewBox="0 0 16 16" aria-hidden="true"><path d={HEART} fill="#6FB1EA"/></svg><span data-swic="toastTxt">Liked</span>
          </div>
        </div>
        <div className="swic-tray" data-swic="tray" role="status" aria-live="polite">
          <canvas className="swic-thumb" data-swic="thumb" width={64} height={44} aria-hidden="true"/><b>Saved</b><span className="swic-count swic-mono" data-swic="count">0</span>
        </div>
        {controls && (<div className="swic-ctl" role="toolbar" aria-label="Card controls">
            <button className="swic-cbtn" data-swic="flip" type="button" aria-label="Flip card" title="Flip (F)">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M2.5 8a5.5 5.5 0 0 1 9.6-3.7M13.5 8a5.5 5.5 0 0 1-9.6 3.7"/><path d="M12.4 1.8v2.8H9.6M3.6 14.2v-2.8h2.8"/></svg>
            </button>
            <button className="swic-cbtn" data-swic="reset" type="button" aria-label="Reset card" title="Reset (R)">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 8a5 5 0 1 0 1.5-3.6"/><path d="M4.2 1.9v2.7h2.7"/></svg>
            </button>
            <button className="swic-cbtn" data-swic="sound" type="button" aria-pressed="false" aria-label="Sound off" title="Sound">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M2.5 6.2h2.2L8 3.5v9L4.7 9.8H2.5z" fill="currentColor" stroke="none"/><path d="M10.6 5.6a3.4 3.4 0 0 1 0 4.8M12.5 3.8a6 6 0 0 1 0 8.4"/></svg>
            </button>
          </div>)}
      </div>
    </div>);
});
export default IntroCard;
