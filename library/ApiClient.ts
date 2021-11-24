import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import ZNotification from '@/library/z-notification'

export const jsonToParam = (json: any, first_str = "?") => {
  const parts: string[] = [];
  for (const key in json) {
    // eslint-disable-next-line no-prototype-builtins
    if (json.hasOwnProperty(key) && json[key]) {
      parts.push(encodeURIComponent(key) + "=" + encodeURIComponent(json[key]));
    }
  }
  return parts.length ? first_str + parts.join("&") : "";
};
const sleep = async (ms: number) => {
  await new Promise<void>((resolve) => setTimeout(() => resolve(), ms));
};

const formatError =  (e: any) => {
  const { response } = e;
  const { error } = response.data;

  ZNotification.error({
    title: "Error",
    description: window.$nuxt.$t(error).toString()
  })

  sleep(10);
};

const formatSucces =  () => {

  ZNotification.success({
    title: "Success",
    description: "Success"
  })

  sleep(10);
};

const getClient = (baseURL: string) => {
  const client = axios.create({ baseURL });
  client.interceptors.response.use(
    (response) => {
      formatSucces();
      Promise.resolve(response)
    },
    (error) => {
      formatError(error);
      return Promise.reject(error);
    },
  );
  return client;
};

class ApiClient {
  private client: AxiosInstance;
  constructor() {
    this.client = getClient("http://localhost:3000/api/v2");
  }

  async get(url: string, data: any = {}, conf: AxiosRequestConfig = {}) {
    try {
      const response = await this.client.get(
        url + jsonToParam(data, url.includes('?') ? '&' : '?'),
        conf,
      );
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async delete(url: string, data: any = {}, conf: AxiosRequestConfig = {}) {
    try {
      const response = await this.client.delete(
        url,
        {
          data,
          ...conf,
        },
      );
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async head(url: string, conf: AxiosRequestConfig = {}) {
    try {
      const response = await this.client.head(url, conf);
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async options(url: string, conf: AxiosRequestConfig = {}) {
    try {
      const response = await this.client.options(url, conf);
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async post(url: string, data: any = {}, conf: AxiosRequestConfig = {}) {
    try {
      const response = await this.client.post(url, data, conf);
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async put(url: string, data: any = {}, conf: AxiosRequestConfig = {}) {
    try {
      const response = await this.client.put(url, data, conf);
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async patch(url: string, data: any = {}, conf: AxiosRequestConfig = {}) {
    try {
      const response = await this.client.patch(url, data, conf);
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default ApiClient;