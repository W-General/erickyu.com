function index(req, res){
	res.render('index.html');
};

function partials(req, res){
	var name = req.params.name;
	console.log(name);
	res.render('partials/'+name+'.html');
}

exports.index = index;
exports.partials = partials;