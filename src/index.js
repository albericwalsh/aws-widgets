async function loadWidgets() {
    try {
        // JSON dans le même dossier que widgets.js
        const jsonUrl = new URL("./widgets.json", import.meta.url);
        const response = await fetch(jsonUrl);

        if (!response.ok) {
            throw new Error("Failed fetching widgets.json: " + response.status);
        }

        const data = await response.json();
        const rawList = data.widgets || [];

        // Normalize entries: allow either string ids or object { id, parameters }
        const list = rawList.map(entry => typeof entry === 'string' ? { id: entry } : entry);

        // Expose normalized widget metadata for demos/tools
        try { window.awsWidgets = list; } catch(_) { /* ignore in strict contexts */ }

        await Promise.all(
            list.map(async item => {
                const name = item.id;
                const moduleUrl = new URL(`./${name}/${name}.js`, import.meta.url).href;
                try {
                    await import(moduleUrl);
                } catch(e) {
                    console.error(`Failed to load widget ${name}:`, e);
                }
            })
        );

    } catch (err) {
        console.error("Failed loading widgets:", err);
    }
}

loadWidgets();