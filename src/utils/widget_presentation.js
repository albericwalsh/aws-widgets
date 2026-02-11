// Génère une section "présentation" (HTML) pour un widget donné
// Exports:
// - getPresentationFromList(list, id) => string|null
// - getPresentationFromJson(id) => Promise<string|null>

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function normalizeList(rawList) {
  if (!Array.isArray(rawList)) return [];
  return rawList.map(entry => (typeof entry === 'string' ? { id: entry } : entry || {}));
}

function buildCodeExample(id, parameters) {
  const tag = `aws-${id}`;
  if (!parameters) return `<${tag}></${tag}>`;

  // if caller provided explicit HTML content (for slot-based widgets), use it raw
  if (parameters.content && typeof parameters.content === 'string') {
    return parameters.content;
  }

  // Build a simple attribute example using first available parameter values
  const attrs = [];
  for (const [key, val] of Object.entries(parameters)) {
    if (Array.isArray(val) && val.length) {
      attrs.push(`${key}="${val[0]}"`);
    } else if (typeof val === 'boolean') {
      if (val) attrs.push(key);
    } else if (typeof val === 'number' || typeof val === 'string') {
      attrs.push(`${key}="${escapeHtml(String(val))}"`);
    }
    if (attrs.length >= 3) break;
  }
  return attrs.length ? `<${tag} ${attrs.join(' ')}></${tag}>` : `<${tag}></${tag}>`;
}

function buildParametersList(parameters) {
  if (!parameters || typeof parameters !== 'object') return '';
  const rows = Object.entries(parameters).map(([k, v]) => {
    const value = Array.isArray(v) ? v.join(', ') : String(v);
    return `<li><strong>${escapeHtml(k)}:</strong> ${escapeHtml(value)}</li>`;
  });
  return `<ul class="aws-widget-params">${rows.join('')}</ul>`;
}

function generatePresentationHtml(widget) {
  if (!widget || !widget.id) return null;
  const id = widget.id;
  const params = widget.parameters || null;
  const tag = `aws-${id}`;

  const codeExample = buildCodeExample(id, params);

  return `
    <section class="aws-widget-presentation aws-widget-${escapeHtml(id)}">
      <h3 class="aws-widget-title">${escapeHtml(id)}</h3>
      <div class="aws-widget-preview">
        <div class="aws-widget-live">
          <!-- preview instance -->
          ${codeExample}
        </div>
        <div class="aws-widget-meta">
          <h4>Exemple d'utilisation</h4>
          <pre class="aws-widget-code"><code>${escapeHtml(codeExample)}</code></pre>
          ${params ? `<h4>Paramètres</h4>` : ''}
          ${buildParametersList(params)}
        </div>
      </div>
    </section>
  `;
}

/**
 * Retourne la présentation HTML pour le widget `id` à partir d'une liste normalisée
 * @param {Array<string|object>} list
 * @param {string} id
 * @returns {string|null}
 */
export function getPresentationFromList(list, id) {
  const normalized = normalizeList(list);
  const found = normalized.find(item => item.id === id || (`aws-${item.id}`) === id);
  if (!found) return null;
  return generatePresentationHtml(found);
}

/**
 * Charge `src/widgets.json` (dans `src/`) et retourne la présentation HTML pour `id`.
 * @param {string} id
 * @returns {Promise<string|null>}
 */
export async function getPresentationFromJson(id) {
  try {
    const jsonUrl = new URL('../widgets.json', import.meta.url);
    const resp = await fetch(jsonUrl);
    if (!resp.ok) return null;
    const data = await resp.json();
    const list = data.widgets || [];
    return getPresentationFromList(list, id);
  } catch (e) {
    console.error('getPresentationFromJson error:', e);
    return null;
  }
}

export default {
  getPresentationFromList,
  getPresentationFromJson,
};

/**
 * Create a DOM element for a widget presentation with interactive parameter controls.
 * @param {object} widget - { id, parameters }
 * @returns {HTMLElement|null}
 */
import { buildPresentationTemplate } from './build_presentation_template.js';
import { populatePresentationSection } from './populate_presentation_section.js';

export function createPresentationElement(widget) {
  if (!widget || !widget.id) return null;
  const id = widget.id;
  const paramsMeta = widget.parameters || {};

  // prepare default values
  const values = {};
  for (const [k, v] of Object.entries(paramsMeta)) {
    if (Array.isArray(v) && v.length) values[k] = v[0];
    else if (typeof v === 'number') values[k] = v;
    else if (typeof v === 'boolean') values[k] = v;
    else values[k] = v == null ? '' : String(v);
  }

  const section = buildPresentationTemplate(id);
  populatePresentationSection(section, widget, values);
  return section;
}

/**
 * Wrapper: create presentation element by searching the list
 */
export function createPresentationElementFromList(list, id) {
  const normalized = normalizeList(list);
  const found = normalized.find(item => item.id === id || (`aws-${item.id}`) === id);
  if (!found) return null;
  return createPresentationElement(found);
}
