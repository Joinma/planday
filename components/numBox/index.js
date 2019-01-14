// components/numBox/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    name: {
      type: String,
      value: 'xing'
    },
    price: {
      type: String,
      value: '0',
      observer(newVal, oldVal, changedPath) {
        this.data._price
      }
    },
    year: {
      type: String,
      value: '2019'
    },
    date: {
      type: String,
      value: '今天'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    _price: 0,
    isFirstInput: false
  },
  attached() {
    this.setData({
      _price: this.properties.price
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    numberInput(e) {
      let numValue = e.currentTarget.dataset.index
      let price = this.data.price
      let newPrice = this.checkNumber(newPrice, numValue)
      console.log("newpprice", this.checkNumber(newPrice, numValue))
      this.setData({
        price: newPrice
      })
      console.log("数字点击了...", numValue)
    },
    checkNumber(newPrice, numValue) {
      let price = this.data.price
      if (price.startsWith('0') && numValue === '0') {
        console.log("laile ")
        newPrice = price
      } else {
        let isFirstInput = this.data.isFirstInput
        if (isFirstInput) {
          newPrice = price + numValue
        } else {
          newPrice = numValue
        }
        this.data.isFirstInput = true
      }
      return newPrice
    }
  },

})