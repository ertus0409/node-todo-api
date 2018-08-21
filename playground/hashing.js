const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


var rawPass = '356145ad';
const saltRounds = 10;
const somePass = 'RateApp123';
var myHash;

// bcrypt.genSalt(10, (err, salt) => {
//   if (err) {
//     return console.log('Cant salt');
//   }
//   bcrypt.hash(rawPass, salt, (err, hash) => {
//     if (err) {
//       return console.log('Cant hash');
//     }
//     console.log(hash);
//   });
// });
bcrypt.genSalt(10, (err, salt) => {
  if (err) {
    return console.log('Cant salt');
  }
  bcrypt.hash(rawPass, salt, (err, hash) => {
    if (err) {
      return console.log('Cant hash');
    }
    myHash = hash;
    console.log(myHash.toString());
  });
});
//
bcrypt.compare(rawPass, myHash, (err, res) => {
  if (err) {
    return console.log('Error', err);
  }
  console.log(res);
});
//
// bcrypt.hash(rawPass, saltRounds, (err, hash) => {
//   if (err) {
//     return console.log('Errr');
//   }
//   console.log('Hash sucess: ', hash);
// });
//

// var data = {
//   id: 10
// }
//
// var token = jwt.sign(data, '123abc');
// console.log(token);
//
// var decoded = jwt.verify(token, '123abc');
// console.log('decoded', decoded);
// var message = 'I am user number 3'
// var hash = SHA256(message).toString();
//
// console.log(`Message: ${message}`);
// console.log(`Message: ${hash}`);
//
//
// var data = {
//   id: 5
// };
// var token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// }
//
// // token.data.id = 6
// // token.hash = SHA256(JSON.stringify(token.data)).toString();
//
//
// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();
// if(resultHash === token.hash) {
//   console.log('Data was not changed');
// } else {
//   console.log('Data was changed! Do not trust!');
// }
