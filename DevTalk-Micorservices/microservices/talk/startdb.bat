@echo off
mkdir "%~dp0%db"
IF NOT defined %MONGO_HOME GOTO ERROR
"%MONGO_HOME%\bin\mongod.exe" --port 28556 --dbpath "%~dp0%db"
ECHO "User Service DB started!"
goto:eof

:ERROR
ECHO  "MONGO_HOME is not set" 
goto:eof