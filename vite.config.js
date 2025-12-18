import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        lib: {
            entry: 'src/index.js',
            name: 'awsWidgets',
            fileName: (format) => `index.js`
        },
        rollupOptions: {
            external: [],
            output: {
                globals: {}
            }
        }
    }
});
