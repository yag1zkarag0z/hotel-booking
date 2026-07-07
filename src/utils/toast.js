export const showToast = (message, type = "success") => {
  window.dispatchEvent(
    new CustomEvent("quickstay-toast", {
      detail: { id: Date.now(), message, type },
    }),
  );
};
