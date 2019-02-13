// components/search/index.js
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
    quesValue: '',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onDelete: function (event) {
      console.log("shanchulke ")
      this.setData({
        quesValue: ''
      })
    },
    onComplete: function (event) {
      this.triggerEvent('complete')
    },
    onConfirm: function (event) {
      let quesValue = event.detail.value || event.detail.text
      this.setData({
        quesValue
      })
      console.log("quesValue",quesValue)
      this.triggerEvent('confirm', quesValue)
    }

  }
})
