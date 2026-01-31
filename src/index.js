async function loadWidgets() {
    try {
        // JSON dans le même dossier que widgets.js
        const jsonUrl = new URL("./widgets.json", import.meta.url);
        const response = await fetch(jsonUrl);

        if (!response.ok) {
            throw new Error("Failed fetching widgets.json: " + response.status);
        }

        const data = await response.json();
        const list = data.widgets || [];

        await Promise.all(
            list.map(async name => {
                const moduleUrl = new URL(`./${name}/${name}.js`, import.meta.url).href;
                try {
                    await import(moduleUrl);
                    console.log(`Widget loaded: ${name}`);
                } catch(e) {
                    console.error(`Failed to load widget ${name}:`, e);
                }
            })
        );

    } catch (err) {
        console.error("Failed loading widgets:", err);
    } finally {
        console.log("Finished loading widgets.");
    }
}

loadWidgets();