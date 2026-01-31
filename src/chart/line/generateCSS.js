export function generateCSS(theme = {}) {
  return `:host{display:block;font-family:Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;max-width:100%;}
.chart{width:100%;height:120px;display:flex;flex-direction:column;align-items:stretch;justify-content:center;position:relative;box-sizing:border-box}
.chart-title{font-size:12px;font-weight:600;text-align:center;margin:4px 0}
.chart-inner{flex:1;display:flex;align-items:center;justify-content:center;overflow:hidden;padding:0 8px}
svg{width:100%;height:100%;display:block}
svg rect, svg circle, svg path{transition:transform 0.12s ease;transform-origin:center center;transform-box:fill-box}
svg rect.hovered, svg circle.hovered, svg path.hovered{transform:scale(1.06)}
path, polyline{fill:none;stroke:var(--aws-accent,#06b6d4);stroke-width:2;stroke-linejoin:round;stroke-linecap:round;stroke-opacity:0.8}
.point{fill:var(--aws-accent,#06b6d4);opacity:0.95}
.data-label{font-size:10px;fill:var(--aws-muted,#6b7280)}
.chart-tooltip{position:absolute;pointer-events:none;padding:6px 8px;background:rgba(0,0,0,0.78);color:#fff;border-radius:6px;font-size:12px;white-space:nowrap;display:none;z-index:10;transition:opacity 0.08s ease}
.pt .point-overlay{fill:var(--aws-accent,#06b6d4);opacity:0;transform:scale(0);transform-origin:center center;transform-box:fill-box}
.pt .point{transition:transform 0.12s ease;transform-origin:center center;transform-box:fill-box}
.pt .point-overlay{transition:transform 0.14s ease, opacity 0.12s ease;transform-origin:center center;transform-box:fill-box}
.pt.hovered .point{transform:scale(1.6)}
.pt.hovered .point-overlay{transform:scale(1);opacity:0.5}
.axis-x{font-size:11px;text-align:center;margin-top:4px}
.axis-y{position:absolute;left:4px;top:50%;transform:translateY(-50%) rotate(-90deg);transform-origin:center;font-size:11px}
.data-labels{display:flex;justify-content:space-between;padding:0 8px;margin-top:4px;font-size:11px;color:var(--aws-muted,#6b7280);gap:6px}
.data-labels span{flex:1;text-align:center;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.value-label{font-size:9px;fill:var(--aws-chart-value,#ffffff);text-anchor:middle}
`;
}
