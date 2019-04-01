let api = '';
let xlApi='';
if (process.env.NODE_ENV === 'development') {
  api = 'api/';
  xlApi='xl/';
} else {
  api = 'http://43.226.33.31:3000/';
  xlApi='http://hq.sinajs.cn/';
}
export { api,xlApi};
