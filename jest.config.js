module.exports = {
    preset: 'ts-jest',
    testEnvironment: "jsdom",
    transform: {
        "\\.js$": "<rootDir>/node_modules/babel-jest"
     },
     moduleNameMapper: {
        'src/(.*)$': '<rootDir>/src/$1',
        "\\.(css|sass)$": "identity-obj-proxy",
    },
  }
  