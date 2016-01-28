(function() {
'use strict';
var app = angular.module('DevTalk.admin', []);

app.factory('EmailService', [function () {
	function checkEmail(adr) {
	  var rx = /^([^\s@,:"<>]+)@([^\s@,:"<>]+\.[^\s@,:"<>.\d]{2,}|(\d{1,3}\.){3}\d{1,3})$/;
	  var part = adr.value.match(rx);
	  if(part && part[2].indexOf('..')==-1){
		alert("GUT");
	  }
	  else {
		alert("Schlecht");
	  }
	}
}]);
})();
