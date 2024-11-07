import { defineConfig } from "tsup";

export default defineConfig((options) => {
	return {
		entry: {
			button: "src/components/ui/button.tsx",
			"app-shell": "src/components/app-shell.tsx",
			navigation: "src/components/navigation.tsx",
			"data-table": "src/components/data-table.tsx",
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
