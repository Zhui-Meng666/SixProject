// miniprogram/pages/Personal/main/main.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    bgimg: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201709%2F12%2F20170912162329_VPJnt.thumb.700_0.jpeg&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1639148986&t=03cbf2e144f900a3944c1749697ea306',
    gendersrc: '../../../images/man.png',
    intro: '这个人很懒，没留下什么信息',
    coinnum: 100,
    identify: ['运动员', '会员', '裁判'],
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
    imglist: ['../../../images/Cat.jpeg', '../../../images/Cat.jpeg', '../../../images/Cat.jpeg'],
    userallid: [{
        id: '0',
        value: '管理员'
      },
      {
        id: '1',
        value: '裁判'
      },
      {
        id: '2',
        value: '运动员领队'
      },
      {
        id: '3',
        value: '运动员'
      },
      {
        id: '4',
        value: '会员'
      },
      {
        id: '5',
        value: '非会员'
      }
    ]
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
    var idlist = ['管理员', '裁判', '运动员领队', '运动员', '会员', '非会员']
    var identify = []
    let userid = this.data.useridentify
    if (userid) {
      let len = userid.length
      for (let i = 0; i < len; ++i) {
        identify.push(idlist[Number(userid[i])])
      }
    }
    this.setData({
      show: false,
      identify: identify
    })
  },

  onChange: function (e) {
    this.setData({
      useridentify: e.detail
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {

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