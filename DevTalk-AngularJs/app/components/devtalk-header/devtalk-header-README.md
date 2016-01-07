# DevTalk-Header

Der DevTalk-Header dient der Navigation auf der DevTalk-Website.

### Allgemein
Alle globalen Stylesheets sollten zuvor in der korrekten Reihenfolge eingebunden.
```html
<link rel="stylesheet" href="/styles/style.css" />
<link rel="stylesheet" href="/styles/mobile.css" />
```

### Header
Der Header erwartet als Eingabe ein `user` Objekt, welches von `UserService` abgefragt wird.

Durch die verschiedenen Nutzer-Rollen werden die entsprechenden Navigationselemente angezeigt.