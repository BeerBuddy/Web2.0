/*jshint esversion: 6 */

var https = require('follow-redirects').https,
    httpProxy = require('http-proxy'),
    url = require('url'),
    request = require('request');
    settings = require("../settings.json"),
    fs = require("fs"),
	  cert = fs.readFileSync('../server.cer'),  // get private key
	  jwt = require('jsonwebtoken');

const userService = settings.userService.rest.protocol+'://'+settings.userService.rest.ip+':'+settings.userService.rest.port+'/';
const statisticService = settings.statisticService.rest.protocol+'://'+settings.statisticService.rest.ip+':'+settings.statisticService.rest.port+'/';
const recomendationService = settings.recommendationService.rest.protocol+'://'+settings.recommendationService.rest.ip+':'+settings.recommendationService.rest.port+'/';
const eventService = settings.eventService.rest.protocol+'://'+settings.eventService.rest.ip+':'+settings.eventService.rest.port+'/';
const emailService = settings.emailService.rest.protocol+'://'+settings.emailService.rest.ip+':'+settings.emailService.rest.port+'/';
const webServer = settings.webServer.protocol+'://'+settings.webServer.ip+':'+settings.webServer.port+'/';

//set up the proxy server
var proxy = new httpProxy.createServer();
// http Server

const options = {
  pfx: fs.readFileSync('serverSSL.p12'),
  passphrase: "devtalkpasswd"
};

var httpsServer = https.createServer(options, function(req, res) {

  console.log('request received: ' + req.url);
  var urlObj = url.parse(req.url);
  req.headers.host = urlObj.host;
  req.headers.url = urlObj.href;

  proxy.on('error', function (err, req, res) {
    res.writeHead(503, {
      'Content-Type': 'text/plain'
    });
    res.end('Something went wrong. And we are reporting a custom error message.');
  });


  function sendRequest(urlObj, res, req, target, callbackfunction){
  	 proxy.proxyRequest(req, res, {
  		host: urlObj.host,
  		target: target,
  		enable: {
  			xforward: true
  		}
  	});
  }

  // could be used to intercept the response of the target server and
  // duplicate it to an other server
  function interceptResponse(res, newTargetUrl){
    res.oldWrite = res.write;
    res.write = function(data) {
      // gets the data from the target server
      try {
        if(res.statusCode >= 200 && res.statusCode <= 299){
          var dataObject = JSON.parse(data.toString('UTF8'));
          if(dataObject !== null && dataObject !== undefined){
            // send data to the new server
            request.post(
              newTargetUrl,
              {
                form: dataObject
              } ,
              function (error, response, body) {
                if (!error && response.statusCode == 200) {
                  console.log('response succesful redircted - ', response.statusCode);
                } else {
                  console.log('error while redirecting the response: ', error);
                }
              }
            );
          }
        }
      } catch (e) {
        console.error(e);
      }
      res.oldWrite(data);
    };
  }
  //check user token
  // route middleware to verify a token


  // check header for token
  var token = req.headers['x-access-token'];
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, cert, function(err, decoded) {
      if (err) {
        return res.status(401).json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        // if everything is good, save to request for use in other routes
    		//console.log("set User: ");
    		//console.log(JSON.stringify(decoded.user));
        req.headers.user = JSON.stringify(decoded.user);
    		redirect(req,res);
      }
    });
  }
  else{
    // necessary because otherwise everyone has to check if user !== undefined
    // before the role of the user can be accessed
    req.headers.user = JSON.stringify({});
    //console.log('no token provided');
    redirect(req,res);
  }

 function redirect(req,res){
   //handle and redirct requests
    if (req.url && req.url.toString().indexOf('/api') != -1) {
      // requests for the user service
      if (req.url.toString().indexOf('/userService') != -1) {
  		    req.url = req.url.replace('/api/userService','');
          if(req.url.toString().indexOf('/login') != -1){
            interceptResponse(res, (statisticService + 'events/login'));
          }
  	      sendRequest(urlObj, res, req, userService);
      }
  	  //requests for the statistic service
      else if (req.url.toString().indexOf('/statisticService') != -1) {
  		  req.url = req.url.replace('/api/statisticService','');
        sendRequest(urlObj, res, req, statisticService);
      }
      // requests for the recomendation service
      else if (req.url.toString().indexOf('/recommendationService') != -1) {
        req.url = req.url.replace('/api/recommendationService','');
        sendRequest(urlObj, res, req, recomendationService);
      }
      // requests for the event service
      else if (req.url.toString().indexOf('/eventService') != -1) {
        req.url = req.url.replace('/api/eventService','');
        console.log("redirct to: "+ req.url);
        sendRequest(urlObj, res, req, eventService);
      }
      // requests for the email service
      else if (req.url.toString().indexOf('/emailService') != -1) {
        req.url = req.url.replace('/api/emailService','');
        sendRequest(urlObj, res, req, emailService);
      }
      // reuqests for none of the above services
      else {
        console.log(req.url + " has no endpoint");
        res.writeHead(502, {'Content-Type': 'text/plain'});
        res.end(req.url + " has no endpoint");
      }
    // requests that do not match the url /api/*
    } else {
      //stop spamming.... console.log(req.url + " to webServer");
      sendRequest(urlObj, res, req, webServer);
    }
  }
});
httpsServer.listen(settings.apiGateway.port, function() {
  console.log('API Gateway running at '+ settings.apiGateway.protocol+'://'+settings.apiGateway.ip+':'+settings.apiGateway.port+'/');
});
