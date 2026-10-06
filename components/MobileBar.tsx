'use client';

import { useEffect, useRef, useState } from 'react';
import { LeadLink } from './links';
import { PhoneIcon } from './icons';
import { PHONE_RU } from '@/lib/content';

// Bottom action bar on phones: appears after the hero, hides over the pinned scene and near the form.
export default function MobileBar() {
  const [on, setOn] = useState(false);
  const raf = useRef(0);

  useEffect(() => {
    const hero = document.querySelector<HTMLElement>('.hero')!;
    const fly = document.getElementById('fly')!;
    const contact = document.getElementById('contact')!;
    function update() {
      const fr = fly.getBoundingClientRect();
      const pinned = fr.top < innerHeight * .5 && fr.bottom > innerHeight * .9; // keep the scene's own caption/CTA clear
      setOn(scrollY > hero.offsetHeight * .7 && !pinned && contact.getBoundingClientRect().top > innerHeight * .6);
    }
    const onScroll = () => { cancelAnimationFrame(raf.current); raf.current = requestAnimationFrame(update); };
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onScroll);
    update();
    return () => { removeEventListener('scroll', onScroll); removeEventListener('resize', onScroll); cancelAnimationFrame(raf.current); };
  }, []);

  return (
    <div className={`mbar${on ? ' on' : ''}`} id="mbar">
      <LeadLink className="btn btn-teal" kind="plan">Прислать снимок</LeadLink>
      <a className="mbar-call" href={PHONE_RU.tel} aria-label={`Позвонить ${PHONE_RU.label}`}><PhoneIcon /></a>
    </div>
  );
}
