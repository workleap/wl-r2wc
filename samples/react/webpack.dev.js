// @ts-check

import { defineDevConfig } from "@workleap/webpack-configs";
import { join } from "path";
import { swcConfig } from "./swc.dev.js";

const __dirname = import.meta.dirname;

/**
 * @type {import("@workleap/webpack-configs").WebpackConfigTransformer}
 */
function virtualCdn(config) {
    config.devServer = {
        ...config.devServer,
        static:[{
            publicPath: "/",
            directory: join(__dirname, "public")
        }, {
            publicPath: "/cdn/movie-widgets",
            directory: join(__dirname, "../widgets/movie-widgets/dist/cdn")
        }]
    };

    return config;
}

export default defineDevConfig(swcConfig, {
    transformers:[virtualCdn]
});
