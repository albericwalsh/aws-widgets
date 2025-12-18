// aws-widgets/src/utils/load_file.js

export async function loadFile(htmlUrl, cssUrl, root) {
    const [html, css] = await Promise.all([
        fetch(htmlUrl).then(r => r.text()),
        fetch(cssUrl).then(r => r.text())
    ]);

    root.innerHTML = `
        <style>${css}</style>
        ${html}
    `;
}
