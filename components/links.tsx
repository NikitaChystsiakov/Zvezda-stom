'use client';

import type { AnchorHTMLAttributes, MouseEvent } from 'react';
import { useSite } from './SiteProvider';
import type { LeadKind } from './lead/LeadDialog';

type A = AnchorHTMLAttributes<HTMLAnchorElement>;

// Opens the lead dialog; without JS it is a plain link to the form at the bottom.
export function LeadLink({ kind, ...rest }: A & { kind: LeadKind }) {
  const { openLead } = useSite();
  return <a href="#contact" data-lead={kind} {...rest} onClick={(e: MouseEvent) => { e.preventDefault(); openLead(kind); }} />;
}

// A link to a section of the future full site (or a messenger the clinic hasn't connected yet): shows a toast instead.
export function SoonLink({ section, messenger, href = '#', ...rest }: A & { section?: string; messenger?: string }) {
  const { say } = useSite();
  return <a href={href} data-soon={messenger ?? ''} {...rest} onClick={(e: MouseEvent) => {
    e.preventDefault();
    say(messenger
      ? `Кнопка ${messenger} заработает, когда клиника подключит мессенджер`
      : `Раздел «${section}» появится в полной версии сайта. Сейчас это демо страницы для приезжих.`);
  }} />;
}
