// miniprogram/pages/Personal/main/main.js
const Identify = ['管理员', '裁判', '运动员领队', '运动员', '会员', '非会员']
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bottom_active : 'personal',
    show: false,
    bgimg: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201709%2F12%2F20170912162329_VPJnt.thumb.700_0.jpeg&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1639148986&t=03cbf2e144f900a3944c1749697ea306',
    gendersrc: '../../../images/man.png',
    intro: '这个人很神秘，什么都没有~',
    coinnum: 100,
    level: [{
        icon: '../../../images/level.png',
        icontext: '等级',
        progresstext: '1级',
        percent: 20
      },
      {
        icon: '../../../images/experience.png',
        icontext: '经验',
        progresstext: '80分',
        percent: 80
      }
    ],
    list: [{
        icon: '../../../images/like.png',
        text: '收藏'
      },
      {
        icon: '../../../images/reward.png',
        text: '奖品'
      },
      {
        icon: '../../../images/career.png',
        text: '生涯'
      },
      {
        icon: '../../../images/sufecoin.png',
        text: 'sufe币'
      }
    ],
    imglist: ['../../../images/Cat.jpeg', '../../../images/Cat.jpeg', '../../../images/Cat.jpeg', '../../../images/Cat.jpeg']
  },

  Idtoname: function (arr) {
    var len = arr.length
    var identify = []
    var userid = []
    var useridlist = []
    if (len <= 3) {
      for (var i = 0; i < len; ++i) {
        identify.push(Identify[Number(arr[i])])
      }
      userid = arr
    } else {
      for (var i = 0; i < 3; ++i) {
        identify.push(Identify[Number(arr[i])])
        userid.push(arr[i])
      }
    }
    for (var i = 0; i < len; ++i) {
      useridlist.push({
        id: arr[i],
        value: Identify[Number(arr[i])]
      })
    }
    this.setData({
      identify: identify,
      userid: userid,
      useridlist: useridlist
    })
  },

  setup: function (e) {
    this.setData({
      showset: true
    })
  },

  chooseid: function (e) {
    this.setData({
      show: true
    })
  },

  onClose: function (e) {
    var userid = this.data.userid
    var len = userid.length
    var identify = []
    for (var i = 0; i < len; ++i) {
      identify.push(Identify[Number(userid[i])])
    }
    this.setData({
      show: false,
      identify: identify
    })
  },

  onChange: function (e) {
    this.setData({
      userid: e.detail
    })
  },

  onTap: function (e) {
    let id = Number(e.currentTarget.id)
    switch (id) {
      case 0:
        wx.navigateTo({
          url: '../like/like',
        })
        break
      case 1:
        wx.navigateTo({
          url: '../prize/prize',
        })
        break
      case 2:
        wx.navigateTo({
          url: '../career/career',
        })
        break
      case 3:
        wx.navigateTo({
          url: '../../Exchange/main/mian',
        })
        break
    }
  },

  Tophotolist: function (e) {
    wx.navigateTo({
      url: '../photolist/photolist',
    })
  },

  preview: function (e) {
    var id = e.currentTarget.id
    console.log(id)
    wx.previewImage({
      urls: this.data.imglist,
      current: this.data.imglist[id],
      success: (res) => {
        console.log('成功', res)
      },
      fail: (err) => {
        console.log('失败', err)
      }
    })
  },

  closeset: function (e) {
    this.setData({
      showset: false,
    })
  },

  chooseimg: function (e) {
    this.setData({
      showset: false,
    })
    wx.chooseImage({
      count: 1,
      success: (res) => {
        console.log('成功')
        var tempPath = res.tempFilePaths[0]
        this.setData({
          tempPath: tempPath,
          bgimg: tempPath,
        })
      },
      fail: (err) => {
        console.log('失败', err)
      }
    })
  },

  to_home(event){
    wx.redirectTo({
      url: '../../index/index',
    })
  },
  to_game(event){
      wx.redirectTo({
        url: '../../Competition/main/main',
      })
  },
  to_entertainment(event){
      wx.redirectTo({
        url: '../../Entertainment/main/main',
      })
  },
  to_personal(event){
      wx.redirectTo({
        url: '../../Personal/main/main',
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    var userallid = ['1', '3', '4', '2', '0', '5']
    this.Idtoname(userallid.sort())

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