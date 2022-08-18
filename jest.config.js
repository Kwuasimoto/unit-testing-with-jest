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

  // Enables fake timers so timers work as expect
  // fakeTimers: {'enableGlobally': true},

  // The root directory that Jest should scan for tests and modules within
  rootDir: "__test__",

  // Where coverage's will be outputted
  coverageReporters: ["text", "json", "html"]
};
