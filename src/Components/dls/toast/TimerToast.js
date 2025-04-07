import React, { useEffect, useRef, useState } from "react";
import { CheckCircle, AlertTriangle, XCircle, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ICONS = {
  success: <CheckCircle className="w-5 h-5 text-green-600" />,
  warning: <AlertTriangle className="w-5 h-5 text-orange-600" />,
  error: <XCircle className="w-5 h-5 text-red-600" />,
  info: <Info className="w-5 h-5 text-blue-600" />,
};

const COLORS = {
  success: {
    bg: "bg-green-50",
    bar: "bg-green-500",
    text: "text-green-800",
  },
  warning: {
    bg: "bg-orange-50",
    bar: "bg-orange-500",
    text: "text-orange-800",
  },
  error: {
    bg: "bg-red-50",
    bar: "bg-red-500",
    text: "text-red-800",
  },
  info: {
    bg: "bg-blue-50",
    bar: "bg-blue-500",
    text: "text-blue-800",
  },
};

const TimerToast = ({ message, type = "info", onClose, onUndo, duration = 5000 }) => {
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef(null);
  const startTimeRef = useRef(null);
  const remainingRef = useRef(duration);

  const startTimer = () => {
    startTimeRef.current = Date.now();
    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const percent = Math.min(
        100,
        ((duration - remainingRef.current + elapsed) / duration) * 100
      );
      setProgress(percent);
      if (percent >= 100) {
        clearInterval(intervalRef.current);
        onClose();
      }
    }, 30);
  };

  const pauseTimer = () => {
    clearInterval(intervalRef.current);
    const elapsed = Date.now() - startTimeRef.current;
    remainingRef.current -= elapsed;
  };

  const handleUndo = () => {
    clearInterval(intervalRef.current);
    onUndo?.();
    onClose();
  };

  useEffect(() => {
    startTimer();
    return () => clearInterval(intervalRef.current);
  }, []);

  const { bg, bar, text } = COLORS[type];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        transition={{ duration: 0.3 }}
        onMouseEnter={pauseTimer}
        onMouseLeave={startTimer}
        className={`relative w-80 ${bg} border-l-4 shadow-md rounded-md p-4 flex items-start space-x-3 font-iransans`}
      >
        <div className="pt-1">{ICONS[type]}</div>
        <div className="flex-1">
          <div className={`text-xs font-medium ${text} px-3`}>{message}</div>
          {onUndo && (
            <button
              onClick={handleUndo}
              className={`mt-1 text-xs font-bold ${text} hover:underline text-center  underline underline-offset-4  p-1`}
            >
              بازگردانی تغییرات
            </button>
          )}
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          ×
        </button>
        <div className={`absolute bottom-0 left-0 h-1 ${bar}`} style={{ width: `${progress}%`, transition: "width 0.1s linear" }} />
      </motion.div>
    </AnimatePresence>
  );
};

export default TimerToast;
