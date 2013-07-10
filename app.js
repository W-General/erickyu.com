var express = require('express'),
  routes = require('./routes'),
  http = require('http'),
  path = require('path');

var app = module.exports = express();

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.engine('html', require('jade').renderFile);
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'client')));
app.use(app.router);

app.get('/', routes.index);
app.get('/partials/:name', routes.partials);

app.get('*', routes.index);



http.createServer(app).listen(app.get('port'));
console.log('Listening');