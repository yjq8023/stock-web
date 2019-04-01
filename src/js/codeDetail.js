import '../css/bootstrap.min.css'
import  '../css/base.css'
import '../css/codeDetail.css'

let echarts = require('echarts');

// 基于准备好的dom，初始化echarts实例
let myChart = echarts.init(document.getElementById('main'));
myChart.setOption({
  xAxis: {
    type: 'category',
    data: ['周一', '周二', '周三', '周四', '周五']
  },
  yAxis: {
    type: 'value'
  },
  series: [{
    data: [820, 932, 901, 934, 1290, 1330, 1320],
    type: 'line'
  }]
});