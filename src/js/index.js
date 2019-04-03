import '../css/bootstrap.min.css'
import '../css/bootstrap-datetimepicker.min.css'
import './vendors/bootstrap-datetimepicker.js'
import  '../css/base.css'
import '../css/index.css'
import {api,xlApi} from './common/api.js'
import axios from './common/axios.js'
import {th, td, historyTd, historyTh} from './common/template.js'
import {time} from './common/filter.js'

let page = 1, realTimeLength = 0, dataApi = `${api}stock/list`;
let yesterday = new Date((new Date().getTime() - (24 * 3600 * 1000)))//昨天的时间
$(function () {
  realTime();
  search(page);
  dateTimePicker('datetimepicker', new Date((new Date().getTime() - (5 * 24 * 3600 * 1000))), yesterday);
  $('#search').on('click', function () { // 点击搜索
    page = 1;
    search(page);
  });
  $('#pre').on('click', function () { // 上一页
    if (page < 1) {
      page = 1;
      return;
    } else if (page > 1) {
      page--;
    }
    search(page);
  });
  $('#next').on('click', function () { // 下一页
    page++;
    search(page);
  });
  $('#tab li').on('click', function () { // tab切换
    $(this).addClass('active').siblings('li').removeClass('active');
    $('#tableBox .tables').eq($(this).index()).show().siblings('.tables').hide();
  });
  $('#select').on('click', function () {//下拉框
    $('#option').stop().slideToggle();
  });
  $('#option li').on('click', function () {//选择下拉框内容
    $('#select .content').html($(this).find('a').html());
    $(this).parent().slideUp();
    page = 1;
    search(page)
  })
  $('#time').on('change', function () {//日期变化数据发生变化
    page = 1;
    search(page)
  })
});

function search(page) { // 搜索
  let scenes=$('#select .content').html();
  if (scenes.indexOf('场景选股') > -1) {
    scenes = ''
  }
  let searchText = $('#code').val();
  let DataTime = $('#time').val();
  let startTime = '';
  let endTime = '';
  if (DataTime) {
    startTime = new Date(DataTime).setHours(0, 0, 0, 0);
    endTime = startTime + 24 * 3600 * 1000;
  }
  axios.get(dataApi, {
    scenes:scenes,
    searchText: searchText,
    startTime: startTime,
    endTime: endTime,
    page: page,
    rows: 10
  })
      .then((data) => {
        var syncArr = []
        data.data.forEach((val) => {
          val.update_time = time(Number(val.update_time))
          val.detail = []
          syncArr.push(getStockItemDetail(val))
        })
        Promise.all(syncArr).then(() => {
          tableHtml(2, data.data);
        })
      })

}

function tableHtml(num, data) {//数据显示模板
  var thFn = num == 1 ? th : historyTh
  var tdFn = num == 1 ? td : historyTd
  let list = ''
  data.forEach((val) => {
    list += tdFn(val)
  });
  $(`#table${num}`).html(thFn + list);
}

function realTime() {//实时数据
  axios.get(dataApi, {
    startTime: new Date().setHours(0, 0, 0, 0),
    endTime: new Date().getTime(),
    rows: 15,
    page: 1,
  })
      .then((data) => {
        // if (data.data.length !== realTimeLength) {
        //   realTimeLength = data.data.length;
          $('#sync-time').html(time(new Date().getTime()));
          data.data.forEach((val,index) => {
            val.update_time = time(Number(val.update_time));
          });
          data.data.sort(function(a,b){
            return b.num1.split('%')[0]-a.num1.split('%')[0]});
          tableHtml(1, data.data);
        // }
        setTimeout(() => {
          realTime();
        }, 300000);
      });
}

function getStockItemDetail(item) {
  var codesh = `sh${item.stock_code}`
  var codesz = `sz${item.stock_code}`
  return new Promise((resolve, reject) => {
    axios.get(`${api}list=${codesh}`)
        .then((data) => {
          var dataArr = data.split(',')
          if (dataArr && dataArr[2]) {
            item.detail = dataArr || []
            item.cumulative_increase = (item.detail[3] / item.formula_time - 1).toString()
            resolve()
          } else {
            axios.get(`${api}list=${codesz}`)
                .then((data) => {
                  var dataArr = data.split(',')
                  item.detail = dataArr || []
                  item.cumulative_increase = (item.detail[3] / item.formula_time - 1).toString()
                  resolve()
                })
                .catch((err) => {
                  reject(err)
                })
          }
        })
        .catch((err) => {
          reject(err)
        })
  })
}

//日期插件
function dateTimePicker(id, startDate, endDate) {
  $(`#${id}`).datetimepicker({
    language: 'zh-CN', // 显示中文
    format: 'yyyy-mm-dd', // 显示格式
    initialDate: startDate, // 初始化当前日期
    autoclose: true, // 选中自动关闭
    todayBtn: false,// 显示今日按钮
    minView: "month",//设置只显示到月份
    startDate: startDate,
    endDate: endDate
  });
}