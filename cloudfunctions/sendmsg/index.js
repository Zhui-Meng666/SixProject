// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV,
})

// 云函数入口函数
exports.main = async (event, context) => {
    try {
        const result = await cloud.openapi.subscribeMessage.send({
            "touser": event.openid,
            "page": 'pages/Personal/prize/prize',
            "lang": 'zh_CN',
            "data": event.data,
            "templateId": 'mBVcUt6ZBlmHcTWyjWYrceyz1ODekgtvPerEj8T3bus',
            "miniprogramState": 'developer'
        })
        return result
    } catch (err) {
        return err
    }
}