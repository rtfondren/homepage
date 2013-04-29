
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , blog = require('./routes/blog')
  , http = require('http')
  , path = require('path');

var ArticleProvider = require('./articleprovider-mongo').ArticleProvider;

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.set('view options',
	  { ArticleProvider: new ArticleProvider('localhost', 27017) }
  );
  app.use(express.favicon(__dirname + '/public/images/favicon.ico'));
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function() {
	app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/blog', blog.index);
app.all('/blog/new', blog.create);
app.get('/blog/:id([0-9a-f]{24})', blog.article);
app.post('/blog/addComment', blog.addComment);
// app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
