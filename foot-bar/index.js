// custom-tab-bar/tabbar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    tarselected: 0,
    color: "#333333",
    selectedColor: "#196cae",
    list: [
     {
          "pagePath": "/pages/index/index",
          "text": "首页",
          "iconPath": "/images/icon_home.png",
          "selectedIconPath": "/images/icon_home_selected.png"
        },
     	{
     	     "pagePath": "/pages/ranking/sdranking/index",
     	     "text": "排行榜",
     	     "iconPath": "/images/ranking.png",
     	     "selectedIconPath": "/images/ranking_select.png"
     	   },
     		{
     		     "pagePath": "/pages/index/index",
     		     "text": "公享资讯",
     		     "iconPath": "/images/icon_news.png",
     		     "selectedIconPath": "/images/icon_news_sel.png"
     		   },
     			
        {
          "pagePath": "/pages/member/index/index",
          "text": "我的",
          "iconPath": "/images/icon_member.png",
          "selectedIconPath": "/images/icon_member_selected.png"
          
        }
     
    ]
  },
 
  /**
   * 组件的方法列表
   */
  methods: {
    switchTab(e) {
		console.log(e)
      const data = e.currentTarget.dataset
      const url = data.path
	  if(data.index==='1'){
		  console.log(1)
      wx.switchTab({ url })
      this.setData({
        tarselected: data.index
      })
	  }else{
		  console.log(2)
		  wx.navigateTo({ url })
		  this.setData({
		    tarselected: data.index
		  })
	  }
	  
    }
  }
})
