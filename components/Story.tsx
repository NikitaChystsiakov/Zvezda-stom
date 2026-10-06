'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { LeadLink } from './links';
import { usePrefersReducedMotion } from '@/lib/hooks';
import { SX, CH, base, cabinTop } from '@/lib/scene-geometry';

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
const lin = (a: number, b: number, x: number) => clamp((x - a) / (b - a), 0, 1);
const sstep = (a: number, b: number, x: number) => { const t = lin(a, b, x); return t * t * (3 - 2 * t); };
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

// camera keys: [p, centre x, centre y, box w, box h, phone x?, phone w?] — the box is fitted inside the frame
type Key = [number, number, number, number, number, number?, number?];
const KEYS: Key[] = [
  [0, 1000, 1360, 1500, 2620],
  [.08, 1000, 1400, 1300, 2000],
  [.2, 1170, 1010, 640, 330, 1150, 420],
  [.3, 1090, 1010, 700, 360, 1080, 460],
  [.36, 1000, 1090, 860, 560],
  [.53, 1000, 1660, 860, 560],
  [.6, 900, 1722, 780, 360, 880, 520],
  [.77, 640, 1724, 760, 360, 660, 440],
  [1, 510, 1730, 700, 330, 630, 400]
];

// captions over the scene: [in, out] in scroll progress
const CAPS: { in: number; out: number; end?: boolean; tag: string; h: string; p: ReactNode }[] = [
  { in: 0, out: .12, tag: 'пр‑т Газеты Звязда, 47', h: 'Гостиница «Звезда»', p: <>Клиника работает прямо в этом здании — на 4&nbsp;этаже.</> },
  { in: .18, out: .33, tag: '7:52 · ваш номер', h: 'Вы просыпаетесь в номере', p: 'Приём в 8:00. Номер на даты лечения бронировали мы.' },
  { in: .39, out: .55, tag: 'лифт', h: 'Один лифт вниз', p: 'Без такси, пробок и поиска адреса в чужом городе.' },
  { in: .61, out: .77, tag: '4 этаж', h: 'Двери открываются — вы в клинике', p: 'Администратор, свой рентген‑кабинет, врач уже ждёт.' },
  { in: .89, out: 2, end: true, tag: '7:55', h: 'Три минуты — и вы в кресле', p: 'После процедуры так же: лифт — и вы отдыхаете в номере.' },
];

