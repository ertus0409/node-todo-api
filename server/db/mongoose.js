var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://ertugrulucar:356145ad@ds113692.mlab.com:13692/todo-api' || 'mongodb://localhost:27017/TodoApp');

module.exports = {mongoose};
