# DevTalk-Header

Der DevTalk-Header dient der Navigation auf der DevTalk-Website.

### Allgemein
Alle Stylesheets müssen in der korrekten Reihenfolge eingebunden.
```html
<link rel="stylesheet" href="/styles/style.css" />
<link rel="stylesheet" href="/styles/mobile.css" />
```

### Header
Der Header erwartet als Eingabe ein `user` Objekt, anhand erkannt wird, auf welche Seiten der Nutzer Zugriff hat.

**Beispiel:**
```html
<devtalk-header user='{"role": "USER"}'></devtalk-header>
```

Alternative Rolle wäre `ADMIN`, worudch Zugriff auf administrative Seiten gewährt wird.

##### Scrolling
Standardmäßig ist der Header relativ hoch, das Bild im Hintergrund ist gut erkennbar. Um den Header komprimiert darzustellen, wird der `initialstate="main-header-collapsed"` gesetzt. Außerdem stehen die Methoden `collapse()` und `expand()` bereit, um den Header aus- bzw. einzuklappen.

Mittels der [Waypoint API](http://imakewebthings.com/waypoints/) kann zudem der Header beim Scrollen eingefahren werden. Dazu wird folgendes benötigt:

```html
<script src="noframework.waypoints.min.js"></script>
<script>
	var waypoint = new Waypoint({
	  element: document.getElementById('main-content'),
	  handler: function(direction) {
		var devTalkHeader = document.querySelector("devtalk-header");
		if(direction == "down") {
			devTalkHeader.collapse();
		} else {
			devTalkHeader.expand();
		}
	  }
	});
</script>
```
