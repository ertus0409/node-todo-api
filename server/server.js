const express = require('express');
const bodyParser = require('body-parser');

const {ObjectID} = require('mongodb');
var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');


var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send('Unable to save todo: ')
  });
});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos})
  }, (e) => {
    res.status(400).send(e);
  })
});

//GET BY :id
app.get('/todos/:id', (req, res) => {
  var id = req.params.id;
  if (ObjectID.isValid(id)) {
    Todo.findById(id).then((todo) => {
      if (todo) {
        return res.send(todo);
      } else {
        return res.status(404).send('Sorry, no todo found with the id');
      }
    }).catch((e) => {
      return res.status(400).send(e)
    });
  } else {
    return res.status(404).send('Please enter a valid id');
  }
});



app.listen(3000, () => {
  console.log(`Started on port 30000`);
});


module.exports = {app};
