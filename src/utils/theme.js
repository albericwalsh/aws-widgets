const theme = {
  "aws-accent": "#10b981",
  "aws-muted": "#6b7280",
  "aws-subtext": "rgba(255,255,255,0.7)",
  "aws-chart-value": "#ffffff",
  "aws-bg": "#ffffff",
  "aws-foreground": "#111827"
};

export function getTheme() {
  return Object.assign({}, theme);
}

export function setTheme(newVars = {}) {
  Object.keys(newVars).forEach((k) => {
    const key = k.replace(/^--/, '');
    theme[key] = newVars[k];
  });
}

export function updateVar(name, value) {
  const key = name.replace(/^--/, '');
  theme[key] = value;
}

export function cssVarsString(overrides = {}) {
  const merged = Object.assign({}, theme, overrides);
  return Object.entries(merged)
    .map(([k, v]) => `--${k}: ${v};`)
    .join(' ');
}

export default {
  getTheme,
  setTheme,
  updateVar,
  cssVarsString,
};
export const getThemeObject = getTheme;
export const setThemeObject = setTheme;

/**
 * Apply CSS custom properties directly onto a host element (overrides shadow :host rules)
 * @param {HTMLElement} el
 * @param {Record<string,string>} vars
 */
export function applyVarsToHost(el, vars = {}) {
  if (!el || !el.style) return;
  Object.entries(vars).forEach(([k, v]) => {
    const name = k.replace(/^--?/, '--');
    el.style.setProperty(name, v);
  });
}

// Inject a small stylesheet into open shadowRoots to ensure SVG fills and basic colors
function ensureShadowOverrides(el, vars = {}) {
  try {
    if (!el || !el.shadowRoot) return;
    const marker = 'aws-theme-overrides';
    let style = el.shadowRoot.querySelector(`style[data-${marker}]`);
    const parts = [];
    // ensure svg fill/stroke inherit from css variables and apply text color only
    parts.push('svg, svg * { fill: var(--aws-foreground) !important; stroke: var(--aws-foreground) !important; }');
    parts.push(':host, :host * { color: var(--aws-foreground) !important; }');
    const css = parts.join('\n');
    if (!style) {
      style = document.createElement('style');
      style.setAttribute(`data-${marker}`, '1');
      style.textContent = css;
      // prepend so component styles can still override if needed
      el.shadowRoot.prepend(style);
    } else {
      style.textContent = css;
    }
  } catch (e) { /* ignore */ }
}

/**
 * Find all custom element hosts (tag name starting with AWS-) and apply vars inline
 * Returns number of hosts updated
 */
export function applyThemeToAllHosts(vars = {}) {
  const all = Array.from(document.querySelectorAll('*'));
  let updated = 0;
  for (const el of all) {
    try {
      if (!el.tagName) continue;
      if (el.tagName.startsWith('AWS-')) {
        applyVarsToHost(el, vars);
        ensureShadowOverrides(el, vars);
        updated++;
      }
    } catch (e) { /* ignore */ }
  }
  try {
    console.info('applyThemeToAllHosts: updated', updated, 'hosts');
    if (updated > 0) console.debug('sample host tags:', Array.from(document.querySelectorAll('*')).filter(n=>n.tagName&&n.tagName.startsWith('AWS-')).slice(0,10).map(n=>n.tagName));
  } catch(e){}
  return updated;
}

// src/utils/theme.js
export async function loadTheme() {
    const res = await fetch(new URL("../style.json", import.meta.url));
    return await res.json();
}