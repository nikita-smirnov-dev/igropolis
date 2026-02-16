import { defineConfig } from "astro/config"
import relativeLinks from "astro-relative-links";
import icon from "astro-icon";

const isBackend = process.env.BUILD_ENV === "backend";

export default defineConfig({
  output: "static",
  compressHTML: !isBackend,
  outDir: "app",
  devToolbar: {
    enabled: false,
  },
  build: {
    inlineStylesheets: "never",
    assets: "assets",
  },
  integrations: [
    relativeLinks(),
    icon({
      iconDir: "src/assets/icons",
      svgoOptions: {
        plugins: [
          {
            name: "removeAttrs",
            params: { attrs: "(fill|stroke)" },
          },
          { name: "removeDimensions" },
        ],
      },
    }),
  ],
  vite: {
    build: {
      assetsInlineLimit: 1,
      minify: isBackend ? false : true,
      rollupOptions: {
        output: {
          entryFileNames: "js/main-[hash].js",
          assetFileNames: (assetInfo) => {
            const ext = assetInfo.name.split(".").pop();

            if (/css/i.test(ext)) {
              return "css/main-[hash][extname]";
            }

            if (/png|jpe?g|gif|svg|webp|avif/i.test(ext)) {
              return "img/[name]-[hash][extname]";
            }

            if (/woff2?|ttf|otf|eot/i.test(ext)) {
              return "fonts/[name]-[hash][extname]";
            }

            return "assets/[name]-[hash][extname]";
          },
        },
      },
    },
  },
});
