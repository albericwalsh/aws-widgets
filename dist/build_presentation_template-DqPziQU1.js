function E(i) {
  const e = document.createElement("section");
  e.className = `aws-widget-presentation aws-widget-${i}`;
  const n = document.createElement("h3");
  n.className = "aws-widget-title", n.textContent = i, e.appendChild(n);
  const a = document.createElement("div");
  a.className = "aws-widget-params-wrap";
  const m = document.createElement("div");
  m.className = "aws-widget-controls", a.appendChild(m);
  const c = document.createElement("div");
  c.className = "aws-widget-main";
  const d = document.createElement("div");
  d.className = "aws-widget-code-col";
  const s = document.createElement("div");
  s.className = "aws-code-header";
  const w = document.createElement("h4");
  w.textContent = "Code";
  const p = document.createElement("div");
  p.className = "aws-code-actions", s.appendChild(w), s.appendChild(p);
  const r = document.createElement("pre"), u = document.createElement("code");
  u.className = "aws-widget-code language-html", r.appendChild(u), d.appendChild(s), d.appendChild(r);
  const o = document.createElement("div");
  o.className = "aws-widget-result-col";
  const C = document.createElement("h4");
  C.textContent = "Résultat";
  const l = document.createElement("div");
  l.className = "aws-widget-live";
  const h = document.createElement(`aws-${i}`);
  l.appendChild(h), o.appendChild(C), o.appendChild(l), c.appendChild(d), c.appendChild(o), e.appendChild(a), e.appendChild(c);
  const t = document.createElement("button");
  return t.type = "button", t.className = "aws-copy-btn", t.innerHTML = '<span class="material-icons">content_copy</span>', t.title = "Copier le code", p.appendChild(t), e._refs = {
    title: n,
    paramsWrap: a,
    controls: m,
    codeBlock: u,
    codePre: r,
    copyBtn: t,
    liveEl: h,
    liveWrap: l
  }, e;
}
export {
  E as buildPresentationTemplate
};
