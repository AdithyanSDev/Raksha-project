import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser"; // TypeScript parser for ESLint
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks"; // React hooks linting
import pluginJsxA11y from "eslint-plugin-jsx-a11y"; // Accessibility linting

export default [
  // Apply ESLint to JavaScript and TypeScript files in the project
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },

  // Set up language options for the frontend (browser environment)
  {
    languageOptions: {
      globals: globals.browser, // Browser global variables like `window`, `document`, etc.
      parser: tsParser, // Use TypeScript parser for TypeScript files
      ecmaVersion: 2021, // Support for modern JavaScript (ES2021)
      sourceType: "module", // Use ES module imports/exports
    }
  },

  // Base configurations for JavaScript and TypeScript
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,

  // React and React Hooks linting configurations
  pluginReact.configs.flat.recommended,
  pluginReactHooks.configs.recommended, // Enforce rules of hooks

  // Accessibility plugin for React (optional but recommended)
  pluginJsxA11y.configs.recommended,

  // Customize rules as per your preferences
  {
    rules: {
      "react/prop-types": "off", // Turn off PropTypes rule if using TypeScript
      "react/react-in-jsx-scope": "off", // Not required in React 17+ (automatic JSX runtime)
      "@typescript-eslint/no-unused-vars": "warn", // Warn for unused variables instead of error
      "no-console": "warn", // Allow console logs but show as warnings
      "@typescript-eslint/no-explicit-any": "off", // Allow use of `any` type (optional based on strictness)
      "jsx-a11y/no-noninteractive-element-interactions": "warn", // Accessibility rules for interactions
    },
  },
];
