import { defineBuildConfig } from "@workleap/tsup-configs";

export default defineBuildConfig({
    entry: ["src/core/index.ts", "src/react-helpers/index.ts"],
    outDir: "dist",
    dts: true,
    clean: true,
    sourcemap: true
});
