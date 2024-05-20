let baseURL;
if (process.env.REACT_APP_NODE_ENV === 'production')
  baseURL = 'https://blog-api-ddt8.onrender.com';
if (process.env.REACT_APP_NODE_ENV === 'development')
  baseURL = 'http://localhost:4000';

export { baseURL };
