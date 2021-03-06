module.exports = {
  env: {
    browser: true,
  },
  extends: "plugin:vue/essential",
  parserOptions: {
    ecmaVersion: 13,
    parser: "@typescript-eslint/parser",
    sourceType: "module",
  },
  plugins: ["vue", "@typescript-eslint"],
  rules: {},
};
