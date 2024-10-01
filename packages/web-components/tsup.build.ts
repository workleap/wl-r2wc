import { defineBuildConfig } from "@workleap/tsup-configs";

export default defineBuildConfig({
    entry: ["src/index.ts", "src/styles.css"],
    outDir: "dist",
    noExternal: [/.*/],
    // minify: true,
    treeshake: true
});
