const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

var id = '5b698d5749f27d06eb56da19';
var id01 = '5b698d5749f27d06eb56da10';
var idUsr = '5b682f0ce1e6934599f3a5b5';


// Todo.find({_id: id}).then((todos) => {
//   console.log('Todos', todos);
// });

// Todo.findOne({_id: id}).then((todo) => {
//   console.log('Todos', todo);
// }, (e) => {
//   console.log(`An error has occured:  ${e}`);
// })


// Todo.findById(id01).then((todo) => {
//   console.log(todo);
// }, (e) => {
//   console.log(e);
// })


User.findById(idUsr).then((user) => {
  if (!user) {
    return console.log('No user found...');
  }
  console.log(user);
}, (e) => {
  console.log('An error has occured:');
  console.log(e);
});
