module.exports = function(config){
  config.set({


	//TODO add all Tests from microservices here
    basePath : './',

    files : [
      'microservices/webserver/app/bower_components/angular/angular.js',
      'microservices/webserver/app/bower_components/angular-resource/angular-resource.js',
      'microservices/webserver/app/bower_components/angular-route/angular-route.js',
      'microservices/webserver/app/bower_components/angular-mocks/angular-mocks.js',
      'microservices/webserver/app/bower_components/Chart.js/Chart.js',
	  'microservices/webserver/app/bower_components/angular-chart.js/angular-chart.js',
      'microservices/webserver/app/components/services/**/*.js',
      'microservices/webserver/app/app.js',
      'microservices/webserver/app/view_*/*/*.js'
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};
