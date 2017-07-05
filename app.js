var express = require('express');
var todoController = require('./controllers/todoController');

var app = express();

// Template Engine
app.set('view engine', 'ejs');

// Static Files
app.use(express.static('./public'));

todoController(app);

// Listen to port
app.listen(3000);
console.log('Server has started listening on port 3000!');
