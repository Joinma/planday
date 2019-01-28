// components/calendar.js
/**
 * 底部弹框组件
 */
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    showModal:{
      type:Boolean,
      observer(newVal) {
        this.setData({
          _showModal: newVal
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    _showModal:false
    
  },
  attached() {
    // 在组件实例进入页面节点树时执行
  },
  /**
   * 组件的方法列表
   */
  methods: {
    hideModal:function() {
      this.setData({
        showModal:false
      })
    },
    // 防止遮罩层点击事件
    preventTouchMove:function(){}
  }
})
