import { defineConfig } from "vite";

export default defineConfig({
  base: "/gordon-lightfoot-project/",
  build: {
    rollupOptions: {
      input: {
        main: "index.html",
        epk: "epk.html",
        stagePlot: "stage-plot.html"
      }
    }
  }
});
