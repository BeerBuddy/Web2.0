@Echo Off

:: Services starten

start %~dp0microservices\api-gateway\NpmStart.bat 
start %~dp0microservices\statistics\NpmStart.bat 
start %~dp0microservices\recommendation\NpmStart.bat
start %~dp0microservices\event\NpmStart.bat
start %~dp0microservices\user\NpmStart.bat
start %~dp0microservices\webserver\NpmStart.bat

echo Microservices gestartet
exit

