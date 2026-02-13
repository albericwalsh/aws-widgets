import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        lib: {
            entry: 'src/index.js',
            name: 'awsWidgets',
            formats: ['es', 'cjs'],
            fileName: (format) => `aws-widgets.${format}.js`
        },
        rollupOptions: {
            external: [],
            output: {
                exports: 'named',
                globals: {}
            }
        }
    }
});
