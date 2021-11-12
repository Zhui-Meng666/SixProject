// pages/Personal/prize/prize.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        test_data : [
            {
                imgsrc : '../../../images/test.png',
                name : '火箭0',
                date : '2021-10-10',
                price : '99',
                postID : 0,
                sb : 9,
            },
            {
                imgsrc : '../../../images/test.png',
                name : '火箭1',
                date : '2021-10-10',
                price : '99',
                postID : 1,
                sb : 8,
            },
            {
                imgsrc : '../../../images/test.png',
                name : '火箭2',
                date : '2021-10-10',
                price : '99',
                postID : 2,
                sb : 8,
            },
            {
                imgsrc : '../../../images/test.png',
                name : '火箭3',
                date : '2021-10-10',
                price : '99',
                postID : 3,
                sb : 8,
            },
            {
                imgsrc : '../../../images/test.png',
                name : '火箭4',
                date : '2021-10-10',
                price : '99',
                postID : 4,
                sb : 8,
            }
        ],
        sb_src : './sufe币.png'
    },

    sum(test_data) {
        var res = 0;
        for (var i=0;i<test_data.length;i++){
            res += test_data[i].sb;
        }
        return res;
      },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        
    },

    onPost: function (event) {

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