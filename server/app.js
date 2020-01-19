/*
 * @Author: coderqiqin@aliyun.com 
 * @Date: 2020-01-18 19:27:42 
 * @Last Modified by: CoderQiQin
 * @Last Modified time: 2020-01-18 22:24:56
 */

/* ----------------------------------- lib ---------------------------------- */

const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
app.set('secret', 'ILOVEYOUasgbd7812ge1231267312t')

/* ------------------------------- middleware ------------------------------- */

app.use(require('cors')())
app.use(express.json())

/* -------------------------------- database -------------------------------- */

const db = require('./db')
const modelUser = require('./models/user')

/* --------------------------------- router --------------------------------- */

/*
  const routeLogin = require('./routes/login')
  app.use(routeLogin)
*/
require('./routes/login')(app)
require('./routes/main')(app)


app.get('/', (req, res) => {
  res.send('hello world')
})


// 聊天相关
io.on('connect', socket => {
  const socketId = socket.id
  // 登录成功
  socket.on('login', async ({ id }) => {
    // 找到对应用户  用户id,和生成的socketId
    let data = await modelUser.findByIdAndUpdate(id, { socketid: socketId }, { new: true, upsert: true, strict: false })
  })

  socket.on('receiveComment', (res) => {
    console.log('res: ', res);
    io.to(res.from).emit('chat', res.message)

  })
})

var server = http.listen(3000, 'localhost', function () {
  var host = server.address().address
  var port = server.address().port
  console.log('服务已启动, http://%s:%s', host, port);
})