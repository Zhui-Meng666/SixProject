// pages/Personal/career/career.js
let app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        show1: false,
        show2: false,
        show3: false,
        show4: false,

        athlete: [],
        athlete1: [],
        referee: [],
        referee1: [],

        activity: [],
        activity1: [],

    },

    onChange: function (e) {
        this.setData({
            value: e.detail,
        })
    },
    onSearch1: function (e) {
        var newlist = []
        var text = this.data.value
        var list = this.data.play
        var len = list.length
        for (let i = 0; i < len; ++i) {
            if (list[i].date.indexOf(text) != -1 || list[i].class.indexOf(text) != -1 || list[i].partner.indexOf(text) != -1) {
                newlist.push(list[i])
            }
        }
        this.setData({
            play: newlist
        })
    },
    onSearch2: function (e) {
        var newlist = []
        var text = this.data.value
        var list = this.data.activity
        var len = list.length
        for (let i = 0; i < len; ++i) {
            if (list[i].activity_name.indexOf(text) != -1 || list[i].date.indexOf(text) != -1) {
                newlist.push(list[i])
            }
        }
        this.setData({
            activity: newlist
        })
    },
    onSearch3: function (e) {
        var newlist = []
        var text = this.data.value
        var list = this.data.athlete
        var len = list.length
        for (let i = 0; i < len; ++i) {
            if (list[i].game_name.indexOf(text) != -1 || list[i].class.indexOf(text) != -1 || list[i].date.indexOf(text) != -1) {
                newlist.push(list[i])
            }
        }
        this.setData({
            athlete: newlist
        })
    },
    onSearch4: function (e) {
        var newlist = []
        var text = this.data.value
        var list = this.data.referee
        var len = list.length
        for (let i = 0; i < len; ++i) {
            if (list[i].game_name.indexOf(text) != -1 || list[i].identity.indexOf(text) != -1 || list[i].date.indexOf(text) != -1) {
                newlist.push(list[i])
            }
        }
        this.setData({
            referee: newlist
        })
    },
    onFocus: function (e) {
        this.setData({
            showcancel: true
        })
    },

    onCancel: function (e) {
        this.setData({
            athlete: this.data.athlete1,
            referee: this.data.referee1,
            activity: this.data.activity1,
            play: this.data.play1,
            showcancel: false
        })
    },

    showPopup1() {
        this.setData({
            show1: true
        });
    },
    showPopup2() {
        this.setData({
            show2: true
        });
    },
    showPopup3() {
        this.setData({
            show3: true
        });
    },
    showPopup4() {
        this.setData({
            show4: true
        });
    },
    onClose1() {
        this.setData({
            show1: false
        });
    },
    onClose2() {
        this.setData({
            show2: false
        });
    },
    onClose3() {
        this.setData({
            show3: false
        });
    },
    onClose4() {
        this.setData({
            show4: false
        });
    },
    back2main: function () {
        wx.navigateTo({
            url: '../main/main.wxml',
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.cloud.callFunction({
            name: 'httprequest',
            data: {
                url: app.globalData.baseurl + 'career_activity/',
                data: {
                    openid: app.globalData.openid
                }
            },
            success: (res) => {
                this.setData({
                    activity: res.result.data,
                    activity1: res.result.data
                })
            },
            fail: (res) => {
                console.log(res)
            }
        })

        // 比赛
        wx.cloud.callFunction({
            name: 'httprequest',
            data: {
                url: app.globalData.baseurl + 'career_match/',
                data: {
                    openid: app.globalData.openid
                }
            },
            success: (res) => {
                this.setData({
                    athlete: res.result.data,
                    athlete1: res.result.data
                })
            }
        })

        // 执裁
        wx.cloud.callFunction({
            name: 'httprequest',
            data: {
                url: app.globalData.baseurl + "career_referee/",
                data: {
                    openid: app.globalData.openid
                }
            },
            success: (res) => {
                this.setData({
                    referee: res.result.data,
                    referee1: res.result.data
                })
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
        // 活动

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