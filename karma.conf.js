module.exports = function (config) {
  config.set({
    frameworks: ["jasmine", "@angular-devkit/build-angular"],
    plugins: [
      require("karma-jasmine"),
      require("karma-chrome-launcher"),
      require("karma-coverage"),
      require("@angular-devkit/build-angular/plugins/karma"),
      require("karma-spec-reporter"),
    ],
    reporters: ["spec", 'progress'],
    specReporter: {
      maxLogLines: 5,
      suppressSkipped: true,
      showSpecTiming: true,
    },
    coverageReporter: {
      dir: require("path").join(__dirname, "./coverage/resultTest"),
      subdir: ".",
      reporters: [{ type: "html" }, { type: "text-summary" }],
    },
    browsers: ["ChromeHeadless"],
    restartOnFileChange: true,
  });
};
