import { defineConfig } from "tsup";

export default defineConfig((options) => {
	return {
		entry: ["src/index.ts"],
		tsconfig: "./tsconfig.json",
		format: ["esm", "cjs"],
		splitting: false,
		sourcemap: false,
		clean: true,
		minify: !options.watch,
		dts: true,
	};
});
