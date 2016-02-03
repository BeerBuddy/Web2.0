# Create-Talk-Component
Diese Komponente kann genutzt werden um einen Talk zu erstellen, zu editieren oder abzusagen.

## Benutzung

```html
<head>
    <!-- Importieren der Komponente und von webcomponents -->
    <script src="/bower_components/webcomponentsjs/webcomponents.js"></script>
    <link rel="import" href="/webcomponents/create-talk-component/create-talk-component.html""/>
    ...
</head>

<body>
	<create-talk-component />
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
    ort: Veranstaltungsort (String)
    beschreibung: Veranstaltungsbeschreibung (String)
    datumVon: Beginndatum der Veranstaltung (Datumsformat yyyy-mm-tt)
    datumBis: Endedatum der Veranstaltung (Datumsformat yyyy-mm-tt)
    kategorie: Veranstaltungskategorie (String)
    kapazitaet: Anzahl Plätze (Zahlenwert)
}
```