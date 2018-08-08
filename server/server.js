const express = require('express');
const bodyParser = require('body-parser');

const {ObjectID} = require('mongodb');
var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');


var app = express();
const port = process.env.PORT || 3000;

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

//DELETE by :id
app.delete('/todos/:id', (req, res) => {
  var id = req.params.id;
  if (ObjectID.isValid(id)) {
    Todo.findByIdAndRemove(id).then((todo) => {
      if (!todo) {
        return res.status(404).send('No todo matching with the id')
      }
      return res.status(200).send(todo);
    });
  } else {
    return res.status(404).send('Please use a valid id');
  }
});








app.listen(port, () => {
  console.log(`Started on port ${port}`);
});


module.exports = {app};
