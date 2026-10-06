import SiteProvider from '@/components/SiteProvider';
import Header from '@/components/Header';
import Story from '@/components/Story';
import Scene from '@/components/scene/Scene';
import Planner from '@/components/Planner';
import RouteTabs from '@/components/RouteTabs';
import LeadForm from '@/components/lead/LeadForm';
import MobileBar from '@/components/MobileBar';
import Reveal from '@/components/Reveal';
import { LeadLink, SoonLink } from '@/components/links';
import { Since, YearsRange } from '@/components/Years';
import { DOCTORS, FAQ, JSON_LD, PHONE_RU, STEPS } from '@/lib/content';

const LEAD_YEARS: [number, number] = [1992, 2003]; // surgeons' and prosthodontists' experience

export default function Page() {
  return (
    <SiteProvider>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
      <a className="skip" href="#main">Перейти к содержимому</a>
      <Header />

      <main id="main">
        {/* HERO */}
        <section className="hero" id="top" aria-labelledby="h1">
          <div className="wrap">
            <p className="kicker"><span className="kdot"></span>Стоматология «Звезда‑СТОМ» · Минск<span className="k-extra"> · с&nbsp;2004 года</span></p>
            <h1 id="h1">Лечение зубов в&nbsp;Минске <em>с&nbsp;проживанием в&nbsp;том же здании</em></h1>
            <div className="hero-grid">
              <div className="hero-copy">
                <p className="lead">Имплантация, протезирование и лечение для пациентов из других городов и стран. Клиника находится на 4&nbsp;этаже гостиницы «Звезда»: живёте в том же доме, на приём спускаетесь на лифте.</p>
                <div className="ctas">
                  <LeadLink className="btn btn-teal" kind="plan">Прислать снимок — посчитаем план</LeadLink>
                  <a className="hero-call" href={PHONE_RU.tel}><b>{PHONE_RU.text}</b><span>звонок из России</span></a>
                </div>
                <ul className="trust">
                  <li><b>Импланты MIS</b><span>Израиль</span></li>
                  <li><b>Установки A‑dec</b><span>США</span></li>
                  <li><b>Свой рентген</b><span>снимок на месте</span></li>
                  <li><b>в 2–3 раза</b><span>дешевле, чем в Москве*</span></li>
                </ul>
              </div>
              <div className="hero-media">
                <figure className="hm-main"><img src="/assets/img/in-treatment.webp" alt="Врач и ассистент во время приёма в клинике «Звезда‑СТОМ»" width="1200" height="800" fetchPriority="high" /><figcaption>Приём в «Звезда‑СТОМ»</figcaption></figure>
                <figure className="hm-side"><img src="/assets/img/h-facade.webp" alt="Здание гостиницы «Звезда» на проспекте Газеты Звязда, 47" width="800" height="469" /><figcaption>Гостиница «Звезда» · клиника на 4 этаже</figcaption></figure>
                <a className="hm-docs" href="#doctors">
                  <span className="faces">{['hrutsky', 'komarov', 'noskevich', 'yagelnitskiy'].map(n => <img key={n} src={`/assets/img/av-${n}.webp`} alt="" width="120" height="120" />)}</span>
                  <b>8 врачей</b><span>хирурги и ортопеды со стажем <span><YearsRange from={LEAD_YEARS} /></span></span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* STORY: "Три минуты" — the hotel in section; the camera follows the patient from bed to dental chair */}
        <Story scene={<Scene />} />

        {/* WHY US */}
        <section className="sec paper why" id="why" aria-labelledby="why-h">
          <div className="wrap">
            <div className="sec-head">
              <p className="eyebrow">Почему едут к нам</p>
              <h2 className="h2" id="why-h">Обычная поездка на&nbsp;лечение и&nbsp;поездка в&nbsp;«Звезда‑СТОМ»</h2>
            </div>
            <div className="nums">
              <div><b>22 года</b><span>клиника работает с 2004 года</span></div>
              <div><b>1 лифт</b><span>от номера до кресла врача</span></div>
              <div><b><YearsRange from={LEAD_YEARS} /></b><span>стаж хирургов и ортопедов</span></div>
              <div><b>в 2–3 раза</b><span>дешевле, чем в Москве*</span></div>
            </div>
            <div className="cmp" role="table" aria-label="Сравнение">
              <div className="cmp-row cmp-head" role="row"><span role="columnheader"></span><span role="columnheader">Обычно</span><span role="columnheader">В «Звезда‑СТОМ»</span></div>
              <div className="cmp-row" role="row"><span role="rowheader">Жильё</span><span role="cell">Ищете квартиру или отель поближе к клинике</span><span role="cell">Номер в том же здании, бронируем за вас</span></div>
              <div className="cmp-row" role="row"><span role="rowheader">Дорога к врачу</span><span role="cell">Такси, пробки, незнакомый район</span><span role="cell">Лифт на 4&nbsp;этаж</span></div>
              <div className="cmp-row" role="row"><span role="rowheader">Снимок</span><span role="cell">Отдельный диагностический центр</span><span role="cell">Свой рентген‑кабинет на этаже</span></div>
              <div className="cmp-row" role="row"><span role="rowheader">Врач</span><span role="cell">Выбираете по отзывам в интернете</span><span role="cell">Хирурги и ортопеды первой категории со стажем <span><YearsRange from={LEAD_YEARS} /></span></span></div>
              <div className="cmp-row" role="row"><span role="rowheader">План и цена</span><span role="cell">Узнаёте только на месте</span><span role="cell">План и вилка стоимости по снимку — до поездки</span></div>
              <div className="cmp-row" role="row"><span role="rowheader">После отъезда</span><span role="cell">Связь с клиникой теряется</span><span role="cell">Остаёмся на связи в мессенджере, на работы — гарантия</span></div>
            </div>
          </div>
        </section>

        {/* TRIP — five stations on one line: three of them happen at home, two in Minsk */}
        <section className="sec paper2" id="trip">
          <div className="wrap">
            <div className="sec-head">
              <p className="eyebrow">Как проходит поездка</p>
              <h2 className="h2">Пять шагов от снимка до новой улыбки</h2>
            </div>
            <div className="journey">
              <div className="phases"><span className="ph-home">Из дома, до поездки</span><span className="ph-city">В Минске</span></div>
              <ol className="steps">
                {STEPS.map(([h, p], i) => (
                  <li key={h} className={i < 3 ? 'home' : 'city'}>
                    {(i === 0 || i === 3) && <span className="step-phase" aria-hidden="true">{i === 0 ? 'Из дома, до поездки' : 'В Минске'}</span>}
                    <span className="num">{String(i + 1).padStart(2, '0')}</span><div><h3>{h}</h3><p>{p}</p></div>
                  </li>
                ))}
              </ol>
            </div>
            <aside className="card memo" aria-label="Памятка пациента">
              <p className="eyebrow">Памятка пациента</p>
              <h3 className="memo-h">Что взять с&nbsp;собой</h3>
              <ul className="memo-list">
                <li>Паспорт. Гражданам России достаточно внутреннего</li>
                <li>Снимок, если есть, — или сделаем на месте</li>
                <li>Список лекарств, которые принимаете</li>
                <li>Карту или наличные — какие карты принимаем, подскажем заранее**</li>
              </ul>
              <dl className="memo-rows">
                <div><dt>Приём</dt><dd>Пн–Пт 9:00–20:00, Сб 9:00–14:00</dd></div>
                <div><dt>Адрес</dt><dd>пр‑т Газеты Звязда, 47, 4 этаж, каб. 421</dd></div>
              </dl>
              <LeadLink className="btn btn-ink" kind="plan">Начать с&nbsp;шага 01</LeadLink>
            </aside>
          </div>
        </section>

        {/* PLANNER */}
        <section className="sec paper" id="plan">
          <div className="wrap">
            <div className="sec-head">
              <p className="eyebrow">Сколько это займёт</p>
              <h2 className="h2">Сколько раз приезжать и&nbsp;на&nbsp;сколько дней</h2>
              <p className="sub">Выберите лечение — покажем, как обычно выглядит поездка. Точный план врач составит по вашему снимку.</p>
            </div>
            <Planner />
            <p className="note">Сроки ориентировочные и зависят от состояния зубов. Окончательно их называет врач после осмотра.</p>
          </div>
        </section>

        {/* HOTEL */}
        <section className="sec paper2" id="hotel" aria-labelledby="hotel-h">
          <div className="wrap">
            <div className="sec-head row">
              <div><p className="eyebrow">Проживание</p><h2 className="h2" id="hotel-h">Жить в том же здании</h2></div>
              <p className="sub">Гостиница «Звезда» работает с 1982 года, в 2013‑м прошла реконструкцию. Клиника занимает часть её 4&nbsp;этажа — номер на даты лечения бронируем сами.</p>
            </div>
            <div className="hotel">
              <div className="hotel-photos">
                <figure className="hp1"><img src="/assets/img/h-entrance.webp" alt="Вход в гостиницу «Звезда», дом 47" width="800" height="469" loading="lazy" /><figcaption>Вход в гостиницу</figcaption></figure>
                <figure className="hp2"><img src="/assets/img/h-twin.webp" alt="Двухместный номер с раздельными кроватями" width="800" height="469" loading="lazy" /><figcaption>Номер с двумя кроватями</figcaption></figure>
                <figure className="hp3"><img src="/assets/img/h-cafe.webp" alt="Кафе в гостинице" width="800" height="469" loading="lazy" /><figcaption>Кафе «Ле Базилик»</figcaption></figure>
              </div>
              <div className="hotel-info">
                <div className="rooms" role="table" aria-label="Номера и ориентировочные цены">
                  <div className="room" role="row"><div role="cell"><b>Эконом</b><span>удобства на блок, Wi‑Fi, ТВ, холодильник</span></div><p role="cell">от&nbsp;≈2&nbsp;900&nbsp;₽</p></div>
                  <div className="room rec" role="row"><div role="cell"><b>Стандарт <i>советуем после хирургии</i></b><span>своя ванная, кондиционер, чайник</span></div><p role="cell">от&nbsp;≈3&nbsp;300&nbsp;₽</p></div>
                  <div className="room" role="row"><div role="cell"><b>Бизнес, 2 комнаты</b><span>двуспальная кровать, можно вдвоём‑втроём</span></div><p role="cell">от&nbsp;≈6&nbsp;000&nbsp;₽</p></div>
                </div>
                <p className="note small">За номер в сутки для гостей из России, ориентир по открытым данным на октябрь 2026. Точную цену назовём при бронировании.</p>
                <ul className="amen">
                  <li><b>Кафе</b><span>ежедневно 8:30–20:00, белорусская и европейская кухня</span></li>
                  <li><b>Обмен валюты</b><span>отделение банка в здании, пн–пт 9:00–17:00</span></li>
                  <li><b>Парковка</b><span>бесплатная, у входа</span></li>
                  <li><b>Wi‑Fi</b><span>во всём здании</span></li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ROUTE */}
        <section className="sec paper" id="route" aria-labelledby="route-h">
          <div className="wrap">
            <div className="sec-head row">
              <div><p className="eyebrow">Как добраться</p><h2 className="h2" id="route-h">Дорога без пересадок</h2></div>
              <p className="sub">И от аэропорта, и от вокзала едете по синей линии без пересадок до «Петровщины». Оттуда 4 остановки на троллейбусе — и вы у гостиницы.</p>
            </div>
            <div className="routes">
              <RouteTabs />
              <figure className="map">
                <iframe title="Гостиница «Звезда» и клиника на карте" src="https://yandex.ru/map-widget/v1/?ll=27.4720%2C53.8625&z=14&pt=27.46552%2C53.86095%2Cpm2rdl" loading="lazy" allowFullScreen></iframe>
                <figcaption><b>Минск, пр‑т Газеты Звязда, 47</b><span>гостиница «Звезда», 4 этаж, кабинет 421</span><a href="https://yandex.ru/maps/?rtext=~53.86095%2C27.46552&rtt=auto" target="_blank" rel="noopener">Проложить маршрут →</a></figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* CLINIC INSIDE */}
        <section className="sec paper2 inside" aria-labelledby="in-h">
          <div className="wrap">
            <div className="sec-head row">
              <div><p className="eyebrow">Клиника изнутри</p><h2 className="h2" id="in-h">Всё нужное — на одном этаже</h2></div>
              <p className="sub">Кабинеты терапии и хирургии, собственный рентген‑кабинет, стерилизация. Модернизация клиники — 2017–2018 годы.</p>
            </div>
            <div className="gallery">
              <figure className="g1"><img src="/assets/img/in-wall.webp" alt="Стенд с лицензиями и режимом работы клиники" width="1200" height="800" loading="lazy" /><figcaption>Лицензии и сертификаты</figcaption></figure>
              <figure className="g2"><img src="/assets/img/in-cabinet.webp" alt="Стоматологический кабинет с креслом" width="1200" height="800" loading="lazy" /><figcaption>Кабинет терапии</figcaption></figure>
              <figure className="g3"><img src="/assets/img/in-waiting.webp" alt="Зона ожидания" width="1200" height="800" loading="lazy" /><figcaption>Зона ожидания</figcaption></figure>
              <figure className="g4"><img src="/assets/img/in-xray.webp" alt="Дверь рентген-кабинета" width="800" height="1200" loading="lazy" /><figcaption>Свой рентген‑кабинет</figcaption></figure>
            </div>
          </div>
        </section>

        {/* DOCTORS */}
        <section className="sec paper" id="doctors">
          <div className="wrap">
            <div className="sec-head row">
              <div><p className="eyebrow">Врачи</p><h2 className="h2">Кто будет лечить</h2></div>
              <p className="sub">Чаще всего приезжают на имплантацию и протезирование — вот хирурги и ортопеды, которые этим занимаются.</p>
            </div>
            <div className="docs">
              {DOCTORS.map(d => (
                <article className="doc" key={d.img}><img src={`/assets/img/${d.img}.webp`} alt={d.name} width="560" height="700" loading="lazy" /><div><Since year={d.since} /><h3>{d.name}</h3><p>{d.about}</p></div></article>
              ))}
            </div>
            <p className="more">В клинике 8 врачей, включая терапевтов и детских стоматологов. <a href="https://zvezdastom.by/o-klinike">Вся команда →</a></p>
          </div>
        </section>

        {/* FAQ */}
        <section className="sec paper2" id="faq">
          <div className="wrap faq-wrap">
            <div><p className="eyebrow">Вопросы</p><h2 className="h2">О чём спрашивают перед поездкой</h2></div>
            <div className="faq">
              {FAQ.map(([q, a], i) => (
                <details key={q} open={i === 0}><summary><span className="num">{String(i + 1).padStart(2, '0')}</span>{q}</summary><p>{a}</p></details>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section className="sec paper contact-sec" id="contact">
          <div className="wrap"><div className="contact contact-grid">
            <div>
              <p className="eyebrow">Начать с шага 01</p>
              <h2 className="h2 big">Пришлите снимок — врач ответит с&nbsp;планом</h2>
              <div className="msgr">
                <SoonLink className="btn btn-light" messenger="Telegram">Telegram</SoonLink>
                <SoonLink className="btn btn-ghost" messenger="WhatsApp">WhatsApp</SoonLink>
                <SoonLink className="btn btn-ghost" messenger="Viber">Viber</SoonLink>
              </div>
              <dl className="rows">
                <div><dt>Из России</dt><dd><a href={PHONE_RU.tel}>{PHONE_RU.text}</a></dd></div>
                <div><dt>В Беларуси</dt><dd><a href="tel:+375292326527">+375 29 232‑65‑27</a> МТС<br /><a href="tel:+375293106527">+375 29 310‑65‑27</a> A1<br /><a href="tel:+375172217022">+375 17 221‑70‑22</a></dd></div>
                <div><dt>Почта</dt><dd><a href="mailto:zvezdastom@mail.ru">zvezdastom@mail.ru</a></dd></div>
                <div><dt>Приём</dt><dd>Пн–Пт 9:00–20:00, Сб 9:00–14:00</dd></div>
              </dl>
            </div>
            <div className="card lead-card">
              <p className="eyebrow">План лечения по снимку</p>
              <h3 className="lead-h">Ответим в течение дня</h3>
              <div data-lead-slot><LeadForm /></div>
            </div>
          </div></div>
        </section>
      </main>

      <footer className="ftr">
        <div className="wrap ftr-grid">
          <p><b>Звезда‑СТОМ</b> — частная стоматология, Минск, с 2004 года. Лицензия № 02040/4139.</p>
          <p>пр‑т Газеты «Звязда», 47, каб. 421 · 4 этаж гостиницы «Звезда»</p>
          <p className="muted">* По оценке клиники: протезирование и имплантация в Москве обходятся в 2–3 раза дороже. ** Уточняется у клиники. Концепт страницы, демо. Фото гостиницы — belhotel.by, только для демонстрации.</p>
        </div>
      </footer>

      <MobileBar />
      <Reveal />
    </SiteProvider>
  );
}
