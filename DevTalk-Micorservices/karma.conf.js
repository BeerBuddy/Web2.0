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
<<<<<<< HEAD
	   'microservices/webserver/app/components/version/**/*.js',
      //'microservices/webserver/app/app.js',
      'microservices/webserver/app/view_*/**/*.js'
=======
      'microservices/webserver/app/app.js',
      'microservices/webserver/app/view_*/*/*.js'
>>>>>>> 25ca1585007107e3efc405dd4221f0eec1c5a01f
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
