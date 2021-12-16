// pages/Entertainment/main/main.js
let app = getApp()
let conn = wx.WebIM.conn

Page({

    /**
     * 页面的初始数据
     */
    data: {
        active: 0,
        bottom_active: 'entertainment',
        show_create: false,
        team_img: '../../../images/Cat.jpeg',
        buttle: [],
        appoint: [],
        appoint_show : [],
        type : '乱斗',
        fileList : []
    },

    buttle_join_in: function (e) {
        // 申请加入乱斗群
        // let idx = e.currentTarget.dataset.index
        // console.log(idx)
        // let groups = this.data.buttle;
        // console.log(groups)
        // let group = groups[idx];
        // let groupid = group.group_id

        var group_id = this.data.group_id

        if (false) {
            console.log("抱歉，已满！")
        } else {
            wx.showModal({
                title: '申请加群',
                placeholderText: '请输入姓名',
                editable: true,
                success(res) {
                    if (res.confirm) {
                        console.log('用户点击确定')
                        conn.joinGroup({
                            groupId: groupid, // 群组ID
                            message: res.content, // 请求信息
                            success: (res) => {
                                console.log("成功", res)
                                wx.showToast({
                                    title: '已发送申请',
                                })
                            },
                            fail: (err) => {
                                console.log("失败", err)
                            }
                        })
                    } else if (res.cancel) {
                        console.log('用户点击取消')
                    }
                }
            })
            console.log("已发送申请")
        }
    },

    Tobuttle: function (e) {
        var groups = this.data.buttle
        var idx = e.currentTarget.dataset.index 
        var group = groups[idx]
        var group_id = group.group_id
        wx.navigateTo({
            url: '../buttle/buttle?group_id=' + group_id,
        })
    },

    Toappoint: function (e) {
        var groups = this.data.appoint
        var idx = e.currentTarget.dataset.index
        var group = groups[idx]
        var group_id = group.group_id 
        wx.navigateTo({
          url: '../appoint/appoint?group_id='+group_id,
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
        var list = this.data.buttle
        var len = list.length
        for (let i = 0; i < len; i++) {
            if (list[i].date.indexOf(text) != -1 || list[i].name.indexOf(text) != -1 ||
                list[i].detail.indexOf(text) != -1) {
                newlist.push(list[i])
            }
        }
        this.setData({
            buttle_show: newlist
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
        var list = this.data.appoint
        var len = list.length
        for (let i = 0; i < len; i++) {
            if (list[i].date.indexOf(text) != -1 || list[i].name.indexOf(text) != -1 ||
                list[i].class.indexOf(text) != -1) {
                newlist.push(list[i])
            }
        }
        this.setData({
            appoint_show: newlist
        })
    },

    onChange(event) {
        console.log(event.detail.title)
        this.setData({
            type : event.detail.title
        })
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
    appoint_join_in: function (e) {
        // 加入约球群
        let idx = e.currentTarget.dataset.index;
        let appoints = this.data.appoint_show;
        let appoint = appoints[idx];
        let groupid = appoint.group_id
        if (appoint.member_num < 20) {
            conn.joinGroup({
                groupId: groupid, // 群组ID
                message: '申请入群', // 请求信息
                success: (res) => {
                    console.log("成功", res)
                    wx.showToast({
                        title: '已发送申请',
                    })
                },
                fail: (err) => {
                    console.log("失败", err)
                }
            })
            console.log("已发送申请")
            wx.navigateTo({
                url: '../appoint/appoint',
            })
        } else {
            console.log("抱歉，已满！")
        }
    },
    add_buttle: function (e) {
        this.setData({
            show_create: true
        })

    },
    add_appoint: function (e) {
        this.setData({
            show_create: true
        })
    },

    // 创建群接口
    create_done: function (e) {
        var type = this.data.type; // 判断类型，0---乱斗，1---约球
        console.log(type) // 这里决定创建的聊天去哪里了
        var groupid = '' // 在这里填入groupid
        var openid = app.globalData.openid // openid
        if (type == '乱斗') {
            var groups = this.data.buttle;
            var team_name = this.data.team_name;
            var team_introduction = this.data.team_introduction
            var team_class = this.data.team_class;
            var team_max = this.data.team_max;
            var team_img = this.data.team_img;
            let that = this
            conn.createGroupNew({
                data: {
                    groupname: team_name, // 群组名
                    desc: team_introduction, // 群组描述
                    members: [openid], // 用户名组成的数组
                    public: true, // pub等于true时，创建为公开群
                    approval: true, // approval为true，加群需审批，为false时加群无需审批
                    allowinvites: false, // true：允许群成员邀请人加入此群，false：只有群主才可以往群里加人 注意公开群（public：true),则不允许群成员邀请别人加入此群
                    inviteNeedConfirm: false // 邀请加群，被邀请人是否需要确认。true 为需要被邀请者同意才会进群
                },
                success(res) {
                    console.log('成功', res.data.groupid) //返回群组的id，其他页面要用
                    groupid = res.data.groupid
                    wx.cloud.callFunction({
                        name: 'httppost',
                        data: {
                            url: app.globalData.baseurl + 'melee_create_group/',
                            data: {
                                openid: openid,
                                name: team_name,
                                head_portrait: team_img,
                                introduction: team_introduction,
                                member_num: team_max,
                                group_id: groupid
                            }
                        },
                        success: (res) => {
                            console.log(res)
                            groups.push(res.result.data)
                            that.setData({
                                buttle: groups
                            })
                        }
                    })
                    that.setData({
                        show_create: false
                    })
                },
                error(err) {
                    console.log('失败', err)
                },
            });
        } else {
            var groups = this.data.appoint;
            var team_name = this.data.team_name;
            var team_introduction = this.data.team_introduction;
            var team_class = this.data.team_class;
            var team_max = this.data.team_max;
            var team_img = this.data.team_img;
            let that = this
            conn.createGroupNew({
                data: {
                    groupname: team_name, // 群组名
                    desc: team_introduction, // 群组描述
                    members: [openid], // 用户名组成的数组
                    public: true, // pub等于true时，创建为公开群
                    approval: false, // approval为true，加群需审批，为false时加群无需审批
                    allowinvites: false, // true：允许群成员邀请人加入此群，false：只有群主才可以往群里加人 注意公开群（public：true),则不允许群成员邀请别人加入此群
                    inviteNeedConfirm: false // 邀请加群，被邀请人是否需要确认。true 为需要被邀请者同意才会进群
                },
                success(res) {
                    console.log('成功', res.data.groupid) //返回群组的id，其他页面要用
                    groupid = res.data.groupid
                    wx.cloud.callFunction({
                        name: 'httppost',
                        data: {
                            url: app.globalData.baseurl + 'arrange_create_group/',
                            data: {
                                openid: openid,
                                name: team_name,
                                head_portrait: team_img,
                                introduction: team_introduction,
                                member_num: team_max,
                                group_id: groupid
                            }
                        },
                        success: (res) => {
                            console.log(res)
                            groups.push(res.result.data)
                            that.setData({
                                appoint: groups,
                                appoint_show : groups
                            })
                        }
                    })
                    that.setData({
                        show_create: false
                    })
                },
                error(err) {
                    console.log('失败', err)
                },
            });
        }

    },
    close_create(event) {
        this.setData({
            show_create: false
        })
    },
    tname_input(event) {
        this.setData({
            team_name: event.detail
        })
    },
    tintro_input(event) {
        this.setData({
            team_introduction: event.detail
        })
    },
    tclass_input(event) {
        this.setData({
            team_class: event.detail
        })
    },
    tnumber_input(event) {
        this.setData({
            team_max: event.detail
        })
    },
    group_id_input(event) {
        this.setData({
            search_group_id: event.detail
        })
    },

    // 按照群号搜索乱斗群并加入
    search_buttle(event) {
        // 搜索
        var group_id = this.data.group_id
        var openid = app.globalData.openid
        wx.cloud.callFunction({
            name: 'httprequest',
            data: {
                url: app.globalData.baseurl + "melee_search_group/",
                data: {
                    group_id: group_id
                }
            },
            success: (res) => {
                this.setData({
                    search_group_result: res.result.data
                })
            }
        })

        // 加入
        wx.cloud.callFunction({
            name: 'httppost',
            data: {
                url: app.globalData.baseurl + 'melee_join_group/',
                data: {
                    opendid: openid,
                    group_id: group_id
                }
            },
            success: (res) => {
                this.setData({
                    res_group: res.result.data
                })
            }
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.cloud.callFunction({
            name: 'httprequest',
            data: {
                url: app.globalData.baseurl + 'melee_my_group/',
                data: {
                    openid: app.globalData.openid
                }
            },
            success: (res) => {
                // console.log(res)
                var temp = res.result.data 
                for(let i=0;i<temp.length;i++){
                    temp[i].create_time = temp[i].create_time.split('T')[0]
                }
                this.setData({
                    buttle: temp
                })
            },
            fail:(err)=>{
                console.log(err)
            }
        })

         // // 所有约球群
         wx.cloud.callFunction({
            name : 'httprequest',
            data : {
                url : app.globalData.baseurl + 'arrange_group_show/',
                data : {}
            },
            success:(res) => {
                console.log(res)
                var temp = res.result.data 
                for(let i=0;i<temp.length;i++){
                    temp[i].create_time = temp[i].create_time.split('T')[0]
                }
                this.setData({
                    appoint : temp,
                    appoint_show : temp
                })
            }
        })
        if (app.globalData.registered) {
            conn.open({
                user: app.globalData.openid,
                pwd: "123456",
                appKey: app.globalData.appKey,
                success: (res) => {
                    console.log("成功", res)
                },
                fail: (err) => {
                    console.log("失败", err)
                }
            });
        } else {
            Toast.fail("请先注册！")
            wx.redirectTo({
                url: '../../Personal/login/login',
            })
        }
    },

    afterRead: function (e) {
        let fileList = this.data.fileList
        fileList.push({
            url: e.detail.file.url,
            deletable: true,
        })
        this.setData({
            fileList: fileList
        })
    },

    delete: function(e) {
        let i = e.detail.index 
        this.data.fileList.splice(i,1)
        this.setData({
            fileList : this.data.fileList
        })
        let filepaths = this.data.fileList[0].url.split('/')
        let filename = filepaths[filepaths.length - 1]
        wx.cloud.uploadFile({
            cloudPath : filename,
            filePath : this.data.fileList[0].url,
            success:(res) =>{
                this.setData({
                    team_img : res.fileID
                })
            }
        })
    },
    uploadimg: function (e) {
        wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success: (res) =>{
                var tempPath = res.tempFilePaths[0];
                let tempPaths = tempPath.split('/')
                let filename = tempPaths[tempPaths.length-1]
                // console.log(filename)
                wx.cloud.uploadFile({
                    cloudPath : filename,
                    filePath : tempPath,
                    success:(res)=>{
                        console.log(res)
                        this.setData({
                            img_fileID : res.fileID, 
                            team_img : res.fileID
                        })
                    },
                    fail:(err)=>{
                        console.log(err)
                    }
                })
            }
        })
    },
    to_create_buttle: function (e) {
        wx.navigateTo({
            url: '../signup/signup',
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
    onShow:function() {
       
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
        console.log("关闭连接")
        conn.close()
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