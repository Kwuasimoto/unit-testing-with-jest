/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

module.exports = {
  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  // The directory where Jest should output its coverage files
  coverageDirectory: "coverage",

  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: "v8",

  // The default configuration for fake timers
  fakeTimers: {
    "enableGlobally": true
  },

  // Automatically reset mock state before every test
  resetMocks: true,

  // The root directory that Jest should scan for tests and modules within
  rootDir: "__test__",
};
