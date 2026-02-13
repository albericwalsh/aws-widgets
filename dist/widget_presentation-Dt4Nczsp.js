import { buildPresentationTemplate as o } from "./build_presentation_template-DqPziQU1.js";
import { populatePresentationSection as c } from "./populate_presentation_section-DFtYcHEd.js";
function t(I) {
  return String(I).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
function l(I) {
  return Array.isArray(I) ? I.map((i) => typeof i == "string" ? { id: i } : i || {}) : [];
}
function d(I, i) {
  const g = `aws-${I}`;
  if (!i) return `<${g}></${g}>`;
  if (i.content && typeof i.content == "string")
    return i.content;
  const C = [];
  for (const [A, s] of Object.entries(i))
    if (Array.isArray(s) && s.length ? C.push(`${A}="${s[0]}"`) : typeof s == "boolean" ? s && C.push(A) : (typeof s == "number" || typeof s == "string") && C.push(`${A}="${t(String(s))}"`), C.length >= 3) break;
  return C.length ? `<${g} ${C.join(" ")}></${g}>` : `<${g}></${g}>`;
}
function b(I) {
  return !I || typeof I != "object" ? "" : `<ul class="aws-widget-params">${Object.entries(I).map(([g, C]) => {
    const A = Array.isArray(C) ? C.join(", ") : String(C);
    return `<li><strong>${t(g)}:</strong> ${t(A)}</li>`;
  }).join("")}</ul>`;
}
function a(I) {
  if (!I || !I.id) return null;
  const i = I.id, g = I.parameters || null, C = d(i, g);
  return `
    <section class="aws-widget-presentation aws-widget-${t(i)}">
      <h3 class="aws-widget-title">${t(i)}</h3>
      <div class="aws-widget-preview">
        <div class="aws-widget-live">
          <!-- preview instance -->
          ${C}
        </div>
        <div class="aws-widget-meta">
          <h4>Exemple d'utilisation</h4>
          <pre class="aws-widget-code"><code>${t(C)}</code></pre>
          ${g ? "<h4>Paramètres</h4>" : ""}
          ${b(g)}
        </div>
      </div>
    </section>
  `;
}
function e(I, i) {
  const C = l(I).find((A) => A.id === i || `aws-${A.id}` === i);
  return C ? a(C) : null;
}
async function r(I) {
  try {
    const i = new URL("data:application/json;base64,ewogICJ3aWRnZXRzIjogWwogICAgewogICAgICAiaWQiOiAiYnV0dG9uIiwKICAgICAgImRlc2FjdGl2YWJsZSI6IHRydWUsCiAgICAgICJwYXJhbWV0ZXJzIjogewogICAgICAgICJsYWJlbCI6ICJDbGljayBNZSIsCiAgICAgICAgInZhcmlhbnQiOiBbInByaW1hcnkiLCJzZWNvbmRhcnkiLCJnaG9zdCJdLAogICAgICAgICJzaXplIjogWyJzbSIsIm1kIiwibGciXQogICAgICB9CiAgICB9LAogICAgeyAKICAgICAgImlkIjogInRleHQiLAogICAgICAiZGVzYWN0aXZhYmxlIjogZmFsc2UsCiAgICAgICJwYXJhbWV0ZXJzIjogewogICAgICAgICJzdHlsZXMiOiBbImhlYWRpbmciLCJzdWJoZWFkaW5nIiwiYm9keSIsImNhcHRpb24iLCAicGFyYWdyYXBoIl0sCiAgICAgICAgImFsaWdubWVudHMiOiBbInRvcCIsImNlbnRlciIsImJvdHRvbSIgXSwKICAgICAgICAianVzdGlmeSI6IFsibGVmdCIsImNlbnRlciIsInJpZ2h0Il0sCiAgICAgICAgImNvbG9ycyI6IFsiZGVmYXVsdCIsIm11dGVkIiwicHJpbWFyeSIsInNlY29uZGFyeSIsInN1Y2Nlc3MiLCJ3YXJuaW5nIiwiZGFuZ2VyIl0sCiAgICAgICAgIndlaWdodCI6IFsibGlnaHQiLCJub3JtYWwiLCJib2xkIl0sCiAgICAgICAgInRyYW5zZm9ybSI6IFsibm9uZSIsInVwcGVyY2FzZSIsImxvd2VyY2FzZSIsImNhcGl0YWxpemUiXSwKICAgICAgICAiZGVjb3JhdGlvbiI6IFsibm9uZSIsInVuZGVybGluZSIsImxpbmUtdGhyb3VnaCJdLAogICAgICAgICJpdGFsaWMiOiBbdHJ1ZSxmYWxzZV0sCiAgICAgICAgImNvbnRlbnQiOiAiRXhlbXBsZSBkZSB0ZXh0ZSIKICAgICAgfQogICAgfSwKICAgIHsgCiAgICAgICJpZCI6ICJib29sIiwgCiAgICAgICJkZXNhY3RpdmFibGUiOiB0cnVlLAogICAgICAicGFyYW1ldGVycyI6IHsgIm1vZGUiOiBbImVkaXQiLCJ2aWV3Il0gfSAKICAgIH0sCiAgICB7IAogICAgICAiaWQiOiAiaWNvbi1idXR0b24iLAogICAgICAiZGVzYWN0aXZhYmxlIjogdHJ1ZSwKICAgICAgInBhcmFtZXRlcnMiOiB7CiAgICAgICAgInNpemUiOiBbInNtIiwibWQiLCJsZyJdLAogICAgICAgICJ2YXJpYW50IjogWyJwcmltYXJ5Iiwic2Vjb25kYXJ5IiwiZ2hvc3QiXSwKICAgICAgICAiY29udGVudCI6ICJhY2NvdW50X2NpcmNsZSIKICAgICAgfQogICAgfSwKICAgIHsgCiAgICAgICJpZCI6ICJzbGlkZXIiLCAKICAgICAgImRlc2FjdGl2YWJsZSI6IHRydWUsCiAgICAgICJwYXJhbWV0ZXJzIjogeyAKICAgICAgICAibWluIjogMCwgCiAgICAgICAgIm1heCI6IDEwMCwKICAgICAgICAidmFsdWUiOiA1MCwKICAgICAgICAibW9kZSI6IFsiZWRpdCIsInZpZXciXQogICAgICAgIH0gCiAgICAgIH0sCiAgICB7IAogICAgICAiaWQiOiAic2VhcmNoIiwKICAgICAgImRlc2FjdGl2YWJsZSI6IHRydWUsCiAgICAgICJwYXJhbWV0ZXJzIjogewogICAgICAgICJwbGFjZWhvbGRlciI6ICJSZWNoZXJjaGVyLi4uIiwKICAgICAgICAidmFyaWFudCI6IFsicHJpbWFyeSIsInNlY29uZGFyeSIsImdob3N0Il0sCiAgICAgICAgImNsZWFyYWJsZSI6IHRydWUsCiAgICAgICAgImRlYm91bmNlIjogMzAwCiAgICAgIH0KICAgIH0sCiAgICB7ICJpZCI6ICJ0YWJsZSIsCiAgICAicGFyYW1ldGVycyI6IHsKICAgICAgImNvbnRlbnQiOiAiXG4gIDxhd3MtdGFibGUtaGVhZD5cbiAgICA8YXdzLXRhYmxlLXJvdz5cbiAgICAgIDxhd3MtdGFibGUtY2VsbD5Ob208L2F3cy10YWJsZS1jZWxsPlxuICAgICAgPGF3cy10YWJsZS1jZWxsPkVtYWlsPC9hd3MtdGFibGUtY2VsbD5cbiAgICAgIDxhd3MtdGFibGUtY2VsbD5BZ2U8L2F3cy10YWJsZS1jZWxsPlxuICAgIDwvYXdzLXRhYmxlLXJvdz5cbiAgPC9hd3MtdGFibGUtaGVhZD5cbiAgPGF3cy10YWJsZS1ib2R5PlxuICAgIDxhd3MtdGFibGUtcm93PlxuICAgICAgPGF3cy10YWJsZS1jZWxsPkFsaWNlPC9hd3MtdGFibGUtY2VsbD5cbiAgICAgIDxhd3MtdGFibGUtY2VsbD5hbGljZUBleGFtcGxlLmNvbTwvYXdzLXRhYmxlLWNlbGw+XG4gICAgICA8YXdzLXRhYmxlLWNlbGw+MzA8L2F3cy10YWJsZS1jZWxsPlxuICAgIDwvYXdzLXRhYmxlLXJvdz5cbiAgICA8YXdzLXRhYmxlLXJvdz5cbiAgICAgIDxhd3MtdGFibGUtY2VsbD5Cb2I8L2F3cy10YWJsZS1jZWxsPlxuICAgICAgPGF3cy10YWJsZS1jZWxsPmJvYkBleGFtcGxlLmNvbTwvYXdzLXRhYmxlLWNlbGw+XG4gICAgICA8YXdzLXRhYmxlLWNlbGw+Mjg8L2F3cy10YWJsZS1jZWxsPlxuICAgIDwvYXdzLXRhYmxlLXJvdz5cbiAgPC9hd3MtdGFibGUtYm9keT5cbiIKICAgICAgfQogIH0sCiAgICB7ICJpZCI6ICJjaGFydCIsCiAgICAgICJkZXNhY3RpdmFibGUiOiBmYWxzZSwKICAgICAgInBhcmFtZXRlcnMiOiB7CiAgICAgICAgInR5cGUiOiBbImJhciIsImNvbHVtbiIsInBpZSIsImxpbmUiXSwKICAgICAgICAiZGF0YSI6ICJzYW1wbGUiLAogICAgICAgICJ0aXRsZSI6ICJTYW1wbGUgQ2hhcnQiLAogICAgICAgICJ4TGFiZWwiOiAiWCBheGlzIiwKICAgICAgICAieUxhYmVsIjogIlkgYXhpcyIsCiAgICAgICAgImRhdGFfbmFtZSI6ICJBLEIsQyIsCiAgICAgICAgInNob3dfdmFsdWVzIjogZmFsc2UKICAgICAgfQogICAgfSwKICAgIHsKICAgICAgImlkIjogInNlbGVjdG9yIiwKICAgICAgImRlc2FjdGl2YWJsZSI6IHRydWUsCiAgICAgICJwYXJhbWV0ZXJzIjogewogICAgICAgICJjb250ZW50IjogIlxuICAgIDxhd3Mtb3B0aW9uIGRhdGEtaWQ9XCJsaWdodFwiPkxpZ2h0PC9hd3Mtb3B0aW9uPlxuICAgIDxhd3Mtb3B0aW9uIGRhdGEtaWQ9XCJkYXJrXCI+PGltZyBzcmM9XCIvcHVibGljL2Rhcmsuc3ZnXCIgYWx0PVwiXCI+IERhcms8L2F3cy1vcHRpb24+XG4gICAgPGF3cy1vcHRpb24gZGF0YS1pZD1cInN5c3RlbVwiPlN5c3RlbTwvYXdzLW9wdGlvbj5cbiIsCiAgICAgICAgImlkIjogInRoZW1lUGlja2VyIiwKICAgICAgICAibW9kZSI6IFsiZWRpdCIsInZpZXciXQogICAgICB9CiAgICB9LAogICAgeyAiaWQiOiAicHJvZ3Jlc3MtY2lyY2xlIiwgInBhcmFtZXRlcnMiOiB7ICJwYXJ0aWNsZXMiOiAyMCwgInNwZWVkIjogMSwgInJhZGl1cyI6IDIwLCAicGFydGljbGUtc2l6ZS1tdWx0aXBsaWVyIjogMC41LCAic2l6ZSI6IDYwLCAiY29sb3IiOiAiIiB9IH0sCiAgICB7ICJpZCI6ICJpbnB1dCIsICJkZXNhY3RpdmFibGUiOiB0cnVlLCAicGFyYW1ldGVycyI6IHsgInR5cGVzIjogWyJ0ZXh0IiwiZW1haWwiLCJudW1iZXIiLCJwYXNzd29yZCIsImRhdGUiLCJ1cmwiLCJ0ZWxlcGhvbmUiXSwgIm1vZGUiOiBbImVkaXQiLCJ2aWV3Il0gfSB9LAogICAgeyAiaWQiOiAiY29udGV4dCIgfQogIF0KfQo=", import.meta.url), g = await fetch(i);
    if (!g.ok) return null;
    const A = (await g.json()).widgets || [];
    return e(A, I);
  } catch (i) {
    return console.error("getPresentationFromJson error:", i), null;
  }
}
const G = {
  getPresentationFromList: e,
  getPresentationFromJson: r
};
function Z(I) {
  if (!I || !I.id) return null;
  const i = I.id, g = I.parameters || {}, C = {};
  for (const [s, n] of Object.entries(g))
    Array.isArray(n) && n.length ? C[s] = n[0] : typeof n == "number" || typeof n == "boolean" ? C[s] = n : C[s] = n == null ? "" : String(n);
  const A = o(i);
  return c(A, I, C), A;
}
function J(I, i) {
  const C = l(I).find((A) => A.id === i || `aws-${A.id}` === i);
  return C ? Z(C) : null;
}
export {
  Z as createPresentationElement,
  J as createPresentationElementFromList,
  G as default,
  r as getPresentationFromJson,
  e as getPresentationFromList
};
