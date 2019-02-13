// components/numBox/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    name: {
      type: String,
      value: ''
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
    isFirstInput: false,
    resultPrice: 0,
    numEditType: 0, // 0 表示没有点击加号
    operateType: 0 // 上一次进行的操作记录
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
      //数字键 点击数值,点及价格的显示
      let numValue = e.currentTarget.dataset.index
      let price = this.data.price
      let numEditType = this.data.numEditType
      // 假如点击了 +或- 触发的事件
      console.log("numValue", numValue, "price", price)
      if (numEditType == 1 || numEditType == 2) {
        this.setData({
          price: numValue,
          numEditType: 0
        })
        return
      }
      // 保留两位小数 并且最多位数为12
      let decimalIndex = price.indexOf('.')
      let returnResult = decimalIndex != -1 && price.substring(decimalIndex).length > 2 || price.length > 12
      if (returnResult) {
        return
      }

      let newPrice = this.checkNumber(newPrice, numValue)
      // console.log("newpprice", this.checkNumber(newPrice, numValue))
      this.setData({
        price: newPrice
      })
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
    },
    decimalInput() {
      const value = '.'
      let price = this.data.price
      let numEditType = this.data.numEditType
      // 假如点击了 + 或 - 触发的事件
      console.log("price", price)
      if (numEditType == 1) {
        this.setData({
          price: '0.',
          numEditType: 0
        })
        return
      }
      if (price.indexOf(value) == -1) {
        // 没有点 可以添加
        this.setData({
          price: price + value
        })
      } else {
        return
      }
    },
    editInput(e) {
      let edit = e.currentTarget.dataset.type
      let price = this.data.price

      let resultPrice = parseFloat(this.data.resultPrice)
      let numPrice = parseFloat(price)
      let numEditType = this.data.numEditType
      let operateType = this.data.operateType

      console.log('resultPrice: ', resultPrice, 'numPrice: ', numPrice, 'numEditType: ', numEditType, 'operateType: ', operateType)
      switch (edit) {
        case 'delete':
          let priceLen = price.length
          if (priceLen > 1) {
            let newPrice = price.substring(0, priceLen - 1)
            this.setData({
              price: newPrice
            })
          }
          break;
        case 'zero':
          this.setData({
            price: '0',
            resultPrice: '0',
            isFirstInput: false
          })
          break;
        case 'add':
          if (numEditType == 1) {
            break;
          }
          operateType == 2 ? resultPrice = resultPrice - numPrice : resultPrice = resultPrice + numPrice
          this.setData({
            price: 0,
            resultPrice: resultPrice,
            numEditType: 1,
            operateType: 1
          })
          break;
        case "minus":
          if (numEditType == 2) {
            break;
          }
          operateType == 0 ? resultPrice = numPrice : operateType == 1 ? resultPrice = resultPrice + numPrice : resultPrice = resultPrice - numPrice
          this.setData({
            price: 0,
            resultPrice: resultPrice,
            numEditType: 2,
            operateType: 2
          })
          break;
        case 'comfirm':
          if (operateType == 1) {
            resultPrice = resultPrice + numPrice
          } else {
            resultPrice = resultPrice - numPrice
          }
          this.setData({
            price: 0,
            resultPrice: resultPrice,
            // numEditType: 3
          })

          break;
        default:
          console.log("都没有匹配上")
          break;
      }
    },
    onTapDate() {
      this.triggerEvent('ontapDate')
    },
    addOrderNote() {
      this.triggerEvent('onAddOrderNote')
    }
  },
})