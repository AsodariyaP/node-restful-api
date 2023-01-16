# How to Build a RESTful API Using Node, Express and MongoDB? 
node-express-mongodb restful api with user CRUD example.

we will learn how to create a RESTful API using Node.

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
3. On your terminal, run <strong> npm run start </strong> this will start the server and then you will see

Node API server started on: 4000

### Setting up the schema

First of all, let’s install mongoose - npm install mongoose --save

Why Mongoose?
Mongoose is what we will use to interact with a MongoDB(Database) instance.
After installation, open the todoListModel.js file in your api/models folder and type the following code into the file and save.

```javascript
(function () {
    'use strict';
    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;


    var UserSchema = new Schema({
        name: {
            type: String,
            required: 'Please enter name'
        },
        surname: {
            type: String,
            required: 'Please enter surname'
        },
        age: {
            type: Number,
            required: 'Please enter age'
        },
        city: {
            type: String,
            required: 'Please enter city'
        },
        Created_date: {
            type: Date,
            default: Date.now
        },
        gender: {
            type: [{
                type: String,
                enum: ['male', 'female', 'other']
            }],
            default: ['male']
        }
    });

    module.exports = mongoose.model('Users', UserSchema);
})();
```
From the code above, we required the mongoose in our file and then, we create a model of how our collection should look like.
As you can see, it the task collection(table) will contain a name: a string, and the date it was created. It also contains task status which we have defined as pending - a default value for every task created.

### Setting up the routes

Routing refers to determining how an application responds to a client request for a specific endpoint, which is a URI (or path) and a specific HTTP request method (GET, POST, and so on).
Each of our routes has different route handler functions, which are executed when the route is matched.
Below we have defined two basic routes(‘/users’, and ‘/users/userId’) with different methods
‘/users’ has to methods(‘GET’ and ‘POST’), while ‘/users/taskId’ has GET, PUT and DELETE.
As you can see, we required the controller so each of the routes methods can call it’s respective handler function.

To do this, open the userRoutes.js file in the route folder and paste the code snippet below into

```javascript
(function () {
    'use strict';
    module.exports = function (app) {
        var userList = require('../controllers/userController');

        // userList Routes
        app.route('/users')
            .get(userList.list_all_users)
            .post(userList.create_a_user);

        app.route('/users/:userId')
            .get(userList.read_a_user)
            .put(userList.update_a_user)
            .delete(userList.delete_a_user);
    };
})();
```
### Setting up the controller
Open userController.js file with your text editor(visual code) and let’s deep dive into coding.

In this controller, we would be writing five different functions namely: list_all_users, create_a_user, read_a_user, update_a_user, delete_a_user. We will exported each of the functions for us to use in our routes.
Each of these functions uses different mongoose methods such as find, findById, findOneAndUpdate, save and remove.

```javascript
(function () {
    'use strict';
    var mongoose = require('mongoose'),
        User = mongoose.model('Users');

    exports.list_all_users = function (req, res) {
        User.find({}, function (err, user) {
            if (err)
                res.send(err);
            res.json(user);
        });
    };

    exports.create_a_user = function (req, res) {
        var new_user = new User(req.body);
        new_user.save(function (err, user) {
            if (err)
                res.send(err);
            res.json(user);
        });
    };

    exports.read_a_user = function (req, res) {
        User.findById(req.params.userId, function (err, user) {
            if (err)
                res.send(err);
            res.json(user);
        });
    };

    exports.update_a_user = function (req, res) {
        User.findOneAndUpdate({ _id: req.params.userId }, req.body, { new: true }, function (err, user) {
            if (err)
                res.send(err);
            res.json(user);
        });
    };

    exports.delete_a_user = function (req, res) {
        User.remove({
            _id: req.params.userId
        }, function (err, user) {
            if (err)
                res.send(err);
            res.json({ message: 'User successfully deleted' });
        });
    };

})();
```
### Putting everything together
Earlier on, we had a minimal code for our server to be up and running in the server.js file.
In this section we will be connecting our handlers(controllers), database, the created models, body parser and the created routes together.

Open the server.js file created awhile ago and follow the following steps to put everything together.
Essentially, you will be replacing the code in your server.js with the code snippet from this section

1. Connect your database by adding a url to the mongoose instance connection
2. Load the created model - task
3. Install bodyParser and use
bodyParser Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
It exposes various factories to create middlewares. All middlewares will populate the req.bodyproperty with the parsed body, or an empty object ({}) if there was no body to parse (or an error was returned).
4. Register our created routes in the server

```javascript
var express = require('express'),
    app = express(),
    port = process.env.PORT || 4000,
    mongoose = require('mongoose'),
    Task = require('./api/models/userModel'), //created model loading here
    bodyParser = require('body-parser');


// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Userdb');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./api/routes/userRoutes'); //importing route
routes(app); //register the route

app.listen(port);

console.log('User RESTful API server started on: ' + port);
```
5. Start MongoDB Server

Open your terminal and run mongod

This will start your MongoDB server and then, node server could connect to the MongoDB instance. Once your MongoDB server is running, restart your node server by running: rs on your nodemon running terminal.

### Testing via Postman
Now that everything is now connected, let’s test each of the routes and the respective methods.

<strong>Open your postman and type: </strong>

1. http://localhost:4000/users in the enter request URL section and press enter.
   
   On enter, you should see “[]” because there is nothing in the database yet.

2. On the same address, change the method to POST, click body and select “x-www-form-urlencoded”.

Then, enter model properties as the key and the corresponding user name, surname, age and as well as value.

After this, click on send button.

This should give you a response 200 ok

Awesome ! :+1:
