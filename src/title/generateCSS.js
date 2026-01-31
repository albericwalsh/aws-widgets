export function generateCSS(theme) {
    const title = theme.widgets.title;

    return `
        :host { display: block; }
        .widget-title {
            font-family: ${title.fontFamily};
            font-size: ${title.fontSize};
            color: ${title.color};
            margin-bottom: 10px;
        }
    `;
}
