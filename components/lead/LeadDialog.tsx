'use client';

import { useEffect, useImperativeHandle, useRef, useState, type Ref } from 'react';
import LeadForm from './LeadForm';

export type LeadKind = 'plan' | 'visit';
export type LeadDialogHandle = { open: (kind: LeadKind) => void };

const COPY: Record<LeadKind, [string, string]> = {
  plan: ['План лечения по снимку', 'Пришлите снимок — врач ответит с планом'],
  visit: ['Запись в «Звезда‑СТОМ»', 'Оставьте контакты — подберём врача и время'],
};

export default function LeadDialog({ ref }: { ref: Ref<LeadDialogHandle> }) {
  const dlg = useRef<HTMLDialogElement>(null);
  const [kind, setKind] = useState<LeadKind>('plan');
  const [formKey, setFormKey] = useState(0); // a fresh form after a sent one
  const sent = useRef(false);
  const focusT = useRef<ReturnType<typeof setTimeout>>(undefined);

  useImperativeHandle(ref, () => ({
    open(k) {
      const d = dlg.current!;
      setKind(k);
      if (sent.current) { sent.current = false; setFormKey(n => n + 1); }
      if (typeof d.showModal !== 'function') { location.hash = 'contact'; return; }
      d.showModal(); document.body.classList.add('dlg-open');
      clearTimeout(focusT.current);
      focusT.current = setTimeout(() => d.querySelector<HTMLInputElement>('input[name=name]')?.focus({ preventScroll: true }), 60);
    }
  }), []);

  useEffect(() => () => clearTimeout(focusT.current), []);

  const [k, t] = COPY[kind];
  return (
    <dialog className="dlg" id="leadDlg" aria-labelledby="dlgTitle" ref={dlg}
      onClose={() => document.body.classList.remove('dlg-open')}
      onClick={e => { if (e.target === e.currentTarget) dlg.current!.close(); }}>
      <div className="dlg-card">
        <div className="dlg-hd">
          <div><p className="eyebrow" id="dlgKick">{k}</p><h2 id="dlgTitle">{t}</h2></div>
          <button className="dlg-x" type="button" aria-label="Закрыть" onClick={() => dlg.current!.close()}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg></button>
        </div>
        <div className="dlg-body" data-lead-slot="dlg"><LeadForm key={formKey} onDone={() => { sent.current = true; }} /></div>
      </div>
    </dialog>
  );
}
