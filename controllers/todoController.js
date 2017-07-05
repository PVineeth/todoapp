var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// var data = [{item: 'Go To Park'}, {item: 'Practice NodeJS'}, {item: 'Love Life'}];
var urlencoderParser = bodyParser.urlencoded({extended: false});

//Connect to database
mongoose.connect('mongodb://XXXX:XXXX@XXXX.mlab.com:XXXX/XXXX');

var todoSchema = new mongoose.Schema({
  item: String // attribute
});

var Todo = mongoose.model('Todo', todoSchema);

module.exports = function(app){

app.get('/todo', function(req, res){
Todo.find({}, function(err, data){ // finds items in a collection
  if (err) throw err;
  res.render('todo', {todos: data});
});
});

app.post('/todo', urlencoderParser, function(req, res){

var newTodo = Todo(req.body).save(function(err, data){

  if (err) throw err;
  res.json(data);

});
});

app.delete('/todo/:item', function(req, res){

  Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){ // replace hypen with spaces. '/todo/:item' comes with hypens.
    if (err) throw err;
    res.json(data);
  });
});

}
