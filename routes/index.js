var database = require('./database');
var datenow = new Date();

database.init();

function index(req, res){
	res.render('index.html');
};

function partials(req, res){
	var name = req.params.name;
	if (req.session.user) {
		res.render('partials/'+name+'.html');	
	} else {
		res.render('partials/guest/'+name+'.html');	
	}
};

function getPosts(req, res){
	database.findAll(function(error, posts){
		res.json({posts:posts});
	});
};

function addPost(req, res){
		var post = req.body;
		post.date = datenow.toString();
		database.addPost(post, function(error, results) {
			res.json(post);
		});
};

function getPost(req, res){
	var title = req.params.title;
	database.getPost(title, function(error, result) {
		//console.log(result);
		res.json({post: result});
	});
};

function editPost(req, res){
	var title = req.params.title;
	var post = req.body;
	database.editPost(title, post, function(error, result) {
		res.json(true);
	});
};

function deletePost(req, res){
	var title = req.params.title;
	database.deletePost(title, function(error, result) {
		res.json(true);
	});
}

exports.index = index;
exports.partials = partials;
exports.getPosts = getPosts;
exports.addPost = addPost;
exports.getPost = getPost;
exports.editPost = editPost;
exports.deletePost = deletePost;