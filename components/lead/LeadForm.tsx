'use client';

import { useEffect, useRef, useState, type ChangeEvent, type DragEvent, type FormEvent } from 'react';

const MAX = 20 * 1024 * 1024, OK_EXT = /\.(jpe?g|png|heic|heif|webp|pdf|dcm)$/i;
const fmtSize = (b: number) => b > 1048576 ? (b / 1048576).toFixed(1).replace('.', ',') + ' МБ' : Math.max(1, Math.round(b / 1024)) + ' КБ';

type Picked = { file: File; url?: string };
type Field = 'name' | 'phone' | 'agree';

const VIA = [['Telegram', 'Telegram'], ['WhatsApp', 'WhatsApp'], ['Viber', 'Viber'], ['Звонок', 'Позвонить']];
const TOPICS = ['Имплантация', 'Коронки и виниры', 'Протезирование', 'Лечение зубов', 'Пока не знаю'];

// One component for both places: the dialog and the contact section.
// Demo: nothing is sent — after a short pause it shows what the clinic would do next.
export default function LeadForm({ onDone }: { onDone?: () => void }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [files, setFiles] = useState<Picked[]>([]);
  const [fileErr, setFileErr] = useState('');
  const [over, setOver] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [agree, setAgree] = useState(false);
  const [bad, setBad] = useState<Record<Field, boolean>>({ name: false, phone: false, agree: false });
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState<string | null>(null);

  const check: Record<Field, () => boolean> = {
    name: () => name.trim().length > 1,
    phone: () => phone.replace(/\D/g, '').length >= 7,
    agree: () => agree,
  };
  const mark = (f: Field, ok: boolean) => setBad(b => ({ ...b, [f]: !ok }));

  // free the preview thumbnails
  const filesRef = useRef(files);
  filesRef.current = files;
  useEffect(() => () => filesRef.current.forEach(f => f.url && URL.revokeObjectURL(f.url)), []);

  function add(list: FileList | File[]) {
    const errs: string[] = [], next = [...files];
    [...list].forEach(f => {
      if (!OK_EXT.test(f.name) && !f.type.startsWith('image/')) errs.push(`«${f.name}» — неподходящий формат`);
      else if (f.size > MAX) errs.push(`«${f.name}» больше 20 МБ`);
      else if (!next.some(x => x.file.name === f.name && x.file.size === f.size))
        next.push({ file: f, url: f.type.startsWith('image/') && !/hei[cf]/i.test(f.type) ? URL.createObjectURL(f) : undefined });
    });
    setFileErr(errs.join('. '));
    setFiles(next);
  }
  function remove(i: number) {
    const f = files[i]; if (f.url) URL.revokeObjectURL(f.url);
    setFiles(files.filter((_, j) => j !== i));
  }
  const onPick = (e: ChangeEvent<HTMLInputElement>) => { if (e.target.files) add(e.target.files); e.target.value = ''; };
  const onDrag = (e: DragEvent, on: boolean) => { e.preventDefault(); setOver(on); };

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    let first: Field | null = null;
    (['name', 'phone', 'agree'] as Field[]).forEach(f => { const ok = check[f](); mark(f, ok); if (!ok && !first) first = f; });
    if (first) { (form.elements.namedItem(first) as HTMLInputElement).focus(); return; }
    setSending(true);
    const via = (form.elements.namedItem('via') as RadioNodeList).value;
    setTimeout(() => {
      const snap = files.length ? ' и снимок' : '';
      setDone(via === 'Звонок'
        ? `Врач посмотрит заявку${snap}, администратор перезвонит на ${phone.trim()}.`
        : `Врач посмотрит заявку${snap} и напишет вам в ${via} на ${phone.trim()}.`);
      onDone?.();
    }, 700);
  }

  // after sending: in the dialog scroll its body up, on the page bring the card into view
  useEffect(() => {
    if (done === null) return;
    const form = formRef.current!;
    const box = form.closest('.dlg-body');
    if (box) box.scrollTop = 0; else form.closest('.lead-card')?.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }, [done]);

  return (
    <form className="lead" noValidate onSubmit={submit} ref={formRef}>
      <div className="lead-form" hidden={done !== null}>
        <div className="lf-row">
          <label className={`fld${bad.name ? ' bad' : ''}`}><span className="fld-l">Как к вам обращаться</span>
            <input name="name" autoComplete="name" placeholder="Имя" required value={name}
              onChange={e => { setName(e.target.value); if (bad.name) mark('name', e.target.value.trim().length > 1); }}
              onBlur={() => name && mark('name', check.name())} />
            <em className="fld-e">Напишите, как к вам обращаться</em></label>
          <label className={`fld${bad.phone ? ' bad' : ''}`}><span className="fld-l">Телефон</span>
            <input name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="+7 900 000‑00‑00" required value={phone}
              onChange={e => { setPhone(e.target.value); if (bad.phone) mark('phone', e.target.value.replace(/\D/g, '').length >= 7); }}
              onBlur={() => phone && mark('phone', check.phone())} />
            <em className="fld-e">Проверьте номер — нужно хотя бы 7 цифр</em></label>
        </div>
        <fieldset className="chips"><legend className="fld-l">Куда удобнее ответить</legend>
          {VIA.map(([v, label], i) => <label key={v}><input type="radio" name="via" value={v} defaultChecked={i === 0} /><span>{label}</span></label>)}
        </fieldset>
        <fieldset className="chips"><legend className="fld-l">Что беспокоит</legend>
          {TOPICS.map(t => <label key={t}><input type="radio" name="topic" value={t} defaultChecked={t === 'Пока не знаю'} /><span>{t}</span></label>)}
        </fieldset>
        <div className="fld">
          <span className="fld-l">Снимок или фото зубов <i>необязательно</i></span>
          <label className={`drop${over ? ' over' : ''}`}
            onDragEnter={e => onDrag(e, true)} onDragOver={e => onDrag(e, true)} onDragLeave={e => onDrag(e, false)}
            onDrop={e => { onDrag(e, false); add(e.dataTransfer.files); }}>
            <input className="drop-in" type="file" name="files" multiple accept="image/*,.pdf,.dcm,application/dicom" onChange={onPick} />
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 16V4m0 0-4.5 4.5M12 4l4.5 4.5M4 15v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
            <span className="drop-t"><b>Перетащите файлы сюда</b> или <u>выберите на устройстве</u></span>
            <span className="drop-s">Панорамный снимок, КТ или фото зубов · JPG, PNG, PDF, DICOM · до 20 МБ</span>
          </label>
          <ul className="files" aria-live="polite">
            {files.map(({ file, url }, i) => (
              <li className="file" key={file.name + file.size}>
                <span className="file-th" style={url ? { backgroundImage: `url("${url}")` } : undefined}>{url ? null : (file.name.split('.').pop() || 'file').slice(0, 4).toUpperCase()}</span>
                <span className="file-n"><b>{file.name}</b><span>{fmtSize(file.size)}</span></span>
                <button className="file-x" type="button" aria-label="Убрать файл" onClick={() => remove(i)}>×</button>
              </li>
            ))}
          </ul>
          <em className={`fld-e drop-e${fileErr ? ' show' : ''}`}>{fileErr}</em>
          <p className="drop-hint">Снимка нет — не страшно: отправьте заявку без него, сделаем на месте на своём рентгене.</p>
        </div>
        <label className="fld"><span className="fld-l">Комментарий <i>необязательно</i></span><textarea name="msg" rows={2} placeholder="Например, удобные даты поездки или что беспокоит"></textarea></label>
        <label className={`consent${bad.agree ? ' bad' : ''}`}>
          <input type="checkbox" name="agree" required checked={agree} onChange={e => { setAgree(e.target.checked); mark('agree', e.target.checked); }} />
          <span className="cbox" aria-hidden="true"></span>
          <span className="ctext">Согласен на обработку моих персональных данных, в том числе сведений о здоровье, чтобы клиника подготовила план лечения. <a href="https://zvezdastom.by/images/polozhenie.pdf" target="_blank" rel="noopener">Политика обработки данных</a></span>
        </label>
        <em className="fld-e consent-e">Без согласия мы не можем принять заявку с медицинскими данными</em>
        <button className="btn btn-teal lead-go" type="submit" disabled={sending}>{sending ? 'Отправляем…' : 'Отправить заявку'}</button>
        <p className="lead-note">Ответим в выбранный мессенджер в рабочее время: Пн–Пт 9–20, Сб 9–14. Данные передаются по защищённому соединению.</p>
      </div>
      <div className="lead-done" hidden={done === null}>
        <span className="done-ic" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M5 12.5 10 17l9-10" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
        <h3>Заявка отправлена</h3>
        <p className="done-t">{done}</p>
        <p className="lead-note">Это демо: на сайте заявка придёт администратору клиники.</p>
      </div>
    </form>
  );
}
