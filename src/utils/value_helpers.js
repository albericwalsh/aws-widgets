export function getWidgetValue(el) {
  if (!el) return "";
  try {
    if (typeof el.getValue === 'function') return el.getValue();
    if (typeof el.getRealValue === 'function') return el.getRealValue();
    if ('value' in el) return el.value ?? "";
    return el.textContent ?? "";
  } catch (e) {
    return "";
  }
}

export function setWidgetValue(el, v) {
  if (!el) return;
  try {
    if (typeof el.setValue === 'function') { el.setValue(v); return; }
    if ('value' in el) { el.value = v ?? ""; return; }
    el.textContent = v ?? "";
  } catch (e) {
    // swallow errors to avoid breaking host component
  }
}
