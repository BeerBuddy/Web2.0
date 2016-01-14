var connect = require('connect');
var serveStatic = require('serve-static');
var settings = require("../settings.json");
connect().use(serveStatic("app")).listen(settings.webServer.port);