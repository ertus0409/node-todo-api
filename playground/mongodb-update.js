const {MongoClient, ObjectID} = require('mongodb');

var obj = new ObjectID();
console.log(obj);

MongoClient.connect('mongodb://ertugrulucar:356145ad@ds113692.mlab.com:13692/todo-api', (err, client) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');
  const db = client.db('TodoApp');


  // db.collection('Todos').findOneAndUpdate({
  //   _id: new ObjectID('5b68171d4d26c7bc968dc025')
  // }, {
  //   $set: {completed: true}
  // }, {
  //   returnOriginal: false
  // }).then((result) => {
  //   console.log(result);
  // });

  db.collection('Users').findOneAndUpdate({
    _id: new ObjectID('5b674ccff91a92417745c61a')
  }, {
    $set: {name: 'Arthur'}
  }, {returnOriginal: false}).then((result) => {
    console.log(result);
  });

  db.collection('Users').findOneAndUpdate({
    _id: new ObjectID('5b674ccff91a92417745c61a')
  }, {
    $inc: {age: 1}
  }, {returnOriginal: false}).then((result) => {
    console.log(result);
  });



  client.close();
});
