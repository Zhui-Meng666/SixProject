// pages/video_play.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    like_src: '../../../images/like-unclick.png',
    share_src: '../../../images/video_share.png',
    video_list: [],
    video_src_list : [],
    test : [
      'cloud://mengyanzhiya-7g39qvgfa47d0969.6d65-mengyanzhiya-7g39qvgfa47d0969-1304999579/pexels-sami-aksu-10207542.mp4',
      'cloud://mengyanzhiya-7g39qvgfa47d0969.6d65-mengyanzhiya-7g39qvgfa47d0969-1304999579/f60b9b79704bd5d71e012da61dfbdb94.mp4'
    ],

    up_stroke: false, // ture:上划；false：下划
    difference: '', // 拖动的距离
    windowHeight: '', // 屏幕高度
    pageY: ''
  },
  // this.walk
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      windowHeight : wx.getSystemInfoSync().windowHeight
    })
    var vids = JSON.parse(options.vids)
    // console.log(vids)
    var video_list = this.data.video_list
    var video_src_list = this.data.video_src_list
    let openid = app.globalData.openid
    for(let i=0;i<vids.length;i++){
      let vid = vids[i]
      var temp = {
        id : 0,
        name : null,
        video_link : null,
        picture_link : null,
        like_num : 0,
        collection_num : 0,
        introduction : null,
        creator : null,
        create_time : null,
        like : false ,
        collected : false 
      }
      // 获取视频
      wx.cloud.callFunction({
        name : 'httprequest',
        data : {
          url : app.globalData.baseurl + 'scientific_video_detail/',
          data : {
            id : vid 
          }
        },
        success : (res) => {
          var v = res.result.data 
          // console.log(v)
          // video_list.push(res.result.data)
          temp.id = v.id 
          temp.name = v.name
          temp.video_link = v.video_link
          temp.picture_link = v.picture_link
          temp.like_num = v.like_num
          temp.collection_num = v.collection_num
          temp.introduction = v.introduction
          temp.creator = v.creator
          temp.create_time = v.create_time
          // console.log(temp)
          video_list.push(temp)
          video_src_list.push(temp.video_link)
          this.setData({
            video_list : video_list,
            video_src_list : video_src_list
          })
        },
        fail:(err) => {
            console.log(err)
        }
      })

      // 查看是否点赞
      // wx.cloud.callFunction({
      //   name : 'httprequest',
      //   data : {
      //     url : app.globalData.baseurl + "scientific_video_like/",
      //     data : {
      //       id : vid,
      //       openid : openid 
      //     }
      //   },
      //   success:(res)=>{
      //     // console.log(res)
      //     if(res.result.status == 200){
      //       temp.like = res.result.data.is_like
      //     }
      //     else{
      //       temp.like = false
      //     }
      //   },
      //   fail:(err)=>{
      //     console.log(err)
      //   }
      // })

      // 查看是否收藏 
      // wx.cloud.callFunction({
      //   name : 'httprequest',
      //   data : {
      //     url : app.globalData.baseurl + 'scientific_video_collection/',
      //     data : {
      //       openid : openid,
      //       id : vid 
      //     }
      //   },
      //   success:(res)=>{
      //     if(res.status==200){
      //       temp.collected = res.result.data.is_collected
      //     }
      //     else{
      //       temp.collected = false
      //     }

      //   },
      //   fail:(err)=>{
      //     console.log(err)
      //   }
      // })
      // video_list.push(temp)
    }
    // console.log(video_list)
    // this.setData({
    //   video_list : video_list
    // })

    console.log(this.data.video_src_list)
  },

  like_click(e) {
    let videos = this.data.video_list;
    let idx = Number(e.currentTarget.dataset.index);
    // console.log(idx)
    let vid = videos[idx].id 
    if(videos[idx].like == false){
      wx.cloud.callFunction({
        name : 'httppost',
        data : {
          url : app.globalData.baseurl + 'scientific_video_like/',
          data : {
            openid : app.globalData.openid,
            id : vid 
          }
        },
        success : (res) => {
          videos[idx]['like'] = !videos[idx]['like'] 
        }
      })
      this.setData({
        video_list : videos 
      })
    }
    else{
      wx.cloud.callFunction({
        name : 'httppost',
        data : {
          url : app.globalData.baseurl + 'scientific_video_like_cancel/',
          data : {
            openid : app.globalData.openid,
            id : vid 
          }
        },
        success : (res) => {
            videos[idx]['like'] = !videos[idx]['like'] 
        }
      })
      this.setData({
        video_list : videos 
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