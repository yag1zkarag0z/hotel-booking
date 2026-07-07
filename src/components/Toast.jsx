import { useEffect, useState } from "react";

const Toast = () => {
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const handleToast = (event) => setToast(event.detail);
    window.addEventListener("quickstay-toast", handleToast);
    return () => window.removeEventListener("quickstay-toast", handleToast);
  }, []);

  useEffect(() => {
    if (!toast) return undefined;

    const timeout = setTimeout(() => setToast(null), 3200);
    return () => clearTimeout(timeout);
  }, [toast]);

  if (!toast) return null;

  const isError = toast.type === "error";

  return (
    <div
      key={toast.id}
      className={`fixed right-4 top-24 z-[100] flex max-w-sm items-start gap-3 rounded-xl border px-4 py-3 text-sm shadow-xl md:right-8 ${
        isError
          ? "border-red-200 bg-red-50 text-red-700"
          : "border-emerald-200 bg-emerald-50 text-emerald-700"
      }`}
      role="status"
    >
      <span className={`mt-1 h-2 w-2 shrink-0 rounded-full ${isError ? "bg-red-500" : "bg-emerald-500"}`} />
      <p className="font-medium">{toast.message}</p>
      <button
        type="button"
        onClick={() => setToast(null)}
        className="ml-2 cursor-pointer text-lg leading-none opacity-60 hover:opacity-100"
        aria-label="Close notification"
      >
        &times;
      </button>
    </div>
  );
};

export default Toast;
