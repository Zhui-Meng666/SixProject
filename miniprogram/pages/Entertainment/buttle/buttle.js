// pages/Entertainment/buttle/buttle.js
import Toast from '@vant/weapp/toast/toast';
let app = getApp()
let conn = wx.WebIM.conn
const RM = wx.getRecorderManager()
const range = Array.from({
    length: 30
}, (a, i) => i + 1);

function compare(arg) {
    return function (a, b) {
        return a[arg] - b[arg];
    }
}
Page({

    /**
     * 页面的初始数据
     */
    data: {
        groupid: '166787045982209',
        msglist: [{
                type: 'message',
                value: {
                    self: false,
                    avatar: '../../../images/unload.png',
                    messg: '欢迎来到xxxxx小组，期待你的表现'
                }
            },
            {
                type: 'message',
                value: {
                    self: true,
                    avatar: '../../../images/unload.png',
                    messg: '欢迎来到xxxxx小组，期待你的表现'
                }
            }
        ],
        singlelistall: [
            [{
                name1: '张三',
                name2: '李四',
                grade: '录入成绩'
            }],
            [{
                name1: '李四',
                name2: '王五',
                grade: '录入成绩'
            }],
        ],
        singleindex: 0,
        singlelist: [{
            name1: '张三',
            name2: '李四',
            grade: '录入成绩'
        }],
        singledone: [false],
        ranklist: [{
                img: '../../../images/gold.png',
                name: '张三'
            },
            {
                img: '../../../images/solver.png',
                name: '李四'
            },
            {
                img: '../../../images/Tong.png',
                name: '王五'
            }
        ],
        tempsound: [],
        imglist: ['../../../images/singles.png', '../../../images/doubles.png', '../../../images/rank.png'],
        columns: [{
                values: range
            },
            {
                values: range
            }
        ],
        showmore: false,
        showsend: false,
        showrank: false,
        showpop: false,
    },

    showsend: function (e) {
        this.setData({
            msg: e.detail.value
        })
        if (!this.data.showsend && this.data.msg) {
            this.setData({
                showsend: true
            })
        }
        if (this.data.msg.length == 0) {
            this.setData({
                showsend: false
            })
        }
    },

    send: function (e) {
        var msglt = this.data.msglist
        var text = this.data.msg
        msglt.push({
            type: 'message',
            value: {
                self: true,
                avatar: '../../../images/unload.png',
                messg: text
            }
        })
        this.setData({
            msglist: msglt,
            msg: '',
            showsend: false
        })
        let that = this
        let mesg = JSON.stringify({
            type: 'text',
            value: text
        })
        let id = conn.getUniqueId(); // 生成本地消息id
        let msg = new wx.WebIM.message('txt', id); // 创建文本消息
        let option = {
            msg: mesg, // 消息内容
            to: that.data.groupid, // 接收消息对象(群组id)
            chatType: 'groupChat', // 群聊类型设置为群聊
            ext: {}, // 扩展消息
            success: function (res) {
                console.log('成功', res);
            }, // 对成功的相关定义，sdk会将消息id登记到日志进行备份处理
            fail: function (err) {
                console.log('失败', err);
            } // 对失败的相关定义，sdk会将消息id登记到日志进行备份处理
        };
        msg.set(option);
        conn.send(msg.body);
    },

    showmore: function (e) {
        this.setData({
            showmore: !this.data.showmore
        })
    },

    hidemore: function (e) {
        this.setData({
            showmore: false
        })
    },

    startrecord: function (e) {
        console.log('开始')
        wx.vibrateLong({
            success: (res) => {
                this.setData({
                    record: true,
                })
                RM.start()
            },
            fail: (err) => {
                console.log('失败', err)
            }
        })
    },

    sendsound: function (e) {
        if (this.data.record) {
            console.log('结束')
            RM.stop()
            this.setData({
                record: false,
            })
            RM.onStop((res) => {
                var tempath = res.tempFilePath
                var len = Math.round(res.duration / 6000)
                var msg = '~· '
                for (let i = 0; i < len; ++i) {
                    msg += '~· '
                }
                var tempsound = this.data.tempsound
                var msglist = this.data.msglist
                var sdid = tempsound.length
                tempsound.push(tempath)
                msglist.push({
                    type: 'sound',
                    value: {
                        self: true,
                        avatar: '../../../images/unload.png',
                        sdid: sdid,
                        sdtext: msg
                    }
                })
                this.setData({
                    tempsound: tempsound,
                    msglist: msglist
                })
                let that = this
                var id = conn.getUniqueId(); // 生成本地消息id
                var msg = new wx.WebIM.message('audio', id); // 创建音频消息
                let token = wx.WebIM.conn.context.accessToken
                let allowType = {
                    'mp3': true,
                    'amr': true,
                    'wmv': true,
                    'aac': true
                };
                let str = app.globalData.appKey.split("#");
                let length = res.duration / 1000;
                let index = tempath.lastIndexOf(".");
                let filetype = (~index && tempath.slice(index + 1)) || "";
                let domain = wx.WebIM.conn.apiUrl + '/'
                if (filetype.toLowerCase() in allowType) {
                    wx.uploadFile({
                        url: domain + str[0] + "/" + str[1] + "/chatfiles",
                        filePath: tempath,
                        name: "file",
                        header: {
                            "Content-Type": "multipart/form-data",
                            Authorization: "Bearer " + token
                        },
                        success(res) {
                            if (res.statusCode === 400) {
                                // 音频上传阿里云检验不合法
                                let errData = res.data;
                                if (errData.error === 'content improper') {
                                    wx.showToast({
                                        title: '音频不合法'
                                    });
                                    return
                                }
                            }
                            let dataObj = JSON.parse(res.data);
                            let file = {
                                type: 'audio',
                                length: length,
                                url: dataObj.uri + "/" + dataObj.entities[0].uuid,
                                filetype: filetype,
                                filename: tempath
                            };
                            msg.set({
                                apiUrl: conn.apiURL,
                                body: file,
                                to: that.data.groupid,
                                chatType: 'groupChat',
                                success: function (res) {
                                    console.log('成功', res)
                                },
                                fail: function (e) {
                                    console.log("Fail"); //如禁言、拉黑后发送消息会失败
                                }
                            });
                            conn.send(msg.body);
                        }
                    })
                } else {
                    console.log('文件不合法')
                }
            })
        }
    },

    playsound: function (e) {
        var id = e.currentTarget.id
        const IAC = wx.createInnerAudioContext({
            useWebAudioImplement: true
        })
        IAC.autoplay = true
        IAC.src = this.data.tempsound[id]
        IAC.onPlay(() => {
            console.log('播放成功')
        })
        IAC.onError((res) => {
            console.log("播放失败", res.errMsg)
        })
    },

    handlmore: function (e) {
        var id = e.currentTarget.id
        var i = 0
        switch (id) {
            case '0':
                let singlelist = this.data.singlelist
                for (var i = 0; i < singlelist.length; ++i) {
                    if (singlelist[i].grade == "录入成绩") {
                        this.data.singledone[i] = false
                    } else {
                        this.data.singledone[i] = true
                    }
                }
                i = ++this.data.singleindex
                if (i < this.data.singlelistall.length) {
                    this.setData({
                        singlelist: this.data.singlelistall[i]
                    })
                } else {
                    Toast.success('单人比赛结束')
                    this.data.singleindex = -1
                }
                break
            case '1':
                break
            case '2':
                if (this.data.showrank) {
                    this.setData({
                        showrank: !this.data.showrank
                    })
                } else {
                    let flag = true
                    for (var done of this.data.singledone) {
                        if (!done) {
                            Toast.fail('比赛还没结束')
                            flag = false
                            break
                        }
                    }
                    if (flag) {
                        wx.cloud.callFunction({
                            name: 'httprequest',
                            data: {
                                url: app.globalData.baseurl + 'melee_rank/',
                                data: {
                                    group_id: this.data.groupid,
                                }
                            },
                            success: (res) => {
                                console.log("成功", res.result)
                                let rank = this.data.ranklist
                                let data = res.result.data.user
                                for (var i = 0; i < 3; ++i) {
                                    rank[i].img = data[i].avatar
                                    rank[i].name = data[i].nickname
                                }
                                this.setData({
                                    ranklist: rank,
                                    showrank: !this.data.showrank
                                })
                            },
                            fail: (err) => {
                                console.log("失败", err)
                                Toast.fail("获取排名失败！")
                            }
                        })
                    }
                }
                break
        }
    },

    recordsig: function (e) {
        var id = e.currentTarget.id
        this.setData({
            showpop: true,
            nowid: id,
            isingle: true
        })
    },

    recordcop: function (e) {
        var id = e.currentTarget.id
        this.setData({
            showpop: true,
            nowid: id,
            isingle: false
        })
    },

    onCancel: function (e) {
        this.setData({
            showpop: false
        })
    },

    onConfirm: function (e) {
        let picker = this.selectComponent('#picker')
        var grades = e.detail.value
        var singlelist = this.data.singlelist
        singlelist[this.data.nowid].grade = grades[0] + '  :  ' + grades[1]
        this.setData({
            singlelist: singlelist,
            showpop: false
        })
        picker.setColumnIndex(0, 0)
        picker.setColumnIndex(1, 0)
        wx.cloud.callFunction({
            name: 'httppost',
            data: {
                url: app.globalData.baseurl + 'melee_upload_score/',
                data: {
                    openid1: singlelist[this.data.nowid].openid1,
                    openid1: singlelist[this.data.nowid].openid2,
                    score1: grades[0],
                    score2: grades[1],
                    group_id: this.data.groupid,
                }
            },
            success: (res) => {
                console.log("成功", res.result)
            },
            fail: (err) => {
                console.log("失败", err)
            }
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // this.setData({
        //     groupid: options.id    //接受上一页面传来的群id
        // })
        if (app.globalData.registered) {
            conn.open({
                user: 'username',
                pwd: "zhj48691626",
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
        var height = app.globalData.getPageHeight()
        this.setData({
            scrollh: height * 0.8
        })
        let that = this
        conn.listen({
            onTextMessage: function (message) {
                var data = JSON.parse(message.data)
                if (data.type === 'text') {
                    var text = data.value
                    var msglt = that.data.msglist
                    msglt.push({
                        type: 'message',
                        value: {
                            self: false,
                            avatar: '../../../images/unload.png',
                            messg: text
                        }
                    })
                    that.setData({
                        msglist: msglt,
                    })
                }
            },
            onAudioMessage: function (message) {
                var duration = message.length
                wx.downloadFile({
                    url: message.url,
                    header: {
                        "X-Requested-With": "XMLHttpRequest",
                        Accept: "audio/aac",
                        Authorization: "Bearer " + message.token
                    },
                    success(res) {
                        var tempFilePath = res.tempFilePath;
                        var len = Math.round(duration / 6)
                        var msg = '~· '
                        for (let i = 0; i < len; ++i) {
                            msg += '~· '
                        }
                        var tempsound = that.data.tempsound
                        var msglist = that.data.msglist
                        var sdid = tempsound.length
                        tempsound.push(tempFilePath)
                        msglist.push({
                            type: 'sound',
                            value: {
                                self: false,
                                avatar: '../../../images/unload.png',
                                sdid: sdid,
                                sdtext: msg
                            }
                        })
                        that.setData({
                            tempsound: tempsound,
                            msglist: msglist
                        })
                    },
                    fail(e) {
                        wx.showToast({
                            title: "下载失败",
                            duration: 1000
                        });
                    }
                })
            },
            onPresence: function (msg) {
                console.log(msg)
                switch (msg.type) {
                    case 'removeAdmin':
                        // 移除管理员
                        break;
                    case 'addAdmin':
                        // 添加管理员
                        break;
                    case 'direct_joined':
                        // 直接被拉进群
                        break;
                    case 'leaveGroup':
                        // 退出群
                        break;
                    case 'memberJoinPublicGroupSuccess':
                        // 加入公开群成功
                        break;
                    case 'removedFromGroup':
                        // 从群组移除
                        break;
                    case 'invite_decline':
                        // 拒绝加群邀请
                        break;
                    case 'invite_accept':
                        // 接收加群邀请（群含权限情况）
                        break;
                    case 'invite':
                        // 接收加群邀请
                        break;
                    case 'joinPublicGroupDeclined':
                        // 拒绝入群申请
                        Toast.fail("加入房间失败")
                        break;
                    case 'joinPublicGroupSuccess':
                        // 用户获得群主同意入群申请
                        Toast.success("加入房间成功")
                        break;
                    case 'joinGroupNotifications':
                        // 申请入群
                        wx.showModal({
                            title: '提示',
                            content: '用户' + msg.reason + '申请入群',
                            cancelText: '拒绝',
                            confirmText: '同意',
                            success(res) {
                                if (res.confirm) {
                                    console.log('同意入群申请')
                                    conn.agreeJoinGroup({
                                        applicant: msg.owner, // 申请加群的用户名
                                        groupId: that.data.groupid, // 群组ID
                                        success: (res) => {
                                            console.log("成功", res)
                                            wx.cloud.callFunction({
                                                name: 'httppost',
                                                data: {
                                                    url: app.globalData.baseurl + 'melee_join_group/',
                                                    data: {
                                                        openid: msg.owner,
                                                        group_id: msg.gid,
                                                    }
                                                },
                                                success: (res) => {
                                                    console.log("成功", res.result)
                                                },
                                                fail: (err) => {
                                                    console.log("失败", err)
                                                }
                                            })
                                        },
                                        fail: (err) => {
                                            console.log("失败", err)
                                        }
                                    });
                                } else if (res.cancel) {
                                    console.log('拒绝入群申请')
                                }
                            }
                        })
                        break;
                    case 'leave':
                        // 退出群
                        break;
                    case 'join':
                        // 加入群
                        break;
                    case 'deleteGroupChat':
                        // 解散群
                        break;
                    default:
                        break;
                }
            }
        })
        wx.cloud.callFunction({
            name: 'httprequest',
            data: {
                url: app.globalData.baseurl + 'melee_group_member_info_show/',
                data: {
                    group_id: this.data.groupid,
                }
            },
            success: (res) => {
                console.log("成功", res.result)
                let data = res.result.data
                if (data) {
                    let len = data.length
                    let userinfo = {}
                    for (var i = 0; i < data.length; ++i) {
                        userinfo[data[i].user.openid] = {
                            avatar: data[i].user.avatar,
                            nickname: data[i].user.nickname,
                            phone: data[i].user.phone_number
                        }
                    }
                    this.setData({
                        userinfo: userinfo,
                    })
                    wx.cloud.callFunction({
                        name: 'httprequest',
                        data: {
                            url: app.globalData.baseurl + 'melee_against_info/',
                            data: {
                                group_id: this.data.groupid,
                            }
                        },
                        success: (res) => {
                            console.log("成功", res.result)
                            let data = res.result.data
                            let singlelistall = []
                            let game = len % 2 == 0 ? len - 1 : len
                            let round = Math.floor(len / 2)
                            for (var i = 0; i < game; ++i) {
                                let singlelist = []
                                for (var j = i * round; j < data.length; ++j) {
                                    singlelist.push({
                                        name1: data[j].user1.student_id,
                                        name2: data[j].user2.student_id,
                                        openid1: data[j].user1.openid,
                                        openid2: data[j].user2.openid,
                                        grade: '录入成绩'
                                    })
                                }
                                singlelistall.push(singlelist)
                            }
                            this.setData({
                                singlelistall: singlelistall,
                                singlelist: singlelistall[0],
                            })
                        },
                        fail: (err) => {
                            console.log("失败", err)
                        }
                    })
                }
            },
            fail: (err) => {
                console.log("失败", err)
            }
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
        conn.close();
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