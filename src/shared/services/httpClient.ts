import axios from "axios";
import { ApiError, ProblemDetailsSchema } from "shared/services/apiError";
import { loginUrl } from "shared/services/authRoutes";
import { assignLocation } from "shared/services/browserNavigation";

// The backend (BFF) serves this app and the API from the same origin, so every URL is
// relative and the browser sends the HttpOnly session cookie by itself: no token, no base URL.
export const CSRF_HEADER_NAME = "X-CSRF";
export const CSRF_HEADER_VALUE = "1";

const STATE_CHANGING_METHODS = ["post", "put", "patch", "delete"];

export const httpClient = axios.create();

// The backend rejects state-changing /api requests without this header (CSRF protection).
httpClient.interceptors.request.use((config) => {
  if (config.method && STATE_CHANGING_METHODS.includes(config.method.toLowerCase())) {
    config.headers.set(CSRF_HEADER_NAME, CSRF_HEADER_VALUE);
  }
  return config;
});

httpClient.interceptors.response.use(undefined, (error: unknown) => {
  if (!axios.isAxiosError(error) || !error.response) {
    return Promise.reject(error);
  }

  if (error.response.status === 401) {
    // No session (never signed in, or expired): sign in again and come back to this page.
    // The promise never settles because the page is leaving, so no error toast flashes meanwhile.
    redirectToLogin();
    return new Promise<never>(() => {});
  }

  const problem = ProblemDetailsSchema.safeParse(error.response.data);
  return Promise.reject(new ApiError(error.response.status, problem.success ? problem.data : null));
});

export const redirectToLogin = () => {
  const { pathname, search } = window.location;
  assignLocation(loginUrl(`${pathname}${search}`));
};
