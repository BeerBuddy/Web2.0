@Echo Off

:: Services starten
start node microservices/api-gateway/server.js
start node microservices/statistics/server.js
start node microservices/recommendation/server.js
start node microservices/event/server.js
start %~dp0microservices\user\startScript.bat

echo Microservices gestartet

:: Web-App starten
npm start