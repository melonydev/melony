import { defineConfig } from "tsup";

export default defineConfig((options) => {
	return {
		entry: {
			config: "src/config/index.ts",
			auth: "src/auth/index.ts",
			next: "src/next/index.ts",
			prisma: "src/prisma/index.ts",
			ui: "src/ui/index.ts",
		},
		tsconfig: "./tsconfig.json",
		format: ["esm", "cjs"],
		splitting: false,
		sourcemap: false,
		clean: true,
		minify: !options.watch,
		dts: true,
	};
});
