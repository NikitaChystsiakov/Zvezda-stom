// «Три минуты» — the hotel in section, morning. One SVG world; Story moves a viewBox camera through it
// and animates the patient, the lift cabin and the facade. Colours come from the real building and clinic photos.
import type { ReactNode } from 'react';
import { W, BX0, BX1, SX, SW, F, R, D, CW, CH, floorY, ground, seeded } from '@/lib/scene-geometry';

const C = {
  brick: '#8E4430', brick2: '#7B3826', white: '#EDEAE4', slab: '#D6CDBF', slabTop: '#EFE8DC',
  wall: '#EADFCD', wallSide: '#DCCDB7', ceil: '#F3ECE0', carpet: '#9A8670', wood: '#9A6A3E', woodD: '#7A5230',
  linen: '#F7F4EE', blanket: '#8E8A82', curtain: '#7A5A44', sheer: '#FFFFFF',
  cWall: '#F3F5F3', cSide: '#E3E8E6', cFloor: '#D5DAD7', cBlue: '#1F4FA0', lime: '#A9C83A', limeD: '#86A02A',
  steel: '#B9B6B0', steelD: '#8E8B85', skin: '#E2B796', hair: '#3B2E26'
};
const FONT = 'Geologica,sans-serif';

// ---------- interiors (drawn as boxes with depth, like a doll's house) ----------
function Box({ x0, x1, y, wall, side, ceil, floor }: { x0: number; x1: number; y: number; wall: string; side: string; ceil: string; floor: string }) {
  const yF = y + F - 14;
  return <>
    <rect x={x0 + D} y={y + D} width={x1 - x0 - 2 * D} height={yF - y - 2 * D} fill={wall} />
    <path d={`M${x0} ${y}H${x1}L${x1 - D} ${y + D}H${x0 + D}Z`} fill={ceil} />
    <path d={`M${x0} ${yF}H${x1}L${x1 - D} ${yF - D}H${x0 + D}Z`} fill={floor} />
    <path d={`M${x0} ${y}L${x0 + D} ${y + D}V${yF - D}L${x0} ${yF}Z`} fill={side} />
    <path d={`M${x1} ${y}L${x1 - D} ${y + D}V${yF - D}L${x1} ${yF}Z`} fill={side} opacity=".85" />
  </>;
}
const Ao = ({ x0, x1, y }: { x0: number; x1: number; y: number }) => <rect x={x0} y={y} width={x1 - x0} height={F - 14} fill="url(#ao)" />;

