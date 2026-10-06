# «Звезда‑СТОМ» — страница «Из других городов»

Next.js 16 (App Router) + React 19 + TypeScript. Страница статическая (prerender), интерактив — клиентские компоненты.

```bash
npm install
npm run dev      # http://localhost:4188
npm run build && npm start
```

## Где что лежит

- `app/page.tsx` — вся страница (секции по порядку), `app/layout.tsx` — `<head>`, шрифты, мета.
- `app/globals.css` — стили (перенесены из статической версии без изменений).
- `components/scene/Scene.tsx` — SVG‑сцена «здание в разрезе» (серверный компонент).
- `components/Story.tsx` — скролл‑камера, персонаж, лифт, подписи. `?p=0.47` замораживает кадр, `?clean` — сцена на весь экран.
- `components/lead/` — форма заявки (одна и та же в модалке и внизу страницы) и модалка.
- `components/Header.tsx`, `Planner.tsx`, `RouteTabs.tsx`, `MobileBar.tsx`, `Reveal.tsx`, `Years.tsx` — остальной интерактив.
- `lib/content.ts` — данные: услуги, планы лечения, врачи, FAQ, JSON‑LD. `lib/scene-geometry.ts` — размеры сцены.
- `public/assets/img/` — фото.

Статическая версия до перехода на React — в `../.art-director/backup-site-v3-static/`.
