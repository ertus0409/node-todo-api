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
  // db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
  //   console.log(result);
  // });

  db.collection('Users').deleteMany({name: 'Arthur'});

  // db.collection('Users').findOneAndDelete({
  //   _id: new ObjectID("5b67532e77463841dc34d132")
  // }).then((results) => {
  //   console.log(JSON.stringify(results, undefined, 2));
  // });



  client.close();
});
