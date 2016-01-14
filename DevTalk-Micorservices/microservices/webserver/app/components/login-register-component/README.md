# Login-Register Component
Diese Komponente kann verwendet werden um dem Nutzer die Möglichkeit des Login/Register zu geben.

## Benutzung

```html
<head>
    <!-- Importieren der Komponente und von webcomponents -->
    <script src="/bower_components/webcomponentsjs/webcomponents.js"></script>
    <link rel="import" href="webcomponents/login-register-component/login-register-component.html"/>
    ...
</head>

<body>
    <!-- Login-Register-Component einbinden -->
    <login-register-component></login-register-component>

</body>
```
### Parameter
Im Folgenden sind die Parameter der Komponente definiert.
#### login_action (optional)
##### Type:
String
##### Default:
```html
/login
```
##### Beschreibung:
Pfad zur Login Action übergeben
```html
<login-register-component login_action='/loginz'></login-register-component>
```

#### register_action (optional)
##### Type:
String
##### Default:
```html
/register
```
##### Beschreibung:
Pfad zur Register Action übergeben
```html
<login-register-component register_action='/registerz'></login-register-component>
```




