import globals from "globals";
import eslint from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";
import prettier from "eslint-plugin-prettier";

export default [
    {
        files: ["src/**/*.ts"],
    },
    {
        ignores: ["dist/**", "node_modules/**"],
    },
    {
        languageOptions: {
            globals: {
                ...globals.browser,
                process: "readonly",
            },
            parser: tsparser,
            parserOptions: {
                ecmaVersion: "latest",
                sourceType: "module",
            },
        },
    },
    eslint.configs.recommended,
    {
        plugins: {
            "@typescript-eslint": tseslint,
            prettier: prettier,
        },
        rules: {
            semi: ["warn", "always"],
            quotes: ["warn", "double"],
            "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
            "no-unused-vars": "off",
            "prettier/prettier": "warn",
        },
    },
];
