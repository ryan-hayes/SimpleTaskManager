// Express backend setup
var express = require('express');
var app = express();

// Database connection
var mongojs = require('mongojs');
var connectionString = '';
var db = mongojs(connectionString, ['tasks']);

// Body parser setup
var bodyParser = require('body-parser');
app.use(bodyParser.json());

// Point to the home page
app.use(express.static(__dirname + "/public"));

// RESTful API methods received from the controller and pushed to the database
app.get('/taskmgr', function(req, res) {
	console.log("I received a GET request");

	db.tasks.find(function(err, docs) {
		console.log(docs);
		res.json(docs);
	});
});
app.post('/taskmgr', function(req, res) {
	console.log(req.body);
	db.tasks.insert(req.body, function(err, doc) {
		res.json(doc);
	})
});
app.delete('/taskmgr/:id', function(req, res) {
	var id = req.params.id;
	console.log(id);
	db.tasks.remove({_id: mongojs.ObjectId(id)}, function(err, doc) {
		res.json(doc);
	})
});
app.get('/taskmgr/:id', function(req, res) {
	var id = req.params.id;
	console.log(id);
	db.tasks.findOne({_id: mongojs.ObjectId(id)}, function(err, doc) {
		res.json(doc);
	})
});
app.put('/taskmgr/:id', function(req, res) {
	var id = req.params.id;
	console.log(req.body.name);
	db.tasks.findAndModify({query: {_id: mongojs.ObjectId(id)},
		update: {$set: {name: req.body.name, category: req.body.category, due: req.body.due}},
		new: true}, function (err, doc) {
			res.json(doc);
		})
});

// Open the listener on port 3000
app.listen(3000);
console.log("Server running on port 3000");