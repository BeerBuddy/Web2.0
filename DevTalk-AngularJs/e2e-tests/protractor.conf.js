exports.config = {
  allScriptsTimeout: 11000,

  specs: [
    '*.js'
  ],

  capabilities: {
    'browserName': 'chrome'
  },

  baseUrl: 'http://localhost:8000/app/',

  framework: 'jasmine',
 onPrepare: function() {      
    require('jasmine-reporters');
     var jasmineReporters = require('jasmine-reporters');
    jasmine.getEnv().addReporter(
        new jasmineReporters.JUnitXmlReporter({
          consolidateAll: true,
          savePath: 'testresults',
          filePrefix: 'xmloutput'
      })
    );

  },

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  }
};
