#RESTful Microservice for Emails
The service returns Content-Type: application/json

##Emails
An Email has the following Schema:
```json
{ 
"_id": "String (Id generated by MongoDB)",
"sender": "String",
"receiver": "String",
"subject": "String",
"text": "String",
"timestamp": "Date",
"__v": "Number (Versionnumber incremented by Mongo)"
}
```

###GET email/
Request to get all Emails returns all Emails

###POST email/ application/json
Request to save a new Email returns the inserterd Email

###GET email/:receiver/
Request to get all Emails sent to the receiver returns these Emails