const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/im', {
  useUnifiedTopology: true,
  useNewUrlParser: true
}).then(() => {
  console.log('数据库连接成');
}, err => {
  console.log('err: ', err);
})