# DevTalk...
##### ...mit Microservices und API Gateway und MongoDB und Mongoose und Schokolade und Keks

- User Service: samizel
- Event Service: davidgri
- Recommendation Service: feress
- E-Mail Service: MaHoel
- Statistics Service: ehhc

## How to start this bumms
Update eines jeden Services über `npm update`. Dann mit `start.bat` gesamte Anwendung starten.
URL: http://localhost:8000/app/index.html


## Hinzufügen eines neuen Services
Jeder Microservice hat seinen eigenen Ordner in /micorservices/ mit eigenen npm-Abhängigkeiten.

1. Neuer Ordner in /microservices/ anlegen
2. npm init ausführen
3. start.bat erweitern (übergeordneter Ordner)
4. API-Gateway (/microservices/api-gateway/server.js) um redirect zu eigenem Service erweitern
5. Eigene REST-API schreiben mit MEAN-Stack
6. Anuglar-Services aus der Web-App umschreiben, sodass sie gegen das API-Gateway laufen

## MongoDB
MongoDB muss lokal installiert sein. Zum Befüllen mit Testdaten wird es irgendwann ein Skript geben.
