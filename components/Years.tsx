'use client';

import { useEffect, useState } from 'react';

// Doctors' experience in full years. The page is prerendered, so it renders for BUILD_YEAR first
// and recounts in the browser — no hydration mismatch, and the numbers stay right next year.
const BUILD_YEAR = 2026;

function useYear() {
  const [y, setY] = useState(BUILD_YEAR);
  useEffect(() => setY(new Date().getFullYear()), []);
  return y;
}

export const yearsWord = (n: number) =>
  (n % 10 === 1 && n % 100 !== 11) ? 'год' : ([2, 3, 4].includes(n % 10) && ![12, 13, 14].includes(n % 100)) ? 'года' : 'лет';

// "23–34 года" for a pair of start years (plain text — the caller picks the element)
export function YearsRange({ from }: { from: [number, number] }) {
  const now = useYear();
  const [a, b] = from.map(y => now - y), lo = Math.min(a, b), hi = Math.max(a, b);
  return <>{`${lo}–${hi} ${yearsWord(hi)}`}</>;
}

export function Since({ year }: { year: number }) {
  const n = useYear() - year;
  return <p className="since" title={`практикует с ${year} года`}>{`стаж ${n} ${yearsWord(n)}`}</p>;
}
