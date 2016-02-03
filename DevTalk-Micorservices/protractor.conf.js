exports.config = {
  allScriptsTimeout: 11000,

  //TODO add all e2e from microservices here 
  specs: [
    'microservices/*/e2e-tests/*.js'
  ],

  capabilities: {
    'browserName': 'chrome'
  },

  baseUrl: 'https://localhost:8000/',

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
