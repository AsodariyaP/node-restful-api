# node-RESTful-api
node-mongodb restful api with user CRUD example.

we will learn how to create a RESTful API using Node.js.

### Tools:

* Node.js
* MongoDB
* Text editor (Visual Studio Code)
* Postman

### Getting started
For the purpose of this tutorial, I’ll work you through creating a RESTful API. To achieve this, we will create a RESTful users API (endpoints that will create a user, get or read list of all users, read a particular user by user id, delete a user, and update a user).

### Installation:
1. NodeJs (check using node -v and npm -v using cmd)
2. MongoDB


If you do have Node and MongoDB installed, let's begin the tutorial with the following basic steps.

Open your terminal and kindly follow the following steps

* Create a Folder name userApi - mkdir userApi
* Navigate to the root of your newly created folder - cd userApi
* Create a package.json file - npm init
Package.json is a file that gives the necessary information to npm which allows it to identify the project as well as handle the project's dependencies.
npm init will prompt you to enter some information such as the app name, description, version, author, keyword.

* Create a file called server.js.
In this server, we will writing the protocols to create our server.

* Create a folder called api - mkdir api
Inside this folder called api, create three separate folders called models, routes, and controllers by running mkdir api/controllers api/models api/routes

* Create userController.js in the api/controller folder, userRoutes.js in the routes folder, and userModel in the model folder - touch api/controllers/userController.js api/models/userModel.js api/routes/userRoutes.js


### Server setup

Let's install express and nodmon, express will be used to create the server while nodmon will help us to keep track of changes to our application by watching changed files and automatically restart the server.

```javascript
npm install --save-dev nodemon
```

```javascript
npm install express --save
```
On successful installation, your package.json file will be modified to have the two newly installed packages.

1. Open the package.json file and add this task to the script

```javascript
"start": "nodemon server.js"
```
2. Open the server.js file and type/copy the code below into it

```javascript
var express = require('express'),
  app = express(),
  port = process.env.PORT || 4000;

app.listen(port);

console.log('Node API server started on: ' + port);
```
3. On your terminal, run npm run start this will start the server and then you will see

Node API server started on: 4000

Awesome! :+1:
