module.exports = {
  root: true,

  env: {
    node: true,
  },
<<<<<<< HEAD

  extends: ["plugin:vue/recommended"],

=======
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended',
    '@vue/typescript/recommended'
  ],
>>>>>>> 720e88bcf910c67baacf00510dfc30d47797bfef
  parserOptions: {
    ecmaVersion: 2020,
  },

  rules: {
    "no-useless-escape": 0,
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
  },

  extends: [
    "plugin:vue/recommended",
    "plugin:vue/essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
  ],

  extends: [
    "plugin:vue/recommended",
    "plugin:vue/essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "@vue/prettier",
    "@vue/prettier/@typescript-eslint",
  ],
};
