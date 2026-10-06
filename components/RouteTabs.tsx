'use client';

import { useRef, useState, type KeyboardEvent, type ReactNode } from 'react';

const ROUTES: { id: string; tab: string; sum: ReactNode; stops: [string, ReactNode][]; tip: string }[] = [
  {
    id: 'air', tab: 'Самолёт',
    sum: <><b>≈1 ч 15 мин</b> общественным транспортом · <b>≈50 мин</b> на такси</>,
    stops: [
      ['Аэропорт «Минск»', <>Автобус-экспресс <em className="bus">300Э</em> от выхода из зала прилёта — до станции метро «Уручье», около 30 минут.</>],
      ['Метро «Уручье»', <><em className="metro">синяя линия</em> до «Петровщины» без пересадок, около 25 минут.</>],
      ['Метро «Петровщина»', <>Троллейбус <em className="trol">32</em> в сторону «ДС Малиновка‑4», 4 остановки до «Гостиница Звезда».</>],
      ['Гостиница «Звезда»', 'Лифт на 4 этаж — клиника, кабинет 421.'],
    ],
    tip: 'Из Москвы перелёт около 1,5 часа. Прилетаете поздно — закажите такси заранее или напишите нам, подскажем.',
  },
  {
    id: 'rail', tab: 'Поезд',
    sum: <><b>≈30 мин</b> от вокзала · <b>≈20 мин</b> на такси</>,
    stops: [
      ['Вокзал «Минск‑Пассажирский»', 'Центральный автовокзал — рядом. Спускаетесь в метро «Площадь Ленина».'],
      ['Метро «Площадь Ленина»', <><em className="metro">синяя линия</em> в сторону «Малиновки», 4 станции до «Петровщины», около 8 минут.</>],
      ['Метро «Петровщина»', <>Троллейбус <em className="trol">32</em>, 4 остановки до «Гостиница Звезда». Пешком — около 20 минут.</>],
      ['Гостиница «Звезда»', 'Лифт на 4 этаж — клиника, кабинет 421.'],
    ],
    tip: 'Из Москвы: «Ласточка» с Белорусского вокзала идёт около 7 часов, три рейса в день. Есть ночной фирменный поезд «Беларусь».',
  },
  {
    id: 'car', tab: 'Машина',
    sum: <><b>≈700 км</b> от Москвы по трассе М1</>,
    stops: [
      ['Трасса М1 / Е30', 'До Минской кольцевой (МКАД), съезд на проспект Дзержинского.'],
      ['Проспект Дзержинского', 'Едете до пересечения с проспектом Любимова.'],
      ['Проспект Газеты Звязда', 'Направо — и до дома 47.'],
      ['Парковка у гостиницы', 'Бесплатная, неохраняемая. Дальше — лифт на 4 этаж.'],
    ],
    tip: 'Гражданам России для въезда в Беларусь достаточно внутреннего паспорта.',
  },
];

// «Как добраться»: plane / train / car
export default function RouteTabs() {
  const [cur, setCur] = useState(0);
  const btns = useRef<(HTMLButtonElement | null)[]>([]);

  function onKey(e: KeyboardEvent) {
    if (!['ArrowRight', 'ArrowLeft'].includes(e.key)) return;
    const n = (cur + (e.key === 'ArrowRight' ? 1 : -1) + ROUTES.length) % ROUTES.length;
    setCur(n); btns.current[n]?.focus(); e.preventDefault();
  }

  return (
    <div className="rt-panel">
      <div className="rt-tabs" role="tablist" aria-label="Откуда едете" id="rtTabs" onKeyDown={onKey}>
        {ROUTES.map((r, i) => (
          <button key={r.id} role="tab" aria-selected={i === cur} aria-controls={`rt-${r.id}`} id={`rtt-${r.id}`} tabIndex={i === cur ? 0 : -1}
            ref={el => { btns.current[i] = el; }} onClick={() => setCur(i)}>{r.tab}</button>
        ))}
      </div>
      {ROUTES.map((r, i) => (
        <div key={r.id} className="rt" role="tabpanel" id={`rt-${r.id}`} aria-labelledby={`rtt-${r.id}`} hidden={i !== cur}>
          <p className="rt-sum">{r.sum}</p>
          <ol className="line">
            {r.stops.map(([b, s], k) => <li key={b} className={k === r.stops.length - 1 ? 'end' : undefined}><b>{b}</b><span>{s}</span></li>)}
          </ol>
          <p className="rt-tip">{r.tip}</p>
        </div>
      ))}
    </div>
  );
}
