import { buildPresentationTemplate as e } from "./build_presentation_template-DqPziQU1.js";
import { populatePresentationSection as c } from "./populate_presentation_section-DCQMi6nq.js";
function t(I) {
  return String(I).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
function s(I) {
  return Array.isArray(I) ? I.map((i) => typeof i == "string" ? { id: i } : i || {}) : [];
}
function d(I, i) {
  const g = `aws-${I}`;
  if (!i) return `<${g}></${g}>`;
  if (i.content && typeof i.content == "string")
    return i.content;
  const C = [];
  for (const [A, l] of Object.entries(i))
    if (Array.isArray(l) && l.length ? C.push(`${A}="${l[0]}"`) : typeof l == "boolean" ? l && C.push(A) : (typeof l == "number" || typeof l == "string") && C.push(`${A}="${t(String(l))}"`), C.length >= 3) break;
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
function o(I, i) {
  const C = s(I).find((A) => A.id === i || `aws-${A.id}` === i);
  return C ? a(C) : null;
}
async function r(I) {
  try {
    const i = new URL("data:application/json;base64,ew0KICAid2lkZ2V0cyI6IFsNCiAgICB7DQogICAgICAiaWQiOiAiYnV0dG9uIiwNCiAgICAgICJkZXNhY3RpdmFibGUiOiB0cnVlLA0KICAgICAgInBhcmFtZXRlcnMiOiB7DQogICAgICAgICJsYWJlbCI6ICJDbGljayBNZSIsDQogICAgICAgICJ2YXJpYW50IjogWyJwcmltYXJ5Iiwic2Vjb25kYXJ5IiwiZ2hvc3QiXSwNCiAgICAgICAgInNpemUiOiBbInNtIiwibWQiLCJsZyJdDQogICAgICB9DQogICAgfSwNCiAgICB7IA0KICAgICAgImlkIjogInRleHQiLA0KICAgICAgImRlc2FjdGl2YWJsZSI6IGZhbHNlLA0KICAgICAgInBhcmFtZXRlcnMiOiB7DQogICAgICAgICJzdHlsZXMiOiBbImhlYWRpbmciLCJzdWJoZWFkaW5nIiwiYm9keSIsImNhcHRpb24iLCAicGFyYWdyYXBoIl0sDQogICAgICAgICJhbGlnbm1lbnRzIjogWyJ0b3AiLCJjZW50ZXIiLCJib3R0b20iIF0sDQogICAgICAgICJqdXN0aWZ5IjogWyJsZWZ0IiwiY2VudGVyIiwicmlnaHQiXSwNCiAgICAgICAgImNvbG9ycyI6IFsiZGVmYXVsdCIsIm11dGVkIiwicHJpbWFyeSIsInNlY29uZGFyeSIsInN1Y2Nlc3MiLCJ3YXJuaW5nIiwiZGFuZ2VyIl0sDQogICAgICAgICJ3ZWlnaHQiOiBbImxpZ2h0Iiwibm9ybWFsIiwiYm9sZCJdLA0KICAgICAgICAidHJhbnNmb3JtIjogWyJub25lIiwidXBwZXJjYXNlIiwibG93ZXJjYXNlIiwiY2FwaXRhbGl6ZSJdLA0KICAgICAgICAiZGVjb3JhdGlvbiI6IFsibm9uZSIsInVuZGVybGluZSIsImxpbmUtdGhyb3VnaCJdLA0KICAgICAgICAiaXRhbGljIjogW3RydWUsZmFsc2VdLA0KICAgICAgICAiY29udGVudCI6ICJFeGVtcGxlIGRlIHRleHRlIg0KICAgICAgfQ0KICAgIH0sDQogICAgeyANCiAgICAgICJpZCI6ICJib29sIiwgDQogICAgICAiZGVzYWN0aXZhYmxlIjogdHJ1ZSwNCiAgICAgICJwYXJhbWV0ZXJzIjogeyAibW9kZSI6IFsiZWRpdCIsInZpZXciXSB9IA0KICAgIH0sDQogICAgeyANCiAgICAgICJpZCI6ICJpY29uLWJ1dHRvbiIsDQogICAgICAiZGVzYWN0aXZhYmxlIjogdHJ1ZSwNCiAgICAgICJwYXJhbWV0ZXJzIjogew0KICAgICAgICAic2l6ZSI6IFsic20iLCJtZCIsImxnIl0sDQogICAgICAgICJ2YXJpYW50IjogWyJwcmltYXJ5Iiwic2Vjb25kYXJ5IiwiZ2hvc3QiXSwNCiAgICAgICAgImNvbnRlbnQiOiAiYWNjb3VudF9jaXJjbGUiDQogICAgICB9DQogICAgfSwNCiAgICB7IA0KICAgICAgImlkIjogInNsaWRlciIsIA0KICAgICAgImRlc2FjdGl2YWJsZSI6IHRydWUsDQogICAgICAicGFyYW1ldGVycyI6IHsgDQogICAgICAgICJtaW4iOiAwLCANCiAgICAgICAgIm1heCI6IDEwMCwNCiAgICAgICAgInZhbHVlIjogNTAsDQogICAgICAgICJtb2RlIjogWyJlZGl0IiwidmlldyJdDQogICAgICAgIH0gDQogICAgICB9LA0KICAgIHsgDQogICAgICAiaWQiOiAic2VhcmNoIiwNCiAgICAgICJkZXNhY3RpdmFibGUiOiB0cnVlLA0KICAgICAgInBhcmFtZXRlcnMiOiB7DQogICAgICAgICJwbGFjZWhvbGRlciI6ICJSZWNoZXJjaGVyLi4uIiwNCiAgICAgICAgInZhcmlhbnQiOiBbInByaW1hcnkiLCJzZWNvbmRhcnkiLCJnaG9zdCJdLA0KICAgICAgICAiY2xlYXJhYmxlIjogdHJ1ZSwNCiAgICAgICAgImRlYm91bmNlIjogMzAwDQogICAgICB9DQogICAgfSwNCiAgICB7ICJpZCI6ICJ0YWJsZSIsDQogICAgInBhcmFtZXRlcnMiOiB7DQogICAgICAiY29udGVudCI6ICJcbiAgPGF3cy10YWJsZS1oZWFkPlxuICAgIDxhd3MtdGFibGUtcm93PlxuICAgICAgPGF3cy10YWJsZS1jZWxsPk5vbTwvYXdzLXRhYmxlLWNlbGw+XG4gICAgICA8YXdzLXRhYmxlLWNlbGw+RW1haWw8L2F3cy10YWJsZS1jZWxsPlxuICAgICAgPGF3cy10YWJsZS1jZWxsPkFnZTwvYXdzLXRhYmxlLWNlbGw+XG4gICAgPC9hd3MtdGFibGUtcm93PlxuICA8L2F3cy10YWJsZS1oZWFkPlxuICA8YXdzLXRhYmxlLWJvZHk+XG4gICAgPGF3cy10YWJsZS1yb3c+XG4gICAgICA8YXdzLXRhYmxlLWNlbGw+QWxpY2U8L2F3cy10YWJsZS1jZWxsPlxuICAgICAgPGF3cy10YWJsZS1jZWxsPmFsaWNlQGV4YW1wbGUuY29tPC9hd3MtdGFibGUtY2VsbD5cbiAgICAgIDxhd3MtdGFibGUtY2VsbD4zMDwvYXdzLXRhYmxlLWNlbGw+XG4gICAgPC9hd3MtdGFibGUtcm93PlxuICAgIDxhd3MtdGFibGUtcm93PlxuICAgICAgPGF3cy10YWJsZS1jZWxsPkJvYjwvYXdzLXRhYmxlLWNlbGw+XG4gICAgICA8YXdzLXRhYmxlLWNlbGw+Ym9iQGV4YW1wbGUuY29tPC9hd3MtdGFibGUtY2VsbD5cbiAgICAgIDxhd3MtdGFibGUtY2VsbD4yODwvYXdzLXRhYmxlLWNlbGw+XG4gICAgPC9hd3MtdGFibGUtcm93PlxuICA8L2F3cy10YWJsZS1ib2R5PlxuIg0KICAgICAgfQ0KICB9LA0KICAgIHsgImlkIjogImNoYXJ0IiwNCiAgICAgICJkZXNhY3RpdmFibGUiOiBmYWxzZSwNCiAgICAgICJwYXJhbWV0ZXJzIjogew0KICAgICAgICAidHlwZSI6IFsiYmFyIiwiY29sdW1uIiwicGllIiwibGluZSJdLA0KICAgICAgICAiZGF0YSI6ICJzYW1wbGUiLA0KICAgICAgICAidGl0bGUiOiAiU2FtcGxlIENoYXJ0IiwNCiAgICAgICAgInhMYWJlbCI6ICJYIGF4aXMiLA0KICAgICAgICAieUxhYmVsIjogIlkgYXhpcyIsDQogICAgICAgICJkYXRhX25hbWUiOiAiQSxCLEMiLA0KICAgICAgICAic2hvd192YWx1ZXMiOiBmYWxzZQ0KICAgICAgfQ0KICAgIH0sDQogICAgew0KICAgICAgImlkIjogInNlbGVjdG9yIiwNCiAgICAgICJkZXNhY3RpdmFibGUiOiB0cnVlLA0KICAgICAgInBhcmFtZXRlcnMiOiB7DQogICAgICAgICJjb250ZW50IjogIlxuICAgIDxhd3Mtb3B0aW9uIGRhdGEtaWQ9XCJsaWdodFwiPkxpZ2h0PC9hd3Mtb3B0aW9uPlxuICAgIDxhd3Mtb3B0aW9uIGRhdGEtaWQ9XCJkYXJrXCI+PGltZyBzcmM9XCIvdml0ZS5zdmdcIiBhbHQ9XCJcIj4gRGFyazwvYXdzLW9wdGlvbj5cbiAgICA8YXdzLW9wdGlvbiBkYXRhLWlkPVwic3lzdGVtXCI+U3lzdGVtPC9hd3Mtb3B0aW9uPlxuIiwNCiAgICAgICAgImlkIjogInRoZW1lUGlja2VyIiwNCiAgICAgICAgIm1vZGUiOiBbImVkaXQiLCJ2aWV3Il0NCiAgICAgIH0NCiAgICB9LA0KICAgIHsgImlkIjogInByb2dyZXNzLWNpcmNsZSIsICJwYXJhbWV0ZXJzIjogeyAicGFydGljbGVzIjogMjAsICJzcGVlZCI6IDEsICJyYWRpdXMiOiAyMCwgInBhcnRpY2xlLXNpemUtbXVsdGlwbGllciI6IDAuNSwgInNpemUiOiA2MCwgImNvbG9yIjogIiIgfSB9LA0KICAgIHsgImlkIjogImlucHV0IiwgImRlc2FjdGl2YWJsZSI6IHRydWUsICJwYXJhbWV0ZXJzIjogeyAidHlwZXMiOiBbInRleHQiLCJlbWFpbCIsIm51bWJlciIsInBhc3N3b3JkIiwiZGF0ZSIsInVybCIsInRlbGVwaG9uZSJdLCAibW9kZSI6IFsiZWRpdCIsInZpZXciXSB9IH0sDQogICAgeyAiaWQiOiAiY29udGV4dCIgfQ0KICBdDQp9DQo=", import.meta.url), g = await fetch(i);
    if (!g.ok) return null;
    const A = (await g.json()).widgets || [];
    return o(A, I);
  } catch (i) {
    return console.error("getPresentationFromJson error:", i), null;
  }
}
const Z = {
  getPresentationFromList: o,
  getPresentationFromJson: r
};
function J(I) {
  if (!I || !I.id) return null;
  const i = I.id, g = I.parameters || {}, C = {};
  for (const [l, n] of Object.entries(g))
    Array.isArray(n) && n.length ? C[l] = n[0] : typeof n == "number" || typeof n == "boolean" ? C[l] = n : C[l] = n == null ? "" : String(n);
  const A = e(i);
  return c(A, I, C), A;
}
function W(I, i) {
  const C = s(I).find((A) => A.id === i || `aws-${A.id}` === i);
  return C ? J(C) : null;
}
export {
  J as createPresentationElement,
  W as createPresentationElementFromList,
  Z as default,
  r as getPresentationFromJson,
  o as getPresentationFromList
};
