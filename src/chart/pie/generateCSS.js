import { getThemeObject, setThemeObject, cssVarsString } from '../../utils/theme.js';

export { setThemeObject as setTheme };

export function generateCSS(theme = getThemeObject()) {
  const cssVars = cssVarsString(Object.assign({}, getThemeObject().cssVars || {}, (theme && theme.cssVars) || {}));
  return `:host{${cssVars}}:host{display:block;font-family:Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;max-width:100%;}
.chart{width:100%;height:120px;display:flex;flex-direction:column;align-items:stretch;justify-content:center;position:relative;box-sizing:border-box}
.chart-title{font-size:12px;font-weight:600;text-align:center;margin:4px 0}
.chart-inner{flex:1;display:flex;align-items:center;justify-content:center;overflow:hidden;padding:0 8px}
svg rect, svg circle, svg path{transition:transform 0.12s ease;transform-origin:center center;transform-box:fill-box}
svg rect.hovered, svg circle.hovered, svg path.hovered{transform:scale(1.06)}
svg{width:100%;height:100%;display:block}
.slice{stroke:#fff;stroke-width:0.5;opacity:0.8}
.axis-x{font-size:11px;text-align:center;margin-top:4px}
.axis-y{position:absolute;left:4px;top:50%;transform:translateY(-50%) rotate(-90deg);transform-origin:center;font-size:11px}
.legend{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-top:6px;font-size:12px}
.legend-item{display:flex;align-items:center;gap:6px}
.legend-swatch{width:10px;height:10px;border-radius:2px}
.legend-value{margin-left:6px;color:var(--aws-chart-legend-value,#ffffff);font-size:11px}
 .chart-tooltip{position:absolute;pointer-events:none;padding:6px 8px;background:rgba(0,0,0,0.78);color:#fff;border-radius:6px;font-size:12px;white-space:nowrap;display:none;z-index:10;transition:opacity 0.08s ease}
`;
}
