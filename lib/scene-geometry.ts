// Geometry of the «Три минуты» scene, shared by the SVG (Scene) and the scroll camera (Story).
export const W = 2000, BX0 = 400, BX1 = 1600, SX = 1000, SW = 120, F = 240, R = 420, D = 30;
export const floorY = (f: number) => R + (9 - f) * F; // top of floor f (1..9)
export const ground = R + 9 * F;                       // 2580
export const CW = SW - 16, CH = F - 44;                // lift cabin
export const base = (f: number) => floorY(f) + F - 26; // floor line where people stand
export const cabinTop = (f: number) => floorY(f) + 30; // cabin y when parked at floor f

// deterministic, so the server and the browser draw the same city and the same guests
export const seeded = (s: number) => () => (s = (s * 9301 + 49297) % 233280) / 233280;
