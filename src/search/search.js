import { loadTheme } from "../utils/theme.js";
import { generateCSS } from "./generateCSS.js";
import { getWidgetValue, setWidgetValue } from "../utils/value_helpers.js";

class SP_search extends HTMLElement {
    static get observedAttributes() {
        return ["placeholder", "disabled", "clearable", "debounce", "value"];
    }

    constructor() {
        super();
        this._debounceTimer = null;
        this._debounceDelay = 300;
        this._shadow = this.attachShadow({ mode: "open" });
    }

    async connectedCallback() {
        const theme = await loadTheme();
        const style = generateCSS(theme);

        const template = document.createElement('template');
        template.innerHTML = `
            <style>${style}</style>
            <div class="widget-search">
                <input type="text" placeholder="Rechercher..." />
                <aws-icon-button class="clear-btn" variant="ghost" size="sm" style="display:none">close</aws-icon-button>
                <aws-icon-button class="search-btn" variant="primary" size="sm">search</aws-icon-button>
            </div>
        `;

        this._shadow.appendChild(template.content.cloneNode(true));

        this._root = this._shadow.querySelector('.widget-search');
        this._input = this._shadow.querySelector('input');
        this._searchBtn = this._shadow.querySelector('.search-btn');
        this._clearBtn = this._shadow.querySelector('.clear-btn');

        // initialize attributes
        this._applyAttributes();

        // events
        this._input.addEventListener('input', () => this._onInput());
        this._searchBtn && this._searchBtn.addEventListener('click', () => this._onSearch());
        this._clearBtn && this._clearBtn.addEventListener('click', () => this._onClear());
    }

    attributeChangedCallback(name) {
        if (!this._root) return;
        this._applyAttributes();
    }

    _applyAttributes() {
        // placeholder
        const ph = this.getAttribute('placeholder');
        if (this._input) this._input.placeholder = ph || 'Rechercher...';

        // disabled
        const dis = this.hasAttribute('disabled');
        if (this._input) this._input.disabled = dis;
        if (this._searchBtn) {
            // set both property and attribute to support native buttons and custom elements
            this._searchBtn.disabled = dis;
            if (dis) this._searchBtn.setAttribute('disabled', ''); else this._searchBtn.removeAttribute('disabled');
        }
        if (this._clearBtn) {
            this._clearBtn.disabled = dis;
            if (dis) this._clearBtn.setAttribute('disabled', ''); else this._clearBtn.removeAttribute('disabled');
        }

        // clearable
        const clearable = this.hasAttribute('clearable') || this.getAttribute('clearable') === 'true';
        if (this._clearBtn) this._clearBtn.style.display = clearable ? 'inline-flex' : 'none';

        // propagate variant to internal buttons if present (clear is always ghost by default)
        const variant = this.getAttribute('variant');
        if (this._searchBtn) {
            if (variant) this._searchBtn.setAttribute('variant', variant); else this._searchBtn.removeAttribute('variant');
        }

        // debounce
        const d = Number(this.getAttribute('debounce'));
        this._debounceDelay = (!isNaN(d) && d >= 0) ? d : 300;

        // value
        if (this.hasAttribute('value')) {
            const v = this.getAttribute('value');
            if (this._input && this._input.value !== v) this._input.value = v;
        }

        // visual disabled host
        if (dis) this.setAttribute('aria-disabled', 'true'); else this.removeAttribute('aria-disabled');
    }

    _onInput() {
        // debounce emitting 'change' event
        if (this._debounceDelay === 0) {
            this._emitChange();
            return;
        }
        clearTimeout(this._debounceTimer);
        this._debounceTimer = setTimeout(() => this._emitChange(), this._debounceDelay);
    }

    _onSearch() {
        if (this.hasAttribute('disabled')) return;
        this._emitSearch();
    }

    _onClear() {
        if (this.hasAttribute('disabled')) return;
        if (this._input) {
            this._input.value = '';
            this.setAttribute('value', '');
            this._emitChange();
            this._emitSearch();
        }
    }

    _emitChange() {
        const v = this._input ? this._input.value : '';
        this.setAttribute('value', v);
        this.dispatchEvent(new CustomEvent('change', { detail: { value: v }, bubbles: true, composed: true }));
    }

    _emitSearch() {
        const v = this._input ? this._input.value : '';
        this.dispatchEvent(new CustomEvent('search', { detail: { value: v }, bubbles: true, composed: true }));
    }

    // external API
    getValue() { return getWidgetValue(this._input); }
    setValue(v) { setWidgetValue(this._input, v); this.setAttribute('value', v); }
}

customElements.define('aws-search', SP_search);
