require('./config/config.js');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');

const {ObjectID} = require('mongodb');
var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');


var app = express();
const port = process.env.PORT;

app.use(bodyParser.json());


//POST todo
app.post('/todos', authenticate, (req, res) => {
  var todo = new Todo({
    text: req.body.text,
    _creator: req.user._id
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send('Unable to save todo: ')
  });
});


//GET all todos
app.get('/todos', authenticate, (req, res) => {
  Todo.find({
    _creator: req.user._id
  }).then((todos) => {
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
app.delete('/todos/:id', authenticate, (req, res) => {
  var id = req.params.id;
  if (ObjectID.isValid(id)) {
    Todo.findOneAndRemove({
    _id: id,
    _creator: req.user._id
    }).then((todo) => {
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


//PATCH /todos/:id
app.patch('/todos/:id', authenticate, (req, res) => {
  var usr = req.user
  var id = req.params.id
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

  Todo.findOneAndUpdate({_id: id, _creator: usr._id}, {$set: body}, {new: true}).then((todo) => {
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


//POST /users/me
app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user)
});


// POST /users/login {email, password}
app.post('/users/login', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);

  User.findByCredentials(body.email, body.password).then((user) => {
    user.generateAuthToken().then((token) => {
      res.header('x-auth', token).send(user);
    });
  }).catch((e) => {
    res.status(401).send()
  });
});


// DELTE /user/me/token
app.delete('/users/me/token', authenticate, (req, res) => {
  req.user.removeToken(req.token).then(() => {
    res.status(200).send();
  }, () => {
    res.status(400).send();
  });
});



//port listen
app.listen(port, () => {
  console.log(`Started on port ${port}`);
});


module.exports = {app};
