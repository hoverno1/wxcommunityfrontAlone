const app = getApp()

Page({
  data: {
    status2: 0
  },
  doRegist: function (e) {
    var self = this;
    self.setData({
      username: e.detail.value.username,
      password: e.detail.value.password,
      globalUserName:username
    })
    wx.request({
      url: 'https://my.plantdisrecogn.com/wxcommunity/Login',
      method: 'POST',
      data: {
        username: self.data.username,
        password: self.data.password,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值 上传用这个类型好
      },
      success: function (req) {
        //console.log(req.data);
        self.setData({
          status: req.data,
        })}
    })
    wx.uploadFile({

      url: 'https://my.plantdisrecogn.com/wxcommunity/LoginPic',
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
    wx.request({
      url: 'https://my.plantdisrecogn.com/wxcommunity/queryAid',
      method: 'Get',
      data: {
        username: self.data.username,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (req) {
        //console.log(req.data);
        self.setData({
          aid: req.data,
        })
      }
      })
    },
      //睡2秒
      2000)

    
    //等待一会再执行
    setTimeout(function () {
    //判断登陆信息，信息正确则status与status2值为1，跳转发布页面
    //status是判断用户名与密码，status2是判断头像
    if (self.data.status == 1 && self.data.status2 == 1) {

      wx.request({
        url: 'https://my.plantdisrecogn.com/wxcommunity/postAid',
        method: 'Post',
        data: {
          aid: self.data.aid,
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值 上传用这个类型好
        },
        success: function (req) {
          //console.log("成功上传aid")
        }
      })
      wx.redirectTo({
        url: '../publishPost/publishPost?aid=' + self.data.aid,
      })
    } else {
      if (self.data.status != 1){
      wx.showToast({
        title: '用户名已存在',
        icon: 'none',
        duration: 2000
      })
      }else{
        wx.showToast({
          title: '请选择头像',
          icon: 'none',
          duration: 2000
        })
      }
    }
    },
    //睡2秒
    3000)
  },
  goLoginPage: function () {
    wx.switchTab({
      url: '../publish/publish',
    })
  },
  //点击事件
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

  uploadImg: function () {
    var self = this
    
  }
})