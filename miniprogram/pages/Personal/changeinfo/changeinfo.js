// pages/Personal/changeinfo/changeinfo.js
import Toast from '@vant/weapp/toast/toast';
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        stuid: '2019111637',
        uneditable: true,
        gender: '1',
        intro: '这个人很神秘，什么都没有~'
    },

    edit: function (e) {
        this.setData({
            uneditable: false,
        })
    },

    substuid: function (e) {
        this.setData({
            stuid: e.detail.value
        })
    },

    subintro: function (e) {
        this.setData({
            intro: e.detail.value
        })
    },

    onChange: function (e) {
        this.setData({
            gender: e.detail
        })
    },

    save: function (e) {
        var submitdata = {
            openid: app.globalData.openid,
            student_id: this.data.stuid,
            gender: this.data.gender,
            introduction: this.data.userintro,
        }
        Toast.success('已保存')
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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