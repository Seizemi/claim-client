import axios from "axios";

// baseURL is empty on purpose: in dev, CRA's "proxy" field (package.json) forwards
// relative requests to the ClaimApi backend server-side, avoiding CORS entirely.
export const httpClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "",
});

// Resolved base URL for requests issued outside axios (e.g. navigator.sendBeacon),
// which need the same origin/prefix httpClient uses.
export const apiBaseUrl = httpClient.defaults.baseURL ?? "";
