const {MongoClient, ObjectID} = require('mongodb');

var obj = new ObjectID();
console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }, (err, client) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');
  const db = client.db('TodoApp');

  // //deleteMany
  // db.collection('Todos').deleteMany({text: 'Eat launch'}).then((result) => {
  //   console.log(result);
  // });
  //
  // //deleteOne
  // db.collection('Todos').deleteOne({text: 'Launch'}).then((result) => {
  //   console.log(result);
  // })

  //findOneAndDelete
  db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
    console.log(result);
  });

  client.close();
});
