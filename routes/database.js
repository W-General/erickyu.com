var MongoClient = require('mongodb').MongoClient;

var MONGOHQ_URL = process.env.MONGOHQ_URL || 'mongodb://nodejitsu:d0f4c334f3db76b00edd487a67a01284@dharma.mongohq.com:10055/nodejitsudb8874184791';
//var Connection = require('mongodb').Connection;
//var BSON = require('mongodb').BSON;
//var ObjectID = require('mongodb').ObjectID;

db = null;

function reset() {
	db.collection('posts', function(err, collection) {
			collection.remove({}, function(err, removed){});
		});

		db.collection('users', function(err, collection) {
			collection.remove({}, function(err, removed){});
		});

		db.collection('counters', function(err, collection) {
		collection.remove({}, function(err, removed){});
		});

		db.collection('counters', function(err, collection) {
			collection.insert({_id: "userid", seq: 0}, {w:0}, function(error, results){
				
			});
		});	
};

function init() {
	MongoClient.connect(MONGOHQ_URL, function(err, _db) {
		db = _db;

	});
};

function getNextSequence(name, callback) {
	getCollection('counters', function(error, collection) {
		collection.findAndModify(
			{_id: name},
			[],
			{$inc: {seq: 1}},
			{new: true}
			, function(error, result) {
				if(error) callback(error);
				else callback(null, result.seq);
		});
	})
};

function getCollection(coll_name, callback) {
	db.collection(coll_name, function(error, collection) {
		if(error) callback(error);
		else callback(null, collection);
	});
};

function findAll(coll_name, callback) {
	getCollection(coll_name, function(error, collection) {
		if(error) callback(error);
		else {
			collection.find().toArray(function(error, results) {
				if(error) callback(error);
				else callback(null, results);
			});
		}
	});
};

function addPost(post, callback) {
	getCollection('posts', function(error, collection) {
		getNextSequence("userid", function(error, seq) {
			post.id = seq; 	
			collection.insert(post, {w:0}, function(error, results){
				if(error) callback(error);
				else callback(null, results);
			});
		});
	});
};

function getPost(pid, callback) {
	getCollection('posts', function(error, collection){
		if(error) callback(error);
		else {
			var id = parseInt(pid);
			collection.findOne({id:id}, function(error, post) {
				if(error) callback(error);
				else callback(null, post);
			});
		}
	});
};

function editPost(pid, post, callback) {
	getCollection('posts', function(error, collection){
		if(error) callback(error);
		else {
			var id = parseInt(pid);
			collection.update({id:id}, {$set: {title: post.title, body: post.body, id: post.id}}, {safe: true}, function(error, result) {
				if(error) callback(error);
				else callback(null, result);
			});
		}
	});
};

function deletePost(pid, callback) {
	getCollection('posts', function(error, collection){
		if(error) callback(error);
		else {
			var id = parseInt(pid);
			collection.remove({id:id}, function(error, result) {
				if(error) callback(error);
				else callback(null, result);
			});
		}
	});
};

///User functions

function addUser(username, password, callback) {
	var user = {username: username, password: password};
	getCollection('users', function(error, collection) {
		collection.insert(user, {w:0}, function(error, results){
			if(error) callback(error);
			else callback(null, results);
		});
	});
};

function getUser(username, callback) {
	getCollection('users', function(error, collection){
		if(error) callback(error);
		else {
			collection.findOne({username:username}, function(error, user) {
				if(error) callback(error);
				else callback(null, user);
			});
		}
	});
};

exports.init = init;
exports.findAll = findAll;
exports.addPost = addPost;
exports.getPost = getPost;
exports.editPost = editPost;
exports.deletePost = deletePost;


exports.addUser = addUser;
exports.getUser = getUser;