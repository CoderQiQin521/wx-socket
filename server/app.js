const express = require('express')
const app = express()
app.use(require('cors')())
app.use(express.json())
const jwt = require('jsonwebtoken')
const db = require('./db')
const modelUser = require('./models/user')
const modelFirend = require('./models/firend')
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const SECRET = 'ILOVEYOU'

const authMiddleware = require('./middleware/auth')

app.set('secret', 'ILOVEYOUasgbd7812ge1231267312t')

// console.log(app.get('secret'));
// return


app.get('/', (req, res) => {
  res.send('hello world')
})

app.post('/register', async (req, res) => {
  let data = await modelUser.create(req.body)
  await modelFirend.create({
    uid: data._id,
    firends: []
  })
  res.send({
    err_code: 0,
    data,
    msg: "注册成功"
  })
})

app.post('/login', async (req, res) => {
  let data = await modelUser.findOne({
    username: req.body.username
  })
  if (!data) {
    return res.send({
      err_code: 1,
      data: "",
      msg: "没有此用户啊"
    })
  }
  const isPass = require('bcryptjs').compareSync(req.body.password, data.password)
  if (!isPass) {
    return res.send({
      err_code: 1,
      data: "",
      msg: "密码错误"
    })
  }

  const token = jwt.sign({
    id: data._id
  }, app.get('secret'), {
    expiresIn: 60 * 60 * 24
  })
  res.send({
    err_code: 0,
    data: {
      user: data,
      token
    },
    msg: "登录成功"
  })
})

// 搜索
app.get('/user', authMiddleware(), async (req, res) => {
  let { username } = req.query
  let data = await modelUser.find({ username: { $regex: username } })
  if (data.length === 0) {
    return res.send({
      err_code: 1,
      data: {},
      msg: "没有此用户"
    })
  }
  data = data.map(item => {
    return {
      _id: item._id,
      username: item.username,
      nickname: item.nickname
    }
  })
  res.send({
    err_code: 0,
    data,
    msg: "获取成功"
  })
})

// 添加
app.post('/add', authMiddleware(), async (req, res) => {
  let data = await modelFirend.findOne({ uid: req.uid }).update({ '$push': { firends: req.body.uid } })
  res.send({
    err_code: 0,
    data,
    msg: "添加成功"
  })
})

app.get('/firend', authMiddleware(), async (req, res) => {
  // 获取用户token
  // 查找用户的id=> 在firend表   找到此id,下的  好友数组字段,返回
  let data = await modelFirend.findOne({ uid: req.uid }).setOptions({
    populate: 'firends'
  })
  console.log('data: ', data);
  // data.firends = data.firends.map(async item => {
  //   let user = await modelUser.findById(item)
  //   console.log('user: ', user);
  //   return {
  //     _id: user._id,
  //     username: user.username,
  //     nickname: user.nickname
  //   }
  // })

  res.send({
    err_code: 0,
    data,
    msg: "获取成功"
  })
})

io.on('connect', socket => {
  const socketId = socket.id
  // 登录成功
  socket.on('login', async ({ id }) => {
    // 找到对应用户  用户id,和生成的socketId
    let data = await modelUser.findByIdAndUpdate(id, { socketId: socketId }, { new: true, upsert: true, strict: false })
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