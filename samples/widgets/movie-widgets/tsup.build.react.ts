import { defineBuildConfig } from "@workleap/tsup-configs";

export default defineBuildConfig({
    entry: ["src/helpers/react/index.ts"],
    outDir: "dist/react",
    dts: true,
    clean: true,
    sourcemap: true
});
