let api="";
if(process.env.NODE_ENV==='development'){
  api='api/'
}else{
  api='http://43.226.33.31/'
}
export default api