// «Три минуты»: the camera follows the patient through the hotel in section, driven by scroll.
// The scene is passed in from the server; everything that moves is updated through the DOM, not React state,
// so a frame costs no re-render.
export default function Story({ scene }: { scene: ReactNode }) {
  const reduce = usePrefersReducedMotion();
  const flyRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const hudRef = useRef<HTMLDivElement>(null);
  const clockRef = useRef<HTMLSpanElement>(null);
  const hudSubRef = useRef<HTMLElement>(null);
  const capRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const root = document.documentElement;
    const fly = flyRef.current!, stage = stageRef.current!, frame = frameRef.current!;
    const hud = hudRef.current!, clockT = clockRef.current!, hudSub = hudSubRef.current!;
    const caps = capRefs.current.filter(Boolean) as HTMLDivElement[];
    const $ = (id: string) => frame.querySelector<SVGElement>('#' + id)!;
    const svg = $('worldSvg');
    const facade = $('facade'), bus = $('bus'), cabin = $('cabin'), cable = $('cable');
    const pBed = $('pBed'), pWalk = $('pWalk'), pFlip = $('pFlip'), pSeat = $('pSeat'), lampOn = $('lampOn');
    const legF = $('legF'), legB = $('legB'), armF = $('armF'), armB = $('armB');
    root.classList.toggle('js', !reduce);

    let fw = 1, fh = 1;
    function camera(p: number) {
      let i = 0; while (i < KEYS.length - 2 && p > KEYS[i + 1][0]) i++;
      const A = fw / fh, phone = A < 1;
      const k = (K: Key): Key => phone && K[5] ? [K[0], K[5], K[2], K[6]!, K[4]] : K; // tighter, re-centred framing on tall screens
      const a = k(KEYS[i]), b = k(KEYS[i + 1]), t = sstep(a[0], b[0], p);
      const cx = lerp(a[1], b[1], t), cy = lerp(a[2], b[2], t);
      const bw = Math.exp(lerp(Math.log(a[3]), Math.log(b[3]), t)), bh = Math.exp(lerp(Math.log(a[4]), Math.log(b[4]), t));
      let vw, vh;
      if (bw / bh > A) { vw = bw; vh = bw / A; } else { vh = bh; vw = bh * A; }
      svg.setAttribute('viewBox', `${(cx - vw / 2).toFixed(1)} ${(cy - vh / 2).toFixed(1)} ${vw.toFixed(1)} ${vh.toFixed(1)}`);
    }

    const base7 = base(7), base4 = base(4);
    function patient(x: number, y: number, facingLeft: boolean, stride: number) {
      pWalk.setAttribute('transform', `translate(${x.toFixed(1)} ${y.toFixed(1)})`);
      pFlip.setAttribute('transform', facingLeft ? 'scale(-1 1)' : '');
      const a = Math.sin(stride) * 24 * (stride ? 1 : 0);
      legF.setAttribute('transform', `rotate(${a.toFixed(1)} 0 -72)`);
      legB.setAttribute('transform', `rotate(${(-a).toFixed(1)} 0 -72)`);
      armF.setAttribute('transform', `rotate(${(-a * .8).toFixed(1)} 0 -126)`);
      armB.setAttribute('transform', `rotate(${(a * .8).toFixed(1)} 0 -126)`);
    }

    function render(p: number) {
      camera(p);
      facade.setAttribute('opacity', (1 - sstep(.06, .16, p)).toFixed(3));
      facade.style.display = p > .17 ? 'none' : '';
      bus.setAttribute('transform', `translate(${lerp(2300, -700, lin(0, .16, p)).toFixed(1)} 0)`);

      // lift: parked on 7, rides down to 4
      const cf = lerp(7, 4, sstep(.37, .53, p));
      const cy = lerp(cabinTop(7), cabinTop(4), sstep(.37, .53, p));
      cabin.setAttribute('transform', `translate(${SX} ${cy.toFixed(1)})`);
      cable.setAttribute('y2', cy.toFixed(1));

      // the patient: asleep → walks to the lift → rides → walks to the chair → sits
      pBed.setAttribute('opacity', (1 - lin(.22, .24, p)).toFixed(3));
      const walkOn = lin(.22, .24, p) * (1 - lin(.77, .8, p));
      pWalk.setAttribute('opacity', walkOn.toFixed(3));
      const floorOf = () => cy + CH - 16; // feet on the cabin floor while riding
      if (p < .36) { const x = lerp(1225, SX, sstep(.24, .31, p)); patient(x, base7, true, p > .24 && p < .31 ? (1225 - x) / 16 : 0); }
      else if (p < .56) patient(SX, floorOf(), true, 0);
      else { const x = lerp(SX, 700, sstep(.58, .76, p)); patient(x, base4, true, p > .58 && p < .76 ? (SX - x) / 16 : 0); }
      pSeat.setAttribute('opacity', lin(.77, .81, p).toFixed(3));
      lampOn.setAttribute('opacity', sstep(.82, .88, p).toFixed(3));

      hud.classList.toggle('on', p > .17);
      const t = p < .3 ? '7:52' : p < .45 ? '7:53' : p < .74 ? '7:54' : '7:55';
      if (clockT.textContent !== t) { clockT.textContent = t; hud.classList.remove('tick'); void hud.offsetWidth; hud.classList.add('tick'); }
      const sub = p < .36 ? '7 этаж · номер' : p < .55 ? `▼ ${Math.round(cf)} этаж` : '4 этаж · клиника';
      if (hudSub.textContent !== sub) hudSub.textContent = sub;

      caps.forEach((c, i) => {
        const a = CAPS[i].in, b = CAPS[i].out, w = .03;
        const o = a === 0 ? 1 - sstep(b - w, b, p) : sstep(a - w, a, p) * (1 - sstep(b - w, b, p));
        c.style.opacity = o.toFixed(3);
        c.style.transform = `translateY(${((1 - sstep(a - w, a, p)) * (a === 0 ? 0 : 20) - sstep(b - w, b, p) * 20).toFixed(1)}px)`;
        c.style.visibility = o < .01 ? 'hidden' : 'visible';
      });
    }
    const measure = () => { fw = frame.clientWidth || 1; fh = frame.clientHeight || 1; };

    function progress() {
      const r = fly.getBoundingClientRect();
      const total = fly.offsetHeight - stage.offsetHeight;
      return total > 0 ? clamp(((parseFloat(getComputedStyle(stage).top) || 0) - r.top) / total, 0, 1) : 1;
    }

    // ?p=0.44 freezes the scene at that point, ?clean — the scene alone, full window (previews, storyboard frames)
    const qs = new URLSearchParams(location.search);
    const fq = qs.get('p');
    const frozen = fq === null ? null : clamp(+fq, 0, 1);
    const clean = qs.has('clean');

    let target = 0, shown = 0, raf: number | null = null, last = 0;
    function tick(now: number) {
      const dt = Math.min(100, now - (last || now)); last = now;
      shown += (target - shown) * (1 - Math.pow(1 - .16, dt / 16.667));
      if (Math.abs(target - shown) < .0004) { shown = target; raf = null; last = 0; } else raf = requestAnimationFrame(tick);
      render(frozen ?? shown);
    }
    function still() { measure(); render(frozen ?? (reduce ? 1 : (shown = target = progress()))); }
    function onScroll() {
      if (reduce) return;
      target = progress();
      if (raf === null) raf = requestAnimationFrame(tick);
    }
    const onResize = () => { still(); onScroll(); };

    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onResize);
    still(); onScroll();

    let onLoad: (() => void) | null = null;
    if (clean) {
      root.classList.add('clean');
      onLoad = () => { measure(); render(frozen ?? 0); };
      onLoad();
    } else if (frozen !== null) {
      onLoad = () => { scrollTo({ top: fly.getBoundingClientRect().top + scrollY - stage.offsetTop + 2, behavior: 'instant' }); render(frozen); };
      onLoad();
    }
    if (onLoad && document.readyState !== 'complete') addEventListener('load', onLoad, { once: true });

    return () => {
      removeEventListener('scroll', onScroll);
      removeEventListener('resize', onResize);
      if (onLoad) removeEventListener('load', onLoad);
      if (raf !== null) cancelAnimationFrame(raf);
    };
  }, [reduce]);

  return (
    <section className={`story${reduce ? ' no-fly' : ''}`} id="story" aria-labelledby="story-h">
      <div className="wrap story-head">
        <p className="eyebrow">Путь до кресла</p>
        <h2 className="h2" id="story-h">Три минуты от номера до врача</h2>
        <p className="sub">Листайте — пройдём этот путь вместе с пациентом, который живёт в гостинице «Звезда».</p>
      </div>
      <div className="fly" id="fly" ref={flyRef}>
        <div className="fly-stage" ref={stageRef}>
          <div className="fly-frame" id="flyFrame" ref={frameRef}>
            <div className="world" id="world">{scene}</div>
            <div className="hud" id="hud" aria-hidden="true" ref={hudRef}><span id="clockT" ref={clockRef}>7:52</span><small id="hudSub" ref={hudSubRef}>утро</small></div>
            {CAPS.map((c, i) => (
              <div key={c.tag} className={`fcap${c.end ? ' fcap-end' : ''}`} ref={el => { capRefs.current[i] = el; }}>
                <p className="fc-tag">{c.tag}</p><h3>{c.h}</h3><p>{c.p}</p>
                {c.end && <LeadLink className="btn btn-teal" kind="plan">Прислать снимок — посчитаем план</LeadLink>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
