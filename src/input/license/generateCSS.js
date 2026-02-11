export function generateCSS(theme){
    return `
    :host{display:block}
    .input{ padding:6px 8px; border-radius:6px; border:1px solid ${theme?.colors?.border || '#ccc'}; background:${theme?.colors?.surface || '#fff'}; color:${theme?.colors?.text || '#000'} }
    sp-icon-button{ margin-left:8px; color:${theme?.colors?.muted || '#666'} }
    `
}
