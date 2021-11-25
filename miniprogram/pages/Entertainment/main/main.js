// pages/Entertainment/main/main.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        active : 0,
        bottom_active : 'entertainment',
        acts : [
            {
                coverimg : '../../../images/Cat.jpeg',
                name : '1234组',
                detail : '菜鸡互啄队',
                number : 3,
                date : '2021-3-7'
            },
            {
                coverimg : '../../../images/Cat.jpeg',
                name : '3311组',
                detail : '菜鸡互啄队',
                number : 4,
                date : '2021-5-8'
            },
            {
                coverimg : '../../../images/Cat.jpeg',
                name : '8821组',
                detail : '菜鸡互啄队',
                number : 2,
                date : '2021-10-7'
            },
            {
                coverimg : '../../../images/Cat.jpeg',
                name : '1234组',
                detail : '菜鸡互啄队',
                number : 3,
                date : '2021-4-7'
            },
        ],
        acts_show : [
            {
                coverimg : '../../../images/Cat.jpeg',
                name : '1234组',
                detail : '菜鸡互啄队',
                number : 3,
                date : '2021-3-7'
            },
            {
                coverimg : '../../../images/Cat.jpeg',
                name : '3311组',
                detail : '菜鸡互啄队',
                number : 4,
                date : '2021-5-8'
            },
            {
                coverimg : '../../../images/Cat.jpeg',
                name : '8821组',
                detail : '菜鸡互啄队',
                number : 2,
                date : '2021-10-7'
            },
            {
                coverimg : '../../../images/Cat.jpeg',
                name : '1234组',
                detail : '菜鸡互啄队',
                number : 3,
                date : '2021-4-7'
            },
        ],

        date : [
            {
                coverimg : '../../../images/Cat.jpeg',
                name : 'ABC',
                class : '女子单打',
                number : 2,
                date : '2021-3-7'
            },
            {
                coverimg : '../../../images/Cat.jpeg',
                name : 'CDE ABC QWE',
                class : '女子双打',
                number : 4,
                date : '2021-5-8'
            },
            {
                coverimg : '../../../images/Cat.jpeg',
                name : 'ADC QWE RTY',
                class : '混合双打',
                number : 4,
                date : '2021-10-7'
            },
        ],
        date_show : [
            {
                coverimg : '../../../images/Cat.jpeg',
                name : 'ABC',
                class : '女子单打',
                number : 2,
                date : '2021-3-7'
            },
            {
                coverimg : '../../../images/Cat.jpeg',
                name : 'CDE ABC QWE',
                class : '女子双打',
                number : 4,
                date : '2021-5-8'
            },
            {
                coverimg : '../../../images/Cat.jpeg',
                name : 'ADC QWE RTY',
                class : '混合双打',
                number : 4,
                date : '2021-10-7'
            },
        ]

    },

    onChange1:function(e){
        this.setData({
            value:e.detail,
        })
    },
    onSearch1:function(e){
        var newlist = []
        var text = this.data.value
        var list = this.data.acts
        var len = list.length
        for(let i=0; i<len; i++){
            if(list[i].date.indexOf(text)!=-1 || list[i].name.indexOf(text)!=-1
            || list[i].detail.indexOf(text)!=-1){
                newlist.push(list[i])
            }
        }
        this.setData({
            acts_show : newlist
        })
    },
    onChange2:function(e){
        this.setData({
            value:e.detail,
        })
    },
    onSearch2:function(e){
        var newlist = []
        var text = this.data.value
        var list = this.data.date
        var len = list.length
        for(let i=0; i<len; i++){
            if(list[i].date.indexOf(text)!=-1 || list[i].name.indexOf(text)!=-1
            || list[i].class.indexOf(text)!=-1){
                newlist.push(list[i])
            }
        }
        this.setData({
            date_show : newlist
        })
    },
    // onChange(event){
    //     wx.showToast({
    //     //   title: `切换到标签 ${event.detail.index + 1}`,
    //     //   icon : 'none'
    //     })
    // },
    onChange(event){
        console.log(event.detail)
    },
    to_home(event){
        wx.redirectTo({
          url: '../../index/index',
        })
    },
    to_game(event){
        wx.redirectTo({
          url: '',
        })
    },
    to_entertainment(event){
        wx.redirectTo({
          url: '../../Entertainment/main/main',
        })
    },
    to_personal(event){
        wx.redirectTo({
          url: '../../Personal/main/main',
        })
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