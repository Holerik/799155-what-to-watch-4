// api.js
import axios from 'axios';

const Error = {
  UNAUTHORIZED: 401,
  SERVER_FAIL: `Server connection fail`,
};

export const createAPI = (onUnauthorized, onErrorOccured) => {
  const api = axios.create({
    // baseURL: `https://htmlacademy-react-3.appspot.com/wtw`,
    baseURL: `https://4.react.pages.academy/wtw`,
    timeout: 1000 * 5,
    withCredentials: true,
  });

  const onSuccess = (response) => {
    return response;
  };

  const onFail = (err) => {
    const {response} = err;
    if (response === undefined) {
      onErrorOccured(Error.SERVER_FAIL);
      throw Error.SERVER_FAIL;
    }
    if (response.status !== Error.UNAUTHORIZED) {
      onErrorOccured(response.data.error);
    }
    throw err;
  };

  api.interceptors.response.use(onSuccess, onFail);
  return api;
};
