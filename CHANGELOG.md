# Changelog

## [0.1.3] - 2026-02-18
### Added
- Centralized value helpers: added `src/utils/value_helpers.js` with `getWidgetValue` and `setWidgetValue` to standardize reading/writing widget values across components.

### Changed
- `aws-input`: switched to centralized helpers; rendering now preserves and reapplies a default value when the inner template is rebuilt.
- `aws-search`: switched to centralized helpers for `getValue`/`setValue` API.
- `aws-input` (license): initialize `realValue` from provided `value` so the default value appears in edit mode (masked/formatted as appropriate).

### Fixed
- Ensure default values are consistently displayed in edit mode for inputs that previously missed initial values.

### Build
- Bumped package version to `0.1.3`, built `dist/` bundles and created/pushed annotated tag `v0.1.3`.

## [0.1.2] - 2026-02-16
### Added
- `aws-selector`: added `get value()` / `set value()` accessors to read/write selection by `data-id`, `id`, `value` or visible text.

### Fixed
- Prevent duplicate button/icon initializations when elements are re-attached to the DOM (guarded `connectedCallback` with `_inited`).
- `aws-input` (type=`url`, mode=`view`): clicking the preview opens the URL; preview shows pointer cursor and behaves like a light button.
- Demo: preview delegate click handler now opens URLs even when the inner text node isn't the direct event target; copy button is ignored.

### Misc
- Updated demo to load `src` modules in dev so local changes are reflected immediately.

