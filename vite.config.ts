import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
import path from "path";
import typescript from "@rollup/plugin-typescript";

const resolvePath = (str: string) => path.resolve(__dirname, str);

const isProd = process.env.NODE_ENV === "production";

export default defineConfig({
  build: {
    lib: {
      entry: resolvePath("lib/xstate.ts"),
      name: "zustand-middleware-xstate",
      fileName: (format) => `xstate.${format}.js`,
    },
    rollupOptions: {
      external: ["zustand", "xstate"],
      output: {
        globals: {
          xstate: "xstate",
        },
      },
    },
  },
  plugins: [
    !isProd && reactRefresh(),
    isProd &&
      typescript({
        rootDir: resolvePath("lib"),
        declaration: true,
        declarationDir: resolvePath("dist"),
        exclude: resolvePath("node_modules/**"),
      }),
  ].filter(Boolean),
});
