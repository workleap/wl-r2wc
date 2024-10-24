import { defineBuildConfig } from "@workleap/tsup-configs";

export default defineBuildConfig({
    entry: ["src/index.ts"],
    outDir: "dist",
    //noExternal: [/^(?!react-dom\/client$|react-dom$).*/],
    noExternal: [/.*/],
    minify: true,
    treeshake: true
});
