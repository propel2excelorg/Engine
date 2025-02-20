/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ['@engine/eslint-config/base'],
  parserOptions: {
    tsconfigRootDir: __dirname,
  },
};
