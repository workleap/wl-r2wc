import { defineBuildConfig } from "@workleap/tsup-configs";

export default defineBuildConfig({
    entry: ["src/index.ts"],
    outDir: "dist/cdn",
    noExternal: [/.*/],
    dts: false,
    minify: true,
    treeshake: true
});
