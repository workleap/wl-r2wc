import { defineBuildConfig } from "@workleap/tsup-configs";

export default defineBuildConfig({
    entry: [ "src/index.ts", "src/helpers/react/index.ts" ],
    outDir: "dist",
    dts: true,
    clean: true,
    sourcemap: true
});
