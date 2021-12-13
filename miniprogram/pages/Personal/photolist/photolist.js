// pages/Personal/photolist/photolist.js
let app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        num: 0,
        adjust: false,
        bgimg: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201709%2F12%2F20170912162329_VPJnt.thumb.700_0.jpeg&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1639148986&t=03cbf2e144f900a3944c1749697ea306',
    },

    uploadimg: function (e) {
        console.log("点此上传图片，最多九张");
        var fileIDs = []
        var imgs = this.data.imgs
        wx.chooseImage({
            count: 9,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success: (res) => {
                // console.log(res.tempFilePaths.length)
                var len = res.tempFilePaths.length
                
                for (let i = 0; i < res.tempFilePaths.length; i++) {
                    
                    var tempPath = res.tempFilePaths[i]
                    let tempPaths = tempPath.split('/')
                    let filename = tempPaths[tempPaths.length - 1]
                    wx.cloud.uploadFile({
                        cloudPath: filename,
                        filePath: tempPath,
                        success: (res) => {
                            // console.log(res)
                            var fileID = res.fileID
                            fileIDs.push(fileID)
                            imgs.push(fileID)
                            // console.log(i)
                            if(i == len-1){
                                console.log(i)
                                wx.cloud.callFunction({
                                    name: 'httppost',
                                    data: {
                                        url: app.globalData.baseurl + 'album_upload/',
                                        data: {
                                            openid: app.globalData.openid,
                                            picture_link: fileIDs
                                        }
                                    },
                                    success: (res) => {
                                        console.log(res)
                                        this.setData({
                                            imgs : imgs,
                                            num : imgs.length
                                        })
                                        
                                    },
                                    fail:(err) => {
                                        console.log(err)
                                    }
                                })
                            }
                            
                        },
                        fail:(err)=>{
                            console.log(err)
                        }
                    })
                
                }
                
                
            }
        })
        
    },

    org: function (e) {
        var adjust = !this.data.adjust
        this.setData({
            adjust: adjust
        })
    },

    del: function (e) {
        if (this.data.adjust == true) {
            var imgs = this.data.imgs;
            var index = e.currentTarget.dataset.index;
            var picture_link = imgs[index]

            wx.cloud.callFunction({
                name: 'httpdelete',
                data: {
                    url: app.globalData.baseurl + 'album_upload/',
                    data: {
                        openid: app.globalData.openid,
                        picture_link: picture_link
                    }
                },
                success: (res) => {
                    console.log('success')
                    var result = res.result.data
                    var lxb = []
                    for(let i=0;i<result.length;i++){
                        lxb.push(result[i].picture_link)
                    }
                    this.setData({
                        imgs : lxb,
                        num : lxb.length
                    })
                }
            })
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.cloud.callFunction({
            name: 'httprequest',
            data: {
                url: app.globalData.baseurl + 'album_show_all/',
                data: {
                    openid: app.globalData.openid,
                }
            },
            success: (res) => {
                console.log(res.result)
                let imgs = res.result.data.picture_link
                
                let num = imgs.length
                
                this.setData({
                    imgs: imgs,
                    num: num
                })
            },
            fail: (res) => {
                console.log(res)
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