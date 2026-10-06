'use client';

import { useEffect, useRef, useState } from 'react';
import { useSite } from './SiteProvider';
import { LeadLink, SoonLink } from './links';
import { Chevron, PhoneIcon } from './icons';
import { PHONE_RU, SERVICES } from '@/lib/content';

// Site-wide header; sections that don't exist yet are SoonLinks.
export default function Header() {
  const { menuOpen, setMenu } = useSite();
  const [sub, setSub] = useState(false);
  const subT = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { setMenu(false); setSub(false); } };
    const wide = matchMedia('(min-width:1061px)');
    const onWide = (e: MediaQueryListEvent) => e.matches && setMenu(false);
    addEventListener('keydown', onKey);
    wide.addEventListener('change', onWide);
    return () => { removeEventListener('keydown', onKey); wide.removeEventListener('change', onWide); clearTimeout(subT.current); };
  }, [setMenu]);

  return <>
    <header className="hdr" id="hdr">
      <a className="logo" href="/" aria-label="Звезда‑СТОМ — главная">
        <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 2l3.2 9.6L29 13l-7.6 6.2L23.8 29 16 23.4 8.2 29l2.4-9.8L3 13l9.8-1.4z" fill="currentColor" /></svg>
        <span><b>Звезда‑СТОМ</b><small>стоматология · Минск</small></span>
      </a>
      <nav className="nav" aria-label="Основное меню">
        <div
          className="nav-item"
          data-open={sub ? '' : undefined}
          onMouseEnter={() => { clearTimeout(subT.current); setSub(true); }}
          onMouseLeave={() => { subT.current = setTimeout(() => setSub(false), 160); }}
          onBlur={e => { if (!e.currentTarget.contains(e.relatedTarget)) setSub(false); }}
        >
          <button className="nav-link" type="button" aria-expanded={sub} aria-controls="subServices" onClick={() => setSub(s => !s)}>Услуги<Chevron /></button>
          <div className="dd" id="subServices">
            {SERVICES.map(s => <SoonLink key={s.href} href={s.href} section={s.name}><b>{s.name}</b><small>{s.hint}</small></SoonLink>)}
          </div>
        </div>
        <SoonLink className="nav-link" href="/ceny" section="Цены">Цены</SoonLink><SoonLink className="nav-link" href="/vrachi" section="Врачи">Врачи</SoonLink><SoonLink className="nav-link" href="/o-klinike" section="О клинике">О клинике</SoonLink>
        <a className="nav-link is-current" href="#top" aria-current="page">Из других городов</a>
        <SoonLink className="nav-link" href="/kontakty" section="Контакты">Контакты</SoonLink>
      </nav>
      <a className="hdr-phone" href={PHONE_RU.tel}><small>для звонков из России</small>{PHONE_RU.text}</a>
      <LeadLink className="btn btn-teal btn-sm hdr-cta" kind="visit">Записаться</LeadLink>
      <a className="hdr-call" href={PHONE_RU.tel} aria-label={`Позвонить ${PHONE_RU.label}`}><PhoneIcon /></a>
      <button className="burger" type="button" aria-expanded={menuOpen} aria-controls="mnav" aria-label="Меню" onClick={() => setMenu(!menuOpen)}><i></i><i></i></button>
    </header>

    <div className="mnav" id="mnav" hidden={!menuOpen} onClick={e => { if ((e.target as Element).closest('a:not([data-soon])')) setMenu(false); }}>
      <nav className="mnav-list" aria-label="Меню">
        <details className="mnav-acc"><summary className="mnav-link">Услуги<Chevron /></summary><div className="mnav-sub">
          {SERVICES.map(s => <SoonLink key={s.href} href={s.href} section={s.name}>{s.name}</SoonLink>)}
        </div></details>
        <SoonLink className="mnav-link" href="/ceny" section="Цены">Цены</SoonLink><SoonLink className="mnav-link" href="/vrachi" section="Врачи">Врачи</SoonLink><SoonLink className="mnav-link" href="/o-klinike" section="О клинике">О клинике</SoonLink>
        <a className="mnav-link is-current" href="#top" aria-current="page">Из других городов <span>вы здесь</span></a>
        <SoonLink className="mnav-link" href="/kontakty" section="Контакты">Контакты</SoonLink>
      </nav>
      <div className="mnav-foot">
        <a className="mnav-phone" href={PHONE_RU.tel}><b>{PHONE_RU.text}</b><span>для звонков из России</span></a>
        <a className="mnav-phone" href="tel:+375292326527"><b>+375 29 232‑65‑27</b><span>МТС, Беларусь</span></a>
        <p className="mnav-hours">Пн–Пт 9:00–20:00, Сб 9:00–14:00 · пр‑т Газеты Звязда, 47, 4 этаж</p>
        <LeadLink className="btn btn-teal" kind="visit">Записаться на приём</LeadLink>
      </div>
    </div>
  </>;
}
