/**
 * Vite configuration for a simple dev server and build output.
 * This is sufficient for running the web frontend editor.
 */
export default {
  server: { port: 5173, open: true },
  build: { outDir: 'dist' }
};
