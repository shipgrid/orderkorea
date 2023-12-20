import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';

axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.headers.post['Content-Type'] = 'application/json'

interface ResponseBody {
  // Define the structure of your response body here
  // For example, if it's a JSON object with some properties, specify them here
}

const resBody = <T>(response: AxiosResponse<T>): AxiosResponse<T> => response;

const requests = {
  get: <T = ResponseBody>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> => axios.get<T>(url, config).then(resBody),

  post: <T = ResponseBody>(
    url: string,
    body: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> => axios.post<T>(url, body, config).then(resBody),

  put: <T = ResponseBody>(
    url: string,
    body: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> => axios.put<T>(url, body, config).then(resBody),

  del: <T = ResponseBody>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> => axios.delete<T>(url, config).then(resBody),
};

const account = {
  login: (body: any): Promise<AxiosResponse<ResponseBody>> => requests.post(`/account/login`, body),
};

export default {
  account,
};
