var MongoClient = require('mongodb').MongoClient;

var MONGOHQ_URL = process.env.MONGOHQ_URL || 'mongodb://nodejitsu:d0f4c334f3db76b00edd487a67a01284@dharma.mongohq.com:10055/nodejitsudb8874184791';
//var Connection = require('mongodb').Connection;
//var BSON = require('mongodb').BSON;
//var ObjectID = require('mongodb').ObjectID;

db = null;

function init() {
	MongoClient.connect(MONGOHQ_URL, function(err, _db) {
		db = _db;
		/*db.collection('posts', function(err, collection) {
			collection.remove({}, function(err, removed){});
		});*/

		/*
		db.collection('posts', function(err, collection) {
			collection.update({title:'999'}, {title:'222'}, function(err, modded){});
		});
		*/


		/*db.createCollection('posts', function(err, collection) {
			collection.insert({title:'blah', date:datenow.toString(), body:'blah'}, {w:0}, function(err, result) {
				collection.find().toArray(function(err, docs) {
					console.log(docs.length);
					db.close();
				});
			});
		});*/

	});
};

function getCollection(callback) {
	db.collection('posts', function(error, collection) {
		if(error) callback(error);
		else callback(null, collection);
	});
};

function findAll(callback) {
	getCollection(function(error, collection) {
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
	getCollection(function(error, collection) {
		collection.insert(post, {w:0}, function(error, results){
			if(error) callback(error);
			else callback(null, results);
		});
	});
};

function getPost(post_title, callback) {
	getCollection(function(error, collection){
		if(error) callback(error);
		else {
			collection.findOne({title:post_title}, function(error, post) {
				if(error) callback(error);
				else callback(null, post);
			});
		}
	});
};

function editPost(post_title, post, callback) {
	getCollection(function(error, collection){
		if(error) callback(error);
		else {
			//console.log(post);
			collection.update({title:post_title}, {$set: {title: post.title, body: post.body}}, {safe: true}, function(error, result) {
				if(error) callback(error);
				else callback(null, result);
			});
		}
	});
};

function deletePost(post_title, callback) {
	getCollection(function(error, collection){
		if(error) callback(error);
		else {
			collection.remove({title:post_title}, function(error, result) {
				if(error) callback(error);
				else callback(null, result);
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