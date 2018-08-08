var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(('mongodb://ertugrulucar:356145ad@ds113692.mlab.com:13692/todo-api' || 'mongodb://127.0.0.1:27017/TodoApp'), { useNewUrlParser: true });

module.exports = {mongoose};
