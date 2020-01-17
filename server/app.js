const express = require('express')
const app = express()
app.use(require('cors')())
app.use(express.json())
const jwt = require('jsonwebtoken')
const db = require('./db')
const modelUser = require('./models/user')
const SECRET = 'ILOVEYOU'
const http = require('http').createServer(app)
const io = require('socket.io')(http)

app.get('/', (req, res) => {
  res.send('hello world')
})

app.post('/register', async (req, res) => {
  let data = await modelUser.create(req.body)
  res.send(data)
})
app.post('/login', async (req, res) => {
  let data = await modelUser.findOne({
    username: req.body.username
  })
  if (!data) {
    return res.send('没有此用户啊')
  }
  const isPass = require('bcryptjs').compareSync(req.body.password, data.password)
  if (!isPass) {
    return res.send('密码错误')
  }

  const token = jwt.sign({
    id: data._id
  }, SECRET, {
    expiresIn: 60 * 60 * 24
  })
  res.send({
    user: data,
    token
  })
})

io.on('connect', socket => {
  const socketId = socket.id
  // 登录成功
  socket.on('login', async res => {
    // 找到对应用户  用户id,和生成的socketId
    let data = await modelUser.save()
  })
})

// var server = app.listen(3000, 'localhost', function () {
//   var host = server.address().address
//   var port = server.address().port
//   console.log('服务已启动, http://%s:%s', host, port);
// })

var server = http.listen(3000, 'localhost', function () {
  var host = server.address().address
  var port = server.address().port
  console.log('服务已启动, http://%s:%s', host, port);
})