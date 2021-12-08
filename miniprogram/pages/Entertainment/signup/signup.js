// pages/Entertainment/signup/signup.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        athlete : [
            {
                name : '小明',
                ins : '信息管理与工程学院',
                sid : '2019111571',
                gender : '男'
            }
        ]
    },


    add_item : function(e){
        wx.navigateTo({
          url: './add',
        })
    },
    submit : function(e){
        wx.redirectTo({
          url: '../main/main',
        })
    },
    mod : function(e){
        // let idx = e.currentTarget.dataset.index;
        let idx = 0;
        console.log(idx)
        let name = this.data.athlete[idx].name
        let ins = this.data.athlete[idx].ins
        let sid = this.data.athlete[idx].sid
        let gender = this.data.athlete[idx].gender
        wx.navigateTo({
            url: './mod?name='+name+'&ins='+ins+'&sid='+sid + '&gender='+gender + '&idx'+idx,
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // let idx = options.idx
        // let aths = this.data.athlete
        // let ath = {
        //     options + '.' + name, 
        //     options.ins,
        //     options.ins,
        //     options.gender
        // }

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