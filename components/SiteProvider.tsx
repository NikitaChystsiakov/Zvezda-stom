'use client';

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import LeadDialog, { type LeadDialogHandle, type LeadKind } from './lead/LeadDialog';

type Site = {
  openLead: (kind: LeadKind) => void;
  say: (msg: string) => void;
  menuOpen: boolean;
  setMenu: (on: boolean) => void;
};

const SiteContext = createContext<Site | null>(null);

export function useSite() {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error('useSite must be used inside <SiteProvider>');
  return ctx;
}

// Page-wide state: the mobile menu, the lead dialog and the toast for links to the future site.
export default function SiteProvider({ children }: { children: ReactNode }) {
  const [menuOpen, setMenu] = useState(false);
  const [toast, setToast] = useState({ msg: '', on: false });
  const toastT = useRef<ReturnType<typeof setTimeout>>(undefined);
  const dlg = useRef<LeadDialogHandle>(null);

  useEffect(() => { document.body.classList.toggle('menu-open', menuOpen); }, [menuOpen]);
  useEffect(() => () => clearTimeout(toastT.current), []);

  const say = useCallback((msg: string) => {
    setToast({ msg, on: true });
    clearTimeout(toastT.current);
    toastT.current = setTimeout(() => setToast(t => ({ ...t, on: false })), 3200);
  }, []);

  const openLead = useCallback((kind: LeadKind) => {
    setMenu(false);
    dlg.current?.open(kind);
  }, []);

  return (
    <SiteContext.Provider value={{ openLead, say, menuOpen, setMenu }}>
      {children}
      <LeadDialog ref={dlg} />
      <div className={`toast${toast.on ? ' on' : ''}`} id="toast" role="status" aria-live="polite">{toast.msg}</div>
    </SiteContext.Provider>
  );
}
