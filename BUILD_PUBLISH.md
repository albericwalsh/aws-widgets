Build & Publish — AWS Widgets

Goal: produce stable releases and publish artifacts without committing built files to `main`.

1) Prepare a release
- Bump version in `package.json` (e.g. from `0.1.0` → `0.1.1`).
- Update `CHANGELOG.md` (optional).
- Commit your changes: `git add package.json CHANGELOG.md && git commit -m "chore(release): v0.1.1"`.

2) Create a tag and push it
- Create an annotated tag and push it:

```bash
git tag -a v0.1.1 -m "Release v0.1.1"
git push origin v0.1.1
```

- The `release.yml` workflow will run on pushed tags matching `v*`, build the project, and attach the generated `dist` bundles to the GitHub Release.

3) CDN usage (jsDelivr)
- After the release is created, jsDelivr can serve assets from the tag. Example:

```html
<script type="module">
  import { initWidgets } from 'https://cdn.jsdelivr.net/gh/albericwalsh/aws-widgets@v0.1.1/dist/aws-widgets.es.js';
  await initWidgets();
</script>
```

4) Optional: publish to npm
- Create an npm token with `npm token create` and add it to GitHub repo secrets as `NPM_TOKEN` (Repository → Settings → Secrets → Actions).
- The `release.yml` workflow will detect `NPM_TOKEN` and publish the package to npm automatically (see workflow; it runs `npm publish --access public`).

5) Local testing
- To test locally without pushing a tag, you can build locally with:

```bash
npm ci
npm run build
```

- Serve `index.html` with `npm run dev` and the demo will import the local `dist` (or jsDelivr link if set in `index.html`).

Notes & best practices
- Do not commit `dist/` to `main` for long-term maintenance: use Releases to store artifacts. If you temporarily need `dist` in the repo (for quick CDN testing), commit it then immediately remove it in the next commit; prefer Releases for stable artifacts.
- Use semantic versioning and sign your commits/tags if required by your org.
- Keep the `README` examples pointing to tag-based jsDelivr URLs for reproducibility.
- Ensure `package.json` `repository` and `author` fields are correct before publishing.
