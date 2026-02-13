function e(t) {
  return t && t.widgets && t.widgets.input, `
        #value{ font: inherit; color: inherit; }
        #copy{ margin-left:8px; }
    `;
}
const n = { generateCSS: e };
export {
  n as default,
  e as generateCSS
};