type RoomOpts = { flip?: boolean; closed?: boolean; guest?: boolean; blanket?: string };
function HotelRoom({ x0, x1, y, o }: { x0: number; x1: number; y: number; o: RoomOpts }) {
  const yF = y + F - 14, base = yF - 12, w = x1 - x0, m = x0 + w / 2 + (o.flip ? -20 : 20);
  const wx = m - 50;
  const BL = 160, bx = o.flip ? x1 - 12 - BL : x0 + 12;
  const head = o.flip ? bx + BL - 14 : bx, pil = o.flip ? bx + BL - 58 : bx + 16;
  const nx = o.flip ? bx - 46 : bx + BL + 10;
  return <>
    <Box x0={x0} x1={x1} y={y} wall={C.wall} side={C.wallSide} ceil={C.ceil} floor={C.carpet} />
    {/* window with morning sky, sheer + drapes */}
    <rect x={wx - 6} y={y + 46} width="112" height="104" fill="#F7F2EA" /><rect x={wx} y={y + 52} width="100" height="92" fill="url(#win)" />
    <rect x={wx + 48} y={y + 52} width="4" height="92" fill="#F7F2EA" />
    {o.closed
      ? <rect x={wx - 4} y={y + 46} width="108" height="106" fill={C.curtain} opacity=".92" />
      : <>
        <rect x={wx + 6} y={y + 48} width="38" height="104" fill={C.sheer} opacity=".55" />
        <polygon points={`${wx + 10},${base} ${wx + 120},${base} ${wx + 150},${yF - 2} ${wx - 10},${yF - 2}`} fill="#FFF3D6" opacity=".45" />
      </>}
    <rect x={wx - 26} y={y + 40} width="22" height={base - y - 40} rx="3" fill={C.curtain} /><rect x={wx + 104} y={y + 40} width="22" height={base - y - 40} rx="3" fill={C.curtain} />
    <rect x={wx - 34} y={y + 36} width="168" height="5" rx="2" fill={C.woodD} />
    {/* AC unit, picture */}
    <rect x={o.flip ? x1 - D - 92 : x0 + D + 14} y={y + 40} width="78" height="22" rx="4" fill="#FAF9F6" />
    <rect x={o.flip ? x0 + D + 18 : x1 - D - 60} y={y + 74} width="40" height="30" fill="#C9B79C" stroke="#7A5230" strokeWidth="3" />
    {/* bed (side view) + nightstand; furniture may use the full front width of the box */}
    <ellipse cx={bx + BL / 2} cy={base + 4} rx={BL * .6} ry="10" fill="url(#shadow)" />
    <rect x={head} y={base - 74} width="14" height="74" rx="3" fill={C.wood} />
    <rect x={bx + 6} y={base - 34} width={BL - 12} height="26" rx="5" fill={C.linen} />
    <rect x={bx + 6} y={base - 10} width={BL - 12} height="10" fill={C.woodD} />
    <rect x={o.flip ? bx + 8 : bx + 62} y={base - 40} width={BL - 70} height="22" rx="8" fill={o.blanket || C.blanket} />
    <rect x={pil} y={base - 46} width="42" height="14" rx="7" fill="#FFFFFF" />
    {o.guest && <><circle cx={pil + 21} cy={base - 50} r="12" fill={C.skin} /><path d={`M${pil + 9} ${base - 52}a12 12 0 0 1 24 -2z`} fill={C.hair} /></>}
    <rect x={nx} y={base - 36} width="36" height="36" rx="2" fill={C.wood} /><rect x={nx + 16} y={base - 58} width="4" height="22" fill="#B99A72" /><path d={`M${nx + 6} ${base - 56}h24l-5 -16h-14z`} fill="#F2E3C6" />
    <Ao x0={x0} x1={x1} y={y} />
  </>;
}

// the hero's room: bed by the far wall, door toward the lift
const PatientRoom = ({ x0, x1, y }: { x0: number; x1: number; y: number }) =>
  <HotelRoom x0={x0} x1={x1} y={y} o={{ flip: true, closed: false, blanket: '#8C7E6E' }} />;

