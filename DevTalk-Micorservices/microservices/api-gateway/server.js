var http = require('follow-redirects').http,
    httpProxy = require('http-proxy'),
    url = require('url'),
	settings = require("../settings.json");

// http Server 
var proxy = new httpProxy.createServer();


	

var httpServer = http.createServer(function(req, res) {

            console.log('request received: ' + req.url);

            var userService = settings.userService.rest.protocol+'://'+settings.userService.rest.ip+':'+settings.userService.rest.port+'/';
            var statisticService = settings.statisticService.rest.protocol+'://'+settings.statisticService.rest.ip+':'+settings.statisticService.rest.port+'/';
            var recomendationService = settings.recomendationService.rest.protocol+'://'+settings.recomendationService.rest.ip+':'+settings.recomendationService.rest.port+'/';
            var eventService = settings.eventService.rest.protocol+'://'+settings.eventService.rest.ip+':'+settings.eventService.rest.port+'/';
            var emailService = settings.emailService.rest.protocol+'://'+settings.emailService.rest.ip+':'+settings.emailService.rest.port+'/';
            var webServer = settings.webServer.protocol+'://'+settings.webServer.ip+':'+settings.webServer.port+'/';

  var urlObj = url.parse(req.url);
            req.headers['host'] = urlObj.host;
            req.headers['url'] = urlObj.href;
			
proxy.on('error', function (err, req, res) {
  res.writeHead(503, {
    'Content-Type': 'text/plain'
  });
  res.end('Something went wrong. And we are reporting a custom error message.');
});

          
function sendRequest(urlObj, res, req, target){
		 proxy.proxyRequest(req, res, {
			host: urlObj.host,
			target: target + req.url,
			enable: {
				xforward: true
			}
		});
						
}


            if (req.url && req.url.toString().indexOf('/api') != -1) {    
                    if (req.url.toString().indexOf('/userService') != -1) {
                        req.url = req.url.replace('/api/userService','');
						sendRequest(urlObj, res, req, userService)
                       
                    } else if (req.url.toString().indexOf('/statisticService') != -1) {
                        req.url = req.url.replace('/api/statisticService','');
						sendRequest(urlObj, res, req, statisticService);
                       
                    } else if (req.url.toString().indexOf('/recomendationService') != -1) {
                        req.url = req.url.replace('/api/recomendationService','');
                       sendRequest(urlObj, res, req, recomendationService);
                    } else if (req.url.toString().indexOf('/eventService') != -1) {
                        req.url = req.url.replace('/api/eventService','');
						 console.log("redirct to: "+ req.url);
						 sendRequest(urlObj, res, req, eventService);
                        
                    } else if (req.url.toString().indexOf('/emailService') != -1) {
                        req.url = req.url.replace('/api/emailService','');
                        sendRequest(urlObj, res, req, emailService);
                    } else {
                        console.log(req.url + " has no endpoint");
						res.sendStatus(502);
                    }

                } else {
				  console.log(req.url + " to Webservice");
				  	 proxy.proxyRequest(req, res, {
			host: urlObj.host,
			target: webServer,
			enable: {
				xforward: true
			}
		});
                 }

            }); 
			
httpServer.listen(settings.apiGateway.port);