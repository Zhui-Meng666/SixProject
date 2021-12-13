// pages/Entertainment/appoint/appoint.js
import Toast from '@vant/weapp/toast/toast';
let app = getApp()
let conn = wx.WebIM.conn
const RM = wx.getRecorderManager()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        groupid: '167778034188289',
        msglist: [],
        tempsound: [],
        temphoto: [],
        tempcard: [],
        imglist: ['../../../images/upload.png', '../../../images/personal_card.png', '../../../images/start.png'],
        useravatar: '../../../images/unload.png',
        wechat: '1234567',
        phone: '13123456789',
        showmore: false,
        showsend: false,
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
        var userinfo = this.data.userinfo[app.globalData.openid]
        msglt.push({
            type: 'message',
            value: {
                self: true,
                avatar: userinfo.avatar,
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
                        avatar: this.data.userinfo[app.globalData.openid].avatar,
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
                    'aac': true,
                    'silk': true,
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
            console.log('播放失败', res.errMsg)
        })
    },

    handlmore: function (e) {
        var id = e.currentTarget.id
        switch (id) {
            case '0':
                wx.chooseImage({
                    count: 1,
                    success: (res) => {
                        var tempaths = res.tempFilePaths
                        var temphoto = this.data.temphoto.concat(tempaths)
                        var msglist = this.data.msglist
                        for (let i = 0; i < tempaths.length; ++i) {
                            msglist.push({
                                type: 'photo',
                                value: {
                                    self: true,
                                    avatar: this.data.userinfo[app.globalData.openid].avatar,
                                    phoid: this.data.temphoto.length + i,
                                    imgsrc: tempaths[i]
                                }
                            })
                        }
                        this.setData({
                            temphoto: temphoto,
                            msglist: msglist
                        })
                        let that = this
                        let token = conn.context.accessToken
                        wx.getImageInfo({
                            src: tempaths[0],
                            success(res) {
                                let allowType = {
                                    jpg: true,
                                    jpeg: true,
                                    gif: true,
                                    png: true,
                                    bmp: true
                                };
                                let str = app.globalData.appKey.split("#");
                                let width = res.width;
                                let height = res.height;
                                let index = res.path.lastIndexOf(".");
                                let filetype = (~index && res.path.slice(index + 1)) || "";
                                console.log(filetype)
                                let domain = wx.WebIM.conn.apiUrl + '/';
                                if (filetype.toLowerCase() in allowType) {
                                    wx.uploadFile({
                                        url: domain + str[0] + "/" + str[1] + "/chatfiles",
                                        filePath: tempaths[0],
                                        name: "file",
                                        header: {
                                            "Content-Type": "multipart/form-data",
                                            Authorization: "Bearer " + token
                                        },
                                        success(res) {
                                            if (res.statusCode === 400) {
                                                // 图片上传阿里云检验不合法
                                                let errData = JSON.parse(res.data);
                                                if (errData.error === 'content improper') {
                                                    wx.showToast({
                                                        title: '图片不合法'
                                                    });
                                                    return
                                                }
                                            }
                                            let dataObj = JSON.parse(res.data);
                                            let id = conn.getUniqueId(); // 生成本地消息 id
                                            let msg = new wx.WebIM.message('img', id);
                                            let file = {
                                                type: 'img',
                                                size: {
                                                    width: width,
                                                    height: height
                                                },
                                                url: dataObj.uri + "/" + dataObj.entities[0].uuid,
                                                filetype: filetype,
                                                filename: tempaths[0]
                                            };
                                            msg.set({
                                                apiUrl: conn.apiURL,
                                                body: file,
                                                to: that.data.groupid,
                                                chatType: 'groupChat',
                                                success: function (res) {
                                                    console.log('发送成功', res)
                                                },
                                                fail: function (e) {
                                                    console.log("Fail"); //如禁言、拉黑后发送消息会失败
                                                }
                                            });
                                            conn.send(msg.body);
                                        }
                                    });
                                } else {
                                    console.log('文件不合法')
                                }
                            }
                        })
                    }
                })
                break
            case '1':
                var msglist = this.data.msglist
                var tempcard = this.data.tempcard
                var userinfo = this.data.userinfo[app.globalData.openid]
                msglist.push({
                    type: 'personcard',
                    value: {
                        self: true,
                        avatar: userinfo.avatar,
                        cdid: tempcard.length,
                        nickname: userinfo.nickname
                    }
                })
                tempcard.push({
                    avatar: userinfo.avatar,
                    phone: userinfo.phone,
                })
                this.setData({
                    msglist: msglist,
                    tempcard: tempcard
                })
                let that = this
                let mesg = JSON.stringify({
                    type: 'person',
                    value: {
                        avatar: userinfo.avatar,
                        phone: userinfo.phone,
                    }
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
                break
            case '2':
                Toast('开始比赛！')
                break
        }
    },

    preview: function (e) {
        var id = e.currentTarget.id
        wx.previewImage({
            urls: this.data.temphoto,
            current: this.data.temphoto[id],
            success: (res) => {
                console.log('成功', res)
            },
            fail: (err) => {
                console.log('失败', err)
            }
        })
    },

    showcard: function (e) {
        var id = e.currentTarget.id
        this.setData({
            showpop: true,
            useravatar: this.data.tempcard[id].avatar,
            wechat: this.data.tempcard[id].wechat,
            phone: this.data.tempcard[id].phone,
        })
    },

    onClose: function (e) {
        this.setData({
            showpop: false
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var id = options.group_id
        if (app.globalData.registered) {
            console.log("开始连接")
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
        var height = app.globalData.getPageHeight()
        this.setData({
            scrollh: height * 0.8,
            groupid: id
        })
        let that = this
        conn.listen({
            onTextMessage: function (message) {
                var data = JSON.parse(message.data)
                if (data.type === 'text') {
                    var text = data.value
                    var msglt = that.data.msglist
                    var userinfo = that.data.userinfo[message.from]
                    msglt.push({
                        type: 'message',
                        value: {
                            self: false,
                            avatar: userinfo == undefined ? '../../../images/unload.png' : userinfo.avatar,
                            messg: text
                        }
                    })
                    that.setData({
                        msglist: msglt,
                    })
                } else {
                    var customExts = data.value
                    var msglist = that.data.msglist
                    var tempcard = that.data.tempcard
                    var userinfo = that.data.userinfo[message.from]
                    msglist.push({
                        type: 'personcard',
                        value: {
                            self: false,
                            avatar: userinfo == undefined ? '../../../images/unload.png' : userinfo.avatar,
                            cdid: tempcard.length,
                            nickname: userinfo == undefined ? '无' : userinfo.nickname
                        }
                    })
                    tempcard.push(customExts)
                    that.setData({
                        msglist: msglist,
                        tempcard: tempcard
                    })
                }
            },
            onAudioMessage: function (message) {
                console.log(message)
                var duration = message.length
                var userinfo = that.data.userinfo[message.from]
                wx.downloadFile({
                    url: message.url,
                    header: {
                        "X-Requested-With": "XMLHttpRequest",
                        Accept: "audio",
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
                                avatar: userinfo == undefined ? '../../../images/unload.png' : userinfo.avatar,
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
            onPictureMessage: function (message) {
                var temphoto = that.data.temphoto
                that.data.temphoto.push(message.url)
                var msglist = that.data.msglist
                var userinfo = that.data.userinfo[message.from]
                msglist.push({
                    type: 'photo',
                    value: {
                        self: false,
                        avatar: userinfo == undefined ? '../../../images/unload.png' : userinfo.avatar,
                        phoid: temphoto.length,
                        imgsrc: message.url
                    }
                })
                that.setData({
                    temphoto: temphoto,
                    msglist: msglist
                })
            }, //收到图片消息
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
                        wx.cloud.callFunction({
                            name: 'httppost',
                            data: {
                                url: app.globalData.baseurl + 'arrange_join_group/',
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
                        break;
                    case 'joinPublicGroupSuccess':
                        // 同意入群申请
                        wx.cloud.callFunction({
                            name: 'httppost',
                            data: {
                                url: app.globalData.baseurl + 'arrange_join_group/',
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
                        break;
                    case 'joinGroupNotifications':
                        // 用户申请入群，群主在此同意
                        // conn.agreeJoinGroup({
                        //     applicant: msg.owner, // 申请加群的用户名
                        //     groupId: that.data.groupid, // 群组ID
                        //     success: (res) => {
                        //         console.log("成功", res)
                        //     },
                        //     fail: (err) => {
                        //         console.log("失败", err)
                        //     }
                        // })
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
                url: app.globalData.baseurl + 'arrange_group_member_info_show/',
                data: {
                    group_id: id,
                }
            },
            success: (res) => {
                console.log("成功", res.result)
                let data = res.result.data
                if (data) {
                    let userinfo = {}
                    for (var i = 0; i < data.length; ++i) {
                        userinfo[data[i].user.openid] = {
                            avatar: data[i].user.avatar,
                            nickname: data[i].user.nickname,
                            phone: data[i].user.mobile_phone
                        }
                    }
                    this.setData({
                        userinfo: userinfo
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