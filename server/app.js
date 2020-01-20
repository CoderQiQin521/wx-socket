/*
 * @Author: coderqiqin@aliyun.com 
 * @Date: 2020-01-18 19:27:42 
 * @Last Modified by: CoderQiQin
 * @Last Modified time: 2020-01-20 12:35:28
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
  console.log('socketId: ', socketId);
  // 登录成功(在私聊页面每次刷新获取新的socketid保存到用户表)
  socket.on('login', async ({ id }) => {
    // console.log('前台传送id: ', id);
    let data = await modelUser.findByIdAndUpdate(id, { socketid: socketId }, { new: true, upsert: true, strict: false })
  })

  socket.on('receiveComment', async (res) => {
    // console.log('res: ', res);
    // 根据uid 查询socketid
    // io.emit(res.to, res)
    console.log('res.to: ', res.to);
    // 获取对方的最新socketid
    let { socketid } = await modelUser.findById(res.to)
    console.log('接收socketid: ', socketid);
    // console.log(io.sockets.sockets);
    io.to(socketid).emit('chat', res)
    // from:来自, to: 发给谁
    // res.to 对象emit('chat')

    // let socketObj
    // for (const key in io.sockets.sockets) {
    //   if (io.sockets.sockets.hasOwnProperty(key)) {
    //     const element = io.sockets.sockets[key];
    //     if (element.id === res.from) {
    //       socketObj = element
    //     }

    //   }
    // }
    // console.log('res: ', res);
    // socketObj.emit('chat', { name: '服务端123' })

  })
})

var server = http.listen(3000, 'localhost', function () {
  var host = server.address().address
  var port = server.address().port
  console.log('服务已启动, http://%s:%s', host, port);
})