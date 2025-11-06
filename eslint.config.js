// eslint.config.js
const js = require("@eslint/js");
const nodePlugin = require("eslint-plugin-node");

module.exports = [
  js.configs.recommended,
  // safe access to the node plugin flat config
  (nodePlugin.configs && nodePlugin.configs["flat/recommended"]) || {},
  {
    // project-level rules
    rules: {
      "node/no-missing-import": "off", // adjust as needed
    },
  },
  {
    // language options: treat files as CommonJS and expose common Node/test globals
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "script", // CommonJS (so require/module/exports/etc are expected)
      globals: {
        // Node globals
        require: "readonly",
        module: "readonly",
        exports: "readonly",
        process: "readonly",
        console: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
        Buffer: "readonly",
        setTimeout: "readonly",
        clearTimeout: "readonly",
        setInterval: "readonly",
        clearInterval: "readonly",
        // Common test globals (Mocha/Jest)
        describe: "readonly",
        it: "readonly",
        test: "readonly",
        before: "readonly",
        after: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
      },
    },
    rules: {
      "no-unused-vars": "warn",
      "no-console": "off",
    },
  },
];
 