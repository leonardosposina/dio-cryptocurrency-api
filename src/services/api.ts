import axios from 'axios';

const api = axios.create({
  baseURL: 'https://dio-crypto-api.herokuapp.com',
});

export default api;
