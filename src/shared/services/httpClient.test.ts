import { ApiError } from "shared/services/apiError";
import { assignLocation } from "shared/services/browserNavigation";
import { CSRF_HEADER_NAME, httpClient } from "shared/services/httpClient";
import { stubHttp } from "shared/testing/stubHttp";

jest.mock("shared/services/browserNavigation", () => ({ assignLocation: jest.fn() }));

const assignLocationMock = assignLocation as jest.MockedFunction<typeof assignLocation>;

beforeEach(() => {
  assignLocationMock.mockReset();
  window.history.pushState({}, "", "/");
});

test.each(["post", "put", "patch", "delete"])("adds the CSRF header on %s", async (method) => {
  const requests = stubHttp(() => ({ status: 200 }));

  await httpClient.request({ method, url: "/api/test" });

  expect(requests[0].headers.get(CSRF_HEADER_NAME)).toBe("1");
});

test("does not add the CSRF header on get", async () => {
  const requests = stubHttp(() => ({ status: 200 }));

  await httpClient.get("/api/test");

  expect(requests[0].headers.has(CSRF_HEADER_NAME)).toBe(false);
});

test("sends relative URLs, without any Authorization header", async () => {
  const requests = stubHttp(() => ({ status: 200 }));

  await httpClient.get("/api/test");

  expect(requests[0].baseURL).toBeUndefined();
  expect(requests[0].url).toBe("/api/test");
  expect(requests[0].headers.has("Authorization")).toBe(false);
});

test("on 401, redirects to sign-in with the current page as returnUrl and never settles", async () => {
  window.history.pushState({}, "", "/claims/42?tab=info");
  stubHttp(() => ({ status: 401 }));

  const settled = jest.fn();
  httpClient.get("/api/test").then(settled, settled);
  await new Promise((resolve) => setTimeout(resolve, 0));

  expect(assignLocationMock).toHaveBeenCalledWith("/auth/login?returnUrl=%2Fclaims%2F42%3Ftab%3Dinfo");
  expect(settled).not.toHaveBeenCalled();
});

test("rejects other error statuses with an ApiError carrying the ProblemDetails", async () => {
  stubHttp(() => ({ status: 409, data: { title: "Conflict", status: 409, detail: "Claim is locked." } }));

  const error = await httpClient.put("/api/test").catch((err: unknown) => err);

  expect(error).toBeInstanceOf(ApiError);
  expect((error as ApiError).status).toBe(409);
  expect((error as ApiError).problem?.detail).toBe("Claim is locked.");
  expect(assignLocationMock).not.toHaveBeenCalled();
});

test("keeps a null problem when the error body is not ProblemDetails", async () => {
  stubHttp(() => ({ status: 500, data: "<html>oops</html>" }));

  const error = await httpClient.get("/api/test").catch((err: unknown) => err);

  expect(error).toBeInstanceOf(ApiError);
  expect((error as ApiError).status).toBe(500);
  expect((error as ApiError).problem).toBeNull();
});
