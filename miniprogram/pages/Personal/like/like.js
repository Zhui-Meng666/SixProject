// pages/Personal/like/like.js
let app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        videonum: 100,
        userlike: [{
                src: '../../../images/videoimg.jpg',
                title: '我'
            },
            {
                src: '../../../images/videoimg.jpg',
                title: '你'
            },
            {
                src: '../../../images/videoimg.jpg',
                title: '他'
            },
            {
                src: '../../../images/videoimg.jpg',
                title: '视频标题'
            },
            {
                src: '../../../images/videoimg.jpg',
                title: '视频标题'
            },
            {
                src: '../../../images/videoimg.jpg',
                title: '视频标题'
            },
            {
                src: '../../../images/videoimg.jpg',
                title: '我'
            },
            {
                src: '../../../images/videoimg.jpg',
                title: '你'
            },
            {
                src: '../../../images/videoimg.jpg',
                title: '他'
            },
            {
                src: '../../../images/videoimg.jpg',
                title: '视频标题'
            },
            {
                src: '../../../images/videoimg.jpg',
                title: '视频标题'
            },
            {
                src: '../../../images/videoimg.jpg',
                title: '视频标题'
            }
        ],
        likelist: [{
                src: '../../../images/videoimg.jpg',
                title: '我'
            },
            {
                src: '../../../images/videoimg.jpg',
                title: '你'
            },
            {
                src: '../../../images/videoimg.jpg',
                title: '他'
            },
            {
                src: '../../../images/videoimg.jpg',
                title: '视频标题'
            },
            {
                src: '../../../images/videoimg.jpg',
                title: '视频标题'
            },
            {
                src: '../../../images/videoimg.jpg',
                title: '视频标题'
            },
            {
                src: '../../../images/videoimg.jpg',
                title: '我'
            },
            {
                src: '../../../images/videoimg.jpg',
                title: '你'
            },
            {
                src: '../../../images/videoimg.jpg',
                title: '他'
            },
            {
                src: '../../../images/videoimg.jpg',
                title: '视频标题'
            },
            {
                src: '../../../images/videoimg.jpg',
                title: '视频标题'
            },
            {
                src: '../../../images/videoimg.jpg',
                title: '视频标题'
            }
        ],
    },

    onChange: function (e) {
        this.setData({
            value: e.detail,
        })
    },

    onSearch: function (e) {
        var newlist = []
        var text = this.data.value
        var list = this.data.userlike
        var len = list.length
        for (let i = 0; i < len; ++i) {
            if (list[i].title.indexOf(text) != -1) {
                newlist.push(list[i])
            }
        }
        this.setData({
            likelist: newlist
        })
    },

    onFocus: function (e) {
        this.setData({
            showcancel: true
        })
    },

    onCancel: function (e) {
        this.setData({
            likelist: this.data.userlike,
            showcancel: false
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var height = app.globalData.getPageHeight()
        // console.log(height)
        this.setData({
            pgheight: height - 132,
            likeheight: (height-132)/3,
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