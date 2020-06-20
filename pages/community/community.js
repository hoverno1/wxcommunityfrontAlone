// pages/community.js
var postsData = require('../../data/posts-data.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    counts: 3
  },
  // 上滑加载更多
  onScrollLower: function(event) {
    // console.log("加载更多")
    this.onLoad();
    if (this.data.counts < this.data.length) {
      this.data.counts += 3
      this.onLoad();
    }
  },

  toDetail: function(event) {
    //获取postId
    var postId = event.currentTarget.dataset.postid;
    var self = this;
    // console.log("postId" + postId);
    wx.navigateTo({
      url: 'community-detail/community-detail?id=' + postId,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 从/data/posts-data.js来读取数据
    // console.log(this.data.counts);
    // this.setData({
    // length: postsData.postList.length,
    // posts_key: postsData.postList.slice(0, this.data.counts)
    // })
    var self = this;
    wx.request({
      url: 'https://my.plantdisrecogn.com/wxcommunity/queryPost',
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (req) { 
        var postsData = req.data;
          self.setData({
            postsData: req.data,
            length: postsData.length,
            posts_key: postsData.slice(0, self.data.counts)
    })
  }
})},

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