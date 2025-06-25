// vite.config.ts
import { defineConfig } from "file:///home/project/node_modules/vite/dist/node/index.js";
import react from "file:///home/project/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { resolve } from "path";
var __vite_injected_original_dirname = "/home/project";
var vite_config_default = defineConfig(({ command, mode }) => {
  const isVisualEditor = process.env.ENABLE_VISUAL_EDITOR === "true";
  const isDev = mode === "development";
  return {
    plugins: [react()],
    base: "/",
    server: {
      port: 5175,
      host: true,
      hmr: {
        overlay: true,
        clientPort: 443,
        path: "ws"
      }
    },
    preview: {
      port: 5175,
      host: true
    },
    build: {
      outDir: "dist",
      sourcemap: true,
      manifest: true,
      assetsDir: "assets",
      rollupOptions: {
        output: {
          manualChunks: {
            "react-vendor": ["react", "react-dom"],
            "editor-vendor": [
              "quill",
              "@tiptap/react",
              "grapesjs",
              "grapesjs-preset-webpage"
            ],
            "ui-vendor": [
              "framer-motion",
              "lucide-react"
            ]
          }
        }
      },
      copyPublicDir: true
    },
    resolve: {
      alias: {
        "@": resolve(__vite_injected_original_dirname, "src")
      }
    },
    define: {
      "__ENABLE_VISUAL_EDITOR__": JSON.stringify(isVisualEditor)
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9wcm9qZWN0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9wcm9qZWN0L3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3Byb2plY3Qvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAncGF0aCc7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBjb21tYW5kLCBtb2RlIH0pID0+IHtcbiAgY29uc3QgaXNWaXN1YWxFZGl0b3IgPSBwcm9jZXNzLmVudi5FTkFCTEVfVklTVUFMX0VESVRPUiA9PT0gJ3RydWUnO1xuICBjb25zdCBpc0RldiA9IG1vZGUgPT09ICdkZXZlbG9wbWVudCc7XG4gIFxuICByZXR1cm4ge1xuICAgIHBsdWdpbnM6IFtyZWFjdCgpXSxcbiAgICBiYXNlOiAnLycsXG4gICAgc2VydmVyOiB7XG4gICAgICBwb3J0OiA1MTc1LFxuICAgICAgaG9zdDogdHJ1ZSxcbiAgICAgIGhtcjoge1xuICAgICAgICBvdmVybGF5OiB0cnVlLFxuICAgICAgICBjbGllbnRQb3J0OiA0NDMsXG4gICAgICAgIHBhdGg6ICd3cydcbiAgICAgIH1cbiAgICB9LFxuICAgIHByZXZpZXc6IHtcbiAgICAgIHBvcnQ6IDUxNzUsXG4gICAgICBob3N0OiB0cnVlXG4gICAgfSxcbiAgICBidWlsZDoge1xuICAgICAgb3V0RGlyOiAnZGlzdCcsXG4gICAgICBzb3VyY2VtYXA6IHRydWUsXG4gICAgICBtYW5pZmVzdDogdHJ1ZSxcbiAgICAgIGFzc2V0c0RpcjogJ2Fzc2V0cycsXG4gICAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICAgIG91dHB1dDoge1xuICAgICAgICAgIG1hbnVhbENodW5rczoge1xuICAgICAgICAgICAgJ3JlYWN0LXZlbmRvcic6IFsncmVhY3QnLCAncmVhY3QtZG9tJ10sXG4gICAgICAgICAgICAnZWRpdG9yLXZlbmRvcic6IFtcbiAgICAgICAgICAgICAgJ3F1aWxsJyxcbiAgICAgICAgICAgICAgJ0B0aXB0YXAvcmVhY3QnLFxuICAgICAgICAgICAgICAnZ3JhcGVzanMnLFxuICAgICAgICAgICAgICAnZ3JhcGVzanMtcHJlc2V0LXdlYnBhZ2UnXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgJ3VpLXZlbmRvcic6IFtcbiAgICAgICAgICAgICAgJ2ZyYW1lci1tb3Rpb24nLFxuICAgICAgICAgICAgICAnbHVjaWRlLXJlYWN0J1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIGNvcHlQdWJsaWNEaXI6IHRydWUsXG4gICAgfSxcbiAgICByZXNvbHZlOiB7XG4gICAgICBhbGlhczoge1xuICAgICAgICAnQCc6IHJlc29sdmUoX19kaXJuYW1lLCAnc3JjJylcbiAgICAgIH1cbiAgICB9LFxuICAgIGRlZmluZToge1xuICAgICAgJ19fRU5BQkxFX1ZJU1VBTF9FRElUT1JfXyc6IEpTT04uc3RyaW5naWZ5KGlzVmlzdWFsRWRpdG9yKVxuICAgIH1cbiAgfTtcbn0pOyJdLAogICJtYXBwaW5ncyI6ICI7QUFBeU4sU0FBUyxvQkFBb0I7QUFDdFAsT0FBTyxXQUFXO0FBQ2xCLFNBQVMsZUFBZTtBQUZ4QixJQUFNLG1DQUFtQztBQUl6QyxJQUFPLHNCQUFRLGFBQWEsQ0FBQyxFQUFFLFNBQVMsS0FBSyxNQUFNO0FBQ2pELFFBQU0saUJBQWlCLFFBQVEsSUFBSSx5QkFBeUI7QUFDNUQsUUFBTSxRQUFRLFNBQVM7QUFFdkIsU0FBTztBQUFBLElBQ0wsU0FBUyxDQUFDLE1BQU0sQ0FBQztBQUFBLElBQ2pCLE1BQU07QUFBQSxJQUNOLFFBQVE7QUFBQSxNQUNOLE1BQU07QUFBQSxNQUNOLE1BQU07QUFBQSxNQUNOLEtBQUs7QUFBQSxRQUNILFNBQVM7QUFBQSxRQUNULFlBQVk7QUFBQSxRQUNaLE1BQU07QUFBQSxNQUNSO0FBQUEsSUFDRjtBQUFBLElBQ0EsU0FBUztBQUFBLE1BQ1AsTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLElBQ1I7QUFBQSxJQUNBLE9BQU87QUFBQSxNQUNMLFFBQVE7QUFBQSxNQUNSLFdBQVc7QUFBQSxNQUNYLFVBQVU7QUFBQSxNQUNWLFdBQVc7QUFBQSxNQUNYLGVBQWU7QUFBQSxRQUNiLFFBQVE7QUFBQSxVQUNOLGNBQWM7QUFBQSxZQUNaLGdCQUFnQixDQUFDLFNBQVMsV0FBVztBQUFBLFlBQ3JDLGlCQUFpQjtBQUFBLGNBQ2Y7QUFBQSxjQUNBO0FBQUEsY0FDQTtBQUFBLGNBQ0E7QUFBQSxZQUNGO0FBQUEsWUFDQSxhQUFhO0FBQUEsY0FDWDtBQUFBLGNBQ0E7QUFBQSxZQUNGO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsTUFDQSxlQUFlO0FBQUEsSUFDakI7QUFBQSxJQUNBLFNBQVM7QUFBQSxNQUNQLE9BQU87QUFBQSxRQUNMLEtBQUssUUFBUSxrQ0FBVyxLQUFLO0FBQUEsTUFDL0I7QUFBQSxJQUNGO0FBQUEsSUFDQSxRQUFRO0FBQUEsTUFDTiw0QkFBNEIsS0FBSyxVQUFVLGNBQWM7QUFBQSxJQUMzRDtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
