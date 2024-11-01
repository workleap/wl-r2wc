import { defineBuildConfig } from "@workleap/tsup-configs";

export default defineBuildConfig({
    entry: ["src/helpers/react/index.ts"],
    outDir: "dist/react",
    // tsconfig: "tsconfig.build.react.json",
    dts: true,
    clean: true,
    sourcemap: true
});
