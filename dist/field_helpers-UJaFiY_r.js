function u(r) {
  if (r == null) return "any";
  const n = Number(r);
  return isNaN(n) ? r : n === 0 ? "any" : String(n);
}
function e(r) {
  const n = Number(r);
  return isNaN(n) ? null : n;
}
export {
  u as normalizeStep,
  e as readNumber
};
