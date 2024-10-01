import { defineBuildConfig } from "@workleap/tsup-configs";

export default defineBuildConfig({
    entry: ["src/index.ts"],
    outDir: "dist",
    noExternal: [/.*/],
    minify: true,
    treeshake: true
});
