export const APP_TOAST_EVENT = "app-toast";

export const showAppToast = ({
  title = "Update",
  message = "",
  variant = "info",
} = {}) => {
  if (typeof window === "undefined") return;

  const id =
    typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random()}`;

  window.dispatchEvent(
    new CustomEvent(APP_TOAST_EVENT, {
      detail: {
        id,
        title,
        message,
        variant,
      },
    })
  );
};
