import '../css/bootstrap.min.css'
import '../css/bootstrap-datetimepicker.min.css'
import './vendors/bootstrap-datetimepicker.js'
import '../css/styles.css'
import api from './common/api.js'
import axios from './common/axios.js'
import {th,td, historyTd, historyTh} from './common/template.js'
import {time} from './common/filter.js'
let page=1,realTimeLength=0,dataApi=`${api}stock/list`;
$(function () {
  realTime();
  search(page);
  $('#search').on('click', function() { // 点击搜索
    page = 1;
    search(page);
    $('#table2').show().siblings('#table1').hide();
    $('#tab li').eq(0).removeClass('active').end().eq(1).addClass('active');
  });
  $('#pre').on('click', function() { // 上一页
    if (page < 1) {
      page = 1;
      return;
    } else if (page > 1) {
      page--;
    }
    search(page);
  });
  $('#next').on('click', function() { // 下一页
    page++;
    search(page);
  });

  $('#datetimepicker1').datetimepicker({
    language: 'zh-CN', // 显示中文
    format: 'yyyy-mm-dd hh:ii', // 显示格式
    initialDate: new Date(), // 初始化当前日期
    autoclose: true, // 选中自动关闭
    todayBtn: true// 显示今日按钮
  });
  $('#datetimepicker2').datetimepicker({
    language: 'zh-CN', // 显示中文
    format: 'yyyy-mm-dd hh:ii', // 显示格式
    initialDate: new Date(), // 初始化当前日期
    autoclose: true, // 选中自动关闭
    todayBtn: true// 显示今日按钮
  });
  $('#tab li').on('click', function() { // tab切换
    $(this).addClass('active').siblings('li').removeClass('active');
    $('#tableBox .tables').eq($(this).index()).show().siblings('.tables').hide();
  });
});

function search(page) { // 搜索
  let searchText = $('#code').val();
  let startTime = $('#startTime').val();
  let endTime = $('#endTime').val();
  if (startTime) {
    startTime = (new Date(startTime)).getTime();
  }
  if (endTime) {
    endTime = (new Date(endTime)).getTime();
  }
  axios.get(dataApi, {
    searchText: searchText,
    startTime: startTime,
    endTime: endTime,
    page: page,
    rows: 10
  })
    .then((data)=>{
      var syncArr = []
      data.data.forEach((val)=>{
        val.update_time=time(Number(val.update_time))
        val.detail = []
        syncArr.push(getStockItemDetail(val))

      })
      Promise.all(syncArr).then(() => {
        console.log(data.data);
        tableHtml(2,data.data);
      })
    })

}

function tableHtml(num,data) {//数据显示模板
  var thFn = num == 1 ? th : historyTh
  var tdFn = num == 1 ? td : historyTd
  let list=''
  data.forEach((val)=>{
    list+=tdFn(val)
  });
  $(`#table${num}`).html(thFn+list);
}
function realTime() {//实时数据
  axios.get(dataApi,{
    startTime:new Date().setHours(0, 0, 0, 0),
    endTime:(new Date()).getTime(),
    rows: 15,
    page:1,
  })
    .then((data)=>{
      if(data.length!==realTimeLength){
        $('#sync-time').html(time(new Date().getTime()))
        data.data.forEach((val)=>{
          val.update_time=time(Number(val.update_time))
        })
        tableHtml(1,data.data);
      }
      setTimeout(() => {
        realTime();
      }, 300000);
    });
}

function getStockItemDetail(item) {
  return new Promise((resolve, reject) => {
    axios.get(`http://hq.sinajs.cn/list=sh${item.stock_code}`)
        .then((data)=>{
          var dataArr = data.split(',')
          item.detail = dataArr || []
          item.cumulative_increase = (item.detail[3] / item.formula_time - 1).toString()
          resolve()
        })
        .catch((err) => {reject(err)})
  })
}
