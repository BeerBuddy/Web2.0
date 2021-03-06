#RESTful Microservice for Events and their Kategories

The service always expects and returns Content-Type: application/json

##Events
An Event has the following Schema:
```json
{ 
"_id": "String (Id generated by MongoDB)",
"name": "String",
"ort": "String",
"datumVon": "Date",
"datumBis": "Date",
"kategorie": "String",
"beschreibung": "String",
"teilnehmer": "[String]",
"warteliste": "[String]",
"kapazitaet": "Number",
"__v": "Number (Versionnumber incremented by Mongo)"
}
```

###GET events/
Request to get all Events retuns all Events

###POST events/ application/json
Request to save a new Events retuns the inserterd Event 
Auth required Role: Admin

###GET events/:event_id/
Request to get an Events with the given id

##PUT events/:event_id/
Updates an existing event and returns it
Auth required Role: Admin

###DELTE events/:event_id/
Deletes an existing Event
Auth required Role: Admin

###GET events/:event_id/teilnehmer
Get all teilnehmer from teilnehmer of an event. Returns 404 if event is not found.

###POST events/:event_id/teilnehmer
Insert a teilnehmer in the teilnehmer of an event. Returns 404 if event is not found. Redirects to warteliste if maximum capacity is reached. 
Auth required Role: Admin | User

###PUT events/:event_id/teilnehmer/:teilnehmer_id
Update the id of teilnehmer in teilnehmer of event. Returns 404 if event is not found and redirects to warteliste if :teilnehmer_id is not in teilnehmer. 
Auth required Role: Admin 

###DELETE events/:event_id/teilnehmer/:teilnehmer_id
Delete the id of teilnehmer in teilnehmer of event. Returns 404 if event is not found and redirects to warteliste if :teilnehmer_id is not in teilnehmer.
Auth required Role: Admin | User

###GET events/:event_id/teilnehmer/:teilnehmer_id
Returns the id of teilnehmer in teilnehmer of event. Returns 404 if event or teilnehmer is not found.

###GET events/:event_id/warteliste
Get all teilnehmer from warteliste of an event. Returns 404 if event is not found.

###POST events/:event_id/warteliste
Insert a teilnehmer in the warteliste of an event. Returns 404 if event is not found.
Expect body:
```json
{
	"teilnehmer":  "ObjectID"
}
```
Auth required Role: Admin | User

###PUT events/:event_id/warteliste/:teilnehmer_id
Update the id of teilnehmer in warteliste of event. Returns 404 if event or teilnehmer is not found. 
Expect body:
```json
{
	"teilnehmer": {
		"_id": "ObjectID"
	}
}
```
Auth required Role: Admin 

###DELETE events/:event_id/warteliste/:teilnehmer_id
Delete the id of teilnehmer in warteliste of event. Returns 404 if event or teilnehmer is not found.
Auth required Role: Admin | User

###GET events/:event_id/warteliste/:teilnehmer_id
Returns the id of teilnehmer in warteliste of event. Returns 404 if event or teilnehmer is not found.

##Kategorien
A Kategorie is defined as :
```json
{
"_id": "String (Id generated by MongoDB)",
"name": "String",
"__v": "Number (Versionnumber incremented by Mongo)"
}
```
 
###GET kategorien/
Request to get all Kategories retuns all Kategoriens
###POST kategorien/ 
Saves a new kategorie and returns it afterwards
###GET kategorien/:kategorie_id/
Request to get an Kategorie with the given id
###PUT kategorien/:kategorie_id/ 
Updates a Kategorie with the given id and returns it afterwards
###DELTE kategorien/:kategorie_id/
Delte the kategorie with the given id


##Postman Requests:
https://www.getpostman.com/collections/f9ced704bbfb3c868284
