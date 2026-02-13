Publication rapide

- Vérifier `package.json` (name/version/repository/license).
- S'assurer que le repo GitHub existe et que l'URL est correcte dans `package.json`.
- Tagger une release semver, ex: `git tag v0.1.0 && git push --tags`.
- Publier sur npm (si souhaité) :

```bash
npm publish --access public
```

Pour une publication GitHub Pages/CDN via jsDelivr, il suffit de pousser sur le branche `main` et utiliser le lien :

```
https://cdn.jsdelivr.net/gh/<user>/aws-widgets@main/dist/aws-widgets.es.js
```
