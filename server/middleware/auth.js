module.exports = options => {
  const jwt = require('jsonwebtoken')
  const modelUser = require('../models/user')

  return async (req, res, next) => {
    const token = String(req.headers['authorization' || '']).split(' ').pop()
    if (!token) {
      return res.send({
        err_code: 300,
        data: {},
        msg: "请传token"
      })
    }
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
    await next()
  }
}