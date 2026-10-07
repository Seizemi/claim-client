// Work that must run while the session is still valid, right before the browser posts the
// sign-out form (e.g. releasing a claim lock). Once the form is posted, the backend deletes the
// session cookie, so requests sent later (on pagehide, for instance) are rejected with 401.
// Handlers must be synchronous and fire-and-forget (fetch with keepalive): the page leaves next.
type SignOutHandler = () => void;

const handlers = new Set<SignOutHandler>();

export const onBeforeSignOut = (handler: SignOutHandler) => {
  handlers.add(handler);
  return () => {
    handlers.delete(handler);
  };
};

export const runBeforeSignOutHandlers = () => {
  handlers.forEach((handler) => {
    try {
      handler();
    } catch {
      // Never block the sign-out.
    }
  });
};
