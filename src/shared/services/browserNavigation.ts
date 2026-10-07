// Full-page navigation (leaves the React app), isolated so tests can mock it.
export const assignLocation = (url: string) => {
  window.location.assign(url);
};
