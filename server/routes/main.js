/*
 * @Author: coderqiqin@aliyun.com 
 * @Date: 2020-01-18 19:49:01 
 * @Last Modified by: CoderQiQin
 * @Last Modified time: 2020-01-20 11:20:08
 */
const express = require('express')
const router = express.Router()
const modelUser = require('../models/user')
const modelFirend = require('../models/firend')
const authMiddleware = require('../middleware/auth')
module.exports = app => {
  // 搜索
  router.get('/user', authMiddleware(), async (req, res) => {
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
        socketid: item.socketid,
        username: item.username,
        nickname: item.nickname
      }
    })
    res.send({
      err_code: 0,
      data,
      msg: "获取成功1"
    })
  })

  // 添加
  router.post('/add', authMiddleware(), async (req, res) => {
    let data = await modelFirend.findOne({ uid: req.uid }).update({ '$push': { firends: req.body.uid } })
    res.send({
      err_code: 0,
      data,
      msg: "添加成功"
    })
  })

  // 获取好友列表
  router.get('/firend', authMiddleware(), async (req, res) => {
    // 获取用户token
    // 查找用户的id=> 在firend表   找到此id,下的  好友数组字段,返回
    let data = await modelFirend.findOne({ uid: req.uid }).setOptions({
      populate: 'firends'
    })
    res.send({
      err_code: 0,
      data,
      msg: "获取成功"
    })
  })
  // 获取全部用户
  router.get('/alluser', authMiddleware(), async (req, res) => {
    let data = await modelUser.find()
    data = data.map(item => {
      return {
        _id: item._id,
        socketid: item.socketid,
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

  // 获取用户信息接口
  app.get('/userinfo', authMiddleware(), async (req, res) => {
    res.send({
      err_code: 0,
      data: req.user,
      msg: "获取成功"
    })
  })

  app.use(router)
}