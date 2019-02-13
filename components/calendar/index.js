// components/calendar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    days:{
      type:Array,
      observer(newVal, oldVal) {
        this.setData({
          _days: newVal
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    _days:[]
  },
  attached() {
    // 在组件实例进入页面节点树时执行
    const date = new Date();
    const cur_year = date.getFullYear();
    const cur_month = date.getMonth() + 1;
    const weeks_ch = ['日', '一', '二', '三', '四', '五', '六'];
    this.calculateEmptyGrids(cur_year, cur_month);
    this.calculateDays(cur_year, cur_month);
    this.setData({
      cur_year,
      cur_month,
      weeks_ch
    });
    let days = this.data._days;
    this.triggerEvent('initDate', { initYear: cur_year, initMonth: cur_month, days })
    console.log("days", this.properties.days)
  },
  /**
   * 组件的方法列表
   */
  methods: {
    handleCalendar(e) {
      const handle = e.currentTarget.dataset.handle;
      const cur_year = this.data.cur_year;
      const cur_month = this.data.cur_month;
      if (handle === 'prev') {
        let newMonth = cur_month - 1;
        let newYear = cur_year;
        if (newMonth < 1) {
          newYear = cur_year - 1;
          newMonth = 12;
        }
        this.calculateDays(newYear, newMonth);
        this.calculateEmptyGrids(newYear, newMonth);
        // 获取一个月的签到详情
        let days = this.data._days;
        this.triggerEvent('changeDate', { newYear, newMonth, days})
        this.setData({
          cur_year: newYear,
          cur_month: newMonth
        });
      } else {
        let newMonth = cur_month + 1;
        let newYear = cur_year;
        if (newMonth > 12) {
          newYear = cur_year + 1;
          newMonth = 1;
        }
        this.calculateDays(newYear, newMonth);
        this.calculateEmptyGrids(newYear, newMonth);
        // 获取一个月的签到详情
        let days = this.data._days;
        this.triggerEvent('changeDate', { newYear, newMonth, days})
        this.setData({
          cur_year: newYear,
          cur_month: newMonth
        });
      }
    },
    getFirstDayOfWeek(year, month) {
      return new Date(Date.UTC(year, month - 1, 1)).getDay();
    },
    getThisMonthDays(year, month) {
      return new Date(year, month, 0).getDate();
    },
    calculateEmptyGrids(year, month) {
      const firstDayOfWeek = this.getFirstDayOfWeek(year, month);
      let empytGrids = [];
      if (firstDayOfWeek > 0) {
        for (let i = 0; i < firstDayOfWeek; i++) {
          empytGrids.push(i);
        }
        this.setData({
          hasEmptyGrid: true,
          empytGrids
        });
      } else {
        this.setData({
          hasEmptyGrid: false,
          empytGrids: []
        });
      }
    },
    calculateDays(year, month) {
      let _days = [];
      const thisMonthDays = this.getThisMonthDays(year, month);
      for (let i = 1; i <= thisMonthDays; i++) {
        _days.push({
          day: i,
          choosed: false
        });
      }
      this.setData({
        _days
      });
    },
    tapDate(e){
      console.log("子组件",e.currentTarget.dataset)
      let date = e.currentTarget.dataset.date
      this.triggerEvent('onChooseDate', {date})
    }
  }
})
