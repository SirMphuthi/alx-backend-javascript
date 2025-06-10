module.exports = {
  // Define environment (Node.js for this project)
  env: {
    node: true, // Enables Node.js global variables and Node.js scoping
    es6: true,  // Enables ES6 features
  },
  // Extend recommended ESLint rules
  extends: [
    'eslint:recommended',
  ],
  // Parser options for JavaScript
  parserOptions: {
    ecmaVersion: 2017, // Supports ES2017 syntax (compatible with Node 12)
    sourceType: 'module', // Allows for the use of imports
  },
  // Specific rules for your project
  rules: {
    // Disable 'func-names' rule to avoid warnings for anonymous functions
    "func-names": "off",

    // Allow `console.log` (as it's used in 1-stdin.js)
    // Set to 'warn' if you want a warning, 'off' to disable completely
    "no-console": "off",

    // Ensure strict equality (===) is used instead of (==)
    "eqeqeq": ["error", "always"],

    // Prevent unused variables (set to 'warn' to catch them, 'off' if debugging)
    "no-unused-vars": ["warn", { "args": "none" }],

    // Prefer const/let over var
    "no-var": "error",
    "prefer-const": "error",

    // Require semicolons at the end of statements
    "semi": ["error", "always"],

    // Enforce single quotes for strings
    "quotes": ["error", "single"],

    // Add more rules as needed for your specific project's style guide
    // For example:
    // "indent": ["error", 2], // 2-space indentation
    // "comma-dangle": ["error", "always-multiline"], // Trailing commas
  },
  // Files and directories to ignore during linting
  // This mirrors what you put in .eslintignore for consistency
  ignorePatterns: [
    "ipaddr.js",
    "node_modules/",
    // You might also want to ignore other project directories that contain
    // code for different tasks if they have different linting requirements
    "0x00-ES6_basic/",
    "0x01-ES6_promise/",
    "0x02-ES6_classes/",
    "0x03-ES6_data_manipulation/",
    "0x04-TypeScript/",
  ],
};
