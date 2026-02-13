export async function initWidgets() {
    try {
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
        try { if (typeof window !== 'undefined') window.awsWidgets = list; } catch(_) { /* ignore */ }

        // Use import.meta.glob so Vite can statically analyze imports.
        const widgetModules = import.meta.glob('./*/*.js');

        await Promise.all(
            list.map(async item => {
                const name = item.id;
                const path = `./${name}/${name}.js`;
                const loader = widgetModules[path];
                if (loader) {
                    try {
                        await loader();
                    } catch (e) {
                        console.error(`Failed to load widget ${name}:`, e);
                    }
                } else {
                    console.warn(`No module found for widget ${name} at ${path}`);
                }
            })
        );

    } catch (err) {
        console.error("Failed loading widgets:", err);
    }
}

export default undefined;