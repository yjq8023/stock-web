export function time(value) {
  let time = new Date(value);
  let y = time.getFullYear();//年
  let m = (time.getMonth()+1<10)?'0'+(time.getMonth()+1):time.getMonth()+1;//月
  let d = time.getDate()<10?'0'+time.getDate():time.getDate();//日
  let h = time.getHours()<10?'0'+time.getHours():time.getHours();//时
  let f = time.getMinutes()<10?'0'+time.getMinutes():time.getMinutes();//分
  let s = time.getSeconds()<10?'0'+time.getSeconds():time.getSeconds();//秒
  value = `${y}-${m}-${d} ${h}:${f}`
  // value = `${y}-${m}-${d}`
  return value;
}