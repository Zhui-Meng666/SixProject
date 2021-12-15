// pages/Competition/main/main.js
let app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        home: false,
        com: true,
        ent: false,
        per: false,

        activate_1: 0,
        activate_2: 0,
 
        show_signup_ath: false,
        show_signup_ref: false,

        bottom_active: 'game',
        img_default: '../../../images/Cat.jpeg',
        games: [{
                id: 123,
                name: 'test',
                start_time: '2021-02-17',
                end_time: '2021-02-17',
                address: 'place',
                introduction: '123',
                type: '体教部',
                status: '准备中'
            },
            {
                status: '进行中',
                id: 1,
                schedule_arrange: '../../../images/Cat.jpeg',
                referee_arrange: '../../../images/Cat.jpeg',
                competitors: '../../../images/Cat.jpeg',
                top_eight: '../../../images/Cat.jpeg',
                single_match: [{
                    id: 1,
                    competitor1: 'ABC',
                    competitor2: 'CDE',
                    type: '男子单打',
                    create_time: '2021-10-21',
                    refree: 'ADC',
                    totalscore: {
                        score1: 10,
                        score2: 11
                    }
                }]
            },
            {
                id: 123,
                name: 'test',
                start_time: '2021-02-17',
                end_time: '2021-02-17',
                address: 'place',
                introduction: '123',
                type: '体教部',
                status: '已完成'
            },
            
        ],
        games_over : [
            {
                type : '体教部',
                name : '求王争霸赛',
                single_match : [
                    {
                        id : '001',
                        competitor1 : 'Ming',
                        competitor2 : 'Ning',
                        type : '男子双打',
                        create_time : '2021-12-17',
                        refree : 'UZI',
                        totalscore : {
                            score1 : 12,
                            score2 : 13
                        },
                        free : {
                            competitor1 : 12,
                            competitor2 : 13,
                            refree : 20
                        }
                    }
                ]
            }
        ],
        games_on: [
            {
                status: '进行中',
                id: 1,
                schedule_arrange: '../../../images/Cat.jpeg',
                referee_arrange: '../../../images/Cat.jpeg',
                competitors: '../../../images/Cat.jpeg',
                top_eight: '../../../images/Cat.jpeg',
                single_match: [{
                    id: 1,
                    competitor1: 'Faker',
                    competitor2: 'Showmaker',
                    type: '男子单打',
                    create_time: '2021-10-21',
                    refree: 'Xiaohu',
                    totalscore: {
                        score1: 10,
                        score2: 11
                    }
                }]
            },
        ],
        acts: []
    },

    toAct: function (e) {
        var id = this.data.acts[e.currentTarget.dataset.index].id //活动id
        console.log(id)
        wx.navigateTo({
            url: '../../Activity/details/details?id=' + id + '&type=0', //type = 0表示报名
        })
    },

    toCan: function (e) {
        var id = this.data.acts[e.currentTarget.dataset.index].id //活动id
        wx.navigateTo({
            url: '../../Activity/details/details?id=' + id + '&type=1', //type = 1表示取消报名
        })
    },

    search_change: function (e) {
        this.setData({
            value: e.detail,
        })
    },

    signup_ath: function (e) {
        let idx = e.currentTarget.dataset.index
        let games = this.data.games
        let gameid = games[idx].id
        let game_type = games[idx].type
        wx.navigateTo({
            url: '../signup/signup?gameid=' + JSON.stringify(gameid) + '&game_type=' + game_type
        })
    },

    signup_ref: function (e) {
        let idx = e.currentTarget.dataset.index
        let games = this.data.games
        let gameid = games[idx].id
        wx.navigateTo({
            url: '../ref_signup/ref_signup?gameid=' + gameid,
        })
    },
    start_game: function (e) {
        var idx = e.currentTarget.dataset.index
        var game = this.data.games[idx]
        var match_id = game.id 
        var openid = app.globalData.openid
        wx.cloud.callFunction({
            name : 'httprequest',
            data : {
                url : app.globalData.baseurl  + 'match_detail_info_show/',
                data : {
                    openid : openid,
                    match_id : match_id 
                }
            },
            success:(res)=>{
                wx.navigateTo({
                  url: '../detail_com/detail_com?data=' + JSON.stringify(res.result.data) + '&name=' + game.name,
                })
            }
        })
    },
    select_gender(event) {
        this.setData({
            checked: event.detail
        })
    },
    select_ins(event) {
        const {
            picker,
            value,
            index
        } = event.detail;
        this.setData({
            ins_selected: value
        })
    },
    // select_proj(event){
    //     const {}
    // },
    close_select_ins: function (e) {
        this.setData({
            show_select_ins: false
        })
    },
    close_signup_ath: function (e) {
        this.setData({
            show_signup_ath: false
        })
    },
    close_signup_ref: function (e) {
        this.setData({
            show_signup_ref: false
        })
    },
    to_home(event) {
        wx.redirectTo({
            url: '../../index/index',
        })
    },
    to_game(event) {
        wx.redirectTo({
            url: './main',
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

    add_act: function (e) {
        wx.navigateTo({
            url: '../../Activity/release/release',
        })
    },
    add_com: function (e) {
        wx.navigateTo({
            url: '../add_com/add_com',
        })
    },
    res_com: function (e) {
        wx.navigateTo({
            url: '../res_com/res_com',
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    // onLoad: function (options) {
    //     var openid = app.globalData.openid
    //     // 所有比赛
    //     wx.cloud.callFunction({
    //         name : 'httprequest',
    //         data : {
    //             url : app.globalData.baseurl + "match_show/",
    //         },
    //         success:(res)=>{
    //             console.log(res)
    //             this.setData({
    //                 games : res.result.data 
    //             })
    //         },
    //         fail:(err)=>{
    //             console.log(err)
    //         }
    //     })

    //     // 已完成的比赛
    //     var match_id = []
    //     for(let i=0;i<this.games.length;i++){
    //         if(this.games[i].status == '已完成'){
    //             match_id.push(this.games[i].id)
    //         }
    //     }
    //     var games_over = []
    //     for(let i=0;i<match_id.length;i++){
    //         var id = match_id[i]
    //         wx.cloud.callFunction({
    //             name : 'httprequest',
    //             data : {
    //                 url : app.globalData.baseurl + 'match_single_result_info_show/',
    //                 data : {
    //                     match_id : id 
    //                 }
    //             },
    //             success:(res) =>{
    //                 games_over.push(res.result.data)
    //             }
    //         })
    //     }
        

    //     // 所有活动
    //     wx.cloud.callFunction({
    //         name : 'httprequest',
    //         data : {
    //             url : app.globalData.baseurl + 'activity_show/',
    //         },
    //         success:(res)=>{
    //             this.setData({
    //                 acts : res.result.data
    //             })
    //         }
    //     })
    //     // 已经报名的活动
    //     wx.cloud.callFunction({
    //         name : 'httprequest',
    //         data : {
    //             url : app.globalData.baseurl + 'activity_have_sign_up_show/',
    //             data : {
    //                 openid : openid
    //             }
    //         },
    //         success:(res)=>{
    //             this.setData({
    //                 acts_signed : res.result.data 
    //             })
    //         }
    //     })
    // },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    upload_sa: function (e) {
        var idx = e.currentTarget.dataset.index
        var match = this.data.games_on[idx]
        var match_id = this.data.games_on[idx]
        wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success: (res) => {
                var tempPath = res.tempFilePaths[0]
                let tempPaths = tempPath.split('/')
                let filename = tempPaths[tempPaths.length - 1]
                wx.cloud.uploadFile({
                    cloudPath: filename,
                    filePath: tempPath,
                    success: (res) => {
                        console.log('success')
                        var games_on = this.data.games_on
                        match.schedule_arrange = res.fileID
                        games_on[idx] = match
                        this.setData({
                            games_on: games_on,
                            sa_id: res.fileID
                        })
                    },
                    fail:(err)=>{
                        console.log(err)
                    }
                })
            }
        })
    },
    upload_ra: function (e) {
        var idx = e.currentTarget.dataset.index
        var match = this.data.games_on[idx]
        var match_id = this.data.games_on[idx]
        wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success: (res) => {
                var tempPath = res.tempFilePaths[0]
                let tempPaths = tempPath.split('/')
                let filename = tempPaths[tempPaths.length - 1]
                wx.cloud.uploadFile({
                    cloudPath: filename,
                    filePath: tempPath,
                    success: (res) => {
                        match.referee_arrange = res.fileID
                        var games_on = this.data.games_on
                        games_on[idx] = match
                        this.setData({
                            games_on: games_on,
                            ra_id: res.fileID
                        })
                        // console.log(games_on)
                    },
                    fail:(err)=>{
                        console.log(err)
                    }
                })
            }
        })
    },
    upload_com: function (e) {
        var idx = e.currentTarget.dataset.index
        var match = this.data.games_on[idx]
        var match_id = this.data.games_on[idx]
        wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success: (res) => {
                var tempPath = res.tempFilePaths[0]
                let tempPaths = tempPath.split('/')
                let filename = tempPaths[tempPaths.length - 1]
                wx.cloud.uploadFile({
                    cloudPath: filename,
                    filePath: tempPath,
                    success: (res) => {
                        match.competitors = res.fileID
                        var games_on = this.data.games_on
                        games_on[idx] = match
                        this.setData({
                            games_on: games_on,
                            com_id: res.fileID
                        })
                    }
                })
            }
        })
    },
    upload_te: function (e) {
        var idx = e.currentTarget.dataset.index
        var match = this.data.games_on[idx]
        var match_id = this.data.games_on[idx]
        wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success: (res) => {
                var tempPath = res.tempFilePaths[0]
                let tempPaths = tempPath.split('/')
                let filename = tempPaths[tempPaths.length - 1]
                wx.cloud.uploadFile({
                    cloudPath: filename,
                    filePath: tempPath,
                    success: (res) => {
                        match.top_eight = res.fileID
                        var games_on = this.data.games_on
                        games_on[idx] = match
                        this.setData({
                            games_on: games_on,
                            te_id: res.fileID
                        })
                        wx.cloud.callFunction({
                            name: 'httppost',
                            data: {
                                url: app.globalData.baseurl + 'match_picture_upload/',
                                data: {
                                    match_id: match_id,
                                    schedule_arrange: match.schedule_arrange,
                                    referee_arrange: match.referee_arrange,
                                    competitors: match.competitors,
                                    top_eight: match.top_eight
                                }
                            }
                        })
                    }
                })
            }
        })
    },

    onShow: function() {
        var openid = app.globalData.openid
        // 所有比赛
        wx.cloud.callFunction({
            name : 'httprequest',
            data : {
                url : app.globalData.baseurl + "match_show/",
            },
            success:(res)=>{
                console.log(res)
                this.setData({
                    games : res.result.data 
                })
            },
            fail:(err)=>{
                console.log(err)
            }
        })

        // 已完成的比赛
        // var match_id = []
        // for(let i=0;i<this.games.length;i++){
        //     if(this.games[i].status == '已完成'){
        //         match_id.push(this.games[i].id)
        //     }
        // }
        // var games_over = []
        // for(let i=0;i<match_id.length;i++){
        //     var id = match_id[i]
        //     wx.cloud.callFunction({
        //         name : 'httprequest',
        //         data : {
        //             url : app.globalData.baseurl + 'match_single_result_info_show/',
        //             data : {
        //                 match_id : id 
        //             }
        //         },
        //         success:(res) =>{
        //             games_over.push(res.result.data)
        //         }
        //     })
        // }
        
        // 所有活动
        wx.cloud.callFunction({
            name : 'httprequest',
            data : {
                url : app.globalData.baseurl + "activity_show/",
            },
            success:(res)=>{
                console.log(res)
                this.setData({
                    acts : res.result.data 
                })
            },
            fail:(err)=>{
                console.log(err)
            }
        })
        wx.cloud.callFunction({
            name : 'httprequest',
            data : {
                url : app.globalData.baseurl + 'activity_show/',
            },
            success:(res)=>{
                console.log(res)
                this.setData({
                    acts : res.result.data
                })
            },
            fail:(err)=>{
                console.log(err)
            }
        })
        // 已经报名的活动
        wx.cloud.callFunction({
            name : 'httprequest',
            data : {
                url : app.globalData.baseurl + 'activity_have_sign_up_show/',
                data : {
                    openid : openid
                }
            },
            success:(res)=>{
                this.setData({
                    acts_signed : res.result.data 
                })
            }
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