import { getThemeObject, setThemeObject, cssVarsString } from '../utils/theme.js';

export { setThemeObject as setTheme };

export function generateCSS(theme = getThemeObject()) {
    const t = (theme && theme.widgets && theme.widgets.title) || {};
    const fontFamily = String(t.fontFamily || 'inherit');
    const color = String(t.color || 'inherit');
    const primary = String(t.primaryColor || '#667eea');
    const secondary = String(t.secondaryColor || '#764ba2');

    const parts = [];
    parts.push(':host { display: block; height: 100%; width: 100%; }');
    parts.push('.aws-text {');
    parts.push('  box-sizing: border-box;');
    parts.push('  width: 100%;');
    parts.push('  height: 100%;');
    parts.push('  display: flex;');
    parts.push('  flex-direction: column;');
    parts.push('  align-items: stretch;');
    parts.push('  font-family: ' + fontFamily + ';');
    parts.push('  color: var(--aws-foreground, ' + color + ');');
    parts.push('  margin: 0;');
    parts.push('  line-height: 1.3;');
    parts.push('  word-wrap: break-word;');
    parts.push('  padding: 0;');
    parts.push('}');

    parts.push('/* size variants mapped to styles */');
    parts.push('.variant-heading { font-size: 1.6rem; font-weight: 700; }');
    parts.push('.variant-subheading { font-size: 1.25rem; font-weight: 600; }');
    parts.push('.variant-body { font-size: 1rem; font-weight: 400; }');
    parts.push('.variant-caption { font-size: 0.85rem; font-weight: 400; color: var(--aws-muted, rgba(255,255,255,0.7)); }');
    parts.push('.variant-paragraph { font-size: 0.95rem; font-weight: 400; }');

    parts.push('/* colors */');
    parts.push('.color-default { color: inherit; }');
    parts.push('.color-muted { color: rgba(255,255,255,0.6); }');
    parts.push('.color-primary { color: var(--aws-primary, ' + primary + '); }');
    parts.push('.color-secondary { color: var(--aws-secondary, ' + secondary + '); }');
    parts.push('.color-success { color: var(--aws-success, #32ff8c); }');
    parts.push('.color-warning { color: var(--aws-warning, #ffb400); }');
    parts.push('.color-danger { color: var(--aws-danger, #ff4a4a); }');

    parts.push('/* weight */');
    parts.push('.weight-light { font-weight: 300; }');
    parts.push('.weight-normal { font-weight: 400; }');
    parts.push('.weight-bold { font-weight: 700; }');

    parts.push('/* decoration/transform */');
    parts.push('.decoration-underline { text-decoration: underline; }');
    parts.push('.decoration-line-through { text-decoration: line-through; }');
    parts.push('.transform-uppercase { text-transform: uppercase; }');
    parts.push('.transform-lowercase { text-transform: lowercase; }');
    parts.push('.transform-capitalize { text-transform: capitalize; }');

    parts.push('/* helper classes */');
    parts.push('.italic { font-style: italic; }');
    // horizontal justification classes (used by `justify` param)
    parts.push('.content.justify-left { text-align: left; }');
    parts.push('.content.justify-center { text-align: center; }');
    parts.push('.content.justify-right { text-align: right; }');

    // Make content size to its intrinsic height so container's justify-content
    // can position it vertically (top/center/bottom). Keep full width.
    parts.push('.content { box-sizing: border-box; width: 100%; height: auto; min-height: 0; display: block; padding: 0; flex: 0 0 auto; }');
    parts.push('::slotted(*) { box-sizing: border-box; width: 100%; display: block; height: auto; text-align: inherit; }');
    parts.push('::slotted(img), ::slotted(svg) { max-width: 100%; height: auto; display: block; margin: 0 auto; }');

    parts.push('.loader { display: none; margin-left: 8px; vertical-align: middle; }');
    parts.push(':host([loading]) .loader { display: inline-block; }');

    const cssVars = cssVarsString(Object.assign({}, getThemeObject().cssVars || {}, (theme && theme.cssVars) || {}));
    parts.unshift(`:host{${cssVars}}`);
    return parts.join('\n');
}
