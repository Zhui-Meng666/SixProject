// pages/Exchange/main/mian.js
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        coinnum: 100,
        goods: {
            '0': {
                src: '../../../images/goodsimg.jpg',
                name: '雨伞',
                price: 20,
                sold: 11,
                total: 20
            },
            '1': {
                src: '../../../images/goodsimg.jpg',
                name: '雨伞',
                price: 20,
                sold: 11,
                total: 20
            },
            '2': {
                src: '../../../images/goodsimg.jpg',
                name: '我',
                price: 20,
                sold: 11,
                total: 20
            },
            '3': {
                src: '../../../images/goodsimg.jpg',
                name: '你',
                price: 20,
                sold: 11,
                total: 20
            },
            '4': {
                src: '../../../images/goodsimg.jpg',
                name: '你',
                price: 20,
                sold: 11,
                total: 20
            },
            '5': {
                src: '../../../images/goodsimg.jpg',
                name: '他',
                price: 20,
                sold: 11,
                total: 20
            },
        },
        goodsall: {
            '0': {
                src: '../../../images/goodsimg.jpg',
                name: '雨伞',
                price: 20,
                sold: 11,
                total: 20
            },
            '1': {
                src: '../../../images/goodsimg.jpg',
                name: '雨伞',
                price: 20,
                sold: 11,
                total: 20
            },
            '2': {
                src: '../../../images/goodsimg.jpg',
                name: '我',
                price: 20,
                sold: 11,
                total: 20
            },
            '3': {
                src: '../../../images/goodsimg.jpg',
                name: '你',
                price: 20,
                sold: 11,
                total: 20
            },
            '4': {
                id: '4',
                src: '../../../images/goodsimg.jpg',
                name: '你',
                price: 20,
                sold: 11,
                total: 20
            },
            '5': {
                src: '../../../images/goodsimg.jpg',
                name: '他',
                price: 20,
                sold: 11,
                total: 20
            },
        },
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
            url: '../details/details?id=' + id,
            events: {
                exchange: function (res) {
                    var goods = that.data.goods
                    var data = res.data
                    goods[data.id].sold += 1
                    that.setData({
                        coinnum: that.data.coinnum-data.reduce,
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
        var height = app.globalData.getPageHeight()
        this.setData({
            pgheight: height - 133,
            goodsheight: (height - 182) / 2,
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