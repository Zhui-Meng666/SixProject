// pages/Entertainment/signup/mod.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
    
    },
    mod_finished: function(e) {
        var list = this.data.list
        var name = this.data.name
        var sid = this.data.sid
        var ins = this.data.ins
        var gender = this.data.gender
        for(var i=0;i<list.length;i++){
            if(list[i].sid == sid){
                list[i].name = name
                list[i].ins = ins
                list[i].gender = gender
                break
            }
        }
        // console.log(list)
        wx.redirectTo({
          url: './signup?list=' + JSON.stringify(list) 
        })
    },
    nameInput(event){
        this.setData({name : event.detail})
      },
    sidInput(event){
        this.setData({sid : event.detail})
    },
    insInput(e){
        this.setData({ins : e.detail})
    },
    onChange(event){
        this.setData({gender:event.detail})
    },
    onClick(event){
        const {gender} = event.currentTarget.dataset
        this.setData({gender : gender})
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            list : JSON.parse(options.list),
            name : options.name,
            ins : options.ins,
            sid : options.sid,
            gender : options.gender
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