import angularEslintPlugin from "@angular-eslint/eslint-plugin";
import typescriptPlugin from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";
import angularTemplatePlugin from "@angular-eslint/eslint-plugin-template";
import templateParser from "@angular-eslint/template-parser";

export default [
    {
        files: ["*.ts"],
        languageOptions: {
            parser: typescriptParser,
        },
        plugins: {
            "@angular-eslint": angularEslintPlugin,
            "@typescript-eslint": typescriptPlugin,
        },
        rules: {
            // Angular rules
            "@angular-eslint/component-class-suffix": "error",

            // TypeScript rules
            "@typescript-eslint/no-unused-vars": "warn", 
            "@typescript-eslint/no-explicit-any": "warn", 
            "@typescript-eslint/explicit-function-return-type": "error"
        }
    },
    {
        files: ["*.html"],
        languageOptions: {
          parser: templateParser,
        },
        plugins: {
          "@angular-eslint/template": angularTemplatePlugin,
        }
      }
];
