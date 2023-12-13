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
  register: (body: any): Promise<AxiosResponse<ResponseBody>> => requests.post(`/account/register`, body),
};

const vehicles = {
  list: (): Promise<AxiosResponse<ResponseBody>> => requests.get(`/vehicles`),
  details: (id: string): Promise<AxiosResponse<ResponseBody>> => requests.get(`/vehicles/${id}`),
  create: (body: any): Promise<AxiosResponse<ResponseBody>> => requests.post(`/vehicles`, body),
  update: (id: string, body: any): Promise<AxiosResponse<ResponseBody>> => requests.put(`/vehicles/${id}`, body),
  delete: (id: string): Promise<AxiosResponse<ResponseBody>> => requests.del(`/vehicles/${id}`),
};

const orders = {
  list: (): Promise<AxiosResponse<ResponseBody>> => requests.get(`/orders`),
  details: (id: string): Promise<AxiosResponse<ResponseBody>> => requests.get(`/orders/${id}`),
  create: (body: any): Promise<AxiosResponse<ResponseBody>> => requests.post(`/orders`, body),
  delete: (id: string): Promise<AxiosResponse<ResponseBody>> => requests.del(`/orders/${id}`),
  uploadDocument: (body: any): Promise<AxiosResponse<ResponseBody>> => requests.post('/orders/document', body),
};

const addresses = {
  list: (): Promise<AxiosResponse<ResponseBody>> => requests.get(`/addresses`),
  details: (id: string): Promise<AxiosResponse<ResponseBody>> => requests.get(`/addresses/${id}`),
  create: (body: any): Promise<AxiosResponse<ResponseBody>> => requests.post(`/addresses`, body),
  update: (id: string, body: any): Promise<AxiosResponse<ResponseBody>> => requests.put(`/addresses/${id}`, body),
  delete: (id: string): Promise<AxiosResponse<ResponseBody>> => requests.del(`/addresses/${id}`),
};

export default {
  account,
  vehicles,
  orders,
  addresses
};