function ClinicFloor({ y }: { y: number }) {
  const yF = y + F - 14, base = yF - 12, rx = 1060;
  return <>
    {/* left: treatment room 400..760 + hall 770..940 */}
    <Box x0={BX0} x1={760} y={y} wall={C.cWall} side={C.cSide} ceil="#FAFAF8" floor={C.cFloor} />
    <rect x={BX0 + D + 20} y={y + 50} width="96" height="88" fill="url(#win)" /><rect x={BX0 + D + 66} y={y + 50} width="4" height="88" fill="#fff" />
    {/* blue cabinets on the back wall */}
    <rect x={BX0 + 150} y={base - 64} width="150" height="64" fill={C.cBlue} /><rect x={BX0 + 150} y={base - 68} width="150" height="6" fill="#F4F4F2" />
    <rect x={BX0 + 156} y={base - 56} width="66" height="2" fill="#ffffff66" /><rect x={BX0 + 228} y={base - 56} width="66" height="2" fill="#ffffff66" />
    <rect x={BX0 + 160} y={y + 52} width="120" height="40" fill={C.cBlue} /><rect x={BX0 + 166} y={y + 58} width="108" height="2" fill="#ffffff55" />
    {/* dental unit + lamp arm */}
    <rect x="652" y={y + 18} width="6" height="56" fill="#D9DCDA" />
    <path d={`M655 ${y + 72} L600 ${y + 96}`} stroke="#CFD3D1" strokeWidth="6" strokeLinecap="round" />
    <ellipse cx="596" cy={y + 100} rx="20" ry="9" fill="#F3F5F4" />
    <g id="lampOn" opacity="0"><polygon points={`584,${y + 104} 608,${y + 104} 660,${base - 40} 540,${base - 40}`} fill="#FFF6DD" opacity=".55" /><ellipse cx="596" cy={y + 104} rx="46" ry="22" fill="url(#lampG)" /></g>
    {/* doctor (white coat, auburn hair) standing by the chair */}
    <g id="doctor"><ellipse cx="606" cy={base + 2} rx="30" ry="6" fill="url(#shadow)" />
      <rect x="594" y={base - 66} width="11" height="66" rx="5" fill="#8FB2CF" /><rect x="608" y={base - 66} width="11" height="66" rx="5" fill="#86A9C7" />
      <path d={`M586 ${base - 62} l4 -66 q2 -10 16 -10 h4 q14 0 16 10 l4 66z`} fill="#FBFBFA" stroke="#D9DCDA" strokeWidth="2" />
      <path d={`M590 ${base - 120} q-14 26 -16 46`} stroke="#F4F5F4" strokeWidth="11" strokeLinecap="round" fill="none" />
      <circle cx="608" cy={base - 150} r="15" fill={C.skin} /><path d={`M591 ${base - 150} a15 15 0 0 1 30 -4 q4 16 -2 26 l-2 -18 q-12 -8 -26 -4z`} fill="#A4532F" /></g>
    {/* dental chair (lime, like the real one) */}
    <ellipse cx="610" cy={base + 3} rx="100" ry="9" fill="url(#shadow)" />
    <rect x="596" y={base - 30} width="22" height="30" fill="#E6E9E7" /><rect x="560" y={base - 6} width="100" height="6" rx="3" fill="#D3D7D5" />
    <path d={`M520 ${base - 58} q8 -6 20 -4 l90 4 q14 2 22 -14 l14 -40 q4 -10 14 -8 l4 2 q6 4 2 14 l-16 48 q-6 16 -26 18 l-108 4 q-14 0 -18 -10z`} fill={C.lime} />
    <path d={`M520 ${base - 58} q8 -6 20 -4 l90 4`} stroke={C.limeD} strokeWidth="3" fill="none" />
    <rect x="690" y={base - 108} width="16" height="30" rx="6" fill={C.lime} transform={`rotate(18 698 ${base - 93})`} />
    {/* patient seated (appears at the end) */}
    <g id="pSeat" opacity="0">
      <path d={`M534 ${base - 66} L616 ${base - 64}`} stroke="#3A3F48" strokeWidth="15" strokeLinecap="round" />
      <rect x="520" y={base - 72} width="16" height="9" rx="3" fill="#2A2724" />
      <path d={`M616 ${base - 66} L668 ${base - 98}`} stroke="#9B5D47" strokeWidth="24" strokeLinecap="round" />
      <path d={`M640 ${base - 84} L606 ${base - 72}`} stroke="#A8664E" strokeWidth="9" strokeLinecap="round" />
      <circle cx="684" cy={base - 112} r="14" fill={C.skin} /><path d={`M673 ${base - 121}a14 14 0 0 1 25 5l-5 -2z`} fill={C.hair} /></g>
    {/* partition with an open door between room and hall */}
    <rect x="760" y={y} width="10" height={F - 14} fill="#E1E5E3" />
    <Box x0={770} x1={940} y={y} wall={C.cWall} side={C.cSide} ceil="#FAFAF8" floor={C.cFloor} />
    {/* the blue "4" sign from the real corridor */}
    <rect x="806" y={y + 52} width="76" height="132" fill="#1C64B8" /><rect x="852" y={y + 60} width="24" height="30" fill="#fff" /><text x="864" y={y + 84} textAnchor="middle" fontFamily={FONT} fontWeight="700" fontSize="24" fill="#1C64B8">4</text>
    {Array.from({ length: 6 }, (_, i) => <rect key={i} x="814" y={y + 100 + i * 12} width={36 + (i % 3) * 8} height="4" fill="#ffffffcc" />)}
    <rect x="812" y={y + 62} width="34" height="6" fill="#fff" /><rect x="812" y={y + 72} width="26" height="4" fill="#ffffffaa" />
    <Ao x0={BX0} x1={940} y={y} />
    {/* right: reception, waiting chairs, x-ray door */}
    <Box x0={rx} x1={BX1} y={y} wall={C.cWall} side={C.cSide} ceil="#FAFAF8" floor={C.cFloor} />
    <rect x={rx + 60} y={base - 58} width="170" height="58" fill="#F1F3F2" /><rect x={rx + 54} y={base - 64} width="182" height="8" rx="2" fill="#B98A5B" />
    <circle cx={rx + 150} cy={base - 84} r="13" fill={C.skin} /><path d={`M${rx + 137} ${base - 84} a13 13 0 0 1 26 -2 l2 14 -4 -10z`} fill="#2E241D" /><path d={`M${rx + 132} ${base - 64} q2 -10 18 -10 q16 0 18 10z`} fill="#FBFBFA" />
    <rect x={rx + 268} y={base - 40} width="40" height="40" rx="6" fill="#2F7FC9" /><rect x={rx + 316} y={base - 40} width="40" height="40" rx="6" fill="#2F7FC9" />
    <rect x={rx + 268} y={base - 74} width="8" height="40" rx="3" fill="#2F7FC9" /><rect x={rx + 316} y={base - 74} width="8" height="40" rx="3" fill="#2F7FC9" />
    <rect x={rx + 380} y={base - 150} width="74" height="150" fill="#ECEEED" stroke="#D2D7D4" strokeWidth="3" /><path d={`M${rx + 404} ${y + 98}l13 -22 13 22z`} fill="#F2C230" />
    <rect x={rx + 120} y={y + 52} width="110" height="70" fill="#FFFFFF" stroke="#D2D7D4" strokeWidth="3" />
    {Array.from({ length: 3 }, (_, i) => <rect key={i} x={rx + 130 + i * 34} y={y + 62} width="26" height="36" fill="#E6EEF5" />)}
    <rect x={rx + 480} y={base - 70} width="30" height="70" rx="14" fill="#6E9161" /><rect x={rx + 484} y={base - 18} width="22" height="18" fill="#B98A5B" />
    <Ao x0={rx} x1={BX1} y={y} />
  </>;
}

