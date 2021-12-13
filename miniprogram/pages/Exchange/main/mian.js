// pages/Exchange/main/mian.js
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        coinnum: 100,
        goods: {},
        goodsall: {},
    },

    onChange: function (e) {
        this.setData({
            value: e.detail,
        })
    },

    onSearch: function (e) {
        var newlist = {}
        var text = this.data.value
        var list = this.data.goodsall
        for (var key in list) {
            if (list[key].name.indexOf(text) != -1) {
                newlist[key] = list[key]
            }
        }
        this.setData({
            goods: newlist
        })
    },

    onFocus: function (e) {
        this.setData({
            showcancel: true
        })
    },

    onCancel: function (e) {
        this.setData({
            goods: this.data.goodsall,
            showcancel: false
        })
    },

    details: function (e) {
        var id = e.currentTarget.id
        let that = this
        wx.navigateTo({
            url: '../details/details?id=' + id+'&coin='+that.data.coinnum,
            events: {
                exchange: function (res) {
                    var goods = that.data.goods
                    var data = res.data
                    goods[data.id].sold += 1
                    that.setData({
                        coinnum: that.data.coinnum - data.reduce,
                        goods: goods
                    })
                }
            }
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.cloud.callFunction({
            name: 'httprequest',
            data: {
                url: app.globalData.baseurl + 'exchange_balance/',
                data: {
                    openid: app.globalData.openid
                }
            },
            success: (res) => {
                console.log("成功", res.result)
                this.setData({
                    coinnum: res.result.data.sufe_currency
                })
            },
            fail: (err) => {
                console.log("失败", err)
            }
        })
        wx.cloud.callFunction({
            name: 'httprequest',
            data: {
                url: app.globalData.baseurl + 'exchange_prize_show/',
                data: {}
            },
            success: (res) => {
                console.log("成功", res.result)
                let result = res.result
                if (result != null) {
                    let goods = result.results
                    let goodsall = {}
                    this.setData({
                        count: result.count,
                        next: result.next,
                        previous: result.previous
                    })
                    for (var i = 0; i < goods.length; ++i) {
                        goodsall[goods[i].id] = {
                            src: goods[i].picture_link,
                            name: goods[i].prize_name,
                            price: goods[i].sufe_currency,
                            sold: 0,
                            total: goods[i].rest
                        }
                    }
                    this.setData({
                        goodsall: goodsall,
                        goods: goodsall
                    })
                }
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
        var height = app.globalData.getPageHeight()
        this.setData({
            pgheight: height - 133,
            goodsheight: (height - 182) / 2,
        })
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