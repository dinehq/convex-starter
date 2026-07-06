import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import convexPlugin from "@convex-dev/eslint-plugin";
import betterTailwindcss from "eslint-plugin-better-tailwindcss";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // Global ignores
  {
    ignores: ["dist", "convex/_generated", "src/routeTree.gen.ts"],
  },

  // Base TypeScript config for all TS/TSX files
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommendedTypeChecked,
    ],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // Only warn on unused variables, and ignore those prefixed with `_`.
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          varsIgnorePattern: "^_",
          argsIgnorePattern: "^_",
          caughtErrors: "none",
        },
      ],
      // Convex's generated API types are intentionally loose; these produce
      // false positives across query/mutation calls.
      "@typescript-eslint/no-unsafe-argument": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-unsafe-return": "off",
    },
  },

  // React Hooks — all src files
  {
    files: ["src/**/*.{ts,tsx}"],
    plugins: {
      "react-hooks": reactHooks,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
    },
  },

  // React Fast Refresh — exclude route files (the router plugin owns their HMR)
  {
    files: ["src/**/*.{ts,tsx}"],
    ignores: ["src/routes/**"],
    plugins: {
      "react-refresh": reactRefresh,
    },
    rules: {
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  },

  // Tailwind: rewrite non-canonical classes (e.g. mt-[16px] → mt-4) via
  // `eslint --fix` (part of `pnpm fix`) and editor fix-on-save
  {
    files: ["src/**/*.{ts,tsx}"],
    plugins: {
      "better-tailwindcss": betterTailwindcss,
    },
    rules: {
      "better-tailwindcss/enforce-canonical-classes": "warn",
    },
    settings: {
      "better-tailwindcss": {
        entryPoint: "src/styles.css",
      },
    },
  },

  // Convex rules (applies to convex/)
  ...convexPlugin.configs.recommended,
]);
