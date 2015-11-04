# Web2.0

## Getting started
1. Install node: https://nodejs.org

2. Go into the DevTalk-LightWeight folder

3. Dependencies für Node in package.json zusammengeführt daher braucht man nur noch ein npm update. Neue Dependencies mit --save in der package.json speichern
	
	npm update

4. Frontend Dependencies mit bower update holen. Neue Dependencies mit --save in der bower.json speichern
	
	// sollte Bower nicht global installiert sein:
	
	node_modules\.bin\bower update

	// sollte Bower global installiert sein:
	
	bower update

5. Run server. server.js ist in package.json angegeben

	npm start

6. You can now go to http://localhost:8080/index.html

## Troubleshooting
1. Es könnte sein das Bower Probleme macht, dann muss man GIT installieren und bei der Installation dem PATH hinzufügen lassen

	https://git-for-windows.github.io/ 
