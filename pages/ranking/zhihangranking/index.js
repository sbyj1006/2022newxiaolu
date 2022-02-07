// index.js

const util = require('../../../utils/util.js')
var QQMapWX = require('../../../utils/qqmap-wx-jssdk.js');
var qqmapsdk;
//获取应用实例

const app = getApp()

Page({
  data: {
	  domain:app.globalData.domain,
	  tarselected:'',
    motto: 'Hello World',
	allOrderNumber:true,
	shoudanOrderNumber:false,
	daikuanOrderNumber:false,
    userInfo: {},
	indexd:"allOrderNumber",
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad(p) {
	  
	  	  console.log(p)
		  if(p.hasOwnProperty("indexd")){
		  this.setData({
		  		  indexd:p.indexd,
				  allOrderNumber:false,
				  shoudanOrderNumber:false,
				  daikuanOrderNumber:false,
				  [p.indexd]:true
				  })
				  
				  if(p.indexd=='allOrderNumber'){
				  	this.setData({activea:'active'})
				  }
				  if(p.indexd=='shoudanOrderNumber'){
				  	this.setData({activeb:'active'})
				  }
				  if(p.indexd=='daikuanOrderNumber'){
				  	this.setData({activec:'active'})
				  }
				  
				  }
	  this.getdataa(3)
	  this.getpmdatanew()
    if (wx.getUserProfile) {
      this.setData({
	
		  totals:pmdata.totals,
        canIUseGetUserProfile: true
      })
    }
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
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
  getpmdatanew: function (){
    var url = 'index/getpmdatazhihang'
    var params = {}
    console.log(params)
    util.wxRequest(url, params, data => {
  		console.log(data);
      if (data.code == 200) {
        
        this.setData({ pmdata: data.pmdata})
  
      }
  console.log(this.data);
     
    }, data => { }, data => { })
  },
  /**
   * 点击进入页面
   */
  ggurlb: function (e) {
	 
	 var url=e.currentTarget.dataset.actionurl
	  console.log(url)
    wx.navigateTo({
      url: url+"?indexd="+this.data.indexd,
    })
  },
  gotodata:function(e){
	  console.log(e)
	   var orders=e.currentTarget.dataset.orders
	this.setData({
		allOrderNumber:false,
		shoudanOrderNumber:false,
		daikuanOrderNumber:false,
	activea:'',
		activeb:'',
		activec:'',
	})
	if(orders=='allOrderNumber'){
		this.setData({activea:'active'})
	}
	if(orders=='shoudanOrderNumber'){
		this.setData({activeb:'active'})
	}
	if(orders=='daikuanOrderNumber'){
		this.setData({activec:'active'})
	}
	this.setData({[orders]:true,indexd:orders})
	   console.log(this.data)
  },
   onShow: function (){
	  if (typeof this.getTabBar === 'function' && this.getTabBar()) {
	    this.getTabBar().setData({
	      tarselected: 0  //数字是当前页面在tabbar的索引,如我的查询页索引是2，因此这边为2，同理首页就为0，审批页面为1
	    })
	  }
  },
  switchTab(e) {
  	console.log(e)
    const data = e.currentTarget.dataset
    const url = data.path
	  if(data.index=='1' || data.index=='2' ){
		  console.log(1)
		   wx.navigateTo({ url })
      
      this.setData({
        tarselected: data.index
      })
	  }else{
		  console.log(2)
		 wx.switchTab({ url })
		  this.setData({
		    tarselected: data.index
		  })
	  }
    
  }
  
  
  
})