function Lobby({ y }: { y: number }) {
  const yF = y + F - 14, base = yF - 12;
  return <>
    <Box x0={BX0} x1={940} y={y} wall="#E8B77D" side="#D9A266" ceil="#F1D7B0" floor="#B9A58C" />
    <Box x0={1060} x1={BX1} y={y} wall="#E8B77D" side="#D9A266" ceil="#F1D7B0" floor="#B9A58C" />
    <rect x="560" y={base - 66} width="240" height="66" fill="#E7D3B4" /><rect x="552" y={base - 72} width="256" height="8" fill="#A87A4C" />
    <circle cx="680" cy={base - 92} r="13" fill={C.skin} /><path d={`M667 ${base - 92}a13 13 0 0 1 26 -2l2 12-4-9z`} fill="#C9A06A" /><path d={`M662 ${base - 72}q2 -10 18 -10q16 0 18 10z`} fill="#5C6F86" />
    <path d={`M470 ${base} q-4 -60 20 -96 q20 30 16 96z`} fill="#5F7A45" /><rect x="474" y={base - 22} width="32" height="22" fill="#8A6A48" />
    <rect x="1460" y={y + 40} width="110" height={base - y - 40} fill="url(#glass)" stroke="#5A4A3C" strokeWidth="5" /><rect x="1513" y={y + 40} width="4" height={base - y - 40} fill="#5A4A3C" />
    <rect x="1140" y={base - 40} width="120" height="40" rx="8" fill="#9DBF9A" />
    <Ao x0={BX0} x1={940} y={y} /><Ao x0={1060} x1={BX1} y={y} />
  </>;
}

