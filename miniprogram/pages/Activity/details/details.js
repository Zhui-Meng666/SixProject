// pages/Activity/details/details.js
import Toast from '@vant/weapp/toast/toast';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        title: '活动标题',
        coinnum: 100,
        time: 'xx年xx月xx日',
        addr: 'xxxx',
        have_sign: 30,
        personum: 50,
        intro: '这是一场精彩的活动，期待你的参与！',
        button: '点击报名'
    },

    submit: function (e) {
        this.setData({
            loading: true
        })
        if (this.data.button == "点击报名") {
            wx.cloud.callFunction({
                name: 'httppost',
                data: {
                    url: app.globalData.baseurl + 'activity_sign_up/',
                    data: {
                        openid: app.globalData.openid,
                        activity_id: this.data.activity_id
                    }
                },
                success: (res) => {
                    console.log("成功", res.result)
                    this.setData({
                        loading: false,
                    })
                    Toast.success("报名成功")
                },
                fail: (err) => {
                    console.log("失败", err)
                }
            })    
        } else {
            wx.cloud.callFunction({
                name: 'httppost',
                data: {
                    url: app.globalData.baseurl + 'activity_sign_up_cancel/',
                    data: {
                        openid: app.globalData.openid,
                        activity_id: this.data.activity_id
                    }
                },
                success: (res) => {
                    console.log("成功", res.result)
                    this.setData({
                        loading: false,
                    })
                    Toast.success("取消报名成功")
                },
                fail: (err) => {
                    console.log("失败", err)
                }
            })    
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        if (options.type == '0') {
            this.setData({
                activity_id: options.id,
                button: '点击报名'
            })
        } else {
            this.setData({
                activity_id: options.id,
                button: '取消报名'
            })
        }
        wx.cloud.callFunction({
            name: 'httprequest',
            data: {
                url: app.globalData.baseurl + 'activity_detail_show/',
                data: {
                    id: options.id,
                }
            },
            success: (res) => {
                console.log("成功", res.result)
                let data = res.result.data
                this.setData({
                    title: data.title,
                    coinnum: data.prize,
                    time: data.time,
                    addr: data.address,
                    have_sign: data.have_sign_up,
                    personum: data.upper_limit,
                    intro: data.introduction,
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