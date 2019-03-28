let api = '';
if (process.env.NODE_ENV === 'development') {
  api = 'api/';
} else {
  api = 'http://www.ymxf.xyz:3000/';
}
export default api;
