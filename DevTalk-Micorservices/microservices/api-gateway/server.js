var http = require('follow-redirects').http,
    httpProxy = require('http-proxy'),
    url = require('url');

// http Server 
var proxy = new httpProxy.createServer({});

	

var httpServer = http.createServer(function(req, res) {

            console.log('request received: ' + req.url);

            var userService = 'http://localhost:8551/';
            var statisticService = 'http://localhost:8552/';
            var recomendationService = 'http://localhost:8553/';
            var eventService = 'http://localhost:8554/';
            var emailService = 'http://localhost:8555/';
            var webServer = 'http://localhost:8000/';

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
				   sendRequest(urlObj, res, req, webServer);
                 }

            }); 
			
httpServer.listen(8550);