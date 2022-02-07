// pages/myform/freesj/add.js
const util = require('../../../utils/util.js')
// import Toast from '../../yy/toast/toast';
//获取应用实例
const app = getApp()
// const citys = {
//   浙江: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
//   福建: ['福州', '厦门', '莆田', '三明', '泉州'],
// };
Page({
  /**
   * 页面的初始数据
   */
  data: {
    nickname: '',
    jobnumber: '',
    mobile: '',
	address:'',
	images:'',
    //说明从购物车跳转过来的，添加成功后跳转到order/submit/submit
    returnType: '',
	mfsjban:{img:'/static/upload/Banner/logo/20200519/25223bdfd9025a02ad326df5df4de487.jpg',name:'立即预约'},
    userInfo: app.globalData.userInfo,
     domain: app.globalData.domain,
    login: app.globalData.login,
    //以下为省市区数据相关
	zhihangdatas:[],
	teamdata:[],
	zhihangname:'',
	teamname:'',

	szquyu:'请选择所在区域',
	show: false,
	showt:false,
	fileList: [],
isziyuan:0,
iscs:1,
    distanceArr: [],
	
iscsclass:'iscsclass',
 checkeda: false,
  // isziyuan: false,
  },
 showPopup() {
    this.setData({ show: true });
  },

  onClose() {
    this.setData({ show: false });
  },
  showPopupt() {
     this.setData({ showt: true });
   },
  
   onCloset() {
     this.setData({ showt: false });
   },
  onChange(event) {
      const { picker, value, index } = event.detail;
      // Toast(`当前值：${value}, 当前索引：${index}`);
    },

	onConfirm(event) {
	    const { picker, value, index } = event.detail;
	    // Toast(`当前值：${value}, 当前索引：${index}`);
		console.log(`当前值：${value}, 当前索引：${index}`)
		this.setData({ show: false,['userInfo.zhihangname']:value});
	  },
	onChanget(event) {
	    const { picker, value, index } = event.detail;
	    // Toast(`当前值：${value}, 当前索引：${index}`);
	  },
	
		onConfirmt(event) {
		    const { picker, value, index } = event.detail;
		    // Toast(`当前值：${value}, 当前索引：${index}`);
			console.log(`当前值：${value}, 当前索引：${index}`)
			this.setData({ showt: false,['userInfo.teamname']:value});
		  },
	  onCancel() {
	    Toast('取消');
	  },
  nameChange: function(e) {
    this.setData({ consignee: e.detail.value })
  },

  addressChange: function (e) {
    this.setData({ address: e.detail.value })
  },
onChangef(e){
	console.log(e)
	  this.setData({ ['userInfo.mobile']: e.detail })
},
  mobileChange: function (e) {
    this.setData({ mobile: e.detail.value })
  },
 onChangea({ detail }) {
	 console.log(detail)
	 // 需要手动对 checked 状态进行更新
	 this.setData({ checkeda: detail });
	 if(this.data.checkeda==false){
		  this.setData({ iscsclass: 'iscsclass',iscs:1, });
	 }else{
		  this.setData({ iscsclass: '' ,iscs:2,});
	 }
	 console.log(this.data.iscs)

  },
  onChangeb({ detail }) {
	  // 需要手动对 checked 状态进行更新
	  this.setData({ checkedb: detail });
	  if(this.data.checkedb==false){
	  		  this.setData({ isziyuan: 1 });
	  }else{
	  		  this.setData({ isziyuan: 2 });
	  }
	  

	 
	 console.log(this.data)
	 
   },
// 城市

//图片上传
  afterRead(event) {
    const { file } = event.detail;
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
	console.log(file)
    wx.uploadFile({
      url: app.globalData.domain + '/api/Index/wxupload', // 仅为示例，非真实的接口地址
      filePath: file.thumb,
      name: 'file',
      formData: {},
	   
      success(res) {
		  console.log(res)
        // 上传完成需要更新 fileList
        const { fileList = [] } = this.data;
        fileList.push({ ...file, url: res.data });
        this.setData({ fileList });
      },
	  fail: function(res) {
	             console.log(file)
	           }
    });
	
  },

//

  //保存
  submit: function() {
    var nickname = this.data.userInfo.nickname
    var jobnumber = this.data.userInfo.jobnumber
    var mobile = this.data.userInfo.mobile
    var iscs = this.data.iscs
	var zhihangname=this.data.userInfo.zhihangname
	var teamname=this.data.userInfo.teamname
   var isziyuan = this.data.isziyuan
   	console.log(app.globalData.userInfo)
	   if(nickname.length<2){
	   	 wx.showToast({
	   	   title: "请输入姓名",
	   	   icon: 'none'
	   	 }) 
	   	  return false
	   	}
	   if(jobnumber.length<2){
	   	 wx.showToast({
	   	   title: "请输入工号",
	   	   icon: 'none'
	   	 }) 
	   	  return false
	   	}
		if(zhihangname.length<1){
			 wx.showToast({
			   title: "请选择所属支行",
			   icon: 'none'
			 }) 
			  return false
			}
		
    var url = 'User/updatauser'
    var params = {
      nickname: nickname,
      jobnumber: jobnumber,
      mobile: mobile,
      zhihangname: zhihangname,
	  teamname: teamname,
iscs:iscs,
isziyuan:isziyuan,
userInfo_avatarUrl:app.globalData.userInfo.avatarUrl,
userInfo_nickname:app.globalData.userInfo.nickName,

      openid: app.globalData.openid,
    
	
	  token: app.globalData.userInfo.token
    }
    util.wxRequest(url, params, data => {
		console.log(data)
      if (data.code == 200) {
		  app.globalData.userInfo=data.data
        wx.showToast({
          title: data.msg,
          icon: 'none',
		  duration:2000,
		  success:function(){
		  	wx.switchTab({
		  	  url: '../index/index',
		  	})
		  }
        })
		
		
     
      }else{
		wx.showToast({
		  title: data.msg,
		  icon: 'error'
		})  
	  }
    }, data => { }, data => { })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	    var that = this


	  
this.getcdata()
	  
    if (options.returnType != undefined){
      this.setData({ returnType: options.returnType })
    }

  },

getcdata:function(){
	
	var url = 'User/getcdata'
	var params = {}
	util.wxRequest(url, params, data => {
		console.log(data)
	  if (data.code == 200) {
this.setData({zhihangdatas:data.data.zhihangdatas,teamdata:data.data.teamdata})

	 
	  }else{
	
	  }
	  console.log(this.data)
	}, data => { }, data => { })
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
  if (typeof this.getTabBar === 'function' && this.getTabBar()) {
    this.getTabBar().setData({
      tarselected: 2  //数字是当前页面在tabbar的索引,如我的查询页索引是2，因此这边为2，同理首页就为0，审批页面为1
    })
  }
  this.setData({
    userInfo: app.globalData.userInfo,
    login: app.globalData.login
  })
  
  
  if(this.data.userInfo.iscs==2){
	  this.setData({iscsclass:'',iscs:2,checkeda:true,})
  }
  
  if(this.data.userInfo.isziyuan==2){
  	  this.setData({isziyuan:2,checkedb:true,})
  }
  },
  /**
   * 点击进入页面
   */
  ggurlb: function (e) {
	  console.log(e)
	 var url=e.currentTarget.dataset.actionUrl
    wx.navigateTo({
      url: url,
    })
  },
   checkboxChange(e) {
      console.log('checkbox发生change事件，携带value值为：', e.detail.value)
  
      const items = this.data.items
      const values = e.detail.value
      for (let i = 0, lenI = items.length; i < lenI; ++i) {
        items[i].checked = false
  
        for (let j = 0, lenJ = values.length; j < lenJ; ++j) {
          if (items[i].value === values[j]) {
            items[i].checked = true
            break
          }
        }
      }
  
      this.setData({
        items
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