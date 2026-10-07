import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { httpClient } from "shared/services/httpClient";

export interface StubResponse {
  status: number;
  data?: unknown;
}

type Responder = (config: InternalAxiosRequestConfig) => StubResponse;

// Test-only: replaces httpClient's network adapter, so its interceptors still run on real
// responses. Statuses >= 400 reject like a real server error would.
export const stubHttp = (responder: Responder) => {
  const requests: InternalAxiosRequestConfig[] = [];

  httpClient.defaults.adapter = async (config) => {
    requests.push(config);
    const { status, data } = responder(config);
    const response: AxiosResponse = { data, status, statusText: "", headers: {}, config };
    if (status >= 400) {
      throw new AxiosError(`Request failed with status code ${status}`, "ERR_BAD_RESPONSE", config, null, response);
    }
    return response;
  };

  return requests;
};
