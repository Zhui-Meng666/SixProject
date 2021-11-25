// pages/video_play.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    like_src: '../../../images/like-unclick.png',
    share_src: '../../../images/video_share.png',
    video_list: [{
        like: false,
        like_src: '../../../images/like-unclick.png',
        video_name: 'hahaha',
        author_name: 'abc',
        video_src: 'https://stream7.iqilu.com/10339/upload_transcode/202002/18/20200218093206z8V1JuPlpe.mp4'
      },
      {
        like: false,
        like_src: '../../../images/like-unclick.png',
        video_name: 'hahaha',
        author_name: 'abc',
        video_src: 'https://vod-progressive.akamaized.net/exp=1637783863~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F4285%2F21%2F546426056%2F2591116644.mp4~hmac=2d2d7ca0685b5d65f1045c6a733d1c188b5c655d216e103d853ae7a8d20a14cb/vimeo-prod-skyfire-std-us/01/4285/21/546426056/2591116644.mp4?filename=pexels-anna-nekrashevich-7814905.mp4'
      },
      {
        like: false,
        like_src: '../../../images/like-unclick.png',
        video_name: 'hahaha',
        author_name: 'abc',
        video_src: 'https://vod-progressive.akamaized.net/exp=1637783966~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F2871%2F22%2F564357626%2F2668629918.mp4~hmac=16c6232a8ee4d2542c83e901b7a0726f12fc5615beed8dc8210e08f090d03a14/vimeo-prod-skyfire-std-us/01/2871/22/564357626/2668629918.mp4?filename=pexels-shvets-production-8376368.mp4'
      },
      {
        like: false,
        like_src: '../../../images/like-unclick.png',
        video_name: 'hahaha',
        author_name: 'abc',
        video_src: 'https://vod-progressive.akamaized.net/exp=1637784004~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F1322%2F23%2F581612438%2F2746682532.mp4~hmac=33756f14da756f0266f3e994a20ba6d5133e7201c71781f1d3d276f0838ee7ab/vimeo-prod-skyfire-std-us/01/1322/23/581612438/2746682532.mp4?filename=pexels-solodsha-9008286.mp4'
      }
    ],
    video_all: [{
      like: false,
      like_src: '../../../images/like-unclick.png',
      video_name: 'hahaha',
      author_name: 'abc',
      video_src: 'https://stream7.iqilu.com/10339/upload_transcode/202002/18/20200218093206z8V1JuPlpe.mp4'
    },
    {
      like: false,
      like_src: '../../../images/like-unclick.png',
      video_name: 'hahaha',
      author_name: 'abc',
      video_src: 'https://vod-progressive.akamaized.net/exp=1637783863~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F4285%2F21%2F546426056%2F2591116644.mp4~hmac=2d2d7ca0685b5d65f1045c6a733d1c188b5c655d216e103d853ae7a8d20a14cb/vimeo-prod-skyfire-std-us/01/4285/21/546426056/2591116644.mp4?filename=pexels-anna-nekrashevich-7814905.mp4'
    },
    {
      like: false,
      like_src: '../../../images/like-unclick.png',
      video_name: 'hahaha',
      author_name: 'abc',
      video_src: 'https://vod-progressive.akamaized.net/exp=1637783966~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F2871%2F22%2F564357626%2F2668629918.mp4~hmac=16c6232a8ee4d2542c83e901b7a0726f12fc5615beed8dc8210e08f090d03a14/vimeo-prod-skyfire-std-us/01/2871/22/564357626/2668629918.mp4?filename=pexels-shvets-production-8376368.mp4'
    },
    {
      like: false,
      like_src: '../../../images/like-unclick.png',
      video_name: 'hahaha',
      author_name: 'abc',
      video_src: 'https://vod-progressive.akamaized.net/exp=1637784004~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F1322%2F23%2F581612438%2F2746682532.mp4~hmac=33756f14da756f0266f3e994a20ba6d5133e7201c71781f1d3d276f0838ee7ab/vimeo-prod-skyfire-std-us/01/1322/23/581612438/2746682532.mp4?filename=pexels-solodsha-9008286.mp4'
    }
    ],

    up_stroke: false, // ture:上划；false：下划
    difference: '', // 拖动的距离
    windowHeight: '', // 屏幕高度
    pageY: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var {
      vid
    } = options;
    console.log(vid)
    var temp = this.data.video_all
    var tar = temp[vid]
    temp[vid] = temp[0]
    temp[0] = tar
    this.setData({
      video_list: temp,
      windowHeight: wx.getSystemInfoSync().windowHeight
    })
  },

  like_click(e) {
    let videos = this.data.video_list;
    let idx = Number(e.currentTarget.id);
    console.log(idx)
    if (videos[idx]['like'] == true) {
      videos[idx].like = false;
      // videos[idx].like_src = '../../../images/like-unclick.png';
      this.setData({
        video_list: videos,
        like_src: '../../../images/like-unclick.png'
      })
    } else {
      videos[idx]['like'] = true;
      // videos[idx].like_src = '../../../images/like-click.png';
      this.setData({
        video_list: videos,
        like_src: '../../../images/like-click.png'
      })
    }
  },

  touchStart(e) {
    this.setData({
      pageY: e.touches[0].pageY,
    })
  },
  touchMove(e) {
    let n = e.currentTarget.dataset.index; // 触摸的第几个序号
    let difference = e.touches[0].pageY - this.data.pageY; // 移动后和起始值的差值
    if (this.is_continue(n, difference)) { // 判断是否到底
      return;
    }
    // 划动动画 -------------------------------------
    var animation = wx.createAnimation({ // 移动动效
      duration: 0,
    });
    animation.top(difference - (n * this.data.windowHeight)).step()
    this.setData({
      animation: animation.export(), // 动画
      up_stroke: difference > 0 ? false : true, // 是否上划,
      difference: difference, // 拖动的距离
    })
  },
  // 划动结束坐标方法
  touchEnd(e) {
    let n = e.currentTarget.dataset.index;
    let difference = this.data.difference; // 拖动的距离
    if (this.is_continue(n, difference)) {
      return;
    }
    const windowHeight = this.data.windowHeight; // 屏幕高度
    let that = this;
    // 根据id获取点击元素距顶部高度
    var query = wx.createSelectorQuery();
    let id = '#' + e.currentTarget.id;
    query.select(id).boundingClientRect(function (rect) { // 获取高度
      if (Math.abs(difference) <= windowHeight / 7) { // 小于1/7回原位置 ---------------------------
        var animation = wx.createAnimation({ // 移动动效
          duration: 100,
        });
        animation.top(-(n * windowHeight)).step()
        that.setData({
          animation: animation.export(),
          up_stroke: false, // 重置划动状态
          difference: 0, // 重置划动距离
        })
      } else { // 大于1/4，移至拖动的下一个视频 --------------------------------
        var animation = wx.createAnimation({ // 移动动效
          duration: 200,
        });
        that.data.up_stroke ? n++ : n--; // 上划：n+1  下划：n-1
        animation.top(-(n * windowHeight)).step()
        that.setData({
          animation: animation.export(),
          up_stroke: false, // 重置划动状态
          difference: 0, // 重置划动距离
        })
      }
    }).exec();
  },

  // 判断是否到底
  is_continue(n, difference) {
    if (difference < 0) { // 上划
      if (n == this.data.video_list.length - 1) { // 最后一个视频，提示到底
        if (difference < -20) {
          wx.showToast({
            title: '已经到底了~~',
            icon: 'none',
            duration: 1000
          })
        }
        return true;
      }
    } else {
      if (n == 0) {
        if (difference > 20) {
          wx.showToast({
            title: '上面没有了~~',
            icon: 'none',
            duration: 1000
          })
        }
        return true;
      }
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