// 云函数入口文件
const cloud = require('wx-server-sdk')
const got = require('got'); //引用 got

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
    let postResponse = await got(event.url, {
        method: 'POST', //post请求
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(event.data) //把json数据（对象）解析成字符串
    })
    return JSON.parse(postResponse.body) //返回数据
}