import {
  clearLocalStorageValue,
  getLocalStorageValue,
  LocalStorageKey,
} from "@store-frontend/shared-utils";
import axios, { AxiosRequestConfig, isAxiosError } from "axios";

import { getGetAuthTokenQueryKey, LoginResponse } from "../model";
import { queryClient } from "./queryContext";

export const instanceAxios = axios.create({
  baseURL: "/api/v1",
  withCredentials: true,
});

instanceAxios.interceptors.request.use((config) => {
  const jwt = getLocalStorageValue<LoginResponse>(LocalStorageKey.JWT);
  if (!jwt?.token) return config;
  config.headers.Authorization = `Bearer ${jwt.token.access_token}`;
  return config;
});

instanceAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (isAxiosError(error))
      if (error.response?.status === 401) {
        clearLocalStorageValue(LocalStorageKey.JWT);
        queryClient.invalidateQueries({ queryKey: getGetAuthTokenQueryKey() });
      }
    return Promise.reject(error);
  }
);

export const customInstance = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig
): Promise<T> => {
  const source = axios.CancelToken.source();
  const promise = instanceAxios({
    ...config,
    ...options,
    cancelToken: source.token,
  }).then(({ data }) => data);

  // @ts-ignore
  promise.cancel = () => {
    source.cancel("Query was cancelled");
  };

  return promise;
};
