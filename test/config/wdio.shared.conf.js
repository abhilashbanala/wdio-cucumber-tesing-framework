const path = require('path');
const defaultTimeoutInterval = process.env.DEBUG ? (60 * 60 * 500) : 90000;
const {
  getEnvironmentVariables,
  getTags,
  getFeatures
} = require('../../utilities/conf-utils');

exports.config = {
  vars: getEnvironmentVariables(),
  runner: 'local',
  specs: getFeatures(),
  // exclude: ['path/to/excluded/files'],
  outputDir: path.resolve(__dirname, '../../logs'),
  bail: 0,
  waitforTimeout: 10000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,
  framework: 'cucumber',
  reporters: [
    'spec',
    ['allure', {
      outputDir: './reports/allure-results',
      disableWebdriverStepsReporting: true,
      disableWebdriverScreenshotsReporting: true,
    }],
    ['json', {
      outputDir: './reports/json-results'
    }],
    ['junit', {
      outputDir: './reports/junit-results',
      outputFileFormat: function (options) {
        return `results-${options.cid}.${options.capabilities}.xml`
      }
    }],
  ],

  cucumberOpts: {
    requireModule: ['@babel/register'],
    require: ['./test/stepDefinitions/**/*.js'],
    backtrace: true,
    //compiler: ['js:babel-core/register'], // <string[]> filetype:compiler used for processing required features
    compiler: [],
    failAmbiguousDefinitions: true,
    dryRun: false,
    failFast: false,
    ignoreUndefinedDefinitions: false,
    name: [],
    snippets: true,
    format: ['pretty'],
    colors: true,
    snippets: false,
    source: false,
    profile: [],
    strict: true,
    tagExpression: getTags(),
    timeout: defaultTimeoutInterval,
    tagsInTitle: false,
    snippetSyntax: undefined,
  },

  // =====
  // Hooks
  // =====
  // onPrepare: function (config, capabilities) {
  // },
  // onWorkerStart: function (cid, caps, specs, args, execArgv) {
  // },
  // beforeSession: function (config, capabilities, specs) {
  // },
  // before: function (capabilities, specs) {
  // },
  // beforeCommand: function (commandName, args) {
  // },
  // beforeSuite: function (suite) {
  // },
  // beforeTest: function (test, context) {
  // },
  // beforeHook: function (test, context) {
  // },
  // afterHook: function (test, context, { error, result, duration, passed, retries }) {
  // },
  // afterTest: function(test, context, { error, result, duration, passed, retries }) {
  // },

  before: function () {
    /**
     * Setup the Chai assertion framework
     */
    const chai = require('chai');
    global.expect = chai.expect;
    global.assert = chai.assert;
    global.should = chai.should();
  },
  // after: function (capabilities, specs) {
  //   //do your stuff
  // },
  // beforeStep: function (stepResult) {
  //     //do your stuff
  // },
  // afterStep: function (stepResult) {
  //     //do your stuff
  // },
  // beforeFeature: function (feature) {
  //     //do your stuff
  // },
  // afterFeature: function (feature) {
  //     //do your stuff
  // },
  // beforeScenario: function (scenario) {
  //     //do your stuff
  // },
  // afterScenario: function (scenarioResult) {
  //     //do your stuff
  // },
};
