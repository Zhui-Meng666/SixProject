// miniprogram/pages/Personal/main/main.js
let app = getApp()
const Identify = ['管理员', '裁判', '运动员领队', '运动员', '会员', '非会员']
const gender = ['', '../../../images/man.png', '../../../images/woman.png']
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bottom_active: 'personal',
    show: false,
    bgimg: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201709%2F12%2F20170912162329_VPJnt.thumb.700_0.jpeg&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1639148986&t=03cbf2e144f900a3944c1749697ea306',
    gendersrc: '',
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
    imglist: ['../../../images/Cat.jpeg', '../../../images/Cat.jpeg', '../../../images/Cat.jpeg', '../../../images/Cat.jpeg'],
    userid: []
  },

  Idtoname: function (arr) {
    var len = arr.length
    var useridlist = []
    var identify = []
    var userid = this.data.userid
    for (var i = 0; i < len; ++i) {
      useridlist.push({
        id: arr[i],
        value: Identify[Number(arr[i])]
      })
    }
    for (var i = 0; i < userid.length; ++i) {
      identify.push(Identify[Number(userid[i])])
    }
    this.setData({
      identify: identify,
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
    wx.cloud.callFunction({
      name: 'httppost',
      data: {
        url: app.globalData.baseurl + 'change_identity/',
        data: {
          identity: userid,
          openid: app.globalData.openid,
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
    var info = {
      stuid: this.data.stuid,
      gender: this.data.gender,
      intro: this.data.intro
    }
    wx.navigateTo({
      url: '../changeinfo/changeinfo?info=' + JSON.stringify(info),
    })
  },

  chooseimg: function (e) {
    this.setData({
      showset: false,
    })
    wx.chooseImage({
      count: 1,
      success: (res) => {
        console.log('成功', res)
        var tempPath = res.tempFilePaths[0]
        this.setData({
          tempPath: tempPath,
          bgimg: tempPath,
        })
        let tempPaths = tempPath.split('/')
        let filename = tempPaths[tempPaths.length - 1]
        wx.cloud.uploadFile({
          cloudPath: filename,
          filePath: tempPath, // 文件路径
          success: (res) => {
            // get resource ID
            this.setData({
              fileID: res.fileID
            })
            wx.cloud.callFunction({
              name: 'httppost',
              data: {
                url: app.globalData.baseurl + 'change_back_picture/',
                data: {
                  openid: app.globalData.openid,
                  back_picture: res.fileID
                }
              },
              success: (res) => {
                console.log("修改成功", res)
              },
              fail: (err) => {
                console.log('失败', err)
              }
            })
          },
          fail: (err) => {
            // handle error
            console.log("上传失败", err)
          }
        })
      },
      fail: (err) => {
        console.log('失败', err)
      }
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    if (app.globalData.registered) {
      wx.cloud.callFunction({
        name: 'httprequest',
        data: {
          url: app.globalData.baseurl + 'user_show/',
          data: {
            openid: app.globalData.openid
          }
        },
        success: (res) => {
          console.log("成功", res)
          var data = res.result.data
          var imglist = []
          var userid = []
          for (var i = 0; i < data.album.length; ++i) {
            imglist.push(data.album[i].picture_link)
          }
          for (var i = 0; i < data.identity.length; ++i) {
            userid.push(data.identity[i].identity)
          }
          this.setData({
            bgimg: data.back_picture == "default" ? this.data.bgimg : data.back_picture,
            gendersrc: gender[Number(data.gender)],
            gender: data.gender,
            intro: data.introduction,
            coinnum: data.sufe_currency,
            level: [{
                icon: '../../../images/level.png',
                icontext: '等级',
                progresstext: data.grade.toString() + '级',
                percent: 20 * data.grade
              },
              {
                icon: '../../../images/experience.png',
                icontext: '经验',
                progresstext: data.experience.toString() + '分',
                percent: data.experience
              }
            ],
            imglist: imglist,
            stuid: data.student_id,
            userid: userid
          })
          var userallid = ['0', '1', '2', '3', '4', '5']
          this.Idtoname(userallid)
        },
        fail: (err) => {
          console.log('失败', err)
        }
      })
    }
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