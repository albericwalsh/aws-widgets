export function normalizeStep(stepAttr) {
  // If step is missing, empty, or zero => no discrete step -> use 'any'
  if (stepAttr == null) return 'any';
  const n = Number(stepAttr);
  if (isNaN(n)) return stepAttr; // keep as-is when not numeric
  if (n === 0) return 'any';
  return String(n);
}

export function readNumber(value) {
  const n = Number(value);
  return isNaN(n) ? null : n;
}
