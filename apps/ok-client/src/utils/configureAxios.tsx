import axios from 'axios';

interface Store {
  dispatch: (action: { type: string }) => void;
}

const configureAxios = (store: Store): void => {
  axios.defaults.baseURL = 'http://localhost:4000';
  axios.defaults.headers.post['Content-Type'] = 'application/json';
  // axios.defaults.withCredentials = true;
  setupInterceptors(store);
};

const setupInterceptors = (store: Store): void => {
  axios.interceptors.response.use(
    async (response) => {
      return Promise.resolve(response);
    },
    async (error) => {
      const { dispatch } = store;

      if (error.response?.status === 403) {
        console.log('403 error');
        // handleError(error);
        dispatch({ type: 'LOGOUT' });
        return;
      }

      console.log('error', error);
      // handleError(error);
      return Promise.reject(error);
    }
  );
};

export default configureAxios;
