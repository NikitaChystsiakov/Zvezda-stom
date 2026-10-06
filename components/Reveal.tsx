'use client';

import { useEffect } from 'react';

const SELECTOR = '.nums div, .cmp-row, .sec-head, .steps li, .memo, .doc, .gallery figure, .faq details, .hotel-photos figure, .room, .amen li, .rt-panel, .map, .lead-card';

// Fade-up on scroll for the static blocks of the page. Classes are added only after JS runs,
// so without JS (or with reduced motion) everything is simply visible.
export default function Reveal() {
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
    const els = document.querySelectorAll(SELECTOR);
    els.forEach(el => el.classList.add('rv'));
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px' });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}
