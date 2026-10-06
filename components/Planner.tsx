'use client';

import { useRef, useState, type KeyboardEvent } from 'react';
import { PLANS } from '@/lib/content';

// «Сколько это займёт»: pick a treatment — see how the trips usually go.
export default function Planner() {
  const [cur, setCur] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const p = PLANS[cur];

  function onKey(e: KeyboardEvent) {
    if (!['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp'].includes(e.key)) return;
    const n = (cur + (e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : -1) + PLANS.length) % PLANS.length;
    setCur(n); tabRefs.current[n]?.focus(); e.preventDefault();
  }

  return (
    <div className="planner">
      <div className="tabs" role="tablist" aria-label="Вид лечения" id="tabs" onKeyDown={onKey}>
        {PLANS.map((t, i) => (
          <button key={t.id} className="tab" role="tab" id={`tab-${t.id}`} aria-selected={i === cur} ref={el => { tabRefs.current[i] = el; }} onClick={() => setCur(i)}>
            <b>{t.name}</b><small>{t.hint}</small>
          </button>
        ))}
      </div>
      {/* keyed by plan so the legs animate in again on every switch */}
      <div className="board" id="board" role="tabpanel" aria-live="polite" aria-labelledby={`tab-${p.id}`} key={p.id}>
        <div className="board-sum">
          <div><span>Поездок в Минск</span><b><em>{p.trips}</em></b></div>
          <div><span>Дней в Минске всего</span><b>{p.days}</b></div>
          <div><span>Визитов к врачу</span><b>{p.visits}</b></div>
        </div>
        <div className={`legs${p.legs.length === 1 ? ' one' : ''}`}>
          {p.legs.map((l, k) => 'gap' in l
            ? <div key={k} className="gap" style={{ animationDelay: `${k * 70}ms` }}><span><b>{l.gap}</b><span className="gap-sep"> · </span><span className="gap-g">{l.g}</span></span></div>
            : <div key={k} className="leg" style={{ animationDelay: `${k * 70}ms` }}><div><p className="leg-t">{l.t}</p><p className="leg-days">{l.d}</p></div><div><h4>{l.h}</h4><p>{l.p}</p></div></div>)}
        </div>
      </div>
    </div>
  );
}
