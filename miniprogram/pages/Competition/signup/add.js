// pages/Entertainment/signup/add.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
      list : []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    create_finished: function(e) {
      var name = this.data.name
      var sid = this.data.sid
      var ins = this.data.ins
      var gender = this.data.gender

      var temp = {name:name, sid:sid, ins:ins, gender:gender}
      var list = this.data.list
      list.push(temp)
      // console.log(list)
      wx.redirectTo({
        url: './signup?list='+JSON.stringify(list)
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
    onLoad: function (options) {
      var ath = JSON.parse(options.list)
      this.setData({
        list : ath 
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