
class Axios{
  constructor(){

  }
  async get(api,option){
    return $.ajax({
      url:api,
      data:option,
    })
  }
  async post(api,option){
    return $.ajax({
      url:api,
      data:option,
      type:'post',
    })
  }
}
let axios=new Axios();
export default axios