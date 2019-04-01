let api = '';
let xlApi='';
if (process.env.NODE_ENV === 'development') {
  api = 'api/';
  xlApi='xl/';
} else {
  api = 'http://www.ymxf.xyz:3000/';
  xlApi='http://hq.sinajs.cn/';
}
export { api,xlApi};
