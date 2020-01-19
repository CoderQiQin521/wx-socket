const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/im', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true
}).then(() => {
  // console.log('数据库已连接');
}, err => {
  console.log('err: ', err);
})