export function generateCSS(theme){
    const t = (theme && theme.widgets && theme.widgets.input) || {};
    return `
        #value{ font: inherit; color: inherit; }
        #copy{ margin-left:8px; }
    `;
}

export default { generateCSS };
