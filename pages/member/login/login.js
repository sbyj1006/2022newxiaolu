// pages/member/login/login.js
const util = require('../../../utils/util.js')

//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    login: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
	  wx.hideHomeButton()
    this.setData({
      userInfo: app.globalData.userInfo,
      login: app.globalData.login
    })
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

  },
getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (resa) => {
		  console.log(resa)
		  
		
		  
    // 第三季修正
    if (resa.userInfo !== undefined){
      wx.login({
        success: res => {
			console.log(res)
          if (res.code) {
            var that = this
            var url = 'User/getUser'
            var params = {
              code: res.code,
              openid: app.globalData.openid,
              // 第三季修正
              nickname: resa.userInfo.nickName,
              avatar: resa.userInfo.avatarUrl
            }
            util.wxRequest(url, params, data => {
              if (data.code == 200) {
                app.globalData.userInfo = data.data
                app.globalData.login = true
                this.setData({ login: true })
                wx.showToast({
                  title: '登录成功',
                  icon: 'success',
                  duration: 2000
                })
				 setTimeout(function () {
				            //要延时执行的代码
				        // wx.navigateBack()
						wx.switchTab({
						  url: '../index/index',
						})  
						
						
				          }, 2000) //延迟时间
                // 返回原地址
               console.log(app.globalData.userInfo)
              }else if(data.code == 340){
				  
				 app.globalData.userInfo = resa.userInfo
		  
		  wx.navigateTo({
		    url: '../myinfo/add',
		  })
		  
	  } else {
                //错误，需用户重新授权登录
                app.globalData.login = false
                wx.showToast({
                  title: data.msg,
                  icon: 'none',
                  duration: 2000
                })
              }
            }, data => { }, data => { })
          }
        }
      })
    }

      }
    })
  },
/**
 * 授权登录
 */
  login: function (e) {
    // 第三季修正
    if (e.detail.userInfo !== undefined){
      wx.login({
        success: res => {
          if (res.code) {
            var that = this
            var url = 'User/getUser'
            var params = {
              code: res.code,
              openid: app.globalData.openid,
              // 第三季修正
              nickname: e.detail.userInfo.nickName,
              head: e.detail.userInfo.avatarUrl
            }
            util.wxRequest(url, params, data => {
              if (data.code == 200) {
                app.globalData.userInfo = data.data
                app.globalData.login = true
                this.setData({ login: true })
                wx.showToast({
                  title: '登录成功',
                  icon: 'success',
                  duration: 2000
                })
                // 返回原地址
                wx.navigateBack()
              } else {
                //错误，需用户重新授权登录
                app.globalData.login = false
                wx.showToast({
                  title: data.msg,
                  icon: 'none',
                  duration: 2000
                })
              }
            }, data => { }, data => { })
          }
        }
      })
    }
  }

})