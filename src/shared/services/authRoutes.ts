// Session routes served by the backend (BFF). They are browser navigations, never API calls:
// sign-in redirects to Entra, and sign-out must be a form POST (see SignOutButton).
export const LOGIN_ROUTE = "/auth/login";
export const LOGOUT_ROUTE = "/auth/logout";

export const loginUrl = (returnUrl: string) => `${LOGIN_ROUTE}?returnUrl=${encodeURIComponent(returnUrl)}`;
