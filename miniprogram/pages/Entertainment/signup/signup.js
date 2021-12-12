// pages/Entertainment/signup/signup.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        athlete : [
            {
                sid : '2019',
                name : '小明',
                ins : '信息管理与工程学院',
                gender : '男'
            }
        ],
        list : []
    },
    add_item : function(e){
        var list = this.data.athlete
        wx.navigateTo({
          url: './add?list='+list,
        })
    },
    submit : function(e){
        wx.redirectTo({
          url: '../main/main',
        })
    },
    mod : function(e){
        let idx = e.currentTarget.id;
        // let idx = 0;
        console.log(idx)
        let name = this.data.athlete[idx].name
        let ins = this.data.athlete[idx].ins
        let sid = this.data.athlete[idx].sid
        let gender = this.data.athlete[idx].gender
        var list = this.data.athlete
        wx.navigateTo({
            url: './mod?name='+name+'&ins='+ins+'&sid='+sid + '&gender='+gender + '&list='+list,
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // console.log(options.name)
        // var list = options.list
        // this.setData({
        //     athlete : list 
        // })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function (options) {
        var list = options.list
        this.setData({
            athlete : list 
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