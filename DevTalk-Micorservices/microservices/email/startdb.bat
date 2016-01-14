@echo off
mkdir "%~dp0%db"
IF NOT defined %MONGO_HOME GOTO ERROR
"%MONGO_HOME%\bin\mongod.exe" --port 28555 --dbpath "%~dp0%db"
ECHO "EMail Service DB started!"
goto:eof

:ERROR
ECHO  "MONGO_HOME is not set" 
goto:eof