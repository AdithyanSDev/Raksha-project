import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser"; // TypeScript parser for ESLint
import pluginNode from "eslint-plugin-node"; // Node.js specific linting rules

export default [
  // Apply to all JavaScript and TypeScript files
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  
  // Use appropriate environment (Node.js and browser if needed)
  { 
    languageOptions: { 
      globals: globals.node, // Use Node.js environment globals (you can add browser here if it's a full-stack shared config)
      parser: tsParser, // Use TypeScript parser for TypeScript files
      ecmaVersion: 2021, // ES2021 for modern JavaScript
      sourceType: "module" // Use ES module imports/exports
    } 
  },

  // Base JavaScript and TypeScript recommended rules
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,

  // Optional: Add Node.js plugin for Node-specific linting rules
  pluginNode.configs.recommended,
  
  // Add support for React if using React in backend (optional)
  pluginReact.configs.flat.recommended,

  // Customize rules to suit your needs
  {
    rules: {
      "no-console": "off", // Allow `console.log` for debugging
      "no-unused-vars": "warn", // Warn for unused variables instead of error
      "@typescript-eslint/no-unused-vars": "warn", // Same for TypeScript
      "@typescript-eslint/no-explicit-any": "off", // Allow use of `any` type (optional, depending on how strict you want to be)
      "node/no-unsupported-features/es-syntax": "off", // Disable if using ES module imports (import/export)
      "node/no-missing-import": "off", // Turn off this rule if it incorrectly flags TypeScript imports
    },
  },
];
