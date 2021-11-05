// pages/Personal/career/career.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        show1 : false,
        show2 : false,
        show3 : false,
        show4 : false,

        athlete : [
            {
                game_name : "比赛1",
                ranking : "1st",
                date : "2021-10-10"
            },
            {
                game_name : '比赛2',
                ranking : '2nd',
                date : '2021-10-10'
            },
            {
                game_name : '比赛3',
                ranking : '3rd',
                date : '2021-10-10'
            },
        ],

        play : [
            {
                ground_id : '1', 
                Stime : '2021-2-9 20:00:00',
                Etime : '2021-2-9 21:00:00'
            },
            {
                ground_id: '2',
                Stime : '2021-2-11 15:00:00',
                Etime : '2021-2-11 17:00:00'
            },
        ],

        referee : [
            {
                game_name : '新生杯',
                date : '2021-5-10',
                identity : '主裁判'
            },
            {
                game_name : '老生杯',
                date : '2021-10-10',
                identity : '辅助裁判'
            }
        ],

        activity : [
            {
                activity_name : '宣讲会',
                date : '2021-3-10',
            }
        ],

    },

    showPopup1() {
        this.setData({show1:true});
    },
    showPopup2() {
        this.setData({show2:true});
    },
    showPopup3() {
        this.setData({show3:true});
    },
    showPopup4() {
        this.setData({show4:true});
    },
    onClose1() {
        this.setData({show1:false});
    },
    onClose2() {
        this.setData({show2:false});
    },
    onClose3() {
        this.setData({show3:false});
    },
    onClose4() {
        this.setData({show4:false});
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