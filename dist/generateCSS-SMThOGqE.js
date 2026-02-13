function e(t) {
  return `
        #value{ font: inherit; color: inherit; }
        #copy{ margin-left:8px; }
        /* customize native spinner arrows */
        input[type=number]::-webkit-outer-spin-button,
        input[type=number]::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
            width: 14px;
            height: 14px;
            opacity: 0.9;
            filter: grayscale(20%);
        }
        /* fallback for Firefox */
        input[type=number] {
            -moz-appearance: textfield;
        }
    `;
}
const n = { generateCSS: e };
export {
  n as default,
  e as generateCSS
};
