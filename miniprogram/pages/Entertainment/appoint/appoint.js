// pages/Entertainment/appoint/appoint.js
let app = getApp()
const RM = wx.getRecorderManager()
Page({

    /**
     * 页面的初始数据
     */
    data: {
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
        msglt.push({
            self: true,
            avatar: '../../../images/unload.png',
            messg: this.data.msg
        })
        this.setData({
            msglist: msglt,
            msg: '',
            showsend: false
        })
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
        this.setData({
            record: true,
        })
        RM.start()
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
            console.log(res.errMsg)
            console.log(res.errCode)
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
                                    avatar: '../../../images/unload.png',
                                    phoid: this.data.temphoto.length + i,
                                    imgsrc: tempaths[i]
                                }
                            })
                        }
                        this.setData({
                            temphoto: temphoto,
                            msglist: msglist
                        })
                    }
                })
                break
            case '1':
                var msglist = this.data.msglist
                var tempcard = this.data.tempcard
                msglist.push({
                    type: 'personcard',
                    value: {
                        self: true,
                        avatar: '../../../images/unload.png',
                        cdid: this.data.tempcard.length,
                        nickname: '12345'
                    }
                })
                tempcard.push({
                    avatar: '../../../images/unload.png',
                    wechat: '1234567',
                    phone: '13123456789',
                })
                this.setData({
                    msglist: msglist,
                    tempcard: tempcard
                })
                break
            case '2':
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
        var height = app.globalData.getPageHeight()
        this.setData({
            scrollh: height * 0.8
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