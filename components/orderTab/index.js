// components/orderTab/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    resIconList:Array,
    pageNum:{
      type:Number,
      value:10
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    interval: 2000,    
    iconItem: {
      "imgUrl": "/images/dianshijiTV.png",
      "name": "dianTV",
      "type": "record"
    },
    addItem: {
      "imgUrl": "/images/addIcon.png",
      "name": "添加",
      "type": "add"
    },
    _newIconList:[]
  },
  attached (){
    // deal with res data
    this.resetResArray();
  },
  /**
   * 组件的方法列表
   */
  methods: {
    resetResArray() {
      const resIconList = this.data.resIconList
      const pageNum = this.properties.pageNum
      const newIconList = []
      let listIndex = 0
      let listInnerArray = []
      resIconList.forEach(function (value, index) {
        if (listIndex < pageNum) {
          listIndex += 1
          listInnerArray.push(value)
          if (index == resIconList.length - 1) {
            newIconList.push(listInnerArray)
          }
        } else {
          listIndex = 0;
          newIconList.push(listInnerArray)
          listInnerArray = []
          listInnerArray.push(value)
          if (index == redPacketList.length - 1) {
            newIconList.push(listInnerArray)
          }
        }
      })
      this.properties.newIconList = newIconList
      this.setData({
        _newIconList: newIconList
      })
      console.log("resIconList", newIconList)
    },
    recordOrAdd: function (e) {
      let dataInfo = e.currentTarget.dataset.info
      let iconType = dataInfo.split('-')[0]
      let index = dataInfo.split('-')[0]
      if (iconType == 'record') {
        console.log("记录", iconType)
      } else {
        //添加
        console.log("添加", iconType)
        this.addRecordItem();
      }
    },
    addRecordItem: function () {
      let iconList = this.data._newIconList
      let iconListLength = iconList.length
      let iconItem = this.data.iconItem
      let addItem = this.data.addItem
      let innerIconLength = iconList[iconListLength - 1].length
      const iconNum = 10
      console.log("iconList", iconList)

      if (innerIconLength < iconNum) {
        // 往数组里加内容
        iconList[iconListLength - 1].splice(innerIconLength - 1, 0, iconItem)
      } else {
        // 添加一个 新数组
        iconList[iconListLength - 1].splice(-1, 1)
        iconList[iconListLength - 1].push(iconArray)
        let iconArray = []
        iconArray[0] = addItem
        iconList.push(iconArray)
      }
      // this.properties.newIconList = iconList
      
      this.setData({
        _newIconList: iconList
      })
    },
  }
})
