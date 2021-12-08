// pages/Exchange/details/details.js
import Toast from '@vant/weapp/toast/toast';
var app = getApp()
const tempid = 'mBVcUt6ZBlmHcTWyjWYrceyz1ODekgtvPerEj8T3bus'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        show: false,
        id: '0',
        goodsname: '雨伞',
        goodsimg: '../../../images/goodsimg.jpg',
        addr: '武川路羽毛球馆',
        price: 20,
        detailed_info: '请到指定地点领取',
        introduction: '这是一件精美的奖品',
    },

    submit: function (e) {
        this.setData({
            loading: false,
            show: true,
        })
    },

    onClose: function (e) {
        this.setData({
            show: false
        })
    },

    confirm: function (e) {
        const eventChannel = this.getOpenerEventChannel()
        this.setData({
            loading: true,
        })
        eventChannel.emit('exchange', {
            data: {
                id: this.data.id,
                reduce: this.data.price
            }
        })
        wx.cloud.callFunction({
            name: 'httppost',
            data: {
                url: app.globalData.baseurl + 'exchange_prize/',
                data: {
                    id: this.data.id,
                    openid: app.globalData.openid,
                }
            },
            success: (res) => {
                console.log("成功", res.result)
                this.setData({
                    show: false,
                })
                Toast.success('兑换成功')
                wx.requestSubscribeMessage({
                    tmplIds: [tempid],
                    success: (res) => {
                        console.log('成功', res[tempid])
                        if (res[tempid] == 'accept') {
                            wx.cloud.callFunction({
                                name: 'sendmsg',
                                data: {
                                    openid: app.globalData.openid,
                                    data: {
                                        thing2: {
                                            value: this.data.goodsname
                                        },
                                        amount3: {
                                            value: this.data.price
                                        },
                                        thing5: {
                                            value: '地点：' + this.data.addr
                                        }
                                    }
                                },
                                success: (res) => {
                                    console.log('成功', res)
                                },
                                fail: (err) => {
                                    console.log('失败', err)
                                }
                            })
                        }
                    },
                    fail: (err) => {
                        console.log('失败', err)
                    }
                })
            },
            fail: (err) => {
                console.log("失败", err)
            }
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var deadline = '2021/12/21'
        var now = new Date()
        var dead = new Date(Date.parse(deadline))
        var day = parseInt(Math.abs(now - dead) / 1000 / 60 / 60 / 24) + 1
        this.setData({
            id: options.id,
            day: day
        })
        wx.cloud.callFunction({
            name: 'httprequest',
            data: {
                url: app.globalData.baseurl + 'exchange_prize_detail/',
                data: {
                    id: options.id,
                }
            },
            success: (res) => {
                console.log("成功", res.result)
                let data = res.result.data
                this.setData({
                    goodsname: data.prize_name,
                    goodsimg: data.picture_link,
                    price: data.sufe_currency,
                    detailed_info: data.detailed_info,
                    rest: data.rest,
                    introduction: data.introduction
                })
            },
            fail: (err) => {
                console.log("失败", err)
            }
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})