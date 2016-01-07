module.exports = function(config){
  config.set({

   basePath : './',

    files : [
      'app/bower_components/angular/angular.js',
      'app/bower_components/angular-route/angular-route.js',
      'app/bower_components/angular-mocks/angular-mocks.js',
      'app/components/services/**/*.js',
      'app/app.js',
      'app/view_*/**/*.js'
      //, 'app/**/*.es6'
    ],

    autoWatch : true,

    frameworks: ['jasmine', 'browserify'],

    preprocessors: {
      //'app/components/services/RecommendationService.js': ['browserify'],
      'app/**/*.es6': ['browserify']
    },

    browserify: {
      debug: true,
      transform: [
        'babelify'
      ]
    },

    browsers : ['Chrome']
  });
};