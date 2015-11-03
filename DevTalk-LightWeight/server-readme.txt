0. Install node: https://nodejs.org

1. Dependencies für Node in package.json zusammengeführt daher braucht man nur noch ein npm update. Neue Dependencies mit --save in der package.json speichern
	npm update

2. Frontend Dependencies mit bower update holen. Neue Dependencies mit --save in der bower.json speichern
	// sollte Bower nicht global installiert sein:
	node_modules\.bin\bower update

	// sollte Bower global installiert sein:
	bower update

3. Run server. server.js ist in package.json angegeben
	npm start

4. You can now go to http://localhost:8080/index.html