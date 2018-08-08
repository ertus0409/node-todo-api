const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then((result) => {
//   console.log(result);
// });


// Todo.findByIdAndRemove('5b6adb558ef9ea137b16dfd1').then((doc) => {
//   console.log(doc);
// }).catch((e) => {
//   console.log(e);
// });

Todo.findOneAndRemove({text: 'Arthur'}).then((doc) => {
  console.log(doc);
}).catch((e) => {
  console.log(`Probleeeeem:`);
});
