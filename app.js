var express = require('express'),
  routes = require('./routes'),
  //http = require('http'),
  path = require('path'), 
  keepAlive = ('./stayalive');
  //database = require('./routes/database');



var app = module.exports = express();

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.engine('html', require('jade').renderFile);
//app.set('view engine', 'jade');
app.use(express.bodyParser());
app.use(express.cookieParser('[omitted]'));
//app.use(express.session());
app.use(express.cookieSession());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, '/client')));
app.use(app.router);

//database.init();
//var Connection = require('mongodb').Connection;
//var BSON = require('mongodb').BSON;
//var ObjectID = require('mongodb').ObjectID;

//Routes

app.get('/', routes.index);
app.get('/partials/:name', routes.partials);

app.get('/db/posts', routes.getPosts);

app.get('/db/post/:year/:month/:day/:title', routes.getPost);
app.put('/db/post/:year/:month/:day/:title', routes.editPost);
app.post('/db/post', routes.addPost);
app.delete('/db/post/:year/:month/:day/:title', routes.deletePost);

app.post('/db/user', routes.addUser);
app.post('/db/user/:name', routes.login);
app.get('/logout', routes.logout);


app.get('*', routes.index);



app.listen(app.get('port'));
console.log('Listening');
keepAlive.keepAlive();
