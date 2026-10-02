import { runBuildCommand } from "@serwist/cli";
import { serwist } from "@serwist/next/config";

const cwd = process.cwd();

const config = await serwist(
  {
    swSrc: "src/app/sw.ts",
    swDest: "out/sw.js",
    injectionPoint: "self.__SW_MANIFEST",
    // esbuild `define` only replaces globals, so the injection point must stay
    // a global member expression in src/app/sw.ts.
    esbuildOptions: {
      minify: false,
    },
  },
  undefined,
  { cwd, isDev: false },
);

await runBuildCommand({ config, watch: false });

console.log("[serwist] service worker written to out/sw.js");
