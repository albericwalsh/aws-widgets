function n(t) {
  if (!t) return "";
  try {
    return typeof t.getValue == "function" ? t.getValue() : typeof t.getRealValue == "function" ? t.getRealValue() : "value" in t ? t.value ?? "" : t.textContent ?? "";
  } catch {
    return "";
  }
}
function r(t, e) {
  if (t)
    try {
      if (typeof t.setValue == "function") {
        t.setValue(e);
        return;
      }
      if ("value" in t) {
        t.value = e ?? "";
        return;
      }
      t.textContent = e ?? "";
    } catch {
    }
}
export {
  n as getWidgetValue,
  r as setWidgetValue
};
