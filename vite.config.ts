import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
import path from "path";
import typescript from "@rollup/plugin-typescript";

const resolvePath = (str: string) => path.resolve(__dirname, str);

const isProd = process.env.NODE_ENV === "production";

const devConfig = defineConfig({
  plugins: [reactRefresh()],
  build: {
    outDir: "dist-demo",
  },
  base: "/zustand-middleware-xstate/",
});

const prodConfig = defineConfig({
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
    typescript({
      rootDir: resolvePath("lib"),
      declaration: true,
      declarationDir: resolvePath("dist"),
      exclude: resolvePath("node_modules/**"),
    }),
  ],
});

export default isProd ? prodConfig : devConfig;
