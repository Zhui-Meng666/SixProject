// 云函数入口文件
const cloud = require('wx-server-sdk')
const got = require('got'); //引用 got

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
    let Response = await got(event.url, {
        method: 'GET', //get请求
        searchParams: event.data,  //传参
        headers: {
          'Content-Type': 'application/json'
        }
      })
    return Response.body //返回数据
}