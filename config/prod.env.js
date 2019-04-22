'use strict'
// module.exports = {
//   NODE_ENV: '"production"',
//   API_ROOT:'"http://120.79.4.43:3000/"'
// }
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
 
module.exports = merge(prodEnv, {
  NODE_ENV: '"production"',
  API_ROOT: '"http://120.79.4.43:3000"'   //线上请求前缀
})