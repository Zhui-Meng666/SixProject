// pages/Entertainment/buttle/buttle.js
import Toast from '@vant/weapp/toast/toast';
let app = getApp()
let conn = wx.WebIM.conn
const RM = wx.getRecorderManager()
const range = Array.from({
    length: 30
}, (a, i) => i + 1);
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
        couplelistall: [
            [{
                name11: '张三',
                name12: '张四',
                name21: '李五',
                name22: '李六',
                grade: '录入成绩'
            }],
            [{
                name11: '李四',
                name12: '王五',
                name21: '张三',
                name22: '李五',
                grade: '录入成绩'
            }],
        ],
        coupleindex: 0,
        couplelist: [{
            name11: '张三',
            name12: '张四',
            name21: '李五',
            name22: '李六',
            grade: '录入成绩'
        }],
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
                i = ++this.data.singleindex
                if (i < this.data.singlelistall.length) {
                    this.setData({
                        singlelist: this.data.singlelistall[i]
                    })
                } else {
                    Toast.success('单人比赛结束')
                    this.data.singledone = true
                    this.data.singleindex = -1
                }
                break
            case '1':
                i = ++this.data.coupleindex
                if (i < this.data.couplelistall.length) {
                    this.setData({
                        couplelist: this.data.couplelistall[i]
                    })
                } else {
                    Toast.success('双人比赛结束')
                    this.data.coupledone = true
                    this.data.coupleindex = -1
                }
                break
            case '2':
                if (this.data.singledone || this.data.coupledone) {
                    this.setData({
                        showrank: !this.data.showrank
                    })
                } else {
                    Toast.fail('比赛还没结束')
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
        if (this.data.isingle) {
            var singlelist = this.data.singlelist
            singlelist[this.data.nowid].grade = grades[0] + '  :  ' + grades[1]
            this.setData({
                singlelist: singlelist,
                showpop: false
            })
        } else {
            var couplelist = this.data.couplelist
            couplelist[this.data.nowid].grade = grades[0] + '  :  ' + grades[1]
            this.setData({
                couplelist: couplelist,
                showpop: false
            })
        }
        picker.setColumnIndex(0, 0)
        picker.setColumnIndex(1, 0)
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        if (app.globalData.registered) {
            var options = {
                user: 'username',
                pwd: "zhj48691626",
                appKey: app.globalData.appKey,
                success: (res) => {
                    console.log("成功", res)
                },
                fail: (err) => {
                    console.log("失败", err)
                }
            };
            conn.open(options);
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
            onPersoncard: function (message) {
                console.log(message)
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