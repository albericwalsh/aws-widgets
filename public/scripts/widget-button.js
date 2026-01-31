// Configuration pour le widget aws-button
document.addEventListener('DOMContentLoaded', () => {
    createInteractiveWidget({
        codeDisplayId: 'button-code',
        previewId: 'button-preview',
        controls: {
            text: '.btn-text',
            variant: '.btn-variant',
            size: '.btn-size',
            icon: '.btn-icon',
            disabled: '.btn-disabled'
        },
        generateCode: (values) => {
            let code = '&lt;aws-button';
            if (values.variant !== 'primary') code += ` variant="${values.variant}"`;
            if (values.size !== 'md') code += ` size="${values.size}"`;
            if (values.disabled) code += ' disabled';
            code += '&gt;';
            
            if (values.icon) {
                code += '\n  &lt;span slot="icon" class="material-icons"&gt;star&lt;/span&gt;';
                code += '\n  ' + values.text;
            } else {
                code += values.text;
            }
            
            code += '\n&lt;/aws-button&gt;';
            return code;
        },
        generatePreview: (values) => {
            let html = '<aws-button';
            if (values.variant !== 'primary') html += ` variant="${values.variant}"`;
            if (values.size !== 'md') html += ` size="${values.size}"`;
            if (values.disabled) html += ' disabled';
            html += '>';
            
            if (values.icon) {
                html += '<span slot="icon" class="material-icons">star</span>';
            }
            html += values.text + '</aws-button>';
            
            return html;
        }
    });
});
