// pages/Competition/score/score.js
import Toast from '@vant/weapp/toast/toast';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 触摸开始时间
        touchStartTime: 0,
        // 触摸结束时间
        touchEndTime: 0,
        // 最后一次单击事件点击发生时间
        lastTapTime: 0,
        // 单击事件点击后要触发的函数
        lastTapTimeoutFunc: null,
        department: '体教部.xx',
        compid: '20211201',
        gameid: 1,
        time: 10 * 60 * 1000,
        timeData: {},
        start: false,
        score1real: 1,
        score2real: 1,
        playername: [{
                college: '学院',
                name: '姓名'
            },
            {
                college: '学院',
                name: '姓名'
            }
        ]
    },

    onchange: function (e) {
        this.setData({
            timeData: e.detail,
        });
    },

    /// 按钮触摸开始触发的事件
    touchStart: function (e) {
        this.data.touchStartTime = e.timeStamp
    },

    /// 按钮触摸结束触发的事件
    touchEnd: function (e) {
        this.data.touchEndTime = e.timeStamp
    },

    start: function (e) {
        var that = this
        // 控制点击事件在350ms内触发，加这层判断是为了防止长按时会触发点击事件
        if (that.data.touchEndTime - that.data.touchStartTime < 350) {
            // 当前点击的时间
            var currentTime = e.timeStamp
            var lastTapTime = that.data.lastTapTime
            // 更新最后一次点击时间
            that.data.lastTapTime = currentTime

            // 如果两次点击时间在300毫秒内，则认为是双击事件
            if (currentTime - lastTapTime < 300) {
                // 成功触发双击事件时，取消单击事件的执行
                clearTimeout(that.data.lastTapTimeoutFunc);
                if (!that.data.start) {
                    const countDown = that.selectComponent('.control-count-down');
                    countDown.reset();
                }
            } else {
                // 单击事件延时300毫秒执行，这和最初的浏览器的点击300ms延时有点像。
                that.data.lastTapTimeoutFunc = setTimeout(function () {
                    if (!that.data.start) {
                        const toast = Toast.loading({
                            duration: 0, // 持续展示 toast
                            forbidClick: true,
                            message: '倒计时 3 秒',
                            selector: '#custom-selector',
                            loadingType: 'spinner',
                            onClose: () => {
                                Toast.success({
                                    duration: 300,
                                    message: '开始',
                                    onClose: () => {
                                        const countDown = that.selectComponent('.control-count-down');
                                        countDown.start();
                                        that.data.start = true
                                    }
                                })
                            }
                        });

                        let second = 3;
                        const timer = setInterval(() => {
                            second--;
                            if (second) {
                                toast.setData({
                                    message: `倒计时 ${second} 秒`,
                                });
                            } else {
                                clearInterval(timer);
                                Toast.clear();
                            }
                        }, 1000);
                    } else {
                        const countDown = that.selectComponent('.control-count-down');
                        countDown.pause();
                        that.data.start = false
                    }
                }, 300);
            }
        }
    },

    addscore: function (e) {
        let id = e.currentTarget.id
        if (id == '1') {
            this.data.score1real++
            this.setData({
                score1: this.splitnum(this.data.score1real)
            })
        } else {
            this.data.score2real++
            this.setData({
                score2: this.splitnum(this.data.score2real)
            })
        }
    },

    submitnow: function (e) {
        this.setData({
            loading1: true
        })
        setTimeout(()=>{
            this.setData({
                loading1: false
            })
            Toast.success('上传成功')
        }, 2000)
    },

    submitall: function (e) {
        this.setData({
            loading2: true
        })
        setTimeout(()=>{
            this.setData({
                loading2: false
            })
            Toast.success('比赛结束')
        }, 2000)
    },

    splitnum: function (num) {
        var score = []
        score.push(Math.floor(num/10))
        score.push(num%10)
        return score
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const countDown = this.selectComponent('.control-count-down');
        countDown.reset();
        var score1 = this.splitnum(this.data.score1real)
        var score2 = this.splitnum(this.data.score2real)
        this.setData({
            score1: score1,
            score2: score2,
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