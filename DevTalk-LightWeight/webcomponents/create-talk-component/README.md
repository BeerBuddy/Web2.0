# Create-Talk-Component
Diese Komponente kann genutzt werden um einen Talk, also eine Veranstaltung, zu editieren oder neu zu erstellen.

## Benutzung

```html
<head>
    <!-- Importieren der Komponente und von webcomponents -->
    <script src="/bower_components/webcomponentsjs/webcomponents.js"></script>
    <link rel="import" href="/webcomponents/create-talk-component/create-talk-component.html""/>
    ...
</head>

<body>
	<create-talk-component 
		talk='{"name":"ABAP für Fortgeschrittene", "place":"Walldorf", "start":"2016-04-01", "end":"2016-01-08", "categorie":"2"}'/>
</body>
```
### Parameter
Im Folgenden sind die Parameter der Komponente definiert.
#### talk
##### Type:
JSON
##### Beschreibung:
Der Talk im JSON-Format muss mit den folgenden Attributen übergeben werden:
```json
{
    name: Bezeichnung der Veranstaltung (String)
    place: Veranstaltungsort (String)
    start: Beginndatum der Veranstaltung (Datumsformat yyyy-mm-tt)
	end: Endedatum der Veranstaltung (Datumsformat yyyy-mm-tt)
	categorie: Veranstaltungskategorie (Zahlenwert)
}
```