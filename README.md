# Event-Management-Backend

I am in the process of creating a event management app. Backend is written in Node.js, mongodb for database and JWT for authorization. 
Backend has the routes, middelware,models configured. 
Models folder has the schemas for different tables.
Middelware folder contains functionality for authentication and authorization configured.
Routes folder contain route handlers to get/post/update/delete customer and event data.
Start folder has cors enabled.
Express framework used along with mongoose to connect with mongodb database. Bcrypt is used to encrypt the passowrd and Joi for validation.


To run backend on your local system :
  1. npm init -y 
  2. To set JWT key in terminal : $exports events_jwtPrivateKey = 'mySecretKey'
  3. node index.js
