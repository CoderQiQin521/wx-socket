/*
 * @Author: coderqiqin@aliyun.com 
 * @Date: 2020-01-18 19:28:02 
 * @Last Modified by: CoderQiQin
 * @Last Modified time: 2020-01-20 11:21:34
 */
const jwt = require('jsonwebtoken')
const modelUser = require('../models/user')
module.exports = options => {

  return async (req, res, next) => {
    const token = String(req.headers['authorization'] || '').split(' ').pop()
    if (!token) {
      return res.send({
        err_code: 300,
        data: {},
        msg: "请传token"
      })
    } else {

      const { id } = jwt.verify(token, req.app.get('secret'))
      let data = await modelUser.findById(id)
      if (!data) {
        return res.send({
          err_code: 301,
          data: {},
          msg: "token已过期"
        })
      }
      req.uid = id
      req.user = data
      next()
    }
  }
}