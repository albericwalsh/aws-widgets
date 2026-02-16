# Changelog

## [0.1.2] - 2026-02-16
### Added
- `aws-selector`: added `get value()` / `set value()` accessors to read/write selection by `data-id`, `id`, `value` or visible text.

### Fixed
- Prevent duplicate button/icon initializations when elements are re-attached to the DOM (guarded `connectedCallback` with `_inited`).
- `aws-input` (type=`url`, mode=`view`): clicking the preview opens the URL; preview shows pointer cursor and behaves like a light button.
- Demo: preview delegate click handler now opens URLs even when the inner text node isn't the direct event target; copy button is ignored.

### Misc
- Updated demo to load `src` modules in dev so local changes are reflected immediately.

