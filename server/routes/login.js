/*
 * @Author: coderqiqin@aliyun.com 
 * @Date: 2020-01-18 19:27:48 
 * @Last Modified by: CoderQiQin
 * @Last Modified time: 2020-01-18 19:45:12
 */
const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const modelUser = require('../models/user')
const modelFirend = require('../models/firend')
module.exports = app => {
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
      expiresIn: 60 * 60 * 24 // 过期时间
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

  app.use(router)
}