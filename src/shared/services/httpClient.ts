import axios from "axios";

// baseURL is empty on purpose: in dev, CRA's "proxy" field (package.json) forwards
// relative requests to the ClaimApi backend server-side, avoiding CORS entirely.
export const httpClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "",
});
