// pages/publishPost/publishPost.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

doRegist: function(e){
  var self = this;
  self.setData({
    disease: e.detail.value.disease,
    diseaseContent: e.detail.value.diseaseContent,
  })
  wx.request({
    url: 'https://my.plantdisrecogn.com/wxcommunity/publishPost',
    method: 'POST',
    data: {
      aid: self.data.aid,
      disease: self.data.disease,
      diseaseContent: self.data.diseaseContent,
    },
    header: {
      'content-type': 'application/x-www-form-urlencoded' // 默认值 上传用这个类型好
    },
    success: function (req) {
      //console.log(req.data);
      self.setData({
        status: req.data,
      })
    }
  })
  wx.uploadFile({

    url: 'https://my.plantdisrecogn.com/wxcommunity/publishPostPic', 
    filePath: self.data.photos[0],
    name: 'file',
    success: function (res) {
      var sta = res.data
      //console.log(res)
      self.setData({
        status2: sta,
      })
    }
  })

  //等待一会再执行
  setTimeout(function () {
    //判断登陆信息，信息正确则status与status2值为1，跳转发布页面
    //status是判断用户名与密码，status2是判断头像
    if (self.data.status == 1 && self.data.status2 == 1) {
      wx.switchTab({
        url: '../community/community',
      })
    } else {
      if (self.data.status != 1) {
        wx.showToast({
          title: '文字内容有误',
          icon: 'none',
          duration: 2000
        })
      } else {
        wx.showToast({
          title: '图片有误',
          icon: 'none',
          duration: 2000
        })
      }
    }
  },
    //睡2秒
    3000)

},
  chooseImg: function () {
    var self = this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        self.setData({
          photos: tempFilePaths
        })
      },
    })
  },

  toCommunity:function(){
    wx.switchTab({
      url: '../community/community',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var self = this;
      //获取从上以页面携带的数据：aid
      self.setData({
        aid : options.aid,
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