require('./config/config.js');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');

const {ObjectID} = require('mongodb');
var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');


var app = express();
const port = process.env.PORT;

app.use(bodyParser.json());


//POST todo
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


//GET all todos
app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos})
  }, (e) => {
    res.status(400).send(e);
  })
});


//GET todo by :id
app.get('/todos/:id', (req, res) => {
  var id = req.params.id;
  if (ObjectID.isValid(id)) {
    Todo.findById(id).then((todo) => {
      if (todo) {
        return res.send(todo);
      } else {
        return res.status(404).send();
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
    }).catch((e) => {
      res.status(400).send();
    });
  } else {
    return res.status(404).send('Please use a valid id');
  }
});

app.patch('/todos/:id', (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }

    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  });
});


// POST /users
app.post('/users', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  var user = new User(body);

  user.save().then(() => {
    return user.generateAuthToken();
  }).then((token) => {
    res.header('x-auth', token).send(user);
  }).catch((e) => res.status(400).send('error'));
});





//port listen
app.listen(port, () => {
  console.log(`Started on port ${port}`);
});


module.exports = {app};
