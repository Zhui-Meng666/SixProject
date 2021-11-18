// pages/Personal/photolist/photolist.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        num : 6,
        adjust : false,
        showimgs : [
            {
                idx : 0,
                src : "../../../images/Cat.jpeg",
                show : true
            },
            {
                idx : 1,
                src : "../../../images/coin.png",
                show : true
            },
            {
                idx : 2,
                src : "../../../images/sufecoin.png",
                show : true
            },
            {
                idx : 3,
                src : "../../../images/home-click.png",
                show : true
            },
            {
                idx : 4,
                src : "../../../images/test.png",
                show : true
            },
            {
                idx : 5,
                src : "../../../images/Cat.jpeg",
                show : true
            }
        ],
        imgs : [
            {
                idx : 0,
                src : "../../../images/Cat.jpeg",
                show : true
            },
            {
                idx : 1,
                src : "../../../images/coin.png",
                show : true
            },
            {
                idx : 2,
                src : "../../../images/sufecoin.png",
                show : true
            },
            {
                idx : 3,
                src : "../../../images/home-click.png",
                show : true
            },
            {
                idx : 4,
                src : "../../../images/test.png",
                show : true
            },
            {
                idx : 5,
                src : "../../../images/Cat.jpeg",
                show : true
            }
        ]
    },

    uploadimg: function(e) {
        var that=this;
        console.log("点此上传图片");
        wx.chooseImage({
          count: 1,
          sizeType: ['original', 'compressed'],
          sourceType : ['album', 'camera'],
          success: function(res){
              var tempFilePaths = res.tempFilePaths;
              let imgs = that.data.imgs;
              let idx = imgs.length;
              let temp = {
                  idx : idx,
                  src : tempFilePaths,
                //   show : true
              }
              imgs.push(temp)
              that.setData({
                showimgs : imgs,
                imgs : imgs
              })
            //   moveBy.uploadFile(that, tempFilePaths, 0);
          }
        })
    },
    
    org1: function(e) {
        var showimgs = this.data.showimgs;
        
        for(let i=0;i<showimgs.length;i++){
            showimgs[i].src = '../../../images/delete.png'
        }
        this.setData({
            showimgs : showimgs,
            adjust : true
        })
    },

    org2: function(e) {
        var showimgs = this.data.showimgs;
        var imgs = this.data.imgs;
        for(let i=0;i<showimgs.length;i++){
            showimgs[i].src = imgs[showimgs[i].idx].src
        }
        this.setData({
            showimgs : showimgs,
            adjust : false
        })
    },
    
    del: function(e) {
        if (this.data.adjust == true){
            var imgs = this.data.showimgs;
            var index = e.currentTarget.dataset.index;
            console.log(index)
            imgs.splice(index, 1);
            this.setData({
                showimgs: imgs,
                num : imgs.length
            })
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            num : this.showimgs.length
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
    onShow: function (e) {

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