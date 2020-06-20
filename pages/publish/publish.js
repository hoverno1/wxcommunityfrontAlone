// pages/publish/publish.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:"",
    password:"",
    status:"",
  },
  goRegist : function(){
    wx.redirectTo({
      url: '../userRegist/regist',
    })
  },
  //提交功能绑定在form表单上即<form bindsubmit='doLogin'>中的doLogin
  doLogin:function(e){
    var self = this;
    self.setData({
      username: e.detail.value.username,
      password: e.detail.value.password,
    })
    app.globalData.globalUserName=self.data.username,
    wx.request({
      url: 'https://my.plantdisrecogn.com/wxcommunity/Test',
      method: 'POST',
      data:{
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
        })
      },
    })
    wx.request({
      url: 'https://my.plantdisrecogn.com/wxcommunity/queryAid',
      method: 'Get',
      data: {
        username: self.data.username,
      },
      header: {
        'content-type': 'application/json' // 默认值 上传用这个类型好
      },
      success: function (req) {
        //console.log(req.data);
        self.setData({
          aid: req.data,
        })
      }
    })
    //等待一会再执行
    setTimeout(function () {
    //判断登陆信息，信息正确则status值为1，跳转发布页面
    if (self.data.status == 1) {
      wx.redirectTo({
        url: '../publishPost/publishPost?aid=' + self.data.aid,
      })
    }else{
      wx.showToast({
        title: '用户名或密码错误',
        icon: 'none',
        duration: 2000
      })
    }
    },
      //睡2秒
      2000)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})