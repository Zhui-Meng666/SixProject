// pages/Entertainment/buttle/buttle.js
import Toast from '@vant/weapp/toast/toast';
let app = getApp()
const RM = wx.getRecorderManager()
const range = Array.from({
    length: 30
}, (a, i) => i + 1);
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
        msglt.push({
            type: 'message',
            value: {
                self: true,
                avatar: '../../../images/unload.png',
                messg: this.data.msg
            }
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