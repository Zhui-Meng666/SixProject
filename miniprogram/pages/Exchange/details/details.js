// pages/Exchange/details/details.js
import Toast from '@vant/weapp/toast/toast';

function sleep(numberMillis) {
    var now = new Date();
    var exitTime = now.getTime() + numberMillis;
    while (true) {
        now = new Date();
        if (now.getTime() > exitTime)
            return;
    }
}
Page({

    /**
     * 页面的初始数据
     */
    data: {
        show: false,
        id: '0',
        goodsimg: '../../../images/goodsimg.jpg',
        addr: '武东路三教101',
        day: 3,
        price: 20
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
        sleep(1000)
        this.setData({
            show: false,
        })
        Toast.success('兑换成功')
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var deadline = '2021/11/20'
        var now = new Date()
        var dead = new Date(Date.parse(deadline))
        var day = parseInt(Math.abs(now - dead) / 1000 / 60 / 60 / 24)+1
        this.setData({
            id: options.id,
            day: day
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