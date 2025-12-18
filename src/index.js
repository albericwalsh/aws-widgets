// aws-widgets/src/index.js

import "./button/button.js";

// async function loadWidgets() {
//     try {
//         // JSON dans le même dossier que widgets.js
//         const jsonUrl = new URL("./widgets.json", import.meta.url);
//         const response = await fetch(jsonUrl);
//
//         if (!response.ok) {
//             throw new Error("Failed fetching widgets.json: " + response.status);
//         }
//
//         const data = await response.json();
//         const list = data.widgets || [];
//
//         await Promise.all(
//             list.map(name => {
//                 const moduleUrl = new URL(`./${name}/${name}.js`, import.meta.url).href;
//                 return import(moduleUrl);
//             })
//         );
//
//     } catch (err) {
//         console.error("Failed loading widgets:", err);
//     } finally {
//         console.log("Finished loading widgets.");
//     }
// }
//
// loadWidgets().then(r =>
//     console.log("Widgets loaded."));
