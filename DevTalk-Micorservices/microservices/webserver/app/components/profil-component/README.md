# Profil Component
Diese Komponente kann genutzt werden um das Profil eines Nutzer anzuzeigen und zu editieren.

## Benutzung

```html
<head>
    <!-- Importieren der Komponente und von webcomponents -->
    <script src="/bower_components/webcomponentsjs/webcomponents.js"></script>
    <link rel="import" href="/webcomponents/profil-component/profil-component.html"/>
    ...
</head>

<body>
<!--Nur einen Nutzer ansehen -->
 <profil-component user='{"name":"David", "email":"nospam@asd.de", "image": "/profile-card/profile.jpg"}' />

 <!--Einen Nutzer editiren-->
  <profil-component user='{"name":"David", "email":"nospam@asd.de", "image": "/profile-card/profile.jpg"}'
  editable
  onsave=' function (user)
  {
    console.info(user);
  }'/>

</body>
```
### Parameter
Im Folgenden sind die Parameter der Komponente definiert.
#### user
##### Type:
JSON
##### Beschreibung:
Der User im Json Format muss mit Folgenden Attributen übergeben werden:
```json
{
    name: Nutzername
    email: E-mail-Adresse des Nutzers
    image: Pfad zum Profilbild des Nutzers
}
```

#### editable (optional):
##### Type:
boolean
##### Beschreibung:
Das Attribut muss gesetzt werden, wenn der Nutzer editierbar sein soll.

#### onsave (optional):
##### Type:
function

##### Beschreibung:
Diese Funktion wird aufgerufen, wenn der Nutzer gespeichert wurde. Als Parameter wird der Nutzer übergeben mit den Attributen:
```json
{
        name: Nutzername
        email: E-mail-Adresse des Nutzers
        image: Pfad zum Profilbild des Nutzers
        password: Password des Nutzers
}
```



