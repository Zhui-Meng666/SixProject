// pages/Personal/career/career.js
let app = getApp()
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
                game_name : "新秀赛",
                ranking : "1st",
                date : "2019-10-10",
                class : "男子单打"
            },
            {
                game_name : '黄金赛',
                ranking : '2nd',
                date : '2020-10-10',
                class : "男子双打"
            },
            {
                game_name : '比赛3',
                ranking : '3rd',
                date : '2021-10-10',
                class : "男子单打"
            },
        ],
        athlete1 : [
            {
                game_name : "新秀赛",
                ranking : "1st",
                date : "2019-10-10",
                class : "男子单打"
            },
            {
                game_name : '黄金赛',
                ranking : '2nd',
                date : '2020-10-10',
                class : "男子双打"
            },
            {
                game_name : '比赛3',
                ranking : '3rd',
                date : '2021-10-10',
                class : "男子单打"
            },
        ],

        play : [
            {
                ground_id : '1', 
                date : '2021-2-9',
                datey : '2021',
                datem : '2',
                dated : '9',
                partner : 'ABC',
                class : '单打'
            },
            {
                ground_id: '2',
                date : '2021-3-9',
                datey : '2021',
                datem : '3',
                dated : '9',
                partner : 'QWE',
                class : '男女双打'
            },
        ],
        play1 : [
            {
                ground_id : '1', 
                date : '2021-2-9',
                datey : '2021',
                datem : '2',
                dated : '9',
                partner : 'ABC',
                class : '单打'
            },
            {
                ground_id: '2',
                date : '2021-3-9',
                datey : '2021',
                datem : '3',
                dated : '9',
                partner : 'QWE',
                class : '男女双打'
            },
        ],

        referee : [
            {
                game_name : '新生杯',
                game_id : 2,
                date : '2021-5-10',
                identity : '主裁',
                score : '+8'
            },
            {
                game_name : '老生杯',
                game_id : 1,
                date : '2021-10-10',
                identity : '边裁',
                score : '-2'
            }
        ],
        referee1 : [
            {
                game_name : '新生杯',
                game_id : 2,
                date : '2021-5-10',
                identity : '主裁',
                score : '+8'
            },
            {
                game_name : '老生杯',
                game_id : 1,
                date : '2021-10-10',
                identity : '边裁',
                score : '-2'
            }
        ],

        activity : [
            {
                activity_name : '宣讲会',
                date : '2021-3-10',
                img : 'test.png',
                sb : 8
            }
        ],
        activity1 : [
            {
                activity_name : '宣讲会',
                date : '2021-3-10',
                img : 'test.png',
                sb : 8
            }
        ],

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
            if (list[i].date.indexOf(text) != -1 || list[i].class.indexOf(text)!=-1 || list[i].partner.indexOf(text)!=-1) {
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
            if (list[i].activity_name.indexOf(text) != -1 || list[i].date.indexOf(text)!=-1) {
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
            if (list[i].game_name.indexOf(text) != -1 || list[i].class.indexOf(text)!=-1 || list[i].date.indexOf(text)!=-1) {
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
            if (list[i].game_name.indexOf(text) != -1 || list[i].identity.indexOf(text)!=-1 || list[i].date.indexOf(text)!=-1) {
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
            referee : this.data.referee1,
            activity : this.data.activity1,
            play : this.data.play1,
            showcancel: false
        })
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
    back2main: function() {
        wx.navigateTo({
          url: '../main/main.wxml',
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