// pages/member/index/index.js
const util = require('../../../utils/util.js')

//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
	  telshow: false,
	  datas:'',
    userInfo: null,
	 domain: app.globalData.domain,
    login: false,

  },

  /**
   * 生命周期函数--监听页面加载--只加载一次
   */
  onLoad: function (options) {
	  console.log(options)
    this.getdataa(4) //默认取第1页
	this.getkehu(options.type)
  },
getdatakh:function(e){
	console.log(e)
	this.getkehu(e.currentTarget.dataset.type)
},

dels:function(e){
	var that=this
	wx.showModal({
	    title: '提示',
	    content: '确认要删除该信息吗?',
	    success: function (res) {
	      if (res.confirm) {
	        console.log('用户点击确定')
	
	console.log(e.currentTarget.dataset.id)
	
	var url = 'User/delskehu'
	  var params = { id: e.currentTarget.dataset.id}
	  console.log(params)
	  util.wxRequest(url, params, data => {
			console.log(data);
	    if (data.code == 200) {
	      wx.showToast({
	        title: data.msg,
	        icon: 'none'
	      }) 
	      that.setData({ listdatas: data.listdatas,pagename:data.pagename})
	
	    }
	console.log(that.data);
	   
	  }, data => { }, data => { })
	
	}
	}
	})
},

  showPopuptel() {
    this.setData({ telshow: true });
  },

  onClosetel() {
    this.setData({ telshow: false });
  },
  /**
   * 获取数据
   */
  getdataa: function (id){
    var url = 'index/getdataa'
    var params = { id: id}
    console.log(params)
    util.wxRequest(url, params, data => {
		console.log(data);
      if (data.code == 200) {
     
        this.setData({ datas: data.datas})

      }
  console.log(this.data);
     
    }, data => { }, data => { })
  },
  
  /**
   * 获取数据
   */
  getkehu: function (type){
    var url = 'User/getkehulist'
    var params = { type: type,
	   openid: app.globalData.openid,
	}
    console.log(params)
    util.wxRequest(url, params, data => {
		console.log(data);
      if (data.code == 200) {
        
        this.setData({ listdatas: data.listdatas,pagename:data.pagename})

      }
  console.log(this.data);
     
    }, data => { }, data => { })
  },
  

  /**
   * 拨打电话
   */

freeTell: function(){

    wx.makePhoneCall({

      phoneNumber: '400-8888-8888',

    })

  },

  /**
   * 关于我们
   */
  Gotourl: function (e) {
	  console.log(e)
	 var urls=e.currentTarget.dataset.url
	  // var Id=e.currentTarget.dataset.vipId
    wx.navigateTo({
      url: urls,
    })
  },

  /**
   * 关于我们
   */
  navigateToAboutus: function () {
    wx.navigateTo({
      url: '../aboutus/aboutus',
    })
  },

  orderList: function() {
    wx.navigateTo({
      url: '../../order/list/list',
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示--每次打开加载
   */
  onShow: function () {
	  if (typeof this.getTabBar === 'function' && this.getTabBar()) {
	    this.getTabBar().setData({
	      tarselected: 1  //数字是当前页面在tabbar的索引,如我的查询页索引是2，因此这边为2，同理首页就为0，审批页面为1
	    })
	  }
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
  
  }
})