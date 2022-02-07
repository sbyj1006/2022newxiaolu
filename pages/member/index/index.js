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
    userInfo: app.globalData.userInfo,
	 domain: app.globalData.domain,
    login: app.globalData.login,

  },

  /**
   * 生命周期函数--监听页面加载--只加载一次
   */
  onLoad: function (options) {
	  this.setData({
	    userInfo: app.globalData.userInfo,
	    login: app.globalData.login
	  })
	  console.log(this.data.login);
	  if(this.data.login){
	  	if(app.globalData.userInfo.avatar && app.globalData.userInfo.wxnickname && app.globalData.userInfo.status!=0){
	  		  
			
	  		  }else{
	  		  		  console.log(12)
	  	          // options.q
	  		  		  wx.redirectTo({
	  		  		  url:"/pages/member/login/login",
	  		  		  			  			  		  })
	  				 	   
	  		  }
	  		      this.setData({ userInfo: app.globalData.userInfo})
	  			  console.log(this.data.userInfo)
	  	if(options.q){
	  			     app.globalData.ewmurl=decodeURIComponent(options.q)
	  	}
	  
	  }else{  console.log(13)
	  console.log(app.globalData)
	  // options.q
	  			  		  wx.redirectTo({
	  			  		url:"/pages/member/login/login",
	  			  					  			  		    })
	  					 	   
	  }
	  
    this.getdataa(4) //默认取第1页
	
  },
   handleContact (e) {
          console.log(e.detail.path)
          console.log(e.detail.query)
      },
//example.js
formidsubmit: function (e) {
 console.log(e.detail.formId);
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
   * 拨打电话
   */

freeTell: function(){

    wx.makePhoneCall({

      phoneNumber: '400-8888-8888',

    })

  },

  /**
   * 跳转
   */
  Gotourl: function (e) {
	  console.log(e)
	 var urls=e.currentTarget.dataset.url
	  // var Id=e.currentTarget.dataset.vipId
    wx.navigateTo({
      url: urls,
    })
  },
  Gotourlsb: function (e) {
	  console.log(e)
	 var urls=e.currentTarget.dataset.url
	  // var Id=e.currentTarget.dataset.vipId
	  
	  if(this.data.userInfo.iscs==1 && this.data.userInfo.status==2  ){
		  console.log(this.data.userInfo.iscs)
		   console.log(this.data.userInfo.status)
		  wx.showToast({
		    title: "对不起，你不是参数人员，或账号没有通过审核",
		    icon: 'none'
		  }) 
		   return false
		  
	  }else{
	  
    wx.navigateTo({
      url: urls,
    })
	
	}
  },
  Gotourla: function (e) {
	  console.log(e)
	 var urls=e.currentTarget.dataset.url
	 var type=e.currentTarget.dataset.type
	  // var Id=e.currentTarget.dataset.vipId
    wx.navigateTo({
      url: urls+'?type='+type,
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
	      tarselected: 3  //数字是当前页面在tabbar的索引,如我的查询页索引是2，因此这边为2，同理首页就为0，审批页面为1
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