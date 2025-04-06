import { createContext, useContext, useState } from "react";
import TimerToast from "../toast/TimerToast";

const TimerToastContext = createContext();
let toastId = 0;

export const TimerToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const open = ({ message, type = "info", duration = 5000, onUndo }) => {
    const id = ++toastId;
    setToasts((prev) => [...prev, { id, message, type, duration, onUndo }]);
  };

  const close = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <TimerToastContext.Provider value={{ open }}>
      {children}
      <div className="fixed bottom-4 right-4 space-y-3 z-50">
        {toasts.map((toast) => (
          <TimerToast
            key={toast.id}
            {...toast}
            onClose={() => close(toast.id)}
          />
        ))}
      </div>
    </TimerToastContext.Provider>
  );
};

export const useTimerToast = () => useContext(TimerToastContext);