function Tree({ x, h, crown }: { x: number; h: number; crown: string }) {
  return <>
    <ellipse cx={x} cy={ground + 6} rx={h * .35} ry="10" fill="url(#shadow)" /><rect x={x - 7} y={ground - h * .55} width="14" height={h * .55 + 6} fill="#6B5240" />
    <circle cx={x} cy={ground - h * .7} r={h * .32} fill={`url(#${crown})`} /><circle cx={x - h * .2} cy={ground - h * .55} r={h * .22} fill={`url(#${crown})`} /><circle cx={x + h * .22} cy={ground - h * .58} r={h * .24} fill={`url(#${crown})`} />
  </>;
}

const FLOORS = [9, 8, 7, 6, 5, 4, 3, 2, 1];

export default function Scene() {
  const rnd = seeded(11); // the call order below matters: city first, then guests/curtains floor by floor

  // hazy city behind
  const city: ReactNode[] = [];
  [[-600, 380], [1620, 2700]].forEach(([a, b]) => {
    let x = a;
    while (x < b) {
      const w = 90 + rnd() * 150, h = 500 + rnd() * 900, tone = 206 + Math.round(rnd() * 14);
      city.push(<rect key={`b${x}`} x={x} y={ground - h} width={w} height={h} fill={`rgb(${tone},${tone - 4},${tone - 10})`} opacity=".7" />);
      for (let wy = ground - h + 30; wy < ground - 30; wy += 46)
        city.push(<rect key={`w${x}-${wy}`} x={x + 12} y={wy} width={w - 24} height="10" fill="#ffffff" opacity=".18" />);
      x += w + 18;
    }
  });

  const floors = FLOORS.map(f => {
    const y = floorY(f);
    let rooms: ReactNode;
    if (f === 4) rooms = <ClinicFloor y={y} />;
    else if (f === 1) rooms = <Lobby y={y} />;
    else {
      const guests = [rnd() > .5, rnd() > .6, rnd() > .55, rnd() > .5];
      const closed = [rnd() > .7, rnd() > .75, rnd() > .7, rnd() > .7];
      rooms = <>
        <HotelRoom x0={BX0} x1={665} y={y} o={{ closed: closed[0], guest: guests[0] && closed[0] }} />
        <HotelRoom x0={675} x1={940} y={y} o={{ flip: true, closed: closed[1], guest: guests[1] && closed[1] }} />
        {f === 7 ? <PatientRoom x0={1060} x1={1325} y={y} /> : <HotelRoom x0={1060} x1={1325} y={y} o={{ closed: closed[2], guest: guests[2] && closed[2] }} />}
        <HotelRoom x0={1335} x1={BX1} y={y} o={{ flip: true, closed: closed[3], guest: guests[3] && closed[3] }} />
        <rect x="665" y={y} width="10" height={F - 14} fill="#D3C4AD" /><rect x="1325" y={y} width="10" height={F - 14} fill="#D3C4AD" />
      </>;
    }
    return <g key={f} data-floor={f}>
      {rooms}
      {/* slab */}
      <rect x={BX0 - 20} y={y + F - 14} width={BX1 - BX0 + 40} height="14" fill={C.slab} /><rect x={BX0 - 20} y={y + F - 14} width={BX1 - BX0 + 40} height="3" fill={C.slabTop} />
    </g>;
  });

  const y7 = floorY(7), base7 = y7 + F - 26, m4 = floorY(4) + 70;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" id="worldSvg" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#A9C3DA" /><stop offset=".55" stopColor="#D8E2E6" /><stop offset=".85" stopColor="#F3E4CC" /><stop offset="1" stopColor="#F6E7D0" /></linearGradient>
        <radialGradient id="sun" r=".5"><stop offset="0" stopColor="#FFF6E2" stopOpacity=".95" /><stop offset=".4" stopColor="#FFE9C4" stopOpacity=".35" /><stop offset="1" stopColor="#FFE9C4" stopOpacity="0" /></radialGradient>
        <linearGradient id="win" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#BFD5E6" /><stop offset="1" stopColor="#F4E6CF" /></linearGradient>
        <linearGradient id="glass" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#C7DAE8" /><stop offset=".5" stopColor="#9FB7CB" /><stop offset=".52" stopColor="#B9CCDB" /><stop offset="1" stopColor="#8FA6BA" /></linearGradient>
        <linearGradient id="ao" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#3B2A1A" stopOpacity=".22" /><stop offset=".35" stopColor="#3B2A1A" stopOpacity="0" /><stop offset=".8" stopColor="#3B2A1A" stopOpacity="0" /><stop offset="1" stopColor="#3B2A1A" stopOpacity=".14" /></linearGradient>
        <linearGradient id="brickV" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor={C.brick2} /><stop offset=".5" stopColor={C.brick} /><stop offset="1" stopColor={C.brick2} /></linearGradient>
        <linearGradient id="steelG" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#9C9892" /><stop offset=".3" stopColor="#CFCBC4" /><stop offset=".6" stopColor="#B3AFA8" /><stop offset="1" stopColor="#D6D2CB" /></linearGradient>
        <linearGradient id="shaftG" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#6E6862" /><stop offset=".5" stopColor="#857E77" /><stop offset="1" stopColor="#6A645E" /></linearGradient>
        <radialGradient id="pool" r=".5"><stop offset="0" stopColor="#FFF4DA" stopOpacity=".55" /><stop offset="1" stopColor="#FFF4DA" stopOpacity="0" /></radialGradient>
        <radialGradient id="lampG" r=".5"><stop offset="0" stopColor="#FFF7E3" stopOpacity=".9" /><stop offset=".5" stopColor="#FFF1D2" stopOpacity=".3" /><stop offset="1" stopColor="#FFF1D2" stopOpacity="0" /></radialGradient>
        <radialGradient id="shadow" r=".5"><stop offset="0" stopColor="#2A1E14" stopOpacity=".28" /><stop offset="1" stopColor="#2A1E14" stopOpacity="0" /></radialGradient>
        <radialGradient id="crownY" cx=".4" cy=".35" r=".6"><stop offset="0" stopColor="#E8C065" /><stop offset="1" stopColor="#C08A2E" /></radialGradient>
        <radialGradient id="crownG" cx=".4" cy=".35" r=".6"><stop offset="0" stopColor="#9DB27A" /><stop offset="1" stopColor="#5F7A45" /></radialGradient>
      </defs>
      <rect x="-3000" y="-4000" width={W + 6000} height={ground + 4000} fill="url(#sky)" />
      <ellipse cx="260" cy="520" rx="700" ry="520" fill="url(#sun)" />
      {city}

      {/* ---------- building ---------- */}
      {/* roof + sign */}
      <rect x={BX0 - 20} y={R - 30} width={BX1 - BX0 + 40} height="30" fill={C.slab} /><rect x={BX0 - 20} y={R - 30} width={BX1 - BX0 + 40} height="5" fill={C.slabTop} />
      <rect x={SX - 110} y={R - 100} width="220" height="70" fill="#CFC5B6" />
      <rect x={SX - 360} y={R - 112} width="720" height="6" fill="#6C625A" />
      <g fontFamily={FONT} fontWeight="700" fill="#B8322A" textAnchor="middle"><text x={SX} y={R - 196} fontSize="84" letterSpacing="6">ГОСТИНИЦА</text><text x={SX} y={R - 122} fontSize="62" letterSpacing="18">ЗВЕЗДА</text></g>

      {floors}

      {/* end walls: brick with white balcony strips, like the real tower */}
      {[[BX0 - 60, BX0], [BX1, BX1 + 60]].map(([a, b]) => <g key={a}>
        <rect x={a} y={R - 30} width={b - a} height={ground - R + 30} fill="url(#brickV)" />
        {FLOORS.map(f => <rect key={f} x={a - 6} y={floorY(f) + F - 40} width={b - a + 12} height="10" fill={C.white} />)}
      </g>)}

      {/* lift shaft */}
      <rect x={SX - SW / 2} y={R - 30} width={SW} height={ground - R + 30} fill="url(#shaftG)" />
      <rect x={SX - 36} y={R - 30} width="4" height={ground - R + 30} fill="#5A544E" /><rect x={SX + 32} y={R - 30} width="4" height={ground - R + 30} fill="#5A544E" />
      {FLOORS.map(f => <g key={f}>
        <rect x={SX - SW / 2} y={floorY(f) + F - 14} width={SW} height="6" fill="#5E5852" />
        <rect x={SX - SW / 2 - 6} y={floorY(f) + 40} width="6" height={F - 54} fill="#A9A49D" /><rect x={SX + SW / 2} y={floorY(f) + 40} width="6" height={F - 54} fill="#A9A49D" />
      </g>)}
      <line id="cable" x1={SX} y1={R - 30} x2={SX} y2={R} stroke="#3E3934" strokeWidth="3" />

      {/* ground: lawn, pavement, road with trolleybus wires, trees, entrance canopy */}
      <rect x="-3000" y={ground} width={W + 6000} height="4000" fill="#B9B2A6" />
      <rect x="-3000" y={ground} width={W + 6000} height="40" fill="#D8D1C4" />
      <rect x="-3000" y={ground + 40} width={W + 6000} height="26" fill="#8FA275" />
      <rect x="-3000" y={ground + 66} width={W + 6000} height="150" fill="#7E7A74" />
      <rect x="-3000" y={ground + 138} width={W + 6000} height="5" fill="#E9E4D8" opacity=".7" />
      <line x1="-3000" y1={ground - 150} x2={W + 3000} y2={ground - 150} stroke="#4A4540" strokeWidth="2" /><line x1="-3000" y1={ground - 138} x2={W + 3000} y2={ground - 138} stroke="#4A4540" strokeWidth="2" />
      {/* entrance canopy (red columns, white roof — the real one) */}
      <rect x={BX1 - 10} y={ground - 190} width="300" height="34" fill="#F3F1EC" /><text x={BX1 + 140} y={ground - 166} textAnchor="middle" fontFamily={FONT} fontWeight="700" fontSize="20" letterSpacing="6" fill="#B8322A">ЗВЕЗДА hotel</text>
      <rect x={BX1 + 70} y={ground - 156} width="14" height="156" fill="#9A3A28" /><rect x={BX1 + 250} y={ground - 156} width="14" height="156" fill="#9A3A28" />
      <Tree x={250} h={300} crown="crownY" /><Tree x={120} h={240} crown="crownG" /><Tree x={1830} h={280} crown="crownY" /><Tree x={2000} h={330} crown="crownG" /><Tree x={-60} h={280} crown="crownY" />

      {/* trolleybus 32 (moves) */}
      <g id="bus"><rect x="0" y={ground + 40} width="300" height="96" rx="14" fill="#ECE7DB" /><rect x="0" y={ground + 104} width="300" height="10" fill="#2F6FAE" />
        <rect x="16" y={ground + 54} width="230" height="38" rx="5" fill="#5C6C78" /><rect x="258" y={ground + 54} width="34" height="46" rx="5" fill="#5C6C78" />
        <rect x="262" y={ground + 44} width="26" height="12" rx="2" fill="#26231F" /><text x="275" y={ground + 54} textAnchor="middle" fontFamily={FONT} fontWeight="700" fontSize="11" fill="#F2B66B">32</text>
        <circle cx="60" cy={ground + 136} r="16" fill="#2A2724" /><circle cx="240" cy={ground + 136} r="16" fill="#2A2724" />
        <line x1="80" y1={ground + 40} x2="160" y2={ground - 150} stroke="#3A3530" strokeWidth="3" /><line x1="96" y1={ground + 40} x2="176" y2={ground - 138} stroke="#3A3530" strokeWidth="3" /></g>

      {/* ---------- lift cabin (moves) ---------- */}
      <g id="cabin">
        <rect x={-CW / 2} y="0" width={CW} height={CH} fill="url(#steelG)" />
        <rect x={-CW / 2 + 10} y="10" width={CW - 20} height={CH - 26} fill="#D9D4CC" />
        <rect x={-CW / 2 + 10} y="10" width={CW - 20} height="8" fill="#FFF5DF" />
        <rect x={-CW / 2 + 10} y={CH * .55} width={CW - 20} height="3" fill="#9C9892" />
        <rect x={-CW / 2} y={CH - 16} width={CW} height="16" fill="#6E6862" />
        <rect x={-CW / 2} y="-4" width={CW} height="6" fill="#5E5852" /></g>

      {/* ---------- the patient (walk cycle driven from Story) ---------- */}
      <g id="pWalk" opacity="0"><g id="pFlip">
        <ellipse cx="0" cy="2" rx="26" ry="5" fill="url(#shadow)" />
        <g id="legB"><rect x="-6" y="-74" width="13" height="70" rx="6" fill="#2F343C" /><rect x="-6" y="-8" width="20" height="8" rx="3" fill="#1E1C1A" /></g>
        <g id="armB"><rect x="-5" y="-128" width="10" height="54" rx="5" fill="#7E4A38" /></g>
        <path d="M-17 -70 l2 -58 q2 -12 15 -12 q13 0 15 12 l2 58z" fill="#9B5D47" />
        <g id="legF"><rect x="-6" y="-74" width="13" height="70" rx="6" fill="#3A3F48" /><rect x="-6" y="-8" width="20" height="8" rx="3" fill="#2A2724" /></g>
        <g id="armF"><rect x="-5" y="-128" width="10" height="54" rx="5" fill="#A8664E" /></g>
        <circle cx="2" cy="-152" r="15" fill={C.skin} /><path d="M-13 -154 a15 15 0 0 1 30 -2 q-6 -6 -14 -4 q-6 6 -16 8z" fill={C.hair} />
      </g></g>
      {/* the patient asleep in bed (room on floor 7, bed against the right wall) */}
      <g id="pBed"><circle cx="1276" cy={base7 - 50} r="13" fill={C.skin} /><path d={`M1263 ${base7 - 52}a13 13 0 0 1 26 -2z`} fill={C.hair} /></g>

      {/* ---------- intact facade for the opening shot; fades away to reveal the section ---------- */}
      <g id="facade">
        <rect x={BX0 - 60} y={R - 30} width={BX1 - BX0 + 120} height={ground - R + 30} fill="url(#brickV)" />
        {FLOORS.map(f => {
          const y = floorY(f), wins: ReactNode[] = [];
          for (let x = BX0 + 20; x < BX1 - 40; x += 96) {
            if (x > SX - 80 && x < SX + 40) continue;
            wins.push(<g key={x}><rect x={x - 4} y={y + 56} width="68" height="104" fill="#F1EEE8" /><rect x={x} y={y + 60} width="60" height="96" fill="url(#glass)" /><rect x={x + 28} y={y + 60} width="4" height="96" fill="#F1EEE8" /></g>);
          }
          return <g key={f}>{wins}<rect x={BX0 - 66} y={y + F - 40} width={BX1 - BX0 + 132} height="12" fill={C.white} /></g>;
        })}
        {[[BX0 - 60, 120], [SX - 60, 120], [BX1 - 60, 120]].map(([x, w]) => <rect key={x} x={x} y={R - 30} width={w} height={ground - R + 30} fill={C.white} opacity=".92" />)}
        <g id="marker"><rect x={BX1 - 470} y={m4} width="430" height="84" rx="42" fill="#FFFDF9" /><circle cx={BX1 - 428} cy={m4 + 42} r="12" fill="#0E7F86" />
          <text x={BX1 - 404} y={m4 + 55} fontFamily={FONT} fontWeight="600" fontSize="36" fill="#26231F">Клиника · 4 этаж</text></g>
      </g>
    </svg>
  );
}
