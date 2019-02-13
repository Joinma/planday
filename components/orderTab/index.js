// components/orderTab/index.js
import API from '../../utils/api.js'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    resIconList: {
      type: Array,
      value: [],
      observer(newVal, oldVal, changedPath) {
        this.resetResArray()
      }
    },
    pageNum: {
      type: Number,
      value: 10
    },
    current:{
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    imageUrl: API.api.imageUrl,
    interval: 2000,
    iconItem: {
      "icon": "/planday/icons/expense/clothes.png",
      "name": "dianTV",
      "type": 0
    },
    addItem: {
      "icon": "/planday/icons/common/addIcon.png",
      "name": "添加",
      "color": "#6dc9c8",
      "type": 4
    },
    _newIconList: []
  },
  attached() {
    // deal with res data
    console.log("currrr")
    this.resetResArray();
  },
  /**
   * 组件的方法列表
   */
  methods: {
    resetResArray() {
      let resIconList = this.data.resIconList
      resIconList.push(this.data.addItem)
      const pageNum = this.properties.pageNum
      const newIconList = []
      let listIndex = 0
      let listInnerArray = []
      resIconList.forEach(function(value, index) {
        if (listIndex < pageNum) {
          listInnerArray.push(value)
          if (index == resIconList.length - 1) {
            newIconList.push(listInnerArray)
          }
          listIndex += 1
        } else {
          newIconList.push(listInnerArray)
          listInnerArray = []
          listInnerArray.push(value)
          if (index == resIconList.length - 1) {
            newIconList.push(listInnerArray)
          }
          listIndex = 1;
        }
      })
      this.properties.newIconList = newIconList
      this.setData({
        _newIconList: newIconList
      })
    },
    recordOrAdd: function(e) {
      let dataInfo = e.currentTarget.dataset.info
      let iconType = dataInfo.split('-')[0]
      let index = dataInfo.split('-')[1]
      if (iconType == 4) {
        //添加
        // console.log("添加", iconType)
        this.addRecordItem();
      } else {
        // console.log("记录", iconType)
      }
    },
    addRecordItem: function() {
      let iconList = this.data._newIconList
      let iconListLength = iconList.length
      let iconItem = this.data.iconItem
      let addItem = this.data.addItem
      let innerIconLength = iconList[iconListLength - 1].length
      const iconNum = 10

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