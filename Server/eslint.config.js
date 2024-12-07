import js from "@eslint/js";
import globals from "globals";
import promisePlugin from "eslint-plugin-promise";
/**@type {import("eslint").Linter.Config[]} */

export default [
    js.configs.recommended,
    {
        languageOptions: {
            globals: globals.node,
        },
        plugins: {
            promise:promisePlugin,
        },
        rules: {
            "no-undef": "error",
            "no-unused-vars": "warn",
            "prefer-const": "warn",
            "require-await": "error",
        },
    },
];
