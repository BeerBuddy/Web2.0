# DevTalk-Footer

Der DevTalk-Footer dient der Navigation auf der DevTalk-Website.

### Allgemein
Alle Stylesheets müssen in der korrekten Reihenfolge eingebunden.
```html
<link rel="stylesheet" href="/styles/style.css" />
<link rel="stylesheet" href="/styles/mobile.css" />
```

### Footer
Der Footer erwartet als Eingabe ein `user` Objekt, dieses wird genutzt um zu entscheiden, welche Navigations-Elemente angezeigt werden.

**Beispiel:**
```html
<devtalk-footer user='{"role": "USER"}'></devtalk-footer>
```

Alternative Rolle wäre `ADMIN`, wodurch auch Zugriff auf administrative Seiten gewährt wird.

###Allgemeine Links
Unabhängig von der Rolle des übergebenen Users werden Links zu den Seiten für die AGBs und das Impressum jederzeit angezeigt. 
