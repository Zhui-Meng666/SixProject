// pages/Activity/release/release.js
import Toast from '@vant/weapp/toast/toast';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        actdetail: {
            活动标题: '',
            活动时间: '',
            活动地点: '',
            人数上限: '',
            SUFE币: '',
        },
        fileList: [],
    },

    afterRead: function (e) {
        let fileList = this.data.fileList
        fileList.push({
            url: e.detail.file.url,
            deletable: true,
        })
        this.setData({
            fileList: fileList
        })
    },

    delete: function (e) {
        let i = e.detail.index
        this.data.fileList.splice(i, 1)
        this.setData({
            fileList: this.data.fileList
        })
    },

    submit: function (e) {
        let filepaths = this.data.fileList[0].url.split('/')
        let filename = filepaths[filepaths.length - 1]
        this.setData({
            loading: true
        })
        wx.cloud.uploadFile({
            cloudPath: filename,
            filePath: this.data.fileList[0].url, // 文件路径
            success: (res) => {
                // get resource ID
                console.log("成功", res.fileID)
                this.setData({
                    loading: false,
                    fileID: res.fileID
                })
                Toast.success("提交成功")
                wx.cloud.callFunction({
                    name: 'httppost',
                    data: {
                        url: app.globalData.baseurl + 'activity_post/',
                        data: {
                            title: this.data.actdetail['活动标题'],
                            time: this.data.actdetail['活动时间'],
                            picture: res.fileID,
                            address: this.data.actdetail['活动地点'],
                            prize: Number(this.data.actdetail['SUFE币']),
                            upper_limit: Number(this.data.actdetail['人数上限']),
                            introduction: this.data.intro
                        }
                    },
                    success: (res) => {
                        console.log("成功", res.result)
                    },
                    fail: (err) => {
                        console.log("失败", err)
                    }
                })        
            },
            fail: (err) => {
                // handle error
                console.log("失败", err)
            }
        })
    },

    change: function (e) {
        let key = e.currentTarget.id
        this.data.actdetail[key] = e.detail.value
    },

    changeintro: function (e) {
        this.data.intro = e.detail.value
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