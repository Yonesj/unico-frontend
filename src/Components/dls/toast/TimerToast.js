import React, { useEffect, useRef, useState } from "react";
import { CheckCircle, AlertTriangle, XCircle, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ICONS = {
  success: <CheckCircle className="w-5 h-5 text-green-500" />,
  warning: <AlertTriangle className="w-5 h-5 text-yellow-500 " />,
  error: <XCircle className="w-5 h-5 text-red-500" />,
  info: <Info className="w-5 h-5 text-blue-500" />,
};

const COLORS = {
  success: {
    bg: "bg-green-50  opcaity-[90%] ",
    bar: "from-green-400 to-green-600",
    text: "text-green-800",
    
  },
  warning: {
    bg: "bg-yellow-50  backdrop-blur-2xl opcaity-[10%]" ,
    bar: "from-yellow-400 to-yellow-600",
    text: "text-yellow-800",
  },
  error: {
    bg: "bg-red-50",
    bar: "from-red-400 to-red-600",
    text: "text-red-800",
  },
  info: {
    bg: "bg-blue-50",
    bar: "from-blue-400 to-blue-600",
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

  const {bg ,  bar, text } = COLORS[type];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.9 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        onMouseEnter={pauseTimer}
        onMouseLeave={startTimer}
        className={`relative w-80 ${bg} backdrop-blur-2xl  border border-orange-500  shadow-2xl rounded-2xl p-4 flex items-start space-x-3 overflow-hidden font-iransans font-normal`}
      >
        <div className="pt-1">{ICONS[type]}</div>
        <div className="flex-1">
          <div className={`text-sm font-normal  ${text} px-2`}>{message}</div>
          {onUndo && (
            <button
              onClick={handleUndo}
              className={`mt-1 text-xs font-bold ${text} hover:underline underline-offset-4 transition-all duration-200`}
            >
              بازگردانی تغییرات
            </button>
          )}
        </div>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 transition-all duration-200 text-lg"
        >
          ×
        </button>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20 overflow-hidden rounded-b-2xl">
          <div
            className={`h-full bg-gradient-to-r ${bar}`}
            style={{
              width: `${progress}%`,
              transition: "width 0.1s linear",
            }}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default TimerToast;
