function e(i) {
  return `
        #value{ font: inherit; color: inherit; }
        #copy{ margin-left:8px; }
        .favicon{ width:24px; height:24px; border-radius:50%; overflow:hidden; display:inline-flex; align-items:center; justify-content:center; margin-right:6px; background:rgba(255,255,255,0.04) }
        .favicon img{ width:100%; height:100%; object-fit:cover; display:block }
        .favicon.no-favicon .fallback-emoji{ font-size:16px; line-height:1 }
    `;
}
const t = { generateCSS: e };
export {
  t as default,
  e as generateCSS
};
