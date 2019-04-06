module.exports = {
  "extends": ["airbnb-base", "prettier"],
  "plugins": ["prettier", "jest"],
  "rules": {
    "prettier/prettier": ["error", {
      "singleQuote": true
    }],
    "linebreak-style": 0,
    "no-trailing-spaces": 0
  },
  "env": {
    "jest/globals": true
  }
};