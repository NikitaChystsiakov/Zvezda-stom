import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: 'Лечение зубов в Минске с проживанием — «Звезда‑СТОМ»',
  description: 'Стоматология «Звезда‑СТОМ» на 4 этаже гостиницы «Звезда» в Минске. Живёте в том же здании, на приём спускаетесь на лифте. Пришлите снимок — врач составит план до поездки.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#F5F0E8',
};

// .js switches on the pinned scroll scene; set before first paint so the page doesn't jump on hydration
const jsFlag = `if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('js')`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: jsFlag }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link href="https://fonts.googleapis.com/css2?family=Geologica:wght@400;500;600&family=Literata:opsz,wght@7..72,400..600&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
