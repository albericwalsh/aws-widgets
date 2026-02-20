import { getThemeObject, setThemeObject, cssVarsString } from '../utils/theme.js';

export { setThemeObject as setTheme };

export function generateCSS(theme = getThemeObject()) {
  const cssVars = cssVarsString(Object.assign({}, getThemeObject().cssVars || {}, (theme && theme.cssVars) || {}));
  const s = theme.widgets.search || {};
  const btnTheme = theme.widgets.button || {};
  return `:host{${cssVars}}\n    @import url('https://fonts.googleapis.com/icon?family=Material+Icons');
    :host { display: inline-block; }
    .widget-search {
      position: relative;
      display: flex;
      width: ${s.width || '300px'};
      max-width: 90vw;
      background: var(--aws-bg, ${s.background || 'rgba(255,255,255,0.08)'});
      border-radius: 30px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      transition: all 0.3s ease;
      margin: 0.5rem;
      align-items: center;
    }
    .widget-search input {
      flex: 1;
      padding: 12px 14px;
      border: none;
      outline: none;
      background: transparent;
      color: var(--aws-foreground, white);
      font-size: 15px;
      border-radius: 30px 0 0 30px;
      transition: padding 0.12s ease, font-size 0.12s ease;
    }
    .widget-search:hover {
      background: rgba(255,255,255,0.12);
      transform: scale(1.02);
      transition: all 0.5s ease;
    }

    .widget-search input::placeholder { color: var(--aws-subtext, rgba(255,255,255,0.7)); }
    .search-btn, .clear-btn {
        width: 40px;
        height: 40px;
        border-radius:50%;
        border:none;
        display:inline-flex;
        align-items:center;
        justify-content:center;
        cursor:pointer;
        margin-right:6px;
        transition: all 0.2s ease;
    }
    .search-btn:hover {
        transform: scale(1.05);
        box-shadow: 0 4px 12px rgba(0,0,0,0.25);
    }
    .search-btn:active { transform: scale(0.95); }
    .clear-btn { width:36px; height:36px; margin-right:4px; }
    .material-icons { font-family: 'Material Icons', serif; }
    :host([disabled]) .widget-search { opacity:0.6; filter:grayscale(18%); cursor:not-allowed; }
    :host([disabled]) .widget-search input, :host([disabled]) .search-btn, :host([disabled]) .clear-btn { cursor: not-allowed; }

    /* Variants mapped to button theme */
    :host([variant="secondary"]) .widget-search { background: var(--aws-bg, ${btnTheme.secondaryBg || s.background}); }
    :host([variant="ghost"]) .widget-search { background: var(--aws-bg, ${btnTheme.ghostBg || 'transparent'}); }

    /* No size variations for search (controlled via parameters elsewhere) */
  `;
}

export default { generateCSS };
