// api.js
import axios from 'axios';

const Error = {
  UNAUTHORIZED: 401,
  SERVER_FAIL: `Server connection fail`,
};

export const createAPI = (onUnauthorized) => {
  const api = axios.create({
    baseURL: `https://htmlacademy-react-3.appspot.com/wtw`,
    timeout: 1000 * 5,
    withCredentials: true,
  });

  const onSuccess = (response) => {
    return response;
  };

  const onFail = (err) => {
    const {response} = err;
    if (response === undefined) {
      throw Error.SERVER_FAIL;
    }
    if (response.status === Error.UNAUTHORIZED) {
      // запрос авторизации - особый случай
      onUnauthorized();
      throw err;
    }
    throw err;
  };

  api.interceptors.response.use(onSuccess, onFail);
  return api;
};
