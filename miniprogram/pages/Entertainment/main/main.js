// pages/Entertainment/main/main.js
let app = getApp()
let conn = wx.WebIM.conn
Page({

    /**
     * 页面的初始数据
     */
    data: {
        active : 0,
        bottom_active : 'entertainment',
        create_img : '../../../images/Cat.jpeg',
        acts : [
            {
                coverimg : '../../../images/Cat.jpeg',
                name : '1234组',
                detail : '菜鸡互啄队',
                number : 3,
                date : '2021-3-7',
                state : '准备中'
            },
            {
                coverimg : '../../../images/Cat.jpeg',
                name : '3311组',
                detail : '菜鸡互啄队',
                number : 4,
                date : '2021-5-8',
                state : '准备中'
            },
            {
                coverimg : '../../../images/Cat.jpeg',
                name : '8821组',
                detail : '菜鸡互啄队',
                number : 2,
                date : '2021-10-7',
                state : '乱斗中'
            },
            {
                coverimg : '../../../images/Cat.jpeg',
                name : '1234组',
                detail : '菜鸡互啄队',
                number : 3,
                date : '2021-4-7',
                state : '准备中'
            },
        ],
        acts_show : [
            {
                coverimg : '../../../images/Cat.jpeg',
                name : '1234组',
                detail : '菜鸡互啄队',
                number : 3,
                date : '2021-3-7',
                state : '准备中'
            },
            {
                coverimg : '../../../images/Cat.jpeg',
                name : '3311组',
                detail : '菜鸡互啄队',
                number : 4,
                date : '2021-5-8',
                state : '准备中'
            },
            {
                coverimg : '../../../images/Cat.jpeg',
                name : '8821组',
                detail : '菜鸡互啄队',
                number : 2,
                date : '2021-10-7',
                state : '乱斗中'
            },
            {
                coverimg : '../../../images/Cat.jpeg',
                name : '1234组',
                detail : '菜鸡互啄队',
                number : 3,
                date : '2021-4-7',
                state : '准备中'
            },
        ],

        date : [
            {
                coverimg : '../../../images/Cat.jpeg',
                name : '三缺一',
                class : '女子单打',
                number : 2,
                date : '2021-3-7'
            },
            {
                coverimg : '../../../images/Cat.jpeg',
                name : '菜鸡互啄',
                class : '女子双打',
                number : 4,
                date : '2021-5-8'
            },
            {
                coverimg : '../../../images/Cat.jpeg',
                name : '有梦你就来',
                class : '混合双打',
                number : 4,
                date : '2021-10-7'
            },
        ],
        date_show : [
            {
                coverimg : '../../../images/Cat.jpeg',
                name : '三缺一',
                class : '女子单打',
                number : 2,
                date : '2021-3-7'
            },
            {
                coverimg : '../../../images/Cat.jpeg',
                name : '菜鸡互啄',
                class : '女子双打',
                number : 4,
                date : '2021-5-8'
            },
            {
                coverimg : '../../../images/Cat.jpeg',
                name : '有梦你就来',
                class : '混合双打',
                number : 4,
                date : '2021-10-7'
            },
        ]

    },

    createGroup: function (e) {
        wx.navigateTo({
          url: '../buttle/buttle',
        })
        // console.log("groupid:166777887719425")
        // let options = {
        //     data: {
        //         groupname: 'noname', // 群组名
        //         desc: 'group description', // 群组描述
        //         members: ['o1Kyy4vYqC42XNci7QIYpXLJQZD4'], // 用户名组成的数组
        //         public: true, // pub等于true时，创建为公开群
        //         approval: false, // approval为true，加群需审批，为false时加群无需审批
        //         allowinvites: false, // true：允许群成员邀请人加入此群，false：只有群主才可以往群里加人 注意公开群（public：true),则不允许群成员邀请别人加入此群
        //         inviteNeedConfirm: false // 邀请加群，被邀请人是否需要确认。true 为需要被邀请者同意才会进群
        //     },
        //     success(res) {
        //         console.log('成功', res.data.groupid)  //返回群组的id，其他页面要用
        //     },
        //     error(err) {
        //         console.log('失败', err)
        //     },
        // };
        // conn.createGroupNew(options);
    },

    Tobattle: function (e) {
        wx.navigateTo({
            url: '../buttle/buttle',
        })
    },

    ToCreate: function(e) {
        wx.navigateTo({
          url: '../create/create',
        })
    },

    Toappoint: function (e) {
        wx.navigateTo({
            url: '../appoint/appoint',
        })
    },

    onChange1: function (e) {
        this.setData({
            value: e.detail,
        })
    },
    onSearch1: function (e) {
        var newlist = []
        var text = this.data.value
        var list = this.data.acts
        var len = list.length
        for (let i = 0; i < len; i++) {
            if (list[i].date.indexOf(text) != -1 || list[i].name.indexOf(text) != -1 ||
                list[i].detail.indexOf(text) != -1) {
                newlist.push(list[i])
            }
        }
        this.setData({
            acts_show: newlist
        })
    },
    onChange2: function (e) {
        this.setData({
            value: e.detail,
        })
    },
    onSearch2: function (e) {
        var newlist = []
        var text = this.data.value
        var list = this.data.date
        var len = list.length
        for (let i = 0; i < len; i++) {
            if (list[i].date.indexOf(text) != -1 || list[i].name.indexOf(text) != -1 ||
                list[i].class.indexOf(text) != -1) {
                newlist.push(list[i])
            }
        }
        this.setData({
            date_show: newlist
        })
    },
    // onChange(event){
    //     wx.showToast({
    //     //   title: `切换到标签 ${event.detail.index + 1}`,
    //     //   icon : 'none'
    //     })
    // },
    onChange(event) {
        console.log(event.detail)
    },
    to_home(event) {
        wx.redirectTo({
            url: '../../index/index',
        })
    },
    to_game(event) {
        wx.redirectTo({
          url: '../../Competition/main/main',
        })
    },
    to_entertainment(event) {
        wx.redirectTo({
            url: '../../Entertainment/main/main',
        })
    },
    to_personal(event) {
        wx.redirectTo({
            url: '../../Personal/main/main',
        })
    },

    close_create: function(e){
        this.setData({
            show_create : false,
        })
    },
    create: function(e) {
        this.setData({
            show_create : true,
        })
    },
    check_create(event) {
        console.log(event.detail)
    },
    create_done: function(e){
        this.setData({
            show_create : false,
        })
    },
    add_appoint: function(e){
        
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },
    uploadimg : function(e) {
        wx.chooseImage({
          count: 1,
          sizeType : ['original', 'compressed'],
          sourceType : ['album', 'camera'],
          success : function(res) {
              var tempFilePaths = res.tempFilePaths;
              let new_img = tempFilePaths;
              this.setData({
                  create_img : new_img
              })
          }
        })
    },
    to_create_acts: function(e){
        wx.navigateTo({
          url: '../signup/signup',
        })
    },
    to_appoint: function(e){
        wx.navigateTo({
          url: '../appoint/appoint',
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